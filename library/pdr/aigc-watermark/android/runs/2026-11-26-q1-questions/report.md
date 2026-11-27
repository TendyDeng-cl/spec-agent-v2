# AIGC Watermark Android — Q1 report (question round: rows that observe Open questions)
- Build 16.9.0 (2611231), Stage (yellow Launcher bar). Phone Samsung SM-A5360 (R5CTB22S05Y), USB. Account
  cltqauiap2@gmail.com, **Free** (Mine 「Free」 「Claim offer」; the brief said Pro, which neither row depends on).
  Draft 20261125-190000, phase Q1, segment Q1-a. 2026-11-26 10:54–11:08 (15 min wall, no idle gap). Credits
  29801 → 29731 (70: one Kling 4.0 Image to Video, 5 s). Nothing filed, uploaded, commented or committed.
- 「Remove AIGC Watermark」 was already On at the start (read back 10:55) and is On at the end (11:05): nothing to
  restore. Phone left on the Launcher, Wi-Fi on. Logs: `logs/Q1-a-20261126-110539/` (libclc2pa.so loads at the 11:01
  export; nothing failed).

## Tally
**1 Pass, 1 Fail (question), 0 Blocked, 0 Not run, 0 Inconclusive.**

| Row | Question | Result | What was seen |
|---|---|---|---|
| TC-157 | Q-13 | Fail (question) | c2patool on the R3 exports TC-065 (TTS, Off), TC-071 (AI Anime, Off), TC-066 (TTS, On): each carries one CyberLink-signed manifest, one `c2pa.created` with compositeWithTrainedAlgorithmicMedia, no ingredient, Valid (untrusted cert only). The On file equals the Off one but for IDs and hash. Files copied to `files/` with their `.c2patool.json`. |
| TC-158 | Q-19 | Pass | New Kling 4.0 Image to Video result, never saved, opened with 「Full Editor」, switch On: no AI label in the preview (recording 0–4.9 s), 「Export」 went straight to the Produce sheet, the file (1080 × 1920, 5.14 s) has no label at 0.0 / 1.9 / 2.1 s. Its c2patool reading is the same CyberLink manifest as TC-157's. |

## Open questions (every one of the Android table)
| Q | Outcome | Where |
|---|---|---|
| Q-13 | **filed** (drafted ISS-AWA-19, PM, Functional; was `to-file`) | TC-157; `ebugs/2026-11-26-q1/` |
| Q-19 | **determined** (export follows the switch; was `not-reached`) | TC-158 + TC-083 (R3) |
| Q-2, Q-3, Q-9, Q-11, Q-17 | determined (unchanged, R3) | `question-status.json` |
| Q-6, Q-20 | filed, DRA262611P0229 (unchanged) | `question-status.json` |
| Q-1, Q-10 | filed, DRA262611P0227 / DRA262611P0224 (unchanged, `ebugs/2026-11-23-r3/dedupe.txt`) | |
| Q-8 | not reached (music dialog missing, DRA262611P0229; TC-128 Blocked); not in this phase | `question-status.json` |
| Q-14 | not reached (PM pptx never supplied); no row | `question-status.json` |
| Q-16 | not reached (no result under 2 s); no row | `question-status.json` |
| Q-4, Q-7, Q-12 | unchanged by this phase (no Q1 row) | |

## eBug drafts
`ebugs/2026-11-26-q1/20261126_eBug_drafts_AIGC-Watermark-Q1_16.9.0.md`: 1 entry, ISS-AWA-19 (Q-13), 「Projects with AI
content export with a C2PA manifest marking the whole video as AI」, `[AIAgent]` Functional, BugBelong PM, S3. Format
check 0 errors. Dedupe (Android pool): no same-OS ticket (`dedupe.txt`). Review page
`20261126_eBug_review_AIGC-Watermark-Q1_16.9.0.html` (no TR known for 2611231: confirm before filing).

## Knowledge
Parked I-003 (product inbox): editor exports with AI content carry the CyberLink manifest with the switch Off and On.
No entry was contradicted.
