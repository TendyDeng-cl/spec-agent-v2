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

Draft 20261125-190000 [Req: REQ-014]: every Open question that is still open gets a row that takes the app to the point in
question (user, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases already?」). Changed rows: TC-126 (Q-8), TC-082 (Q-19);
new rows: TC-155 (Q-19, switch On), TC-154 (Q-13); Q-14, Q-16 and Q-17 end 「No row」; the other open questions now name the rows that observe them.
No requirement changes.

Draft 20261126-111601 [Req: REQ-015]: every entry point of every tool in the table is tested in full (analysis.md pass 12; user, 2026-11-26:
「for any features that have multiple entry points, each entry needs to be tested completely and cannot assume they both lead to the same thing and have the same behavior」). The entries come from the product team's toolbar sheet (tab 「2026/11 Auto Reframe」, [KB: KP-107]), the knowledge
and the Android runs (### Entry points); each non-primary entry gets its own Section 「Entry › <path>」 with a UI pass (user, 2026-11-26:
「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options」):
landing, the values read from its input, every control once, the main action once (where the result lands, watermark and
Content Credentials) and every exit once. New: R-059 – R-065, Q-22; 178 new rows (TC-156 – TC-333); the timeline tools' first rows
(TC-063, TC-066, TC-069, TC-072, TC-075) now name their primary entry.

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

## Entry points (pass 12)
- R-059 [Rule 12: every entry point; Req: REQ-015; KB: KP-107] A tool opened from any place under ### Entry points opens with the same page or panel, inputs and credit price as from its primary entry; what the entry brings in (the selected clip, photo, audio or title, or nothing) is recorded.
- R-060 [Rule 12; Req: REQ-015; PM:pm-rules My Artwork Page] A result made through a non-primary entry lands where the primary entry's results do: video and image results in My Artwork under the tool's tile, songs in My AI Music, timeline-tool content on the open project's timeline; where an editor entry also puts the result on its own project is recorded.
- R-061 [Rule 12; Req: REQ-015] Leaving the tool before anything is made (its back control, and system Back on Android) returns to the screen it was opened from as it was (for an editor entry: the same project, selection and playhead) and takes no credits.
- R-062 [KB: KP-107; Req: REQ-015] The places the toolbar sheet gives (with its bracket notes such as 「7/E」, 「8/M」, 「4/E IOS」) and those the knowledge records on one platform are in the build; one that is missing is recorded with what the menu lists instead (Q-22).
- R-063 [Rule 12; Req: REQ-015; KB: KP-012] The CMS-set entries (Launcher big and small shortcuts, 「AI-Powered Creation」, the AI Magic tab list, a result page's 「You might also like」) are inventoried at each run; one that opens a tool of this table and is not under ### Entry points is a gap for the next draft.
- R-064 [Rule 12; Req: REQ-015] A tool opened from an entry with an input (a selected clip, photo, audio clip or title, or a picked file) shows that input's own values: thumbnail, length, trim range, fps, resolution, aspect and text match the input.
- R-065 [Rule 12; Req: REQ-015] Every control and option of a tool opened from a non-primary entry, pressed once, responds as from the primary entry, with no error, crash, freeze, empty state or wrong value.

## MUI
- R-057 [Req: REQ-011] Every user-facing string of the feature (the Settings row 「Remove AIGC Watermark」, the 「AIGC Watermark」 info sheet, the export dialog and the music dialog) shows in each language of the product list (CHT, CHS, JPN, ESP, KOR, DEU, FRA, ITA, RUS, PTB, NLD, IND, THA, MAY, HIN, ESM, ARA, VIT, PLK, TRK, FAR, HEB, SVE, DAN, NOR, UKR), in that language's own words with the English meaning, with no English (but 「AIGC」), key or placeholder left; 「Menu > Settings」 in the dialogs names the Menu and Settings as those screens do. No translation sheet: the run judges each string; doubtful ones are listed for the eBug review, not failed.
- R-058 [Req: REQ-011] In each of those languages no string of the feature is truncated, clipped or overlapping, and the Settings row's ⓘ and switch and the dialogs' checkbox and buttons keep their size and place; the right-to-left languages (ARA, FAR, HEB) run from the right.

## Open questions
- Q-1 What is the switch's value on a fresh install, and is it kept across restarts? Both mockups draw 「Remove AIGC Watermark」 On; the dialogs say results 「will include an AIGC watermark」. Assumption: Off on a fresh install (results carry the watermark), kept after a restart. R-009, R-010. Rows: TC-008 (fresh install: Blocked on the QA iPhone, which cannot be reinstalled), TC-007 (restart).
- Q-2 Is the switch free for every tier? The Essential (free) mockup draws it On next to the paid 「Remove Watermark」. Assumption: free for all tiers, no paywall. R-011. Rows: TC-006.
- Q-3 The 12% rule names images (「img 短邊」). Assumption: a video's label is also 12% of the frame's short side, at the same top-left corner with no margin beyond the asset's own padding. R-016. Rows: TC-012, TC-013.
- Q-4 The PM lists Save / Share only under Video; Image lists thumbnail, View and Full Editor. Assumption: image Save and Share follow the switch too (Global Rule, Jira 「consistently across export/share/save」). R-025, R-026. Rows: TC-047, TC-048, TC-050 – TC-053.
- Q-6 Does the switch decide whether AI Music Generator shows its dialog? REQ-009 settles the clip itself (no song carries one); the dialog part moves to Q-20. R-031. Rows: TC-062.
- Q-7 When does the export dialog appear? The PM draws it after 「Export」 with no condition and no Cancel arrow. Assumption: only with the switch Off and AI content in the project; a project with no AI content exports with no dialog and no label; 「Cancel」 stays in the editor. R-041, R-045, R-043. Rows: TC-081, TC-083, TC-084.
- Q-8 Do the export and music dialogs share one 「Don’t show again」? Assumption: separate. TC-126 ticks the music dialog's box and then opens the export dialog, which must still show (its steps 4–5); TC-127 ticks the export dialog's own. R-030, R-046 (TC-126, TC-127).
- Q-9 The PM example puts the AI badge on the first clip, which is 「非 AI 素材」. Assumption: the label goes on the project's first two seconds wherever the AI clip is. R-040. Rows: TC-080.
- Q-10 「Timeline: 會根據 Preference 設定來決定會不會有 watermark」 for TTS, Voice Changer, AI Anime, AI Cartoon, AI Sketch, while My Artwork results show none in the timeline. Assumption: the editor preview shows the label over the project's first two seconds when the switch is Off. R-037. Rows: TC-063, TC-065, TC-066, TC-068, TC-069, TC-071, TC-072, TC-074, TC-075, TC-077.
- Q-11 Which scope items are My Artwork results and which are editor tools? Assumption: videos = Video Edit by Chat, Image to Video, Cinematic Reel Creator, Character Motion Swap, Video Object Removal, AI Storytelling, Text to Video, AI Anime Video, Talking Avatar; images = AI Art, Text to Image; timeline tools = AI Text to Speech, Voice Changer, AI Anime, AI Cartoon, AI Sketch (the PM timeline note names them); Music Generator = pure audio. Rows of a feature the build lacks on ios are n/a. Rows: each feature's rows look for its result or tool where it is assumed (videos TC-017 – TC-043; images TC-046 – TC-051; timeline tools TC-063 – TC-077; music TC-054), and one found somewhere else is recorded with where it was. The Android R3 run found AI Storytelling's result under its own history (「Generated Story」, 「Export」) and not in My Artwork, no Video Object Removal, AI Cartoon and AI Sketch only in the Launcher's AI Magic, and a Voice Changer effect voice not treated as AI content: look at each on iOS.
- Q-12 Which sheet effect does each PDR feature and model call? Since REQ-007 / REQ-008 [KB: KF-007] the signer is CyberLink on every path, so the answer no longer changes a row; the rows keep the sheet line in Notes for reference. QA reads the manifest with c2patool. R-050, R-056. Rows: TC-088 – TC-120.
- Q-13 Should an editor export that holds signed AI content carry C2PA metadata, and can a timeline tool's generated asset be read as a file? The spec is silent. Assumption: none. TC-154 reads the Content Credentials of the AI Text to Speech and AI Anime exports (the files of TC-064, TC-070 and, with the switch On, TC-065) and records what each carries as Fail (question) for PM. A timeline tool's own asset cannot be read as a file, so those rows stay parked (TC-121 – TC-125). R-053.
- Q-14 The PM 「AIGC Watermark Spec.pptx」 (SharePoint) could not be opened; it may hold margin, opacity or per-feature rules not in Figma. No row: nobody has read the file, so there is no rule of it to take the app to; the rows measured on the device follow the Figma rules only (TC-009 – TC-013). PM has to supply the file.
- Q-16 A video result shorter than two seconds: assumption the label stays for the whole video. R-015. No row: no feature or model is known to return a result shorter than two seconds (the shortest seen on Android is about 4 s, Text to Video with Veo 3.1 4s, and Video Edit by Chat takes a 3–10 s source), so the app cannot be taken there. When one can, a row saves that result with the switch Off and grabs its frames up to the last one.
- Q-17 The Jira is iOS (PDRIOS-722). Is Android in the same release with the same rules? The Android table assumes so. No row: it asks about the Android build, which no iOS row can observe; the Android table's R3 run determined it (Android has the feature in 16.9.0 with the same rules, Jira PDRA-649).
- Q-19 A My Artwork video opened with 「Full Editor」 and exported: the PM says only that the timeline shows no watermark. Assumption: the export follows the switch like other AI content. TC-082 (switch Off) and TC-155 (switch On) export a result that was never saved with the switch Off, so the export's own label can be told from one burned into the clip. R-042.
- Q-20 AI Music Generator still shows 「AIGC Watermark」 「Your generated music will include an AIGC watermark…」 with the switch Off (PM pm-music), but REQ-009 drops the audio watermark, and a song only gets the visible label once it is exported in a project (R-035). Does the music dialog stay, and what does its text promise? Assumption: the dialog stays as the PM draws it (R-027 – R-031 unchanged); DRA262611P0229 (no dialog) is open. R-027, R-028, R-029, R-030, R-031. Rows: TC-054 – TC-056, TC-062, TC-126.
- Q-22 Places the build may lack: the toolbar sheet's release notes (Video Edit by Chat 「8/M」 / 「7/E」, Cinematic Reel Creator 「7/E」, 「AI Remove (4/E IOS)」), 「AI Remove」 taken to be Video Object Removal (not named in the sheet), AI Style Transfer (AI Cartoon, AI Sketch) under Portrait while Android R3 found none in the editor, and entries known only on one platform (the Launcher big shortcut, KP-010; AI Art's 「Turn the image into a video」, KP-090; Add Music › AI Music Generator, KP-097; the completion banner, KP-055). Assumption: each is present as listed. Rows: the first row of each such Section records presence (TC-157, TC-162, TC-167, TC-172, TC-177, TC-182, TC-187, TC-192, TC-197, TC-202, TC-207, TC-212, TC-217, TC-222, TC-227, TC-232, TC-237, TC-242, TC-247, TC-252, TC-257, TC-262, TC-267, TC-272, TC-277, TC-282, TC-287, TC-292, TC-297, TC-302, TC-307, TC-313, TC-319, TC-331). R-062.

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
| Tool page or panel opened from a non-primary entry (pass 12) | TC-161, TC-166, TC-171, TC-176, TC-181, TC-186, TC-191, TC-196, TC-201, TC-206, TC-211, TC-216, TC-221, TC-226, TC-231, TC-236, TC-241, TC-246, TC-251, TC-256, TC-261, TC-266, TC-271, TC-276, TC-281, TC-286, TC-291, TC-296, TC-301, TC-306, TC-312, TC-318, TC-324, TC-333 | n/a (iOS has no system Back) |
| Music dialog open from a non-primary entry | TC-311, TC-317, TC-323 | n/a (iOS has no system Back) |

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
| R-053 | whether an editor export that holds signed AI content carries a manifest (Q-13) | c2patool on the exported files of the AI Text to Speech and AI Anime projects | TC-154 |
| R-046 | the export dialog's 「Don’t show again」 is its own, not the music dialog's (Q-8) | the export dialog opened after the music dialog's box was ticked | TC-126 |
| R-042 | the label is the export's own, not one burned into the clip (Q-19) | a result never saved with the switch Off, exported Off and On | TC-082, TC-155 |

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

### Entry points
One line per tool × entry (pass 12): path · where it comes from · platforms · Section. The toolbar sheet is the product
team's 「PDRM Toolbar re-org」, tab 「2026/11 Auto Reframe」 [KB: KP-107]; its bracket notes are kept. A primary entry's
rows are the existing ones (the full table); every other entry has its own Section with a UI pass: landing and what it
brings in, the values read from its input, every control and option once (no combinations), the main action once (where
the result lands, watermark and Content Credentials on it) and every exit once. AI Anime (timeline) is AI Anime Video from the Video toolbar's Effects, listed under AI Anime Video.
- Video Edit by Chat · Launcher › AI Magic tab › Video Edit by Chat; results in AI Magic › My Artwork (PM pm-rules My Artwork flow) · both · **primary**, rows TC-017 – TC-019, TC-111, TC-112 (existing)
- Video Edit by Chat · Launcher › Video Edit by Chat big shortcut · KP-010 (Launcher big shortcuts), Design 8/E (KP-011) · both (known on one platform: presence recorded, Q-22) · Section 「Entry › Launcher › Video Edit by Chat big shortcut」, rows TC-157 – TC-161
- Video Edit by Chat · Editor › Global toolbar › AI Magic › Video Edit by Chat · toolbar sheet (KP-107), Global › AI Magic 「Video Edit by Chat (8/M)」 · both · Section 「Entry › Editor › Global toolbar › AI Magic › Video Edit by Chat」, rows TC-162 – TC-166
- Video Edit by Chat · Editor › Video toolbar › Effects › Video Edit by Chat · toolbar sheet (KP-107), Video › Effects 「Video Edit by Chat (8/M)」 · both · Section 「Entry › Editor › Video toolbar › Effects › Video Edit by Chat」, rows TC-167 – TC-171
- Video Edit by Chat · Editor › PIP Video toolbar › Effects › Video Edit by Chat · toolbar sheet (KP-107), PIP Video › Effects 「Video Edit by Chat (7/E)」 · both · Section 「Entry › Editor › PIP Video toolbar › Effects › Video Edit by Chat」, rows TC-172 – TC-176
- Image to Video · Launcher › AI Magic tab › Image to Video; AI Magic › My Artwork › Image to Video (PM flow arrows 86-968, 86-970) · both · **primary**, rows TC-020 – TC-022, TC-044, TC-045, TC-082, TC-155, TC-088 – TC-096 (existing)
- Image to Video · Editor › Global toolbar › AI Magic › Image to Video · toolbar sheet (KP-107), Global › AI Magic · both · Section 「Entry › Editor › Global toolbar › AI Magic › Image to Video」, rows TC-177 – TC-181
- Image to Video · AI Art result › Turn the image into a video · KP-090 (the AI Art result page offers 「Turn the image into a video」, Android) · both (known on one platform: presence recorded, Q-22) · Section 「Entry › AI Art result › Turn the image into a video」, rows TC-182 – TC-186
- Cinematic Reel Creator · Launcher › AI Magic tab › Cinematic Reel Creator; My Artwork · both · **primary**, rows TC-023 – TC-025, TC-109, TC-110 (existing)
- Cinematic Reel Creator · Editor › Global toolbar › AI Magic › Cinematic Reel Creator · toolbar sheet (KP-107), Global › AI Magic 「Cinematic Reel Creator (7/E)」 · both · Section 「Entry › Editor › Global toolbar › AI Magic › Cinematic Reel Creator」, rows TC-187 – TC-191
- Cinematic Reel Creator · Editor › Photo toolbar › Effects › Cinematic Reel Creator · toolbar sheet (KP-107), Photo › Effects 「Cinematic Reel Creator (7/E)」 · both · Section 「Entry › Editor › Photo toolbar › Effects › Cinematic Reel Creator」, rows TC-192 – TC-196
- Cinematic Reel Creator · Editor › PIP Photo toolbar › Effects › Cinematic Reel Creator · toolbar sheet (KP-107), PIP Photo › Effects 「Cinematic Reel Creator (7/E)」 · both · Section 「Entry › Editor › PIP Photo toolbar › Effects › Cinematic Reel Creator」, rows TC-197 – TC-201
- Character Motion Swap · Launcher › AI Magic tab › Character Motion Swap; My Artwork (not in the toolbar sheet: no other entry known) · both · **primary**, rows TC-026 – TC-028, TC-105, TC-106 (existing)
- Video Object Removal · Launcher › AI Magic tab › Video Object Removal; My Artwork (Android: not offered, KP-082) · both · **primary**, rows TC-029 – TC-031, TC-107 (existing)
- Video Object Removal · Editor › Video toolbar › AI Remove · toolbar sheet (KP-107), Video toolbar first layer 「AI Remove (4/E IOS)」; KP-050 (iOS clip toolbar 「Object Removal」) · both · Section 「Entry › Editor › Video toolbar › AI Remove」, rows TC-202 – TC-206
- Video Object Removal · Editor › PIP Video toolbar › AI Remove · toolbar sheet (KP-107), PIP Video toolbar first layer 「AI Remove (4/E IOS)」 · both · Section 「Entry › Editor › PIP Video toolbar › AI Remove」, rows TC-207 – TC-211
- AI Storytelling · Launcher › AI Magic tab › AI Storytelling; its own history 「Generated Story」 on Android (KP-085) (not in the toolbar sheet: no other entry known) · both · **primary**, rows TC-032 – TC-034, TC-108 (existing)
- Text to Video · Launcher › AI Magic tab › Text to Video; My Artwork · both · **primary**, rows TC-012, TC-013, TC-035 – TC-037, TC-097 – TC-104 (existing)
- Text to Video · Editor › Global toolbar › AI Magic › Text to Video · toolbar sheet (KP-107), Global › AI Magic (「Text to Video 2/B 加入」) · both · Section 「Entry › Editor › Global toolbar › AI Magic › Text to Video」, rows TC-212 – TC-216
- AI Anime Video · Launcher › AI Magic tab › AI Anime Video; My Artwork · both · **primary**, rows TC-038 – TC-040, TC-113 (existing)
- AI Anime Video · Editor › Video toolbar › Effects › AI Anime Video · toolbar sheet (KP-107), Video › Effects · both · Section 「Entry › Editor › Video toolbar › Effects › AI Anime Video」, rows TC-217 – TC-221 (timeline part: TC-069 – TC-071)
- AI Anime Video · Editor › PIP Video toolbar › Effects › AI Anime Video · toolbar sheet (KP-107), PIP Video › Effects · both · Section 「Entry › Editor › PIP Video toolbar › Effects › AI Anime Video」, rows TC-222 – TC-226
- Talking Avatar · Launcher › AI Magic tab › Talking Avatar; My Artwork · both · **primary**, rows TC-041 – TC-043, TC-114 (existing)
- Talking Avatar · Editor › Global toolbar › AI Magic › Talking Avatar · toolbar sheet (KP-107), Global › AI Magic · both · Section 「Entry › Editor › Global toolbar › AI Magic › Talking Avatar」, rows TC-227 – TC-231
- Talking Avatar · Editor › Audio toolbar › Talking Avatar · toolbar sheet (KP-107), Audio toolbar first layer · both · Section 「Entry › Editor › Audio toolbar › Talking Avatar」, rows TC-232 – TC-236
- AI Art · Launcher › AI Magic tab › AI Art; My Artwork · both · **primary**, rows TC-046 – TC-048, TC-115 (existing)
- AI Art · Editor › Global toolbar › AI Magic › AI Art · toolbar sheet (KP-107), Global › AI Magic · both · Section 「Entry › Editor › Global toolbar › AI Magic › AI Art」, rows TC-237 – TC-241
- Text to Image · Launcher › AI Magic tab › Text to Image; My Artwork · both · **primary**, rows TC-009 – TC-011, TC-049 – TC-053, TC-116, TC-119 (existing)
- Text to Image · Editor › Global toolbar › AI Magic › Text to Image · toolbar sheet (KP-107), Global › AI Magic · both · Section 「Entry › Editor › Global toolbar › AI Magic › Text to Image」, rows TC-242 – TC-246
- Text to Image · Editor › Photo toolbar › Tools › Text to Image · toolbar sheet (KP-107), Photo › Tools · both · Section 「Entry › Editor › Photo toolbar › Tools › Text to Image」, rows TC-247 – TC-251
- Text to Image · Editor › PIP Photo toolbar › Tools › AI Text to Image · toolbar sheet (KP-107), PIP Photo › Tools 「AI Text to Image」 · both · Section 「Entry › Editor › PIP Photo toolbar › Tools › AI Text to Image」, rows TC-252 – TC-256
- AI Text to Speech · Editor › Global toolbar › Audio › Text to speech (the path Android R3 used; pinned in the first row) · both · **primary**, rows TC-063 – TC-065, TC-078, TC-079, TC-125, TC-154 (existing)
- AI Text to Speech · Editor › Global toolbar › Text › Text to Speech · toolbar sheet (KP-107), Global › Text · both · Section 「Entry › Editor › Global toolbar › Text › Text to Speech」, rows TC-267 – TC-271
- AI Text to Speech · Editor › Global toolbar › AI Magic › Text to Speech · toolbar sheet (KP-107), Global › AI Magic · both · Section 「Entry › Editor › Global toolbar › AI Magic › Text to Speech」, rows TC-272 – TC-276
- AI Text to Speech · Editor › Text toolbar › Text to Speech · toolbar sheet (KP-107), Text toolbar first layer · both · Section 「Entry › Editor › Text toolbar › Text to Speech」, rows TC-277 – TC-281
- AI Voice Changer · Editor › Video toolbar › Audio Tools › AI Voice Changer (pinned in the first row) · both · **primary**, rows TC-066 – TC-068, TC-124 (existing)
- AI Voice Changer · Editor › Global toolbar › Audio › AI Voice Changer · toolbar sheet (KP-107), Global › Audio · both · Section 「Entry › Editor › Global toolbar › Audio › AI Voice Changer」, rows TC-282 – TC-286
- AI Voice Changer · Editor › PIP Video toolbar › Audio Tools › AI Voice Changer · toolbar sheet (KP-107), PIP Video › Audio Tools · both · Section 「Entry › Editor › PIP Video toolbar › Audio Tools › AI Voice Changer」, rows TC-287 – TC-291
- AI Voice Changer · Editor › Audio toolbar › Audio Tools › AI Voice Changer · toolbar sheet (KP-107), Audio › Audio Tools · both · Section 「Entry › Editor › Audio toolbar › Audio Tools › AI Voice Changer」, rows TC-292 – TC-296
- AI Anime (timeline) · Editor › Video toolbar › Effects › AI Anime Video (the path Android R3 used; pinned in the first row) · both · **primary**, rows TC-069 – TC-071, TC-121 (existing)
- AI Cartoon (timeline) · Editor › Photo toolbar › Portrait › AI Style Transfer › AI Cartoon (pinned in the first row) · both · **primary**, rows TC-072 – TC-074, TC-122 (existing)
- AI Cartoon · Launcher › AI Magic tab › AI Cartoon · Android R3 TC-073 (AI Cartoon only in the Launcher's AI Magic on 2611193; Q-11) · both (known on one platform: presence recorded, Q-22) · Section 「Entry › Launcher › AI Magic tab › AI Cartoon」, rows TC-257 – TC-261
- AI Cartoon · Editor › PIP Photo toolbar › Portrait › AI Style Transfer › AI Cartoon · toolbar sheet (KP-107), PIP Photo › Portrait 「AI Style Transfer」 · both · Section 「Entry › Editor › PIP Photo toolbar › Portrait › AI Style Transfer › AI Cartoon」, rows TC-297 – TC-301
- AI Sketch (timeline) · Editor › Photo toolbar › Portrait › AI Style Transfer › AI Sketch (pinned in the first row) · both · **primary**, rows TC-075 – TC-077, TC-123 (existing)
- AI Sketch · Launcher › AI Magic tab › AI Sketch · Android R3 TC-076 (AI Sketch only in the Launcher's AI Magic on 2611193; Q-11) · both (known on one platform: presence recorded, Q-22) · Section 「Entry › Launcher › AI Magic tab › AI Sketch」, rows TC-262 – TC-266
- AI Sketch · Editor › PIP Photo toolbar › Portrait › AI Style Transfer › AI Sketch · toolbar sheet (KP-107), PIP Photo › Portrait 「AI Style Transfer」 · both · Section 「Entry › Editor › PIP Photo toolbar › Portrait › AI Style Transfer › AI Sketch」, rows TC-302 – TC-306
- AI Music Generator · Launcher › AI Magic tab › AI Music Generator (the path the Android runs used) · both · **primary**, rows TC-014, TC-054 – TC-062, TC-117, TC-118, TC-126 (existing)
- AI Music Generator · Editor › Global toolbar › Audio › AI Music Generator · toolbar sheet (KP-107), Global › Audio · both · Section 「Entry › Editor › Global toolbar › Audio › AI Music Generator」, rows TC-307 – TC-312
- AI Music Generator · Editor › Global toolbar › AI Magic › AI Music Generator · toolbar sheet (KP-107), Global › AI Magic · both · Section 「Entry › Editor › Global toolbar › AI Magic › AI Music Generator」, rows TC-313 – TC-318
- AI Music Generator · Editor › Global toolbar › Audio › Music › AI Music Generator · KP-097 (Add Music › AI Music Generator › My AI Music, Android) · both (known on one platform: presence recorded, Q-22) · Section 「Entry › Editor › Global toolbar › Audio › Music › AI Music Generator」, rows TC-319 – TC-324
- My Artwork results · ☰ Menu › My Artwork · Design d-aigc-settings, KP-020 · both · Section 「Entry › ☰ Menu › My Artwork」, rows TC-325 – TC-327
- My Artwork results · Mine › My Artwork · KP-029, KP-032 · both · Section 「Entry › Mine › My Artwork」, rows TC-328 – TC-330
- Results of a task started in the editor · Editor completion banner › 「View」 · KP-055 (iOS) · both (presence recorded, Q-22) · Section 「Entry › Editor completion banner › View」, rows TC-331 – TC-333
- Launcher shortcuts, 「AI-Powered Creation」, the AI Magic tab list, 「You might also like」 · CMS-set (KP-012) · both · Section 「Entry › Launcher, AI Magic tab and other entries」, row TC-156 (inventory)
- MUI rows are not copied per entry (pass 12 brief): the strings are the same dialogs and sheet wherever they open.

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
| REQ-014 (table: every Open question still open gets an observing row, 2026-11-25) | R-030, R-046 (TC-126); R-042 (TC-082, TC-155); R-053 (TC-154); Q-8, Q-13, Q-14, Q-16, Q-19, Q-11, Q-17 |
| REQ-015 (table: every entry point, full table from the primary entry and a UI pass from each other one, 2026-11-26) | R-059 – R-065; ### Entry points; TC-063, TC-066, TC-069, TC-072, TC-075 pinned to their primary entry |
