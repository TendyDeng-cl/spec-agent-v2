# Update plan — AIGC Watermark / android: approved v4 → draft 20261125-190000

Based on approved v4 (154 rows). Same spec set; the change comes from the request ledger [REQ-014]
(user, 2026-11-25: 「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases already?」): every Open question that is still open gets a row that takes the app to
the point in question, so the next run reaches it (analysis.md, 「Every Open question gets an observing row」).

## Spec files
- Unchanged: spec set specs/2026-11-17. New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-8 | names its row | 「Assumption: separate」, no row checked the other dialog | TC-128 opens the export dialog after ticking the music dialog's box |
| Q-13 | gets a row | 「no row asserts the exported project's metadata」 | TC-157 reads the exports' Content Credentials and records them as Fail (question) for PM |
| Q-14 | ends 「No row」 | open with no row | the PM file is unread, so no row can observe it |
| Q-16 | ends 「No row」 | 「no row asserts it」 | no feature or model is known to return a result under two seconds |
| Q-19 | names its rows | one row, switch Off | TC-083 (Off) and TC-158 (On) on a result never saved Off |
| Q-1, Q-4, Q-7, Q-10, Q-12 | name their rows | cited requirements only | 「Rows: TC-…」 added; no row changes |
| Hidden clauses | 3 lines added | — | R-053 (TC-157), R-046 (TC-128), R-042 (TC-083, TC-158) |

No R- requirement changes.

## Case changes
- New (2):
  - TC-158 (R-042, R-047), right after TC-083: an Image to Video result never saved with the switch Off, opened with
    「Full Editor」 and exported with the switch On: no label in the preview, no dialog, no label in the file.
  - TC-157 (R-053), right after TC-127: c2patool on the files TC-065, TC-071 and TC-066 exported; records the
    manifest (or 「No claim found」), signer, actions and ingredients as Fail (question) for PM. No new export.
- Modified (2):
  - TC-128: steps 4–5 added (open the Text to Speech project, tap 「Export」: the export dialog still shows; 「Cancel」);
    two preconditions added; runs before TC-129.
  - TC-083: the precondition now asks for a result never saved with the switch Off; Notes say why.
- Removed (0)
- Unchanged: 152

## Found by the analysis
- Open questions against the rows (question-status.json: determined and filed ones are settled):
  Q-1, Q-4, Q-7, Q-10, Q-12 are observed by existing rows and now name them.
- Q-8: TC-128 ticked the music box but never opened the export dialog; TC-129 only shows the export box works alone.
- Q-13: TC-065 / TC-071 export projects that hold signed AI content, but no row read those files' Content Credentials.
- Q-19: the switch On side had no row, and R3's clip was a gallery file already saved Off.
- Controls (pass 11): the export dialog's 「Cancel」 is now also pressed by TC-128 (control-trace.json).

## Not added (value check)
- Q-16 (a result under two seconds): no feature or model is known to return one, so no row; an export of a project
  shorter than two seconds would test the export rule (R-038), not a result's Save (R-015).
- Q-14 (the PM .pptx): nothing to observe until the file is read.
- The reverse of Q-8 (export box ticked, then the music dialog): both ticks are one-way, so one run can only do one
  order without a reset; TC-128 does music first.
- Q-11's row changes named in question-status.json (TC-032 – TC-034, TC-067 – TC-069, TC-073 – TC-078) are a determined answer,
  not an open question: left for their own draft.

## How the rows run
- TC-157 needs the files TC-065, TC-071 and TC-066 produced kept in the run folder's files/ (fixtures.md).
- TC-083 and TC-158 need an Image to Video result that was never saved with the switch Off (fixtures.md): one
  generation, or a result only saved On.
- phases.json is carried over unchanged from draft 20261125-160000; the new and modified rows join the plan of the next run
  (TC-158 with TC-083, TC-157 after the timeline exports, TC-128 before TC-129).

## Questions for PM
- Q-13 Should an editor export that holds signed AI content carry a C2PA manifest? (TC-157 records what the build writes.)
- Q-14 Please supply 「AIGC Watermark Spec.pptx」.

## Questions for you
- None.
