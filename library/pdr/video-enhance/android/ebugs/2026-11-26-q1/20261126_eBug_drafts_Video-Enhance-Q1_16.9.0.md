# AI Video Enhance (Android) — eBug drafts, question round Q1 (Q-28, Q-14), PDR-A 16.9.0 build 2611231

**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-26-q1-questions/` — phase Q1 (draft 20261125-190000, segment Q1-a), 2026-11-26 12:06 → 12:21 on Samsung SM-A5360 (Galaxy A53 5G) / Android 15, build 16.9.0.2611231 (the R3 build, TR261123-0070), Stage server, account cltqauiap2@gmail.com (Pro test subscription bought on the Play test sheet at 12:12).

**Status:** filed 2026-11-26 on TR261123-0070 over the API: ISS-VEA-58 → DRA262611P0325, ISS-VEA-59 → DRA262611P0326. See `filed_bugcodes.md`. No existing ticket commented on.

Filed by: ETHAN_HSU on 2026-11-26

Rules: casebook overlay (one action per Repro step, a Spec Link on its own line, an image on every entry, no video); Design links only from 「AI Video Enhance_26.09_v2」 (REQ-010).

**What is drafted:** 2 entries, both PM. Deduped against the whole Android pool on 2026-11-26 (`dedupe.txt`).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-VEA-58 — No rule says what play does at the end of the selection: it stops at the right trim handle and the next play starts from the selection start  ·  Class: UX  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-350  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** **Open question Q-28 filed to PM for a decision** (`[AIAgent][UX]`, BugBelong PM). Q-28 (requirements.md, REQ-044 / REQ-045): the ruling on Q-21 (2026-11-25) says play starts from the playhead and the playhead stays between the trim handles, but no source (Design 「AI Video Enhance_26.09_v2」, PM, the ruling) says what playback does on reaching the right handle. **TC-350 on 2611231** (ve-1230-1080p30, 12:30, time burned into every frame; selection 00:30–02:00, 「Selected Length」 「01:30」; recording `recordings/TC-350-play.mp4`, `TC-350-replay.mp4`, 1 fps samples `recordings/tc350/montage2.png`): knob dragged to 「01:50」 (frame 3303, 00:01:50.1); play ran 01:50 → 02:00 with ‖ shown, Preview time, bubble and playhead together; at the handle it stopped by itself on 「02:01/12:30」 (frame 3639, 00:02:01.3: the hand-set handle sits at 120.x s, KF-011), no jump back, no loop, never past the handle; ▶ shown again; 20 s later still at the handle. The next tap on ▶ played from the selection start 「00:30」, not from 01:50 where play began nor from the playhead's resting place at the handle. Handles and 「Selected Length」 never changed. The restart from 00:30 is consistent with the ruling only if a playhead resting on the right handle counts as "at the end" (TC-037 step 1 / R3 O-2 saw the same jump with the playhead at the selection end; DRA262611P0230, play doing nothing there, looks fixed). Not this entry: the Preview lag while dragging (Q-27, DRA262611P0113 / P0208) and the missing Preview time at rest (DRA262611P0074). The run was on a Free account (the panel's play needs no tier).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] AI Video Enhance: No rule for what play does at the end of the selection
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap a 12:30 1080p video in Add Media
4. Drag the left trim handle to 00:30
5. Drag the right trim handle to 02:00
6. Drag the ◀▶ knob to 01:50
7. Tap play under the Preview
8. Wait 30 seconds
9. Tap play under the Preview again
10. Check the result

Result:
Play stops by itself at the right handle (「02:01/12:30」) and stays there; the next play starts from 00:30.
摘要：播放到右側裁剪把手會自動停止並停在把手處；再按播放會從選取起點 00:30 開始，而非停住的位置。
{16.9.0_vea58_playhead_0150_before_play.jpg} {16.9.0_vea58_stopped_at_right_handle.jpg} {16.9.0_vea58_next_play_from_0030.jpg}

Expect Result:
PM to decide what play does at the right trim handle (stop, jump back or loop) and where the next play starts (Q-28).
摘要：請 PM 決定播放到右側裁剪把手時的行為（停止、跳回或循環），以及再次播放的起點。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), AI Video Enhance (settings) board (Length: playhead and play button drawn, no note on play at the selection's end, Q-28) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3300-32003
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_Video-Enhance-Q1_16.9.0_images/01_ISS-VEA-58/`

---

## 2. ISS-VEA-59 — No GenAI consent or disclosure shows before the first upload to the cloud after a reset  ·  Class: UX  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-351  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** **Open question Q-14 filed to PM / Legal for a decision** (`[AIAgent][UX]`, BugBelong PM). PM 「Gaps & Open questions」 board (369:442) item 3: 「揭露法遵措辭（沿用既有 GenAI 同意 dialog，待確認涵蓋 ByteDance 上雲）— Legal」; the Design routing (R-080) says that with enough credits 「Enhance」 starts at once with no extra confirmation, and no source says whether the GenAI consent dialog must show or what it reads. **TC-351 on 2611231:** logs pulled, `adb shell pm clear` at 12:13:13 (Stage kept), then every screen since the reset: 「Welcome to PowerDirector」 (「By proceeding, I accept the Terms of Service and Privacy Policy.」, box pre-ticked, 「Get Started」); the system notification prompt; 「Use credits to enjoy AI features」 (Pro bonus); Google sign-in via Chrome, then 「Account Sign In / Credits & cloud AI tasks on this device will be stored under your account when you sign in」 「Got it」; the Video Enhance Demo page; 「File access permission is required」 and the system media dialogs. None mentions AI processing in the cloud or a third party. First 「Enhance」 (ve-000100-720p30, 「Enhance ◆ 2」) at 12:18:53: 12 rapid screencaps show the panel and then 「0% Video uploading... / Please keep the app open / Cancel」 directly; create session 12:18:56, S3 upload 12:18:58 → 12:19:14, Done 12:20:10; 2 credits (29372 → 29370). Caveat stated to PM: the account had run Enhance before this reset (R1–R3), so a consent kept with the account cannot be ruled out; an account that never used a GenAI feature was not available. No other upload after a reset was ever seen with a dialog either (R1–R3, KP-093 resets). Log: `16.9.0_vea59_first_upload_log.txt` (no tokens).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] AI Video Enhance: No GenAI consent or disclosure before the first upload after a reset
```

**Description:**

```
Repro Steps:
1. Clear PowerDirector's app data (the account had used AI Video Enhance before)
2. Launch the APP
3. Tap 「Get Started」
4. Sign in with the Google button
5. Tap 「Video Enhance」 on the Launcher
6. Tap 「Try It Now」
7. Tap a 1 s 720p video in Add Media
8. Tap 「Enhance」
9. Check the result

Result:
「Video uploading...」 shows at once; no screen since the reset says a third party's cloud processes the video.
摘要：重置後第一次按 Enhance 直接進入上傳，重置以來沒有任何畫面告知影片會上傳至第三方雲端做 AI 處理。
{16.9.0_vea59_panel_before_enhance.jpg} {16.9.0_vea59_upload_dialog_no_consent.jpg} {16.9.0_vea59_first_launch_terms_only.jpg} {16.9.0_vea59_first_upload_log.txt}

Expect Result:
PM and Legal to decide if the GenAI consent dialog (ByteDance cloud) shows before the first upload, and its text (Q-14).
摘要：請 PM 與法務決定第一次上傳前是否須顯示 GenAI 同意 dialog（涵蓋 ByteDance 上雲）及其文案。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance PM spec (Spec - Video Enhance with Byteplus), Gaps & Open questions board (item 3: disclosure wording, existing GenAI consent dialog, ByteDance cloud, Legal; Q-14) -
https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance?node-id=369-442
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_Video-Enhance-Q1_16.9.0_images/02_ISS-VEA-59/`

---

## Already filed on Android (dedupe.txt only, not drafted)

None for these two questions (see `dedupe.txt`).

## Not filed (observations of the run)

- O-1 「No Internet Connection」 on the Sign In page after the first Chrome sign-in, while online; the second try signed in. Seen once, outside Video Enhance, no log cause: kept as an observation.
- O-2 Demo page subtitle still AI Reframe's: already known (R2 TC-011 / O-34; Q-1, DRA262611P0086).
- O-3 TC-351's precondition names 「Enhance ◆ 1」 for ve-000100-720p30, which bills 2 (KF-001): a row fix for the next draft, not a bug.
- O-4 Recent task lists only this install's tasks after the reset: KF-009, already known.

## Reconciliation against the run

2 rows run, 2 Fail (question), 0 Pass, 0 Blocked; 4 observations.

| Item | Rows | Became |
|---|---|---|
| Q-28 | TC-350 (Fail, question) | 1. ISS-VEA-58 (PM, UX) |
| Q-14 | TC-351 (Fail, question) | 2. ISS-VEA-59 (PM, UX) |
| O-1 – O-4 | TC-351 | not filed (above) |

### Owner split

| Owner | Entries |
|---|---|
| RD | — |
| PM | 2 |

### Filing order

1, 2.
