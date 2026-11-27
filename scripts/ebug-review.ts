// Build an eBug batch's review page from its draft file — the one generator for every batch (user, 2026-11-19).
// Usage: node scripts/ebug-review.ts <batch dir> [--drafts <file.md>] [--no-check]
//
//   <batch dir>  library/<product>/<feature>/<ios|android>/ebugs/<batch>/
//
// Steps, all automatic (ebug-tr-filer › references/review-page.md):
//  1. drafts_to_bodies.py turns the batch's `*_eBug_drafts_*.md` into upload/bodies.json and stages the files (with the
//     reviewer's decisions.md once it exists, so a filed batch's page shows what was filed).
//  2. check_ebug_format.py runs on that JSON (result in check.txt); a failing batch gets no page (--no-check skips).
//  3. The page is filled from scripts/ebug-review-page.tpl: one card per draft entry (Short Description, body, QA note,
//     images as thumbnails, log excerpts), the draft's Held / Already filed / Cited / Not raised tables, the run's
//     Blocked rows (results.csv of the run the drafts' **Source:** line names), the filing defaults of the newest
//     earlier filed batch (ebug-defaults.ts --before <batch>), and filed_bugcodes.json once the batch is filed.
//  4. Written next to the drafts as `<same name with _eBug_review_>.html`.
//
// A `## Translation doubts` table in the drafts (MUI, no translation sheet) becomes a panel where each doubt is Filed
// or judged Fine as is; the choices go into Copy decisions (spec-casebook references/mui.md §4).
//
// Optional `review.json` in the batch folder holds what the drafts do not say (all keys optional):
//   { "run": false (no run tally / Blocked rows), "tr": "TR261118-0074", "build": "2611181", "trNote": "…", "lede": "extra sentence(s)",
//     "why": { "ISS-…": "one line on the card" }, "related": { "ISS-…": "context line" } }
// Without it, the TR and build come from the drafts (the **Recheck…** line, else the H1 and **Source:** line).
import { execFileSync, spawnSync } from 'node:child_process';
import { PYTHON } from './lib/python.ts';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, relative, resolve } from 'node:path';
import { readRecords } from './lib/csv.ts';
import { ROOT } from './lib/library.ts';
import { toJpeg } from './lib/image.ts';

const args = process.argv.slice(2);
const opt = (n: string) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const dirArg = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--drafts');
if (!dirArg) { console.error('Usage: node scripts/ebug-review.ts <batch dir> [--drafts <file.md>] [--no-check]'); process.exit(2); }
const DIR = resolve(dirArg);
const rel = relative(join(ROOT, 'library'), DIR).split(/[\\/]/);
if (rel.length !== 5 || rel[3] !== 'ebugs') { console.error(`Not a batch folder (library/<product>/<feature>/<platform>/ebugs/<batch>): ${DIR}`); process.exit(2); }
const [product, feature, platform, , batch] = rel;

const draftsList = opt('--drafts') ? [resolve(opt('--drafts')!)] : readdirSync(DIR).filter(f => /_eBug_drafts_.*\.md$/.test(f)).map(f => join(DIR, f));
if (draftsList.length !== 1) { console.error(`Need exactly one *_eBug_drafts_*.md in ${DIR} (found ${draftsList.length}); pass --drafts`); process.exit(2); }
const DRAFTS = draftsList[0];
const md = readFileSync(DRAFTS, 'utf8');
const SKILLS = join(ROOT, '.claude', 'skills');

// 1–2. bodies.json and the format gate
const py = (script: string, a: string[]) => spawnSync(PYTHON, [script, ...a], { cwd: DIR, encoding: 'utf8', env: { ...process.env, PYTHONUTF8: '1' } });
const b2 = py(join(SKILLS, 'ebug-draft-generator/scripts/drafts_to_bodies.py'), [DRAFTS, '--out', 'upload/bodies.json', '--stage', 'upload/',
  ...(existsSync(join(DIR, 'decisions.md')) ? ['--decisions', 'decisions.md'] : [])]);
if (b2.status !== 0) { console.error(b2.stdout + b2.stderr); process.exit(1); }
type Body = { entry: string; iss: string; title: string; type: string; sev: string; belong: string; out: string; times: string;
  short: string; desc: string; files: string[]; images_dir: string; qa_note: string; ux: boolean | string };
const bodies: Record<string, Body> = JSON.parse(readFileSync(join(DIR, 'upload/bodies.json'), 'utf8'));
const first = Object.values(bodies)[0];
const pv = first?.short.match(/^(\S+) (\d+\.\d+\.\d+) -/);
if (!args.includes('--no-check') && pv) {
  // MUI entries (user, 2026-11-24): the feature's mui.json holds the language tags they may carry
  const mui = join(ROOT, 'library', product, feature, 'mui.json');
  const ck = py(join(SKILLS, 'ebug-tr-filer/scripts/check_ebug_format.py'), ['--product', pv[1], '--version', pv[2], '--upload-dir', 'upload',
    ...(existsSync(mui) ? ['--mui', mui] : []), 'upload/bodies.json']);
  const tail = (ck.stdout + ck.stderr).trim().split('\n').slice(-3).join('\n');
  writeFileSync(join(DIR, 'check.txt'), tail + '\n');
  if (ck.status !== 0) { console.error(ck.stdout + ck.stderr + '\nFormat check failed: no page built (fix the drafts, or --no-check).'); process.exit(1); }
}

// 3. what the drafts say
const extra = existsSync(join(DIR, 'review.json')) ? JSON.parse(readFileSync(join(DIR, 'review.json'), 'utf8')) : {};
// Optional `review.zh-Hant.json` (user, 2026-11-25): Traditional Chinese for what the page says ABOUT the drafts — lede,
// TR line, captions, each card's title / why / my read, the held and Blocked tables. The eBug text itself (Short
// Description and description as filed) is never translated. With it the page opens in 中文 and has an English switch.
// { "lede", "trNote", "cal", "gaps", "related", "entries": { "ISS-…": { "title", "why", "note" } },
//   "fixes": { "<item prefix before ' — '>": ["item", "outcome"] }, "blocked": { "TC-…": "why" } }
const zhFile = join(DIR, 'review.zh-Hant.json');
const zh = existsSync(zhFile) ? JSON.parse(readFileSync(zhFile, 'utf8')) : null;
const h1 = (md.match(/^# (.+)$/m) || [, `${feature} eBug drafts`])[1]!;
const line = (label: string) => (md.match(new RegExp(`^\\*\\*${label}[^*]*:\\*\\*(.*)$`, 'm')) || [, ''])[1]!.trim();
const recheck = line('Recheck'), source = line('Source');
const version = pv?.[2] || (h1.match(/(\d+\.\d+\.\d+)/) || [, ''])[1]!;
const buildRe = /(\d+\.\d+\.\d+)\.(\d{6,7})/;
const build: string = extra.build || (recheck.match(buildRe) || [])[2] || (h1.match(/build (\d{6,7})/) || [])[1] || (source.match(/build (\d{6,7})/) || [])[1] || '';
const tr: string = extra.tr || (recheck.match(/TR\d{6}-\d{3,4}/) || source.match(/TR\d{6}-\d{3,4}/) || [''])[0];
const titlePart = h1.split(' — ')[0].trim();
const round = (basename(DRAFTS).match(/_eBug_drafts_[^_]*?-([A-Za-z0-9]+)_/) || [, batch])[1]!;
const device = (first?.desc.match(/^Device: (.+)$/m) || [, ''])[1]!;

// entry headers carry Report step (cases) and the class; the body JSON has the rest
const cases: Record<string, string[]> = {};
for (const m of md.matchAll(/^## \d+\. (ISS-[\w-]+) — [\s\S]*?\*\*Report step:\*\* ([^·\n]+)/gm)) cases[m[1]] = m[2].split(',').map(s => s.trim()).filter(Boolean);

// tables under the non-entry sections → the "Held, already filed, cited and not raised" list
const section = (title: RegExp) => { const m = md.match(new RegExp(`^## (${title.source})[^\\n]*\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))`, 'm')); return m ? m[2] : ''; };
const rows = (s: string) => s.split('\n').filter(l => /^\|/.test(l) && !/^\|\s*-/.test(l)).map(l => l.split('|').slice(1, -1).map(c => c.trim())).slice(1);
const fixes: [string, string][] = [];
for (const [re, label] of [[/Held/, 'HELD, NOT RE-VERIFIED'], [/Already filed/, 'ALREADY FILED — dedupe.txt only'], [/Cited/, 'CITED, NOT FILED'], [/Not raised/, 'NOT RAISED']] as [RegExp, string][]) {
  for (const r of rows(section(re))) if (r.length >= 2) fixes.push([`${r[0]} — ${r[1]}`, `${label} — ${r.slice(2).filter(Boolean).join(' · ')}`]);
}
const held = rows(section(/Held/)).map(r => r[0]);
// MUI with no translation sheet (user, 2026-11-24): translations the run judged odd, for the reviewer to decide
// | ID | Language | Screen | English | App shows | Why it seems off | Better wording |
const doubts = rows(section(/Translation doubts/)).filter(r => r.length >= 6)
  .map(([id, lang, screen, en, app, why, better]) => ({ id, lang, screen, en, app, why, better: better || '' }));

// the run's results: tally and Blocked rows
const runRel = (source.match(/`(library\/[^`]+\/runs\/[^`]+?)\/?`/) || [])[1];
let counts: Record<string, number> = {}, blocked: [string, string][] = [], nCases = 0;
if (extra.run !== false && runRel && existsSync(join(ROOT, runRel, 'results.csv'))) {
  const last = new Map<string, Record<string, string>>();
  for (const r of readRecords(readFileSync(join(ROOT, runRel, 'results.csv'), 'utf8'))) last.set(r.ID, r);
  for (const r of last.values()) counts[r.Result] = (counts[r.Result] || 0) + 1;
  nCases = last.size;
  blocked = [...last.values()].filter(r => r.Result === 'Blocked').map(r => [r.ID, `${r.Disposition || r.Needs || 'blocked'} — ${(r.Actual || '').slice(0, 240)}${(r.Actual || '').length > 240 ? '…' : ''}`]);
}

// filing defaults and this batch's own filing
let DEF: any = { found: false };
try { DEF = JSON.parse(execFileSync('node', [join(ROOT, 'scripts/ebug-defaults.ts'), `${product}/${feature}`, platform, '--json', '--before', batch], { encoding: 'utf8' })); } catch { /* no earlier filed batch */ }
const filedJson = join(DIR, 'filed_bugcodes.json');
let filed: any = null;
if (existsSync(filedJson)) {
  const fj = JSON.parse(readFileSync(filedJson, 'utf8'));
  filed = { meta: { tag: 'AIAgent', method: 'API', ...fj.meta },
    bugs: Object.fromEntries(fj.bugs.map((x: any) => [x.iss, { code: x.bugcode, sev: x.severity, belong: x.belong, files: (x.attachments || []).length }])) };
}

// images as small inline copies (sips on macOS, mupdf elsewhere: lib/image.ts; else the file as is)
const tmp = mkdtempSync(join(tmpdir(), 'ebug-review-'));
const thumb = (p: string) => {
  const out = join(tmp, 't.jpg');
  const made = process.platform === 'darwin'
    ? spawnSync('sips', ['-Z', '900', '-s', 'format', 'jpeg', '-s', 'formatOptions', '60', p, '--out', out], { stdio: 'ignore' }).status === 0 && existsSync(out)
    : toJpeg(p, out, { max: 900, quality: 60 });
  const buf = made ? readFileSync(out) : readFileSync(p);
  const mime = made ? 'image/jpeg' : (/\.png$/i.test(p) ? 'image/png' : 'image/jpeg');
  return `data:${mime};base64,${buf.toString('base64')}`;
};
const filingDir = join(DIR, 'upload_filing');
const entries = Object.values(bodies).map(b => {
  const pm = b.belong === 'PM';
  const imgs = b.files.filter(f => /\.(jpe?g|png)$/i.test(f)).map(f => {
    const p = filed && existsSync(join(filingDir, f)) ? join(filingDir, f) : join(b.images_dir, f);
    return { src: thumb(p), name: f };
  });
  const logs = b.files.filter(f => f.endsWith('.txt')).map(f => ({ name: f, text: readFileSync(join(b.images_dir, f), 'utf8') }));
  let related: string = extra.related?.[b.iss] || 'No same-OS duplicate in the dedupe search (dedupe.txt).';
  if (logs.length) related += ` Logcat excerpt attached: ${logs.map(l => l.name).join(', ')} — text under 「Log」.`;
  const ux = b.ux === true || b.ux === 'True';
  return { n: +b.entry, iss: b.iss, title: b.title, type: ux ? 'UX' : b.type, sev: +b.sev, belong: b.belong, out: +b.out, times: +b.times,
    short: b.short, desc: b.desc, note: b.qa_note, why: extra.why?.[b.iss] || `${pm ? 'PM decision' : 'Defect'}: ${b.title}`,
    imgs, cases: cases[b.iss] || [], dup: null, related, logs, action: 'file', kind: pm ? 'pm' : 'defect',
    zh: zh?.entries?.[b.iss] ? { ...zh.entries[b.iss], related: extra.related?.[b.iss] ? '' : (zh.related || '') } : null };
});
rmSync(tmp, { recursive: true, force: true });

// 4. fill the template
const pl = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
const esc = (s: string) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const defects = entries.filter(e => e.kind === 'defect'), pms = entries.filter(e => e.kind === 'pm');
const F = (l: typeof entries) => l.map(e => `F-${e.n}`).join(', ') || 'none';
const prevTr = DEF.found ? DEF.tr : '';
const trNote = extra.trNote || (prevTr && prevTr !== tr ? `${tr}, build ${version}.${build}: the build these cards were verified on. Earlier batches went on ${prevTr}, so "Same TR" does not apply — confirm.` : `${tr || 'TR'} — build ${version}.${build}, confirm; read the TR header before filing.`);
const lede = [
  `These cards are the eBug entries exactly as they would be filed (${relative(DIR, DRAFTS)}). For each one, set file or hold, severity, owner and type, then use Copy decisions and paste the result back.`,
  filed ? `Filed: ${Object.keys(filed.bugs).length} bugs (filed_bugcodes.json).` : 'Nothing has been filed, uploaded or commented.',
  held.length ? `${held.length} finding(s) are held, not drafted for filing (${held.join(', ')}); they are listed below with the reason.` : '',
  nCases ? `Run: ${counts.Pass || 0} Pass, ${counts.Fail || 0} Fail, ${counts.Blocked || 0} Blocked of ${nCases}.` : '',
  'Failure- and charge-related cards show their logcat excerpt under 「Log」.',
  extra.lede || '',
].filter(Boolean).join(' ');
const fact = (k: string, v: string, id = '', need = false) => `<div><dt>${esc(k)}</dt><dd${need ? ' class="need"' : ''}${id ? ` id="${id}"` : ''}>${esc(v)}</dd></div>`;
const facts = [fact('Version', version), fact('Build No', build), device ? fact('Device', device) : '',
  fact('Account', 'needed', 'f-acct', true), fact('TRCode', `${tr}? confirm`, 'f-tr', true)].join('');
const data = {
  meta: { key: `${product}-${feature}-${platform}-${batch}`, cases: nCases, round, trNote },
  entries: entries.map(({ kind, ...e }) => e), blocked, counts, rechecks: [], fixes, doubts,
  defaults: DEF.found ? { ...DEF, from: `the ${feature} ${platform} batch ${DEF.from} (filed ${DEF.filed_on})`, tr, tr_prev: DEF.tr, version, build } : { found: false },
  filed,
  zh: zh ? { lede: zh.lede || '', trNote: zh.trNote || '', cal: zh.cal || '', gaps: zh.gaps || '', fixes: zh.fixes || {}, blocked: zh.blocked || {},
    h1: `${titlePart} — 第 ${round} 輪，版本 ${version}.${build}：${entries.length} 張卡片（產品缺陷 ${defects.length}、待 PM 決定 ${pms.length}）` } : null,
};
const fill: Record<string, string> = {
  TITLE: esc(`${titlePart.replace(/\s*\(.*?\)\s*/g, ' ').trim()} ${round} eBugs`),
  EYEBROW: esc(`pdr-spec-casebook · ${product}/${feature} · ${platform} · eBug filing review`),
  H1: esc(`${titlePart} — round ${round}, build ${version}.${build}: ${pl(entries.length, 'card')} (${pl(defects.length, 'defect')}, ${pl(pms.length, 'PM decision')})`),
  LEDE: esc(lede), FACTS: facts, TR: esc(tr), TR_NOTE: esc('The TR every card is filed on; the line below says where it comes from.'),
  ACCT_NOTE: esc(DEF.found ? 'Becomes Creator on every ticket.' : 'No earlier filed batch: enter the ECL login that becomes Creator on every ticket.'),
  CAL: esc(`Defects (${F(defects)}): owner RD. PM decisions (${F(pms)}): BugBelong PM. Severities are the drafts' proposals.`),
  GAPS: esc(blocked.length ? `${blocked.length} cases are Blocked with no verdict.` : 'No Blocked cases in the run.'),
};
let html = readFileSync(join(ROOT, 'scripts/ebug-review-page.tpl'), 'utf8').replace(/^<!--[^\n]*-->\n/, '');
for (const [k, v] of Object.entries(fill)) html = html.split(`{{${k}}}`).join(v);
html = html.replace('/*DATA*/', JSON.stringify(data).replace(/</g, '\\u003c'));
const out = join(DIR, basename(DRAFTS).replace('_eBug_drafts_', '_eBug_review_').replace(/\.md$/, '.html'));
writeFileSync(out, html);
console.log(`wrote ${relative(ROOT, out)} (${Math.round(html.length / 1024)} KB): ${entries.length} cards, ${held.length} held, ${fixes.length} listed below, build ${version}.${build}, ${tr || 'no TR found'}`);
