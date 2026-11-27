# Recent Task Model Info (Android) — eBug drafts, round R1 (table v3), PDR-A 16.9.0 build 2611251

**Source:** pdr-spec-casebook run `library/pdr/recent-task-model-info/android/runs/2026-11-26-r1-full/` — round R1 of the approved v3 table (128 rows, MUI aside), 2026-11-26 23:15 → 2026-11-27 02:18 (UTC+8) on Sony XQ-BT52 (Xperia 10 III) / Android 12, build 16.9.0 (2611251) from the Google Play internal test track, TR261125-0064, Stage server, account acda.test7 (Pro until 00:35, then Free). Tally: 78 Pass, 39 Fail (8 `defect`, 31 `question`), 11 Blocked. Credits 1505 → 218.

**Status:** filed 2026-11-27 on TR261125-0064 over the API: ISS-RTM-01 → DRA262611P0352, ISS-RTM-02 → DRA262611P0353, ISS-RTM-03 → DRA262611P0354, ISS-RTM-04 → DRA262611P0355, ISS-RTM-05 → DRA262611P0356, ISS-RTM-07 → DRA262611P0357, ISS-RTM-08 → DRA262611P0358. Not filed (same-OS duplicates of the AIGC Watermark E1 batch): ISS-RTM-06 = DRA262611P0345, ISS-RTM-09 = DRA262611P0350. See `filed_bugcodes.md`. No existing ticket commented on. OS Language still to set on the web form.

Filed by: ETHAN_HSU on 2026-11-27

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line and an image on every entry, no video). None is failure-related (no failed generation, error, charge or refund; the sliced logs hold no failure line), so no log excerpt is attached. Open questions are filed to PM (2026-11-11): `[AIAgent][UX]` for a user-experience decision, `[AIAgent][UI]` for text; defects go to RD.

**What is drafted:** 9 entries — 3 RD (1 UI, 2 Functional), 6 PM (5 UX, 1 UI).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD, PM or PC-Doc.

---

## 1. ISS-RTM-01 — In the light appearance the Image to Video Recent tasks stay dark, so the model tag is drawn as on the dark board  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-043  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-050 (Design 1006 · Add model information, Dark and Light boards). With the phone switched to light (`cmd uimode night no`), AI Magic › My Artwork turns light, but its Image to Video Recent page keeps the dark page, dark cards and the dark tag (dark-grey fill, light-grey text) instead of the Light board's light card and grey tag; the tags stay readable. Likely the whole Recent page ignores the light theme (not only the tag). Whether 2611201 did the same was not checked; filed as a visible defect either way. Phone restored to dark.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Recent task: Image to Video Recent page and model tag stay dark in light mode
```

**Description:**

```
Repro Steps:
1. Set the phone's appearance to Light
2. Launch the APP
3. Tap AI Magic on the bottom bar
4. Tap My Artwork
5. Tap Image to Video
6. Check the page and the model tags

Result:
My Artwork is light, but the Image to Video Recent page keeps the dark background, dark cards and dark model tags.
摘要：淺色模式下 My Artwork 變淺色，Image to Video 最近任務頁與標籤仍為深色。
{16.9.0_rtm01_i2v_recent_light.jpg} {16.9.0_rtm01_myartwork_light.jpg}

Expect Result:
In light mode the Recent page and cards are light and the tag is the Light board's grey filled tag.
摘要：淺色模式下最近任務頁與卡片應為淺色，model 標籤應如 Light 板的灰色實心標籤。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, 1006 · Add model information (I2V/T2V) frame, Light board -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3210
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/01_ISS-RTM-01/`

---

## 2. ISS-RTM-02 — Closing a Text to Image item opened from My Artwork returns to My Artwork, skipping the Text to Image list  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-076, TC-080  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-002 / R-070 and the Design's Text to Image path (My Artwork › Recent task › Preview page, 1794:3221). From My Artwork's Text to Image row the list opens; tapping an item opens its preview; X (iv_close) and system Back on the preview both go straight back to My Artwork instead of the list. Opened from the Text to Image tool's history icon instead, closing a preview returns to the list (O-10), so the My Artwork path is the odd one. Seen from Mine › My Artwork (TC-076) and Home ☰ › My Artwork (TC-080).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Recent task: Closing a Text to Image item from My Artwork skips the Text to Image list
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap AI Magic on the bottom bar
3. Tap My Artwork
4. Tap Text to Image
5. Tap the first image item
6. Tap X at the top left of the preview

Result:
The app returns to My Artwork, not to the Text to Image list the item was opened from. System Back does the same.
摘要：關閉預覽後回到 My Artwork，而不是開啟該項目的 Text to Image 列表；系統返回鍵亦同。
{16.9.0_rtm02_tti_preview.jpg} {16.9.0_rtm02_after_close.jpg}

Expect Result:
Closing the preview returns to the Text to Image list, as it does when the list is opened from the Text to Image tool.
摘要：關閉預覽應回到 Text to Image 列表（與從 Text to Image 工具開啟時相同）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, My Artwork › Recent task › Preview page path (Text to Image) -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3221
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/02_ISS-RTM-02/`

---

## 3. ISS-RTM-03 — After Generate in Text to Video, ‹ on the Recent tasks skips the Text to Video page  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-101, TC-123, TC-137  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-092 / R-096 / R-093 (the tool's Recent tasks, ‹ returns to the tool page). After Generate, Text to Video replaces its tool page with the Recent tasks, so ‹ leaves the tool altogether: to Home from the Home shortcut (TC-123) and from AI-Powered Creation (TC-137), to the editor from Editor › AI Magic (TC-101). Image to Video from the same entries keeps its tool page under the Recent tasks (TC-096, TC-118, TC-132), and Text to Video's Recent tasks opened later through the history icon return to the tool page normally. From AI Magic the same ‹ lands on AI Magic (TC-149). The prompt and settings on the tool page are lost with it.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Text to Video: ‹ on Recent tasks after Generate skips the Text to Video page
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap Text To Video in the Launcher's shortcuts
3. Type a short prompt
4. Tap the model row
5. Tap Wan 2.7
6. Tap Generate
7. Tap ‹ at the top left of the Recent tasks

Result:
The app goes back to the Launcher, skipping the Text to Video page. Image to Video returns to its tool page.
摘要：生成後在最近任務按 ‹ 直接回到 Launcher，略過 Text to Video 頁面。
{16.9.0_rtm03_t2v_recent.jpg} {16.9.0_rtm03_after_back.jpg}

Expect Result:
‹ on the Recent tasks returns to the Text to Video page, one step back, as in Image to Video.
摘要：在最近任務按 ‹ 應回到 Text to Video 頁面（返回上一層，同 Image to Video）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, Video board (Recent task opened from the tool, ‹ back) -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3214
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/03_ISS-RTM-03/`

---

## 4. ISS-RTM-04 — PM decision: system Back in Recent task edit mode leaves the page instead of closing edit mode (Q-5)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-045, TC-077, TC-081, TC-085, TC-089, TC-097, TC-102, TC-119, TC-124, TC-133, TC-138, TC-148, TC-152  ·  **Reproduce:** 13/13  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Q-5: the Design draws only 「Cancel」 in edit mode (1794:3217); the table assumed system Back acts like 「Cancel」 (R-070, QA's Android rule). On 2611251 system Back in edit mode, with a card ticked, leaves the whole Recent page (to My Artwork, the tool page, or the Launcher when the page came from a completion banner); nothing is deleted, and reopening the page shows the same cards and tags. Not plainly wrong (nothing lost), so it is a PM decision, `[UX]`.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Recent task: System Back in edit mode leaves the page, not just edit mode — PM to decide
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap AI Magic on the bottom bar
3. Tap My Artwork
4. Tap Image to Video
5. Tap Select
6. Tap the checkbox of the first card
7. Press the system Back key

Result:
The app leaves the Recent page and returns to My Artwork; edit mode is not closed first. Nothing is deleted.
摘要：編輯模式下按系統返回鍵直接離開最近任務頁回到 My Artwork，未先關閉編輯模式；未刪除任何任務。
{16.9.0_rtm04_edit_ticked.jpg} {16.9.0_rtm04_after_back.jpg}

Expect Result:
PM to decide what system Back does in edit mode. QA's assumption: it closes edit mode like 「Cancel」.
摘要：請 PM 決定編輯模式下系統返回鍵的行為；QA 假設等同「Cancel」。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, Video · 編輯模式 board (edit mode with Cancel only) -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3217
Related: Q-5
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/04_ISS-RTM-04/`

---

## 5. ISS-RTM-05 — PM decision: tapping the model tag opens the task's result, the Design draws the tag as a label  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-076, TC-080, TC-084, TC-088, TC-095, TC-100, TC-117, TC-122, TC-131, TC-136, TC-147, TC-151  ·  **Reproduce:** 12/12  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** The 1006 frame draws the model tag as a grey label under the task name, with no tap behaviour; the spec is silent on tapping it. On 2611251 the whole Recent task card is one tap target: the title, the empty area and the tag all open the task's result page, like 「View」 (O-11). The rows expected the tag to be inert; whether that is wanted is PM's call (a tag that looks like a filter chip may suggest filtering by model).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Recent task: Tapping the model tag opens the result page — PM to decide
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap AI Magic on the bottom bar
3. Tap My Artwork
4. Tap Image to Video
5. Tap the model tag of the first card
6. Check the screen

Result:
The task's result page opens, as with View. The whole card is one tap target.
摘要：點 model 標籤會開啟該任務的結果頁（同 View），整張卡片皆為點擊區。
{16.9.0_rtm05_recent_tag.jpg} {16.9.0_rtm05_after_tag_tap.jpg}

Expect Result:
PM to decide whether the model tag is tappable. The Design draws it as a label.
摘要：請 PM 決定 model 標籤是否可點；Design 畫為純標籤，QA 假設點擊無反應。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, 1006 · Add model information (I2V/T2V) frame (model tag) -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3210
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/05_ISS-RTM-05/`

---

## 6. ISS-RTM-06 — PM decision: returning from Text to Image to the editor clears the photo's selection (Q-10)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-109, TC-110, TC-113, TC-114  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Q-10 (toolbar sheet: Text to Image under Photo › Tools and PIP Photo › Tools). Opened from a selected photo (main track or overlay), Text to Image works and lists every Text to Image task of the account with no model tag; leaving it (X, ‹ or system Back, with or without a new image) returns to the editor with the clip no longer selected (global toolbar), the photo unchanged and nothing added (the import preview's 「Import 1 Image」 was never tapped). The rows assumed the photo stays selected; what a result should do to the selected photo is open (Q-10).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Text to Image (Photo Tools): Back to the editor clears the photo selection — PM to decide
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap the Project tab
3. Tap a project with a photo on the main track
4. Tap the photo on the timeline
5. Swipe the Photo toolbar left
6. Tap Tools
7. Tap Text to Image
8. Tap X at the top left
9. Check the editor's toolbar

Result:
The photo is no longer selected (global toolbar); it is unchanged and nothing is added.
摘要：從 Text to Image 返回編輯器後照片不再被選取（顯示全域工具列）；照片未變更、未新增素材；子母畫面照片亦同。
{16.9.0_rtm06_tti_recent.jpg} {16.9.0_rtm06_editor_unselected.jpg}

Expect Result:
PM to decide whether the photo stays selected on return and what a new image does to it.
摘要：請 PM 決定返回後照片是否保持選取，以及生成的圖片對該照片的作用；QA 假設照片保持選取且不變。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: PDRM Toolbar re-org sheet, newest dated tab (Photo and PIP Photo toolbars, Tools column) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit
Related: Q-10
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/06_ISS-RTM-06/`

---

## 7. ISS-RTM-07 — PM decision: PIP Photo › Tools names the entry 「Text to Image」, the toolbar sheet 「AI Text to Image」  ·  Class: UI  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-111  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Text: the toolbar sheet names the same tool 「Text to Image」 under Photo › Tools and 「AI Text to Image」 under PIP Photo › Tools; the app reads 「Text to Image」 in both. The sheet disagrees with itself, so PM (text rule, 2026-11-11). Part of Q-10.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] PIP Photo Tools: Entry reads 「Text to Image」, sheet says 「AI Text to Image」 — PM to decide
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap the Project tab
3. Tap a project with a photo on an overlay track
4. Tap the overlay photo on the timeline
5. Swipe the PIP Photo toolbar left
6. Tap Tools
7. Check the third entry's name

Result:
The entry reads 「Text to Image」.
摘要：子母畫面照片 Tools 的項目名稱為「Text to Image」。
{16.9.0_rtm07_pip_tools.jpg}

Expect Result:
PM to decide the entry's name; the toolbar sheet names it differently under Photo and PIP Photo.
摘要：請 PM 決定項目名稱；工具列表在 Photo 與 PIP Photo 寫法不同。
Spec string (PIP Photo, Tools): 「AI Text to Image」

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: PDRM Toolbar re-org sheet, newest dated tab (PIP Photo toolbar, Tools column) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit
Related: Q-10
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/07_ISS-RTM-07/`

---

## 8. ISS-RTM-08 — PM decision: Recent tasks opened from a completion banner have no ‹, only a Home button  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-148, TC-152  ·  **Reproduce:** 2/2 (Image to Video, Text to Video)  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-099 (rule 12, entry completion banner: ‹ on the tool's Recent tasks returns to the tool page). Banner 「View」 › result page › ‹ opens the tool's Recent tasks; there the top-left button is a Home icon (btnBack drawn as a house, no separate home button as on the other entries) and it, and system Back, both go to the Launcher Home, never to the tool page or AI Magic, so the user cannot go back to where they were. The spec draws no banner path; filed to PM. Related observation: the banner does not show while the tool's own pages are open (O-19).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Recent task: From a completion banner it has no ‹ and leaves to the Launcher — PM to decide
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap AI Magic on the bottom bar
3. Tap Image to Video
4. Tap Try It Now
5. Tap the photo tile
6. Tap a photo
7. Type a short prompt
8. Tap Generate
9. Tap ‹ at the top left of the Recent tasks
10. Tap ‹ at the top left of the Image to Video page
11. Wait for the completion banner on AI Magic
12. Tap View on the banner
13. Tap ‹ at the top left of the result page
14. Tap the Home icon at the top left of the Recent tasks

Result:
The page has a Home icon instead of ‹; it and system Back both open the Launcher Home.
摘要：由完成通知開啟的最近任務頁只有 Home 圖示，點它或按返回鍵皆回首頁。
{16.9.0_rtm08_recent_from_banner.jpg} {16.9.0_rtm08_after_home_icon.jpg}

Expect Result:
PM to decide where this page leads back to. QA's assumption: ‹ returns to the Image to Video page.
摘要：請 PM 決定此頁的返回目的地；QA 假設 ‹ 應回到 Image to Video 頁面（同其他入口）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, Video board (Recent task with ‹ back) -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3214
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/08_ISS-RTM-08/`

---

## 9. ISS-RTM-09 — PM decision: My Artwork opened from the Home ☰ Menu has no way back to the Menu  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-081  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-091 (rule 12, entry Home ☰ › My Artwork: leaving My Artwork returns to the ☰ page). ☰ › 「My Artwork」 switches to the AI Magic tab's My Artwork, which has no ‹; system Back goes to Home with the Menu closed. Mine › 「My Artwork」 by contrast opens its own page with ‹ (TC-077). The spec draws no ☰ path; filed to PM.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Home Menu: My Artwork opened from ☰ has no way back to the Menu — PM to decide
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap ☰ at the top left of Home
3. Tap My Artwork
4. Press the system Back key

Result:
My Artwork opens as the AI Magic tab with no ‹. System Back goes to Home with the Menu closed.
摘要：從 ☰ 開啟的 My Artwork 為 AI Magic 分頁且無 ‹，系統返回鍵回到首頁且選單已關閉。
{16.9.0_rtm09_myartwork_from_menu.jpg} {16.9.0_rtm09_after_back.jpg}

Expect Result:
PM to decide where leaving My Artwork leads. QA's assumption: back to the ☰ Menu it was opened from.
摘要：請 PM 決定離開 My Artwork 後的去處；QA 假設回到開啟它的 ☰ 選單。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: AI Magic Design Figma, Video board (My Artwork entry) -
https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3214
<Claude Reviewed>
```

**Images:** `20261127_eBug_drafts_Recent-Task-Model-Info-R1_16.9.0_images/09_ISS-RTM-09/`

---

## Not raised (observations, for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| TC-035, TC-037 (and the Select All step of TC-076, 080, 084, 088, 095, 100, 117, 122, 131, 136, 147, 151) | Fail `defect`: edit mode has no 「Select All」 / 「Deselect All」 | Same OS, already filed: DRA262609-0033 (QA Propose Won't Fix, 16.6.1; dedupe.txt). |
| TC-125, TC-139 | Fail `question`: Home has no Text to Image shortcut tile or AI-Powered Creation card | Both lists are set on the CMS (KP-012), so their content is not an app defect; the rows assumed entries the CMS does not carry. Analysis gap for the next draft (report.md). |
| TC-153 | Fail `question`: Text to Image has no completion banner | Text to Image runs in the foreground by design (leaving shows 「Images Generating … will cancel the process」) and the app sends no completion message for it; no spec draws one. Analysis gap: the Section's Text to Image rows go in the next draft. |
| TC-126 – TC-128, TC-140 – TC-142, TC-154, TC-155 | Blocked `test-data`: their entries are absent | Follow TC-125 / TC-139 / TC-153. |
| TC-030, TC-144 | Blocked `test-data`: no Text to Video template exists in the build | Not a finding. |
| TC-038 | Blocked `test-data`: no failed Image to Video task to show | Not a finding (no fault switch on Android). |
| O-1 | A Text to Video task in an error state with 「View Details」 and a sad-planet icon; which Design state (failed or nsfw) it is, is unclear | Analysis gap (report.md); its tag shows, so R-030 holds. |
| O-3 | Wan 3.0 is in both pickers but no row covers it | Analysis gap (report.md). |
| O-9 | Mine › My Artwork's page has no side margin | Not this feature's screen and not checked against the Design; for the My Artwork owner / design check. |
| O-13 / O-16 / O-19 / O-21 | Editor selection, Text to Video page skip, banner held while the tool's pages are open, Text to Image foreground only | Covered by entries 6 and 3, or by design (O-19, O-21). |
| O-5 | logcat `DownloadUriTask … URI is not absolute` at every finish | No visible effect. |

## Reconciliation against the run

39 Fail (8 `defect`, 31 `question`), 11 Blocked. Entries: 9.

### Delta

| Step | Count | Running total |
|---|---|---|
| Fail rows in the run | 39 | 39 |
| TC-035, TC-037 already filed as DRA262609-0033 (same OS) | −2 | 37 |
| TC-125, TC-139, TC-153 not raised (CMS lists; Text to Image foreground by design) | −3 | 34 |
| TC-076 / TC-080 counted in both entry 2 and entry 5 | +2 | 36 |
| TC-148 / TC-152 counted in both entry 4 (step 5) and entry 8 | +2 | 38 |
| Merged: entry 2 (2 rows), 3 (3), 4 (13), 5 (12), 6 (4), 7 (1), 8 (2), 9 (1) | −29 | 9 |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-035, TC-037 | Fail | defect | not raised (DRA262609-0033, same OS) |
| TC-043 | Fail | defect | 1. ISS-RTM-01 |
| TC-045 | Fail | question | 4. ISS-RTM-04 |
| TC-076, TC-080 | Fail | defect | 2. ISS-RTM-02 and 5. ISS-RTM-05 |
| TC-077 | Fail | question | 4. ISS-RTM-04 |
| TC-081 | Fail | question | 4. ISS-RTM-04 and 9. ISS-RTM-09 |
| TC-084, TC-088, TC-095, TC-100, TC-117, TC-122, TC-131, TC-136, TC-147, TC-151 | Fail | question | 5. ISS-RTM-05 |
| TC-085, TC-089, TC-097, TC-102, TC-119, TC-124, TC-133, TC-138 | Fail | question | 4. ISS-RTM-04 |
| TC-101, TC-123, TC-137 | Fail | defect | 3. ISS-RTM-03 |
| TC-109, TC-110, TC-113, TC-114 | Fail | question | 6. ISS-RTM-06 |
| TC-111 | Fail | question | 7. ISS-RTM-07 |
| TC-125, TC-139, TC-153 | Fail | question | not raised (analysis gap) |
| TC-148, TC-152 | Fail | question | 8. ISS-RTM-08 and 4. ISS-RTM-04 |
| Blocked (11) | Blocked | test-data | not raised |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1, 2, 3 |
| PM | 4, 5, 6, 7, 8, 9 |

### Filing order

RD defects first (**3**, **2**, **1**), then the PM decisions (**4**, **8**, **6**, **5**, **9**, **7**).
