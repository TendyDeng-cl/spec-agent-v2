# Recent Task Model Info (Android) — what the phone needs before a run

None of this can be committed. Check it before the first segment; a new row that needs something new adds it here.

## Phone, app and account
- Phone: Sony XQ-BT52 on adb (serial HQ61563393, Android 12).
- Build: 16.9.0 (2611251), TR261125-0064, from the Google Play internal test track (the sideloaded APK cannot sign in,
  DRA262611P0253). The first build with the model tag: its Recent task card layout
  (`layout_ai_video_anime_recent_task`) gains `tv_model`, absent in 2611201 (checked 2026-11-26). Check
  `device-android.ts <run dir> build` reads 2611251 at the run start.
- Account: the phone's Google account (acda.test7), signed in with the app's account button, never a password; the
  Launcher shows 「Pro」. Rows naming the Pro test account use it.
- Credits: the model-tag rows generate one Image to Video task per model (TC-003, TC-006 – TC-014), one Text to Video
  task per model (TC-016, TC-019 – TC-026), one template task each (TC-029, TC-030), a Text to Image task (TC-033) and
  one generation per entry that starts one. Spend what they need (AGENTS.md › Credits).

## Media
- A photo in the gallery (Image to Video and the editor Photo / PIP Photo entries).
- Editor entries: a saved project with one photo on the main track and one on an overlay track, reached from the
  Launcher's Project tab; leave it unchanged.
  On the Sony this is 「Project 11-27」 (2026/11/27 12:49 AM, 9:16, 5 s: the dog photo on the main track and on an
  overlay track), made in R1-c; 「Project 11-26」 holds a video clip, not a photo (O-12).

## Settings the run changes (and restores)
- Appearance rows (TC-042, TC-043): restore the phone's appearance after.
- Logs: `device-android.ts <run dir> pull-logs <segment>`.
