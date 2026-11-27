# AI Video Enhance (Android) — eBug drafts, open questions flagged to-file (Q-14, Q-21), PDR-A 16.9.0 build 2611231

**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-24-r3-full/` — round R3 (table v11), 2026-11-24 17:44 → 2026-11-25 05:28 on Samsung SM-A5360 (Galaxy A53 5G) / Android 15, build 2611231, TR261123-0070 (SR DRA261109-01), Stage server, account cltqauiap2@gmail.com, fresh install. No new device work: every statement below is from that run's records (`results.csv`, `screenshots/`, `recordings/`, `logs/`).

**Status:** nothing filed, uploaded or commented. This batch is only the two Open questions `question-status.json` flags `to-file` after R3 (spec-casebook `ebugs.md` step 1, *No question is left open by a completed run*): Q-21 is drafted for the part TC-215 recorded (entry 1); Q-14 is not drafted, because the run holds no observation and no image of the first upload (see *Not drafted: needs a device check*). The review page prefills the filing account from the newest filed batch (`ebug-defaults.ts pdr/video-enhance android`).

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link on its own line and an image on every entry, no video). Owner and type: an open question the run cannot settle goes to PM (BugBelong PM); a user-experience decision is `[AIAgent][UX]` (AGENTS.md 2026-11-11). Severity proposed as 2, as for the earlier Video Enhance batches.

**What is drafted:** 1 entry, a PM question (Q-21). Deduped against the whole Android pool on 2026-11-25 (`dedupe.txt`): no same-OS ticket covers it.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## Withdrawn 2026-11-25 (not an entry): ISS-VEA-57 — The Design draws a playhead on the strip but no rule says how far it may be dragged or whether play starts from it (Q-21)  ·  Class: UX  ·  Severity: S2  ·  Owner: PM

> **Withdrawn, not to be filed.** The user ruled on Q-21 on 2026-11-25 (REQ-044): the playhead can be dragged only between the two white trim handles, and play starts from where the playhead is. The question is answered, so nothing goes to PM; the rule becomes rows in the next draft. The text below is kept for the record only.

**Report step:** TC-215  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** **Open question Q-21 filed to PM for a decision** (a user-experience decision: `[AIAgent][UX]`, BugBelong PM, AGENTS.md 2026-11-11; the reviewer's Type UX on the review page is the UX check). Q-21 (requirements.md): 「the Design draws a playhead on the strip (a line, a time bubble and a ◀▶ knob) but no note says how far it may be dragged (only inside the selection, or the whole video) or whether play starts from it」; the table's assumption: 「dragging it scrubs the Preview inside the selection and changes neither the selection nor the price」 (R-192, R-193). **What R3 recorded (TC-215, 16.9.0.2611231, ve-1230-1080p30, selection 00:00–08:00, 「Enhance ◆ 960」):** one continuous touch on the knob, right to about 03:00, back to about 01:00, two more swings, let go at about 02:00 (recording `recordings/TC-215-drag.mp4`, 52 frames, table `recordings/TC-215-frames/table.txt`): the Preview time follows the knob in every frame (00:22 … 03:00, 01:00, 「02:00/12:30」 at the end); 「Selected Length」 「08:00」, both handles and 「Enhance ◆ 960」 never change. So the assumption holds inside the selection. **What R3 did not record, and the entry therefore states as the decision, not as a result:** the knob was never dragged past a trim handle (every position in TC-215 is inside 00:00–08:00), and no row pressed play with the playhead moved to the middle of the selection. Nearby records, not the same check: TC-273 dragged the playhead onto each handle to read the frame there (never beyond it); TC-037 step 1 played with the playhead at the selection end and play jumped to the selection start (O-2), and its pause at 「02:11」 was not followed by a second play. Both unobserved points are listed under *Not drafted: needs a device check* as an optional check before filing; the question stands without it, since the spec has no rule either way. Not part of this entry: the Preview frame lagging behind the knob in the same recording (Q-27: DRA262611P0113 and DRA262611P0208, `dedupe.txt` of the R3 batch) and the missing Preview time at rest in the first image (DRA262611P0074). Images are the run's own TC-215-step1.png and TC-215-end.png, red-boxed (`generators/images.py`).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] AI Video Enhance: No rule for how far the playhead may be dragged or where play starts
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap a 12:30 1080p video in Add Media
4. Drag the ◀▶ knob under the 「00:00」 bubble right to about 03:00
5. Without letting go, drag the knob left to about 01:00
6. Let go of the knob at about 02:00
7. Check the result

Result:
Inside the 00:00–08:00 selection the knob scrubs the Preview time (「02:00/12:30」); 「08:00」 and 「Enhance 960」 stay.
摘要：在選取範圍內拖曳播放頭只會改變預覽時間，選取長度與點數價格不變；規格未定義其可拖曳範圍。
{16.9.0_vea57_playhead_at_start.jpg} {16.9.0_vea57_playhead_at_0200.jpg}

Expect Result:
PM to decide: may the playhead leave the selection (or reach the whole video), and does play start from it (Q-21)?
摘要：請 PM 決定播放頭可拖曳的範圍（僅選取範圍內或整段影片），以及播放是否從播放頭位置開始。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), AI Video Enhance (settings) board (Length: playhead line, time bubble and ◀▶ knob drawn, no note on its range or on play, Q-21) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3300-32003
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Video-Enhance-Questions_16.9.0_images/01_ISS-VEA-57/`

---

## Not drafted: needs a device check

| Question | Why it is not drafted | The check to run (16.9.0, Android) | What to capture |
|---|---|---|---|
| Q-14 Disclosure: is the existing GenAI consent dialog (covering the ByteDance cloud) shown before the first upload (PM Open question 3, Legal; PM 「Gaps & Open questions」 board 369:442) | R3 holds no observation and no image of it. No row asserts the dialog; the run's first upload (first 「Create session」 in logcat at 20:26:12, the first of TC-121's three short tasks, after TC-013's `pm clear` at 18:34 and a fresh install at the run start) has no record of what was shown between the tap on 「Enhance」 and the processing dialog, and no screenshot of that moment. TC-110 (「no confirmation; the processing dialog covered the panel at once」, 20:40) was a later upload, so it does not say what the first one shows. An entry would have to state a Result nobody recorded. | 1. Reset the app to first use (`pm clear`, or the fresh install the TR build already needs), keep the Stage config. 2. Get past 「Get Started」 and sign in with the phone's Google account. 3. Tap 「Video Enhance」 on the Launcher. 4. Pick a short video in Add Media (a 3 s 720p clip, ◆ 4, keeps the cost low). 5. Start a screen recording. 6. Tap 「Enhance」. 7. Watch until the processing dialog 「Video uploading...」 or any consent / disclosure dialog shows. 8. Stop the recording. 9. Repeat steps 3–8 once more on the same install (second upload). If the account has uploaded before (cltqauiap2 has), also note that a consent kept on the server side for the account would not show again: say so, or use an account that never used a GenAI feature. | Screenshot and page source of whatever shows right after the tap on 「Enhance」 on the first upload (the consent dialog with its exact text and buttons, or the processing dialog with none), the recording, the logcat slice from the tap to 「Create session: start」, and the same for the second upload. Then draft the PM entry (Legal question): Result = dialog shown with its text / not shown; Expect = PM and Legal to decide whether the existing GenAI consent dialog must show before the first upload and with what wording. |
| Q-21, the two unobserved points (optional before filing entry 1; the entry does not claim them) | TC-215 kept the knob inside the selection, and no row played from a moved playhead. | Panel with ve-1230-1080p30 (12:30), Standard. 1. Drag the right handle left until 「Selected Length」 reads 「02:00」 (selection 00:00–02:00). 2. Start a screen recording. 3. Drag the ◀▶ knob right past the right handle as far as it goes. 4. Let go. 5. Drag the knob to about 01:00. 6. Tap play. 7. Tap pause after about 3 s. 8. Stop the recording. | Where the knob and the bubble stop in step 3 (at the handle, or beyond it, with the Preview time and the burned-in frame time), whether the selection, 「Selected Length」 and the price change, and the Preview time at which play starts in step 6 (from 01:00 or from the selection start). Add the outcome to entry 1's Result before filing. |

## Already filed on Android (dedupe.txt only, not drafted)

None for these two questions. The Preview frame lag seen in TC-215's recording is Q-27, already on DRA262611P0113 and DRA262611P0208, and the missing Preview time at rest is DRA262611P0074 (both in the R3 batch's `dedupe.txt`); neither is Q-21.

## Reconciliation against the run

This batch does not re-map R3's rows (the R3 batch `ebugs/2026-11-24-r3/` maps all 120 Fail, 9 Blocked and 16 observations). It maps the two Open questions `question-status.json` flags `to-file`: 2 questions − 1 not drafted (Q-14, no observation or image in the run) = 1 entry.

### Row-by-row map

| Item | Rows | State after R3 | Became |
|---|---|---|---|
| Q-21 | TC-215 (Fail, question; its fail is DRA262611P0074 and Q-27, not Q-21) | to-file | 1. ISS-VEA-57 (PM, the recorded part as the Result, the unobserved part as the decision) |
| Q-14 | none (no row asserts it) | to-file | not drafted: needs a device check (first upload on a fresh install) |

### Owner split

| Owner | Entries |
|---|---|
| RD | — |
| PM | 1 |

### Filing order

1 (ISS-VEA-57). Q-14 follows in a later batch once its device check is recorded.
