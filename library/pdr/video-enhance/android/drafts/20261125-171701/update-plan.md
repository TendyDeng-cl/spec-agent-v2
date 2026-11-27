# Update plan — Video Enhance / android: approved v12 → draft 20261125-171701

Based on approved v12 (246 rows). Same spec set; the change is a ruling from the user on Open question
Q-21 [REQ-044]: 「play should start from where the playhead is and it can be dragged between the two white <> icons」.

## Spec files
- Unchanged: Figma only (spec set 2026-11-03). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-193 | changed | The knob moves the playhead; how far it may go was open (Q-21) | The playhead moves only between the two white trim handles and stops at a handle; play starts from the playhead's position |
| R-027 | reworded | Play plays the video 「from the selection」 | Play plays from the playhead's position, which is always inside the selection (R-193) |
| Q-21 | answered | Open question | Moved to Answered questions with the ruling and REQ-044 |
| Q-28 | new question | — | What playback does on reaching the right trim handle (stop, jump back or loop): not stated, no row asserts it |
| Request ledger coverage | fixed | REQ-042 (MUI numbering) was not cited: `check.ts` failed the approved table on it | Cited with R-208, R-209 |

## Case changes
- New (2), placed right after TC-215 in 「Trim and selected length」:
  - TC-348 (R-193): with the selection 00:30–02:00 of the 12:30 video, the knob pushed past the right and then the
    left handle stops at the handle (bubble and Preview time 「02:00」, then 「00:30」); the handles, 「Selected Length」
    and the price do not change.
  - TC-349 (R-193, R-027): the knob parked at about 01:00, then 01:30; play starts from that point each time, not
    from the selection start, and the playhead, bubble and Preview time advance from it.
- Modified (2):
  - TC-215: Notes only: the playhead's range is no longer 「not stated」; they cite REQ-044 and the two new rows. Its
    drags already stay inside the selection, so its steps and expected results stand.
  - TC-037: step 1 now reads 「plays from the playhead's position, which is inside the selection (02:00 or later)」
    (R-027 reworded); the Notes point to TC-349.
- Removed (0)
- Unchanged: 244

## Found by the analysis
- Searched every row for the Q-21 assumption and for where play starts (REQ-010 rule on changed requirements): only
  TC-215 (Notes) and TC-037 (step 1) rest on them. TC-270 and TC-273 drag the playhead to a handle and already agree
  with the ruling.
- Pass 9 hidden clauses: R-193 → TC-348 (cannot pass a handle), TC-349 (play from the playhead). Pass 10 variants:
  right handle and left handle, both in TC-348.
- Controls (pass 11): the knob (round/ic_btn_drag) is now pressed by TC-215, TC-348, TC-349; play by TC-037,
  TC-150, TC-349 (control-trace.json).

## Not added (value check)
- Play running to the end of the selection: no source says what happens at the right handle, so it is Q-28, not a row.
- A trim handle dragged over the playhead: R-031 already keeps the Preview (and with R-192 the bubble) at the dragged
  handle (TC-042, TC-214), so the playhead follows the handle; no separate row.
- The full-screen preview's own start point: the ruling is about the panel's playhead; TC-037 keeps its check.

## How the rows run
- No new fixture: the 12:30 video with its time burned in. No task is started and no credits are spent.
- phases.json is carried over unchanged from draft 20261124-150000; the two new and two modified rows join the plan of the next
  run or recheck (TC-348 and TC-349 sit with TC-215 in the 「Panel layout, first-run bubble and trim」 segment).

## Questions for PM
- Q-28 What does playback do when it reaches the right trim handle: stop there, jump back to the selection start, or loop?

## Questions for you
- None.
