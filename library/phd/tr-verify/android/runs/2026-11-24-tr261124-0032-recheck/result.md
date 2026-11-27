# TR261124-0032 recheck — Swipe Collage P0164–P0167 on PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340, density 450 (physical 480;
  1 dp = 2.8125 px). The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, installed 2026-11-24 17:11:57. Installed base.apk MD5
  E8BB420B0E870619F4D7D6A67E04C455 = `Cyberlink.MD5` APK entry in build NAS
  `CL_Deluxe.20.19.0.v202611241407_PHA261029-01_R9` (match).
- Server: Test Server. Tier: Free (Mine 「Upgrade to Premium!」), credits 0, as found; not changed.
- Path each time: Launcher → swipe tool grid left → Collage → 「Try Swipe Collage!」 → Year-end Recap 「4 photos · 3
  pages」 → Use Template (Repro steps of the filed bugs). Every edit was left with ✕ → Discard; nothing saved.
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, no eBug touched.

| Bug | Verdict | Evidence |
| --- | --- | --- |
| PHA262026P0164 (ISS-SWC-52) | Still reproduces | Pages → + shows 「Page 4 / 4」 with the new page 4 outlined; after ✓ the Canvas shows page 3 (「Goodbye 2026」), page 4 only starting at the right edge — same as R8. `11_scc52_pages_plus.png`, `12_scc52_after_apply.png` |
| PHA262026P0165 (ISS-SWC-53) | Still reproduces | Drag page 1's move button to the strip end: the moved player frame hangs past the strip's right edge, drawn translucent (`21_scc53_reorder.png`). From the original order, − twice to 1 page: the second player frame hangs past the page, translucent, under/over the strip's 「+」 (`26_scc53_one_page_orig_order.png`), as in R8. (After reorder then − to 1 page the snowflake sticker hangs past the edge instead: `23_scc53_one_page.png`.) |
| PHA262026P0166 (ISS-SWC-54) | Still reproduces | At 10 pages the 20 move / ••• circles are 30 px (≈ 10.7 dp at 450 dpi) each; at 4 pages 100–101 px (≈ 36 dp). `31_scc54_ten_pages.png`, `30_scc54_four_pages.png` |
| PHA262026P0167 (ISS-SWC-55) | Changed | Tapping the player frame beside 「Goodbye 2026」: the orange selection box still runs ≈ 125 px (≈ 44 dp) past the frame's right edge, over the text area. The floating pill menu (delete / duplicate / lock) seen on R8 did not show; instead the rotate and move handles are drawn on the 「Goodbye 2026」 text (over 「oo」 and 「0」). Toast 「Frame Selected」 and the bottom toolbar (Replace, Duplicate, Opacity, Shadow, Flips) show. `43_scc55_frame_selected.png`, `44_scc55_frame_selected_settled.png` |

## P0094 (in passing)

Opening Pages on the 3-page template shows no 「Page n / N」 label (`10_pages_open.png`, page source has no such text,
and no page is outlined). The label appears only after a stepper tap (「Page 4 / 4」 after +, `11_scc52_pages_plus.png`;
「Page 3 / 3」 after a reorder, `21_scc53_reorder.png`; 「Page 2 / 2」, 「Page 1 / 1」 after −). So on opening Pages it
does not show on this build; not a formal verdict (observation only).

## Other observations

- Canvas panning is free (no snap to a page): three left swipes on the empty area below the canvas pushed the canvas
  fully off screen (`40_scc55_canvas_goodbye.png`); a right swipe brought it back. Not judged against the spec here.
- ✕ on the frame's toolbar (no change made) left the editor straight to the template preview with no prompt.

## Logs

`logs/recheck-20261124-171949/` (git-ignored). Live capture: no FATAL. The ring buffer holds one older FATAL from
2026-11-23 16:42 (ClassCastException in `SwipeCollageDraftUseCase$load$2`, PID 14806), before this build was
installed (17:11 today): not from this run.

## End state

App on the Launcher (tool grid on its second page), Free tier as found, no draft saved.
