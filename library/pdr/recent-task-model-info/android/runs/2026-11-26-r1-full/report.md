# Recent Task Model Info (Android) — R1 full run of approved v3 — report

Run folder `runs/2026-11-26-r1-full/` · plan `runs/RUN-PLAN-20261126-R1.md` · draft `drafts/20261126-111212/phases.json` · 2026-11-26 23:15 → 2026-11-27 02:18 (UTC+8) (REQ-005). Build 16.9.0 (2611251), TR261125-0064 (Play internal test) · Stage · Sony XQ-BT52 (HQ61563393, Android 12, dark, font 1.15, density 460) · acda.test7 (Pro until the test subscription lapsed 00:35, then Free; no later row needed Pro). Credits 1505 → 218 (1287 spent; no generation failed, no refund to check).

## Tally (128 rows, MUI aside)
| Result | Count | Cases |
|---|---|---|
| Pass | 78 | every row not listed below |
| Fail | 39 | `defect` 8: TC-035, 037, 043, 076, 080, 101, 123, 137 · `question` 31: TC-045, 077, 081, 084, 085, 088, 089, 095, 097, 100, 102, 109, 110, 111, 113, 114, 117, 119, 122, 124, 125, 131, 133, 136, 138, 139, 147, 148, 151, 152, 153 |
| Blocked | 11 | `test-data`: TC-030, TC-144 (no Text to Video template), TC-038 (no failed I2V task, no fault switch), TC-126–128, TC-140–142 (no Text to Image tile/card on Home), TC-154, TC-155 (no Text to Image completion banner) |

| Segment | Rows | Pass / Fail / Blocked | Test time |
|---|---|---|---|
| R1-a My Artwork, model tags, long names, no-model cards, card states | 39 | 35 / 2 / 2 | 33 m |
| R1-b Persistence, appearance, Back, Mine / ☰ / tool / editor Global entries | 40 | 25 / 15 / 0 | 54 m |
| R1-c Editor Photo/PIP Tools, Home shortcut, AI-Powered Creation, What's Trending | 38 | 14 / 17 / 7 | 1 h 02 m |
| R1-d Completion banner (I2V, T2V, TTI) | 11 | 4 / 5 / 2 | 34 m |

## Findings
The tag itself works: every I2V (10 models) and T2V (9) task shows its own model as the picker names it, in every state, after relaunch and from every entry; templates, Cinematic Reel and other features show none; pre-tag tasks show no line; cards 120 dp.
- Defects (RD): Recent page dark in light mode (TC-043, ISS-RTM-01); closing a Text to Image item from My Artwork skips its list (TC-076/080, ISS-RTM-02); T2V ‹ after Generate skips the tool page (TC-101/123/137, ISS-RTM-03). No Select All (TC-035/037) = DRA262609-0033, same OS, not drafted.
- PM decisions: Back in edit mode leaves the page (Q-5, 13 rows, ISS-RTM-04); tag tap opens the result (12 rows, ISS-RTM-05); editor selection cleared after Text to Image (Q-10, ISS-RTM-06); PIP entry name 「Text to Image」 vs sheet 「AI Text to Image」 (TC-111, ISS-RTM-07); banner-opened Recent tasks have only Home, Back to Launcher (TC-148/152, ISS-RTM-08); ☰ › My Artwork no way back to the Menu (TC-081, ISS-RTM-09).
- Not raised: TC-125/139 (Home CMS lists, KP-012), TC-153 (Text to Image runs foreground only, no completion message).
Observations O-1 – O-22 (R1-d: O-19 banner held on the tool's own pages, O-20 Home-only button on the banner path, O-21 TTI foreground only, O-22 Select All dedupe).

## Open questions (../question-status.json)
Q-1 determined (no TTI tag) · Q-2 determined (no line on pre-tag tasks) · Q-3 determined (I2V templates no tag; no T2V template exists) · Q-4 not reached (no name long enough to cut on the Sony at largest font/display) · Q-5 filed (draft ISS-RTM-04) · Q-9 determined (same list/tags, ‹ one step, project unchanged; T2V skip = ISS-RTM-03) · Q-10 filed (drafts ISS-RTM-06, 07).

## eBugs
`ebugs/2026-11-27-r1/`: 9 drafts, nothing filed — RD 3 (01 [UI], 02, 03 Functional), PM 6 (04, 05, 06, 08, 09 [AIAgent][UX]; 07 [UI]). check_ebug_format.py 0 errors / 1 warning. verify_ebug_drafts.py (verify.txt) flags [AIAgent][UX] and wants a `Basis:` line; it predates the 2026-11-11 rule and a `Basis:` line makes check_ebug_format fail, so the format check is the gate. Dedupe: only DRA262609-0033 left off; the 4 open 16.9.0 Recent-task tickets are AI Video Enhance. Review page `20261127_eBug_review_Recent-Task-Model-Info-R1_16.9.0.html` (not opened).

## Analysis gaps for the next draft
- Wan 3.0 is in both pickers but no row generates with it in Image to Video (O-3; R-012's I2V list lacks it).
- Error-state card (O-1): sad-planet + 「View Details」 vs the Design's failed (「Error」 + 「Retry」) and nsfw states: settle with the Design, add a row.
- Entries the build lacks: TC-125 / TC-139 (CMS lists, KP-012) and TC-153 – TC-155 (TTI has no banner, foreground only): drop or rewrite.
- Banner path: R-099's ‹ assumption is wrong (Home only, ISS-RTM-08); the banner is held while the tool's own pages are open (O-19), so rows must wait on another screen.
- Rows say 「Manage」; the I2V/T2V Recent pages read 「Select」 (O-7); only the TTI tool history says 「Manage」 (O-10).

## Coverage
coverage-page.ts ran (android/coverage.html, local) but counts 0 taps (controls 11 not run / 16 n/a, arrows 2 not run, notes 0/21): device-android.ts writes no taps.jsonl, so the Android run has no tap log; control coverage is in the result texts only.

## Time, tokens, usage
Wall 3 h 02 m, test 3 h 02 m, idle 0. Tokens (token-usage.ts since 15:10Z; four segment subagents + orchestrator transcript in full, an upper bound): 693 msgs, input 1,530, cache write 989,717, cache read 137,664,199, output 270,794. Usage (seat 6.25): R1-a start 5 h 39 % / weekly 79 %; R1-c end 5 h 8 % / weekly 82 %; R1-d end reading is the orchestrator's.

## Housekeeping
Phone as found (dark, 1.15, 460); app on AI Magic; logcat stopped; logs R1-a … R1-d pulled. First run folder: nothing to trim. Knowledge I-024 – I-030 parked (inbox not processed).
