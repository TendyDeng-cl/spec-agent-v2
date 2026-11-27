# Xmas & NY Sale — board notes (spec set 2026-11-20, Figma only)

Read 2026-11-20 from the Figma text layers (inventory reads d-xmas and p-xmas) and the board screenshots in
`figma/`. No arrows on either page.

## PM page 「11E Christmas Sale」 (PhD MX IAP Page, 14724:43579), section 「spec」

### pm-note — the spec note
- [Subscription] Monthly 15% off; country Global; all entries; 2026/12/11–12/27 Xmas Sale, 2026/12/28–2027/01/05 NY
  Sale (local time).
- IAP page CTA gold during the sale (same as Black Friday).
- Free users: Launcher IAP icon changes; countdown bubble from 72:00:00 (both sales); the interstitial on daily launch.
- Interstitial: prices from the SKU; the big % computed by the app: [(sale monthly × 12) − regular yearly] ÷ (sale
  monthly × 12) (the note's 「70%」 is a sample); picture from CMS; CTA opens the checkout panel for the regular yearly.
- CTA strings: trial 「Start 7-Day Free Trial」, non-trial 「Subscribe for {price}/year」; policy text under the CTA for
  trial, non-trial yearly and monthly (exact strings in requirements R-018 – R-020, R-050, R-051).
- Xmas only: splash icon, Mine credit card decoration (same as last year); interstitial two pictures alternate A/B;
  NY one picture.
- SKU monthly_subscription_2026_xmas_newyear.
- [Credit] free user 500 / paid user 1000 pack 20% off, same countries / entries / period; pack names santa bonus pack /
  year-end sale (same as last year), tag and style like the first-purchase pack; festive banner ×2 (Xmas, NY), may say
  SALE; Xmas long pack decorated; paid: Auto Pass if eligible else discount pack; free: always discount pack (500
  threshold lower than the first purchase's 1000). SKUs phd_500_credit_freeuser_summer_sale,
  phd_1000_credit_paiduser_summer_sale.

### Mockups and captions
- pm-iap 「IAP Page」: caption 「火車頭加圖片, Xmas *1, NY *1 / BF 的金色 UI」; Monthly 「$6.99/month」 struck, 「$5.99/month」;
  Yearly 「$29.99/year」 「SAVE 58%」; gold 「Start 7-Day Free Trial」 with the trial policy text under it (PM).
- pm-credit-paid 「Credit IAP Page」: caption 「Paid user: 有首購資格 → 首購 / 沒首購資格 → 折扣 pack」 (differs from the note,
  Q-8); 「Special Offer」 500 +500 $99.99; banner 「圖片, Xmas *1, NY *1」.
- pm-credit-free: caption 「Free user: 一律顯示折扣 pack」; 「SANTA BONUS OFFER」 500 $49.99 with xmas_deco; 「Get 300 Free
  Credits Each Month!」.
- pm-interstitial 「Interstitial」: caption 「圖片, Xmas *2, NY *1」; 「Save 58% vs. paying $5.99 / month × 12」, 「$29.99 / year」,
  「Start 7-Day Free Trial」, policy text, footer links.
- pm-interstitial-ref: an earlier PowerDirector sale frame (「Save 70% vs. paying $8.49/month × 12」) with a Google Play
  (TestFlight) checkout sheet: reference for 「CTA opens the checkout」 only.
- pm-launcher 「Launcher - IAP icon」: the crown with a Santa hat beside the gear (Xmas).
- pm-splash 「Splash page (Xmas only)」: logo with a reindeer in a Santa hat.
- pm-mine 「Mine tab (Xmas only)」: 「My Credits」 card with snowman, pine and gifts; 「Buy Now」.

### Controls (Figma read)
Interstitial ×, CTA; IAP ×, CTA; Credit IAP ‹, offer card, purchase button, 「GO」; Launcher IAP icon (btn_premium);
Mine 「Buy Now」. Launcher and Mine controls other than these are unchanged by the sale (traced n/a).

## Design page 「261117_xmas_NY_sale」 (IAP, 9627:6), dated 2026-11-17 by its name

- d-interstitial-xmas-a / -b, d-interstitial-ny: 「Merry Christmas」 / 「Happy new year」, 「SAVE」 「57」 「%」 (sample),
  「vs. paying $5.99/month × 12」, 「$29.99」 「/year」, CTA 「Get 7-Day Free Trial」 (PM: 「Start …」, Q-5), trial policy text,
  footer 「Terms of Service | Privacy Policy | Restore purchase」, × top left.
- d-iap-xmas / d-iap-ny: 「PhotoDirector Premium」; first thumbnail the Xmas (red) or NY (gold) 「Sale」 picture; gold
  sparkles 「NY_deco」 round the plans; plan values are samples (「$125/month」, 「$690/month」, 「SAVE 75%」); 「Recieve 30
  credits during free trial」, 「Start 7-Day Free Trial」, 「Auto-renewal  for $29.99/year」 (Q-4), footer links. A countdown
  row 「23 : 59 : 59」 exists but is hidden (not part of the spec).
- d-launcher-ny: NY IAP icon 「NY_ani」 (champagne glasses), Figma annotation: Lottie 42 × 46, 60 fps, 144 frames (2.4 s),
  seamless loop; Android `@raw/ny_ani_cheers`, loop and autoplay on. The Launcher content itself is a sample.
- d-assets (section 「cut」): interstitial art EN and JPN (「メリー クリスマス」, 「あけまして おめでとう」), IAP thumbnails.
- Loose link 「JSON下載路徑」 (OneDrive folder) above the Launcher: animation files, not readable here (Q-12).
- Hidden frames (older Christmas paywall drafts, a font option, 「Frame 1」) are not drawn and were not read as spec.
