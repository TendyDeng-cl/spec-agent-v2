# Cinematic Reel Recommendation (Android) — E1 entry round — report

Run folder `runs/2026-11-26-e1-entries/` · plan `runs/RUN-PLAN-20261126-E1.md` · 2026-11-26, one segment (E1-a, TC-080 – TC-099).
Build 16.9.0 (2611251, Google Play internal track) · Stage (yellow Launcher bar) · Sony XQ-BT52 (HQ61563393, USB) ·
Pro account acda.test7 (Launcher 「Pro」) · credits 2362 → 2074 (six Micro Cinema reels × 48, one per generation row).

## Tally (20 rows)
| Result | Count | Cases |
|---|---|---|
| Pass | 12 | TC-080, TC-081, TC-084, TC-085, TC-086, TC-088, TC-089, TC-090, TC-093, TC-094, TC-097, TC-098 |
| Fail | 8 | TC-082, TC-083, TC-087, TC-091, TC-095, TC-099 (Q-10); TC-092, TC-096 (Q-8, Q-9) — all `question` |

Per entry: Launcher (TC-080 – TC-083), AI Magic tab (TC-084 – TC-087), Editor Global Toolbar › AI Magic (TC-088 – TC-091),
Photo Toolbar (TC-092 – TC-095), PIP Photo Toolbar (TC-096 – TC-099). Every entry opens the same template page with no
tutorial, the cards in the same order (Horror Movie, Micro Cinema, Fast Cut …); every chip, sheet, 「Got it」, dim tap,
system Back, 「?」 tutorial, history, Add Media 「?」 / tabs / album / sort control responded with no error, and the
preview showed the picked photo at the Launcher's price (48). No entry brings an editor photo in or adds the reel to
the project; ‹ / system Back return to the entry each page was opened from (editor entries: with the selection kept).

## Fail, with disposition
- **Q-10 (TC-082, TC-083, TC-087, TC-091, TC-095, TC-099), `question`.** System Back during the upload spinner or on
  Analyzing & Generating returns to the preview with 「Generate ◆ 48」 active and no message, while the task runs on
  and is charged once; system Back on the result page goes to the task list. No spec draws either. → ISS-CRA-06 (PM,
  `[AIAgent][UX]`).
- **Q-8 / Q-9 (TC-092, TC-096), `question`.** Cinematic Reel Creator is not under the Photo / PIP Photo Toolbar's
  「Effects」 as the toolbar sheet 「2026/11 Auto Reframe」 lists it; it is a first-layer button after Split on both
  (added for DRA262608-0041, closed, which named no place). The rest of those Sections ran through that button. →
  ISS-CRA-05 (PM, `[AIAgent][UX]`).

## Open questions (`android/question-status.json`)
| Q | Outcome |
|---|---|
| Q-1 | filed: DRA262611P0289 (R1). E1: Add Media now shows 「?」 and it opens the sheet (TC-086/090/094/098): ready to verify |
| Q-2 | filed: DRA262611P0290 (R1) |
| Q-3 | determined (user ruling 2026-11-26); E1 saw the same (dim tap closes the sheet) from every entry |
| Q-4 | filed: DRA262611P0321 (Q1) |
| Q-5 | determined (R1, TC-008) |
| Q-8 | filed (drafted ISS-CRA-05, this batch; filing waits for the user); the rest of the question determined |
| Q-9 | filed (drafted ISS-CRA-05, merged with Q-8); the rest determined |
| Q-10 | filed (drafted ISS-CRA-06, this batch) |

Rows to reword at the next draft: TC-081 (task name is 「Micro Cinema 01」, a counter, not <MMDD>: O-1); TC-086 / 090 /
094 / 098 step 7 (Android Add Media has no 「Recents」 tab: Photo, gettyimages | iStock, album list, sort); TC-092 –
TC-099 name 「Effects」 (first-layer button unless PM moves it).

## eBug drafts
`android/ebugs/2026-11-26-e1/20261126_eBug_drafts_Cinematic-Reel-Recommendation-E1_16.9.0.md`: 2 entries, format check
0 errors; review page `20261126_eBug_review_Cinematic-Reel-Recommendation-E1_16.9.0.html` (no TR found automatically;
the run plan names TR261125-0064 for 2611251). Dedupe: Android pool (「Cinematic Reel」 83, 「CineStory」 3), no
same-OS ticket covers either (`dedupe.txt`). Nothing filed, nothing commented on.

## Observations (`observations.md`)
- O-1: task names are a counter (「Micro Cinema 01」 …), not <MMDD>: table wording.
- O-2: during TC-085 the app opened the finished TC-081 reel's result page via the completion notification's deep link
  and dropped the page stack; an idle recheck while another reel finished did not navigate, so most likely a run
  gesture hit the heads-up banner. Not raised.

## Setup
- Fixture project 「Project 11-26(3)」 (created 16:18): dog photo on the main track, baseball photo on an overlay track
  (both 00PDRa_Testing_Material); unchanged after the run. Generation photo: the checked-shirt portrait in the same album.
- The tutorial was already dismissed at the start. Tier read as Pro (Launcher 「Pro」).

## Coverage
Not built: `coverage-page.ts` stops because `specs/2026-11-25/extracted/inventory.json` is missing (as in Q1).

## Time and usage
- `run-log.ts time`: test time 1h 14m, wall 1h 14m (E1-a only), no idle gap.
- Tokens (segment subagent transcript, since 08:14 UTC): 236 messages, in 534, cache-write 404,077, cache-read
  62,953,012, out 100,382.
- `runs/usage.jsonl` readings are the orchestrator's.

## Knowledge
Parked I-005 (Cinematic Reel Creator is a first-layer Photo / PIP Photo button, not under Effects; KP-107) and I-006
(reel timing, task names, completion notification and deep link, Back behaviour). The domain-knowledge step (fresh
subagent processing the inbox) is left to the orchestrator.
