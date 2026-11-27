// Draft 20261125-190000 (both platforms; the iOS draft folder holds the same file): every Open question that is still
// open gets a row that takes the app to the point in question [Req: REQ-009] (analysis.md, "Every Open question gets an
// observing row"): Q-3 (other ways to close the sheet) and Q-4 (offline). Rebuilds draft.csv, requirements.md, spec.json,
// update-plan.md, phases.json, questions.zh-Hant.json and the carried-over traces in this folder from the approved table.
// Run: node library/pdr/cinematic-reel-recommendation/<platform>/drafts/20261125-190000/build-draft.ts
// then: node scripts/knowledge.ts pdr/cinematic-reel-recommendation <platform> --for analysis --out <this folder>/knowledge.md
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261125-190000';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));
const PREV = manifest.draft as string;
const REQ = 'REQ-009';

const rawCsv = readFileSync(join(TABLE, 'cases.csv'), 'utf8');
const bom = rawCsv.startsWith('﻿');
const approved = parseCsv(rawCsv.replace(/^﻿/, ''));
const H = approved[0];
const col = (n: string) => { const i = H.indexOf(n); if (i < 0) throw new Error(`no column ${n}`); return i; };
const body = approved.slice(1).filter(r => r.length > 1);
const maxId = Math.max(...body.map(r => +r[col('ID')].slice(3)));
const tc = (n: number) => `TC-${String(n).padStart(3, '0')}`;
const CLOSE = tc(maxId + 1), COLD = tc(maxId + 2), WARM = tc(maxId + 3);   // Android TC-077 – TC-079, iOS TC-046 – TC-048

const rows = body.map(r => [...r, 'unchanged', '']);
const find = (id: string) => { const r = rows.find(x => x[col('ID')] === id); if (!r) throw new Error(`no ${id}`); return r; };
const steps = (a: string[]) => a.map((s, i) => `${i + 1}. ${s}`).join('\n');
const lines = (a: string[]) => a.join('\n');
const BASE = ['PowerDirector signed in on the test account', 'App language English', 'The Cinematic Reel Creator tutorial was dismissed before (its template page opens directly)'];
const PAGE = 'Launcher › 「Cinematic Reel Creator」 open on its template page';
const OFF = ios ? 'Wi-Fi off and no cellular data (the phone on USB, Appium confirmed first)' : 'Wi-Fi off (device-android.ts wifi off, the phone on USB) and no mobile data';
const BACK = ios ? '' : ' System Back is TC-020.';

// The rows the new ones extend
const gotIt = find('TC-007'), dataSource = find('TC-019');
if (!gotIt[col('Spec Ref')].includes('R-010') || !dataSource[col('Spec Ref')].includes('R-014')) throw new Error(`${PLATFORM}: TC-007 / TC-019 are not the 「Got it」 and data source rows`);
const afterClose = ios ? gotIt : find('TC-020');
if (!ios && !afterClose[col('Action')].includes('system Back')) throw new Error('android: TC-020 is not the system Back row');

// ---- Q-3: the two ways to close that the Design does not draw ----
const closeRow = [CLOSE, gotIt[col('Section')], steps([...BASE, PAGE, 'The 「Micro Cinema」 card in view']), steps([
  'Tap 「View photo tips」 on the 「Micro Cinema」 card',
  'Tap the dimmed template page above the sheet, below the header',
  'If the sheet is still open, tap 「Got it」',
  'Tap 「View photo tips」 on the same card again',
  'Swipe the sheet down, starting on its first sentence (not on the 「Avoid」 row)',
  'If the sheet is still open, tap 「Got it」',
]), lines([
  'Step 2: record whether the sheet closes or stays open',
  'Step 2: nothing behind the dim reacts: the template page stays on the 「Micro Cinema」 card and no other screen opens',
  'Step 5: record whether the sheet closes, follows the finger and springs back, or does not move',
  'Steps 3 and 6: once the sheet is closed the dim is gone and the template page shows the 「Micro Cinema」 card, as before step 1',
  'Steps 2 and 5: the Design draws only 「Got it」 and says nothing of these two gestures (Q-3), so neither outcome is a Pass: record what each does as Fail (question) for PM',
]), 'P3', `R-010; ${REQ}`,
`Q-3: 「Got it」 is TC-007.${BACK} The same two gestures on a sheet opened from Add Media wait for Q-1 (no 「?」 there yet).`,
'new', `${REQ}: Q-3 — no row tapped the dimmed area or swiped the sheet down (R-010)`];

// ---- Q-4: the feature with the CMS out of reach ----
const coldRow = [COLD, dataSource[col('Section')], steps([...BASE, 'PowerDirector force-stopped (not running)', OFF]), steps([
  'Launch PowerDirector',
  'Tap 「Cinematic Reel Creator」 on the Launcher',
  'Swipe through the template cards',
  'Tap 「View photo tips」 on the first card that shows the chip (skip steps 4–5 when no card shows one)',
  'Tap 「Got it」',
  'Turn Wi-Fi back on',
  'Leave Cinematic Reel Creator and open it again',
  'Tap 「View photo tips」 on the 「Micro Cinema」 card',
]), lines([
  'Step 2: record what opens: the template page with its cards, an empty page, a loading state or an offline message (quote it)',
  'Step 3: record which cards show and whether each has the 「View photo tips」 chip',
  'Step 4: record what the sheet shows: its sentence, headings and captions, and whether the pictures load or stay blank',
  'Steps 1–5: the app does not crash or freeze, and every screen can be left',
  'Step 8: back online the Micro Cinema sheet shows 「Mid-Distance Framing」 and 「Rich Visual Details」 under 「Recommendation」 and 「Flat Composition」, 「Visible Text or Logos」 and 「Extreme Close-up」 under 「Avoid」, each with its picture',
  'Steps 2–4: no spec says what the feature shows without the CMS (Q-4), so no outcome is a Pass: record it as Fail (question) for PM',
]), 'P2', `R-014, R-001, R-012; ${REQ}`,
`Q-4, the offline half: a new app process with no network. Data kept on the phone from an earlier online visit may still show: say so if the page looks complete. Real network loss; turn Wi-Fi back on in step 6 whatever happened. The other half of Q-4, a template with no recommend_samples, cannot be set up by QA (the CMS is the server's).`,
'new', `${REQ}: Q-4 — no row opened the feature offline (R-014, R-001)`];

const warmRow = [WARM, dataSource[col('Section')], steps([...BASE, 'A new app process: PowerDirector force-stopped and launched again with Wi-Fi on', PAGE, 'The phone on USB (Appium confirmed)']), steps([
  'Tap 「View photo tips」 on the 「Micro Cinema」 card and wait for its pictures',
  'Tap 「Got it」',
  'Turn Wi-Fi off',
  'Tap 「View photo tips」 on the 「Micro Cinema」 card again',
  'Tap 「Got it」',
  'Tap 「View photo tips」 on the 「Time Lapse」 card (not opened since the launch)',
  'Tap 「Got it」',
  'Turn Wi-Fi back on',
  'Tap 「View photo tips」 on the 「Time Lapse」 card',
]), lines([
  'Step 4: record whether the sheet opens and whether its sentence, captions and pictures still show',
  'Step 6: record whether the sheet opens and whether its captions and pictures show, stay blank or give a message (quote it)',
  'Steps 3–7: record whether the cards keep their 「View photo tips」 chips',
  'Steps 3–7: the app does not crash or freeze, and each sheet that opened closes with 「Got it」',
  'Step 9: back online the Time Lapse sheet shows 「Visible Sky」 and 「Cityscape or Landscape」 under 「Recommendation」 and 「Portrait as Subject」, 「Indoor Close-up」 and 「Extreme Close-up」 under 「Avoid」, each with its picture',
  'Steps 4 and 6: no spec says what a sheet shows without the CMS (Q-4), so no outcome is a Pass: record it as Fail (question) for PM',
]), 'P2', `R-014, R-012; ${REQ}`,
`Q-4, the offline half: the network is lost after one sheet was loaded. ${ios ? 'No cellular data on the phone.' : 'No mobile data on the phone (device-android.ts wifi off).'} Pictures of Time Lapse kept from an earlier row may still show: say so. Real network loss; turn Wi-Fi back on in step 8 whatever happened.`,
'new', `${REQ}: Q-4 — no row reopened a loaded sheet, or opened a new one, after the network was lost (R-014)`];

// right after the rows they extend (REQ-033)
rows.splice(rows.indexOf(afterClose) + 1, 0, closeRow);
rows.splice(rows.indexOf(dataSource) + 1, 0, coldRow, warmRow);
if (rows[rows.length - 1][col('Section')] !== 'MUI') throw new Error('the MUI section is no longer last');
writeFileSync(join(DIR, 'draft.csv'), (bom ? '﻿' : '') + toCsv([[...H, 'Change', 'Change Reason'], ...rows]));

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const setQ = (q: string, text: string) => {
  const m = req.match(new RegExp(`\\n- ${q} [^\\n]*\\n`)); if (!m) throw new Error(`${PLATFORM}: ${q} not found`);
  req = req.replace(m[0], `\n- ${q} ${text}\n`);
};
setQ('Q-3', ios
  ? `Closing: the Design draws only 「Got it」. Does tapping the dimmed area or swiping the sheet down close it? Assumption: none for those two: ${CLOSE} does both and records what each does as Fail (question) for PM; 「Got it」 is checked by TC-007. R-010, TC-007, ${CLOSE}.`
  : `Closing: the Design draws only 「Got it」. Does tapping the dimmed area or swiping the sheet down close it, and does system Back? Assumption: system Back closes the sheet like 「Got it」 (TC-020; from Add Media TC-021); none for the other two: ${CLOSE} does both and records what each does as Fail (question) for PM. R-010, R-016, TC-007, TC-020, TC-021, ${CLOSE}.`);
setQ('Q-4', `Missing data: what shows when a template has no recommend_samples in the CMS, or the CMS cannot be reached (offline)? Assumption: none. Offline: ${COLD} (the app started with no network) and ${WARM} (a sheet loaded online, then reopened offline, and one not opened before) record what the template page, the chip and the sheet show as Fail (question) for PM. A template with no recommend_samples cannot be set up by QA (the CMS is the server's and every template has its items): that half needs PM's answer and has no row. R-001, R-012, R-014, ${COLD}, ${WARM}.`);
const zh: Record<string, string> = JSON.parse(readFileSync(join(TABLE, 'questions.zh-Hant.json'), 'utf8'));
zh['Q-3'] = ios
  ? `關閉方式：Design 只畫了「Got it」。點變暗的區域或把面板往下滑，會不會關閉？這兩種手勢沒有假設：${CLOSE} 兩種都做，把各自的結果記為 Fail（question）交給 PM；「Got it」由 TC-007 檢查。`
  : `關閉方式：Design 只畫了「Got it」。點變暗的區域或把面板往下滑會不會關閉？系統返回鍵呢？假設：系統返回鍵和「Got it」一樣會關閉面板（TC-020；從 Add Media 開的是 TC-021）；另外兩種手勢沒有假設：${CLOSE} 兩種都做，把各自的結果記為 Fail（question）交給 PM。`;
zh['Q-4'] = `缺資料時：範本在 CMS 沒有 recommend_samples，或連不上 CMS（離線）時，畫面顯示什麼？沒有假設。離線的部分：${COLD}（沒有網路時啟動 App）和 ${WARM}（連線時載入過的面板離線後再開一次，再開一個沒開過的）記下範本頁、chip 和面板顯示的內容，記為 Fail（question）交給 PM。沒有 recommend_samples 的範本 QA 做不出來（CMS 在伺服器端，每個範本都有資料）：這一半要等 PM 回答，沒有對應的案例。`;
writeFileSync(join(DIR, 'questions.zh-Hant.json'), JSON.stringify(zh, null, 2) + '\n');

const QUOTE1 = '「if it\'s a new question it should be added to the cases and be run next round」', QUOTE2 = '「shouldn\'t they be added to cases already?」';
{
  const m = req.match(/\n## View photo tips chip\n/); if (!m) throw new Error('no first section');
  req = req.replace(m[0], `\nDraft ${DRAFT} [Req: ${REQ}]: every Open question that is still open gets a row that takes the app to the point in
question (user, 2026-11-25: ${QUOTE1}, ${QUOTE2}). New rows: ${CLOSE} (Q-3: tap the dimmed area, swipe the sheet
down), ${COLD} and ${WARM} (Q-4: offline). Q-1, Q-2 and Q-5 already name the rows that observe them. No requirement changes.\n${m[0]}`);
}
const addToTable = (heading: string, add: string[]) => {
  const i = req.indexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/) ?? after.match(/\n\|[^\n]*\|$/); if (!m) throw new Error(`no table under ### ${heading}`);
  const end = i + m.index! + m[0].replace(/\n$/, '').length;
  req = req.slice(0, end) + '\n' + add.join('\n') + req.slice(end);
};
addToTable('Hidden clauses', [
  `| R-014 | The items are fetched from the server, so they can be out of reach (Q-4) | The template page, the chips and the sheets with the phone offline, at a cold start and after one sheet was loaded | ${COLD}, ${WARM} |`,
  `| R-010 | 「Got it」 is the only way to close that the Design draws (Q-3) | A tap on the dimmed area and a swipe down on the sheet | ${CLOSE} |`,
]);
addToTable('Request ledger coverage', [
  `| ${REQ} (table: every Open question still open gets an observing row, 2026-11-25) | R-010 (${CLOSE}); R-014, R-001, R-012 (${COLD}, ${WARM}); Q-3, Q-4 |`,
]);
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- carried over: traces (same spec set; the new rows press the chip and 「Got it」 like the rows they extend) and the run plan ----
for (const f of ['annotation-trace.json', 'control-trace.json']) {
  const from = [join(TABLE, 'drafts', PREV, f), join(TABLE, f)].find(existsSync);
  if (!from) continue;
  let text = readFileSync(from, 'utf8');
  if (f === 'control-trace.json') {
    const add = (press: string, more: string) => { if (!text.includes(`"press": "${press}"`)) throw new Error(`control-trace: no press ${press}`); text = text.replace(`"press": "${press}"`, `"press": "${press}, ${more}"`); };
    add('TC-001, TC-002, TC-003, TC-004, TC-005, TC-006', `${CLOSE}, ${COLD}, ${WARM}`);
    add('TC-007, TC-016', `${CLOSE}, ${COLD}, ${WARM}`);
  }
  writeFileSync(join(DIR, f), text);
}
const phases = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'phases.json'), 'utf8'));
writeFileSync(join(DIR, 'phases.json'), JSON.stringify({ ...phases, draft: DRAFT }, null, 2) + '\n');

// ---- spec.json and update-plan.md ----
const prevSpec = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'spec.json'), 'utf8'));
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({ ...prevSpec, draft: DRAFT, created_at: '2026-11-25T11:00:00.000Z', based_on_version: manifest.version }, null, 2) + '\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Cinematic Reel Creator Photo Tips / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change comes from the request ledger [${REQ}]
(user, 2026-11-25: ${QUOTE1}, ${QUOTE2}): every Open question that is still open gets a row that takes the app to
the point in question, so the next run reaches it (analysis.md, 「Every Open question gets an observing row」).

## Spec files
- Unchanged: spec set ${manifest.spec_folder}. New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-3 | gets a row | only 「Got it」${ios ? '' : ' and system Back'} checked; the dimmed area and the swipe down had no row | ${CLOSE} does both and records them as Fail (question) for PM |
| Q-4 | gets rows | 「no row until PM answers」 | ${COLD}, ${WARM} record the feature offline; the no-recommend_samples half has no row (QA cannot set it up) |
| Hidden clauses | 2 lines added | — | R-014 (${COLD}, ${WARM}), R-010 (${CLOSE}) |

No R- requirement changes.

## Case changes
- New (3):
  - ${CLOSE} (R-010), right after ${afterClose[col('ID')]}: tap the dimmed template page, then swipe the sheet down; records whether each
    closes the sheet; nothing behind the dim may react.
  - ${COLD} (R-014, R-001, R-012), right after TC-019: the app force-stopped, network off, launch, open Cinematic Reel
    Creator; records the template page, the chips and the sheet; back online the Micro Cinema sheet is complete.
  - ${WARM} (R-014, R-012), right after ${COLD}: one sheet loaded online, network off, the same sheet and a new one
    (Time Lapse) opened; back online the Time Lapse sheet is complete.
- Modified (0)
- Removed (0)
- Unchanged: ${body.length}

## Found by the analysis
- Open questions against the rows${ios ? ' (no iOS run yet, so every question is open)' : ' (question-status.json: Q-5 determined; Q-3 not reached, Q-4 to file)'}:
  Q-1 (TC-010 – TC-016${ios ? '' : ', TC-021'}), Q-2 (the Language rows) and Q-5 (TC-008) already name rows that reach their point.
- Q-3 and Q-4 cited requirements that have rows, but no row made the gesture or cut the network.
- Controls (pass 11): the chip and 「Got it」 are also pressed by the new rows (control-trace.json${existsSync(join(DIR, 'control-trace.json')) ? '' : ': none in this table'}).

## Not added (value check)
- A template with no recommend_samples (Q-4): QA cannot empty the CMS, so no row can show it.
- The two gestures on a sheet opened from Add Media: there is no 「?」 in Add Media (Q-1${ios ? '' : ', DRA262611P0289'}); they follow once it exists.
- An offline row per template or per language: the offline behaviour is one question; one cold and one warm row reach it.

## How the rows run
- ${COLD} and ${WARM} turn Wi-Fi off and back on (AGENTS.md 「On the phone」: only with the phone on USB); no credits, no
  generation, no photo picked.
- phases.json is carried over unchanged from draft ${PREV}; the three rows join the plan of the next full run
  (${CLOSE} with TC-007, ${COLD} / ${WARM} last, so a lost network cannot disturb other rows).

## Questions for PM
- Q-3 Should a tap on the dimmed area or a swipe down close the photo tips sheet?
- Q-4 What should the chip and the sheet show offline, and for a template with no recommend_samples?

## Questions for you
- None.
`);

for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${body.length} approved rows + 3 new (${CLOSE}, ${COLD}, ${WARM}) → ${join(DIR, 'draft.csv')}`);
