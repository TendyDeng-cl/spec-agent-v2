# Batch Editing (Android) — eBug drafts, run R4 (table v9, full run), PhotoDirector 20.19.0 build v202611181947 (90201901)

**Source:** spec-casebook run `library/phd/batch-editing/android/runs/2026-11-20-r4/` — phase R4 of draft `drafts/20261118-101500` (approved table v9, all 177 rows), 2026-11-20 on Samsung Galaxy S23 (SM-S9110, Android 16) through Appium / UiAutomator2, Test Server, Premium through the debug switch (Free for R4-g and TC-173). Build 20.19.0.v202611181947, SR PHA261029-01, TR261118-0070. Tally: 153 Pass, 14 Fail, 10 Blocked, 0 Not run.

**Status:** nothing filed, uploaded or commented. Filing defaults from the newest filed batch (2026-11-17-tr261113-0038, `ebug-defaults.ts`): Creator WILLY_WU, [AIAgent], API; TRCode TR261118-0070 (the build these findings were verified on; the previous batch was on TR261113-0038). All for the reviewer to confirm. Dedupe is read-only, Android pool only (dedupe per OS): see `dedupe.txt`.

Rules: reviewer rules — one action per Repro step, a Spec Link on every entry (URL on its own line), at least one image per entry, no video; no failure-related entry, so no log. Open questions the run cannot settle go to PM (BugBelong PM) as `[AIAgent][UX]` (user-experience decisions). Feature name `Batch_Editing:` (REQ-008). Spec basis check (REQ-055) done per entry.

**What is drafted:** 3 PM decisions (ISS-BEA-21…23: rows new or changed in v9 and the 2026-11-18 Design board) from 5 Fail rows. 7 Fail rows repeat open Android tickets (P0061, P0121–P0124) and are only in `dedupe.txt`; 2 are held (ISS-BEA-18 by the user; TC-151 a table question). Release-note fixes hold: P0120 (TC-162 / TC-164 Pass), P0125 (no crash); P0057–P0060 Pass too.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate · Owner: RD / PM.

---

## 1. ISS-BEA-21 — PM decision: the batch Adjustment room has no 「AI Exposure」, which every Design Adjustment frame draws and PM DR-06 leaves out (Q-18)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-070, TC-172, TC-173  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.v202611181947 (90201901)

> **QA note — not pasted into eBug.** R4 (TR261118-0070, 20.19.0.v202611181947), TC-070 Premium, TC-172 step 2 Premium, TC-173 Free (「Set to subscriber」 off, Mine 「Upgrade to Premium!」): the Light row has no 「AI Exposure」, so there is no Try it / Upgrade to VIP dialog to check. Q-18 is open: PM DR-06 (pm-ui-4 「不出現 AI Exposure」) against every Design Adjustment frame; the table follows the Design (REQ-020, Design first) and the build follows PM. Same build behaviour as R3 (rows new or changed in v9, so not raised before). No ruling or ticket answers it (P0120–P0125, P0057–P0061 checked). Filed to PM as UX (scope decision).

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Batch_Editing: Adjustment room has no AI Exposure, which the Design draws
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap Edit on the Launcher
3. Tap Batch
4. Select 12 photos
5. Tap Next
6. Tap Adjustments
7. Tap Light
8. Check the tool row after Exposure

Result:
The Light row has no 「AI Exposure」 (Exposure is followed by Contrast), for Premium and Free users.
摘要：Light 工具列沒有 AI Exposure，Premium 與 Free 皆同。
{20.19.0_bea21_adjust_light_row_no_ai_exposure.jpg}

Expect Result:
PM to decide: Design shows 「AI Exposure」 between Exposure and Contrast; PM DR-06 says none (Q-18).
摘要：請 PM 決定：Design 有 AI Exposure，PM DR-06 寫不出現（Q-18）。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: open question Q-18; the Design was taken first (REQ-020) but the build follows PM DR-06
Spec Link: Batch Edit Design Figma, adjust frame (Batch Edit Room › Adjustment, Light row with 「AI Exposure」 between 「Exposure」 and 「Contrast」) -
https://www.figma.com/design/qZXJfrM5gb5g4tFoCIS1YU/Batch-Edit?node-id=41-923
Spec Link: Batch Editing PM Figma, pm-ui-4 board (Batch Edit Room · Adjustment · default, DR-06: 不出現 AI Exposure) -
https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id=16-13767
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Batch-Edit-R4_20.19.0_images/01_ISS-BEA-21/`

---

## 2. ISS-BEA-22 — PM decision: 「All」 after 「Auto」 runs Auto again on every photo instead of copying photo 1's values  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-174  ·  **Reproduce:** 1/1  ·  **Verified on:** 20.19.0.v202611181947 (90201901)

> **QA note — not pasted into eBug.** R4-d TC-174 (new in v9): fresh room, 「Auto」 on photo 1 (Exposure 「-0.43」, Contrast 「0」, Highlights 「30」), 「All」: toast 「Applied to 11 photos」, every thumbnail changed, but photo 3 reads Exposure 「0.55」 / Highlights 「49」 (darker photo brighter, others darker): Auto is re-run per photo. Per-photo Auto is a reasonable design, so a PM decision, not a defect. Not in any existing Android ticket. Reviewer: the red box on each image is the slider value of the selected tool; check it still sits on the number.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Batch_Editing: 「All」 after Auto re-runs Auto on each photo instead of copying the values
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap Edit on the Launcher
3. Tap Batch
4. Select 12 photos
5. Tap Next
6. Tap Adjustments
7. Tap Auto
8. Check the Exposure value
9. Tap All
10. Tap photo 3's thumbnail
11. Tap Highlights
12. Check the value

Result:
After Auto photo 1 reads Exposure -0.43; after 「All」 photo 3 reads Exposure 0.55: Auto ran again on it.
摘要：第 1 張 Auto 後為 -0.43；按 All 後第 3 張為 0.55，是各自重算 Auto。
{20.19.0_bea22_adjust_auto_photo1_values.jpg} {20.19.0_bea22_adjust_all_after_auto_photo3_values.jpg}

Expect Result:
PM to decide: should 「All」 copy photo 1's Auto values (R-092) or run Auto on each photo (R-240)?
摘要：請 PM 決定：All 複製第 1 張的數值，或每張各自重算 Auto？

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: photo 1 Highlights 30 vs photo 3 Highlights 49; the toast reads 「Applied to 11 photos」
Spec Link: Batch Editing PM Figma, pm-flow-2 board (Adjustment flow, 「Auto」 then Apply to all) -
https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id=16-9281
Spec Link: Batch Editing PM Figma, pm-ui-4 board (Batch Edit Room · Adjustment · applied, DR-04: Apply to all copies this room's settings) -
https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id=16-13767
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Batch-Edit-R4_20.19.0_images/02_ISS-BEA-22/`

---

## 3. ISS-BEA-23 — PM decision: the Launcher Features grid has no 「Batch Edit」 shortcut, which the Design Launcher board draws (Q-15)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-022  ·  **Reproduce:** 1/1  ·  **Verified on:** 20.19.0.v202611181947 (90201901)

> **QA note — not pasted into eBug.** R4-a TC-022 (row changed in v9 after the Design Launcher board 225:3699 was read on 2026-11-18, REQ-019). Features pager, 2 pages of 8, no 「Batch Edit」. The PM side is split: pm-flow-1 has an 「Entry: Launcher › Batch Editing shortcut」 flow while D0-04 says the name appears only in the two pickers, and the UI UX flow says the icon is still to be designed; so the gap may be intended for this version. Filed to PM (scope, Q-15); the Design-first rule makes it the table's expectation, not an RD defect.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Batch_Editing: Launcher Features grid has no Batch Edit shortcut drawn by the Design
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Check the Features grid on the Launcher
3. Swipe the Features grid left
4. Check the second page

Result:
No 「Batch Edit」 shortcut on either page; 「AI Removal」 and 「Beautify」 sit next to each other in row 2.
摘要：Features 兩頁都沒有 Batch Edit 捷徑；第二列 AI Removal 與 Beautify 相鄰。
{20.19.0_bea23_launcher_features_no_batch_edit.jpg} {20.19.0_bea23_launcher_features_page2_no_batch_edit.jpg}

Expect Result:
PM to decide whether this version has the Design's 「Batch Edit」 shortcut (PM D0-04: pickers only; Q-15).
摘要：請 PM 決定本版是否加入 Design 畫的 Batch Edit 捷徑（Q-15）。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: the Design draws it between 「AI Removal」 and 「Beautify」; the release notes of this build do not mention it
Spec Link: Batch Edit Design Figma, launcher · Light · orange · rest frame (Launcher Features grid with 「Batch Edit」) -
https://www.figma.com/design/qZXJfrM5gb5g4tFoCIS1YU/Batch-Edit?node-id=225-3699
Spec Link: Batch Editing PM Figma, pm-flow-1 board (Entry: Launcher › Batch Editing shortcut; D0-04 名稱只出現在兩個 Picker) -
https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id=16-9281
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Batch-Edit-R4_20.19.0_images/03_ISS-BEA-23/`

---

## Already filed — repeats of existing Android tickets (not drafted; `dedupe.txt`)

| Case | Ticket |
|---|---|
| TC-012 | PHA262026P0061 (Assigned) |
| TC-062 | PHA262026P0121 (NewCreated, PM) |
| TC-076 | PHA262026P0121 (NewCreated, PM) |
| TC-049 | PHA262026P0122 (NewCreated, PM; the 2560 px copy is in its Note, its Expect asks for the range from the original) |
| TC-057 | PHA262026P0122 (range) and PHA262026P0123 (width-only toast) (NewCreated, PM) |
| TC-058 | PHA262026P0122 (NewCreated, PM) |
| TC-135 | PHA262026P0124 (NewCreated, PM) |

## Held (not on the review page)

| Case | Finding | Why held |
|---|---|---|
| TC-128 | ISS-BEA-18 | Q-20: 「Saved 12 photos」 vs Design 「Save 12 photos」; held by the user 2026-11-17, same on this build |
| TC-151 | table question for the user | Q-13 ruling 「上面expand會打開相簿選擇畫面」: the album selection opens from the top 「▼」 album tab; the row and R-233 read it as the tile's expand icon, which opens the photo viewer |

## Not raised (observations, for the record)

| Observation | Note |
|---|---|
| O-1 | AI Enhance confirmation restyled with pill buttons as the Design draws it (release note 「banner style」); 「Discard changes?」 keeps the old flat style; for Design/PM, not raised. |
| O-2 | 20-photo AI Enhance took ≈ 150 s on Test Server (R3 100 s), one photo 10.04 s; Test Server timings are not an SLA (KP-070); not raised. |

## Reconciliation against the run (Fail rows)

| Case | Result | Where |
|---|---|---|
| TC-151 | Fail question | held: table question for the user |
| TC-012 | Fail defect | dedupe.txt (PHA262026P0061 (Assigned)) |
| TC-022 | Fail question | F-3 ISS-BEA-23 |
| TC-062 | Fail question | dedupe.txt (PHA262026P0121 (NewCreated, PM)) |
| TC-049 | Fail question | dedupe.txt (PHA262026P0122 (NewCreated, PM; the 2560 px copy is in its Note, its Expect asks for the range from the original)) |
| TC-057 | Fail question | dedupe.txt (PHA262026P0122 (range) and PHA262026P0123 (width-only toast) (NewCreated, PM)) |
| TC-058 | Fail question | dedupe.txt (PHA262026P0122 (NewCreated, PM)) |
| TC-070 | Fail question | F-1 ISS-BEA-21 |
| TC-172 | Fail question | F-1 ISS-BEA-21 |
| TC-173 | Fail question | F-1 ISS-BEA-21 |
| TC-174 | Fail question | F-2 ISS-BEA-22 |
| TC-076 | Fail question | dedupe.txt (PHA262026P0121 (NewCreated, PM)) |
| TC-128 | Fail question | held: ISS-BEA-18 |
| TC-135 | Fail question | dedupe.txt (PHA262026P0124 (NewCreated, PM)) |

Blocked rows (no verdict, not drafted): TC-152 (observability), TC-096 (observability), TC-101 (observability), TC-102 (observability), TC-160 (observability), TC-103 (observability), TC-104 (observability), TC-105 (observability), TC-109 (observability), TC-136 (test-data).
