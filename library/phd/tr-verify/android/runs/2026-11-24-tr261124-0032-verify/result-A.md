# TR261124-0032 verify — segment A (Swipe Collage canvas, Free) — PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-24 17:11:57 (checked with `build`).
- Server: Test Server. Account/tier at start (17:34) and end (17:51): Mine 「Upgrade to Premium!」 = Free, My Credits 0
  (`01_mine_start.png`, `90_mine_end.png`). Nothing bought, no sign-in, no tier change.
- Path: Launcher → swipe tool grid left → Collage → 「Try Swipe Collage!」 → Template Page (tabs Year-end Recap,
  Minimalist Aesthetic, Travel Memories, Christmas, Trending Styles) → card → Use Template.
- Template names differ from filing: no 「2 photos」 or 「7 photos · 3 pages」 card exists in Year-end Recap any more, so
  the nearest cards were used: Minimalist Aesthetic 「2 photos · 1 page」, 「4 photos · 1 page」, 「7 photos · 3 pages」;
  Year-end Recap 「3 photos · 1 page」, crowned 「10 photos · 1 page」, 「20 photos · 6 pages」. No template on this build
  has more than 20 frames (largest card 20 photos).
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, no eBug or ECL touched.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0103 | NOT_FIXED | Crowned card now opens the Template Preview, Use Template opens the Canvas, IAP appears only at export ✓ (all fixed); but the preview shows **no PRO icon** (page source has only title, image, 「10 photos · 1 page」, category, Use Template). |
| PHA262026P0072 | FIXED | 「2 photos · 1 page」 opens with 2 empty 「+」 frames (picker 「Select 1 to 2」); 「4 photos · 1 page」 with 4. |
| PHA262026P0160 | NOT_FIXED | One tap on a frame 「+」 selects a layer (10-photo: the locked full-page layer with 「Unlock」, or the empty frame; 3-photo: the photo-strip frame); the picker opens only on the second tap. |
| PHA262026P0073 | FIXED | Picked photos get an orange border and a number badge 1, 2, … in the grid. |
| PHA262026P0074 | NOT_FIXED | 7-photo · 3-page: all 7 picked at once, an 8th tap ignored (fixed); 20-frame template limit 20; but with 22 empty frames (20-photo template + 2 Duplicates) the picker says 「Select 1 to 22」 and 22 can be picked — no cap at 20. |
| PHA262026P0079 | FIXED | Frame bar: Replace, Duplicate, Opacity, Shadow, Horizontal Flip, Vertical Flip, Forward, Backward, Lock, Delete; floating pill delete / duplicate / lock. |
| PHA262026P0080 | FIXED | Tap 1 frame focus, tap 2 image focus (Adjustments, Filter, Removal), tap 3 back to frame focus (frame bar), selection kept. |
| PHA262026P0082 | NOT_FIXED | Long-press drag swaps the photos, but only the toast 「Image Selected」 shows; no 「Long press & drag to swap」 text in any frame of two recorded drags. |
| PHA262026P0083 | NOT_FIXED | Add Layer › Frame and the frame's Replace sheet: thumbnails carry only crown / download marks, no 「1 photo」 / 「3 photos」 (also none on the multi-cell strip frames). |
| PHA262026P0162 | FIXED | After Exposure 4.0 ✓, Removal (Continue → Try First) opens the room on the brightened photo, as on the Canvas. |
| PHA262026P0076 | FIXED | Background swatch, sheet ✕, ‹ → Discard returns to the Template Preview of the same template (10-photo, and again 7-photo · 3-page). |
| PHA262026P0077 | FIXED | With 「Discard changes?」 open, system Back closes the dialog and keeps the edits (Canvas still edited), as Keep. |

## Per bug

### P0103 (crowned PRO card on Free)
1. Year-end Recap tab: crowned 「10 photos · 1 page」 card (`02_template_page.png`) → tap.
2. Template Preview opened, no IAP (`10_p0103_crowned_card_tap.png`). `els`: top_back_btn, title 「Template」, preview
   image, 「10 photos · 1 page」, 「Year-end Recap」, Use Template — no PRO / crown element; the screenshot shows none.
   Spec R-026 (D3-02): the preview of a CMS-PRO template shows a 「PRO」 icon at the top right.
3. Use Template → Canvas with 10 empty frames (`11_p0103_canvas.png`).
4. After filling 3 frames, export ✓ → IAP page 「PhotoDirector Premium」 (`18_p0103_export_tap.png`); closed with Back,
   back on the Canvas (`19_p0103_after_iap_close.png`). Nothing bought.
Verdict NOT_FIXED only because of the missing PRO icon; the filed symptom (IAP at card tap) is gone.

### P0072 (empty frame count)
- Minimalist Aesthetic 「2 photos · 1 page」 (`50_p0072_cards.png`) → Use Template: 2 「+」 (stacked at the centre: the
  full-page photo and the paper frame) (`51_p0072_two_photo_canvas.png`); picker 「Select 1 to 2 photos」 (`53_p0072_picker.png`).
- 「4 photos · 1 page」 → 4 「+」 (3 film cells + the full-page photo) (`54_p0072_four_photo_canvas.png`).
- Also 10-photo → 10 「+」 (`11_p0103_canvas.png`), 7 · 3 pages → limit 7, 20 · 6 pages → limit 20.

### P0160 (one tap on 「+」 opens the picker)
- 10-photo: one tap on an outer 「+」 selects the locked page layer (bar greyed, 「Unlock」) (`12_p0160_10photo_one_tap.png`);
  from a clean state one tap on a polaroid 「+」 selects the frame (frame bar, handles) (`14_p0160_10photo_clean_tap.png`);
  the second tap opens the picker (`15_p0160_10photo_second_tap.png`).
- 3-photo Year-end Recap: one tap on the middle 「+」 selects the whole photo-strip frame (selection box wider than the
  canvas) (`61_p0160_3photo_one_tap.png`).
- Same on 2-photo (`52_p0072_tap_plus.png`), 7-photo (`71_p0074_tap1.png`) and 20-photo (`81_p0160_20photo_tap1.png`).

### P0073 (picked photos marked)
- 10-photo picker, 2 photos tapped: both bordered orange with badges 1 and 2, tray (2/10) (`16_p0073_two_picked.png`);
  7 picks numbered 1–7 (`73_p0074_seven_picked.png`).

### P0074 (picker limit)
- 7 photos · 3 pages (Minimalist Aesthetic): first 「+」 (second tap) → 「Select 1 to 7 photos」 (`72_p0074_picker.png`),
  7 picked (7/7) (`73_p0074_seven_picked.png`), 8th tap ignored (`74_p0074_eighth_tap.png`), Next fills page 1 and 2
  (`75_p0074_after_next.png`).
- 20 photos · 6 pages: 「Select 1 to 20」 (`82_p0074_20photo_picker.png`).
- >20: no template has more than 20 frames, so on the 20-photo canvas an empty frame was duplicated twice (22 empty
  frames, `83_p0074_duplicated.png`): picker 「Select 1 to 22 photos」 (`84_p0074_22frames_picker.png`), 22 picked,
  toast 「You can only select 22 photos.」 (`86_p0074_over20.png`). Expect: capped at 20.

### P0079 (frame focus tool bar)
- 10-photo canvas, filled polaroid frame, one tap (`21_p0079_polaroid_tap1.png`): Replace, Duplicate, Opacity, Shadow,
  Horizontal Flip, Vertical Flip; swiped to the end: Forward, Backward, Lock, Delete (`22_p0079_bar_end.png`).
  Floating pill: delete, duplicate, lock (content-desc 「Lock」).

### P0080 (third tap)
- Same frame: tap 2 → image focus bar (Replace, H/V Flip, Adjustments, Filter, Removal) (`23_p0080_tap2.png`); tap 3 →
  frame bar again, frame still selected (`24_p0080_tap3.png`). The 「Frame selected」 toast was not caught (timing);
  the bar and handles show frame focus.

### P0082 (swap hint while dragging)
- 10-photo: long-press (1.2 s) the polaroid photo, drag onto the top-right big photo; screenshot during the drag
  (`25_p0082_mid_drag.png`), after drop the photos swapped (`26_p0082_after_drop.png`). Recording
  `recordings/p0082-drag.mp4`, frames at 4 fps (`recordings/p0082-sheet.png`, `p0082-pair.png`): only 「Image
  Selected」 toast at the long-press, no swap text.
- 7 · 3 pages: page-1 photo dragged onto page 2 (`76_p0082_mid_drag_7photo.png`, `77_p0082_after_drop_7photo.png`,
  `recordings/p0082-drag2.mp4`, `p0082-drag2-sheet.png`): swapped, no hint text in any frame.

### P0083 (Frame thumbnails state photo count)
- Add Layer 「+」 › Frame: camera frames, torn-paper frames, multi-cell strips; no count text on any thumbnail, page
  source has no 「photo」 text (`28_p0083_frame_sheet.png`, scrolled `29_p0083_frame_sheet_scrolled.png`).
- Frame focus › Replace opens the same sheet, no counts (`30_p0083_replace_frame_sheet.png`).

### P0162 (Removal shows the adjusted photo)
- Polaroid photo, image focus › Adjustments › Exposure dragged to 4.0 (`32_p0162_exposure4.png`) › ✓ → Canvas photo
  nearly white (`33_p0162_canvas_after_apply.png`) › Removal (crowned) → 「Remove with faster selection tool」 Continue →
  「Smart Wire Removal」 Try First → room shows the same over-exposed photo (`36_p0162_removal_room.png`). ✕ out,
  nothing generated (`37_after_removal_close.png`).

### P0076 / P0077 (exit)
- 10-photo canvas: Background › Solid swatch (`39_p0076_swatch.png`) › sheet ✕ › ‹ → 「Discard changes?」
  (`40_p0076_discard_dialog.png`).
- P0077: system Back → dialog gone, Canvas with edits kept (`41_p0077_after_back.png`).
- P0076: ‹ → Discard → Template Preview 「10 photos · 1 page」 (`42_p0076_after_discard.png`); repeated on 7 · 3 pages:
  Discard → Preview 「7 photos · 3 pages」 (`78_p0076_discard_7photo.png`).

## Other observations

- P0103 side: the preview of a crowned template has no PRO mark at all (see verdict), so a Free user cannot tell it is
  PRO until export.
- 「Tap to expand albums」 tooltip in the picker covers the top of the first grid row (`16_p0073_two_picked.png`).
- On the 10-photo Year-end Recap template the two big top frames sit under a locked full-page layer: tapping them selects
  the locked layer (「Unlock」 bar), not the photo (`20_p0079_tap1_filled.png`).
- After a drag, the selection box of the dropped photo runs past the canvas's right edge (`26_p0082_after_drop.png`).
- The frame's move handle / rotate handle sit over a neighbouring frame's 「+」 (`22_p0079_bar_end.png`); after
  Adjustments ✓ the floating pill covers the next polaroid's 「+」 (`33_p0162_canvas_after_apply.png`).
- Template content drawn outside the page: the 4-photo film strip starts above the canvas top edge
  (`54_p0072_four_photo_canvas.png`); the 3-photo template's script text runs below the page edge
  (`60_p0160_3photo_canvas.png`).
- 20-photo template: one frame's 「+」 is half hidden under the 「2026 Recap」 text (`80_p0074_20photo_canvas.png`).
- 2-photo template: its two 「+」 are stacked about 40 px apart at the centre, hard to tell apart (`51_p0072_two_photo_canvas.png`).
- Leaving Swipe Collage with ‹ from the Template Page lands in the old Collage picker with 6 photos pre-numbered
  (`88_where.png`); Back from there reaches the Launcher.

## Logs

`logs/segA-20261124-175054/` (git-ignored): live capture 5117 lines, no FATAL / AndroidRuntime crash, 1 benign failure
line (`DevStepDao getDevStepId`), no swap-hint or draft-save lines.

## End state

App on the Launcher (Home), Free (「Upgrade to Premium!」), 0 credits, Test Server. Every Swipe Collage edit was left with
‹ → Discard (or exited with no change); the only export attempt stopped at the IAP page (closed). No draft saved,
nothing bought. Logcat capture stopped.

**Ruling 2026-11-25 (user):** P0074 is OK — RD's resolve sets the limit to the total empty frames left on all pages, with no 20 cap, so 「Select 1 to 22」 with 22 empty frames is expected.

**Ruling 2026-11-25 (user):** P0082, P0083, P0160 are OK per RD's resolve notes (rd-resolve.json); the observations above stay as recorded.

**Ruling 2026-11-25 (user):** P0103 is OK per RD's resolve note; the missing PRO icon on the preview is kept as an observation.
