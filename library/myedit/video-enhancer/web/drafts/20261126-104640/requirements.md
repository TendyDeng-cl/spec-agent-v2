# Video Enhancer V2 — requirements (web)
Spec: Video Enhancer V2 - PM Figma 10-2.md (text of the PM Figma page
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=10-2, read 2026-11-25 through
figma-pm / qa1; Figma-only spec set, no PDF), read beside the Knowledge Center PM spec `myedit/features/video-enhancer-v2.md`
(PM Erin Chiu, ready_for_rd, updated 2026-11-24, 23 answered questions; analysis.md standing input 7) and the stage
credit table `myedit/credit-actions/videoenhancev2.md` (2026-11-10).

Tags: [PMF:<board>] the PM Figma board in `extracted/boards/`; [KC] the Knowledge Center spec, [KC#<id>] one of its
answered questions; [KC:credits] the stage credit table; [KC:settings] `product-rules/derived-video-enhancer-v2-settings.md`.
Where the PM Figma and the Knowledge Center spec differ, the newer item wins (the KC spec is updated to 2026-11-24 and
cites the questions that changed the Figma notes); each difference is listed under Open questions.
Design: the Design Figma (vVDdw55BCWr94ZF7MJRVgx, page 1045:10519, UI owner Mini) is not inventoried yet (step 10
owed); rows quote PM Figma strings and are checked again when the Design is read.
Platform: web, desktop Chrome at 1440 × 900 unless a row says otherwise; mobile-web rows hold the page at 375 × 812 with a
CDP device-metrics override (a narrow desktop window, mobile:false, no phone user agent): Chrome on Windows will not
size a window under 500 px (R1 O-13). "Phone-width window" below means this narrow window.
Draft 20261126-104640 (REQ-008) applies the R1 run's table fixes (runs/2026-11-25-r1-full/report.md); changed
requirements carry "[R1 …]" with the run finding.

## Entries and rooms
- R-001 [PMF:pm-1-info; PMF:pm-8-old-room; KC] The Video Enhancer entry opens the new room at /video-editor/video-enhancer/edit.
- R-002 [KC#2f23bec67749; KC] The HD Video Converter entry in the top menu and More Tools keeps its SEO page /video-editor/hd-video-converter, and that page leads into the new Video Enhancer room.
- R-003 [KC#2f23bec67749; KC] The AI Frame Interpolation entry keeps its SEO page /video-editor/ai-frame-interpolation, and that page leads into the new Video Enhancer room.
- R-004 [PMF:pm-1-info; PMF:pm-8-old-room] The Video Denoiser entry opens the old room at /video-editor/video-denoiser/edit.
- R-005 [PMF:pm-1-info; PMF:pm-8-old-room] The Video Brightener entry opens the old room at /video-editor/video-brightener/edit.
- R-006 [PMF:pm-8-old-room; KC] /video-editor/video-restoration/edit opens the old room (Video Restoration).
- R-007 [KC#646ef76308aa, #d9497315c276] Video Restoration is not in the top menu (desktop or mobile); it is reachable from the Launcher and the left tool menu.
- R-008 [Req: REQ-009; KC#ec5715b6ac73 (replaces #b29e724be991)] Video Enhancer carries the 「Enhanced」 tag, never 「New」, in the top menu (desktop and mobile); the Launcher card (Home › Popular Tools) carries no 「Enhanced」 tag (latest MX spec).
- R-009 [KC#ce875ff0bfd2] The three new-room entries (Video Enhancer, HD Video Converter, AI Frame Interpolation) open the room with the same default settings (R-025).

## SEO page and upload
- R-010 [KC#842d15e20293; PMF:pm-2-seo] The upload box lists, in this order, 「Supported file formats: MP4, MOV」, 「Maximum file duration: 8 min」 and 「Maximum file size: 10 GB」, and shows no resolution limit (Q-6).
- R-107 [Req: REQ-008; KC#2f23bec67749, #842d15e20293; R1 O-1] The HD Video Converter SEO page (/video-editor/hd-video-converter), which leads into the new room, lists the same limits as R-010: 「Supported file formats: MP4, MOV」, 「Maximum file duration: 8 min」, 「Maximum file size: 10 GB」, with no resolution line (Q-13).
- R-108 [Req: REQ-008; KC#2f23bec67749, #842d15e20293; R1 O-1] The AI Frame Interpolation SEO page (/video-editor/ai-frame-interpolation) lists the same limits as R-010 (Q-13).
- R-011 [PMF:pm-3-pc-flow] Choose a file, drag and drop, and a sample video each open the tool room with the video.
- R-012 [PMF:pm-3-pc-flow] While the video uploads the room shows 「Processing...」 with a percentage and 「It may take a few seconds. Please don't leave this page.」; every setting and Enhance are disabled until the upload ends.

## Input limits
- R-013 [KC; PMF:pm-2-seo] MP4 and MOV videos are accepted.
- R-014 [PMF:pm-9-errors; KC] A file that is not MP4 or MOV shows 「Unsupported File Format」 / 「Only MP4 and MOV formats are supported. Please choose another video.」 with 「Got it」, and is not imported.
- R-015 [PMF:pm-9-errors; KC] A file over 10 GB shows 「File Size Too Large」 / 「This video exceeds the 10 GB file size limit. Please choose a smaller video.」 with 「Got it」.
- R-016 [PMF:pm-9-errors; KC] A video over 1440p shows 「Video Resolution Not Supported」 / 「This video exceeds the supported resolution limit (1440p). Please choose another video.」 with 「Got it」; a 1440p video is accepted.
- R-017 [PMF:pm-9-errors; KC#b396530f653b] A video whose shorter side is under 128 px shows 「Video Resolution Not Supported」 / 「This video is below the minimum supported resolution (shorter side of 128 px). Please choose another video.」 with 「Got it」; a shorter side of exactly 128 px is accepted.
- R-018 [PMF:pm-9-errors; KC#548d568d4290] A video over 120 fps (actual value, not rounded) shows 「Video Frame Rate Not Supported」 / 「This video exceeds the supported frame rate limit (120 fps). Please choose another video.」 with 「Got it」; exactly 120 fps is accepted.
- R-019 [PMF:pm-9-errors; KC#253838ae2393, #2b46acf4dae8] (not testable: no file with an unreadable frame rate can be made; not tested, user 2026-11-26, REQ-013) A video whose frame rate cannot be read shows 「Unable to Use This Video」 / 「This video cannot be enhanced because it is missing required information, such as the frame rate. Try uploading a different video.」 with 「Got it」 and cannot be enhanced.
- R-020 [KC#2a3d4654a75e] H.264 and HEVC (H.265) videos are accepted; an AV1 video shows 「Unsupported Format」 / 「This video contains an unsupported video codec. Please choose another video.」 with 「Got it」.
- R-021 [KC#2a3d4654a75e] A video with an unsupported audio codec or audio format shows the old room's 「Audio Codec Not Supported」 or 「Audio Format Not Supported」 dialog.
- R-022 [KC#4c092911b0fb; PMF:pm-10-pro-length] Uploading a video longer than 8:00 opens the Trimmer (at most 8:00 selectable) with 「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」 bottom left; after Trim only the trimmed part is imported. A video of exactly 8:00 is imported without the Trimmer. The entry pages (SEO page, import page) do not block length: an over-8:00 video uploads, the room opens, then the Trimmer opens; 「Maximum file duration: 8 min」 stays in the upload box [KC, PM 2026-11-26; REQ-012].
- R-023 [KC#4c092911b0fb; PMF:pm-9-errors] (not testable: not tested, user 2026-11-26, REQ-015) Only when the Trimmer cannot be used does an over-8:00 upload show 「Video Too Long」 / 「This video exceeds the 8-minute length limit. Please choose a shorter video.」 with 「Got it」.

## Settings panel
- R-024 [PMF:pm-3-pc-flow; KC] The panel title is 「Video Enhancer Settings」 with four settings: Mode (Standard, Professional), Enhance Style (HD, Natural), Output Resolution (Original, 720P, 1080P, 4K), Frame Rate (Same as source, 50, 60, 100, 120 fps); Replace Video and Trim Video sit above the preview.
- R-025 [PMF:pm-3-pc-flow; KC] Defaults are Standard, HD, 1080P and Same as source; for a 1080p or 1440p source the Output Resolution default is 4K.
- R-026 [PMF:pm-5-disabled-options; KC] Output Resolution options at or below the source are disabled: a 480p source has all enabled; 720p disables 720P; 1080p and 1440p disable 720P and 1080P. Original is always selectable.
- R-027 [PMF:pm-5-disabled-options; KC#78c100376ddb] Frame Rate options at or below the source fps (rounded) are not shown, nor those above four times the source fps; a 120 fps source shows only Same as source.
- R-028 [PMF:pm-3-pc-flow; KC#548d568d4290] The ⓘ tooltips read: Mode 「Standard: Balanced enhancement. Works well for most videos. Professional: Stronger restoration for older or badly compressed footage. Takes much longer to process. Supports videos up to 2:30.」; Enhance Style 「HD: A crisper, more detailed picture. Best when footage looks soft or blurry. Natural: A gentler result that stays true to the original. Best when footage already looks good.」; Output Resolution 「Resolution adjustment is supported up to 4K. Options lower than or equal to the original resolution are unavailable.」; Frame Rate 「Frame rate adjustment is supported up to 120 fps.」

## Price
- R-029 [PMF:pm-3-pc-flow; KC; KC:credits] Only Mode, Output Resolution and Frame Rate change the price; Enhance Style does not.
- R-030 [Req: REQ-008; PMF:pm-3-pc-flow; KC:settings] Enhance shows the total credits = the video's seconds rounded up × the per-second rate, and below it 「Enhance {seconds to 2 decimals} seconds ({rate} credits/sec)」 (Q-4); at a rate of 1 it reads 「(1 credit/sec)」, singular [R1 O-8] (Q-14).
- R-031 [PMF:pm-3-pc-flow; KC] Hovering the ⓘ by the price shows 「Total credits depend on video duration and selected mode, resolution, and frame rate.」
- R-032 [KC:credits; KC:settings] Per-second rates (stage): Standard 720p 1/1/1, 1080p 2/2/2, 4K 3/6/8; Professional 720p 2/4/8, 1080p 4/8/16, 4K 12/24/48 credits for ≤30 / ≤60 / ≤120 fps output (Q-5).
- R-033 [KC:settings] Original is priced by the source's shorter side (≤720 → 720p, ≤1080 → 1080p, else 4K); Same as source by the source fps tier (≤30, ≤60, ≤120); 50 / 60 fps are the ≤60 tier and 100 / 120 fps the ≤120 tier.
- R-034 [KC#37c46c3048be, #7938786ae16d] There is no free trial: every account, including a Free account without enough credits, sees the normal credit price and never 「1 Free Trial」.
- R-035 [KC:settings] When no rate is found for a setting set, no price shows and Enhance cannot be pressed (never 0 credits). Not testable from the UI: every option the panel offers has a rate (R-032); listed for the Not added list.

## Professional length limit
- R-036 [PMF:pm-10-pro-length; KC] With a video longer than 2:30, Professional can still be selected, but Enhance is disabled and 「Professional mode supports videos up to 2:30.」 shows in red under Mode.
- R-037 [PMF:pm-10-pro-length; KC] The 2:30 check reruns on switching Mode, Replace Video and finishing Trim: back to Standard, or a video of 2:30 or less, removes the red text and enables Enhance. The red text applies when Professional is chosen with a video already over 2:30 (PM 2026-11-26); Replace over 2:30 is R-111.
- R-111 [Req: REQ-012; KC, PM 2026-11-26] In Professional, Replace Video with a video over 2:30 opens the Trimmer (at most 2:30, the Professional hint bottom left); after Trim the clip replaces the video with no red text; Cancel in the Trimmer keeps the original video.
- R-038 [PMF:pm-10-pro-length; KC] In Professional the Trimmer selects at most 2:30: the handle stops at the limit and an End Time past it is set to Start Time + 2:30; in Standard the limit is 8:00.
- R-039 [PMF:pm-10-pro-length; KC] The Trimmer's bottom-left hint shows only when the source is over the mode's limit: Professional 「Professional mode supports videos up to 2:30 long. Please trim your video to continue.」, Standard 「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」
- R-040 [Req: REQ-010; PMF:pm-10-pro-length; KC; KC#1c76d4b60c73] A clip over 8:00 brought in by Continue Editing from a tool other than Video Trimmer opens the Trimmer first (at most 8:00), and Enhance works only after Trim.
- R-110 [Req: REQ-010; KC#1c76d4b60c73 (PM Erin Chiu, 2026-11-26); KC: derived-video-continue-editing-checks step 4] Exception: Continue Editing from Video Trimmer with a clip over 8:00 opens no Trimmer; Video Trimmer shows the 「Video Too Long」 dialog: 「Start New」 opens a new project of the new Video Enhancer, 「Cancel」 stays in Video Trimmer (shared by all video tools).

## Generate and result
- R-041 [PMF:pm-3-pc-flow; KC] Enhance starts the job in Recent Gen as the old room did, and Recent Gen shows 「The generated videos can be found in My Library」 with 「My Library」 as a link.
- R-042 [Req: REQ-008; PMF:pm-3-pc-flow; R1 TC-096, KF-004] With a video uploaded and no job yet in this visit, Recent Gen shows 「Start by uploading a video to generate your video」 (board 3 draws it on the Default Settings screen; before any upload the room shows no Recent Gen).
- R-043 [PMF:pm-3-pc-flow; KC] The result is also saved in My Library › Video Enhancer.
- R-044 [PMF:pm-3-pc-flow; KC] After a job for the same video finishes, Enhance stays disabled until a setting changes, Replace Video loads another video or Trim changes the part.
- R-045 [PMF:pm-3-pc-flow] Preview, Replace Video and Trim Video behave as in the original Video Enhancer.
- R-046 [KC:credits; run-web.md] Enhance charges the quoted credits once, and the credit ledger shows the job under MyEdit with the tool's name.
- R-078 [user 2026-11-25, Q-1; relaxed by the user 2026-11-26, REQ-014] An upload error (format, size, resolution, frame rate, codec, audio) shows its dialog and the video is not imported; the moment it shows (on choosing the file or after the upload) is not checked. R1 saw the dialogs at once on choosing the file (KF-002).
- R-047 [PMF:pm-3-pc-flow; KC] The result has the chosen output: its resolution follows Output Resolution (Original = the source's) and its frame rate follows Frame Rate (Same as source = the source's).
- Held R-048 [KC] Open in Editor is supported on results as in other video generation tools; its desktop place is not decided (Q-2).

## Mobile web
- R-049 [Req: REQ-008; PMF:pm-4-mobile; KC; R1 O-13] On a phone-width window (375 × 812 by the CDP override, not a phone user agent) the room shows 「Processing...」 with a percentage and 「It may take a few seconds. Please don’t leave this page.」 while uploading, with the summary and Enhance dimmed.
- R-050 [PMF:pm-4-mobile; KC] On a phone-width window the room shows the summary 「Video Enhancer Settings」 with one line per setting (Mode | Standard, Enhance Style | HD, Output Resolution | 1080P, Frame Rate | Same as source), Enhance with credits and 「Enhance {seconds} seconds ({rate} credits/sec)」.
- R-051 [PMF:pm-4-mobile; KC] Editing opens the panel with every option of the four settings and Replace Video / Trim Video above; Frame Rate opens a bottom sheet with the options R-027 allows.
- R-052 [PMF:pm-4-mobile; KC] Generating shows 「Creating Your Video」 with a percentage and 「Please do not close this window or click the Back button on your browser.」; when sent, the page goes to My Library › Video Enhancer.
- R-053 [PMF:pm-4-mobile; KC#a392c8ab593e] On a phone-width window, Professional with a video over 2:30 shows 「Video longer than 2:30」 in red under 「Mode | Professional」 in the summary and 「Professional mode supports videos up to 2:30.」 in the edit panel; Enhance is disabled until Standard or 2:30 or less.

## Video Restoration (old room)
- R-054 [PMF:pm-8-old-room; KC#ef6131aa247d] The old room is named Video Restoration and its panel title is 「Video Restoration Settings」.
- R-055 [PMF:pm-8-old-room; KC] Its options are, in order, Lighting Adjustment, Video Denoise, Video Upscaler, Frame Interpolation.
- R-056 [PMF:pm-8-old-room; KC] The option of the entry used is ticked on arrival (Denoiser → Video Denoise, Brightener → Lighting Adjustment); /video-restoration/edit ticks Lighting Adjustment and Video Denoise.
- R-057 [KC#d9497315c276] The panel keeps its Back button; after Back, the left menu's Video Restoration reopens the four-option panel.
- R-058 [PMF:pm-8-old-room; KC] Old-room results go to My Library › Video Restoration, and on a phone-width window the old room also goes straight to My Library › Video Restoration.

## My Library
- R-059 [PMF:pm-7-library; KC] My Library has a new Video Enhancer folder for new-room results, with the note 「Results from the new Video Enhancer are saved here. For results from the original Video Enhancer, go to Video Restoration.」
- R-060 [PMF:pm-7-library; KC] The former Video Enhancer folder is renamed Video Restoration, shows 「(Formerly Video Enhancer)」, keeps the earlier results and has the note 「The original Video Enhancer has been renamed to Video Restoration. Your previous results are still here. Results from the new Video Enhancer are saved in the Video Enhancer folder.」
- R-061 [KC#68c4aafc0467] /{lang}/cloud/library/video/video-enhancer opens the new Video Enhancer folder and /video-restoration the Video Restoration folder.

## Emails
- R-062 [PMF:pm-6-edm; KC] A finished new-room job sends 「Your Video Enhancer result is ready!」, body 「Your Video Enhancer has been generated successfully. Click the button below to view the results and start using your video.」 (Figma 2026-11-26, KC; REQ-012), with 「Access Your Video Enhancer」 linking to My Library › Video Enhancer.
- R-063 [PMF:pm-6-edm; KC] (not testable: not tested, user 2026-11-26, REQ-015) A failed new-room job sends 「Your Video Enhancer result failed to generate.」 whose reason reads 「…content that violates our policy, or temporary server issues…」 and names My Library › Video Enhancer.
- R-064 [PMF:pm-6-edm; KC] Video Restoration sends its own complete and failed emails (「Your Video Restoration result is ready!」 / 「…failed to generate.」) linking to Video Restoration.

## Other tools
- R-065 [PMF:pm-5-agent; KC] The Agent completes a Video Enhance V2 use case in Video Enhancer, always in Standard mode, and asks the user to trim a video over 8 minutes; a restoration use case is done with Video Edit by Chat.
- R-066 [KC#b903e329a3e7] A video over 30 fps entering Video Editor shows the 3-second toast 「This {fps} fps video will export at 30 fps. Your original is unchanged.」 (two or more: 「Videos above 30 fps will export at 30 fps. Your originals are unchanged.」), once per video per session.
- R-067 [KC#89dc53e3a2b3] The Pricing page names the new tool Video Enhancer and the old one Video Restoration.

## Open questions
- Q-8 [Design not read] The Design Figma (page 1045:10519) is not inventoried yet, so controls and strings come from the PM Figma (step 10 owed).
- Q-13 [R-107, R-108] The PM spec gives the V2 upload limits (8 min, 10 GB) and says the HD Video Converter and AI Frame Interpolation SEO pages lead into the new room, but does not say their upload boxes change; the site and the Knowledge Center's website-derived landing-page notes still give 30 min / 3 min and 1.8 GB. Assumption: both boxes show the V2 limits like R-010 (TC-151, TC-152).
- Q-14 [R-030] The spec template is 「({credits} credits/sec)」 (plural); at 1 credit per second the site reads 「(1 credit/sec)」. Assumption: the singular is the right English and passes (TC-042 – TC-051, TC-083).
- Q-15 [R-094] The team Get Credit rule (disputed in knowledge.md) wants Get Credits on every working screen; the Knowledge Center's code-derived header page says a credit tool's import (SEO) page shows none, as the site does. Assumption: Get Credits is checked in the room only (TC-138); PM to confirm.
- Q-16 [R-104, R-109] The team storage-full rule (disputed in knowledge.md) says the storage-full prompt offers Manage; the Knowledge Center's code-derived storage page says Upgrade while a higher cloud plan exists and Manage only on Studio Pro, as the Free account showed. Assumption: as the Knowledge Center page (TC-147 Upgrade, TC-153 Manage); PM to confirm.
- Q-17 [R-030] Knowledge Center question #ae8127264e43 (2026-11-26, waiting for PM): the seconds under Enhance may change from 2 decimals to whole seconds (「Enhance 5 seconds (2 credits/sec)」). Assumption: the rows keep 2 decimals until PM answers; if it changes, every price row's second line changes.

## Answered questions (user, 2026-11-25, REQ-004)
- Q-1 Upload errors show after the upload finishes, not on choosing the file → R-078; relaxed 2026-11-26 (REQ-014): the rows check the dialog and that the video is not imported, not the moment.
- Q-2 Open in Editor is skipped for now → R-048, R-073, R-074 held; their rows (TC-098, TC-123, TC-124) are left out of this table. R1 found the result preview's route (R-073 reworded, used by TC-117); un-holding is asked in update-plan.md (draft 20261126-104640).
- Q-3 The HD Video Converter / AI Frame Interpolation SEO page URLs stay → R-002, R-003 as written.
- Q-4 The total rounds the seconds up (8 × 3 = 24 for 7.3 s); the Figma 21 is illustrative → R-030 as written.
- Q-5 Only demo is in scope: its stage rates are checked; production prices are not part of this table → R-032.
- Q-6 The newer Knowledge Center decision holds for the SEO upload box → R-010 as written.
- Q-7 Trim re-enables Enhance after a finished job → R-044 as written.
- Q-9 The code-derived, unconfirmed rules are not tested now → R-070 – R-077 held; their rows (TC-121, TC-122, TC-125 – TC-127) are left out.
- Q-10 Cancelling while processing is skipped → no row (as before).
- Q-11 The room is a Light Mode page, as assumed (user, 2026-11-25, REQ-006) → R-101 and TC-144 stand; exact colours wait for the Design read (Q-8).
- Q-12 UI languages are not checked now (user, 2026-11-25, REQ-006) → R-103 held, its row TC-146 left out; no MUI section.

## Knowledge Center rules (standing input 7, checkpoint 2026-11-25)
Source log: `knowledge-center.md` and `mcp-checkpoints.md` in this draft. R-068 and R-069 are an RD answer (#dfed049fda18,
merged into the KC rules); R-070 – R-077 are code-derived and unconfirmed (Q-9).
- R-068 [KC#dfed049fda18] Credits are deducted when Enhance creates the job session, before the video upload starts: the ledger shows the charge while the upload dialog is still running.
- R-069 [KC#dfed049fda18] Cancelling during the upload stops it before the job is sent, and the deducted credits come back automatically within 3–6 hours.
- Held R-070 [KC:settings] With too little cloud storage, Enhance shows the cloud storage prompt first and sends nothing.
- Held R-071 [KC:settings] When the credit check or the submit fails, the upload dialog closes and Enhance can be pressed again.
- Held R-072 [KC:settings] Clicking a finished result card in Recent Gen opens a side-by-side preview of the original and the result.
- Held R-073 [Req: REQ-008; KC:settings; R1 O-18, TC-117 recheck] The Original / Result preview opened from a finished Recent Gen card has 「Open in Editor」 (bottom right), which opens Video Editor with the result, not the original; seen on demo build 11242029, so no longer only code-derived. Still held with TC-123 until the user lifts Q-2 for it; TC-117 uses the route.
- Held R-074 [KC:settings] The top bar's Open in Editor (beside Replace Video and Trim Video) opens Video Editor with the uploaded video as it is now (after Replace or Trim), not a result.
- Held R-075 [KC:settings] At a window width of 1200 px or less, Recent Gen is not shown and result cards do not open the side-by-side preview.
- Held R-076 [KC:settings] Trim Video cannot be pressed until the video's information has been read.
- Held R-077 [KC:settings] A video brought in by Continue Editing goes through the same upload checks; a video that fails them shows the error dialog and the room does not open.

## Product rules (domain knowledge, standing input 6, 2026-11-25)
From `library/myedit/knowledge/` (KP-001 – KP-075, imported from the Contract Runner domain knowledge, user 2026-11-25).
They apply where the spec is silent; a tool value always comes from the spec. Applicability per rule: *Domain rules* below.
- R-079 [KB: KP-007, KP-008] The upload percentage and the job's progress start at 0, never go back, and end in a final state (done or failed); a job never stays processing for ever.
- R-080 [KB: KP-009] An upload cancelled by the user shows as cancelled, never as a failed generation.
- R-081 [KB: KP-010] (not testable: not tested, user 2026-11-26, REQ-015) A failed job shows an understandable message without reloading the page, and the uploaded video and settings stay for a retry.
- R-082 [KB: KP-011] While a job generates, Replace Video and Trim Video are disabled or leave the running job unaffected.
- R-083 [KB: KP-012] The downloaded result matches its preview: same content, orientation, aspect ratio and length as the source, and audio when the source has audio.
- R-084 [KB: KP-013, KP-069] A video with rotation metadata (a portrait phone video) shows upright in the preview, the Trimmer, the result and the download.
- R-085 [KB: KP-014, KP-070] The downloaded file's extension matches its real format (an .mp4 is MP4) and the name is not empty; the exact naming is not specified.
- R-086 [KB: KP-017] Previewing or downloading the same result again keeps it playable, never blank or broken.
- R-087 [KB: KP-023] In the Trimmer, clicking the timeline moves the playhead there and playback goes on from it; playing a trimmed range stops at its end.
- R-088 [KB: KP-025, KP-026] Leaving or reloading the room with an uploaded video not yet enhanced asks first: staying keeps the room as it was, leaving goes where the user asked.
- R-089 [KB: KP-027] Leaving the room before any upload shows no unsaved-changes warning.
- R-090 [KB: KP-028] Settings stay as chosen when the window crosses 1201 px (desktop panel ↔ mobile summary).
- R-091 [KB: KP-029] A playing preview pauses or stops on Enhance and on Replace Video.
- R-092 [KB: KP-031, KP-032, KP-068] After a reload the result is still in My Library › Video Enhancer, with its status current (processing → done).
- R-093 [KB: KP-034] The My Library item's thumbnail and length belong to that result.
- R-094 [Req: REQ-008; KC: derived-tool-header-credit-and-upgrade-buttons (code-derived, not confirmed); the team Get Credit rule is disputed in knowledge.md] Signed in, the room (edit screen) shows 「Get Credits」 at the top right; a credit tool's import (SEO) page shows none (Q-15).
- R-095 [KB: KP-039, KP-040, KP-043] With enough credits no credit-shortage dialog shows, the charge equals the price shown, and the account menu's balance updates without a reload.
- R-096 [KB: KP-041] A signed-out user pressing Enhance is asked to sign in; nothing is sent or charged.
- R-097 [KB: KP-045] Video Enhancer and Video Restoration carry the same names in the Launcher, the top menu, the left tool menu and Pricing.
- R-098 [KB: KP-050, KP-056] A disabled Enhance looks disabled and does nothing when clicked; hover, focus, selected and disabled states of the setting options are visible.
- R-099 [KB: KP-051, KP-058] Opening one settings menu closes another; a menu opens beside its selector, does not cover it and shows every option or scrolls to it.
- R-100 [KB: KP-052, KP-053] At a 1280 × 720 window and at 150 % zoom the settings, Enhance and Recent Gen stay reachable (by scrolling if needed), and a tooltip never hides Enhance.
- R-101 [KB: KP-054, KP-055, KP-057] The room is a Light Mode page: menus, the bottom sheet, the Trimmer, dialogs, toasts, the generating progress and Recent Gen cards are light with legible text and icons, with no dark flash and no structural element (frame, divider) dropped (Q-11).
- R-102 [KB: KP-060] Time codes (player, Trimmer, Recent Gen, My Library) never show xx:60; 60 seconds carry to the minute.
- Held R-103 [KB: KP-061, KP-062, KP-063] In another site language (/tw/) the room's texts, tooltips, dialogs and errors are in that language, with no raw string keys or English defaults, and longer texts stay readable (Q-12).
- R-104 [Req: REQ-008; KC: derived-cloud-storage-warnings-and-video-download-limit (code-derived, not confirmed); KB: KP-067; R1 TC-147; the team storage-full rule is disputed in knowledge.md] With cloud storage full on an account below Studio Pro (a higher cloud plan exists, e.g. Free), Enhance first shows 「You’ve reached your cloud storage limit.」 with 「Generate Anyway」 and 「Upgrade」, no 「Manage」; Generate Anyway goes on with the job (Q-16).
- R-109 [Req: REQ-008; KC: derived-cloud-storage-warnings-and-video-download-limit; KB: KP-067] With cloud storage full on a Studio Pro account (the top cloud plan), the prompt shows 「Generate Anyway」 and 「Manage」, and Manage opens My Library (KP-067: the tool's album) (Q-16).
- R-105 [KB: KP-074] The browser tab title is readable and names the tool on /video-enhancer, /video-enhancer/edit, /hd-video-converter, /ai-frame-interpolation and /video-restoration/edit; never a string key, undefined or another tool's title.
- R-106 [KB: KP-075] The Video Enhancer and Video Restoration cards on the Launcher and Home do not use another tool's thumbnail.

### Domain rules
- Feature knowledge (KF, observed / question, read 2026-11-26): KF-001 fact → TC-085 (MYE261124P0033, RD; its Continue Editing half is settled by #1c76d4b60c73: R-110, TC-154); KF-002 fact → TC-010 – TC-021 (R-078 vs Q-1, asked in update-plan.md); KF-004 → R-042 (TC-096); KF-005 → R-073 (TC-117); KF-007 → R-104 (TC-148).
- Cited above: KP-007, KP-008 (R-079); KP-009 (R-080, with R-069); KP-010 (R-081); KP-011 (R-082); KP-012 (R-083); KP-013, KP-069 (R-084); KP-014, KP-070 (R-085); KP-017 (R-086); KP-023 (R-087); KP-025, KP-026 (R-088); KP-027 (R-089); KP-028 (R-090); KP-029 (R-091); KP-031, KP-032, KP-068 (R-092); KP-034 (R-093); R-094 now rests on the Knowledge Center header page (the team Get Credit rule is disputed, Q-15); KP-039, KP-040, KP-043 (R-095); KP-041 (R-096); KP-045 (R-097); KP-050, KP-056 (R-098); KP-051, KP-058 (R-099); KP-052, KP-053 (R-100); KP-054, KP-055, KP-057 (R-101); KP-060 (R-102); KP-061, KP-062, KP-063 (R-103); KP-067 (R-104, R-109; the team storage-full rule is disputed, Q-16); KP-074 (R-105); KP-075 (R-106).
- Already covered by spec requirements: KP-002, KP-006 (R-014 – R-019: each limit blocked with its dialog, never left processing); KP-004 (R-038: End Time past the limit set to the bound); KP-044 (R-001 – R-006); KP-049 (R-065); KP-073 (R-067).
- n/a: KP-001 (no model choice: BytePlus only); KP-003 (no prompt); KP-005 (no stepper controls); KP-015 (no audio switch); KP-016 (no duration option; the result's length is R-083); KP-018, KP-019, KP-020, KP-021 (no selectable objects or editable text in the room); KP-022, KP-035, KP-066 (the tool makes no project); KP-024 (one-page room; the old room's Back reopens its panel, R-057); KP-030 (no templates or Inspiration); KP-033 (results save themselves, no manual save); KP-036 (images only; full storage for this video tool is R-104 and R-109); KP-037 (no model name to show); KP-042 (no free trial, R-034); KP-046 (no route limited beyond sign-in, R-096); KP-047 (the top menu has no nested submenu); KP-048 (Open in Editor held, Q-2); KP-059 (no category chips); KP-064 (this table runs in Chrome only, run-web.md); KP-071, KP-072 (not a new tool: it carries 「Enhanced」, R-008).

## Added 2026-11-25 — coverage passes and standing inputs

### Request ledger coverage
- REQ-010: PM ruling #1c76d4b60c73, Continue Editing from Video Trimmer over 8:00 (2026-11-26): R-040, R-110.
- REQ-009: the Launcher card gets no Enhanced tag (user, 2026-11-26): R-008.
- REQ-008: the R1 run's table fixes (draft 20261126-104640): R-030, R-042, R-049, R-073, R-094, R-104, R-107, R-108, R-109.
- REQ-001: this draft. REQ-002: Figma accounts (no row). REQ-003: Knowledge Center rules added (R-068 – R-077). REQ-004: answers to Q-1 – Q-10 (R-078; R-048, R-070 – R-077 held). REQ-005: product rules from the imported domain knowledge (R-079 – R-106).

### Job states

| Job | Uploading | Ready | Generating | Done | Failed |
|---|---|---|---|---|---|
| Upload | TC-008 | TC-009 | n/a: no generation during upload | n/a: an upload ends Ready (TC-009) | TC-010 |
| Enhance job | n/a: Enhance starts after the upload | TC-089 | TC-089 | TC-089 | n/a: a failed generation cannot be made on demo (row removed, REQ-015) |

### Error classes

| Class | Row |
|---|---|
| Format | TC-010 |
| Size | TC-011 |
| Resolution high | TC-012 |
| Resolution low | TC-014 |
| Frame rate | TC-016 |
| Unreadable frame rate | n/a: not tested, no such file can be made (user, 2026-11-26, REQ-013) |
| Codec | TC-019 |
| Audio | TC-020 |
| Length | TC-021 |

### Exit × stage

| Exit | Settings | Generating | Done |
|---|---|---|---|
| Replace Video | TC-084 | n/a: Replace while generating keeps the job running (old room behaviour, R-045) | TC-094 |
| Leave the room | TC-100 | TC-097 | TC-093 |

### Hidden clauses

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-010 | No resolution limit line in the upload box | The upload box text read in full (texts), checked for 「resolution」 | TC-008 |
| R-012 | Settings and Enhance stay disabled until the upload ends | The panel's disabled flags read during the upload (els) | TC-008 |
| R-023 | The 「Video Too Long」 dialog shows only when the Trimmer cannot be used | An over-8:00 upload opens the Trimmer, not the dialog, while the Trimmer works; the dialog itself needs the Trimmer made unavailable | TC-021 (dialog half not testable, row removed, REQ-015) |
| R-081 | The page does not reload after a failure and the inputs stay | The address, the uploaded video and the settings after the failure | n/a (not testable: a failed generation cannot be made on demo, row removed, REQ-015) |
| R-022 | Entry pages do not block an over-8:00 video; the 「8 min」 line stays in the box | The SEO page accepts the 8:20 upload with no dialog, the room then opens the Trimmer | TC-021, TC-009 |
| R-037 | The 2:30 check reruns on Mode, Replace Video and Trim | The red text and Enhance read after each of the three events | TC-083, TC-084, TC-085, TC-086 |
| R-042 | The empty Recent Gen text shows only while no job has run in this visit | Recent Gen read after an upload on an account with no Video Enhancer results | TC-096 |
| R-068 | The charge is made before the upload ends | The ledger read while the upload dialog still runs | TC-119 |
| R-069 | The refund after an upload cancel arrives later (3–6 hours) | The ledger read again 6 hours after the cancel | TC-120 |
| R-078 | Upload errors: dialog shown and video not imported, whatever the moment | The dialog and the video not being imported; the moment is not judged | TC-010, TC-011, TC-012, TC-014, TC-016, TC-019, TC-020 |
| R-079 | Progress never goes back and the job never stays processing | A recording of the upload percentage and the job card until it ends | TC-128 |
| R-080 | A cancelled upload is not reported as a failed generation | Recent Gen and any message after the cancel | TC-120 |
| R-088 | Leaving with an unsent upload asks first | The leave confirmation on menu navigation and on reload | TC-133 |
| R-089 | No warning when nothing was uploaded | No dialog on leaving the empty room | TC-134 |
| R-096 | A signed-out Enhance sends and charges nothing | No job in Recent Gen and no ledger entry after signing in | TC-139 |

### Variants

| Requirement | Variant | Rows |
|---|---|---|
| R-104 | Account below Studio Pro (Free): 「Upgrade」 | TC-147, TC-148 |
| R-104 | Studio Pro account: 「Manage」 (R-109) | TC-153 |
