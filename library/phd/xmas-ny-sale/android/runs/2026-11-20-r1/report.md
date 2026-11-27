# Xmas & NY Sale (Android) — phase report, round R1 (table v1)

Run `library/phd/xmas-ny-sale/android/runs/2026-11-20-r1/`, plan `runs/RUN-PLAN-20261120-R1.md`, phases
`drafts/20261120-152114/phases.json` (phase R1, segments R1-a – R1-d). PhotoDirector for Android 20.19.0 (versionCode
90201901), Test Server, Samsung Galaxy A55 SM-A5560 (R5CX30YHZHV) / Android 15. Phone clock moved into each row's date
with adb (REQ-003) and restored to automatic at the end (2026-11-20 17:12). Free / paid only by 「Set to subscriber」;
trial / non-trial by Play Billing Lab. Wrap-up written 2026-11-20 after the usage window reset.

## Tally

| Segment | Rows | Pass | Fail | Blocked |
|---|---|---|---|---|
| R1-a (Xmas start, IAP page, splash and Mine, Credit IAP) | 22 | 9 | 3 (2 defect, 1 question) | 10 (observability) |
| R1-b (interstitial days, non-trial IAP) | 9 | 2 | 1 (defect) | 6 (5 observability, 1 test-data) |
| R1-c (countdown, Xmas → NY, paid user) | 12 | 4 | 4 (3 defect, 1 question) | 4 (2 observability, 2 test-data) |
| R1-d (NY Sale, end of sale, purchases) | 18 | 6 | 2 (defect) | 10 (7 observability, 1 defect upstream, 2 test-data) |
| **R1** | **61** | **21** | **10** (8 defect, 2 question) | **30** (24 observability, 5 test-data, 1 defect) |

0 Not run, 0 Inconclusive. The plan's Status line for R1-a counted TC-010, TC-022, TC-058 and TC-075 as Fail; they
were re-recorded Blocked (observability) under REQ-004, so R1-a now reads 9 / 3 / 10.

Pass: TC-001, TC-030, TC-012, TC-013, TC-019, TC-020, TC-072, TC-065, TC-068 (R1-a); TC-016, TC-018 (R1-b); TC-034,
TC-036, TC-071, TC-062 (R1-c); TC-061, TC-074, TC-037, TC-005, TC-023, TC-066 (R1-d). What works on this build: the
Xmas Santa-hat crown (free users only), the Monthly 15% sale price NT$199 → NT$169 on every entry with the sale SKU
`monthly_subscription_2026_xmas_newyear`, the gold CTA, the trial / non-trial / Monthly policy texts, the countdown
bubble once shown (counts down, survives a relaunch, ends at 00:00:00), the Xmas splash icon and free-user Mine card,
the discount pack names and SKU, the NY pack name, everything back to regular after 2027/01/05, and both test-card
purchases (500-credit pack +500; sale Monthly subscription, cancelled).

## Fails → eBug drafts (7 entries, `ebugs/2026-11-20/`)

| Entry | Cases | Owner | Class / Sev | Finding |
|---|---|---|---|---|
| ISS-XNS-01 | TC-070 | PM | UI S3 | Xmas splash icon is the Santa-hat logo, the PM mockup draws a reindeer — PM to confirm the art |
| ISS-XNS-02 | TC-014 (Q-4) | PM | UI S3 | Text under the trial CTA is the PM policy text; Design draws 「Auto-renewal  for …/year」 — PM to decide |
| ISS-XNS-03 | TC-015 | RD | UI S3 | Non-trial CTA reads 「Continue (NT$650/year)」, spec 「Subscribe for {price}/year」 |
| ISS-XNS-04 | TC-060 | RD | Functional S2 | Free-user 500-credit sale pack NT$2090 = 11% off the regular NT$2350, spec 20% off (same in the NY Sale, TC-061) |
| ISS-XNS-05 | TC-031, TC-004, TC-038 | RD | Functional S2 | NY Sale Launcher IAP icon stays the regular orange crown, no champagne glasses (caveat: launcher campaign query fails TLS with the moved clock) |
| ISS-XNS-06 | TC-033, TC-035 | RD | Functional S3 | Countdown bubble does not appear at 72:00:00 on an open Launcher, only after a relaunch (both sales) |
| ISS-XNS-07 | TC-073 (Q-13) | PM | UX S3 | Paid user's Mine 「My Credits」 card has no Xmas decoration (free users have it) — PM to decide |

Format check 0 errors (14 warnings), verify passes bar the exploration-only sheet-index checks. **Dedupe pending:**
every ECL query answered HTTP 503 at the wrap-up (dedupe.txt). Review page
`ebugs/2026-11-20/20261120_eBug_review_Xmas-NY-Sale-R1_20.19.0.html` (not published, nothing filed).

## Blocked, by reason

- **Server-fed sale content did not arrive with the moved clock — 24 rows, observability (O-3, KP-144; REQ-004: not
  filed).** Every moved-clock launch logs 「SSLHandshakeException: Chain validation failed」 / OCSP 「validity interval is
  out-of-date」 for the content queries. Not seen at all: the sale interstitial (TC-002, TC-003, TC-006, TC-040,
  TC-041, TC-042, TC-043, TC-044, TC-045, TC-046, TC-047, TC-048, TC-051, TC-052, TC-053, TC-054), the Xmas / NY IAP
  first thumbnail and gold sparkles (TC-010, TC-011, TC-021, TC-022) and the Credit IAP festive banner (TC-058,
  TC-059, TC-069, TC-075). The client-side parts of these rows were seen and are correct where noted in each result.
  **These need RD's server-side sale switch** (or the Test Server's date set inside the sale) for a recheck.
- **Test data — 5 rows.** TC-049, TC-050: Japanese interstitial art needs the phone language changed (the app has no
  language setting of its own; not allowed). TC-063, TC-067: the paid account is Credit Auto Pass eligible, so it gets
  「AUTO PASS DISCOUNT」 500 +500 NT$1660 and never the 1000-credit discount pack (Q-8). TC-064: no paid account
  eligible for the first credit purchase (Q-8).
- **Defect upstream — 1 row.** TC-032 (NY icon animation loop): no champagne-glasses icon to watch (ISS-XNS-05).

`blocked-reasons.json` groups all of them except TC-064, whose 「Not run by policy: needs credit-account-state」 text
already places it.

## Observations

O-1 pre-sale Credit IAP reference (regular packs; reference only). O-2 the phone's Play account is a license tester
(fixture). O-3 moved clock breaks HTTPS (see Blocked). O-4 test purchases made, subscription cancelled and lapsed;
credit balance now 800 (later rounds start from 800, not 0). None filed.

## Time, tokens and usage

- Time (`run-log.ts time`): wall 1 h 16 m (15:56 → 17:12 Taipei), test 1 h 16 m, no idle gap over 15 min. Per segment:
  R1-a 25 m, R1-b 11 m, R1-c 16 m, R1-d 24 m.
- Tokens (`token-usage.ts`, run window 15:56 – 17:15, this session and its six segment subagents): 366 messages,
  71.1 M tokens processed (input 840, cache write 0.74 M, cache read 70.3 M, output 132 k), all claude-opus-5-5. The
  wrap-up up to the review page: about 50 messages, 7.8 M processed (cache read 7.2 M, output 22 k); final figures on
  the Progress page (tokens.jsonl).
- Usage card (`runs/usage.jsonl`, seat 1.25× Team, account shared so these are an upper bound): 5-hour 35% → 92%
  (+57 points: R1-a +13, R1-b +7, R1-c +8, R1-d +29), weekly 23% → 32% (+9). R1-d alone cost about as much as the
  other three segments together (minute-by-minute waits across midnight with page-source reads every few seconds).

## Coverage

`node scripts/coverage-page.ts phd/xmas-ny-sale android --runs …/2026-11-20-r1` → `android/coverage.html`: 0 runs with
taps, 0 controls pressed, 11 controls not run, 31 n/a; Figma notes 58/58 traced (45 not run, 13 n/a); 16/16 board
images; no arrows on either page. The 0 is a tooling gap, not untested controls: this run has no `taps.jsonl`, so the
page cannot credit the taps the rows made. Next round: start every case with `device-android.ts <run dir> case <ID>`
and check that `taps.jsonl` grows.

## Knowledge

`knowledge.ts phd/xmas-ny-sale inbox`: 0 open items, and no observation names an entry (O-3 is already KP-144), so the
domain-knowledge pass was skipped.

## What the next round needs

1. **RD's server-side sale switch** (or a Test Server date inside each sale) so the 24 observability rows can run with
   the real clock: interstitial A/B and NY art, daily-once rule, CTA texts and %, × / Back / checkout return, IAP
   Xmas / NY thumbnail and sparkles, Credit IAP banners. Ask RD also whether the NY Launcher icon depends on server
   campaign data (ISS-XNS-05 caveat).
2. Decisions on the PM entries (ISS-XNS-01, -02, -07) and on Q-4 / Q-13; filing of the review page's decisions with a
   TR that names 20.19.0 (90201901); dedupe again once ECL answers.
3. Fixtures: the user's go-ahead to switch the phone language to Japanese (TC-049, TC-050); a paid account not
   eligible for Credit Auto Pass, and one eligible for the first credit purchase (TC-063, TC-064, TC-067).
4. Tap logging on (taps.jsonl) for the coverage proof; the account balance is now 800 credits (O-4).
5. Recheck on the fix build: ISS-XNS-03 – -06, and TC-032 once the NY icon shows.
