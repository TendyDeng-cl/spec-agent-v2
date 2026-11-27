# AI task completion (shared by every AI tool)

## KP-055 Completion banner in the editor
- kind: fact · platform: ios · use: analysis, run · tags: ai-task, banner
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

When a background AI task ends, the editor shows 「Good news! Your <Task> task has been completed. Tap here to view your
results.」 with 「Close」 and 「View」, over the top of the preview. Banners queue: dealing with one shows the next
finished task. Close was not tested.

## KP-056 Task list states
- kind: rule · platform: ios · use: analysis, run · tags: ai-task, task-list, download · authority: observed
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

In a tool's task list a finished item still downloading shows a placeholder, 「Downloading.」 and a progress bar and
no 「View」; once downloaded it shows its thumbnail and 「View」 (CineStory F15/F16). The list settles by itself.

## KP-057 Result page
- kind: fact · platform: ios · use: analysis, run · tags: ai-task, result
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

Before / After tabs where the tool has them (After selected), else one result; then a Share Video row, 「Add to
Timeline」 and 「You might also like」.

## KP-058 Result page exits
- kind: quirk · platform: ios · use: run · tags: ai-task, result, navigation
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

「Add to Timeline」 returns to the editor with the clip selection lost (root toolbar); the result page's ‹ goes to the
tool's task list, not the editor it came from (ISS-ATC-04, same back-stack gap as KP-026).

## KP-059 Banner View opens before the media is ready
- kind: risk · platform: ios · use: analysis, run, ebug · tags: ai-task, banner, download
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

ISS-ATC-01/02 (High): the banner's 「View」 is offered before the result has downloaded and opens a black result
(00:00/00:00, no loader); the same item from the task list after download plays fine. 「Add to Timeline」 there is a
silent no-op (ISS-ATC-03: the duration reading does not change). Vary: tap the banner's View at once.

## KP-060 Full-screen result player may trap the user
- kind: risk · platform: ios · use: run · tags: ai-task, player
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion) (unverified on a real phone)

Seen only through mirroring (ISS-ATC-05): once the full-screen player's controls auto-hide, taps only toggle play and
neither the controls nor ‹ come back. Recheck on the phone before filing.

## KP-061 Completion and error states the specs leave open
- kind: question · platform: both · use: analysis · tags: ai-task, banner, design
- source: exploration KB ai-task-completion-banner.md (short blind run 2026-09-08, Developer Server; Video Upscaler and Super Slow Motion)

CineStory F17 says inform users 「when the task is done」 without saying server-done or downloaded. The banner button
is 「View」 in CineStory F02 and 「View Result」 in Video Object Removal F116 (the build says View). The F15 error
states 「Retry」 and 「View Details」 were never reached.

## KP-079 Some tools save their result to the gallery by themselves
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, results
- source: AIGC Watermark Android run 2026-11-17-r1-full O-13, O-18; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-5; corrected by AIGC Watermark Android run 2026-11-23-r3-full O-1, O-4; AIGC Watermark Android run 2026-11-26-r4-changed O-2, O-5; AIGC Watermark Android run 2026-11-26-e1-entries O-8 (inbox I-014) · verified: 16.9.0 build 2611251 (2026-11-26)

Video Edit by Chat, AI Anime Video and Talking Avatar write the result to the gallery when the task finishes, with no
「Save」 tap and before the result is opened (2611193; R2 read Talking Avatar as writing at first open, R3 O-4 saw it
write at finish with the result unopened; on 2611251 one AI Anime Video copy from a PIP clip was written
20 min late, when the app returned to the Launcher). Text to Image's 「Add to Timeline」 also writes a gallery copy, which a later
「Save」 reuses (KP-080). Character Motion Swap, Cinematic Reel Creator and Text to Video do not, nor does Image to
Video's 「Full Editor」 from a never-saved result. Whether this is
intended is not in any spec.

## KP-080 What a second Save does
- kind: fact · platform: android · use: analysis, run · tags: save, gallery, files
- source: AIGC Watermark Android run 2026-11-17-r1-full O-6, O-10, O-18; AIGC Watermark Android run 2026-11-26-e1-entries O-18 (inbox I-023) · verified: 16.9.0 build 2611251 (2026-11-26)

A Text to Image result saved once is never written again: a second 「Save」 says 「Saved to Gallery」 and leaves the
first file as it was. AI Art, Image to Video and Text to Video write a new file on every Save. In Image to Video file
names the number after the date counts saves, not tasks. On an Image to Video result every share target (YouTube,
TikTok, Instagram, Facebook, More) first writes a new file too; YouTube / Facebook then warn 「Before sharing to … music
copyright」 although no music was chosen.

## KP-081 Several Image to Video tasks can run at once
- kind: fact · platform: android · use: run · tags: image-to-video, tasks
- source: AIGC Watermark Android run 2026-11-17-r1-full O-7 · verified: 16.9.0 build 2611161 (2026-11-17)

「Create another one」 is available while a task is 「Processing…」, so generations can overlap to save time. A failed
task's list item reads 「An Error Has Occurred / Credits have been refunded…」.

## KP-082 Models and tools offered on Android
- kind: fact · platform: android · use: analysis, run · tags: models, tier, image-to-video, text-to-video, video-edit-by-chat
- source: AIGC Watermark Android run 2026-11-17-r1-full O-9, O-17, O-18; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-3, O-9, O-14 · verified: 16.9.0 build 2611193 (2026-11-23)
- status: superseded by KP-117

On 2611193 (Free and Pro list the same): Image to Video offers Kling 4.0, Kling O3, Pixverse V6, Wan 3.0, Gemini Omni
Flash 1.1, Happy Horse 1.1, Seedance 2.0 (Pro), Veo 3.1, Vidu Q2, Wan 2.7; Text to Video Kling 4.0, Wan 3.0, Seedance
2.0 (Pro), Gemini Omni Flash, Happy Horse 1.1, Wan 2.7, Veo 3.1, Kling O3; Video Edit by Chat Seedance 2.5 (default),
Seedance 2.0, Gemini Omni Flash 1.1, Happy Horse, Kling O3, PixVerse V6. No Flux, Hailuo, or Seedance 2.5 in I2V / T2V
(2611161 had 2.5 and no Wan 3.0 in I2V). Video Object Removal is not offered. Lists are server-set: reread each build.

## KP-083 Model pickers reset
- kind: quirk · platform: android · use: run · tags: models, image-to-video, text-to-video, video-edit-by-chat
- source: AIGC Watermark Android run 2026-11-17-r1-full O-7, O-17, O-18; corrected by AIGC Watermark Android run 2026-11-23-r2-changed O-9; AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-011, also from Editor › AI Magic) · verified: 16.9.0 build 2611251 (2026-11-26); Video Edit by Chat part 2611193 (2026-11-23)

Image to Video and Text to Video open on 「Kling 4.0」 each time (also after 「Create another one」). On 2611161 Video
Edit by Chat reset to 「Seedance 2.5」 after a source video was picked; on 2611193 a model picked before the source
stays selected. Still read the model back right before Generate.

## KP-084 Portrait video results can be stored landscape
- kind: fact · platform: android · use: run · tags: text-to-video, files, orientation
- source: AIGC Watermark Android run 2026-11-17-r1-full O-18; AIGC Watermark Android run 2026-11-23-r3-full O-3, TC-012 · verified: 16.9.0 build 2611193 (2026-11-23)

A portrait Text to Video result is stored 1920 × 1080 with a -90° display matrix (Kling O3 1080p, Wan 2.7 720p).
A portrait Image to Video result (Veo 3.1) saved with the switch Off is stored 1280 × 720 with a -90° matrix; saved On
it keeps the provider's 720 × 1280 upright file. Players show all upright: read sizes and positions in the displayed
orientation.

## KP-085 AI Storytelling results live in its own history
- kind: fact · platform: android · use: analysis, run · tags: ai-storytelling, my-artwork, tier
- source: AIGC Watermark Android run 2026-11-17-r1-full O-16, O-17; AIGC Watermark Android run 2026-11-23-r2-changed O-11 · verified: 16.9.0 build 2611193 (2026-11-23)

AI Storytelling results are not in My Artwork: they are under AI Storytelling › history 「Generated Story」 and are
exported, not saved. A Free account gets one free story; more need Pro.

## KP-090 AI Art's result page has no 「Full Editor」
- kind: fact · platform: both · use: analysis, run, ebug · tags: ai-art, results, full-editor
- source: user, 2026-11-18 (eBug review of AIGC Watermark Android R1, F-2) · verified: 16.9.0 build 2611193 (2026-11-23)
- status: superseded by KP-122

AI Art results cannot be opened in the editor: the result page has no 「Full Editor」 (Android shows feedback, share,
download and 「Turn the image into a video」). A spec rule for every image result that names 「Full Editor」 (AIGC
Watermark R-024) applies to AI Art without that step; Text to Image does have it.

## KP-098 Gemini Omni Flash 1.1 in Image to Video always generates sound
- kind: fact · platform: android · use: analysis, run · tags: image-to-video, models, sound
- source: AIGC Watermark Android run 2026-11-23-r2-changed TC-098 · verified: 16.9.0 build 2611193 (2026-11-23)

With 「Gemini Omni Flash 1.1」 picked in Image to Video, 「Generate Sound by AI」 is On and its Off is greyed out; the
result has an audio track (5 s, 25 credits).

## KP-099 Cinematic Reel Creator saves into the Video Enhance folder
- kind: quirk · platform: android · use: run, ebug · tags: cinematic-reel, save, files
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-6 · verified: 16.9.0 build 2611193 (2026-11-23)

Cinematic Reel Creator's Quick actions 「Save」 writes to Movies/cyberlink/PowerDirector/Video Enhance/ with an
「ImageToVideo - <date> - N - <ms>.mp4」 name, not a Cinematic Reel folder, and no 「Saved to Gallery」 toast was caught.
Find the file there by time.

## KP-100 Source video uploads take minutes
- kind: quirk · platform: android · use: run · tags: upload, ai-task, timing
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-7, O-10; AIGC Watermark Android run 2026-11-23-r3-full O-6 · verified: 16.9.0 build 2611193 (2026-11-23)

Tools that upload a source video (AI Anime Video, Character Motion Swap, Video Edit by Chat, Cinematic Reel) show
「100% Uploading / Please keep the app open」 for 4–8 min with a 10–13 s clip and about 1.5 min with a 5 s clip on the
SM-A5360's Wi-Fi. A Cinematic Reel task can then sit on 「Retry」 in the task list; Retry re-uploads and may fail with a
refund (KP-007). Plan waits and keep the app in front.
AI Storytelling's upload may log `SocketTimeoutException` while showing 「Media Uploading... 8%」 and then go on by
itself: not an error unless the screen shows one.

## KP-102 AI Art 「Try with example」 can fail with 「Session timeout」
- kind: quirk · platform: android · use: run · tags: ai-art, failure, refund, server
- source: AIGC Watermark Android run 2026-11-23-r3-full O-2 · verified: 16.9.0 build 2611193 (2026-11-23)

On Stage, AI Art 「Baby Face」 with 「Try with example」 failed twice (the second the banner's retry) with a grey tile and
「Session timeout. Try again to proceed.」, though upload, apply and polling returned 200. The 6 credits came back about
20 s later (KP-007). Reuse an earlier AI Art result from My Artwork rather than retrying.

## KP-103 My Artwork tiles can stay 「Processing...」 after the task finished
- kind: quirk · platform: android · use: run, ebug · tags: my-artwork, task-list, results
- source: AIGC Watermark Android run 2026-11-23-r3-full O-5 · verified: 16.9.0 build 2611193 (2026-11-23)

Cinematic Reel Creator and Talking Avatar tiles in My Artwork kept reading 「Processing...」 well after their task lists
showed 「View」. Each updated only after its tool's task list was opened once and My Artwork reopened.


## KP-114 Completion banners and notifications on Android
- kind: fact · platform: android · use: analysis, run · tags: ai-task, banner, notification, logs
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-4, O-5, O-19 (inbox I-025, I-030); AIGC Watermark Android run 2026-11-26-e1-entries O-2, O-16 (inbox I-008, I-011); Cinematic Reel Recommendation Android run 2026-11-26-e1-entries O-2 (inbox I-006) · verified: 16.9.0 build 2611251 (2026-11-26)

Each finished task raises its own 「Good news! Your <tool> task has been completed. Tap here to view your results.」
banner (Close / View) over any screen, editor and Launcher included, queued one per task; a system notification comes
with it (not always: none for one Cinematic Reel task). Image to Video holds its banner while its own pages are open.
Each finish logs FcmInstanceIDService 「key = Msg, value = Good news!…」 with `pdr://click_<tool>?oid=…`, usable to time
it; the notification's tap deep-links to the result and drops the page stack. `DownloadUriTask … URI is not absolute`
at a finish has no visible effect. Android counterpart of KP-055.

## KP-115 Where Back goes from a banner's result page
- kind: quirk · platform: android · use: run · tags: ai-task, banner, navigation
- source: AIGC Watermark Android run 2026-11-26-e1-entries O-16 (inbox I-023); Recent Task Model Info Android run 2026-11-26-r1-full O-20 (inbox I-030) · verified: 16.9.0 build 2611251 (2026-11-26)

In the editor: banner View › result › Back goes to the tool's task list, the next Back to the editor (where queued
banners show again), and Back with a banner up leaves for the Launcher. Elsewhere: View › result › ‹ opens the tool's
Recent tasks with only a Home icon at top left; it and system Back go to Launcher Home. A tap in the top ~500 px while
a banner shows lands on View: close banners (`tv_close`) before tapping top-bar controls.

## KP-116 Text to Image runs only in the foreground
- kind: fact · platform: android · use: analysis, run · tags: text-to-image, ai-task, banner, credits
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-21 (inbox I-030) · verified: 16.9.0 build 2611251 (2026-11-27)

‹ during a Text to Image generation asks 「Images Generating … Leaving this page will cancel the process, and the used
credits will not be restored.」 (Leave / Cancel). It sends no completion message, so it never gets a banner. Once a
label tap on 「Cancel」 left the dialog up after the image had finished; tap it by position.

## KP-117 Models offered on Android (2611251)
- kind: fact · platform: android · use: analysis, run · tags: models, tier, image-to-video, text-to-video, video-edit-by-chat
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-3 (inbox I-024); AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-009, I-011); Video Edit by Chat list from KP-082 · verified: 16.9.0 build 2611251 (2026-11-26)

Image to Video (11): Kling 4.0 (default), Kling O3, Pixverse V6, Wan 3.0, Gemini Omni Flash 1.1, Happy Horse 1.1,
Seedance 2.5, Seedance 2.0, Veo 3.1, Vidu Q2, Wan 2.7; Seedance 2.5 / 2.0 read 「Subscribe Pro to Unlock」 on Free.
Text to Video (9): Kling 4.0 (default), Wan 3.0, Seedance 2.5, Seedance 2.0, Gemini Omni Flash, Happy Horse 1.1, Wan
2.7, Veo 3.1, Kling O3. Video Edit by Chat as KP-082 (2611193, not reread). No Video Object Removal. The picker is a
bottom sheet opened scrolled to the current model; a downward drag closes it. Server-set: reread each build.

## KP-118 Video Edit by Chat rounds the source length up
- kind: fact · platform: android · use: analysis, run · tags: video-edit-by-chat, credits, price
- source: AIGC Watermark Android run 2026-11-26-e1-entries O-3 (inbox I-007); R1 TC-017 · verified: 16.9.0 build 2611251 (2026-11-26)

The page shows the source length rounded up to the second and bills each rounded second: 8.28 s reads 「00:09」 (◆126,
Seedance 2.5), 5.397 s 「00:06」 (◆30, Kling O3). Leaving the page with inputs filled asks 「Leave this page?」.

## KP-119 A failed Video Edit by Chat task
- kind: fact · platform: android · use: run, ebug · tags: video-edit-by-chat, failure, refund, logs, fixtures
- source: AIGC Watermark Android run 2026-11-26-e1-entries O-1 (inbox I-008) · verified: 16.9.0 build 2611251 (2026-11-26)

A failed task stays in the task list with a blank thumbnail and 「Report」 or 「View Details」 (「An Error Has Occurred /
Credits have been refunded…」); no charge was seen. Logcat `EditByChat run`: status Error, External Error 4000 with 4005
「bad input」 (Seedance 2.5, 4K MOV_0046, 「remove people」) or 4001 「general error」 (Kling O3, 4K MOV_0051). Kling O3
with the 00PDRa 1080p60 5.4 s clip and 「Make the background a sunny beach」 worked 4/4: use it when a row needs a result.

## KP-120 A generation can fail within seconds with nothing charged
- kind: quirk · platform: android · use: run, ebug · tags: text-to-video, failure, refund, server
- source: AIGC Watermark Android run 2026-11-26-e1-entries O-5 (inbox I-012); Recent Task Model Info Android run 2026-11-26-r1-full O-1 · verified: 16.9.0 build 2611251 (2026-11-26)

A Text to Video Kling O3 task failed within 5 s of Generate (logcat `applyEffect status: Error null` after 200s): its
card shows a placeholder (sad planet) and 「View Details」 → 「An Error Has Occurred / Your credits have been refunded.
Please try again later, or adjust your prompt and try again.」; `totalRemain` never moved. The same prompt worked
minutes later: retry once before filing; an unchanged balance is not a missing refund (KP-007).

## KP-121 Generation times on Stage
- kind: fact · platform: android · use: run · tags: ai-task, timing, image-to-video, text-to-video, cinematic-reel
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-17 (inbox I-024, I-027, I-030); AIGC Watermark Android run 2026-11-26-e1-entries O-16; Cinematic Reel Recommendation Android run 2026-11-26-e1-entries (inbox I-006) · verified: 16.9.0 build 2611251 (2026-11-27)

Image to Video Vidu Q2 45–75 s, Kling O3 about 1.5 min; Text to Video Wan 2.7 95–105 s (once 5 min); twenty I2V / T2V
generations all finished within about 10 min. A Cinematic Reel Micro Cinema reel takes 5–7 min. While a card reads
「Processing…」 its 「View」 does nothing.

## KP-122 AI Art and Text to Image result pages (2611251)
- kind: fact · platform: android · use: analysis, run, ebug · tags: ai-art, text-to-image, results, full-editor
- source: user, 2026-11-18 (eBug review of AIGC Watermark Android R1, F-2, via KP-090); AIGC Watermark Android run 2026-11-26-e1-entries O-7, TC-159 (inbox I-009) · verified: 16.9.0 build 2611251 (2026-11-26)

AI Art results cannot be opened in the editor: no 「Full Editor」 (feedback, share, download, 「Turn the image into a
video」, which opens Image to Video with the image filled in); a rule naming 「Full Editor」 for every image result
(AIGC R-024) applies to AI Art without that step. Text to Image right after Generate shows download, share, feedback,
「Image to Video」 and 「Generate ◆3」, no 「Full Editor」, 「Add to Timeline」 or You might also like; opened from My
Artwork (editor) it adds 「Add to Timeline」. 2611193 showed 「Full Editor」 for Text to Image: recheck per build.

## KP-123 Image and Text to Video tool pages on Android
- kind: fact · platform: android · use: analysis, run · tags: image-to-video, text-to-video, navigation, intro, templates
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-16 (inbox I-024, I-025, I-026, I-027); AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-011) · verified: 16.9.0 build 2611251 (2026-11-27)

Both show a 「Try It Now」 intro at every open until 「Don't show again」 is ticked (Text to Video from Editor › AI Magic
skips it). Generate goes straight to Recent tasks with a processing card already tagged with the model. Text to Video
has no ‹ (only a home icon, back to AI Magic or the editor) and after Generate its page is replaced by Recent tasks, so
‹ from a Home entry goes to Home; Image to Video keeps its page. Text to Video has no Template tab; Image to Video
template tasks are named after the template (「Breakthrough 1」).

## KP-124 Text to Image has two history pages
- kind: fact · platform: android · use: analysis, run · tags: text-to-image, my-artwork, history, navigation
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-10 (inbox I-026) · verified: 16.9.0 build 2611251 (2026-11-27)

The tool's history icon opens ‹ + home, 「Manage」 (edit mode with 「Select All」 / 「Deselect All」), date groups and
prompt rows whose copy icon refills the prompt; closing a preview returns to it. My Artwork › Text to Image opens X +
home, 「Select」 and 「Images were created」; closing a preview returns to My Artwork. From the editor a preview is an
import page (「Import 1 Image」).

## KP-125 Cinematic Reel Creator tasks
- kind: fact · platform: android · use: analysis, run · tags: cinematic-reel, task-list, naming, navigation
- source: Cinematic Reel Recommendation Android run 2026-11-26-e1-entries O-1 (inbox I-005, I-006); AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-011) · verified: 16.9.0 build 2611251 (2026-11-26)

Tasks are named by template and a counter (「Micro Cinema 01」, 「02」…), not by date. Generate switches to the task
list; system Back on 「Analyzing & Generating」 returns to the preview while the task runs on. From any editor entry it
opens the template carousel as from the Launcher and never brings in the selected photo.

## KP-126 Talking Avatar's entries and voice check
- kind: fact · platform: android · use: analysis, run · tags: talking-avatar, entry-point, audio, fixtures
- source: AIGC Watermark Android run 2026-11-26-e1-entries TC-250–TC-253, O-9 (inbox I-013) · verified: 16.9.0 build 2611251 (2026-11-26)

From an audio clip's toolbar it takes that clip as the voice (Step 2 「Edit the Voice and Format」, no By Text / By
Voice switch). A near-silent voice is refused at Generate with 「Please use speech or spoken audio, not music or singing
files.」, no charge; /sdcard/Music/Recorded_Voices/VoiceOver_20220214_180613.wav (8 s) passes. No Launcher › AI Magic
tile: the other entry is Editor › AI Magic. Its task list once read 「No Generated Videos」 though older tasks existed.
