# AIGC Watermark Android — E1 report (entry round: the UI pass of every non-primary entry, REQ-015)
- Build 16.9.0 (2611251), Google Play internal test (TR261125-0064), Stage (yellow Launcher bar). Phone Sony XQ-BT52
  (HQ61563393), Android 12, USB. Account acda.test7@gmail.com: Free until the Pro test subscription was re-bought at
  21:01 (Play test sheet 「Test card, always approves」; still Pro at 23:05). Draft 20261126-111601, phase E1, segments
  E1-a – E1-f, 216 rows (TC-159 – TC-374). 2026-11-26 17:35–23:05 (UTC+8). Nothing filed, uploaded, commented or committed.
- 「Remove AIGC Watermark」 Off throughout (never changed). The export dialog's 「Don't show again」 was never ticked; the
  music dialog never appeared (DRA262611P0229), so no one-way state was used. Phone left on the Pro tab, Wi-Fi on,
  logcat capture stopped. Logs: `logs/E1-a-…` – `logs/E1-f-20261126-230528/` (sliced per case).

## Tally
**159 Pass, 41 Fail, 16 Blocked, 0 Not run, 0 Inconclusive** (Fail: 37 question, 3 defect, 1 spec-addition; Blocked:
10 test-data, 6 defect upstream).

| Segment | Rows | Pass | Fail | Blocked | Test time |
|---|---|---|---|---|---|
| E1-a | TC-159 – TC-195 (37) | 31 | 6 | 0 | 1 h 13 m |
| E1-b | TC-196 – TC-231 (36) | 20 | 6 | 10 | 0 h 46 m |
| E1-c | TC-232 – TC-267 (36) | 35 | 1 | 0 | 1 h 01 m |
| E1-d | TC-268 – TC-303 (36) | 20 | 16 | 0 | 0 h 52 m |
| E1-e | TC-304 – TC-339 (36) | 28 | 8 | 0 | 0 h 55 m |
| E1-f | TC-340 – TC-374 (35) | 25 | 4 | 6 | 0 h 44 m |
| **E1** | **216** | **159** | **41** | **16** | **5 h 31 m** |

### E1-f (TC-340 – TC-374)
- AI Music Generator from Editor › Audio, Editor › AI Magic and Audio › Music: each is offered where the toolbar sheet
  (and KP-097) places it, opens the same page as the AI Magic tab (chips 36 / 26 / 27, length, number of songs, ◆5 a
  song), brings nothing in, and ‹ / Back leave nothing behind (from Audio › Music they return to the Music library,
  which R-061 calls for; the rows' 「editor」 wording to fix at the next draft). **Fail (defect) TC-343 / TC-351 /
  TC-359:** 「Generate」 shows no AIGC dialog with the switch Off (DRA262611P0229) and the songs carry no C2PA manifest
  (KF-008, unfiled R2 draft ISS-AWA-17); the songs start with music, no spoken clip. TC-344/345, 352/353, 360/361
  Blocked upstream.
- ☰ Menu › My Artwork opens the AI Magic tab's My Artwork; Pro (Mine) › My Artwork a page of its own; both show the
  same blocks with no AI label on thumbnails, every control responds as from AI Magic, and Image to Video results saved
  from them carry the label (12%, 0–1.9 s, gone at 2.1 s) and one CyberLink manifest (TC-366, TC-370). **Fail
  (question) TC-367:** system Back from the Menu's My Artwork lands on Home with the Menu closed. O-17: the Pro tab's
  My Artwork has no side margin.
- Editor completion banner: an Image to Video task from Editor › AI Magic shows 「Good news! Your Image to Video task
  has been completed…」 with Close / View over the preview; View opens the result page with Save (saved file labelled,
  one CyberLink manifest); Close leaves the editor as it was and the result stays in My Artwork (TC-372 – TC-374 Pass).

### Fails of the whole phase
| Rows | What | eBug |
|---|---|---|
| TC-159 | Entries missing from requirements.md › Entry points | spec-addition, next draft |
| TC-161 | Video Edit by Chat shows 8.3 s as 00:09 and prices 9 s | ISS-AWA-22 (PM) |
| TC-172, 178, 202, 208, 214, 220 | Q-22: VEbC / CRC on the first layer, not under Effects; no AI Remove | ISS-AWA-20 (PM, UX) |
| TC-173, 179, 203, 209 | VEbC / CRC from a clip toolbar ignore the selected clip or photo | ISS-AWA-21 (PM, UX) |
| TC-252 | Talking Avatar from the audio toolbar: no By Text / By Voice | ISS-AWA-23 (PM, UX) |
| TC-272, 273, 278, 279 | Leaving Text to Image drops the photo selection | ISS-AWA-24 (PM, UX) |
| TC-283, 289 | AI Cartoon / AI Sketch results not in My Artwork | ISS-AWA-25 (PM) |
| TC-284, 285, 290, 291 | Back at the AI Cartoon / Sketch photo step: empty editor | ISS-AWA-26 (PM, UX) |
| TC-295, 301, 307, 313, 319, 325, 331, 337 | No AI label in the editor preview (Q-10); export manifest (Q-13) | left off: DRA262611P0224, DRA262611P0322 |
| TC-296, 297, 302, 303 | Leaving Text to Speech keeps the added title | ISS-AWA-27 (PM, UX) |
| TC-314, 315 | Closing AI Voice Changer (Audio menu) leaves the main clip selected | ISS-AWA-28 (PM, UX) |
| TC-343, 351, 359 | No music dialog; songs without a manifest | left off: DRA262611P0229, R2 ISS-AWA-17 |
| TC-367 | Back from the Menu's My Artwork: Home, Menu closed | ISS-AWA-29 (PM, UX) |
| O-17 | Pro tab's My Artwork has no side margin | ISS-AWA-30 (PM, UI) |

Blocked: TC-215 – TC-219, TC-221 – TC-225 (test-data: no AI Remove / Video Object Removal on Android, KP-082);
TC-344/345, 352/353, 360/361 (defect upstream, DRA262611P0229).

## Credits
2074 → 1505 (spent 604, +35 Pro trial giveaway): E1-a 179 (T2I 3, VEbC 4 × 30, I2V 2 × 25, AI Art 6), E1-b 174
(Cinematic Reel 3 × 48, T2V 30), E1-c 109 (AI Anime 2 × 40, Talking Avatar 2 × 10, AI Art 6, T2I 3), E1-d 10 (T2I
2 × 3, TTS 2 × 2), E1-e 2 (TTS), E1-f 130 (I2V Kling O3 4 × 25, AI Music 3 × 10). Failed tasks (O-1, O-5) charged
nothing.

## Time and tokens
Wall 5 h 31 m (09:35–15:05Z), test time 5 h 31 m, no idle gap over 15 min (`run-log.ts time`). Claude tokens in the run
folder's `tokens.jsonl` (plan page build at the wrap-up): 1,757 messages, input 3,972, cache write 2.54 M, cache read
422.9 M, output 0.70 M. Account usage card (shared, upper bound; `runs/usage.jsonl`): weekly 69 % at E1-a start → 78 %
at E1-f start; the E1-f end reading is the orchestrator's.

## Open questions
| Q | Outcome | Where |
|---|---|---|
| Q-22 | **to-file**: drafted ISS-AWA-20 (PM); presence recorded for every place (most present; VEbC / CRC placement and AI Remove differ) | `question-status.json` |
| Q-10 | **filed**, DRA262611P0224 (still no preview label from every editor entry) | `question-status.json`, `dedupe.txt` |
| Q-13 | filed, DRA262611P0322 (same manifest on the eight editor-entry exports) | `question-status.json` |
| Q-6, Q-20 | filed, DRA262611P0229 (no music dialog from three editor entries) | `question-status.json` |
| Q-8 | not reached (music dialog missing; TC-344 – TC-361 Blocked) | `question-status.json` |
| Q-11 | determined (unchanged); E1 adds: AI Style Transfer is back in the editor, its results not in My Artwork (ISS-AWA-25) | `question-status.json` |
| Q-2, Q-3, Q-9, Q-17, Q-19 | determined (unchanged) | |
| Q-1 | filed, DRA262611P0227 (unchanged) | |
| Q-14, Q-16 | not reached (unchanged; no row) | |
| Q-4, Q-7, Q-12 | not touched by E1 rows | |

New questions from the entry pass (no Q-id yet) went straight to PM as ISS-AWA-21 – ISS-AWA-29; the next draft should
give each a Q-id and its row.

## eBug drafts
`ebugs/2026-11-26-e1/20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0.md`: 11 entries, all BugBelong PM (ISS-AWA-20 –
ISS-AWA-30: 8 `[AIAgent][UX]`, 2 `[AIAgent]` Functional, 1 `[AIAgent][UI]`). Format check 0 errors (6 warnings:
severity 4 is rare). Dedupe (Android pool, `dedupe.txt`): no duplicate; 11 failed rows left off as repeats of
DRA262611P0224, P0322, P0229 and the unfiled R2 ISS-AWA-17. Review page
`ebugs/2026-11-26-e1/20261126_eBug_review_AIGC-Watermark-E1_16.9.0.html` (TR261125-0064 from the drafts; confirm).

## Coverage
`coverage-page.ts pdr/aigc-watermark android --draft 20261126-111601 --runs 2026-11-26-e1-entries`: controls 0
pressed, 9 not run, 32 n/a; arrows 10 not run; notes 32 (18 not run, 14 n/a); 0 taps. The E1 rows are entry passes of
other tools, which the feature's control trace (the AIGC switch, its info sheet, the two dialogs) does not hold, and the
Android client writes no `taps.jsonl`, so nothing is proven pressed by this phase.

## Observations
O-1 – O-18 in `observations.md`. E1-f added O-16 (system Internet panel once; banner Back path), O-17 (Pro tab's My
Artwork without side margin → ISS-AWA-30), O-18 (each share tap re-saves the Image to Video file). For the next draft:
O-14 (AI Style Transfer back in the editor: TC-073 – TC-078 can run), the Music-library return of TC-362 / TC-363.

## Knowledge
Nothing new parked in E1-f beyond the observations; the inbox is processed separately (not done here).

## Local run media
Moved to Trash `run-media-prune-20261126/pdr-spec-casebook/`: 1,695 files, 1.57 GiB (R1 full 1,347 MB, recheck-2611171
9 MB, MUI 86 MB, R4 166 MB). Kept: this run (E1) and R3 (the newest complete full run; its media were never on this
computer). Small text, logs ≤ 1 MiB and Git-tracked files stay.
