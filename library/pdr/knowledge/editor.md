# Timeline editor

## KP-050 Editor controls
- kind: fact · platform: ios · use: analysis, run · tags: editor, layout
- source: exploration KB video-editor-core.md (blind sweep 2026-08-26, 16.7.0 build 188155)

Header: ⌂ · undo · redo · ⋯ · Export, plus a trash icon while a clip is selected. Root toolbar: Audio · Text · Overlay
· Effects · Sticker · AI Magic · Aspect Ratio · more. Clip toolbar: Split · Video Edit by Chat · Volume · Audio Tool ·
Quick Actions · Object Removal · Speed · more. Aspect Ratio offers 16:9 / 9:16 / 1:1 / 21:9 / 4:5, set to the
project's ratio.

## KP-051 Leaving the editor saves silently
- kind: rule · platform: ios · use: analysis, run · tags: editor, project, save · authority: observed
- source: exploration KB video-editor-core.md (comprehensive run 2026-07-17, build unknown, VIP); exploration KB video-editor-core.md (blind sweep 2026-08-26, 16.7.0 build 188155)

Leaving with ⌂ saves the project without a prompt; it reopens from the Project tab (ratio, duration, size shown) with
every edit, filters included. A demo project from Mine › Demo Videos is the exception (KP-033).

## KP-052 Export options; export costs no credits
- kind: fact · platform: ios · use: analysis, run · tags: editor, export, credits
- source: exploration KB video-editor-core.md (comprehensive run 2026-07-17, build unknown, VIP)

Export offers Resolution 360p / 720p / 1080p / 4K, Bitrate Smaller / Standard / Better, Frame Rate 24 / 25 / 30 / 50 /
60 and a live size estimate, then a share screen (Shorts, YouTube, TikTok, IG Reels, Instagram, Upload to My Cloud).
Non-AI editing and export spend no credits.

## KP-053 Editor edge cases seen
- kind: quirk · platform: ios · use: analysis, run · tags: editor, timeline
- source: exploration KB video-editor-core.md (comprehensive run 2026-07-17, build unknown, VIP)

Split exactly on a clip boundary is a silent no-op (ISS-01). A text object near the end of the timeline extends the
project's duration (0:08 → 0:10) and deleting it reverts (ISS-06, intent unconfirmed). Undo reverts a transition to
the empty marker.

## KP-054 Project thumbnails and empty projects
- kind: risk · platform: ios · use: analysis, run · tags: project, thumbnail
- source: exploration KB video-editor-core.md (blind sweep 2026-08-26, 16.7.0 build 188155)

The project list can show a broken-media placeholder (film icon and 「?」) for a valid project (ISS-PRJ-01). Unconfirmed:
a 0:00 project opened into an empty editor and then vanished from the list, as if 0-duration projects are cleaned up.
Check project lists after AI results and empty projects.

## KP-075 The full-screen hint covers the first Play of each project
- kind: quirk · platform: android · use: run · tags: editor, preview, hint
- source: AIGC Watermark Android run 2026-11-17-r1-full O-26; AIGC Watermark Android run 2026-11-23-r2-changed TC-060 · verified: 16.9.0 build 2611231 (2026-11-24)

Every time a project opens, its first Play shows 「Double tap on preview to watch your video at full screen.」 while
playback runs behind it. Close it with X (「Don't show again」 left unticked), seek to 0:00 and play again before
judging the preview.

## KP-076 AI Anime Video from the editor is slow and adds a clip
- kind: fact · platform: android · use: analysis, run · tags: editor, ai-anime-video, timeline
- source: AIGC Watermark Android run 2026-11-17-r1-full O-25 · verified: 16.9.0 build 2611161 (2026-11-17)

AI Anime Video started from the editor (Vivid 10 s) took about 22 minutes (「17 minutes left…」); 「Add to Timeline」
puts the result after the source clip, not in its place. Start it early in a segment.

## KP-077 AI Style Transfer turns portrait photos sideways
- kind: risk · platform: android · use: analysis, run, ebug · tags: editor, style-transfer, orientation
- source: AIGC Watermark Android run 2026-11-17-r1-full O-22 (not filed yet) · verified: 16.9.0 build 2611161 (2026-11-17)

AI Cartoon (Elf) and AI Sketch (Oil Painting) on an upright portrait photo (DSC_0047.JPG) return the image turned 90°
in the preview and the export; likely EXIF orientation. Use portrait photos with EXIF rotation when testing them.

## KP-112 AI tools started from the editor leave the timeline alone
- kind: fact · platform: android · use: analysis, run · tags: editor, entry-point, timeline, ai-task
- source: AIGC Watermark Android run 2026-11-26-e1-entries O-12 (inbox I-007, I-011, I-014); Recent Task Model Info Android run 2026-11-26-r1-full O-13 (inbox I-029) · verified: 16.9.0 build 2611251 (2026-11-26)

From the editor, Generate in AI Anime Video, Talking Avatar, AI Art, Text to Image, Cinematic Reel Creator or Video
Edit by Chat goes to the tool's task list or result; results land there and in My Artwork, and Back returns to the
unchanged editor (only a result's 「Add to Timeline」 adds a clip, KP-076). Cinematic Reel Creator and Video Edit by
Chat never take the selected clip; AI Anime Video from a clip's Effects goes straight to trimming that clip, Talking
Avatar from an audio clip takes it as the voice. Leaving Text to Image clears the clip selection (RTMI Q-10).
Editor ⋯ › My Artwork › a result, then system Back ×3, lands on the Launcher, not the editor.

## KP-113 AI Style Transfer on 2611251
- kind: fact · platform: android · use: analysis, run · tags: editor, style-transfer, ai-cartoon, ai-sketch, tier, credits
- source: AIGC Watermark Android run 2026-11-26-e1-entries O-11, O-14 (inbox I-015, I-020) · verified: 16.9.0 build 2611251 (2026-11-26)

Photo / PIP Photo › Portrait › 「AI Style Transfer」 is back (2611193 had none): tabs Favorites | AI Anime (Custom =
description box) / AI Cartoon / AI Sketch ⓘ / Tempo Effects, opening on AI Anime. No price, no charge (Pro); a result
replaces the photo in place and Undo restores it. Launcher › AI Magic › AI Cartoon / AI Sketch: intro › Try It Now ›
Add Media, then a new project 「AI Cartoon <MM-DD>」 (「…(1)」 next) opens on that panel; results are not in My Artwork.
On Free one Pro style previewed with 「Pro Only / Upgrade Now」, then even free styles opened 「Upgrade to Pro」.
