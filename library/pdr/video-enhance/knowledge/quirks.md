# Quirks

## KF-008 Up to 2611231 the source badge read 0fps for some sources
- kind: quirk · platform: android · use: run · tags: panel, badge, fps
- source: Video Enhance Android run 2026-11-10-r1-full O-2, O-31; Video Enhance Android run 2026-11-18-r2-full O-2; corrected by Video Enhance Android run 2026-11-26-r4-full O-3, O-26, O-28 · verified: 16.9.0 build 2611251 (2026-11-26)

Up to 2611231 the panel's badge read 「0fps · <res>」 with every fps chip disabled for stock downloads (Pexels, Pixabay,
gettyimages), an 8K file after the convert dialog, some Timeline clips, a Timeline clip whose file is gone and a file
picked through Google Photos / Google Drive (DRA262611P0073). On 2611251 stock, picker and Timeline sources read their
fps (「30fps · 2160p」 Pexels, 「25fps · 2160p」 Pixabay, 「29fps · 720p」 gettyimages, 「30fps · 1080p」 Timeline clips), so
P0073 looks fixed; the 8K-after-convert and missing-file cases were not rechecked.

## KF-011 Hand-set trim lengths land on x.y seconds
- kind: quirk · platform: android · use: analysis, run · tags: trim, handles, price
- source: Video Enhance Android run 2026-11-18-r2-full O-7, O-9, O-14, O-30 · verified: 16.9.0 build 2611231 (2026-11-25) · status: superseded by KF-016

A trim handle placed by hand never ends on a whole second: 「00:30」 is 30.x s and bills 31 (sub-pixel adb releases
cross 29.x → 30.x within 0.01 px), so the price grid's 30 s and 90 s prices cannot be reached by dragging; the caps
(08:00, 02:30) are exact. Labels truncate and can read one second below the frame at the handle. Handles ignore drags
under ~25 px (overshoot and return). Dragging the selection's middle moves it with the finger when the video fits the
strip, against it (the strip scrolls) when the strip is wider than the screen.

## KF-016 Hand-set trim lengths reach whole seconds; read the handles per video
- kind: quirk · platform: android · use: analysis, run · tags: trim, handles, price, recipe
- source: Video Enhance Android run 2026-11-26-r4-full O-6, O-13, O-22 (replaces KF-011, Video Enhance Android run 2026-11-18-r2-full O-7, O-9, O-14, O-30) · verified: 16.9.0 build 2611251 (2026-11-26)

Since 2611251 (P0075 fix, 「Selected Length」 rounds up) a hand-set 「00:30」 / 「01:30」 bills exactly 30 / 90 s, so the
price grid's 30 s and 90 s prices are reachable by dragging (12:30 source: finger x 210 / 313 at y 1224; 212 / 315
gave 31 / 91). Up to 2611231 a hand-set 「00:30」 was 30.x s and billed 31 (KF-011). Geometry moves per video and build:
an over-cap source draws the trim strip and knob 66 px lower (KF-018), and the 1 s minimum selection (P0087 fix) leaves
the right handle at x ≈ 416, not 186. Drag only from a handle's current place: from where it was, the strip scrolls and
the whole selection moves. Handles ignore drags under ~25 px. Read 「Selected Length」 before tapping Enhance.

## KF-017 The floating Enhance button covers the fps chips at rest
- kind: quirk · platform: android · use: run · tags: panel, fps, enhance, recipe
- source: Video Enhance Android run 2026-11-26-r4-full O-11 · verified: 16.9.0 build 2611251 (2026-11-26)

On the panel at rest the floating 「Enhance ◆ N」 button (y ≈ 1980–2100 px on the SM-A5360) lies over the fps chip row,
whose chips the page source still reports on screen: a tap on `chip_fps_30` hit Enhance and started a charged task.
Scroll the panel up before tapping the fps or Resolution chips.

## KF-018 The ⓘ by Selected Length shows only over the Mode cap
- kind: fact · platform: android · use: analysis, run · tags: panel, trim, cap
- source: Video Enhance Android run 2026-11-26-r4-full O-6, O-10 · verified: 16.9.0 build 2611251 (2026-11-26)

A source longer than the Mode's cap (a 12:30 video) gets an ⓘ (`iv_selected_length_info`) beside 「Selected Length」 and
its trim strip and ◀▶ knob sit 66 px lower (knob y 1344 vs 1278 on the SM-A5360); a video within the cap (02:30 1080p
in Standard) has no ⓘ.

## KF-019 The Demo page's 「Don't show again」 survives pm clear
- kind: quirk · platform: android · use: run · tags: demo, reset, fixtures
- source: Video Enhance Android run 2026-11-26-r4-full O-5, O-14, O-27 · verified: 16.9.0 build 2611251 (2026-11-27)

After a `pm clear` the Demo page came back once (R4-a, before TC-013 ticked 「Don't show again」); after every later
`pm clear` (19:36, 19:46, 04:14) the Launcher and AI Magic 「Video Enhance」 entries went straight to 「File access
permission is required」 and Add Media. The choice is kept outside the app's data on this phone / account, so rows that
need the Demo page must run before TC-013 or find another reset.

## KF-020 The 「Turn on notifications」 dialog shows once per install
- kind: fact · platform: android · use: run · tags: notification, dialog, reset
- source: Video Enhance Android run 2026-11-26-r4-full O-14 · verified: 16.9.0 build 2611251 (2026-11-26)

The 「Turn on notifications」 dialog shows once per install whatever the answer: after 「Turn On」 the next
two tasks (one after a relaunch) had no prompt. Rows that need it again need a `pm clear`.

## KF-021 Save Result while the result is still loading saves nothing
- kind: quirk · platform: android · use: run, ebug · tags: result, save, loading
- source: Video Enhance Android run 2026-11-26-r4-full O-24 · verified: 16.9.0 build 2611251 (2026-11-26)

Once (a Standard / Natural / 120fps / 4K result) the first View showed only a loading ring for 9 s or more, and
「Save Result」 tapped then wrote no file and showed no 「Saved to Gallery」; reopened later it loaded in 1 s and saved.
Wait for the result to play before tapping Save Result. Whether Save should be disabled or queue meanwhile is unstated.

## KF-015 A synthetic test pattern smears at 1080p
- kind: quirk · platform: android · use: run · tags: quality, result, fixtures
- source: Video Enhance Android run 2026-11-24-r3-full O-9, O-15 · verified: 16.9.0 build 2611231 (2026-11-25)

The 1080p result of ve-000396-1080p30 (moving coloured lines) shows smear and block trails from about 1 s on that the
source and its 720p results lack. The real clip ve-real-000320-720p30 enhanced to 1080p (Natural and Sharp, 30/60/120
fps) and 4K is clean. Judge output quality on a real clip; check a defect seen only on the synthetic pattern there
before filing.
