// Draft 20261126-100000 (both platforms; the iOS draft folder holds the same file): the MUI section [Req: REQ-002].
// Rebuilds draft.csv, requirements.md, spec.json and update-plan.md in this folder from the approved table (v1 on both
// platforms) plus the MUI rows for the languages of library/pdr/product.json › mui (spec-casebook references/mui.md):
// Android one APK translation row and one truncation walk per language, iOS one walk per language.
// No phases.json: this feature has no run plan yet; update-plan.md says how the MUI phase is laid out when one is made.
// Run: node library/pdr/recent-task-model-info/<platform>/drafts/20261126-100000/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261126-100000';
const FEATURE = 'pdr/recent-task-model-info';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const FEATURE_DIR = dirname(TABLE);
const ios = PLATFORM === 'ios';

const product = JSON.parse(readFileSync(join(FEATURE_DIR, '..', 'product.json'), 'utf8'));
type Lang = { tag: string; name: string; code: string };
const LANGS: Lang[] = product.mui.languages.filter((l: Lang) => l.code !== product.mui.base);
const RTL: string[] = product.mui.rtl ?? [];

const R_TR = 'R-080', R_TC = 'R-081';
const REQ = 'REQ-002';
// row IDs the walk follows (the same on both platforms: rows TC-001 – TC-043 are shared)
const T = {
  artwork: 'TC-001', i2vDone: 'TC-004', i2vView: 'TC-005', longest: 'TC-011', picker: 'TC-015', t2v: 'TC-002', t2vDone: 'TC-017', t2vView: 'TC-018',
  tmpl: 'TC-029', cine: 'TC-031', others: 'TC-032', tti: 'TC-033', processing: 'TC-003', manage: 'TC-035', tick: 'TC-036', selectAll: 'TC-037',
  error: 'TC-038', nsfw: 'TC-039', reopen: 'TC-040',
};
const NOTICE = '「Tasks are stored on the cloud for 1 Year. Please download any you want to keep in local storage.」';
const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8').replace(/^﻿/, ''));
const approvedRows = approved.slice(1).filter(r => r.length > 1);
const LAST = Math.max(...approvedRows.map(r => +r[0].replace(/\D/g, '')));
const FIRST_ID = LAST + 1;
const tc = (n: number) => `TC-${String(n).padStart(3, '0')}`;
const num = (lines: string[]) => lines.map((s, i) => `${i + 1}. ${s}`).join('\n');
const SHORT = '「View」, 「Manage」, 「Select All」, 「Deselect All」, 「Cancel」, 「Delete」, 「Retry」, 「View Details」, 「processing...」 and the time-left line';

// ---- the walk: every screen the feature's rows reach, by the rows that already reach it; no task is generated or deleted ----
const pre = (L: Lang) => num([
  `App language set to ${L.name} (\`launch --lang ${L.code}\`)`,
  `After the row a plain \`launch\`${ios ? '' : ' (`locale reset`)'} restores the language`,
  'Signed in with the test account (fixtures.md)',
  `The account holds finished Image to Video tasks with a model tag, the 「Gemini Omni Flash 1.1」 one among them (${T.i2vDone}, ${T.longest})`,
  `The account holds a finished Text to Video task with a model tag (${T.t2vDone})`,
  `The account holds a template task (${T.tmpl}), a finished Cinematic Reel Creator task (${T.cine}) and a finished Text to Image task (${T.tti})`,
  'The MUI phase runs after the rows that generate those tasks: the walk generates nothing',
]);

const steps: [string, string][] = [
  // [action, what the step's screen shows (English strings)]
  [`Open AI Magic › 「My Artwork」 and read the page (${T.artwork})`, 'My Artwork: the tabs 「AI Magic」 and 「My Artwork」, the 「Recent」 strip title, the card rows 「Cinematic Reel Creator」, 「Text to Video」, 「Image to Video」 and 「Text to Image」'],
  [`Tap the 「Image to Video」 card row and read the Recent page (${T.artwork}, ${T.i2vDone})`, `Image to Video Recent page: the title 「Image to Video」, the notice ${NOTICE}, 「Manage」, and on each card the date and length, the task name, the model tag and 「View」`],
  [`Tap 「Manage」 and read edit mode (${T.manage})`, 'Edit mode: 「Select All」, 「Cancel」 and the 「Delete」 bar, a checkbox on every card'],
  [`Tap the checkbox of a card with a model tag (${T.tick})`, ''],
  [`Tap 「Select All」 and read the button that replaces it (${T.selectAll})`, 'Edit mode with every card ticked: 「Deselect All」'],
  [`Tap 「Deselect All」 (${T.selectAll})`, ''],
  [`Tap 「Cancel」 (${T.selectAll}: 「Delete」 is never tapped)`, ''],
  [`Tap 「View」 on a card with a model tag and read the result page (${T.i2vView})`, 'Image to Video result page: its title (the other controls there belong to other features)'],
  [`Go back to the Recent page and on to My Artwork (${T.i2vView}, ${T.reopen})`, ''],
  [`Tap the 「Text to Video」 card row and read the Recent page (${T.t2v}, ${T.t2vDone})`, 'Text to Video Recent page: the title 「Text to Video」, the same notice, 「Manage」, the model tag and 「View」 on each card'],
  [`Tap 「View」 on a card with a model tag and read the result page (${T.t2vView})`, 'Text to Video result page: its title'],
  ['Go back to My Artwork', ''],
  [`Tap the 「Cinematic Reel Creator」 card row and read the Recent page (${T.cine})`, 'Cinematic Reel Creator Recent page: the title 「Cinematic Reel Creator」, the same notice, 「Manage」 and 「View」, no model tag on any card'],
  ['Go back to My Artwork', ''],
  [`Tap the 「Text to Image」 card row and read the Recent page (${T.tti})`, 'Text to Image Recent page: the title 「Text to Image」 and its items, no model tag'],
  ['Go back to My Artwork', ''],
  [`Open the Recent page of every other feature My Artwork lists and read each (${T.others})`, 'Recent page of any other feature My Artwork lists: its title, the notice, 「Manage」 and 「View」, no model tag'],
  [`Open AI Magic › 「Image to Video」 (not a template) and read the model picker without generating (${T.picker})`, 'Model picker of Image to Video: each model name as the tags quote it (read for the names only)'],
  ['Go back without generating', ''],
];
const walk = num(steps.map(([a]) => a));
const STATES = `Cards in another state, when the account holds one (else recorded as not reached): processing 「processing...」 with the time-left line 「9 minutes left ...」 (${T.processing}), failed 「Error」 and 「Retry」 (${T.error}), flagged 「View Details」 (${T.nsfw})`;
const checkList = [...steps.filter(([, s]) => s).map(([, s]) => s), STATES];

const script = (L: Lang) => ({
  CHT: 'traditional characters, Taiwan wording', CHS: 'simplified characters', PTB: 'Brazilian Portuguese', ESM: 'Mexican Spanish',
  ESP: 'Spanish of Spain', NOR: 'Norwegian Bokmål',
} as Record<string, string>)[L.tag];
const MODEL = 'The model tag reads the same model name as in English and as the model picker shows it: a model name is a proper name, not translated and never a doubt';
const TERMS = 'Each feature name (Image to Video, Text to Video, Cinematic Reel Creator, Text to Image) reads the same on its My Artwork card row and its Recent page title, and 「View」, 「Manage」 and 「Cancel」 use one wording on every page';
const DOUBT = `No translation sheet (${REQ}): a string that only seems off is a translation doubt in the run's mui-doubts.md, not a fail`;
const translationLines = (L: Lang) => {
  const sc = script(L);
  return [
    `Every string shows in ${L.name}${sc ? ` (${sc})` : ''} and says what the English says`,
    'No string is left in English, except the model names (tag and picker) and the task names, which are content and not app text',
    'No string shows a key, a placeholder (%@, %d, {0}) or another language, and the time-left line holds a number',
    MODEL,
    TERMS,
    DOUBT,
  ];
};
// Android: the APK read cannot attribute the short labels to a resource yet, so the walk judges their translation
const shortLabelLines = (L: Lang, apkRow: string) => {
  const sc = script(L);
  return [
    `The short labels the APK row leaves to the phone (${SHORT}) show in ${L.name}${sc ? ` (${sc})` : ''}, none left in English or as a key (${apkRow} line 7)`,
    MODEL,
    DOUBT,
  ];
};
const truncationLines = (L: Lang) => [
  'Every string on every screen of the walk but the model tag shows in full: none ends in 「…」, is cut at an edge or loses a line',
  'The model tag stays on one line under the task name, whole or cut with 「…」 as R-014 allows, and never touches the translated 「View」, 「Retry」 or 「View Details」 button',
  'No string overlaps another element or runs out of its card, button, title bar, tab or notice',
  'Every Recent task card is as tall as in English (120 pt), with and without a model tag',
  'The notice wraps inside its box with every word showing, and 「Manage」 stays on the screen',
  'In edit mode 「Select All」 / 「Deselect All」 and 「Cancel」 each stay on one line inside the top bar, and the 「Delete」 bar stays inside the screen',
  'Longest strings first: the notice, 「Deselect All」, 「View Details」, the 「Cinematic Reel Creator」 title and card row, the time-left line',
  ...(RTL.includes(L.tag) ? [`${L.name} is right-to-left: text runs from the right, the thumbnail, the tag and the button mirror, no string is clipped at the left edge, and the model name (Latin letters) still reads left to right inside its tag`] : []),
];

const newRows: string[][] = [];
let n = FIRST_ID;
const APK_ROW = tc(FIRST_ID);
if (!ios) {
  newRows.push([tc(n++), 'MUI', num([
    'The APK of the build under test in `~/.casebook/android/apks/<build>/` (the one installed for the run)',
    '`mui.json` has no `android_prefixes` for this feature yet: the read takes the strings of three or more words this table quotes (the feature names and the notice)',
  ]), num([
    `Run \`node scripts/mui-strings.ts ${FEATURE} --apk <build dir> --out <run dir>/mui\``,
    'Read every string of `mui-strings.json` in each language against its English',
  ]), num([
    `Each of the ${LANGS.length} languages (${LANGS.map(l => l.tag).join(', ')}) has its own text for every string read (「Image to Video」, 「Text to Video」, 「Text to Image」, 「Cinematic Reel Creator」, the notice ${NOTICE}): none shows the English default or another locale's text`,
    'No string is left identical to English',
    'Placeholders and line breaks match the English in every language',
    'Each translation says what the English says, in that language\'s script and regional wording (CHT traditional and Taiwan, CHS simplified, PTB Brazilian, ESM Mexican)',
    'A feature name that several resources hold (card row, page title, shortcut) has one translation in each language',
    'The model tag adds no string of its own: a model name is data, shown as the picker names it, and is not part of this read',
    `The short labels of the Recent page (${SHORT}) are shared resources this read cannot attribute to the feature: their translation is judged on the phone rows (${tc(FIRST_ID + 1)} – ${tc(FIRST_ID + LANGS.length)}) until \`android_prefixes\` names them`,
    '「An Error Has Occurred」 (the Image to Video page\'s own error title, KP-081, quoted by TC-038) is read too and held to the same lines',
    DOUBT,
  ]), 'P2', `${R_TR}; ${REQ}`, 'MUI, all languages from the APK (no phone, no credits). The phone rows below check truncation and the short labels.', 'new', `${REQ}: MUI translations read from the build`]);
}
LANGS.forEach(L => {
  const id = tc(n++);
  if (ios) newRows.push([id, 'MUI', pre(L), walk, num([...translationLines(L), ...truncationLines(L), ...checkList]),
    'P2', `${R_TR}; ${R_TC}; ${REQ}`, `MUI ${L.tag} (${L.code}). One \`texts\` read and screenshot per screen. Labels are quoted in English: tap the control in the same place. No task is generated or deleted.`, 'new', `${REQ}: MUI walk per language (translation and truncation)`]);
  else newRows.push([id, 'MUI', pre(L), walk, num([...truncationLines(L), ...shortLabelLines(L, APK_ROW), ...checkList]),
    'P2', `${R_TC}; ${R_TR}; ${REQ}`, `MUI ${L.tag} (${L.code}). Truncation, and the translation of the short labels only (the other translations come from the APK, ${APK_ROW}). One \`texts\` read and screenshot per screen. Labels are quoted in English: tap the control in the same place. No task is generated or deleted.`, 'new', `${REQ}: MUI truncation walk per language`]);
});
const LAST_ID = n - 1;
const walkId = (i: number) => tc(FIRST_ID + (ios ? 0 : 1) + i);

// ---- draft.csv: every approved row unchanged, then the MUI section ----
const head = [...approved[0], 'Change', 'Change Reason'];
const rows = approvedRows.map(r => [...r, 'unchanged', '']);
writeFileSync(join(DIR, 'draft.csv'), '﻿' + toCsv([head, ...rows, ...newRows]));

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const intro = `Draft ${DRAFT} [Req: ${REQ}]: the MUI section (spec-casebook references/mui.md). PowerDirector features are tested in the
${LANGS.length} languages of \`library/pdr/product.json\` › \`mui\` besides English; there is no translation sheet, so the run judges
the translations and doubtful ones go to the eBug review. ${ios
  ? 'iOS reads translations on the phone (the app bundle cannot be read on the QA iPhone): one walk for each language checks translation and truncation together.'
  : 'Android reads the feature names and the notice from the build\'s APK (one row, no phone); the phone walks one row for each language for truncation and for the short shared labels the APK read cannot attribute yet.'}
The MUI rows are their own phase, never part of a full run. New: ${R_TR}, ${R_TC}; ${newRows.length} rows, ${tc(FIRST_ID)} – ${tc(LAST_ID)}.

`;
if (!/\n## My Artwork entry\n/.test(req)) throw new Error('no "## My Artwork entry" in requirements.md');
req = req.replace(/\n## My Artwork entry\n/, `\n${intro}## My Artwork entry\n`);
const section = `## MUI
- ${R_TR} [Req: ${REQ}] The app's own strings on the screens of this feature (My Artwork's feature rows, the Recent pages of Image to Video, Text to Video, Cinematic Reel Creator and Text to Image with their notice and 「Manage」, the card buttons 「View」, 「Retry」 and 「View Details」, the processing and failed card texts, edit mode's 「Select All」, 「Deselect All」, 「Cancel」 and 「Delete」) show in each language of the product list (${LANGS.map(l => l.tag).join(', ')}), in that language's own words with the English meaning, with no English, key or placeholder left; the model name in the tag is a proper name and reads as the model picker shows it, the same as in English. No translation sheet: the run judges the strings; doubtful ones are listed for the eBug review, not failed.${ios ? '' : ' Android reads the feature names and the notice from the build (`mui-strings.ts`) and the short shared labels on the phone, until `android_prefixes` in `mui.json` names their resources.'}
- ${R_TC} [Req: ${REQ}] In each language of that list no string on those screens is truncated, clipped or overlapping; the model tag stays on one line, cut with 「…」 only as R-014 allows, and never touches the translated button beside it; a Recent task card keeps its 120 pt height${RTL.length ? `; the right-to-left languages (${RTL.join(', ')}) run from the right` : ''}.

`;
if (!/\n## Open questions/.test(req)) throw new Error('no "## Open questions" in requirements.md');
req = req.replace(/\n## Open questions/, `\n${section}## Open questions`);
const addToTable = (heading: string, lines: string[]) => {
  const i = req.lastIndexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/); if (!m) throw new Error(`no table under ### ${heading}`);
  const at = i + m.index! + m[0].length - 1;
  req = req.slice(0, at) + '\n' + lines.join('\n') + req.slice(at);
};
if (!req.endsWith('\n')) req += '\n';
addToTable('Variants', LANGS.flatMap((L, i) => [
  `| ${R_TR} | ${L.tag} (${L.name}) | ${ios ? walkId(i) : `${APK_ROW}, ${walkId(i)}`} |`, `| ${R_TC} | ${L.tag} (${L.name}) | ${walkId(i)} |`]));
addToTable('Request ledger coverage', [
  `| ${REQ} (table: MUI test in the ${LANGS.length} languages of the product list, no translation sheet) | ${R_TR}, ${R_TC} (${tc(FIRST_ID)} – ${tc(LAST_ID)}) |`,
]);
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- spec.json and update-plan.md ----
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: FEATURE, platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-26T02:00:00.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Recent Task Model Info (${PLATFORM}), draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change comes from the request ledger (${REQ}).

## Summary
- New: ${newRows.length} rows in a new last section **MUI** (${tc(FIRST_ID)} – ${tc(LAST_ID)}) for the ${LANGS.length} languages of
  \`library/pdr/product.json\` › \`mui\`: ${ios
  ? 'one walk per language that checks translation and truncation together (the app bundle cannot be read on the QA iPhone).'
  : `one row (${APK_ROW}) reads translations from the build's APK (no phone, no credits), then one truncation walk per language on the phone.`}
- Modified: none. Removed: none.

## Requirements
- New ${R_TR} (translation) and ${R_TC} (truncation); \`### Variants\` gains a line per requirement × language; \`### Request
  ledger coverage\` cites ${REQ}.

## How the rows run
- The MUI rows are their own phase, run on request (string freeze, new languages, before release), never part of a
  full run. This feature has no \`phases.json\` yet (no run has been planned), so the draft adds none; when the run plan
  is written, its \`MUI\` phase is ${ios ? '' : `the segment \`MUI-apk\` (${APK_ROW}) and `}one segment per language (\`MUI-<tag>\`: ${walkId(0)} … ${walkId(LANGS.length - 1)},
  in the order of the product list), each ending with a plain launch${ios ? '' : ' (`locale reset`)'}.
- Each walk reaches the screens the feature's rows reach, by those rows: My Artwork, the Recent pages of Image to Video,
  Text to Video, Cinematic Reel Creator, Text to Image and any other feature listed, edit mode (「Manage」, 「Select All」,
  「Deselect All」, 「Cancel」), the two result pages and the Image to Video model picker; one \`texts\` read and
  screenshot per screen. It generates and deletes nothing, so the phase runs after the rows that made the tasks
  (${T.processing} – TC-030).
- Processing, failed and flagged cards are read only when the account holds one at that moment (no new task, no
  failure fixture); otherwise the row records them as not reached.
- The feature has no dialog, toast or tooltip of its own: none is on the walk.
${ios ? '' : `- \`mui.json\` gets no \`android_prefixes\`: the model tag adds no string (a model name is data), and the Recent page's
  short labels are shared resources whose names the repo cannot tell apart (build 2611231 holds 「Manage」 as
  \`btn_manage\` and \`manage\`, the notice as \`image_to_video_recent_cloud_notice\` and
  \`ai_video_anime_recent_task_message\`, many 「Cancel」 / 「Retry」). The APK read therefore takes the strings of three or
  more words the table quotes (the feature names, the notice, 「An Error Has Occurred」), and each walk also judges the
  translation of the short labels. Once RD or a view dump names the resources, add them to \`mui.json\` and drop that
  line from the walks.
- TR261123-0015 (2611201) did not implement the model tag (REQ-003): on such a build the walk's tag lines fail as the
  model rows do; cite that finding rather than filing it per language.
`}- No translation sheet: the run judges each string (references/mui.md §3); doubtful translations go to the run's
  \`mui-doubts.md\` and the eBug review page's Translation doubts panel. Model names and task names are not app text.

## Not added
- Language × largest text size (${'TC-028'}) and language × Dark / Light (TC-042, TC-043): each is checked on its own in
  English; the walk runs at the default text size in the appearance the phone is in.
- A new generation per language to show the processing card or a completion notice: MUI walks start no task.
- The Text to Video model picker: the same picker component, read once on Image to Video for the model names.
- Result page controls (share icons, quick actions), the credit pill, 「View more」, the bottom tabs: other features.
- 「Delete」 and its confirmation: never tapped by this table.
`);

// ---- files a draft carries over unchanged (the traces name no MUI row; the Chinese copy starts from the approved one,
// so only the new rows need translating: zh-copy.ts export / merge) ----
const prevDraft = join(TABLE, 'drafts', manifest.draft);
for (const [from, to] of [
  [join(TABLE, 'cases.zh-Hant.csv'), 'draft.zh-Hant.csv'], [join(TABLE, 'cases.zh-Hant.prints.json'), 'draft.zh-Hant.prints.json'],
  [join(TABLE, 'questions.zh-Hant.json'), 'questions.zh-Hant.json'], [join(TABLE, 'control-trace.json'), 'control-trace.json'],
  [join(prevDraft, 'annotation-trace.json'), 'annotation-trace.json'],
]) if (existsSync(from) && !existsSync(join(DIR, to))) copyFileSync(from, join(DIR, to));
console.log(`${PLATFORM}: ${rows.length} approved rows + ${newRows.length} MUI rows (${tc(FIRST_ID)} – ${tc(LAST_ID)}) → ${join(DIR, 'draft.csv')}`);
