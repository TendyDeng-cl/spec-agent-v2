# AI Video Enhance (Android) — eBug drafts, round R4, PDR-A 16.9.0 build 2611251

**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-26-r4-full/` — round R4 (table Android v16, draft 20261126-170000, 246 rows), 2026-11-26 16:10 → 2026-11-27 04:18 on Samsung SM-A5360 (Galaxy A53 5G) / Android 15, build 16.9.0.2611251 (CL_Deluxe.16.9.0.2611251_DRA261109-01_R8, SR DRA261109-01), Stage server, account cltqauiap2@gmail.com (Pro test subscription on the Play test sheet).

**TR:** TR261125-0064 (header 「16.9.0.2611251 (Deluxe)」, re-read before filing).

**Status:** filed 2026-11-27 on TR261125-0064 over the API, template Generic v16.9 (23176): ISS-VEA-60 → DRA262611P0338, ISS-VEA-61 → DRA262611P0339, ISS-VEA-62 → DRA262611P0340. They replace DRA262611P0335 – P0337, filed earlier that day into 「AIFound eBugs pool」 by mistake and cancelled by the user. See `filed_bugcodes.md`. No existing ticket commented on.

Filed by: ETHAN_HSU on 2026-11-27

Rules: casebook overlay (one action per Repro step, a Spec Link with its URL on its own line, an image on every entry, the log on failure-related entries, no video); Design links only from 「AI Video Enhance_26.09_v2」 (REQ-010).

**What is drafted:** 3 entries for failures new in R4 (2 RD, 1 PM). Every other R4 failure sits on an Android ticket (`dedupe.txt`). Deduped against the whole Android pool on 2026-11-27 (218 tickets, `dedupe-query.txt`).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-VEA-60 — The Mode bubble reads 「up to 8 min」 / 「up to 2:30」, not the redrawn 「up to 08:00」 / 「up to 02:30」  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-035, TC-354, TC-360, TC-367  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** The Design board 3300:32003 (「AI Video Enhance」, section AI Video Enhance_26.09_v2) was redrawn on 2026-11-26: its Mode bubble now reads 「Standard: Great quality · up to 08:00」 / 「Professional: Maximum detail · up to 02:30」 (Figma change check 2026-11-26, `figma-text-diff.json`). R3 passed TC-035 against the old wording. On 2611251 the ⓘ next to 「Mode」 (iv_mode_info) shows bubbleMessage 「•  Standard: Great quality · up to 8 min •  Professional: Maximum detail · up to 2:30」 from the Launcher (TC-035, ve-023001-1080p30), the AI Magic tab (TC-354), the main-track clip toolbar (TC-360) and the PIP Video toolbar (TC-367). Text rule: the Design states the text and the app differs → RD. PM 1002 / PM 9/29 wording is older and loses (TC-035 Notes). No log cause (text).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Mode bubble reads 「up to 8 min」 / 「up to 2:30」, not 「up to 08:00」 / 「up to 02:30」
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Enhance」 on the Launcher
3. Tap 「Try It Now」 on the Demo page
4. Tap a 2:30 1080p video in Add Media
5. Tap ⓘ next to 「Mode」
6. Check the result

Result:
The bubble reads 「… up to 8 min」 and 「… up to 2:30」, from every entry.
摘要：Mode 泡泡顯示「up to 8 min」/「up to 2:30」，各入口皆同。
{16.9.0_vea60_mode_bubble_launcher.jpg} {16.9.0_vea60_mode_bubble_ai_magic.jpg}

Expect Result:
The bubble reads 「Standard: Great quality · up to 08:00」 / 「Professional: Maximum detail · up to 02:30」.
摘要：泡泡應為「up to 08:00」與「up to 02:30」，依 Design。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), AI Video Enhance board (Mode ⓘ bubble, redrawn 2026-11-26) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3300-32003
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Video-Enhance-R4_16.9.0_images/01_ISS-VEA-60/`

---

## 2. ISS-VEA-61 — System Back does nothing on the 「Turn on notifications」 dialog  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-211  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** **Open question Q-20 filed to PM for a decision** (`[AIAgent][UX]`, BugBelong PM). The dialog is PM-only (PM §4.2 step 6 / §9, arrow 397-1241; no Design frame), and no source gives Android's system Back on it; Q-20's assumption is that it takes the safe answer like 「Later」. On 2611251 the dialog showed for the first time in this table's runs (R3: never shown, DRA262611P0232, now fixed): second reset (pm clear 19:46:13), notifications off (phone-settings.ts), 3.2 s 720p clip, 「Enhance ◆ 4」 at 19:48:01; after the upload 「Turn on notifications」 / 「We'll let you know when it's done.」 / 「Turn On」 / 「Later」. System Back by Appium (19:49:1x) and by adb KEYCODE_BACK (19:49:2x): the dialog stayed, the activity stayed VideoEnhanceSetupActivity, nothing changed. Every other screen of the feature closes or asks on Back (TC-200 – TC-205, TC-212, TC-213 pass), so the dialog is the only one Back cannot leave. Its wrongness hangs on Q-20 (a dialog may be meant to force a choice), so it goes to PM rather than RD. Log: `16.9.0_vea61_back_log.txt` (window add / remove lines, no tokens).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] AI Video Enhance: System Back does nothing on the 「Turn on notifications」 dialog
```

**Description:**

```
Repro Steps:
1. Launch the APP (app data cleared, PowerDirector notifications off)
2. Sign in with the Google button
3. Tap 「Video Enhance」 on the Launcher
4. Tap a 3 s 720p video in Add Media
5. Tap 「Enhance」
6. Wait until 「Turn on notifications」 shows
7. Press system Back
8. Press system Back again
9. Check the result

Result:
The dialog stays open after each Back; only 「Turn On」 or 「Later」 closes it.
摘要：「Turn on notifications」對話框按系統返回鍵沒有反應，只能點「Turn On」或「Later」關閉。
{16.9.0_vea61_dialog_before_back.jpg} {16.9.0_vea61_dialog_after_back.jpg} {16.9.0_vea61_back_log.txt}

Expect Result:
PM to decide what system Back does on this dialog; assumed: it closes it like 「Later」 (Q-20).
摘要：請 PM 決定此對話框按系統返回鍵的行為；目前假設應與「Later」相同（關閉）。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance PM spec, 主線 - 選片到拿到成品 board (§4.2 step 6 / §9, arrow 397-1241: notification prompt after the first upload; no Back rule, Q-20) -
https://www.figma.com/design/mppB4GYkuVMVvHrdBeSAAU/AI-Video-Enhance?node-id=397-1241
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Video-Enhance-R4_16.9.0_images/02_ISS-VEA-61/`

---

## 3. ISS-VEA-62 — 「Selected Length」 has no ⓘ on a video within the Mode limit  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-354, TC-360, TC-367, TC-033, TC-259 (O-10)  ·  **Reproduce:** 5/5  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-020 (Design ds-main-flow VE · 01 / VE · 02, drawn with a 01:30 video, 「00:00/01:30」 and 「Selected Length」 「01:30」) shows 「Selected Length ⓘ」 on the panel, and R-024 says that ⓘ opens the 「Max 8 minutes. Drag to choose which part.」 bubble again. On 2611251 the panel draws the ⓘ (iv_selected_length_info) only for a video longer than the Mode limit (ve-1230-1080p30: present, TC-031 Pass); for ve-0030-1080p30 (00:30) from the AI Magic tab, the main-track and the PIP Video toolbar (TC-354, TC-360, TC-367 step 1) and for ve-023001-1080p30 (02:30, TC-033, TC-259) there is no ⓘ element, so the bubble cannot be reopened. Seen also in R3 but not recorded then (no row pressed it on a short video). Reviewer: if the Design's VE · 01 frame is judged a long-video example only, change Owner to PM and Type to UX (a decision), or drop it. No log cause (layout).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: 「Selected Length」 has no ⓘ on a video within the Mode limit
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap the AI Magic tab
3. Tap 「Video Enhance」
4. Tap a 00:30 1080p video in Add Media
5. Look next to 「Selected Length」
6. Check the result

Result:
No ⓘ next to 「Selected Length」 for a 00:30 or 02:30 video; a 12:30 video's panel has it.
摘要：00:30 或 02:30 的影片在「Selected Length」旁沒有 ⓘ，只有 12:30 的影片才有。
{16.9.0_vea62_no_info_0030.jpg} {16.9.0_vea62_info_on_1230.jpg}

Expect Result:
「Selected Length ⓘ」 shows on every panel, and the ⓘ opens its bubble, as the Design draws.
摘要：每個面板的「Selected Length」旁都應有 ⓘ，點擊可再次顯示說明泡泡。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 01: 「Selected Length ⓘ」 on a 01:30 video) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-13054
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Video-Enhance-R4_16.9.0_images/03_ISS-VEA-62/`

---

## Already filed on Android (dedupe.txt only, not drafted)

Every other R4 failure repeats an Android ticket; the list with rows is `dedupe.txt`. Highlights for the reviewer:

- TC-112 (01:30 1080p, 92.5 MB, 「22%」 → 「82%」 in 52 min, never finished) and O-8 (ring at 100% while S3 still uploads): DRA262611P0236 (Assigned; its Note already lists the 92.5 MB upload failing after 26 min on 2611091).
- TC-371 – TC-374 (Preview frame stays on 00:00 for the whole knob drag): DRA262611P0208 (knob lag, Assigned) / P0113 (Q-27). Q-34 itself (slow opening from Add Media) was not reproduced.
- TC-144 / TC-355 / TC-361 / TC-368 「Manage」 = select + Delete only: DRA262611P0097, closed by PM: a ruling, cited.
- TC-141 / O-9 / O-20 (‹ on the Recent task that opens by itself goes to the Launcher): DRA262611P0081 (TRCreated, fixed in 2611251 for the panel's icon path only; TC-140 / TC-208 pass). The auto-opened path still fails: for the P0081 verify on 2611251, not a new ticket.
- TC-260 / TC-353 / TC-358 / TC-365 (a whole 00:01 / 00:30 video shows 「Selected Length」 「00:02」 / 「00:31」): DRA262611P0076 (Assigned). New symptom on 2611251: the P0075 fix rounds the shown length up, so the padded track length now shows too. The reviewer may prefer a separate ticket for the display; it is listed here because the cause is P0076's.

## Not filed (observations of the run)

- **O-24 (TC-229): Save Result on a Result still loading saved nothing.** Held for a recheck: logcat has a toast call at 22:38:59.56, right after the tap, that the screenshot did not catch, and the `DownloadUriTask` 「URI is not absolute」 exception (22:38:57.7) came before the tap. Seen once in 7 4K results; the reopened Result saved normally.
- O-11 floating 「Enhance」 CTA over the fps chip row at rest: the panel scrolls under a floating CTA; chips are reached by scrolling (an unintended charge in the run came from tapping by element id, not by sight).
- O-14 / O-27 the Demo page stays off after `pm clear` once 「Don't show again」 was saved: no spec rule on where the setting is kept (DRA262611P0088 closed by PM for TC-013); knowledge.
- O-16 / O-29 a second task waits at 「0%」 while a left upload still runs; Leave on it leaves a Retry card: consequence of the upload going on after Leave, DRA262611P0094.
- O-21 Save Result writes a new copy per tap, no auto-save at Done: the DRA262611P0098 fix as designed.
- O-1, O-2, O-3, O-4, O-5, O-6, O-7, O-12, O-13, O-15, O-17 – O-19, O-22, O-23, O-25, O-26, O-28: fixes, knowledge, recipes or account state (report.md).

## Reconciliation against the run

246 rows: 141 Pass, 94 Fail (50 defect, 44 question), 11 Blocked; 29 observations.

| Item | Rows | Became |
|---|---|---|
| Mode bubble wording | TC-035, TC-354, TC-360, TC-367 | 1. ISS-VEA-60 (RD, UI) |
| Q-20 Back on the notification prompt | TC-211 | 2. ISS-VEA-61 (PM, UX) |
| No ⓘ next to Selected Length within the limit | TC-354, TC-360, TC-367 step 1; O-10 | 3. ISS-VEA-62 (RD, UI) |
| Every other failure | 88 rows | existing tickets (`dedupe.txt`) |
| O-24 | TC-229 | held for a recheck (above) |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-002 | Fail | defect | dedupe DRA262611P0071 |
| TC-011 | Fail | defect | dedupe DRA262611P0086 (Q-1) |
| TC-201 | Fail | defect | cited DRA242410-0142 (Q-9 ruling) |
| TC-021 | Fail | question | cited DRA242410-0142 (Q-9 ruling) |
| TC-371 | Fail | question | dedupe DRA262611P0208 / P0113 (Q-27; Q-34 not reproduced) |
| TC-315 | Fail | question | dedupe DRA262611P0233 |
| TC-316 | Fail | question | dedupe DRA262611P0234 |
| TC-317 | Fail | question | dedupe DRA262611P0235 |
| TC-022 | Fail | defect | dedupe DRA262611P0101 (8K) / P0089 (under 1 s, MKV) |
| TC-013 | Fail | question | cited DRA262611P0088 (PM, Close) |
| TC-351 | Fail | question | dedupe DRA262611P0326 (Q-14) |
| TC-259 | Fail | question | dedupe DRA262611P0117 |
| TC-035 | Fail | defect | ISS-VEA-60 |
| TC-037 | Fail | defect | dedupe DRA262611P0092 |
| TC-350 | Fail | question | cited DRA262611P0325 (Q-28, Cancelled by PM) |
| TC-270 | Fail | defect | dedupe DRA262611P0076 |
| TC-042 | Fail | question | dedupe DRA262611P0113 (Q-27) |
| TC-214 | Fail | question | dedupe DRA262611P0113 (Q-27) |
| TC-043 | Fail | question | dedupe DRA262611P0091 |
| TC-215 | Fail | question | dedupe DRA262611P0208 (Q-27) |
| TC-044 | Fail | question | dedupe DRA262611P0113 (Q-27) |
| TC-216 | Fail | question | dedupe DRA262611P0113 (Q-27) |
| TC-272 | Fail | question | dedupe DRA262611P0113 (Q-27) |
| TC-045 | Fail | question | dedupe DRA262611P0090 (Q-24) |
| TC-264 | Fail | question | dedupe DRA262611P0090 (Q-24) |
| TC-052 | Fail | defect | dedupe DRA262611P0115 |
| TC-260 | Fail | defect | dedupe DRA262611P0076 (shown length, new symptom) |
| TC-269 | Fail | defect | dedupe DRA262611P0089 / P0076 |
| TC-096 | Blocked | test-data | not filed: Blocked low balance |
| TC-320 | Blocked | test-data | not filed: Blocked low balance |
| TC-207 | Blocked | test-data | not filed: Blocked low balance |
| TC-098 | Blocked | test-data | not filed: Blocked low balance |
| TC-100 | Fail | defect | dedupe DRA262611P0077 |
| TC-110 | Fail | defect | dedupe DRA262611P0078 |
| TC-112 | Fail | defect | dedupe DRA262611P0236 |
| TC-115 | Fail | question | dedupe DRA262611P0079 (Q-18) |
| TC-211 | Fail | question | ISS-VEA-61 (Q-20) |
| TC-133 | Fail | question | dedupe DRA262611P0095 (Q-16) |
| TC-141 | Fail | defect | dedupe DRA262611P0081 (auto-opened path) |
| TC-152 | Fail | defect | cited DRA262611P0096 (PM, Cancelled) |
| TC-144 | Fail | defect | cited DRA262611P0097 (PM, Close; Q-8) |
| TC-265 | Fail | defect | dedupe DRA262611P0084 |
| TC-266 | Fail | defect | dedupe DRA262611P0084 |
| TC-267 | Fail | defect | dedupe DRA262611P0084 |
| TC-268 | Blocked | test-data | not filed: Blocked test-data (no task 2 days old) |
| TC-170 | Blocked | observability | not filed: Blocked observability (no server fault switch) |
| TC-171 | Blocked | observability | not filed: Blocked observability (no server fault switch) |
| TC-210 | Blocked | observability | not filed: Blocked observability (no server fault switch) |
| TC-173 | Blocked | observability | not filed: Blocked observability (no server fault switch) |
| TC-174 | Blocked | observability | not filed: Blocked observability (no server fault switch) |
| TC-223 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-225 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-224 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-226 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-221 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-227 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-228 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-222 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-229 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-230 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-220 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-231 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-232 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-233 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-234 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-235 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-236 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-237 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-238 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-219 | Fail | defect | dedupe DRA262611P0084, P0116; cited P0096 |
| TC-239 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-240 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-241 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-242 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-243 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-244 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-245 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-246 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-247 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-248 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-249 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-250 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-251 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-252 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-253 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-254 | Fail | question | cited DRA262611P0096; dedupe DRA262611P0116 |
| TC-161 | Fail | question | dedupe DRA262611P0099 (Q-10) |
| TC-162 | Fail | question | dedupe DRA262611P0100 (Q-11) |
| TC-165 | Fail | question | dedupe DRA262611P0100 (Q-11) |
| TC-352 | Blocked | test-data | not filed: Blocked test-data (Demo page off, O-27) |
| TC-372 | Fail | question | dedupe DRA262611P0208 (Q-27; Q-34 not reproduced) |
| TC-353 | Fail | defect | dedupe DRA262611P0076 |
| TC-354 | Fail | defect | ISS-VEA-60; ISS-VEA-62 (step 1) |
| TC-355 | Fail | defect | dedupe DRA262611P0092, P0113 / P0208; cited P0097 |
| TC-356 | Fail | defect | cited DRA262611P0096 |
| TC-358 | Fail | defect | dedupe DRA262611P0076 |
| TC-373 | Fail | question | dedupe DRA262611P0208 (Q-27; Q-34 not reproduced) |
| TC-360 | Fail | defect | ISS-VEA-60; ISS-VEA-62 (step 1) |
| TC-361 | Fail | defect | dedupe DRA262611P0092, P0113 / P0208; cited P0097 |
| TC-362 | Fail | defect | dedupe DRA262611P0100 (Q-11); cited P0096 |
| TC-374 | Fail | question | dedupe DRA262611P0208 (Q-27; Q-34 not reproduced) |
| TC-365 | Fail | defect | dedupe DRA262611P0076 |
| TC-367 | Fail | defect | ISS-VEA-60; ISS-VEA-62 (step 1) |
| TC-368 | Fail | defect | dedupe DRA262611P0092, P0113 / P0208; cited P0097 |
| TC-369 | Fail | defect | dedupe DRA262611P0100 (Q-11 / Q-30); cited P0096 |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1, 3 |
| PM | 2 |

### Filing order

1, 2, 3 (ISS-VEA-60, ISS-VEA-61, ISS-VEA-62). File only once the TR for build 2611251 is known.
