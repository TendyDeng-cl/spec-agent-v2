# Update plan — Video Enhance / ios: approved v9 → draft 20261125-171701

Based on approved v9 (231 rows). Same spec set; the change is a ruling from the user on Open question
Q-21 [REQ-044]: 「play should start from where the playhead is and it can be dragged between the two white <> icons」.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-193 | changed | The knob moves the playhead; how far it may go was open (Q-21) | The playhead moves only between the two white trim handles and stops at a handle; play starts from the playhead's position |
| R-027 | reworded | Play plays the video 「from the selection」 | Play plays from the playhead's position, which is always inside the selection (R-193) |
| Q-21 | answered | Open question | Moved to Answered questions with the ruling and REQ-044 |
| Q-28 | new question | — | What playback does on reaching the right trim handle (stop, jump back or loop): not stated; TC-349 records it (REQ-045) |
| Request ledger coverage | fixed | REQ-042 (MUI numbering) was not cited: `check.ts` failed the approved table on it | Cited with R-208, R-209 |

## Case changes
- New (2), placed right after TC-215 in 「Trim and selected length」:
  - TC-347 (R-193): with the selection 00:30–02:00 of the 12:30 video, the knob pushed past the right and then the
    left handle stops at the handle (bubble and Preview time 「02:00」, then 「00:30」); the handles, 「Selected Length」
    and the price do not change.
  - TC-348 (R-193, R-027): the knob parked at about 01:00, then 01:30; play starts from that point each time, not
    from the selection start, and the playhead, bubble and Preview time advance from it.
- Modified (2):
  - TC-215: Notes only: the playhead's range is no longer 「not stated」; they cite REQ-044 and the two new rows. Its
    drags already stay inside the selection, so its steps and expected results stand.
  - TC-037: step 1 now reads 「plays from the playhead's position, which is inside the selection (02:00 or later)」
    (R-027 reworded); the Notes point to TC-348.
- Removed (0)
- Unchanged: 229

## Found by the analysis
- Searched every row for the Q-21 assumption and for where play starts (REQ-010 rule on changed requirements): only
  TC-215 (Notes) and TC-037 (step 1) rest on them. TC-270 and TC-273 drag the playhead to a handle and already agree
  with the ruling.
- Pass 9 hidden clauses: R-193 → TC-347 (cannot pass a handle), TC-348 (play from the playhead). Pass 10 variants:
  right handle and left handle, both in TC-347.
- Controls (pass 11): the knob (round/ic_btn_drag) is now pressed by TC-215, TC-347, TC-348; play by TC-037,
  TC-150, TC-348 (control-trace.json).

## Not added (value check)
- Play running to the end of the selection: no source says what happens at the right handle, so it is Q-28; TC-349 (REQ-045, below) records it without asserting an outcome.
- A trim handle dragged over the playhead: R-031 already keeps the Preview (and with R-192 the bubble) at the dragged
  handle (TC-042, TC-214), so the playhead follows the handle; no separate row.
- The full-screen preview's own start point: the ruling is about the panel's playhead; TC-037 keeps its check.

## How the rows run
- No new fixture: the 12:30 video with its time burned in. No task is started and no credits are spent.
- phases.json is carried over unchanged from draft 20261124-150000; the two new and two modified rows join the plan of the next
  run or recheck (TC-347 and TC-348 sit with TC-215 in the 「Panel layout, first-run bubble and trim」 segment).

## Added by REQ-045 — a row for every Open question that is still open
Request (user, 2026-11-25): 「if it's a new question it should be added to the cases and be run next round」 and 「shouldn't they be added to cases already?」. Rule: analysis.md, 「Every Open question gets an observing row」.

### Case changes
- New (3):
  - TC-349 (R-027, R-193; Q-28), right after TC-348 in 「Trim and selected length」: with the selection 00:30–02:00 the playhead is
    parked at about 01:50 and play is left alone for 30 s under a screen recording. Recorded: stop, jump back or play
    on at the right handle, where the playhead, the bubble and the Preview time rest, the button's state and what the
    next tap does. Any outcome is a Fail (question) for PM.
  - TC-350 (R-080, R-085; Q-14), right after TC-110 in 「Generating and cancel」: the first 「Enhance」 after a fresh install,
    with the 00:01 video. Recorded: what shows between the tap and the processing dialog (title, whole text, buttons,
    whether it names a third party's cloud). Either outcome is a Fail (question) for PM / Legal. Blocked (test-data)
    on the QA iPhone while PowerDirector cannot be reinstalled there.
  - TC-351 (R-020, R-073; Q-15), right after TC-320 in 「Eligibility and purchase」: tap the panel's credit pill, then ‹.
    Asserts the Android build's behaviour (「My Credits」 with the same balance, the panel kept on return); another
    target is recorded for PM.
- Modified (3):
  - TC-348: Notes only, they name TC-349 for the end of the selection.
  - TC-110: Notes only, a first-use consent screen belongs to TC-350 and the row runs after it.
  - TC-093: one more Expected Result line (whether the IAP page offers a free trial is recorded, Q-7); Notes reworded.

### Open questions and the rows that observe them
- New row: Q-14 → TC-350, Q-28 → TC-349, Q-15 → TC-351. Row extended: Q-7 → TC-093.
- Already observed, question text unchanged: Q-1 TC-011 · Q-2 TC-113 · Q-5 TC-059 · Q-6 TC-064 and the combination rows ·
  Q-8 TC-144 · Q-9 TC-021, TC-155 · Q-10 TC-160, TC-161 · Q-11 TC-162 · Q-12 TC-121 · Q-13 TC-022 · Q-18 TC-115 ·
  Q-22 TC-143 (step 4) · Q-24 TC-045, TC-264 · Q-26 TC-083, TC-087, TC-269 and the combination rows.
- Already observed, the question now names the rows: Q-16 TC-130 (banner), TC-133 (success push), TC-174 (failure push) ·
  Q-17 TC-140 (Recent icon), TC-114 (「<n> minutes left...」) · Q-19 TC-040.

### How the rows run
- TC-349: no new fixture (the 12:30 video with its time burned in), no task, no credits. It sits with TC-215 and TC-348.
- TC-350: needs a fresh install, which the QA iPhone rule forbids for now: Blocked --as test-data until lifted.
- TC-351: no fixture beyond a Pro+ tier and a video; nothing is bought and no task starts.
- Controls (pass 11): the knob and play are also pressed by TC-349, the 「Enhance」 CTA also by TC-350 (control-trace.json).
- phases.json is carried over unchanged; the new rows join the plan of the next run.

## Questions for PM
- Q-28 What does playback do when it reaches the right trim handle: stop there, jump back to the selection start, or loop? (TC-349 records what the build does.)
- Q-14 Must the GenAI consent / disclosure dialog show before the first upload, and what must it say? (TC-350 records what the build shows.)
- Q-15 What should the panel's credit pill open? (TC-351 asserts 「My Credits」, as on Android.)

## Questions for you
- None.
