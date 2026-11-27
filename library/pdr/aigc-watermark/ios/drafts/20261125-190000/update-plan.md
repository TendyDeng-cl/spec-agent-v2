# Update plan — AIGC Watermark / ios: approved v4 → draft 20261125-190000

Based on approved v4 (151 rows). Same spec set; the change comes from the request ledger [REQ-014]
(user, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases already?」): every Open question that is still open gets a row that takes the app to
the point in question, so the next run reaches it (analysis.md, 「Every Open question gets an observing row」).

## Spec files
- Unchanged: spec set specs/2026-11-17. New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-8 | names its row | 「Assumption: separate」, no row checked the other dialog | TC-126 opens the export dialog after ticking the music dialog's box |
| Q-13 | gets a row | 「no row asserts the exported project's metadata」 | TC-154 reads the exports' Content Credentials and records them as Fail (question) for PM |
| Q-14 | ends 「No row」 | open with no row | the PM file is unread, so no row can observe it |
| Q-16 | ends 「No row」 | 「no row asserts it」 | no feature or model is known to return a result under two seconds |
| Q-19 | names its rows | one row, switch Off | TC-082 (Off) and TC-155 (On) on a result never saved Off |
| Q-11 | names its rows | no row named | each feature's rows, with what the Android R3 run found to look at |
| Q-17 | ends 「No row」 | open with no row | it asks about Android; the Android R3 run determined it |
| Q-1, Q-2, Q-3, Q-4, Q-6, Q-7, Q-9, Q-10, Q-12, Q-20 | name their rows | cited requirements only | 「Rows: TC-…」 added; no row changes |
| Hidden clauses | 3 lines added | — | R-053 (TC-154), R-046 (TC-126), R-042 (TC-082, TC-155) |

No R- requirement changes.

## Case changes
- New (2):
  - TC-155 (R-042, R-047), right after TC-082: an Image to Video result never saved with the switch Off, opened with
    「Full Editor」 and exported with the switch On: no label in the preview, no dialog, no label in the file.
  - TC-154 (R-053), right after TC-125: c2patool on the files TC-064, TC-070 and TC-065 exported; records the
    manifest (or 「No claim found」), signer, actions and ingredients as Fail (question) for PM. No new export.
- Modified (2):
  - TC-126: steps 4–5 added (open the Text to Speech project, tap 「Export」: the export dialog still shows; 「Cancel」);
    two preconditions added; runs before TC-127.
  - TC-082: the precondition now asks for a result never saved with the switch Off; Notes say why.
- Removed (0)
- Unchanged: 149

## Found by the analysis
- Open questions against the rows (no iOS run yet, so every question is open):
  Q-1, Q-2, Q-3, Q-4, Q-6, Q-7, Q-9, Q-10, Q-12, Q-20 are observed by existing rows and now name them.
- Q-8: TC-126 ticked the music box but never opened the export dialog; TC-127 only shows the export box works alone.
- Q-13: TC-064 / TC-070 export projects that hold signed AI content, but no row read those files' Content Credentials.
- Q-19: the switch On side had no row.
- Controls (pass 11): the export dialog's 「Cancel」 is now also pressed by TC-126 (control-trace.json).

## Not added (value check)
- Q-16 (a result under two seconds): no feature or model is known to return one, so no row; an export of a project
  shorter than two seconds would test the export rule (R-038), not a result's Save (R-015).
- Q-14 (the PM .pptx): nothing to observe until the file is read.
- The reverse of Q-8 (export box ticked, then the music dialog): both ticks are one-way, so one run can only do one
  order without a reset; TC-126 does music first.

## How the rows run
- TC-154 needs the files TC-064, TC-070 and TC-065 produced kept in the run folder's files/ (fixtures.md).
- TC-082 and TC-155 need an Image to Video result that was never saved with the switch Off (fixtures.md): one
  generation, or a result only saved On.
- phases.json is carried over unchanged from draft 20261125-160000; the new and modified rows join the plan of the next run
  (TC-155 with TC-082, TC-154 after the timeline exports, TC-126 before TC-127).

## Questions for PM
- Q-13 Should an editor export that holds signed AI content carry a C2PA manifest? (TC-154 records what the build writes.)
- Q-14 Please supply 「AIGC Watermark Spec.pptx」.

## Questions for you
- None.
