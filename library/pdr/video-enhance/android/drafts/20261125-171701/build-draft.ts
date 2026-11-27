// Draft 20261125-171701 (both platforms; the iOS draft folder holds the same file): the user's ruling on Q-21
// [Req: REQ-044]: the playhead knob moves only between the two white trim handles, and play starts from the playhead.
// Rebuilds draft.csv, requirements.md, spec.json, update-plan.md, control-trace.json and phases.json in this folder from
// the approved table (v12 Android / v9 iOS). Run: node library/pdr/video-enhance/<platform>/drafts/20261125-171701/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261125-171701';
const PREV = '20261124-150000';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));

const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8'));
const H = approved[0];
const col = (n: string) => { const i = H.indexOf(n); if (i < 0) throw new Error(`no column ${n}`); return i; };
const body = approved.slice(1).filter(r => r.length > 1);
const maxId = Math.max(...body.map(r => +r[col('ID')].slice(3)));
const STOP = `TC-${maxId + 1}`, PLAY = `TC-${maxId + 2}`;   // Android TC-348 / TC-349, iOS TC-347 / TC-348
const RULING = '「play should start from where the playhead is and it can be dragged between the two white <> icons」';

// ---- rows ----
const swap = (text: string, from: string, to: string, what: string) => {
  if (!text.includes(from)) throw new Error(`${PLATFORM}: ${what}: text to replace not found`);
  return text.replace(from, to);
};
const rows = body.map(r => [...r, 'unchanged', '']);
const find = (id: string) => { const r = rows.find(x => x[col('ID')] === id); if (!r) throw new Error(`no ${id}`); return r; };

const t215 = find('TC-215');
t215[col('Notes')] = swap(t215[col('Notes')], 'Q-21: how far the playhead may go is not stated.',
  `The playhead moves only between the two trim handles (REQ-044, the answer to Q-21): its stop at each handle is ${STOP}, play from it ${PLAY}.`, 'TC-215 Notes');
t215[H.length] = 'modified';
t215[H.length + 1] = `REQ-044: Q-21 answered (the playhead stays between the trim handles); the Notes no longer call its range unstated and point to ${STOP} and ${PLAY}`;

const t037 = find('TC-037');
t037[col('Expected Result')] = swap(t037[col('Expected Result')], 'Step 1 plays from inside the selection (02:00 onward) and the time advances',
  'Step 1 plays from the playhead\'s position, which is inside the selection (02:00 or later), and the time advances from there', 'TC-037 Expected Result');
t037[col('Notes')] = `${t037[col('Notes')]} Play starts from the playhead (REQ-044); a start from a chosen point: ${PLAY}.`;
t037[H.length] = 'modified';
t037[H.length + 1] = 'REQ-044: R-027 now says play starts from the playhead\'s position (Q-21 answered)';

const pre = (extra: string[]) => [
  'Panel open with the 12:30 video (time burned into every frame)',
  'Selection trimmed to 00:30–02:00 (「01:30」), shorter than the video at both ends',
  ...extra,
].map((s, i) => `${i + 1}. ${s}`).join('\n');
const lines = (a: string[]) => a.join('\n');
const steps = (a: string[]) => a.map((s, i) => `${i + 1}. ${s}`).join('\n');

const stopRow = [STOP, 'Trim and selected length', pre(['Note the CTA price']), steps([
  'Drag the ◀▶ knob to the right, past the right › handle, and keep pushing for a second',
  'Let go',
  'Drag the ◀▶ knob to the left, past the left ‹ handle, and keep pushing for a second',
  'Let go',
]), lines([
  'Step 1: the playhead stops at the right handle and goes no further, however far the finger moves',
  'Step 1: the bubble reads 「02:00」 and the Preview reads 「02:00/12:30」',
  'Step 1: the Preview shows the frame at the right handle (burned-in 02:00)',
  'Step 2: the playhead stays at the right handle with the same bubble and Preview time',
  'Step 3: the playhead stops at the left handle and goes no further',
  'Step 3: the bubble reads 「00:30」 and the Preview reads 「00:30/12:30」',
  'Step 3: the Preview shows the frame at the left handle (burned-in 00:30)',
  'Step 4: the playhead stays at the left handle with the same bubble and Preview time',
  'Steps 1–4: both trim handles stay at 00:30 and 02:00',
  'Steps 1–4: 「Selected Length」 stays 「01:30」',
  'Steps 1–4: the CTA price stays the noted one',
]), 'P2', 'R-193; REQ-044',
`Ruling (user, 2026-11-25, REQ-044; the answer to Q-21): the playhead can be dragged only between the two white ‹ › trim handles. A selection shorter than the video at both ends tells a stop at a handle from a stop at the video's start or end. The playhead may land a frame off a handle (TC-273).`,
'new', 'REQ-044: the playhead stops at each trim handle and cannot leave the selection (R-193)'];

const playRow = [PLAY, 'Trim and selected length', pre(['The Preview is paused', 'Note the CTA price']), steps([
  'Drag the ◀▶ knob to about 01:00',
  'Let go and note the bubble\'s time',
  'Tap play under the Preview',
  'After about 5 s tap the same button (pause)',
  'Drag the ◀▶ knob to about 01:30',
  'Let go and note the bubble\'s time',
  'Tap play under the Preview',
  'After about 5 s tap the same button (pause)',
]), lines([
  'Step 2: the bubble and the Preview time agree (about 「01:00」 and 「01:00/12:30」)',
  'Step 3: playback starts from the time noted in step 2, not from the selection start 00:30',
  'Step 3: the first frame played is the one at the noted time (burned-in time)',
  'Step 3: the playhead, the bubble and the Preview time advance together from the noted time',
  'Step 4: playback pauses about 5 s after the noted time (about 「01:05」)',
  'Step 6: the bubble and the Preview time agree (about 「01:30」 and 「01:30/12:30」)',
  'Step 7: playback starts from the time noted in step 6, not from 00:30 and not from where step 4 paused',
  'Step 7: the playhead, the bubble and the Preview time advance together from that time',
  'Steps 1–8: both trim handles stay at 00:30 and 02:00',
  'Steps 1–8: 「Selected Length」 stays 「01:30」',
  'Steps 1–8: the CTA price stays the noted one',
]), 'P2', 'R-193, R-027; REQ-044',
`Ruling (user, 2026-11-25, REQ-044; the answer to Q-21): play starts from where the playhead is. The pause is R-200 (TC-037). Both plays are paused before the right handle: what playback does on reaching the end of the selection is not stated (Q-28), so it is not asserted here.`,
'new', 'REQ-044: play starts from the playhead\'s position, not from the selection start (R-193, R-027)'];

// right after the row they extend (REQ-033): TC-215, the playhead drag
const at = rows.indexOf(t215);
rows.splice(at + 1, 0, stopRow, playRow);
writeFileSync(join(DIR, 'draft.csv'), toCsv([[...H, 'Change', 'Change Reason'], ...rows]));

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const reqSwap = (from: string | RegExp, to: string, what: string) => {
  const hit = typeof from === 'string' ? req.includes(from) : from.test(req);
  if (!hit) throw new Error(`${PLATFORM}: requirements.md: ${what} not found`);
  req = req.replace(from, to);
};
const intro = `\nDraft ${DRAFT} [Req: REQ-044]: the user's ruling on Q-21 (2026-11-25): ${RULING}. The playhead
knob moves only between the two white trim handles and stops at a handle; play starts from the playhead's position.
Changed: R-027, R-193; answered: Q-21; new: Q-28 (what play does at the end of the selection). Rows: TC-215 and TC-037
modified, ${STOP} (the stop at each handle) and ${PLAY} (play from the playhead) new.\n`;
reqSwap(/\n## (Entry points)/, `${intro}\n## $1`, 'Entry points heading');

reqSwap('- R-027 [DS:ds-main-flow VE · 02] The Preview\'s play button plays the video from the selection and the full-screen icon opens a full-screen preview.',
  '- R-027 [DS:ds-main-flow VE · 02; Req: REQ-044] The Preview\'s play button plays the video from the playhead\'s position, which is always inside the selection (R-193), and the full-screen icon opens a full-screen preview.', 'R-027');

const R193_HEAD = '- R-193 [DS:ds-ai-video-enhance Length; DS:ds-main-flow VE · 01 knob round/ic_btn_drag] Dragging the playhead knob moves the playhead: the Preview shows the frame under it and the bubble and the Preview time follow; the trim handles, Selected Length and the price do not change';
const R193_NEW = '- R-193 [DS:ds-ai-video-enhance Length; DS:ds-main-flow VE · 01 knob round/ic_btn_drag; Req: REQ-044] Dragging the playhead knob moves the playhead: the Preview shows the frame under it and the bubble and the Preview time follow; the trim handles, Selected Length and the price do not change. The playhead moves only between the two white trim handles (the left ‹ and the right ›): dragged against a handle it stops there, with the bubble and the Preview time at that handle\'s time, and it cannot leave the selection. Tapping play starts playback from the playhead\'s position, not from the selection start (user ruling, 2026-11-25, REQ-044; answers Q-21).';
reqSwap(`${R193_HEAD} (how far it may go: Q-21).`, R193_NEW, 'R-193');

// Q-21: out of Open questions, into Answered questions with the answer and REQ-044
const q21 = req.match(/\n- Q-21 (Playhead: [^\n]*?) Assumption: [^\n]*\n/);
if (!q21) throw new Error(`${PLATFORM}: Q-21 not found`);
req = req.replace(q21[0], '\n');
const lastOpen = ios ? '- Q-26 ' : '- Q-27 ';
const q28 = `- Q-28 Play at the end of the selection (REQ-044): the ruling on Q-21 says play starts from the playhead and the playhead stays between the trim handles, but no source says what playback does when it reaches the right trim handle (stop there, jump back to the selection start, or loop). Assumption: none; no row asserts it: ${PLAY} pauses before the end, and what the build does at the right handle is noted in the run, not filed, until PM or the Design says. R-027, R-193 (${PLAY}, TC-037).`;
{
  const i = req.indexOf(`\n${lastOpen}`); if (i < 0) throw new Error(`${PLATFORM}: ${lastOpen} not found`);
  const end = req.indexOf('\n', i + 1);
  req = req.slice(0, end) + '\n' + q28 + req.slice(end);
}
const answered = `- Q-21 ${q21[1]} Answer (2026-11-25, REQ-044; user ruling in chat): ${RULING}: the playhead knob can be dragged only between the two white trim handles and stops at a handle, and play starts from the playhead's position. What play does at the end of the selection is still open (Q-28). R-027, R-193 (TC-215, ${STOP}, ${PLAY}, TC-037).`;
{
  const i = req.indexOf('\n## Answered questions\n'); if (i < 0) throw new Error(`${PLATFORM}: no Answered questions`);
  const next = req.indexOf('\n## ', i + 5);
  const head = req.slice(0, next).replace(/\n+$/, '');
  req = head + '\n' + answered + '\n' + req.slice(next);
}

const addToTable = (heading: string, add: string[]) => {
  const i = req.indexOf(`\n### ${heading}\n`); if (i < 0) throw new Error(`no ### ${heading}`);
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/) ?? after.match(/\n\|[^\n]*\|$/); if (!m) throw new Error(`no table under ### ${heading}`);
  const end = i + m.index! + m[0].replace(/\n$/, '').length;
  req = req.slice(0, end) + '\n' + add.join('\n') + req.slice(end);
};
addToTable('Hidden clauses', [
  `| R-193 | the playhead cannot pass a trim handle (REQ-044) | a selection shorter than the video at both ends (00:30–02:00 of 12:30) and the knob pushed past each handle: the bubble and the Preview time stop at the handle's time | ${STOP} |`,
  `| R-193 | play starts from the playhead, not from the selection start (REQ-044) | the playhead parked inside the selection away from its start before play: the first Preview time and burned-in frame after the tap | ${PLAY} |`,
]);
addToTable('Variants', [
  `| R-193 | the knob pushed past the right handle | ${STOP} |`,
  `| R-193 | the knob pushed past the left handle | ${STOP} |`,
]);
addToTable('Request ledger coverage', [
  ...(/\| REQ-042 /.test(req) ? [] : ['| REQ-042 (table: the MUI rows\' Expected Result lines are numbered; numbering only) | R-208, R-209 (the MUI rows, TC-321 onward) |']),
  `| REQ-044 (ruling: Q-21 — the playhead moves only between the two trim handles; play starts from the playhead) | R-027, R-193 (TC-215, TC-037, ${STOP}, ${PLAY}); Q-28 |`,
]);
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- control-trace.json: the knob and the play button are also pressed by the new rows ----
let trace = readFileSync(join(TABLE, 'control-trace.json'), 'utf8');
const press = (name: string, from: string, to: string) => {
  const i = trace.search(new RegExp(`"name":\\s*"${name.replace(/[/]/g, '\\/')}"`)); if (i < 0) throw new Error(`control-trace: no ${name}`);
  const m = trace.slice(i).match(/"press":\s*"([^"]*)"/); if (!m || m[1] !== from) throw new Error(`control-trace: ${name} press is ${m?.[1]}`);
  const j = i + m.index!;
  trace = trace.slice(0, j) + m[0].replace(from, to) + trace.slice(j + m[0].length);
};
press('round/ic_btn_drag', 'TC-215', `TC-215, ${STOP}, ${PLAY}`);
press('round/ic_play', 'TC-037, TC-150', `TC-037, TC-150, ${PLAY}`);
writeFileSync(join(DIR, 'control-trace.json'), trace);

// ---- carried over unchanged: the annotation trace (same spec set) and the run plan (the new rows join the next run's plan) ----
copyFileSync(join(TABLE, 'drafts', PREV, 'annotation-trace.json'), join(DIR, 'annotation-trace.json'));
const phases = JSON.parse(readFileSync(join(TABLE, 'drafts', PREV, 'phases.json'), 'utf8'));
writeFileSync(join(DIR, 'phases.json'), JSON.stringify({ ...phases, draft: DRAFT }, null, 2) + '\n');

// ---- spec.json and update-plan.md ----
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/video-enhance', platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-25T09:17:01.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — Video Enhance / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change is a ruling from the user on Open question
Q-21 [REQ-044]: ${RULING}.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-193 | changed | The knob moves the playhead; how far it may go was open (Q-21) | The playhead moves only between the two white trim handles and stops at a handle; play starts from the playhead's position |
| R-027 | reworded | Play plays the video 「from the selection」 | Play plays from the playhead's position, which is always inside the selection (R-193) |
| Q-21 | answered | Open question | Moved to Answered questions with the ruling and REQ-044 |
| Q-28 | new question | — | What playback does on reaching the right trim handle (stop, jump back or loop): not stated, no row asserts it |
${/REQ-042/.test(readFileSync(join(TABLE, 'requirements.md'), 'utf8')) ? '' : '| Request ledger coverage | fixed | REQ-042 (MUI numbering) was not cited: `check.ts` failed the approved table on it | Cited with R-208, R-209 |\n'}
## Case changes
- New (2), placed right after TC-215 in 「Trim and selected length」:
  - ${STOP} (R-193): with the selection 00:30–02:00 of the 12:30 video, the knob pushed past the right and then the
    left handle stops at the handle (bubble and Preview time 「02:00」, then 「00:30」); the handles, 「Selected Length」
    and the price do not change.
  - ${PLAY} (R-193, R-027): the knob parked at about 01:00, then 01:30; play starts from that point each time, not
    from the selection start, and the playhead, bubble and Preview time advance from it.
- Modified (2):
  - TC-215: Notes only: the playhead's range is no longer 「not stated」; they cite REQ-044 and the two new rows. Its
    drags already stay inside the selection, so its steps and expected results stand.
  - TC-037: step 1 now reads 「plays from the playhead's position, which is inside the selection (02:00 or later)」
    (R-027 reworded); the Notes point to ${PLAY}.
- Removed (0)
- Unchanged: ${body.length - 2}

## Found by the analysis
- Searched every row for the Q-21 assumption and for where play starts (REQ-010 rule on changed requirements): only
  TC-215 (Notes) and TC-037 (step 1) rest on them. TC-270 and TC-273 drag the playhead to a handle and already agree
  with the ruling.
- Pass 9 hidden clauses: R-193 → ${STOP} (cannot pass a handle), ${PLAY} (play from the playhead). Pass 10 variants:
  right handle and left handle, both in ${STOP}.
- Controls (pass 11): the knob (round/ic_btn_drag) is now pressed by TC-215, ${STOP}, ${PLAY}; play by TC-037,
  TC-150, ${PLAY} (control-trace.json).

## Not added (value check)
- Play running to the end of the selection: no source says what happens at the right handle, so it is Q-28, not a row.
- A trim handle dragged over the playhead: R-031 already keeps the Preview (and with R-192 the bubble) at the dragged
  handle (TC-042, TC-214), so the playhead follows the handle; no separate row.
- The full-screen preview's own start point: the ruling is about the panel's playhead; TC-037 keeps its check.

## How the rows run
- No new fixture: the 12:30 video with its time burned in. No task is started and no credits are spent.
- phases.json is carried over unchanged from draft ${PREV}; the two new and two modified rows join the plan of the next
  run or recheck (${STOP} and ${PLAY} sit with TC-215 in the 「Panel layout, first-run bubble and trim」 segment).

## Questions for PM
- Q-28 What does playback do when it reaches the right trim handle: stop there, jump back to the selection start, or loop?

## Questions for you
- None.
`);

// Chinese copy: start from the approved one, so only the new and changed rows need translating (zh-copy.ts export / merge)
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${body.length} approved rows (2 modified) + 2 new (${STOP}, ${PLAY}) → ${join(DIR, 'draft.csv')}`);
