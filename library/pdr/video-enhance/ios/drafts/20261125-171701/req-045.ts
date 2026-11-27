// REQ-045 (user, 2026-11-25): every Open question that is still open gets a row that takes the app to the point in
// question and records what it does (analysis.md, "Every Open question gets an observing row").
// The same file sits in android/drafts/20261125-190000/ and ios/drafts/20261125-171701/. It is not run by itself:
// each folder's build-draft.ts first rebuilds the draft and then imports this file, which patches draft.csv,
// requirements.md, control-trace.json and update-plan.md of its own folder.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DIR = dirname(fileURLToPath(import.meta.url));
const DRAFT = basename(DIR);
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const ios = PLATFORM === 'ios';
const SAID = '「if it\'s a new question it should be added to the cases and be run next round」 and 「shouldn\'t they be added to cases already?」';

// ---- rows ----
const table = parseCsv(readFileSync(join(DIR, 'draft.csv'), 'utf8'));
const H = table[0];
const col = (n: string) => { const i = H.indexOf(n); if (i < 0) throw new Error(`no column ${n}`); return i; };
const rows = table.slice(1).filter(r => r.length > 1);
const find = (id: string) => { const r = rows.find(x => x[col('ID')] === id); if (!r) throw new Error(`${PLATFORM}: no ${id}`); return r; };
const swap = (text: string, from: string, to: string, what: string) => {
  if (!text.includes(from)) throw new Error(`${PLATFORM}: ${what}: text to replace not found`);
  return text.replace(from, to);
};
const modify = (r: string[], reason: string) => {
  // a row this draft already added or changed keeps its Change; its reason gains this one
  if (r[col('Change')] === 'unchanged') { r[col('Change')] = 'modified'; r[col('Change Reason')] = reason; }
  else r[col('Change Reason')] = `${r[col('Change Reason')]}; ${reason}`;
};
const maxId = Math.max(...rows.map(r => +r[col('ID')].slice(3)));
// Android TC-350 / TC-351; iOS TC-349 / TC-350 / TC-351
const END = `TC-${maxId + 1}`, CONSENT = `TC-${maxId + 2}`, PILL = ios ? `TC-${maxId + 3}` : '';
const steps = (a: string[]) => a.map((s, i) => `${i + 1}. ${s}`).join('\n');
const lines = (a: string[]) => a.join('\n');
const row = (o: Record<string, string>) => H.map(h => o[h] ?? '');

// Q-28: play to the end of the selection. Right after the row it extends: play from the playhead (REQ-044).
const play = rows.find(r => r[col('Notes')].includes('Both plays are paused before the right handle'));
if (!play) throw new Error(`${PLATFORM}: the play-from-the-playhead row was not found`);
const PLAY = play[col('ID')];
play[col('Notes')] = swap(play[col('Notes')], 'is not stated (Q-28), so it is not asserted here.',
  `is not stated (Q-28): ${END} plays to the right handle and records it.`, `${PLAY} Notes`);
modify(play, `REQ-045: the Notes name ${END}, the row that plays to the end of the selection (Q-28)`);

const endRow = row({
  ID: END, Section: play[col('Section')],
  Precondition: steps([
    'Panel open with the 12:30 video (time burned into every frame)',
    'Selection trimmed to 00:30–02:00 (「01:30」), shorter than the video at both ends',
    'The Preview is paused',
  ]),
  Action: steps([
    'Drag the ◀▶ knob to about 01:50',
    'Let go and note the bubble\'s time',
    'Start a screen recording',
    'Tap play under the Preview',
    'Leave the screen untouched for 30 s (playback reaches the right handle at 02:00 after about 10 s)',
    'Stop the recording',
    'Tap the button under the Preview once more',
  ]),
  'Expected Result': lines([
    'Step 4: playback starts from the time noted in step 2, and the playhead, the bubble and the Preview time advance together up to the right handle (02:00)',
    'Step 5: what playback does on reaching the right handle is recorded: it stops there, it jumps back (to the selection start 00:30 or to the time noted in step 2) or it plays on past 02:00',
    'Step 5: after a jump back, whether it plays again by itself (a loop) or waits paused is recorded',
    'Step 5: where the playhead and its bubble rest 20 s after the handle was reached is recorded',
    'Step 5: the Preview time and the burned-in time of the frame shown at that moment are recorded',
    'Step 5: the state of the button under the Preview at that moment (play or pause icon) is recorded',
    'Step 7: what the tap does is recorded (it plays or pauses) and, when it plays, the time it starts from',
    'Steps 1–7: both trim handles stay at 00:30 and 02:00',
    'Steps 1–7: 「Selected Length」 stays 「01:30」',
    'No source states what play does at the end of the selection (Q-28), so whichever outcome is seen the row is recorded as Fail (question) for PM with what was recorded, never as a Pass',
  ]),
  Priority: 'P2', 'Spec Ref': 'R-027, R-193; REQ-045',
  Notes: `Q-28 [Req: REQ-045]: stop, jump back or loop is not stated by the Design, PM or the ruling on Q-21 (REQ-044), so nothing is asserted about the end itself and the run's wrap-up files the recorded outcome to PM for a decision (BugBelong PM). A selection that ends before the video's end (02:00 of 12:30) tells a stop at the handle from a stop at the end of the video. The start from the playhead is ${PLAY}'s check.`,
  Change: 'new', 'Change Reason': `REQ-045: Open question Q-28 had no row that reaches its point (${PLAY} pauses before the end); this row plays to the right handle and records what the build does`,
});
rows.splice(rows.indexOf(play) + 1, 0, endRow);

// Q-14: the first Enhance after a reset. Right after the row it extends: TC-110, the Enhance tap.
const t110 = find('TC-110');
t110[col('Notes')] = `${t110[col('Notes')]} A consent or disclosure screen on the first 「Enhance」 after a reset is ${CONSENT}'s (Q-14), not this row's 「No confirmation」: run this row after it.`.trim();
modify(t110, `REQ-045: the Notes send a first-use consent screen to ${CONSENT} (Q-14) so it is not read as a failed 「No confirmation」`);

const consentRow = row({
  ID: CONSENT, Section: t110[col('Section')],
  Precondition: steps(ios ? [
    'PowerDirector freshly installed, with 「Enhance」 never tapped on this install',
    'Tier Pro+ (Launcher › Pink › ☰ › [0] IAP › status = Pro+, checked in Mine) with enough credits',
    'Every consent, notice or permission screen seen since the install noted (first launch, Demo page, first panel entry)',
    'Panel open with a 00:01 video and the defaults kept (the lowest price)',
  ] : [
    'PowerDirector\'s app data cleared (`adb shell pm clear`) or the app freshly installed, with 「Enhance」 not tapped since',
    'Signed in again with a Pro account (the phone\'s Google account button, no password) with enough credits',
    'Every consent, notice or permission screen seen since the reset noted (first launch, Demo page, first panel entry)',
    'Panel open with the 00:01 video (ve-000100-720p30, 「Enhance ◆ 1」) and the defaults kept',
  ]),
  Action: steps([
    'Tap 「Enhance ◆ <credits>」',
    'Take a screenshot of whatever shows before the processing dialog, without touching it',
    'Tap the accepting button of a consent or disclosure screen that showed',
  ]),
  'Expected Result': lines([
    'Step 1: what shows between the tap and the processing dialog is recorded: nothing (the processing dialog comes at once) or a consent or disclosure screen',
    'Step 2: the title, the whole text and the buttons of a screen that showed are recorded',
    'Step 2: whether its text says the video is sent to a third party\'s cloud for AI processing (ByteDance / BytePlus) is recorded',
    'Step 3: after the accepting button the processing dialog 「Video uploading...」 appears and the upload starts',
    'A consent or notice that showed earlier since the reset (precondition 3) is recorded with the screen it showed on',
    'No source says whether the dialog must show or what it reads (Q-14), so either outcome is recorded as Fail (question) for PM / Legal with what was recorded, never as a Pass',
  ]),
  Priority: 'P2', 'Spec Ref': 'R-080, R-085; REQ-045',
  Notes: (ios
    ? 'Q-14 (PM Open question 3, Legal) [Req: REQ-045]. iOS: PowerDirector cannot be reinstalled on the QA iPhone (AGENTS.md, until lifted), so this row is recorded Blocked --as test-data (「PowerDirector cannot be reinstalled on the QA iPhone」) until the rule is lifted or a phone with a fresh install is supplied. '
    : 'Q-14 (PM Open question 3, Legal) [Req: REQ-045]. ')
    + `One-way state (AGENTS.md, One-way state orders the run): only the first 「Enhance」 after a reset can show a first-use consent, so this is the first 「Enhance」 tap after the reset, on the same reset as TC-030 and before TC-110 and every other row that starts a task. When another row's first 「Enhance」 after the reset was already captured from the tap to the processing dialog, its evidence records this row. Nothing showing does not prove the dialog is missing when the account accepted it on an earlier install (the consent may be kept with the account): record whether the account had enhanced before. The upload is left to finish (the 00:01 video costs the least).`,
  Change: 'new', 'Change Reason': 'REQ-045: Open question Q-14 said 「No row asserts it」 and stayed open through three Android runs; this row takes a reset app to its first 「Enhance」 and records what shows before the upload',
});
rows.splice(rows.indexOf(t110) + 1, 0, consentRow);

if (ios) {
  // Q-15: what the panel's credit pill opens. Right after TC-320 (the Credit page's ‹), the pair of TC-096.
  const t320 = find('TC-320');
  rows.splice(rows.indexOf(t320) + 1, 0, row({
    ID: PILL, Section: t320[col('Section')],
    Precondition: steps([
      'Tier Pro+ (Launcher › Pink › ☰ › [0] IAP › status = Pro+, checked in Mine)',
      'Panel open with selection 00:30–05:30 and 「Sharp」',
      'Note the balance in the credit pill',
    ]),
    Action: steps([
      'Tap the credit pill in the panel\'s top bar',
      'Tap ‹ on the page that opened',
    ]),
    'Expected Result': lines([
      'Step 1: the Credit page opens (「My Credits」) and shows the noted balance',
      'Step 1: no upload dialog appears and Recent task gets no card',
      'Step 1: when another page opens, or nothing does, what the tap does is recorded (the page\'s title and what it offers)',
      'Step 2: the panel is back with the same video, the selection 00:30–05:30 and 「Sharp」',
      'Step 2: the credit pill shows the noted balance',
    ]),
    Priority: 'P3', 'Spec Ref': 'R-020, R-073; REQ-045',
    Notes: 'Q-15 [Req: REQ-045]: the spec does not say what the pill opens. Assumption from the Android build, where the tap opens 「My Credits」 (Android R3, 16.9.0); another target on iOS is recorded as Fail (question) for PM, not as a defect. Needs no low balance: the pill is tapped with credits on the account.',
    Change: 'new', 'Change Reason': 'REQ-045: Open question Q-15 had no iOS row that taps the panel\'s credit pill (TC-096 reaches the Credit page through 「Enhance」, TC-097 is parked on a purchase)',
  }));

  // Q-7: TC-093 walks the IAP page but did not say to record the trial line the question is about.
  const t093 = find('TC-093');
  t093[col('Expected Result')] = `${t093[col('Expected Result')]}\nWhether the page offers a free trial is recorded: a line such as 「Try Pro+ 7 days for free」 or 「Receive 35 credits during free trial」, or none`;
  t093[col('Notes')] = swap(t093[col('Notes')], 'conflicts with PM §7; not asserted.',
    'conflicts with PM §7, so neither is asserted and what the page shows is recorded for PM (the Android build shows no trial, R3).', 'TC-093 Notes');
  modify(t093, 'REQ-045: the row records whether a trial line shows, the point of Open question Q-7 (it was only 「not asserted」)');
}
writeFileSync(join(DIR, 'draft.csv'), toCsv([H, ...rows]));

// ---- requirements.md ----
let req = readFileSync(join(DIR, 'requirements.md'), 'utf8');
const reqSwap = (from: string | RegExp, to: string, what: string) => {
  const hit = typeof from === 'string' ? req.includes(from) : from.test(req);
  if (!hit) throw new Error(`${PLATFORM}: requirements.md: ${what} not found`);
  req = req.replace(from, to);
};
const iosOnly = (s: string) => ios ? s : '';
reqSwap(/\n## (Entry points)/, `\nDraft ${DRAFT} [Req: REQ-045]: every Open question that is still open gets a row that takes the app to the point in
question and records what it does (user, 2026-11-25: ${SAID}). New rows: ${END} (Q-28: play to the right trim
handle), ${CONSENT} (Q-14: the first 「Enhance」 after a reset)${iosOnly(`, ${PILL} (Q-15: the panel's credit pill)`)}. Modified: ${PLAY} and TC-110 (Notes)${iosOnly(', TC-093 (records the trial line, Q-7)')}.
No requirement changed; Q-14, Q-28${iosOnly(', Q-15, Q-7, Q-16, Q-17 and Q-19')} now name their rows.\n\n## $1`, 'Entry points heading');

reqSwap(/\n- Q-14 [^\n]*\n/, `\n- Q-14 Disclosure: whether the existing GenAI consent dialog (covering the ByteDance cloud) is shown before the first upload (PM Open question 3, Legal). Assumption: none, no source says whether it must show or what it reads. ${CONSENT} takes a reset app to its first 「Enhance」 and records what shows between the tap and the processing dialog; either outcome is a Fail (question) for PM / Legal [Req: REQ-045].${iosOnly(' On iOS the row is Blocked (test-data) while PowerDirector cannot be reinstalled on the QA iPhone.')} R-080, R-085 (${CONSENT}).\n`, 'Q-14');
reqSwap(/\n- Q-28 [^\n]*\n/, `\n- Q-28 Play at the end of the selection (REQ-044): the ruling on Q-21 says play starts from the playhead and the playhead stays between the trim handles, but no source says what playback does when it reaches the right trim handle (stop there, jump back to the selection start, or loop). Assumption: none. ${END} plays to the right handle and records where the playhead and the Preview time end, whether play continues and the play button's state; any outcome is a Fail (question) for PM [Req: REQ-045]. ${PLAY} pauses before the end. R-027, R-193 (${END}, ${PLAY}, TC-037).\n`, 'Q-28');
if (ios) {
  reqSwap(/\n- Q-15 [^\n]*\n/, `\n- Q-15 The panel's credit pill: the spec does not say what tapping it opens. Assumption: the Credit page (「My Credits」) with the same balance, as on the Android build (Android R3, 16.9.0); another target is a question for PM, not a defect [Req: REQ-045]. R-020 (${PILL}).\n`, 'Q-15');
  reqSwap('Assumption: no row asserts the trial; the IAP page is checked as the Design draws it. R-072 (TC-093).',
    'Assumption: no row asserts the trial; the IAP page is checked as the Design draws it, and TC-093 records whether a trial line shows [Req: REQ-045]. R-072 (TC-093).', 'Q-7');
  reqSwap('Assumption: Design copy in the app, PM copy for the system notification. R-100, R-103, R-143.',
    'Assumption: Design copy in the app, PM copy for the system notification. R-100, R-103, R-143 (TC-130, TC-133, TC-174).', 'Q-16');
  reqSwap('assumption: as drawn. R-111, R-113.', 'assumption: as drawn. R-111, R-113 (TC-140, TC-114).', 'Q-17');
  reqSwap('Assumption: the Design (mm:ss, no 「/ max」). R-030.', 'Assumption: the Design (mm:ss, no 「/ max」). R-030 (TC-040).', 'Q-19');
}
{
  const i = req.indexOf('\n### Request ledger coverage\n'); if (i < 0) throw new Error('no ### Request ledger coverage');
  const after = req.slice(i);
  const m = after.match(/\n\|[^\n]*\|\n(?!\|)/) ?? after.match(/\n\|[^\n]*\|$/); if (!m) throw new Error('no ledger table');
  const end = i + m.index! + m[0].replace(/\n$/, '').length;
  req = req.slice(0, end) + `\n| REQ-045 (table: every Open question still open gets a row that reaches its point and records what the app does) | R-027, R-193 (${END}, ${PLAY}); R-080, R-085 (${CONSENT}, TC-110)${iosOnly(`; R-020, R-073 (${PILL}); R-072 (TC-093)`)}; Q-28, Q-14${iosOnly(', Q-15, Q-7')} |` + req.slice(end);
}
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- control-trace.json: the controls the new rows press (found by their group id) ----
let trace = readFileSync(join(DIR, 'control-trace.json'), 'utf8');
const press = (group: string, add: string) => {
  const i = trace.search(new RegExp(`"group":\\s*"${group}"`)); if (i < 0) throw new Error(`${PLATFORM}: control-trace: no ${group}`);
  const m = trace.slice(i).match(/"press":\s*"(TC-[^"]*)"/);
  if (!m || /"group":/.test(trace.slice(i + 8, i + m.index!))) throw new Error(`${PLATFORM}: control-trace: ${group} is not pressed by a row`);
  const j = i + m.index!;
  trace = trace.slice(0, j) + m[0].replace(m[1], `${m[1]}, ${add}`) + trace.slice(j + m[0].length);
};
press('K-cc0164', END);       // round/ic_btn_drag, the playhead knob
press('K-5bc434', END);       // round/ic_play
press('K-68e6ce', CONSENT);   // Action Button_M 「Enhance」
press('K-2158a3', CONSENT);   // PM board: 「Enhance · 8 credits」
writeFileSync(join(DIR, 'control-trace.json'), trace);

// ---- update-plan.md ----
const added = `## Added by REQ-045 — a row for every Open question that is still open
Request (user, 2026-11-25): ${SAID}. Rule: analysis.md, 「Every Open question gets an observing row」.

### Case changes
- New (${ios ? 3 : 2}):
  - ${END} (R-027, R-193; Q-28), right after ${PLAY} in 「${play[col('Section')]}」: with the selection 00:30–02:00 the playhead is
    parked at about 01:50 and play is left alone for 30 s under a screen recording. Recorded: stop, jump back or play
    on at the right handle, where the playhead, the bubble and the Preview time rest, the button's state and what the
    next tap does. Any outcome is a Fail (question) for PM.
  - ${CONSENT} (R-080, R-085; Q-14), right after TC-110 in 「${t110[col('Section')]}」: the first 「Enhance」 after ${ios ? 'a fresh install' : '`pm clear` (or a fresh install) and a new sign-in'},
    with the 00:01 video. Recorded: what shows between the tap and the processing dialog (title, whole text, buttons,
    whether it names a third party's cloud). Either outcome is a Fail (question) for PM / Legal.${ios ? ' Blocked (test-data)\n    on the QA iPhone while PowerDirector cannot be reinstalled there.' : ''}
${ios ? `  - ${PILL} (R-020, R-073; Q-15), right after TC-320 in 「Eligibility and purchase」: tap the panel's credit pill, then ‹.
    Asserts the Android build's behaviour (「My Credits」 with the same balance, the panel kept on return); another
    target is recorded for PM.
` : ''}- Modified (${ios ? 3 : 2}):
  - ${PLAY}: Notes only, they name ${END} for the end of the selection.
  - TC-110: Notes only, a first-use consent screen belongs to ${CONSENT} and the row runs after it.
${ios ? '  - TC-093: one more Expected Result line (whether the IAP page offers a free trial is recorded, Q-7); Notes reworded.\n' : ''}
### Open questions and the rows that observe them
${ios ? `- New row: Q-14 → ${CONSENT}, Q-28 → ${END}, Q-15 → ${PILL}. Row extended: Q-7 → TC-093.
- Already observed, question text unchanged: Q-1 TC-011 · Q-2 TC-113 · Q-5 TC-059 · Q-6 TC-064 and the combination rows ·
  Q-8 TC-144 · Q-9 TC-021, TC-155 · Q-10 TC-160, TC-161 · Q-11 TC-162 · Q-12 TC-121 · Q-13 TC-022 · Q-18 TC-115 ·
  Q-22 TC-143 (step 4) · Q-24 TC-045, TC-264 · Q-26 TC-083, TC-087, TC-269 and the combination rows.
- Already observed, the question now names the rows: Q-16 TC-130 (banner), TC-133 (success push), TC-174 (failure push) ·
  Q-17 TC-140 (Recent icon), TC-114 (「<n> minutes left...」) · Q-19 TC-040.`
  : `- New row: Q-14 → ${CONSENT}, Q-28 → ${END}.
- Kept: Q-20 → TC-211 (system Back on 「Turn on notifications」; Blocked in R3 because the prompt never appeared, so it
  stays not-reached and is not duplicated).
- Not touched: the questions R3 determined (Q-5, Q-6, Q-7, Q-9, Q-12, Q-15, Q-19, Q-22; question-status.json) and the
  ones an eBug carries (Q-1, Q-2, Q-8, Q-10, Q-11, Q-13, Q-16, Q-17, Q-18, Q-24, Q-27).`}

### How the rows run
- ${END}: no new fixture (the 12:30 video with its time burned in), no task, no credits. It sits with TC-215 and ${PLAY}.
- ${CONSENT}: ${ios ? 'needs a fresh install, which the QA iPhone rule forbids for now: Blocked --as test-data until lifted.' : 'one-way state. It is the first 「Enhance」 tap after the reset that TC-030 also needs (`pm clear`, then sign in with the\n  phone\'s Google account), before TC-110 and every other row that starts a task; one task on the 00:01 video (1 credit).'}
${ios ? `- ${PILL}: no fixture beyond a Pro+ tier and a video; nothing is bought and no task starts.\n` : ''}- Controls (pass 11): the knob and play are also pressed by ${END}, the 「Enhance」 CTA also by ${CONSENT} (control-trace.json).
- phases.json is carried over unchanged; the new rows join the plan of the next run.
`;
const planPath = join(DIR, 'update-plan.md');
let plan = readFileSync(planPath, 'utf8');
const MARK = '<!-- REQ-045 -->';
if (!plan.includes(MARK)) throw new Error(`${PLATFORM}: update-plan.md has no ${MARK} line`);
plan = plan.replace(MARK, added.trimEnd());
// the questions for PM, as the rows now put them
plan = plan.replace(/\n- Q-28 What does playback do[^\n]*\n/, `\n- Q-28 What does playback do when it reaches the right trim handle: stop there, jump back to the selection start, or loop? (${END} records what the build does.)\n- Q-14 Must the GenAI consent / disclosure dialog show before the first upload, and what must it say? (${CONSENT} records what the build shows.)\n${iosOnly(`- Q-15 What should the panel's credit pill open? (${PILL} asserts 「My Credits」, as on Android.)\n`)}`);
// lines of the REQ-044 plan (iOS) that said Q-28 had no row
plan = plan.replace('not stated, no row asserts it |', `not stated; ${END} records it (REQ-045) |`)
  .replace('no source says what happens at the right handle, so it is Q-28, not a row.', `no source says what happens at the right handle, so it is Q-28; ${END} (REQ-045, below) records it without asserting an outcome.`);
writeFileSync(planPath, plan);
console.log(`${PLATFORM}: REQ-045 → ${END} (Q-28), ${CONSENT} (Q-14)${iosOnly(`, ${PILL} (Q-15)`)} new; ${PLAY}, TC-110${iosOnly(', TC-093')} modified`);
