// Builds draft.csv for myedit/video-enhancer (web) from the rows below, so the draft can be rebuilt (SKILL.md step 2).
// Run: node library/myedit/video-enhancer/web/drafts/20261125-105747/build-draft.ts
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// held: the row keeps its ID but is left out of the table for now (user's answers, 2026-11-25)
type Row = { section: string; pre: string; action: string; expected: string; pri: 'P1' | 'P2' | 'P3'; ref: string; notes?: string; held?: string };
const rows: Row[] = [];
const add = (r: Row) => rows.push(r);
const lines = (...l: string[]) => l.join('\n');
const steps = (...s: string[]) => s.map((x, i) => `${i + 1}. ${x}`).join('\n');
const pre = (...p: string[]) => p.map((x, i) => `${i + 1}. ${x}`).join('\n');

const BASE = 'Chrome at 1440 × 900 on MyEdit demo (en), signed in as the default test account (Studio Pro, enough credits)';
const ROOM = (v: string) => pre(BASE, `The Video Enhancer room (/en/video-editor/video-enhancer/edit) with ${v} uploaded (web/fixtures.md)`);
const V480 = 'the 480p 30 fps 7.3 s MP4 (fx-480p30)';

// ---------- Entries and rooms ----------
let S = 'Entries and rooms';
add({ section: S, pre: pre(BASE, 'Any page with the top menu'), action: steps('Hover the top menu 「Video Tools」', 'Click 「Video Enhancer」'),
  expected: lines('The menu item 「Video Enhancer」 carries the 「Enhanced」 tag, not 「New」', 'The page opens at /en/video-editor/video-enhancer (SEO page) or the room /video-editor/video-enhancer/edit'), pri: 'P1', ref: 'R-001, R-008' });
add({ section: S, pre: pre(BASE, 'Home (/en/home)'), action: steps('Look at Home › Popular Tools', 'Find the Video Enhancer card'),
  expected: lines('The Video Enhancer card carries 「Enhanced」, not 「New」'), pri: 'P2', ref: 'R-008' });
add({ section: S, pre: pre(BASE, 'Any page with the top menu'), action: steps('Hover 「Video Tools」 and click 「HD Video Converter」', 'Click 「Choose a file」 and pick ' + V480),
  expected: lines('Step 1: the address is /en/video-editor/hd-video-converter (its own SEO page)', 'Step 2: the new Video Enhancer room opens with 「Video Enhancer Settings」', 'Step 2: the defaults are Standard, HD, 1080P, Same as source (as from the Video Enhancer entry)'), pri: 'P1', ref: 'R-002, R-009', notes: 'Q-3 answered (user, 2026-11-25, REQ-004): keep the SEO page URLs' });
add({ section: S, pre: pre(BASE, 'Any page with the top menu'), action: steps('Hover 「Video Tools」 and click 「AI Frame Interpolation」', 'Click 「Choose a file」 and pick ' + V480),
  expected: lines('Step 1: the address is /en/video-editor/ai-frame-interpolation', 'Step 2: the new Video Enhancer room opens with the same defaults as TC-003'), pri: 'P1', ref: 'R-003, R-009', notes: 'Q-3 answered (REQ-004)' });
add({ section: S, pre: pre(BASE, 'Any page with the top menu'), action: steps('Hover 「Video Tools」 and click 「Video Denoiser」', 'Upload ' + V480),
  expected: lines('Step 2: the address is /en/video-editor/video-denoiser/edit', 'Step 2: the room is Video Restoration with 「Video Restoration Settings」', 'Step 2: Video Denoise is ticked'), pri: 'P1', ref: 'R-004, R-054, R-056' });
add({ section: S, pre: pre(BASE, 'Any page with the top menu'), action: steps('Hover 「Video Tools」 and click 「Video Brightener」', 'Upload ' + V480),
  expected: lines('Step 2: the address is /en/video-editor/video-brightener/edit', 'Step 2: the room is Video Restoration', 'Step 2: Lighting Adjustment is ticked'), pri: 'P1', ref: 'R-005, R-056' });
add({ section: S, pre: pre(BASE, 'Signed in, on Home'), action: steps('Open the top menu 「Video Tools」 and read its items', 'Open the Launcher tool list and the room\'s left tool menu', 'Open /en/video-editor/video-restoration/edit and upload ' + V480),
  expected: lines('Step 1: no 「Video Restoration」 item in the top menu', 'Step 2: 「Video Restoration」 is listed in the Launcher and the left tool menu', 'Step 3: the Video Restoration room opens with Lighting Adjustment and Video Denoise ticked'), pri: 'P1', ref: 'R-006, R-007, R-056' });

// ---------- SEO page and upload ----------
S = 'SEO page and upload';
add({ section: S, pre: pre(BASE, 'The Video Enhancer SEO page (/en/video-editor/video-enhancer)'), action: steps('Read the upload box', 'Click 「Choose a file」 and pick ' + V480, 'Look at the room while the upload runs'),
  expected: lines('Step 1: the box lists 「Supported file formats: MP4, MOV」, then 「Maximum file duration: 8 min」, then 「Maximum file size: 10 GB」', 'Step 1: no resolution limit line', 'Step 3: 「Processing...」 with a percentage and 「It may take a few seconds. Please don\'t leave this page.」', 'Step 3: every setting and Enhance are disabled'), pri: 'P1', ref: 'R-010, R-011, R-012, R-013', notes: 'Q-6: the Figma mockup still draws the resolution line' });
add({ section: S, pre: ROOM(V480), action: steps('Wait for the upload to finish', 'Read the settings panel and the area above the preview'),
  expected: lines('The panel title is 「Video Enhancer Settings」', 'Mode: Standard, Professional', 'Enhance Style: HD, Natural', 'Output Resolution: Original, 720P, 1080P, 4K', 'Frame Rate: Same as source', '「Replace Video」 and 「Trim Video」 above the preview', 'Defaults: Standard, HD, 1080P, Same as source', 'Every setting and Enhance are enabled'), pri: 'P1', ref: 'R-024, R-025, R-012' });
const err = (fx: string, title: string, body: string, ref: string, extra?: string) => add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'),
  action: steps(`Click 「Choose a file」 and pick ${fx}`, 'Click 「Got it」'),
  expected: lines(`Step 1: after the upload finishes, a dialog 「${title}」 / 「${body}」 with 「Got it」`, 'Step 2: the dialog closes and the video is not imported', ...(extra ? [extra] : [])), pri: 'P1', ref: `${ref}, R-078`, notes: 'Q-1 answered (user, 2026-11-25, REQ-004): the error shows after the upload, not on choosing the file' });
err('an AVI file (fx-avi)', 'Unsupported File Format', 'Only MP4 and MOV formats are supported. Please choose another video.', 'R-014');
err('an MP4 over 10 GB (fx-10gb)', 'File Size Too Large', 'This video exceeds the 10 GB file size limit. Please choose a smaller video.', 'R-015');
err('a 2160p MP4 (fx-2160p)', 'Video Resolution Not Supported', 'This video exceeds the supported resolution limit (1440p). Please choose another video.', 'R-016');
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the 1440p 30 fps MP4 (fx-1440p)', 'Open Output Resolution'),
  expected: lines('Step 1: the room opens without an error', 'Step 2: 720P and 1080P are disabled', 'Step 2: Original and 4K are selectable', 'Step 2: the default is 4K'), pri: 'P1', ref: 'R-016, R-025, R-026' });
err('a 192×96 MP4 (fx-192x96)', 'Video Resolution Not Supported', 'This video is below the minimum supported resolution (shorter side of 128 px). Please choose another video.', 'R-017');
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the 256×128 MP4 (fx-128short)'),
  expected: lines('The room opens without an error', 'Original is selectable'), pri: 'P2', ref: 'R-017, R-026' });
err('a 240 fps MP4 (fx-240fps)', 'Video Frame Rate Not Supported', 'This video exceeds the supported frame rate limit (120 fps). Please choose another video.', 'R-018');
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the 1080p 120 fps MP4 (fx-1080p120)', 'Open Frame Rate'),
  expected: lines('Step 1: the room opens without an error', 'Step 2: only 「Same as source」 is listed'), pri: 'P1', ref: 'R-018, R-027' });
err('the MP4 with no readable frame rate (fx-nofps)', 'Unable to Use This Video', 'This video cannot be enhanced because it is missing required information, such as the frame rate. Try uploading a different video.', 'R-019');
err('an AV1 MP4 (fx-av1)', 'Unsupported Format', 'This video contains an unsupported video codec. Please choose another video.', 'R-020');
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the MP4 with an unsupported audio codec (fx-badaudio)', 'Click the dialog\'s button'),
  expected: lines('Step 1: after the upload finishes, the old room\'s 「Audio Codec Not Supported」 or 「Audio Format Not Supported」 dialog shows', 'Step 2: the video is not imported'), pri: 'P2', ref: 'R-021, R-078', notes: 'Record which of the two dialogs shows and its text' });
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the 8:20 MP4 (fx-8m20)', 'Look at the Trimmer that opens', 'Drag the end handle past 8:00', 'Click 「Trim」'),
  expected: lines('Step 2: the Trimmer opens instead of an error', 'Step 2: bottom left 「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」', 'Step 3: the selection stops at 8:00', 'Step 4: the room opens with the trimmed video (8:00 or less)'), pri: 'P1', ref: 'R-022, R-038, R-039' });
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the 8:00 MP4 (fx-8m00)'),
  expected: lines('The room opens with the video, no Trimmer and no error'), pri: 'P1', ref: 'R-022' });
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the HEVC MOV (fx-hevc-mov)'),
  expected: lines('The room opens with the video, no error'), pri: 'P1', ref: 'R-013, R-020' });
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Drag ' + V480 + ' onto the upload box'),
  expected: lines('The room opens and the video uploads as with Choose a file'), pri: 'P2', ref: 'R-011', notes: 'Drag and drop needs the OS file dialog or a real drop: run by hand or park (run-web.md)' });
add({ section: 'Input limits', pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Click a sample video'),
  expected: lines('The room opens with the sample video'), pri: 'P2', ref: 'R-011' });
add({ section: 'Input limits', pre: pre(BASE, 'The Trimmer cannot be used (service paused; RD switch needed)'), action: steps('Upload the 8:20 MP4 (fx-8m20)'),
  expected: lines('「Video Too Long」 / 「This video exceeds the 8-minute length limit. Please choose a shorter video.」 with 「Got it」'), pri: 'P3', ref: 'R-023', notes: 'Needs a way to make the Trimmer unavailable: Blocked --as test-data until RD gives one' });

// ---------- Settings panel ----------
S = 'Settings panel';
add({ section: S, pre: ROOM(V480), action: steps('Open Output Resolution'), expected: lines('Original, 720P, 1080P and 4K are all selectable', 'The default is 1080P'), pri: 'P1', ref: 'R-026, R-025' });
add({ section: S, pre: ROOM('the 720p 30 fps MP4 (fx-720p30)'), action: steps('Open Output Resolution'), expected: lines('720P is disabled', 'Original, 1080P and 4K are selectable', 'The default is 1080P'), pri: 'P1', ref: 'R-026, R-025' });
add({ section: S, pre: ROOM('the 1080p 60 fps MP4 (fx-1080p60)'), action: steps('Open Output Resolution'), expected: lines('720P and 1080P are disabled', 'Original and 4K are selectable', 'The default is 4K'), pri: 'P1', ref: 'R-026, R-025' });
const fr = (fx: string, shown: string, hidden: string) => add({ section: S, pre: ROOM(fx), action: steps('Open Frame Rate'),
  expected: lines(`Listed: ${shown}`, `Not listed: ${hidden}`), pri: 'P1', ref: 'R-027' });
fr(V480, 'Same as source, 50, 60, 100, 120 fps', 'none');
fr('the 1080p 50 fps MP4 (fx-1080p50)', 'Same as source, 60, 100, 120 fps', '50 fps');
fr('the 1080p 60 fps MP4 (fx-1080p60)', 'Same as source, 100, 120 fps', '50, 60 fps');
fr('the 1080p 100 fps MP4 (fx-1080p100)', 'Same as source, 120 fps', '50, 60, 100 fps');
fr('the 1080p 24 fps MP4 (fx-1080p24)', 'Same as source, 50, 60 fps', '100, 120 fps (over four times 24 fps)');
fr('the 1080p 29.97 fps MP4 (fx-1080p2997)', 'Same as source, 50, 60, 100, 120 fps', 'none (29.97 rounds to 30)');
add({ section: S, pre: ROOM(V480), action: steps('Hover the ⓘ of Mode', 'Hover the ⓘ of Enhance Style', 'Hover the ⓘ of Output Resolution', 'Hover the ⓘ of Frame Rate'),
  expected: lines('Step 1: 「Standard: Balanced enhancement. Works well for most videos. Professional: Stronger restoration for older or badly compressed footage. Takes much longer to process. Supports videos up to 2:30.」',
    'Step 2: 「HD: A crisper, more detailed picture. Best when footage looks soft or blurry. Natural: A gentler result that stays true to the original. Best when footage already looks good.」',
    'Step 3: 「Resolution adjustment is supported up to 4K. Options lower than or equal to the original resolution are unavailable.」', 'Step 4: 「Frame rate adjustment is supported up to 120 fps.」'), pri: 'P2', ref: 'R-028' });

// ---------- Price ----------
S = 'Price';
add({ section: S, pre: ROOM(V480), action: steps('Hover the ⓘ beside the price under Enhance'), expected: lines('「Total credits depend on video duration and selected mode, resolution, and frame rate.」'), pri: 'P2', ref: 'R-031' });
add({ section: S, pre: ROOM(V480), action: steps('Read the price on Enhance', 'Switch Enhance Style to Natural', 'Switch back to HD'),
  expected: lines('Steps 2–3: the price on Enhance and the line under it do not change'), pri: 'P1', ref: 'R-029' });
add({ section: S, pre: pre('Chrome at 1440 × 900 on MyEdit demo, signed in as the Free / empty-state test account with too few credits', 'The Video Enhancer room with ' + V480 + ' uploaded'),
  action: steps('Read Enhance and the line under it'), expected: lines('Enhance shows the normal credit price (Standard 1080P Same as source: 16)', 'No 「1 Free Trial」 anywhere'), pri: 'P1', ref: 'R-034', notes: 'Free account (myedit-test-accounts); its own Chrome profile' });
add({ section: S, pre: ROOM('the 1080p 60 fps MP4 (fx-1080p60, 5.0 s)'), action: steps('Set Standard, Original, Same as source and read the price', 'Set Professional, Original, Same as source and read the price'),
  expected: lines('Step 1: 10 credits, 「Enhance 5.00 seconds (2 credits/sec)」 (Original = 1080p tier, Same as source = ≤60 tier)', 'Step 2: 40 credits, 「Enhance 5.00 seconds (8 credits/sec)」'), pri: 'P1', ref: 'R-033, R-030, R-032' });
add({ section: S, pre: ROOM('the 1440p 30 fps MP4 (fx-1440p, 5.0 s)'), action: steps('Set Standard, Original, Same as source and read the price'),
  expected: lines('15 credits, 「Enhance 5.00 seconds (3 credits/sec)」 (Original of a 1440p source = 4K tier)'), pri: 'P1', ref: 'R-033, R-030, R-032' });
// every combination of the price settings (AGENTS.md › Every combination): Mode × Output Resolution × Frame Rate on
// the 480p 30 fps 7.3 s source (all options shown); priced, no generation. Original = 720p tier, Same as source = ≤30.
const RATE: Record<string, Record<string, number[]>> = { Standard: { '720p': [1, 1, 1], '1080p': [2, 2, 2], '4k': [3, 6, 8] }, Professional: { '720p': [2, 4, 8], '1080p': [4, 8, 16], '4k': [12, 24, 48] } };
const RES: [string, string][] = [['Original', '720p'], ['720P', '720p'], ['1080P', '1080p'], ['4K', '4k']];
const FPS: [string, number][] = [['Same as source', 0], ['50 fps', 1], ['60 fps', 1], ['100 fps', 2], ['120 fps', 2]];
export const combos: { mode: string; res: string; fps: string; id?: string }[] = [];
for (const mode of ['Standard', 'Professional']) for (const [res, tier] of RES) for (const [fps, t] of FPS) {
  const rate = RATE[mode][tier][t], total = 8 * rate;
  combos.push({ mode, res, fps });
  add({ section: 'Price — every combination', pre: ROOM(V480), action: steps(`Set Mode ${mode}, Output Resolution ${res}, Frame Rate ${fps} (Enhance Style HD)`),
    expected: lines(`Enhance shows ${total} credits`, `Under it: 「Enhance 7.30 seconds (${rate} credits/sec)」`), pri: mode === 'Standard' && t === 0 ? 'P1' : 'P2', ref: 'R-030, R-032, R-033',
    notes: `Combination ${mode} · ${res} · ${fps}; 8 s (7.3 rounded up) × ${rate}; stage rates, demo only (Q-4, Q-5 answered, REQ-004); no generation` });
}

// ---------- Professional length limit ----------
S = 'Professional length limit';
add({ section: S, pre: ROOM('the 3:00 MP4 (fx-3m00)'), action: steps('Click Mode 「Professional」'),
  expected: lines('Professional is selected', '「Professional mode supports videos up to 2:30.」 shows in red under Mode', 'Enhance is disabled'), pri: 'P1', ref: 'R-036' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with the 3:00 MP4 (fx-3m00), Professional selected (red text shown)'), action: steps('Click Mode 「Standard」'),
  expected: lines('The red text disappears', 'Enhance is enabled'), pri: 'P1', ref: 'R-037' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with the 3:00 MP4 (fx-3m00), Professional selected (red text shown)'), action: steps('Click 「Replace Video」 and pick the 2:30 MP4 (fx-2m30)'),
  expected: lines('The red text disappears', 'Enhance is enabled'), pri: 'P1', ref: 'R-037' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with the 2:30 MP4 (fx-2m30), Professional selected'), action: steps('Click 「Replace Video」 and pick the 3:00 MP4 (fx-3m00)'),
  expected: lines('「Professional mode supports videos up to 2:30.」 shows in red under Mode', 'Enhance is disabled'), pri: 'P1', ref: 'R-036, R-037' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with the 5:12 MP4 (fx-5m12), Professional selected (red text shown)'),
  action: steps('Click 「Trim Video」', 'Drag the end handle as far right as it goes', 'Type an End Time 3:00 past the Start Time', 'Set a part of 2:30 or less and click 「Trim」'),
  expected: lines('Step 1: bottom left 「Professional mode supports videos up to 2:30 long. Please trim your video to continue.」', 'Step 2: the selection stops at 2:30', 'Step 3: End Time becomes Start Time + 2:30', 'Step 4: the red text disappears and Enhance is enabled'), pri: 'P1', ref: 'R-038, R-039, R-037' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with the 2:00 MP4 (fx-2m00), Professional selected'), action: steps('Click 「Trim Video」'),
  expected: lines('The Trimmer opens with no bottom-left hint'), pri: 'P2', ref: 'R-039' });
add({ section: S, pre: pre(BASE, 'A video editing tool result of 8:20 offering 「Continue Editing」 into Video Enhancer'), action: steps('Click 「Continue Editing」 › Video Enhancer', 'Trim to 8:00 or less and click 「Trim」'),
  expected: lines('Step 1: the room opens with the Trimmer first (at most 8:00 selectable)', 'Step 1: Enhance is not available yet', 'Step 2: the room shows the trimmed clip and Enhance is enabled'), pri: 'P2', ref: 'R-040', notes: 'Which tool offers Continue Editing into Video Enhancer: find it once and name it in fixtures.md' });

// ---------- Generate and result ----------
S = 'Generate and result';
const gen = (fx: string, set: string, out: string, credits: number, rate: string, ref: string) => add({ section: S, pre: ROOM(fx),
  action: steps(`Set ${set}`, 'Read the credit ledger (device-web credits ledger)', 'Click 「Enhance」', 'Wait for the job to finish in Recent Gen', 'Read the credit ledger again', 'Download the result and read its resolution and frame rate (ffprobe)'),
  expected: lines(`Step 1: Enhance shows ${credits} credits (${rate})`, 'Step 3: a job card appears in Recent Gen', 'Step 3: under Recent Gen 「The generated videos can be found in My Library」 with 「My Library」 as a link', `Step 5: one new entry of -${credits} under MyEdit for the Video Enhancer job`, `Step 6: ${out}`),
  pri: 'P1', ref });
gen(V480, 'Standard, HD, 720P, Same as source', '1280×720 (or 720 on the shorter side), 30 fps', 8, '1 credit/sec', 'R-041, R-046, R-047, R-030');
gen(V480, 'Standard, Natural, 4K, 120 fps', '3840×2160 (4K on the shorter side), 120 fps', 64, '8 credits/sec', 'R-041, R-046, R-047');
gen(V480, 'Professional, HD, 1080P, 60 fps', '1920×1080, 60 fps', 64, '8 credits/sec', 'R-041, R-046, R-047');
gen(V480, 'Standard, HD, Original, 50 fps', 'the source\'s 854×480, 50 fps', 8, '1 credit/sec', 'R-041, R-046, R-047, R-033');
add({ section: S, pre: pre(BASE, 'A Video Enhancer job from TC above has finished in Recent Gen'), action: steps('Click 「My Library」 under Recent Gen', 'Open the Video Enhancer folder'),
  expected: lines('Step 1: My Library opens', 'Step 2: the result is in the Video Enhancer folder'), pri: 'P1', ref: 'R-043, R-041' });
add({ section: S, pre: pre(BASE, 'The room just finished a job for the uploaded video, settings unchanged'), action: steps('Look at Enhance', 'Change Frame Rate', 'Change it back and click 「Replace Video」 with ' + V480, 'Use 「Trim Video」 to change the part and click 「Trim」'),
  expected: lines('Step 1: Enhance is disabled', 'Step 2: Enhance is enabled', 'Step 3: Enhance is enabled', 'Step 4: Enhance is enabled'), pri: 'P1', ref: 'R-044', notes: 'Q-7 answered (user, 2026-11-25, REQ-004): Trim re-enables Enhance' });
add({ section: S, pre: ROOM(V480), action: steps('Play the preview, pause it and seek', 'Use 「Trim Video」 and 「Replace Video」 once each'),
  expected: lines('Preview, Trim and Replace work as in the original Video Enhancer'), pri: 'P2', ref: 'R-045' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with no job yet for this account (empty Recent Gen)'), action: steps('Read Recent Gen before uploading'),
  expected: lines('「Start by uploading a video to generate your video」'), pri: 'P3', ref: 'R-042', notes: 'Needs an account with no Video Enhancer results (Free / empty-state account)' });
add({ section: S, pre: pre(BASE, 'A Video Enhancer job is running in Recent Gen'), action: steps('Go to Home', 'Open My Library › Video Enhancer'),
  expected: lines('The job is listed and finishes there'), pri: 'P2', ref: 'R-043' });
add({ held: 'Q-2: Open in Editor skipped for now (user, 2026-11-25, REQ-004)', section: S, pre: pre(BASE, 'A finished Video Enhancer result in Recent Gen'), action: steps('Find 「Open in Editor」 on the result', 'Click it'),
  expected: lines('Step 2: Video Editor opens with the result as in other video generation tools'), pri: 'P2', ref: 'R-048', notes: 'Q-2: record where the entry is' });
add({ section: S, pre: pre(BASE, 'A Video Enhancer job is made to fail (fault input from RD or a policy-violating video)'), action: steps('Wait for the failure'),
  expected: lines('Recent Gen shows the failure with an understandable message', 'The page does not reload, and the uploaded video and settings stay for a retry', 'The credits are returned in the ledger'), pri: 'P2', ref: 'R-046, R-081', notes: 'Needs a way to fail a job: Blocked --as test-data until found' });
add({ section: S, pre: pre(BASE, 'Settings set in the room with ' + V480), action: steps('Leave the room for Home', 'Come back to /en/video-editor/video-enhancer/edit'),
  expected: lines('The room starts empty: no video and default settings'), pri: 'P3', ref: 'R-045' });

// ---------- Mobile web ----------
S = 'Mobile web';
const M = (v: string) => pre('Chrome window 375 × 812 (device-web window 375 812) on MyEdit demo, signed in as the default test account', v);
add({ section: S, pre: M('The Video Enhancer SEO page'), action: steps('Upload ' + V480, 'Look at the page during the upload'),
  expected: lines('「Processing...」 with a percentage', '「It may take a few seconds. Please don’t leave this page.」', 'The settings summary and Enhance are dimmed'), pri: 'P1', ref: 'R-049' });
add({ section: S, pre: M('The room with ' + V480 + ' uploaded'), action: steps('Read the settings summary and Enhance'),
  expected: lines('「Video Enhancer Settings」', 'Mode | Standard', 'Enhance Style | HD', 'Output Resolution | 1080P', 'Frame Rate | Same as source', 'Enhance with credits and 「Enhance 7.30 seconds (2 credits/sec)」'), pri: 'P1', ref: 'R-050' });
add({ section: S, pre: M('The room with ' + V480 + ' uploaded'), action: steps('Open the edit panel', 'Tap Frame Rate'),
  expected: lines('Step 1: all options of the four settings, with 「Replace Video」 and 「Trim Video」 above', 'Step 2: a bottom sheet lists Same as source, 50, 60, 100, 120 fps'), pri: 'P1', ref: 'R-051' });
add({ section: S, pre: M('The room with ' + V480 + ' uploaded, Standard 720P'), action: steps('Tap Enhance', 'Wait'),
  expected: lines('Step 1: 「Creating Your Video」 with a percentage and 「Please do not close this window or click the Back button on your browser.」', 'Step 2: the page goes to My Library › Video Enhancer'), pri: 'P1', ref: 'R-052' });
add({ section: S, pre: M('The room with the 3:00 MP4 (fx-3m00) uploaded'), action: steps('Open the edit panel and choose Professional', 'Close the edit panel', 'Choose Standard'),
  expected: lines('Step 1: 「Professional mode supports videos up to 2:30.」 under Mode', 'Step 2: summary 「Mode | Professional」 with 「Video longer than 2:30」 in red', 'Step 2: Enhance is disabled', 'Step 3: both red texts disappear and Enhance is enabled'), pri: 'P1', ref: 'R-053' });

// ---------- Video Restoration ----------
S = 'Video Restoration (old room)';
add({ section: S, pre: pre(BASE, '/en/video-editor/video-restoration/edit with ' + V480 + ' uploaded'), action: steps('Read the panel title and options'),
  expected: lines('「Video Restoration Settings」', 'Options in order: Lighting Adjustment, Video Denoise, Video Upscaler, Frame Interpolation'), pri: 'P1', ref: 'R-054, R-055' });
add({ section: S, pre: pre(BASE, 'The Video Restoration panel open'), action: steps('Click the panel\'s Back button', 'Click 「Video Restoration」 in the left tool menu'),
  expected: lines('Step 1: the panel closes', 'Step 2: the four-option panel opens again'), pri: 'P1', ref: 'R-057' });
add({ section: S, pre: pre(BASE, 'The Video Restoration room with ' + V480 + ', Lighting Adjustment ticked'), action: steps('Generate', 'Open My Library'),
  expected: lines('The result is in My Library › Video Restoration'), pri: 'P2', ref: 'R-058' });
add({ section: S, pre: M('The Video Restoration room with ' + V480), action: steps('Generate'),
  expected: lines('The page goes straight to My Library › Video Restoration'), pri: 'P2', ref: 'R-058' });

// ---------- My Library ----------
S = 'My Library';
add({ section: S, pre: pre(BASE, 'My Library › Video'), action: steps('Open the Video Enhancer folder', 'Read its note'),
  expected: lines('「Results from the new Video Enhancer are saved here. For results from the original Video Enhancer, go to Video Restoration.」'), pri: 'P2', ref: 'R-059' });
add({ section: S, pre: pre(BASE, 'My Library › Video', 'The account has results from the original Video Enhancer'), action: steps('Look at the Video Restoration folder', 'Hover its ⓘ'),
  expected: lines('Step 1: 「(Formerly Video Enhancer)」 under the name and the earlier results inside', 'Step 2: 「The original Video Enhancer has been renamed to Video Restoration. Your previous results are still here. Results from the new Video Enhancer are saved in the Video Enhancer folder.」'), pri: 'P2', ref: 'R-060' });
add({ section: S, pre: pre(BASE), action: steps('Open /en/cloud/library/video/video-enhancer', 'Open /en/cloud/library/video/video-restoration'),
  expected: lines('Step 1: the new Video Enhancer folder', 'Step 2: the Video Restoration folder'), pri: 'P2', ref: 'R-061' });

// ---------- Emails ----------
S = 'Emails';
add({ section: S, pre: pre(BASE, 'A Video Enhancer job has just finished'), action: steps('Open the account\'s mailbox', 'Click 「Access Your Video Enhancer」'),
  expected: lines('Step 1: 「Your Video Enhancer result is ready!」 with 「Your enhanced video is ready! Click the button below to view the results and start using your video.」', 'Step 2: My Library › Video Enhancer opens'), pri: 'P2', ref: 'R-062', notes: 'Mailbox of the default account (Outlook)' });
add({ section: S, pre: pre(BASE, 'A Video Enhancer job has failed'), action: steps('Open the account\'s mailbox'),
  expected: lines('「Your Video Enhancer result failed to generate.」', 'Its body says 「…content that violates our policy, or temporary server issues…」 and names My Library › Video Enhancer'), pri: 'P3', ref: 'R-063', notes: 'Blocked --as test-data until a job can be failed' });
add({ section: S, pre: pre(BASE, 'A Video Restoration job has just finished'), action: steps('Open the account\'s mailbox', 'Click 「Access Your Video Restoration」'),
  expected: lines('Step 1: 「Your Video Restoration result is ready!」', 'Step 2: My Library › Video Restoration opens'), pri: 'P3', ref: 'R-064' });

// ---------- Other tools ----------
S = 'Other tools';
add({ section: S, pre: pre(BASE, 'MyEdit Agent (Home › Agent)'), action: steps('Attach ' + V480 + ' and ask 「Upscale this video to 4K and make it smoother」', 'Attach the 8:20 MP4 (fx-8m20) and ask the same'),
  expected: lines('Step 1: the Agent completes it with Video Enhancer in Standard mode', 'Step 2: the Agent asks to trim the video first'), pri: 'P2', ref: 'R-065', notes: 'Spends credits; Agent answers vary: judge the tool and mode it names' });
add({ section: S, pre: pre(BASE, 'A 60 fps Video Enhancer result in My Library'), action: steps('Open it in Video Editor (Open in Editor)', 'Switch to another clip and back'),
  expected: lines('Step 1: a toast 「This 60 fps video will export at 30 fps. Your original is unchanged.」 for about 3 s', 'Step 2: no second toast'), pri: 'P2', ref: 'R-066' });
add({ section: S, pre: pre(BASE), action: steps('Open the Pricing page'), expected: lines('The video tools list 「Video Enhancer」 and 「Video Restoration」'), pri: 'P3', ref: 'R-067' });

// ---------- Knowledge Center rules (standing input 7, 2026-11-25) ----------
S = 'Knowledge Center rules';
const HELD9 = 'Q-9: code-derived rules left out for now (user, 2026-11-25, REQ-004)';
const KCN = 'Code-derived KC rule, not confirmed by PM (Q-9): record what the site does; a difference goes to PM';
add({ section: S, pre: ROOM(V480), action: steps('Set Standard, HD, 720P, Same as source', 'Read the credit ledger', 'Click 「Enhance」', 'While the upload dialog is still running, read the credit ledger again'),
  expected: lines('Step 4: the -8 entry for the job is already in the ledger before the upload finishes'), pri: 'P2', ref: 'R-068, R-046', notes: 'RD answer #dfed049fda18; can share the generation of the first Generate row' });
add({ section: S, pre: ROOM('the 3:00 MP4 (fx-3m00)'), action: steps('Set Standard, HD, 720P, Same as source and read the credit ledger', 'Click 「Enhance」', 'Cancel in the upload dialog while it uploads', 'Read the credit ledger again 6 hours later'),
  expected: lines('Step 3: the upload stops and no job appears in Recent Gen', 'Step 3: nothing reports it as a failed generation (it shows as cancelled or simply stops)', 'Step 4: the deducted credits are back (a refund entry of +180 or the balance restored)'), pri: 'P2', ref: 'R-069, R-080', notes: 'RD answer #dfed049fda18: refund within 3–6 hours; record the time it arrived' });
add({ section: S, pre: pre('Chrome at 1440 × 900 on MyEdit demo, signed in as the Free storage-full test account (own Chrome profile)', 'The Video Enhancer room with ' + V480 + ' uploaded'),
  action: steps('Click 「Enhance」'), expected: lines('The cloud storage prompt shows', 'No job is sent and no credits are charged'), pri: 'P2', ref: 'R-070', notes: KCN, held: HELD9 });
add({ section: S, pre: pre('Chrome at 1440 × 900 on MyEdit demo, signed in as the 0-credit test account (own Chrome profile)', 'The Video Enhancer room with ' + V480 + ' uploaded'),
  action: steps('Click 「Enhance」', 'Close whatever the site shows'), expected: lines('Step 1: the site says credits are not enough (record the dialog)', 'Step 2: the upload dialog is closed and Enhance can be pressed again'), pri: 'P2', ref: 'R-071', notes: KCN, held: HELD9 });
add({ section: S, pre: pre(BASE, 'A finished Video Enhancer result in Recent Gen'), action: steps('Click the result card', 'Click 「Open in Editor」 in the preview'),
  expected: lines('Step 1: a preview shows the original and the result side by side', 'Step 2: Video Editor opens with the result'), pri: 'P2', ref: 'R-072, R-073, R-048', notes: KCN + '; Q-2', held: HELD9 });
add({ section: S, pre: ROOM(V480), action: steps('Use 「Trim Video」 to keep the first 3 s and click 「Trim」', 'Click the top bar\'s 「Open in Editor」'),
  expected: lines('Step 2: Video Editor opens with the 3 s trimmed video, not a result'), pri: 'P3', ref: 'R-074, R-048', notes: KCN + '; Q-2', held: HELD9 });
add({ section: S, pre: pre('Chrome window 1200 × 900 on MyEdit demo, signed in as the default test account', 'The Video Enhancer room with ' + V480 + ' and a finished result'),
  action: steps('Look for Recent Gen', 'Set the window to 1201 × 900 (device-web window 1201 900)'), expected: lines('Step 1: Recent Gen is not shown', 'Step 2: Recent Gen shows and its result card opens the side-by-side preview'), pri: 'P3', ref: 'R-075', notes: KCN, held: HELD9 });
add({ section: S, pre: pre(BASE, 'The Video Enhancer SEO page'), action: steps('Upload the 5:12 MP4 (fx-5m12)', 'Look at 「Trim Video」 at once, before the video information is read'),
  expected: lines('「Trim Video」 is disabled until the video information is read, then enabled'), pri: 'P3', ref: 'R-076', notes: KCN + '; the window is short: record it with device-web record', held: HELD9 });
add({ section: S, pre: pre(BASE, 'A result in another video tool, 2160p, offering 「Continue Editing」 into Video Enhancer'), action: steps('Click 「Continue Editing」 › Video Enhancer'),
  expected: lines('「Video Resolution Not Supported」 shows', 'The Video Enhancer room does not open'), pri: 'P3', ref: 'R-077', notes: KCN, held: HELD9 });

// ---------- Product rules (domain knowledge KP-, 2026-11-25) ----------
S = 'Product rules';
const KB = (ids: string) => `Product rule ${ids} (library/myedit/knowledge; imported 2026-11-25)`;
add({ section: S, pre: ROOM(V480), action: steps('Start device-web record', 'Upload ' + V480 + ' again with 「Replace Video」 and watch the percentage', 'Set Standard 720P and click 「Enhance」', 'Watch the job card in Recent Gen until it ends', 'Stop the recording'),
  expected: lines('Step 2: the percentage starts at 0 and never goes back', 'Step 4: the job progress starts at 0, never goes back and ends done (or failed), never stuck processing'), pri: 'P2', ref: 'R-079', notes: KB('KP-007, KP-008') + '; shares the generation of the first Generate row' });
add({ section: S, pre: pre(BASE, 'A Video Enhancer job is generating in Recent Gen'), action: steps('Click 「Replace Video」 and pick ' + V480, 'Use 「Trim Video」 if it is enabled'),
  expected: lines('Replace Video and Trim Video are disabled, or the running job still finishes with the video it started with'), pri: 'P2', ref: 'R-082', notes: KB('KP-011') });
add({ section: S, pre: pre(BASE, 'A finished result from the first Generate row (fx-480p30, with audio)'), action: steps('Play the result in its preview', 'Download it', 'Play the download and read it with ffprobe', 'Download it once more and play both'),
  expected: lines('Step 3: same content, orientation, aspect ratio and length (about 7.3 s) as the preview', 'Step 3: it has an audio track', 'Step 3: the extension matches the format (MP4 → .mp4) and the name is not empty', 'Step 4: both downloads play'), pri: 'P2', ref: 'R-083, R-085, R-086', notes: KB('KP-012, KP-014, KP-017, KP-070') });
add({ section: S, pre: ROOM('the portrait phone video with rotation metadata (fx-rotated, 1080×1920 shown, stored 1920×1080 + rotate 90)'), action: steps('Look at the preview', 'Open 「Trim Video」', 'Set Standard 720P, Enhance and download the result'),
  expected: lines('Steps 1–3: the picture is upright everywhere: preview, Trimmer, result and download'), pri: 'P2', ref: 'R-084', notes: KB('KP-013, KP-069') });
add({ section: S, pre: ROOM('the 5:12 MP4 (fx-5m12)'), action: steps('Click 「Trim Video」 and play', 'Click the timeline near 3:00 while it plays', 'Set the range 1:00 – 1:10 and play from 1:00'),
  expected: lines('Step 2: the playhead jumps to about 3:00 and playback goes on from there', 'Step 3: playback stops at 1:10'), pri: 'P2', ref: 'R-087', notes: KB('KP-023') });
add({ section: S, pre: ROOM(V480), action: steps('Change Output Resolution to 4K', 'Click the top menu 「Image Tools」 › any tool', 'Choose to stay', 'Reload the page (F5)', 'Choose to leave'),
  expected: lines('Step 2: a leave confirmation shows', 'Step 3: the room stays with the video and 4K', 'Step 4: the browser or the site asks first', 'Step 5: the page leaves'), pri: 'P2', ref: 'R-088', notes: KB('KP-025, KP-026') + '; the spec is silent: a missing warning goes to PM' });
add({ section: S, pre: pre(BASE, 'The Video Enhancer room with nothing uploaded'), action: steps('Click the top menu 「Image Tools」 › any tool'),
  expected: lines('The page leaves with no unsaved-changes warning'), pri: 'P3', ref: 'R-089', notes: KB('KP-027') });
add({ section: S, pre: ROOM(V480), action: steps('Set Professional, Natural, 4K, 60 fps', 'Set the window to 1000 × 900 (device-web window 1000 900)', 'Set it back to 1440 × 900'),
  expected: lines('Step 2: the mobile summary shows Professional, Natural, 4K, 60 fps', 'Step 3: the panel shows the same settings'), pri: 'P2', ref: 'R-090', notes: KB('KP-028') });
add({ section: S, pre: ROOM(V480), action: steps('Play the preview', 'Click 「Enhance」 (Standard 720P)', 'Play the preview again and click 「Replace Video」'),
  expected: lines('Step 2: the preview pauses or stops', 'Step 3: the preview pauses or stops'), pri: 'P3', ref: 'R-091', notes: KB('KP-029') + '; can share the generation of the first Generate row' });
add({ section: S, pre: pre(BASE, 'A Video Enhancer job just started from the room'), action: steps('Open My Library › Video Enhancer while it processes', 'Reload the page after it finishes'),
  expected: lines('Step 1: the item shows processing', 'Step 2: the item is still there and shows done', 'Step 2: its thumbnail and length (about 0:07) belong to the result'), pri: 'P2', ref: 'R-092, R-093', notes: KB('KP-031, KP-032, KP-034, KP-068') });
add({ section: S, pre: ROOM(V480), action: steps('Look at the top right of the SEO page and of the room', 'Read the account menu balance', 'Enhance with Standard 720P and close nothing', 'Read the account menu balance again without reloading'),
  expected: lines('Step 1: 「Get Credits」 is at the top right on both pages', 'Step 3: no credit-shortage dialog', 'Step 4: the balance is 8 lower than in step 2'), pri: 'P2', ref: 'R-094, R-095', notes: KB('KP-038, KP-039, KP-040, KP-043') + '; can share the first Generate row' });
add({ section: S, pre: pre('Chrome at 1440 × 900 on MyEdit demo, signed out (a fresh Chrome profile on its own port)', 'The Video Enhancer room with ' + V480 + ' uploaded'),
  action: steps('Click 「Enhance」'), expected: lines('The site asks to sign in', 'No job is sent and nothing is charged'), pri: 'P2', ref: 'R-096', notes: KB('KP-041') });
add({ section: S, pre: pre(BASE, 'Home (/en/home)'), action: steps('Read the tool names in the Launcher', 'Read them in the top menu 「Video Tools」', 'Read them in the room\'s left tool menu', 'Read them on the Pricing page'),
  expected: lines('「Video Enhancer」 and 「Video Restoration」 are written the same everywhere they appear', 'No place shows another tool\'s name for them'), pri: 'P3', ref: 'R-097', notes: KB('KP-045') });
add({ section: S, pre: ROOM('the 3:00 MP4 (fx-3m00)'), action: steps('Choose Professional (Enhance disabled) and click 「Enhance」', 'Hover, tab to and select each setting option'),
  expected: lines('Step 1: Enhance looks disabled and nothing happens', 'Step 2: hover, focus, selected and disabled options each look different and stay readable'), pri: 'P3', ref: 'R-098', notes: KB('KP-050, KP-056') });
add({ section: S, pre: ROOM(V480), action: steps('Open the Frame Rate menu', 'Open another settings menu or tooltip'),
  expected: lines('Step 1: the menu opens right beside Frame Rate, does not cover it and shows every option (or scrolls)', 'Step 2: the first menu closes', 'Step 2: never two menus open at once'), pri: 'P3', ref: 'R-099', notes: KB('KP-051, KP-058') });
add({ section: S, pre: ROOM(V480), action: steps('Set the window to 1280 × 720', 'Zoom the page to 150 %', 'Hover each ⓘ'),
  expected: lines('Steps 1–2: every setting, Enhance and Recent Gen can be reached, by scrolling if needed', 'Step 3: no tooltip hides Enhance for good'), pri: 'P3', ref: 'R-100', notes: KB('KP-052, KP-053') + '; reset zoom to 100 % after' });
add({ section: S, pre: ROOM(V480), action: steps('Open each settings menu and tooltip', 'Open the Trimmer', 'Click 「Enhance」 and watch the progress and the Recent Gen card', 'Open and close a result preview', 'Trigger one dialog (Replace Video with fx-avi)'),
  expected: lines('Every element is light: menus, Trimmer, progress, cards, preview, dialog, toasts', 'No dark flash when the preview closes', 'Text and icons stay legible in every state, including disabled and processing', 'Frames and dividers drawn in the design are still there'), pri: 'P3', ref: 'R-101', notes: KB('KP-054, KP-055, KP-057') + '; Q-11; colours checked against the Design later' });
add({ section: S, pre: ROOM('the 1:00 MP4 (fx-1m00)'), action: steps('Play the preview to the end', 'Open the Trimmer', 'Enhance (Standard 720P) and read the duration on the Recent Gen card and in My Library'),
  expected: lines('Every time code shows 01:00 at the end, never 00:60'), pri: 'P3', ref: 'R-102', notes: KB('KP-060') });
add({ held: 'Q-12: UI language checks not tested now (user, 2026-11-25, REQ-006)', section: S, pre: pre(BASE, 'The Video Enhancer room in Traditional Chinese (/tw/video-editor/video-enhancer/edit) with ' + V480 + ' uploaded'),
  action: steps('Read the panel, tooltips, Recent Gen and the price line', 'Trigger one upload error (fx-avi)'),
  expected: lines('Every text is Traditional Chinese, with no raw key (like video_enhancer_v2.…) and no English default', 'Longer texts stay readable and cover no control'), pri: 'P3', ref: 'R-103', notes: KB('KP-061, KP-062, KP-063') + '; Q-12' });
add({ section: S, pre: pre('Chrome at 1440 × 900 on MyEdit demo, signed in as the Free storage-full test account (own Chrome profile; storage already full, never filled by the run)', 'The Video Enhancer room with ' + V480 + ' uploaded'),
  action: steps('Read My Library\'s storage (used / total)', 'Click 「Enhance」', 'Click 「Manage」'),
  expected: lines('Step 2: the storage-full prompt shows with 「Generate Anyway」 and 「Manage」', 'Step 3: the tool\'s album opens (My Library › Video Enhancer)'), pri: 'P2', ref: 'R-104', notes: KB('KP-065, KP-067') });
add({ section: S, pre: pre('Chrome at 1440 × 900 on MyEdit demo, signed in as the Free storage-full test account (own Chrome profile)', 'The Video Enhancer room with ' + V480 + ', Standard 720P'),
  action: steps('Click 「Enhance」', 'Click 「Generate Anyway」'), expected: lines('Step 2: the job starts in Recent Gen and is charged as shown'), pri: 'P2', ref: 'R-104', notes: KB('KP-065, KP-068') + '; record whether the result is saved (storage is full)' });
add({ section: S, pre: pre(BASE), action: steps('Open /en/video-editor/video-enhancer and read the browser tab title', 'Do the same for /en/video-editor/video-enhancer/edit, /en/video-editor/hd-video-converter, /en/video-editor/ai-frame-interpolation and /en/video-editor/video-restoration/edit'),
  expected: lines('Each tab title is readable and names its tool or page', 'None shows a string key, 「undefined」 or another tool\'s title'), pri: 'P3', ref: 'R-105', notes: KB('KP-074') + '; screenshot the tab strip' });
add({ section: S, pre: pre(BASE, 'Home (/en/home) and the public Home (signed out)'), action: steps('Compare the Video Enhancer card\'s thumbnail with every other tool card', 'Do the same for Video Restoration'),
  expected: lines('Neither card uses the same thumbnail as another tool'), pri: 'P3', ref: 'R-106', notes: KB('KP-075') + '; a shared thumbnail is a fail' });

// ---------- write ----------
const COLS = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
const q = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
const out = [COLS.join(',')];
const held: string[] = [];
rows.forEach((r, i) => {
  const id = `TC-${String(i + 1).padStart(3, '0')}`;
  if (r.section === 'Price — every combination') { const c = combos.find(c => !c.id)!; c.id = id; }
  if (r.held) { held.push(`${id}: ${r.held}`); return; }
  out.push([id, r.section, r.pre, r.action, r.expected, r.pri, r.ref, r.notes ?? '', 'new', 'New table (PM Figma + KC spec, 2026-11-25)'].map(q).join(','));
});
writeFileSync(join(import.meta.dirname, 'draft.csv'), out.join('\n') + '\n');
writeFileSync(join(import.meta.dirname, 'combos.json'), JSON.stringify(combos, null, 1));
console.log(`${rows.length - held.length} rows (${held.length} held)`);
writeFileSync(join(import.meta.dirname, 'held.txt'), held.join('\n') + '\n');
const ids = (sec: string) => rows.map((r, i) => r.section === sec ? `TC-${String(i + 1).padStart(3, '0')}` : '').filter(Boolean);
for (const s of [...new Set(rows.map(r => r.section))]) console.log(s, ids(s)[0], '…', ids(s).at(-1));
