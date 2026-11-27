# Segment A — Swipe Collage on Free (TR261123-0071, PHD-A 20.19.0.v202611232103 R8)

- Device: Google Pixel 8a (42201JEKB02229), Android 16; versionName 20.19.0, versionCode 90201902, installed 2026-11-24 11:05.
- Account: Not signed in (Free) — Mine shows 「Upgrade to Premium!」, 68 credits (a_mine_tier.png); same at the end (a_end_mine.png). Tier never changed.
- Time: 11:22 start, 11:44 logs pulled (about 22 min). Logs: `logs/A-20261124-114401/` (no FATAL EXCEPTION / ClassCastException).
- Entry: the Launcher has a 「Swipe Collage」 tile (page 1) and 「Collage」 on tool-grid page 2, whose banner now reads 「Try Swipe Collage!」.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| P0071 | FIXED | Cards show first page + page dots and swipe; preview shows pages, 6 dots, swipes |
| P0104 | HOLD | PRO crown on textures and frames (Free); no NEW tag anywhere; CMS new-tag data not visible |
| P0105 | FIXED | Free: IAP 「PhotoDirector Premium」 at the 3rd and 6th export |
| P0106 | NOT_FIXED | Foreground force stop: no dialog anywhere, edit lost; works only after Home first (dialog on Swipe Collage entry) |
| P0147 | FIXED | No crash on reopen (4 opens); with a saved draft, Continue restores the photo canvas |

## Steps and evidence

1. **P0071** (11:24) Swipe Collage tile, waited 10 s: all cards drawn (a_p0071_cards). Swiped the 「20 photos · 6 pages」 card:
   page 2 (a_p0071_card_swiped; dots zoom a_p0071_dots_zoom / _zoom0: the current dot is white and vanishes on the white
   template). Tapped it: spinner ~10 s, then Template Preview page 1 with 6 dots (a_p0071_preview); swipe → page 2
   (a_p0071_preview_swiped).
2. **P0104** (11:25) 「3 photos · 1 page」 › Use Template › Background › Texture: crowns from the 5th tile on
   (a_p0104_texture_start, _s1–_s6, _end); no NEW. Add Layer › Frame: crowns on PRO frames, scrolled to the end, no NEW
   (a_p0104_frames_start, _end). Logcat only shows CMS eTag saves (SwipeCollageBackgroundTextureETag,
   SwipeCollagePhotoFrameETag), no tag content. Premium not checked (crowns already show on Free).
3. **P0105** (11:27) No download icon on this build's canvas; export = ✓. Exports 1–2 → 「Save & Share」
   (a_p0105_export1/2), 3 → IAP (a_p0105_export3), ✕ → Save & Share (a_p0105_after_iap_close), 4–5 → Save & Share,
   6 → IAP (a_p0105_export6). Closed, nothing bought. No PRO content was applied.
4. **P0106** (11:29–11:37)
   - Run 1: blue background, sheet closed, force stop from the canvas → launch, Swipe Collage, Collage, banner: no dialog
     (a_p0106_edited_before_kill, _launch, _template_page, _collage_room, _banner_template_page).
   - Run 2: blue background, Home, force stop → no dialog at launch; Swipe Collage tile → dialog
     (a_p0106_v2_template_page), Back dismissed it and it came back on re-entry; Continue → blue canvas restored
     (a_p0106_v2_restored). ✕ on the restored canvas left without 「Discard changes?」 (a_p0106_x_tapped).
   - Run 3 (bug's exact steps): blue, ✕ → 「Discard changes?」 (a_p0106_v3_after_x), force stop → no dialog at launch,
     Collage or banner page (a_p0106_v3_launch, _collage, _template_page).
   - Edit Room comparison: sample photo, Crop › Flip Horizontally › ✓, force stop from the foreground → dialog at launch
     (a_er_edited, a_er_relaunch); Cancel tapped.
5. **P0147** (11:38–11:43) 「4 photos · 3 pages」 › Use Template › page-1 frame 「+」 (first tap selected the frame,
   second opened the picker) › 1 sample photo › Next (lands in image focus) › Removal › Continue › Try First
   (a_p0147_object_removal) › ✕ › force stop › launch › Collage › 「Try Swipe Collage!」: opens normally
   (a_p0147_open1_shot), Back + banner twice more and once more from the Launcher tile after a relaunch: no crash.
   Variant with Home before the force stop: dialog (a_p0147_v2_dialog), Continue → canvas with the photo
   (a_p0147_v2_restored). Left it with ✕ (no prompt).

## Other observations
- Card page dots: the current page's dot is white with no outline, invisible on light templates (P0071 side effect).
- Preview from a card swiped to page 2 opens at page 1; preview load ~10 s.
- Restored canvas: undo greyed, ✕ leaves without 「Discard changes?」.
- The frame tool bar now lists 「Shadow」 (Lock, Replace, Duplicate, Opacity, Shadow, Horizontal Flip, Vertical Flip,
  Forward…), seen in passing (a_p0147_picker.txt) — relevant to P0079, not verified here.
- End state: Free (unchanged), no photos pushed. A Swipe Collage draft may remain after leaving the restored
  canvas with ✕ (it gave no prompt).
