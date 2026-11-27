# Server and tier

## KP-004 Switching the tier on iOS
- kind: howto · platform: ios · use: analysis, run · tags: tier, pink
- source: analysis.md verdict rule 5 (spec agent rules, 2026-10-19); exploration KB ai-mini-drama.md (2026-10-08: default and reset)

Launcher › Pink › ☰ › `[0] IAP` › 「status」: Follow account / Free / Pro / Pro+; it defaults to 「System (lock button
in debug mode)」 and returns to it on relaunch unless set again. Verify the tier in Mine and restore the
previous value after the tier group. No purchase or extra account is needed.

## KP-005 Stage or Production on Android
- kind: howto · platform: android · use: run · tags: server
- source: run-android.md › Server (user, 2026-10-28); AIGC Watermark Android run 2026-11-17-r1-full (Stage, yellow bar) · verified: 16.9.0 build 2611161 (2026-11-17)

An empty `testserver.config` in `/sdcard/cyberlink/PDR/` means Stage at the next launch; absent means Production
(`/sdcard/cyberlink/tester.config` holds the SR code and is not the switch). Put it in place before the first launch
of a fresh install: a first launch on Production creates the credit ID there and Stage then rejects signed-out turns
(`403 "Fail to verify uuid"`); `adb shell pm clear <package>` makes a new ID. On Stage the Launcher's top bar is
yellow, on Production dark.

## KP-006 Android tiers and chat limits
- kind: fact · platform: android · use: analysis, run · tags: tier, quota, billing
- source: analysis.md verdict rule 10 (team, 2026-10-19) · verified: 16.9.0 build 2611231 (2026-11-24; chat limits not checked)

Android sells Pro, not Pro+, through Google Play billing; the tier comes from the signed-in account. Daily chat limits
are server-configured: Free 10, Pro 100.

## KP-068 A Play test subscription ends within hours
- kind: quirk · platform: android · use: run · tags: tier, billing, subscription
- source: Video Enhance Android run 2026-11-10-r1-full O-30; Video Enhance Android run 2026-11-18-r2-full O-17, O-23, O-26, O-28; AIGC Watermark Android run 2026-11-23-r2-changed (Pro from 14:22, still Pro at 15:14); AIGC Watermark Android run 2026-11-23-r3-full O-7 (bought 14:22, lapsed 17:58; no bonus clawback in the credits by 18:12); Video Enhance Android run 2026-11-24-r3-full O-3, O-12, O-17; AIGC Watermark Android run 2026-11-26-e1-entries O-13 (inbox I-010, I-017); Video Enhance Android run 2026-11-26-r4-full O-7, O-17, O-19, O-25 · verified: 16.9.0 build 2611251 (2026-11-27)

A Play test subscription renews every 30 minutes (the test sheet reads 「NT$1,190.00/30 min」 and 「This is a test
subscription. It will recur according to this schedule.」) and ends after a few renewals: on the shared test account
(`yearly_sub_usd34.99_yfree_202307`) each purchase lasted about 3.5–5.5 h (3 h 28 min the shortest, 2611231). On 2611251 the paywall is a server-set
「BLACK FRIDAY SALE」 page (「Special Offer」 NT$1080/Year preselected, 「Continue」; 「Continue with Monthly Plan」 when
Monthly is ticked) selling `annualsubscription_bf_2610` (「NT$1,080.00/30 min」): two purchases lapsed after 3 h 35 min
and 3 h 34 min, the second with no clawback row seen. At the
lapse the ledger takes back the unused monthly bonus (「Monthly Credit Bonus (for Pro Subscribers) −N」; on 2611231 a
row 「Expired」 −100 after a 「Returned」 +20) and logcat logs `updateSubscribingStatus: false`, but
Mine and the panel keep acting Pro until the next launch shows 「Free」 「Claim offer」. Run Pro rows early, check the
tier at each segment start, and re-buy on the Play test sheet (「Test card, always approves」, no password), tapping its Subscribe button by bounds:
a label match hits the sheet's terms link (opens payments.google.com in Chrome; Back). A sheet left open for hours fails (billing responseCode 6, 「Error / Server error」), so open a fresh one.
AIGC Watermark's runs saw the same: 17:08 → ended by 22:37 (R1), 14:22 → 17:58 (R3, no clawback seen by 18:12).
On 2611251 Mine › 「Claim offer」 › 「Get 7-Day Free Trial」 opened a test sheet with 「3-minute free trial」, then
「NT$1,080.00/30 min」: the first Subscribe tap only expanded the sheet, the second subscribed, adding +35 credits at once
(`giveaway_free_trial`, the paywall's 「Receive 35 credits during free trial」; compare KP-049).

## KP-093 Sign-in after `pm clear` on Stage
- kind: quirk · platform: android · use: run, ebug · tags: server, sign-in, credits, reset
- source: AIGC Watermark Android run 2026-11-17-r1-full O-27, O-29; corrected by AIGC Watermark Android run 2026-11-23-r3-full O-11; inbox I-004 (Video Enhance Android Q1 run 2026-11-26-q1-questions O-1); Video Enhance Android run 2026-11-26-r4-full O-27 · verified: 16.9.0 build 2611251 (2026-11-27)

On 2611161 (R1), after `adb shell pm clear` on Stage (testserver.config kept), the app showed 「Account Not Found」
(only 「Switch Account」) and stayed signed out; logcat: `bindMember … 403 {"detail":"invalid device identity"}`.
On 2611193 (SM-A5360, R3) the same reset signed in: Google via Chrome (no password) › 「Account Sign In」 › 「Got it」,
`bindMemberSuccess: 0`, +30 loyalty bonus (KP-072); 2611251 the same. Once (2611231) the app's Sign In page showed
「No Internet Connection / Tap to Retry」 after Chrome's 「You Are All Set!」 while online: Tap to Retry, then Google again,
signed in. Still run signed-in rows before a `pm clear` and check the log.


## KP-137 Screens after `pm clear` on a Play account holding Pro
- kind: fact · platform: android · use: run · tags: reset, first-launch, sign-in, tier
- source: inbox I-004 (Video Enhance Android Q1 run 2026-11-26-q1-questions O-1, 2611231); Video Enhance Android run 2026-11-26-r4-full O-5, O-27 · verified: 16.9.0 build 2611251 (2026-11-27)

After `pm clear` (testserver.config kept) the app shows 「Welcome to PowerDirector」 (Terms / Privacy, box pre-ticked,
「Get Started」), the notification permission, then the Pro offer (the paywall, 「Close」, or the 「Use credits to enjoy
AI features」 dialog when Play holds Pro, KP-072); sign-in adds 「Account Sign In」 (「Got it」, KP-093). A tool entry then
asks 「File access permission is required」 (Next, music and photos/videos). No AI or cloud consent is asked.
