# Update plan — AIGC Watermark / ios: approved v5 → draft 20261126-111601

Based on approved v5 (153 rows). Same spec set; the change comes from the request ledger [REQ-015]
(user, 2026-11-26: 「for any features that have multiple entry points, each entry needs to be tested completely and cannot assume they both lead to the same thing and have the same behavior」; narrowed the same day: 「for each entry, it should only check the UI, so click everything once
and make sure there's no errors for each button and options」). The primary entry keeps the full table; every other entry of
every tool gets a UI pass (analysis.md pass 12). AIGC Watermark covers the results of many AI tools, so its entry points are
those tools' entries.

## Spec files
- Unchanged: spec set specs/2026-11-17. New or changed: none. No longer supplied: none.
- New input: the product team's toolbar sheet, tab 「2026/11 Auto Reframe」 (KP-107, `node scripts/entry-points.ts pdr "<tool>"`).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-059 – R-065 | new section 「Entry points (pass 12)」 | — | landing, where the result lands, exits, sheet places present, CMS inventory, input values, every control once |
| Q-22 | new | — | places the sheet lists that the build may lack (entry rows assert the primary behaviour with no question, pass 12) |
| ### Entry points | new | — | every tool × entry with its source and Section |
| Exit × stage | 2 lines | — | tool page / music dialog opened from a non-primary entry |

## Case changes
- New (178): TC-156 – TC-333, in 37 new Sections 「Entry › …」, placed after TC-154 and before the one-way rows
  (TC-126, TC-127). Per tool / entry group:
  - Launcher, AI Magic tab and other entries: 1
  - Video Edit by Chat: 20
  - Image to Video: 10
  - Cinematic Reel Creator: 15
  - Video Object Removal: 10
  - Text to Video: 5
  - AI Anime Video: 10
  - Talking Avatar: 10
  - AI Art: 5
  - Text to Image: 15
  - AI Cartoon: 5
  - AI Sketch: 5
  - AI Text to Speech (timeline): 15
  - AI Voice Changer (timeline): 15
  - AI Cartoon (timeline): 5
  - AI Sketch (timeline): 5
  - AI Music Generator: 18
  - ☰ Menu › My Artwork: 3
  - Mine › My Artwork: 3
  - Editor completion banner › View: 3
- Modified (5): TC-063, TC-066, TC-069, TC-072, TC-075 — the precondition names the primary entry of AI Text to Speech, Voice Changer, AI Anime,
  AI Cartoon and AI Sketch (it said only 「added from the editor」), so the existing rows count for that entry.
- Removed (0)
- Unchanged: 148

## Found by the analysis
- Entry points (pass 12): 33 non-primary tool entries + 3 result-page entries + 1 CMS inventory row.
  Tools with no other known entry: Character Motion Swap, AI Storytelling (not in the toolbar sheet).
- UI pass per tool entry (5 rows): landing and what it brings in · the values read from the input (fps, length, resolution, aspect, text;
  Video Enhance read the wrong fps from a timeline clip) · every control and option once, no combinations · the main action once (credits,
  where the result lands, the watermark on it, Content Credentials) · the back control. AI Music Generator adds the dialog's 「Cancel」.
  My Artwork entries: landing, every control once, Save once; the completion banner: landing, Save once, 「Close」.
- Checklist for the controls rows: the controls the primary entry's rows press (named in each row's Notes).
- AI Anime Video from the Video toolbar's Effects: its timeline part is the existing TC-069 – TC-071 (pinned).
- Pass 9 order: the timeline main actions (they open the export dialog) run before TC-127; the music main actions before TC-126.

## Not added (value check)
- Per entry: Save / export with the switch On, Share, limits, failures, tiers, combinations, MUI and one-way states (the 「Don’t show again」 rows):
  they stay with the primary entry (pass 12). An earlier version of this draft (same day) copied the whole flow per entry; replaced by the UI pass.
- Launcher small shortcut tiles per tool: CMS-set and unknown before the run; TC-156 inventories them and the next draft adds a Section
  for each one found.

## How the rows run
- The run plan counts each 「Entry ›」 Section as its own segment (pass 12); phases.json marks the main-action rows `credits`.
- Editor entries need the project of each Section's precondition (fixtures.md): a main-track video, a PIP video, a main-track photo, a PIP photo,
  an audio clip with speech, a title.

## Questions for PM
- Q-22 Are the sheet's places all in this release (release notes 「7/E」, 「8/M」, 「4/E IOS」; 「AI Remove」 = Video Object Removal?; AI Style Transfer in the editor)?

## Questions for you
- None.
