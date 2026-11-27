# Cinematic Reel Creator — Photo Tips (Android) — what the phone needs before a run

None of this can be committed. Check it before the first segment; a new row that needs something new adds it here.

## Phone, app and account
- Phone: Sony XQ-BT52 on adb (serial HQ61563393, Android 12).
- Build: 16.9.0 (2611201), TR261123-0015. The sideloaded APK cannot sign in (DRA262611P0253), so this build comes
  from the Google Play internal test track (REQ-003, 2026-11-24); reinstall from Play if it serves an older version.
  Check `device-android.ts <run dir> build` reads 2611201 at the run start.
- Account: the phone's Google account (acda.test7), signed in with the app's account button, never a password.
- Credits: the photo tips rows spend none (stop at Add Media, never pick a photo or press Generate). Draft 20261126-111221
  (REQ-010, user ruling 2026-11-26) generates Micro Cinema reels: two from the Launcher (TC-081, TC-082) and one per other
  entry (TC-087, TC-091, TC-095, TC-099; a second only if leaving cancelled the first): six, up to ten. The account needs
  that many times the price on 「Generate」; spend them (AGENTS.md › Credits).

## Media
- At least one photo in the gallery so Add Media shows its grid (no photo is picked by any row).
- Entry Sections (draft 20261126-111221, REQ-010): a saved editor project with one photo on the main track and one photo
  on an overlay track, reached from the Launcher's Project tab; the editor-entry rows open Cinematic Reel Creator from it
  and leave it unchanged.
- Generation photo (REQ-010): one gallery photo that is not in that project, so a generation row can tell which photo
  Cinematic Reel Creator took.

## Settings the run changes (and restores)
- App language: TC-017 繁體中文, TC-018 日本語 (`launch --lang zh-Hant|ja`, then `locale reset`).
- The Cinematic Reel Creator tutorial (「What is Cinematic Reel Creator?」) shows on the first entry after an install
  or `pm clear`; close it with X before the first row (it stays closed across relaunches) and note it in the checkpoint.
- Logs: `device-android.ts <run dir> pull-logs <segment>` (not `app-setup.ts`, which is iOS).
- Wi-Fi (draft 20261125-190000): TC-078 and TC-079 turn Wi-Fi off and back on (`device-android.ts <run dir> wifi off|on`,
  only with the phone on USB); the phone has no mobile data. Turn it back on right after each row.
