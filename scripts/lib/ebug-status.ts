// The current status of eBugs the casebook filed, read from eCL on request (user, 2026-11-25: the Dashboard shows the
// bugs still open beside the ones filed, with a Refresh button). One IF3 REST query per bug code (TSR.EbugSearch,
// BugCode term; the endpoint takes no list of codes) with the filing token (ECL_TOKEN, else ~/.ecl_token; never
// logged). Only the status is kept, on this computer (~/.casebook/ebug-status.json, never committed): the token reads
// every ticket with no permission filter. Reading only: nothing is written to a ticket (AGENTS.md, No comments on
// existing eBugs).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CACHE = join(homedir(), '.casebook', 'ebug-status.json');
const BASE = process.env.ECL_BASE ?? 'https://ecl.cyberlink.com';
// Statuses that mean the bug is finished (ebug-tr-filer ecl_query.py CLOSED); everything else is still open
const CLOSED = new Set(['close', 'closed', 'cancelled', 'canceled', 'nab', "won't fix", 'wont fix', 'notreproducible', 'creatorclose', 'external issue']);
export const isOpenStatus = (status: string) => !CLOSED.has(status.trim().toLowerCase());

type Entry = { status: string; at: number };
let cache: Record<string, Entry> | null = null;
const load = () => cache ??= (() => { try { return JSON.parse(readFileSync(CACHE, 'utf8')); } catch { return {}; } })();
const save = () => { try { mkdirSync(join(homedir(), '.casebook'), { recursive: true }); writeFileSync(CACHE, JSON.stringify(cache, null, 1), { mode: 0o600 }); } catch {} };
export function token(): string {
  const env = (process.env.ECL_TOKEN ?? '').trim();
  if (env) return env;
  try { return readFileSync(join(homedir(), '.ecl_token'), 'utf8').trim(); } catch { return ''; }
}

/** What eCL said about a bug the last time it was asked, or null. */
export const bugStatus = (code: string): Entry | null => load()[code] ?? null;

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
// eCL's query endpoints share one rate bucket (about 25 calls in a burst), and a 429 (refused before processing) waits
// and tries again, as ecl_if3.py does. So the bugs are read by code prefix (user, 2026-11-26: a refresh took too long at
// one call per bug): BugCode `match` is a substring search, and a product's tickets of one version share everything but
// their last four digits (DRA262611P0072), so one page of 200 answers a whole group in about a second.
const SPACING_MS = 300, BACKOFF_MS = 15_000, TRIES = 4, FRESH_MS = 60_000, PAGE = 200, PAGES = 10;
const search = (condition: object, pageIndex: number, pageSize: number, t: string) => eclSearch([{ field: 'BugCode', ...condition }], pageIndex, pageSize, t);
/** One page of TSR.EbugSearch (newest first) for any conditions; a 429 waits and tries again. Reading only. */
export async function eclSearch(conditions: object[], pageIndex: number, pageSize: number, t = token()): Promise<any[]> {
  if (!t) throw new Error('No eCL token on this computer (ECL_TOKEN or ~/.ecl_token).');
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(`${BASE}/IF3/tsr/api/public/Query/TSR.EbugSearch`, {
      method: 'POST', signal: AbortSignal.timeout(30_000),
      headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ queryModel: 'TSR.EbugSearch', pageIndex, pageSize, conditions, sortBy: 'CreateTime', isDesc: true }),
    });
    if (r.status === 429 && attempt < TRIES - 1) { await wait(BACKOFF_MS * (attempt + 1)); continue; }
    if (!r.ok) throw new Error(r.status === 429 ? 'eCL is rate limiting (HTTP 429); try again in a minute' : `eCL answered HTTP ${r.status}`);
    const body: any = await r.json();
    return body?.results ?? body?.data?.results ?? [];
  }
}
const keepRow = (row: any, want: Set<string>) => { const code = String(row?.BugCode ?? '').toUpperCase(); if (want.delete(code)) { load()[code] = { status: String(row.Status ?? ''), at: Date.now() }; return 1; } return 0; };
/** Every wanted bug under one code prefix, newest first, a page at a time until all are found; returns how many were read. */
async function fetchPrefix(prefix: string, want: Set<string>, t: string): Promise<number> {
  let read = 0;
  for (let page = 1; want.size && page <= PAGES; page++) {
    const rows = await search({ match: { query: prefix } }, page, PAGE, t);
    for (const row of rows) read += keepRow(row, want);
    if (rows.length < PAGE) break;
    await wait(SPACING_MS);
  }
  // one the pages did not hold (older than they reach) is asked for by its own code
  for (const code of [...want]) { await wait(SPACING_MS); for (const row of await search({ term: { query: code } }, 1, 5, t)) read += keepRow(row, want); }
  return read;
}

let busy: Promise<unknown> | null = null;
/** Ask eCL for these bugs' statuses now: by code prefix; one read within the last minute
 *  is kept. One refresh runs at a time, and it stops at the first error (what was read is kept). */
export async function refreshBugs(codes: string[]): Promise<{ asked: number; read: number; fresh: number; error?: string }> {
  const t = token(), all = [...new Set(codes)];
  if (!t) return { asked: all.length, read: 0, fresh: 0, error: 'No eCL token on this computer (ECL_TOKEN or ~/.ecl_token).' };
  while (busy) await busy.catch(() => {});
  const list = all.map(x => x.toUpperCase()).filter(x => Date.now() - (load()[x]?.at ?? 0) > FRESH_MS);
  const groups = new Map<string, Set<string>>();
  for (const x of list) { const k = x.slice(0, -4); groups.set(k, (groups.get(k) ?? new Set()).add(x)); }
  let read = 0, error = '';
  const run = (async () => { for (const [prefix, want] of groups) { try { read += await fetchPrefix(prefix, want, t); } catch (e) { error = String((e as Error).message ?? e).slice(0, 120); break; } await wait(SPACING_MS); } })();
  busy = run;
  try { await run; } finally { busy = null; save(); }
  return { asked: all.length, read, fresh: all.length - list.length, ...(error ? { error } : {}) };
}
