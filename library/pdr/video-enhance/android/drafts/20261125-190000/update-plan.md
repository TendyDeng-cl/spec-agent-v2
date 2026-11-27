# Update plan — Video Enhance / android: approved v13 → draft 20261125-190000

Based on approved v13 (248 rows). Same spec set; the change is a request from the user [REQ-045]: an Open
question that is still open must have a row, so the next run reaches it.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-14 | question reworded | 「No row asserts it; a consent dialog on first use is recorded, not filed.」 | Names its row; either outcome is a Fail (question) for PM / Legal |
| Q-28 | question reworded | 「no row asserts it: TC-349 pauses before the end」, noted in the run, not filed | Names its row; any outcome is a Fail (question) for PM |
| Request ledger coverage | added | — | REQ-045 |

No requirement (R-…) changed and none was added: no source states either behaviour, so the rows record it.

## Added by REQ-045 — a row for every Open question that is still open
Request (user, 2026-11-25): 「if it's a new question it should be added to the cases and be run next round」 and 「shouldn't they be added to cases already?」. Rule: analysis.md, 「Every Open question gets an observing row」.

### Case changes
- New (2):
  - TC-350 (R-027, R-193; Q-28), right after TC-349 in 「Trim and selected length」: with the selection 00:30–02:00 the playhead is
    parked at about 01:50 and play is left alone for 30 s under a screen recording. Recorded: stop, jump back or play
    on at the right handle, where the playhead, the bubble and the Preview time rest, the button's state and what the
    next tap does. Any outcome is a Fail (question) for PM.
  - TC-351 (R-080, R-085; Q-14), right after TC-110 in 「Generating and cancel」: the first 「Enhance」 after `pm clear` (or a fresh install) and a new sign-in,
    with the 00:01 video. Recorded: what shows between the tap and the processing dialog (title, whole text, buttons,
    whether it names a third party's cloud). Either outcome is a Fail (question) for PM / Legal.
- Modified (2):
  - TC-349: Notes only, they name TC-350 for the end of the selection.
  - TC-110: Notes only, a first-use consent screen belongs to TC-351 and the row runs after it.

### Open questions and the rows that observe them
- New row: Q-14 → TC-351, Q-28 → TC-350.
- Kept: Q-20 → TC-211 (system Back on 「Turn on notifications」; Blocked in R3 because the prompt never appeared, so it
  stays not-reached and is not duplicated).
- Not touched: the questions R3 determined (Q-5, Q-6, Q-7, Q-9, Q-12, Q-15, Q-19, Q-22; question-status.json) and the
  ones an eBug carries (Q-1, Q-2, Q-8, Q-10, Q-11, Q-13, Q-16, Q-17, Q-18, Q-24, Q-27).

### How the rows run
- TC-350: no new fixture (the 12:30 video with its time burned in), no task, no credits. It sits with TC-215 and TC-349.
- TC-351: one-way state. It is the first 「Enhance」 tap after the reset that TC-030 also needs (`pm clear`, then sign in with the
  phone's Google account), before TC-110 and every other row that starts a task; one task on the 00:01 video (1 credit).
- Controls (pass 11): the knob and play are also pressed by TC-350, the 「Enhance」 CTA also by TC-351 (control-trace.json).
- phases.json is carried over unchanged; the new rows join the plan of the next run.

## Not added (value check)
- A row for the dialog's 「decline」 branch (Q-14): whether a dialog exists is not known yet, so its buttons are recorded
  and a decline row waits for the answer.
- A second row for Q-20: TC-211 already takes system Back to the notification prompt.
- A new requirement for either question: the spec is silent, so they stay Open questions (formats.md).

## Questions for PM
- Q-28 What does playback do when it reaches the right trim handle: stop there, jump back to the selection start, or loop? (TC-350 records what the build does.)
- Q-14 Must the GenAI consent / disclosure dialog show before the first upload, and what must it say? (TC-351 records what the build shows.)

## Questions for you
- None.
