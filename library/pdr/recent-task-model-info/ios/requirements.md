# Recent Task Model Info — requirements (ios)
Spec: Recent Task Model Info - Design Figma 1794-3210.md (Design frame 「1006 · Add model information (I2V/T2V)」 https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1794-3210, read 2026-11-23),
Design Guideline Cards - Card-RecentTask.md (the board's link 「開啟 Guideline · Cards ↗」, https://www.figma.com/design/qSdtJ1wbHddNm6ebWvF4ia/?node-id=142-4496, extracted/links.json)
and PDRA Jira - Add model information in recent task.md (Jira text pasted by the user, parent PDRA-627 16.9.0).
Figma-only spec set 2026-11-23, no PDF and no PM spec for this ticket. Source order: Design (1006 frame), then its linked Guideline.
The section's Video and Video · 編輯模式 boards (1794:3214, 1794:3217) are read as context: they draw where the Recent
task cards live and how edit mode looks, with cards drawn before the model tag existed.
Model names come from the Android (no iOS list known yet) picker as seen on a Free account (KP-082); the rows quote the picker's name.

Draft 20261126-100000 [Req: REQ-002]: the MUI section (spec-casebook references/mui.md). PowerDirector features are tested in the
26 languages of `library/pdr/product.json` › `mui` besides English; there is no translation sheet, so the run judges
the translations and doubtful ones go to the eBug review. iOS reads translations on the phone (the app bundle cannot be read on the QA iPhone): one walk for each language checks translation and truncation together.
The MUI rows are their own phase, never part of a full run. New: R-080, R-081; 26 rows, TC-044 – TC-069.

Draft 20261126-111211 [Req: REQ-004]: every entry point (spec-casebook analysis.md pass 12, user 2026-11-26). The Design draws one way to
the Recent tasks (AI Magic › My Artwork, the primary entry, R-001), which keeps the full table. Every other way there gets
its own Section `Entry › …` with a UI pass: the landing and what it lists, the tags against each task's own model, every control once, one generation where the entry starts one, every exit once; combinations, model variants, limits, failures and MUI stay with the primary entry.
Where the spec is silent on an entry the rows assert the primary behaviour with no question; only the real unknowns are
Open questions: the editor entries (Q-8) and Text to Image from the Photo / PIP Photo toolbars (Q-9). New: R-090 – R-099.

## My Artwork entry
- R-001 [DS:d-recent-video] AI Magic › My Artwork lists a card row per feature (Cinematic Reel Creator, Text to Video, Image to Video, Text to Image); tapping a feature's card opens that feature's Recent page (its history), titled with the feature.
- R-002 [DS:d-recent-video] On a Recent page, 「View」 on a finished card opens that feature's result page for the task.

## Model tag
- R-010 [DS:d-model-info 規則; DS:figma 1006 · Add model information (I2V/T2V) 1794:3210] An Image to Video task generated with a model the user chose (Image to Video opened from AI Magic, not a template) shows on its Recent task card a grey filled tag with the model name under the task name.
- R-011 [DS:d-model-info 規則] A Text to Video task generated with a model the user chose shows the same tag on its Recent task card.
- R-012 [DS:d-model-info 「顯示使用者生成時選的 model 名稱」] The tag reads the name of the model chosen when the task was generated, for each model the picker offers (Image to Video: Kling 4.0, Veo 3.1, Vidu Q2, Kling O3, Pixverse V6, Wan 2.7, Gemini Omni Flash 1.1, Happy Horse 1.1, Seedance 2.0, Seedance 2.5; Text to Video: Kling 4.0, Wan 3.0, Seedance 2.5, Seedance 2.0, Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling O3).
- R-013 [DS:d-model-info 「顯示使用者生成時選的 model 名稱」] Each card keeps the model of its own task: picking another model later does not change an existing card's tag.
- R-014 [DS:d-model-info 「過長以 … 截斷」] A model name too long for the tag is cut with 「…」 on one line; the tag never wraps and never overlaps 「View」 (checked at the default text size and at the largest, Settings › Display & Brightness › Text Size (and Accessibility › Larger Text)).
- R-015 [DS:d-model-info 有 model; link: model tag style] The tag sits under the task name, beside the thumbnail and above the bottom row with 「View」: a grey filled S tag, 20 pt high, one line of text.
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

## Entry points [Req: REQ-004]
- R-090 [Rule 12: entry Mine › My Artwork; KB: KP-032; Req: REQ-004] Through Mine › 「My Artwork」 the Recent pages open with the same cards, tasks and model tags as through AI Magic › My Artwork, every control on them responds as there with no error, and ‹ on a Recent page returns to My Artwork (as the primary entry).
- R-091 [Rule 12: entry Home ☰ › My Artwork; KB: KP-020; Req: REQ-004] Through Home › ☰ › 「My Artwork」 the same holds, and leaving My Artwork returns to the ☰ page.
- R-092 [Rule 12: entry tool page › Recent tasks; KB: KP-058; Req: REQ-004] The Image to Video, Text to Video and Text to Image pages opened from AI Magic open their own Recent tasks, listing every task of the tool with the same tags, every control responding with no error; ‹ returns to the tool page.
- R-093 [Rule 12: entry Editor › Global toolbar › AI Magic; KB: KP-107; Req: REQ-004] The tools opened from the editor's Global toolbar › 「AI Magic」 show the same Recent tasks and tags with every control responding; a task generated there gets the tag of its chosen model; each ‹ goes back one step, ending in the editor with the project unchanged (assumption, Q-8).
- R-094 [Rule 12: entry Editor › Photo toolbar › Tools › Text to Image; KB: KP-107; Req: REQ-004] Text to Image opened from the Photo toolbar's 「Tools」 is the same tool: its items open with no error and show no model tag (R-022, Q-1); what happens to the selected photo is recorded (Q-9).
- R-095 [Rule 12: entry Editor › PIP Photo toolbar › Tools › AI Text to Image; KB: KP-107; Req: REQ-004] 「AI Text to Image」 opened from the PIP Photo toolbar's 「Tools」 behaves as R-094 (Q-9).
- R-096 [Rule 12: entry Home shortcut tile; KB: KP-012; Req: REQ-004] A Home shortcut tile of these tools (set on the CMS) opens the same tool page, Recent tasks and tags, every control responding; a task generated there gets its tag; ‹ returns to Home.
- R-097 [Rule 12: entry Home › AI-Powered Creation; KB: KP-012; Req: REQ-004] A Home 「AI-Powered Creation」 card of these tools behaves as R-096.
- R-098 [Rule 12: entry Home › What's Trending template; Req: REQ-004] An Image to Video or Text to Video template started from Home › 「What's Trending」 opens with no error and its task shows no model tag, as one started from the Template tab (R-020).
- R-099 [Rule 12: entry completion banner; KB: KP-059; Req: REQ-004] When an Image to Video, Text to Video or Text to Image task finishes, a completion banner offers 「View」; its result page's ‹ lands on that tool's Recent tasks with the same tags, every control responding; ‹ there returns to the tool page.

## MUI
- R-080 [Req: REQ-002] The app's own strings on the screens of this feature (My Artwork's feature rows, the Recent pages of Image to Video, Text to Video, Cinematic Reel Creator and Text to Image with their notice and 「Manage」, the card buttons 「View」, 「Retry」 and 「View Details」, the processing and failed card texts, edit mode's 「Select All」, 「Deselect All」, 「Cancel」 and 「Delete」) show in each language of the product list (CHT, CHS, JPN, ESP, KOR, DEU, FRA, ITA, RUS, PTB, NLD, IND, THA, MAY, HIN, ESM, ARA, VIT, PLK, TRK, FAR, HEB, SVE, DAN, NOR, UKR), in that language's own words with the English meaning, with no English, key or placeholder left; the model name in the tag is a proper name and reads as the model picker shows it, the same as in English. No translation sheet: the run judges the strings; doubtful ones are listed for the eBug review, not failed.
- R-081 [Req: REQ-002] In each language of that list no string on those screens is truncated, clipped or overlapping; the model tag stays on one line, cut with 「…」 only as R-014 allows, and never touches the translated button beside it; a Recent task card keeps its 120 pt height; the right-to-left languages (ARA, FAR, HEB) run from the right.

## Open questions
- Q-1 Text to Image: the Jira title is 「Add model information in recent task (I2V/T2V/TTI)」, but the Design frame 1006, its rules and the Guideline all say only I2V and T2V show the model, and the Text to Image Recent page is drawn as prompt tiles, not Recent task cards. Should Text to Image show its model (e.g. 「GPT-Image-2.6 Sunburst」), and where? Assumption: Design, no tag on Text to Image. R-022, TC-033.
- Q-2 Tasks generated before the build with the model tag: should they show their model? The spec is silent. Assumption: either the tag or no tag line, never an empty tag, card 120 pt. R-041, TC-041.
- Q-3 Templates: the Guideline says a template generation never shows the model (「範本生成不開」). If an Image to Video or Text to Video template lets the user pick a model, does its card show it? Assumption: no tag on any template generation. R-020, TC-029, TC-030.
- Q-4 Tag width: the spec says a long name is cut with 「…」 but gives no maximum width for the tag. Assumption: the tag may use the width under the name up to the card's right padding, never overlapping 「View」. R-014, TC-027, TC-028.
- Q-8 Editor › Global toolbar › 「AI Magic」 › Image to Video / Text to Video / Text to Image (the product team's toolbar sheet, KP-107): do the tools opened there show the same Recent tasks (every task of the tool, not only this project's) and tags, does a task generated there get its tag, and where do the result page and each ‹ lead (does the result go into the project)? Assumption: the same list and tags, the tag of the chosen model; each ‹ goes back one step to the editor, project unchanged. R-093, TC-089, TC-090, TC-091, TC-092, TC-093, TC-094, TC-095, TC-096, TC-097, TC-098, TC-099, TC-100, TC-101, TC-102.
- Q-9 The toolbar sheet also places Text to Image under Photo toolbar › 「Tools」 and, named 「AI Text to Image」, under PIP Photo toolbar › 「Tools」 (KP-107). Are they in the build, are they the same tool with the same Recent tasks, and what happens to the selected photo when a result is made (unchanged, replaced, a new clip)? Assumption: present, the same tool and Recent tasks, no model tag (Q-1); the result's effect on the photo is recorded for PM. R-094, R-095, TC-103, TC-104, TC-105, TC-106, TC-107, TC-108, TC-109, TC-110.

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
| R-080 | CHT (Traditional Chinese) | TC-044 |
| R-081 | CHT (Traditional Chinese) | TC-044 |
| R-080 | CHS (Simplified Chinese) | TC-045 |
| R-081 | CHS (Simplified Chinese) | TC-045 |
| R-080 | JPN (Japanese) | TC-046 |
| R-081 | JPN (Japanese) | TC-046 |
| R-080 | ESP (Spanish) | TC-047 |
| R-081 | ESP (Spanish) | TC-047 |
| R-080 | KOR (Korean) | TC-048 |
| R-081 | KOR (Korean) | TC-048 |
| R-080 | DEU (German) | TC-049 |
| R-081 | DEU (German) | TC-049 |
| R-080 | FRA (French) | TC-050 |
| R-081 | FRA (French) | TC-050 |
| R-080 | ITA (Italian) | TC-051 |
| R-081 | ITA (Italian) | TC-051 |
| R-080 | RUS (Russian) | TC-052 |
| R-081 | RUS (Russian) | TC-052 |
| R-080 | PTB (Portuguese (Brazil)) | TC-053 |
| R-081 | PTB (Portuguese (Brazil)) | TC-053 |
| R-080 | NLD (Dutch) | TC-054 |
| R-081 | NLD (Dutch) | TC-054 |
| R-080 | IND (Indonesian) | TC-055 |
| R-081 | IND (Indonesian) | TC-055 |
| R-080 | THA (Thai) | TC-056 |
| R-081 | THA (Thai) | TC-056 |
| R-080 | MAY (Malay) | TC-057 |
| R-081 | MAY (Malay) | TC-057 |
| R-080 | HIN (Hindi) | TC-058 |
| R-081 | HIN (Hindi) | TC-058 |
| R-080 | ESM (Spanish (Mexico)) | TC-059 |
| R-081 | ESM (Spanish (Mexico)) | TC-059 |
| R-080 | ARA (Arabic) | TC-060 |
| R-081 | ARA (Arabic) | TC-060 |
| R-080 | VIT (Vietnamese) | TC-061 |
| R-081 | VIT (Vietnamese) | TC-061 |
| R-080 | PLK (Polish) | TC-062 |
| R-081 | PLK (Polish) | TC-062 |
| R-080 | TRK (Turkish) | TC-063 |
| R-081 | TRK (Turkish) | TC-063 |
| R-080 | FAR (Persian) | TC-064 |
| R-081 | FAR (Persian) | TC-064 |
| R-080 | HEB (Hebrew) | TC-065 |
| R-081 | HEB (Hebrew) | TC-065 |
| R-080 | SVE (Swedish) | TC-066 |
| R-081 | SVE (Swedish) | TC-066 |
| R-080 | DAN (Danish) | TC-067 |
| R-081 | DAN (Danish) | TC-067 |
| R-080 | NOR (Norwegian Bokmål) | TC-068 |
| R-081 | NOR (Norwegian Bokmål) | TC-068 |
| R-080 | UKR (Ukrainian) | TC-069 |
| R-081 | UKR (Ukrainian) | TC-069 |

### Combinations
- Not combined: i2v model, t2v model, text size, state, appearance (each is checked on its own: the model only sets the tag's text, the others are the rule's states and display settings, never chosen together with a model)

### Flow arrows walked by existing rows
- R-060 [DS: flow arrow 1036-3983 https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1036-3983] My Artwork feature card → Recent page: the feature's history opens. Walked by: TC-001.
- R-061 [DS: flow arrow 1036-3984 https://www.figma.com/design/1LZzcJyrhE2DjB8a8b92rt/AI-Magic?node-id=1036-3984] Recent page 「View」 → the feature's result page. Walked by: TC-005.

### Domain rules

| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (this ticket only adds the tag; the error card is checked for the tag, TC-038) |

### Entry points
Found with `node scripts/entry-points.ts pdr "<tool>"` (toolbar sheet tab 「2026/11 Auto Reframe」, fetched 2026-11-26), the
Design boards, the approved table and `knowledge.ts --grep entry / launcher / "AI Magic" / "My Artwork" / banner`.
The sheet's brackets limit none of these places. The primary entry keeps the full table; each other entry has a UI pass
(pass 12): landing, tags, every control once, one generation where the entry starts one, every exit once.

| Tool | Entry (path) | Source | Platforms | Section (rows) |
|---|---|---|---|---|
| Image to Video | **primary**: AI Magic › My Artwork › 「Image to Video」 (Recent page), tasks generated from AI Magic › 「Image to Video」 | Design d-recent-video, arrow 1036-3983 | iOS, Android | Image to Video — model tag, Long model names, Cards without a model, Card states, Persistence, Appearance (TC-001, TC-003 – TC-015, TC-027 – TC-029, TC-034 – TC-043); MUI walks this entry only |
| Text to Video | **primary**: AI Magic › My Artwork › 「Text to Video」, tasks generated from AI Magic › 「Text to Video」 | Design d-recent-video | iOS, Android | Text to Video — model tag, Cards without a model (TC-002, TC-016 – TC-026, TC-030, TC-039, TC-041) |
| Text to Image | **primary**: AI Magic › My Artwork › 「Text to Image」 | Design 1794:3221 (context), Q-1 | iOS, Android | Cards without a model (TC-033) |
| Cinematic Reel Creator, other features | AI Magic › My Artwork (only to check they show no tag) | Design d-model-info | iOS, Android | TC-031, TC-032; also opened in the Mine and ☰ landing rows |
| Image to Video, Text to Video templates | **primary**: Template tab | approved TC-029 / TC-030 (which named either place) | iOS, Android | TC-029, TC-030, TC-034 (now the Template tab only) |
| all three | Mine › 「My Artwork」 | KP-032 | iOS, Android | Entry › Mine › My Artwork (TC-070 – TC-073) |
| all three | Home › ☰ › 「My Artwork」 | KP-020 | iOS, Android | Entry › Home › ☰ › My Artwork (TC-074 – TC-077) |
| Image to Video | AI Magic › 「Image to Video」 › Recent tasks | KP-058 | iOS, Android | Entry › AI Magic › Image to Video › Recent tasks (TC-078 – TC-081) |
| Text to Video | AI Magic › 「Text to Video」 › Recent tasks | KP-058 | iOS, Android | Entry › AI Magic › Text to Video › Recent tasks (TC-082 – TC-085) |
| Text to Image | AI Magic › 「Text to Image」 › Recent tasks | KP-058, Design 1794:3221 「Recent task（可收合）」 | iOS, Android | Entry › AI Magic › Text to Image › Recent tasks (TC-086 – TC-088) |
| Image to Video | Editor › Global toolbar › 「AI Magic」 › 「Image to Video」 | toolbar sheet Global Toolbar › AI Magic, KP-107 | iOS, Android | Entry › Editor › Global › AI Magic › Image to Video (TC-089 – TC-093) |
| Text to Video | Editor › Global toolbar › 「AI Magic」 › 「Text to Video」 | toolbar sheet Global Toolbar › AI Magic, KP-107 | iOS, Android | Entry › Editor › Global › AI Magic › Text to Video (TC-094 – TC-098) |
| Text to Image | Editor › Global toolbar › 「AI Magic」 › 「Text to Image」 | toolbar sheet Global Toolbar › AI Magic, KP-107 | iOS, Android | Entry › Editor › Global › AI Magic › Text to Image (TC-099 – TC-102) |
| Text to Image | Editor › Photo toolbar › 「Tools」 › 「Text to Image」 | toolbar sheet Photo Toolbar › Tools, KP-107 | iOS, Android | Entry › Editor › Photo › Tools › Text to Image (TC-103 – TC-106) |
| Text to Image | Editor › PIP Photo toolbar › 「Tools」 › 「AI Text to Image」 | toolbar sheet PIP Photo Toolbar › Tools (named 「AI Text to Image」), KP-107 | iOS, Android | Entry › Editor › PIP Photo › Tools › AI Text to Image (TC-107 – TC-110) |
| Image to Video | Home › 「Image to Video」 shortcut tile | KP-010, KP-012 (CMS) | iOS, Android | Entry › Home › shortcut › Image to Video (TC-111 – TC-115) |
| Text to Video | Home › 「Text to Video」 shortcut tile | KP-010, KP-012 (CMS) | iOS, Android | Entry › Home › shortcut › Text to Video (TC-116 – TC-120) |
| Text to Image | Home › 「Text to Image」 shortcut tile | KP-010, KP-012 (CMS) | iOS, Android | Entry › Home › shortcut › Text to Image (TC-121 – TC-124) |
| Image to Video | Home › 「AI-Powered Creation」 › 「Image to Video」 | KP-010, KP-013 | iOS, Android | Entry › Home › AI-Powered Creation › Image to Video (TC-125 – TC-129) |
| Text to Video | Home › 「AI-Powered Creation」 › 「Text to Video」 | KP-010, KP-013 | iOS, Android | Entry › Home › AI-Powered Creation › Text to Video (TC-130 – TC-134) |
| Text to Image | Home › 「AI-Powered Creation」 › 「Text to Image」 | KP-010, KP-013 | iOS, Android | Entry › Home › AI-Powered Creation › Text to Image (TC-135 – TC-138) |
| Image to Video, Text to Video templates | Home › 「What's Trending」 › template | approved TC-029 / TC-030, KP-010 | iOS, Android | Entry › Home › What's Trending › template (TC-139 – TC-140) |
| Image to Video | completion banner of 「Image to Video」 › 「View」 › ‹ | KP-059, KP-058 (other tools) | iOS, Android | Entry › Completion banner › Image to Video (TC-141 – TC-144) |
| Text to Video | completion banner of 「Text to Video」 › 「View」 › ‹ | KP-059, KP-058 (other tools) | iOS, Android | Entry › Completion banner › Text to Video (TC-145 – TC-148) |
| Text to Image | completion banner of 「Text to Image」 › 「View」 › ‹ | KP-059, KP-058 (other tools) | iOS, Android | Entry › Completion banner › Text to Image (TC-149 – TC-151) |

Not entries to this feature: the result page's other controls, Mine › Demo Videos (other tools' demos), notifications and
push (no source places these tools there; the banner rows record what shows), deep links (none known).
Checklist for the control rows: the primary rows' controls (TC-005, TC-018, TC-033, TC-035 – TC-037; `control-trace.json`).

### Request ledger coverage

| Ledger entry | Requirements |
|---|---|
| REQ-001 | R-001 – R-050 (the analysis itself) |
| REQ-002 (table: MUI test in the 26 languages of the product list, no translation sheet) | R-080, R-081 (TC-044 – TC-069) |
| REQ-004 (table: every entry point; the primary keeps the full table, each other entry a UI pass, pass 12) | R-090 – R-099 (TC-070 – TC-151) |
