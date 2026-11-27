# Update plan — Cinematic Reel Creator Photo Tips / ios: approved v2 → draft 20261125-190000

Based on approved v2 (45 rows). Same spec set; the change comes from the request ledger [REQ-009]
(user, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases already?」): every Open question that is still open gets a row that takes the app to
the point in question, so the next run reaches it (analysis.md, 「Every Open question gets an observing row」).

## Spec files
- Unchanged: spec set specs/2026-11-23. New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-3 | gets a row | only 「Got it」 checked; the dimmed area and the swipe down had no row | TC-046 does both and records them as Fail (question) for PM |
| Q-4 | gets rows | 「no row until PM answers」 | TC-047, TC-048 record the feature offline; the no-recommend_samples half has no row (QA cannot set it up) |
| Hidden clauses | 2 lines added | — | R-014 (TC-047, TC-048), R-010 (TC-046) |

No R- requirement changes.

## Case changes
- New (3):
  - TC-046 (R-010), right after TC-007: tap the dimmed template page, then swipe the sheet down; records whether each
    closes the sheet; nothing behind the dim may react.
  - TC-047 (R-014, R-001, R-012), right after TC-019: the app force-stopped, network off, launch, open Cinematic Reel
    Creator; records the template page, the chips and the sheet; back online the Micro Cinema sheet is complete.
  - TC-048 (R-014, R-012), right after TC-047: one sheet loaded online, network off, the same sheet and a new one
    (Time Lapse) opened; back online the Time Lapse sheet is complete.
- Modified (0)
- Removed (0)
- Unchanged: 45

## Found by the analysis
- Open questions against the rows (no iOS run yet, so every question is open):
  Q-1 (TC-010 – TC-016), Q-2 (the Language rows) and Q-5 (TC-008) already name rows that reach their point.
- Q-3 and Q-4 cited requirements that have rows, but no row made the gesture or cut the network.
- Controls (pass 11): the chip and 「Got it」 are also pressed by the new rows (control-trace.json).

## Not added (value check)
- A template with no recommend_samples (Q-4): QA cannot empty the CMS, so no row can show it.
- The two gestures on a sheet opened from Add Media: there is no 「?」 in Add Media (Q-1); they follow once it exists.
- An offline row per template or per language: the offline behaviour is one question; one cold and one warm row reach it.

## How the rows run
- TC-047 and TC-048 turn Wi-Fi off and back on (AGENTS.md 「On the phone」: only with the phone on USB); no credits, no
  generation, no photo picked.
- phases.json is carried over unchanged from draft 20261125-160000; the three rows join the plan of the next full run
  (TC-046 with TC-007, TC-047 / TC-048 last, so a lost network cannot disturb other rows).

## Questions for PM
- Q-3 Should a tap on the dimmed area or a swipe down close the photo tips sheet?
- Q-4 What should the chip and the sheet show offline, and for a template with no recommend_samples?

## Questions for you
- None.
