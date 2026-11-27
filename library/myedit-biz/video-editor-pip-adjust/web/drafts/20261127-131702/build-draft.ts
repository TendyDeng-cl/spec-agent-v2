// Builds draft.csv for myedit-biz/video-editor-pip-adjust (web) from the rows below, so the draft can be rebuilt
// (SKILL.md step 2). Run: node library/myedit-biz/video-editor-pip-adjust/web/drafts/20261127-131702/build-draft.ts
// Rows get TC-001… in file order; `rows-index.txt` lists ID, Spec Ref and the first Action line for the grids.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Row = { section: string; pre: string; action: string; expected: string; pri: 'P1' | 'P2' | 'P3'; ref: string; notes?: string };
const rows: Row[] = [];
let S = '';
const add = (r: Omit<Row, 'section'>) => rows.push({ section: S, ...r });
const lines = (...l: string[]) => l.join('\n');
const steps = (...s: string[]) => s.length === 1 ? s[0] : s.map((x, i) => `${i + 1}. ${x}`).join('\n');
const pre = (...p: string[]) => p.length === 1 ? p[0] : p.map((x, i) => `${i + 1}. ${x}`).join('\n');

const BASE = 'Chrome at 1440 × 900 on MyEdit Biz demo (business-demo.myedit.online, en), signed in as the main test account (web/fixtures.md)';
const PROJ = 'A Video Editor project with fx-main on the main track and fx-photo as a Photo PiP over it (web/fixtures.md)';
const PROJ_PHOTO = 'A Video Editor project with fx-photo on the main track (a main photo) after fx-main (web/fixtures.md)';
const PROJ_FULL = 'The "full" project of web/fixtures.md: fx-main and fx-main2 on the main track with a transition between them, fx-photo and fx-photo2 as Photo PiPs, fx-pipvideo as a video PiP, a text, a sticker and a music track';
const BIZPRO = 'Signed in as a Biz Pro account (Cutout is Biz Pro only; web/fixtures.md)';
const PM_ONLY = 'PM-only: no MyEdit Biz Design frame yet (Design UJ, due 2026-11-27)';
const PAUSED = 'Playback paused';
const SLIDERS: [string, number, number, number][] = [
  ['Saturation', -100, 100, 0], ['Hue', 0, 200, 100], ['Temperature', 0, 100, 50],
  ['Tint', 0, 100, 50], ['Brightness', -100, 100, 0], ['Contrast', -100, 100, 0],
];
const sliderReq: Record<string, string> = { Saturation: 'R-009', Hue: 'R-010', Temperature: 'R-011', Tint: 'R-012', Brightness: 'R-013', Contrast: 'R-014' };

// ---------- Toolbars and entry ----------
S = 'Toolbars and entry';
add({ pre: pre(BASE, PROJ, PAUSED), action: steps('Click the main-track video fx-main on the timeline', 'Read the editing toolbar from left to right'),
  expected: lines('The toolbar reads 「Split」, 「Trim」, 「Corner」, 「BG Blur」, 「Adjust」, 「Fade In」, 「Fade Out」, 「Audio」, 「Delete」', '「Adjust」 sits directly right of 「BG Blur」'),
  pri: 'P1', ref: 'R-001', notes: 'Design ds-adjust-main-video and PM agree. MyEdit has no main-video Adjust yet (REQ-002).' });
add({ pre: pre(BASE, PROJ_PHOTO, PAUSED), action: steps('Click the main-track photo fx-photo on the timeline', 'Read the editing toolbar'),
  expected: lines('「Adjust」 is in the toolbar directly right of 「BG Blur」'), pri: 'P1', ref: 'R-002' });
add({ pre: pre(BASE, PROJ, PAUSED), action: steps('Click the Photo PiP fx-photo (on the canvas or its PiP clip)', 'Read the editing toolbar from left to right'),
  expected: lines('「Cutout」, 「Crop/Rotate」, 「Mask」, 「Adjust」 follow each other in this order, and 「Fade In」 comes right after 「Adjust」', '「Fade In」, 「Fade Out」, 「Order」, 「Delete」 end the toolbar in this order', 'Record where 「Split」 and 「Corner」 sit (PM: 「Split」, 「Corner」 first; Biz Design: 「Corner」, 「Cutout」, 「Split」)'),
  pri: 'P1', ref: 'R-003, R-004', notes: 'Q-1: the Biz Design (ds-adjust-photo-pip) draws Corner, Cutout, Split, Adjust, … without Crop/Rotate and Mask; the PM order is Split, Corner, Cutout, Crop/Rotate, Mask, Adjust, Fade In, Fade Out, Order, Delete. If a tool is missing on the build, check the partial order of R-004 instead. Contract ME-PIP-20261104-S001-B001 (MyEdit order).' });
add({ pre: pre(BASE, PROJ_FULL, PAUSED), action: steps('Click the video PiP fx-pipvideo', 'Click the text', 'Click the sticker', 'Read the toolbar each time'),
  expected: lines('Steps 1–3: no 「Adjust」 button in the toolbar', 'Steps 1–3: no 「Crop/Rotate」 or 「Mask」 button either'), pri: 'P2', ref: 'R-005', notes: 'Adjust is Photo PiP only in this release; Video PiP later (KC). Crop/Rotate and Mask are Photo PiP tools (KC).' });
add({ pre: pre(BASE, PROJ, PAUSED, 'The left panel shows the Videos tab'), action: steps('Click fx-main on the timeline', 'Click 「Adjust」 in the toolbar'),
  expected: lines('The left panel content is replaced by the Adjust panel', 'The 「Adjust」 toolbar button shows its selected state'), pri: 'P1', ref: 'R-006', notes: 'Design draws the Videos left-nav tab still highlighted under the panel (main video) and Photos for a PiP.' });
add({ pre: pre(BASE, PROJ, PAUSED), action: steps('Click the Photo PiP fx-photo', 'Click 「Adjust」', 'Drag 「Brightness」 to 60'),
  expected: lines('Step 2: the same Adjust panel opens (title, Color and Light groups, six sliders, Reset) as for the main video', 'Step 3: only the PiP photo gets brighter', 'Step 3: the main video under it is unchanged'), pri: 'P1', ref: 'R-007, R-027' });

// ---------- Adjust panel and sliders ----------
S = 'Adjust panel and sliders';
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main never adjusted'), action: steps('Click fx-main', 'Click 「Adjust」', 'Read the whole panel'),
  expected: lines('Title 「Adjust」 with ✕ at the top right', 'Group 「Color」: 「Saturation」, 「Hue」, 「Temperature」, 「Tint」', 'Group 「Light」: 「Brightness」, 「Contrast」', 'Each row: label, slider and number box', '「Reset」 at the bottom of the panel', 'No 「Highlights」 or 「Shadows」 row (six sliders only)'),
  pri: 'P1', ref: 'R-008', notes: 'Photo Editor has 8 sliders (Highlights, Shadows); the engine supports only 6 in Video Editor (KC).' });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main and fx-photo never adjusted'), action: steps('Open Adjust for fx-main and read the six number boxes', 'Open Adjust for the Photo PiP fx-photo and read them'),
  expected: lines('Steps 1–2: 「Saturation」 0, 「Hue」 100, 「Temperature」 50, 「Tint」 50, 「Brightness」 0, 「Contrast」 0', 'Steps 1–2: each knob sits at its default position (centre of the track)'),
  pri: 'P1', ref: 'R-009, R-010, R-011, R-012, R-013, R-014' });
for (const [name, lo, hi] of SLIDERS) {
  add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main'), action: steps(`Drag the 「${name}」 knob all the way left`, 'Read its number box and look at the viewer', `Drag the 「${name}」 knob all the way right`, 'Read its number box and look at the viewer'),
    expected: lines(`Step 2: the box reads ${lo} and the viewer shows the change`, `Step 4: the box reads ${hi} and the viewer shows the change`, 'Steps 1–4: the knob stops at the track ends'),
    pri: name === 'Saturation' || name === 'Brightness' ? 'P1' : 'P2', ref: `${sliderReq[name]}, R-016` });
}
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main'), action: steps('Look at the six slider tracks at their defaults', 'Drag 「Saturation」 to 50', 'Drag 「Saturation」 to -50', 'Drag 「Brightness」 to 40'),
  expected: lines('Step 1: 「Hue」 has a rainbow track with no fill', 'Step 1: 「Temperature」 has a warm-to-blue gradient track and 「Tint」 a green–magenta gradient track, with no fill', 'Steps 2–4: 「Saturation」 and 「Brightness」 are grey tracks with a blue fill', 'Record where the blue fill starts (PM: from 0 in the centre; Design: from the left end) and the gradient directions'),
  pri: 'P3', ref: 'R-015', notes: `Q-3: PM Temperature orange → white → blue, Tint green → magenta, fill from 0; the Biz Design draws Temperature yellow → blue, Tint magenta → green and the fill from the left end. Design first when dates cannot tell (check on device, decide with the user before filing).` });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main', 'Screen recording running (Evidence: screen recording of the whole drag)'), action: steps('Press the 「Saturation」 knob', 'Drag it slowly from 0 to 100 over about 3 seconds without releasing', 'Release it'),
  expected: lines('Step 2: at several moments during the drag the viewer colour already follows the knob and the number box', 'Step 2: no visible lag between the knob and the viewer', 'Step 3: the viewer stays at the released value'),
  pri: 'P1', ref: 'R-016', notes: 'Q-4: the spec gives no allowed delay; the row assumes no visible lag. During-a-gesture rule (analysis pass 4).' });

// ---------- Adjust number input ----------
S = 'Adjust number input';
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main'), action: steps('Click the 「Brightness」 number box', 'Select its text and type 45', 'Look at the viewer before pressing anything else', 'Press Enter'),
  expected: lines('Step 3: record whether the viewer already shows 45 (interim Photo Editor behaviour: live preview while typing) or still the old value (target MyEdit behaviour)', 'Step 4: the box reads 45, the knob moves to 45 and the viewer shows it'),
  pri: 'P1', ref: 'R-017', notes: 'Q-5: either behaviour at step 3 passes until the UX item for Enter/leave ships; the release decides which (KC).' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main'), action: steps('Type 30 in the 「Contrast」 box', 'Click empty space in the panel to leave the field'),
  expected: lines('Step 2: 「Contrast」 is 30 on the box, the knob and the viewer'), pri: 'P2', ref: 'R-017' });
for (const [name, lo, hi] of SLIDERS) {
  add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main'), action: steps(`Type ${hi + 50} in the 「${name}」 box and press Enter`, `Type ${lo - 50} in the 「${name}」 box and press Enter`),
    expected: lines(`Step 1: the box changes to ${hi} and the knob is at the right end`, `Step 2: the box changes to ${lo} and the knob is at the left end`),
    pri: name === 'Saturation' ? 'P1' : 'P2', ref: `R-018, ${sliderReq[name]}` });
}
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main', '「Tint」 set to 70'), action: steps('Clear the 「Tint」 box and press Enter', 'Type abc in the 「Tint」 box and click outside the field', 'Type - (a minus sign only) and press Enter'),
  expected: lines('Steps 1–3: the box goes back to 70', 'Steps 1–3: the viewer keeps the 70 look'), pri: 'P2', ref: 'R-019' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main', '「Hue」 at 198'), action: steps('Click the 「Hue」 box', 'Press ↑ three times', 'Press ↓ once', 'Use the box\'s up/down arrow buttons the same way if the box shows them'),
  expected: lines('Step 2: 199, then 200, then it stays at 200', 'Step 2: at 200 the up arrow button is disabled', 'Step 3: 199', 'Step 4: each click changes the value by 1'), pri: 'P2', ref: 'R-020, R-010' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main', '「Saturation」 at -99'), action: steps('Click the 「Saturation」 box', 'Press ↓ twice'),
  expected: lines('Step 2: -100, then it stays at -100', 'Step 2: at -100 the down arrow button is disabled'), pri: 'P2', ref: 'R-020, R-009' });

// ---------- Reset, Undo and Redo ----------
S = 'Reset, Undo and Redo';
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main, every slider at its default'), action: steps('Look at 「Reset」', 'Drag 「Temperature」 to 70', 'Drag 「Temperature」 back to 50 (or type 50)'),
  expected: lines('Step 1: 「Reset」 is disabled', 'Step 2: 「Reset」 becomes enabled', 'Step 3: 「Reset」 is disabled again'), pri: 'P1', ref: 'R-022' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main', 'All six sliders set away from their defaults (40, 130, 30, 62, 20, -15, as the PM adjusted frame)'), action: steps('Click 「Reset」', 'Click Undo once', 'Click Redo once'),
  expected: lines('Step 1: all six return to 0, 100, 50, 50, 0, 0 and the viewer looks as the original', 'Step 1: 「Reset」 becomes disabled', 'Step 2: all six come back to 40, 130, 30, 62, 20, -15 in one Undo', 'Step 3: all six are reset again'),
  pri: 'P1', ref: 'R-021, R-025' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main, every slider at its default'), action: steps('Drag 「Saturation」 from 0 to 20, pausing a moment at 5, 10 and 15 before releasing at 20', 'Click Undo once', 'Click Redo once'),
  expected: lines('Step 2: 「Saturation」 goes straight back to 0 (one drag is one step)', 'Step 3: 「Saturation」 is 20 again'), pri: 'P1', ref: 'R-023, R-025' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main, 「Brightness」 0'), action: steps('Type 33 in the 「Brightness」 box (typing 3, then 3)', 'Press Enter', 'Click Undo once'),
  expected: lines('Step 3: 「Brightness」 returns to 0 in one Undo, not to 3'), pri: 'P1', ref: 'R-024', notes: 'Q-5: one entry is one undo step under both the interim and the target behaviour.' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Photo PiP fx-photo selected, Adjust panel open, every slider at its default'), action: steps('Drag 「Contrast」 to 50', 'Click 「Reset」', 'Click Undo twice'),
  expected: lines('Step 2: all sliders back to their defaults', 'Step 3: the first Undo brings 「Contrast」 50 back', 'Step 3: the second Undo returns 「Contrast」 to 0'), pri: 'P2', ref: 'R-021, R-023, R-007' });

// ---------- Adjust scope and selection ----------
S = 'Adjust scope and selection';
add({ pre: pre(BASE, PROJ, 'fx-main playing with the playhead inside it', 'Adjust panel open for fx-main'), action: steps('Drag 「Saturation」 to 60'),
  expected: lines('Playback pauses when the drag starts', 'The viewer previews the change at the paused playhead time'), pri: 'P1', ref: 'R-026' });
add({ pre: pre(BASE, PROJ, 'fx-main playing', 'Adjust panel open for fx-main'), action: steps('Type 40 in the 「Hue」 box and press Enter'),
  expected: lines('Playback pauses when typing starts or at the latest when the value applies', 'The viewer shows the new hue at the paused playhead'), pri: 'P2', ref: 'R-026' });
add({ pre: pre(BASE, PROJ, 'fx-main playing', 'Adjust panel open for fx-main with 「Saturation」 at 60'), action: steps('Click 「Reset」'),
  expected: lines('Playback pauses', 'The viewer shows the reset look at the paused playhead'), pri: 'P2', ref: 'R-026' });
add({ pre: pre(BASE, PROJ, 'The Photo PiP fx-photo playing', 'Adjust panel open for fx-photo'), action: steps('Drag 「Brightness」 to 50'),
  expected: lines('Playback pauses when the drag starts', 'The viewer previews the brighter PiP at the playhead'), pri: 'P2', ref: 'R-026, R-007' });
add({ pre: pre(BASE, PROJ_FULL, PAUSED), action: steps('Open Adjust for fx-main and set 「Saturation」 to -100', 'Play across fx-main into fx-main2'),
  expected: lines('Step 2: fx-main plays in black and white', 'Step 2: fx-main2, the PiPs and the sticker keep their colours'), pri: 'P1', ref: 'R-027' });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main adjusted (「Saturation」 -100, 「Brightness」 30)'), action: steps('Put the playhead in the middle of fx-main', 'Click 「Split」', 'Select each part and open Adjust'),
  expected: lines('Step 3: both parts show 「Saturation」 -100 and 「Brightness」 30', 'Step 3: both parts play with the same look'), pri: 'P1', ref: 'R-028' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Photo PiP fx-photo adjusted (「Hue」 150, 「Contrast」 40)'), action: steps('Put the playhead inside fx-photo', 'Click 「Split」', 'Select each part and open Adjust'),
  expected: lines('Step 3: both parts show 「Hue」 150 and 「Contrast」 40'), pri: 'P1', ref: 'R-028' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Photo PiP fx-photo adjusted (「Tint」 80, 「Brightness」 -30)'), action: steps('Select fx-photo and copy it (Ctrl+C or its More menu)', 'Paste it (Ctrl+V or the More menu)', 'Select the pasted PiP and open Adjust'),
  expected: lines('Step 3: the copy shows 「Tint」 80 and 「Brightness」 -30 and looks the same as the original'), pri: 'P1', ref: 'R-029', notes: 'Video Editor has no Duplicate (KC).' });
add({ pre: pre(BASE, PROJ_FULL, PAUSED, 'fx-main adjusted (「Saturation」 -60), fx-main2 not adjusted, fx-photo adjusted (「Hue」 160)'), action: steps('Open Adjust for fx-main', 'Click fx-main2 on the timeline', 'Click the Photo PiP fx-photo', 'Click fx-main again'),
  expected: lines('Steps 2–4: the Adjust panel stays open', 'Step 2: the panel shows fx-main2\'s defaults', 'Step 3: the panel shows 「Hue」 160', 'Step 4: the panel shows 「Saturation」 -60'), pri: 'P1', ref: 'R-030' });
add({ pre: pre(BASE, PROJ_FULL, PAUSED, 'fx-photo adjusted (「Brightness」 40)', 'Adjust panel open for fx-photo'), action: steps('Click the text', 'Select fx-photo, open Adjust again and click the sticker', 'Repeat with the music track', 'Repeat with the transition', 'Repeat with the video PiP fx-pipvideo', 'Repeat with an empty spot of the canvas or timeline (deselect)'),
  expected: lines('Steps 1–6: the Adjust panel closes each time', 'Steps 2–6: reopening Adjust on fx-photo still shows 「Brightness」 40'), pri: 'P1', ref: 'R-031' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Adjust panel open for fx-main with 「Contrast」 25'), action: steps('Click ✕ on the panel', 'Open Adjust again', 'Click the left-nav 「Music」 tab', 'Select fx-main and open Adjust again'),
  expected: lines('Step 1: the panel closes and the viewer keeps the adjusted look', 'Step 2: 「Contrast」 25', 'Step 3: the Music tab replaces the panel', 'Step 4: 「Contrast」 25'), pri: 'P1', ref: 'R-032' });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main is a landscape video placed so BG Blur shows a blurred background (e.g. a portrait canvas or a smaller clip)'), action: steps('Turn on 「BG Blur」 for fx-main', 'Open Adjust and set 「Saturation」 to -100'),
  expected: lines('Step 2: the clip and its blurred background both turn black and white'), pri: 'P1', ref: 'R-033' });
add({ pre: pre(BASE, BIZPRO, PROJ_PHOTO, PAUSED, 'Cutout applied to the main photo fx-photo'), action: steps('Open Adjust for fx-photo', 'Set 「Hue」 to 0', 'Turn Cutout off'),
  expected: lines('Step 2: the visible (kept) part changes hue', 'Step 3: the whole photo, background included, shows the same hue (the whole image was adjusted)'), pri: 'P2', ref: 'R-034' });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'Cutout applied to the Photo PiP fx-photo'), action: steps('Open Adjust for fx-photo and set 「Brightness」 to 60', 'Turn Cutout off'),
  expected: lines('Step 1: only the cut-out subject is visible and brighter', 'Step 2: the whole photo shows the same brightness'), pri: 'P2', ref: 'R-034' });
add({ pre: pre(BASE, PROJ, PAUSED, 'A Mask shape (e.g. a circle) applied to the Photo PiP fx-photo'), action: steps('Open Adjust for fx-photo and set 「Saturation」 to -100', 'Open Mask and choose 「None」', 'Click 「Done」'),
  expected: lines('Step 1: the visible circle turns black and white', 'Step 3: the whole photo is black and white'), pri: 'P2', ref: 'R-034' });
add({ pre: pre(BASE, 'The missing-file project of web/fixtures.md (its main video, main photo and Photo PiP sources removed from Uploads)', PAUSED), action: steps('Click the main video clip', 'Click the main photo clip', 'Click the Photo PiP clip on the timeline'),
  expected: lines('Step 1: 「Adjust」 is grey and does nothing when clicked, like 「BG Blur」, 「Trim」, 「Corner」, 「Fade In」, 「Fade Out」 and 「Audio」', 'Step 2: 「Adjust」 is grey and does nothing when clicked', 'Step 3: 「Adjust」 is grey and does nothing when clicked'),
  pri: 'P2', ref: 'R-035', notes: 'Fixture: if the site gives no way to make a source missing, record Blocked --as test-data. A missing-file clip draws grey on the timeline (KC tech guide).' });

// ---------- Adjust thumbnails, export and project ----------
S = 'Adjust thumbnails, export and project';
add({ pre: pre(BASE, PROJ, PAUSED, 'Layer panel open'), action: steps('Set fx-main 「Saturation」 to -100', 'Look at the fx-main clip on the timeline and at its Layer thumbnail'),
  expected: lines('The timeline clip thumbnails turn black and white', 'The Layer thumbnail turns black and white', 'No badge or icon is added to the clip for Adjust'), pri: 'P1', ref: 'R-036, R-037' });
add({ pre: pre(BASE, PROJ_PHOTO, PAUSED, 'Layer panel open'), action: steps('Set the main photo\'s 「Hue」 to 0', 'Look at its timeline clip and its Layer thumbnail'),
  expected: lines('The timeline thumbnail and the Layer thumbnail show the new hue', 'No badge on the clip'), pri: 'P2', ref: 'R-036, R-037' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Layer panel open'), action: steps('Set the Photo PiP\'s 「Brightness」 to -80', 'Look at its PiP clip on the timeline and its Layer thumbnail'),
  expected: lines('The PiP clip thumbnail and the Layer thumbnail are darker', 'No badge on the PiP clip'), pri: 'P1', ref: 'R-036, R-037' });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main is the first clip of the project, adjusted to 「Saturation」 -100', 'Wait until the cloud save icon shows saved'), action: steps('Open My Projects › Video in a new tab', 'Find the project card'),
  expected: lines('The project thumbnail shows the black-and-white first frame'), pri: 'P2', ref: 'R-037' });
add({ pre: pre(BASE, BIZPRO, PROJ_PHOTO, PAUSED, 'Layer panel open', 'The main photo fx-photo has Cutout and 「Corner」 30, and is rotated 45° with the canvas handle', 'Fade In on it'), action: steps('Look at the main photo\'s timeline clip', 'Look at its Layer thumbnail', 'Look at the My Projects card (when it is the first clip)'),
  expected: lines('Step 1: the timeline thumbnail shows the original full photo, square-cornered and upright', 'Step 2: the Layer thumbnail shows the cut-out, rounded and rotated photo', 'Steps 1–3: no thumbnail shows the fade'), pri: 'P2', ref: 'R-038, R-039' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Layer panel open', 'The Photo PiP fx-photo has only 「Corner」 40 (no Cutout, Crop or Mask)'), action: steps('Look at its PiP clip on the timeline and its Layer thumbnail'),
  expected: lines('Both thumbnails show the rounded corners'), pri: 'P2', ref: 'R-038, R-040', notes: 'Corner shows on the Timeline PiP thumbnail even without Cutout, Crop or Mask (KC thumbnail rule, changed from MyEdit\'s older rule).' });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'Layer panel open', 'The Photo PiP fx-photo has Cutout, a circle Mask, 「Brightness」 -50 and Fade In and Fade Out'), action: steps('Look at its PiP clip on the timeline', 'Look at its Layer thumbnail'),
  expected: lines('Steps 1–2: both show the darker cut-out photo inside the circle', 'Steps 1–2: neither shows the fade'), pri: 'P2', ref: 'R-038, R-040' });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main adjusted (「Saturation」 -100, 「Contrast」 50), the Photo PiP adjusted (「Hue」 0, 「Brightness」 40), Temperature and Tint changed on one of them'), action: steps('Click 「Export」 (or 「Export & Share」) and download the MP4', 'Play the downloaded file'),
  expected: lines('Step 2: fx-main is black and white with higher contrast, as in the viewer', 'Step 2: the PiP shows the changed hue and brightness, as in the viewer'), pri: 'P1', ref: 'R-041, R-009, R-010, R-011, R-012, R-013, R-014', notes: 'The button is 「Export & Share」 once the Share Project URL item ships (separate feature); the Biz Design still draws 「Export」.' });
add({ pre: pre(BASE, PROJ_PHOTO, PAUSED, 'The main photo adjusted (「Tint」 90)'), action: steps('Export and download the MP4', 'Play the file'),
  expected: lines('The main photo has the magenta tint seen in the viewer'), pri: 'P2', ref: 'R-041' });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-main (「Saturation」 -50) and the Photo PiP (「Brightness」 30) adjusted', 'The cloud save icon shows saved'), action: steps('Reload the page (or open the project again from My Projects)', 'Open Adjust for fx-main', 'Open Adjust for the PiP'),
  expected: lines('Step 1: the viewer shows both adjustments', 'Step 2: 「Saturation」 -50 for fx-main', 'Step 3: 「Brightness」 30 for the PiP'), pri: 'P1', ref: 'R-042' });

// ---------- Mask mode ----------
S = 'Mask mode';
const MASK_PRE = (...extra: string[]) => pre(BASE, PROJ, PAUSED, ...extra);
add({ pre: MASK_PRE('The playhead inside the Photo PiP fx-photo, fx-photo never masked'), action: steps('Select fx-photo', 'Click 「Mask」', 'Look at the whole page'),
  expected: lines('Step 3: the selected PiP and the main-video frame under it are shown zoomed', 'Step 3: the timeline, the editing toolbar, the Layer panel and the Full screen button are hidden', 'Step 3: 「Export」 (「Export & Share」) is disabled', 'Step 3: 「Done」 and 「Discard」 show', 'Step 3: the left panel titled 「Mask」 lists 「None」 first, selected'),
  pri: 'P1', ref: 'R-043, R-046', notes: PM_ONLY });
add({ pre: MASK_PRE('fx-photo starts at 0:05', 'The playhead at 0:02 (outside fx-photo), fx-photo selected', 'fx-main shows a different frame at 0:02 and 0:05 (time code burnt in)'), action: steps('Note the playhead time', 'Click 「Mask」', 'Read the main-video frame behind the photo', 'Click 「Discard」 and read the playhead'),
  expected: lines('Step 3: the background is the main-video frame at 0:05 (the PiP\'s start)', 'Steps 2–4: the playhead stays at 0:02'), pri: 'P1', ref: 'R-044', notes: `Q-2: KC Mask spec (2026-11-25) says the playhead does not move; the PM Figma 20261019 update says it moves to the PiP start (as Crop & Rotate does). The newer KC wins. ${PM_ONLY}` });
add({ pre: MASK_PRE('The playhead at 0:07, inside fx-photo (0:05 – 0:10)'), action: steps('Click 「Mask」', 'Click 「Discard」', 'Read the playhead'),
  expected: lines('Step 1: the background is the frame at 0:07', 'Step 3: the playhead is still at 0:07'), pri: 'P2', ref: 'R-045', notes: PM_ONLY });
add({ pre: MASK_PRE('Mask mode open on fx-photo', 'Photo Editor (same account) open in another tab with a photo selected and its Mask panel open'), action: steps('Count the shapes in the Video Editor Mask list', 'Compare the list with Photo Editor\'s Mask list'),
  expected: lines('Step 1: 「None」 plus 52 shapes', 'Step 2: the same shapes in the same order as Photo Editor'), pri: 'P1', ref: 'R-047', notes: `The shape list is fixed, not from CMS (KC). Photo Editor: two columns, None first (KC code-derived). ${PM_ONLY}` });
const shapeGroup = (from: number, to: number) => add({ pre: MASK_PRE('Mask mode open on fx-photo (fx-photo is non-square, web/fixtures.md)'), action: steps(`Click shape ${from} of the list (counting after 「None」)`, `Click each next shape up to shape ${to}, looking at the canvas each time`, `Click 「Done」 on shape ${to}`, 'Look at the canvas and the Layer thumbnail'),
  expected: lines(`Step 2: each click applies that shape to the photo at once, outlined as selected in the list`, 'Step 2: each shape keeps its proportions (not stretched)', `Step 4: the photo shows shape ${to} on the canvas and in the Layer thumbnail`), pri: from === 1 ? 'P1' : 'P2', ref: 'R-048, R-053, R-055', notes: `Shape positions ${from}–${to} (value check: the 52 shapes are walked in four rows). ${PM_ONLY}` });
shapeGroup(1, 13); shapeGroup(14, 26); shapeGroup(27, 39); shapeGroup(40, 52);
add({ pre: MASK_PRE('fx-photo masked with a heart shape and moved inside the mask to show its left half'), action: steps('Select fx-photo and click 「Mask」 again'),
  expected: lines('The heart is selected in the list', 'The photo keeps the position it had inside the heart'), pri: 'P1', ref: 'R-049', notes: PM_ONLY });
add({ pre: MASK_PRE('fx-photo masked with a circle'), action: steps('Click 「Mask」', 'Click 「None」', 'Click 「Done」'),
  expected: lines('Step 2: the whole photo shows again', 'Step 3: the canvas and the Layer thumbnail show the whole photo'), pri: 'P2', ref: 'R-048, R-055', notes: PM_ONLY });
add({ pre: MASK_PRE('Mask mode open on fx-photo with a square shape', 'Screen recording running'), action: steps('Hover the Rotate icon of the photo', 'Drag the rotate handle slowly by about 40°', 'Release'),
  expected: lines('Step 1: the tooltip 「Rotate」 shows', 'Step 2: the current angle shows and changes live during the drag', 'Step 3: the photo stays rotated at the shown angle'), pri: 'P1', ref: 'R-050, R-051', notes: PM_ONLY });
add({ pre: MASK_PRE('Mask mode open on fx-photo'), action: steps('Click zoom in (or move the zoom slider right) twice', 'Click zoom out twice'),
  expected: lines('Step 1: the view gets larger each time', 'Step 2: the view gets smaller again'), pri: 'P2', ref: 'R-052', notes: PM_ONLY });
add({ pre: MASK_PRE('fx-photo not masked'), action: steps('Click 「Mask」 and choose a star', 'Click 「Done」'),
  expected: lines('Step 2: the mode closes and the timeline, toolbar and Layer panel come back', 'Step 2: the canvas shows the star-masked photo', 'Step 2: the PiP clip thumbnail and the Layer thumbnail show the star'), pri: 'P1', ref: 'R-053, R-055', notes: PM_ONLY });
add({ pre: MASK_PRE('fx-photo masked with a circle'), action: steps('Click 「Mask」', 'Choose a triangle and rotate the photo by 30°', 'Click 「Discard」'),
  expected: lines('Step 3: the mode closes', 'Step 3: fx-photo is the same circle with the same angle and position as before entering', 'Step 3: the thumbnails still show the circle'), pri: 'P1', ref: 'R-054', notes: `Q-12: the spec only says there is a Discard; the row assumes it drops this visit's changes. ${PM_ONLY}` });
add({ pre: MASK_PRE('fx-photo not masked'), action: steps('Click 「Mask」, choose a heart, rotate by 20°, click 「Done」', 'Click Undo once', 'Click Redo once'),
  expected: lines('Step 2: one Undo removes the heart and the 20° together', 'Step 3: the heart and the angle come back'), pri: 'P2', ref: 'R-063', notes: `Q-7: assumption one Undo per Mask visit, as for Crop & Rotate (ME-PIP-20261104-S006-B014). ${PM_ONLY}` });
add({ pre: MASK_PRE('fx-photo has Fade In and Fade Out (1 s each)', 'The playhead at fx-photo\'s first frame, where the photo is faded'), action: steps('Click 「Mask」', 'Look at the photo', 'Click 「Done」', 'Play fx-photo'),
  expected: lines('Step 2: the photo shows fully, without the fade', 'Step 4: Fade In and Fade Out still play'), pri: 'P2', ref: 'R-062', notes: `Q-6: PM Figma 20261019 (「自動移除 effect」); the KC Mask spec says nothing. Assumption as the Contract Runner reading for Crop & Rotate (ME-PIP-20261104-S003-B007, B008). ${PM_ONLY}` });
add({ pre: MASK_PRE('fx-main has Fade In', 'fx-photo covers fx-main\'s faded first second, playhead in the fade'), action: steps('Note the faded main-video frame', 'Select fx-photo, open 「Mask」, click 「Done」', 'Look at the same frame', 'Open fx-main\'s Fade In setting'),
  expected: lines('Step 3: the main video is faded the same way as before', 'Step 4: Fade In is still on with the same duration'), pri: 'P3', ref: 'R-062', notes: `PM Figma 20261019: main-video fades and transitions stay as they are. ${PM_ONLY}` });

// ---------- Mask with Corner and Cutout ----------
S = 'Mask with Corner and Cutout';
add({ pre: MASK_PRE('fx-photo with 「Corner」 50'), action: steps('Open 「Mask」 and choose the square (a shape that fills its box)', 'Click 「Done」', 'Open 「Mask」 again and choose the circle', 'Click 「Done」', 'Repeat with the star'),
  expected: lines('Step 2: the square has rounded corners', 'Steps 4–5: circle and star show no visible rounding change', 'Steps 1–5: Corner stays 50 (both apply together)'), pri: 'P1', ref: 'R-056', notes: `Corner + Mask together: weekly meeting 2026-03-04; differs from Photo Editor V2 for now (KC). ${PM_ONLY}` });
add({ pre: MASK_PRE('fx-photo with 「Corner」 50', 'Corner rounding shows live in Crop & Rotate mode on this build (open Crop/Rotate on a cornered PiP first and look)'), action: steps('Open 「Mask」 and choose the square'),
  expected: lines('Inside Mask mode the square already shows the rounded corners'), pri: 'P3', ref: 'R-057', notes: `Ships together with Crop & Rotate's live corner (KC). If Crop & Rotate mode does not show it live on the build, record Not run. ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'Cutout applied to fx-photo (the subject photo fx-subject as the PiP)', 'Screen recording running'), action: steps('Click 「Mask」', 'Choose a circle that cuts off part of the subject', 'Choose a square instead', 'Click 「Done」'),
  expected: lines('Step 1: the mode shows the whole cut-out photo', 'Steps 2–4: no Cutout processing screen appears', 'Step 4: the canvas shows the cut-out subject inside the square only'), pri: 'P1', ref: 'R-058, R-060', notes: PM_ONLY });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'fx-subject as Photo PiP, masked with a circle, never cut out', 'A second copy of fx-subject as another PiP, unmasked, for comparison', 'Screen recording running'), action: steps('Select the masked PiP and click 「Cutout」', 'Wait for the result', 'Click 「Cutout」 on the unmasked copy', 'Open 「Mask」 on the masked PiP and choose 「None」'),
  expected: lines('Steps 1 and 3: the same Cutout processing screen shows for both', 'Step 2: the circle stays and only the subject inside it is visible', 'Step 4: the whole subject, also the part that was outside the circle, is cut out'), pri: 'P1', ref: 'R-059', notes: `The waits need not be equal (the Cutout cache can shorten one; contract ME-PIP-20261104-S006-B011 not testable). ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'fx-subject PiP with Cutout and a circle Mask'), action: steps('Open 「Mask」 and move the photo inside the circle', 'Rotate it 30°', 'Click 「Done」', 'Click 「Cutout」 to turn it off', 'Click 「Cutout」 to turn it on again'),
  expected: lines('Steps 1–3: no Cutout processing screen', 'Step 3: the cutout edge of the subject is unchanged, only shifted and rotated', 'Step 4: the earlier cutout comes back with the circle kept'), pri: 'P2', ref: 'R-060, R-061', notes: PM_ONLY });

// ---------- Crop & Rotate mode ----------
S = 'Crop & Rotate mode';
add({ pre: pre(BASE, PROJ, PAUSED, 'The playhead inside fx-photo, fx-photo never cropped'), action: steps('Select fx-photo', 'Click 「Crop/Rotate」', 'Look at the whole page'),
  expected: lines('Step 3: the selected PiP and the main-video frame are shown zoomed', 'Step 3: the timeline, the editing toolbar, the Layer panel and Full screen are hidden', 'Step 3: 「Export」 (「Export & Share」) is disabled', 'Step 3: 「Done」 and 「Discard」 show', 'Step 3: the left panel 「Crop & Rotate」 shows 「Aspect Ratio」 with 「Original」, 「Custom」, 「1:1」, 「4:5」, 「5:4」, 「16:9」, 「9:16」, 「21:9」, 「9:21」 and a 「Rotate」 slider', 'Step 3: 「Custom」 is selected'),
  pri: 'P1', ref: 'R-064, R-067, R-068', notes: `First entry is Custom; the Figma 「Original」 is a typo (PM, 2026-11-11). Contracts ME-PIP-20261104-S003-B001, B002, B003, B004, B012, S004-B001, B006. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo starts at 0:05', 'The playhead at 0:02, fx-photo selected', 'fx-main shows different frames at 0:02 and 0:05'), action: steps('Click 「Crop/Rotate」', 'Read the main-video frame behind the photo', 'Click 「Done」 without changes', 'Read the playhead'),
  expected: lines('Step 2: the background is the frame at 0:05', 'Step 4: the playhead is at 0:05 (moved to the PiP\'s start)'), pri: 'P1', ref: 'R-065', notes: `Contracts ME-PIP-20261104-S003-B005, B013. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'The playhead at 0:07 inside fx-photo (0:05 – 0:10)'), action: steps('Click 「Crop/Rotate」', 'Click 「Done」 without changes', 'Read the playhead'),
  expected: lines('Step 3: the playhead is still at 0:07'), pri: 'P2', ref: 'R-066', notes: `Contract ME-PIP-20261104-S003-B006. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'Crop & Rotate mode open on fx-photo (red left half, blue top-right corner)'), action: steps('Drag the 「Rotate」 slider to 45', 'Read the slider value and look at the photo', 'Drag the slider to its left end and to its right end'),
  expected: lines('Step 2: the photo turns 45° about its centre, live', 'Step 3: record the slider ends (Photo Editor: -180 and 180, 1° steps; KC code-derived)'), pri: 'P1', ref: 'R-071', notes: `Contracts ME-PIP-20261104-S004-B006, B007. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'Crop & Rotate mode open on fx-photo', 'Screen recording running'), action: steps('Hover the Rotate icon of the photo', 'Drag the rotate handle slowly by about 60°'),
  expected: lines('Step 1: the tooltip 「Rotate」 shows', 'Step 2: the angle shows and changes live during the drag, as in Mask mode'), pri: 'P1', ref: 'R-072, R-073', notes: `Contracts ME-PIP-20261104-S004-B004, B005. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'Crop & Rotate mode open on fx-photo'), action: steps('Click zoom in twice', 'Click zoom out twice'),
  expected: lines('Step 1: the view gets larger', 'Step 2: the view gets smaller again'), pri: 'P2', ref: 'R-074', notes: `Contracts ME-PIP-20261104-S005-B001, B002. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo never cropped', 'Layer panel open before entering'), action: steps('Click 「Crop/Rotate」', 'Set the 「Rotate」 slider to 30', 'Choose 「1:1」 and move the box to keep the blue corner and cut most of the red half', 'Click 「Done」'),
  expected: lines('Step 4: the mode closes and the timeline and toolbar come back', 'Step 4: the canvas shows the square crop with the blue corner, turned 30°', 'Step 4: the Layer thumbnail and the PiP clip thumbnail show the cropped, rotated photo'), pri: 'P1', ref: 'R-075, R-078', notes: `REQ-002: the Timeline PiP thumbnail shows the Crop & Rotate rotation (MyEdit behaviour), over the KC line 「旋轉 … 維持正向」. Contracts ME-PIP-20261104-S006-B001, B002, S002-B001, B002. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo cropped 1:1 at 30° (previous row)'), action: steps('Select fx-photo and click 「Crop/Rotate」 again'),
  expected: lines('「1:1」 is selected', 'The crop box is where it was left', 'The 「Rotate」 slider reads 30'), pri: 'P1', ref: 'R-070, R-087', notes: `Contracts ME-PIP-20261104-S007-B001, B002. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo cropped 16:9 at 0°'), action: steps('Click 「Crop/Rotate」', 'Choose 「9:16」, set Rotate to -40', 'Click 「Discard」'),
  expected: lines('Step 3: the mode closes', 'Step 3: fx-photo keeps the 16:9 crop at 0° on the canvas and thumbnails', 'Step 3: reopening shows 「16:9」 and 0'), pri: 'P1', ref: 'R-076', notes: `Q-12: Discard assumed to drop this visit's changes. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo uncropped, at 0°'), action: steps('Click 「Crop/Rotate」, choose 「1:1」 cutting off the blue corner, set Rotate to 60, click 「Done」', 'Click Undo once without other edits', 'Click Redo once'),
  expected: lines('Step 2: one Undo brings back the uncropped photo at 0° (the blue corner shows again, upright)', 'Step 3: the crop and the 60° come back together'), pri: 'P1', ref: 'R-077', notes: `Contract ME-PIP-20261104-S006-B014. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo has Fade In (1 s)', 'The playhead on its first frame, where it is faded'), action: steps('Click 「Crop/Rotate」', 'Look at the photo', 'Click 「Done」 and play fx-photo'),
  expected: lines('Step 2: the photo shows fully, without the fade', 'Step 3: Fade In still plays'), pri: 'P2', ref: 'R-085', notes: `Q-6 (fade kept after leaving). Contract ME-PIP-20261104-S003-B007. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo has Fade Out (1 s)', 'The playhead on its last frames, where it is faded'), action: steps('Click 「Crop/Rotate」', 'Look at the photo', 'Click 「Done」 and play the end of fx-photo'),
  expected: lines('Step 2: the photo shows fully, without the fade', 'Step 3: Fade Out still plays'), pri: 'P2', ref: 'R-085', notes: `Q-6. Contract ME-PIP-20261104-S003-B008. ${PM_ONLY}` });
add({ pre: pre(BASE, PROJ_FULL, PAUSED, 'fx-main has Fade In and Fade Out', 'A transition (e.g. a dissolve) between fx-main and fx-main2', 'fx-photo over fx-main\'s faded start'), action: steps('Note the main-video frame at the playhead, the Fade settings and the transition', 'Select fx-photo, click 「Crop/Rotate」, click 「Done」 without changes', 'Look at the same frame', 'Open fx-main\'s Fade settings and the transition'),
  expected: lines('Step 3: the main video is faded as before', 'Step 4: Fade In, Fade Out (on, same durations) and the transition style are unchanged'), pri: 'P2', ref: 'R-086', notes: `Contracts ME-PIP-20261104-S003-B009, B010, B011. ${PM_ONLY}` });

// ---------- Crop & Rotate ratios ----------
S = 'Crop & Rotate ratios';
const RATIOS: [string, string][] = [['Original', 'the photo\'s own ratio (3:2 for fx-photo)'], ['Custom', 'any shape: drag one side alone to make it 2:1'], ['1:1', 'square'], ['4:5', 'portrait 4:5'], ['5:4', 'landscape 5:4'], ['16:9', 'landscape 16:9'], ['9:16', 'portrait 9:16'], ['21:9', 'landscape 21:9'], ['9:21', 'portrait 9:21']];
for (const [r, shape] of RATIOS) {
  add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo uncropped'), action: steps('Click 「Crop/Rotate」', `Choose 「${r}」`, r === 'Custom' ? 'Drag the right edge of the crop box inwards' : 'Drag a corner of the crop box', 'Click 「Done」', 'Click 「Crop/Rotate」 again'),
    expected: lines(`Step 3: the box keeps ${shape}`, `Step 4: the canvas photo has that crop (${r})`, `Step 5: 「${r}」 is selected and the box is where it was left`),
    pri: ['Custom', '1:1', '16:9', '9:16'].includes(r) ? 'P1' : 'P2', ref: 'R-069, R-070', notes: `Ratio ${r}. Ratio choice and apply as Photo Editor (contracts ME-PIP-20261104-S004-B002, B003; parity row follows). ${PM_ONLY}` });
}
add({ pre: pre(BASE, PROJ, PAUSED, 'Biz Photo Editor open in another tab with fx-photo added as a photo on a canvas (same account)'), action: steps('In Video Editor, open Crop/Rotate on fx-photo', 'Choose 「16:9」', 'Set 「Rotate」 to 90', 'Choose 「Original」', 'Click 「Done」', 'In Photo Editor, repeat steps 1–4 on the same photo and click 「Apply」', 'Compare the two crop boxes after each step and the two results'),
  expected: lines('Step 7: the box behaves the same in both (locks to the ratio, how it fits after the 90° turn, Original back to the full photo)', 'Step 7: the two results have the same crop'), pri: 'P2', ref: 'R-069', notes: `Photo Editor parity (KC: 「行為跟 Photo Editor 的裁切一致」). Photo Editor leaves crop mode with 「Apply」, Video Editor with 「Done」. Contracts ME-PIP-20261104-S004-B002, B003 (RATIO-PARITY). ${PM_ONLY}` });

// ---------- Crop & Rotate with Cutout ----------
S = 'Crop & Rotate with Cutout';
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'fx-subject as Photo PiP with Cutout applied, never cropped', 'Screen recording running'), action: steps('Click 「Crop/Rotate」', 'Watch the change into the mode frame by frame', 'Look at the photo in the mode'),
  expected: lines('Step 2: the view fades out and in briefly', 'Step 2: no loading icon (the change takes under 0.3 s)', 'Step 3: the whole cut-out photo shows'), pri: 'P1', ref: 'R-079, R-080', notes: `A loading icon may show only when the change is not done after 0.3 s (KC). Contracts ME-PIP-20261104-S004-B008, B009, S006-B008. ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'Crop & Rotate mode open on the cut-out fx-subject', 'Screen recording running'), action: steps('Choose 「1:1」 and move the box so the subject\'s feet fall outside', 'Click 「Done」', 'Watch the change back frame by frame'),
  expected: lines('Steps 1–2: no Cutout processing screen', 'Step 3: the view fades out and in briefly with no loading icon', 'Step 3: the canvas shows the cut-out subject without its feet'), pri: 'P1', ref: 'R-079, R-080', notes: `Contracts ME-PIP-20261104-S006-B003, B007, B009. ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'The cut-out fx-subject cropped 1:1 without its feet (previous row)'), action: steps('Click 「Crop/Rotate」 again', 'Look at the area outside the box', 'Choose 「Original」 (or drag the box) to include the feet again', 'Click 「Done」'),
  expected: lines('Step 2: the cut-out feet are visible outside the box (the whole cut-out photo is shown)', 'Steps 3–4: no Cutout processing screen', 'Step 4: the feet show on the canvas, cut out from the background'), pri: 'P1', ref: 'R-079, R-082', notes: `Contracts ME-PIP-20261104-S004-B008, S006-B012. ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'The cut-out fx-subject over a recognisable main video'), action: steps('Click 「Crop/Rotate」', 'Set 「Rotate」 to 45 without changing the crop', 'Click 「Done」'),
  expected: lines('Step 3: the subject is turned 45°', 'Step 3: the cutout outline is the same and the main video shows through the transparent area'), pri: 'P2', ref: 'R-083', notes: `Contract ME-PIP-20261104-S006-B013. ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'fx-subject as Photo PiP, never cut out', 'A second fx-subject PiP, uncropped and never cut out, for comparison', 'Screen recording running'), action: steps('Crop the first PiP 1:1 without the subject\'s feet', 'Click 「Done」', 'Click 「Cutout」 and wait', 'Click 「Cutout」 on the uncropped copy and wait', 'Open Crop/Rotate on the first PiP and choose 「Original」', 'Click 「Done」'),
  expected: lines('Step 4: the cut-out subject keeps the same 1:1 crop', 'Steps 3–5: the same Cutout processing screen shows for both', 'Step 6: the feet appear, already cut out (the whole original photo was cut)'), pri: 'P1', ref: 'R-081', notes: `Waits need not be equal (S006-B011 not testable). Contracts ME-PIP-20261104-S006-B004, B005, B010. ${PM_ONLY}` });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED, 'The cut-out fx-subject cropped 1:1 at 20°', 'Screen recording running'), action: steps('Click 「Cutout」 to turn it off', 'Click 「Cutout」 to turn it on again'),
  expected: lines('Step 1: the background shows again, crop and angle kept', 'Step 2: the same cutout outline comes back, crop and angle kept', 'Step 2: a short Cutout processing screen may show'), pri: 'P2', ref: 'R-084', notes: `KC: off and on reuses the stored result; the user accepted a short processing screen for MyEdit (contract ME-PIP-20261104-S006-B006). ${PM_ONLY}` });

// ---------- Rotation and thumbnails across tools ----------
S = 'Rotation and thumbnails across tools';
add({ pre: pre(BASE, PROJ, PAUSED, 'fx-photo at 0°'), action: steps('Rotate fx-photo with the canvas handle to 30', 'Open 「Crop/Rotate」 and read 「Rotate」', 'Set it to 50 and click 「Done」', 'Open 「Mask」 and read its angle', 'Rotate in Mask mode to 70 and click 「Done」', 'Open 「Crop/Rotate」 and read 「Rotate」'),
  expected: lines('Step 2: 30', 'Step 4: 50', 'Step 6: 70', 'Steps 1–6: the canvas photo always has the angle last set'), pri: 'P1', ref: 'R-087', notes: 'One shared angle for the canvas handle, Mask Rotate and Crop & Rotate Rotate (KC, PM 2026-11-11; REQ-002: MyEdit read 170 after a handle drag).' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Layer panel open', 'fx-photo uncropped at 0°'), action: steps('Open 「Crop/Rotate」, set 「Rotate」 to 90, click 「Done」', 'Look at the PiP clip thumbnail and the Layer thumbnail', 'Rotate the photo further with the canvas handle to 170', 'Look at both thumbnails again', 'Open 「Crop/Rotate」 and read 「Rotate」'),
  expected: lines('Step 2: both thumbnails show the photo turned 90°', 'Step 4: the Layer thumbnail shows 170°', 'Step 4: the Timeline thumbnail still shows the 90° of the last Crop & Rotate', 'Step 5: 「Rotate」 reads 170'), pri: 'P1', ref: 'R-088, R-087', notes: 'REQ-002 (user ruling, MyEdit-5.11.0-11262258): Timeline follows Crop & Rotate Done, not the canvas handle; overrides the KC thumbnail line for Photo PiP.' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Layer panel open', 'fx-photo never opened in Crop/Rotate or Mask, at 0°'), action: steps('Rotate fx-photo with the canvas handle to 45', 'Look at the PiP clip thumbnail, the Layer thumbnail and (if fx-photo is in the first frame) the My Projects card'),
  expected: lines('The Timeline thumbnail stays upright', 'The Layer thumbnail shows 45°'), pri: 'P2', ref: 'R-089, R-038' });
add({ pre: pre(BASE, PROJ, PAUSED, 'Layer panel open', 'fx-photo uncropped at 0°'), action: steps('Open 「Mask」, choose a square, rotate to 60, click 「Done」', 'Look at the PiP clip thumbnail and the Layer thumbnail'),
  expected: lines('Both thumbnails show the square-masked photo turned 60°'), pri: 'P2', ref: 'R-090, R-055', notes: `Q-11: assumption the Timeline thumbnail follows Mask Done as it follows Crop & Rotate Done (REQ-002). ${PM_ONLY}` });

// ---------- Export, project and plan ----------
S = 'Export, project and plan';
add({ pre: pre(BASE, PROJ_FULL, PAUSED, 'fx-photo cropped 1:1 at 30°', 'fx-photo2 masked with a heart'), action: steps('Export and download the MP4', 'Play the file'),
  expected: lines('fx-photo shows the 1:1 crop at 30°, as on the canvas', 'fx-photo2 shows the heart mask, as on the canvas'), pri: 'P1', ref: 'R-091', notes: 'Q-9: the KC states export only for Adjust; assumption the export matches the canvas.' });
add({ pre: pre(BASE, PROJ_FULL, PAUSED, 'fx-photo cropped 1:1 at 30°', 'fx-photo2 masked with a heart', 'The cloud save icon shows saved'), action: steps('Reload the page (or reopen the project from My Projects)', 'Open Crop/Rotate on fx-photo', 'Open Mask on fx-photo2'),
  expected: lines('Step 1: the canvas shows both as before', 'Step 2: 「1:1」 and 30 for fx-photo', 'Step 3: the heart is selected for fx-photo2'), pri: 'P1', ref: 'R-092', notes: 'Q-9: assumption the project keeps them, as it keeps Adjust (R-042).' });
add({ pre: pre('Chrome at 1440 × 900 on MyEdit Biz demo signed in as an account without Biz Pro (web/fixtures.md)', PROJ, PAUSED), action: steps('Select fx-main and look at 「Adjust」', 'Select fx-photo and look at 「Crop/Rotate」, 「Mask」, 「Adjust」 and 「Cutout」', 'Open Adjust, Mask and Crop/Rotate in turn and apply a change with each'),
  expected: lines('Steps 1–2: 「Adjust」, 「Crop/Rotate」 and 「Mask」 carry no Premium mark', 'Step 2: record the 「Cutout」 mark (Premium for accounts without Biz Pro, KC code-derived)', 'Step 3: each change applies without an upgrade prompt'), pri: 'P2', ref: 'R-093', notes: 'Q-10: the KC specs name no plan gate for these tools; assumption every signed-in plan may use them.' });
add({ pre: pre(BASE, BIZPRO, PROJ, PAUSED), action: steps('Select fx-photo and use 「Adjust」, 「Mask」 and 「Crop/Rotate」 once each'),
  expected: lines('Each tool opens and applies with no Premium mark or upgrade prompt'), pri: 'P3', ref: 'R-093' });

// ---------- write ----------
const esc = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
const head = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
const out = [head.join(',')];
const index: string[] = [];
rows.forEach((r, i) => {
  const id = `TC-${String(i + 1).padStart(3, '0')}`;
  out.push([id, r.section, r.pre, r.action, r.expected, r.pri, r.ref, r.notes ?? '', 'new', 'New table (REQ-001)'].map(esc).join(','));
  index.push(`${id} | ${r.section} | ${r.ref} | ${r.action.split('\n')[0].slice(0, 70)}`);
});
const dir = import.meta.dirname;
writeFileSync(join(dir, 'draft.csv'), out.join('\n') + '\n');
writeFileSync(join(dir, 'rows-index.txt'), index.join('\n') + '\n');
console.log(`${rows.length} rows`);
