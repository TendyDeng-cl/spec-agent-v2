# Cinematic Reel Recommendation (Android) — R1 full run of approved v1 — report

Run folder `runs/2026-11-24-r1-full/` · plan `runs/RUN-PLAN-20261124-R1.md` · 2026-11-24.
Build 16.9.0 (2611201), TR261123-0015 (Play internal test track) · Stage · Sony XQ-BT52 (HQ61563393, Android 12) ·
acda.test7 (Free) · credits 2424 at start and end (no charge; logcat `totalRemain=2424` throughout).

## Tally (21 rows)
| Result | Count | Cases |
|---|---|---|
| Pass | 12 | TC-001 – TC-009, TC-020, TC-017, TC-018 |
| Fail | 6 | TC-010 – TC-015 (`question`) |
| Blocked | 3 | TC-019 (`observability`), TC-016, TC-021 (`question`, upstream) |

Per segment: R1-a 11 rows (10 Pass, 1 Blocked) · R1-b 8 rows (6 Fail, 2 Blocked) · R1-c 2 rows (2 Pass).

## Fail and Blocked, with disposition
- **TC-010 – TC-015 Fail, `question` (Q-1).** Add Media (from 「Import a photo」 on each of the 6 cards) has only ‹,
  「Add Media」 and a camera button in its header; no 「?」/ⓘ/tips entry anywhere in the room. The entry comes from
  Jira PDRA-661 only (Design 26.07_v2 draws Add Media without it): to PM for a decision, `[AIAgent][UX]`, BugBelong PM
  (plan › Judging). One finding, not six.
- **TC-016, TC-021 Blocked, `question` (upstream TC-011 / Q-1).** No sheet can be opened from Add Media, so its 「Got
  it」 and system Back there cannot be tested. Rerun once Q-1 is decided.
- **TC-019 Blocked, `observability`.** The app logs no CMS `recommend_samples` / template data and its files are not
  readable over adb; the two sheets shown did match the CMS Recommendation tab. Parked (needs: cms-log).

## R1-c (language)
- TC-017 繁體中文: sheet names 「微電影畫境」; headings 「建議」 / 「避免使用」; captions 「中距離取景」, 「畫面視覺豐富」,
  「平面單調構圖」, 「有明顯文字或 Logo」, 「過度近景」; button 「瞭解」. All whole. Pass.
- TC-018 日本語: sheet names 「マイクロシネマ」; headings 「推奨」 / 「NG」; captions 「中距離の構図」, 「細部が多い」,
  「平面的な構図」, 「文字またはロゴが見える」, 「超クローズアップ」; button 「OK」. All whole. Pass.
- In both, the sentence frame (「For best results with the … template, follow this advice:」) and the card chip
  「View photo tips」 stay English (Q-2: recorded, not failed; O-3). `locale reset` → en-US; English Launcher read back.

## Observations
- O-1: system Back from Add Media returns to the template page on the same card (6/6).
- O-2: Add Media opens on 「All」; Android has no 「Recents」 tab → TC-016 wording for Android once Q-1 is decided.
- O-3: zh-Hant / ja sheets mix languages (English chip and sentence, localized headings, captions, button);
  Japanese captions show although the CMS JP column is empty. For PM together with Q-2.
- O-4 (tool): the ja system-locale switch made Google Play show its restart dialog over the app; 「再起動」 + `activate`.
- Setup: the 「What is Cinematic Reel Creator?」 tutorial showed once on first entry (fixture said dismissed); closed with X.

## For the orchestrator (nothing drafted or filed)
Candidate eBug: Add Media has no photo tips 「?」 (TC-010 – TC-015) → PM decision. Possibly O-3 (mixed language in
the sheet) → PM with Q-2. Waiting for the user.

## Coverage
`android/coverage.html` (`coverage-page.ts … --runs 2026-11-24-r1-full`): controls 3 ran / 83 n/a, arrows 2 ran / 12
n/a, notes 0/12; taps 0 because `device-android.ts` writes no `taps.jsonl` (presses are matched from results only).

## Time and usage
- `run-log.ts time`: test time 0h 29m (R1-a 7 m, R1-b 12 m, R1-c 10 m); wall 3h 27m including a 17 m idle gap in R1-a
  and the long gap before this wrap-up (network error in the orchestrator).
- `runs/usage.jsonl` (seat 6.25× Pro): R1 start 03:03 UTC 5-hour 18 %, weekly 14 %; R1-a end 03:29 5-hour 21 %, weekly
  14 %. No later reading was logged (the orchestrator reads the card). Account is shared: upper bound only.

## Knowledge
Inbox empty and no observation names an entry: knowledge step skipped. O-4 is a candidate quirk for the next intake.

## Logs
`logs/R1-a-20261124-112848`, `logs/R1-b-20261124-114030`, `logs/R1-c-20261124-115041` (sliced; no failure, toast or charge).
