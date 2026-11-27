# Tasks and results

## KF-004 Recent task may or may not refresh in place; Back leaves it to the Launcher
- kind: quirk · platform: android · use: run · tags: recent-task, back
- source: Video Enhance Android run 2026-11-10-r1-full O-9, O-12, O-15, O-21; corrected by Video Enhance Android run 2026-11-18-r2-full O-16, O-20; Video Enhance Android run 2026-11-26-r4-full O-20 · verified: 16.9.0 build 2611251 (2026-11-26)

In R1 a card done on the server stayed 「Processing…」 (「<n> minutes left…」 never counted down) until Recent task was
reopened or a card tapped, and a 「View」 tapped right after the list opened could do nothing. In R2 (same build) a
processing card turned completed in place twice with the page left open, and 「View」 worked on the first tap. So
neither is reliable: a refresh row records which it saw, and a dead 「View」 is tapped again. Where Back goes depends on
how Recent task was opened (KF-014); on 2611231 and earlier it always went toward the Launcher, and once landed on the
full-screen 「AI Mini Drama」 intro page (✕ to close), which hid the Launcher.

## KF-005 Task timings
- kind: fact · platform: android · use: run · tags: timing, upload, wait
- source: Video Enhance Android run 2026-11-10-r1-full O-14, O-26, O-28; Video Enhance Android run 2026-11-18-r2-full O-15, O-19, O-22, O-29; Video Enhance Android run 2026-11-24-r3-full R3-g1, R3-g2, R3-h; Video Enhance Android run 2026-11-26-r4-full O-8, O-23, O-25 · verified: 16.9.0 build 2611251 (2026-11-26)

The ring sits at 「0%」 through a local transcode (38 s for 01:30 1080p) before the upload; a 01:30 1080p upload took
9.5 min, a 3 s 720p one 1 s. From the Enhance tap to Done a 3.2 s clip took 66–151 s in Standard (4K the longest) and
208–544 s in Professional. In R2 (2026-11-18) the upload leg was far slower on both office Wi-Fi networks, not the
phone's link: 65 s per 1 MB clip, 23–24 min for 7.6 MB, 70 min for 22.8 MB; processing after it took 2–4 min. R3 (2611231)
matched: tap to Done 62–135 s Standard, 215–553 s Professional, 23.5 min uploads for 7.6 MB. R4 (2611251): Recent task
opens 62–72 s after the tap, cards Done 62–143 s later in Standard and 201–568 s in Professional. The ring may read
「100%」 while the upload still runs (once 16 s more): time the upload from logcat. Plan waits from these, not from the
spec's seconds, and allow for slow-upload days.

## KF-006 Since 2611251 only Save Result writes the result
- kind: fact · platform: android · use: run · tags: storage, save, result
- source: Video Enhance Android run 2026-11-10-r1-full O-21, O-23; corrected by Video Enhance Android run 2026-11-26-r4-full O-21 (P0098) · verified: 16.9.0 build 2611251 (2026-11-26)

On 2611251 「Done」 writes nothing to Movies/cyberlink/PowerDirector/Video Enhance/; each 「Save Result」 tap writes one
copy (「VideoEnhance - <date> - <n> - <ms>.mp4」) and scans it into the gallery (two taps, two identical files). Up to
2611231 Done also wrote an unscanned copy there. Count files there by run time, not by number. Logcat's
「DownloadUriTask: …URI is not absolute」 after each Done has no visible effect.

## KF-007 Completion is announced twice
- kind: fact · platform: android · use: run · tags: notification, banner
- source: Video Enhance Android run 2026-11-10-r1-full O-15, O-20; Video Enhance Android run 2026-11-18-r2-full O-16; Video Enhance Android run 2026-11-24-r3-full O-13; Video Enhance Android run 2026-11-26-r4-full O-9 · verified: 16.9.0 build 2611251 (2026-11-26)

Each completed task posts a system notification even with the app in front, and an in-app 「Good news! …」 banner that
waits on the Launcher until 「Close」 and covers its top tiles; a stale one also blocks the Launcher's page source.
Close it before tapping or reading there.

## KF-009 Recent task lists only this install's tasks
- kind: fact · platform: android · use: analysis, run · tags: recent-task, reinstall, cloud
- source: Video Enhance Android run 2026-11-18-r2-full O-1 · verified: 16.9.0 build 2611231 (2026-11-24)

After a fresh install Recent task read 「No Generated Videos」 although the same account had run many tasks a week
before and the page says 「Tasks are stored on the cloud for 1 year」: the list is kept per install and cloud tasks are
not listed again. Whether a reinstall should bring them back is a PM question, not a row expectation yet.

## KF-010 A very long upload fails the task
- kind: quirk · platform: android · use: run · tags: upload, failure, retry
- source: Video Enhance Android run 2026-11-18-r2-full O-15, O-18, O-19; Video Enhance Android run 2026-11-24-r3-full O-6, O-7, O-8, O-13; Video Enhance Android run 2026-11-26-r4-full O-15, O-16, O-29 · verified: 16.9.0 build 2611251 (2026-11-27)

A 92.5 MB upload that took 26 min ended 「upload response code->400」, and a 22.8 MB one that took 70 min failed at the
next call 「apply effect response code->401」 (likely an expired token). Such a task's card shows 「Retry」 or 「View
Details」 with a blank or grey thumbnail and a nonsense length (「25000:00:00」); its credits come back hours later
(KF-003). On a lossy Wi-Fi (KP-105) small uploads also break off (`IOException: unexpected end of stream`,
`SocketException: Broken pipe`) with cards 「888:53:20」 or 「8342:30:00」 / 「Retry」. 「Retry」 re-uploads with no new
charge. Home or 「Leave」 during 「Video uploading...」 does not stop the upload (after Leave it still finished, but no
task was created). A task started while a left upload still runs in the same process waits at 「0%」 with no create
session until that upload ends (40–60 s on short ones, so both are charged; 3 min uncharged behind a 92.5 MB one that
had run 52 min), and the left task keeps a 「Retry」 card with no length; a relaunch ends the old upload. Use small
sources when the upload is slow.

## KF-013 An upload over 1 minute is a bug
- kind: decision · platform: both · use: analysis, run · tags: upload, timing, performance
- source: user ruling 2026-11-19 (REQ-027); Video Enhance Android run 2026-11-24-r3-full O-6, O-13 (63–70 s for 1–2 MB, 23.5 min for 7.6 MB); Video Enhance Android run 2026-11-26-r4-full O-11, O-15, O-23, O-25, O-26 · verified: 16.9.0 build 2611251 (2026-11-26)

The 「Video uploading...」 leg (logcat 「Upload to S3: start」 → 「upload response code->200」) must finish within 1
minute; anything longer is unacceptable and filed, whatever the file size or network. R2 measured 65 s for a 1.02 MB
clip (41 uploads), 23 min for 7.6 MB and 70 min for 22.8 MB; 2611181 repeated 65 s for 1.02 MB twice. 2611251 (R4,
17F_QA_Wifi_5G, no loss): 64–66 s for 1.0 MB (every upload), 9 min 51 s for 4.4 MB, 12 min 52 s for a 10 s 1080p clip,
and 92.5 MB still at 82% after 52 min. KF-005's
timings are what the build does, not what it should do.

## KF-014 Recent task's layout and ‹ depend on how it was opened
- kind: fact · platform: android · use: run · tags: recent-task, navigation, back
- source: Video Enhance Android run 2026-11-24-r3-full O-11 (TC-132, TC-140, TC-141); corrected by Video Enhance Android run 2026-11-26-r4-full O-1, O-9, O-20, O-29 · verified: 16.9.0 build 2611251 (2026-11-27)

On 2611251: opened from the panel's Recent task icon it has ‹ (btnBack, top left), ⌂ (btnHome, top right), the hint
「…for 1 Year.」 and 「Manage」 (P0081 / P0082 fixed there), no 「Create another one」, and ‹ or system Back return to the
panel. Opened by itself after an Enhance it has only ‹ plus 「Create another one」, and ‹ goes to the Launcher when the
panel came from the Launcher, to the editor when it came from a clip toolbar (never the panel). Through Result ›
「Enhance More」 › Enhance (2611231, not rechecked) it had ‹ and ⌂ and ‹ went to Add Media. On 2611231 the icon and
auto-opened pages had only ⌂ and 「Create another one」. A Recent task row records which way it came in.
