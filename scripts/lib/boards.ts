// What the pages server knows about the library without opening a table: the navigation page's list (a few small
// files per table, each read once per change), which run plan a table's Progress tab shows, and which drafts are still open.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { readRecords } from './csv.ts';
import { LIBRARY, PLATFORMS, draftsDir, listFeatures, readManifest, tableDir } from './library.ts';
import { parseQuestions, readAnswers, readSettled } from './questions.ts';
import { bugStatus, isOpenStatus } from './ebug-status.ts';
import { readRegression } from './regression.ts';
import { atReading, readAtSources, readSuites, suiteOf } from './at-results.ts';
import { tableTr, trInfo } from './tr-info.ts';

const NAMES: Record<string, string> = { pdr: 'PowerDirector', phd: 'PhotoDirector' };
const names = (dir: string) => { try { return readdirSync(dir).sort(); } catch { return []; } };   // a missing folder, or a file where one was expected
const json = (file: string) => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; } };

/** A table's run plan: the newest RUN-PLAN and the newest draft with a phases.json. */
export function newestPlan(feature: string, platform: string): { md?: string; draft?: string } {
  const runs = join(tableDir(feature, platform), 'runs'), drafts = draftsDir(feature, platform);
  const md = names(runs).filter(n => /^RUN-PLAN-.*\.md$/.test(n)).at(-1);
  return { md: md && join(runs, md), draft: names(drafts).filter(n => existsSync(join(drafts, n, 'phases.json'))).at(-1) };
}

/** Drafts still waiting for a Save, oldest first: newer than the last one saved (ids sort by time; an older unsaved one was left behind). */
export function openDrafts(feature: string, platform: string): string[] {
  const m = readManifest(feature, platform), dir = draftsDir(feature, platform);
  const last = [m?.draft, ...(m?.history ?? []).map(h => h.draft)].filter(d => d && !d.startsWith('edit-')).sort().at(-1) ?? '';
  return names(dir).filter(n => n > last && existsSync(join(dir, n, 'draft.csv')));
}

export const hasDraft = (feature: string, platform: string, draft: string) => /^[\w.-]+$/.test(draft) && existsSync(join(draftsDir(feature, platform), draft, 'draft.csv'));

const runCount = (feature: string, platform: string) => {
  const dir = join(tableDir(feature, platform), 'runs');
  return names(dir).filter(n => { try { return statSync(join(dir, n)).isDirectory(); } catch { return false; } }).length;
};

// a file's reading, kept until the file changes: the navigation page asks on every view
const memo = new Map<string, { key: string; value: any }>();
// (`as`: what is read from it, where one file has several readings)
function byFile<T>(file: string, read: () => T, as = ''): T | null {
  let st; try { st = statSync(file); } catch { return null; }
  const key = `${st.mtimeMs}|${st.size}`, was = memo.get(as + file);
  if (was?.key === key) return was.value;
  const value = read(); memo.set(as + file, { key, value }); return value;
}

// a results.csv counted, each case at its newest result. MUI rows (Section MUI) are their own phase and their own
// column on the Dashboard (user, 2026-11-25): `mui` false leaves them out, true counts only them.
function tallyOf(csv: string, mui = false) {
  const latest = new Map<string, { at: number; result: string }>();
  for (const r of readRecords(readFileSync(csv, 'utf8'))) { const at = Date.parse(r['Recorded At']) || 0; if (r.ID && (r.Section === 'MUI') === mui && (latest.get(r.ID)?.at ?? -1) <= at) latest.set(r.ID, { at, result: r.Result ?? '' }); }
  const n = (re: RegExp) => [...latest.values()].filter(x => re.test(x.result)).length;
  return { total: latest.size, pass: n(/^pass/i), fail: n(/^fail/i), blocked: n(/^block/i) };
}

/** The table's latest run: the one whose results.csv changed last, each case counted at its newest result. */
export function lastRun(feature: string, platform: string) {
  const dir = join(tableDir(feature, platform), 'runs');
  // the newest run that holds anything but MUI rows (an MUI run is not the table's latest result)
  let csv = '', tally: ReturnType<typeof tallyOf> | null = null;
  for (const c of names(dir).map(n => join(dir, n, 'results.csv')).filter(existsSync).sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)) {
    const t = byFile(c, () => tallyOf(c));
    if (t?.total) { csv = c; tally = t; break; }
  }
  if (!csv) return null;
  const at = statSync(csv).mtime;
  return { id: csv.split('/').at(-2)!, at: at.toISOString(), live: Date.now() - at.getTime() < 20 * 60_000, ...tally };
}

/** What waits on a person: questions nobody answered, answers and new-case notes the agent has not applied. */
export function waiting(feature: string, platform: string, draft?: string) {
  const dir = draft ? join(draftsDir(feature, platform), draft) : tableDir(feature, platform);
  const questions = byFile(join(dir, 'requirements.md'), () => parseQuestions(readFileSync(join(dir, 'requirements.md'), 'utf8')).map(q => q.id)) ?? [];
  const answers = readAnswers(feature);
  const allNotes: any[] = byFile(join(tableDir(feature, platform), 'new-case-notes.json'), () => json(join(tableDir(feature, platform), 'new-case-notes.json'))?.notes ?? []) ?? [];
  const notes = allNotes.filter(n => n.status === 'open').length;
  // a question nobody answered and no filed eBug carries is still to be determined; one an eBug carries is filed
  // … and one a completed run determined (question-status.json) is settled too
  const filed = filedQuestions(feature, platform), settled = draft ? {} : readSettled(tableDir(feature, platform));
  const unanswered = questions.filter(id => !answers[id] && settled[id]?.state !== 'determined'), isFiled = (id: string) => !!filed[id] || settled[id]?.state === 'filed';
  // asked: every question and new-case note the table ever had, so the Dashboard tells 「none left」 (0) from 「never any」 (–)
  return { questions: unanswered.filter(id => !isFiled(id)).length, filed: unanswered.filter(isFiled).length, answers: questions.filter(id => answers[id]?.status === 'open').length, notes, asked: questions.length + allNotes.length };
}

// The app version a table was last tested on (user, 2026-11-25: the dashboard groups features by version, 16.9.0, not by
// build or TR): the highest version its runs name (run-state.md, "16.9.0 (2611231)" or "20.19.0.v2026…") or, for runs
// that name only a TR, that TR's line (lib/tr-info.ts). Three parts only; the build is left out on purpose.
const BUILD = /\b(\d+\.\d+\.\d+)(?:\s*\(\d{5,}\)|\.v?\d{5,})/g;
const verKey = (v: string) => v.split('.').map(n => n.padStart(6, '0')).join('.');
export function testedVersion(feature: string, platform: string): string {
  const dir = join(tableDir(feature, platform), 'runs'), found: string[] = [];
  for (const n of names(dir)) {
    if (n.startsWith('_')) continue;
    const file = join(dir, n, 'run-state.md');
    found.push(...(byFile(file, () => [...readFileSync(file, 'utf8').matchAll(BUILD)].map(m => m[1]), 'versions:') ?? []));
  }
  const tr = trInfo(tableTr(feature, platform))?.version?.match(/^\d+\.\d+\.\d+/)?.[0];
  if (tr) found.push(tr);
  return found.sort((a, b) => verKey(a).localeCompare(verKey(b))).at(-1) ?? '';
}

/** Where the Kanban roadmap puts the feature on this platform (`release.json` in the feature folder; user, 2026-11-26):
 *  the app version the Dashboard lists it under, and the roadmap items it covers. */
export function planned(feature: string, platform: string): { version: string; items: string[] } | null {
  const file = join(LIBRARY, feature, 'release.json');
  const v = (byFile(file, () => JSON.parse(readFileSync(file, 'utf8')), 'release:') as Record<string, any> | undefined)?.[platform];
  const m = String(typeof v === 'string' ? v : v?.version ?? '').match(/^v?(\d+)\.(\d+)(?:\.(\d+))?$/);
  return m ? { version: `${m[1]}.${m[2]}.${m[3] ?? '0'}`, items: Array.isArray(v?.items) ? v.items.map(String) : [] } : null;
}
/** The GM date of each app version of a product, per platform (`library/<product>/releases.json`, from the Kanban
 *  roadmap; user, 2026-11-26). */
export function releases(product: string): { platform: string; version: string; gm: string }[] {
  const file = join(LIBRARY, product, 'releases.json');
  return (byFile(file, () => JSON.parse(readFileSync(file, 'utf8')).releases, 'releases:') as any[] | undefined) ?? [];
}

/** The table's latest full run with a build: its date and the build ("16.9.0 (2611231)"), a detail under the version. */
const NOT_FULL = /design|mui|recheck|verify|check/i;
export function lastTested(feature: string, platform: string): { date: string; build: string } | null {
  const dir = join(tableDir(feature, platform), 'runs');
  let dated: { date: string; build: string } | null = null;   // the newest full run, when none names a build
  for (const n of names(dir).reverse()) {
    if (n.startsWith('_') || NOT_FULL.test(n) || !existsSync(join(dir, n, 'results.csv'))) continue;
    dated ??= { date: n.match(/^\d{4}-\d\d-\d\d/)?.[0] ?? '', build: '' };
    const file = join(dir, n, 'run-state.md');
    const build = byFile(file, () => readFileSync(file, 'utf8').match(/\b(\d+\.\d+\.\d+)(?:\s*\((\d{5,})\)|\.(v?\d{5,}))/), 'build:') ?? null;
    if (build) return { date: n.match(/^\d{4}-\d\d-\d\d/)?.[0] ?? '', build: `${build[1]} (${build[2] ?? build[3]})` };
  }
  return dated?.date ? dated : null;
}

/** The approved table's rows without its MUI section, and the MUI rows beside them (cases.csv, read once per change). */
export function caseCounts(feature: string, platform: string): { cases: number; mui: number } | null {
  const csv = join(tableDir(feature, platform), 'cases.csv');
  return byFile(csv, () => { const rows = readRecords(readFileSync(csv, 'utf8')).filter(r => r.ID), mui = rows.filter(r => r.Section === 'MUI').length; return { cases: rows.length - mui, mui }; });
}

/** How many of the approved table's cases (MUI left out) have a Pass, Fail or Blocked result from any run on a device
 *  (user, 2026-11-26: a version's header says how many of the cases created have been run). A case that only an older
 *  run reached still counts; one removed from the table since does not. */
export function ranCases(feature: string, platform: string): number {
  const csv = join(tableDir(feature, platform), 'cases.csv'), dir = join(tableDir(feature, platform), 'runs');
  const ids = byFile(csv, () => readRecords(readFileSync(csv, 'utf8')).filter(r => r.ID && r.Section !== 'MUI').map(r => r.ID), 'ids:') ?? [];
  const ran = new Set<string>();
  for (const n of names(dir)) {
    if (n.startsWith('_')) continue;
    const c = join(dir, n, 'results.csv');
    for (const id of byFile(c, () => [...new Set(readRecords(readFileSync(c, 'utf8')).filter(r => r.ID && r.Section !== 'MUI' && /^(pass|fail|block)/i.test(r.Result ?? '')).map(r => r.ID))], 'ran:') ?? []) ran.add(id);
  }
  return ids.filter(id => ran.has(id)).length;
}

/** The eBugs filed from a table's runs (its batches' filed_bugcodes.json), in three kinds that never overlap: `mui`
 *  (a `MUI:` line in the Note or the [MUI] tag, mui.md §4), `ui` ([UI] bugs: what the Design column counts) and `fn`
 *  (everything else: Functional and [UX]). Each with the status eCL gave at the last refresh (lib/ebug-status.ts), else
 *  the status read back when it was filed. */
type Filed = { code: string; kind: 'fn' | 'ui' | 'mui'; filedStatus: string; text: string };
export function filedBugs(feature: string, platform: string): Filed[] {
  const dir = join(tableDir(feature, platform), 'ebugs'), all = new Map<string, Filed>();
  for (const b of names(dir)) {
    const file = join(dir, b, 'filed_bugcodes.json');
    const list = byFile(file, () => { const j = json(file); return [...(j?.bugs ?? []), ...(j?.meta?.later_filings ?? [])].filter((x: any) => x?.bugcode).map((x: any): Filed => {
      const short = String(x.short ?? ''), desc = String(x.desc ?? '');
      const kind = /(^|\n)MUI:/.test(desc) || /\[MUI\]/.test(short) ? 'mui' : x.problem_type === 'UI' || /\[UI\]/.test(short) ? 'ui' : 'fn';
      return { code: String(x.bugcode), kind, filedStatus: String(x.status ?? ''), text: `${short}\n${desc}` };
    }); }) ?? [];
    for (const x of list) if (!all.has(x.code) || x.text.length > 1) all.set(x.code, all.has(x.code) && !x.text.trim() ? all.get(x.code)! : x);
  }
  return [...all.values()];
}
/** Per kind: how many were filed and how many are still open; `checked` = the oldest eCL reading among them (0 = some
 *  were never refreshed and count by their status at filing). */
export function bugCounts(feature: string, platform: string) {
  const out = { fn: { filed: 0, open: 0 }, ui: { filed: 0, open: 0 }, mui: { filed: 0, open: 0 }, checked: Infinity as number };
  for (const b of filedBugs(feature, platform)) {
    const now = bugStatus(b.code);
    out[b.kind].filed++; if (isOpenStatus(now?.status ?? b.filedStatus)) out[b.kind].open++;
    out.checked = Math.min(out.checked, now?.at ?? 0);
  }
  if (out.checked === Infinity) out.checked = 0;
  return out;
}

/** Open questions a filed eBug already carries to its owner: Q-id → the eBug codes whose text, draft entry or dedupe
 *  line names it (user, 2026-11-25: a question is either determined or filed once a run completes, so a filed one no
 *  longer counts as open). Per platform, as eBugs are (Dedupe per OS). */
export function filedQuestions(feature: string, platform: string): Record<string, string[]> {
  const dir = join(tableDir(feature, platform), 'ebugs'), out: Record<string, Set<string>> = {};
  const add = (text: string, code: string) => { for (const q of text.match(/\bQ-\d+\b/g) ?? []) (out[q] ??= new Set()).add(code); };
  for (const b of filedBugs(feature, platform)) add(b.text, b.code);
  for (const b of names(dir)) {
    const filed = join(dir, b, 'filed_bugcodes.json');
    const iss = byFile(filed, () => Object.fromEntries((json(filed)?.bugs ?? []).flatMap((x: any) => [[x.iss, x.bugcode], [x.key, x.bugcode]]).filter(([k, v]: any[]) => k && v)), 'iss:') as Record<string, string> | null;
    for (const f of names(join(dir, b))) {
      const file = join(dir, b, f);
      // drafts: "## 3. ISS-AMDA-62 — …" sections, each filed as the code its ISS got
      if (iss && /_eBug_drafts_.*\.md$/.test(f)) for (const [id, text] of byFile(file, () => readFileSync(file, 'utf8').split(/^## /m).map(p => [p.match(/^\d+\.\s+([\w-]+)/)?.[1] ?? '', p]), 'drafts:') ?? []) { if (iss[id]) add(text, iss[id]); }
      // dedupe.txt: a line that starts with an existing ticket's code names the questions that ticket already covers
      // (the code first, or the question first: "Q-17 / O-12⇥DRA262608-0072⇥…")
      if (f === 'dedupe.txt') for (const l of byFile(file, () => readFileSync(file, 'utf8').split('\n').filter(l => !l.startsWith('#') && /\bQ-\d+\b/.test(l) && /\b[A-Z]{3}\d{6}[P-]\d{4}\b/.test(l)), 'dedupe:') ?? []) for (const c of l.match(/\b[A-Z]{3}\d{6}[P-]\d{4}\b/g)!) add(l, c);
    }
  }
  return Object.fromEntries(Object.entries(out).map(([q, c]) => [q, [...c].sort()]));
}

/** The MUI phase: its newest run's tally; `due` when the feature has languages to test (mui.json) and no MUI run yet. */
export function muiStatus(feature: string, platform: string) {
  const dir = join(tableDir(feature, platform), 'runs');
  for (const n of names(dir).reverse()) {
    const csv = join(dir, n, 'results.csv'), state = join(dir, n, 'run-state.md');
    if (n.startsWith('_') || !existsSync(csv) || !byFile(state, () => /^# Run state — MUI\b/m.test(readFileSync(state, 'utf8')), 'mui:')) continue;
    const t = byFile(csv, () => tallyOf(csv, true), 'mui:');
    if (t?.total) return { run: n, ...t };
  }
  const langs = byFile(join(LIBRARY, feature, 'mui.json'), () => json(join(LIBRARY, feature, 'mui.json'))?.languages);
  return langs === 'product' || (Array.isArray(langs) && langs.length) ? { due: true } : null;
}

/** The design check: screens measured (the newest measure of each over every run) and how many differ (a settled bug),
 *  hold a question or are not reviewed yet; `due` when a plan exists and nothing is captured. */
export function designStatus(feature: string, platform: string) {
  const table = tableDir(feature, platform), dir = join(table, 'runs'), seen = new Map<string, { at: string; state: string }>();
  for (const n of names(dir)) {
    const cf = join(dir, n, 'design', 'compare.json'), ff = join(dir, n, 'design', 'findings.json');
    const screens = byFile(cf, () => (json(cf)?.screens ?? []).map((x: any) => ({ id: String(x.id), at: String(x.captured_at ?? '') }))) as { id: string; at: string }[] | null;
    if (!screens) continue;
    const found = byFile(ff, () => Object.fromEntries(Object.entries<any>(json(ff)?.screens ?? {}).map(([id, items]) => {
      const v = Object.values<any>(items ?? {}).map(i => i?.verdict);
      return [id, v.includes('bug') ? 'differs' : v.includes('question') ? 'question' : 'matches'];
    }))) as Record<string, string> | null;
    for (const x of screens) if ((seen.get(x.id)?.at ?? '') <= x.at) seen.set(x.id, { at: x.at, state: found ? found[x.id] ?? 'matches' : 'unreviewed' });
  }
  if (!seen.size) return existsSync(join(table, 'design', 'plan.json')) ? { due: true } : null;
  const n = (k: string) => [...seen.values()].filter(x => x.state === k).length;
  return { screens: seen.size, differs: n('differs'), question: n('question'), unreviewed: n('unreviewed') };
}

/** Each case of the approved table (MUI left out) at its newest result from any run (user, 2026-11-27): R1 passed 1, 2
 *  and failed 3, R2 re-ran 2 (Fail) and 3 (Blocked) → 1 Pass, 1 Fail, 1 Blocked. A record with no result or 「Not run」
 *  leaves the earlier one standing; a case removed from the table since is left out. Ties go to the later run folder.
 *  Results opens the same view as its 「Latest results」 run (results-page.ts). */
export function latestTally(feature: string, platform: string): { pass: number; fail: number; blocked: number; other: number } | null {
  const csv = join(tableDir(feature, platform), 'cases.csv'), dir = join(tableDir(feature, platform), 'runs');
  const ids = new Set(byFile(csv, () => readRecords(readFileSync(csv, 'utf8')).filter(r => r.ID && r.Section !== 'MUI').map(r => r.ID), 'ids:') ?? []);
  const best = new Map<string, { at: number; result: string }>();
  for (const n of names(dir).sort()) {
    if (n.startsWith('_')) continue;
    const c = join(dir, n, 'results.csv');
    const recs = byFile(c, () => readRecords(readFileSync(c, 'utf8')).filter(r => r.ID && r.Section !== 'MUI' && r.Result && !/^not run/i.test(r.Result)).map(r => ({ id: r.ID, at: Date.parse(r['Recorded At']) || 0, result: r.Result })), 'latest:') ?? [];
    for (const r of recs) if (ids.has(r.id) && (best.get(r.id)?.at ?? -1) <= r.at) best.set(r.id, { at: r.at, result: r.result });
  }
  if (!best.size) return null;
  const n = (re: RegExp) => [...best.values()].filter(x => re.test(x.result)).length;
  const pass = n(/^pass/i), fail = n(/^fail/i), blocked = n(/^block/i);
  return { pass, fail, blocked, other: best.size - pass - fail - blocked };
}

/** A table's AT side (user, 2026-11-27): its Jenkins job (at.json), the latest build read from it and its [AT] eBugs
 *  (lib/at-results.ts, this computer's last refresh). */
function atOf(feature: string, platform: string) {
  const src = readAtSources(feature)[platform], r = atReading(feature, platform);
  const bugs = r?.bugs ? { filed: r.bugs.length, open: r.bugs.filter(b => isOpenStatus(b.status)).length, list: r.bugs.map(b => ({ ...b, open: isOpenStatus(b.status) })) } : null;
  return { at_job: src ? { url: src.jenkins ?? '', kind: src.source ?? null, suite: src.folder ? src.suite ?? 'core' : null, folder: src.folder ?? null } : null, at_result: src ? r?.result ?? null : null, at_error: src ? r?.error ?? null : null, at_read: r?.at ?? 0, at_bugs: bugs, at_bugs_error: r?.bugs_error ?? null };
}

export function listBoards() {
  const products = new Map<string, { id: string; name: string; releases: unknown[]; at_suites: unknown[]; features: unknown[] }>();
  for (const id of listFeatures()) {
    const product = id.split('/')[0];
    if (!products.has(product)) products.set(product, { id: product, name: json(join(LIBRARY, product, 'product.json'))?.name ?? NAMES[product] ?? product, releases: releases(product), at_suites: PLATFORMS.flatMap(pl => readSuites(product, pl).map(x => suiteOf(product, pl, x))), features: [] });
    let title = '';
    // a table being saved right now (a half-written file) sits out this view; the rest of the list still shows
    const platforms = PLATFORMS.filter(p => existsSync(tableDir(id, p))).flatMap(platform => { try {
      const m = readManifest(id, platform), drafts = openDrafts(id, platform), plan = newestPlan(id, platform);
      title ||= m?.title ?? json(join(draftsDir(id, platform), drafts.at(-1) ?? '', 'spec.json'))?.title ?? '';
      const n = m ? caseCounts(id, platform) : null, plannedFor = planned(id, platform), ran = testedVersion(id, platform);
      return [{ platform, version: m?.version ?? null, cases: n?.cases ?? m?.cases ?? null, mui_cases: n?.mui ?? 0, ran_cases: m ? ranCases(id, platform) : 0, approved_at: m?.approved_at ?? null, drafts, plan: !!(plan.md && plan.draft), runs: runCount(id, platform), last: lastRun(id, platform), latest: m ? latestTally(id, platform) : null, waiting: waiting(id, platform, m ? undefined : drafts.at(-1)), app: plannedFor?.version || ran, ran, items: plannedFor?.items ?? [], tested: lastTested(id, platform), at: readRegression(id)[platform] ?? null, ...atOf(id, platform),
        bugs: bugCounts(id, platform), mui: m ? muiStatus(id, platform) : null, design: designStatus(id, platform) }];
    } catch { return []; } }).filter(p => p.version || p.drafts.length);
    if (platforms.length) products.get(product)!.features.push({ id, title: title || id.split('/')[1], platforms });
  }
  // The product's suite row holds only the cases the casebook did not create (user, 2026-11-27): the folders of the
  // tables converted to AT and linked to it (at.json "folder") are their own rows, so they leave the suite's figures.
  for (const pr of products.values()) for (const su of pr.at_suites as any[]) {
    const r = su.result; if (!r?.folders) continue;
    const linked = (pr.features as any[]).flatMap(f => f.platforms.filter((p: any) => p.platform === su.platform && p.version && p.at && p.at.state !== 'na' && p.at_job?.folder && p.at_job.suite === su.id && r.folders[p.at_job.folder])
      .map((p: any) => ({ folder: p.at_job.folder, title: f.title, ...r.folders[p.at_job.folder] })));
    if (!linked.length) continue;
    const less = (k: 'total' | 'pass' | 'fail' | 'skip') => r[k] - linked.reduce((n: number, x: any) => n + x[k], 0);
    const total = less('total'), pass = less('pass'), fail = less('fail'), skip = less('skip');
    su.result = { ...r, total, pass, fail, skip, blocked: Math.max(0, total - pass - fail - skip), excluded: linked.map((x: any) => ({ folder: x.folder, title: x.title, total: x.total })), launch_total: r.total };
  }
  return [...products.values()].filter(p => p.features.length);
}
