# AIGC Watermark — requirements (ios)
Spec: AIGC Watermark - PM Figma 0-1.md (text of the PM Figma page https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1, read 2026-11-17),
AIGC Watermark - Design Figma 3815-9037.md (Design frame 「2608_AIGC Watermark」 https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=3815-9037, read 2026-11-17),
PDRIOS-722 Jira description.md (pasted by the user) and [C2PA] GAI effects.xlsx (extracted/c2pa-gai-effects.md).
Figma-only spec set 2026-11-17, no PDF. Source order: Design, then PM; the sheet decides which effects are signed (REQ-002), except that the app signs every result as CyberLink (REQ-007, REQ-008).
Rulings added 2026-11-23: DRA262611P0220 and P0221 comments (RD, NAB) and the Android Jira PDRA-649 with its comments (extracted/pdra-649-jira.md; REQ-007 – REQ-009).

The Design draws only the Settings row, its info sheet and the AI label size. The export and music dialogs, the
per-class rules (My Artwork, audio, timeline) and the paid Menu are PM-only (pass 7) and are checked again when the
Design draws them. Saved files are checked on the computer: frames by ffmpeg, the label size in pixels, Content
Credentials with c2patool (fixtures.md).

Draft 20261125-160000 [Req: REQ-011, REQ-012]: the MUI section (spec-casebook references/mui.md). Every PowerDirector feature is
tested in the 26 languages of `library/pdr/product.json` › `mui` besides English; there is no translation sheet, so
each translation is judged by the run and doubtful ones go to the eBug review. iOS reads translations on the phone (the app bundle cannot be read on the QA iPhone): one walk per language checks translation and truncation together.
The MUI rows are their own phase (phases.json `MUI`), never part of a full run. New: R-057, R-058; 26 rows, TC-128 – TC-153.

## Settings entry
- R-001 [DS:d-aigc-settings] Menu › Settings has the row 「Remove AIGC Watermark」: the remove-AI icon, the text, an ⓘ right after the text and a switch at the right (no chevron).
- R-002 [DS:d-aigc-settings; PM:pm-settings Essential User] For a free (Essential) user the row sits directly below 「Remove Watermark」 and above 「Preferences」.
- R-003 [PM:pm-settings Paid User] For a paid user Settings shows 「Remove AIGC Watermark」 and no 「Remove Watermark」 row, followed by 「Preferences」 (PM-only: no Design frame of the paid Menu).
- R-004 [DS: flow arrow 3816-10913 https://www.figma.com/design/AZLFwVhAzTopBQn3eXMGAF/Settings?node-id=3816-10913; DS:d-aigc-settings] Tapping ⓘ dims the Menu and opens a bottom sheet: title 「AIGC Watermark」, body 「Depending on applicable laws and regulations, you may need to label or watermark AI-generated content before sharing it publicly. This feature is provided to help you meet those requirements.」 and the button 「Got it」.
- R-005 [PM: flow arrow 4-1680 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=4-1680] A free (Essential) user's ⓘ opens the same sheet. Walked by the free-tier ⓘ row. Walked by: TC-004.
- R-006 [PM: flow arrow 4-1679 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=4-1679] A paid user's ⓘ opens the same sheet. Walked by the paid-tier ⓘ row. Walked by: TC-005.
- R-007 [DS:d-aigc-settings] 「Got it」 closes the sheet and returns to the Menu with the switch unchanged. The Design sheet has no X; the PM sheet's X is older (pass 7: Design wins), so no X is expected.
- R-008 [Jira PDRIOS-722; PM:pm-music 「If Remove AIGC Watermark toggle off」] The switch decides whether later results carry the visible AIGC watermark: Off = results get the watermark, On = results are saved, shared and exported without it.
- R-009 [Q-1] On a fresh install the switch is Off (results carry the watermark). Assumption: the dialogs say results 「will include an AIGC watermark」; both mockups draw the switch On.
- R-010 [Q-1; pass 5] The switch keeps its value after the app is closed and opened again.
- R-011 [PM:pm-settings Essential User; Q-2] A free user can turn the switch On with no paywall or upgrade prompt, and it takes effect (the Essential mockup draws it On).

## Watermark artwork and placement
- R-012 [PM:pm-rules Global Rule; DS:d-aigc-settings AI label] An image result carries the AI label at its top-left corner.
- R-013 [DS:d-aigc-settings 「AI label 大小佔 img 短邊的 12% (包含 padding)」; Jira] The label with its padding is 12% of the image's short side (1080 px short side → 130 px label), in portrait, landscape and square images.
- R-014 [DS:d-aigc-settings 「下載 500*500，已含 padding 的版本」; PM:pm-rules 圖檔 link] The label is the AI label asset (dark rounded square, white 「AI」 in a bracket frame with a sparkle), not text or another icon.
- R-015 [PM:pm-rules Global Rule 「Video: 左上角前兩秒壓上 AIGC Watermark」] A video result carries the label at its top-left during its first two seconds only: present at 0.0 s and 1.9 s, gone from 2.1 s on.
- R-016 [DS:d-aigc-settings; Q-3] In a video the label is 12% of the frame's short side, as for images, in portrait and landscape videos.

## My Artwork — video results
- R-018 [PM:pm-rules My Artwork Page › Video 類] A video result's My Artwork thumbnail, its View player and its timeline after 「Full Editor」 show no watermark.
- R-019 [PM:pm-rules 「Save, Share: 會根據 Preference 設定來決定會不會有 watermark (僅加前兩秒)」] With the switch Off, 「Save」 writes the video with the label in its first two seconds.
- R-020 [PM:pm-rules Save, Share; Jira] With the switch On, 「Save」 writes the video with no label.
- R-021 [PM:pm-rules Save, Share; Jira 「consistently across export/share/save」] Sharing a video result to a Share Video target follows the switch the same way: Off = the shared video has the label in its first two seconds, On = none.
- R-022 [PM: flow arrow 86-968 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=86-968] My Artwork › Image to Video tile → the Image to Video task list. Walked by the Image to Video no-watermark row. Walked by: TC-020.
- R-023 [PM: flow arrow 86-970 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=86-970] Task list 「View」 → the result page with Share Video, 「Full Editor」 and 「Save」. Walked by the Image to Video no-watermark row. Walked by: TC-020.

## My Artwork — image results
- R-024 [PM:pm-rules My Artwork Page › Image 類] An image result's thumbnail, its View and its timeline after 「Full Editor」 show no watermark.
- R-025 [PM:pm-rules Global Rule; Jira; Q-4] 「Save」 of an image result follows the switch: Off = the saved image has the label at its top-left, On = none.
- R-026 [Jira 「consistently across export/share/save」; Q-4] Sharing an image result follows the switch the same way.

## Music Generator (pure audio)
- R-027 [PM:pm-music; PM: flow arrow 97-1818 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=97-1818] With the switch Off, 「Generate for ◆ 6」 opens the dialog 「AIGC Watermark」: 「Your generated music will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, the checkbox 「Don’t show again」, 「Cancel」 and 「Generate」 (PM-only: no Design frame).
- R-028 [PM: flow arrow 97-1820 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=97-1820] 「Cancel」 closes the dialog and returns to the AI Music Generator page with the inputs kept, nothing generated and no credits taken.
- R-029 [PM: flow arrow 97-1819 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=97-1819] 「Generate」 starts the generation: the popup 「Generating...」 with a percentage and 「Go to My AI Music」 appears.
- R-030 [PM:pm-music 「Don’t show again」] After 「Generate」 with 「Don’t show again」 ticked, later generations with the switch Off start without the dialog.
- R-031 [PM:pm-music 「If Remove AIGC Watermark toggle off」; Jira; Q-20] With the switch On, 「Generate」 starts at once with no dialog.
- R-035 [PM:pm-rules 純 Audio 類 「Export, Share: …Project 0~2 秒有沒有 icon 的 watermark」 (red, newest)] Exporting or sharing a project that holds the song follows the switch: Off = the project's first two seconds carry the label, On = none.
- R-055 [Req: REQ-009; Jira PDRA-649 comment 「no need to handle watermark for audio」] No AI Music Generator song carries the spoken clip 「This audio was generated by AI.」, whatever the switch and the app language: not in the My AI Music preview, the downloaded file or the timeline (replaces the earlier spoken-clip rules; see update-plan.md).

## Editor — AI content on the timeline
- R-037 [PM:pm-rules 「當 Timeline 有 Text-2-Speech, Voice Changer、AI Anime、AI Cartoon、AI Sketch 的 AI Content 時 / Timeline: 會根據 Preference 設定來決定會不會有 watermark」; Q-10] With such AI content on the timeline, the editor preview shows the label over the project's first two seconds when the switch is Off, and none when it is On.
- R-038 [PM:pm-rules 「Export, Share: 會根據 Preference 設定來決定有沒有 icon 的 watermark」] Exporting a project with such AI content follows the switch: Off = the produced file has the label in its first two seconds, On = none.
- R-039 [PM:pm-rules Export, Share] Sharing such a project from the editor follows the switch the same way.
- R-040 [PM:pm-rules example 「非 AI 素材」 / 「AI 素材」; Q-9] The label goes on the project's first two seconds even when the first clip is not AI content and the AI clip comes later.
- R-041 [Q-7] A project with no AI content exports with no dialog and no label.
- R-042 [Jira 「consistently across export/share/save」; Q-19] A My Artwork video opened with 「Full Editor」 and exported follows the switch like other AI content: Off = label in the first two seconds, On = none.

## Export dialog
- R-043 [PM:pm-export; PM: flow arrow 86-955 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=86-955] With the switch Off and AI content in the project, Editor 「Export」 opens the dialog 「AIGC Watermark」: 「Your exported file will include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, 「Don’t show again」, 「Cancel」, 「Export」 (PM-only: no Design frame).
- R-044 [PM: flow arrow 86-956 https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=86-956] Dialog 「Export」 closes it and opens the Produce sheet (Resolution, 「Produce」).
- R-045 [PM:pm-export] 「Cancel」 closes the dialog and stays in the editor with nothing produced (PM draws no arrow: Q-7 covers the gap).
- R-046 [PM:pm-export 「Don’t show again」; Q-8] After 「Export」 with 「Don’t show again」 ticked, later exports with the switch Off skip the dialog but still carry the label.
- R-047 [PM:pm-export; Jira] With the switch On, 「Export」 goes straight to the Produce sheet with no dialog.

## Already-saved content
- R-048 [PM:pm-rules Note 「已下載過的 AI Content，不會因為 Preference 改變設定而動態更新」] A file already saved or downloaded keeps the watermark state it was saved with when the switch is changed later.
- R-049 [PM:pm-rules Save, Share; Jira] Saving the same result again after changing the switch applies the new value to the new file.

## C2PA metadata
- R-050 [Jira 「加meta data」, 「meta data server side會always打sign」; Req: REQ-002, REQ-007] Every AI result the app saves carries a C2PA manifest (Content Credentials) signed by CyberLink, whichever effect made it: the sheet's 有簽章 / 無簽章 and its signer name the provider's own file, not the saved result (DRA262611P0220 NAB).
- R-052 [Jira 「UI setting 是控 visible watermark是否開or關」; 「meta data server side」; Req: REQ-007] 「Remove AIGC Watermark」 only changes the app\'s visible watermark; the C2PA signature is the same with the switch On or Off (DRA262611P0220 RD note).
- R-053 [PM:pm-rules timeline AI content; Req: REQ-002] Timeline AI content made by a 有簽章 effect (AI Anime, AI Cartoon, AI Sketch, Voice Changer, AI Text to Speech) is signed as the sheet says — NOT TESTABLE on the phone: the generated asset stays inside the project and no file of it can be read (Q-13).
- R-056 [Req: REQ-008; CLC2PA 1.0.1012+ (Jira PDRA-649 comment, RD note on DRA262611P0221)] The saved result\'s manifest is CyberLink\'s alone: one `c2pa.created` action with a `digitalSourceType`, no ingredient (no parentOf / componentOf), and a provider\'s manifest (Google, BytePlus, Kling…) is replaced, not kept.

## MUI
- R-057 [Req: REQ-011] Every user-facing string of the feature (the Settings row 「Remove AIGC Watermark」, the 「AIGC Watermark」 info sheet, the export dialog and the music dialog) shows in each language of the product list (CHT, CHS, JPN, ESP, KOR, DEU, FRA, ITA, RUS, PTB, NLD, IND, THA, MAY, HIN, ESM, ARA, VIT, PLK, TRK, FAR, HEB, SVE, DAN, NOR, UKR), in that language's own words with the English meaning, with no English (but 「AIGC」), key or placeholder left; 「Menu > Settings」 in the dialogs names the Menu and Settings as those screens do. No translation sheet: the run judges each string; doubtful ones are listed for the eBug review, not failed.
- R-058 [Req: REQ-011] In each of those languages no string of the feature is truncated, clipped or overlapping, and the Settings row's ⓘ and switch and the dialogs' checkbox and buttons keep their size and place; the right-to-left languages (ARA, FAR, HEB) run from the right.

## Open questions
- Q-1 What is the switch's value on a fresh install, and is it kept across restarts? Both mockups draw 「Remove AIGC Watermark」 On; the dialogs say results 「will include an AIGC watermark」. Assumption: Off on a fresh install (results carry the watermark), kept after a restart. R-009, R-010.
- Q-2 Is the switch free for every tier? The Essential (free) mockup draws it On next to the paid 「Remove Watermark」. Assumption: free for all tiers, no paywall. R-011.
- Q-3 The 12% rule names images (「img 短邊」). Assumption: a video's label is also 12% of the frame's short side, at the same top-left corner with no margin beyond the asset's own padding. R-016.
- Q-4 The PM lists Save / Share only under Video; Image lists thumbnail, View and Full Editor. Assumption: image Save and Share follow the switch too (Global Rule, Jira 「consistently across export/share/save」). R-025, R-026.
- Q-6 Does the switch decide whether AI Music Generator shows its dialog? REQ-009 settles the clip itself (no song carries one); the dialog part moves to Q-20. R-031.
- Q-7 When does the export dialog appear? The PM draws it after 「Export」 with no condition and no Cancel arrow. Assumption: only with the switch Off and AI content in the project; a project with no AI content exports with no dialog and no label; 「Cancel」 stays in the editor. R-041, R-045, R-043.
- Q-8 Do the export and music dialogs share one 「Don’t show again」? Assumption: separate. R-030, R-046.
- Q-9 The PM example puts the AI badge on the first clip, which is 「非 AI 素材」. Assumption: the label goes on the project's first two seconds wherever the AI clip is. R-040.
- Q-10 「Timeline: 會根據 Preference 設定來決定會不會有 watermark」 for TTS, Voice Changer, AI Anime, AI Cartoon, AI Sketch, while My Artwork results show none in the timeline. Assumption: the editor preview shows the label over the project's first two seconds when the switch is Off. R-037.
- Q-11 Which scope items are My Artwork results and which are editor tools? Assumption: videos = Video Edit by Chat, Image to Video, Cinematic Reel Creator, Character Motion Swap, Video Object Removal, AI Storytelling, Text to Video, AI Anime Video, Talking Avatar; images = AI Art, Text to Image; timeline tools = AI Text to Speech, Voice Changer, AI Anime, AI Cartoon, AI Sketch (the PM timeline note names them); Music Generator = pure audio. Rows of a feature the build lacks on ios are n/a.
- Q-12 Which sheet effect does each PDR feature and model call? Since REQ-007 / REQ-008 [KB: KF-007] the signer is CyberLink on every path, so the answer no longer changes a row; the rows keep the sheet line in Notes for reference. QA reads the manifest with c2patool. R-050, R-056.
- Q-13 Should an editor export that holds signed AI content carry C2PA metadata, and can a timeline tool's generated asset be read as a file? The spec is silent; no row asserts the exported project's metadata, and the timeline-tool rows are parked. R-053.
- Q-14 The PM 「AIGC Watermark Spec.pptx」 (SharePoint) could not be opened; it may hold margin, opacity or per-feature rules not in Figma.
- Q-16 A video result shorter than two seconds: assumption the label stays for the whole video (no row asserts it). R-015.
- Q-17 The Jira is iOS (PDRIOS-722). Is Android in the same release with the same rules? The Android table assumes so.
- Q-19 A My Artwork video opened with 「Full Editor」 and exported: the PM says only that the timeline shows no watermark. Assumption: the export follows the switch like other AI content. R-042.
- Q-20 AI Music Generator still shows 「AIGC Watermark」 「Your generated music will include an AIGC watermark…」 with the switch Off (PM pm-music), but REQ-009 drops the audio watermark, and a song only gets the visible label once it is exported in a project (R-035). Does the music dialog stay, and what does its text promise? Assumption: the dialog stays as the PM draws it (R-027 – R-031 unchanged); DRA262611P0229 (no dialog) is open. R-027, R-028, R-029, R-030, R-031.

## Added 2026-11-17 — coverage passes and standing inputs

### Job states
| Job | Start/loading | Success | Failure | Retry | Stop | Leave and return | Done notice |
|---|---|---|---|---|---|---|---|
| Save result with watermark | n/a (spec silent: Save's own feedback is the result page's, unchanged) | TC-018 | n/a (spec silent) | n/a (spec silent) | n/a (no stop) | n/a (spec silent) | n/a (spec silent) |
| Export project with watermark | n/a (the Produce sheet is the editor's, unchanged) | TC-064 | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) |
| Music generation with watermark | TC-056 | TC-057 | n/a (Music Generator's own table) | n/a (Music Generator's own table) | n/a (spec silent) | n/a (spec silent) | n/a (Music Generator's own table) |

### Exit × stage
| Stage | Dismiss button | System Back (Android) |
|---|---|---|
| Info sheet open | TC-005 | n/a (iOS has no system Back) |
| Music dialog open | TC-055 | n/a (iOS has no system Back) |
| Export dialog open | TC-084 | n/a (iOS has no system Back) |

### Error classes
| Job | Any error class |
|---|---|
| Save / export / music generation with watermark | n/a (the spec names no error classes for the watermark; generation errors belong to each AI feature's table) |

### Hidden clauses
| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-048 | saved files are not updated later | the gallery copy after the switch changes | TC-085, TC-086 |
| R-050 | every saved result is signed by CyberLink | c2patool on the saved file copied to the computer | TC-088, TC-089, TC-090, TC-091, TC-092, TC-093, TC-094, TC-095, TC-096, TC-097, TC-098, TC-099, TC-100, TC-101, TC-102, TC-103, TC-104, TC-105, TC-106, TC-107, TC-108, TC-109, TC-110, TC-111, TC-112, TC-113, TC-114, TC-115, TC-116, TC-117, TC-118, TC-119, TC-120 |
| R-056 | the CyberLink manifest is the only one; no provider manifest or ingredient | c2patool on the saved file | TC-088, TC-089, TC-090, TC-091, TC-092, TC-093, TC-094, TC-095, TC-096, TC-097, TC-098, TC-099, TC-100, TC-101, TC-102, TC-103, TC-104, TC-105, TC-106, TC-107, TC-108, TC-109, TC-110, TC-111, TC-112, TC-113, TC-114, TC-115, TC-116, TC-117, TC-118, TC-119, TC-120 |
| R-052 | the switch leaves the metadata alone | c2patool on a file saved with the switch On | TC-119, TC-120 |
| R-055 | no spoken AI clip on any song | the preview, the downloaded file and the timeline | TC-014, TC-057, TC-058, TC-059, TC-062 |
| R-028 | Cancel takes no credits | the credit balance before and after | TC-055 |
| R-053 | timeline-tool assets are signed | no file to read on the phone (parked, Q-13) | TC-121, TC-122, TC-123, TC-124, TC-125 |

### Variants
| Requirement | Variant | Rows |
|---|---|---|
| R-003 | tier Pro | TC-002 |
| R-003 | tier Pro+ | TC-003 |
| R-013 | portrait | TC-009 |
| R-013 | landscape | TC-010 |
| R-013 | square | TC-011 |
| R-055 | one language (English): no clip in any | TC-014 |
| R-019 | Video Edit by Chat | TC-018 |
| R-020 | Video Edit by Chat | TC-019 |
| R-018 | Video Edit by Chat | TC-017 |
| R-019 | Image to Video | TC-021 |
| R-020 | Image to Video | TC-022 |
| R-018 | Image to Video | TC-020 |
| R-019 | Cinematic Reel Creator | TC-024 |
| R-020 | Cinematic Reel Creator | TC-025 |
| R-018 | Cinematic Reel Creator | TC-023 |
| R-019 | Character Motion Swap | TC-027 |
| R-020 | Character Motion Swap | TC-028 |
| R-018 | Character Motion Swap | TC-026 |
| R-019 | Video Object Removal | TC-030 |
| R-020 | Video Object Removal | TC-031 |
| R-018 | Video Object Removal | TC-029 |
| R-019 | AI Storytelling | TC-033 |
| R-020 | AI Storytelling | TC-034 |
| R-018 | AI Storytelling | TC-032 |
| R-019 | Text to Video | TC-036 |
| R-020 | Text to Video | TC-037 |
| R-018 | Text to Video | TC-035 |
| R-019 | AI Anime Video | TC-039 |
| R-020 | AI Anime Video | TC-040 |
| R-018 | AI Anime Video | TC-038 |
| R-019 | Talking Avatar | TC-042 |
| R-020 | Talking Avatar | TC-043 |
| R-018 | Talking Avatar | TC-041 |
| R-025 | AI Art | TC-047, TC-048 |
| R-024 | AI Art | TC-046 |
| R-025 | Text to Image | TC-050, TC-051 |
| R-024 | Text to Image | TC-049 |
| R-037 | AI Text to Speech | TC-063, TC-065 |
| R-038 | AI Text to Speech | TC-064, TC-065 |
| R-037 | Voice Changer | TC-066, TC-068 |
| R-038 | Voice Changer | TC-067, TC-068 |
| R-037 | AI Anime | TC-069, TC-071 |
| R-038 | AI Anime | TC-070, TC-071 |
| R-037 | AI Cartoon | TC-072, TC-074 |
| R-038 | AI Cartoon | TC-073, TC-074 |
| R-037 | AI Sketch | TC-075, TC-077 |
| R-038 | AI Sketch | TC-076, TC-077 |
| R-050 | Image to Video · a Google (Veo) model | TC-088 |
| R-050 | Image to Video · a BytePlus (Seedance) model | TC-089 |
| R-050 | Image to Video · a Flux model | TC-090 |
| R-050 | Image to Video · a Kling model | TC-091 |
| R-050 | Image to Video · a Vidu model | TC-092 |
| R-050 | Image to Video · a Hailuo model | TC-093 |
| R-050 | Image to Video · a Pixverse model | TC-094 |
| R-050 | Image to Video · an Alibaba (Wan) model | TC-095 |
| R-050 | Image to Video · a Google model with automatic music | TC-096 |
| R-050 | Text to Video · a Google (Veo) model | TC-097 |
| R-050 | Text to Video · a BytePlus (Seedance) model | TC-098 |
| R-050 | Text to Video · a Flux model | TC-099 |
| R-050 | Text to Video · a Kling model | TC-100 |
| R-050 | Text to Video · a Vidu model | TC-101 |
| R-050 | Text to Video · a Hailuo model | TC-102 |
| R-050 | Text to Video · a Pixverse model | TC-103 |
| R-050 | Text to Video · an Alibaba (Wan) model | TC-104 |
| R-050 | Character Motion Swap · the Kling model | TC-105 |
| R-050 | Character Motion Swap · the CyberLink model (Wan Animate) | TC-106 |
| R-050 | Video Object Removal · its only path | TC-107 |
| R-050 | AI Storytelling · its default path | TC-108 |
| R-050 | Cinematic Reel Creator · a BytePlus model | TC-109 |
| R-050 | Cinematic Reel Creator · a Kling model | TC-110 |
| R-050 | Video Edit by Chat · a Google model | TC-111 |
| R-050 | Video Edit by Chat · a Kling model | TC-112 |
| R-050 | AI Anime Video · its only path | TC-113 |
| R-050 | Talking Avatar · its only path | TC-114 |
| R-050 | AI Art · its default style | TC-115 |
| R-050 | Text to Image · its default model | TC-116 |
| R-050 | Music Generator · a prompt-only song | TC-117 |
| R-050 | Music Generator · a song from lyrics | TC-118 |
| R-057 | CHT (Traditional Chinese) | TC-128 |
| R-058 | CHT (Traditional Chinese) | TC-128 |
| R-057 | CHS (Simplified Chinese) | TC-129 |
| R-058 | CHS (Simplified Chinese) | TC-129 |
| R-057 | JPN (Japanese) | TC-130 |
| R-058 | JPN (Japanese) | TC-130 |
| R-057 | ESP (Spanish) | TC-131 |
| R-058 | ESP (Spanish) | TC-131 |
| R-057 | KOR (Korean) | TC-132 |
| R-058 | KOR (Korean) | TC-132 |
| R-057 | DEU (German) | TC-133 |
| R-058 | DEU (German) | TC-133 |
| R-057 | FRA (French) | TC-134 |
| R-058 | FRA (French) | TC-134 |
| R-057 | ITA (Italian) | TC-135 |
| R-058 | ITA (Italian) | TC-135 |
| R-057 | RUS (Russian) | TC-136 |
| R-058 | RUS (Russian) | TC-136 |
| R-057 | PTB (Portuguese (Brazil)) | TC-137 |
| R-058 | PTB (Portuguese (Brazil)) | TC-137 |
| R-057 | NLD (Dutch) | TC-138 |
| R-058 | NLD (Dutch) | TC-138 |
| R-057 | IND (Indonesian) | TC-139 |
| R-058 | IND (Indonesian) | TC-139 |
| R-057 | THA (Thai) | TC-140 |
| R-058 | THA (Thai) | TC-140 |
| R-057 | MAY (Malay) | TC-141 |
| R-058 | MAY (Malay) | TC-141 |
| R-057 | HIN (Hindi) | TC-142 |
| R-058 | HIN (Hindi) | TC-142 |
| R-057 | ESM (Spanish (Mexico)) | TC-143 |
| R-058 | ESM (Spanish (Mexico)) | TC-143 |
| R-057 | ARA (Arabic) | TC-144 |
| R-058 | ARA (Arabic) | TC-144 |
| R-057 | VIT (Vietnamese) | TC-145 |
| R-058 | VIT (Vietnamese) | TC-145 |
| R-057 | PLK (Polish) | TC-146 |
| R-058 | PLK (Polish) | TC-146 |
| R-057 | TRK (Turkish) | TC-147 |
| R-058 | TRK (Turkish) | TC-147 |
| R-057 | FAR (Persian) | TC-148 |
| R-058 | FAR (Persian) | TC-148 |
| R-057 | HEB (Hebrew) | TC-149 |
| R-058 | HEB (Hebrew) | TC-149 |
| R-057 | SVE (Swedish) | TC-150 |
| R-058 | SVE (Swedish) | TC-150 |
| R-057 | DAN (Danish) | TC-151 |
| R-058 | DAN (Danish) | TC-151 |
| R-057 | NOR (Norwegian Bokmål) | TC-152 |
| R-058 | NOR (Norwegian Bokmål) | TC-152 |
| R-057 | UKR (Ukrainian) | TC-153 |
| R-058 | UKR (Ukrainian) | TC-153 |

### Flow arrows walked by existing rows
- R-005, R-006, R-022, R-023: walked by the rows named on each requirement. The other arrows are requirements with their own rows (3816-10913 R-004, 86-955 R-043, 86-956 R-044, 97-1818 R-027, 97-1819 R-029, 97-1820 R-028).

### Domain rules
| Entry | Requirements |
|---|---|
| KP-007 A failed generation refunds its credits | n/a (this feature adds no failure path; generation failures belong to each AI feature's table) |

### Request ledger coverage
| Ledger entry | Requirements |
|---|---|
| REQ-002 | R-050 (signed vs not signed now only names the provider file) |
| REQ-003 | R-024 (TC-046: AI Art has no 「Full Editor」, step dropped) |
| REQ-007 | R-050, R-052 |
| REQ-008 | R-056 |
| REQ-009 | R-055, R-031 |
| REQ-010 | R-055 (row fix: TC-128 Android / TC-126 iOS, Step 3 no spoken clip) |
| REQ-011 (table: MUI test in the 26 languages of the product list, no translation sheet) | R-057, R-058 (TC-128 – TC-153) |
| REQ-012 (table: plan the MUI cases, 2026-11-25) | R-057, R-058 |
