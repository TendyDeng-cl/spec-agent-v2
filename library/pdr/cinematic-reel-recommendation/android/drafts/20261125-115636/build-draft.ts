// Builds requirements.md and draft.csv for the REQ-006 update of pdr/cinematic-reel-recommendation (android):
// everything TR261019-014 and TR260923-022 list (CMS items #54–67, thumbnails, localization in 28 languages,
// template card text and order), from the sheets saved in specs/2026-11-25/extracted.
// Usage: node build-draft.ts   (run from anywhere; writes next to this file)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const here = dirname(fileURLToPath(import.meta.url));
const feat = join(here, '../../..');
const ex = join(feat, 'specs/2026-11-25/extracted');
const sheet = (f: string) => parseCsv(readFileSync(join(ex, f + '.csv.txt'), 'utf8'));
const q = (s: string) => `「${s}」`;
const pad = (n: number) => `TC-${String(n).padStart(3, '0')}`;

// ---- Languages: Cinestory column, I2V Localization column, Android language, locale tag for launch --lang
const LANGS = [
  ['en', 'Name(ENU)', 'English', 'en-US'], ['cht', 'CHT', '繁體中文 (台灣)', 'zh-Hant-TW'], ['chs', 'CHS', '简体中文', 'zh-Hans-CN'],
  ['ja', 'JPN', '日本語', 'ja-JP'], ['es', 'ESP', 'Español (España)', 'es-ES'], ['ko', 'KOR', '한국어', 'ko-KR'],
  ['de', 'DEU', 'Deutsch', 'de-DE'], ['fr', 'FRA', 'Français', 'fr-FR'], ['it', 'ITA', 'Italiano', 'it-IT'],
  ['ru', 'RUS', 'Русский', 'ru-RU'], ['pt', 'PTB', 'Português (Brasil)', 'pt-BR'], ['nl', 'NLD', 'Nederlands', 'nl-NL'],
  ['id', 'IDN', 'Bahasa Indonesia', 'id-ID'], ['th', 'THA', 'ไทย', 'th-TH'], ['ms', 'MAY', 'Bahasa Melayu', 'ms-MY'],
  ['hi', 'HIN', 'हिन्दी', 'hi-IN'], ['esm', 'ESM', 'Español (Latinoamérica)', 'es-419'], ['ar', 'ARA', 'العربية', 'ar'],
  ['vi', 'VIT', 'Tiếng Việt', 'vi-VN'], ['pl', 'PLK', 'Polski', 'pl-PL'], ['tr', 'TRK', 'Türkçe', 'tr-TR'],
  ['fil', 'FPO', 'Filipino', 'fil-PH'], ['fa', 'FAR', 'فارسی', 'fa-IR'], ['he', 'HEB', 'עברית', 'he-IL'],
  ['sv', 'SVE', 'Svenska', 'sv-SE'], ['da', 'DAN', 'Dansk', 'da-DK'], ['nb', 'NOR', 'Norsk bokmål', 'nb-NO'],
  ['uk', 'UKR', 'Українська', 'uk-UA'],
] as const;
const REGIONAL = new Set(['cht', 'chs', 'ja', 'ko']); // Order › 「PDRM JP/TW/KOR/CHS」 (user ruling 2026-11-25: by app language)

// ---- Templates: GUID, English name, CMS › Recommendation items (display name → I2V GUID)
const G = (s: string) => 'Image_to_video_' + s;
const ITEM: Record<string, string> = {
  'People in Frame': G('recommend_people_in_frame'), 'Mid-Distance Framing': G('recommend_mid_distance_framing'),
  'Rich Visual Details': G('recommend_rich_visual_details'), 'Layered Depth': G('recommend_layered_depth'),
  'Visible Sky': G('recommend_visible_sky'), 'Cityscape or Landscape': G('recommend_cityscape_or_landscape'),
  'Sense of Motion': G('recommend_sense_of_motion'), 'Flat Composition': G('avoid_flat_composition'),
  'Visible Text or Logos': G('avoid_visible_text_or_logos'), 'Extreme Close-up': G('avoid_extreme_close_up'),
  'Portrait as Subject': G('avoid_portrait_as_subject'), 'Indoor Close-up': G('avoid_indoor_close_up'),
  'Static Composition': G('avoid_static_composition'),
};
const T = [
  { guid: 'Example_006_Seedance2.0_Horror_Movie_Halloween', name: 'Horror Movie', rec: ['People in Frame', 'Layered Depth'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { guid: 'Example_001_Kling_Micro_Cinema', name: 'Micro Cinema', rec: ['Mid-Distance Framing', 'Rich Visual Details'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { guid: 'Example_005_Happyhorse_Fast_Cut', name: 'Fast Cut', rec: ['Sense of Motion', 'Rich Visual Details'], avoid: ['Static Composition', 'Visible Text or Logos', 'Extreme Close-up'], fastCut: true },
  { guid: 'Example_002_Kling_One_Take_Shot', name: 'One-Take Shot', rec: ['Mid-Distance Framing', 'Layered Depth'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
  { guid: 'Example_003_Kling_Time_Lapse', name: 'Time Lapse', rec: ['Visible Sky', 'Cityscape or Landscape'], avoid: ['Portrait as Subject', 'Indoor Close-up', 'Extreme Close-up'] },
  { guid: 'Example_004_Kling_Handheld_Camera', name: 'Handheld Camera', rec: ['Layered Depth', 'Rich Visual Details'], avoid: ['Flat Composition', 'Visible Text or Logos', 'Extreme Close-up'] },
];
const ORDER_GLOBAL = ['Horror Movie', 'Micro Cinema', 'Fast Cut', 'One-Take Shot', 'Time Lapse', 'Handheld Camera'];
const ORDER_REGIONAL = ['Horror Movie', 'Micro Cinema', 'Fast Cut', 'One-Take Shot', 'Handheld Camera', 'Time Lapse'];

// ---- Sheet data
const byGuid = (rows: string[][], take: (r: string[]) => boolean = () => true) => {
  const h = rows[0].map(s => s.trim()); const m: Record<string, Record<string, string>> = {};
  for (const r of rows.slice(1)) if (r[0]?.trim() && take(r) && !m[r[0].trim()]) m[r[0].trim()] = Object.fromEntries(h.map((k, i) => [k, (r[i] ?? '').trim()]));
  return m;
};
const names = byGuid(sheet('Cinestory CMS - Template Name Localization'));
const descRows = sheet('Cinestory CMS - Template Description Localization');
const desc = byGuid(descRows.slice(0, 7)); // rows 2–7 current; rows 17–21 greyed out (old)
const locRows = sheet('I2V Recommendation - Localization');
const lh = locRows[0].map(s => s.trim());
const cap: Record<string, Record<string, string>> = {};
for (const r of locRows) if (r[2]?.trim()) cap[r[2].trim()] = Object.fromEntries(lh.map((k, i) => [k, (r[i] ?? '').trim()]));
for (const t of T) for (const l of LANGS) {
  if (!names[t.guid]?.[l[0]]) throw new Error(`no name ${t.guid} ${l[0]}`);
  if (!desc[t.guid]?.[l[0]]) throw new Error(`no description ${t.guid} ${l[0]}`);
}
for (const g of [...Object.values(ITEM), G('recommend_rich_visual_details_fast_cut')]) for (const l of LANGS) if (!cap[g]?.[l[1]]) throw new Error(`no caption ${g} ${l[1]}`);
const caption = (item: string, l: typeof LANGS[number], fastCut = false) =>
  l[0] === 'en' ? item : cap[fastCut && item === 'Rich Visual Details' ? G('recommend_rich_visual_details_fast_cut') : ITEM[item]][l[1]];

// ---- Rows
type Row = Record<'ID' | 'Section' | 'Precondition' | 'Action' | 'Expected Result' | 'Priority' | 'Spec Ref' | 'Notes' | 'Change' | 'Change Reason', string>;
const COLS = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'] as const;
const approved = parseCsv(readFileSync(join(feat, 'android/cases.csv'), 'utf8').replace(/^﻿/, ''));
const ah = approved[0];
const old: Row[] = approved.slice(1).filter(r => r.length > 1).map(r => ({ ...Object.fromEntries(ah.map((k, i) => [k, r[i] ?? ''])), Change: 'unchanged', 'Change Reason': '' }) as Row);
const pre = (l: typeof LANGS[number]) => [
  'PowerDirector signed in on the test account',
  `App language ${l[2]} (Android Settings › Apps › PowerDirector › Language; run: launch --lang ${l[3]})`,
  'Cinematic Reel Creator open on its template page',
].map((s, i) => `${i + 1}. ${s}`).join('\n');
const nameOf = (t: typeof T[number], l: typeof LANGS[number]) => names[t.guid][l[0]];

let next = 22;
const cardsRow = (l: typeof LANGS[number]): Row => {
  const order = (REGIONAL.has(l[0]) ? ORDER_REGIONAL : ORDER_GLOBAL).map(n => T.find(t => t.name === n)!);
  return {
    ID: pad(next++), Section: 'Language',
    Precondition: pre(l),
    Action: ['1. Look at the first template card', '2. Swipe the cards left one at a time to the last card'].join('\n'),
    'Expected Result': [
      ...order.map((t, i) => `Step ${i === 0 ? 1 : 2}: card ${i + 1} reads ${q(nameOf(t, l))} with the description ${q(desc[t.guid][l[0]])}`),
      `Step 2: the cards come in this order: ${order.map(t => q(nameOf(t, l))).join(', ')}`,
      'Step 2: every name and description is whole, not cut off and not garbled',
    ].join('\n'),
    Priority: ['en', 'cht', 'ja'].includes(l[0]) ? 'P2' : 'P3',
    'Spec Ref': 'R-029, R-030, R-031',
    Notes: `Cinestory CMS › Order ${REGIONAL.has(l[0]) ? '「PDRM JP/TW/KOR/CHS」' : '「PHDM/PDRM Global」'} (by app language, user 2026-11-25); › Template Name Localization column ${l[0]}; › Template Description Localization rows 2–7 column ${l[0]}. If the app's language list has no ${l[2]}, record Blocked (test-data) and name the list. Restore English after the language block.`,
    Change: 'new', 'Change Reason': 'REQ-006: TR260923-022 (Cinestory template info) — card order, names and descriptions per app language',
  };
};
const tipsRow = (l: typeof LANGS[number], id?: string): Row => {
  const order = (REGIONAL.has(l[0]) ? ORDER_REGIONAL : ORDER_GLOBAL).map(n => T.find(t => t.name === n)!);
  const steps: string[] = []; const exp: string[] = []; let s = 1;
  for (const t of order) {
    steps.push(`${s}. Tap the photo tips chip on the ${q(nameOf(t, l))} card`);
    exp.push(`Step ${s}: the sheet's first sentence names the template as ${q(nameOf(t, l))}`);
    exp.push(`Step ${s}: under the first heading: ${t.rec.map(i => q(caption(i, l, t.fastCut))).join(', ')}`);
    exp.push(`Step ${s}: under the second heading: ${t.avoid.map(i => q(caption(i, l))).join(', ')} (swipe the row left to read the third)`);
    s++;
    steps.push(`${s}. Tap the button at the bottom of the sheet`);
    exp.push(`Step ${s}: the sheet closes, back on the template page`);
    s++;
  }
  exp.push('Every step: the two headings, the captions and the button are in the app language, whole, not cut off and not garbled');
  exp.push(`Every step: each picture is the ${REGIONAL.has(l[0]) ? 'JP' : 'EN'} picture of that item in the sheet's Pic Link list (specs/2026-11-25/extracted/recommendation-pic-links.png)`);
  return {
    ID: id ?? pad(next++), Section: 'Language',
    Precondition: pre(l),
    Action: steps.join('\n'),
    'Expected Result': exp.join('\n'),
    Priority: ['cht', 'ja'].includes(l[0]) ? 'P2' : 'P3',
    'Spec Ref': 'R-015, R-032, R-012, R-034',
    Notes: `I2V Recommendation › Localization column ${l[1]} (CMS items #54–67); Fast Cut's 「Rich Visual Details」 is item #56 (…_fast_cut), caption per the user's ruling 2026-11-25. The chip's and the sentence's own words are Q-2 (filed DRA262611P0290): record their language, do not fail on it. Run right after the ${l[2]} cards row, same language.`,
    Change: id ? 'modified' : 'new',
    'Change Reason': id ? 'REQ-006: the I2V Recommendation › Localization tab gives every caption per language (Q-2 partly answered); the row now reads all six templates' : 'REQ-006: TR261019-014 Localization — captions and template names in the sheet per app language',
  };
};

// Picture row (TR261019-014 「Thumbnail」: Cinestory CMS › Recommendation › Pic Link)
const enL = LANGS[0];
const picRow: Row = {
  ID: '', Section: 'Photo tips sheet',
  Precondition: pre(enL),
  Action: T.flatMap((t, i) => [`${2 * i + 1}. Tap 「View photo tips」 on the ${q(t.name)} card`, `${2 * i + 2}. Tap 「Got it」`]).join('\n'),
  'Expected Result': [
    'Steps 1, 3, 5, 7, 9, 11: each item\'s picture is the EN picture beside the same item in Cinestory CMS › Recommendation › 「Pic Link」 (specs/2026-11-25/extracted/recommendation-pic-links.png)',
    'Steps 1, 3, 5, 7, 9, 11: an item that appears on several templates shows the same picture on each, except Fast Cut\'s 「Rich Visual Details」 (its own 「for Fast Cut」 picture)',
    'Steps 1, 3, 5, 7, 9, 11: no picture is blank, broken, stretched or a placeholder',
  ].join('\n'),
  Priority: 'P2', 'Spec Ref': 'R-034, R-013',
  Notes: 'TR261019-014 「Thumbnail」 link = Cinestory CMS gid 1744053327 (Recommendation). 14 items (#54–67): compare by eye with the saved sheet image.',
  Change: 'new', 'Change Reason': 'REQ-006: TR261019-014 lists the thumbnails; no row compared the pictures with the sheet',
};

const out: Row[] = [];
for (const r of old) {
  if (r.ID === 'TC-017') { out.push(tipsRow(LANGS[1], 'TC-017')); continue; }
  if (r.ID === 'TC-018') { out.push(tipsRow(LANGS[3], 'TC-018')); continue; }
  out.push(r);
  if (r.ID === 'TC-009') { picRow.ID = pad(next++); out.push(picRow); }
}
// Language block: per language a cards row then a tips row (English tips are TC-001 – TC-006)
const lang: Row[] = [cardsRow(enL)];
for (const l of LANGS.slice(1)) {
  const c = cardsRow(l);
  if (l[0] === 'cht') { lang.push(c, out.find(r => r.ID === 'TC-017')!); continue; }
  if (l[0] === 'ja') { lang.push(c, out.find(r => r.ID === 'TC-018')!); continue; }
  lang.push(c, tipsRow(l));
}
const final = out.filter(r => r.ID !== 'TC-017' && r.ID !== 'TC-018');
const at = final.findIndex(r => r.ID === 'TC-019');
final.splice(at, 0, ...lang);
writeFileSync(join(here, 'draft.csv'), toCsv([[...COLS], ...final.map(r => COLS.map(c => r[c]))]));

// ---- requirements.md: approved text with REQ-006 changes
let req = readFileSync(join(feat, 'android/requirements.md'), 'utf8');
const sub = (re: RegExp, s: string) => { if (!re.test(req)) throw new Error('no match ' + re); req = req.replace(re, s); };
sub(/^Spec: (.*)$/m, 'Spec: $1; REQ-006 (2026-11-25): TR261019-014, TR260923-022 and every tab of the sheets they link (specs/2026-11-25: I2V Recommendation 7 tabs, Cinestory CMS 9 tabs)');
sub(/^- R-012 \[Link: Cinestory CMS › Recommendation; Jira 「from CMS」\]/m, '- R-012 [Link: Cinestory CMS › Recommendation; I2V Recommendation › Recommendation_Page (CMS) #54–67 「for cinestory」; Jira 「from CMS」]');
sub(/^- R-013 .*$/m, '- R-013 [Link: Cinestory CMS › Recommendation, picture list; I2V Recommendation › Recommendation_Page (CMS) #56] Fast Cut\'s 「Rich Visual Details」 is item #56 (Image_to_video_recommend_rich_visual_details_fast_cut) with its own picture, not the one the other templates show for that item; its caption is 「Rich Visual Details」 (「…for Fast Cut」 is an internal label, user 2026-11-25).');
sub(/^- R-015 .*$/m, '- R-015 [Link: Cinestory CMS › Template Name Localization] The template name in the sheet\'s first sentence follows the app language in all 28 languages of the sheet (Micro Cinema: CHT 「微電影畫境」, JPN 「マイクロシネマ」); whether the sentence and the chip are translated is open (Q-2).');
sub(/^- Q-2 .*$/m, '- Q-2 Language: the sheets translate the template names (Cinestory CMS › Template Name Localization) and every caption (I2V Recommendation › Localization, 28 languages), but no sheet gives the chip 「View photo tips」 or the sentence 「For best results with the <template> template, follow this advice:」 in other languages. Are they translated? Filed as DRA262611P0290 (PM). Assumption: names and captions are checked per language; the chip and sentence words are recorded and not failed. R-015, R-032, TC-017, TC-018 and the Language rows.');
sub(/^## Open questions/m, `## Template cards (TR260923-022, REQ-006)
- R-029 [Link: Cinestory CMS › Order; user ruling 2026-11-25] The template cards follow the app language: 繁體中文, 简体中文, 日本語 and 한국어 get the 「PDRM JP/TW/KOR/CHS」 order ${ORDER_REGIONAL.map(q).join(', ')}; every other language the 「PHDM/PDRM Global」 order ${ORDER_GLOBAL.map(q).join(', ')}.
- R-030 [Link: Cinestory CMS › Template Name Localization] Each card shows the template name in the app language, for the 28 languages of the sheet (en … uk).
- R-031 [Link: Cinestory CMS › Template Description Localization rows 2–7; CMS columns 「Description … Mobile UI Shown V」] Each card shows the template description in the app language; rows 17–21 of that tab are greyed out (old) and do not apply (the CMS Data tab still holds the old English text for Micro Cinema).

## Captions per language (TR261019-014, REQ-006)
- R-032 [Link: I2V Recommendation › Localization] Every photo tips caption is shown in the app language as the Localization tab gives it, for the 14 Cinestory items (#54–67) and 28 languages.
- R-033 [Link: I2V Recommendation › Localization; Recommendation_Page (CMS)] — NOT TESTABLE as a separate rule: the CMS item records (GUID, ContentVer 1.0, Category) are server data; what the app shows of them is R-012, R-032 and R-034.

## Pictures (TR261019-014 「Thumbnail」, REQ-006)
- R-034 [Link: Cinestory CMS › Recommendation › Pic Link (JP and EN columns); user ruling 2026-11-25] Each item's picture is the sheet's picture for that item: the JP column in 繁體中文, 简体中文, 日本語 and 한국어, the EN column in every other language (Mid-Distance Framing and People in Frame differ between the two); an item shared by templates shows the same picture on each, except Fast Cut's 「Rich Visual Details」 (R-013).

## Not in these TRs (REQ-006, user 2026-11-25)
- Template previews, sample photos, model, aspect ratio, duration and action IDs (Cinestory CMS › CMS Data, Template Style id, action id, Thumbnail Size): generation settings, not tested here.
- The I2V Recommendation tabs Temp_QA, Recommend/Avoid_Final (other than its CineStory block), Template, FAQ and samples: Image to Video templates, not Cinematic Reel Creator.

## Open questions`);
req += `
## Added 2026-11-25 — REQ-006 (TR261019-014, TR260923-022)

### Variants

| Requirement | Variant | Rows |
|---|---|---|
${LANGS.map(l => `| R-029, R-030, R-031 | language=${l[0]} | ${final.find(r => r['Spec Ref'].startsWith('R-029') && r.Precondition.includes(l[3]))!.ID} |`).join('\n')}
${LANGS.slice(1).map(l => `| R-032 | language=${l[0]} | ${final.find(r => r['Spec Ref'].startsWith('R-015, R-032') && r.Precondition.includes(l[3]))!.ID} |`).join('\n')}
| R-032 | language=en | TC-001 – TC-006 |

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-006 (TR check, android) | R-012, R-013, R-015, R-029 – R-034 |
`;
writeFileSync(join(here, 'requirements.md'), req);
console.log(JSON.stringify({ rows: final.length, new: final.filter(r => r.Change === 'new').length, modified: final.filter(r => r.Change === 'modified').map(r => r.ID), lastId: pad(next - 1) }));
