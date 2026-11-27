// Draft 20261125-160000 (both platforms; the iOS draft folder holds the same file): the MUI section [Req: REQ-011, REQ-012].
// Rebuilds draft.csv, requirements.md, spec.json, update-plan.md and phases.json in this folder from the approved table
// (v3 on both platforms) plus the MUI rows for the languages of library/pdr/product.json › mui (spec-casebook
// references/mui.md): Android one APK translation row and one truncation walk per language, iOS one walk per language.
// Run: node library/pdr/aigc-watermark/<platform>/drafts/20261125-160000/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261125-160000';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const FEATURE_DIR = dirname(TABLE);
const ios = PLATFORM === 'ios';

const product = JSON.parse(readFileSync(join(FEATURE_DIR, '..', 'product.json'), 'utf8'));
type Lang = { tag: string; name: string; code: string };
const LANGS: Lang[] = product.mui.languages.filter((l: any) => l.code !== product.mui.base);
const RTL: string[] = product.mui.rtl ?? [];

const R_TR = 'R-057', R_TC = 'R-058';
const REQS = 'REQ-011; REQ-012';
// row IDs the walk follows, per platform
const T = ios
  ? { row: 'TC-001', info: 'TC-004', got: 'TC-005', music: 'TC-054', musicCancel: 'TC-055', exp: 'TC-083', expCancel: 'TC-084', musicOnce: 'TC-126', expOnce: 'TC-127', reset: 'TC-008', last: 127 }
  : { row: 'TC-001', info: 'TC-003', got: 'TC-004', music: 'TC-054', musicCancel: 'TC-055', exp: 'TC-084', expCancel: 'TC-085', musicOnce: 'TC-128', expOnce: 'TC-129', reset: 'TC-008', last: 129 };
const FIRST_ID = T.last + 1;
const num = (lines: string[]) => lines.map((s, i) => `${i + 1}. ${s}`).join('\n');

// ---- the walk: every screen of the feature, by the rows that already reach it; nothing is generated or exported ----
const pre = (L: Lang) => num([
  `App language set to ${L.name} (\`launch --lang ${L.code}\`)`,
  `After the row a plain \`launch\`${ios ? '' : ' (`locale reset`)'} restores the language`,
  ios ? 'Any tier (Launcher › Pink › ☰ › [0] IAP), with at least 6 credits' : 'Signed in with the Free or the Pro test account (fixtures.md), with at least 6 credits',
  'Menu › Settings › 「Remove AIGC Watermark」 is Off',
  `Neither 「Don’t show again」 ticked on this install: the MUI phase runs before ${T.musicOnce} and ${T.expOnce}${ios ? '' : `, or after the reset of ${T.reset}`}`,
  `The project with AI Anime content of ${T.exp}`,
]);

const steps: [string, string][] = [
  // [action, English strings the step's screen shows]
  ['Open Home › ☰ Menu', ''],
  [`Scroll to 「Settings」 and read the 「Remove AIGC Watermark」 row (${T.row})`, 'Settings row: 「Remove AIGC Watermark」 beside its ⓘ and switch'],
  [`Tap the ⓘ beside the row and read the sheet (${T.info})`, 'Info sheet: 「AIGC Watermark」, 「Depending on applicable laws and regulations, you may need to label or watermark AI-generated content before sharing it publicly. This feature is provided to help you meet those requirements.」, 「Got it」'],
  [`Tap 「Got it」 (${T.got})`, ''],
  ['Open AI Music Generator', ''],
  ['Type a short description', ''],
  [`Tap 「Generate for ◆ 6」 and read the dialog (${T.music})`, `Music dialog: 「AIGC Watermark」, 「Your generated music will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, 「Don’t show again」, 「Cancel」, 「Generate」${ios ? '' : ' (no dialog on Android so far, DRA262611P0229: record it and go on)'}`],
  [`Tap 「Cancel」 (${T.musicCancel}: nothing is generated, no credits taken)`, ''],
  ['Open the project with AI Anime content', ''],
  [`Tap 「Export」 and read the dialog (${T.exp})`, 'Export dialog: 「AIGC Watermark」, 「Your exported file will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, 「Don’t show again」, 「Cancel」, 「Export」'],
  [`Tap 「Cancel」 (${T.expCancel})`, ''],
];
const walk = num(steps.map(([a]) => a));
const checkList = steps.filter(([, s]) => s).map(([, s]) => s);

const script = (L: Lang) => ({
  CHT: 'traditional characters, Taiwan wording', CHS: 'simplified characters', PTB: 'Brazilian Portuguese', ESM: 'Mexican Spanish',
  ESP: 'Spanish of Spain', NOR: 'Norwegian Bokmål',
} as Record<string, string>)[L.tag];
const TERMS = 'The feature name and the terms (AIGC Watermark, Remove AIGC Watermark, Don’t show again) read the same on every screen; 「Menu > Settings」 in both dialog bodies uses the words the Menu and Settings screens show in that language';
const translationLines = (L: Lang) => {
  const sc = script(L);
  return [
    `Every string shows in ${L.name}${sc ? ` (${sc})` : ''} and says what the English says`,
    'No string is left in English, except 「AIGC」 (an acronym, may stay as is)',
    'No string shows a key, a placeholder (%@, %s, {0}) or another language',
    TERMS,
    'No translation sheet (REQ-011): a string that only seems off is a translation doubt in the run\'s mui-doubts.md, not a fail',
  ];
};
const truncationLines = (L: Lang) => [
  'Every string on every screen of the walk shows in full: none ends in 「…」, is cut at an edge or loses a line',
  'No string overlaps another element or runs out of its row, sheet, checkbox, button or dialog',
  'The Settings row keeps its ⓘ right after the text and its switch at the right edge, on the same line or wrapped, never pushed off the screen',
  'The dialog buttons (「Cancel」 and 「Generate」 / 「Export」) keep their size and place, side by side or stacked as in English, and the checkbox label stays beside its box',
  'Longest strings first: the info sheet body, the two dialog bodies, 「Remove AIGC Watermark」 in the Settings row',
  ...(RTL.includes(L.tag) ? [`${L.name} is right-to-left: text runs from the right, the switch and ⓘ mirror, and no string is clipped at the left edge`] : []),
];

const newRows: string[][] = [];
let n = FIRST_ID;
if (!ios) {
  newRows.push([`TC-${n++}`, 'MUI', num([
    'The APK of the build under test in `~/.casebook/android/apks/<build>/` (the one installed for the run)',
    '`mui.json` names the feature\'s string resources (`android_prefixes`: aigc_watermark, setting_page_remove_aigc_watermark)',
  ]), num([
    'Run `node scripts/mui-strings.ts pdr/aigc-watermark --apk <build dir> --out <run dir>/mui`',
    'Read every string of `mui-strings.json` in each language against its English',
  ]), num([
    `Each of the ${LANGS.length} languages (${LANGS.map(l => l.tag).join(', ')}) has its own text for every string of the feature (the Settings row, the info sheet, the export dialog, the music dialog): none shows the English default or another locale's text`,
    'The music dialog body 「Your generated music will include an AIGC watermark…」 is in the APK at all (2611231 has none: DRA262611P0229, cited not refiled)',
    'No string is left identical to English, except 「AIGC」',
    'Placeholders and line breaks match the English in every language (the dialog bodies hold a line break)',
    'Each translation says what the English says, in that language\'s script and regional wording (CHT traditional and Taiwan, CHS simplified, PTB Brazilian, ESM Mexican)',
    TERMS,
    'No translation sheet (REQ-011): a string that only seems off is a translation doubt in mui-doubts.md, not a fail',
  ]), 'P2', `${R_TR}; ${REQS}`, 'MUI, all languages from the APK (no phone, no credits). The phone rows below check only truncation.', 'new', 'REQ-011: MUI translations read from the build']);
}
LANGS.forEach(L => {
  const id = `TC-${n++}`;
  if (ios) newRows.push([id, 'MUI', pre(L), walk, num([...translationLines(L), ...truncationLines(L), ...checkList]),
    'P2', `${R_TR}; ${R_TC}; ${REQS}`, `MUI ${L.tag} (${L.code}). One \`texts\` read and screenshot per screen; nothing generated or exported (both dialogs end in 「Cancel」).`, 'new', 'REQ-011: MUI walk per language (translation and truncation)']);
  else newRows.push([id, 'MUI', pre(L), walk, num([...truncationLines(L), ...checkList]),
    'P2', `${R_TC}; ${REQS}`, `MUI ${L.tag} (${L.code}). Truncation only (translations come from the APK, TC-${FIRST_ID}); one \`texts\` read and screenshot per screen; nothing generated or exported.`, 'new', 'REQ-011: MUI truncation walk per language']);
});
const LAST_ID = n - 1;
const walkId = (i: number) => `TC-${FIRST_ID + (ios ? 0 : 1) + i}`;

// ---- draft.csv: every approved row unchanged, then the MUI section ----
const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8').replace(/^﻿/, ''));
const head = [...approved[0], 'Change', 'Change Reason'];
const rows = approved.slice(1).filter(r => r.length > 1).map(r => [...r, 'unchanged', '']);
writeFileSync(join(DIR, 'draft.csv'), '﻿' + toCsv([head, ...rows, ...newRows]));

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const intro = `Draft ${DRAFT} [Req: REQ-011, REQ-012]: the MUI section (spec-casebook references/mui.md). Every PowerDirector feature is
tested in the ${LANGS.length} languages of \`library/pdr/product.json\` › \`mui\` besides English; there is no translation sheet, so
each translation is judged by the run and doubtful ones go to the eBug review. ${ios
  ? 'iOS reads translations on the phone (the app bundle cannot be read on the QA iPhone): one walk per language checks translation and truncation together.'
  : 'Android reads every translation from the build\'s APK (one row, no phone); the phone walks one row per language for truncation only.'}
The MUI rows are their own phase (phases.json \`MUI\`), never part of a full run. New: ${R_TR}, ${R_TC}; ${newRows.length} rows, TC-${FIRST_ID} – TC-${LAST_ID}.

`;
req = req.replace(/\n## Settings entry\n/, `\n${intro}## Settings entry\n`);
const section = `## MUI
- ${R_TR} [Req: REQ-011] Every user-facing string of the feature (the Settings row 「Remove AIGC Watermark」, the 「AIGC Watermark」 info sheet, the export dialog and the music dialog) shows in each language of the product list (${LANGS.map(l => l.tag).join(', ')}), in that language's own words with the English meaning, with no English (but 「AIGC」), key or placeholder left; 「Menu > Settings」 in the dialogs names the Menu and Settings as those screens do. No translation sheet: the run judges each string; doubtful ones are listed for the eBug review, not failed.${ios ? '' : ' Android reads them from the build (`mui-strings.ts`).'}
- ${R_TC} [Req: REQ-011] In each of those languages no string of the feature is truncated, clipped or overlapping, and the Settings row's ⓘ and switch and the dialogs' checkbox and buttons keep their size and place${RTL.length ? `; the right-to-left languages (${RTL.join(', ')}) run from the right` : ''}.

`;
req = req.replace(/\n## Open questions/, `\n${section}## Open questions`);
const addToTable = (heading: string, lines: string[]) => {
  const i = req.lastIndexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/); if (!m) throw new Error(`no table under ### ${heading}`);
  const at = i + m.index! + m[0].length - 1;
  req = req.slice(0, at) + '\n' + lines.join('\n') + req.slice(at);
};
addToTable('Variants', LANGS.flatMap((L, i) => [
  `| ${R_TR} | ${L.tag} (${L.name}) | ${ios ? walkId(i) : `TC-${FIRST_ID}`} |`, `| ${R_TC} | ${L.tag} (${L.name}) | ${walkId(i)} |`]));
addToTable('Request ledger coverage', [
  `| REQ-011 (table: MUI test in the ${LANGS.length} languages of the product list, no translation sheet) | ${R_TR}, ${R_TC} (TC-${FIRST_ID} – TC-${LAST_ID}) |`,
  `| REQ-012 (table: plan the MUI cases, 2026-11-25) | ${R_TR}, ${R_TC} |`,
]);
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- spec.json and update-plan.md ----
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/aigc-watermark', platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-25T08:00:00.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — AIGC Watermark (${PLATFORM}), draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change comes from the request ledger (REQ-011, REQ-012).

## Summary
- New: ${newRows.length} rows in a new last section **MUI** (TC-${FIRST_ID} – TC-${LAST_ID}) for the ${LANGS.length} languages of
  \`library/pdr/product.json\` › \`mui\`: ${ios
  ? 'one walk per language that checks translation and truncation together (the app bundle cannot be read on the QA iPhone).'
  : 'one row reads every translation from the build\'s APK (no phone, no credits), then one truncation walk per language on the phone.'}
- Modified: none. Removed: none.

## Requirements
- New ${R_TR} (translation) and ${R_TC} (truncation); \`### Variants\` gains a line per requirement × language.

## How the rows run
- The MUI rows are their own phase \`MUI\` in phases.json, run on request (string freeze, new languages, before
  release), never part of a full run.
- Each walk reaches the four screens the feature draws (Settings row, info sheet, music dialog, export dialog) by the
  rows that already do, one \`texts\` read and screenshot per screen. Both dialogs end in 「Cancel」: nothing is
  generated, exported or charged.
- One-way state: the walks need both 「Don’t show again」 unticked, so the phase runs before ${T.musicOnce} / ${T.expOnce}
  (the rows that tick them)${ios ? '; PowerDirector cannot be reinstalled on the QA iPhone, so once a box is ticked its dialog steps are Blocked test-data' : ` or after the reset of ${T.reset} (\`pm clear\`, then sign in with the phone's account)`}.
${ios ? '' : `- The music dialog does not show on Android so far (DRA262611P0229) and its text is not in build 2611231's APK: the
  walk records that and goes on; the APK row cites P0229 rather than filing it again.
`}- No translation sheet: the run judges each string (references/mui.md §3); doubtful translations go to the run's
  \`mui-doubts.md\` and the eBug review page's Translation doubts panel.

## Not added
- The AI label on images and videos: a picture (「AI」 in a frame), the same in every language; no text to translate.
- The paid / Free difference in the Settings list (「Remove Watermark」): that row is not this feature's string.
- The spoken clip 「This audio was generated by AI.」: removed for every language (REQ-009, R-055).
`);

// ---- phases.json: the earlier rounds as they were, plus the MUI phase (never part of a full run) ----
const prevFile = join(TABLE, 'drafts', manifest.draft ?? '20261123-152127', 'phases.json');
const prevPhases = existsSync(prevFile) ? JSON.parse(readFileSync(prevFile, 'utf8')) : null;
const muiPhase = {
  id: 'MUI', name: `MUI: ${LANGS.length} languages (${ios ? 'translation and truncation on the phone' : 'translations from the APK, truncation on the phone'})`,
  note: `REQ-011 (user, 2026-11-24). Run on request, never in a full run. One segment per language; every segment ends with a plain launch${ios ? '' : ' (locale reset)'}. Needs both 「Don’t show again」 unticked (before ${T.musicOnce} / ${T.expOnce}${ios ? '' : `, or after ${T.reset}`}). Doubtful translations go to mui-doubts.md (references/mui.md §3).`,
  segments: [
    ...(ios ? [] : [{ id: 'MUI-apk', name: 'Translations from the APK (no phone)', cases: [`TC-${FIRST_ID}`] }]),
    ...LANGS.map((L, i) => ({ id: `MUI-${L.tag}`, name: `${L.name} (${L.code})`, cases: [walkId(i)] })),
  ],
};
const phases = prevPhases
  ? { ...prevPhases, draft: DRAFT, phases: [...prevPhases.phases.filter((p: any) => p.id !== 'MUI'), muiPhase] }
  : { draft: DRAFT, current: ['MUI'], needs: {}, unavailable: {}, phases: [muiPhase] };
writeFileSync(join(DIR, 'phases.json'), JSON.stringify(phases, null, 2) + '\n');

// Chinese copy: start from the approved one, so only the new rows need translating (zh-copy.ts export / merge)
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json'], ['questions.zh-Hant.json', 'questions.zh-Hant.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${rows.length} approved rows + ${newRows.length} MUI rows → ${join(DIR, 'draft.csv')}`);
