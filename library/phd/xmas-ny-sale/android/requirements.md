# Xmas & NY Sale — requirements (android)
Spec: Xmas NY Sale - Design Figma 9627-6.md, Xmas NY Sale - PM Figma 14724-43579.md (spec set 2026-11-20, Figma only)
Design: file IAP, page 「261117_xmas_NY_sale」 (9627:6), read through figma-design (qa-dm): interstitials Xmas A / Xmas B / NY, IAP page Xmas / NY, Launcher with the NY IAP icon, the 「cut」 section (interstitial art in English and Japanese, IAP thumbnails), the Figma annotation on the NY icon animation and the link 「JSON下載路徑」. PM: file PhD MX IAP Page, page 「11E Christmas Sale」 (14724:43579), read through figma-pm (qa1): the spec note and eight mockups with their captions. Source order: Design, then PM (the PM page is the MX IAP spec). Design boards are dated by the page name (2026-11-17); the PM page carries no date.
Prices in the mockups are sample values: the spec says prices come from the store SKU (「價格吃 sku」), so rows compare the screen with the Google Play price of the named SKU, read from the Google Play checkout sheet.

## Sale period and scope
- R-001 [PM:pm-note] The Xmas Sale runs from 2026/12/11 to 2026/12/27 and the NY Sale from 2026/12/28 to 2027/01/05, both in the device's local time (「(local time)」).
- R-002 [PM:pm-note] Outside both periods (2026/12/10 and earlier, 2027/01/06 and later) none of the sale changes shows: regular monthly price, regular IAP banner and CTA colour, regular Launcher IAP icon, no sale interstitial, no discount credit pack, no festive banner or decoration.
- R-003 [PM:pm-note] The sale is for every country (「國家: Global」). — NOT TESTABLE across countries: the run phone has one Google Play country; the rows check it there.
- R-004 [PM:pm-note] The sale applies on every entry to the IAP page (「入口: 全入口」): the IAP page shows the sale whichever way it is opened (Launcher IAP icon, Mine 「Upgrade Now」, a Premium-locked feature).
- R-005 [PM:pm-note] At the change from Xmas to NY (2026/12/28 00:00 local time) every Xmas-only item gives way to its NY version or goes away (two interstitial images → one, Xmas art → NY art, splash icon and Mine card decoration and the long-pack decoration removed).

## IAP page (subscription)
- R-010 [PM:pm-note; PM:pm-iap] During both sales the Monthly plan is 15% off (「Monthly 15% off」), sold with the SKU 「monthly_subscription_2026_xmas_newyear」; the price shown is that SKU's Google Play price.
- R-011 [PM:pm-iap] The Monthly row shows the regular monthly price struck through above the sale price (mockup: 「$6.99/month」 struck through, 「$5.99/month」).
- R-012 [PM:pm-iap; DS:d-iap-xmas] The Yearly plan keeps its regular price (「$29.99/year」 in the PM mockup) and its 「SAVE …%」 tag; the Design draws the plan rows with sample values (「$125/month」, 「$690/month」, 「SAVE 75%」).
- R-013 [PM:pm-note; PM:pm-iap; DS:d-iap-xmas] During the sale the IAP page CTA button is gold, the same as the Black Friday sale (「CTA btn 改金色 (同 BF)」).
- R-014 [PM:pm-iap; DS:d-iap-xmas; DS:d-iap-ny; DS:d-assets] The first thumbnail of the IAP page's top banner (「火車頭加圖片」) is the sale picture: the red Xmas 「Sale」 picture during the Xmas Sale and the gold NY 「Sale」 picture during the NY Sale (Design 「IAP_thumbnail_xmas」, 「IAP_thumbnail_NY」); 「Object Removal」 and 「Body Reshape」 follow it.
- R-015 [DS:d-iap-xmas; DS:d-iap-ny] During both sales gold sparkle decorations are drawn around the plan rows (Design layer 「NY_deco」, on both IAP frames).
- R-016 [DS:d-iap-xmas; PM:pm-iap] For a user who can still take the free trial, with Yearly chosen, the page shows 「Recieve 30 credits during free trial」 above the CTA 「Start 7-Day Free Trial」.
- R-017 [DS:d-iap-xmas] Under the CTA the Design shows 「Auto-renewal  for $29.99/year」 with the yearly price, then 「Terms of Service」, 「Privacy Policy」, 「Restore Purchase」.
- R-018 [PM:pm-note; PM:pm-iap] The PM page puts the policy text under the CTA instead (「CTA 下方字串如下, 確保用符合 Policy」): trial user 「7 days free, then {price}/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.」 (Q-4: which of R-017 / R-018 the IAP page shows).
- R-019 [PM:pm-note] For a user who cannot take the free trial, the CTA reads 「Subscribe for {price}/year」 with Yearly chosen, and the text under it is 「{price}/year, charged today. Renews yearly until canceled. Manage or cancel in Google Play > Subscriptions.」.
- R-020 [PM:pm-note] With Monthly chosen (no free trial), the text under the CTA is 「{price}/month, charged today. Renews monthly until canceled. Manage or cancel in Google Play > Subscriptions.」 with the sale monthly price.
- R-021 [KB: KP-049; PM:pm-note] Every 「{price}」 in these strings is replaced by the plan's real price with its currency; no screen shows the literal 「{price}」.
- R-022 [PM:pm-note] Tapping the CTA with Monthly chosen opens the Google Play checkout for the sale monthly SKU 「monthly_subscription_2026_xmas_newyear」 at its sale price; with Yearly chosen it opens the regular yearly subscription.
- R-023 [PM:pm-note; KB: KP-015] Buying the sale monthly plan makes the user a paid (VIP) user: the IAP purchase completes, and Mine shows the paid state on return (KP-015).

## Launcher IAP icon (free users)
- R-030 [PM:pm-note; PM:pm-launcher] During the Xmas Sale a free user's Launcher IAP icon (top right, beside the gear) is the gold crown wearing a Santa hat.
- R-031 [PM:pm-note; DS:d-launcher-ny] During the NY Sale a free user's Launcher IAP icon is the two champagne glasses with sparkles (Design 「NY_ani」).
- R-032 [DS:d-launcher-ny] The NY icon is an animation that loops without end (Design annotation: 42 × 46, 60 fps, 144 frames = 2.4 s a loop, start and end joined; Android `ny_ani_cheers.json`, `lottie_loop` true, `lottie_autoPlay` true).
- R-033 [PM:pm-note] The icon change is for free users only (「free user sale 期間 Launcher IAP icon 改圖」): a paid user's Launcher keeps the regular icon during both sales.
- R-034 [PM:pm-note] From the moment 72:00:00 is left before a sale ends, a countdown bubble shows on the Launcher IAP icon and counts down (「從倒數 72:00:00 起設倒數計時 bubble」), for both sales (「兩個 sale 都要」); before that no bubble shows. PM-only: no Design frame draws the bubble.
- R-035 [PM:pm-note] The countdown bubble is for free users only (it belongs to the free-user icon change).
- R-036 [PM:pm-launcher] Tapping the sale IAP icon opens the IAP page with the sale (R-010 – R-015).

## Interstitial (free users)
- R-040 [PM:pm-note] During both sales a free user sees the sale interstitial on the daily launch of the app (「daily launch 都會跳 Interstitial」).
- R-041 [PM:pm-note] Paid users never see the sale interstitial (it is stated for free users only).
- R-042 [PM:pm-note; PM:pm-interstitial; DS:d-interstitial-xmas-a; DS:d-interstitial-xmas-b] During the Xmas Sale there are two interstitial pictures that take turns: if the last one shown was A, the next one is B, then A again (「兩張輪流跳 (上次觸發顯示 A, 下一次觸發就是顯示 B)」). A is the red-gold room with gifts, B the green one with the snow globe.
- R-043 [PM:pm-note; DS:d-interstitial-ny] During the NY Sale there is one interstitial picture (cream and gold with balloons).
- R-044 [PM:pm-note] The interstitial picture comes from the CMS (「圖上 CMS」).
- R-045 [DS:d-interstitial-xmas-a; DS:d-interstitial-ny; DS:d-assets] The picture's headline is 「Merry Christmas」 on the Xmas pictures and 「Happy new year」 on the NY picture; with the app in Japanese it is 「メリー クリスマス」 and 「あけまして おめでとう」 (the Design's 「_jpn」 art).
- R-046 [DS:d-interstitial-xmas-a; PM:pm-note] Under the headline the interstitial shows 「SAVE」, the big percentage with 「%」, the line 「vs. paying {monthly sale price}/month × 12」 and the yearly price 「{price}/year」 (Design: 「SAVE」 「57」 「%」, 「vs. paying $5.99/month × 12」, 「$29.99」 「/year」).
- R-047 [PM:pm-note] The big percentage is computed by the app from the SKU prices: [(sale monthly price × 12) − regular yearly price] ÷ (sale monthly price × 12). With the mockup prices ($5.99, $29.99) that is 58.3%, shown 「58」 (Q-6 for rounding; the Design's 「57」 and the PM note's 「70%」 are sample values).
- R-048 [DS:d-interstitial-xmas-a; PM:pm-note] For a user who can take the free trial the CTA reads 「Get 7-Day Free Trial」 (Design; the PM note and mockup say 「Start 7-Day Free Trial」, Q-5).
- R-049 [PM:pm-note] For a user who cannot take the free trial the CTA reads 「Subscribe for {price}/year」 with the regular yearly price. PM-only: no Design frame draws this state.
- R-050 [DS:d-interstitial-xmas-a; PM:pm-note] Under the CTA a trial user sees 「7 days free, then {price}/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.」 with {price} = the yearly price.
- R-051 [PM:pm-note] Under the CTA a user who cannot take the free trial sees 「{price}/year, charged today. Renews yearly until canceled. Manage or cancel in Google Play > Subscriptions.」.
- R-052 [PM:pm-note; PM:pm-interstitial-ref] Tapping the CTA opens the Google Play checkout panel for the regular yearly subscription (「CTA btn 喚起結帳 panel, 年訂閱原價」), with the 7-day free trial for a trial user.
- R-053 [DS:d-interstitial-xmas-a] The interstitial has a close (×) button at the top left; it closes the interstitial and leaves the Launcher as it was.
- R-054 [DS:d-interstitial-xmas-a] The footer shows 「Terms of Service」 | 「Privacy Policy」 | 「Restore purchase」, each opening its page or running the restore.

## Credit IAP page (Buy Credit)
- R-060 [PM:pm-note] The credit sale has the same countries, entries and period as the subscription sale (「國家/入口/期間與 subscription 相同」): the Credit IAP page shows it whichever way it is opened (Mine 「Buy Now」, the blue credit button of an AI feature (KP-020), the Launcher), and only from 2026/12/11 to 2027/01/05.
- R-061 [PM:pm-note; PM:pm-credit-paid; PM:pm-credit-free] The top of the Credit IAP page shows a festive banner picture (it may carry the word 「SALE」): one for the Xmas Sale and one for the NY Sale (「圖片, Xmas *1, NY *1」).
- R-062 [PM:pm-note; PM:pm-credit-free] A free user always gets the discount pack: 500 credits at 20% off (「Free user 500 … pack 20% off」, 「Free user: 一律顯示折扣 pack」), SKU 「phd_500_credit_freeuser_summer_sale」, at that SKU's Google Play price.
- R-063 [PM:pm-note; PM:pm-credit-paid] A paid user's discount pack is 1000 credits at 20% off, SKU 「phd_1000_credit_paiduser_summer_sale」, at that SKU's Google Play price.
- R-064 [PM:pm-note; PM:pm-credit-paid] Which pack a paid user gets: the note says a paid user who can get Credit Auto Pass sees Auto Pass and one who cannot sees the discount pack (「Paid user 有 auto pass 資格 → auto pass; 沒 auto pass 資格 → 折扣 pack」); the caption under the paid mockup says a paid user who can still make the first purchase sees the first-purchase offer (「SPECIAL OFFER」 500 +500) and one who cannot sees the discount pack (Q-8).
- R-065 [PM:pm-note; PM:pm-credit-free] The discount pack has the first-purchase pack's tag and style (「tag 跟 pack 樣式都跟首購一樣即可」), named 「santa bonus pack」 in the Xmas Sale and 「year-end sale」 in the NY Sale (「同去年」); the free-user mockup's tag reads 「SANTA BONUS OFFER」.
- R-066 [PM:pm-note; PM:pm-credit-free] During the Xmas Sale the long pack (the discount pack card) carries a Christmas decoration at its top right (PM 「xmas_deco」); during the NY Sale it has none.
- R-067 [PM:pm-note] Buying a discount pack charges the SKU price and adds its credits: 500 to a free user, 1000 to a paid user.
- R-068 [PM:pm-credit-paid] The regular packs (50 / 100 / 200 / 500 / 1000 / 2000) keep their prices during the sale.

## Splash page and Mine (Xmas Sale only)
- R-070 [PM:pm-note; PM:pm-splash] During the Xmas Sale the splash page shows the Christmas app icon (the PhotoDirector logo with a reindeer in a Santa hat); during the NY Sale and outside the sale the regular icon.
- R-071 [PM:pm-note; PM:pm-mine] During the Xmas Sale the 「My Credits」 card on Mine carries a Christmas decoration (snowman, pine branches, gifts; 「同去年」); during the NY Sale and outside the sale it has none.
- R-072 [PM:pm-mine] The decorated card keeps its content and button: 「My Credits」 with the balance and 「Buy Now」, which opens the Credit IAP page.

## Open questions
- Q-1 How does a test build enter the sale? The spec gives dates in local time only. Assumption: turning off automatic date and time on the phone and setting a date inside the period puts the app in the sale (the rows give the date to set); if the app takes the time from the server, RD names a switch or a test server date and the fixtures change. R-001, R-002, R-005, R-034; every row.
- Q-2 「daily launch 都會跳 Interstitial」: is it once a day (the first launch of each day) or every launch? Assumption: the first cold launch of each calendar day shows it and a second launch the same day does not. R-040; TC-040, TC-041, TC-042.
- Q-3 The countdown bubble (R-034) has no Design frame: its look, where it sits, the format (「72:00:00」 as hh:mm:ss) and what happens at 00:00:00 (the Xmas Sale ends straight into the NY Sale) are not drawn. Assumption: a bubble on the Launcher IAP icon showing hh:mm:ss, counting down each second; at the end of the Xmas Sale it is replaced by the NY icon with no bubble until 72 hours before 2027/01/05 24:00. R-034, R-035; TC-033 – TC-038.
- Q-4 Text under the IAP page CTA: the Design (2026-11-17) shows 「Auto-renewal  for $29.99/year」; the PM page puts the policy text there (R-018 – R-020). The PM page carries no date. Assumption (Design first): a trial user with Yearly sees the Design line; the non-trial and Monthly texts, which the Design does not draw, follow the PM. Check on device and ask PM. R-017 – R-020; TC-013 – TC-016.
- Q-5 Interstitial CTA for a trial user: Design 「Get 7-Day Free Trial」, PM 「Start 7-Day Free Trial」 (the IAP page uses 「Start 7-Day Free Trial」 in both). Assumption (Design first, page dated 2026-11-17): 「Get 7-Day Free Trial」. R-048; TC-046.
- Q-6 Rounding of the interstitial percentage: the spec gives the formula only. Assumption: rounded down to a whole number (58.3 → 58); a local currency where the formula gives x.5 or more is checked against both and asked. R-047; TC-045.
- Q-7 The Design's 「SAVE 75%」 and the PM's 「SAVE 58%」 on the Yearly tag: is the IAP page's Yearly tag recomputed from the sale monthly price (like the interstitial) or kept? Assumption: kept as today (both values are sample text); the row records it. R-012; TC-012.
- Q-8 Which pack a paid user gets (R-064): the note says Credit Auto Pass eligibility decides (Auto Pass or the discount pack), the caption under the mockup says first-purchase eligibility decides (first-purchase offer or the discount pack). Assumption: both checks apply in that order: Auto Pass when eligible, else the first-purchase offer when eligible, else the 1000-credit discount pack; rows for each state. R-063, R-064; TC-062 – TC-064.
- Q-9 Prices of the discount packs: the mockups show 「$49.99」 for both 500 and 1000 credits, and the SKU names end in 「summer_sale」 (reused from the summer sale). Assumption: the Google Play price of each SKU is the expected price (20% below the regular 500 / 1000 pack), and the reused SKU ids are intended. R-062, R-063; TC-060, TC-063.
- Q-10 The interstitial art has English and Japanese versions only. Assumption: Japanese gets the 「_jpn」 art and every other language the English art (KP-057: interstitial localisation is phased). R-045; TC-049, TC-050.
- Q-11 What does the Google Play checkout's back or cancel return to (the interstitial or the Launcher)? Not drawn. Assumption: the interstitial stays open. R-052; TC-048.
- Q-12 The Design link 「JSON下載路徑」 (a OneDrive folder) is not readable from here. Assumption: it holds the animation files (the NY icon Lottie JSON, R-032) and no rules; ask Design if it holds anything else. R-032.
- Q-13 Does the Xmas splash icon and Mine card decoration (R-070, R-071) apply to paid users too? The note lists them under 「Xmas Sale 期間」 with no user type. Assumption: every user. R-070, R-071; TC-070 – TC-073.

## Added 2026-11-20 — coverage passes and standing inputs

### Flow arrows walked by existing rows
None drawn on either page (arrows.json is empty).

### Job states
The feature runs no generation job; its only jobs are the two Google Play purchases. Every cell names the rows that check it, or n/a.

| Job | Start / loading | Success | Failure | Retry | Second failure | Partial | Stop | Leave and return | Longest wait | Done notice |
|---|---|---|---|---|---|---|---|---|---|---|
| Sale monthly subscription purchase | TC-018 | TC-023 | n/a (Google Play's own failure flow, spec silent) | n/a (spec silent) | n/a (spec silent) | n/a (one product) | TC-018 (sheet closed without buying) | n/a (spec silent) | n/a (Google Play sheet) | TC-023 (Mine shows the paid state) |
| Discount credit pack purchase | TC-060 | TC-066, TC-067 | n/a (Google Play's own failure flow, spec silent) | n/a (spec silent) | n/a (spec silent) | n/a (one product) | TC-060 (sheet closed without buying) | n/a (spec silent) | n/a (Google Play sheet) | TC-066 (balance and Detail) |

### Error classes
| Job | Error classes |
|---|---|
| Sale monthly subscription purchase | n/a (spec names no error classes) |
| Discount credit pack purchase | n/a (spec names no error classes) |

### Exit × stage
| Stage | × / ‹ | Android system Back |
|---|---|---|
| Interstitial shown | TC-051 | TC-052 |
| Google Play checkout open from the interstitial | n/a (Google Play's sheet) | TC-048 |
| IAP page open | TC-020 | TC-020 |
| Credit IAP page open | TC-065 | TC-065 |

### System back
- Interstitial: TC-052 (Assumption: closes it like ×, Launcher stays).
- IAP page opened from the sale Launcher icon: TC-020 (back to the Launcher).
- Google Play checkout sheet: TC-048 (Q-11: back to the interstitial).
- Credit IAP page: TC-065 (back to the page it was opened from).
- Splash page: n/a (no input; it closes by itself).
- Mine: n/a (unchanged by this spec).

### Hidden clauses
Pass 9: each clause the screen does not show, how a tester observes it and the rows.

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-001 | The period is in the device's local time, not one time zone | Setting the phone's clock to the first and last minute of each period (Q-1) | TC-001, TC-002, TC-003, TC-004, TC-005, TC-006 |
| R-010 | The monthly sale price is the price of SKU 「monthly_subscription_2026_xmas_newyear」 | The Google Play checkout sheet's product and price after tapping the CTA with Monthly, and the app log line naming the SKU | TC-018 |
| R-044 | The interstitial picture is served by the CMS | The picture matches the Design art for the sale and language shown (a CMS change is RD's; not changed by the run) | TC-043, TC-044, TC-049 |
| R-047 | The percentage is computed by the app from the SKU prices, not drawn in the picture | The number checked against the formula with the checkout prices of the sale monthly and regular yearly SKUs | TC-045 |
| R-062 | The free user's pack is SKU 「phd_500_credit_freeuser_summer_sale」 | The checkout sheet's product and price after tapping the pack, and the app log line naming the SKU | TC-060 |
| R-063 | The paid user's pack is SKU 「phd_1000_credit_paiduser_summer_sale」 | The checkout sheet's product and price after tapping the pack, and the app log line naming the SKU | TC-063 |

### Variants
Pass 10: one line per variant.

| Requirement | Variant | Rows |
|---|---|---|
| R-004 | Entry: Launcher IAP icon | TC-010 |
| R-004 | Entry: Mine 「Upgrade Now」 | TC-021 |
| R-004 | Entry: a Premium-locked feature | TC-022 |
| R-014 | Xmas Sale | TC-010 |
| R-014 | NY Sale | TC-011 |
| R-016 | Trial user, Yearly | TC-013 |
| R-019 | Non-trial user, Yearly | TC-015 |
| R-020 | Monthly chosen | TC-016 |
| R-030 | Xmas Sale, free user | TC-030 |
| R-031 | NY Sale, free user | TC-031 |
| R-033 | Paid user, Xmas Sale | TC-036 |
| R-033 | Paid user, NY Sale | TC-037 |
| R-034 | Xmas Sale end (2026/12/27) | TC-033, TC-034 |
| R-034 | NY Sale end (2027/01/05) | TC-035 |
| R-042 | Xmas picture A | TC-043 |
| R-042 | Xmas picture B | TC-043 |
| R-043 | NY picture | TC-044 |
| R-045 | English | TC-043, TC-044 |
| R-045 | Japanese | TC-049, TC-050 |
| R-048 | Trial user | TC-046 |
| R-049 | Non-trial user | TC-047 |
| R-061 | Xmas banner | TC-058 |
| R-061 | NY banner | TC-059 |
| R-062 | Free user, Xmas Sale | TC-060 |
| R-062 | Free user, NY Sale | TC-061 |
| R-064 | Paid user eligible for Auto Pass | TC-062 |
| R-064 | Paid user eligible for the first purchase | TC-064 |
| R-064 | Paid user eligible for neither | TC-063 |
| R-065 | Xmas name 「santa bonus pack」 | TC-060 |
| R-065 | NY name 「year-end sale」 | TC-061 |
| R-067 | Free user buys 500 | TC-066 |
| R-067 | Paid user buys 1000 | TC-067 |
| R-070 | Free user | TC-070 |
| R-070 | Paid user | TC-071 |
| R-071 | Free user | TC-072 |
| R-071 | Paid user | TC-073 |

### Domain rules
Every applicable spec / team rule of knowledge.md.

| Entry | Requirements |
|---|---|
| KP-012 Android has one paid mode: VIP = Pro = paid user | R-033, R-041, R-063, R-064 (「paid user」 in the spec = Android VIP; rows switch it with 「Set to subscriber」, KP-131) |
| KP-014 AI Exposure is paid-only | n/a (other feature: not part of the sale screens) |
| KP-015 Mine refreshes entitlement after buying Premium | R-023 |
| KP-016 A one-time free trial is consumed at once | n/a (the trial itself is unchanged by this spec; trial / non-trial users are separate fixtures) |
| KP-017 Credit Detail lists every AI use with feature name and amounts | n/a (no AI use in this feature; R-067 checks the purchase in the balance and Detail) |
| KP-018 Credit Auto Pass keeps its own name in the Detail | n/a (the Auto Pass offer is only shown here, R-064; its Detail entry is unchanged) |
| KP-019 A burst of Generate taps charges once | n/a (no Generate in this feature) |
| KP-020 Blue credit button opens Buy Credit | R-060 |
| KP-021 Premium chat quota is higher, not unlimited | n/a (other feature) |
| KP-024 Finished AI images save to their feature tab | n/a (other feature) |
| KP-025 AI Exposure results go to Recent and the AI Exposure tab | n/a (other feature) |
| KP-026 History button opens the feature's Artwork tab | n/a (other feature) |
| KP-027 New features' works reach Recent | n/a (other feature) |
| KP-028 Empty Artwork filter shows Nothing yet | n/a (other feature) |
| KP-029 Long-task tiles and completion notifications | n/a (other feature) |
| KP-030 Saved output matches the last preview | n/a (other feature) |
| KP-032 Features opened from Edit Room get the edited image | n/a (other feature) |
| KP-033 Banners and deep links preselect the linked style | n/a (other feature) |
| KP-034 Discover tip bubble lifecycle | n/a (other feature) |
| KP-035 AI Replace: reference image or prompt enables Next | n/a (other feature) |
| KP-036 A custom prompt reaches the generator | n/a (other feature) |
| KP-037 AI Try-On: no face check on clothing or pets | n/a (other feature) |
| KP-038 AI Group Shot photo picking | n/a (other feature) |
| KP-039 Agent job finished in background shows on return | n/a (other feature) |
| KP-040 Crop tabs keep one consistent state | n/a (other feature) |
| KP-041 Undo, Redo and Reset | n/a (other feature) |
| KP-042 Restored state restores highlight and transform together | n/a (other feature) |
| KP-043 Video Editing template titles keep their look | n/a (other feature) |
| KP-044 Video Editing panels: X discards, V commits | n/a (other feature) |
| KP-045 Audio Range Select close target | n/a (other feature) |
| KP-046 Try-On / Hairstyle Back keeps the style | n/a (other feature) |
| KP-047 Masks survive returning from Artwork or Store | n/a (other feature) |
| KP-048 Arabic may keep Western digits | n/a (the sale defines English and Japanese art only, Q-10) |
| KP-049 Localised strings keep their placeholders | R-021 |
| KP-050 RTL mirrors layout, not only text | n/a (no RTL art in the spec, Q-10) |
| KP-134 Android Adjustment Undo switches the tab | n/a (other feature) |

### Request ledger coverage
Every open table entry of requests.md for android.

| Ledger entry | Requirements |
|---|---|
| REQ-001 | R-001 – R-072 (the whole table) |
| REQ-002 | n/a (platform scope: this Android table only) |
