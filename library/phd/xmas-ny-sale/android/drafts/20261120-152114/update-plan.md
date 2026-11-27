# Update plan — phd/xmas-ny-sale / android: new table → draft 20261120-152114

## Spec files
- New: Xmas NY Sale - Design Figma 9627-6.md, Xmas NY Sale - PM Figma 14724-43579.md (Figma-only snapshots, spec set 2026-11-20)

## Case changes
- New (61): TC-001 – TC-075 (with gaps), seven sections: Sale period, IAP page, Launcher IAP icon, Interstitial, Credit IAP page, Splash page and Mine.

## Found by the analysis
- Annotation trace: 58 blocks traced (spec note, captions, mockups, the Figma annotation on the NY icon animation).
- Controls: 42 control groups traced (9 pressed, the Launcher and Mine controls the sale does not change n/a).
- Pass 4 numbers: the interstitial percentage formula (R-047, TC-045), 72:00:00 countdown start (R-034, TC-033 – TC-035), 15% / 20% discounts, 500 / 1000 credits.
- Pass 9 hidden clauses: local time, SKU ids, CMS picture, computed percentage (6 lines).
- Pass 10 variants: Xmas / NY, free / paid, trial / non-trial, Yearly / Monthly, English / Japanese, IAP entries, paid-user credit offer states.
- Boundaries: first and last minute of each sale, the Xmas → NY change, the day after the NY Sale (TC-001 – TC-006).

## Not added (value check)
- The country rule 「Global」 (R-003): not testable beyond the phone's own Google Play country — no row.
- The hidden IAP countdown row 「23 : 59 : 59」 on the Design IAP frames: hidden in Figma, not part of the spec — no row.
- Hidden Design frames (older Christmas paywall drafts, a font option): not drawn — no row.
- What a trial user sees with Monthly chosen on the IAP page: the spec is silent (Q-4) — no row.

## PM-only rows
- TC-015, TC-016 (non-trial and Monthly texts on the IAP page), TC-047 (non-trial interstitial CTA), TC-033 – TC-035, TC-038 (countdown bubble), TC-030 (Xmas Launcher icon), TC-058 – TC-068 (Credit IAP page), TC-070 – TC-075 (splash and Mine): no Design frame yet (Design 2026-11-17).

## Questions for PM
- Q-1 how a test build enters the sale period · Q-2 interstitial once a day or every launch · Q-3 countdown bubble look and end · Q-4 text under the IAP CTA (Design vs PM) · Q-5 interstitial CTA 「Get」 vs 「Start」 · Q-6 rounding of the percentage · Q-7 Yearly 「SAVE」 tag during the sale · Q-8 which credit offer a paid user gets · Q-9 discount pack prices and the reused 「summer_sale」 SKU ids · Q-10 languages of the interstitial art · Q-11 checkout back target · Q-12 the 「JSON下載路徑」 folder · Q-13 splash and Mine decoration for paid users.

## Questions for you
- Android only for now (REQ-002): the specs are written for Google Play. Should an iOS table follow?
- Purchases (TC-023, TC-066, TC-067) are parked until a license-tester account and your go-ahead.
