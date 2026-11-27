# AIGC Watermark (Android) — eBug drafts, entry round E1, PDR-A 16.9.0 build 2611251

**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-26-e1-entries/` — entry round E1 of draft `drafts/20261126-111601` (table v6, 216 rows TC-159 – TC-374: the UI pass of every non-primary entry, REQ-015), 2026-11-26 17:35 → 23:05 (UTC+8), on Sony XQ-BT52 (Xperia 10 III) / Android 12 (adb HQ61563393) through Appium / UiAutomator2, PowerDirector 16.9.0 build 2611251 (Google Play internal test, TR261125-0064), Stage server, account acda.test7@gmail.com (Free until 21:01, then Pro by Play test subscription). Tally: 159 Pass, 41 Fail, 16 Blocked.

**Status:** filed 2026-11-27 on TR261125-0064 over the API: ISS-AWA-20 → DRA262611P0341, ISS-AWA-21 → DRA262611P0342, ISS-AWA-22 → DRA262611P0343, ISS-AWA-23 → DRA262611P0344, ISS-AWA-24 → DRA262611P0345, ISS-AWA-25 → DRA262611P0346, ISS-AWA-26 → DRA262611P0347, ISS-AWA-27 → DRA262611P0348, ISS-AWA-28 → DRA262611P0349, ISS-AWA-29 → DRA262611P0350, ISS-AWA-30 → DRA262611P0351. See `filed_bugcodes.md`. No existing ticket commented on. OS Language still to set on the web form.

Filed by: ETHAN_HSU on 2026-11-27

Rules: reviewer rules (one action per Repro step, a Spec Link on every entry with the URL on its own line, an image on every entry, the log on failure-related ones, no video). Open questions the run cannot settle are filed to PM (BugBelong PM; `[AIAgent][UX]` for a user-experience decision, `[AIAgent]` Functional otherwise, `[AIAgent][UI]` for a visible layout defect with no spec basis). No entry here is a crash or error, so no log excerpt is attached; the run's screenshots are the evidence.

**What is drafted:** 11 entries, all to PM for a decision: ISS-AWA-20 (Q-22, toolbar places), ISS-AWA-21 – ISS-AWA-29 (new questions from the entry pass), ISS-AWA-30 (O-17, layout). The Q-10 / Q-13 rows and the AI Music Generator rows repeat filed Android tickets or the unfiled R2 draft ISS-AWA-17 and are left off (`dedupe.txt`).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-AWA-20 — Video Edit by Chat and Cinematic Reel Creator are on the clip toolbars' first layer, not under 「Effects」, and 「AI Remove」 is missing  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-172, TC-178, TC-202, TC-208, TC-214, TC-220  ·  **Reproduce:** 6/6  ·  **Verified on:** 16.9.0.2611251

> **Cancelled (user, 2026-11-27).** DRA262611P0341 was cancelled on eCL: 「AI Remove (4/E IOS)」 is iOS only (REQ-020), so its 「no AI Remove」 part was wrong; the ticket was not corrected.

> **QA note — not pasted into eBug.** Open question Q-22 (R-062): the toolbar sheet (tab 「2026/11 Auto Reframe」, the newest) lists Video Edit by Chat under Video › Effects 「(8/M)」 and PIP Video › Effects 「(7/E)」, Cinematic Reel Creator under Photo / PIP Photo › Effects 「(7/E)」, and 「AI Remove (4/E IOS)」 as a first-layer button of the Video and PIP Video toolbars. On 2611251 the two tools sit on the first layer of those toolbars (between 「Split」 and 「Volume」 / 「Duration」), Effects lists neither, and no 「AI Remove」 (taken to be Video Object Removal, KP-082) is offered anywhere. The bracket notes may be release targets (8/M, 7/E) and an iOS-only mark (4/E IOS), so whether 2611251 should already match is PM's call. Same placement for VEbC on iOS (KP-050). Rows TC-215 – TC-219 and TC-221 – TC-225 were Blocked for the missing AI Remove.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Editor toolbar: Video Edit by Chat, Cinematic Reel Creator not under Effects; no AI Remove
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「New Project」
3. Add a video clip and a photo to the main track
4. Tap the video clip on the timeline
5. Check the Video toolbar's first layer
6. Tap 「Effects」
7. Check the Effects list
8. Tap the photo on the timeline
9. Check the Photo toolbar's first layer
10. Tap 「Effects」
11. Check the Effects list

Result:
Both tools are first-layer clip toolbar buttons, not under 「Effects」, and no toolbar offers 「AI Remove」.
摘要：兩個工具在素材工具列第一層，不在「Effects」內，也沒有「AI Remove」。
{16.9.0_awa20_toolbar_places.jpg}

Expect Result:
PM to decide whether this build should follow the toolbar sheet: both tools under 「Effects」, and 「AI Remove」 present.
摘要：請 PM 決定此版本是否應依工具列表擺放並提供「AI Remove」。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the toolbar sheet lists Video Edit by Chat under Video › Effects (8/M) and PIP Video › Effects (7/E), Cinematic Reel Creator under Photo and PIP Photo › Effects (7/E), and 「AI Remove (4/E IOS)」 on the Video and PIP Video toolbars; its bracket notes do not say which build must show them (iOS only for AI Remove?). Open question Q-22.
Related: the PIP Video and PIP Photo toolbars are the same as the Video and Photo toolbars.
Related: the same first-layer placement of Video Edit by Chat is seen on iOS.
Spec Link: PDRM Toolbar re-org sheet, tab 2026/11 Auto Reframe (Video, PIP Video, Photo, PIP Photo toolbars) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/01_ISS-AWA-20/`

---

## 2. ISS-AWA-21 — Video Edit by Chat and Cinematic Reel Creator opened from a selected clip or photo do not take it as the source  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-173, TC-179, TC-203, TC-209  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-064 (REQ-015) expects a tool opened from a clip toolbar to show the selected input's own values. Video Edit by Chat from the Video / PIP Video toolbar opens with 「Import a Video」 and the 1-second placeholder price 「Generate Video ◆ 14」; Cinematic Reel Creator from the Photo / PIP Photo toolbar opens on its template carousel with 「Import a photo」. The other clip-toolbar tools do take the selected item (AI Anime Video: TC-235 / TC-241 took the 8.3 s / 4.9 s clips; Talking Avatar from the audio toolbar took the clip as the voice, TC-250). The spec draws these tools from one place only, so whether the clip-toolbar entry should take the selection is a PM decision.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Editor toolbar: Video Edit by Chat, Cinematic Reel Creator ignore the selected clip
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Open a project with a video clip and a photo on the main track
3. Tap the video clip on the timeline
4. Tap 「Video Edit by Chat」 on the Video toolbar
5. Check the source box
6. Tap the back button
7. Tap the photo on the timeline
8. Tap 「Cinematic Reel Creator」 on the Photo toolbar
9. Check the photo box

Result:
Both tools open empty (「Import a Video」, 「Import a photo」); the selected clip or photo is not used.
摘要：兩個工具開啟時都是空的，沒有帶入選取的素材。
{16.9.0_awa21_selected_not_taken.jpg}

Expect Result:
PM to decide whether these tools should take the selected clip or photo as the source.
摘要：請 PM 決定從選取素材開啟時是否應帶入該素材。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the toolbar sheet places both tools on the clip toolbars but does not say whether the selected item is used.
Related: AI Anime Video from the Video toolbar's Effects takes the selected clip; Talking Avatar from the audio clip toolbar takes the clip as the voice. Video Edit by Chat shows the price for 1 second. The PIP toolbars are the same.
Spec Link: PDRM Toolbar re-org sheet, tab 2026/11 Auto Reframe (Video, PIP Video, Photo, PIP Photo toolbars) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/02_ISS-AWA-21/`

---

## 3. ISS-AWA-22 — Video Edit by Chat shows an 8.3 s source as 00:09 and charges for 9 seconds  ·  Class: Functional  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-161  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** O-3: Video Edit by Chat rounds the source length up for display and price: MOV_0046 (8.283 s by ffprobe; trim page 「Selected Length 8.3 seconds」) → 「00:09」 and 「Generate Video ◆ 126」 = 14 × 9 (Seedance 2.5); 5.397 s → 「00:06」 ◆30 (Kling O3, 5 a second); 4.91 s → 「00:05」. R1 TC-017 saw the same (8.3 s shown 9 s). The credits ledger was not split by seconds; the price on the button was what was charged (TC-169: ◆30 for 5.4 s). No spec states how the length is counted, so the ruling is PM's; a billing rule that charges a started second may be intended.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Video Edit by Chat: Source of 8.3 s shown as 00:09 and priced as 9 seconds
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Video Edit by Chat」 on the Launcher
3. Tap 「Import a Video」
4. Pick a video of 8.3 seconds
5. Tap 「Next」 on the trim page
6. Check the source length and the price

Result:
An 8.3 s source shows as 「00:09」 and the button price is for 9 seconds (14 × 9 = 126).
摘要：8.3 秒的影片顯示為 00:09，並以 9 秒標價（126）。
{16.9.0_awa22_length_rounded.jpg}

Expect Result:
PM to decide how a part second is shown and priced: rounded up, rounded, or exact.
摘要：請 PM 決定不足一秒的長度如何顯示與標價。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the tool's page says 「Charges N credits per second」 but no spec says how a part second counts.
Related: the trim page says 「Selected Length 8.3 seconds」; a 5.4 s clip shows 00:06 (priced as 6 s), a 4.9 s clip 00:05.
Spec Link: Remove AIGC Watermark PM spec, scope board (Video Edit by Chat among the AI video results) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/03_ISS-AWA-22/`

---

## 4. ISS-AWA-23 — Talking Avatar from the audio clip toolbar has no 「By Text」 / 「By Voice」 switch  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-252  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** From Audio clip toolbar › Talking Avatar, step 2 opens as 「Edit the Voice and Format」 with the selected clip as the voice (row › → By Voice sheet: Record / Extract from video / Voice from folder; Trim; Voice Changer) and no way to switch to a text script. From Editor › AI Magic › Talking Avatar, step 2 is 「Edit the Script」 with By Text / By Voice even after the same .wav is picked by Voice from folder. Every other control matched the primary entry (TC-250 – TC-255). The toolbar sheet places Talking Avatar on the audio toolbar without saying how it opens.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Talking Avatar: Audio toolbar entry lacks the By Text / By Voice switch
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Open a project with a voice clip on the audio track
3. Tap the voice clip on the timeline
4. Tap 「Talking Avatar」 on the Audio toolbar
5. Pick an avatar
6. Tap 「Continue」
7. Check step 2

Result:
Step 2 has no 「By Text」 / 「By Voice」 switch, so a text script cannot be written.
摘要：第二步沒有「By Text / By Voice」切換，無法改用文字腳本。
{16.9.0_awa23_no_text_voice_switch.jpg}

Expect Result:
PM to decide whether the audio toolbar entry should keep the 「By Text」 / 「By Voice」 switch, as from AI Magic.
摘要：請 PM 決定音訊工具列入口是否應保留「By Text / By Voice」切換。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the toolbar sheet places Talking Avatar on the audio toolbar but does not draw its pages.
Related: step 2 opens as 「Edit the Voice and Format」 with the clip as the voice; from AI Magic the same step is 「Edit the Script」 with both options.
Spec Link: PDRM Toolbar re-org sheet, tab 2026/11 Auto Reframe (Audio toolbar) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/04_ISS-AWA-23/`

---

## 5. ISS-AWA-24 — Leaving Text to Image opened from a selected photo drops the editor's selection  ·  Class: UX  ·  Severity: S4  ·  Owner: PM

**Report step:** TC-272, TC-273, TC-278, TC-279  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-061 (REQ-015): leaving a tool before anything is made returns to the screen it was opened from as it was (for an editor entry: the same project, selection and playhead). Photo toolbar › Tools › Text to Image and PIP Photo toolbar › Tools › Text to Image (label 「Text to Image」, O-10), left with ‹ or system Back with nothing generated: same project and playhead, no credits, timeline unchanged, but the photo is no longer selected (Global toolbar). The other clip-toolbar entries keep the selection (Cinematic Reel Creator TC-206, AI Anime Video TC-236, Video Edit by Chat TC-176). R-061 is the casebook's own entry rule, not a PM line, so this goes to PM.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Editor (Text to Image): Leaving it clears the photo selection it was opened from
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Open a project with a photo on the main track
3. Tap the photo on the timeline
4. Tap 「Tools」 on the Photo toolbar
5. Tap 「Text to Image」
6. Tap the back button
7. Check the timeline selection

Result:
The editor shows again with nothing selected, not with the photo selected.
摘要：返回編輯器後相片不再是選取狀態。
{16.9.0_awa24_selection_dropped.jpg}

Expect Result:
PM to decide whether leaving Text to Image should keep the photo selected.
摘要：請 PM 決定離開時是否應保留相片選取。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — no spec states the editor's selection after leaving a tool opened from a clip toolbar.
Related: system Back and the PIP Photo toolbar entry do the same; Cinematic Reel Creator, AI Anime Video and Video Edit by Chat keep the selection.
Spec Link: PDRM Toolbar re-org sheet, tab 2026/11 Auto Reframe (Photo and PIP Photo toolbars, Tools) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/05_ISS-AWA-24/`

---

## 6. ISS-AWA-25 — AI Cartoon and AI Sketch results are not kept in My Artwork  ·  Class: Functional  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-283, TC-289  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Q-11 assumed AI Cartoon and AI Sketch are image results like Text to Image (My Artwork, Save). On 2611251 Launcher › AI Magic › AI Cartoon / AI Sketch create a new editor project and apply the style on the photo through Photo toolbar › Portrait › AI Style Transfer (O-14); My Artwork has no AI Cartoon or AI Sketch block, so there is no result page and no Save. The export of such a project carries the label (12% top-left, 0–2 s) and one CyberLink manifest, so the watermark itself works; only where the result lives is open. The PM scope board lists AI Cartoon and AI Sketch among the tools whose content is AI. Neither tool charged credits (KP-091).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] AI Cartoon / AI Sketch: Results are applied in a new project and never listed in My Artwork
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「AI Magic」 on the Launcher
3. Tap 「AI Cartoon」
4. Tap 「Try It Now」
5. Pick a portrait photo
6. Tap a style
7. Tap the check mark
8. Go back to the Launcher
9. Tap 「AI Magic」
10. Tap 「My Artwork」
11. Check the list

Result:
My Artwork has no AI Cartoon or AI Sketch block; the result exists only on the photo in a new project.
摘要：My Artwork 沒有 AI Cartoon / AI Sketch，結果只套在新專案的相片上。
{16.9.0_awa25_not_in_my_artwork.jpg}

Expect Result:
PM to decide whether these results belong in My Artwork with a result page and 「Save」.
摘要：請 PM 決定這些結果是否應列在 My Artwork。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the PM scope board names AI Cartoon and AI Sketch as AI content but does not say whether their results are My Artwork items.
Related: the exported project carries the AI label and a CyberLink manifest.
Spec Link: Remove AIGC Watermark PM spec, scope board (AI Cartoon, AI Sketch) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/06_ISS-AWA-25/`

---

## 7. ISS-AWA-26 — Backing out of AI Cartoon or AI Sketch at the photo step leaves an empty editor project  ·  Class: UX  ·  Severity: S4  ·  Owner: PM

**Report step:** TC-284, TC-285, TC-290, TC-291  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-061: leaving before anything is made returns to the screen the tool was opened from. Launcher › AI Magic › AI Cartoon (or AI Sketch) › 「Try It Now」 opens Add Media; its ‹ or system Back shows an empty 9:16 editor (「Tap to insert media on main track.」, 00:00/00:00) instead of the AI Magic tab, and the editor's Home goes to the Launcher's Home tab. The empty project was not kept in the Project list. The intro page's own ‹ / Back do return to AI Magic. No credits taken.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] AI Cartoon / AI Sketch: Back at the photo step lands in an empty editor, not AI Magic
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「AI Magic」 on the Launcher
3. Tap 「AI Cartoon」
4. Tap 「Try It Now」
5. Tap the back button on the photo page
6. Check the screen

Result:
An empty editor project shows instead of the AI Magic tab.
摘要：按返回後出現空白編輯器，而不是回到 AI Magic。
{16.9.0_awa26_back_empty_editor.jpg}

Expect Result:
PM to decide whether Back at the photo step should return to the AI Magic tab.
摘要：請 PM 決定選相片頁返回時是否應回到 AI Magic。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — no spec draws the exit from the AI Cartoon / AI Sketch photo step.
Related: the editor reads 「Tap to insert media on main track.」; system Back and AI Sketch do the same.
Spec Link: Remove AIGC Watermark PM spec, scope board (AI Cartoon, AI Sketch) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/07_ISS-AWA-26/`

---

## 8. ISS-AWA-27 — Leaving Text to Speech without generating keeps the title it added  ·  Class: UX  ·  Severity: S4  ·  Owner: PM

**Report step:** TC-296, TC-297, TC-302, TC-303  ·  **Reproduce:** 5/5  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Editor › Text › Text to Speech and Editor › AI Magic › Text to Speech add a 「Tap to Edit」 title before the voice panel; after typing a line and leaving 「Select Voice」 with ‹ or system Back (no voice generated, no credits), the title stays on the timeline (project 00:08 → 00:13). The primary entry Audio › Text to Speech does the same (e1d-tts-primary-back). Text toolbar › Text to Speech uses the selected title and adds none, so it passes (TC-310 / TC-311). R-061 expects 「nothing added to or changed on the timeline」 when leaving before anything is made.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Text to Speech: Leaving without a voice keeps the new title on the timeline
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Open a project with a video clip
3. Tap 「Text」 in the editor toolbar
4. Tap 「Text to Speech」
5. Type a line
6. Tap the back button on 「Select Voice」
7. Check the timeline

Result:
No voice is made, but the title the tool added stays on the timeline.
摘要：未產生語音，但工具新增的標題仍留在時間軸上。
{16.9.0_awa27_title_left.jpg}

Expect Result:
PM to decide whether leaving Text to Speech before a voice is made should remove the title it added.
摘要：請 PM 決定未產生語音即離開時，是否應移除工具新增的標題。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — no spec states what happens to the added title when Text to Speech is left.
Related: the project grows from 00:08 to 00:13; system Back and the AI Magic and Audio entries do the same.
Spec Link: Remove AIGC Watermark PM spec, timeline board (Text-2-Speech AI content) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/08_ISS-AWA-27/`

---

## 9. ISS-AWA-28 — AI Voice Changer from the Audio menu leaves the main clip selected after closing  ·  Class: UX  ·  Severity: S4  ·  Owner: PM

**Report step:** TC-314, TC-315  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Editor (nothing selected) › 「Audio」 › 「AI Voice Changer」 selects the clip under the playhead when the panel opens (outlined in the preview); closing with ✕ or system Back without applying returns with MOV_0046 selected and the Video clip toolbar shown, not the Global toolbar it was opened from. Nothing else changes (no voice applied, no credits). R-061 expects the same selection as before.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Editor (AI Voice Changer): Closing it from the Audio menu leaves the main clip selected
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Open a project with a video clip
3. Tap an empty area of the timeline
4. Tap 「Audio」 in the editor toolbar
5. Tap 「AI Voice Changer」
6. Tap the close button
7. Check the timeline selection

Result:
The main clip is now selected, although nothing was selected before.
摘要：關閉後主軌影片變成選取狀態並顯示素材工具列，但開啟前並未選取任何素材；系統返回鍵相同。
{16.9.0_awa28_clip_left_selected.jpg}

Expect Result:
PM to decide whether closing AI Voice Changer without applying should restore 「nothing selected」.
摘要：請 PM 決定未套用即關閉時是否應恢復為未選取狀態。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — no spec states the selection after closing AI Voice Changer opened from the Audio menu.
Related: the clip toolbar shows instead of the Global toolbar; system Back does the same.
Spec Link: PDRM Toolbar re-org sheet, tab 2026/11 Auto Reframe (Global toolbar, Audio) -
https://docs.google.com/spreadsheets/d/1OvToKsZ6tTkROzuznVnVfUfU3oRCY8SQHrMk0xGuIes/edit?gid=366131507#gid=366131507
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/09_ISS-AWA-28/`

---

## 10. ISS-AWA-29 — Back from My Artwork opened through the Menu lands on Home with the Menu closed  ·  Class: UX  ·  Severity: S4  ·  Owner: PM

**Report step:** TC-367  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** R-061: leaving returns to the screen the page was opened from. Home › ☰ (Menu drawer) › 「My Artwork」 opens the AI Magic tab's My Artwork sub-tab; system Back goes to the Launcher Home tab with the drawer closed (3 times this run). From the 「Pro」 (Mine) tab the same Back returns to Pro (TC-371 Pass). Closing a drawer on navigation is common Android behaviour, hence S4 and a PM decision.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] Menu (My Artwork): Back returns to Home with the Menu closed, not to the Menu
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap the Menu icon on the Launcher
3. Tap 「My Artwork」
4. Press the system Back key
5. Check the screen

Result:
The Launcher's Home tab shows with the Menu closed, not the Menu that opened My Artwork.
摘要：按系統返回鍵後回到首頁且選單已關閉，而不是回到開啟 My Artwork 的選單。
{16.9.0_awa29_menu_back.jpg}

Expect Result:
PM to decide whether Back from My Artwork should reopen the Menu it was opened from.
摘要：請 PM 決定由選單開啟 My Artwork 後按返回是否應回到選單。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the spec draws My Artwork from AI Magic only; the Menu entry's exit is not drawn.
Related: from the Pro tab's My Artwork, Back returns to the Pro tab.
Spec Link: Remove AIGC Watermark PM spec, My Artwork board (thumbnails, View, Full Editor) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/10_ISS-AWA-29/`

---

## 11. ISS-AWA-30 — My Artwork opened from the Pro tab has no side margin  ·  Class: UI  ·  Severity: S4  ·  Owner: PM

**Report step:** O-17 (TC-368, TC-369)  ·  **Reproduce:** 2/2  ·  **Verified on:** 16.9.0.2611251

> **QA note — not pasted into eBug.** Visible defect with no spec basis (no Design draws this page), filed to PM for a decision. My Artwork from the 「Pro」 (Mine) tab is a page of its own (‹ My Artwork) whose headings and tile rows start at x = 0 (block titles at x 0 in the page source; tiles cut at both edges), while the AI Magic tab's My Artwork keeps a 46 px gutter (block titles at x 46). Content and controls are otherwise the same (TC-369 Pass).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] My Artwork (Pro tab): Headings and tiles touch the screen edges with no side margin
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「Pro」 on the Launcher's bottom bar
3. Tap 「My Artwork」
4. Check the page's left and right edges

Result:
The block titles and tiles touch the screen's left and right edges, with no side margin.
摘要：區塊標題與縮圖貼齊螢幕左右邊緣，沒有邊距；AI Magic 分頁內的 My Artwork 有邊距。
{16.9.0_awa30_no_side_margin.jpg}

Expect Result:
The page keeps the same side margin as My Artwork in the AI Magic tab (PM to confirm, no Design for this page).
摘要：應與 AI Magic 分頁內的 My Artwork 有相同的左右邊距（無 Design，請 PM 確認）。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Basis: In-product — the same page in the AI Magic tab keeps a side margin; no Design draws the Pro tab's My Artwork.
Spec Link: Remove AIGC Watermark PM spec, My Artwork board (My Artwork tiles) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images/11_ISS-AWA-30/`

---

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| TC-295, TC-301, TC-307, TC-313, TC-319, TC-325, TC-331, TC-337 | No AI label in the editor preview (Q-10); export manifest as TC-157 (Q-13) | Repeat filed Android tickets DRA262611P0224 (Q-10) and DRA262611P0322 (Q-13): left off, `dedupe.txt`. Every export showed the AIGC dialog and carried the label (12%, 0–2 s) and one CyberLink manifest. |
| TC-343, TC-351, TC-359 (TC-344/345, 352/353, 360/361 Blocked) | AI Music Generator from three editor entries: no AIGC dialog with the switch Off; songs carry no C2PA manifest | Dialog = DRA262611P0229 (filed, same OS). No manifest = R2 draft ISS-AWA-17 (TC-119), still unfiled: left off as a repeat, as R3 did. |
| TC-159 | Entries not under requirements.md › Entry points | `spec-addition`: a table gap for the next draft, not an app defect. |
| O-1 | A Video Edit by Chat task failed server-side (error 4005) with only 「Report」 and no error text | Other feature's failure display; no AIGC rule; not charged. Information only. |
| O-4 | Text to Video once priced ◆25 instead of ◆70 after a JsonSyntaxException | Not reproduced in four reopens (KP-067). |
| O-5 | A Text to Video task failed at once and was refunded | Server failure, refund shown; information only. |
| O-6 | Text to Image 「Inspirations」 empty on two entries | Other feature's CMS content; information only. |
| O-7 | Text to Image result right after Generate has no 「Add to Timeline」 | Seen from two entries; other feature's page; information only. |
| O-8 | AI Anime Video's automatic gallery copy written 20 min late for the PIP task | Timing only; the copy follows the switch (KF-006). |
| O-9 | Talking Avatar task list empty of older tasks | Account history; information only. |
| O-10 | PIP Photo › Tools reads 「Text to Image」, sheet says 「AI Text to Image」 | Label only; opens the same page. Information for the toolbar sheet owner. |
| O-11, O-13 | Free AI Style Transfer paywall; Pro test re-buy | Account state; information only. |
| O-12 | Back from editor › ⋯ › My Artwork result lands on the Launcher | Project saved and reopened fine; information only. |
| O-14 | AI Style Transfer back in the editor on 2611251 | Changes Q-11's R3 note (TC-073 – TC-078 can run again); for the next draft. |
| O-15 | One Produce of a two-4K-clip project failed with a decoder error | Retry worked; Sony decoder limits (KP-069). |
| O-16 | System Internet panel appeared once; banner Back path | Not reproduced; Back path recorded in TC-374. |
| O-18 | Each share tap re-saves the I2V video; YouTube / Facebook music-copyright notice | Known save behaviour (KP-080); information only. |

## Reconciliation

| Item | Result | Became |
|---|---|---|
| TC-172, TC-178, TC-202, TC-208, TC-214, TC-220 | Fail (question), Q-22 | ISS-AWA-20 |
| TC-173, TC-179, TC-203, TC-209 | Fail (question) | ISS-AWA-21 |
| TC-161 | Fail (question) | ISS-AWA-22 |
| TC-252 | Fail (question) | ISS-AWA-23 |
| TC-272, TC-273, TC-278, TC-279 | Fail (question) | ISS-AWA-24 |
| TC-283, TC-289 | Fail (question) | ISS-AWA-25 |
| TC-284, TC-285, TC-290, TC-291 | Fail (question) | ISS-AWA-26 |
| TC-296, TC-297, TC-302, TC-303 | Fail (question) | ISS-AWA-27 |
| TC-314, TC-315 | Fail (question) | ISS-AWA-28 |
| TC-367 | Fail (question) | ISS-AWA-29 |
| O-17 (TC-368, TC-369 Pass) | observation | ISS-AWA-30 |
| TC-295, TC-301, TC-307, TC-313, TC-319, TC-325, TC-331, TC-337 | Fail (question), Q-10 / Q-13 | left off: DRA262611P0224, DRA262611P0322 |
| TC-343, TC-351, TC-359 | Fail (defect) | left off: DRA262611P0229 + unfiled ISS-AWA-17 |
| TC-159 | Fail (spec-addition) | not an eBug (next draft) |
| TC-215 – TC-219, TC-221 – TC-225 | Blocked (test-data) | covered by ISS-AWA-20 (no AI Remove) |
| TC-344, TC-345, TC-352, TC-353, TC-360, TC-361 | Blocked (defect, upstream) | covered by DRA262611P0229 |

41 failed rows + 1 observation → 11 entries; 11 rows left off as repeats; 1 spec addition.
