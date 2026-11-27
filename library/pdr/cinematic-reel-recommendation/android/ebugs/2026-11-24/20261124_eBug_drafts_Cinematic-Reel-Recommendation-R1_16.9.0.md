# Cinematic Reel Recommendation — photo tips (Android) — eBug drafts, round R1 (table v1), PDR-A 16.9.0 build 2611201

**Source:** pdr-spec-casebook run `library/pdr/cinematic-reel-recommendation/android/runs/2026-11-24-r1-full/` — round R1 of the approved v1 table (21 cases), 2026-11-24 11:03 → 11:50 (UTC+8) on Sony XQ-BT52 (Xperia 10 III) / Android 12, build 16.9.0 (2611201) from the Google Play internal test track, TR261123-0015, Stage server, account acda.test7 (Free). Tally: 12 Pass, 6 Fail (all `question`), 3 Blocked. No credits used (2424 at start and end).

**Filed by:** ETHAN_HSU on 2026-11-24 (IF3 API, TR261123-0015, attachments uploaded, read back): ISS-CRA-01 DRA262611P0289, ISS-CRA-02 DRA262611P0290. `filed_bugcodes.md`.

**Status:** filed 2026-11-24 (see Filed by); no existing ticket commented on. Dedupe against PowerDirector Mobile for Android over the whole pool (「Cinematic Reel」 75, 「photo tips」 0, 「Recommendation」 53, 「CineStory」 3 tickets read): no same-OS match (dedupe.txt).

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line and an image on every entry, no video). Both entries are open questions filed to PM for a decision (AGENTS.md 2026-11-11): entry 1 a user-experience problem (`[AIAgent][UX]`, BugBelong PM), entry 2 text the spec does not give (`[AIAgent][UI]`, BugBelong PM). Neither is failure-related (no failed generation, error, charge or refund; the sliced logs hold no failure line), so no log excerpt is attached. Severity proposed as 2, as for the earlier R1 batches.

**What is drafted:** 2 entries (TC-010 – TC-015 merged into one; O-3 with Q-2).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-CRA-01 — Add Media opened with 「Import a photo」 has no 「?」 that opens the photo tips  ·  Class: UX  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-010, TC-011, TC-012, TC-013, TC-014, TC-015  ·  **Reproduce:** 6/6  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-1), proposed Type UX (a PM decision on a user-experience problem: where the tips are reachable from, AGENTS.md 2026-11-11). R-004 rests on Jira PDRA-661 only: 「每個 template 會有 chip & media room "?" 都可以打開 recommendation page」. The Design 26.07_v2 (the frame PDRA-661 links) draws Add Media (107:2556) with ‹, 「Add Media」 and a camera button; its round/ic_info layer is hidden and no 「?」 is drawn; the template page's own 「?」 is the tutorial (arrow 230:4451). So the Jira and the Design disagree and the build follows the Design. Under Design first (AGENTS.md 2026-11-13) the Design would win unless the PM item is newer; the Jira (Alpha 2026-11-13) is likely newer than the 26.07_v2 frame, but the dates cannot settle it, hence PM. One finding, not six: on each of the six template cards 「Import a photo」 opened the same Add Media room (header ‹ top_toolbar_back, 「Add Media」, btn_camera; Photo switch with sort, 「All」 album, getty images | iStock (Pro), Pexels, grid); page source has no help/tip/info element; scrolling the grid shows nothing more. TC-016 (「Got it」 returns to Add Media) and TC-021 (system Back on the sheet in Add Media) are Blocked behind it and rerun once PM decides. O-1 (system Back from Add Media returns to the same card) and O-2 (Android Add Media opens on 「All」, no 「Recents」 tab: TC-016's wording for Android) are for the rerun, not this ticket. No log: a missing control, nothing failed.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Cinematic Reel Creator: Add Media opened from a template has no 「?」 for the photo tips
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Cinematic Reel Creator」 on the Launcher
3. Swipe the template cards to the 「Micro Cinema」 card
4. Tap 「Import a photo」 on that card
5. Check the Add Media header

Result:
Add Media shows only ‹, 「Add Media」 and the camera button; no 「?」 or other entry opens the photo tips sheet.
摘要：從範本進入的 Add Media 只有 ‹、標題與相機鈕，沒有可開啟拍照建議的「?」。
{16.9.0_cra01_add_media_header.jpg} {16.9.0_cra01_add_media_scrolled.jpg}

Expect Result:
PM to decide whether Add Media has a 「?」 that opens this template's photo tips, as Jira asks; the Design draws none.
摘要：請 PM 決定 Add Media 是否要有開啟該範本拍照建議的「?」（Jira 要求，Design 未畫）。
Spec string: 「每個 template 會有 chip & media room "?" 都可以打開 recommendation page」

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Jira PDRA-661 description (UI: the chip and the media room 「?」 both open the recommendation page) -
https://cyberlinkcorp.atlassian.net/browse/PDRA-661
Spec Link: Cinematic Reel Creator Design spec (CineStory, frame 26.07_v2), Add Media board (no 「?」 drawn, ic_info layer hidden) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=107-2556
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Cinematic-Reel-Recommendation-R1_16.9.0_images/01_ISS-CRA-01/`

---

## 2. ISS-CRA-02 — In 繁體中文 and 日本語 the photo tips chip and the sheet's first sentence stay English  ·  Class: UI  ·  Severity: S2  ·  Owner: PM

**Report step:** TC-017, TC-018, O-3  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-2), text → `[AIAgent][UI]`, BugBelong PM (the spec must supply the text: no sheet gives a translation of the chip or the sentence; AGENTS.md 2026-11-11, text rule). TC-017 / TC-018 passed as written (the template name follows the app language, R-015; the rest is recorded under Q-2), but the mixed screen is plainly visible: in 繁體中文 the chip reads 「View photo tips」 and the sheet 「For best results with the 微電影畫境 template, follow this advice:」, while the headings (「建議」 / 「避免使用」), captions (「中距離取景」, 「畫面視覺豐富」, 「平面單調構圖」, 「有明顯文字或 Logo」, 「過度近景」) and button (「瞭解」) are Chinese; in 日本語 the chip and the sentence (「For best results with the マイクロシネマ template, follow this advice:」) stay English while headings 「推奨」 / 「NG」, captions 「中距離の構図」, 「細部が多い」, 「平面的な構図」, 「文字またはロゴが見える」, 「超クローズアップ」 and 「OK」 are Japanese. The Japanese captions show although the CMS picture list's JP column is empty, so the app holds translations the spec does not list; PM to confirm them too. Language set with `launch --lang zh-Hant|ja` (system locale; Launcher read 「AI電影感運鏡」 / 「AI シネマ動画」), reset to en-US after. Seen only on the Micro Cinema card; the sentence frame and the chip are shared by all six cards. No log: text, nothing failed.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Photo tips chip and sheet sentence stay English in 繁中 and 日本語
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set the phone's system language to 中文（繁體）
3. Switch back to PowerDirector
4. Tap 「AI電影感運鏡」 on the Launcher
5. Swipe the template cards to the 「微電影畫境」 card
6. Tap 「View photo tips」 on that card
7. Check the result

Result:
The chip and the sheet's first sentence stay English while headings, captions and the button are localized (zh-TW, ja).
摘要：繁中與日文下，提示標籤與面板首句仍是英文，標題、說明與按鈕則已翻譯。
{16.9.0_cra02_zh_card_chip.jpg} {16.9.0_cra02_zh_sheet.jpg} {16.9.0_cra02_ja_card_chip.jpg} {16.9.0_cra02_ja_sheet.jpg}

Expect Result:
PM to supply the chip and sentence in each app language; no spec gives them, and the JP captions are not in the CMS.
摘要：請 PM 提供標籤與首句的各語系文字；規格未提供，日文說明亦不在 CMS。

[AI Recommendation]
Chip (zh-TW): 「查看拍攝建議」
Sentence (zh-TW): 「想讓「微電影畫境」範本效果最好，請參考以下建議：」
Chip (ja): 「撮影のヒント」
Sentence (ja): 「「マイクロシネマ」テンプレートで最適な結果を得るためのアドバイス：」

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Cinematic Reel Creator Design spec (CineStory, frame 26.07_v2), 0820 add photo tips board (chip and sentence drawn in English only) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162
Spec Link: Cinestory CMS, Recommendation tab (picture list: JP and EN columns empty) -
https://docs.google.com/spreadsheets/d/1XoLgFmZ4YGRPIcfG6xRTtx_3HJ63-Xo5O3uKFWJaRGI/edit?gid=1744053327#gid=1744053327
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Cinematic-Reel-Recommendation-R1_16.9.0_images/02_ISS-CRA-02/`

---

## Not raised (observations, for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| TC-019 | Blocked `observability`: the app logs no CMS recommend_samples / template data and its files are not readable over adb; both sheets shown matched the CMS Recommendation tab | No verdict; parked (needs: cms-log), not a finding. |
| TC-016 | Blocked `question`: no 「?」 in Add Media, so 「Got it」 there cannot be tested | Waits behind ISS-CRA-01 (Q-1); rerun once PM decides. |
| TC-021 | Blocked `question`: system Back on the sheet in Add Media cannot be tested | Waits behind ISS-CRA-01 (Q-1); rerun once PM decides. |
| O-1 | System Back from Add Media returns to the template page on the same card (6/6) | Expected behaviour; noted in ISS-CRA-01's QA note. |
| O-2 | Android Add Media opens on 「All」; there is no 「Recents」 tab | Wording for TC-016 on Android once Q-1 is decided; table update, not a bug. |
| O-4 | Switching the system locale to ja made Google Play show its restart dialog over the app | Tool / environment (Google Play), not PowerDirector; candidate quirk for knowledge intake. |

## Reconciliation against the run

6 Fail (all `question`), 3 Blocked, 4 observations (O-1 … O-4). 6 Fail rows → 1 entry (merged, one finding on six cards); O-3 with TC-017 / TC-018 (Pass under Q-2) → 1 entry; 3 Blocked and O-1, O-2, O-4 → not raised. Entries: 2.

### Delta

| Step | Count | Running total |
|---|---|---|
| Fail rows in the run | 6 | 6 |
| TC-010 – TC-015 merged into ISS-CRA-01 (one missing control on all six cards) | −5 | 1 |
| O-3 (TC-017 / TC-018 under Q-2) filed as ISS-CRA-02 | +1 | 2 |
| Blocked TC-016, TC-019, TC-021 and O-1, O-2, O-4 not raised | 0 | 2 |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-010 | Fail | question | 1. ISS-CRA-01 (PM decision, Q-1) |
| TC-011 | Fail | question | 1. ISS-CRA-01 (PM decision, Q-1) |
| TC-012 | Fail | question | 1. ISS-CRA-01 (PM decision, Q-1) |
| TC-013 | Fail | question | 1. ISS-CRA-01 (PM decision, Q-1) |
| TC-014 | Fail | question | 1. ISS-CRA-01 (PM decision, Q-1) |
| TC-015 | Fail | question | 1. ISS-CRA-01 (PM decision, Q-1) |
| TC-016 | Blocked | question | not raised (waits behind 1. ISS-CRA-01) |
| TC-021 | Blocked | question | not raised (waits behind 1. ISS-CRA-01) |
| TC-019 | Blocked | observability | not raised (no verdict; needs cms-log) |
| TC-017 | Pass | (Q-2 recorded) | 2. ISS-CRA-02 (PM decision, Q-2) |
| TC-018 | Pass | (Q-2 recorded) | 2. ISS-CRA-02 (PM decision, Q-2) |
| O-1 | observation | — | not raised |
| O-2 | observation | — | not raised (table wording) |
| O-3 | observation | — | 2. ISS-CRA-02 |
| O-4 | observation | — | not raised (tool / environment) |

### Owner split

| Owner | Entries |
|---|---|
| RD | — |
| PM | 1, 2 |

### Filing order

The PM decisions in step order (**1**, **2**). Nothing is filed until the review page's decisions come back.
