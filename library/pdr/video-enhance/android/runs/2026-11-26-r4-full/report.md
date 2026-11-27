# Video Enhance Android — R4 report (table v16, full run on a clean install)


- **Build:** PowerDirector Mobile for Android 16.9.0 (2611251), `CL_Deluxe.16.9.0.2611251_DRA261109-01_R8` (SR DRA261109-01), APK MD5 checked; 2611231 uninstalled and 2611251 installed at setup. **TR:** TR261125-0064.
- **Server:** Stage. **Phone:** Samsung SM-A5360, Android 15, USB, Wi-Fi 17F_QA_Wifi_5G. **Account:** cltqauiap2@gmail.com (Google button, no password).
- **Table:** Android v16, draft 20261126-170000, phases.json R4 (246 rows, 12 segments). **When:** 2026-11-26 16:10 → 2026-11-27 04:18 (UTC+8). **Status:** nothing filed, nothing committed.

## Final tally

**141 Pass, 94 Fail, 11 Blocked, 0 Not run** (246 rows). Fail: 50 defect, 44 question. Blocked: 6 test-data (4 low balance, TC-268, TC-352 / O-27), 5 observability (server-failure rows, KP-003).

| Segment | Rows | Pass | Fail (defect / question) | Blocked |
|---|---|---|---|---|
| R4-a Entry points, Demo, Add Media | 25 | 14 | 11 (4 / 7) | 0 |
| R4-i Free rows, Pro purchase | 5 | 5 | 0 | 0 |
| R4-b Panel layout and trim | 30 | 16 | 14 (3 / 11) | 0 |
| R4-c Defaults, chips, Mode limits | 28 | 26 | 2 (2 / 0) | 0 |
| R4-d Price, eligibility, credit pack | 11 | 5 | 2 (2 / 0) | 4 |
| R4-d2 Price grid | 36 | 36 | 0 | 0 |
| R4-e Generating, cancel, background, notifications | 20 | 15 | 5 (2 / 3) | 0 |
| R4-f Recent task, Result, failure | 23 | 11 | 6 (6 / 0) | 6 |
| R4-g1 Standard combinations | 18 | 0 | 18 (17 / 1) | 0 |
| R4-g2 Professional combinations | 18 | 0 | 18 (2 / 16) | 0 |
| R4-h Timeline entry | 10 | 7 | 3 (0 / 3) | 0 |
| R4-j Other entry points | 22 | 6 | 15 (12 / 3) | 1 |

## Compared with R3 (2611231) and Q1

| R3 → R4 | Rows | Which |
|---|---|---|
| Fail → Pass | 45 | TC-023, TC-033, TC-046, TC-217, TC-263, TC-274, TC-278 – TC-313, TC-118, TC-140, TC-208 |
| Blocked → Pass | 2 | TC-119, TC-120 |
| Blocked → Fail | 1 | TC-211 (first reached; Q-20) |
| Pass → Fail | 2 | TC-035 (Design redrawn), TC-260 (padded length now shown) |
| → Blocked | 4 | TC-170, TC-171, TC-173, TC-210 (no natural server failure this time) |
| Fail → Fail | 73 | same causes |
| Pass → Pass | 86 | |
| Blocked → Blocked | 6 | TC-096, TC-098, TC-207, TC-320, TC-174, TC-268 |
| New since R3 | 27 | 8 Pass, 18 Fail, 1 Blocked |

- **Fixed on 2611251:** P0075 (shown length rounds up; 36 price-grid rows), P0074, P0087, P0231, P0232, P0081 / P0082 on the panel-icon path (auto-opened path still to the Launcher, TC-141), P0073 (fps badges, O-3 / O-26), P0098, P0230.
- **Still failing:** all on open Android tickets (`ebugs/2026-11-26-r4/dedupe.txt`), incl. P0236 (TC-112, 92.5 MB not done in 52 min), P0208 / P0113 (Q-27, TC-371 – TC-374), P0084, P0100, P0076, and PM rulings P0096 / P0097 / P0088 / P0325.
- **New:** Mode bubble wording (TC-035 + 3 entry rows), Back on the notification prompt (TC-211), no ⓘ by Selected Length within the limit (O-10), padded length shown (TC-260 / TC-353 / TC-358 / TC-365, P0076's cause). Q1's TC-350 / TC-351 behave as on 2611231.

## eBugs: 3 new, filed 2026-11-27 on TR261125-0064

Filed over the API on template Generic v16.9: ISS-VEA-60 → DRA262611P0338 (Sev 2, RD), ISS-VEA-61 → DRA262611P0339 (Sev 3, PM, Q-20), ISS-VEA-62 → DRA262611P0340 (Sev 3, RD); they replace P0335 – P0337, first filed into 「AIFound eBugs pool」 by mistake and cancelled. `ebugs/2026-11-26-r4/`: `20261127_eBug_drafts_Video-Enhance-R4_16.9.0.md`, review page `20261127_eBug_review_Video-Enhance-R4_16.9.0.html`. Format check 0 errors, 1 warning; verify: only the usual 「unknown sheet」 / 「Basis」 notes. TR set to **pending** (TR261123-0070 is 2611231's).

| # | ISS | Finding | Type · Owner |
|---|---|---|---|
| 1 | VEA-60 | Mode bubble 「up to 8 min」 / 「up to 2:30」, not 「up to 08:00」 / 「up to 02:30」 (3300:32003) — TC-035, TC-354, TC-360, TC-367 | [UI] · RD |
| 2 | VEA-61 | System Back does nothing on 「Turn on notifications」 (Q-20) — TC-211 | [UX] · PM |
| 3 | VEA-62 | No ⓘ by 「Selected Length」 within the Mode limit (R-020) — TC-354, TC-360, TC-367, TC-033, TC-259 | [UI] · RD |

Dedupe: 218 candidates, 64 open on 16.9.0, none matches. Held: O-24 (Save Result while loading; logcat shows a toast call after the tap; recheck). Not drafted: TC-112 → P0236, TC-371 → P0208, TC-144 → P0097 (PM Close), TC-141 → P0081 (for its verify), TC-260 group → P0076.

## Open questions (all settled: 0 open, 0 not reached)

Filed: Q-1 P0086, Q-10 P0099, Q-11 P0100, Q-13 P0089 / P0101, Q-14 P0326 (still holds), Q-16 P0095 (failure push not reached), Q-18 P0079 (changed: Home no longer ends the task), Q-20 P0339, Q-24 P0090 (Fail), Q-27 P0113 / P0208, Q-30 P0100. Determined: Q-2, Q-8 (P0097 ruling), Q-17, Q-28 (changed: P0325 Cancelled by PM, behaviour stands), Q-29, Q-33, Q-34 (not reproduced). Rows to change at the next draft: TC-144, TC-350, TC-371 – TC-374, the Manage steps of TC-355 / TC-361 / TC-368, TC-352's precondition.

## Credits and purchases

Charged ≈ 1,644 (R4-i 2, c 20, e 212, f 45, g1 209, g2 1,008, h 124, j 24); refunds +180 (22:54) and +4 (00:00). Pro test subscription bought 17:37:47, 21:16:12, 00:51:35 (lapses after ~3 h 35 min), 500-credit pack 19:06:29, all on the Play test sheet. Balance 29,272 → 28,656.

## Time, tokens, usage, coverage

- Wall 12 h 07 m, test 11 h 16 m, idle 51 m (2 gaps).
- Tokens: 2,008 messages; input 4.4 k, cache write 5.30 M, cache read 429.4 M, output 838 k; 53.8 M weighted.
- Est. from token rate: ≈ 435 % of a 1× Pro 5-hour window, ≈ 73 % weekly; ≈ 70 % / 12 % of the 6.25× seat. Account total (upper bound) 744 % / 131 % Pro-%.
- Coverage: controls 71 ran, 7 blocked, 50 n/a; arrows 31 ran, 4 blocked; notes 99 / 112 (68 ran, 7 blocked, 24 n/a); board images 11 / 12.

## Local run media

2,658 files, 1,498.1 MiB to the Trash under `run-media-prune-20261127/pdr-spec-casebook/`: R3 2,475 / 1,380.1 MiB, R3 upload recheck 77 / 59.9, Q1 106 / 58.1 (PNG 830.8, MP4 457.7, logs over 1 MiB 209.5). The user empties the Trash.

## Knowledge

Subagent (domain-knowledge): corrected KF-008, KF-001, KF-014, KF-006 (+ KF-003 / 004 / 005 / 010 / 013, KP-068, KP-071, KP-093); KF-011 superseded by KF-016; added KF-017 – KF-022, KP-136, KP-137 (I-004 closed); verified KF-002, KF-007, KP-070, KP-072, KP-074; `--check` passes (131 entries, I-003 open).
