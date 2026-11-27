# Update plan — myedit-biz/video-editor-pip-adjust / web: new table → draft 20261127-131702

## Spec files
- New (Figma-only set `specs/2026-11-27`): KC video-editor-main-video-adjust.md, KC video-editor-photo-pip-adjust.md,
  KC video-editor-photo-pip-mask.md, KC video-editor-photo-pip-crop-rotate.md (MyEdit Biz Knowledge Center, all
  ready_for_rd), Figma PM and Design text 2026-11-27.md (PM boards 7270:16640, 7273:35737, 6556:11894, 6564:25919;
  Biz Design boards 667:47666, 671:28111).
- Spec status: all four specs are `ready_for_rd` (none to flag). Biz Design: Adjust ready; Mask and Crop & Rotate pending (UJ, due 2026-11-27).

## Case changes
- New (117): TC-001 – TC-117, every row `new` (sections: Toolbars and entry 6, Adjust panel and sliders 10, Adjust
  number input 11, Reset, Undo and Redo 5, Adjust scope and selection 16, Adjust thumbnails, export and project 10,
  Mask mode 17, Mask with Corner and Cutout 5, Crop & Rotate mode 13, Crop & Rotate ratios 10, Crop & Rotate with
  Cutout 6, Rotation and thumbnails across tools 4, Export, project and plan 4).

## Found by the analysis
- Annotation trace: 56 blocks traced (21 PM note blocks to requirements; Design toolbars and panel to R-001, R-003, R-006, R-008, R-022; the rest `ui:` / `label:`).
- PM Figma vs KC text: the Mask board's 20261019 playhead move lost to the newer KC text (R-044, Q-2); the Adjust board's rule 3 (number box applies on Enter) is qualified by the KC interim live preview (R-017, Q-5).
- Biz Design vs PM: Photo PiP toolbar order (R-003, Q-1); slider track styles (R-015, Q-3).
- REQ-002 ruling: Timeline PiP thumbnail and rotation (R-088, R-089, TC-111, TC-112), shared angle (R-087, TC-110).
- Pass 9 hidden clauses: whole-photo Cutout input (R-081, R-059), Cutout reuse (R-061), whole-image Adjust (R-034).
- Pass 10 variants: main video / main photo / Photo PiP for each Adjust rule the specs state per target; nine crop ratios (TC-094 – TC-102); the 52 shapes walked in four rows (TC-063 – TC-066); plan with and without Biz Pro (TC-116, TC-117).
- Pass 4 numbers: each slider at both ends by drag (TC-009 – TC-014) and by typing past the range (TC-019 – TC-024); ±1 arrows at the limits (TC-026, TC-027).
- Contract Runner (REQ-003): 42 in-scope Crop & Rotate contracts mapped to R-064 – R-086 and their rows; scenarios taken from TC-ME-PIP-*: playhead before the PiP with a time-coded main video, Photo Editor parity, crop-then-cutout with a second uncut copy, widening the crop after Cutout, fade on PiP and on the main video.

## Not added (value check)
- Contracts ME-PIP-20261124-CORNER-B001 – B010 (corner rounding with a crop, live corner while dragging the crop box, Discard of a cornered crop): out of scope — the corner-rounding feature, not one of the four items (REQ-003). Mask + Corner from the Mask spec stays (R-056, R-057).
- Contract ME-PIP-20261104-S006-B011 (Cutout wait after a crop): not testable, the Runner's own decision; R-081 notes it.
- One row per Mask shape (53): merged into four rows that apply every shape in turn and check the canvas and the Layer thumbnail (TC-063 – TC-066) plus None (TC-068) — reviewer may ask for one row per shape.
- Mask × Crop & Rotate on the same photo: no row (spec silent; Photo Editor's replace rule is code-derived only), Q-8.
- Shape list from CMS or not (R-094): not testable in the app.
- Crop & Rotate Rotate slider range and step (-180 to 180, 1°): code-derived Photo Editor value; TC-084 records the ends only.
- Keyboard shortcuts inside the modes, Photo Editor's 「Apply」 wording: code-derived Photo Editor detail, not stated for Video Editor.
- Cutout failures and credits inside these flows: Cutout's own feature; the specs name none here.
- Missing-file Adjust (TC-048): kept; parked as Blocked `--as test-data` if the site gives no way to make a source missing.
- Corner live in Mask mode (TC-077): kept; Not run when the build has no live corner in Crop & Rotate either (released together, KC).
- MUI: no section (REQ-004, deferred until RD finishes the strings).

## PM-only rows
- TC-059 – TC-080 (Mask) and TC-081 – TC-109 (Crop & Rotate), TC-113: no MyEdit Biz Design frame yet (Design UJ, due 2026-11-27). Re-check every one when the Biz Design draws Mask and Crop & Rotate (Q-13).

## Questions for PM
- Q-1 Photo PiP toolbar order (Split's place). Q-2 Mask playhead (KC vs Figma 20261019). Q-3 slider tracks (PM vs Design).
- Q-4 allowed preview delay. Q-5 number box behaviour on the December build. Q-6 PiP fade in the modes.
- Q-7 Undo after Mask Done. Q-8 Mask and crop on the same photo. Q-9 export and reopen for Mask / crop.
- Q-10 plan gate. Q-11 Timeline thumbnail after a Mask rotation. Q-12 Discard. Q-13 Biz Design for Mask / Crop & Rotate.

## Questions for you
- Which test account is Biz Pro on business-demo (Cutout rows need one)? `web-account.ts check` shows MyEdit plans; the Biz plan of each shared account is not known yet (web/fixtures.md).
