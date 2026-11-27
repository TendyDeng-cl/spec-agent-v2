# Cinematic Reel Recommendation — photo tips (Android) — eBug drafts, question round Q1, PDR-A 16.9.0 build 2611231

**Source:** pdr-spec-casebook run `library/pdr/cinematic-reel-recommendation/android/runs/2026-11-26-q1-questions/` — question round Q1 (TC-077, TC-079, TC-078, the rows observing Q-3 and Q-4), 2026-11-26 10:40 → 10:50 (UTC+8) on Samsung SM-A5360 (Galaxy A53 5G) / adb R5CTB22S05Y, build 16.9.0 (2611231), Stage server, Pro account (credits 29801, none spent). Tally: 3 Fail (all `question`).

**Status:** filed 2026-11-26 on TR261123-0070 over the API: ISS-CRA-04 → DRA262611P0321. ISS-CRA-03 held (user ruling). See `filed_bugcodes.md`. No existing ticket commented on.

Filed by: ETHAN_HSU on 2026-11-26

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line, an image on every entry, no video). Both entries are open questions filed to PM for a decision about how the sheet behaves, so both are `[AIAgent][UX]`, BugBelong PM (AGENTS.md 2026-11-11). Entry 2 is about pictures that never load, so it carries the offline log excerpt; entry 1 has no failure and no log.

**What is drafted:** 2 entries (Q-3: TC-077; Q-4: TC-078 and TC-079 merged).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-CRA-03 — The photo tips sheet also closes on a tap on the dim and on a swipe down, which the Design does not draw  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-077  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-3). R-010 rests on the Design's 0820 add photo tips board, which draws only 「Got it」 as the way to close the sheet and says nothing of an outside tap or a swipe. On the build: a tap on the dimmed template page above the sheet (540,500 px) closed it and nothing behind the dim reacted (page stayed on 「Micro Cinema」); a downward swipe that started on the first sentence made the sheet follow the finger and close (recording sampled at 4 fps, attached as a still strip, not as video); no spring-back. System Back closing the sheet is already determined (TC-020 Pass, R1). Standard Android bottom-sheet behaviour, so the likely answer is 「keep it」; PM to confirm or rule it out. No log: nothing failed.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Cinematic Reel Creator: Photo tips sheet closes on a tap outside it and on a swipe down
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Cinematic Reel Creator」 on the Launcher
3. Swipe the template cards to the 「Micro Cinema」 card
4. Tap 「View photo tips」 on that card
5. Tap the dimmed template page above the sheet
6. Tap 「View photo tips」 on the same card again
7. Swipe the sheet down, starting on its first sentence

Result:
Step 5 closes the sheet (nothing behind the dim reacts); step 7 drags the sheet down and closes it.
摘要：點面板外的暗區或向下滑動面板都會關閉拍照建議面板；Design 只畫了「Got it」。
{16.9.0_cra03_sheet_dim_area.jpg} {16.9.0_cra03_closed_after_dim_tap.jpg} {16.9.0_cra03_swipe_down_frames.jpg}

Expect Result:
PM to decide whether a tap on the dim and a swipe down may close the sheet; the Design draws only 「Got it」 to close it.
摘要：請 PM 決定點暗區與向下滑動是否可關閉面板；Design 只以「Got it」關閉。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android
Related: open question Q-3 (Closing); system Back also closes the sheet like 「Got it」 (confirmed in the earlier run).
Spec Link: Cinematic Reel Creator Design spec (CineStory), 0820 add photo tips board (sheet with 「Got it」 only) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_Cinematic-Reel-Recommendation-Q1_16.9.0_images/01_ISS-CRA-03/`

---

## 2. ISS-CRA-04 — Offline, photo tips sheets show empty picture boxes with no message  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-079, TC-078  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-4, offline half). R-014 (Jira PDRA-661 「from CMS (同I2V開法)」, CMS field recommend_samples) says the items come from the server; no spec says what the template page, the chip or the sheet show without it. TC-079 (sheet loaded online, Wi-Fi off): Micro Cinema reopened complete (pictures kept); Time Lapse, not opened since the launch, opened with its sentence and five captions but four empty dark picture boxes with only the ✓ / ✕ badges; 「Extreme Close-up」 showed (same picture as Micro Cinema's). TC-078 (app started with Wi-Fi off): the template page opened with all six cards and chips (still pictures instead of the videos, credit pill 「--」); Horror Movie's sheet showed 「People in Frame」 and 「Layered Depth」 as empty boxes, its Avoid items (shared with Micro Cinema) with pictures. No message, retry or spinner in any case; nothing crashed; back online every picture loads (TC-079 step 9, TC-078 step 8 Pass). The template page and the chip themselves come up complete from data kept on the phone, so they need no decision. The other half of Q-4 (a template with no recommend_samples) cannot be set up by QA: asked in the Expect without a Result of its own. Log: every network call fails (ExoPlayer source error, CreditSystemManager IOException) and no line is logged for the picture loads; excerpt attached, checked for keys. The credit pill staying 「--」 after reconnecting is O-1, not this ticket.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Cinematic Reel Creator: Offline, photo tips sheets show empty picture boxes with no message
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Cinematic Reel Creator」 on the Launcher
3. Turn Wi-Fi off (no mobile data)
4. Swipe the template cards to the 「Time Lapse」 card
5. Tap 「View photo tips」 on that card

Result:
The sheet shows its sentence and captions, but the pictures not loaded before stay empty boxes; no message or retry.
摘要：離線時，未載入過的拍照建議圖片只顯示空白框，沒有任何提示或重試。
{16.9.0_cra04_time_lapse_offline.jpg} {16.9.0_cra04_horror_movie_cold_offline.jpg} {16.9.0_cra04_time_lapse_back_online.jpg}
{16.9.0_cra04_offline_log.txt}

Expect Result:
PM to decide what a sheet shows when its pictures cannot load, and when a template has no recommend_samples in the CMS.
摘要：請 PM 決定圖片無法載入時，以及範本在 CMS 沒有 recommend_samples 時，面板應顯示什麼。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android
Related: open question Q-4 (Missing data); started offline, Horror Movie's 「People in Frame」 and 「Layered Depth」 also stay empty; back online every picture loads.
Spec Link: Jira PDRA-661 description (recommendations from the CMS, 「from CMS」) -
https://cyberlinkcorp.atlassian.net/browse/PDRA-661
Spec Link: Cinematic Reel Creator Design spec (CineStory), 0820 add photo tips board (sheet with every picture) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_Cinematic-Reel-Recommendation-Q1_16.9.0_images/02_ISS-CRA-04/`

---

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| O-1 | Credit pill stays 「--」 after an offline launch, until the app is relaunched online | Off this feature's spec (shared credit pill). Closest same-OS ticket DRA262610P0166 (closed, 「Credit balance shows "--" after the app is restarted」, 16.8.0), a different trigger. Left for the user to decide whether to file. |

## Reconciliation

| Item | Result | Became |
|---|---|---|
| TC-077 | Fail (question), Q-3 | ISS-CRA-03 |
| TC-079 | Fail (question), Q-4 | ISS-CRA-04 |
| TC-078 | Fail (question), Q-4 | ISS-CRA-04 (merged) |
| O-1 | observation | not raised (above) |

3 failed rows + 1 observation → 2 entries + 1 not raised.
