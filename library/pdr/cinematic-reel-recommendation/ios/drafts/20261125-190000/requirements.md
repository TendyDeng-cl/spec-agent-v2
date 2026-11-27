# Cinematic Reel Creator — Photo Tips (Recommendation page) — requirements (ios)
Spec: PDRA-661 Jira description.md, Cinematic Reel Recommendation - Design Figma 107-2283.md, Cinestory CMS - Recommendation.md (spec set specs/2026-11-23, Figma-only: Design frame 107:2283 「26.07_v2」 read 2026-11-23, board d-cinestory)

Scope: Jira PDRA-661 (PDRIOS-738), 「(UX) Add recommendation page for Cinemantic Reel Creeator」, the Design's 0820 frames 「add photo tips tag」 and 「add photo tips」, and the CMS tab Recommendation. The rest of the 26.07_v2 board is the existing Cinematic Reel Creator flow and is not this ticket's table.

Draft 20261125-160000 [Req: REQ-002, REQ-007]: the MUI section (spec-casebook references/mui.md) for the 26 languages of
`library/pdr/product.json` › `mui` besides English. iOS: one walk per language checks translation and truncation together; the CMS text (names, descriptions, captions) is compared with the 2026-11-25 sheets, the app's own strings are judged (no sheet).
The MUI rows are their own phase (phases.json `MUI`), never part of a full run. New: R-028, R-029; 26 rows, TC-020 – TC-045.

Draft 20261125-190000 [Req: REQ-009]: every Open question that is still open gets a row that takes the app to the point in
question (user, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases already?」). New rows: TC-046 (Q-3: tap the dimmed area, swipe the sheet
down), TC-047 and TC-048 (Q-4: offline). Q-1, Q-2 and Q-5 already name the rows that observe them. No requirement changes.

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

## Other Cinematic Reel Creator arrows on the board (not PDRA-661)
- R-016 [DS: flow arrow 110-15623 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=110-15623] Preview 「Generate」 → Analyzing & Generating. — NOT TESTABLE: generation flow of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-017 [DS: flow arrow 108-15191 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=108-15191] Add Media photo → preview with 「Generate」. — NOT TESTABLE: photo pick of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-018 [DS: flow arrow 111-16517 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-16517] Analyzing & Generating → progress step. — NOT TESTABLE: generation progress of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-019 [DS: flow arrow 111-23987 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-23987] Analyzing & Generating → recent tasks (Processing). — NOT TESTABLE: generation progress of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-020 [DS: flow arrow 111-24458 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-24458] Recent tasks → done card with 「View」. — NOT TESTABLE: recent tasks of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-021 [DS: flow arrow 111-17798 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-17798] 「View later」 → recent tasks. — NOT TESTABLE: generation flow of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-022 [DS: flow arrow 111-21605 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-21605] 「Create another one」 → template page. — NOT TESTABLE: generation flow of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-023 [DS: flow arrow 111-23476 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-23476] Recent task 「View」 → result page. — NOT TESTABLE: result page of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-024 [DS: flow arrow 111-26343 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-26343] Result 「Add Text」 → title templates. — NOT TESTABLE: result page of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-025 [DS: flow arrow 111-28894 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=111-28894] Result 「Edit Music」 → music library. — NOT TESTABLE: result page of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-026 [DS: flow arrow 230-4451 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=230-4451] Tutorial ✕ → template page (tutorial folds into ?). — NOT TESTABLE: first-run tutorial of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.
- R-027 [DS: flow arrow 230-3698 https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=230-3698] Template page history → empty recent tasks. — NOT TESTABLE: recent tasks of Cinematic Reel Creator, outside PDRA-661 (the photo tips table); it belongs to the feature's own table.

## MUI
- R-028 [Req: REQ-002] Every user-facing string of the feature shows in each language of the product list (CHT, CHS, JPN, ESP, KOR, DEU, FRA, ITA, RUS, PTB, NLD, IND, THA, MAY, HIN, ESM, ARA, VIT, PLK, TRK, FAR, HEB, SVE, DAN, NOR, UKR): the app's own strings (「View photo tips」, 「For best results with the <template> template, follow this advice:」, 「Recommendation」, 「Avoid」, 「Got it」) in that language's own words with the English meaning, with no English, key or placeholder left, and the CMS text (card names and descriptions, captions) as the 2026-11-25 sheets give it for that language (Cinestory CMS › Template Name / Template Description Localization, I2V Recommendation › Localization). No translation sheet for the app strings: the run judges them; doubtful ones are listed for the eBug review, not failed.
- R-029 [Req: REQ-002] In each of those languages no string of the feature is truncated, clipped or overlapping: the chip stays inside its pill, the sheet sentence wraps instead of being cut, every name, description and caption shows in full; the right-to-left languages (ARA, FAR, HEB) run from the right.

## Open questions
- Q-1 Media room 「?」: the Jira says the Add Media room has a 「?」 that opens the recommendation page, but the Design 26.07_v2 draws Add Media without one (the round/ic_info layer is hidden), and the template page's own 「?」 is the tutorial. Where is the 「?」, what icon, and does it show the tips of the template the room was opened from? Assumption: a 「?」 in the Add Media header opens the tips of that template; 「Got it」 returns to Add Media. R-004, TC-010 – TC-016.
- Q-2 Language: the CMS gives the template names in every language, but the picture list's JP and EN columns are empty and the sheet sentence has no translation in the spec. Are the sentence, headings and captions translated? Assumption: the template name follows the app language; rows record the rest and do not fail on it. R-015, TC-017, TC-018. MUI (REQ-002): every PowerDirector feature is implemented in the 26 languages of the product list, so the MUI walks (TC-020 – TC-045) expect the chip and sentence translated; a miss is DRA262611P0290, cited, not filed again.
- Q-3 Closing: the Design draws only 「Got it」. Does tapping the dimmed area or swiping the sheet down close it? Assumption: none for those two: TC-046 does both and records what each does as Fail (question) for PM; 「Got it」 is checked by TC-007. R-010, TC-007, TC-046.
- Q-4 Missing data: what shows when a template has no recommend_samples in the CMS, or the CMS cannot be reached (offline)? Assumption: none. Offline: TC-047 (the app started with no network) and TC-048 (a sheet loaded online, then reopened offline, and one not opened before) record what the template page, the chip and the sheet show as Fail (question) for PM. A template with no recommend_samples cannot be set up by QA (the CMS is the server's and every template has its items): that half needs PM's answer and has no row. R-001, R-012, R-014, TC-047, TC-048.
- Q-5 Scrolling: the Design draws the third Avoid item past the sheet's edge. Does the Avoid row scroll sideways, and would the Recommendation row scroll if a template had more than two? Assumption: the Avoid row scrolls sideways. R-009, TC-008.

## Added 2026-11-23 — coverage passes and standing inputs
### Flow arrows walked by existing rows
- R-002 (arrow 1106-5840): TC-001 – TC-006 tap the chip.
- R-005 (arrow 108-15190): Walked by: TC-010 – TC-015.

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-014 | The items come from the CMS field recommend_samples, not the app | The app log after a log pull (CMS template data), compared with what each sheet showed | TC-019 |
| R-014 | The items are fetched from the server, so they can be out of reach (Q-4) | The template page, the chips and the sheets with the phone offline, at a cold start and after one sheet was loaded | TC-047, TC-048 |
| R-010 | 「Got it」 is the only way to close that the Design draws (Q-3) | A tap on the dimmed area and a swipe down on the sheet | TC-046 |

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
| R-028 | CHT (Traditional Chinese) | TC-020 |
| R-029 | CHT (Traditional Chinese) | TC-020 |
| R-028 | CHS (Simplified Chinese) | TC-021 |
| R-029 | CHS (Simplified Chinese) | TC-021 |
| R-028 | JPN (Japanese) | TC-022 |
| R-029 | JPN (Japanese) | TC-022 |
| R-028 | ESP (Spanish) | TC-023 |
| R-029 | ESP (Spanish) | TC-023 |
| R-028 | KOR (Korean) | TC-024 |
| R-029 | KOR (Korean) | TC-024 |
| R-028 | DEU (German) | TC-025 |
| R-029 | DEU (German) | TC-025 |
| R-028 | FRA (French) | TC-026 |
| R-029 | FRA (French) | TC-026 |
| R-028 | ITA (Italian) | TC-027 |
| R-029 | ITA (Italian) | TC-027 |
| R-028 | RUS (Russian) | TC-028 |
| R-029 | RUS (Russian) | TC-028 |
| R-028 | PTB (Portuguese (Brazil)) | TC-029 |
| R-029 | PTB (Portuguese (Brazil)) | TC-029 |
| R-028 | NLD (Dutch) | TC-030 |
| R-029 | NLD (Dutch) | TC-030 |
| R-028 | IND (Indonesian) | TC-031 |
| R-029 | IND (Indonesian) | TC-031 |
| R-028 | THA (Thai) | TC-032 |
| R-029 | THA (Thai) | TC-032 |
| R-028 | MAY (Malay) | TC-033 |
| R-029 | MAY (Malay) | TC-033 |
| R-028 | HIN (Hindi) | TC-034 |
| R-029 | HIN (Hindi) | TC-034 |
| R-028 | ESM (Spanish (Mexico)) | TC-035 |
| R-029 | ESM (Spanish (Mexico)) | TC-035 |
| R-028 | ARA (Arabic) | TC-036 |
| R-029 | ARA (Arabic) | TC-036 |
| R-028 | VIT (Vietnamese) | TC-037 |
| R-029 | VIT (Vietnamese) | TC-037 |
| R-028 | PLK (Polish) | TC-038 |
| R-029 | PLK (Polish) | TC-038 |
| R-028 | TRK (Turkish) | TC-039 |
| R-029 | TRK (Turkish) | TC-039 |
| R-028 | FAR (Persian) | TC-040 |
| R-029 | FAR (Persian) | TC-040 |
| R-028 | HEB (Hebrew) | TC-041 |
| R-029 | HEB (Hebrew) | TC-041 |
| R-028 | SVE (Swedish) | TC-042 |
| R-029 | SVE (Swedish) | TC-042 |
| R-028 | DAN (Danish) | TC-043 |
| R-029 | DAN (Danish) | TC-043 |
| R-028 | NOR (Norwegian Bokmål) | TC-044 |
| R-029 | NOR (Norwegian Bokmål) | TC-044 |
| R-028 | UKR (Ukrainian) | TC-045 |
| R-029 | UKR (Ukrainian) | TC-045 |

### Combinations
- Not combined: template, language (the language only changes the sheet's words; one template, Micro Cinema, is read in each language)

### Domain rules

| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (the tips sheet runs no generation and charges nothing) |

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 (analysis, both) | R-001 – R-015 (the whole table) |
| REQ-002 (table: MUI test in the 26 languages of the product list, no translation sheet) | R-028, R-029 (TC-020 – TC-045) |
| REQ-007 (table: plan the MUI cases, 2026-11-25) | R-028, R-029 |
| REQ-009 (table: every Open question still open gets an observing row, 2026-11-25) | R-010 (TC-046); R-014, R-001, R-012 (TC-047, TC-048); Q-3, Q-4 |
