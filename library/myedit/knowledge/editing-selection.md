# Editing and selection

## KP-018 Click selects the object hit
- kind: rule · platform: web · tags: selection, timeline, canvas · authority: team
- source: contract-runner domain myedit/categories/04_編輯與選取一致性.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-04-1

Where selectable objects (scenes, clips, layers, subtitles, timeline items) overlap, a click selects the object
under the click point; selection never jumps to another overlapping object.

## KP-019 Selecting moves the playhead to its start
- kind: rule · platform: web · tags: selection, playhead, timeline · authority: team
- source: contract-runner domain myedit/categories/04_編輯與選取一致性.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-04-2

Where a selected scene or timeline object is linked to the preview playhead, changing the selection moves the
playhead and preview to that item's start.

## KP-020 Every view shows the latest value
- kind: rule · platform: web · tags: editing, sync · authority: team
- source: contract-runner domain myedit/categories/04_編輯與選取一致性.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-04-3

An object shown in several views (canvas, properties panel, list, timeline) shows the same latest position,
duration and content in all of them once an edit is applied.

## KP-021 Long text wraps in its box
- kind: rule · platform: web · tags: text, editing, layout · authority: team
- source: contract-runner domain myedit/categories/04_編輯與選取一致性.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-04-4

Long text or text with explicit line breaks, edited or previewed on a canvas or result, stays visible and wraps
inside its text area; unrelated text objects do not move.

## KP-022 Generated project stays editable in another editor
- kind: rule · platform: web · tags: project, editor · authority: team
- source: contract-runner domain myedit/categories/04_編輯與選取一致性.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-04-5

A generated project opened in another editor loads with its media tracks still editable, keeping their identity,
names and relative order.

## KP-023 Timeline click jumps; trim range stops playback
- kind: rule · platform: web · tags: timeline, trimmer, playback · authority: team
- source: contract-runner domain myedit/categories/04_編輯與選取一致性.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-04-6

Clicking the timeline during playback jumps the playhead and preview there and plays on from that point; playback
started inside a trim range stops at the chosen end point. User confirmed product-wide (2026-11-17).
