# Update plan — AI Mini Drama / ios: approved v18 → draft 20261125-190000

Based on approved v18 (454 rows). Same spec set; the change is a request [REQ-111] (user, 2026-11-25):
「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases
already?」 Every Open question the completed runs left open gets a row that takes the app to the point in question.

## Spec files
- Unchanged: PDRM MX.pdf, AI Mini Drama - PM Spec 20261021.pdf, AI Mini Drama - Design Spec.pdf (spec set specs/2026-10-21-2). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-5 | names its rows | No row read the string | TC-459 (after a storyboard) and TC-460 (after a Preview video) record the assistant's messages |
| Q-18 | names its row | TC-003 only mentioned it in Notes | TC-458 records the store region, the price currency and the template counts |
| Q-19 | names a second row | TC-019 could not tap a chip that never showed | TC-465 taps 「More ideas」 where P9 saw it, under Iris's option chips |
| Q-22 | names its rows | No row left the chat at the start of a video regeneration | TC-464 records the dialog; TC-294 records the phase ① title |
| Q-27 | row fixed | TC-092 did not say whether the refund line and ⓘ show | TC-092 asserts the Design card without them |
| Q-28 | names its row, gains an assumption | 「Not traced to a row until then」 | Assumption: no ⋯ (Design); TC-461 looks for it, opens its menu and tries a long-press |
| Q-31 | names its rows, gains an assumption | No row looked for the add-image button, the edit icon or 「Customize my characters (optional)」 | TC-462 and TC-463 look for them; assumption: illustrations only |
| Q-34 | row fixed | TC-406 did not assert 「no user message」 | TC-406 asserts it and records a bubble if one shows |
| Q-36 | row fixed | TC-006 did not record the covers per row | TC-006 records 3 or 4 |
| Job states | Video regeneration, Leave and return | TC-144 | TC-144, TC-464 |
| Request ledger coverage | added | REQ-109 (MUI) was not cited, so `check.ts` failed the approved table; REQ-111 is new | REQ-109 cited as not applied yet (no MUI section in this table); REQ-111 cited with its rows |

No R-… requirement is added, changed or removed.

## Case changes
- New (8), each right after the row it extends (REQ-033):
  - TC-458 (Q-18; after TC-003): store region, price currency, landing grid and More page template counts.
  - TC-459 (Q-5; after TC-075): every assistant message between the Storyboard Result card and 「Choose your video settings」, and after the preview played.
  - TC-460 (Q-5; after TC-086): every assistant message from the Storyboard Preview card to the full-episode offer on a finished Preview video.
  - TC-461 (Q-28; after TC-397): ⋯ on a regenerated scene image, its menu, and a long-press.
  - TC-462 (Q-31; after TC-012): no add-image button in the composer.
  - TC-463 (Q-31; after TC-310): no edit icon on Characters Result, no 「Customize my characters (optional)」.
  - TC-464 (Q-22; after TC-412): Back in the first seconds of a video regeneration, the dialog recorded.
  - TC-465 (Q-19; after TC-019): 「More ideas」 tapped under Iris's option chips.
- Modified (7):
  - TC-003: Notes point to TC-458.
  - TC-019: Notes point to TC-465.
  - TC-412: Notes point to TC-464.
  - TC-294: one Expected Result line (the phase ① card title is recorded, Q-22).
  - TC-092: one Expected Result line (no ⓘ, no refund line on the second failure, Q-27) and a Note.
  - TC-406: one Expected Result line (no user message on Generate Video, Q-34) and a Note.
  - TC-006: one Expected Result line (covers per row recorded, Q-36) and a Note.
- Removed (0)
- Unchanged: 447

## Found by the analysis
- Read every question that `question-status.json` leaves open (not reached or to file) against the rows it names.
- Already observed, no change: Q-20 (TC-377, TC-063, TC-403, TC-404, TC-406, TC-409, TC-410), Q-21 (TC-415), Q-24 (TC-096),
  Q-25 (TC-226), Q-29 (TC-418), Q-35 (TC-091, TC-436, TC-437), Q-37 (TC-456, TC-457), Q-39 (TC-422, TC-424, TC-425,
  TC-427), Q-40 (TC-421).
- Controls (pass 11): K-0b6874, K-a256f3, K-f7167a, K-f168be and K-e2edba stay n/a (assumed not shipped) and now name
  the row that looks for them (control-trace.json).

## Not added (value check)
- A row on a second store for Q-18: the run cannot change the account's store; TC-458 says which side it saw.
- A new video for Q-5: TC-460 reads an existing Preview video; a generation needs the user's go-ahead (REQ-073).

## How the rows run
- No new fixture. TC-464 spends one scene regeneration and TC-461 rides on a regeneration another row already made (REQ-073). TC-460 is Blocked (test-data) without a finished Preview video.
- No fresh install is needed (PowerDirector is never uninstalled on the QA iPhone). Chat waits and reads tap ↓ first (REQ-107).
- No phases.json: this feature's drafts carry none since 2026-10-29; the new rows join the next run's plan with the rows they follow.

## Questions for PM
- None new. Q-5, Q-19, Q-22 and Q-18 go to PM with the next run's captures.

## Questions for you
- REQ-109 (MUI section) is cited as 「not applied yet」 so the draft passes `check.ts`; say if the MUI rows should be drafted for this feature now.
