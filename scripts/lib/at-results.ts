// AT (automated test) results of the tables in the regression suite, read from Jenkins (user, 2026-11-27): the Dashboard's
// Regression (AT) tab shows each table's latest completed Jenkins build as Pass / Fail / Blocked / Skipped, its [AT]
// eBugs, and a link to the build's own report (Allure or ReportPortal).
//
// Where a table's AT runs: library/<product>/<feature>/at.json, committed (no credentials in it):
//   { "<platform>": { "jenkins": "<job URL>",
//                     "source"?: "allure" | "reportportal" | "junit",          (unset: Allure when the build has an
//                                                                                 Allure report, else ReportPortal when
//                                                                                 configured or linked, else JUnit)
//                     "reportportal"?: { "url": "<RP origin>", "project": "<project>", "launch"?: "<launch name>" },
//                     "ebugs"?: "<words every [AT] eBug's Short Description holds>" } }   (unset: the table's title)
// Set it with `node scripts/regression.ts <feature> <platform> --jenkins <job URL> …` or the Dashboard's 「Link job」.
//
// Credentials stay on this computer: config/at-credentials.json in the repo folder (git-ignored; copy
// config/at-credentials.example.json), else ~/.casebook/at-credentials.json
//   { "jenkins": { "<origin>": { "user": "…", "token": "<API token>" } }, "reportportal": { "<origin>": { "token": "…" } } }
// else JENKINS_USER + JENKINS_TOKEN and RP_TOKEN. Never logged, never sent anywhere but their own origin.
//
// What was read is kept on this computer (~/.casebook/at-results.json), like the eBug statuses: reading only, nothing is
// written to Jenkins, ReportPortal or eCL.
//
// Mapping: Allure passed / failed / broken / skipped (+ unknown) → Pass / Fail / Blocked / Skipped (a broken test stopped
// on an error before its check, so its case was not judged); ReportPortal executions passed / failed / skipped, and what
// is left of the total (interrupted) → Blocked; JUnit pass / fail / skip (no Blocked).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { LIBRARY, assertIds, readManifest, tableDir, writeJson } from './library.ts';
import { eclSearch, isOpenStatus, token as eclToken } from './ebug-status.ts';

export type AtSource = { jenkins?: string; suite?: string; folder?: string; source?: 'allure' | 'reportportal' | 'junit' | 'pytest'; reportportal?: { url?: string; project?: string; launch?: string }; ebugs?: string };
export type AtResult = { build: number; build_url: string; when: string; status: string; kind: 'allure' | 'reportportal' | 'junit' | 'pytest'; total: number; pass: number; fail: number; blocked: number | null; skip: number; report: string;
  version?: string; note?: string; warn?: string; report_kind?: 'reportportal';
  // a ReportPortal launch: where it is, and each top-level folder of its tests (tests/<folder>) counted on its own
  launch?: { url: string; project: string; id: number; name: string }; folders?: Record<string, { id: number; total: number; pass: number; fail: number; skip: number }>; folder?: string };
export type AtBug = { code: string; status: string; short: string };
type Entry = { at: number; result?: AtResult; error?: string; bugs?: AtBug[]; bugs_at?: number; bugs_error?: string };

const HOME = join(homedir(), '.casebook'), CACHE = join(HOME, 'at-results.json');
const CREDS = [join(import.meta.dirname, '..', '..', 'config', 'at-credentials.json'), join(HOME, 'at-credentials.json')];
const fileOf = (feature: string) => join(LIBRARY, feature, 'at.json');
const SOURCES = ['allure', 'reportportal', 'junit', 'pytest'] as const;

export function readAtSources(feature: string): Record<string, AtSource> {
  try { return existsSync(fileOf(feature)) ? JSON.parse(readFileSync(fileOf(feature), 'utf8')) : {}; } catch { return {}; }
}
const cleanUrl = (u: string) => { const x = new URL(u.trim()); if (!/^https?:$/.test(x.protocol)) throw new Error('Jenkins and ReportPortal take an http(s) URL'); x.hash = ''; x.search = ''; return x.toString().replace(/\/+$/, ''); };

/** Where the table's AT runs; null removes it. */
export function setAtSource(feature: string, platform: string, src: Partial<AtSource> | null): AtSource | null {
  assertIds(feature, platform);
  if (!existsSync(tableDir(feature, platform))) throw new Error(`No ${platform} table for ${feature}`);
  const all = readAtSources(feature);
  if (!src) delete all[platform];
  else {
    // the table's tests as one folder of the product's suite (product.json › at): no job of its own
    if (src.folder) {
      if (!/^[\w.-]+$/.test(src.folder)) throw new Error('A suite folder is a name like ai_video_upscaler');
      all[platform] = { suite: src.suite ?? 'core', folder: src.folder, ...(src.ebugs ?? all[platform]?.ebugs ? { ebugs: (src.ebugs ?? all[platform]!.ebugs)!.trim() } : {}) };
      writeJson(fileOf(feature), all); return all[platform];
    }
    const was = all[platform], jenkins = src.jenkins ? cleanUrl(src.jenkins) : was?.jenkins;
    if (!jenkins) throw new Error('A Jenkins job URL (…/job/<name>) or a suite folder is needed');
    if (src.source && !SOURCES.includes(src.source)) throw new Error(`source is one of ${SOURCES.join(', ')}`);
    const rp = { ...was?.reportportal, ...src.reportportal };
    if (rp.url) rp.url = cleanUrl(rp.url);
    all[platform] = { jenkins, ...(src.source ?? was?.source ? { source: src.source ?? was!.source } : {}),
      ...(Object.values(rp).some(Boolean) ? { reportportal: Object.fromEntries(Object.entries(rp).filter(([, v]) => v)) } : {}),
      ...(src.ebugs ?? was?.ebugs ? { ebugs: (src.ebugs ?? was!.ebugs)!.trim() } : {}) };
  }
  if (Object.keys(all).length) writeJson(fileOf(feature), all); else rmSync(fileOf(feature), { force: true });
  return all[platform] ?? null;
}

// ---- this computer's reading
let cache: Record<string, Entry> | null = null;
const load = () => cache ??= (() => { try { return JSON.parse(readFileSync(CACHE, 'utf8')) ?? {}; } catch { return {}; } })();
const save = () => { try { mkdirSync(HOME, { recursive: true }); writeFileSync(CACHE, JSON.stringify(load(), null, 1), { mode: 0o600 }); } catch {} };
const key = (feature: string, platform: string) => `${feature}|${platform}`;
/** What Jenkins and eCL said about the table at the last refresh, or null. */
export const atReading = (feature: string, platform: string): Entry | null => load()[key(feature, platform)] ?? null;

function creds(kind: 'jenkins' | 'reportportal', url: string): { user?: string; token?: string } {
  const origin = new URL(url).origin;
  for (const f of CREDS) {
    let file: any = {}; try { file = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
    const c = file?.[kind]?.[origin] ?? file?.[kind]?.[origin + '/'];
    if (c?.token && !/^<.*>$/.test(c.token) && !/PASTE/.test(c.token)) return c;   // a template's placeholder is no key
  }
  return kind === 'jenkins' ? { user: process.env.JENKINS_USER, token: process.env.JENKINS_TOKEN } : { token: process.env.RP_TOKEN };
}
async function get(url: string, kind: 'jenkins' | 'reportportal', as: 'json' | 'text' = 'json'): Promise<any> {
  const c = creds(kind, url), headers: Record<string, string> = { Accept: as === 'json' ? 'application/json' : 'text/plain' };
  if (kind === 'jenkins' && c.user && c.token) headers.Authorization = `Basic ${Buffer.from(`${c.user}:${c.token}`).toString('base64')}`;
  if (kind === 'reportportal' && c.token) headers.Authorization = `Bearer ${c.token}`;
  const r = await fetch(url, { headers, signal: AbortSignal.timeout(30_000), redirect: 'follow' });
  if (!r.ok) {
    const who = kind === 'jenkins' ? 'Jenkins' : 'ReportPortal', path = new URL(url).pathname;
    throw Object.assign(new Error(r.status === 401 || r.status === 403 ? `${who} refused the sign-in (HTTP ${r.status}); set this computer's ${kind === 'jenkins' ? 'user and API token' : 'API key'} in config/at-credentials.json` : `${who} answered HTTP ${r.status} for ${path}`), { status: r.status });
  }
  if (as === 'text') { const t = await r.text(); return t.length > 20_000_000 ? t.slice(-20_000_000) : t; }
  return r.json();
}
const n = (x: unknown) => Number(x) || 0;
// a ReportPortal launch page: <origin>/ui/#<project>/launches/<filter>/<id>
const RP_LINK = /(https?:\/\/[^\s"'<>]+?)\/ui\/#([\w.-]+)\/launches\/[\w.-]+\/(\d+)/g;

type RpPart = Pick<AtResult, 'total' | 'pass' | 'fail' | 'blocked' | 'skip' | 'report' | 'launch' | 'folders'>;
async function reportPortal(src: AtSource, build: any, consoleText: () => Promise<string>): Promise<RpPart | null> {
  // the launch this build reported to: a link in its description, else in its console, else the newest launch by name
  let link = [...String(build.description ?? '').matchAll(RP_LINK)].at(-1);
  if (!link) link = [...(await consoleText()).matchAll(RP_LINK)].at(-1);
  const url = src.reportportal?.url ?? link?.[1], project = src.reportportal?.project ?? link?.[2];
  if (!url || !project) return null;
  let launch: any;
  if (link && (!src.reportportal?.project || link[2] === project)) launch = await get(`${url}/api/v1/${encodeURIComponent(project)}/launch/${link[3]}`, 'reportportal');
  else if (src.reportportal?.launch) {
    // the launch of this build: by name, started while the build ran; else the one described as the build's
    // short description; none (the build stopped before its tests) leaves the build to its console
    const list: any[] = (await get(`${url}/api/v1/${encodeURIComponent(project)}/launch?filter.eq.name=${encodeURIComponent(src.reportportal.launch)}&page.sort=startTime%2Cdesc&page.size=10`, 'reportportal'))?.content ?? [];
    const from = n(build.timestamp) - 60_000, to = n(build.timestamp) + (n(build.duration) || 86_400_000) + 60_000, t = (l: any) => typeof l.startTime === 'number' ? l.startTime : Date.parse(l.startTime);
    const said = (build.actions ?? []).flatMap((a: any) => a?.parameters ?? []).map((p: any) => { try { return JSON.parse(p.value)?.build?.short_description ?? ''; } catch { return ''; } }).find(Boolean) ?? '';
    launch = list.find(l => t(l) >= from && t(l) <= to) ?? (said ? list.find(l => (l.description ?? '').trim() === said.trim()) : undefined);
  }
  if (!launch) return null;
  const e = launch.statistics?.executions ?? {}, total = n(e.total), pass = n(e.passed), fail = n(e.failed), skip = n(e.skipped);
  // each top-level folder of the launch (pytest-reportportal: one SUITE per tests/<folder>), for tables linked to one
  const folders: NonNullable<AtResult['folders']> = {};
  for (let page = 1; page <= 5; page++) {
    const r = await get(`${url}/api/v1/${encodeURIComponent(project)}/item?filter.eq.launchId=${launch.id}&filter.level.path=1&page.size=300&page.page=${page}`, 'reportportal').catch(() => null);
    if (!r) break;
    for (const i of r?.content ?? []) { const x = i.statistics?.executions ?? {}; folders[String(i.name)] = { id: n(i.id), total: n(x.total), pass: n(x.passed), fail: n(x.failed), skip: n(x.skipped) }; }
    if (page >= n(r?.page?.totalPages)) break;
  }
  return { total, pass, fail, skip, blocked: Math.max(0, total - pass - fail - skip), report: `${url}/ui/#${project}/launches/all/${launch.id}`, launch: { url, project, id: n(launch.id), name: String(launch.name ?? '') + (launch.number ? ` #${launch.number}` : '') }, folders };
}

// pytest's closing line: "= 383 failed, 2912 passed, 2283 skipped, 4 deselected, 1 xfailed, 744 warnings, 2 errors in 32760.12s (9:06:00) ="
const PYTEST_SUMMARY = /^=+ ((?:\d+ [a-z]+(?:, )?)+) in [\d.]+s(?: \([\d:]+\))? =+\s*$/gm;
/** The pytest run of a console (user, 2026-11-27: PDR Android's AT runs pytest in Jenkins with no report on Jenkins
 *  itself): the closing line of the largest run in the build (SFT also runs a small PERF launch after it).
 *  passed and xpassed → Pass, failed → Fail, errors → Blocked (the test stopped before its check), skipped and xfailed →
 *  Skipped; deselected and warnings are not tests run. */
export function pytestTally(text: string): { total: number; pass: number; fail: number; blocked: number; skip: number } | null {
  let best: ReturnType<typeof pytestTally> = null;
  for (const m of text.matchAll(PYTEST_SUMMARY)) {
    const c: Record<string, number> = {};
    for (const [, k, w] of m[1].matchAll(/(\d+) ([a-z]+)/g)) c[w.replace(/s$/, '')] = Number(k);
    const pass = (c.passed ?? 0) + (c.xpassed ?? 0), fail = c.failed ?? 0, blocked = c.error ?? 0, skip = (c.skipped ?? 0) + (c.xfailed ?? 0);
    const t = { total: pass + fail + blocked + skip, pass, fail, blocked, skip };
    if (!best || t.total > best.total) best = t;
  }
  return best;
}
// the app version a build tested, from its parameters ("16.9.0.2611251"); a daily build names only its number
const versionOf = (build: any) => {
  for (const a of build.actions ?? []) for (const p of a?.parameters ?? []) { const m = String(p?.value ?? '').match(/\b(\d+\.\d+\.\d+)\.\d{5,}\b/); if (m) return m[1]; }
  return undefined;
};

/** The latest completed build of the table's Jenkins job, counted from its report. */
export async function readJenkins(src: AtSource): Promise<AtResult> {
  if (!src.jenkins) throw new Error('No Jenkins job');
  const build = await get(`${src.jenkins}/lastCompletedBuild/api/json?tree=number,url,result,timestamp,duration,description,actions[_class,urlName,parameters[name,value]]`, 'jenkins').catch((e: any) => {
    throw e.status === 404 ? new Error('The Jenkins job has no completed build yet (or the URL is not a job)') : e;
  });
  const url = String(build.url ?? `${src.jenkins}/${build.number}/`).replace(/\/?$/, '/');
  const version = versionOf(build), base = { build: n(build.number), build_url: url, when: new Date(n(build.timestamp)).toISOString(), status: String(build.result ?? ''), ...(version ? { version } : {}) };
  let text: Promise<string> | null = null, rpWarn = '';
  const rpCfg = src.reportportal?.url && src.reportportal?.project ? src.reportportal : null;
  const viaRp = <T extends AtResult>(r: T): T => rpWarn && rpCfg ? { ...r, warn: `ReportPortal not read (${rpWarn}); figures from the console`, report: `${rpCfg.url}/ui/#${rpCfg.project}/launches/all`, report_kind: 'reportportal' } : r;
  const consoleText = () => text ??= get(`${url}consoleText`, 'jenkins', 'text').catch(() => '');
  const hasAllure = (build.actions ?? []).some((a: any) => a?.urlName === 'allure' || /allure/i.test(a?._class ?? ''));
  const order = src.source ? [src.source] : [...(hasAllure ? ['allure'] : []), 'reportportal', 'junit', 'pytest'] as const;
  for (const kind of order) {
    if (kind === 'allure') {
      const s = (await get(`${url}allure/widgets/summary.json`, 'jenkins'))?.statistic ?? {};
      return { ...base, kind, total: n(s.total), pass: n(s.passed), fail: n(s.failed), blocked: n(s.broken) + n(s.unknown), skip: n(s.skipped), report: `${url}allure/` };
    }
    if (kind === 'reportportal') {
      // configured but not readable (no token on this computer): the next source counts, the report still links the
      // launches, and the reading says why
      const rp = await reportPortal(src, { ...build, url }, consoleText).catch((e: any) => { if (src.source) throw e; rpWarn = e.message; return null; });
      if (rp) return { ...base, kind, ...rp };
      if (rpWarn) continue;
      if (src.source) throw new Error('No ReportPortal launch found: link it in the build description or console, or set reportportal.url, project and launch in at.json');
      continue;
    }
    if (kind === 'pytest') {
      const t = pytestTally(await consoleText());
      if (t) return viaRp({ ...base, kind, ...t, report: `${url}console` });
      // a build that stopped before its tests (an install failure): no tests, and the reason it gave
      const why = (await consoleText()).match(/^(?:ERROR: .+|.*Failed to install APK.+|.*Installation failed.+)$/m)?.[0].replace(/^ERROR:\s*/, '').slice(0, 160);
      if (why || base.status === 'FAILURE' || base.status === 'ABORTED') return { ...base, kind, total: 0, pass: 0, fail: 0, blocked: 0, skip: 0, report: `${url}console`, note: why || `Build ${base.status.toLowerCase()} before any test ran` };
      throw new Error('The build has no Allure report, ReportPortal launch, JUnit report or pytest summary');
    }
    const t = await get(`${url}testReport/api/json?tree=totalCount,passCount,failCount,skipCount`, 'jenkins').catch((e: any) => e.status === 404 ? null : Promise.reject(e));
    if (!t) { if (src.source) throw new Error('The build has no JUnit test report'); continue; }
    const fail = n(t.failCount), skip = n(t.skipCount), total = n(t.totalCount) || n(t.passCount) + fail + skip;
    return viaRp({ ...base, kind: 'junit' as const, total, pass: t.passCount != null ? n(t.passCount) : total - fail - skip, fail, blocked: null, skip, report: `${url}testReport/` });
  }
  throw new Error('No report found');
}

/** The [AT] eBugs of a table: eCL tickets of the product's platform whose Short Description carries [AT] and the
 *  table's words (at.json `ebugs`, else its title). Reading only. */
export async function readAtBugs(feature: string, platform: string, words: string): Promise<AtBug[]> {
  const product = (() => { try { return JSON.parse(readFileSync(join(LIBRARY, feature.split('/')[0], 'product.json'), 'utf8'))?.[platform]?.ecl_product ?? ''; } catch { return ''; } })();
  const want = words.toLowerCase().split(/\s+/).filter(Boolean), out = new Map<string, AtBug>();
  // eCL's match drops the brackets, so the search asks for the words and the tag is checked here
  for (let page = 1; page <= 5; page++) {
    const rows = await eclSearch([{ field: 'ShortDescription', match: { query: words || 'AT' } }, ...(product ? [{ field: 'ProductName', match: { query: product } }] : [])], page, 200);
    for (const r of rows) {
      const short = String(r?.ShortDescription ?? ''), low = short.toLowerCase();
      if (!short.includes('[AT]') || !want.every(w => low.includes(w)) || (product && r?.ProductName && r.ProductName !== product)) continue;
      out.set(String(r.BugCode), { code: String(r.BugCode), status: String(r.Status ?? ''), short });
    }
    if (rows.length < 200) break;
    await new Promise(r => setTimeout(r, 300));
  }
  return [...out.values()];
}

let busy: Promise<unknown> | null = null;
/** Read the tables' latest builds (and their [AT] eBugs) now; one refresh at a time, each table's error kept with it. */
export async function refreshAt(tables: [string, string][]): Promise<{ asked: number; read: number; errors: string[] }> {
  while (busy) await busy.catch(() => {});
  let read = 0; const errors: string[] = [];
  const run = (async () => {
    for (const [feature, platform] of tables) {
      assertIds(feature, platform);
      const src = readAtSources(feature)[platform], k = key(feature, platform), e: Entry = { ...load()[k], at: Date.now() };
      if (src?.folder) {
        // a folder of the product's suite: its latest reading (read again when older than 5 minutes)
        const product = feature.split('/')[0], suite = readSuites(product, platform).find(x => x.id === (src.suite ?? 'core'));
        const sk = suiteKey(product, platform, suite?.id ?? ''), was = load()[sk];
        if (suite && (!was?.result || Date.now() - was.at > 300_000)) await readSuite(product, platform, suite, []);
        const r = load()[sk]?.result, f = r?.folders?.[src.folder];
        if (!suite) { e.error = `No suite "${src.suite ?? 'core'}" in ${product}/product.json › at.${platform}`; delete e.result; }
        else if (!r) { e.error = load()[sk]?.error ?? 'The suite was not read'; delete e.result; }
        else if (!f) { e.error = r.folders ? `No folder "${src.folder}" in ${r.launch?.name ?? 'the launch'} (folders: ${Object.keys(r.folders).join(', ')})` : 'The suite\'s results have no folders (ReportPortal not read)'; delete e.result; }
        else { e.result = { ...r, folders: undefined, folder: src.folder, total: f.total, pass: f.pass, fail: f.fail, skip: f.skip, blocked: Math.max(0, f.total - f.pass - f.fail - f.skip), report: `${r.launch!.url}/ui/#${r.launch!.project}/launches/all/${r.launch!.id}/${f.id}`, note: undefined, warn: undefined }; delete e.error; read++; }
        if (e.error) errors.push(`${feature} ${platform}: ${e.error}`);
      } else if (src?.jenkins) {
        try { e.result = await readJenkins(src); delete e.error; read++; }
        catch (err: any) { e.error = String(err?.message ?? err).slice(0, 200); errors.push(`${feature} ${platform}: ${e.error}`); }
      } else { delete e.result; e.error = 'No Jenkins job linked'; }
      if (eclToken()) {
        const words = src?.ebugs || readManifest(feature, platform)?.title || feature.split('/')[1].replace(/-/g, ' ');
        try { e.bugs = await readAtBugs(feature, platform, words); e.bugs_at = Date.now(); delete e.bugs_error; }
        catch (err: any) { e.bugs_error = String(err?.message ?? err).slice(0, 200); }
      }
      load()[k] = e;
    }
  })();
  busy = run;
  try { await run; } finally { busy = null; save(); }
  return { asked: tables.length, read, errors };
}

// ---- The product's own AT suite (user, 2026-11-27): every case already automated, one line of its own on the
// Regression (AT) tab, named 「Core AT suite」. It lives in library/<product>/product.json:
//   "at": { "<platform>": [ { "id": "core", "name": "Core AT suite", "jenkins": "<job running the whole suite>",
//                            "also": [ { "label": "BFT", "jenkins": "<a smaller job of the same suite>" } ] } ] }
// The main job's latest build gives the figures and the report; each `also` job's latest build is named beside it.
export type AtSuite = AtSource & { id: string; name: string; jenkins: string; also?: { label: string; jenkins: string; reportportal?: AtSource['reportportal'] }[] };
export function readSuites(product: string, platform: string): AtSuite[] {
  try { const v = JSON.parse(readFileSync(join(LIBRARY, product, 'product.json'), 'utf8'))?.at?.[platform]; return Array.isArray(v) ? v.filter((x: any) => x?.id && x?.jenkins) : []; } catch { return []; }
}
const suiteKey = (product: string, platform: string, id: string, label = '') => `suite|${product}|${platform}|${id}${label ? `|${label}` : ''}`;
/** A suite as the Dashboard shows it: its main build and its `also` builds (this computer's last reading). */
export function suiteOf(product: string, platform: string, s: AtSuite) {
  const r: Entry | undefined = load()[suiteKey(product, platform, s.id)];
  const bugs = r?.bugs ? { filed: r.bugs.length, open: r.bugs.filter(b => isOpenStatus(b.status)).length, list: r.bugs.map(b => ({ ...b, open: isOpenStatus(b.status) })) } : null;
  return { id: s.id, name: s.name, platform, job: s.jenkins, result: r?.result ?? null, error: r?.error ?? null, read: r?.at ?? 0, bugs,
    also: (s.also ?? []).map(a => { const x = load()[suiteKey(product, platform, s.id, a.label)]; return { label: a.label, job: a.jenkins, result: x?.result ?? null, error: x?.error ?? null }; }) };
}
/** Read the product's suites on this platform now (one refresh at a time with the tables'). */
export async function refreshSuites(product: string, platform: string): Promise<{ asked: number; read: number; errors: string[] }> {
  while (busy) await busy.catch(() => {});
  let read = 0, asked = 0; const errors: string[] = [];
  const run = (async () => { for (const s of readSuites(product, platform)) {
    const r = await readSuite(product, platform, s, errors); asked += r.asked; read += r.read;
  } })();
  busy = run;
  try { await run; } finally { busy = null; save(); }
  return { asked, read, errors };
}
/** One suite: its main job (with its ReportPortal folders), its [AT] eBugs and its `also` jobs. */
async function readSuite(product: string, platform: string, s: AtSuite, errors: string[]): Promise<{ asked: number; read: number }> {
  let read = 0, asked = 0;
  const one = async (k: string, src: AtSource, name: string) => {
    asked++; const e: Entry = { ...load()[k], at: Date.now() };
    try { e.result = await readJenkins(src); delete e.error; read++; }
    catch (err: any) { e.error = String(err?.message ?? err).slice(0, 200); errors.push(`${name}: ${e.error}`); }
    load()[k] = e;
  };
  {
    await one(suiteKey(product, platform, s.id), s, s.name);
    // its [AT] eBugs: every [AT] ticket of the product on this platform (or those holding the suite's `ebugs` words)
    if (eclToken()) { const e = load()[suiteKey(product, platform, s.id)]!;
      try { e.bugs = await readAtBugs(`${product}/_`, platform, s.ebugs ?? ''); e.bugs_at = Date.now(); delete e.bugs_error; } catch (err: any) { e.bugs_error = String(err?.message ?? err).slice(0, 200); } }
    for (const a of s.also ?? []) await one(suiteKey(product, platform, s.id, a.label), { jenkins: a.jenkins, ...(a.reportportal ? { reportportal: a.reportportal } : {}) }, `${s.name} · ${a.label}`);
  }
  save();
  return { asked, read };
}
