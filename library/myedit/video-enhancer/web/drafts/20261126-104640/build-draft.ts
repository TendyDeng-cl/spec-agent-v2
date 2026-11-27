// Builds draft.csv for myedit/video-enhancer (web), draft 20261126-104640, from the approved v1 cases.csv plus the
// table fixes of the R1 run (runs/2026-11-25-r1-full/report.md › Table fixes; REQ-008), so the draft can be rebuilt.
// Run: node library/myedit/video-enhancer/web/drafts/20261126-104640/build-draft.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readRecords, writeRecords } from '../../../../../../scripts/lib/csv.ts';

const here = dirname(fileURLToPath(import.meta.url));
const approved = readRecords(readFileSync(join(here, '..', '..', 'cases.csv'), 'utf8'));
type Rec = Record<string, string>;
const COLS = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
const lines = (...l: string[]) => l.join('\n');
const steps = (...s: string[]) => s.map((x, i) => `${i + 1}. ${x}`).join('\n');
const pre = steps;

const BASE = 'Chrome at 1440 × 900 on MyEdit demo (en), signed in as the default test account (Studio Pro, enough credits)';
const V480 = 'the 480p 30 fps 7.3 s MP4 (fx-480p30)';
const NARROW_OLD = 'Chrome window 375 × 812 (device-web window 375 812) on MyEdit demo, signed in as the default test account';
const NARROW = 'Chrome on MyEdit demo with the page held at 375 × 812 by a CDP device-metrics override (a narrow desktop window, mobile:false, no phone user agent; Chrome on Windows will not size a window under 500 px), signed in as the default test account';

const changes = new Map<string, { patch: Partial<Rec>; reason: string }>();
const mod = (id: string, reason: string, patch: Partial<Rec>) => changes.set(id, { patch, reason });
const get = (id: string) => approved.find(r => r.ID === id)!;

// 1. Singular 「(1 credit/sec)」 at a rate of 1 (O-8)
for (let n = 42; n <= 51; n++) {
  const id = `TC-0${n}`;
  mod(id, 'R-030 changed: at 1 credit per second the line reads 「(1 credit/sec)」, singular (R1 O-8)',
    { 'Expected Result': get(id)['Expected Result'].replace('(1 credits/sec)', '(1 credit/sec)') });
}
mod('TC-083', 'R-030 changed: the price line after switching to Standard is checked, singular at 1 credit/sec (R1 O-8)', {
  Precondition: pre(BASE, 'The Video Enhancer room with the 3:00 MP4 (fx-3m00), Professional selected (red text shown)', 'Output Resolution 720P, Frame Rate Same as source'),
  'Expected Result': lines('The red text disappears', 'Enhance is enabled', 'Enhance shows 180 credits', 'Under it: 「Enhance 180.00 seconds (1 credit/sec)」'),
});

// 2. Recent Gen exists only after an upload (TC-096, O-19, KF-004)
mod('TC-096', 'R-042 corrected: the empty Recent Gen text belongs to the room after an upload; before it there is no Recent Gen (R1 TC-096, KF-004)', {
  Precondition: pre('Chrome at 1440 × 900 on MyEdit demo (en), signed in as the Free / empty-state test account (web-account free, port 9341; no Video Enhancer results)',
    `The Video Enhancer room with ${V480} uploaded, no Enhance yet`),
  Action: '1. Read Recent Gen',
  'Expected Result': '「Start by uploading a video to generate your video」',
  Notes: 'Recent Gen is not shown before an upload (R1 2026-11-25, KF-004), so the text is read with the video uploaded; spec board 3 draws it on the Default Settings screen',
});

// 3. Fixtures (TC-018, TC-020)
// TC-018 is not tested (user, 2026-11-26, REQ-013): no file with an unreadable frame rate exists
const removed = new Map<string, string>([
  ['TC-024', 'Removed: not tested (user, 2026-11-26, REQ-015); drag and drop from the desktop needs a manual test'],
  ['TC-026', 'Removed: not tested (user, 2026-11-26, REQ-015); needs RD to make the Trimmer unavailable, so R-023 is not testable'],
  ['TC-099', 'Removed: not tested (user, 2026-11-26, REQ-015); needs RD to make a generation fail on demo, so R-081 is not testable'],
  ['TC-114', 'Removed: not tested (user, 2026-11-26, REQ-015); needs a failed generation (as TC-099), so R-063 is not testable'],
  ['TC-018', 'Removed: not tested (user, 2026-11-26, REQ-013); no file with an unreadable frame rate could be made (fx-nofps reads as 1 fps, R1 O-28), so R-019 is not testable']]);
mod('TC-020', 'Fixture replaced: fx-badaudio (Opus) is accepted; fx-ac3 is rejected (R1 TC-020 retest)', {
  Action: steps('Upload the MP4 with AC-3 audio (fx-ac3)', 'Click the dialog\'s button'),
  Notes: lines('Record which of the two dialogs shows and its text',
    'R1 retest: fx-ac3 gets 「Audio Codec Not Supported」 on the SEO page and in the room; fx-flac24 (FLAC) is rejected in the room but passes the SEO page with no dialog (MYE261124P0025)'),
});

// 4. Get Credits: the room only (KC code-derived page vs KP-038)
mod('TC-138', 'R-094 changed: Get Credits is checked in the room only; a credit tool\'s import (SEO) page shows none (KC derived-tool-header-credit-and-upgrade-buttons)', {
  Action: steps('Look at the top right of the room', 'Read the account menu balance', 'Enhance with Standard 720P and close nothing', 'Read the account menu balance again without reloading'),
  'Expected Result': lines('Step 1: 「Get Credits」 is at the top right of the room', 'Step 3: no credit-shortage dialog', 'Step 4: the balance is 8 lower than in step 2'),
  Notes: lines('Product rule KP-039, KP-040, KP-043 (library/myedit/knowledge); can share the first Generate row',
    'KP-038 conflict: KP-038 (team rule, now disputed) wants Get Credits on every working screen, SEO page included; the Knowledge Center page derived-tool-header-credit-and-upgrade-buttons (code-derived, not confirmed) says a credit tool\'s import page shows none, as R1 saw (O-20, not filed); Q-15'),
});

// 5. Storage full: Upgrade below Studio Pro, Manage only on a full Studio Pro account
mod('TC-147', 'R-104 changed: a storage-full Free account gets 「Upgrade」, not 「Manage」 (KC derived-cloud-storage-warnings-and-video-download-limit; R1 TC-147)', {
  Action: steps('Read My Library\'s storage (used / total)', 'Click 「Enhance」'),
  'Expected Result': lines('Step 1: storage is full (used = total)', 'Step 2: the storage-full prompt 「You’ve reached your cloud storage limit.」 shows with 「Generate Anyway」 and 「Upgrade」', 'Step 2: no 「Manage」'),
  Notes: lines('Knowledge Center derived-cloud-storage-warnings-and-video-download-limit (code-derived, not confirmed): Upgrade while a higher cloud plan exists, Manage only on Studio Pro; KP-065 (Generate Anyway and Manage) is disputed; Q-16',
    'Upgrade is not pressed (it opens the purchase dialog); close the prompt with its X. Manage: TC-153'),
});

// 6. Open in Editor route for TC-117 (R-073 wording; TC-098 / TC-123 / TC-124 stay held)
mod('TC-117', 'Route fixed: a result reaches Video Editor through the result preview\'s 「Open in Editor」 (R1 O-18, TC-117 recheck; R-073 reworded, still held)', {
  Precondition: pre(BASE, 'In the Video Enhancer room, a 60 fps result finished in this visit (fx-480p30, Standard / HD / 720P / 60 fps, 8 credits)'),
  Action: steps('Click the finished Recent Gen card to open the Original / Result preview', 'Click 「Open in Editor」 (bottom right)', 'Add a second clip to the timeline', 'Select the second clip', 'Select the 60 fps clip again'),
  'Expected Result': lines('Step 2: Video Editor opens with the clip on the timeline', 'Step 2: a toast 「This 60 fps video will export at 30 fps. Your original is unchanged.」 for about 3 s', 'Steps 4–5: no second toast'),
  Notes: lines('Recent Gen lists only this visit\'s jobs and My Library\'s preview has no Open in Editor, so the result is made in the same visit (KF-005)',
    'R1: no toast (MYE261124P0028); the route itself is R-073, still held with TC-123 (Q-2)'),
});

// 7. Narrow window, not a phone (TC-101 – TC-105, TC-109; R-049)
for (const id of ['TC-101', 'TC-102', 'TC-103', 'TC-104', 'TC-105', 'TC-109']) {
  const r = get(id);
  const patch: Partial<Rec> = { Precondition: r.Precondition.replace(NARROW_OLD, NARROW) };
  if (id === 'TC-101') patch.Notes = 'R1: 「Processing...」 covers the whole page and the summary and Enhance are not shown (MYE261124P0030)';
  mod(id, 'Precondition fixed: the 375 × 812 rows run in a narrow desktop window held by a CDP override, not a phone (R1 O-13; R-049 reworded)', patch);
}

// Launcher card has no Enhanced tag (user, 2026-11-26, REQ-009; KC #ec5715b6ac73 replaces #b29e724be991)
mod('TC-002', 'R-008 reversed for the Launcher: no 「Enhanced」 tag on the Home › Popular Tools card (KC #ec5715b6ac73, latest MX spec; REQ-009)', {
  'Expected Result': lines('The Video Enhancer card carries no 「Enhanced」 tag', 'It carries no 「New」 tag either'),
  Notes: 'KC features/video-enhancer-v2.md › 跨工具串接 › 工具標籤 (#ec5715b6ac73, replaces #b29e724be991): Enhanced only in the top menu (TC-001); R1 failed this row on the old expectation (ISS-VEW-01, held, not filed)',
});

// Continue Editing over 8:00: Video Trimmer is the exception (PM ruling, KC #1c76d4b60c73, REQ-010)
mod('TC-088', 'R-040 narrowed: the Trimmer-first rule is for Continue Editing from tools other than Video Trimmer, here Video Merger (REQ-013); Video Trimmer shows 「Video Too Long」 instead (KC #1c76d4b60c73; REQ-010, TC-154)', {
  Precondition: pre(BASE, 'Video Merger (/en/video-editor/video-merger) with an 8:20 clip (fx-8m20) ready to continue into Video Enhancer'),
  Notes: lines('PM ruling #1c76d4b60c73 (2026-11-26): from Video Trimmer an over-8:00 clip gets 「Video Too Long」 in Video Trimmer instead (TC-154)',
    'Source tool: Video Merger (user, 2026-11-26, REQ-013); find its Continue Editing › Video Enhancer entry on the result'),
});

// TC-085: Replace over 2:30 in Professional opens the Trimmer (PM, KC 2026-11-26; REQ-012)
mod('TC-085', 'R-111 added, R-037 narrowed: Replace Video with a clip over 2:30 in Professional opens the Trimmer (max 2:30); Cancel keeps the old video; no red text after the trim (PM, KC 2026-11-26; REQ-012)', {
  Action: steps('Click 「Replace Video」 and pick the 3:00 MP4 (fx-3m00)', 'Read the Trimmer', 'Click 「Cancel」', 'Click 「Replace Video」 and pick the 3:00 MP4 (fx-3m00) again', 'Drag the end handle past 2:30', 'Click 「Trim」'),
  'Expected Result': lines('Step 1: the Trimmer opens', 'Step 1: the video is not replaced yet',
    'Step 2: bottom left 「Professional mode supports videos up to 2:30 long. Please trim your video to continue.」',
    'Step 3: the Trimmer closes and the 2:30 video stays, Professional selected',
    'Step 5: the selection stops at 2:30',
    'Step 6: the trimmed clip (2:30 or less) replaces the video, Mode stays Professional',
    'Step 6: no red 2:30 text and Enhance is enabled'),
  'Spec Ref': 'R-037, R-038, R-111',
  Notes: lines('KC features/video-enhancer-v2.md › 影片長度限制 (PM 2026-11-26): Replace over 2:30 opens the Trimmer, Cancel keeps the old video; the red text only applies when Professional is chosen with a video already over 2:30 (TC-083, TC-084)',
    'R1 failed the old expectation (red text); MYE261124P0033 asked for that and is not a bug under the new spec (user decides the ticket)'),
});

// TC-113: result-ready mail body changed (Figma 2026-11-26, KC; REQ-012)
mod('TC-113', 'R-062 changed: the mail body is 「Your Video Enhancer has been generated successfully. …」 (Figma 2026-11-26, KC; REQ-012)', {
  'Expected Result': lines('Step 1: subject 「Your Video Enhancer result is ready!」',
    'Step 1: body 「Your Video Enhancer has been generated successfully. Click the button below to view the results and start using your video.」',
    'Step 1: button 「Access Your Video Enhancer」',
    'Step 2: My Library › Video Enhancer opens'),
  Notes: lines('Mailbox of the default account (Outlook)',
    'KC features/video-enhancer-v2.md › 跨工具串接 › EDM (Figma 2026-11-26): wording follows the other long-task tools\' mails; R1 saw this text, so MYE261124P0027 is not a bug under the new spec (user decides the ticket)'),
});

// TC-021: the SEO page does not block length; the room opens, then the Trimmer (PM, KC 2026-11-26; REQ-012)
mod('TC-021', 'R-022 changed: the SEO / import pages do not block an over-8:00 video; it uploads, the room opens and then the Trimmer opens (PM, KC 2026-11-26; REQ-012)', {
  Action: steps('Upload the 8:20 MP4 (fx-8m20)', 'Look at the page once the upload ends', 'Drag the end handle past 8:00', 'Click 「Trim」'),
  'Expected Result': lines('Step 1: no 「Video Duration Limit Exceeded」 or other error dialog on the SEO page',
    'Step 2: the room opens and the Trimmer opens over it',
    'Step 2: bottom left 「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」',
    'Step 3: the selection stops at 8:00',
    'Step 4: the room shows the trimmed video (8:00 or less)'),
  Notes: lines('KC features/video-enhancer-v2.md › 影片長度限制 (PM 2026-11-26): entry pages (SEO, import) do not block length; 「Maximum file duration: 8 min」 stays in the box (TC-009)',
    'R1: the SEO page showed 「Video Duration Limit Exceeded」 (MYE261118P0008, BuildResolved; and the 8:20 example in MYE261124P0039)'),
});


// New rows, placed right after the row they extend
const NEW: Record<string, Rec[]> = {
  'TC-003': [{
    ID: 'TC-151', Section: 'Entries and rooms', Precondition: pre(BASE, 'Any page with the top menu'),
    Action: steps('Hover 「Video Tools」 and click 「HD Video Converter」', 'Read the upload box'),
    'Expected Result': lines('Step 2: the box lists 「Supported file formats: MP4, MOV」, then 「Maximum file duration: 8 min」, then 「Maximum file size: 10 GB」', 'Step 2: no resolution limit line'),
    Priority: 'P2', 'Spec Ref': 'R-107',
    Notes: 'R1 O-1: the box read 「Maximum file duration: 30 min」 / 「Maximum file size: 1.8 GB」, the old tool\'s limits (also in the Knowledge Center\'s website-derived derived-hd-video-converter-landing-page.md), though the page opens the new room (8 min / 10 GB, TC-008); Q-13',
    Change: 'new', 'Change Reason': 'R-107 added: the HD Video Converter SEO upload box had no row (R1 O-1)',
  }],
  'TC-004': [{
    ID: 'TC-152', Section: 'Entries and rooms', Precondition: pre(BASE, 'Any page with the top menu'),
    Action: steps('Hover 「Video Tools」 and click 「AI Frame Interpolation」', 'Read the upload box'),
    'Expected Result': lines('Step 2: the box lists 「Supported file formats: MP4, MOV」, then 「Maximum file duration: 8 min」, then 「Maximum file size: 10 GB」', 'Step 2: no resolution limit line'),
    Priority: 'P2', 'Spec Ref': 'R-108',
    Notes: 'R1 O-1: the box read 「Maximum file duration: 3 min」 / 「Maximum file size: 1.8 GB」, the old tool\'s limits (also in the Knowledge Center\'s website-derived derived-ai-frame-interpolation-landing-page.md), though the page opens the new room (8 min / 10 GB, TC-008); Q-13',
    Change: 'new', 'Change Reason': 'R-108 added: the AI Frame Interpolation SEO upload box had no row (R1 O-1)',
  }],
  'TC-088': [{
    ID: 'TC-154', Section: 'Professional length limit',
    Precondition: pre(BASE, 'Video Trimmer (/en/video-editor/video-trimmer) with the 8:20 MP4 (fx-8m20) uploaded'),
    Action: steps('Click the left sidebar 「AI Generate」 › 「Video Enhancer」', 'Click 「Cancel」', 'Click the left sidebar 「AI Generate」 › 「Video Enhancer」 again', 'Click 「Start New」'),
    'Expected Result': lines('Step 1: the 「Video Too Long」 dialog shows while still in Video Trimmer, with 「Cancel」 and 「Start New」', 'Step 1: no Trimmer opens and the Video Enhancer room does not open',
      'Step 2: the dialog closes and Video Trimmer stays with the 8:20 clip', 'Step 4: a new project of the new Video Enhancer opens (/video-editor/video-enhancer, not Video Restoration)'),
    Priority: 'P2', 'Spec Ref': 'R-110',
    Notes: lines('PM ruling #1c76d4b60c73 (2026-11-26), KC features/video-enhancer-v2.md › 影片長度限制; also derived-video-continue-editing-checks.md step 4; all video tools share this Continue Editing rule',
      'R1 saw the body 「Sorry, this tool does not support videos longer than 8 minutes. To continue using this tool, please trim your video first.」 (O-26); record the body and whether Start New brings the clip along'),
    Change: 'new', 'Change Reason': 'R-110 added: PM ruling #1c76d4b60c73, Continue Editing from Video Trimmer over 8:00 shows 「Video Too Long」 (REQ-010)',
  }],
  'TC-147': [{
    ID: 'TC-153', Section: 'Product rules',
    Precondition: pre('Chrome at 1440 × 900 on MyEdit demo, signed in as the storage-full Studio Pro test account (web-account studio-pro-full, port 9344; storage filled 2026-11-26)', `The Video Enhancer room with ${V480} uploaded`),
    Action: steps('Click 「Enhance」', 'Click 「Manage」'),
    'Expected Result': lines('Step 1: the storage-full prompt 「You’ve reached your cloud storage limit.」 shows with 「Generate Anyway」 and 「Manage」', 'Step 1: no 「Upgrade」', 'Step 2: My Library opens'),
    Priority: 'P2', 'Spec Ref': 'R-109',
    Notes: 'Knowledge Center derived-cloud-storage-warnings-and-video-download-limit (code-derived, not confirmed): Manage only when the account is already on the top cloud plan (Studio Pro) and opens My Library; KP-065 / KP-067 name the tool\'s album (My Library › Video Enhancer): record which folder opens; Q-16',
    Change: 'new', 'Change Reason': 'R-109 added: Manage split from R-104; it needs a full Studio Pro account (R1 TC-147)',
  }],
};

const TIMING = ['TC-010', 'TC-011', 'TC-012', 'TC-014', 'TC-016', 'TC-019', 'TC-020'];
const TIMING_NOTE = 'R-078 (user, 2026-11-26, REQ-014): the dialog may show on choosing the file or after the upload; only the dialog and the video not being imported are checked';
const out: Rec[] = [];
for (const r of approved) {
  const c = changes.get(r.ID);
  const row: Rec = { ...r, ...(c?.patch ?? {}) };
  if (removed.has(r.ID)) { out.push({ ...r, Change: 'removed', 'Change Reason': removed.get(r.ID)! }); continue; }
  if (c) {
    const same = COLS.slice(0, 8).every(k => (row[k] ?? '') === (r[k] ?? ''));
    if (same) throw new Error(`${r.ID}: change made no difference`);
    row.Change = 'modified'; row['Change Reason'] = c.reason;
  } else { row.Change = 'unchanged'; row['Change Reason'] = ''; }
  // R-078 relaxed (user, 2026-11-26, REQ-014): only that the dialog shows and the video is not imported; the moment is not checked
  if (TIMING.includes(r.ID)) {
    row['Expected Result'] = row['Expected Result'].replace('Step 1: after the upload finishes, ', 'Step 1: ');
    row.Notes = row.Notes.replace('Q-1 answered (user, 2026-11-25, REQ-004): the error shows after the upload, not on choosing the file', TIMING_NOTE);
    if (!row.Notes.includes(TIMING_NOTE)) row.Notes = row.Notes ? `${row.Notes}\n${TIMING_NOTE}` : TIMING_NOTE;
    const why = 'R-078 relaxed: the dialog may show on choosing the file or after the upload; only the dialog and the video not being imported are checked (user, 2026-11-26, REQ-014)';
    row['Change Reason'] = row.Change === 'modified' ? `${row['Change Reason']}; ${why}` : why;
    row.Change = 'modified';
  }
  out.push(row);
  for (const n of NEW[r.ID] ?? []) out.push(n);
}
for (const id of changes.keys()) if (!approved.some(r => r.ID === id)) throw new Error(`unknown ${id}`);
writeFileSync(join(here, 'draft.csv'), writeRecords(COLS, out));
const count = (k: string) => out.filter(r => r.Change === k).length;
console.log(`draft.csv: ${out.length} rows · unchanged ${count('unchanged')} · modified ${count('modified')} · new ${count('new')} · removed ${count('removed')}`);
