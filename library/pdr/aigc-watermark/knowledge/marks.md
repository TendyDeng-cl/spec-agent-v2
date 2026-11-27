# Marks, badges and dialogs

## KF-004 The 「AI」 badge on previews is an overlay view
- kind: fact · platform: android · use: analysis, run · tags: badge, preview, player
- source: AIGC Watermark Android run 2026-11-17-r1-full O-11, O-15; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-4, O-8 · verified: 16.9.0 build 2611193 (2026-11-23)

The 「AI」 badge on a result's still preview and full-screen player is a view of its own (`aigc_badge_overlay`), not
part of the file. The full-screen player draws it over the first 2 s. With the switch Off the video result pages' still
preview draws it (Image to Video, Character Motion Swap, Cinematic Reel on 2611193; 2611161 drew none on Motion Swap);
Text to Image and AI Art result pages draw none. With the switch On the still preview draws none.

## KF-005 When the export 「AIGC Watermark」 dialog appears
- kind: fact · platform: android · use: analysis, run · tags: export, dialog, produce
- source: AIGC Watermark Android run 2026-11-17-r1-full O-23, O-24; AIGC Watermark Android run 2026-11-23-r2-changed O-12, O-19; corrected by AIGC Watermark Android run 2026-11-23-r3-full O-8, TC-065, TC-071, TC-084; AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-018) · verified: 16.9.0 build 2611251 (2026-11-26)

With the switch Off the dialog appears at the editor's 「Export」, over the dimmed editor, before the Produce sheet
(2611193; on 2611161 it came only after 「Produce」 on the sheet). Its 「Export」 opens the Produce sheet, 「Cancel」
returns to the editor. Seen for Text to Speech and AI Anime Video projects. It does not appear for an AI Music
Generator song, a Voice Changer 「Effect」 voice (Off and On exports identical) or a non-AI project: those are not
treated as AI content on export. A Professional AI Voice Changer voice is: the dialog, the AI label and one
CyberLink manifest (2611251). AI Storytelling's own 「Export」 shows the same dialog (「Your exported file will
include an AIGC watermark. To remove the watermark, go to Menu > Settings.」, 「Don't show again」, Cancel, Export).

## KF-006 Automatic gallery copies follow the switch when they are written
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, switch
- source: AIGC Watermark Android run 2026-11-17-r1-full O-13; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-5; AIGC Watermark Android run 2026-11-23-r3-full O-1, O-4; AIGC Watermark Android run 2026-11-26-r4-changed O-2, O-5 · verified: 16.9.0 build 2611201 (2026-11-26)

A tool that saves its result by itself (KP-079) labels that copy by the switch state when it writes it: Off gives the
label (Video Edit by Chat, Talking Avatar, AI Anime Video at task finish, also when started from the editor; Text to
Image's 「Add to Timeline」 copy), On none (AI Anime Video). The editor clip from 「Add to Timeline」 or Image to Video's
「Full Editor」 is a separate, unlabelled file: the export adds the label. Set the switch before the task finishes.

