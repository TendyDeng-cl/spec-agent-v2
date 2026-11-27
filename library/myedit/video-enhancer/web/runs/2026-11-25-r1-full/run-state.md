# Run state — R1 Full run of approved v1 (web, MyEdit demo)

Table: library/myedit/video-enhancer/web/cases.csv
Started: 2026-11-25T06:20:35.057Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-25T06:48:23.914Z · next TC-027 (R1-b)
{"Pass":13,"Fail":9,"Blocked":4,"Not run":115}

R1-a done (TC-001 – TC-026): 13 Pass, 9 Fail, 4 Blocked. Build MyEdit-5.11.0-11242029 (demo). Chrome profile default, port 9333, 1440x900, signed in as the default account (Studio Pro). Credits: start menu 7231 (stale?) vs ledger 5824; end menu and ledger both 5794 (06:48). No Video Enhancer charge in R1-a; the only new ledger row is 「AI Video Generator」 -30 at 14:41 by another user of the shared account. Tab 0 is /en/home. Logs pulled to logs/R1-a-20261125-144810 and sliced. Script changes: device-web upload sets files over 50 MB through DOM.setFileInputFiles (playwright refused them); leaving a room with a video fires a beforeunload dialog that crashes device-web open with 'No dialog is showing' but the navigation still happens (check url after open). Next: R1-b from TC-027.

### 2026-11-25T07:15:25.843Z · next TC-042 (R1-c)
{"Pass":32,"Fail":11,"Blocked":4,"Not run":94}

R1-b done (TC-027 – TC-038, TC-040, TC-041, TC-082 – TC-088): 19 Pass, 2 Fail (TC-085 question: Replace over 2:30 in Professional opens the Trimmer instead of the red text, PM spec vs KC code-derived rule; TC-088 defect: Continue Editing of an 8:20 clip from Video Trimmer shows 「Video Too Long」 instead of the Trimmer). Build MyEdit-5.11.0-11242029 (demo). Chrome profile default, port 9333, 1440x900, default account (Studio Pro). Chrome closed once mid-segment (O-7) and was restarted by device-web restart (now started by this run, pid 18864). No Video Enhancer charge in R1-b (TC-036 is hover only; TC-088's source, Video Trimmer, is free and the clip never reached the room). Credits end 5254 (07:14, menu); stage2 ledger has no Video Enhancer row (other users' Image To Video / MyEdit Business rows only). Tab 0 is /en/home. Logs pulled to logs/R1-b-20261125-151508 and sliced. fixtures.md now names the Continue Editing source. Room file input id is selectFile (upload selectFile … for Replace Video). Next: R1-c from TC-042.

### 2026-11-25T07:30:05.344Z · next TC-089 (R1-d)
{"Pass":72,"Fail":11,"Blocked":4,"Not run":54}

R1-c done (TC-042 – TC-081): 40 Pass. Every Mode × Output Resolution × Frame Rate combination on one fx-480p30 upload (7.3 s, Enhance Style HD) showed the expected total and per-second rate; record in R1-c-prices.txt. O-8: at 1 credit/sec the app shows singular 「(1 credit/sec)」 where the rows expect 「(1 credits/sec)」 (template plural), judged Pass. Build MyEdit-5.11.0-11242029 (demo). Chrome profile default, port 9333, 1440x900, default account (Studio Pro). No Enhance pressed, nothing charged: stage2 ledger 07:29 balance 5169 has no Video Enhancer row (other users' MyEdit Business / Image To Video rows only). Account-menu credits read failed in the room (menu id differs), ledger used instead. Tab 0 is /en/home. Logs pulled to logs/R1-c-20261125-152953 and sliced (1 console error: unload permissions policy). Next: R1-d from TC-089.

### 2026-11-25T08:19:48.415Z · next TC-101 (R1-e)
{"Pass":87,"Fail":15,"Blocked":6,"Not run":33}

R1-d done (TC-089 – TC-095, TC-097, TC-099, TC-100, TC-110 – TC-120): 15 Pass, 4 Fail, 2 Blocked. Fails: TC-113 (defect: Video Enhancer ready-mail body 「Your Video Enhancer has been generated successfully…」 instead of 「Your enhanced video is ready!…」), TC-117 (question: no Open in Editor route for a result; no 60 fps toast when the 60 fps result is added to Video Editor), TC-118 (defect: Pricing compare table lists Video Restoration but not Video Enhancer), TC-120 (defect: upload dialog 「Creating Your Video」 has no Cancel). Blocked test-data: TC-099, TC-114 (no way to fail a job). Build MyEdit-5.11.0-11242029 (demo). Chrome profile default, port 9333, 1440x900, default account. Credits (stage2 ledger, Product MyEdit): Video Enhancer -8 (15:31) -64 (15:36) -64 (15:41) -8 (15:55) -180 (16:12, TC-120, job left running) -8 (16:13, TC-119) -48 (16:16, Agent); Video Restoration -16 (16:00, TC-115); AI Agent Request -1 x3. Total 399; ledger 5169 -> 4610 incl. other users' rows. Mails read (Outlook, read only): 2x Video Enhancer ready, 1x Video Restoration ready. Tabs: 0 business-demo.myedit.online/jp is NOT this run's (another session on port 9333, O-9); 1 and 2 are Video Enhancer rooms (tab 1 with the TC-120 3:00 job). Leaving a room fires beforeunload (open may print 'No dialog is showing'). Downloads in downloads/. Logs pulled to logs/R1-d-20261125-161926 and sliced. Next: R1-e from TC-101.

### 2026-11-25T08:37:50.697Z · next TC-128 (R1-f)
{"Pass":94,"Fail":17,"Blocked":6,"Not run":24}

R1-e done (TC-101 – TC-109): 7 Pass, 2 Fail. TC-101 (question): at 375 the upload 「Processing...」 is a full-screen state, the summary and Enhance are not shown dimmed (R-049). TC-107 (defect): after the old room's Back, the left tool menu has no Video Restoration (same root as TC-007). Build MyEdit-5.11.0-11242029 (demo). Chrome profile default, port 9333, default account; viewport restored to 1440x900. Mobile rows ran at 375x812 through a CDP device-metrics override held by a throw-away helper (Chrome on Windows stops at 500 px wide, O-13); the helper is stopped, so no override remains. Credits (stage2 ledger, Product MyEdit): Video Enhancer -8 (16:24, TC-104); Video Restoration -16 (16:26, TC-109), -8 (16:29, TC-108). Total 32; ledger 4610 -> 4578. Tabs: 0 business-demo.myedit.online/jp is NOT this run's (O-9); 1 Video Enhancer room (old TC-120 tab); 2 Video Restoration room (run tab). Logs pulled to logs/R1-e-20261125-163729 and sliced (1 console error: unload permissions policy). Next: R1-f from TC-128.

### 2026-11-25T09:10:37.798Z · next TC-096 (R1-g)
{"Pass":109,"Fail":21,"Blocked":6,"Not run":5}

R1-f done (TC-128 – TC-138, TC-140 – TC-145, TC-149, TC-150): 15 Pass, 4 Fail. Fails (all defect): TC-136 (preview keeps playing under 「Creating Your Video」 after Enhance; Replace Video does pause it), TC-138 (SEO page /en/video-editor/video-enhancer has no 「Get Credits」 in its header; balance part OK 4578 -> 4570 without reload), TC-144 (「Creating Your Video」, 「Unsupported File Format」 and the data-consent dialog and tooltips are dark on the light page, KP-054), TC-150 (Launcher: Video Enhancer and Video Restoration cards share launcher_Video_Enhancer.webp). New observations O-16 – O-21 (O-18: Replace Video click opens the 「Allow Data Processing」 consent dialog, not accepted; the result preview has 「Open in Editor」, so TC-117 deserves a recheck). Build MyEdit-5.11.0-11242029 (demo). Chrome profile default, port 9333, default account, viewport 1440x900 (no override left). Credits (stage2 ledger, Product MyEdit, Video Enhancer): -8 (16:52, TC-128), -10 (16:59, TC-131), -60 (17:04, TC-145); 4578 -> 4500. Downloads in downloads/ (TC-130 x2, TC-131). Recordings TC-128, TC-144. Tabs: 0 business-demo.myedit.online/jp is NOT this run's (O-9); 1 run tab at /en/home (old R1-d room tab closed). Chrome's DevTools port dropped once during a 5:12 upload and came back by itself; log capture restarted (O-17). Logs pulled to logs/R1-f-20261125-171014 and sliced. Next: R1-g from TC-096 (free account TC-096, TC-039; signed-out profile TC-139; storage-full TC-147, TC-148).

### 2026-11-25T09:37:53.423Z · all recorded
{"Pass":113,"Fail":22,"Blocked":6}

R1-g done (TC-096, TC-039, TC-139, TC-147, TC-148) plus TC-117 recheck: 4 Pass, 1 Fail; TC-117 re-recorded Fail (defect). TC-096 Pass (free account: Recent Gen exists only after an upload; with fx-480p30 uploaded it reads 「Start by uploading a video to generate your video」). TC-039 Pass (free, 0 credits: 「Enhance 16」, no 「1 Free Trial」). TC-139 Pass (fresh signed-out profile r1g-signedout on port 9350, now closed: Enhance opens 「Sign in With a CyberLink Account」, no job). TC-147 Fail (question): storage-full prompt has 「Generate Anyway」 and 「Upgrade」, no 「Manage」 (KP-065), so step 3 cannot be done. TC-148 Pass: Generate Anyway starts the job, -8 by balance 4810 -> 4802 (ledger not signed in on that profile), result kept 24 h in My Library (「23 hours left」), storage 5/5 GB. TC-117 recheck (O-18): the result preview's 「Open in Editor」 opens Video Editor with the clip but no 60 fps toast in 60 s; cost one new job, Standard 720P 60 fps, -8. Build MyEdit-5.11.0-11242029 (demo). Run switched back to the default account (account -, port 9333, profile default, Studio Pro), tab 1 at /en/home, viewport 1440x900; tab 0 business-demo is not this run's (O-9). Credits default account: ledger 4500 -> 4414 (incl. other users' Trending AI Templates rows), menu 4390 at 17:37. Logs pulled to logs/R1-g-20261125-173656 and sliced. Observations O-22 – O-24. All 141 rows recorded; next: phase wrap-up (report, eBug drafts) by a separate agent.

### 2026-11-25T09:51:22.978Z · all recorded
{"Pass":113,"Fail":22,"Blocked":6}

R1 wrap-up done: 113 Pass / 22 Fail / 6 Blocked; eBug batch ebugs/2026-11-25-r1 (11 drafts: 10 RD, 1 PM; 6 held; 2 not raised), review page built, format check 0 errors; report text staged for report.md / report.zh-Hant.md; nothing filed

### 2026-11-25T10:45:53.685Z · all recorded
{"Pass":114,"Fail":22,"Blocked":5}

Post-run retests 2026-11-25: TC-020 Pass (fx-ac3), TC-018 still Blocked (no unreadable-fps fixture), TC-024/026/099/114 not tested by the user's decision; TC-088 rechecked (O-25/26). eBug batch 14 drafts, deduped across MyEdit, not filed.
