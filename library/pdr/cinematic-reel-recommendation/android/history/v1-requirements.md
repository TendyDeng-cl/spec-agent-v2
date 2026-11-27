# Cinematic Reel Creator — Photo Tips (Recommendation page) — requirements (android)
Spec: PDRA-661 Jira description.md, Cinematic Reel Recommendation - Design Figma 107-2283.md, Cinestory CMS - Recommendation.md (spec set specs/2026-11-23, Figma-only: Design frame 107:2283 「26.07_v2」 read 2026-11-23, board d-cinestory)

Scope: Jira PDRA-661 (PDRIOS-738), 「(UX) Add recommendation page for Cinemantic Reel Creeator」, the Design's 0820 frames 「add photo tips tag」 and 「add photo tips」, and the CMS tab Recommendation. The rest of the 26.07_v2 board is the existing Cinematic Reel Creator flow and is not this ticket's table.

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
- R-012 [Link: Cinestory CMS › Recommendation; Jira 「from CMS」] Each template shows the items of its CMS row: Horror Movie — Recommendation 「People in Frame」, 「Layered Depth」, Avoid 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Micro Cinema — 「Mid-Distance Framing」, 「Rich Visual Details」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; One-Take Shot — 「Mid-Distance Framing」, 「Layered Depth」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Time Lapse — 「Visible Sky」, 「Cityscape or Landscape」 / 「Portrait as Subject」, 「Indoor Close-up」, 「Extreme Close-up」; Handheld Camera — 「Layered Depth」, 「Rich Visual Details」 / 「Flat Composition」, 「Visible Text or Logos」, 「Extreme Close-up」; Fast Cut — 「Sense of Motion」, 「Rich Visual Details」 / 「Static Composition」, 「Visible Text or Logos」, 「Extreme Close-up」.
- R-013 [Link: Cinestory CMS › Recommendation, picture list] Fast Cut's 「Rich Visual Details」 uses its own picture (「Rich Visual Details for Fast Cut」), not the one the other templates show for that item.
- R-014 [Jira 「from CMS (同I2V開法)」; CMS columns row 20 recommend_samples] The recommendations are server-configured in the CMS (field recommend_samples per template), not built into the app.
- R-015 [Link: Cinestory CMS › Template Name Localization] The template name in the sheet follows the app language (Micro Cinema: CHT 「微電影畫境」, JPN 「マイクロシネマ」); whether the sentence and captions are translated is open (Q-2).

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

## Open questions
- Q-1 Media room 「?」: the Jira says the Add Media room has a 「?」 that opens the recommendation page, but the Design 26.07_v2 draws Add Media without one (the round/ic_info layer is hidden), and the template page's own 「?」 is the tutorial. Where is the 「?」, what icon, and does it show the tips of the template the room was opened from? Assumption: a 「?」 in the Add Media header opens the tips of that template; 「Got it」 returns to Add Media. R-004, TC-010 – TC-016, TC-021.
- Q-2 Language: the CMS gives the template names in every language, but the picture list's JP and EN columns are empty and the sheet sentence has no translation in the spec. Are the sentence, headings and captions translated? Assumption: the template name follows the app language; rows record the rest and do not fail on it. R-015, TC-017, TC-018.
- Q-3 Closing: the Design draws only 「Got it」. Does tapping the dimmed area or swiping the sheet down close it, and does system Back? Assumption: only 「Got it」 is checked; system Back closes the sheet like it. R-010, R-016, TC-007, TC-020, TC-021.
- Q-4 Missing data: what shows when a template has no recommend_samples in the CMS, or the CMS cannot be reached (offline)? Assumption: none written; no row until PM answers. R-001, R-012, R-014.
- Q-5 Scrolling: the Design draws the third Avoid item past the sheet's edge. Does the Avoid row scroll sideways, and would the Recommendation row scroll if a template had more than two? Assumption: the Avoid row scrolls sideways. R-009, TC-008.

## Added 2026-11-23 — coverage passes and standing inputs
### Flow arrows walked by existing rows
- R-002 (arrow 1106-5840): TC-001 – TC-006 tap the chip.
- R-005 (arrow 108-15190): Walked by: TC-010 – TC-015.

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-014 | The items come from the CMS field recommend_samples, not the app | The app log after a log pull (CMS template data), compared with what each sheet showed | TC-019 |

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
