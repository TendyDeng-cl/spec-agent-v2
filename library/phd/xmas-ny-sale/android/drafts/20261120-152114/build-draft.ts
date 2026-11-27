// Builds draft.csv for phd/xmas-ny-sale android (draft 20261120-152114). Run: node <this file>
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type Row = { id: string; sec: string; pre: string; act: string; exp: string; pri: string; ref: string; notes?: string };

// shared setup lines
const APP = 'Android phone, PhotoDirector (build under test), Test server on (fixtures.md)';
const FREE = 'Free user (「Set to subscriber」 off, KP-131)';
const PAID = 'Paid user (「Set to subscriber」 on, KP-131)';
const TRIAL = 'Google account that has never used the PhotoDirector free trial (trial user)';
const NOTRIAL = 'Google account that has already used the PhotoDirector free trial (non-trial user)';
const date = (d: string) => `Phone date and time set to ${d} local time (automatic date and time off, Q-1)`;
const XMAS = date('2026/12/15 10:00');
const NY = date('2026/12/30 10:00');
const pre = (...lines: string[]) => lines.length === 1 ? lines[0] : lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
const steps = (...lines: string[]) => lines.length === 1 ? lines[0] : lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
const exp = (...lines: string[]) => lines.join('\n');

const S1 = 'Sale period', S2 = 'IAP page', S3 = 'Launcher IAP icon', S4 = 'Interstitial', S5 = 'Credit IAP page', S6 = 'Splash page and Mine';
const CHECKOUT = 'Google Play checkout sheet';

const rows: Row[] = [
  // ---- Sale period ----
  { id: 'TC-001', sec: S1, pre: pre(APP, FREE, TRIAL, date('2026/12/10 23:55')), act: steps('Force-stop and launch the app', 'Look at the Launcher IAP icon', 'Tap the Launcher IAP icon and look at the IAP page'),
    exp: exp('Step 1: no sale interstitial appears', 'Step 2: the regular IAP icon, no Santa hat and no countdown bubble', 'Step 3: the Monthly plan shows its regular price with nothing struck through, the regular first banner thumbnail and the regular CTA colour (not gold)'),
    pri: 'P1', ref: 'R-001, R-002', notes: 'The day before the Xmas Sale.' },
  { id: 'TC-002', sec: S1, pre: pre(APP, FREE, TRIAL, date('2026/12/11 00:01')), act: steps('Force-stop and launch the app', 'Close the interstitial with ×', 'Look at the Launcher IAP icon'),
    exp: exp('Step 1: the Xmas sale interstitial appears', 'Step 3: the IAP icon is the gold crown with a Santa hat'),
    pri: 'P1', ref: 'R-001, R-030, R-040', notes: 'First minute of the Xmas Sale.' },
  { id: 'TC-003', sec: S1, pre: pre(APP, FREE, TRIAL, date('2026/12/27 23:50')), act: steps('Force-stop and launch the app', 'Close the interstitial with ×', 'Look at the Launcher IAP icon', 'Tap it and look at the Monthly plan'),
    exp: exp('Step 1: an Xmas interstitial picture (A or B) appears', 'Step 3: the Santa-hat crown icon', 'Step 4: the Monthly plan shows the struck-through regular price and the sale price'),
    pri: 'P2', ref: 'R-001', notes: 'Last minutes of the Xmas Sale.' },
  { id: 'TC-004', sec: S1, pre: pre(APP, FREE, TRIAL, date('2026/12/28 00:01'), 'The day before was run in the Xmas Sale (TC-003)'), act: steps('Force-stop and launch the app', 'Close the interstitial with ×', 'Look at the Launcher IAP icon', 'Tap it and look at the IAP page'),
    exp: exp('Step 1: the NY interstitial (「Happy new year」) appears, not an Xmas picture', 'Step 3: the champagne-glasses icon, no Santa hat', 'Step 4: the first banner thumbnail is the gold NY 「Sale」 picture and the Monthly plan still shows the sale price'),
    pri: 'P1', ref: 'R-001, R-005, R-031, R-043', notes: 'Xmas → NY change at midnight.' },
  { id: 'TC-006', sec: S1, pre: pre(APP, FREE, TRIAL, date('2027/01/05 23:50')), act: steps('Force-stop and launch the app', 'Close the interstitial with ×', 'Tap the Launcher IAP icon and look at the Monthly plan'),
    exp: exp('Step 1: the NY interstitial appears', 'Step 3: the Monthly plan still shows the struck-through regular price and the sale price'),
    pri: 'P2', ref: 'R-001', notes: 'Last minutes of the NY Sale.' },
  { id: 'TC-005', sec: S1, pre: pre(APP, FREE, TRIAL, date('2027/01/06 00:01')), act: steps('Force-stop and launch the app', 'Look at the Launcher IAP icon', 'Tap it and look at the IAP page', 'Go back, open Mine and tap 「Buy Now」 on the 「My Credits」 card'),
    exp: exp('Step 1: no sale interstitial appears', 'Step 2: the regular IAP icon, no champagne glasses and no countdown bubble', 'Step 3: regular Monthly price with nothing struck through, regular first thumbnail and CTA colour', 'Step 4: no festive banner and no discount pack', 'Step 4: only the regular packs and offers'),
    pri: 'P1', ref: 'R-001, R-002, R-060', notes: 'The day after the NY Sale.' },

  // ---- IAP page ----
  { id: 'TC-010', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'On the Launcher (interstitial closed)'), act: 'Tap the Launcher IAP icon (Santa-hat crown)',
    exp: exp('The IAP page 「PhotoDirector Premium」 opens', 'The first banner thumbnail is the red Xmas 「Sale」 picture, followed by 「Object Removal」 and 「Body Reshape」', 'The CTA button is gold (as in the Black Friday sale)', 'Gold sparkle decorations are drawn around the plan rows'),
    pri: 'P1', ref: 'R-004, R-013, R-014, R-015, R-036' },
  { id: 'TC-011', sec: S2, pre: pre(APP, FREE, TRIAL, NY, 'On the Launcher (interstitial closed)'), act: 'Tap the Launcher IAP icon (champagne glasses)',
    exp: exp('The IAP page opens', 'The first banner thumbnail is the gold NY 「Sale」 picture, followed by 「Object Removal」 and 「Body Reshape」', 'The CTA button is gold', 'Gold sparkle decorations are drawn around the plan rows'),
    pri: 'P1', ref: 'R-004, R-013, R-014, R-015, R-036' },
  { id: 'TC-012', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'IAP page open from the Launcher IAP icon'), act: 'Look at the Yearly and Monthly plan rows',
    exp: exp('Monthly: the regular monthly price struck through above the sale price (mockup 「$6.99/month」 → 「$5.99/month」)', 'The sale price is 15% below the regular monthly price (rounded to the store price point)', 'Yearly: the regular yearly price (mockup 「$29.99/year」) with its 「SAVE …%」 tag', 'Write down the 「SAVE …%」 percentage shown (Q-7)'),
    pri: 'P1', ref: 'R-010, R-011, R-012', notes: 'Design draws the plan rows with sample values (「$125/month」, 「$690/month」, 「SAVE 75%」); the PM mockup values are the closer sample. Prices are checked against checkout in TC-018 / TC-019.' },
  { id: 'TC-013', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'IAP page open from the Launcher IAP icon'), act: 'Choose Yearly and look above and on the CTA',
    exp: exp('「Recieve 30 credits during free trial」 shows above the CTA', 'The gold CTA reads 「Start 7-Day Free Trial」'),
    pri: 'P2', ref: 'R-016' },
  { id: 'TC-014', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'IAP page open, Yearly chosen'), act: 'Look at the text under the CTA',
    exp: exp('The Design line 「Auto-renewal  for {yearly price}/year」 with the real yearly price (Q-4)', 'Below it 「Terms of Service」, 「Privacy Policy」, 「Restore Purchase」', 'No literal 「{price}」 anywhere'),
    pri: 'P2', ref: 'R-017, R-018, R-021', notes: 'Q-4: the PM page puts 「7 days free, then {price}/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.」 here; check on device and record which one shows before filing anything.' },
  { id: 'TC-015', sec: S2, pre: pre(APP, FREE, NOTRIAL, XMAS, 'IAP page open from the Launcher IAP icon'), act: 'Choose Yearly and look at the CTA and the text under it',
    exp: exp('The CTA reads 「Subscribe for {yearly price}/year」 with the real price', 'Under it: 「{yearly price}/year, charged today. Renews yearly until canceled. Manage or cancel in Google Play > Subscriptions.」', 'No literal 「{price}」'),
    pri: 'P2', ref: 'R-019, R-021', notes: 'PM-only: no Design frame draws the non-trial state yet (Design 2026-11-17).' },
  { id: 'TC-016', sec: S2, pre: pre(APP, FREE, NOTRIAL, XMAS, 'IAP page open from the Launcher IAP icon'), act: 'Choose Monthly and look at the CTA and the text under it',
    exp: exp('Under the CTA: 「{sale monthly price}/month, charged today. Renews monthly until canceled. Manage or cancel in Google Play > Subscriptions.」 with the sale price (not the struck-through one)', 'No literal 「{price}」'),
    pri: 'P2', ref: 'R-020, R-021', notes: 'PM-only: no Design frame draws the Monthly state yet.' },
  { id: 'TC-018', sec: S2, pre: pre(APP, FREE, NOTRIAL, XMAS, 'IAP page open, Monthly chosen', 'adb logcat running'), act: steps('Tap the CTA', 'Read the product and price on the Google Play checkout sheet', 'Close the sheet without buying'),
    exp: exp('Step 1: the Google Play checkout sheet opens for a monthly subscription', 'Step 2: its price equals the sale price on the IAP page', 'Step 2: the log names SKU 「monthly_subscription_2026_xmas_newyear」', 'Step 3: back on the IAP page with nothing bought'),
    pri: 'P1', ref: 'R-010, R-022' },
  { id: 'TC-019', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'IAP page open, Yearly chosen'), act: steps('Tap 「Start 7-Day Free Trial」', 'Read the checkout sheet', 'Close the sheet without buying'),
    exp: exp('Step 2: the checkout sheet is the regular yearly subscription at the yearly price shown on the page, with a 1-week free trial', 'Step 3: back on the IAP page'),
    pri: 'P2', ref: 'R-022' },
  { id: 'TC-020', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'IAP page open from the Launcher IAP icon'), act: steps('Tap × at the top left of the IAP page', 'Tap the Santa-hat icon again', 'Press Android system Back'),
    exp: exp('Step 1: the IAP page closes and the Launcher shows as before, with the Santa-hat icon', 'Step 3: the same as step 1'), pri: 'P3', ref: 'R-036' },
  { id: 'TC-021', sec: S2, pre: pre(APP, FREE, TRIAL, NY, 'On the Launcher (interstitial closed)'), act: steps('Open Mine', 'Tap 「Upgrade Now」 on the 「Upgrade to Pro+」 card'),
    exp: exp('The IAP page opens with the sale: NY first thumbnail, gold CTA, Monthly sale price with the regular price struck through'),
    pri: 'P2', ref: 'R-004, R-010, R-013, R-014' },
  { id: 'TC-022', sec: S2, pre: pre(APP, FREE, TRIAL, XMAS, 'On the Launcher (interstitial closed)'), act: steps('Open a Premium-locked feature or item (a Premium template or tool marked with the crown)', 'Tap the item so the IAP page opens'),
    exp: exp('The IAP page opens with the sale: Xmas first thumbnail, gold CTA, Monthly sale price with the regular price struck through'),
    pri: 'P2', ref: 'R-004, R-010, R-013, R-014' },
  { id: 'TC-023', sec: S2, pre: pre(APP, FREE, NOTRIAL, XMAS, 'Google Play license-tester account with 「Test card, always approves」 (no charge; needs the user\'s go-ahead)', 'IAP page open, Monthly chosen'), act: steps('Tap the CTA', 'Buy with the test card', 'Return to the app and open Mine'),
    exp: exp('Step 2: the purchase completes at the sale monthly price', 'Step 3: Mine shows the paid (VIP) state (KP-015)', 'Step 3: the Launcher IAP icon is no longer the free-user sale icon'),
    pri: 'P1', ref: 'R-023, R-033', notes: 'Parked: needs purchase (license tester and go-ahead). Cancel the test subscription afterwards in Google Play › Subscriptions.' },

  // ---- Launcher IAP icon ----
  { id: 'TC-030', sec: S3, pre: pre(APP, FREE, XMAS, 'On the Launcher (interstitial closed)'), act: 'Look at the top right of the Launcher',
    exp: exp('Beside the gear, the IAP icon is the gold crown wearing a Santa hat', 'No countdown bubble (more than 72 hours left)'),
    pri: 'P1', ref: 'R-030, R-034' },
  { id: 'TC-031', sec: S3, pre: pre(APP, FREE, NY, 'On the Launcher (interstitial closed)'), act: 'Look at the top right of the Launcher',
    exp: exp('The IAP icon is two champagne glasses with sparkles', 'No countdown bubble (more than 72 hours left)'),
    pri: 'P1', ref: 'R-031, R-034' },
  { id: 'TC-032', sec: S3, pre: pre(APP, FREE, NY, 'On the Launcher (interstitial closed)', 'Screen recording running'), act: 'Watch the IAP icon for 10 seconds',
    exp: exp('The glasses clink and the sparkles move in a loop of about 2.4 s', 'The loop restarts without a jump and keeps playing for the whole 10 s'),
    pri: 'P3', ref: 'R-032', notes: 'Evidence: screen recording. Design annotation: 42 × 46, 60 fps, 144 frames, `ny_ani_cheers.json`, `lottie_loop` / `lottie_autoPlay` true.' },
  { id: 'TC-033', sec: S3, pre: pre(APP, FREE, date('2026/12/24 23:58:00')), act: steps('Launch the app and close the interstitial', 'Watch the Launcher IAP icon until the clock passes 2026/12/25 00:00:00'),
    exp: exp('Before 00:00:00: no countdown bubble on the icon', 'From 2026/12/25 00:00:00 (72 hours before the Xmas Sale ends): a countdown bubble shows 「72:00:00」 or just under it'),
    pri: 'P1', ref: 'R-034', notes: 'PM-only: no Design frame draws the bubble (Q-3). Xmas Sale end taken as 2026/12/27 24:00 local time.' },
  { id: 'TC-034', sec: S3, pre: pre(APP, FREE, date('2026/12/26 09:00')), act: steps('Launch the app and close the interstitial', 'Watch the countdown bubble for 5 seconds', 'Force-stop, launch again and look at the bubble'),
    exp: exp('Step 2: the bubble shows the time left to 2026/12/27 24:00 (about 38:59:xx) and counts down each second', 'Step 3: after the relaunch it shows the same remaining time, not a restarted 72:00:00'),
    pri: 'P2', ref: 'R-034', notes: 'PM-only (Q-3).' },
  { id: 'TC-035', sec: S3, pre: pre(APP, FREE, date('2027/01/02 23:58:00')), act: steps('Launch the app and close the interstitial', 'Watch the NY icon until the clock passes 2027/01/03 00:00:00'),
    exp: exp('Before 00:00:00: champagne-glasses icon with no bubble', 'From 2027/01/03 00:00:00 (72 hours before the NY Sale ends): a countdown bubble starting at 「72:00:00」 and counting down'),
    pri: 'P1', ref: 'R-034', notes: 'PM-only (Q-3).' },
  { id: 'TC-038', sec: S3, pre: pre(APP, FREE, date('2026/12/27 23:59:30'), 'On the Launcher with the countdown bubble showing'), act: 'Watch the IAP icon until the clock passes 2026/12/28 00:00:10',
    exp: exp('The bubble counts down to 00:00:00', 'Then the icon changes to the champagne glasses (NY) with no bubble', 'At no moment does the bubble show a negative time'),
    pri: 'P2', ref: 'R-034, R-005', notes: 'PM-only; what happens at 00:00:00 is Q-3 (assumption shown).' },
  { id: 'TC-036', sec: S3, pre: pre(APP, PAID, date('2026/12/26 09:00')), act: steps('Launch the app', 'Look at the top right of the Launcher'),
    exp: exp('Step 1: no sale interstitial', 'Step 2: the regular paid-user IAP icon, no Santa hat and no countdown bubble (although under 72 hours are left)'),
    pri: 'P1', ref: 'R-033, R-035, R-041' },
  { id: 'TC-037', sec: S3, pre: pre(APP, PAID, date('2027/01/04 09:00')), act: steps('Launch the app', 'Look at the top right of the Launcher'),
    exp: exp('Step 1: no sale interstitial', 'Step 2: the regular paid-user IAP icon, no champagne glasses and no countdown bubble'),
    pri: 'P1', ref: 'R-033, R-035, R-041' },

  // ---- Interstitial ----
  { id: 'TC-040', sec: S4, pre: pre(APP, FREE, TRIAL, date('2026/12/16 09:00'), 'The app not yet launched on 2026/12/16'), act: 'Force-stop and launch the app',
    exp: 'The sale interstitial appears over the Launcher (an Xmas picture)', pri: 'P1', ref: 'R-040' },
  { id: 'TC-041', sec: S4, pre: pre(APP, FREE, TRIAL, date('2026/12/16 09:10'), 'TC-040 done: the interstitial already shown today and closed'), act: 'Force-stop and launch the app again',
    exp: exp('No sale interstitial this time (Q-2)', 'The Launcher opens directly'), pri: 'P2', ref: 'R-040', notes: 'Q-2: once a day assumed; if it shows on every launch, record and ask PM.' },
  { id: 'TC-042', sec: S4, pre: pre(APP, FREE, TRIAL, 'TC-041 done', date('2026/12/17 09:00')), act: 'Force-stop and launch the app',
    exp: 'The sale interstitial appears again on the first launch of the new day', pri: 'P2', ref: 'R-040' },
  { id: 'TC-043', sec: S4, pre: pre(APP, FREE, TRIAL, 'App language English', date('2026/12/18 09:00')), act: steps('Force-stop and launch the app, note the picture and close it with ×', 'Set the date one day later, force-stop and launch, note the picture and close it', 'Set the date one more day later, force-stop and launch, note the picture'),
    exp: exp('The pictures take turns: A, B, A (or B, A, B), never the same twice in a row', 'Picture A: red-gold room with gifts and a tree', 'Picture B: green background with the snow globe', 'Both read 「Merry Christmas」'),
    pri: 'P1', ref: 'R-042, R-044, R-045' },
  { id: 'TC-044', sec: S4, pre: pre(APP, FREE, TRIAL, 'App language English', date('2026/12/29 09:00')), act: steps('Force-stop and launch the app, note the picture and close it', 'Set the date one day later, force-stop and launch, note the picture'),
    exp: exp('Both times the same single NY picture: cream and gold with balloons and gifts', 'The headline reads 「Happy new year」'),
    pri: 'P1', ref: 'R-043, R-044, R-045' },
  { id: 'TC-045', sec: S4, pre: pre(APP, FREE, TRIAL, XMAS, 'The sale monthly and regular yearly checkout prices known from TC-018 / TC-019'), act: 'Look at the text under the headline',
    exp: exp('「SAVE」, then the big number with 「%」 equal to [(sale monthly × 12) − yearly] ÷ (sale monthly × 12) rounded down (with $5.99 and $29.99: 「58」, Q-6)', '「vs. paying {sale monthly price}/month × 12」 with the sale monthly price', 'The yearly price 「{price}/year」 equal to the regular yearly price'),
    pri: 'P1', ref: 'R-046, R-047', notes: 'Design shows 「57」 and the PM note 「70%」 as samples; the formula decides.' },
  { id: 'TC-046', sec: S4, pre: pre(APP, FREE, TRIAL, XMAS, 'Sale interstitial shown'), act: 'Look at the CTA and the text under it',
    exp: exp('The CTA reads 「Get 7-Day Free Trial」', 'Under it: 「7 days free, then {yearly price}/year. Auto-renews yearly until canceled. To avoid being charged, cancel in Google Play > Subscriptions at least 24 hours before the trial ends.」 with the real yearly price', 'No literal 「{price}」'),
    pri: 'P2', ref: 'R-048, R-050, R-021', notes: 'Q-5: the PM note and mockup say 「Start 7-Day Free Trial」; Design (2026-11-17) is followed. Check on device before filing.' },
  { id: 'TC-047', sec: S4, pre: pre(APP, FREE, NOTRIAL, XMAS, 'Sale interstitial shown'), act: 'Look at the CTA and the text under it',
    exp: exp('The CTA reads 「Subscribe for {yearly price}/year」 with the regular yearly price', 'Under it: 「{yearly price}/year, charged today. Renews yearly until canceled. Manage or cancel in Google Play > Subscriptions.」', 'No literal 「{price}」'),
    pri: 'P2', ref: 'R-049, R-051, R-021', notes: 'PM-only: no Design frame draws the non-trial interstitial yet.' },
  { id: 'TC-048', sec: S4, pre: pre(APP, FREE, TRIAL, XMAS, 'Sale interstitial shown'), act: steps('Tap the CTA', 'Read the checkout sheet', 'Press Android system Back to close the sheet without buying'),
    exp: exp('Step 1: the Google Play checkout sheet opens', 'Step 2: the regular yearly subscription at the yearly price shown on the interstitial, with a 1-week free trial', 'Step 3: the interstitial is shown again (Q-11)'),
    pri: 'P1', ref: 'R-052' },
  { id: 'TC-049', sec: S4, pre: pre(APP, FREE, TRIAL, 'App language Japanese', XMAS), act: 'Force-stop and launch the app on a day the interstitial has not been shown yet',
    exp: exp('The Xmas interstitial uses the Japanese art: the headline reads 「メリー クリスマス」', 'The rest of the page (percentage, prices, CTA, footer) is in Japanese or English as the app shows it today, with no cut-off text'),
    pri: 'P2', ref: 'R-045, R-044', notes: 'Q-10: languages other than Japanese get the English art.' },
  { id: 'TC-050', sec: S4, pre: pre(APP, FREE, TRIAL, 'App language Japanese', NY), act: 'Force-stop and launch the app on a day the interstitial has not been shown yet',
    exp: 'The NY interstitial uses the Japanese art: the headline reads 「あけまして おめでとう」', pri: 'P2', ref: 'R-045' },
  { id: 'TC-051', sec: S4, pre: pre(APP, FREE, TRIAL, XMAS, 'Sale interstitial shown'), act: 'Tap × at the top left',
    exp: 'The interstitial closes and the Launcher shows as before with the Santa-hat icon', pri: 'P1', ref: 'R-053' },
  { id: 'TC-052', sec: S4, pre: pre(APP, FREE, TRIAL, NY, 'Sale interstitial shown'), act: 'Press Android system Back',
    exp: exp('The interstitial closes like ×', 'The app does not exit and the Launcher shows'), pri: 'P2', ref: 'R-053' },
  { id: 'TC-053', sec: S4, pre: pre(APP, FREE, TRIAL, XMAS, 'Sale interstitial shown'), act: steps('Tap 「Terms of Service」, read the page, go back', 'Tap 「Privacy Policy」, read the page, go back', 'Tap 「Restore purchase」'),
    exp: exp('Steps 1–2: each link opens its page and Back returns to the interstitial', 'Step 3: the restore runs and ends with a message (nothing to restore for a free account)'),
    pri: 'P3', ref: 'R-054' },
  { id: 'TC-054', sec: S4, pre: pre(APP, PAID, date('2026/12/16 09:00'), 'The app not yet launched on 2026/12/16'), act: steps('Force-stop and launch the app', 'Set the date to 2026/12/30 09:00, force-stop and launch again'),
    exp: 'Neither launch shows a sale interstitial', pri: 'P1', ref: 'R-041' },

  // ---- Credit IAP page ----
  { id: 'TC-058', sec: S5, pre: pre(APP, FREE, XMAS, 'On the Launcher (interstitial closed)'), act: steps('Open Mine', 'Tap 「Buy Now」 on the 「My Credits」 card'),
    exp: exp('The Credit IAP page opens', 'Its top shows the Xmas festive banner picture (it may read 「SALE」) behind 「My credit」 and the balance'),
    pri: 'P2', ref: 'R-060, R-061, R-072' },
  { id: 'TC-059', sec: S5, pre: pre(APP, FREE, NY, 'On the Launcher (interstitial closed)'), act: steps('Open Mine', 'Tap 「Buy Now」 on the 「My Credits」 card'),
    exp: 'The top of the Credit IAP page shows the NY festive banner picture, not the Xmas one', pri: 'P2', ref: 'R-060, R-061' },
  { id: 'TC-060', sec: S5, pre: pre(APP, FREE, XMAS, 'Credit IAP page open', 'adb logcat running'), act: steps('Look at the offer card under 「Get more free bonus credits!」', 'Tap the offer card', 'Tap the purchase button at the bottom (「Get … credits for …!」) and read the checkout sheet', 'Close the sheet without buying'),
    exp: exp('Step 1: the discount pack of 500 credits, styled like the first-purchase pack, with the 「SANTA BONUS OFFER」 tag (name 「santa bonus pack」)', 'Step 1: a Christmas decoration at the card\'s top right', 'Step 2: the purchase button names 500 credits and the card price', 'Step 3: the checkout price equals the card price, 20% below the regular 500-credit pack', 'Step 3: the log names SKU 「phd_500_credit_freeuser_summer_sale」', 'Step 4: back on the Credit IAP page'),
    pri: 'P1', ref: 'R-062, R-065, R-066', notes: 'Q-9: the mockup price 「$49.99」 is a sample; the SKU price decides.' },
  { id: 'TC-061', sec: S5, pre: pre(APP, FREE, NY, 'Credit IAP page open'), act: 'Look at the offer card under 「Get more free bonus credits!」',
    exp: exp('The discount pack of 500 credits at the same price as in the Xmas Sale', 'Its tag and name are the NY ones (「year-end sale」), not 「SANTA BONUS OFFER」', 'No Christmas decoration on the card'),
    pri: 'P1', ref: 'R-062, R-065, R-066' },
  { id: 'TC-062', sec: S5, pre: pre(APP, PAID, 'Account eligible for Credit Auto Pass (fixtures.md)', XMAS, 'Credit IAP page open'), act: 'Look at the offer card under 「Get more free bonus credits!」',
    exp: 'The Credit Auto Pass offer shows instead of the discount pack (Q-8)', pri: 'P2', ref: 'R-064', notes: 'Q-8: the PM note and the mockup caption disagree on which eligibility decides.' },
  { id: 'TC-063', sec: S5, pre: pre(APP, PAID, 'Account eligible for neither Credit Auto Pass nor the first-purchase offer (fixtures.md)', XMAS, 'Credit IAP page open', 'adb logcat running'), act: steps('Look at the offer card', 'Tap it', 'Tap the purchase button at the bottom and read the checkout sheet', 'Close the sheet without buying'),
    exp: exp('Step 1: the discount pack of 1000 credits with the sale tag and the Christmas decoration', 'Step 3: the checkout price equals the card price, 20% below the regular 1000-credit pack', 'Step 3: the log names SKU 「phd_1000_credit_paiduser_summer_sale」', 'Step 4: back on the Credit IAP page'),
    pri: 'P1', ref: 'R-063, R-064, R-066', notes: 'Q-9.' },
  { id: 'TC-064', sec: S5, pre: pre(APP, PAID, 'Account that can still make the first credit purchase and is not eligible for Auto Pass (fixtures.md)', XMAS, 'Credit IAP page open'), act: 'Look at the offer card',
    exp: 'The first-purchase offer shows (「SPECIAL OFFER」, 500 +500), not the discount pack (Q-8)', pri: 'P2', ref: 'R-064' },
  { id: 'TC-065', sec: S5, pre: pre(APP, FREE, XMAS, 'Credit IAP page opened from Mine 「Buy Now」'), act: steps('Tap ‹ at the top left of the Credit IAP page', 'Tap 「Buy Now」 again', 'Press Android system Back'),
    exp: exp('Step 1: the Credit IAP page closes and Mine shows again', 'Step 3: the same as step 1'), pri: 'P3', ref: 'R-060' },
  { id: 'TC-068', sec: S5, pre: pre(APP, FREE, XMAS, 'Credit IAP page open', 'The regular pack prices before the sale noted (TC-001 day)'), act: 'Look at the six regular packs',
    exp: 'The 50 / 100 / 200 / 500 / 1000 / 2000 credit packs show the same prices as before the sale', pri: 'P2', ref: 'R-068' },
  { id: 'TC-069', sec: S5, pre: pre(APP, FREE, NY, 'An AI feature open that shows the blue credit button'), act: 'Tap the blue credit button',
    exp: 'The Credit IAP page opens with the NY banner and the 500-credit discount pack', pri: 'P2', ref: 'R-060, R-061, R-062', notes: 'KP-020: the blue credit button opens Buy Credit.' },
  { id: 'TC-066', sec: S5, pre: pre(APP, FREE, XMAS, 'Google Play license-tester account with 「Test card, always approves」 (needs the user\'s go-ahead)', 'Credit IAP page open', 'Credit balance noted'), act: steps('Tap the 500-credit discount pack', 'Buy with the test card', 'Look at 「My credit」 and open 「Detail」'),
    exp: exp('Step 2: the purchase completes at the pack price', 'Step 3: the balance grows by 500 and Detail lists the purchase'),
    pri: 'P1', ref: 'R-067', notes: 'Parked: needs purchase (license tester and go-ahead).' },
  { id: 'TC-067', sec: S5, pre: pre(APP, PAID, 'Account eligible for neither Auto Pass nor the first purchase', XMAS, 'Google Play license-tester account with 「Test card, always approves」 (needs the user\'s go-ahead)', 'Credit IAP page open', 'Credit balance noted'), act: steps('Tap the 1000-credit discount pack', 'Buy with the test card', 'Look at 「My credit」 and open 「Detail」'),
    exp: exp('Step 2: the purchase completes at the pack price', 'Step 3: the balance grows by 1000 and Detail lists the purchase'),
    pri: 'P1', ref: 'R-067', notes: 'Parked: needs purchase (license tester and go-ahead).' },

  // ---- Splash page and Mine ----
  { id: 'TC-070', sec: S6, pre: pre(APP, FREE, XMAS), act: 'Force-stop and launch the app and look at the splash page',
    exp: 'The splash page shows the Christmas app icon (the logo with a reindeer in a Santa hat) above 「PhotoDirector」', pri: 'P2', ref: 'R-070', notes: 'Evidence: screen recording of the launch (the splash is short).' },
  { id: 'TC-071', sec: S6, pre: pre(APP, PAID, XMAS), act: 'Force-stop and launch the app and look at the splash page',
    exp: 'The splash page shows the Christmas app icon as for a free user (Q-13)', pri: 'P3', ref: 'R-070', notes: 'Evidence: screen recording of the launch.' },
  { id: 'TC-072', sec: S6, pre: pre(APP, FREE, XMAS, 'On the Launcher (interstitial closed)'), act: 'Open Mine and look at the 「My Credits」 card',
    exp: exp('The card carries the Christmas decoration (snowman, pine branches, gifts)', '「My Credits」, the balance and 「Buy Now」 are all readable and not covered by the decoration'),
    pri: 'P2', ref: 'R-071, R-072' },
  { id: 'TC-073', sec: S6, pre: pre(APP, PAID, XMAS), act: 'Open Mine and look at the 「My Credits」 card',
    exp: 'The card carries the Christmas decoration as for a free user (Q-13)', pri: 'P3', ref: 'R-071' },
  { id: 'TC-074', sec: S6, pre: pre(APP, FREE, NY), act: steps('Force-stop and launch the app and look at the splash page', 'Close the interstitial, open Mine and look at the 「My Credits」 card'),
    exp: exp('Step 1: the regular app icon on the splash page', 'Step 2: no Christmas decoration on the card'),
    pri: 'P2', ref: 'R-070, R-071, R-005' },
  { id: 'TC-075', sec: S6, pre: pre(APP, FREE, XMAS, 'Mine open'), act: 'Tap 「Buy Now」 on the decorated 「My Credits」 card',
    exp: 'The Credit IAP page opens with the Xmas banner and the discount pack', pri: 'P2', ref: 'R-072, R-060' },
];

const cols = ['ID', 'Section', 'Precondition', 'Action', 'Expected Result', 'Priority', 'Spec Ref', 'Notes', 'Change', 'Change Reason'];
const q = (s: string) => /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
const lines = [cols.join(','), ...rows.map(r => [r.id, r.sec, r.pre, r.act, r.exp, r.pri, r.ref, r.notes ?? '', 'new', ''].map(q).join(','))];
const out = join(dirname(fileURLToPath(import.meta.url)), 'draft.csv');
writeFileSync(out, '﻿' + lines.join('\n') + '\n');
console.log(`${rows.length} rows → ${out}`);
