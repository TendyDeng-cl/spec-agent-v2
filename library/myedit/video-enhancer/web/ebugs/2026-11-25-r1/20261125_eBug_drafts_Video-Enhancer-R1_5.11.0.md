# Video Enhancer V2 (web) — eBug drafts, round R1 (full run of table v1), MyEdit 5.11.0 build 11242029

**Source:** pdr-spec-casebook run `library/myedit/video-enhancer/web/runs/2026-11-25-r1-full/` — phase R1 of table v1 (141 rows), 2026-11-25 14:22 → 17:38 (+08), MyEdit demo (https://demo.myedit.online), build MyEdit-5.11.0-11242029 (version.json, `build-info.json`), Chrome on Windows 11 at 1440 × 900 (mobile rows 375 × 812). Tally: 113 Pass, 22 Fail, 6 Blocked.

**Status (2026-11-25 19:30):** redrafted a second time by the user's `ebug-writing` and `create-ebug` skills, read in full from the Contract Runner copies (`qadm-myedit-web-spec-contract-runner-agent/.codex/skills/`), with the PM Figma evidence fetched (figma-pm, qa1). Five entries were already filed on 2026-11-25 19:07–19:10 and are to be **corrected** in ECL (title, description and attachments below; nothing edited yet): ISS-VEW-03 = MYE261124P0025, ISS-VEW-04 = MYE261124P0026, ISS-VEW-06 = MYE261124P0027, ISS-VEW-07 = MYE261124P0028, ISS-VEW-08 = MYE261124P0029. Six are **to create**: ISS-VEW-09, 12, 13, 14, 15, 16. **ISS-VEW-10 is held**: the PM Figma board 9 draws the upload error dialog dark, the same as the app, which contradicts its Expect Result; it needs the user's decision before filing. ISS-VEW-01 and ISS-VEW-05 stay unfiled (user's decision). The previous version is kept as `…_5.11.0.md.before-skills`, the first drafts as `….md.old-rules`. Per-ISS filing data: `prepared-filing.json`.

**Fields (every entry):** Product MyEdit, Version 5.11.0, Build No 11242029 (demo `version.json` re-read 2026-11-25 19:22 +08: MyEdit-5.11.0-11242029, no drift from the run), Parent TR TR261022-0018 (`parent-tr.txt`, IF3 only), Bug Source QA, Reproduce Probability 3/3 (the default; ISS-VEW-04 4/4 from four actual attempts), Priority (RD) N/A, previous build Unknown (no Production result supplied or requested), Severity Must Fix and Bug belongs to RD, except `[UX]` entries: Better Fix, PM. Text that differs from the spec is RD with no `[UI]` (ebug-writing: wording is not a visual defect).

**Team tag (Kanban, read 2026-11-25 ~18:20 from the MyEdit Web Kanban, gid 0, column E = FCS):** row 「Video Enhancer V2: Upgrade to BytePlus version」 (ME-1667) → Jenny → `[JT]`, which MyEdit omits, so most titles carry no team tag; row 「Video Editor: Integrate Video Enhancer V2」 (ME-1690) → Carrey → `[CT]` on the Video Editor toast entry. The Pricing page row is a V2 spec item (ME-1667), so no tag.

**Dedupe:** TR261022-0018's eBug list read in IF3 (190 tickets, read only, 2026-11-25). Three findings already have a ticket there and are left off (`dedupe.txt`); the Knowledge Center eBug registry is empty. Whole-MyEdit pass the same evening (IF3 eBug Query, product MyEdit, all projects, all statuses including Close and Cancel, created 2026-01-01 → 2026-11-25, 20 keyword searches): no other draft is already filed (`dedupe.txt`).

**Knowledge Center gate:** fresh issue-specific searches on cl-knowledge-center-myedit, 2026-11-25 19:20–19:24, every reply 「📌 專案：MyEdit（myedit）」 (`mcp-checkpoints.md`). TC-138 and TC-147 stay out (the Knowledge Center says the app is right). ISS-VEW-16 has no Knowledge Center or spec rule; the user gave the informed go-ahead to file it (2026-11-25). ISS-VEW-10: see Status.

**Figma evidence (create-ebug / ebug-writing):** every Expect Result with a Figma node now cites the exact node (not the board) and carries that node's image, fetched through figma-pm (qa1) on 2026-11-25 and cropped with green boxes on the expected element (`figma-src/`, record `figma-src/figma-evidence-record.json`). The one UI entry, ISS-VEW-09, carries the combined comparison image (highlighted actual left, Figma right, green box). Entries whose Expect Result rests on spec text only (ISS-VEW-07, 08, 15) or on no source (ISS-VEW-16) carry no spec image; the source link is in Note where one exists.

Legend — Class: Functional / UI / UX · Severity: S2 = Must Fix, S3 = Better Fix (UX to PM) · Owner: RD or PM.

---

## 1. ISS-VEW-01 — Home Popular Tools: the Video Enhancer card has no Enhanced tag  ·  Class: UI  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-002, TC-140  ·  **Reproduce:** 3/3 (default; seen on two Home visits, R1-a and R1-f)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug.** Spec: video-enhancer-v2.md › 跨工具串接 › 工具標籤 (#b29e724be991): Launcher Home › Popular Tools and the top menu mark Video Enhancer 「Enhanced」, never 「New」. The top menu does show ENHANCED (TC-001 Pass). KC gate 2026-11-25: pass. UI bug without a spec image (the Launcher is not drawn on the PM boards); spec text in Note. Related, not a duplicate: MYE261020-0014 (5.10, Fail) covers the top menus' tool lists and Enhanced tags, not Launcher Popular Tools, and its verify comment says the Enhanced-tag part is fixed.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent][UI]Launcher(Popular Tools): The Video Enhancer card does not show the Enhanced tag
```

**Description:**

```
Repro Steps:
1. Open demo server > sign in > go to Home.
2. Find the Video Enhancer card in Popular Tools > hover over it.

Result:
The Video Enhancer card in Popular Tools shows no Enhanced tag. (ref to attachment)

Expect Result:
The Video Enhancer card in Home > Popular Tools should show the Enhanced tag, as the top menu does.

Note:
Spec: Video Enhancer V2 > User Flow > Cross-tool links > Tool tags (Popular Tools and top menu show Enhanced, not New)
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Popular_Tools_Video_Enhancer_no_Enhanced_tag.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/01/`

---

## 2. ISS-VEW-03 — SEO page: AVI, under-128 px, over-120 fps and unsupported-audio uploads show no error  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-010, TC-014, TC-016, TC-020 retest  ·  **Reproduce:** 3/3 (default; one AVI, one 192×96, one 240 fps and one FLAC-audio video, each from the SEO page)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. Filed as MYE261124P0025 (2026-11-25 19:07); edit that ticket, do not create.** Title is the user's wording. From /en/video-editor/video-enhancer: the AVI is silently ignored (nothing for 180 s); 192×96, 240 fps and the FLAC-audio video move to the tool page's empty upload box with no dialog. The tool page's own upload box shows the right dialogs at once. Fixtures stay local: any file with these traits reproduces it, so none is attached. When the dialog should appear (on choosing vs after upload) is the spec's open RD question, not part of this bug. KC gate 2026-11-25 19:20: Error Handle table and 「Audio Codec Not Supported」 kept from the old room — agrees. Figma: board 9 cases 1, 5 and 6 (exact dialog nodes); the audio dialog is not drawn on board 9 (spec text only). Related, not a duplicate: MYE261116P0018 (Close) fixed the tool page's AVI dialog title.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(SEO page): Uploading unsupported media does not show error dialog
```

**Description:**

```
Repro Steps:
1. Open demo server > go to the Video Enhancer SEO page.
2. Click Choose a file > upload an AVI video.
3. Repeat step 2 with a video whose shorter side is below 128 px > a video above 120 fps > a video with an unsupported audio codec.

Result:
No error dialog appears; the AVI upload is ignored and the other three videos open an empty upload box. (ref to attachment)

Expect Result:
Each upload should show its error dialog: Unsupported File Format, Video Resolution Not Supported, Video Frame Rate Not Supported or Audio Codec Not Supported.

Note:
1. Figma: 9 - Error Handling - Upload Limitation, Case 1 (Unsupported File Format)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=237-1251
2. Figma: 9 - Error Handling - Upload Limitation, Case 5 (shorter side below 128 px)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=382-1791
3. Figma: 9 - Error Handling - Upload Limitation, Case 6 (over 120 fps)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=383-1791
4. Spec: Video Enhancer V2 > Error Handle (unsupported audio keeps Audio Codec Not Supported)
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_SEO_page_AVI_no_error_dialog.png} {Highlight_SEO_page_below_128px_no_error_dialog.png} {Highlight_SEO_page_over_120fps_no_error_dialog.png} {Highlight_SEO_page_unsupported_audio_no_error_dialog.png} {Figma_Unsupported_File_Format_dialog.png} {Figma_Below_128px_resolution_dialog.png} {Figma_Over_120fps_frame_rate_dialog.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/02/`

---

## 3. ISS-VEW-04 — SEO page upload error dialogs read 「Got It」 instead of 「Got it」  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-011, TC-012, TC-019, TC-021  ·  **Reproduce:** 4/4 (four SEO-page dialogs: File Size Too Large, Video Resolution Not Supported, Unsupported Format, Video Duration Limit Exceeded)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. Filed as MYE261124P0026 (2026-11-25 19:08); edit that ticket, do not create.** Wording defect → RD, no `[UI]`. Four attempts were made, so the actual 4/4 is used. KC gate 2026-11-25 19:20: Error Handle — 「上表彈窗的按鈕都是 Got it」 — agrees. Figma: board 9, every dialog's button is 「Got it」; the image shows cases 1–3 with the button boxed in green, and the Note cites the Case 2 button node (the first attachment's dialog). No Video Enhancer 「Got It」 ticket in MyEdit.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(SEO page): Upload error dialogs show the button Got It instead of Got it
```

**Description:**

```
Repro Steps:
1. Open demo server > go to the Video Enhancer SEO page.
2. Click Choose a file > upload a video larger than 10 GB.
3. Repeat step 2 with an AV1 video > a video above 1440p.

Result:
The error dialogs on the SEO page show the button Got It with a capital I. (ref to attachment)

Expect Result:
The button should read Got it.

Note:
1. Figma: 9 - Error Handling - Upload Limitation, Case 2 button Got it (Cases 1 and 3 use the same button)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=237-1269
2. Spec: Video Enhancer V2 > Error Handle (every dialog button is Got it)
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_SEO_File_Size_Too_Large_Got_It.png} {Highlight_SEO_Unsupported_Format_Got_It.png} {Highlight_SEO_Resolution_dialog_Got_It.png} {Figma_Got_it_button_cases_1-3.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/03/`

---

## 4. ISS-VEW-05 — Continue Editing a clip over 8 minutes shows Video Too Long instead of the Trimmer  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-088  ·  **Reproduce:** 3/3 (default; the dialog showed twice in the run)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug.** PM Figma 10 and the PM spec: a Continue Editing clip over 8 minutes opens the Trimmer in the room (max 8:00). KC's code-derived continue-editing page says that, coming from Video Trimmer itself, the shared rule shows 「Video Too Long」 — so the app does what the code says, the approved spec says otherwise; the Expect rests on the PM spec and Figma (gate: pass), but RD may send it to PM. Source used: Video Trimmer with an 8:20 clip. Start New opens an empty room, so the clip is lost. Recheck 2026-11-25 (O-25, user asked to try 10 s): the same path with a 10 s clip opens the room with the clip and Enhance ready, so only clips over 8:00 are affected — the length check, not the path. Recheck with 8:20 (O-26): the dialog opens while still in Video Trimmer; Cancel keeps the clip there. The user decided (2026-11-25) to file it to RD as drafted.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(Continue Editing): A clip over 8 minutes shows Video Too Long instead of opening the Trimmer
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Trimmer > upload a video longer than 8 minutes.
2. Click Video Enhancer in the left tool menu > click Start New in the dialog.

Result:
A Video Too Long dialog appears, and Start New opens an empty Video Enhancer room without the clip. (ref to attachment)

Expect Result:
Video Enhancer should open with the clip and show the Trimmer first (up to 8:00); Enhance works after Trim.

Note:
1. Figma: 10 - Professional Mode length limit (Continue Editing clips over 8 minutes open the Trimmer)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=358-1608
2. Spec: Video Enhancer V2 > User Flow > Video length limit
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Continue_Editing_Video_Too_Long.png} {Highlight_Start_New_empty_room.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/04/`

---

## 5. ISS-VEW-07 — Video Editor shows no 60 fps toast for a 60 fps Video Enhancer result  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-117  ·  **Reproduce:** 3/3 (default; seen twice, R1-d and the R1-g recheck)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. Filed as MYE261124P0028 (2026-11-25 19:09); the filed text already matches the skills, no edit needed.** Spec: video-enhancer-v2.md › Video Editor 高幀率提示 (#b903e329a3e7). The page was polled every 0.5 s for 60 s: no such text. The toast belongs to Video Editor: Kanban row 「Video Editor: Integrate Video Enhancer V2」 (ME-1690), column E Carrey → `[CT]`. KC gate 2026-11-25 19:21: toast text 「This {fps} fps video will export at 30 fps. Your original is unchanged.」, 3 s, once per video per session — agrees. No Figma node for this toast (spec text only), so no spec image.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent][CT]Video Editor: Opening a 60 fps Video Enhancer result shows no export-at-30-fps toast
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a 30 fps video.
2. Set Frame Rate to 60 fps > click Enhance > wait for the result.
3. Click the result in Recent Gen > click Open in Editor.

Result:
Video Editor opens the 60 fps clip but shows no toast about exporting at 30 fps. (ref to attachment)

Expect Result:
A toast "This 60 fps video will export at 30 fps. Your original is unchanged." should show for about 3 seconds, once per video per session.

Note:
Spec: Video Enhancer V2 > User Flow > Video Editor high frame rate toast
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Video_Editor_no_30fps_toast.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/05/`

---

## 6. ISS-VEW-08 — The upload dialog after Enhance has no Cancel (PM decision)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-120, TC-119  ·  **Reproduce:** 3/3 (default; seen at normal speed and under a 15 KB/s throttle)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Better Fix

> **QA note — not pasted into eBug. Filed as MYE261124P0029 (2026-11-25 19:10); the filed text already matches the skills, no edit needed.** Not a spec mismatch: the PM spec draws no Cancel in 「Creating Your Video」, but RD's answer in the Knowledge Center (#dfed049fda18, read in full 2026-11-25 19:24 in derived-video-enhancer-v2-settings › Credit Deduction and Cancel) says credits are taken before the upload and that cancelling during the upload refunds them in 3–6 hours — and the app offers no way to cancel (TC-120 charged 180 credits for a 3:00 job it could not stop). `[UX]`, PM, Better Fix (ebug-writing UX rule). No Figma node (KC text only), so no spec image.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent][UX]Video Enhancer: The Creating Your Video upload dialog has no Cancel after credits are deducted
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a video.
2. Slow down the network > click Enhance.
3. Look for a way to cancel in the Creating Your Video dialog.

Result:
The dialog has no Cancel or close button, so the upload cannot be stopped after credits are deducted. (ref to attachment)

Expect Result:
The dialog should let the user cancel the upload (RD: credits are then refunded within 3-6 hours); PM to decide.

Note:
Knowledge Center (RD answer): Video Enhancer V2 Settings > Credit Deduction and Cancel
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-video-enhancer-v2-settings.md
```

**Attachments:** {Highlight_Creating_Your_Video_no_Cancel.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/06/`

---

## 7. ISS-VEW-09 — Phone width: Processing covers the whole page instead of dimming the settings summary  ·  Class: UI  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-101  ·  **Reproduce:** 3/3 (default; seen from the SEO page and from Replace Video)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. To create.** PM Figma 4 - Mobile UI Spec, frame 「uploading」 (457:3443, fetched 2026-11-25) and spec 新房間（手機） › 上傳中: the summary and Enhance stay below Processing, dimmed and disabled. KC gate 2026-11-25 19:24: agrees (the code-derived Mobile Layout page does not describe the uploading state). Condition: Chrome on Windows at 375 × 812 (the mobile layout applies at 1200 px and below); not seen on a real phone. UI bug: highlighted actual (group actual), the Figma frame image (spec), then the one combined comparison image (highlight group: actual left with red box, Figma right with a green box on the dimmed summary and Enhance) — the order validate-ebug-form-contract.ts enforces.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent][UI][Mobile]Video Enhancer: Processing covers the whole page instead of dimming the settings summary
```

**Description:**

```
Repro Steps:
1. Open demo server in a 375 px wide browser window > go to the Video Enhancer SEO page.
2. Click Choose a file > upload a video > look at the page while Processing is shown.

Result:
Processing fills the whole screen, and the settings summary and Enhance are not shown. (ref to attachment)

Expect Result:
While uploading, the settings summary and Enhance should stay visible below Processing, dimmed and disabled.

Note:
1. Figma: 4 - Mobile UI Spec, uploading state
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=457-3443
2. Spec: Video Enhancer V2 > User Flow > New room (mobile), uploading
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Mobile_Processing_covers_room.png} {Figma_Mobile_uploading_state.png} {Comparison_Mobile_uploading_state.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/07/`

---

## 8. ISS-VEW-10 — NOT A BUG (user, 2026-11-26; not filed): dark dialogs on the Light Mode tool page (PM Figma draws the error dialog dark)  ·  Class: UI  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-144  ·  **Reproduce:** 3/3 (default; Creating Your Video and Unsupported File Format after Replace Video)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. HELD — do not create until the user decides (create-ebug Knowledge Center expectation gate: a newly found source contradicts the Expect Result).** The user's go-ahead (2026-11-25 「兩隻都開」) was given when no source existed. The PM Figma fetched 2026-11-25 now contradicts it for one of the two dialogs: board 「9 - Error Handling – Upload Limitation」 draws every upload error dialog, Unsupported File Format included (237:1251), as a dark grey box with white text — the same as the app (`figma-src/board9_235-1137.png`). The 「Creating Your Video」 dialog is not drawn on any PM board read; KC has no theme rule for either dialog (search 2026-11-25 19:24). Options for the user: (a) drop the entry; (b) file only the Creating Your Video part, citing no source; (c) file both as drafted despite the Figma. No comparison image is made: the only design source does not support the expectation, and none may be fabricated.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent][UI]Video Enhancer: The Creating Your Video and upload error dialogs are dark on the light tool page
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a video.
2. Click Enhance > look at the Creating Your Video dialog.
3. Click Replace Video > upload an AVI video > look at the error dialog.

Result:
The progress and error dialogs are dark grey with white text on the light Video Enhancer tool page. (ref to attachment)

Expect Result:
These dialogs should use the light theme like the rest of the Video Enhancer tool page.
```

**Attachments:** {Highlight_Creating_Your_Video_dark_dialog.png} {Highlight_Unsupported_File_Format_dark_dialog.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/08/`

---

## 9. ISS-VEW-12 — The over-1440p dialog names 2560x1440 instead of 1440p (was H-1)  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-012  ·  **Reproduce:** 3/3 (default; seen once in R1, no extra attempts made)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. To create.** Wording defect → RD, no `[UI]`. PM spec › Input Format: 「對外文案一律寫 1440p」 (PM, 2026-10-21); Figma 9 Case 3 body (237:1273) reads (1440p). KC gate 2026-11-25 19:20: the code-derived settings page also says the message is written as 1440p — agrees.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(SEO page): The resolution error dialog says 2560x1440 instead of 1440p
```

**Description:**

```
Repro Steps:
1. Open demo server > go to the Video Enhancer SEO page.
2. Click Choose a file > upload a 4K video.

Result:
The Video Resolution Not Supported dialog names the limit as (2560x1440). (ref to attachment)

Expect Result:
The body should read "This video exceeds the supported resolution limit (1440p). Please choose another video."

Note:
1. Figma: 9 - Error Handling - Upload Limitation, Case 3 dialog body
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=237-1273
2. Spec: Video Enhancer V2 > Input Format (public text always says 1440p) and Error Handle
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Resolution_dialog_2560x1440.png} {Figma_Resolution_dialog_1440p.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/09/`

---

## 10. ISS-VEW-13 — The Standard Trimmer hint text differs from the spec (was H-3)  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-021  ·  **Reproduce:** 3/3 (default; seen once in R1, no extra attempts made)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. To create.** Wording defect → RD, no `[UI]`. Figma 10 step ③ note (359:1999) and the PM spec give the Standard hint; KC gate 2026-11-25 19:21: the spec and the code-derived Replace and Trim page quote the same text — the app differs from both. Related, not a duplicate: MYE261116P0016 (Close) was the opposite case; its fix makes the Trimmer fall back to the default 「Please trim your video to … minutes」 text — the text seen here, so RD may want to look there first.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(Trimmer): The Standard trim hint text differs from the spec
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a video longer than 8 minutes.
2. Look at the hint at the bottom left of the Trim Video dialog.

Result:
The hint reads "Please trim your video to 8 minutes or shorter before proceeding." (ref to attachment)

Expect Result:
The hint should read "Standard mode supports videos up to 8 minutes long. Please trim your video to continue."

Note:
1. Figma: 10 - Professional Mode length limit, step 3 note (Standard Trimmer hint)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=359-1999
2. Spec: Video Enhancer V2 > User Flow > Video length limit (Trimmer hints)
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Trimmer_Standard_hint_text.png} {Figma_Trimmer_Standard_hint.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/10/`

---

## 11. ISS-VEW-14 — Professional Replace over 2:30 opens the Trimmer instead of the 2:30 text  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-085  ·  **Reproduce:** 3/3 (default; seen once in R1, no extra attempts made)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. Filed as MYE261124P0033; corrected 2026-11-26 (user request).** First filed as a PM decision (`[UX]`, PM, Better Fix) on the belief that the spec sends an over-limit Replace to the Trimmer. Rechecked 2026-11-26: the PM spec (features/video-enhancer-v2.md › 影片長度限制: Professional over 2:30 → red text, Enhance disabled; 2:30 checked again on Replace Video) and PM Figma 10 step ② (360:1789) agree. The Trimmer route comes only from KC's code-derived Replace and Trim page (what the app does) and a side remark in the reasons of #4c092911b0fb (a question about 8-minute uploads). So it is an RD bug: `[UX]` removed, Must Fix, Bug Belong RD, Expect states the specified behaviour.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(Professional): Replace Video over 2:30 opens the Trimmer instead of showing the 2:30 limit text
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a video of 2:30 or less.
2. Select Professional > click Replace Video > upload a 3-minute video.

Result:
The Trimmer opens at once; the red 2:30 text and disabled Enhance never show. (ref to attachment)

Expect Result:
The new video should replace the current one without opening the Trimmer. Mode stays Professional, the red text "Professional mode supports videos up to 2:30." shows under Mode, and Enhance stays disabled until the user switches to Standard, replaces it with a video of 2:30 or less, or trims it to 2:30 or less.

Note:
1. Figma: 10 - Professional Mode length limit, step 2 (Replace Video over 2:30 gives this state)
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=360-1789
2. Spec: Video Enhancer V2 > User Flow > Video length limit (Professional over 2:30: red text under Mode, Enhance disabled; checked again on Replace Video)
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Professional_Replace_opens_Trimmer.png} {Figma_Professional_over_2-30_red_text.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/11/`

---

## 12. ISS-VEW-15 — Pricing Compare All Plans lists Video Restoration but not Video Enhancer (was H-5)  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-118  ·  **Reproduce:** 3/3 (default; seen once in R1, no extra attempts made)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. To create.** Spec › 跨工具串接 › Pricing page (#89dc53e3a2b3): the new version shows Video Enhancer, the old one Video Restoration. KC gate 2026-11-25 19:21: agrees. Video Tools rows read: Video Editor … AI Sound for Video, Video Restoration, Video Auto Reframe, Video Trimmer, Video Merger — no Video Enhancer. Team: a V2 spec item (ME-1667, Jenny → no tag). No Figma node for the Pricing page (spec text only), so no spec image.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Pricing(Compare All Plans): Video Tools lists Video Restoration but not Video Enhancer
```

**Description:**

```
Repro Steps:
1. Open demo server > open Pricing.
2. Open Compare All Plans > read the Video Tools rows.

Result:
Video Restoration is listed, but Video Enhancer is missing from Video Tools. (ref to attachment)

Expect Result:
Video Tools should list both Video Enhancer and Video Restoration.

Note:
Spec: Video Enhancer V2 > User Flow > Cross-tool links > Pricing page
https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md
```

**Attachments:** {Highlight_Pricing_Video_Tools_no_Video_Enhancer.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/12/`

---

## 13. ISS-VEW-16 — The preview keeps playing after Enhance (was H-6)  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-136  ·  **Reproduce:** 3/3 (default; seen once in R1, no extra attempts made)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. To create. User gave the informed go-ahead to file it (2026-11-25: 「兩隻都開」).** KC gate 2026-11-25 19:24: still no Video Enhancer rule (unresolved; the override stands, scope unchanged). The expectation rests on KP-029 (team rule) and on Replace Video pausing the preview. Dynamic defect: the highlighted frame and the action recording (cut from the run's TC-128.mp4, 08:52:49–50; no cursor overlay, it was not re-recorded). No source link, so no Note.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer: The preview keeps playing after clicking Enhance
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a video.
2. Play the preview > click Enhance.

Result:
The preview keeps playing behind the Creating Your Video dialog until the clip ends. (ref to attachment)

Expect Result:
Clicking Enhance should pause the preview, as Replace Video does.
```

**Attachments:** {Highlight_Preview_keeps_playing_behind_Creating_Your_Video.png} {Recording_preview_keeps_playing_after_Enhance.mp4}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/13/`

---

## 14. ISS-VEW-06 — The result-ready mail body text differs from the spec  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-113  ·  **Reproduce:** 3/3 (default; five such mails received on 2026-11-25, all with the same text)  ·  **Verified on:** 5.11.0.11242029

**Severity:** Must Fix

> **QA note — not pasted into eBug. Filed as MYE261124P0027 (2026-11-25 19:09) with `[UI]`; edit that ticket: remove `[UI]` (a wording bug is not a UI bug, ebug-writing).** Screenshot taken 2026-11-25 in Outlook on the web, mail 「Your Video Enhancer result is ready!」 received 17:28. The first sentence differs from PM Figma 6 - EDM, Video Enhancer success mail body (207:1229); the second sentence and the 「Access Your Video Enhancer」 button match. The Knowledge Center has no EDM text (gate 2026-11-25 19:21); the Expect rests on the Figma. Text the spec states and the app shows differently → RD.

**Short Description:**

```
MyEdit 5.11.0 - [AIAgent]Video Enhancer(Email): The result-ready email body text differs from the spec
```

**Description:**

```
Repro Steps:
1. Open demo server > open Video Enhancer > upload a video.
2. Click Enhance > wait for the result.
3. Open the account's mailbox > open the mail Your Video Enhancer result is ready!

Result:
The mail body reads "Your Video Enhancer has been generated successfully." instead of the specified text. (ref to attachment)

Expect Result:
The body should read "Your enhanced video is ready! Click the button below to view the results and start using your video."

Note:
Figma: 6 - EDM, Video Enhancer result-ready mail body
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=207-1229
```

**Attachments:** {Highlight_Ready_mail_body_text.png} {Figma_EDM_result_ready_body_text.png}

**Images:** `20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images/14/`

---

## Already filed on TR261022-0018 — dedupe.txt only

| Item | Finding | Existing ticket |
|---|---|---|
| ISS-VEW-02 | TC-007 / TC-107: no Video Restoration in the left tool menu, so the settings panel cannot be reopened after Back | MYE261106P0045 「Video Restoration (Left Menu): No Video Restoration listed on Left menu」, NeedCodeReview (RD); related MYE261124P0001 (UX, remove Back), Assigned |
| ISS-VEW-11 | TC-150: Video Enhancer and Video Restoration Launcher cards share one thumbnail | MYE261110P0023 「Launcher page/My Library(Video restoration/Video enhancer v2): Two tools thumbnail are same」, RDResolved — still seen on 11242029 (for information; no comment) |
| H-2 | TC-021 / TC-026: an 8:20 video from the SEO page gets 「Video Duration Limit Exceeded」 instead of the Trimmer | MYE261118P0008 「Video Enhancer V2(SEO Upload): The page blocks videos over 8 minutes without opening Trim Video」, BuildResolved (PM) — still seen on 11242029 (for information; no comment) |

## Not raised

| Item | Finding | Why not filed | Table fix |
|---|---|---|---|
| TC-138 | The SEO page header has no Get Credits (the room has it) | Knowledge Center gate (2026-11-25, derived-tool-header-credit-and-upgrade-buttons): a credit tool's import page does not show Get Credits, so the app is right; KP-038 is contradicted | TC-138 step 1: Get Credits on the room only (or ask PM) |
| TC-147 | The Free storage-full account gets Generate Anyway and Upgrade, no Manage | Knowledge Center gate (derived-cloud-storage-warnings…): Upgrade while a higher cloud tier exists, Manage only on Studio Pro; the app is right | TC-147: Upgrade on a Free account; Manage needs a full Studio Pro account |
| TC-010 – TC-021 timing | Upload error dialogs show on choosing the file, not after the upload | Still an open RD question in the spec; not a bug until decided | Decide R-078 vs the open question |

## Reconciliation against the run

| Step | Count | Running total |
|---|---|---|
| Fail rows | 22 | 22 |
| → findings after merges and splits (TC-007 + TC-107; TC-010 + TC-014 + TC-016; Got It of TC-011, TC-012, TC-019, TC-021 as one; TC-012 and TC-021 also carry the 2560x1440, SEO-Trimmer and hint findings) | | 19 findings |
| → not raised (TC-138, TC-147) | −2 | 17 |
| → already filed on the TR (VEW-02, VEW-11, H-2) | −3 | 14 |
| → held for a mail screenshot (VEW-06): screenshot taken, now entry 14 | 0 | **14 entries** |
