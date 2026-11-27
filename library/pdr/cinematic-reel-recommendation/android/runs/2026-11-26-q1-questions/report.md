# Cinematic Reel Recommendation (Android) — Q1 question round — report

Run folder `runs/2026-11-26-q1-questions/` · plan `runs/RUN-PLAN-20261126-Q1.md` · 2026-11-26, one segment (Q1-a).
Build 16.9.0 (2611231; newer than the 2611201 in `fixtures.md`) · Stage (yellow Launcher bar) · Samsung SM-A5360
(R5CTB22S05Y, on USB; `fixtures.md` still names the Sony) · Pro account · credits 29801 at start and end (no charge).

## Tally (3 rows)
| Result | Count | Cases |
|---|---|---|
| Fail | 3 | TC-077, TC-079, TC-078 (all `question`) |

## Fail, with disposition
- **TC-077 Fail, `question` (Q-3).** A tap on the dimmed template page closes the photo tips sheet (nothing behind
  reacts, page stays on 「Micro Cinema」); a swipe down starting on the first sentence drags the sheet and closes it.
  The Design draws only 「Got it」. Steps 3 and 6: dim gone, card as before. → ISS-CRA-03 (PM, `[AIAgent][UX]`).
- **TC-079 Fail, `question` (Q-4).** Wi-Fi off after Micro Cinema's sheet was loaded: Micro Cinema reopens complete;
  Time Lapse (not opened since launch) shows its sentence and captions but four empty picture boxes (only the ✓ / ✕
  badges), no message or retry; 「Extreme Close-up」 shows (same picture as Micro Cinema's). Chips stay on every card,
  no crash. Back online the Time Lapse sheet shows all five items with pictures. → ISS-CRA-04 (PM, `[AIAgent][UX]`).
- **TC-078 Fail, `question` (Q-4).** App launched with Wi-Fi off: the template page opens directly with all six cards
  (Horror Movie, Micro Cinema, Fast Cut, One-Take Shot, Time Lapse, Handheld Camera), each with its chip, still
  pictures instead of videos, credit pill 「--」, no offline message. Horror Movie's sheet: 「People in Frame」 and
  「Layered Depth」 empty boxes, Avoid items with pictures. Back online the Micro Cinema sheet is complete. Merged
  into ISS-CRA-04.

## Open questions (all settled, `android/question-status.json`)
| Q | Outcome |
|---|---|
| Q-1 | filed: DRA262611P0289 (R1; RDResolved in today's pool read) |
| Q-2 | filed: DRA262611P0290 (R1) |
| Q-3 | filed (drafted ISS-CRA-03, this batch; filing waits for the user) — was not-reached |
| Q-4 | filed (drafted ISS-CRA-04, this batch, both halves; filing waits for the user) — was to-file |
| Q-5 | determined (R1, TC-008) |

## eBug drafts
`android/ebugs/2026-11-26-q1/20261126_eBug_drafts_Cinematic-Reel-Recommendation-Q1_16.9.0.md`: 2 entries, format
check 0 errors; review page `20261126_eBug_review_Cinematic-Reel-Recommendation-Q1_16.9.0.html` (no TR found for
2611231: the reviewer supplies it). Dedupe: Android pool, no same-OS ticket (`dedupe.txt`). Nothing filed.

## Observations
- O-1: after an offline launch the credit pill stays 「--」 after Wi-Fi returns (also on leaving and reopening the page,
  and 20 s later) until the app is relaunched online; logcat shows every `CreditSystemManager` init call failing
  offline and no retry. Not drafted (shared credit pill, off this spec); closest DRA262610P0166 (closed, 16.8.0,
  「--」 after a restart). For the user to decide.
- Setup: the 「What is Cinematic Reel Creator?」 tutorial showed on the first entry of this run; closed with X.
- Offline network calls answered `Unexpected response code for CONNECT: 502` (a proxy on the phone's path), not
  UnknownHost; the app behaved as with no network (ping failed, no active default network).

## Coverage
Not built: `coverage-page.ts` stops because `specs/2026-11-25/extracted/inventory.json` is missing (inventory step 10
not run for that spec set).

## Time and usage
- `run-log.ts time`: test time 0h 10m, wall 0h 10m (Q1-a only).
- `runs/usage.jsonl`: Q1 start 02:39 UTC 5-hour 12 %, weekly 53 % (seat 6.25× Pro); the end reading is the
  orchestrator's.

## Knowledge
Inbox empty and no observation names an entry: knowledge step skipped.

## Logs
`logs/Q1-a-20261126-104943` (sliced; no failure line attributed by the slicer, 0 charges). Network errors of the
offline windows excerpted for ISS-CRA-04, checked for keys.

## End state
Phone on the Launcher, Wi-Fi on (17F-QAAPP-2.4G, ping OK), app relaunched online (credit pill 29801).
