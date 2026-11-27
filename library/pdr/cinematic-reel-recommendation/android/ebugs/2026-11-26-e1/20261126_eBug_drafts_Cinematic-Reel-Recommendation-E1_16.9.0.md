# Cinematic Reel Recommendation — photo tips (Android) — eBug drafts, entry round E1, PDR-A 16.9.0 build 2611251

**Source:** pdr-spec-casebook run `library/pdr/cinematic-reel-recommendation/android/runs/2026-11-26-e1-entries/` — entry round E1 (TC-080 – TC-099: the Launcher entry and the UI pass of the AI Magic tab, Editor Global Toolbar, Photo Toolbar and PIP Photo Toolbar entries), 2026-11-26 16:16 → 17:30 (UTC+8) on Sony XQ-BT52 (Xperia 10 III) / adb HQ61563393, Android 12, build 16.9.0 (2611251, Google Play internal track), Stage server, Pro account (credits 2362 → 2074: six Micro Cinema reels × 48). Tally: 12 Pass, 8 Fail (all `question`).

**Status:** filed 2026-11-27 on TR261125-0064 over the API: ISS-CRA-06 → DRA262611P0359. Not filed (same-OS duplicates of the AIGC Watermark E1 batch): ISS-CRA-05 = DRA262611P0341. See `filed_bugcodes.md`. No existing ticket commented on. OS Language still to set on the web form.

Filed by: ETHAN_HSU on 2026-11-27

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line, an image on every entry, no video). Both entries are open questions filed to PM for a decision on how the app should behave, so both are `[AIAgent][UX]`, BugBelong PM (AGENTS.md 2026-11-11). Entry 2 carries a short log excerpt showing the task runs on after system Back; entry 1 has no failure and no log.

**What is drafted:** 2 entries (Q-8 and Q-9 merged: TC-092, TC-096; Q-10: TC-082, TC-083, TC-087, TC-091, TC-095, TC-099).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-CRA-05 — Photo and PIP Photo toolbars show Cinematic Reel Creator as a first-layer button, not under 「Effects」 as the toolbar sheet places it  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-092, TC-096  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Open questions Q-8 (Photo Toolbar) and Q-9 (PIP Photo Toolbar) filed to PM for a decision. The product team's toolbar sheet, newest tab 「2026/11 Auto Reframe」, lists Cinematic Reel Creator under Photo Toolbar › Effects and PIP Photo Toolbar › Effects (7/E), after Mosaic, Filter, Effects, Effect Overlay, Body effects. On the build, with the main-track photo (TC-092) or the overlay photo (TC-096) selected, 「Effects」 opens Auto Mosaic (Pro), Filter, Effects, Effect Overlay, Body Effects only, and 「Cinematic Reel Creator」 is the 2nd first-layer button after Split (Photo: Split, Cinematic Reel Creator, Duration, Transform, Effects, Adjust, Background, Enhance, Tools, Duplicate, Mask, Portrait; PIP Photo adds Motion). The first-layer button was added for DRA262608-0041 (closed, 16.6.0, 「Add Cinematic Reel Creator entry to the Photo/Photo PiP toolbar」; RD: 「Add entries to tool menu」), which did not say where. The rest of each Section ran through that button: it opens the same template page as the Launcher, brings nothing of the selected photo in, Add Media opens as from the Launcher, the reel is not added to the project, and ‹ / system Back return to the editor with the photo still selected (the rest of Q-8 / Q-9 is determined). PM to say which place is right; either the sheet or the build changes. No log: nothing failed.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Timeline (Photo/PIP Photo): Cinematic Reel Creator is on the first layer, not under Effects
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Open a project with a photo on the main track and a photo on an overlay track
3. Tap the photo on the main track
4. Tap 「Effects」 on the toolbar
5. Close the Effects menu
6. Scroll the toolbar back to its start
7. Tap the photo on the overlay track
8. Tap 「Effects」 on the toolbar

Result:
Effects has no Cinematic Reel Creator; it is a first-layer button after Split.
摘要：相片的 Effects 選單沒有 Cinematic Reel Creator，它在工具列第一層。
{16.9.0_cra05_photo_effects_menu.jpg} {16.9.0_cra05_photo_toolbar_first_layer.jpg} {16.9.0_cra05_pip_photo_effects_menu.jpg}

Expect Result:
PM to decide its place: the toolbar sheet lists it under Effects.
摘要：請 PM 決定位置；工具列表格把它放在 Effects 底下。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Related: open questions Q-8 (Photo Toolbar) and Q-9 (PIP Photo Toolbar); same on the overlay photo (step 8); the button was added for DRA262608-0041 (closed), which did not name a place. From that button the template page opens as from the Launcher and the selected photo is not brought in.
Spec Link: PowerDirector toolbar sheet, tab 「2026/11 Auto Reframe」, Photo Toolbar and PIP Photo Toolbar, Effects column (Cinematic Reel Creator 7/E) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_Cinematic-Reel-Recommendation-E1_16.9.0_images/01_ISS-CRA-05/`

---

## 2. ISS-CRA-06 — System Back while a reel is made, and on its result page, has no drawn behaviour: the app returns to the preview with 「Generate」 active while the task runs on  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-082, TC-083, TC-087, TC-091, TC-095, TC-099  ·  **Reproduce:** 6/6  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Open question Q-10 filed to PM for a decision. The Design draws only 「View later」 (arrow 111-17798, to the recent tasks) and 「Create another one」 (111-21605) on Analyzing & Generating, and the result page's own buttons after 「View」 (111-23476); no ‹ or system Back on either page. On the build, the same from every entry (Launcher, AI Magic tab, Editor Global Toolbar, Photo Toolbar, PIP Photo Toolbar): system Back during the upload spinner over the preview (TC-082) or on Analyzing & Generating (TC-087, TC-091, TC-095, TC-099; 2–3 s after 「Generate」) returns to the preview with the photo kept and 「Generate ◆ 48」 active; no dialog and no word that the reel is still being made. The task runs on (task list 「Micro Cinema 0N」 Processing…, then 「View」) and is charged once, 48 credits, each time; a second tap on 「Generate」 there would start and charge a second reel. System Back on the result page goes to the task list (TC-083 and the four entry rows); ‹ on the task list goes to the preview, then the template page, then the entry the page was opened from. Nothing crashed. PM to decide what Back should do while the reel is made (keep it running and leave to the task list or the template page, warn, or cancel with a refund) and where Back on the result page leads.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Cinematic Reel Creator: Back while generating returns to the preview; the task keeps running
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Cinematic Reel Creator」 on the Launcher
3. Swipe the template cards to the 「Micro Cinema」 card
4. Tap 「Import a photo」
5. Tap a photo
6. Tap 「Generate」
7. Press system Back while 「Analyzing & Generating…」 shows
8. Tap the history icon
9. Wait until the new task shows 「View」
10. Tap 「View」
11. Press system Back

Result:
Back returns to the preview with Generate active and no message; the task runs on, charged.
摘要：生成中按返回鍵回到預覽頁、無提示，任務仍在背景進行並扣點。
{16.9.0_cra06_analyzing_before_back.jpg} {16.9.0_cra06_preview_after_back.jpg} {16.9.0_cra06_task_still_processing.jpg} {16.9.0_cra06_result_back_to_task_list.jpg}
{16.9.0_cra06_back_task_continues_log.txt}

Expect Result:
PM to decide what Back does while generating and on the result page; no spec draws it.
摘要：請 PM 決定生成中與結果頁按返回鍵的行為；規格未畫。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Related: open question Q-10 (leaving during and after a generation); Back on the result page (step 11) returns to the task list; the Design draws only 「View later」 and 「Create another one」 on Analyzing & Generating; the same from the AI Magic tab, the editor's Global Toolbar AI Magic and the Photo and PIP Photo toolbar buttons; Back during the upload spinner (before Analyzing & Generating shows) also stays on the preview.
Spec Link: Cinematic Reel Creator Design spec (CineStory), Analyzing & Generating 「View later」 to recent tasks arrow -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-17798
Spec Link: Cinematic Reel Creator Design spec (CineStory), recent task 「View」 to result page arrow -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-23476
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_Cinematic-Reel-Recommendation-E1_16.9.0_images/02_ISS-CRA-06/`

---

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| O-1 | Task names are 「Micro Cinema 01, 02 …」, not 「Micro Cinema <MMDD>」 as TC-081 words it | The row's wording came from exploration notes, no spec rule: table wording to fix at the next draft. |
| O-2 | During TC-085 the app opened the finished TC-081 reel's result page (deep link from the completion notification) | Idling on the template page while another reel finished, the notification was posted and the app stayed put: most likely a run gesture hit the heads-up banner. Not an app defect unless seen again. |

## Reconciliation

| Item | Result | Became |
|---|---|---|
| TC-092 | Fail (question), Q-8 | ISS-CRA-05 |
| TC-096 | Fail (question), Q-9 | ISS-CRA-05 (merged) |
| TC-082 | Fail (question), Q-10 | ISS-CRA-06 |
| TC-083 | Fail (question), Q-10 | ISS-CRA-06 (merged) |
| TC-087 | Fail (question), Q-10 | ISS-CRA-06 (merged) |
| TC-091 | Fail (question), Q-10 | ISS-CRA-06 (merged) |
| TC-095 | Fail (question), Q-10 | ISS-CRA-06 (merged) |
| TC-099 | Fail (question), Q-10 | ISS-CRA-06 (merged) |
| O-1 | observation | not raised (above) |
| O-2 | observation | not raised (above) |

8 failed rows + 2 observations → 2 entries + 2 not raised.
