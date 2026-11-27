# Automated tests (AT-PDRA)

## KP-138 AT suite folders are not casebook features by name
- kind: fact · platform: android · use: analysis, run · tags: at, regression, reportportal
- source: user, 2026-11-27 (Dashboard AT tab); ReportPortal pdra launch SFT #323 · authority: user

PowerDirector Android's automated suite (Jenkins `PDR_Android_SFT`, ReportPortal project pdra, launch 「SFT」) groups
its tests in top-level folders: 1_import, 2_timeline_editing, ai_anime_video, ai_art, ai_sketch, ai_video_upscaler,
hq_denoise, image_to_video, music_room, sticker, talking_avatar, text_to_image, text_to_video, vip_benefits, bft.
A folder is linked to a casebook table only when that table's tests were put there; a similar name is no match:
`ai_video_upscaler` is AI Video Upscaler, a different feature from AI Video Enhance (`pdr/video-enhance`).
