// This computer's casebook settings (user, 2026-11-17): what belongs to the person and account working here, not to a
// table, so it stays outside the repo in ~/.casebook/settings.json (CASEBOOK_SETTINGS overrides the path, for tests).
// Today it holds the Claude account's seat size in Pro units (Pro 1, the 1.25× Team account, a 6.25× Team seat), with
// the time each value was set, so a usage reading taken at any time gets the seat that was in force then.
// Set on the Settings page of the pages server (scripts/pages.ts › /settings/) or with `node scripts/settings.ts seat N`.
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { PLATFORMS } from './library.ts';

export type SeatEntry = { at: string; seat: number; note?: string };
export type Settings = { seats: SeatEntry[] };

export const settingsFile = () => process.env.CASEBOOK_SETTINGS || join(homedir(), '.casebook', 'settings.json');

export function readSettings(): Settings {
  const f = settingsFile();
  try {
    const s = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {};
    const seats = Array.isArray(s.seats) ? s.seats.filter((e: any) => e && Number(e.seat) > 0 && Date.parse(e.at)) : [];
    return { ...s, seats: seats.sort((a: SeatEntry, b: SeatEntry) => Date.parse(a.at) - Date.parse(b.at)) };
  } catch { return { seats: [] }; }
}

/** The seat size set for the time `at` (default now), or undefined when none was set by then. */
export function seatAt(at: string | number = Date.now()): SeatEntry | undefined {
  const t = typeof at === 'number' ? at : Date.parse(at);
  return readSettings().seats.filter(e => Date.parse(e.at) <= t).at(-1);
}

export const SEAT_PRESETS: { seat: number; en: string; zh: string }[] = [
  { seat: 1, en: 'Pro (1×)', zh: 'Pro（1×）' },
  { seat: 1.25, en: 'Team account (1.25×)', zh: 'Team 帳號（1.25×）' },
  { seat: 6.25, en: 'Team seat (6.25×)', zh: 'Team 席位（6.25×）' },
];

/** Every runs/ folder of a table with a run active in the last `hours` (a run folder's activity.log changed). */
export function activeRunsDirs(library: string, hours = 12): string[] {
  const out: string[] = [], since = Date.now() - hours * 3_600_000;
  const dirs = (d: string) => { try { return readdirSync(d, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => join(d, e.name)); } catch { return []; } };
  for (const product of dirs(library)) for (const feature of dirs(product)) for (const platform of PLATFORMS) {
    const runs = join(feature, platform, 'runs');
    if (dirs(runs).some(r => { const a = join(r, 'activity.log'); return existsSync(a) && statSync(a).mtimeMs >= since; })) out.push(runs);
  }
  return out;
}

/**
 * Set the seat size from now on. Each active run's usage.jsonl gets an account marker (all four values null, the new
 * seat) when its latest row has another seat, so the run's pages split at the change on every computer.
 */
export function setSeat(seat: number, library: string, note = ''): { entry: SeatEntry; marked: string[] } {
  if (!(seat > 0) || seat > 100) throw new Error('The seat size must be a number above 0 (Pro 1, Team 1.25 or 6.25).');
  const s = readSettings(), entry: SeatEntry = { at: new Date().toISOString(), seat, ...(note ? { note } : {}) };
  s.seats.push(entry);
  const f = settingsFile(); mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, JSON.stringify(s, null, 2) + '\n');
  const marked: string[] = [];
  for (const runs of activeRunsDirs(library)) {
    const u = join(runs, 'usage.jsonl');
    const last = existsSync(u) ? readFileSync(u, 'utf8').split('\n').filter(Boolean).flatMap(l => { try { return [JSON.parse(l)]; } catch { return []; } })
      .sort((a, b) => Date.parse(a.at) - Date.parse(b.at)).at(-1) : undefined;
    if (last?.proMultiplier === seat) continue;
    appendFileSync(u, JSON.stringify({ at: entry.at, fiveHourPct: null, fiveHourResetsAt: null, weeklyPct: null, weeklyResetsAt: null, proMultiplier: seat, note: `seat set on the Settings page${note ? `: ${note}` : ''}` }) + '\n');
    marked.push(runs);
  }
  return { entry, marked };
}
