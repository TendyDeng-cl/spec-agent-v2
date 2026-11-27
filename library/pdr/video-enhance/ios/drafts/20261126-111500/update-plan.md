# Update plan — Video Enhance / ios: approved v10 → draft 20261126-111500

Based on approved v10 (236 rows). Same spec set (2026-11-03, Figma only); the change is a new standing
rule from the user [REQ-046], first 「for any features that have multiple entry points, each entry needs to be tested
completely and cannot assume they both lead to the same thing and have the same behavior」, then, the same day, narrowed
for the other entries: 「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options (eg. currently there's a problem with getting fps value from timeline imported video in video enhance)」 (analysis.md pass 12). This draft was first built with a full-flow copy of every row per
entry (548 iOS / 579 Android rows); it is rebuilt in place as a UI pass per entry, and those copies are gone.
Then REQ-047 (user, 2026-11-26): 「when a long video is imported, it needs a little bit of time to produce the thumbnail on the playhead, while if the page is opened from timeline, it is immediately shown」: one timing row per entry, the primary one included.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.
- New input: the product team's toolbar sheet (KP-107, tab 「2026/11 Auto Reframe」, fetched 2026-11-26): Video Enhance under
  Video Toolbar › Enhance and PIP Video Toolbar › Enhance, no platform bracket.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-210 | new | — | The AI Magic entry: every control responds as from the Launcher; its Demo ‹ returns to the AI Magic tab |
| R-211 | new | — | The main-track clip toolbar entry: panel with the clip, every control as from the Launcher, result replaces the clip |
| R-212 | new | — | The PIP Video toolbar has Enhance › Video Enhance acting on the overlay clip (sheet only, Q-29) |
| R-213 | new | — | An overlay clip's result replaces it on its own track; the main track is unchanged (assumption, Q-30) |
| R-215 | new | — | A long video's playhead thumbnail and strip show as quickly from Add Media as from the editor; the frame follows a drag right after opening (REQ-047, Q-34) |
| R-214 | new | — | The panel's fps, resolution, length and price come from the input itself on every entry; timeline clips checked at 24 / 30 / 60 / 120 fps (user: the fps read from a timeline-imported video is a known problem) |
| Q-29, Q-30, Q-33 | new questions | — | PIP entry presence; overlay result landing; the timeline clip's trimmed range (the first build's Q-31 and Q-32 dropped: entry rows assert the primary behaviour, pass 12) |
| `### Entry points` | new | — | One line per entry with its source, platforms and Section |

## Case changes
- New (23): 22 in three Sections after the approved Sections and before MUI:
- 「Entry › AI Magic tab › AI Enhance › AI Video Enhance」 (6):
  - TC-352: landing: Demo page, Add Media and their ‹
  - TC-372: time to the playhead's thumbnail and the strip on a long video, and the playhead drag right after (REQ-047, Q-34)
  - TC-353: every value read from the input: 24 / 30 / 60 / 120 fps, 720p and 1080p, length, Selected Length, price (R-214)
  - TC-354: every ⓘ and every Mode, style, fps and Resolution value once
  - TC-355: both handles, the playhead, play / pause, full screen, credit pill, Recent task, 「Manage」
  - TC-356: Enhance once: Cancel › Leave, Cancel › Keep Uploading, where the result lands, every Result control
  - TC-357: every exit, ⌂
- 「Entry › Editor › main-track video › Enhance › Video Enhance」 (6):
  - TC-358: every value read from the input: 24 / 30 / 60 / 120 fps, 720p and 1080p, length, Selected Length, price (R-214)
  - TC-373: time to the playhead's thumbnail and the strip on a long video, and the playhead drag right after (REQ-047, Q-34)
  - TC-359: a clip trimmed on the timeline (Q-33)
  - TC-360: every ⓘ and every Mode, style, fps and Resolution value once
  - TC-361: both handles, the playhead, play / pause, full screen, credit pill, Recent task, 「Manage」
  - TC-362: Enhance once: Cancel › Leave, Cancel › Keep Uploading, where the result lands, every Result control
  - TC-363: every exit, ⌂
- 「Entry › Editor › PIP video › Enhance › Video Enhance」 (7):
  - TC-364: presence of the tool on the PIP Video toolbar and its landing (Q-29)
  - TC-374: time to the playhead's thumbnail and the strip on a long video, and the playhead drag right after (REQ-047, Q-34)
  - TC-365: every value read from the input: 24 / 30 / 60 / 120 fps, 720p and 1080p, length, Selected Length, price (R-214)
  - TC-366: a clip trimmed on the timeline (Q-33)
  - TC-367: every ⓘ and every Mode, style, fps and Resolution value once
  - TC-368: both handles, the playhead, play / pause, full screen, credit pill, Recent task, 「Manage」
  - TC-369: Enhance once: Cancel › Leave, Cancel › Keep Uploading, where the result lands, every Result control
  - TC-370: every exit, ⌂
- 「Add Media」 (primary entry, 1), right after TC-020: TC-371: time to the playhead's thumbnail and the strip on a long video, and the playhead drag right after (REQ-047, Q-34)
- Modified (0) · Removed (0) · Unchanged: 236

## Found by the analysis
- Pass 12: four entries; the PIP entry is only in the toolbar sheet (Q-29). Checklist for the UI pass: the panel,
  Recent task and Result controls of control-trace.json and the controls the primary rows press (named in each row's Notes).
- Pass 9 order: the AI Magic landing row, TC-003 and TC-364 need the Demo page still on: run them before TC-014.

## Not added (value check)
- Full-flow copies of the primary rows per entry (the first build of this draft): replaced by the UI pass (user, 2026-11-26).
  Combinations, limits, failures, tiers, MUI and one-way states stay with the primary entry (pass 12).

## PM-only rows
- TC-364 and the PIP Section rest on the toolbar sheet (no spec frame); the editor Enhance rows' paste-back is PM-only (R-131, Q-11).

## Questions for PM
- Q-29 Is Video Enhance meant to be on the PIP Video toolbar (sheet) though no spec draws it? TC-364.
- Q-30 Where does an overlay clip's result land? TC-369.
- Q-33 Does the panel take a timeline clip's trimmed part or the whole source? TC-359, TC-366.
- Q-34 Should the playhead's thumbnail show at once from every entry, and is a loading state expected meanwhile? TC-371, TC-372, TC-373, TC-374.

## Questions for you
- None. Run cost: 23 rows, three Enhance rows of 8 credits each.
