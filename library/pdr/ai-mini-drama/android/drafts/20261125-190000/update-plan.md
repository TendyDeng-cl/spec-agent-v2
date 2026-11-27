# Update plan — AI Mini Drama / android: approved v13 → draft 20261125-190000

Based on approved v13 (529 rows). Same spec set; the change is a request [REQ-111] (user, 2026-11-25):
「if it's a new question it should be added to the cases and be run next round」, 「shouldn't they be added to cases
already?」 Every Open question the completed runs left open gets a row that takes the app to the point in question.

## Spec files
- Unchanged: PDRM MX.pdf, AI Mini Drama - PM Spec 20261021.pdf, AI Mini Drama - Design Spec.pdf (spec set specs/2026-10-21-2). New or changed: none. No longer supplied: none.

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| Q-5 | names its rows | No row read the string | TC-581 (after a storyboard) and TC-582 (after a Preview video) record the assistant's messages |
| Q-18 | names its row | TC-003 only mentioned it in Notes | TC-580 records the store region, the price currency and the template counts |
| Request ledger coverage | added | REQ-109 (MUI) was not cited, so `check.ts` failed the approved table; REQ-111 is new | REQ-109 cited as not applied yet (no MUI section in this table); REQ-111 cited with its rows |

No R-… requirement is added, changed or removed.

## Case changes
- New (3), each right after the row it extends (REQ-033):
  - TC-580 (Q-18; after TC-003): store region, price currency, landing grid and More page template counts.
  - TC-581 (Q-5; after TC-075): every assistant message between the Storyboard Result card and 「Choose your video settings」, and after the preview played.
  - TC-582 (Q-5; after TC-086): every assistant message from the Storyboard Preview card to the full-episode offer on a finished Preview video.
- Modified (1):
  - TC-003: Notes point to TC-580.
- Removed (0)
- Unchanged: 528

## Found by the analysis
- Read every question that `question-status.json` leaves open (not reached or to file) against the rows it names.
- Already observed, no change: Q-19 (TC-019; the build shows no chip, DRA262610P0380).
- control-trace.json is carried over unchanged.

## Not added (value check)
- A row on a second store for Q-18: the run cannot change the account's store; TC-580 says which side it saw.
- A new video for Q-5: TC-582 reads an existing Preview video; a generation needs the user's go-ahead (REQ-073).
- Rows for the Android-only Q-A… questions: out of this request's scope (they are not read by the tooling); see below.

## How the rows run
- No new fixture. TC-582 is Blocked (test-data) without a finished Preview video.
- No fresh install is needed (PowerDirector is never uninstalled on the QA iPhone). Chat waits and reads tap ↓ first (REQ-107).
- No phases.json: this feature's drafts carry none since 2026-10-29; the new rows join the next run's plan with the rows they follow.

## Android-only questions (Q-A…)
Not read by the tooling and not changed in this draft; whether a row observes each:
- Q-A1 Back on Make your character while it generates: observed if a row uses system back there (R-354 rows); not checked row by row here.
- Q-A2 Pro (30) tier on Android: observed, TC-542 records the plan tabs.
- Q-A3 character update in chat, two-stage or not: observed, TC-351.
- Q-A4 answered 2026-10-28 (REQ-050).
- Q-A5 system Back on dialogs, menus, keyboards: observed by the system-Back rows (R-354, R-355).
- Q-A6 screens with no Back rule: observed, TC-327, TC-039, TC-127, TC-304, TC-533 record what Back does.
- Q-A7 which generations follow the 10/22 rule: partly, TC-153, TC-155, TC-378, TC-294; no row taps Back at the start of a video regeneration (iOS got one in this draft).
- Q-A8 answered 2026-11-05 for the action cards; the rest is Q-A20.
- Q-A9 export after leaving: observed, TC-517.
- Q-A10 toast on Export during a regeneration: observed, TC-096 records the copy.
- Q-A11 Free user's card label: observed, TC-226.
- Q-A12 limit dialog button: observed, TC-118.
- Q-A13 second failure after Retry: observed only by the Design copy of TC-092; the refund line and ⓘ are not asserted (iOS TC-092 was fixed in this draft).
- Q-A14 ⋯ on a regenerated scene image: NOT observed, no row (iOS got one in this draft).
- Q-A15 feature intro: observed, TC-541.
- Q-A16 「Create video」 on the preview card: observed, TC-079.
- Q-A17 MX mockups' older chat: partly, TC-020, TC-235, TC-070; NOT observed for the add-image button, the edit icon and 「Customize my characters (optional)」 (iOS got two rows in this draft).
- Q-A18 superseded, Q-A19 answered (REQ-103).
- Q-A20 user message on Generate Video: reached by TC-405, which does not assert 「no user message」.
- Q-A21 4xxx / 5xxx copy: observed, TC-091, TC-559, TC-560, TC-499.
- Q-A22 covers per row: reached by TC-006 / TC-328, which do not record the count.
- Q-A23 Close after a celebrity block: observed, TC-578, TC-579.
- Q-A24 answered 2026-11-06 (REQ-103).
- Q-A25 preview narration id: observed, TC-545.

## Questions for PM
- None new. Q-5 and Q-18 go to PM with the next run's captures.

## Questions for you
- REQ-109 (MUI section) is cited as 「not applied yet」 so the draft passes `check.ts`; say if the MUI rows should be drafted for this feature now.
- Should the Android-only Q-A… questions get rows too (Q-A14, Q-A17, Q-A7, Q-A13, Q-A20, Q-A22 have the gaps iOS had)?
