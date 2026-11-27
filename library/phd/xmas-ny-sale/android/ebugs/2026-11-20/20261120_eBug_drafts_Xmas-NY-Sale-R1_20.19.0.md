# Xmas & NY Sale (Android) — eBug drafts, round R1 (table v1), PhotoDirector 20.19.0 build 90201901

**Source:** spec-casebook run `library/phd/xmas-ny-sale/android/runs/2026-11-20-r1/` — phase R1 of draft `drafts/20261120-152114` (table v1, 61 cases), 2026-11-20 15:56 → 17:12, Samsung Galaxy A55 (SM-A5560) / Android 15, Appium / UiAutomator2, Test Server, phone clock moved into the sale period (REQ-003). Tally: 30 Blocked, 10 Fail, 21 Pass.

**Status:** nothing filed, uploaded or commented. No TR was named for this run; ECL product 「PhotoDirector Mobile for Android」. Creator WILLY_WU, [AIAgent], API — from the newest filed PHD Android batch (AI Hair Color Custom 2026-11-18-r2, TR261111-0042; no filed batch for this feature yet): confirm, and confirm the TR names build 20.19.0 (90201901).

Rules: reviewer rules 2026-10-21 — one action per Repro step, a Spec Link on every entry (URL on its own line), at least one image per entry, the logcat excerpt on every failure / purchase entry, no video. PM decisions are filed to PM (UX → `[AIAgent][UX]`, text `[AIAgent][UI]`); text and layout `[AIAgent][UI]`, RD when the spec states it; the rest `[AIAgent]` Functional, RD. Spec basis per entry against the Design page 9627:6 「261117_xmas_NY_sale」 (dated 2026-11-17) and the PM page 14724:43579 「11E Christmas Sale」 (undated); Design first unless the PM item is newer. REQ-004: rows Blocked (observability) because server-fed sale content did not arrive with the moved clock (O-3) are not filed.

**What is drafted:** 7 new entries (ISS-XNS-01…07), of which 3 ask PM for a decision. Dedupe per OS: see dedupe.txt.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD / PM.

---

## 1. ISS-XNS-01 — PM: Xmas splash icon is the Santa-hat logo, not the mockup's reindeer  ·  Class: UI  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-070  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** R-070 (PM spec note: 「Xmas Sale 期間 / splash page 換 icon … (同去年)」; the PM 「Splash page (Xmas only)」 mockup draws the PhotoDirector logo with a reindeer in a Santa hat holding a candy cane). At 2026/12/15 10:00 the splash shows the logo wearing a red Santa hat (a Christmas icon does show) and no reindeer; the same for a paid user (TC-071, Pass on the icon change itself). The note only says the icon changes 「as last year」, so whether the mockup's reindeer is the required art is PM's call: filed to PM rather than RD (spec-basis check). No Design frame draws the splash. Screen recording frames, no log cause.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UI] Xmas_NY_Sale: Xmas splash icon is a Santa-hat logo, mockup draws a reindeer — PM to confirm
```

**Description:**

```
Repro Steps:
1. Set the phone clock to 2026/12/15 10:00 local time (automatic date and time off)
2. Force-stop PhotoDirector
3. Launch the APP
4. Look at the splash page
5. Check the result

Result:
The splash shows the PhotoDirector logo with a Santa hat; the mockup's reindeer is not there.
摘要：聖誕期間啟動頁為戴聖誕帽的 logo，沒有 mockup 中的麋鹿。
{20.19.0_xns01_splash_santa_hat.jpg} {20.19.0_xns01_pm_splash_mockup.jpg}

Expect Result:
PM to confirm the Xmas splash art: the mockup's reindeer icon or the Santa-hat logo the app shows.
摘要：請 PM 確認聖誕啟動頁圖示應為麋鹿版或聖誕帽 logo。

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), Splash page (Xmas only) frame -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14729-52119
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/01_ISS-XNS-01/`

---

## 2. ISS-XNS-02 — PM: text under the trial CTA — Design 「Auto-renewal for …/year」 vs PM policy text  ·  Class: UI  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-014  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** Q-4. Design IAP page Xmas frame (page dated 2026-11-17) draws 「Auto-renewal  for $29.99/year」 under 「Start 7-Day Free Trial」; the PM spec note (undated) puts the policy text there 「CTA 下方字串如下, 確保用符合 Policy」: 「7 days free, then <price>/year. Auto-renews yearly …」. The app shows the PM text (NT$650 filled in, no literal <price>). By the team's Design-first rule the Design line would win, but the PM text is a Google Play policy requirement and the PM page has no date, so neither source is plainly newer: filed to PM to decide (open question rule, 2026-11-11). Seen on the Xmas IAP page (TC-014, 12/15) and the NY IAP page (TC-011 screen, 12/30). The non-trial and Monthly texts are PM-only and match (TC-015, TC-016). Layout finding, no log.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UI] Xmas_NY_Sale: IAP page: PM policy text under trial CTA, Design has 「Auto-renewal for …/year」 — PM to decide
```

**Description:**

```
Repro Steps:
1. Set the phone clock to 2026/12/15 10:00 local time (automatic date and time off)
2. Launch the APP
3. Tap the Santa-hat IAP icon at the Launcher's top right
4. Keep Yearly chosen
5. Read the text under 「Start 7-Day Free Trial」
6. Check the result

Result:
Under the CTA the app shows the PM policy text (「7 days free, then NT$650/year …」), not the Design line.
摘要：CTA 下方顯示 PM 的政策文字，而非 Design 的「Auto-renewal for …/year」。
{20.19.0_xns02_trial_cta_text.jpg} {20.19.0_xns02_trial_cta_text_ny.jpg}

Expect Result:
PM to decide which text sits under the trial CTA: Design 「Auto-renewal  for <price>/year」 or the PM policy text.
摘要：請 PM 決定試用 CTA 下方應使用 Design 文字或 PM 政策文字。
Spec string: 「Auto-renewal  for $29.99/year」 (Design) / 「7 days free, then <price>/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.」 (PM)

[AI Recommendation]
Under trial CTA: 7 days free, then <price>/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale Design Figma (IAP, page 261117_xmas_NY_sale), IAP page Xmas frame -
https://www.figma.com/design/2ogGJ14xElxFo4V8QjteOM/IAP?node-id=9707-7836
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), IAP Page frame -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14729-50273
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/02_ISS-XNS-02/`

---

## 3. ISS-XNS-03 — IAP page CTA for a user without free trial reads 「Continue」, not 「Subscribe for …/year」  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-015  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** R-019 (PM spec note: 「無 trial 資格用戶 CTA 字串: Subscribe for <price>/year」; PM-only, the Design draws only the trial state). Non-trial user set with Play Billing Lab (Taiwan, Free trial unticked), PhotoDirector relaunched, 12/15 10:00. The gold CTA reads 「Continue」 / 「(NT$650/year)」; the text under it matches the PM non-trial string (Pass). With Monthly chosen the CTA reads 「Continue」 / 「(NT$169/month)」 (TC-016; the spec gives no Monthly CTA string). The text is stated by the spec and the app differs: RD (text rule 2026-11-11). The interstitial's non-trial CTA (R-049, same string) could not be seen (TC-047 Blocked, O-3). Text finding, no log.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UI] Xmas_NY_Sale: IAP page: non-trial user CTA reads 「Continue (NT$650/year)」, not 「Subscribe for …/year」
```

**Description:**

```
Repro Steps:
1. Open the Play Billing Lab app
2. Tap Configuration settings
3. Choose Taiwan
4. Untick Free trial
5. Tap Apply
6. Set the phone clock to 2026/12/15 10:00 local time (automatic date and time off)
7. Force-stop PhotoDirector
8. Launch the APP
9. Tap the Santa-hat IAP icon at the Launcher's top right
10. Keep Yearly chosen
11. Check the result

Result:
The gold CTA reads 「Continue」 with 「(NT$650/year)」 below it.
摘要：無試用資格時 CTA 顯示「Continue (NT$650/year)」。
{20.19.0_xns03_nontrial_cta.jpg} {20.19.0_xns03_nontrial_cta_monthly.jpg}

Expect Result:
The CTA reads 「Subscribe for NT$650/year」 for a user who cannot take the free trial.
摘要：無試用資格用戶的 CTA 應顯示「Subscribe for NT$650/year」。
Spec string: 「Subscribe for <price>/year」

[AI Recommendation]
CTA (no free trial, Yearly): Subscribe for <price>/year

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/03_ISS-XNS-03/`

---

## 4. ISS-XNS-04 — Free-user sale credit pack: 500 credits NT$2090 is 11% off the regular NT$2350, not 20%  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Report step:** TC-060  ·  **Reproduce:** 3/3  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** R-062 (PM spec note: 「[Credit] Free user 500/ Paid user 1000 pack 20% off」, SKU phd_500_credit_freeuser_summer_sale). Credit IAP page, Free, 12/15 10:00: 「Santa’s bonus pack」 500 「NT$2090」; the regular 500 pack on the same page is 「NT$2350」 (also before the sale, O-1). 2090 / 2350 = 0.889 → 11.1% off; 20% off is NT$1880. Google Play checkout 「500 Credits (Special Offer)」 「NT$2,090.00」 and the log names the right SKU, so the SKU's store price is what is off (Q-9: the SKU id is reused from the summer sale; its price may be the summer one). The same NT$2090 in the NY Sale (TC-061 「Year End Sale」) and in the test purchase (TC-066, 「[purchase] success credits: phd_500_credit_freeuser_summer_sale」). Paid user's 1000 pack not reached (account Auto Pass eligible, TC-063). Severity S2: wrong sale price shown and charged.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent] Xmas_NY_Sale: Credit IAP page: free-user 500-credit sale pack NT$2090 is 11% off regular NT$2350, not 20%
```

**Description:**

```
Repro Steps:
1. Set the phone clock to 2026/12/15 10:00 local time (automatic date and time off)
2. Launch the APP
3. Tap Mine
4. Tap Buy Now on the My Credits card
5. Read the price of the 「Santa’s bonus pack」 500 card
6. Read the price of the regular 500 pack
7. Tap 「Get 500 Credits for NT$2090」
8. Read the price on the Google Play sheet
9. Check the result

Result:
The 500-credit sale pack costs NT$2090 (Google Play NT$2,090.00), 11% below the regular 500 pack's NT$2350.
摘要：免費用戶 500 點折扣包為 NT$2090，只比原價 NT$2350 便宜 11%。
{20.19.0_xns04_pack_prices.jpg} {20.19.0_xns04_play_sheet_price.jpg} {20.19.0_xns04_ny_pack_same_price.jpg} {20.19.0_xns04_log.txt}

Expect Result:
The free user's 500-credit sale pack is 20% below the regular 500 pack (NT$1880 at NT$2350).
摘要：500 點折扣包應比原價便宜 20%（原價 NT$2350 時為 NT$1880）。
Spec string: 「[Credit] Free user 500/ Paid user 1000 pack 20% off」

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), Credit IAP Page, Free user frame -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14729-52322
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/04_ISS-XNS-04/`

---

## 5. ISS-XNS-05 — NY Sale: Launcher IAP icon stays the regular orange crown, no champagne glasses  ·  Class: Functional  ·  Severity: S2  ·  Owner: RD

**Filed by:** WILLY_WU · [PHA262026P0152](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/PHA262026P0152) · TR261118-0070 · 2026-11-23

**Report step:** TC-031, TC-004, TC-038  ·  **Reproduce:** 5/5  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** R-031 / R-032 (PM spec note: 「free user sale 期間 Launcher IAP icon 改圖」; Design Launcher NY frame: icon 「NY_ani」, two champagne glasses, Lottie @raw/ny_ani_cheers, loop and autoplay). Free user. At 2026/12/27 23:59:59 → 12/28 00:00:01 on the open Launcher the Xmas bubble reaches 「00:00:00」 (never negative, Pass) and the Santa-hat icon (btnLauncherCampaignPurchase) is replaced by the regular orange crown (btnLauncherPurchase), not the glasses (TC-038). The same after a force-stop and relaunch at 12/28 00:01 (TC-004), at 12/29 09:00 and 12/30 10:00 (TC-031) and 2027/01/02–01/05 (TC-035, TC-006; the NY countdown bubble then sits under the regular crown); TC-032 (animation loop) Blocked behind it. The Xmas Santa-hat crown did show 12/11–12/27 (TC-030 Pass). Log at each launch lists 「addEvent 2027_New_Year_Sale_Campaign」 and ThemeUtils 「LottieAnimationView is an AppCompat widget …」, but the Lottie line appears on every launch, also on the real date and during the Xmas Sale, so it is not shown to be the cause. ⚠ Caveat for the reviewer: with the moved clock the launcher campaign query (hy5 「queryContent Exception … Chain validation failed」, the class that logs 「queryLauncherCampaignData」) fails on every launch (O-3, KP-144); if the NY icon is chosen by server campaign data rather than the build, this may be the moved-clock artefact and RD's server-side sale switch is needed to confirm. Hold it if you want that confirmation first.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent] Xmas_NY_Sale: Launcher: NY Sale IAP icon stays regular orange crown, no champagne-glasses animation
```

**Description:**

```
Repro Steps:
1. Set the phone clock to 2026/12/30 10:00 local time (automatic date and time off)
2. Force-stop PhotoDirector
3. Launch the APP
4. Look at the IAP icon at the Launcher's top right
5. Check the result

Result:
During the NY Sale the Launcher IAP icon is the regular orange crown, not the champagne glasses.
摘要：新年特賣期間 Launcher IAP 圖示仍為一般橘色皇冠，不是香檳杯。
{20.19.0_xns05_ny_regular_crown.jpg} {20.19.0_xns05_ny_icon_crop.jpg} {20.19.0_xns05_xmas_icon_before.jpg} {20.19.0_xns05_after_midnight_crown.jpg} {20.19.0_xns05_design_ny_launcher.jpg} {20.19.0_xns05_log.txt}

Expect Result:
During the NY Sale a free user's IAP icon is the animated two champagne glasses (NY_ani).
摘要：新年特賣期間免費用戶的 IAP 圖示應為香檳杯動畫（NY_ani）。

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale Design Figma (IAP, page 261117_xmas_NY_sale), Launcher NY frame (NY_ani annotation) -
https://www.figma.com/design/2ogGJ14xElxFo4V8QjteOM/IAP?node-id=9740-344
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/05_ISS-XNS-05/`

---

## 6. ISS-XNS-06 — Countdown bubble does not appear at 72:00:00 on the open Launcher, only after a relaunch  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-033, TC-035  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** R-034 (PM spec note: 「從倒數 72:00:00 起設倒數計時 bubble (兩個 sale 都要)」; PM-only, no Design frame, Q-3 covers only its look). Xmas: clock 2026/12/24 23:58:00, launch, stayed on the Launcher: at 23:59:51, 00:00:02 and 00:00:14 no bubble; force-stop + relaunch at 00:00:30 → bubble 「71:59:21」 (TC-033). NY: 2027/01/02 23:58:40, page source every ~4 s to 00:00:22, no bubble; after a relaunch at 00:00:35 「71:59:23」 (TC-035). Once shown, the bubble counts down each second and keeps its time across a relaunch (TC-034 Pass) and reaches 00:00:00 without going negative (TC-038 Pass). So the Launcher only checks the 72-hour threshold when it is created. No log line marks the threshold on the open Launcher (nothing is logged until the relaunch's campaign list); the excerpt shows that.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent] Xmas_NY_Sale: Launcher: sale countdown bubble not shown at 72:00:00 on the open Launcher, only after relaunch
```

**Description:**

```
Repro Steps:
1. Set the phone clock to 2026/12/24 23:58:00 local time (automatic date and time off)
2. Force-stop PhotoDirector
3. Launch the APP
4. Stay on the Launcher until the clock passes 2026/12/25 00:00:15
5. Look at the IAP icon
6. Force-stop PhotoDirector
7. Launch the APP
8. Look at the IAP icon
9. Check the result

Result:
At 00:00:00 no countdown bubble appears on the open Launcher; it shows (71:59:21) only after a relaunch.
摘要：倒數 72 小時整時 Launcher 未出現倒數泡泡，需重新啟動才顯示。
{20.19.0_xns06_no_bubble_000015.jpg} {20.19.0_xns06_bubble_after_relaunch.jpg} {20.19.0_xns06_ny_no_bubble_0000.jpg} {20.19.0_xns06_ny_bubble_after_relaunch.jpg} {20.19.0_xns06_log.txt}

Expect Result:
The countdown bubble appears from 72:00:00 before the sale ends, also on a Launcher that is already open.
摘要：剩 72 小時整時應即出現倒數泡泡，Launcher 已開啟時也要顯示。
Spec string: 「從倒數 72:00:00 起設倒數計時 bubble (兩個 sale 都要)」

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), Launcher - IAP icon frame -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43681
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/06_ISS-XNS-06/`

---

## 7. ISS-XNS-07 — PM: paid user's Mine 「My Credits」 card has no Christmas decoration  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-073  ·  **Reproduce:** 1/1  ·  **Verified on:** 20.19.0.90201901

> **QA note — not pasted into eBug.** Q-13 / R-071 (PM spec note: 「Xmas Sale 期間 / splash page 換 icon, Mine tab credit card 加裝飾 (同去年)」, no user type named; PM 「Mine tab (Xmas only)」 mockup). Paid (「Set to subscriber」 on, Mine 「Hello VIP!」), 12/15 10:00: the 「My Credits」 card is the plain card, no snowman, pine or gifts, while a free user gets them at the same time (TC-072 Pass). A paid user does get the Christmas splash icon (TC-071) and the Christmas decoration on the Credit IAP offer card (TC-062), so the Xmas look differs between screens for the same paid user. Whether paid users get the Mine decoration is not stated: a user-experience decision for PM (`[AIAgent][UX]`, BugBelong PM, rule 2026-11-11 / 2026-11-13). Layout finding, no log.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Xmas_NY_Sale: Mine: paid user My Credits card has no Xmas decoration, free user has — PM to decide
```

**Description:**

```
Repro Steps:
1. Turn on 「Set to subscriber」 in Settings About's debug dialog
2. Set the phone clock to 2026/12/15 10:00 local time (automatic date and time off)
3. Force-stop PhotoDirector
4. Launch the APP
5. Tap Mine
6. Look at the My Credits card
7. Check the result

Result:
For a paid user the My Credits card has no Christmas decoration; a free user's card has it.
摘要：付費用戶 Mine 的 My Credits 卡片沒有聖誕裝飾，免費用戶則有。
{20.19.0_xns07_paid_card_plain.jpg} {20.19.0_xns07_free_card_decorated.jpg}

Expect Result:
PM to decide whether paid users also get the Xmas decoration on the My Credits card.
摘要：請 PM 決定付費用戶的 My Credits 卡片是否也要聖誕裝飾。

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, paid (VIP) account
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), Mine tab (Xmas only) frame -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14729-51975
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
Basis: None — PM decision requested (the spec names no user type for the Mine card decoration, Q-13)
<Claude Reviewed>
```

**Images:** `20261120_eBug_drafts_Xmas-NY-Sale-R1_20.19.0_images/07_ISS-XNS-07/`

---

# Not raised (observations and Blocked rows, for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| O-1 | Pre-sale Credit IAP reference (2026/12/10): regular packs and banner. | Reference for TC-068 / TC-060; no defect. |
| O-2 | The phone's Google Play account is a license tester (test card). | Fixture fact; the purchase rows used it (REQ-004). |
| O-3 | Moved clock breaks HTTPS (「Chain validation failed」, OCSP out-of-date); server-fed sale content does not arrive. | Side effect of the clock method (Q-1, KP-144): not filed (REQ-004). The 24 Blocked observability rows need RD's server-side sale switch. |
| O-4 | Test purchases (500-credit pack, sale Monthly) made and the subscription cancelled; balance now 800. | Fixture state; TC-023 / TC-066 Pass. |
| Blocked defect (1) | TC-032 | Upstream of entry 5 (no NY icon to watch). |
| Blocked observability (24) | TC-002, TC-010, TC-022, TC-045, TC-046, TC-048, TC-051, TC-053, TC-075, TC-058, TC-040, TC-041, TC-042, TC-043, TC-047, TC-003, TC-054, TC-011, TC-021, TC-044, TC-052, TC-059, TC-069, TC-006 | REQ-004: server-fed sale content (interstitial, IAP Xmas/NY thumbnail, Credit IAP banner) did not arrive with the moved clock (O-3). Not filed; needs RD's server-side sale switch for a recheck. |
| Blocked test-data (5) | TC-049, TC-063, TC-064, TC-050, TC-067 | Fixture missing: phone language change not allowed (TC-049, TC-050); no paid account outside Credit Auto Pass (TC-063, TC-064, TC-067). |

# Reconciliation against the run

10 Fail (8 defect, 2 question), 30 Blocked, 0 Not run, 4 observations (O-1 … O-4). 10 Fail rows → 7 entries: TC-031 / TC-004 / TC-038 merged into entry 5 (one defect), TC-033 / TC-035 into entry 6; the other 5 rows one entry each (10 − 2 − 1 = 7).

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-070 | Fail | defect | 1. ISS-XNS-01 |
| TC-014 | Fail | question | 2. ISS-XNS-02 |
| TC-060 | Fail | defect | 4. ISS-XNS-04 |
| TC-015 | Fail | defect | 3. ISS-XNS-03 |
| TC-033 | Fail | defect | 6. ISS-XNS-06 |
| TC-038 | Fail | defect | 5. ISS-XNS-05 |
| TC-004 | Fail | defect | 5. ISS-XNS-05 |
| TC-073 | Fail | question | 7. ISS-XNS-07 |
| TC-031 | Fail | defect | 5. ISS-XNS-05 |
| TC-035 | Fail | defect | 6. ISS-XNS-06 |
| O-1 | observation | — | not raised |
| O-2 | observation | — | not raised |
| O-3 | observation | — | not raised |
| O-4 | observation | — | not raised |

### Owner split

| Owner | Entries |
|---|---|
| RD | 3, 4, 5, 6 |
| PM | 1, 2, 7 |

### Filing order

By severity: **4**, **5**, **1**, **2**, **3**, **6**, **7**. Nothing is filed until the review page's decisions come back.
