# Video Enhance Android — Q1 report (question round: rows that observe Open questions)
- Build 16.9.0 (2611231), Stage (yellow Launcher bar; `/sdcard/cyberlink/PDR/testserver.config` kept through the reset).
  Phone Samsung SM-A5360 (R5CTB22S05Y), USB, Wi-Fi 17F-QAAPP-2.4G. Account cltqauiap2@gmail.com: **Free** at the start
  (Launcher 「Mine」, panel 「Unlock Pro to Enhance」); the Pro test subscription was bought on the Google Play test sheet
  (「Test card, always approves」, 「This is a test subscription … You will not be charged.」, NT$1,080.00/30 min) at
  12:12:35, no password (AGENTS.md *Test purchases in the app*). Draft 20261125-190000, phase Q1, segment Q1-a.
  2026-11-26 12:06–12:21 (15 min wall, no idle gap). Credits 29242 → 29342 (+100 Pro monthly bonus) → 29372 (+30
  loyalty bonus at sign-in) → 29370 (−2, TC-351's Enhance). Nothing filed, uploaded, commented or committed.
- TC-351's `adb shell pm clear` (approved by the user for this row) ran at 12:13:13 after a log pull
  (`logs/Q1-a-pre-clear-20261126-121305/`). Restored after it: signed in again with the phone's Google account button
  (Chrome, no password), Stage confirmed (yellow bar), notifications and photos/videos (Allow all) granted, Add Media
  sort set back to Date / Descending (changed to Name / Ascending to find ve-000100-720p30, KP-073). Android has no
  Write Log switch (KP-003): logcat capture ran all segment. Phone left on the Launcher, signed in (Pro, 29370), Wi-Fi
  on, the one task Done (nothing processing). Logs: `logs/Q1-a-20261126-122119/` (sliced, `by-case/`).

## Tally
**0 Pass, 2 Fail (question), 0 Blocked, 0 Not run, 0 Inconclusive.**

| Row | Question | Result | What was seen |
|---|---|---|---|
| TC-350 | Q-28 | Fail (question) | ve-1230-1080p30, selection 00:30–02:00 (「01:30」), knob at 「01:50」 (burned-in 00:01:50.1). Play runs 01:50 → 02:00 with ‖, Preview time, bubble and playhead together; at the right handle it **stops by itself** on 「02:01/12:30」 (burned-in 00:02:01.3), ▶ back, no jump, no loop, never past the handle; still there 20 s later. The next ▶ plays from the **selection start 00:30**. Handles and 「Selected Length」 never changed. Recordings `TC-350-play.mp4`, `TC-350-replay.mp4` (1 fps samples `recordings/tc350/`, `tc350r/`). |
| TC-351 | Q-14 | Fail (question) | After `pm clear`: Welcome (Terms of Service / Privacy Policy, box pre-ticked), notification prompt, Pro credits dialog, Google sign-in (first try 「No Internet Connection」 while online, O-1), 「Account Sign In」 notice, Demo page, file-access and media permissions. None mentions AI processing in a third party's cloud. First 「Enhance」 (ve-000100-720p30, 「Enhance ◆ 2」) at 12:18:53 → 「0% Video uploading...」 directly (12 rapid screencaps, `screenshots/tc351-burst/`); upload 16 s, Done 12:20:10, 2 credits. The account had enhanced before the reset. |

## Open questions (every one of the Android table)
| Q | Outcome | Where |
|---|---|---|
| Q-28 | **filed** (drafted ISS-VEA-58, PM, `[AIAgent][UX]`; new) | TC-350; `ebugs/2026-11-26-q1/` |
| Q-14 | **filed** (drafted ISS-VEA-59, PM / Legal, `[AIAgent][UX]`; was `to-file`) | TC-351; `ebugs/2026-11-26-q1/` |
| Q-5, Q-6, Q-7, Q-9, Q-12, Q-15, Q-19, Q-21, Q-22 | determined (unchanged) | `question-status.json` |
| Q-1, Q-2, Q-8, Q-10, Q-11, Q-13, Q-16, Q-17, Q-18, Q-24, Q-27 | filed (unchanged): P0086; P0079 / P0094; P0082 / P0097; P0099; P0100; P0072 / P0076 / P0089 / P0101; P0095; DRA262608-0071 / -0072; P0079 / P0094; P0090; P0113 | earlier batches' drafts and `dedupe.txt` |
| Q-20 | not reached (unchanged): the notification prompt never appeared (TC-211 Blocked, R3); no Q1 row | `question-status.json` |

## eBug drafts
`ebugs/2026-11-26-q1/20261126_eBug_drafts_Video-Enhance-Q1_16.9.0.md`: 2 entries, both BugBelong PM, Class UX, S2:
ISS-VEA-58 「No rule for what play does at the end of the selection」 (Q-28) and ISS-VEA-59 「No GenAI consent or
disclosure before the first upload after a reset」 (Q-14, PM / Legal; log excerpt attached, no tokens). Format check 0
errors, 1 warning (ISS-VEA-59's Repro starts with clearing the app data, not 「Launch the APP」). `verify_ebug_drafts.py`
still flags `[AIAgent][UX]` and the long Spec Link sheet names, as on the accepted 2026-11-25 batch (the 2026-11-11 PM-UX
rule postdates it). Dedupe (Android pool, 214 candidates, 65 open on 16.9.0, plus 「consent」 / 「GenAI」 / 「disclosure」 /
「ByteDance」 searches): no same-OS ticket (`dedupe.txt`; DRA262611P0230 related, not the same). Review page
`ebugs/2026-11-26-q1/20261126_eBug_review_Video-Enhance-Q1_16.9.0.html` (TR261123-0070 prefilled: confirm).

## Observations
O-1 「No Internet Connection」 on the Sign In page after the first Chrome sign-in while online (parked I-004);
O-2 Demo subtitle still AI Reframe's (known, P0086); O-3 TC-351's precondition says ◆ 1, ve-000100-720p30 bills 2
(KF-001): fix the row at the next draft; O-4 Recent task lists only this install's tasks (KF-009).

## Rows to change at the next draft
TC-350 and TC-351 Expected Results (record → PM's rulings once given); TC-351 precondition 「Enhance ◆ 1」 → ◆ 2 or
ve-clean-noaudio-000100-720p30.

## Coverage
This run alone: controls 4 pressed, 50 n/a, 74 not pressed in Q1; arrows 0 of 35 (a 2-row question round).

## Time and usage
Wall 15 min, test 15 min, no idle (`run-log.ts time`). Usage readings are the orchestrator's (`runs/usage.jsonl`).

## Knowledge
Parked I-004 (product inbox): sign-in after `pm clear` on 2611231 and the first-launch screens. KP-093 (sign-in after
`pm clear` on Stage), KF-001, KF-009, KP-068 (lapsed Pro), KP-073 held. No entry was contradicted.
