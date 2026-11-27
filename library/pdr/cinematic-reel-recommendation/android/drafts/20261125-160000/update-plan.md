# Update plan — Cinematic Reel Creator photo tips (android), draft 20261125-160000

Based on approved v2 (75 rows). Same spec set; the change comes from the request ledger (REQ-002, REQ-007).

## Summary
- New: 1 row in a new last section **MUI** (TC-076): the app's own strings (chip, sheet sentence, headings,
  button) in every language, read from the build's APK (no phone, no credits).
- Modified: 52 Language rows (the cards and sheet pair of each of the 26 product languages): they already walk
  every language and check the CMS text exactly and 「not cut off」; they now also check that the chip and the sheet
  sentence are not cut off (and right-to-left layout for ARA, FAR, HEB). A separate truncation walk per language would
  repeat the same screens, so none is added.
- Unchanged: the English and Filipino Language rows (Filipino is in the sheets' 28 languages but not the product list).

## Requirements
- New R-035 (translation) and R-036 (truncation); `### Variants` gains a line per requirement × language.
- Q-2 gains a line: the product list (REQ-002) expects the chip and sentence translated; a miss cites DRA262611P0290.

## How the rows run
- The APK row is the phase `MUI` (segment `MUI-apk`), run on request, never part of a full run.
- The truncation checks ride on the Language rows, which belong to the rounds of the full run as before.
- Build 2611231 already shows the result: the APK has no translation of 「View photo tips」 or the sheet sentence in any
  language (DRA262611P0290, cited, not filed again).

## Not added
- A truncation walk per language: the Language rows already reach every screen of the feature in each language.
