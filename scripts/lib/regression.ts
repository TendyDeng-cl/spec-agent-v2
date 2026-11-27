// Which tables are in the regression suite, i.e. converted to AT (automated test) (user, 2026-11-25), and which can
// never be converted (user, 2026-11-27: 「not AT-capable」, e.g. a flow that needs a person, a real purchase or a
// generation that automation cannot judge). The mark lives in library/<product>/<feature>/regression.json
// ({ "<platform>": { "since": "YYYY-MM-DD", "state"?: "na", "note"? } }; no state = in AT) and is committed, so every
// computer's Dashboard shows the same. A table without a mark is waiting for its conversion.
// Written by scripts/regression.ts and by the Dashboard's AT buttons (scripts/pages.ts, this computer only).
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { LIBRARY, assertIds, tableDir, writeJson } from './library.ts';

export type AtMark = { since: string; state?: 'na'; note?: string };
export type AtState = 'at' | 'na' | null;
const fileOf = (feature: string) => join(LIBRARY, feature, 'regression.json');
export function readRegression(feature: string): Record<string, AtMark> {
  try { return existsSync(fileOf(feature)) ? JSON.parse(readFileSync(fileOf(feature), 'utf8')) : {}; } catch { return {}; }
}
/** In the regression suite: marked, and not marked as not AT-capable. */
export const isAtMark = (m: AtMark | null | undefined) => !!m && m.state !== 'na';
/** Today in Taipei, the date a mark gets when none is given. */
export const taipeiToday = () => new Date(Date.now() + 8 * 3600_000).toISOString().slice(0, 10);

/** Mark a table as in regression (AT, 'at'), as not AT-capable ('na'), or take the mark off (null). */
export function setRegression(feature: string, platform: string, state: AtState, opts: { since?: string; note?: string } = {}): AtMark | null {
  assertIds(feature, platform);
  if (!existsSync(tableDir(feature, platform))) throw new Error(`No ${platform} table for ${feature}`);
  const since = opts.since ?? taipeiToday();
  if (!/^\d{4}-\d\d-\d\d$/.test(since)) throw new Error('since takes YYYY-MM-DD');
  const all = readRegression(feature);
  if (state) all[platform] = { since, ...(state === 'na' ? { state } : {}), ...(opts.note?.trim() ? { note: opts.note.trim() } : {}) }; else delete all[platform];
  if (Object.keys(all).length) writeJson(fileOf(feature), all); else rmSync(fileOf(feature), { force: true });
  return all[platform] ?? null;
}
