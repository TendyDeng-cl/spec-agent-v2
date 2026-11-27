# Entry points

## KF-022 Every other entry reads the clip's own values
- kind: fact · platform: android · use: analysis, run · tags: entry, fps, timeline, pip
- source: Video Enhance Android run 2026-11-26-r4-full O-26, O-28 (TC-352 – TC-370) · verified: 16.9.0 build 2611251 (2026-11-27)

On 2611251 the panel opened from AI Magic, the main-track clip toolbar and the PIP Video toolbar (「Enhance」 › 「AI Video
Enhance」) reads the clip's own fps (24 / 30 / 60 / 120), resolution (720p / 1080p) and length, and a trimmed timeline
clip opens with its own in / out points. A long video opened as fast from the timeline as from Add Media (frame
~0.25–0.5 s, strip ~0.5–1.0 s after the panel). An overlay added where one already sits goes onto a second overlay track.
