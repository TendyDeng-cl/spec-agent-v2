// Draft 20261125-190000 (both platforms; the Android draft folder holds the same file): an observing row for every
// Open question that is still open [Req: REQ-111] (user, 2026-11-25: 「if it's a new question it should be added to the
// cases and be run next round」, 「shouldn't they be added to cases already?」; analysis.md, "Every Open question gets
// an observing row"). Rebuilds draft.csv, requirements.md, spec.json, update-plan.md, control-trace.json and
// annotation-trace.json in this folder from the approved table (v18 iOS / v13 Android).
// Run: node library/pdr/ai-mini-drama/<platform>/drafts/20261125-190000/build-draft.ts
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv, toCsv } from '../../../../../../scripts/lib/csv.ts';

const DRAFT = '20261125-190000';
const PREV = '20261106-084820';   // the last draft with an annotation trace (same spec set 2026-10-21-2)
const REQ = 'REQ-111';
const DIR = dirname(fileURLToPath(import.meta.url));
const PLATFORM = basename(dirname(dirname(DIR))) as 'android' | 'ios';
const TABLE = dirname(dirname(DIR));
const ios = PLATFORM === 'ios';
const manifest = JSON.parse(readFileSync(join(TABLE, 'manifest.json'), 'utf8'));

const approved = parseCsv(readFileSync(join(TABLE, 'cases.csv'), 'utf8'));
const H = approved[0].map((h, i) => i === 0 ? h.replace(/^﻿/, '') : h);
const col = (n: string) => { const i = H.indexOf(n); if (i < 0) throw new Error(`no column ${n}`); return i; };
const body = approved.slice(1).filter(r => r.length > 1);
const maxId = Math.max(...body.map(r => +r[col('ID')].slice(3)));
let next = maxId;
const id = () => `TC-${++next}`;
// iOS TC-458 … TC-465, Android TC-580 … TC-582
const REGION = id(), Q5_BOARD = id(), Q5_VIDEO = id();
const MENU = ios ? id() : '', ADD_IMAGE = ios ? id() : '', CAST = ios ? id() : '', REGEN_BACK = ios ? id() : '', MORE = ios ? id() : '';

const rows = body.map(r => [...r, 'unchanged', '']);
const find = (tc: string) => { const r = rows.find(x => x[col('ID')] === tc); if (!r) throw new Error(`${PLATFORM}: no ${tc}`); return r; };
const steps = (a: string[]) => a.length === 1 ? a[0] : a.map((s, i) => `${i + 1}. ${s}`).join('\n');
const lines = (a: string[]) => a.join('\n');
const QFAIL = (q: string, who = 'PM') => `The outcome is recorded as Fail (question) for ${who} with the capture, whatever shows, not as a pass (${q})`;
const mk = (tc: string, section: string, pre: string[], act: string[], exp: string[], pri: string, ref: string, notes: string, why: string) =>
  [tc, section, steps(pre), steps(act), lines(exp), pri, `${ref}; ${REQ}`, notes, 'new', `${REQ}: ${why}`];
const after = (tc: string, ...add: string[][]) => { rows.splice(rows.indexOf(find(tc)) + 1, 0, ...add); };
const modify = (tc: string, why: string, edit: (r: string[]) => void) => {
  const r = find(tc); edit(r); r[H.length] = 'modified'; r[H.length + 1] = `${REQ}: ${why}`;
};
const swap = (text: string, from: string, to: string, what: string) => {
  if (!text.includes(from)) throw new Error(`${PLATFORM}: ${what}: text to replace not found`);
  return text.replace(from, to);
};
const addLine = (r: string[], c: string, line: string) => { r[col(c)] = r[col(c)] ? `${r[col(c)]}\n${line}` : line; };
const addNote = (r: string[], note: string) => { r[col('Notes')] = r[col('Notes')] ? `${r[col('Notes')]}; ${note}` : note; };

// ---- Q-18: the store region beside the template counts (both platforms) ----
after('TC-003', mk(REGION, 'Entry and landing', [
  'Signed in with the test account',
  'The server the build points at noted (Developer, Stage or Production)',
  'AI Mini Drama landing open',
], [
  ios ? 'Open the phone\'s Settings › General › Language & Region and note 「Region」'
    : 'Open Google Play › profile icon › Settings › General › Account and device preferences and note the country under 「Country and profiles」',
  'In PowerDirector tap the credit pill on the landing and note the currency of the prices on My Credits (credit packs, else the page behind 「Subscribe Now」)',
  'Go back to the landing and count the templates under 「Start from a template」',
  'Tap 「More」 and count the categories and the templates in each',
], [
  'Steps 1–2: the store region and the price currency are recorded in the result',
  'Step 3: the landing shows a template grid, and its template count is recorded',
  'Step 4, on a US or JP store: 5 categories with 20 templates in all',
  'Step 4, on any other store: the categories and the template count are recorded, and the row is recorded as Fail (question) for PM with these figures, not as a pass (Q-18)',
], 'P3', 'R-289, R-006',
`Q-18 (${REQ}): the PM main flow note 「day 1 只有 US & JP」 stands beside the template grid and no source says what it limits. Known so far: ${ios
  ? 'the QA account on the Developer Server got the grid and all 20 templates in every run (TC-003, TC-010), but no run recorded the store region'
  : 'the SM-A5360\'s Play store is Taiwan (prices in NT$, TC-542) and the Stage server showed all 20 templates in 5 categories (A7), so Stage does not limit them, and Production was not checked'}. The answer needs both sides, a US or JP store and another one: the run does not change the account's store (signing in to another store account is the user's), so the result says which side it saw and what is still missing. Nothing is bought.`,
'Q-18 had no row: the store region and price currency are recorded with the landing grid and the More page\'s template count'));
modify('TC-003', `Notes point to ${REGION}, which records the store region for Q-18`, r => {
  r[col('Notes')] = swap(r[col('Notes')], 'Q-18: are templates US and JP only on day 1?', `Q-18 (are templates US and JP only on day 1?): ${REGION} records the store region and the template counts`, 'TC-003 Notes');
});

// ---- Q-5: 「Every frame is done. Ready to create your video?」 (both platforms) ----
after('TC-075', mk(Q5_BOARD, 'Storyboard Preview', [
  'Storyboard just finished in the chat (as in TC-060)',
  'Nothing tapped since it finished',
], [
  'Tap ↓ to go to the bottom of the chat',
  'Read every assistant message from the Storyboard Result card down to the 「Choose your video settings」 card',
  'Play the Storyboard Preview to the end and close the player',
  'Tap ↓ again and read the messages below the Storyboard Preview card',
], [
  'Step 2: every assistant message between the two cards is recorded word for word, with a screenshot',
  'Step 2: whether 「Every frame is done. Ready to create your video?」 is among them is recorded, with the card it stands above',
  'Step 4: any message added after the preview played is recorded the same way',
  QFAIL('Q-5'),
], 'P3', ios ? 'R-408, R-064' : 'R-424, R-064',
`Q-5 (${REQ}): the PM string list gives 「Every frame is done. Ready to create your video?」 for two keys, storyboard.all_videos.q and ladder.beat_video.q, and no run has seen it: the chat went from 「Here's your storyboard」 to the video settings card. This row reads the storyboard side and ${Q5_VIDEO} the video side. No video is generated and no credits are spent beyond the storyboard the row follows.`,
'Q-5 had no row: the assistant messages after a finished storyboard are captured to see whether and where the shared string shows'));
after('TC-086', mk(Q5_VIDEO, 'Video', [
  'A drama whose Preview • 30 sec video has finished and whose full episode is not made yet (TC-086\'s drama, or one from History)',
  'No new video is generated for this row',
], [
  'Open the drama and tap ↓ to go to the bottom of the chat',
  'Read every assistant message from the Storyboard Preview card down to the end of the chat',
  'Read the question above the 「Create the full episode (90 sec)」 card',
], [
  'Step 2: every assistant message from the Storyboard Preview card to the end of the chat is recorded word for word, with screenshots',
  'Step 3: the question above the full-episode card is recorded (R-075 gives 「Looking good! Ready for the full video?」)',
  'Steps 2–3: whether 「Every frame is done. Ready to create your video?」 shows anywhere is recorded, with the card it stands above',
  QFAIL('Q-5'),
], 'P3', 'R-075',
`Q-5 (${REQ}): the video side of ${Q5_BOARD} (key ladder.beat_video.q). When the run generates a Preview video with the user's go-ahead (${ios ? 'TC-406' : 'TC-405'}), also read the chat while it generates and add what it shows. With no finished Preview video and no go-ahead the row is Blocked (test-data): a video generation needs the user's go-ahead (REQ-073).`,
'Q-5 had no row: the assistant messages during and after a Preview video are captured to see whether and where the shared string shows'));

let modified = 1;
if (ios) {
  // ---- Q-28: ⋯ on a regenerated scene image ----
  after('TC-397', mk(MENU, 'Storyboard', [
    'Scene detail open on a scene whose image has just been regenerated (after TC-397, TC-141 or TC-292)',
    'The new image shown',
  ], [
    'Look over the regenerated Location and scene images for a ⋯ button',
    'If a ⋯ shows, tap it',
    'Tap outside the menu to close it without choosing',
    'Long-press the regenerated scene image for 2 s',
    'Close anything the long-press opened without choosing',
  ], [
    'Step 1: no ⋯ shows on either regenerated image, as the Design\'s regenerated scene detail draws it (R-306)',
    'Step 2: if a ⋯ shows, every item of its menu is recorded with a screenshot and the row is recorded as Fail (question) for PM, not as a pass (Q-28)',
    'Step 3: the menu closes and the scene detail is unchanged',
    'Step 4: what the long-press opens (nothing, a menu or a preview) is recorded',
    'Step 5: the scene detail still shows the new images, the title and the full script',
  ], 'P3', 'R-306, R-366',
  `Q-28 (${REQ}): the PM Error Handling frame 2621:30383 draws a ⋯ on the regenerated scene image (board note 「… menu on the image」, control K-0b6874) with no frame for its menu. The Design draws none, and Design first makes that the assumption. No frame implies a long-press: it is tried only to see whether a menu hides behind one. Costs nothing beyond the regeneration of the row it follows.`,
  'Q-28 had no row: the controls on a regenerated scene image are looked at, with the ⋯ menu and a long-press recorded'));

  // ---- Q-31: the MX mockups' older chat controls ----
  after('TC-012', mk(ADD_IMAGE, 'Idea input', ['Empty chat, input focused'], [
    'Look at both ends of the composer',
    'Type 「A lost umbrella」 and look again',
    'If an add-image button (＋ or a picture icon) shows, tap it and close what opens without choosing',
    'Clear the text',
  ], [
    'Steps 1–2: the composer holds only the text input and the mic, plus Send once text is typed',
    'Steps 1–2: no add-image button shows in or beside the composer',
    'Step 3: if one shows, where it is and what its tap opens are recorded with a screenshot, and the row is recorded as Fail (question) for MX / PM, not as a pass (Q-31)',
  ], 'P3', 'R-012',
  `Q-31 (${REQ}): the MX mockups (mx-a-left) draw an add-image button in an older composer (controls K-a256f3, K-f7167a). The Design / PM composer has only the input and the mic, which is the assumption. The cast controls are ${CAST}.`,
  'Q-31 had no row for the add-image button: the composer is looked over for it'));
  after('TC-310', mk(CAST, 'Characters', [
    'Custom drama with its 「Story Outline & Characters Result」 card shown',
    '「Choose your characters」 shown under it with at least one look set',
  ], [
    'Read the 「Story Outline & Characters Result」 card from its header to its last character',
    'Read the 「Choose your characters」 block and any card under it, down to the composer',
    'If an edit (pencil) icon or 「Customize my characters (optional)」 shows, tap it and close what opens without changing anything',
  ], [
    'Step 1: no edit (pencil) icon shows on the card or beside a character',
    'Step 1: a character with a look has the ⟳ switch icon as its only change control (R-172)',
    'Step 2: no line or button reads 「Customize my characters (optional)」',
    'Step 3: if either control shows, where it is and what its tap opens are recorded with a screenshot, and the row is recorded as Fail (question) for MX / PM, not as a pass (Q-31)',
  ], 'P3', 'R-172, R-029',
  `Q-31 (${REQ}): the MX mockups (mx-a-mid) draw an edit icon on Characters Result (control K-e2edba) and 「Customize my characters (optional)」 on an older 「Create characters」 card (K-f168be). The assumption is that they are illustrations only. The other Q-31 items already have rows: no aspect-ratio question (TC-020), the template chat (TC-235), the scene editor (TC-070), 「Consume credits?」 (Q-3), and the add-image button is ${ADD_IMAGE}.`,
  'Q-31 had no row for the edit icon on Characters Result and 「Customize my characters (optional)」: both are looked for on the cast cards'));

  // ---- Q-22: does a video regeneration have a preparing phase? ----
  after('TC-412', mk(REGEN_BACK, 'Video errors', [
    'Drama with a finished video, every scene done (an existing one: no new full video is generated for this row)',
    'Credit Details read',
  ], [
    'Open a scene in the scene editor, change its description and tap 「Regenerate Video」 (as in TC-144)',
    'Leave the scene editor to the chat at once',
    'Tap Back within 5 s of the regeneration\'s start',
    'On the dialog tap the answer that stays (「Stay」 or 「Keep Generating」)',
  ], [
    'Step 3: the dialog\'s title, body and buttons are recorded with a screenshot (「Leave while we\'re preparing?」, 「Stop and lose your credits?」 or no dialog)',
    'Step 4: the dialog closes and the line under the video card still reads 「Updating 1 scene... Your video will refresh when it\'s done.」',
    'Credit Details books the regeneration once',
    QFAIL('Q-22'),
  ], 'P3', 'R-332, R-129',
  `Q-22 (${REQ}): frame 4422:2 names a video regeneration among the generations with no stop, but draws the 「Leave while we're preparing?」 phase only for the storyboard and the video. If Back leaves with no dialog, reopen the drama from History and record whether the regeneration went on. Spends one scene regeneration (allowed, REQ-073). TC-412 covers the composer.`,
  'Q-22 asks whether a video regeneration has the preparing phase and no row left the chat at its start: Back is tapped in its first seconds and the dialog recorded'));
  modify('TC-412', `Notes point to ${REGEN_BACK}, which records the dialog for Q-22`, r => {
    r[col('Notes')] = swap(r[col('Notes')], 'phase is Q-22', `phase is Q-22, recorded by ${REGEN_BACK}`, 'TC-412 Notes');
  });
  modify('TC-294', 'the phase ① card title Q-22 asks about is recorded, not only assumed by the Precondition', r => {
    addLine(r, 'Expected Result', 'The phase ① card\'s title at the Back tap is recorded (「Preparing your scenes...」 assumed, Q-22)');
  });

  // ---- Q-19: the chip where P9 saw it ----
  after('TC-019', mk(MORE, 'Idea input', [
    'Chat with a cast set',
    'Iris has asked a question with option chips (send 「Can you change one of the characters to look older?」, as in TC-348)',
    '「More ideas」 shows between the option chips and the input',
  ], [
    'Tap 「More ideas」',
    'Read what appears',
    'Close or leave what appeared without choosing an idea',
  ], [
    'Step 1: the tap does something visible within 5 s (more chips, a filled input, a new message or a sheet)',
    'Step 2: what appeared is recorded word for word, with a screenshot',
    'Step 3: Iris\'s question and its option chips are still shown',
    QFAIL('Q-19'),
  ], 'P3', 'R-318, R-017',
  `Q-19 (${REQ}): no frame or note says what a tap shows. On 16.9.0 (189872) the chip never showed above the composer of a plain chat (TC-019 Fail; DRI261896P0059 ruled NAB), but 「More ideas」 did show above the input under Iris's option chips (P9, TC-348), where it was never tapped. This row taps it there. If it does not show there either, record that and Blocked (observability).`,
  'Q-19: TC-019 could not reach the tap because the chip never showed in a plain chat; this row taps it where the P9 run saw it'));
  modify('TC-019', `Notes point to ${MORE}, which taps the chip where it shows beside option chips (Q-19)`, r => {
    addNote(r, `Where the chip shows only under Iris's option chips, the tap is ${MORE} (Q-19)`);
  });

  // ---- named rows that did not observe their question's point ----
  modify('TC-092', 'Q-27 asks whether the second failure shows the refund line and ⓘ; the row now asserts the Design card without them', r => {
    addLine(r, 'Expected Result', 'The second failure\'s card has no ⓘ and no 「Your credits have been refunded.」 line (the Design copy; the card is recorded word for word if it differs, Q-27)');
    addNote(r, 'PM frame 2621:30259 draws 「Couldn\'t create video ⓘ」 with the refund line on the second failure; rows follow the Design (Q-27)');
  });
  modify('TC-406', 'Q-34 asks whether Generate Video sends a user message; the row now asserts the assumption (none)', r => {
    addLine(r, 'Expected Result', 'No user message is added when Generate Video is tapped (the bubble\'s text is recorded if one shows, Q-34)');
    addNote(r, 'PM 11/4 §13.2 ② sends a card\'s Answer as a user message, but the 10/22 note keeps this card turning into the skeleton in place (Q-34)');
  });
  modify('TC-006', 'Q-36 asks which of the two drawn layouts ships; the row now records the covers per row', r => {
    addLine(r, 'Expected Result', 'The number of covers a category row shows without scrolling is recorded (3 or 4, Q-36)');
    addNote(r, 'Design 11/5 draws the page with 3 covers per row (5756:33097) and with 4 (5756:33322); either passes (Q-36)');
  });
  modify('TC-003', `Notes point to ${REGION}, which records the store region for Q-18`, () => {});
  modified = 7;
}
writeFileSync(join(DIR, 'draft.csv'), toCsv([[...H, 'Change', 'Change Reason'], ...rows]));
const added = next - maxId;

// ---- requirements.md ----
let req = readFileSync(join(TABLE, 'requirements.md'), 'utf8');
const qEdit = (q: string, edit: (line: string) => string) => {
  const m = req.match(new RegExp(`\\n- ${q} [^\\n]*`)); if (!m) throw new Error(`${PLATFORM}: ${q} not found`);
  const to = edit(m[0]); if (to === m[0]) throw new Error(`${PLATFORM}: ${q} not changed`);
  req = req.replace(m[0], to);
};
qEdit('Q-5', l => `${l} No assumption can be made: ${Q5_BOARD} records the assistant's messages after a finished storyboard and ${Q5_VIDEO} those after a Preview video, and either outcome goes to PM (${REQ}).`);
qEdit('Q-18', l => `${l} ${REGION} records the store region, the price currency and the template counts; a store outside the US and JP goes to PM with its figures (${REQ}).`);
if (ios) {
  qEdit('Q-19', l => swap(l, 'TC-019 records what appears', `TC-019 checks the chip and ${MORE} taps it where P9 saw it (under Iris's option chips) and records what appears (${REQ})`, 'Q-19'));
  qEdit('Q-22', l => `${l} Observed by (${REQ}): TC-351 (character update), TC-378 (scene-image regeneration), TC-294 (the phase ① title of a storyboard update) and ${REGEN_BACK} (Back at the start of a video regeneration).`);
  qEdit('Q-27', l => `${l} TC-092 asserts the Design card with no ⓘ and no refund line (${REQ}).`);
  qEdit('Q-28', l => swap(l, 'Not traced to a row until then.', `Assumption: no ⋯, as the Design draws it. ${MENU} looks for it, opens its menu when shown and tries a long-press (${REQ}).`, 'Q-28'));
  qEdit('Q-31', l => `${l} Assumption: illustrations only. Observed by TC-020 (no aspect-ratio chips), TC-235 (the template chat), TC-070 (the scene editor), ${ADD_IMAGE} (no add-image button in the composer) and ${CAST} (no edit icon on Characters Result, no 「Customize my characters (optional)」); 「Consume credits?」 is Q-3 (${REQ}).`);
  qEdit('Q-34', l => `${l} TC-406 asserts that no user message is added (${REQ}).`);
  qEdit('Q-36', l => `${l} TC-006 records the covers per row (${REQ}).`);
  // Job states: the leave-and-return cell of a video regeneration
  const cell = '| TC-412 (no stop in chat, R-332) | TC-144 |';
  if (!req.includes(cell)) throw new Error('ios: Job states, Video regeneration row not found');
  req = req.replace(cell, `| TC-412 (no stop in chat, R-332) | TC-144, ${REGEN_BACK} |`);
}
{
  const head = '\n### Request ledger coverage\n';
  const i = req.indexOf(head); if (i < 0) throw new Error(`${PLATFORM}: no Request ledger coverage`);
  const m = req.slice(i).match(/\n\|[^\n]*\|\n(?!\|)/); if (!m) throw new Error(`${PLATFORM}: no ledger table`);
  const end = i + m.index! + m[0].length - 1;
  const newRows = [
    ...(/\bREQ-109\b/.test(req) ? [] : ['| REQ-109 MUI section for the 26 PowerDirector languages (2026-11-24) | not applied yet: this table has no MUI section; its rows come with their own draft (`mui.json`, `references/mui.md`), and MUI is its own phase |']),
    `| ${REQ} Every Open question that is still open gets an observing row (2026-11-25) | Q-5 (${Q5_BOARD}, ${Q5_VIDEO}), Q-18 (${REGION})${ios ? `, Q-19 (${MORE}), Q-22 (${REGEN_BACK}, TC-294), Q-27 (TC-092), Q-28 (${MENU}), Q-31 (${ADD_IMAGE}, ${CAST}), Q-34 (TC-406), Q-36 (TC-006)` : ''}; R-289, R-006, R-064, R-075${ios ? ', R-408, R-306, R-366, R-012, R-172, R-029, R-332, R-129, R-318, R-017' : ', R-424'} |`,
  ];
  req = req.slice(0, end) + '\n' + newRows.join('\n') + req.slice(end);
}
const judged = ios
  ? `Judged already observed by the rows they name: Q-20 (TC-377, TC-063, TC-403, TC-404, TC-406, TC-409, TC-410), Q-21 (TC-415), Q-24
(TC-096), Q-25 (TC-226), Q-29 (TC-418), Q-35 (TC-091, TC-436, TC-437), Q-37 (TC-456, TC-457), Q-39 (TC-422, TC-424,
TC-425, TC-427), Q-40 (TC-421). Fixed in the row they name: Q-27 (TC-092), Q-34 (TC-406), Q-36 (TC-006), Q-22 (TC-294).`
  : `Judged already observed: Q-19 (TC-019 taps the chip and records what appears; the build shows no chip, DRA262610P0380, so
there is nothing more a row can do until it exists). The Android-only questions Q-A1 – Q-A25 are not read by the tooling
(its parser takes Q-<digits>) and are not renumbered or changed here; update-plan.md lists which of them a row observes.`;
req = req.replace(/\n*$/, '\n') + `
## Added 2026-11-25 — observing rows for the Open questions (${REQ})
User, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be
added to cases already?」 Every Open question that the completed runs left open (\`question-status.json\`: not reached or
to file) now names a row that takes the app to the point in question and records what it does (analysis.md, "Every Open
question gets an observing row"). No requirement is added or changed: the new rows cite the requirements the questions
affect. Where the Design gives an assumption the row asserts it${ios ? ' (Q-28, Q-31, Q-27, Q-34)' : ''}; where nothing can be assumed${ios ? ' (Q-5, Q-19, Q-22, Q-18 outside the US and JP)' : ' (Q-5, Q-18 outside the US and JP)'}
the row says what to record and the outcome is a Fail (question) for the owner, not a pass.

New rows: ${ios
  ? `${REGION} (Q-18), ${Q5_BOARD} and ${Q5_VIDEO} (Q-5), ${MENU} (Q-28), ${ADD_IMAGE} and ${CAST} (Q-31), ${REGEN_BACK} (Q-22), ${MORE} (Q-19).
Modified: TC-003, TC-019, TC-412 (Notes), TC-006, TC-092, TC-294, TC-406 (one Expected Result line each).`
  : `${REGION} (Q-18), ${Q5_BOARD} and ${Q5_VIDEO} (Q-5). Modified: TC-003 (Notes).`}
${judged}
`;
writeFileSync(join(DIR, 'requirements.md'), req);

// ---- control-trace.json: the MX / PM-only controls stay n/a (assumed not shipped) and name the row that looks for them ----
let trace = readFileSync(join(TABLE, 'control-trace.json'), 'utf8');
if (ios) {
  const look = (group: string, tc: string) => {
    const i = trace.search(new RegExp(`"group":\\s*"${group}"`)); if (i < 0) throw new Error(`control-trace: no ${group}`);
    const m = trace.slice(i).match(/"press":\s*"(n\/a:[^"]*)"/); if (!m) throw new Error(`control-trace: ${group} has no n/a press`);
    const j = i + m.index!;
    trace = trace.slice(0, j) + m[0].replace(m[1], `${m[1]}; ${tc} looks for it and taps it when shown`) + trace.slice(j + m[0].length);
  };
  look('K-0b6874', MENU); look('K-a256f3', ADD_IMAGE); look('K-f7167a', ADD_IMAGE); look('K-f168be', CAST); look('K-e2edba', CAST);
}
writeFileSync(join(DIR, 'control-trace.json'), trace);

// ---- carried over unchanged (same spec set): the annotation trace of the last analysed draft. knowledge.md is written
// by `node scripts/knowledge.ts pdr/ai-mini-drama <platform> --for analysis --out <this folder>/knowledge.md` ----
copyFileSync(join(TABLE, 'drafts', PREV, 'annotation-trace.json'), join(DIR, 'annotation-trace.json'));

// ---- spec.json and update-plan.md ----
writeFileSync(join(DIR, 'spec.json'), JSON.stringify({
  feature: 'pdr/ai-mini-drama', platform: PLATFORM, title: manifest.title, draft: DRAFT,
  created_at: '2026-11-25T11:00:00.000Z', based_on_version: manifest.version, spec_folder: manifest.spec_folder,
  spec_files: manifest.spec_files, spec_set_sha256: manifest.spec_set_sha256,
}, null, 2) + '\n');

const QA = `## Android-only questions (Q-A…)
Not read by the tooling and not changed in this draft; whether a row observes each:
- Q-A1 Back on Make your character while it generates: observed if a row uses system back there (R-354 rows); not checked row by row here.
- Q-A2 Pro (30) tier on Android: observed, TC-542 records the plan tabs.
- Q-A3 character update in chat, two-stage or not: observed, TC-351.
- Q-A4 answered 2026-10-28 (REQ-050).
- Q-A5 system Back on dialogs, menus, keyboards: observed by the system-Back rows (R-354, R-355).
- Q-A6 screens with no Back rule: observed, TC-327, TC-039, TC-127, TC-304, TC-533 record what Back does.
- Q-A7 which generations follow the 10/22 rule: partly, TC-153, TC-155, TC-378, TC-294; no row taps Back at the start of a video regeneration (iOS got one in this draft).
- Q-A8 answered 2026-11-05 for the action cards; the rest is Q-A20.
- Q-A9 export after leaving: observed, TC-517.
- Q-A10 toast on Export during a regeneration: observed, TC-096 records the copy.
- Q-A11 Free user's card label: observed, TC-226.
- Q-A12 limit dialog button: observed, TC-118.
- Q-A13 second failure after Retry: observed only by the Design copy of TC-092; the refund line and ⓘ are not asserted (iOS TC-092 was fixed in this draft).
- Q-A14 ⋯ on a regenerated scene image: NOT observed, no row (iOS got one in this draft).
- Q-A15 feature intro: observed, TC-541.
- Q-A16 「Create video」 on the preview card: observed, TC-079.
- Q-A17 MX mockups' older chat: partly, TC-020, TC-235, TC-070; NOT observed for the add-image button, the edit icon and 「Customize my characters (optional)」 (iOS got two rows in this draft).
- Q-A18 superseded, Q-A19 answered (REQ-103).
- Q-A20 user message on Generate Video: reached by TC-405, which does not assert 「no user message」.
- Q-A21 4xxx / 5xxx copy: observed, TC-091, TC-559, TC-560, TC-499.
- Q-A22 covers per row: reached by TC-006 / TC-328, which do not record the count.
- Q-A23 Close after a celebrity block: observed, TC-578, TC-579.
- Q-A24 answered 2026-11-06 (REQ-103).
- Q-A25 preview narration id: observed, TC-545.
`;
writeFileSync(join(DIR, 'update-plan.md'), `# Update plan — AI Mini Drama / ${PLATFORM}: approved v${manifest.version} → draft ${DRAFT}

Based on approved v${manifest.version} (${manifest.cases} rows). Same spec set; the change is a request [${REQ}] (user, 2026-11-25):
「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases
already?」 Every Open question the completed runs left open gets a row that takes the app to the point in question.

## Spec files
- Unchanged: ${manifest.spec_files.map((f: { name: string }) => f.name).join(', ')} (spec set ${manifest.spec_folder}). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-5 | names its rows | No row read the string | ${Q5_BOARD} (after a storyboard) and ${Q5_VIDEO} (after a Preview video) record the assistant's messages |
| Q-18 | names its row | TC-003 only mentioned it in Notes | ${REGION} records the store region, the price currency and the template counts |
${ios ? `| Q-19 | names a second row | TC-019 could not tap a chip that never showed | ${MORE} taps 「More ideas」 where P9 saw it, under Iris's option chips |
| Q-22 | names its rows | No row left the chat at the start of a video regeneration | ${REGEN_BACK} records the dialog; TC-294 records the phase ① title |
| Q-27 | row fixed | TC-092 did not say whether the refund line and ⓘ show | TC-092 asserts the Design card without them |
| Q-28 | names its row, gains an assumption | 「Not traced to a row until then」 | Assumption: no ⋯ (Design); ${MENU} looks for it, opens its menu and tries a long-press |
| Q-31 | names its rows, gains an assumption | No row looked for the add-image button, the edit icon or 「Customize my characters (optional)」 | ${ADD_IMAGE} and ${CAST} look for them; assumption: illustrations only |
| Q-34 | row fixed | TC-406 did not assert 「no user message」 | TC-406 asserts it and records a bubble if one shows |
| Q-36 | row fixed | TC-006 did not record the covers per row | TC-006 records 3 or 4 |
| Job states | Video regeneration, Leave and return | TC-144 | TC-144, ${REGEN_BACK} |
` : ''}| Request ledger coverage | added | REQ-109 (MUI) was not cited, so \`check.ts\` failed the approved table; ${REQ} is new | REQ-109 cited as not applied yet (no MUI section in this table); ${REQ} cited with its rows |

No R-… requirement is added, changed or removed.

## Case changes
- New (${added}), each right after the row it extends (REQ-033):
  - ${REGION} (Q-18; after TC-003): store region, price currency, landing grid and More page template counts.
  - ${Q5_BOARD} (Q-5; after TC-075): every assistant message between the Storyboard Result card and 「Choose your video settings」, and after the preview played.
  - ${Q5_VIDEO} (Q-5; after TC-086): every assistant message from the Storyboard Preview card to the full-episode offer on a finished Preview video.
${ios ? `  - ${MENU} (Q-28; after TC-397): ⋯ on a regenerated scene image, its menu, and a long-press.
  - ${ADD_IMAGE} (Q-31; after TC-012): no add-image button in the composer.
  - ${CAST} (Q-31; after TC-310): no edit icon on Characters Result, no 「Customize my characters (optional)」.
  - ${REGEN_BACK} (Q-22; after TC-412): Back in the first seconds of a video regeneration, the dialog recorded.
  - ${MORE} (Q-19; after TC-019): 「More ideas」 tapped under Iris's option chips.
` : ''}- Modified (${modified}):
  - TC-003: Notes point to ${REGION}.
${ios ? `  - TC-019: Notes point to ${MORE}.
  - TC-412: Notes point to ${REGEN_BACK}.
  - TC-294: one Expected Result line (the phase ① card title is recorded, Q-22).
  - TC-092: one Expected Result line (no ⓘ, no refund line on the second failure, Q-27) and a Note.
  - TC-406: one Expected Result line (no user message on Generate Video, Q-34) and a Note.
  - TC-006: one Expected Result line (covers per row recorded, Q-36) and a Note.
` : ''}- Removed (0)
- Unchanged: ${body.length - modified}

## Found by the analysis
- Read every question that \`question-status.json\` leaves open (not reached or to file) against the rows it names.
${ios ? `- Already observed, no change: Q-20 (TC-377, TC-063, TC-403, TC-404, TC-406, TC-409, TC-410), Q-21 (TC-415), Q-24 (TC-096),
  Q-25 (TC-226), Q-29 (TC-418), Q-35 (TC-091, TC-436, TC-437), Q-37 (TC-456, TC-457), Q-39 (TC-422, TC-424, TC-425,
  TC-427), Q-40 (TC-421).
- Controls (pass 11): K-0b6874, K-a256f3, K-f7167a, K-f168be and K-e2edba stay n/a (assumed not shipped) and now name
  the row that looks for them (control-trace.json).` : `- Already observed, no change: Q-19 (TC-019; the build shows no chip, DRA262610P0380).
- control-trace.json is carried over unchanged.`}

## Not added (value check)
- A row on a second store for Q-18: the run cannot change the account's store; ${REGION} says which side it saw.
- A new video for Q-5: ${Q5_VIDEO} reads an existing Preview video; a generation needs the user's go-ahead (REQ-073).
${ios ? '' : '- Rows for the Android-only Q-A… questions: out of this request\'s scope (they are not read by the tooling); see below.\n'}
## How the rows run
- No new fixture. ${ios ? `${REGEN_BACK} spends one scene regeneration and ${MENU} rides on a regeneration another row already made (REQ-073). ` : ''}${Q5_VIDEO} is Blocked (test-data) without a finished Preview video.
- No fresh install is needed (PowerDirector is never uninstalled on the QA iPhone). Chat waits and reads tap ↓ first (REQ-107).
- No phases.json: this feature's drafts carry none since 2026-10-29; the new rows join the next run's plan with the rows they follow.

${ios ? '' : QA + '\n'}## Questions for PM
- None new. Q-5${ios ? ', Q-19, Q-22' : ''} and Q-18 go to PM with the next run's captures.

## Questions for you
- REQ-109 (MUI section) is cited as 「not applied yet」 so the draft passes \`check.ts\`; say if the MUI rows should be drafted for this feature now.
${ios ? '' : '- Should the Android-only Q-A… questions get rows too (Q-A14, Q-A17, Q-A7, Q-A13, Q-A20, Q-A22 have the gaps iOS had)?\n'}`);

// Chinese copy: start from the approved one, so only the new and changed rows need translating (zh-copy.ts export / merge)
for (const [from, to] of [['cases.zh-Hant.csv', 'draft.zh-Hant.csv'], ['cases.zh-Hant.prints.json', 'draft.zh-Hant.prints.json']])
  if (existsSync(join(TABLE, from)) && !existsSync(join(DIR, to))) copyFileSync(join(TABLE, from), join(DIR, to));
console.log(`${PLATFORM}: ${body.length} approved rows (${modified} modified) + ${added} new (TC-${maxId + 1} – TC-${next}) → ${join(DIR, 'draft.csv')}`);
