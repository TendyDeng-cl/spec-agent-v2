# Batch Editing Android — Phase R4 report (table v9, full run on the TR261118-0070 build) — final

Plan `runs/RUN-PLAN-20261120-R4.md` · approved table v9 (177 rows, `drafts/20261118-101500/phases.json` R4) · run folder `runs/2026-11-20-r4/` · 2026-11-20 · REQ-022. Nothing filed, uploaded, commented or committed.

## Environment
- PhotoDirector for Android 20.19.0.v202611181947 (versionCode 90201901), SR PHA261029-01, TR261118-0070 (R5) — About read in R4-a · Test Server
- Samsung Galaxy S23 (SM-S9110, RFCW2198L7B), Android 16, 1080 × 2340, USB, Stay awake · Appium / UiAutomator2 port 4724, one server
- Tier: Premium through About › debug 「Set to subscriber」 (KP-131), checked at every segment start (Mine 「Hello VIP!」, credits 21 all run, no charge); TC-173 and R4-g ran as Free, Premium restored after each. Nothing bought.
- Photos: Sample Photos and 00PHDa_Testing_Material (recipes `pick12-sample`, `pick12-testing`), Section 3 stand-ins ① – ④ in 「Casebook」 (`pick4-casebook`, `crop-reopen`)
- Figma change check 2026-11-20 before the run: unchanged (Design 9 boards, PM 25).

## Release notes (REQ-022): what this build shows
| Release note | Rows | Verdict on this build |
|---|---|---|
| 「Updated the AI Enhance confirmation dialog to the banner style」 | TC-086, TC-097, TC-144, TC-157 and every row opening the confirmation | Not a banner: still a centred modal card (90,930, 900 × 443 px, room dimmed) with the table's texts 「Enhance N photos?」 / 「Processing takes a moment and cannot be canceled once started.」 / 「Cancel」 「Start」. Only its look changed: pill buttons (「Cancel」 outlined, 「Start」 filled peach) instead of R3's flat text buttons — what the Design board design-dark-enhance draws, so Pass as written, no style question (O-1). Taps behind and outside are ignored; Cancel and system Back close it with nothing processed. 「Discard changes?」 keeps the old flat style (for Design / PM, not raised). |
| 「Fixed "All" remaining enabled on photos without their own edits」 — PHA262026P0120 | TC-162 (Crop & Rotate), TC-164 (Adjustment); also TC-153, TC-042, TC-063, TC-075, TC-165 | **Fixed.** TC-162 and TC-164 Pass (R3 Fail): 「All」 greyed and `els` disabled on photo 2 with no change of its own, normal on photo 1; greyed on entry, after apply and after Redo; a tap on the greyed capsule gives no toast. |
| 「Fixed a Crop & Rotate crash caused by floating-point rounding for certain photo dimensions」 — PHA262026P0125 (S1) | all R4-c rows (① 1706 × 2559, ④ 2730 × 1535), R4-b with 12 gallery photos | **Fixed.** No crash through Custom drags, Square, 3:2 / 2:3 / 3:4, pixel input 1000 × 500 / linked 2000 / 237 / 3000; 0 FATAL EXCEPTION in every segment's logcat, one app pid all R4-c. |
| Also passing now (not in the notes) | TC-110 (P0057), TC-144 (P0058), TC-145 and TC-142's 2nd Back (P0059), TC-060 / TC-126 (P0060) | Home 30 s during AI Enhance pauses and resumes with no NETWORK_ERROR; Back closes 「Enhance 12 photos?」 and 「Discard changes?」; Square saves exact squares (④ 1439 × 1439; R3 1434 × 1435). |

## Results — 177: 154 Pass · 13 Fail · 10 Blocked · 0 Not run (Fail = 1 defect, 12 question)

TC-151 was a table question (Fail) in R4-a; the row was corrected to the Q-13 ruling (REQ-023, table v10) and re-run Pass on 2026-11-20. O-3: system Back with the album list open leaves the picker (noted, not judged).
| Segment | Area | Cases | Pass | Fail | Blocked |
|---|---|---|---|---|---|
| R4-a | Photo Picker and entry | 26 | 23 | 2 (1 defect, 1 question) | 1 (observability) |
| R4-b | Batch Edit Room main, Crop & Rotate | 35 | 34 | 1 (question) | 0 |
| R4-c | Crop rules, Section 3 | 16 | 13 | 3 (question) | 0 |
| R4-d | Adjustment room | 28 | 23 | 5 (question) | 0 |
| R4-e | AI Enhance | 38 | 30 | 0 | 8 (observability) |
| R4-f | Leaving, Save, Batch Save page | 29 | 27 | 1 (question) | 1 (test-data) |
| R4-g | Free user | 5 | 4 | 1 (question) | 0 |
| Total | | 177 | 154 | 13 | 10 |

### Every Fail, its disposition and where it went
| Case | Disposition | Reason | Where |
|---|---|---|---|
| TC-012 | defect | 21st-photo toast 「You can only select 20 photos.」, not 「Please pick at most 20 photos.」 | repeats PHA262026P0061 (Assigned): dedupe.txt |
| TC-022 | question | No 「Batch Edit」 shortcut in the Launcher Features grid (Design 225:3699 draws it between AI Removal and Beautify) | ISS-BEA-23 (PM, UX) |
| TC-062 | question | One Undo after 3:2 + 「All」 keeps photo 1's own 3:2 | repeats PHA262026P0121 (NewCreated, PM): dedupe.txt |
| TC-076 | question | Adjustment: the same (photo 1 keeps Exposure 「0.69」) | repeats PHA262026P0121: dedupe.txt |
| TC-049 | question | ④ held as 「2560 x 1439」; 3:4 box 「1079 x 1439」 vs Section 3's 1151 × 1535 | PHA262026P0122 (its Note and Expect cover the 2560 px copy and the range): dedupe.txt |
| TC-057 | question | 3000 × 3000 refused with 「Width should be between 147 and 2560. Please try again.」 | PHA262026P0122 + P0123: dedupe.txt |
| TC-058 | question | 237 × 237 accepted (Section 3 minimum 238) | PHA262026P0122: dedupe.txt |
| TC-070 | question | No 「AI Exposure」 in the Light row (Design draws it, PM DR-06 says none, Q-18) | ISS-BEA-21 (PM, UX) |
| TC-172 | question | Step 2 cannot be done: no 「AI Exposure」 (Premium) | ISS-BEA-21 |
| TC-173 | question | No 「AI Exposure」 for Free either, so no Upgrade to VIP dialog | ISS-BEA-21 |
| TC-174 | question | 「All」 after 「Auto」 re-runs Auto per photo (photo 3 Exposure 0.55 vs photo 1 -0.43) instead of copying the values | ISS-BEA-22 (PM, UX) |
| TC-128 | question | Batch Save title 「Saved 12 photos」 vs Design 「Save 12 photos」 (Q-20) | ISS-BEA-18, held by the user (2026-11-17): stays held |
| TC-135 | question | Free: interstitial and IAP flyer after batch saves, but no native ad card on the Batch Save page | repeats PHA262026P0124 (NewCreated, PM): dedupe.txt |

Blocked: TC-096, TC-101 … TC-105, TC-109, TC-160 (observability: no partial-failure switch on this build; offline failures TC-106 – TC-108 Pass); TC-152 (observability: still no `phd://` VIEW intent filter, Q-15); TC-136 (test-data: the rating-dialog count needs RD).

Gone since R3: ISS-BEA-17 (TC-100 / TC-142) — both Pass under the REQ-018 ruling. New v9 rows TC-171, TC-175, TC-176, TC-177 Pass.

Logs: R4-a … R4-g pulled and sliced (`logs/R4-<x>-*`); 0 FATAL EXCEPTION in any segment; Fail windows hold only toast lines.

## eBug drafts — `ebugs/2026-11-20-r4/` (3 entries, none filed)
| F | ISS | Cases | Finding | Proposed |
|---|---|---|---|---|
| 1 | ISS-BEA-21 | TC-070, TC-172, TC-173 | Batch Adjustment has no 「AI Exposure」, which every Design Adjustment frame draws (PM DR-06: none, Q-18) | [AIAgent][UX] S3 PM |
| 2 | ISS-BEA-22 | TC-174 | 「All」 after 「Auto」 re-runs Auto on each photo instead of copying photo 1's values (R-092 vs R-240) | [AIAgent][UX] S3 PM |
| 3 | ISS-BEA-23 | TC-022 | Launcher Features grid has no 「Batch Edit」 shortcut that the Design Launcher board draws (Q-15) | [AIAgent][UX] S3 PM |

Format check (`check_ebug_format.py` via `ebug-review.ts`): 0 errors, 0 warnings. `verify_ebug_drafts.py` not used (hangs on Windows walking up to '/', as R1 – R3). Dedupe (read-only, PhotoDirector Mobile for Android): 0 of 3 flagged; the 11 Batch_Editing tickets in the pool, the 7 open on 20.19.0 read against each entry; 8 Fail rows repeat P0061 / P0121 – P0124 and are only in `dedupe.txt`. Review page `ebugs/2026-11-20-r4/20261120_eBug_review_Batch-Edit-R4_20.19.0.html` (local): Creator WILLY_WU, [AIAgent], API from 2026-11-17-tr261113-0038, TRCode TR261118-0070 — each to confirm. To build it on Windows, `scripts/ebug-review.ts` got two fixes (path split on backslashes; `python` in UTF-8 mode instead of the `python3` Store stub); typecheck passes.

## Observations
- O-1: the 「banner」 is the confirmation card restyled with pill buttons as the Design draws it; 「Discard changes?」 keeps the old flat style; not raised.
- O-2: a 20-photo AI Enhance took ≈ 150 s on Test Server (R3 100 s), one photo 10.04 s (KP-070: not an SLA); not raised.

## Coverage
`coverage-page.ts phd/batch-editing android --draft 20261118-101500` → `android/coverage.html` (local, git-ignored): 34/34 board images, controls 57 not run / 45 n/a, notes 126/141 traced. `device-android.ts` writes no `taps.jsonl`, so no press is counted (as R3).

## Knowledge
No open inbox item (`knowledge.ts … inbox`: 0) and no observation names a contradicted entry, so no knowledge subagent ran.

## Time and usage
run-log time: wall 2 h 30 m (06:26 → 08:56 UTC), test 2 h 14 m, idle 16 m in one gap (R4-g worker restart). Per segment: R4-a 20 m, R4-b 20 m, R4-c 13 m, R4-d 20 m, R4-e 29 m, R4-f 17 m, R4-g 14 m.
Claude tokens (`tokens.jsonl`, 803 messages: segment subagents and the orchestrator inside the run's spans; this wrap-up only partly counted): 144.6 M, weighted 17.5 M.
Plan usage: est. from token rate ≈ 142 % of a 1× Pro 5-hour window (≈ 113 % of the 1.25× Team seat), weekly ≈ 24 % of 1× Pro (≈ 19 % of the seat). Account total (shared usage card, seat 1.25): 5-hour 15 % → 94 % by R4-f end (reset before R4-g), weekly 38 % → 51 %.

## Local run media
Per AGENTS.md *Local run media: newest run only*: 1,046 files, 1,050.9 MB of the older runs' media moved to the Recycle Bin as `run-media-prune-20261120/pdr-spec-casebook/…` (R1 434.2 MB, R3 555.8 MB, the 11-17 verify 61.0 MB; R2 had none): screenshots and logcat files over 1 MiB. Git-tracked files, `ebugs/`, `specs/` and small text stayed. Emptying the Recycle Bin is the user's.
