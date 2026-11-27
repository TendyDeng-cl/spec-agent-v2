// Draft 20261125-160000 (both platforms; the iOS draft folder holds the same file): the MUI section [Req: REQ-002, REQ-007].
// Rebuilds draft.csv, requirements.md, spec.json, update-plan.md and phases.json in this folder from the approved table
// (Android v2, iOS v1) plus the MUI rows for the languages of library/pdr/product.json › mui (spec-casebook
// references/mui.md).
//   Android: one APK translation row for the app's own strings. The Language rows (TC-017 – TC-075) already walk every
//   language with the CMS text checked exactly and 「not cut off」; they also carry the truncation check of the chip
//   and the sheet sentence (modified), instead of a second walk per language.
//   iOS: no Language rows beyond two (TC-017, TC-018), so one walk per language checks translation (CMS text against
//   the sheets of specs/2026-11-25, app strings judged) and truncation together.
// Run: node library/pdr/cinematic-reel-recommendation/<platform>/drafts/20261125-160000/build-draft.ts
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
// the sheets' column per product tag: Cinestory CMS (names, descriptions) and I2V Recommendation › Localization (captions)
const CMS_COL: Record<string, string> = { CHT: 'cht', CHS: 'chs', JPN: 'ja', ESP: 'es', KOR: 'ko', DEU: 'de', FRA: 'fr', ITA: 'it', RUS: 'ru', PTB: 'pt', NLD: 'nl', IND: 'id', THA: 'th', MAY: 'ms', HIN: 'hi', ESM: 'esm', ARA: 'ar', VIT: 'vi', PLK: 'pl', TRK: 'tr', FAR: 'fa', HEB: 'he', SVE: 'sv', DAN: 'da', NOR: 'nb', UKR: 'uk' };
const I2V_COL: Record<string, string> = { IND: 'IDN' };

const [R_TR, R_TC] = ios ? ['R-028', 'R-029'] : ['R-035', 'R-036'];
const REQS = 'REQ-002; REQ-007';
const tc = (x: number) => `TC-${String(x).padStart(3, '0')}`;
const num = (lines: string[]) => lines.map((s, i) => `${i + 1}. ${s}`).join('\n');
const SHEETS = 'specs/2026-11-25/extracted';

const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8').replace(/^﻿/, ''));
const head = [...approved[0], 'Change', 'Change Reason'];
const col = (name: string) => approved[0].indexOf(name);
const [cID, cSec, cPre, cAct, cExp, cRef] = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Spec Ref'].map(col);
const lastId = Math.max(...approved.slice(1).map(r => Number((r[cID] ?? '').replace('TC-', '')) || 0));
const FIRST_ID = lastId + 1;

const rows = approved.slice(1).filter(r => r.length > 1).map(r => [...r, 'unchanged', '']);
const newRows: string[][] = [];
const variants: string[] = [];
let n = FIRST_ID;

const script = (L: Lang) => ({
  CHT: 'traditional characters, Taiwan wording', CHS: 'simplified characters', PTB: 'Brazilian Portuguese', ESM: 'Mexican Spanish',
  ESP: 'Spanish of Spain', NOR: 'Norwegian Bokmål',
} as Record<string, string>)[L.tag];
const APP_STRINGS = '「View photo tips」, 「For best results with the <template> template, follow this advice:」, 「Recommendation」, 「Avoid」, 「Got it」';
const Q2 = 'the chip and the sentence still in English is DRA262611P0290 (Q-2): cite it, do not file it again';

if (!ios) {
  // ---- Android: the app's strings from the APK ----
  newRows.push([tc(n++), 'MUI', num([
    'The APK of the build under test in `~/.casebook/android/apks/<build>/` (the one installed for the run)',
    '`mui.json` names the feature\'s string resources (`android_prefixes`: cine_story_view_photo_tips, cine_story_photo_tips_description)',
  ]), num([
    'Run `node scripts/mui-strings.ts pdr/cinematic-reel-recommendation --apk <build dir> --out <run dir>/mui`',
    'Read every string of `mui-strings.json` in each language against its English',
    'Find the resources of the sheet\'s headings and button (「Recommendation」, 「Avoid」, 「Got it」: shared resources, too short for the quote match) in the same dump and read them too',
  ]), num([
    `Each of the ${LANGS.length} languages (${LANGS.map(l => l.tag).join(', ')}) has its own text for the chip 「View photo tips」 and the sentence 「For best results with the %1$s template, follow this advice:」: none shows the English default (build 2611231 has no translation of either: ${Q2})`,
    'The sentence keeps its placeholder %1$s exactly once in every language, where that language puts the template name',
    'The headings 「Recommendation」 and 「Avoid」 and the button 「Got it」 have their own text in every language',
    'Each translation says what the English says, in that language\'s script and regional wording (CHT traditional and Taiwan, CHS simplified, PTB Brazilian, ESM Mexican)',
    'The template names, descriptions and captions are CMS text, not in the APK: the Language rows (TC-017 – TC-075) check them per language against the sheets',
    'No translation sheet for the app strings (REQ-002): a string that only seems off is a translation doubt in mui-doubts.md, not a fail',
  ]), 'P2', `${R_TR}; ${REQS}`, 'MUI, all languages from the APK (no phone, no credits). Truncation is walked by the Language rows, one pair per language.', 'new', 'REQ-002: MUI translations of the app strings read from the build']);
  // ---- the Language rows carry the truncation check ----
  const byCode = new Map(LANGS.map(L => [L.code, L]));
  const ALIAS: Record<string, string> = { 'es-419': 'es-MX', ar: 'ar-SA' }; // the Language rows' launch codes for ESM and ARA
  const pairs = new Map<string, string[]>();
  for (const r of rows) {
    if (r[cSec] !== 'Language') continue;
    const code = r[cPre].match(/launch --lang ([\w-]+)/)?.[1];
    const L = code ? byCode.get(ALIAS[code] ?? code) : undefined;
    if (!L) continue; // English and Filipino (not in the product list) stay as they are
    const sheet = /photo tips chip/.test(r[cAct]);
    r[cRef] = `${r[cRef]}, ${R_TC}`;
    if (sheet) r[cExp] = `${r[cExp]}\nEvery step: the chip just tapped and the sheet's first sentence show in full, in whatever language they appear (Q-2): no 「…」, nothing cut at an edge, no line hidden, the chip inside its pill over the preview${RTL.includes(L.tag) ? `\nEvery step: ${L.name} runs right-to-left: the sentence, headings and captions start at the right and nothing is clipped at the left edge` : ''}`;
    else r[cExp] = `${r[cExp]}\nStep 2: the 「View photo tips」 chip on every card shows in full inside its pill${RTL.includes(L.tag) ? '\nStep 2: names and descriptions run right-to-left and nothing is clipped at the left edge' : ''}`;
    r[r.length - 2] = 'modified';
    r[r.length - 1] = `REQ-002: MUI truncation (${R_TC}) of the ${sheet ? 'chip and the sheet sentence' : 'chip on the cards'} in ${L.tag}, checked on this walk instead of a second walk per language`;
    pairs.set(L.tag, [...(pairs.get(L.tag) ?? []), r[cID]]);
  }
  for (const L of LANGS) {
    const ids = pairs.get(L.tag); if (!ids?.length) throw new Error(`no Language rows for ${L.tag} (${L.code})`);
    variants.push(`| ${R_TR} | ${L.tag} (${L.name}) | ${tc(FIRST_ID)} |`, `| ${R_TC} | ${L.tag} (${L.name}) | ${ids.join(', ')} |`);
  }
} else {
  // ---- iOS: one walk per language ----
  const pre = (L: Lang) => num([
    `App language set to ${L.name} (\`launch --lang ${L.code}\`)`,
    'After the row a plain `launch` restores the language',
    'PowerDirector signed in on the test account',
    'The Cinematic Reel Creator tutorial was dismissed before (its template page opens directly)',
    'Launcher › Cinematic Reel Creator open on its template page',
  ]);
  const acts: string[] = ['Read the first template card (TC-001)', 'Swipe the cards left one at a time to the last card, reading each'];
  for (let c = 1; c <= 6; c++) acts.push(
    `Tap the photo tips chip on card ${c} (TC-001 – TC-006)`,
    'Swipe the second row of the sheet left to its last item (TC-008)',
    'Tap the button at the bottom of the sheet (TC-007)');
  acts.push('Swipe back to the first card', 'Tap its 「Import a Photo」 button (TC-010)', 'Tap 「?」 in the Add Media header (TC-010)', 'Tap the button at the bottom of the sheet (TC-016)');
  const walk = num(acts);
  LANGS.forEach(L => {
    const id = tc(n++);
    const sc = script(L);
    const cms = CMS_COL[L.tag], i2v = I2V_COL[L.tag] ?? L.tag;
    if (!cms) throw new Error(`no CMS column for ${L.tag}`);
    newRows.push([id, 'MUI', pre(L), walk, num([
      `Every card name is the one Cinestory CMS › Template Name Localization gives in column ${cms}, and every description the one Template Description Localization rows 2–7 give in column ${cms} (${SHEETS})`,
      `Every caption is the one I2V Recommendation › Localization gives in column ${i2v} for that item (#54–67; Fast Cut's 「Rich Visual Details」 is #56)`,
      'The sheet\'s first sentence names the template as its card does',
      `The app strings (${APP_STRINGS}) show in ${L.name}${sc ? ` (${sc})` : ''} and say what the English says; ${Q2}`,
      'No string shows a key, an unfilled placeholder (%@, %1$s) or another language',
      'No translation sheet for the app strings (REQ-002): a string that only seems off is a translation doubt in the run\'s mui-doubts.md, not a fail',
      'Every string on every screen of the walk shows in full: none ends in 「…」, is cut at an edge or loses a line',
      'The chip stays inside its pill over the preview; the sentence wraps instead of being cut; each caption fits under its picture',
      'Longest strings first: the descriptions on the cards, the sheet sentence, the longest captions',
      ...(RTL.includes(L.tag) ? [`${L.name} is right-to-left: text runs from the right and no string is clipped at the left edge`] : []),
      'Cards: six names, six descriptions, the chip on each',
      'Each of the six sheets: the sentence, 「Recommendation」 with two captions, 「Avoid」 with three captions, the button',
      'The Add Media 「?」 sheet: the same strings for the first card\'s template',
    ]), 'P2', `${R_TR}; ${R_TC}; ${REQS}`, `MUI ${L.tag} (${L.code}). One \`texts\` read and screenshot per screen (each card, each sheet); nothing is generated. Card order and pictures per language are the Android Language rows' (REQ-006, not on iOS yet).`, 'new', 'REQ-002: MUI walk per language (translation and truncation)']);
    variants.push(`| ${R_TR} | ${L.tag} (${L.name}) | ${id} |`, `| ${R_TC} | ${L.tag} (${L.name}) | ${id} |`);
  });
}
const LAST_ID = n - 1;
const newRange = newRows.length > 1 ? `${tc(FIRST_ID)} – ${tc(LAST_ID)}` : tc(FIRST_ID);
const modified = rows.filter(r => r[r.length - 2] === 'modified').length;

// ---- draft.csv ----
writeFileSync(join(DIR, 'draft.csv'), '﻿' + toCsv([head, ...rows, ...newRows]));

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const intro = `Draft ${DRAFT} [Req: REQ-002, REQ-007]: the MUI section (spec-casebook references/mui.md) for the ${LANGS.length} languages of
\`library/pdr/product.json\` › \`mui\` besides English. ${ios
  ? `iOS: one walk per language checks translation and truncation together; the CMS text (names, descriptions, captions) is compared with the 2026-11-25 sheets, the app's own strings are judged (no sheet).`
  : `Android: one row reads the app's own strings from the build's APK; the CMS text is already checked per language by the Language rows, which now also check the truncation of the chip and the sheet sentence (no second walk per language).`}
The MUI rows are their own phase (phases.json \`MUI\`), never part of a full run. New: ${R_TR}, ${R_TC}; ${newRows.length} rows, ${newRange}${modified ? `; ${modified} Language rows modified` : ''}.

`;
req = req.replace(/\n## View photo tips chip\n/, `\n${intro}## View photo tips chip\n`);
const section = `## MUI
- ${R_TR} [Req: REQ-002] Every user-facing string of the feature shows in each language of the product list (${LANGS.map(l => l.tag).join(', ')}): the app's own strings (${APP_STRINGS}) in that language's own words with the English meaning, with no English, key or placeholder left${ios ? `, and the CMS text (card names and descriptions, captions) as the 2026-11-25 sheets give it for that language (Cinestory CMS › Template Name / Template Description Localization, I2V Recommendation › Localization)` : ' (read from the build, `mui-strings.ts`; the CMS text per language is R-030 – R-032)'}. No translation sheet for the app strings: the run judges them; doubtful ones are listed for the eBug review, not failed.
- ${R_TC} [Req: REQ-002] In each of those languages no string of the feature is truncated, clipped or overlapping: the chip stays inside its pill, the sheet sentence wraps instead of being cut, every name, description and caption shows in full${RTL.length ? `; the right-to-left languages (${RTL.join(', ')}) run from the right` : ''}.

`;
req = req.replace(/\n## Open questions/, `\n${section}## Open questions`);
// Q-2: the product list says every language is implemented (REQ-002); the APK / walk now checks the chip and sentence
req = req.replace(/(\n- Q-2 [^\n]*)/, `$1 MUI (REQ-002): every PowerDirector feature is implemented in the ${LANGS.length} languages of the product list, so ${ios ? `the MUI walks (${newRange})` : `the APK row ${tc(FIRST_ID)}`} expect the chip and sentence translated; a miss is DRA262611P0290, cited, not filed again.`);
const addToTable = (heading: string, lines: string[]) => {
  // the first grid of that name: check.ts reads that one
  const i = req.indexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/); if (!m) throw new Error(`no table under ### ${heading}`);
  const at = i + m.index! + m[0].length - 1;
  req = req.slice(0, at) + '\n' + lines.join('\n') + req.slice(at);
};
addToTable('Variants', variants);
addToTable('Request ledger coverage', [
  `| REQ-002 (table: MUI test in the ${LANGS.length} languages of the product list, no translation sheet) | ${R_TR}, ${R_TC} (${newRange}${ios ? '' : '; truncation on the Language rows'}) |`,
  `| REQ-007 (table: plan the MUI cases, 2026-11-25) | ${R_TR}, ${R_TC} |`,
]);
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- spec.json and update-plan.md ----
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/cinematic-reel-recommendation', platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-25T08:00:00.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Cinematic Reel Creator photo tips (${PLATFORM}), draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change comes from the request ledger (REQ-002, REQ-007).

## Summary
${ios ? `- New: ${newRows.length} rows in a new last section **MUI** (${newRange}), one walk per language of \`library/pdr/product.json\` ›
  \`mui\`: the template cards, all six photo tips sheets and the Add Media 「?」 sheet, translation and truncation together
  (the app bundle cannot be read on the QA iPhone). The CMS text is compared with the 2026-11-25 sheets' column for
  that language; the app's own strings are judged (no sheet).
- Modified: none. Removed: none.` : `- New: 1 row in a new last section **MUI** (${newRange}): the app's own strings (chip, sheet sentence, headings,
  button) in every language, read from the build's APK (no phone, no credits).
- Modified: ${modified} Language rows (the cards and sheet pair of each of the ${LANGS.length} product languages): they already walk
  every language and check the CMS text exactly and 「not cut off」; they now also check that the chip and the sheet
  sentence are not cut off (and right-to-left layout for ${RTL.join(', ')}). A separate truncation walk per language would
  repeat the same screens, so none is added.
- Unchanged: the English and Filipino Language rows (Filipino is in the sheets' 28 languages but not the product list).`}

## Requirements
- New ${R_TR} (translation) and ${R_TC} (truncation); \`### Variants\` gains a line per requirement × language.
- Q-2 gains a line: the product list (REQ-002) expects the chip and sentence translated; a miss cites DRA262611P0290.

## How the rows run
${ios ? `- The MUI rows are their own phase \`MUI\` in phases.json, one segment per language, run on request (string freeze, new
  languages, before release), never part of a full run. Each walk ends with a plain \`launch\`.
- Nothing is generated: the walk opens sheets and the Add Media room only.` : `- The APK row is the phase \`MUI\` (segment \`MUI-apk\`), run on request, never part of a full run.
- The truncation checks ride on the Language rows, which belong to the rounds of the full run as before.
- Build 2611231 already shows the result: the APK has no translation of 「View photo tips」 or the sheet sentence in any
  language (DRA262611P0290, cited, not filed again).`}

## Not added
${ios ? `- Card order and pictures per language (the Android Language rows, REQ-006): the iOS table has not taken in the
  2026-11-25 spec set yet; that is its own update.
- English is the base language, already walked by TC-001 – TC-016.` : `- A truncation walk per language: the Language rows already reach every screen of the feature in each language.`}
`);

// ---- phases.json ----
const prevFile = [manifest.draft].map(d => d && join(TABLE, 'drafts', d, 'phases.json')).find(f => f && existsSync(f));
const prevPhases = prevFile ? JSON.parse(readFileSync(prevFile, 'utf8')) : null;
const muiPhase = ios ? {
  id: 'MUI', name: `MUI: ${LANGS.length} languages (translation and truncation on the phone)`,
  note: 'REQ-002 (user, 2026-11-24). Run on request, never in a full run. One segment per language; every segment ends with a plain launch. Doubtful translations go to mui-doubts.md (references/mui.md §3).',
  segments: LANGS.map((L, i) => ({ id: `MUI-${L.tag}`, name: `${L.name} (${L.code})`, cases: [tc(FIRST_ID + i)] })),
} : {
  id: 'MUI', name: 'MUI: app strings in every language from the APK',
  note: 'REQ-002 (user, 2026-11-24). Run on request, never in a full run. Truncation per language is checked by the Language rows of the full run. Doubtful translations go to mui-doubts.md (references/mui.md §3).',
  segments: [{ id: 'MUI-apk', name: 'Translations from the APK (no phone)', cases: [`${tc(FIRST_ID)}`] }],
};
const phases = prevPhases
  ? { ...prevPhases, draft: DRAFT, phases: [...prevPhases.phases.filter((p: any) => p.id !== 'MUI'), muiPhase] }
  : { draft: DRAFT, current: ['MUI'], needs: {}, unavailable: {}, phases: [muiPhase] };
writeFileSync(join(DIR, 'phases.json'), JSON.stringify(phases, null, 2) + '\n');

for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json'], ['questions.zh-Hant.json', 'questions.zh-Hant.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${rows.length} approved rows (${modified} modified) + ${newRows.length} MUI rows → ${join(DIR, 'draft.csv')}`);
