# TR261124-0032 verify — segment E (Xmas & NY Sale, P0152) — PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-24 17:11:57 (`build`).
- Server: Test Server. Tier Free throughout (Mine 「Upgrade to Premium!」 / 「Upgrade Now」 at the NY date, `e_08_mine_free.png`); no sign-in, no tier change, nothing bought.
- Time: 18:46–18:49 host time (about 3 min on the phone).
- Tested by: AI agent (Claude Opus 5.5) over Appium + adb. Nothing filed, no eBug or ECL touched.

## Clock settings

| | auto_time (network date and time) | auto_time_zone | Time zone | Phone clock |
| --- | --- | --- | --- | --- |
| Original (18:46:38) | 1 (on) | 1 (on) | Asia/Taipei | Tue Nov 24 18:46:38 CST 2026 = host |
| Xmas control (host 18:47:04) | 0 | 1 | Asia/Taipei | Tue Dec 15 10:00:00 CST 2026 (`cmd alarm set-time`) |
| NY check (host 18:47:26) | 0 | 1 | Asia/Taipei | Wed Dec 30 10:00:00 CST 2026 |
| **Restored (18:48:18)** | **1 (on)** | **1 (on)** | Asia/Taipei | **Tue Nov 24 18:48:18 CST 2026 = host 18:48:18** |

## Result

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0152 | FIXED | At 2026/12/30 10:00 (fresh launch after force-stop) the Free Launcher IAP button (`btnLauncherLottiePurchase`) is the two champagne glasses, animated: glasses apart → clink → gold sparkles and splashes → apart again, looping over the 7 s recording; no orange crown. |

Control: at 2026/12/15 10:00 the icon is the gold crown wearing a Santa hat (Xmas icon), so sale icons are served on this
build; at the real date (11/24) it is the regular orange crown.

## Steps

1. Recorded original settings (table above). `restart RFCW2198L7B`, `logcat start`, `build`. Launch at the real date:
   regular orange crown, 「New Content」 popup over the Launcher (`e_01_today_launcher.png`).
2. `settings put global auto_time 0`, clock to 2026-12-15 10:00 +08:00, `launch` (force-stop + start): Santa-hat gold
   crown (`e_02_xmas_launcher.png`); popup closed (`e_03_xmas_icon.png`, crop `e_07_xmas_icon_crop.png`).
3. `terminate`, clock to 2026-12-30 10:00 +08:00, `launch`: champagne glasses with sparkles at the top right beside the
   gear (`e_04_ny_launcher.png`, crop `e_06_ny_icon_crop.png`). Element `btnLauncherLottiePurchase` 759,98 146×146.
4. `record` 7 s (`recordings/e_ny_icon_anim.mp4`, local); 12 frames at 4 fps cropped to the button
   (`e_05_ny_icon_frames.png`): frames change (apart / clink / sparkles / apart), the cycle repeats within the clip —
   animated and looping, matching Design NY_ani (2.4 s loop).
5. Mine at the NY date: 「Upgrade to Premium!」, Free (`e_08_mine_free.png`).
6. `auto_time 1`, `auto_time_zone 1`; phone clock equal to host within the second. `launch` at the real date: Launcher,
   regular orange crown (`e_09_end_launcher.png`). `pull-logs segE`, `logcat stop`.

## Other observations

- The R1 log line 「LottieAnimationView is an AppCompat widget that can only be used with a Theme.AppCompat theme」
  (`E ThemeUtils`) still appears at launch, but no longer stops the NY icon from showing; harmless here.
- The 「New Content」 popup appeared on the real-date and Xmas-date launches, not on the NY launch.
- Log at launch: `CampaignUtil addEvent 2026_Black_Friday_Sale_Campaign / 2026_Xmas_Sale_Campaign / 2027_New_Year_Sale_Campaign`.
- No FATAL / AndroidRuntime line.

## Logs

`logs/segE-20261124-184831/` (git-ignored): `logcat-live.txt` 8506 lines, `logcat-buffer.txt` 9151 lines; 0 FATAL.
Log timestamps between 18:47:04 and 18:48:18 host time follow the moved phone clock. Capture stopped at the end.

## End state

App on the Launcher (Home), Free, Test Server, credits untouched (100 from segment D). **Automatic date and time ON**
(auto_time 1, auto_time_zone 1, Asia/Taipei), phone clock = host clock (Tue Nov 24 18:48 CST 2026). Wi-Fi untouched (on).
