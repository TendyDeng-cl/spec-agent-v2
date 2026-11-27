# Update plan — Recent Task Model Info (android), draft 20261126-100000

Based on approved v1 (46 rows). Same spec set; the change comes from the request ledger (REQ-002).

## Summary
- New: 27 rows in a new last section **MUI** (TC-047 – TC-073) for the 26 languages of
  `library/pdr/product.json` › `mui`: one row (TC-047) reads translations from the build's APK (no phone, no credits), then one truncation walk per language on the phone.
- Modified: none. Removed: none.

## Requirements
- New R-080 (translation) and R-081 (truncation); `### Variants` gains a line per requirement × language; `### Request
  ledger coverage` cites REQ-002.

## How the rows run
- The MUI rows are their own phase, run on request (string freeze, new languages, before release), never part of a
  full run. This feature has no `phases.json` yet (no run has been planned), so the draft adds none; when the run plan
  is written, its `MUI` phase is the segment `MUI-apk` (TC-047) and one segment per language (`MUI-<tag>`: TC-048 … TC-073,
  in the order of the product list), each ending with a plain launch (`locale reset`).
- Each walk reaches the screens the feature's rows reach, by those rows: My Artwork, the Recent pages of Image to Video,
  Text to Video, Cinematic Reel Creator, Text to Image and any other feature listed, edit mode (「Manage」, 「Select All」,
  「Deselect All」, 「Cancel」), the two result pages and the Image to Video model picker; one `texts` read and
  screenshot per screen. It generates and deletes nothing, so the phase runs after the rows that made the tasks
  (TC-003 – TC-030).
- Processing, failed and flagged cards are read only when the account holds one at that moment (no new task, no
  failure fixture); otherwise the row records them as not reached.
- The feature has no dialog, toast or tooltip of its own: none is on the walk.
- `mui.json` gets no `android_prefixes`: the model tag adds no string (a model name is data), and the Recent page's
  short labels are shared resources whose names the repo cannot tell apart (build 2611231 holds 「Manage」 as
  `btn_manage` and `manage`, the notice as `image_to_video_recent_cloud_notice` and
  `ai_video_anime_recent_task_message`, many 「Cancel」 / 「Retry」). The APK read therefore takes the strings of three or
  more words the table quotes (the feature names, the notice, 「An Error Has Occurred」), and each walk also judges the
  translation of the short labels. Once RD or a view dump names the resources, add them to `mui.json` and drop that
  line from the walks.
- TR261123-0015 (2611201) did not implement the model tag (REQ-003): on such a build the walk's tag lines fail as the
  model rows do; cite that finding rather than filing it per language.
- No translation sheet: the run judges each string (references/mui.md §3); doubtful translations go to the run's
  `mui-doubts.md` and the eBug review page's Translation doubts panel. Model names and task names are not app text.

## Not added
- Language × largest text size (TC-028) and language × Dark / Light (TC-042, TC-043): each is checked on its own in
  English; the walk runs at the default text size in the appearance the phone is in.
- A new generation per language to show the processing card or a completion notice: MUI walks start no task.
- The Text to Video model picker: the same picker component, read once on Image to Video for the model names.
- Result page controls (share icons, quick actions), the credit pill, 「View more」, the bottom tabs: other features.
- 「Delete」 and its confirmation: never tapped by this table.
