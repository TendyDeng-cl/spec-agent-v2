# Recent Task Model Info — requirements (android)
Spec: Recent Task Model Info - Design Figma 1794-3210.md (Design frame 「1006 · Add model information (I2V/T2V)」 https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3210, read 2026-11-23),
Design Guideline Cards - Card-RecentTask.md (the board's link 「開啟 Guideline · Cards ↗」, https://www.figma.com/design/qSdtJ1wbHddNm6ebWvF4ia/?node-id=142-4496, extracted/links.json)
and PDRA Jira - Add model information in recent task.md (Jira text pasted by the user, parent PDRA-627 16.9.0).
Figma-only spec set 2026-11-23, no PDF and no PM spec for this ticket. Source order: Design (1006 frame), then its linked Guideline.
The section's Video and Video · 編輯模式 boards (1794:3214, 1794:3217) are read as context: they draw where the Recent
task cards live and how edit mode looks, with cards drawn before the model tag existed.
Model names come from the Android picker as seen on a Free account (KP-082); the rows quote the picker's name.

Draft 20261126-100000 [Req: REQ-002]: the MUI section (spec-casebook references/mui.md). PowerDirector features are tested in the
26 languages of `library/pdr/product.json` › `mui` besides English; there is no translation sheet, so the run judges
the translations and doubtful ones go to the eBug review. Android reads the feature names and the notice from the build's APK (one row, no phone); the phone walks one row for each language for truncation and for the short shared labels the APK read cannot attribute yet.
The MUI rows are their own phase, never part of a full run. New: R-080, R-081; 27 rows, TC-047 – TC-073.

## My Artwork entry
- R-001 [DS:d-recent-video] AI Magic › My Artwork lists a card row per feature (Cinematic Reel Creator, Text to Video, Image to Video, Text to Image); tapping a feature's card opens that feature's Recent page (its history), titled with the feature.
- R-002 [DS:d-recent-video] On a Recent page, 「View」 on a finished card opens that feature's result page for the task.

## Model tag
- R-010 [DS:d-model-info 規則; DS:figma 1006 · Add model information (I2V/T2V) 1794:3210] An Image to Video task generated with a model the user chose (Image to Video opened from AI Magic, not a template) shows on its Recent task card a grey filled tag with the model name under the task name.
- R-011 [DS:d-model-info 規則] A Text to Video task generated with a model the user chose shows the same tag on its Recent task card.
- R-012 [DS:d-model-info 「顯示使用者生成時選的 model 名稱」] The tag reads the name of the model chosen when the task was generated, for each model the picker offers (Image to Video: Kling 4.0, Veo 3.1, Vidu Q2, Kling O3, Pixverse V6, Wan 2.7, Gemini Omni Flash 1.1, Happy Horse 1.1, Seedance 2.0, Seedance 2.5; Text to Video: Kling 4.0, Wan 3.0, Seedance 2.5, Seedance 2.0, Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling O3).
- R-013 [DS:d-model-info 「顯示使用者生成時選的 model 名稱」] Each card keeps the model of its own task: picking another model later does not change an existing card's tag.
- R-014 [DS:d-model-info 「過長以 … 截斷」] A model name too long for the tag is cut with 「…」 on one line; the tag never wraps and never overlaps 「View」 (checked at the default text size and at the largest, Settings › Display › Font size and Display size).
- R-015 [DS:d-model-info 有 model; link: model tag style] The tag sits under the task name, beside the thumbnail and above the bottom row with 「View」: a grey filled S tag, 20 pt high, one line of text (weights held to Roboto, [KB: KP-066]).
- R-016 [DS:d-model-info 「卡片高度維持 120」; link: size] Every Recent task card is 120 pt tall, with or without the tag; a card without a model leaves no empty line.

## Cards without a model
- R-020 [link: showModel only for a user-chosen model] An Image to Video or Text to Video task generated from a template shows no model tag (「範本生成不開」).
- R-021 [DS:d-model-info 「其他功能（如 Cinematic Reel Creator）沒有 model，整行不顯示」] Recent task cards of every other feature (Cinematic Reel Creator and any other feature My Artwork lists) show no model tag and no line for one.
- R-022 [DS:d-model-info title 「(I2V / T2V)」; Q-1] Text to Image Recent items show no model tag (the Design names only I2V and T2V; the Jira title also names TTI, Q-1).

## Card states
- R-030 [DS:d-model-info 「done / downloading / unselect / select / error / nsfw 規則相同」; link: state table] The model rule is the same in every card state: a card with a chosen model shows its tag while processing (「processing...」, time left, progress bar, no button), when done (「View」), unselected and selected in edit mode (checkbox), failed (「Error」, 「Retry」) and flagged (「View Details」); a card without a model shows none in any state.

## Persistence
- R-040 [DS:d-recent-video 「Tasks are stored on the cloud for 1 Year」; Rule: persistence] The tag stays the same after leaving and reopening the Recent page and after closing and reopening the app (tasks are stored on the cloud).
- R-041 [Q-2] Tasks generated before this build show either their model tag or no tag line; never an empty tag (assumption until PM answers Q-2).

## Appearance
- R-050 [DS:d-model-info Dark / Light] The tag is drawn in both the dark and the light appearance, as on the Dark and Light boards.

## System Back
- R-070 [Rule: Android system Back, REQ-051] System Back on the Recent page returns to My Artwork, in edit mode closes edit mode like 「Cancel」 (Q-5) and on a result page returns to the Recent page.

## MUI
- R-080 [Req: REQ-002] The app's own strings on the screens of this feature (My Artwork's feature rows, the Recent pages of Image to Video, Text to Video, Cinematic Reel Creator and Text to Image with their notice and 「Manage」, the card buttons 「View」, 「Retry」 and 「View Details」, the processing and failed card texts, edit mode's 「Select All」, 「Deselect All」, 「Cancel」 and 「Delete」) show in each language of the product list (CHT, CHS, JPN, ESP, KOR, DEU, FRA, ITA, RUS, PTB, NLD, IND, THA, MAY, HIN, ESM, ARA, VIT, PLK, TRK, FAR, HEB, SVE, DAN, NOR, UKR), in that language's own words with the English meaning, with no English, key or placeholder left; the model name in the tag is a proper name and reads as the model picker shows it, the same as in English. No translation sheet: the run judges the strings; doubtful ones are listed for the eBug review, not failed. Android reads the feature names and the notice from the build (`mui-strings.ts`) and the short shared labels on the phone, until `android_prefixes` in `mui.json` names their resources.
- R-081 [Req: REQ-002] In each language of that list no string on those screens is truncated, clipped or overlapping; the model tag stays on one line, cut with 「…」 only as R-014 allows, and never touches the translated button beside it; a Recent task card keeps its 120 pt height; the right-to-left languages (ARA, FAR, HEB) run from the right.

## Open questions
- Q-1 Text to Image: the Jira title is 「Add model information in recent task (I2V/T2V/TTI)」, but the Design frame 1006, its rules and the Guideline all say only I2V and T2V show the model, and the Text to Image Recent page is drawn as prompt tiles, not Recent task cards. Should Text to Image show its model (e.g. 「GPT-Image-2.6 Sunburst」), and where? Assumption: Design, no tag on Text to Image. R-022, TC-033.
- Q-2 Tasks generated before the build with the model tag: should they show their model? The spec is silent. Assumption: either the tag or no tag line, never an empty tag, card 120 pt. R-041, TC-041.
- Q-3 Templates: the Guideline says a template generation never shows the model (「範本生成不開」). If an Image to Video or Text to Video template lets the user pick a model, does its card show it? Assumption: no tag on any template generation. R-020, TC-029, TC-030.
- Q-4 Tag width: the spec says a long name is cut with 「…」 but gives no maximum width for the tag. Assumption: the tag may use the width under the name up to the card's right padding, never overlapping 「View」. R-014, TC-027, TC-028.
- Q-5 System Back in edit mode: the spec draws only 「Cancel」. Assumption: Back acts like 「Cancel」 and deletes nothing. R-070, TC-045.

## Added 2026-11-23 — coverage passes and standing inputs

### Job states

| Job | processing | done | unselect | select | error | nsfw |
|---|---|---|---|---|---|---|
| Image to Video, chosen model | TC-003 | TC-004 | TC-035 | TC-036, TC-037 | TC-038 | TC-039 |
| Text to Video, chosen model | TC-016 | TC-017 | n/a (same Card/RecentTask component; edit mode checked on Image to Video, TC-035) | n/a (as unselect) | n/a (one error row, TC-038; no failure fixture) | TC-039 |
| Image to Video template | TC-034 | TC-029 | TC-035 | TC-037 | n/a (no failure fixture; same rule as TC-038) | n/a (no NSFW fixture) |
| Text to Video template | n/a (same as TC-034) | TC-030 | n/a (as TC-035) | n/a (as TC-037) | n/a (no failure fixture) | n/a (no NSFW fixture) |
| Cinematic Reel Creator | n/a (a new reel costs 70 credits; existing tasks used) | TC-031 | n/a (edit mode checked on Image to Video) | n/a (as unselect) | n/a (no failure fixture) | n/a (no NSFW fixture) |

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-040 | Tasks are stored on the cloud, so the model comes back from the server after the app restarts | The Recent page after closing and reopening the app | TC-040 |

### Variants

| Requirement | Variant | Rows |
|---|---|---|
| R-012 | i2v model=Kling 4.0 | TC-004 |
| R-012 | i2v model=Veo 3.1 | TC-006 |
| R-012 | i2v model=Vidu Q2 | TC-007 |
| R-012 | i2v model=Kling O3 | TC-008 |
| R-012 | i2v model=Pixverse V6 | TC-009 |
| R-012 | i2v model=Wan 2.7 | TC-010 |
| R-012 | i2v model=Gemini Omni Flash 1.1 | TC-011 |
| R-012 | i2v model=Happy Horse 1.1 | TC-012 |
| R-012 | i2v model=Seedance 2.0 | TC-013 |
| R-012 | i2v model=Seedance 2.5 | TC-014 |
| R-012 | t2v model=Kling 4.0 | TC-017 |
| R-012 | t2v model=Wan 3.0 | TC-019 |
| R-012 | t2v model=Seedance 2.5 | TC-020 |
| R-012 | t2v model=Seedance 2.0 | TC-021 |
| R-012 | t2v model=Gemini Omni Flash | TC-022 |
| R-012 | t2v model=Happy Horse 1.1 | TC-023 |
| R-012 | t2v model=Wan 2.7 | TC-024 |
| R-012 | t2v model=Veo 3.1 | TC-025 |
| R-012 | t2v model=Kling O3 | TC-026 |
| R-014 | text size=default | TC-027 |
| R-014 | text size=largest | TC-028 |
| R-030 | state=processing | TC-003, TC-016, TC-034 |
| R-030 | state=done | TC-004, TC-017 |
| R-030 | state=unselect | TC-035 |
| R-030 | state=select | TC-036, TC-037 |
| R-030 | state=error | TC-038 |
| R-030 | state=nsfw | TC-039 |
| R-050 | appearance=Dark | TC-042 |
| R-050 | appearance=Light | TC-043 |
| R-080 | CHT (Traditional Chinese) | TC-047, TC-048 |
| R-081 | CHT (Traditional Chinese) | TC-048 |
| R-080 | CHS (Simplified Chinese) | TC-047, TC-049 |
| R-081 | CHS (Simplified Chinese) | TC-049 |
| R-080 | JPN (Japanese) | TC-047, TC-050 |
| R-081 | JPN (Japanese) | TC-050 |
| R-080 | ESP (Spanish) | TC-047, TC-051 |
| R-081 | ESP (Spanish) | TC-051 |
| R-080 | KOR (Korean) | TC-047, TC-052 |
| R-081 | KOR (Korean) | TC-052 |
| R-080 | DEU (German) | TC-047, TC-053 |
| R-081 | DEU (German) | TC-053 |
| R-080 | FRA (French) | TC-047, TC-054 |
| R-081 | FRA (French) | TC-054 |
| R-080 | ITA (Italian) | TC-047, TC-055 |
| R-081 | ITA (Italian) | TC-055 |
| R-080 | RUS (Russian) | TC-047, TC-056 |
| R-081 | RUS (Russian) | TC-056 |
| R-080 | PTB (Portuguese (Brazil)) | TC-047, TC-057 |
| R-081 | PTB (Portuguese (Brazil)) | TC-057 |
| R-080 | NLD (Dutch) | TC-047, TC-058 |
| R-081 | NLD (Dutch) | TC-058 |
| R-080 | IND (Indonesian) | TC-047, TC-059 |
| R-081 | IND (Indonesian) | TC-059 |
| R-080 | THA (Thai) | TC-047, TC-060 |
| R-081 | THA (Thai) | TC-060 |
| R-080 | MAY (Malay) | TC-047, TC-061 |
| R-081 | MAY (Malay) | TC-061 |
| R-080 | HIN (Hindi) | TC-047, TC-062 |
| R-081 | HIN (Hindi) | TC-062 |
| R-080 | ESM (Spanish (Mexico)) | TC-047, TC-063 |
| R-081 | ESM (Spanish (Mexico)) | TC-063 |
| R-080 | ARA (Arabic) | TC-047, TC-064 |
| R-081 | ARA (Arabic) | TC-064 |
| R-080 | VIT (Vietnamese) | TC-047, TC-065 |
| R-081 | VIT (Vietnamese) | TC-065 |
| R-080 | PLK (Polish) | TC-047, TC-066 |
| R-081 | PLK (Polish) | TC-066 |
| R-080 | TRK (Turkish) | TC-047, TC-067 |
| R-081 | TRK (Turkish) | TC-067 |
| R-080 | FAR (Persian) | TC-047, TC-068 |
| R-081 | FAR (Persian) | TC-068 |
| R-080 | HEB (Hebrew) | TC-047, TC-069 |
| R-081 | HEB (Hebrew) | TC-069 |
| R-080 | SVE (Swedish) | TC-047, TC-070 |
| R-081 | SVE (Swedish) | TC-070 |
| R-080 | DAN (Danish) | TC-047, TC-071 |
| R-081 | DAN (Danish) | TC-071 |
| R-080 | NOR (Norwegian Bokmål) | TC-047, TC-072 |
| R-081 | NOR (Norwegian Bokmål) | TC-072 |
| R-080 | UKR (Ukrainian) | TC-047, TC-073 |
| R-081 | UKR (Ukrainian) | TC-073 |

### Combinations
- Not combined: i2v model, t2v model, text size, state, appearance (each is checked on its own: the model only sets the tag's text, the others are the rule's states and display settings, never chosen together with a model)

### Flow arrows walked by existing rows
- R-060 [DS: flow arrow 1036-3983 https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1036-3983] My Artwork feature card → Recent page: the feature's history opens. Walked by: TC-001.
- R-061 [DS: flow arrow 1036-3984 https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1036-3984] Recent page 「View」 → the feature's result page. Walked by: TC-005.

### System back
- My Artwork: n/a (a main tab page; the feature adds nothing there)
- Recent page: TC-044
- Recent page in edit mode: TC-045
- Result page: TC-046

### Domain rules

| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (this ticket only adds the tag; the error card is checked for the tag, TC-038) |
| KP-066 Android text is held to the Android equivalent of the iOS font | R-015 |

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 | R-001 – R-050 (the analysis itself) |
| REQ-002 (table: MUI test in the 26 languages of the product list, no translation sheet) | R-080, R-081 (TC-047 – TC-073) |
