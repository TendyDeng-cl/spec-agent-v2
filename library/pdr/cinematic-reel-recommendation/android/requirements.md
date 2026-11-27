# Cinematic Reel Creator — Photo Tips (Recommendation page) — requirements (android)
Spec: PDRA-661 Jira description.md, Cinematic Reel Recommendation - Design Figma 107-2283.md, Cinestory CMS - Recommendation.md (spec set specs/2026-11-23, Figma-only: Design frame 107:2283 「26.07_v2」 read 2026-11-23, board d-cinestory); REQ-006 (2026-11-25): TR261019-014, TR260923-022 and every tab of the sheets they link (specs/2026-11-25: I2V Recommendation 7 tabs, Cinestory CMS 9 tabs)

Scope: Jira PDRA-661 (PDRIOS-738), 「(UX) Add recommendation page for Cinemantic Reel Creeator」, the Design's 0820 frames 「add photo tips tag」 and 「add photo tips」, and the CMS tab Recommendation. The rest of the 26.07_v2 board is the existing Cinematic Reel Creator flow and is not this ticket's table.

Draft 20261125-160000 [Req: REQ-002, REQ-007]: the MUI section (spec-casebook references/mui.md) for the 26 languages of
`library/pdr/product.json` › `mui` besides English. Android: one row reads the app's own strings from the build's APK; the CMS text is already checked per language by the Language rows, which now also check the truncation of the chip and the sheet sentence (no second walk per language).
The MUI rows are their own phase (phases.json `MUI`), never part of a full run. New: R-035, R-036; 1 rows, TC-076; 52 Language rows modified.

Draft 20261125-190000 [Req: REQ-009]: every Open question that is still open gets a row that takes the app to the point in
question (user, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases already?」). New rows: TC-077 (Q-3: tap the dimmed area, swipe the sheet
down), TC-078 and TC-079 (Q-4: offline). Q-1, Q-2 and Q-5 already name the rows that observe them. No requirement changes.

Draft 20261126-111221 [Req: REQ-010]: every entry point (analysis.md pass 12; user, 2026-11-26: 「for any features that have multiple entry points, each entry needs to be tested completely and cannot assume they both lead to the same thing and have the same behavior」).
Rule changed by the user the same day (2026-11-26): 「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options」: the primary entry keeps the full table, every other entry gets a UI pass. The Launcher (primary, the Design's entry) gets a landing row and a reel generated (user ruling 2026-11-26
「Yes, generate per entry」): TC-080 – TC-083. The AI Magic tab and three editor toolbar places (KP-107) each get four
rows in their own Section: the landing, every control once, Add Media and the photo, Generate once and every exit:
TC-084 – TC-087, TC-088 – TC-091, TC-092 – TC-095, TC-096 – TC-099. New: R-037 – R-041, Q-8 – Q-10 (the per-entry questions Q-6 and Q-7 of the same day were trimmed: user, 2026-11-26 「yes, trim them」; the AI Magic tab and Global Toolbar rows assert the Launcher behaviour).

## View photo tips chip
- R-001 [DS:d-cinestory 0820 add photo tips tag 1106:5843] Every template card on the Cinematic Reel Creator template page shows a 「View photo tips」 chip with a lightbulb icon at the card's top-left corner, over the preview video.
- R-002 [DS: flow arrow 1106-5840 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5840] Template card 「View photo tips」 → photo tips sheet: tapping the chip opens the photo tips sheet over the template page.
- R-003 [Jira PDRA-661 「每個template有各自的 recommendation/avoid」] Each template has its own recommendation page: the chip on a card opens the tips of that card's template, named in the sheet.

## Media room ?
- R-004 [Jira PDRA-661 「每個 template 會有 chip & media room "?" 都可以打開 recommendation page」] The Add Media room opened from a template (「Import a Photo」) has a 「?」 that opens the photo tips of that template. PM-only: no Design frame yet (Design 26.07_v2 draws Add Media without a 「?」, its round/ic_info layer hidden; Q-1).
- R-005 [DS: flow arrow 108-15190 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=108-15190] Template card 「Import a Photo」 → Add Media: the Add Media room opens. Walked by: TC-010 – TC-015.

## Photo tips sheet
- R-006 [DS:d-cinestory 0820 add photo tips 1106:5841] The sheet opens with 「For best results with the <template> template, follow this advice:」, the template name in bold.
- R-007 [DS:d-cinestory 0820 add photo tips] Under 「Recommendation」 (blue bar) the template's two recommended items are shown, each a picture with a ✓ badge at its bottom-right and its caption below.
- R-008 [DS:d-cinestory 0820 add photo tips] Under 「Avoid」 (pink bar) the template's three items to avoid are shown, each a picture with a ⊗ badge and its caption below.
- R-009 [DS:d-cinestory 0820 add photo tips] The Avoid row is wider than the sheet: the third item runs past the right edge and is reached by swiping the row (Q-5).
- R-010 [DS:d-cinestory 0820 add photo tips] 「Got it」 at the bottom closes the sheet and returns to the screen it was opened from, unchanged (Q-3).
- R-011 [DS:d-cinestory 0820 add photo tips] The sheet covers the lower part of the screen; the template page behind it is dimmed, its header still visible.

## Content from CMS
- R-012 [Link: Cinestory CMS › Recommendation; I2V Recommendation › Recommendation_Page (CMS) #54–67 「for cinestory」; Jira 「from CMS」] Each template shows the items of its CMS row: Horror Movie — Recommendation 「People in Frame」, 「Layered Depth」, Avoid 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Micro Cinema — 「Mid-Distance Framing」, 「Rich Visual Details」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; One-Take Shot — 「Mid-Distance Framing」, 「Layered Depth」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Time Lapse — 「Visible Sky」, 「Cityscape or Landscape」 / 「Portrait as Subject」, 「Indoor Close-up」, 「Extreme Close-up」; Handheld Camera — 「Layered Depth」, 「Rich Visual Details」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Fast Cut — 「Sense of Motion」, 「Rich Visual Details」 / 「Static Composition」, 「Visible Text or Logos」, 「Extreme Close-up」.
- R-013 [Link: Cinestory CMS › Recommendation, picture list; I2V Recommendation › Recommendation_Page (CMS) #56] Fast Cut's 「Rich Visual Details」 is item #56 (Image_to_video_recommend_rich_visual_details_fast_cut) with its own picture, not the one the other templates show for that item; its caption is 「Rich Visual Details」 (「…for Fast Cut」 is an internal label, user 2026-11-25).
- R-014 [Jira 「from CMS (同I2V開法)」; CMS columns row 20 recommend_samples] The recommendations are server-configured in the CMS (field recommend_samples per template), not built into the app.
- R-015 [Link: Cinestory CMS › Template Name Localization] The template name in the sheet's first sentence follows the app language in all 28 languages of the sheet (Micro Cinema: CHT 「微電影畫境」, JPN 「マイクロシネマ」); whether the sentence and the chip are translated is open (Q-2).

## System back
- R-016 [Rule 8: Android system Back, team rule 2026-10-28] On Android, system Back on the photo tips sheet closes it like 「Got it」 and returns to the screen it was opened from (Q-3).

## Other Cinematic Reel Creator arrows on the board (not PDRA-661)
- R-017 [DS: flow arrow 110-15623 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=110-15623] Preview 「Generate」 → Analyzing & Generating. — NOT TESTABLE: generation flow of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-018 [DS: flow arrow 108-15191 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=108-15191] Add Media photo → preview with 「Generate」. — NOT TESTABLE: photo pick of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-019 [DS: flow arrow 111-16517 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-16517] Analyzing & Generating → progress step. — NOT TESTABLE: generation progress of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-020 [DS: flow arrow 111-23987 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-23987] Analyzing & Generating → recent tasks (Processing). — NOT TESTABLE: generation progress of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-021 [DS: flow arrow 111-24458 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-24458] Recent tasks → done card with 「View」. — NOT TESTABLE: recent tasks of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-022 [DS: flow arrow 111-17798 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-17798] 「View later」 → recent tasks. — NOT TESTABLE: generation flow of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-023 [DS: flow arrow 111-21605 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-21605] 「Create another one」 → template page. — NOT TESTABLE: generation flow of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-024 [DS: flow arrow 111-23476 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-23476] Recent task 「View」 → result page. — NOT TESTABLE: result page of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-025 [DS: flow arrow 111-26343 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-26343] Result 「Add Text」 → title templates. — NOT TESTABLE: result page of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-026 [DS: flow arrow 111-28894 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-28894] Result 「Edit Music」 → music library. — NOT TESTABLE: result page of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-027 [DS: flow arrow 230-4451 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=230-4451] Tutorial ✕ → template page (tutorial folds into ?). — NOT TESTABLE: first-run tutorial of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-028 [DS: flow arrow 230-3698 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=230-3698] Template page history → empty recent tasks. — NOT TESTABLE: recent tasks of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.

## Template cards (TR260923-022, REQ-006)
- R-029 [Link: Cinestory CMS › Order; user ruling 2026-11-25] The template cards follow the app language: 繁體中文, 简体中文, 日本語 and 한국어 get the 「PDRM JP/TW/KOR/CHS」 order 「Horror Movie」, 「Micro Cinema」, 「Fast Cut」, 「One-Take Shot」, 「Handheld Camera」, 「Time Lapse」; every other language the 「PHDM/PDRM Global」 order 「Horror Movie」, 「Micro Cinema」, 「Fast Cut」, 「One-Take Shot」, 「Time Lapse」, 「Handheld Camera」.
- R-030 [Link: Cinestory CMS › Template Name Localization] Each card shows the template name in the app language, for the 28 languages of the sheet (en … uk).
- R-031 [Link: Cinestory CMS › Template Description Localization rows 2–7; CMS columns 「Description … Mobile UI Shown V」] Each card shows the template description in the app language; rows 17–21 of that tab are greyed out (old) and do not apply (the CMS Data tab still holds the old English text for Micro Cinema).

## Captions per language (TR261019-014, REQ-006)
- R-032 [Link: I2V Recommendation › Localization] Every photo tips caption is shown in the app language as the Localization tab gives it, for the 14 Cinestory items (#54–67) and 28 languages.
- R-033 [Link: I2V Recommendation › Localization; Recommendation_Page (CMS)] — NOT TESTABLE as a separate rule: the CMS item records (GUID, ContentVer 1.0, Category) are server data; what the app shows of them is R-012, R-032 and R-034.

## Pictures (TR261019-014 「Thumbnail」, REQ-006)
- R-034 [Link: Cinestory CMS › Recommendation › Pic Link (JP and EN columns); user ruling 2026-11-25] Each item's picture is the sheet's picture for that item: the JP column in 繁體中文, 简体中文, 日本語 and 한국어, the EN column in every other language (Mid-Distance Framing and People in Frame differ between the two); an item shared by templates shows the same picture on each, except Fast Cut's 「Rich Visual Details」 (R-013).

## Not in these TRs (REQ-006, user 2026-11-25)
- Template previews, sample photos, model, aspect ratio, duration and action IDs (Cinestory CMS › CMS Data, Template Style id, action id, Thumbnail Size): generation settings, not tested here.
- The I2V Recommendation tabs Temp_QA, Recommend/Avoid_Final (other than its CineStory block), Template, FAQ and samples: Image to Video templates, not Cinematic Reel Creator.

## Entry points (pass 12, REQ-010)
- R-037 [DS:d-cinestory Launcher_2026_v1 361:16292; Rule 12: entry points; Req: REQ-010] Primary entry: Launcher › 「Cinematic Reel Creator」 opens the template page directly (tutorial dismissed before) with the template cards and their 「View photo tips」 chips; ‹ and system Back on the template page return to the Launcher (leave and return, team QA rule). A reel generated from it (user ruling 2026-11-26, REQ-010): an Add Media pick → preview 「Generate」 with its price → Analyzing & Generating → task list → 「View」 → result page; the price is charged once and the reel shows in My Artwork, no project created (TC-081 – TC-083; leaving during and after: Q-10).
- R-038 [KB: KP-012; Rule 12: entry points; Req: REQ-010] Launcher › 「AI Magic」 tab › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry; every chip, photo tips sheet, Add Media control and the preview respond once with no error; Generate is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork; ‹ and system Back return to the AI Magic tab. The spec does not draw this entry: its rows assert the Launcher behaviour, and a missing entry is raised at the phase wrap-up. UI pass TC-084 – TC-087 (user rule 2026-11-26).
- R-039 [KB: KP-107 toolbar sheet 「2026/11 Auto Reframe」 Global Toolbar › AI Magic (7/E); Rule 12: entry points; Req: REQ-010] In the editor with nothing selected, Global Toolbar › 「AI Magic」 › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry, bringing nothing in; every control responds once with no error; Generate takes an Add Media pick, is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork, the project unchanged; ‹ and system Back return to the editor. The spec does not draw this entry: its rows assert the Launcher behaviour, and a missing entry is raised at the phase wrap-up. UI pass TC-088 – TC-091.
- R-040 [KB: KP-107 toolbar sheet 「2026/11 Auto Reframe」 Photo Toolbar › Effects (7/E); Rule 12: entry points; Req: REQ-010] With a main-track photo selected, Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry; whether the selected photo is brought in is not stated; the preview shows the photo it takes as it is; every control responds once with no error; Generate is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork, the main-track photo kept; ‹ and system Back return to the editor with that photo still selected (Q-8). UI pass TC-092 – TC-095.
- R-041 [KB: KP-107 toolbar sheet 「2026/11 Auto Reframe」 PIP Photo Toolbar › Effects (7/E); Rule 12: entry points; Req: REQ-010] With an overlay photo selected, PIP Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」 opens the same template page as the Launcher entry; whether the selected overlay photo is brought in is not stated; the preview shows the photo it takes as it is; every control responds once with no error; Generate is charged the Launcher entry's price once and the reel lands only in the task list and My Artwork, the overlay photo kept; ‹ and system Back return to the editor with that photo still selected (Q-9). UI pass TC-096 – TC-099.

## MUI
- R-035 [Req: REQ-002] Every user-facing string of the feature shows in each language of the product list (CHT, CHS, JPN, ESP, KOR, DEU, FRA, ITA, RUS, PTB, NLD, IND, THA, MAY, HIN, ESM, ARA, VIT, PLK, TRK, FAR, HEB, SVE, DAN, NOR, UKR): the app's own strings (「View photo tips」, 「For best results with the <template> template, follow this advice:」, 「Recommendation」, 「Avoid」, 「Got it」) in that language's own words with the English meaning, with no English, key or placeholder left (read from the build, `mui-strings.ts`; the CMS text per language is R-030 – R-032). No translation sheet for the app strings: the run judges them; doubtful ones are listed for the eBug review, not failed.
- R-036 [Req: REQ-002] In each of those languages no string of the feature is truncated, clipped or overlapping: the chip stays inside its pill, the sheet sentence wraps instead of being cut, every name, description and caption shows in full; the right-to-left languages (ARA, FAR, HEB) run from the right.

## Open questions
- Q-1 Media room 「?」: the Jira says the Add Media room has a 「?」 that opens the recommendation page, but the Design 26.07_v2 draws Add Media without one (the round/ic_info layer is hidden), and the template page's own 「?」 is the tutorial. Where is the 「?」, what icon, and does it show the tips of the template the room was opened from? Assumption: a 「?」 in the Add Media header opens the tips of that template; 「Got it」 returns to Add Media. R-004, TC-010 – TC-016, TC-021.
- Q-2 Language: the sheets translate the template names (Cinestory CMS › Template Name Localization) and every caption (I2V Recommendation › Localization, 28 languages), but no sheet gives the chip 「View photo tips」 or the sentence 「For best results with the <template> template, follow this advice:」 in other languages. Are they translated? Filed as DRA262611P0290 (PM). Assumption: names and captions are checked per language; the chip and sentence words are recorded and not failed. R-015, R-032, TC-017, TC-018 and the Language rows. MUI (REQ-002): every PowerDirector feature is implemented in the 26 languages of the product list, so the APK row TC-076 expect the chip and sentence translated; a miss is DRA262611P0290, cited, not filed again.
- Q-3 Closing: the Design draws only 「Got it」. Does tapping the dimmed area or swiping the sheet down close it, and does system Back? Assumption: system Back closes the sheet like 「Got it」 (TC-020; from Add Media TC-021); none for the other two: TC-077 does both and records what each does as Fail (question) for PM. R-010, R-016, TC-007, TC-020, TC-021, TC-077.
- Q-4 Missing data: what shows when a template has no recommend_samples in the CMS, or the CMS cannot be reached (offline)? Assumption: none. Offline: TC-078 (the app started with no network) and TC-079 (a sheet loaded online, then reopened offline, and one not opened before) record what the template page, the chip and the sheet show as Fail (question) for PM. A template with no recommend_samples cannot be set up by QA (the CMS is the server's and every template has its items): that half needs PM's answer and has no row. R-001, R-012, R-014, TC-078, TC-079.
- Q-5 Scrolling: the Design draws the third Avoid item past the sheet's edge. Does the Avoid row scroll sideways, and would the Recommendation row scroll if a template had more than two? Assumption: the Avoid row scrolls sideways. R-009, TC-008.
- Q-8 Editor Photo Toolbar entry: the toolbar sheet places Cinematic Reel Creator under Photo Toolbar › Effects (7/E) for a main-track photo, and no spec draws it. Is it in the build, and does the selected photo come into Cinematic Reel Creator (shown on a card or a preview, 「Import a Photo」 skipped, so Add Media and its 「?」 are not reached), or does the same template page open as from the Launcher? Where do ‹ and system Back return, and does a generated reel replace that photo on the main track? Assumption: the same template page as from the Launcher, nothing brought in, ‹ and system Back return to the editor with the photo still selected and unchanged, and the reel lands only in the task list and My Artwork. R-040, TC-092 (presence, what it brings in), TC-094 (the photo the generation takes), TC-095 (Generate, where the reel lands, exits).
- Q-9 Editor PIP Photo Toolbar entry: the toolbar sheet places Cinematic Reel Creator under PIP Photo Toolbar › Effects (7/E) for an overlay photo, and no spec draws it. Is it in the build, does the selected overlay photo come in (「Import a Photo」 skipped) or does the same template page open as from the Launcher, where do ‹ and system Back return, and does a generated reel replace the overlay photo on its overlay track or go to the main track? Assumption: the same template page as from the Launcher, nothing brought in, ‹ and system Back return to the editor with the overlay photo still selected and unchanged, and the reel lands only in the task list and My Artwork. R-041, TC-096 (presence, what it brings in), TC-098 (the photo the generation takes), TC-099 (Generate, where the reel lands, exits).
- Q-10 Leaving during and after a generation: the Design draws only 「View later」 and 「Create another one」 on Analyzing & Generating, and the result page's own buttons, but no ‹ and system Back on either page. What should ‹ and system Back do while the photo uploads or the reel is generated (cancel with a refund, keep the task running, a leave dialog), and where should ‹ and system Back on the result page lead? Assumption: none: the rows record it as Fail (question) for PM, during (TC-082, TC-087, TC-091, TC-095, TC-099) and after (TC-083, TC-087, TC-091, TC-095, TC-099). R-037 – R-041.

## Added 2026-11-23 — coverage passes and standing inputs
### Flow arrows walked by existing rows
- R-002 (arrow 1106-5840): TC-001 – TC-006 tap the chip.
- R-005 (arrow 108-15190): Walked by: TC-010 – TC-015.

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-014 | The items come from the CMS field recommend_samples, not the app | The app log after a log pull (CMS template data), compared with what each sheet showed | TC-019 |
| R-014 | The items are fetched from the server, so they can be out of reach (Q-4) | The template page, the chips and the sheets with the phone offline, at a cold start and after one sheet was loaded | TC-078, TC-079 |
| R-010 | 「Got it」 is the only way to close that the Design draws (Q-3) | A tap on the dimmed area and a swipe down on the sheet | TC-077 |

### Variants

| Requirement | Variant | Rows |
|---|---|---|
| R-012 | template=Horror Movie | TC-001 |
| R-012 | template=Micro Cinema | TC-002 |
| R-012 | template=One-Take Shot | TC-003 |
| R-012 | template=Time Lapse | TC-004 |
| R-012 | template=Handheld Camera | TC-005 |
| R-012 | template=Fast Cut | TC-006 |
| R-001 | template=Horror Movie | TC-001 |
| R-001 | template=Micro Cinema | TC-002 |
| R-001 | template=One-Take Shot | TC-003 |
| R-001 | template=Time Lapse | TC-004 |
| R-001 | template=Handheld Camera | TC-005 |
| R-001 | template=Fast Cut | TC-006 |
| R-004 | template=Horror Movie | TC-010 |
| R-004 | template=Micro Cinema | TC-011 |
| R-004 | template=One-Take Shot | TC-012 |
| R-004 | template=Time Lapse | TC-013 |
| R-004 | template=Handheld Camera | TC-014 |
| R-004 | template=Fast Cut | TC-015 |
| R-015 | language=ENU | TC-002 |
| R-015 | language=CHT | TC-017 |
| R-015 | language=JPN | TC-018 |
| R-035 | CHT (Traditional Chinese) | TC-076 |
| R-036 | CHT (Traditional Chinese) | TC-024, TC-017 |
| R-035 | CHS (Simplified Chinese) | TC-076 |
| R-036 | CHS (Simplified Chinese) | TC-025, TC-026 |
| R-035 | JPN (Japanese) | TC-076 |
| R-036 | JPN (Japanese) | TC-027, TC-018 |
| R-035 | ESP (Spanish) | TC-076 |
| R-036 | ESP (Spanish) | TC-028, TC-029 |
| R-035 | KOR (Korean) | TC-076 |
| R-036 | KOR (Korean) | TC-030, TC-031 |
| R-035 | DEU (German) | TC-076 |
| R-036 | DEU (German) | TC-032, TC-033 |
| R-035 | FRA (French) | TC-076 |
| R-036 | FRA (French) | TC-034, TC-035 |
| R-035 | ITA (Italian) | TC-076 |
| R-036 | ITA (Italian) | TC-036, TC-037 |
| R-035 | RUS (Russian) | TC-076 |
| R-036 | RUS (Russian) | TC-038, TC-039 |
| R-035 | PTB (Portuguese (Brazil)) | TC-076 |
| R-036 | PTB (Portuguese (Brazil)) | TC-040, TC-041 |
| R-035 | NLD (Dutch) | TC-076 |
| R-036 | NLD (Dutch) | TC-042, TC-043 |
| R-035 | IND (Indonesian) | TC-076 |
| R-036 | IND (Indonesian) | TC-044, TC-045 |
| R-035 | THA (Thai) | TC-076 |
| R-036 | THA (Thai) | TC-046, TC-047 |
| R-035 | MAY (Malay) | TC-076 |
| R-036 | MAY (Malay) | TC-048, TC-049 |
| R-035 | HIN (Hindi) | TC-076 |
| R-036 | HIN (Hindi) | TC-050, TC-051 |
| R-035 | ESM (Spanish (Mexico)) | TC-076 |
| R-036 | ESM (Spanish (Mexico)) | TC-052, TC-053 |
| R-035 | ARA (Arabic) | TC-076 |
| R-036 | ARA (Arabic) | TC-054, TC-055 |
| R-035 | VIT (Vietnamese) | TC-076 |
| R-036 | VIT (Vietnamese) | TC-056, TC-057 |
| R-035 | PLK (Polish) | TC-076 |
| R-036 | PLK (Polish) | TC-058, TC-059 |
| R-035 | TRK (Turkish) | TC-076 |
| R-036 | TRK (Turkish) | TC-060, TC-061 |
| R-035 | FAR (Persian) | TC-076 |
| R-036 | FAR (Persian) | TC-064, TC-065 |
| R-035 | HEB (Hebrew) | TC-076 |
| R-036 | HEB (Hebrew) | TC-066, TC-067 |
| R-035 | SVE (Swedish) | TC-076 |
| R-036 | SVE (Swedish) | TC-068, TC-069 |
| R-035 | DAN (Danish) | TC-076 |
| R-036 | DAN (Danish) | TC-070, TC-071 |
| R-035 | NOR (Norwegian Bokmål) | TC-076 |
| R-036 | NOR (Norwegian Bokmål) | TC-072, TC-073 |
| R-035 | UKR (Ukrainian) | TC-076 |
| R-036 | UKR (Ukrainian) | TC-074, TC-075 |

### Combinations
- Not combined: template, language (the language only changes the sheet's words; one template, Micro Cinema, is read in each language)

### Domain rules

| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (the tips sheet runs no generation and charges nothing) |
| KP-066 Android text is held to the Android equivalent of the iOS font | n/a (no text rule in this table; it applies to the design check of the sheet, figma skill) |

### System back
- Photo tips sheet (from the chip): TC-020 closes it, back on the template page.
- Photo tips sheet (from the Add Media 「?」): TC-021 closes it, back on Add Media.
- Template page, Add Media and the rest of Cinematic Reel Creator: n/a (not PDRA-661; the feature's own table).

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 (analysis, both) | R-001 – R-015 (the whole table) |
| REQ-002 (table: MUI test in the 26 languages of the product list, no translation sheet) | R-035, R-036 (TC-076; truncation on the Language rows) |
| REQ-007 (table: plan the MUI cases, 2026-11-25) | R-035, R-036 |
| REQ-009 (table: every Open question still open gets an observing row, 2026-11-25) | R-010 (TC-077); R-014, R-001, R-012 (TC-078, TC-079); Q-3, Q-4 |

## Added 2026-11-25 — REQ-006 (TR261019-014, TR260923-022)

### Variants

| Requirement | Variant | Rows |
|---|---|---|
| R-029, R-030, R-031 | language=en | TC-023 |
| R-029, R-030, R-031 | language=cht | TC-024 |
| R-029, R-030, R-031 | language=chs | TC-025 |
| R-029, R-030, R-031 | language=ja | TC-027 |
| R-029, R-030, R-031 | language=es | TC-028 |
| R-029, R-030, R-031 | language=ko | TC-030 |
| R-029, R-030, R-031 | language=de | TC-032 |
| R-029, R-030, R-031 | language=fr | TC-034 |
| R-029, R-030, R-031 | language=it | TC-036 |
| R-029, R-030, R-031 | language=ru | TC-038 |
| R-029, R-030, R-031 | language=pt | TC-040 |
| R-029, R-030, R-031 | language=nl | TC-042 |
| R-029, R-030, R-031 | language=id | TC-044 |
| R-029, R-030, R-031 | language=th | TC-046 |
| R-029, R-030, R-031 | language=ms | TC-048 |
| R-029, R-030, R-031 | language=hi | TC-050 |
| R-029, R-030, R-031 | language=esm | TC-052 |
| R-029, R-030, R-031 | language=ar | TC-054 |
| R-029, R-030, R-031 | language=vi | TC-056 |
| R-029, R-030, R-031 | language=pl | TC-058 |
| R-029, R-030, R-031 | language=tr | TC-060 |
| R-029, R-030, R-031 | language=fil | TC-062 |
| R-029, R-030, R-031 | language=fa | TC-064 |
| R-029, R-030, R-031 | language=he | TC-066 |
| R-029, R-030, R-031 | language=sv | TC-068 |
| R-029, R-030, R-031 | language=da | TC-070 |
| R-029, R-030, R-031 | language=nb | TC-072 |
| R-029, R-030, R-031 | language=uk | TC-074 |
| R-032 | language=cht | TC-017 |
| R-032 | language=chs | TC-026 |
| R-032 | language=ja | TC-018 |
| R-032 | language=es | TC-029 |
| R-032 | language=ko | TC-031 |
| R-032 | language=de | TC-033 |
| R-032 | language=fr | TC-035 |
| R-032 | language=it | TC-037 |
| R-032 | language=ru | TC-039 |
| R-032 | language=pt | TC-041 |
| R-032 | language=nl | TC-043 |
| R-032 | language=id | TC-045 |
| R-032 | language=th | TC-047 |
| R-032 | language=ms | TC-049 |
| R-032 | language=hi | TC-051 |
| R-032 | language=esm | TC-053 |
| R-032 | language=ar | TC-055 |
| R-032 | language=vi | TC-057 |
| R-032 | language=pl | TC-059 |
| R-032 | language=tr | TC-061 |
| R-032 | language=fil | TC-063 |
| R-032 | language=fa | TC-065 |
| R-032 | language=he | TC-067 |
| R-032 | language=sv | TC-069 |
| R-032 | language=da | TC-071 |
| R-032 | language=nb | TC-073 |
| R-032 | language=uk | TC-075 |
| R-032 | language=en | TC-001 – TC-006 |

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-006 (TR check, android) | R-012, R-013, R-015, R-029 – R-034 |

## Added 2026-11-26 — pass 12, every entry point (REQ-010)

### Entry points
- Launcher › 「Cinematic Reel Creator」 — primary: Design d-cinestory Launcher_2026_v1 (361:16292) is the flow's first frame (board-notes 「Whole CineStory flow (Launcher, …)」) · ios, android · the full table: Sections View photo tips chip, Photo tips sheet, Media room ?, Language, Data source, MUI · every approved row, TC-080 (landing and ‹ and system Back) and TC-081 – TC-083 (a reel generated, leaving during it, the finished reel) · R-037
- Launcher › 「AI Magic」 tab › 「Cinematic Reel Creator」 — KP-012, KP-013 (the AI Magic tab lists the AI tools; the Launcher's AI-Powered Creation 「View more」 opens it); not in the toolbar sheet · ios, android (no platform note in the sheet) · UI pass, Section 「Entry › AI Magic tab › Cinematic Reel Creator」 · TC-084 landing and what it brings in, TC-085 every template page and photo tips control once, TC-086 Add Media and the photo, TC-087 Generate once and every exit · R-038
- Editor (nothing selected) › Global Toolbar › 「AI Magic」 › 「Cinematic Reel Creator」 — toolbar sheet tab 「2026/11 Auto Reframe」, Global Toolbar › AI Magic (7/E), KP-107 · ios, android (no platform note in the sheet) · UI pass, Section 「Entry › Editor › Global Toolbar › AI Magic › Cinematic Reel Creator」 · TC-088 landing and what it brings in, TC-089 every template page and photo tips control once, TC-090 Add Media and the photo, TC-091 Generate once and every exit · R-039
- Editor › select a main-track photo › Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」 — toolbar sheet tab 「2026/11 Auto Reframe」, Photo Toolbar › Effects (7/E), KP-107 · ios, android (no platform note in the sheet) · UI pass, Section 「Entry › Editor › Photo Toolbar › Effects › Cinematic Reel Creator」 · TC-092 landing and what it brings in, TC-093 every template page and photo tips control once, TC-094 Add Media and the photo, TC-095 Generate once and every exit · R-040, Q-8
- Editor › select an overlay photo › PIP Photo Toolbar › 「Effects」 › 「Cinematic Reel Creator」 — toolbar sheet tab 「2026/11 Auto Reframe」, PIP Photo Toolbar › Effects (7/E), KP-107 · ios, android (no platform note in the sheet) · UI pass, Section 「Entry › Editor › PIP Photo Toolbar › Effects › Cinematic Reel Creator」 · TC-096 landing and what it brings in, TC-097 every template page and photo tips control once, TC-098 Add Media and the photo, TC-099 Generate once and every exit · R-041, Q-9
- UI pass (user rule 2026-11-26): the other entries do not repeat the primary rows; their checklist is the primary rows' controls (named in each row's Notes). Combinations, the six templates' item lists, offline, the CMS log, Language and MUI stay with the primary entry.
- Not entries of this table: the template page's 「?」 is the tutorial (board-notes; R-027); the Add Media 「?」 opens the photo tips inside each entry's flow (R-004, Q-1); 「Create another one」 (R-023) and the task list (R-020 – R-022, R-028) return to the template page from inside Cinematic Reel Creator's generation flow. No banner, push, deep link, Mine › demo or 「You might also like」 entry is named by the spec set, the knowledge or a run of this feature; the Launcher's AI-Powered Creation 「View more」 opens the AI Magic tab (KP-013), so it is the AI Magic tab entry.
- Shared state across entries (pass 9): the tutorial, dismissed once, is assumed dismissed from every entry (each landing row checks that the page opens directly); no 「Don't show again」 or kept setting in the photo tips.

### System back (entries)
- Template page: TC-080 (Launcher), TC-087, TC-091, TC-095, TC-099.
- Photo tips sheet (chip): TC-085, TC-089, TC-093, TC-097; Add Media and its sheet: TC-086, TC-090, TC-094, TC-098; Analyzing & Generating and the result page: TC-082, TC-083, TC-087, TC-091, TC-095, TC-099.

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-010 (table: every entry point; primary full table, the others a UI pass, user 2026-11-26) | R-037 – R-041; Q-8 – Q-10 |
