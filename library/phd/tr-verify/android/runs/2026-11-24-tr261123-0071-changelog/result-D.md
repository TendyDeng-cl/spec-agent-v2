# Segment D — Image to Video RD change log (TR261123-0071, PHD-A 20.19.0.v202611232103 R8)

- Device: Google Pixel 8a (42201JEKB02229), Android 16; versionName 20.19.0, versionCode 90201902 (the TR build, installed 2026-11-24 11:05).
- Account: not signed in, Free, 68 credits throughout (room pill 68). No generation, no purchase, no sign-in.
- Time: 15:10 start (`restart`; the logcat capture from segment C was still running), 15:14 logs pulled. Logs: `logs/D-20261124-151409/`, no FATAL EXCEPTION.
- End state: the Launcher (Home), Free.

**Blocker for the Reuse items:** this phone, not signed in, has no Custom video to reuse. My AI Artwork › Recent › Video
shows 「Nothing yet.」 (d_recent_video) and My AI Artwork › Image to Video shows 「Nothing yet.」 / 「Start to Create」
(d_i2v_tab); the room's history button opens the same empty tab (d8_room_history). The R1 fixture videos and the
P0126 Kling 3.0 video were made on the signed-in QA account, so they are not listed here. Making one needs a new
generation (30 credits for Kling 3.0) and the user's go-ahead, or signing in; neither was done. So 「Reuse」 could not be
tapped and items 7, 10 and the Reuse halves of 8 and 9 are unchecked.

| # | Item | Verdict |
| --- | --- | --- |
| 7 | 「Settings applied」 toast after Reuse | Can't check (no Custom video) |
| 8 | Reuse shows the standard intro; leaving returns to Save & Share | Can't check (normal entries checked only) |
| 9 | No landscape flash on entering Image to Video | Partly (normal entries: no landscape frame; Reuse entry not reachable) |
| 10 | ImageToVideo_Reuse_Click with model | Can't check (no Reuse tap possible) |

## 7. 「Settings applied」 toast — Can't check
No Custom video in My AI Artwork (Recent › Video and the Image to Video category both empty), so 「Reuse」 was never on
screen. Spec: R-025 (toast on entering the Custom page), R-026 (after the intro sheet), R-017 – R-024 (model, Duration,
Quality, Sound, Start/End restored; prompt filled; photo and inspiration not restored). R1 (2026-11-19, TC-010/013/015)
found no toast; this build's fix is unverified.

## 8. Standard intro on Reuse; leaving returns to Save & Share — Can't check (Reuse path)
What was checked, normal entries only (the reference for 「the room's normal intro」):
- AI Videos › Image to Video: the 「Image To Video」 intro sheet (「Make Your Photos Come Alive! …」, 「Try now」, 「Don’t show again」)
  shows over a dimmed demo video with a loading spinner for about 4 s, then the demo plays (d9_normal_room; recording frames 89–321 = spinner).
  「Try now」 → 「Steps」 page (Upload Your Photo / Select a Template / Generate Result, 「Continue」, 「Don’t show again」)
  (d8_normal_room_after_intro) → 「Continue」 → Custom tab, Kling 3.0, empty image, empty prompt 0/2500, Generate 30 disabled (d8_normal_room).
- Home › Image to Video shortcut: the same intro sheet (d9_home_room).
- ‹ in the room entered from AI Videos → back to the AI Videos tab (d8_normal_back). After opening the room's history button, system Back returned to the room first.

Not checked: whether 「Reuse」 now shows this intro (R1 ISS-IR-02: it skipped it) and whether ✕ / ‹ / Back in the reused room
lands on Save & Share from both the Recent and the Image to Video category entries (R-033, R-058; R1 ISS-IR-03: it went to My AI Artwork).

## 9. No brief landscape flash — Partly
Recorded both normal entries (`recordings/d9-normal-entry.mp4`, 344 frames at ~58 fps, 7.9 s; `recordings/d9-home-entry.mp4`, 223 frames)
and stepped through every frame on contact sheets (`recordings/f/d9-normal-sheet.png`, `f/d9-home-sheet.png`; close-up of
frames 84–95 and 318–329 in `f/d9-normal-zoom.png`): the AI Videos / Home page cross-fades into the dimmed intro in portrait
(frames 86–89 AI Videos entry, 28–31 Home entry) and every later frame is portrait. **No landscape or rotated frame on either normal entry.**
The Reuse entry, where R1 saw the room drawn rotated for 1–2 frames (O-2 / ISS-IR-09), could not be recorded (no Custom video).

## 10. ImageToVideo_Reuse_Click analytics — Can't check
No Reuse tap was possible; the capture (15:10–15:14) has no 「Reuse」 line. For reference, the Image to Video entries logged
(`[PHD-A][Mixpanel]`):
- `AIVideo_Feature_Tap:{"subscription_plan":"free","feature":"image_to_video"}` (AI Videos entry)
- `Launcher_Shortcut_Tap:{"subscription_plan":"free","shortcut":"image_to_video"}` (Home entry)
- `Artwork_Category_Select:{"subscription_plan":"free","category":"Image to Video","source":"sheet"}` (My AI Artwork category)

Spec R-051: ImageToVideo_Reuse_Click with `model`; R1 TC-037 saw only `logEvent name=Artwork_Reuse_Click` with no parameters.

## Other observations
- The Custom room's prompt placeholder is still 「Describe the subject and how they move in the scene, e.g. A dancer spins and jumps under stage lights.」
  with 「0/2500」 (d8_normal_room), not the PM mockup's 「Describe the subject, action, and overall scene, e.g. …」 / 「0/2,500」 (R-041; same as R1 TC-028, already known).
- The intro sheet waits about 4 s on a dimmed frame with a spinner (and a dimmed 「Try now」) before its demo video plays, on both entries.
- To check items 7, 8, 9 (Reuse) and 10 on this build: a Custom video on this phone (one Kling 3.0 5 s generation, 30 of the 68 credits, needs the user's go-ahead), or the signed-in QA account that holds the R1 / P0126 videos (sign-in is the user's).
