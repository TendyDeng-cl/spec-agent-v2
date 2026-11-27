# Update plan — Recent Task Model Info (ios), draft 20261126-100000

Based on approved v1 (43 rows). Same spec set; the change comes from the request ledger (REQ-002).

## Summary
- New: 26 rows in a new last section **MUI** (TC-044 – TC-069) for the 26 languages of
  `library/pdr/product.json` › `mui`: one walk per language that checks translation and truncation together (the app bundle cannot be read on the QA iPhone).
- Modified: none. Removed: none.

## Requirements
- New R-080 (translation) and R-081 (truncation); `### Variants` gains a line per requirement × language; `### Request
  ledger coverage` cites REQ-002.

## How the rows run
- The MUI rows are their own phase, run on request (string freeze, new languages, before release), never part of a
  full run. This feature has no `phases.json` yet (no run has been planned), so the draft adds none; when the run plan
  is written, its `MUI` phase is one segment per language (`MUI-<tag>`: TC-044 … TC-069,
  in the order of the product list), each ending with a plain launch.
- Each walk reaches the screens the feature's rows reach, by those rows: My Artwork, the Recent pages of Image to Video,
  Text to Video, Cinematic Reel Creator, Text to Image and any other feature listed, edit mode (「Manage」, 「Select All」,
  「Deselect All」, 「Cancel」), the two result pages and the Image to Video model picker; one `texts` read and
  screenshot per screen. It generates and deletes nothing, so the phase runs after the rows that made the tasks
  (TC-003 – TC-030).
- Processing, failed and flagged cards are read only when the account holds one at that moment (no new task, no
  failure fixture); otherwise the row records them as not reached.
- The feature has no dialog, toast or tooltip of its own: none is on the walk.
- No translation sheet: the run judges each string (references/mui.md §3); doubtful translations go to the run's
  `mui-doubts.md` and the eBug review page's Translation doubts panel. Model names and task names are not app text.

## Not added
- Language × largest text size (TC-028) and language × Dark / Light (TC-042, TC-043): each is checked on its own in
  English; the walk runs at the default text size in the appearance the phone is in.
- A new generation per language to show the processing card or a completion notice: MUI walks start no task.
- The Text to Video model picker: the same picker component, read once on Image to Video for the model names.
- Result page controls (share icons, quick actions), the credit pill, 「View more」, the bottom tabs: other features.
- 「Delete」 and its confirmation: never tapped by this table.
