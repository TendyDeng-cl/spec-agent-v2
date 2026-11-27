# AI Mini Drama Android — Q1 report (question round: rows that observe Open questions)
- Build 16.9.0 (2611231), Stage (yellow Launcher bar). Phone Samsung SM-A5360 (R5CTB22S05Y), USB, Wi-Fi
  17F-QAAPP-2.4G. Account cltqauiap2@gmail.com, **Free** (Mine 「Free」 「Claim offer」 at 11:11; an earlier brief said
  Pro, which none of the rows depends on). Draft 20261125-190000, phase Q1, segment Q1-a. 2026-11-26 11:10–12:04
  (54 min wall, no idle gap). Nothing filed, uploaded, commented or committed.
- Credits 29731 → 29242 (489): storyboard ◆39 (TC-581), Standard Preview - 30 sec ◆150 (TC-582), 「Create the rest of
  the video (60 sec)」 ◆300 (after TC-582, run step 9). Each charge equals its quote; nothing failed, no refund due.
- The Play store account was not changed (TC-580 records the side it saw). History was empty at the start; it now holds
  one drama, 「After Closing」 (template; storyboard, preview and rest of the video done; 「Create Next Episode」 not
  taken). Debug info was turned on only to export that session (`exports/`, KF-055) and is off again. Phone left on
  the Launcher, Wi-Fi on, nothing generating. Logs: `logs/Q1-a-20261126-120254/` (log-slice.ts reads no Android
  logcat; the logcat was read by hand: no `workflow step failed`, no refund).

## Tally
**0 Pass, 3 Fail (question), 0 Blocked, 0 Not run, 0 Inconclusive.**

| Row | Question | Result | What was seen |
|---|---|---|---|
| TC-580 | Q-18 | Fail (question) | Play › Account and device preferences › 「Country and profiles」 names no current country, only 「Switch to the Taiwan Play Store」; credit packs priced NT$330 – NT$6990 (logcat Play prices NT$ too). Landing 「Start from a template」 6 templates; More 5 categories, 20 templates (Workplace Romance 5, Fantasy & Destiny 5, Urban Romance 4, Family & Life 4, Animated Stories 2; logcat 「accumulated=20」). Side seen: Stage, NT$ billing (not US / JP). Missing: a confirmed US or JP store, Production. |
| TC-581 | Q-5 | Fail (question) | Template 「After Closing」 storyboard (◆39, 880 s). From the Storyboard Result to 「Choose your video settings」: no assistant message between the cards, before or after the 0:52 Storyboard Preview played to its end; 「Every frame is done. Ready to create your video?」 not shown. |
| TC-582 | Q-5 | Fail (question) | Preview generated for the row (Standard 30 s ◆150, 648 s): 「I'll create a video — give me a moment...」 / 「Preparing the video generation.」 → 「Here's your drama.」 + video card → 「Looking good! Ready for the full video?」 above 「Create the rest of the video (60 sec)」 ◆300 (R-075 expects 「Create the full episode (90 sec)」; 60 s = DRA262610P0159, PM, Close). The rest of the video (run step 9) ended with 「Ready for the next episode?」. The string showed nowhere; the exported session holds it nowhere. |

Observations (`observations.md`): O-1 premature 「Created the 6-scene storyboard for After Closing.」 (same-OS
DRA262610P0174, open); O-2 video quotes 7 / 5 / 3 credits a second with no reference-audio part (Standard Preview
◆150, Full ◆450; the Stage feature list returns the same), held for TC-080 and a fresh read of the Credit System forms;
O-3 storyboard 880 s; O-4 「… is ready」 banner over the chat while its video still generated (same-OS
DRA262610P0379, open); O-5 the rest of the video, 721 s, ◆300.

## Open questions (every one in the Android table's `question-status.json`)
| Q | Outcome | Where |
|---|---|---|
| Q-5 | **filed** (drafted ISS-AMDA-72, PM, `[AIAgent][UI]`; was `to-file`) | TC-581, TC-582; `ebugs/2026-11-26-q1/` |
| Q-18 | **filed** (drafted ISS-AMDA-71, PM, `[AIAgent][UX]`; was `to-file`) | TC-580; `ebugs/2026-11-26-q1/` |
| Q-19 | not reached (no 「More ideas +」 chip on 2611231 either, DRA262610P0380; TC-019 not in this phase); note updated | `question-status.json` |
| Q-1 – Q-4, Q-6 – Q-17 | determined (unchanged) | `question-status.json` |

The Android-only questions Q-A1 – Q-A25 are not in `question-status.json` (requirements.md: not read by the tooling)
and no Q1 row observes them; unchanged by this phase.

## eBug drafts
`ebugs/2026-11-26-q1/20261126_eBug_drafts_AI-Mini-Drama-Q1_16.9.0.md`: 2 entries, both BugBelong PM, S3:
- ISS-AMDA-71 (Q-18) 「Templates show on a non-US/JP store; PM's US & JP day 1 limit is undefined」, `[AIAgent][UX]`.
- ISS-AMDA-72 (Q-5) 「「Every frame is done. Ready to create your video?」 never shows in the chat」, `[AIAgent][UI]`.

Format check 0 errors (`check.txt`). Dedupe, Android pool (488 tickets, `dedupe.txt`): neither entry has a same-OS
ticket; O-1 and O-4 repeat open same-OS DRA262610P0174 and DRA262610P0379 and are left off. Review page
`20261126_eBug_review_AI-Mini-Drama-Q1_16.9.0.html` (no TR known for 2611231: confirm before filing).

## Coverage
`coverage-page.ts` for this run: 0 taps logged (Android taps are not written to taps.jsonl); controls 315 not run /
68 n/a, arrows 211 not run / 47 n/a: this phase observes questions only.

## Knowledge
No entry was contradicted; nothing parked. Used and found true: KF-053 / KF-054 / KF-055 (debug info and session
export), KP-005 (yellow Stage bar), KP-092 (totalRemain matches the pill).
