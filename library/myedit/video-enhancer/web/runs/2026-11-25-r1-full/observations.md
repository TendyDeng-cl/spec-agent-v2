# Observations — R1 full run (web, MyEdit demo)

- **O-1** (TC-003, TC-004): the HD Video Converter SEO page (and AI Frame Interpolation: 「3 min」 / 「1.8 GB」) upload box reads 「Maximum file duration: 30 min」 and
  「Maximum file size: 1.8 GB」, although the upload opens the new Video Enhancer room (limits 8 min / 10 GB, TC-008).
  Evidence: screenshots/TC-003-seo.png.
- **O-2** (TC-010 – TC-021): two different import-error paths. The SEO page checks some limits itself and shows a light
  dialog whose button reads 「Got It」 (10 GB, over 1440p, AV1, over 8 min); the others (AVI, under 128 px, over 120 fps)
  it does not check: the page moves to the room's empty upload box with no message. The room's own upload box shows a
  dark dialog with 「Got it」 for all of them, at once on choosing the file (not after an upload).
- **O-3** (TC-025): the price rounds the length up to whole seconds: sample 10.01 s × 2 credits/sec → 「Enhance 22」.
  For R1-c (price rows) to confirm against the spec.
- **O-4** (TC-085, TC-088): the room's over-limit paths follow the Knowledge Center's code-derived rule
  (derived-video-enhancer-v2-settings.md › Replace and Trim), not the PM spec: Replace Video over the current Mode's
  limit opens the Trimmer at once (no red text), and Continue Editing (Video Trimmer sidebar › Video Enhancer) with an
  8:20 clip shows 「Video Too Long」 (Cancel / Start New) instead of opening the room with the Trimmer.
- **O-5** (TC-036): the Mode ⓘ tooltip is interactive and covers the Enhance Style ⓘ; moving straight down keeps the
  Mode tooltip open until the pointer leaves it.
- **O-6** (TC-041): Replace Video keeps the chosen Output Resolution (Original stayed selected for a 1440p clip,
  whose fresh-upload default is 4K). For R1-c / R1-f to judge against R-025 if a row covers it.
- **O-7** (run): Chrome on port 9333 went away once during `upload selectFile fx-5m12` (setInputFiles timeout, then no
  Chrome); `restart` relaunched it and the room came back with the 5:12 clip loaded.
- **O-8** (TC-042 – TC-051): at 1 credit per second the line reads 「Enhance 7.30 seconds (1 credit/sec)」 (singular);
  the rows expected 「(1 credits/sec)」, filled in mechanically from the PM template 「({credits} credits/sec)」. Judged
  Pass (TC-083 in R1-b did the same); the rows' Expected Result wants 「1 credit/sec」 at the next table Save.
- **O-9** (run, R1-d ~15:50): while TC-091 was generating, a tab with https://business-demo.myedit.online/jp appeared as tab 0 of the
  run's Chrome (port 9333) and became the front tab; this segment did not open it (another session using the same
  Chrome?). The room moved to tab 1; the run switched with `tab 1` and left the other tab alone.
- **O-10** (TC-089 – TC-092, TC-116): results come out at the expected size and fps, except 720P from 854×480 is 1278×720
  (not 1280×720). Recent Gen in the room is per visit: after leaving and coming back it is empty, and the results are
  only in My Library. The room's toolbar 「Open in Video Editor」 sends the room's source clip, not a selected Recent Gen
  result (TC-117).
- **O-11** (TC-120, run): the 3:00 job charged in TC-120 (-180, 16:12) was left running (about 22 min); the Video
  Enhancer folder holds this segment's results 261125_1531 / 1536 / 1541 / 1555 / 1612 / 1613 plus the Agent one.
  Results were downloaded to `downloads/` (TC-089 – TC-092, TC-091 reused for TC-117). device-web has no download
  command; this segment used a throw-away playwright helper (removed) and CDP network throttling for TC-119. A `download`
  and a `throttle` command would avoid that next time.
- **O-12** (TC-113, TC-115): the 「result is ready」 mails arrive about 1 min after the job ends, one mail per job.
- **O-13** (R1-e, run): Chrome on Windows will not make the window narrower than 500 px, so `device-web window 375 812`
  gives 500 × 812. R1-e held 375 × 812 with a CDP `Emulation.setDeviceMetricsOverride` (mobile:false, a narrow desktop
  window, no phone user agent) from a throw-away helper kept running beside the segment (scratchpad, not in the repo);
  the page's own layout switched to its phone layout (bottom sheets, tab bar). A `device-web window --emulate` (or
  `viewport`) command would make this repeatable. The SEO-page 「Processing...」 lasts only 1 – 3 s; caught with a
  50 ms screenshot loop.
- **O-14** (TC-101, TC-104): on the phone layout, upload 「Processing...」 is a full-screen state (summary and Enhance not
  shown), while 「Creating Your Video」 is a dialog over the room with the summary and Enhance greyed behind it. The
  Processing label once read 100% while the bar was about 80% full.
- **O-15** (TC-107, TC-108): the old room's Back closes the panel and shows the tool menu, which has no Video
  Restoration (as TC-007); reloading empties the room. Old-room results: TC-109 (375, default options, -16, 16:26) and
  TC-108 (1440, Lighting only, -8, 16:29) are both in My Library › Video Restoration; the desktop job took about 7 min.
- **O-16** (TC-141): in the settings panel a hovered unselected option (rgb 180,231,245) is only a shade darker than the
  selected one (rgb 200,236,246), so while the pointer is on 720P both 720P and 1080P look selected. Judged Pass (the
  states differ); for Design to confirm with the Design file (Q-8).
- **O-17** (TC-132, run): as O-7, `upload selectFile fx-5m12` timed out and Chrome on port 9333 did not answer for the
  next two commands; this time it came back by itself (same pid, the 5:12 clip loaded) but the browser log capture had
  stopped, so it was started again (`logs start`, 16:49). Console lines from ~16:47–16:49 may be missing.
- **O-18** (TC-129, TC-130, TC-117): clicking 「Replace Video」 in the room (default account) first opens the dark
  「Allow Data Processing for Better Experience」 consent dialog (unticked checkbox, Continue); the run did not accept it
  (closed with ×) and replaced through the file input as every other row does. The Original / Result preview opened
  from a finished Recent Gen card has an 「Open in Editor」 button (bottom right); TC-117 (R1-d) recorded no Open in
  Editor route for a result, so TC-117 should be rechecked through this button.
- **O-19** (TC-135 – TC-143): with a video uploaded and no job yet in this visit, Recent Gen still reads 「Start by
  uploading a video to generate your video」 (R-042 says that text is for before any upload).
- **O-20** (TC-138): the run did not find a second signed-in SEO page to compare the missing 「Get Credits」 with (/en/photo-editor/enhance is a 404); whether the SEO header lacks it site-wide is open.
- **O-21** (R1-f, run): credits this segment (stage2 ledger, Product MyEdit, Video Enhancer): -8 (16:52, TC-128),
  -10 (16:59, TC-131, Original because 720P is disabled for a 1080×1920 clip), -60 (17:04, TC-145); 4578 → 4500.
  Throw-away helpers in the scratchpad (CDP viewport override, reload with beforeunload, progress watcher, file chooser,
  download, signed-out context) stand in for missing device-web commands (`viewport`, `download`, `reload --dialog`).
- **O-22** (TC-147, TC-148): on the storage-full Free account the storage-full prompt is 「You’ve reached your cloud
  storage limit.」 with 「Generate Anyway」 and 「Upgrade」 (no 「Manage」, KP-065); 「Generate Anyway」 keeps the result in
  My Library › Video Enhancer with 「23 hours left」 while storage stays 5 GB / 5 GB, and the Recent Gen card carries a
  red cloud mark. The stage2 ledger is not signed in on the storage-full profile (mauth-stage asks), so its -8 rests on
  the account-menu balance (4810 → 4802).
- **O-23** (TC-117 recheck): old results are not listed in a new visit's Recent Gen and My Library's preview has no
  「Open in Editor」, so a result made earlier can reach Video Editor only from the room it was made in; the recheck
  spent one 8-credit 720P 60 fps job. Video Editor's project save got two HTTP 429 on PUT /api/cloud/resources/…/files
  (as in R1-d). The port-9333 Chrome window changed size by itself to 1442 × 786 at 1.25 device pixel ratio mid-row
  (another session or display change); restored to 1440 × 900. DevTools connects to port 9333 timed out several times
  (15 s) while a video played; retries worked.
- **O-24** (TC-139): signed out, Enhance shows no price number (「Enhance」 only) while the line under it still prices it
  (「(2 credits/sec)」); the fresh profile's cookie banner is in Traditional Chinese on the /en/ page.

- **O-25 (2026-11-25, recheck of TC-088 at the user's request):** Video Trimmer with a 10 s 480p clip (fx-10s) › sidebar AI Generate › Video Enhancer opens the Video Enhancer room with the clip loaded (00:10, Enhance 20, 2 credits/sec), no dialog. So the Continue Editing path works; only a clip over 8:00 (fx-8m20) gets 「Video Too Long」 instead of the Trimmer the PM spec names. Not enhanced (no charge). Evidence screenshots/TC-088-recheck-10s.png.
- **O-26 (2026-11-25, recheck of TC-088 with 8:20 at the user's request):** same path with fx-8m20: the dialog opens while still in Video Trimmer (URL /video-trimmer/edit), 「Video Too Long」 「Sorry, this tool does not support videos longer than 8 minutes. To continue using this tool, please trim your video first.」 Cancel / Start New; Cancel keeps the 8:20 clip in Video Trimmer, where it can be trimmed. Evidence screenshots/TC-088-recheck-8m20.png.
- **O-27 (2026-11-25, TC-020 retest):** a video whose audio the room rejects (fx-flac24, FLAC decoding to s32) gets 「Audio Codec Not Supported」 in the room's upload box, but on the SEO page it shows no dialog and opens an empty room — the same SEO-page gap as TC-010 / TC-014 / TC-016 (ISS-VEW-03). AC-3 (fx-ac3) is caught on the SEO page too.
- **O-28 (2026-11-25, TC-018 retest):** a Matroska file named .mp4 (fx-mkv-vfr) is silently ignored, on the SEO page and in the room: no dialog, nothing imported, no feedback. Unusual file; noted, not drafted.
