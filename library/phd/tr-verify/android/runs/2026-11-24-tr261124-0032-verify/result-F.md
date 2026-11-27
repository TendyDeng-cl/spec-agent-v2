# TR261124-0032 verify — segment F (Reel Creator, P0138 recheck) — PHD-A 20.19.0 (versionCode 90201902), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31 (`build`). Settings › About shows
  only 「Version : 20.19.0」 and 「SR number PHA261029-01」 (`f_54_about.png`); no longer build string is shown in the app.
- Server: Test Server (Launcher 「Test Server」 badge). Tier Free throughout (Mine 「Upgrade to Premium!」,
  `f_04_mine.png`, `f_52_mine_end.png`); no sign-in, no tier change.
- Time: 09:04–09:46 (about 42 min on the phone).
- Tested by: AI agent (Claude Opus 5.5) over Appium + adb. Nothing filed, no eBug or ECL touched.

## Credits

| When | Balance | Evidence |
| --- | --- | --- |
| Segment start (09:04:02) | 100 | log `totalRemain=100` 09:04:08; credit page `f_01_start.png` |
| After the 2000 pack (09:04:17) | 2100 | log `[purchase] success credits: phd_2000_credit_freeuser`; Mine 2100 (`f_04_mine.png`); Detail 「Credit Pack +2000」 (`f_05_detail.png`) |
| After try 1 Apply (09:07:17) | 2010 | log `totalRemain=2010` |
| After try 2 Apply (09:19:26) | 1920 | log `totalRemain=1920` |
| After try 3 Apply (09:20:08) | 1830 | log `totalRemain=1830` 09:20:39 |
| After try 4 (09:20:43, server charge) | 1740 | credit history `-90 CreativeReel 01:20:43Z`; room pill 1740 at 09:33 |
| After CineStory One-Take Shot (09:34:38) | 1692 | log `totalRemain=1692`; history `-48 AICinematicShorts 01:34:38Z` |
| After AI Transition Outfit Recap charge (09:37:02) and refund (09:40:55) | 1692 | history `-120 AITransition 01:37:02Z`, `+120 Returned 01:40:55Z 「Generation failed」` |
| End (09:46) | **1692** | Mine 「My Credits 1692」 (`f_52_mine_end.png`), Detail (`f_51_detail_end.png`), log `totalRemain=1692` 09:46:22 |

**The 2000-credit pack was not bought by this agent.** When the session started (09:03:58) the app was already on the
Credit page with the 2000 pack selected; the log shows a Google Play flow for `phd_2000_credit_freeuser` from 09:04:02
(cancel, two 「Duplicate purchase attempted」 errors) and a successful one started 09:04:09.653, `onPurchasesUpdated: 0`
09:04:14.828, success 09:04:17.824. The agent's commands in that window were `texts`, `wifi status` and one failed
`lbl Detail` at 09:04:12 (activity.log); no purchase sheet was tapped. The follow-up Google Play upsell 「Want to get 100
credits, too? 100 Credits (50% off) NT$300.00」 (`f_02_detail_start.png`) was dismissed without buying. Someone at the
phone probably bought it; please confirm. No credits bought by the agent.

Spent in this segment: 4 × 90 (Creative Reel) + 48 (CineStory) + 120 (AI Transition, refunded) = 408 charged, 120
refunded, **net 408** (2100 → 1692).

## Result

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0138 | FIXED | Try 4: `applyEffect` reached the server and was charged (−90 at 09:20:43) but the app got no answer (`applyEffect … UnknownHostException`); the confirm page showed 「Network Error」 (not 「Credits refunded」), the pack was kept, My AI Artwork showed ⚠ 「Retry」, and the job finished (Done 09:31:54, playable Color Rush reel) with exactly one −90 line in Detail and no refund needed. A job that really failed (AI Transition, moderation) got a real refund line (+120). |

## Tries and network-cut times (Creative Reel = Color Rush, 11 photos, 「Generate | 90」)

The Wi-Fi switch alone (`cmd wifi set-wifi-enabled disabled`) takes about 1 s to drop the link and the phone's
`logcat | grep` trigger fires late (logcat flushes a line only when the next one arrives), so tries 1–3 landed after
Apply Effect had already answered. Try 4 used the debug firewall chain (`cmd connectivity set-chain3-enabled true` with
the app's deny bit preset: blocks the app's traffic at once) fired by the `addNewPack` line, which is flushed together
with the `UploadFile` line, then Wi-Fi off. Both were undone after each try (chain disabled, deny bit cleared at the end).

| # | Generate | Pack created | `UploadFile` | Cut | Restore | Apply Effect | Screen | Charge | Outcome |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 09:07:02.5 | 09:07:14.289 | 09:07:16.051 | Wi-Fi off 09:07:17.2 | Wi-Fi on 09:07:55 | answered (`Apply`, consume task 91736676) 09:07:17.164 | My AI Artwork, ⚠ 「Retry」 (`f_14_try1_after.png`); no dialog | −90 | Retry 09:08:06 → 「Processing… / Almost Done」 → Done 09:17:13 (`f_19…`); too late for the main check |
| 2 | 09:19:22.7 | 09:19:23.835 | 09:19:26.110 | block 09:19:27.04 | 09:19:42 | answered 09:19:26.969 (task 91736692) | My AI Artwork, Processing | −90 | Done 09:30:16 without Retry; too late |
| 3 | 09:20:03.8 | 09:20:05.636 | 09:20:07.918 | block 09:20:09.22 (1.2 s delay, 8 ms too late) | 09:20:26 | answered 09:20:09.212 (task 91736693) | My AI Artwork, ⚠ 「Retry」 (`f_24_try3_after.png`) | −90 | Done 09:30:05 without Retry; too late |
| **4** | 09:20:39.0 | 09:20:40.843 | 09:20:43.401 | **block 09:20:43.42–.47, Wi-Fi off 09:20:43.51** | 09:20:57 | **no answer**: `applyEffect` UnknownHost 09:20:43.452; server charged at 01:20:43Z | **「Network Error」 dialog** (`f_25_try4_dialog.png`) | **−90 (once)** | ⚠ 「Retry」 in My AI Artwork (`f_27_try4_history.png`), Retry 09:30:46 → 「Almost Done」 (`f_34_try4_retry.png`), **Done 09:31:54** (`f_35_try4_done.png`) |

Try 4 is the counted try (the first one where Apply Effect got no answer).

Dialog text (exact), try 4 and both side-effect tries: title 「Network Error」, 「No connection available. Check your
network connection and then try again.」, one button 「OK」. OK returns to the confirm page with the 11 photos kept
(`f_26_try4_afterok`). 「Credits refunded」 did not appear anywhere in this segment.

## Steps

1. `restart RFCW2198L7B`, `logcat start`, `build` (20.19.0 / 90201902, updated 2026-11-25 08:56:31). Wi-Fi on, CL-WiFi.
   App was on the Credit page (100); the 2000 pack was bought by someone else at 09:04 (see Credits). Mine: Free, 2100.
2. Launcher › 「Reel Creator」 › 「Try Now」 → room (pill 2100, `f_07_room.png`; Trending, Year-End Recap, Cinematic,
   Transitions, Daily). Color Rush › Use Template › 11 photos › Next → 「Generate | 90」 (`f_12_confirm.png`).
3. Sanity: with Wi-Fi on the server accepted Color Rush (try 1: status `Apply`, consume task id, −90); no HTTP 400
   「duration invalid」 any more.
4. Tries 1–3 (table): cut after Apply Effect answered. Each job charged once and finished; try 1 needed Retry (⚠ card
   after `querySessionStatus` UnknownHost), tries 2–3 finished by themselves after the network returned. Detail after
   try 1: one 「Reel Creator −90」 (`f_21_detail_try1.png`).
5. Try 4: 「Network Error」 dialog (`f_25_try4_dialog.png`); pill 1830 (stale, server already 1740); network back
   09:20:57; OK; room › history icon → My AI Artwork › Reel Creator: the newest Color Rush card is ⚠ 「Retry」, the two
   others 「Processing… / Almost Done」 (`f_27_try4_history.png`). Reopened at 09:24 and 09:30: still ⚠ 「Retry」
   (`f_32_reopen_1s.png`, `f_33_reopen_8s.png`). Retry 09:30:46 → 「Processing… / Almost Done」; Done 09:31:54; card shows
   the reel with 「Expires on 2027/11/25」 (`f_35_try4_done.png`: three finished Color Rush reels on screen, the fourth below).
6. Credit pill › Detail (`f_36_detail_after.png`): four 「Reel Creator −90」 lines (09:07:16, 09:19:26, 09:20:08,
   09:20:43 by the server's history), one per job, all four jobs finished, no refund line, no extra charge from Retry.
7. Side effects: CineStory (Cinematic › One-Take Shot, 1 photo, 48) and AI Transition (Transitions › Outfit Recap,
   4 photos, 120) with the same cut (below).
8. Restore (below); `pull-logs segF`; `logcat stop`.

Key log lines (segF capture):
- `09:20:40.843 D AIEditorPreferenceUtil: addNewPack: {… "id":"credit_create_CreativeReel_1795569640330", "credit_action_id":"genvideo_60_sec_anthropic_claudeopus5.5","credit_total_credit":90, "template_name":"Color Rush" …}`
- `09:20:43.401 D AIEditorPreferenceUtil: updatePackItems column value: UploadFile`
- `09:20:43.452 E executeWithAuthRetry: Exception during API call: applyEffect, java.net.UnknownHostException: Unable to resolve host "demo.myedit.online"`
- `09:20:43.457 E executeWithAuthRetry: Exception during API call: querySessionStatus, java.net.UnknownHostException: …`
- credit history: `RecordItem(creditUsage=-90, featureId=CreativeReel, … createTime=2026-11-25T01:20:43+00:00, detail=Reel Creator)`
- `09:31:54.669 D AIEditorPreferenceUtil: updatePackItems column: status packIds: [credit_create_CreativeReel_1795569640330]` → `value: Done`
- Try 1 for comparison: `09:07:17.165 … value: Apply`, `09:07:17.396 … credit_consume_task_id … 91736676`, `09:17:13.747 … value: Done`

## Why FIXED

The bug's state is reached in try 4: the server took Apply Effect and charged 90, but the app never got the answer
(the original log's `applyEffect` UnknownHost). On 20.19.0 / 90201902 the confirm page now shows the network error
(「Network Error」 dialog, the phone had no connection) instead of 「Unsuccessful, please try again. Credits refunded.」;
the pack stayed for My AI Artwork, whose ⚠ 「Retry」 led to the finished reel, and Detail shows exactly one −90 for that
job with no refund line, which is right because the job completed. Tries 1–3 (connection lost after Apply Effect) also
finished with one charge each, and none stayed 「Almost Done」. A real server failure (AI Transition, below) was refunded
in Detail. This matches the Expect (one charge for a finished job; a failed job refunds) and RD's resolve.

## Side effects (RD's impact: AI Transition, CineStory)

| Feature (template) | Generate | Cut | Apply Effect | Screen | Charge | Follow-up |
| --- | --- | --- | --- | --- | --- | --- |
| CineStory (Cinematic › One-Take Shot, `genvideo_1_sec_kling_o3pro_enable_1080p`, 48) | 09:34:35.1 | block 09:34:38.85, Wi-Fi off 38.90; restore 09:34:50 | `applyEffect` UnknownHost 09:34:38.832 after `UploadFile` 38.770; server charged −48 at 01:34:38Z | 「Network Error」 dialog (`f_39_ots_dialog.png`) | −48 once | ⚠ 「Retry」 (`f_41_ots_history.png`) → Retry 09:35:21 → Almost Done (`f_42_ots_retry.png`) → `handleQueryTaskStatus … Done` 09:39:52, video card 00:08 (`f_49_side_end.png`) |
| AI Transition (Transitions › Outfit Recap, `genvideo_1_sec_bytedance_seedance2.5std_enable_720p`, 120) | 09:37:00.8 | block 09:37:04.30, Wi-Fi off 04.35; restore 09:37:14 | `applyEffect` UnknownHost 09:37:04.279 after `UploadFile` 04.222; server charged −120 at 01:37:02Z | 「Network Error」 dialog (`f_46_outfit_dialog.png`) | −120, then **+120 「Generation failed, credits returned」** 01:40:55Z | ⚠ 「Retry」 → Retry 09:37:42 → the server job failed on moderation (`status Error … errorCode=4002, desc=moderation error`, 09:40:58, pack `ServerInputNeedAdjust4002`); card 「View Detail」 → 「Try Different Content — The credits have been refunded. Your content may violate our Terms of Service. Modify the image, and then try again.」 (`f_50_outfit_detail.png`); refund line in Detail (`f_51_detail_end.png`) |

Side effects: none seen (places checked: Creative Reel / CineStory / AI Transition confirm pages after a no-answer Apply
Effect, My AI Artwork › Reel Creator cards and Retry, credit pill, Mine, Buy Credit › Detail). Both features show the
network dialog instead of 「Credits refunded」, and credits match Detail: CineStory charged once and finished; AI
Transition charged once and refunded when the job failed, with the refund message only where a refund line exists.
「Credits refunded」 was not shown on any path where nothing was refunded.

## Other observations

- **Retry on a job the server is still running is a silent no-op.** Before the try-4 job finished, every opening of
  My AI Artwork showed it as ⚠ 「Retry」 (09:21, 09:24, 09:30) although the server had it running since 09:20:43, and
  「Retry」 only switched the card to 「Processing… / Almost Done」 with no log line or network call; reopening showed ⚠
  again until the job was Done (as seen in the Reel Creator R1 run, O-11). Once, at 09:21:3x, the card switched to
  Processing before the agent's tap found it (the `lbl Retry` call reported no element). The ⚠ card on a job that is
  in fact running may lead a user to think it failed; outcome and credits were right. Not a P0138 regression.
- The server accepts Creative Reel jobs again: a 60 s Color Rush reel took about 10–11 min (09:07:16 → 09:17:13;
  09:20:43 → 09:31:54); CineStory One-Take Shot about 5 min; AI Transition failed in about 4 min on moderation.
- After the AI Transition moderation failure the card's 「View Detail」 dialog says the credits were refunded and
  Detail shows the matching +120 line.
- The credit pill on the confirm page lagged the server balance (showed 1830 while the server had 1740).
- After the first Wi-Fi on, the phone joined 「17F_QA_Wifi_5G」 instead of CL-WiFi; switched back to CL-WiFi at the end
  in Settings › Wi-Fi (saved network, no password).
- Reel Creator is again on the Launcher grid on the S23 (「Reel Creator」 shortcut), opening the intro 「Try Now」.
- No FATAL / AndroidRuntime line in the capture.

## Logs

`logs/segF-20261125-094625/` (git-ignored): `logcat-live.txt` 7151 lines and the ring-buffer dump; 0 FATAL. Capture
stopped at the end.

## End state

App on the Launcher (Home), Free (「Upgrade to Premium!」), **1692 credits**, Test Server (`f_53_end_launcher.png`).
**Wi-Fi on, connected to 「CL-WiFi」** (09:46). Firewall chain 3 disabled and the app's deny bit cleared
(`get-package-networking-enabled` → allow). Automatic date and time on (`auto_time 1`, `auto_time_zone 1`, never
changed). The on-phone helper scripts and `/data/local/tmp/cut.txt` removed. My AI Artwork › Reel Creator now holds the
results of this segment: four Color Rush reels, one One-Take Shot video and one failed Outfit Recap card (「View
Detail」); no drafts on the confirm pages.
