# The Video Enhancer room

## KF-001 Over-limit Replace in Professional opens the Trimmer
- kind: rule · platform: web · use: analysis, run, ebug · tags: limits, replace, trim, continue-editing · authority: spec
- source: Video Enhancer web run 2026-11-25-r1-full O-4 (TC-085, TC-088); KC features/video-enhancer-v2.md › 影片長度限制, PM confirmed 2026-11-26 (user relayed 2026-11-26, REQ-012) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

Replace Video with a clip over the current Mode's limit opens 「Trim Video」 at once (hint 「Professional mode supports
videos up to 2:30 long. Please trim your video to continue.」); after Trim the clip replaces the video with no red text,
Cancel keeps the old clip. The red 2:30 text applies only when Professional is chosen with a video already over 2:30.
Until 2026-11-26 the spec wanted the red text after Replace, so MYE261124P0033 asked for that; under today's spec it
is not a bug. The Continue Editing half (over 8:00 from Video Trimmer shows 「Video Too Long」) is PM ruling #1c76d4b60c73.

## KF-002 Two import-error paths: SEO page and room
- kind: fact · platform: web · use: analysis, run, ebug · tags: import, limits, dialog, seo
- authority: observed · source: Video Enhancer web run 2026-11-25-r1-full O-2 (TC-010 – TC-021) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

The SEO page itself rejects over 10 GB, over 1440p, AV1 and over 8 min with a light dialog (「Got It」); AVI, under
128 px and over 120 fps it passes on, landing on the room's empty upload box with no message. The room's own upload
box rejects all of them with a dark dialog (「Got it」), at once on choosing the file, not after an upload.

## KF-003 Replace Video first asks for data-processing consent
- kind: howto · platform: web · use: run · tags: replace, consent, dialog · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-18 · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

On the default account, clicking 「Replace Video」 opens the dark 「Allow Data Processing for Better Experience」 dialog
(unticked checkbox, Continue) before any file picker. Runs close it with × and replace through the file input
(`upload`); never accept the consent for the user.

## KF-004 Recent Gen exists only after an upload and only for this visit
- kind: fact · platform: web · use: analysis, run · tags: recent-gen, library, upload
- authority: observed · source: Video Enhancer web run 2026-11-25-r1-full O-10, O-19, O-23 (TC-096, TC-116) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

The room shows Recent Gen only once a video is uploaded (with no job yet it reads 「Start by uploading a video to
generate your video」). It lists only this visit's jobs: after leaving and coming back it is empty and the results
are only in My Library › Video Enhancer. A row needing a Recent Gen card uploads first.

## KF-005 A result reaches Video Editor only from its own room
- kind: fact · platform: web · use: analysis, run, ebug · tags: open-in-editor, recent-gen, video-editor
- authority: observed · source: Video Enhancer web run 2026-11-25-r1-full O-10, O-18, O-23 (TC-117) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

The route is the Original / Result preview of a finished Recent Gen card › 「Open in Editor」 (bottom right). The
room's toolbar 「Open in Video Editor」 sends the source clip, and My Library's preview has no Open in Editor, so an
older result needs a new job to reach Video Editor.

## KF-006 720P from an 854 × 480 source is 1278 × 720
- kind: quirk · platform: web · use: run, ebug · tags: output, resolution · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-10 (TC-089 – TC-092) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

Results come out at the chosen size and fps, except 720P from an 854 × 480 clip, which is 1278 × 720 (not 1280 × 720)
by ffprobe. Reported in the run; judge later runs against whatever PM rules.

## KF-007 Storage full: Generate Anyway keeps the result 24 hours
- kind: fact · platform: web · use: analysis, run, ebug · tags: storage, library, generation
- authority: observed · source: Video Enhancer web run 2026-11-25-r1-full O-22 (TC-147, TC-148) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

After 「Generate Anyway」 the job is charged and runs; the result is in My Library › Video Enhancer with 「23 hours
left」 while storage stays full (5 GB / 5 GB), and its Recent Gen card has a red cloud mark. The prompt on a Free
account offers 「Upgrade」, not 「Manage」 (KP-065 disputed).

## KF-008 The room's account menu is not the one `device-web credits` reads
- kind: howto · platform: web · use: run · tags: credits, account-menu, device-web · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full R1-f TC-138 (activity log) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

`device-web credits` looks for 「POL_DefaultPhd_AccountMenuButton」 (product.json), which the room does not have. In the
room click `id VOL_VideoEnhancerV2_AccountMenuButton` and read `texts` (「Credits: N」), or read `credits ledger` (or
the menu on another MyEdit page).
