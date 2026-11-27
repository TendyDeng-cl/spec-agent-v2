# Video Editor: PiP Adjust, Mask, Crop & Rotate — requirements (web)
Spec: KC video-editor-main-video-adjust.md, KC video-editor-photo-pip-adjust.md, KC video-editor-photo-pip-mask.md,
KC video-editor-photo-pip-crop-rotate.md (the four MyEdit Biz Knowledge Center PM specs, PM Christine Lin, all
ready_for_rd, read with get_document on 2026-11-27) and Figma PM and Design text 2026-11-27.md (text snapshot of the PM
Figma boards in 3GnLdOiX9G5NH27l1ltqVr "[MyEdit] Video Editor", shared by MyEdit and MyEdit Business, read through
figma-pm / qa1, and of the MyEdit Biz Design boards in bAifqou7WA06GYoiXisWXk "Video-Editor", read through
figma-design / qa-dm). Figma-only spec set `specs/2026-11-27` (no PDF). TR261124-0031 (MyEdit Biz, December release,
build not known yet); Jira MB-426, MB-427, MB-428 (RD Carrey), MB-394 (RD Kevin).

Tags: [KC:main] Main Video Adjust spec (2026-11-25), [KC:pip-adjust] Photo PiP Adjust spec (2026-11-25), [KC:mask] Photo
PiP Mask spec (2026-11-25), [KC:crop] Photo PiP Crop & Rotate spec (2026-11-11); [PMF:<board>] / [DS:<board>] a board in
`extracted/boards/`; [KC:rules] code-derived product rules (`derived-photo-editor-mask.md`,
`derived-photo-editor-crop-rotate.md`, `derived-photo-editor-element-toolbar.md`, 「未經人確認」: context only, never an
expected result); [CR:<id>] a Contract Runner MyEdit contract (REQ-003); [Req: REQ-…] the request ledger.
Source order: Design, then PM (`spec-set.json`). The MyEdit Biz Design draws only the two Adjust boards; Mask and Crop &
Rotate have no Biz Design yet (UJ, due 2026-11-27), so their rows are PM-only (coverage pass 7) and strings come from
the PM Figma and the KC specs. Where the KC spec text and its own PM Figma board differ, the KC text is the newer (the
specs were moved and confirmed 2026-11-11 / 2026-11-25; the boards are dated 2026-10-19 and 2026-11-06).
Platform: web, desktop Chrome at 1440 × 900 on MyEdit Biz demo; MUI deferred (REQ-004).

## Toolbars and entry
- R-001 [KC:main; PMF:pm-adjust-main-video; DS:ds-adjust-main-video] Selecting a main-track video shows the toolbar 「Split」, 「Trim」, 「Corner」, 「BG Blur」, 「Adjust」, 「Fade In」, 「Fade Out」, 「Audio」, 「Delete」 in this order: 「Adjust」 directly right of 「BG Blur」.
- R-002 [KC:main; PMF:pm-adjust-main-video] Selecting a main-track photo shows 「Adjust」 directly right of 「BG Blur」.
- R-003 [KC:pip-adjust; PMF:pm-adjust-photo-pip; DS:ds-adjust-photo-pip] With all four items shipped, the Photo PiP toolbar is 「Split」, 「Corner」, 「Cutout」, 「Crop/Rotate」, 「Mask」, 「Adjust」, 「Fade In」, 「Fade Out」, 「Order」, 「Delete」 (PM); the Biz Design draws 「Corner」, 「Cutout」, 「Split」, 「Adjust」, 「Fade In」, 「Fade Out」, 「Order」, 「Delete」 (Q-1). Both put 「Adjust」 directly before 「Fade In」.
- R-004 [KC:crop; KC:mask; PMF:pm-photo-crop-rotate; PMF:pm-photo-mask] While only some ship: Crop/Rotate alone sits between 「Cutout」 and 「Fade In」; Mask alone sits between 「Cutout」 and 「Fade In」; with both, Mask comes right after Crop/Rotate (PM confirmed 2026-11-11).
- R-005 [KC:pip-adjust; KC:mask; KC:crop] Adjust, Mask and Crop/Rotate are offered for Photo PiP only (Adjust also for main-track clips): a selected video PiP, text or sticker shows none of them.
- R-006 [KC:main; PMF:pm-adjust-main-video; DS:ds-adjust-main-video] Clicking 「Adjust」 replaces the left panel's content with the Adjust panel and shows the 「Adjust」 button selected.
- R-007 [KC:pip-adjust; PMF:pm-adjust-photo-pip; DS:ds-adjust-photo-pip] For a Photo PiP the Adjust panel is the same as the main video's (six sliders and Reset) and changes only the selected PiP.

## Adjust panel and sliders
- R-008 [KC:main; PMF:pm-adjust-main-video; DS:ds-adjust-main-video] The panel shows the title 「Adjust」 with ✕, the group 「Color」 (「Saturation」, 「Hue」, 「Temperature」, 「Tint」), the group 「Light」 (「Brightness」, 「Contrast」), each row a label, a slider and a number box, and 「Reset」 at the bottom; there is no 「Highlights」 or 「Shadows」 (6 sliders: the engine supports no more).
- R-009 [KC:main; PMF:pm-adjust-main-video] 「Saturation」 ranges -100 to 100, default 0.
- R-010 [KC:main; PMF:pm-adjust-main-video] 「Hue」 ranges 0 to 200, default 100.
- R-011 [KC:main; PMF:pm-adjust-main-video] 「Temperature」 ranges 0 to 100, default 50.
- R-012 [KC:main; PMF:pm-adjust-main-video] 「Tint」 ranges 0 to 100, default 50.
- R-013 [KC:main; PMF:pm-adjust-main-video] 「Brightness」 ranges -100 to 100, default 0.
- R-014 [KC:main; PMF:pm-adjust-main-video] 「Contrast」 ranges -100 to 100, default 0.
- R-015 [KC:main; PMF:pm-adjust-main-video; DS:ds-adjust-main-video] Track styles: Saturation, Brightness and Contrast are grey tracks with a blue fill (PM: from 0 in the centre to the value; the Design draws it from the left end); Hue a rainbow track with no fill; Temperature a warm-to-blue gradient with no fill (PM orange → white → blue; Design yellow → blue); Tint a green–magenta gradient with no fill (PM green → magenta; Design magenta → green) (Q-3).
- R-016 [KC:main; PMF:pm-adjust-main-video] Dragging a slider previews the change on the viewer live (Q-4).

## Adjust number input
- R-017 [KC:main; KC:pip-adjust] Typing in a number box applies the value: the target behaviour (as MyEdit, a separate UX item) applies it on Enter or on leaving the field with no change while typing; until that item ships, the Photo Editor behaviour of a live preview while typing stays (Q-5).
- R-018 [KC:main; PMF:pm-adjust-main-video] A typed value outside the range becomes the nearest limit.
- R-019 [KC:main; PMF:pm-adjust-main-video] An empty or non-numeric entry restores the previous value.
- R-020 [KC:main; PMF:pm-adjust-main-video] The up and down arrows (and the ↑ / ↓ keys) change the value by 1, and the arrow is disabled at the limit it reaches.

## Reset, Undo and Redo
- R-021 [KC:main; KC:pip-adjust; PMF:pm-adjust-main-video] 「Reset」 restores all six sliders to their defaults at once, as one undo step.
- R-022 [KC:main; PMF:pm-adjust-main-video] 「Reset」 is disabled while all six values are at their defaults.
- R-023 [KC:main; PMF:pm-adjust-main-video] A slider drag previews live and records one undo step on release.
- R-024 [KC:main; KC:pip-adjust] One number entry (Enter or leaving the field) records one undo step; one Undo returns to the value before the entry.
- R-025 [KC:main; PMF:pm-adjust-main-video] Redo re-applies an undone Adjust step (Undo / Redo as in Photo Editor).

## Adjust scope and selection
- R-026 [KC:main; KC:pip-adjust; PMF:pm-adjust-main-video] Starting an adjustment (drag, number entry, Reset) during playback pauses it; the viewer previews at the playhead.
- R-027 [KC:main; KC:pip-adjust] Adjust applies only to the selected main-track clip or Photo PiP.
- R-028 [KC:main; KC:pip-adjust] After Split, both parts keep the same Adjust settings (main-track clip and Photo PiP).
- R-029 [KC:pip-adjust; PMF:pm-adjust-photo-pip] Copy and Paste of a Photo PiP copies its Adjust settings (Video Editor has no Duplicate).
- R-030 [KC:main; KC:pip-adjust; PMF:pm-adjust-main-video] With the panel open, clicking another clip or PiP that has Adjust keeps the panel open and shows that item's values.
- R-031 [KC:main; KC:pip-adjust] With the panel open, clicking an item without Adjust (text, sticker, audio, transition, video PiP) or empty space closes the panel; the settings stay.
- R-032 [KC:main; PMF:pm-adjust-main-video] Clicking ✕ or another left-nav tab closes the panel; the settings stay.
- R-033 [KC:main; PMF:pm-adjust-main-video] With BG Blur on, the blurred background gets the same Adjust.
- R-034 [KC:main; KC:pip-adjust] A main photo or Photo PiP with Cutout, or a Photo PiP with a Mask, is adjusted as a whole image; only the visible part shows.
- R-035 [KC:main] When the source file of a main video, main photo or Photo PiP is missing, 「Adjust」 is grey and cannot be clicked, like 「BG Blur」, 「Trim」, 「Corner」, 「Fade In」 / 「Fade Out」 and 「Audio」.

## Adjust thumbnails, export and project
- R-036 [KC:main; KC:pip-adjust; PMF:pm-adjust-main-video] No timeline badge marks an adjusted clip or PiP.
- R-037 [KC:main; KC:pip-adjust] The Project (My Projects), Timeline and Layer thumbnails show the Adjust of main videos, main photos and Photo PiPs.
- R-038 [KC:main] Project and Layer thumbnails show Cutout, Crop, Mask, Corner and rotation; no thumbnail shows Fade In / Fade Out.
- R-039 [KC:main] Timeline thumbnails of a main video or main photo show only Adjust: Cutout and Corner are not shown (original frame) and rotation is not shown (upright).
- R-040 [KC:main; Req: REQ-002] The Timeline Photo PiP thumbnail shows Adjust, Cutout, Crop, Mask and Corner (Corner also alone); Fade is not shown; rotation follows R-088 – R-090.
- R-041 [KC:main; KC:pip-adjust] The exported video applies the Adjust settings.
- R-042 [KC:main; KC:pip-adjust] Adjust settings are saved in the project and kept when it is reopened.

## Mask mode (PM-only)
- R-043 [KC:mask; PMF:pm-photo-mask] Clicking 「Mask」 enters Mask mode: the selected Photo PiP and the main-video frame are shown zoomed; the timeline, the editing toolbar, the Layer panel and Full screen are hidden; the Export (「Export & Share」) button is disabled; 「Done」 and 「Discard」 show.
- R-044 [KC:mask] When the playhead is outside the PiP's time range, clicking 「Mask」 does not move the playhead; the mode shows the selected photo over the main-video frame at the PiP's start (Q-2).
- R-045 [PMF:pm-photo-mask] When the playhead is inside the PiP's time range, it stays where it is.
- R-046 [KC:mask; PMF:pm-photo-mask] On first entry 「None」 is selected.
- R-047 [KC:mask] The shape list is 「None」 plus 52 shapes, the same fixed set as Photo Editor's Mask (not from CMS; new shapes come with a release).
- R-048 [KC:mask; PMF:pm-photo-mask] Choosing and applying a shape behaves as in Photo Editor: the shape applies to the photo at once, 「None」 shows the whole photo.
- R-049 [KC:mask] Re-entering a masked photo selects the applied shape and keeps the last shape and photo position.
- R-050 [KC:mask; PMF:pm-photo-mask] Hovering the Rotate icon shows the tooltip 「Rotate」.
- R-051 [KC:mask; PMF:pm-photo-mask] Rotating shows the current angle live.
- R-052 [KC:mask; PMF:pm-photo-mask] Zoom in and zoom out resize the view in Mask mode.
- R-053 [KC:mask; PMF:pm-photo-mask] 「Done」 applies the mask and leaves the mode.
- R-054 [KC:mask] 「Discard」 leaves the mode without applying this visit's changes (Q-12).
- R-055 [KC:mask; PMF:pm-photo-mask] After Done, the Layer and timeline thumbnails show the masked photo.
- R-062 [PMF:pm-photo-mask] (20261019 update) A Fade In / Fade Out on the selected PiP is not shown while in Mask mode; the main video's Fade In / Fade Out and transitions stay as they are (Q-6).
- R-063 [KC:mask] Undo right after Done reverts the whole Mask visit (shape, position, angle) in one step (Q-7).

## Mask with Corner and Cutout (PM-only)
- R-056 [KC:mask] Corner and Mask apply together (weekly meeting 2026-03-04): the rounding applies to the shape's bounding box, so a shape that fills its box (a rectangle) gets rounded corners and a circle or star shows no change.
- R-057 [KC:mask] Mask mode shows the Corner rounding live, released together with the live corner of Crop & Rotate mode.
- R-058 [KC:mask] Cutout first, then Mask: entering shows the whole cut-out photo, the shape is chosen on it, and Done updates only the shape (no new cutout, no Cutout processing screen).
- R-059 [KC:mask] Mask first, then Cutout: Cutout works on the whole original photo and the shape stays; the processing screen and wait are those of an unmasked photo.
- R-060 [KC:mask] Changing, moving or rotating the shape does not re-run Cutout or show its processing screen; the view shows only what both the shape and the cutout keep.
- R-061 [KC:mask; KC:crop] Turning Cutout off and on again reuses the cutout it made before.

## Crop & Rotate mode (PM-only)
- R-064 [KC:crop; PMF:pm-photo-crop-rotate; CR:S003-B001, S003-B002, S003-B003, S003-B012] Clicking 「Crop/Rotate」 enters Crop & Rotate mode: the selected Photo PiP and the main-video frame are zoomed; the timeline, the editing toolbar, the Layer panel and Full screen are hidden; Export is disabled; 「Done」 and 「Discard」 show.
- R-065 [KC:crop; PMF:pm-photo-crop-rotate; CR:S003-B005, S003-B013] When the playhead is outside the PiP's time range, clicking 「Crop/Rotate」 moves it to the PiP's start, and the mode shows the main-video frame of that moment.
- R-066 [KC:crop; PMF:pm-photo-crop-rotate; CR:S003-B006] When the playhead is inside the PiP's time range, it stays where it is.
- R-067 [KC:crop; PMF:pm-photo-crop-rotate; CR:S003-B004; Req: REQ-002] On first entry of an uncropped photo 「Custom」 is selected (the Figma mark on 「Original」 is a typo, PM 2026-11-11).
- R-068 [KC:crop; PMF:pm-photo-crop-rotate; CR:S004-B001, S004-B006] The left panel 「Crop & Rotate」 offers 「Aspect Ratio」 「Original」, 「Custom」, 「1:1」, 「4:5」, 「5:4」, 「16:9」, 「9:16」, 「21:9」, 「9:21」 and a 「Rotate」 slider.
- R-069 [KC:crop; PMF:pm-photo-crop-rotate; CR:S004-B002, S004-B003] Choosing a ratio and applying the crop behave as in Photo Editor: the crop box keeps the chosen ratio (Custom: free) and Done applies it.
- R-070 [KC:crop; CR:S007-B001, S007-B002] Re-entering a cropped photo keeps the last crop and selects its ratio (cropped 1:1 → 「1:1」).
- R-071 [KC:crop; CR:S004-B007] The 「Rotate」 slider rotates the selected PiP live.
- R-072 [KC:crop; PMF:pm-photo-crop-rotate; CR:S004-B004] Hovering the Rotate icon shows the tooltip 「Rotate」.
- R-073 [KC:crop; PMF:pm-photo-crop-rotate; CR:S004-B005] Rotating shows the angle live, as in Mask mode.
- R-074 [KC:crop; PMF:pm-photo-crop-rotate; CR:S005-B001, S005-B002] Zoom in and zoom out resize the view in Crop & Rotate mode.
- R-075 [KC:crop; PMF:pm-photo-crop-rotate; CR:S006-B001, S006-B002] 「Done」 confirms the crop and rotation, leaves the mode and the canvas shows the result.
- R-076 [KC:crop] 「Discard」 leaves the mode without applying this visit's changes (Q-12).
- R-077 [CR:S006-B014] Undo right after Done restores the crop and the angle of before the visit together.
- R-078 [KC:crop; PMF:pm-photo-crop-rotate; CR:S002-B001, S002-B002; Req: REQ-002] After Done, the Layer and timeline thumbnails show the crop and the rotation.
- R-085 [PMF:pm-photo-crop-rotate; CR:S003-B007, S003-B008] (20261019 update) A Fade In / Fade Out on the selected PiP is not shown while in Crop & Rotate mode; the photo shows fully (Q-6).
- R-086 [PMF:pm-photo-crop-rotate; CR:S003-B009, S003-B010, S003-B011] Entering and leaving Crop & Rotate leaves the main video's Fade In, Fade Out and transition settings and their look unchanged.

## Crop & Rotate with Cutout (PM-only)
- R-079 [KC:crop; CR:S004-B008, S006-B003] Cutout first, then Crop: entering shows the whole cut-out photo, also outside the last crop; Done updates only the crop (no new cutout, no Cutout processing screen).
- R-080 [KC:crop; CR:S004-B009, S006-B007, S006-B008, S006-B009] Cutout first: entering and leaving the mode fade the view out and in briefly; a loading icon shows only when the change is not done after 0.3 s.
- R-081 [KC:crop; CR:S006-B004, S006-B005, S006-B010] Crop first, then Cutout: the whole original photo is sent to Cutout and the crop is applied again on the result; the processing screen is that of an uncropped photo (the wait need not be equal: CR S006-B011, not testable).
- R-082 [KC:crop; CR:S006-B012] Widening the crop of a cut-out photo shows the newly included area already cut out.
- R-083 [CR:S006-B013] Rotating a cut-out photo in Crop & Rotate keeps the cutout.
- R-084 [KC:crop; CR:S006-B006] Turning Cutout off and on again restores the same cutout with the crop and angle kept (a short processing screen is allowed).

## Rotation and thumbnails across tools
- R-087 [KC:mask; KC:crop; Req: REQ-002] The canvas rotate handle, Mask's Rotate and Crop & Rotate's Rotate share one angle: rotating in any of them shows the same value in the others (MyEdit: the Crop & Rotate input read 170 after a handle drag to 170).
- R-088 [Req: REQ-002] After Crop & Rotate Done with a rotation, the Timeline PiP thumbnail and the Layer thumbnail show the rotated photo; a later canvas-handle rotation updates the Layer thumbnail but not the Timeline thumbnail, which keeps the last Crop & Rotate state (user ruling over the KC line 「旋轉: Timeline Photo PiP 不顯示，維持正向」).
- R-089 [KC:main; Req: REQ-002] A rotation made only with the canvas handle leaves the Timeline PiP thumbnail upright; the Layer thumbnail shows it.
- R-090 [KC:mask] After Mask Done with a rotation, the Timeline PiP thumbnail shows the masked photo at that angle, as after Crop & Rotate Done (Q-11).

## Export, project and plan
- R-091 [KC:mask; KC:crop] The exported video shows the Mask, the crop and the angle as the canvas does (Q-9).
- R-092 [KC:mask; KC:crop] The project keeps the Mask, the crop and the angle when it is reopened (Q-9).
- R-093 [KC:main; KC:pip-adjust; KC:mask; KC:crop] Adjust, Mask and Crop/Rotate carry no Premium mark and work for a signed-in account with or without Biz Pro (Q-10).
- R-094 [KC:mask] The Mask shape list is fixed in the app and not loaded from CMS — NOT TESTABLE: a server/release detail; R-047 checks the list itself.

## Open questions
- Q-1 Photo PiP toolbar order. The PM spec (KC 2026-11-25, Figma 2026-11-06) puts 「Split」 first: Split, Corner, Cutout, Crop/Rotate, Mask, Adjust, Fade In, Fade Out, Order, Delete. The MyEdit Biz Design (ds-adjust-photo-pip, undated) draws Biz's current order with Adjust added: Corner, Cutout, Split, Adjust, Fade In, Fade Out, Order, Delete, and no Crop/Rotate or Mask. Which order should Biz ship, and where does Split go? Assumption: the four tools are checked in the order both allow (Cutout → Crop/Rotate → Mask → Adjust → Fade In); Split's and Corner's places are recorded, not judged. R-003, TC-003.
- Q-2 Mask entry with the playhead outside the PiP. The PM Figma 20261019 update says the playhead moves to the PiP's start (as for Crop & Rotate); the KC Mask spec (2026-11-25) says it does not move and only the background shows the PiP's start. Assumption: the newer KC text (playhead stays). R-044, TC-060.
- Q-3 Slider track drawing. PM: fill from 0 in the centre, Temperature orange → white → blue, Tint green → magenta. Biz Design: fill from the left end, Temperature yellow → blue, Tint magenta → green. Assumption: the Design (dates cannot tell; check on device and decide with the user before filing). R-015, TC-015.
- Q-4 How much delay is allowed between a slider drag and the viewer preview? The spec says only 「即時預覽」. Assumption: no visible lag; the viewer keeps up with the knob. R-016, TC-016.
- Q-5 Number box behaviour on this build. The KC specs expect apply on Enter or leaving the field (MyEdit, a separate UX item) and keep Photo Editor's live preview while typing until that item ships. Which does the December build carry? Assumption: either passes; the row records which, and one entry is one undo step in both. R-017, R-024, TC-017, TC-031.
- Q-6 PiP fade during Mask and Crop & Rotate. The PM Figma 20261019 update says the PiP's Fade In / Fade Out is 「自動移除」 on entering the mode (main-video fades and transitions untouched); the KC specs say nothing. Assumption (the Contract Runner reading, user-reviewed for MyEdit): the fade is only not shown while in the mode, and the PiP's Fade In / Fade Out settings stay and play after Done or Discard. R-062, R-085, TC-074, TC-091, TC-092.
- Q-7 Undo after Mask Done. The KC spec says Mask works as in Photo Editor and gives no undo rule. Assumption: one Undo reverts the whole Mask visit, as Crop & Rotate does (CR S006-B014). R-063, TC-073.
- Q-8 Mask and Crop & Rotate on the same photo. Photo Editor's code-derived rules say a Mask shape and a crop ratio replace each other (with a shape applied, Crop shows Custom); the Video Editor specs say nothing. What should a masked Photo PiP show in Crop & Rotate, and a cropped one in Mask? Assumption: none; no row asserts it, a run records what happens. R-048, R-069 (no row).
- Q-9 Export and reopened project for Mask and Crop & Rotate. The KC states export and project saving for Adjust only. Assumption: the export and the reopened project show the same Mask, crop and angle as the canvas. R-091, R-092, TC-114, TC-115.
- Q-10 Plan gate. The KC specs name no plan for Adjust, Mask or Crop/Rotate (Cutout is Biz Pro only, code-derived). Assumption: every signed-in plan may use the three tools with no Premium mark. R-093, TC-116, TC-117.
- Q-11 Timeline thumbnail after a Mask rotation. The KC thumbnail table keeps Photo PiP rotation upright on the timeline, the Mask spec says the timeline thumbnail shows the applied result, and REQ-002 rules only on Crop & Rotate. Assumption: Mask Done refreshes the Timeline thumbnail with the angle, as Crop & Rotate Done does. R-090, TC-113.
- Q-12 What does 「Discard」 do? Both specs only say 「另有 Discard」. Assumption: it leaves the mode and drops this visit's changes, so the photo is as before entering and no undo step is added. R-054, R-076, TC-072, TC-089.
- Q-13 MyEdit Biz Design for Mask and Crop & Rotate is not drawn yet (UJ, due 2026-11-27); their rows are PM-only, quote PM Figma / KC strings and are checked again when the Design arrives. R-043 – R-063, R-064 – R-086.

## Knowledge Center rules (standing input 7, checkpoint 2026-11-27)
Source log: `knowledge-center.md` and `mcp-checkpoints.md` in this draft. Authority: the four feature specs are PM-approved
(ready_for_rd); the three `product-rules/derived-*` documents are written from the code by the schedule (「未經人確認」) and
are context only: they told the passes what to vary (Photo Editor parity rows TC-062, TC-103; the Rotate slider ends in
TC-084; the Cutout Premium mark in TC-116; Q-8), never an expected result. The weekly meeting 2026-03-04 (Corner + Mask
together) is a decision cited by the Mask spec (R-056).

## Contract Runner input (REQ-003)
`qadm-myedit-web-spec-contract-runner-agent` › `test-specs/features/myedit-video-editor-Photo-as-PiP/testable-contracts.yaml`
(MyEdit, 52 contracts) and the generated TC-ME-PIP-* cases, read only on 2026-11-27. In scope: the 42 Crop & Rotate
contracts, each cited on its requirement ([CR:…]) and in its row's Notes. S001-B001 (MyEdit's toolbar without Mask and
Adjust) is replaced by the Biz order of R-003 (TC-003). S002-B002 (timeline thumbnail shows crop and rotation) agrees
with REQ-002 for the Crop & Rotate rotation (R-078, R-088). S006-B011 is the Runner's own not-testable item (R-081).
Out of scope: CORNER-B001 – B010 (corner rounding with crop, a separate feature; update-plan.md › Not added).

## Added 2026-11-27 — coverage passes and standing inputs

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 | this draft: every requirement above |
| REQ-002 | R-040, R-067, R-078, R-087, R-088, R-089 |
| REQ-003 | R-064 – R-086 (the [CR:…] tags), R-003 (S001-B001) |
| REQ-004 | no MUI section (deferred until RD finishes the strings) |
| REQ-005 | run entry: web/fixtures.md (no requirement) |

### Domain rules
- None apply: `knowledge.md` lists 0 entries for myedit-biz (no CyberLink or MyEdit Biz knowledge entries yet; the MyEdit KP- entries are another product's, and the Contract Runner's MyEdit Biz domain part is kept in `library/myedit/knowledge/sources/` for later).

### Job states

| Job | Start / processing | Done | Failure | Leave and return |
|---|---|---|---|---|
| Cutout on a masked photo | TC-079 | TC-079 | n/a (spec silent on Cutout failure; Cutout's own feature) | n/a (spec silent) |
| Cutout on a cropped photo | TC-108 | TC-108 | n/a (spec silent on Cutout failure; Cutout's own feature) | n/a (spec silent) |
| Cutout off and on | TC-109 | TC-109, TC-080 | n/a (no processing expected) | n/a (spec silent) |
| Export with Adjust, Mask, Crop | TC-056, TC-114 | TC-056, TC-057, TC-114 | n/a (export failure is the export feature's) | TC-058, TC-115 (project reopened) |

### Error classes

| Job | Error copy and refund |
|---|---|
| Adjust, Mask, Crop & Rotate | n/a (local edits: the specs name no error, no credit and no server job) |
| Cutout inside these flows | n/a (Cutout errors belong to the Cutout feature; the specs name none here) |

### Exit × stage

| Stage | Done | Discard | Undo after leaving |
|---|---|---|---|
| Mask mode, first entry | TC-071 | TC-060, TC-061 | TC-073 |
| Mask mode, already masked | TC-068 | TC-072 | TC-073 |
| Crop & Rotate mode, first entry | TC-087 | n/a (Discard on an uncropped photo: TC-089 covers the rule on a cropped one) | TC-090 |
| Crop & Rotate mode, already cropped | TC-094 – TC-102 | TC-089 | TC-090 |
| Adjust panel | n/a (no Done: ✕ or another tab closes it, TC-043) | n/a (no Discard: Reset and Undo, TC-029) | TC-029, TC-030, TC-031 |

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-081 | The whole original photo is sent to Cutout, not only the crop | Widening the crop after Cutout: the feet that were outside the crop appear already cut out | TC-108 |
| R-059 | Cutout of a masked photo works on the whole original photo | Choosing None after Cutout: the part outside the old shape is cut out too | TC-079 |
| R-061 | Cutout off and on reuses the earlier result | No processing screen (or a short one) and the same outline after turning it on | TC-080, TC-109 |
| R-034 | The whole image is adjusted, not only the visible part | Turning Cutout off (or Mask None) after adjusting: the hidden part has the same look | TC-045, TC-046, TC-047 |

### Variants

| Requirement | Variant | Rows |
|---|---|---|
| R-006 | main video | TC-005 |
| R-006 | Photo PiP | TC-006 |
| R-016 | Saturation, Hue, Temperature, Tint, Brightness, Contrast | TC-009 – TC-014 |
| R-018 | each slider at both ends | TC-019 – TC-024 |
| R-026 | drag / number entry / Reset (main video) | TC-033, TC-034, TC-035 |
| R-026 | Photo PiP | TC-036 |
| R-028 | main video | TC-038 |
| R-028 | Photo PiP | TC-039 |
| R-034 | main photo with Cutout | TC-045 |
| R-034 | Photo PiP with Cutout | TC-046 |
| R-034 | Photo PiP with Mask | TC-047 |
| R-035 | main video, main photo, Photo PiP | TC-048 |
| R-037 | main video | TC-049, TC-052 |
| R-037 | main photo | TC-050 |
| R-037 | Photo PiP | TC-051 |
| R-041 | main video and Photo PiP | TC-056 |
| R-041 | main photo | TC-057 |
| R-048 | shapes 1–13 | TC-063 |
| R-048 | shapes 14–26 | TC-064 |
| R-048 | shapes 27–39 | TC-065 |
| R-048 | shapes 40–52 | TC-066 |
| R-048 | None | TC-068 |
| R-069 | ratio=Original | TC-094 |
| R-069 | ratio=Custom | TC-095 |
| R-069 | ratio=1:1 | TC-096 |
| R-069 | ratio=4:5 | TC-097 |
| R-069 | ratio=5:4 | TC-098 |
| R-069 | ratio=16:9 | TC-099 |
| R-069 | ratio=9:16 | TC-100 |
| R-069 | ratio=21:9 | TC-101 |
| R-069 | ratio=9:21 | TC-102 |
| R-093 | account without Biz Pro | TC-116 |
| R-093 | Biz Pro account | TC-117 |

### Controls (pass 11)
`inventory.json` lists the web boards' controls only partly (the extractor finds phone-sized frames; it took the two
「Reset」 buttons). Every control the boards draw is traced by hand here:
- Main-video toolbar (Split … Delete), 「Adjust」: TC-001, TC-005; Photo PiP toolbar, 「Crop/Rotate」, 「Mask」, 「Adjust」: TC-003, TC-006, TC-059, TC-081.
- Adjust panel ✕: TC-043; six sliders: TC-009 – TC-014; six number boxes: TC-019 – TC-024 (dismissed by Enter or leaving the field: TC-018); 「Reset」 enabled and disabled: TC-028, TC-029.
- Mask mode: shape list (None + 52): TC-062 – TC-068; Rotate icon and handle: TC-069; zoom bar: TC-070; 「Done」: TC-071; 「Discard」: TC-072; Export disabled: TC-059.
- Crop & Rotate mode: nine ratio chips: TC-094 – TC-102; 「Rotate」 slider: TC-084; Rotate icon and handle: TC-085; zoom bar: TC-086; 「Done」: TC-087; 「Discard」: TC-089; Export disabled: TC-081.
- Not this feature's: top navigation, left-nav tabs other than the one TC-043 presses, viewer play controls, Layer panel buttons, Get Credits: n/a (other features).

### Build checks
- None yet: the TR261124-0031 RD Note has no build for these items; read it when the build is posted (standing input 3).
