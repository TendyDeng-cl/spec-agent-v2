# TR261124-0032 verify — segment D (Reel Creator, P0138) — PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-24 17:11:57 (`build`).
- Server: Test Server. Tier Free throughout (Mine 「Upgrade to Premium!」, `d_91_mine_end.png`); no sign-in, no tier change.
- Time: 18:31–18:45 (about 14 min on the phone).
- Tested by: AI agent (Claude Opus 5.5) over Appium + adb. Nothing filed, no eBug or ECL touched.

## Credits

| When | Balance | Evidence |
| --- | --- | --- |
| Start / before the first Generate (18:32) | 100 | room pill (`d_04_room.png`) |
| After each failure (18:35, 18:36, 18:39, 18:43) | 100 | pill in `d_15…`, `d_18…`, `d_26…`, `d_33_dialog3.png`; log `totalRemain=100` |
| End (18:44) | 100 | Buy Credit › Detail (`d_34_detail_end.png`), Mine 「My Credits 100」 (`d_91_mine_end.png`) |

Buy Credit › Detail at the end lists only the older lines (Image To Video −50, Credit Pack +50 / +100, AI Hairstyle −6,
Hair Volume −2, +10): **no Reel Creator charge and no refund line** from any of the four tries (`d_21_detail.png`,
`d_34_detail_end.png`). No credits bought.

## Template used (single-color-fastcut is gone)

The room no longer has a Creative section or the 「single-color-fastcut」 card. Its sections are Trending (Paper Play,
Color Rush, Retro Poster, Pixel Play, Fashion Edit, Show Time), Year-End Recap (Cover Story, Golden Year, Memory Quest,
Year in Pages, Tape Memories), Cinematic, Transitions, Daily and Sport (`d_04_room.png`, `d_06_scrolled.png`,
`d_07_room_top.png`). The grid's page 2 has no Reel Creator shortcut either (`d_02_grid.png`); the room was entered by
AI Videos › 「Cinematic Reel Creator」 › intro 「Try Now」. Stand-ins: the Trending templates, which are Creative Reel
templates by their style id (`Style_13_CreativeReel_color-rush_Opus`, `Style_11_CreativeReel_paper-play_Opus`,
feature id `CreativeReel`). Both now take 10–40 photos and cost **Generate | 90** (was 70 for single-color-fastcut),
action id `genvideo_60_sec_anthropic_claudeopus5.5`.

## Result

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0138 | HOLD | Every Creative Reel Generate is refused by the server (`applyEffect` HTTP 400 「duration invalid」) with Wi-Fi on, so no job is ever accepted or charged; the bug's state (job charged, upload cut, then Resume/Retry or refund) cannot be reached. A Wi-Fi cut in the upload itself gives 「Network Error」, no job, no charge. |

## Tries and Wi-Fi times

| # | Template, photos | Generate | Wi-Fi off | Wi-Fi on | What happened | Dialog |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Color Rush, 12 | 18:34:56.5 | 18:34:58.7 (2.1 s) | 18:35:1x | Cut too early: `getCreditRemain` failed (`ConnectException credit-stage.cyberlink.com`), no pack created | 「Network Error」 |
| 2 | Color Rush, 12 | 18:35:36.9 | 18:36:16.0 (host pipe delayed the trigger) | 18:36:2x | With Wi-Fi still on: pack created 18:35:39.6, `UploadFile` 18:35:43.026, `applyEffect failed … HTTP 400 … "duration invalid"` 18:35:43.103, status `EffectNotFound` | 「Error」 + 「Credits refunded」 |
| 3 | Paper Play, 10 | 18:39:31.5 | 18:39:36.0 (4.5 s) | 18:39:56 | Hit the upload: `Exception during API call: uploadFile, java.net.UnknownHostException: … cl-aol-media-demo.s3-accelerate.amazonaws.com`; no job in My AI Artwork › Reel Creator (「Nothing yet.」, `d_28_history.png`) | 「Network Error」 |
| (false start) | Paper Play, 10 | 18:43:11.7 | 18:43:09.9 (before Generate: the on-phone watcher matched its own command line) | 18:43:2x | `getCreditRemain` UnknownHost, no pack; not counted | 「Network Error」 |
| 4 | Paper Play, 10 | 18:43:42.1 | 18:43:47.49 (on-phone trigger at `UploadFile`) | 18:44:0x | `UploadFile` 18:43:47.326, `applyEffect failed … HTTP 400 … "duration invalid"` 18:43:47.420 (before the cut took effect), `EffectNotFound` | 「Error」 + 「Credits refunded」 |

Dialog texts (exact):
- Network cut before or during the photo upload: title 「Network Error」, 「No connection available. Check your network
  connection and then try again.」, one button 「OK」 (`d_15_after_off.png`, `d_26_after_cut.png`). OK returns to the
  confirm page with the photos kept. No 「Resume to Upload」 offered.
- Server refusal after the upload: title 「Error」, 「Unsuccessful, please try again. Credits refunded.」, one button 「OK」
  (`d_18_after_cut.png`, `d_33_dialog3.png`). No 「Resume to Upload」 offered.

## Steps

1. `restart RFCW2198L7B`, `logcat start`, `build` (20.19.0 / 90201902), Wi-Fi on (CL-WiFi). Launcher (`d_01_start.png`).
2. Grid page 2: no Reel Creator (`d_02_grid.png`). AI Videos › Cinematic Reel Creator › 「Try Now」 → room, pill 100
   (`d_03_entry.png`, `d_04_room.png`). Rows swept vertically and horizontally: no single-color-fastcut.
3. Color Rush › Use Template › 12 photos › Next → confirm 「Generate | 90」 (`d_08…`–`d_11_confirm.png`). Try 1 and try 2
   (table). Log at Generate: `GenAI_Feature_Generate:{…"style":"Style_13_CreativeReel_color-rush_Opus","feature":"cinematic_reel_creator"…}`.
   Detail after try 2: no Reel Creator line (`d_20_credit_page.png`, `d_21_detail.png`).
4. Paper Play › Use Template › 10 photos › Next → 「Generate | 90」 (`d_22…`, `d_24_pp_confirm.png`). Try 3 cut the upload
   (`d_25_wifi_off.png`, `d_26_after_cut.png`); OK → confirm page; Wi-Fi on; room › history icon → My AI Artwork ›
   Reel Creator 「Nothing yet.」 (`d_28_history.png`): no ⚠ card, nothing to Retry or Resume.
5. Try 4 with the cut triggered on the phone (`logcat -s AIEditorPreferenceUtil | grep -m1 "value: [U]ploadFile"; cmd
   wifi set-wifi-enabled disabled`): the server had already refused `applyEffect` 94 ms after `UploadFile`
   (`d_33_dialog3.png`). Detail at the end: no Reel Creator charge or refund (`d_34_detail_end.png`).
6. Back to the Launcher; Mine Free, 100 credits (`d_91_mine_end.png`, `d_92_end_launcher.png`); `pull-logs segD`.

Key log lines (segD capture):
- `18:35:43.103 E ApplyEffectRepository: applyEffect failed, aiType: AICineStory, sId: 28387133, feature id = CreativeReel, action id = genvideo_60_sec_anthropic_claudeopus5.5, HTTP 400 , errorBody: {"error":{"code":"BadRequest","message":"duration invalid"}}`
- `18:39:36.272 E executeWithAuthRetry: Exception during API call: uploadFile, java.net.UnknownHostException: Unable to resolve host "cl-aol-media-demo.s3-accelerate.amazonaws.com"`
- `18:43:47.420 E ApplyEffectRepository: applyEffect failed, … sId: 28387262, feature id = CreativeReel, … HTTP 400 , errorBody: {"error":{"code":"BadRequest","message":"duration invalid"}}`
- `18:44:36.167 getMemberCreditRemain … totalRemain=100`

## Why HOLD

P0138 needs a job the server accepts and charges, cut at `applyEffect` / later (the original log: `UploadFile`, then
`applyEffect` UnknownHost, Retry, −70 charged, no refund). On this build and Test Server every Creative Reel Generate
(Color Rush 12 photos, Paper Play 10 photos) is refused by the server with HTTP 400 「duration invalid」 even with Wi-Fi
on, so no job is accepted, nothing is charged and neither 「Resume to Upload」 nor a charged-then-refunded failure can
occur. A cut during the photo upload (before `applyEffect`) now ends with 「Network Error」, no job and no charge,
which does not lose credits but is not the bug's path. Recheck once the server accepts Creative Reel jobs (or with
another Creative template that generates).

## Other observations

- **Creative Reel generation fails server-side** (Test Server, 18:35 and 18:43): `applyEffect` HTTP 400
  `{"code":"BadRequest","message":"duration invalid"}` for `genvideo_60_sec_anthropic_claudeopus5.5` with Wi-Fi on;
  the user only sees 「Unsuccessful, please try again. Credits refunded.」 Possibly a server template configuration
  problem; worth asking RD/server before the recheck.
- **「Credits refunded」 when nothing was charged**: both 「Error」 dialogs say 「Credits refunded」, but no charge and no
  refund line exist in Detail and the balance never left 100. The balance is right; the wording claims a refund that
  did not happen (the same message as in P0138, now on a no-charge path).
- **No resume path**: neither dialog offers 「Resume to Upload」, and an upload cut leaves no ⚠ card in My AI Artwork,
  so a user must start again from the confirm page (photos kept). Matches the Expect only in that no credits are lost.
- Reel Creator catalogue changed: single-color-fastcut and the Creative section are gone; Trending templates are
  CreativeReel styles at 10–40 photos and 90 credits (fixtures.md still says single-color-fastcut 1–30, 70). The
  Launcher grid page 2 no longer has the Reel Creator shortcut on the S23 (entry via AI Videos).
- The room's sections now have real titles (Trending 🔥, Year-End Recap 📆, Cinematic 📽️, Transitions 🎞️, Daily, Sport),
  no raw `ReelCreator_Category_*` keys.
- No FATAL / AndroidRuntime line in the capture.

## Logs

`logs/segD-20261124-184454/` (git-ignored): `logcat-live.txt` 3205 lines and `logcat-buffer.txt`; 0 FATAL. Capture
stopped at the end. `logs/d_upload_trigger.txt` holds the try-2 trigger line.

## End state

App on the Launcher (Home), Free (「Upgrade to Premium!」), **100 credits**, Test Server (`d_92_end_launcher.png`).
**Wi-Fi on**, connected to 「CL-WiFi」 (`wifi status` at 18:44). No job, draft or artwork created; the on-phone helper
file `/data/local/tmp/cut.txt` removed.
