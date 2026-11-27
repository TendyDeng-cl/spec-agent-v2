# Update plan — Cinematic Reel Creator photo tips (ios), draft 20261125-160000

Based on approved v1 (19 rows). Same spec set; the change comes from the request ledger (REQ-002, REQ-007).

## Summary
- New: 26 rows in a new last section **MUI** (TC-020 – TC-045), one walk per language of `library/pdr/product.json` ›
  `mui`: the template cards, all six photo tips sheets and the Add Media 「?」 sheet, translation and truncation together
  (the app bundle cannot be read on the QA iPhone). The CMS text is compared with the 2026-11-25 sheets' column for
  that language; the app's own strings are judged (no sheet).
- Modified: none. Removed: none.

## Requirements
- New R-028 (translation) and R-029 (truncation); `### Variants` gains a line per requirement × language.
- Q-2 gains a line: the product list (REQ-002) expects the chip and sentence translated; a miss cites DRA262611P0290.

## How the rows run
- The MUI rows are their own phase `MUI` in phases.json, one segment per language, run on request (string freeze, new
  languages, before release), never part of a full run. Each walk ends with a plain `launch`.
- Nothing is generated: the walk opens sheets and the Add Media room only.

## Not added
- Card order and pictures per language (the Android Language rows, REQ-006): the iOS table has not taken in the
  2026-11-25 spec set yet; that is its own update.
- English is the base language, already walked by TC-001 – TC-016.
