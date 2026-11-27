# Update plan — Cinematic Reel Creator Photo Tips / android: approved v4 → draft 20261126-111221

Based on approved v4 (79 rows). Same spec set (specs/2026-11-25); the change comes from the request ledger
[REQ-010] (user, 2026-11-26: 「for any features that have multiple entry points, each entry needs to be tested completely and cannot assume they both lead to the same thing and have the same behavior」), as narrowed the same day: Rule changed by the user the same day (2026-11-26): 「for each entry, it should only check the UI, so click everything once and make sure there's no errors for each button and options」: the primary entry keeps the full table, every other entry gets a UI pass
(analysis.md pass 12). A reel is generated through every entry (user ruling 2026-11-26 「Yes, generate per entry」).

## Spec files
- Unchanged: spec set specs/2026-11-25. New or changed: none. No longer supplied: none.
- Also read: the toolbar sheet's newest tab 「2026/11 Auto Reframe」 (`node scripts/entry-points.ts pdr "Cinematic Reel"`, KP-107):
  Global Toolbar › AI Magic, Photo Toolbar › Effects, PIP Photo Toolbar › Effects, each 「7/E」, no platform note.
- The generation steps follow the Design arrows and the exploration notes (knowledge/sources/2026-11-03-pdri-exploration-kb/cinematic-reel-creator.md).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-037 | new | the Launcher entry was only a precondition | primary entry: landing, ‹ and system Back, a reel generated (TC-080 – TC-083) |
| R-038 – R-041 | new | — | one UI pass per entry, four rows each, Generate once |
| Q-8, Q-9 | new | — | the Photo and PIP Photo entries: which photo the generation takes and where the reel lands |
| Q-6, Q-7 | dropped | per-entry 「the same as the Launcher?」 questions for the AI Magic tab and the Global Toolbar | their rows assert the Launcher behaviour; a missing entry is raised at the phase wrap-up (pass 12; user, 2026-11-26 「yes, trim them」) |
| Q-10 | new | — | ‹ and system Back during and after a generation: TC-082, TC-083 and each entry's exits row |

## Case changes
- New (20), numbered in table order:
  - TC-080 (R-037), first in 「View photo tips chip」: Launcher landing and ‹ and system Back.
  - TC-081 – TC-083 (R-037), right after it: a reel generated and charged, leaving during a generation (Q-10), the finished reel and the way out.
  - TC-084 – TC-087 (R-038), Section 「Entry › AI Magic tab › Cinematic Reel Creator」 before MUI: TC-084 presence and landing (an absent entry is a Fail (question) and Blocks the Section), TC-085 every template page and photo tips control once, TC-086 Add Media and the photo the preview reads, TC-087 Generate once (charge, leave during it, where the reel lands) and every exit.
  - TC-088 – TC-091 (R-039), Section 「Entry › Editor › Global Toolbar › AI Magic › Cinematic Reel Creator」 before MUI: TC-088 presence and landing (an absent entry is a Fail (question) and Blocks the Section), TC-089 every template page and photo tips control once, TC-090 Add Media and the photo the preview reads, TC-091 Generate once (charge, leave during it, where the reel lands) and every exit.
  - TC-092 – TC-095 (R-040), Section 「Entry › Editor › Photo Toolbar › Effects › Cinematic Reel Creator」 before MUI: TC-092 presence and landing (an absent entry is a Fail (question) and Blocks the Section), TC-093 every template page and photo tips control once, TC-094 Add Media and the photo the preview reads, TC-095 Generate once (charge, leave during it, where the reel lands) and every exit.
  - TC-096 – TC-099 (R-041), Section 「Entry › Editor › PIP Photo Toolbar › Effects › Cinematic Reel Creator」 before MUI: TC-096 presence and landing (an absent entry is a Fail (question) and Blocks the Section), TC-097 every template page and photo tips control once, TC-098 Add Media and the photo the preview reads, TC-099 Generate once (charge, leave during it, where the reel lands) and every exit.
- Modified (0)
- Removed (0)
- Unchanged: 79

## Found by the analysis
- Pass 12 entries: the Launcher (primary, Design), the AI Magic tab (KP-012, KP-013), and Global Toolbar › AI Magic,
  Photo Toolbar › Effects, PIP Photo Toolbar › Effects (toolbar sheet, KP-107). No platform limit in the sheet.
- Every approved row reaches the feature from the Launcher; none from any other entry.
- UI pass checklist: the controls of the primary rows (chip on each card, the sheet, the Avoid row, dimmed area and swipe
  down, 「Got it」, system Back, 「Import a Photo」, the Add Media 「?」), plus the header 「?」 and history, Add Media's
  tabs and ‹, the preview's ‹ and 「Generate」 (control-trace.json lists the new rows on the chip, 「Got it」 and 「Import a Photo」).
- The input each editor entry may bring is a photo: the preview row checks the photo shown is the one taken, as it is.

## Not added (value check)
- Copies of the primary rows per entry (each template's item list, Fast Cut's picture, the EN pictures, the Q-3 gestures
  as their own rows, offline, the CMS log, Language and MUI): the UI pass rule (user, 2026-11-26) keeps them with the primary entry.
- A separate leave-during-generation row per entry: folded into each entry's Generate-and-exits row.
- Tier and paywall per entry: the photo tips charge nothing (KP-007 n/a); Generate reads the price and the charge.

## How the rows run
- Each entry's Section is its own segment (pass 12). The editor Sections need a project with one photo on the main
  track and one on an overlay track, and a gallery photo not in it (fixtures.md).
- Credits: one Micro Cinema generation per non-primary entry (a second only if leaving cancelled the first) and two for
  the Launcher: six per platform, up to ten (user ruling 2026-11-26, AGENTS.md › Credits).
- Run each Section's Generate row early and its control rows while the reel is generated.
- phases.json is carried over unchanged from draft 20261125-190000 (only the MUI phase); the run plan of the next full run lists
  the four entry Sections as segments.

## Questions for PM
- Q-8 From Photo Toolbar › Effects, is the selected main-track photo brought in, and does the reel replace it?
- Q-9 From PIP Photo Toolbar › Effects, is the selected overlay photo brought in, and where does the reel go?
- Q-10 What should ‹ and system Back do while a reel is generated, and where do they lead from the result page?

## Questions for you
- None.
