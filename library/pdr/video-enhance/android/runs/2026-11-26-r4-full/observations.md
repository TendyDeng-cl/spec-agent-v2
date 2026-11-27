# Observations — R4 (Android, 16.9.0 / 2611251)

- **O-1 (TC-317, contradicts KF-014).** Opened from the panel's Recent task icon (account Free, empty list), Recent
  task showed ‹ (btnBack, top left) and ⌂ (btnHome, top right) and no 「Create another one」; ‹ returned to the panel.
  KF-014 says the panel entry has only ⌂ and 「Create another one」. The hint now reads 「…for 1 Year.」 (capital Y).
  Evidence: screenshots/TC-317.png.
- **O-2 (TC-255).** Add Media's 「Downloaded」 album (count 0) shows the empty state 「No videos yet」, the text TC-023
  expects for an album with no videos. Evidence: TC-255 loop output.
- **O-3 (TC-256, TC-257, TC-255; contradicts KF-008).** Stock and picker sources now read their fps on 2611251:
  Pexels 「30fps · 2160p」, Pixabay 「25fps · 2160p」, gettyimages 「29fps · 720p」, Google Drive 「30fps · 2160p」,
  Google Photos 「30fps · 720p」 (R1–R3: 「0fps · …」 with every fps chip disabled).
- **O-4 (TC-258, KF-001).** Selected Length read 「00:11」 for ve-album-only-720p30 (10.03 s); KF-001 says it truncates.
  Same for 3.2 s clips: 「00:04」. Selected Length now rounds up like billing.
- **O-5 (TC-013 reset, for TC-351 precondition 3).** Screens seen since the 17:22 `pm clear`: 「Welcome to PowerDirector /
  By proceeding, I accept the Terms of Service and Privacy Policy.」 (Get Started), the notification permission, the
  BLACK FRIDAY Pro offer page (Close), 「Account Sign In / Credits & cloud AI tasks on this device will be stored under
  your account when you sign in」 (Got it), the Demo page, 「File access permission is required」 (Next) with the music
  and photos/videos permissions. No AI / third-party cloud consent so far; no panel opened and no Enhance tapped since
  the reset. Evidence: screenshots/TC-013-r1.png … TC-013-4.png.
- **O-6 (TC-030 vs TC-371).** On a 12:30 source the panel draws the Selected Length row with an (i) icon and the trim
  strip / ◀▶ knob 66 px lower than on short sources (knob at y 1344 vs 1278 on the SM-A5360); recipes that drag the
  knob by coordinates must read its position per video.
- **O-7 (TC-095, KP-068).** The Pro paywall is now a BLACK FRIDAY SALE page (「Special Offer」 NT$1080/Year 62% OFF,
  「Continue」 with a 6D countdown; 「Continue with Monthly Plan」 when Monthly is ticked) and the Play test purchase is
  product `annualsubscription_bf_2610` (NT$1,080.00/30 min), not `yearly_sub_usd34.99_yfree_202307`. Bought 17:37:47;
  its lapse time may differ from KP-068's 3.5–5.5 h, so check the tier at each segment start.
- **O-8 (TC-351).** The upload dialog's ring read 「100%」 from about 2 s after the tap (burst frame 17:39:22.4) while
  logcat's S3 upload ran 17:39:23.8 → 17:39:40.1 (16 s): the percentage does not follow the upload. Evidence:
  screenshots/tc351-burst-montage.png, logs R4-i. Closest rows: the upload-progress rows in R4-e.
- **O-9 (TC-351).** After the task finished on Recent task (opened by itself after the upload), its ‹ (btnBack) went to
  the Launcher, where KP-072's 「Use credits to enjoy AI features」 dialog showed, then the in-app banner 「Good news! Your
  AI Video Enhance task has been completed. Tap here to view your results.」 (Close / View), not back to the panel.
  Closest rows: R4-f Recent task exits.

- **O-10 (TC-259, TC-033; see O-4, O-6).** The ⓘ next to 「Selected Length」 is not drawn for a video within the Mode cap
  (ve-023001-1080p30, no iv_selected_length_info element), while the 12:30 video's panel has it. Selected Length reads
  「02:31」 for that 150.055 s file (rounded up, O-4) while the Preview total reads 「00:00/02:30」 (truncated). Evidence:
  screenshots/TC-259-open.png, TC-033-panel.png.
- **O-11 (TC-062; KF-013).** On the panel at rest the floating 「Enhance」 CTA (y ≈ 1980–2100 px) lies over the fps chip
  row (chip_fps_30 bounds 68,2011,299,99 are reported as on screen), so `id chip_fps_30` hit 「Enhance ◆ 20」 at 18:23:16
  and started an unintended task on ve-fps60-1080p (10 s, Standard / Natural / 60fps / 1080p, charged 20; balance before
  29370). Its upload took 12 min 52 s (「Upload to S3: start」 18:23:26.6 → 「upload response code->200」 18:36:18.9;
  ring 59% after 4 min) for a 10 s clip, far over KF-013's 1-minute limit; the task then went to 「Processing… 5 minutes
  left…」. Run step: scroll the panel up before tapping the fps / Resolution chips (R3 did). Evidence:
  screenshots/TC-062-fps30.png, waitfor-timeout-20261126-182741.png.

- **O-12 (TC-097, 19:05): the credit pack page is a Black Friday page.** Buy More on My Credits opens a 「BLACK FRIDAY
  SALE」 header with a countdown (「6D 04:53:51」) and a pre-selected 「Special Offer」 1000 +1000 NT$2740 card above the six
  packs (500: NT$2350 struck, NT$1190; 「Get 2000 Credits for NT$2740」 until a pack is tapped). R3 (2611231) opened on
  「Annual Auto Pass Discount」 1000 +1000 NT$2490 (KP-071). Server-set promotion; tap the wanted pack tile first. After the
  500 purchase the offer was 「Want to get 50 Credits, too?」 「NT$170.00」 (KP-071 varies). Evidence:
  screenshots/TC-097-packs.png, TC-097-after.png.

- **O-13 (TC-278 – TC-313, contradicts KF-011).** On 2611251 a hand-set 「00:30」 / 「01:30」 bills exactly 30 / 90 s: with
  「Selected Length」 rounding up (O-4, P0075 fix) the label and the price agree, so the price grid's 30 s and 90 s prices
  are reachable by dragging (finger 210 / 313 at y 1224 on the 12:30 source; 212 / 315 read 「00:31」 / 「01:31」 and bill
  31 / 91). Also: dragging from where the right handle was (x 980) after the selection was shortened scrolls the strip and
  moves the whole selection; only drag from the handle's current place. Evidence: screenshots/TC-278-30s.png,
  calib1.png, calib2.png.

- **O-14 (TC-118 resets; see O-5, TC-013).** After the 19:36 and 19:46 `pm clear` resets, the Launcher's 「Video Enhance」
  went straight to 「File access permission is required」 and Add Media with no Demo page, while after R4-a's 17:22 reset
  the Demo page was back. The 「Turn on notifications」 dialog shows once per install whatever the answer (after
  「Turn On」 no prompt on the next two tasks, one after a relaunch). Evidence: screenshots/R4e-ve2.png, TC-211-noprompt2.png.
- **O-15 (TC-110 / TC-112 / TC-114; KF-013, KF-010).** The 01:30 1080p real clip (ve-real-0130-1080p30, 92.5 MB source)
  uploaded for 52 min without finishing on a clean network (ping 0% loss at 19:50 and 20:44, 17F_QA_Wifi_5G): logcat
  「Upload to S3: start」 19:52:39.7 and no 「upload response」 or exception up to 20:45; ring 「22%」 19:52:41 → 「23%」
  19:53:50 → 「58%」 20:24:09 → 「82%」 20:44:49 (slow, never frozen for long once uploading, but ~1 %/min). Left at
  20:45:06 (Cancel › Leave, on the orchestrator's instruction): panel back, Recent task kept a card
  「2026/11/26 · 1:30 / AI Video Enhance 1126 / Retry」, My Credits 29680 = 29860 − 180 (charged, not restored, as the
  leave dialog says; KF-003: a refund may come ~3 h later, recheck at the run end). Far over KF-013's 1-minute limit.
  Evidence: screenshots/TC-114.png (58%), TC-114-hang.png (82%), TC-114-recent.png, TC-114-credits.png; logs
  R4-e-upload-hang-20261126-204453.
- **O-16 (TC-114 retry, TC-113; KF-010).** A task started while a left (「Leave」) upload is still running in the same
  process stays at 「0%」 / 「Video uploading...」 with no create-session call (20:46:21–20:49:41, 3 min) and is not
  charged, yet Leave on it leaves a 「0:04 / Retry」 card in Recent task; after a relaunch (which ends the old upload)
  tasks run normally. Evidence: screenshots/TC-114-retry-stuck.png, TC-116-recents.png.
- **O-17 (tier, KP-068).** The Pro test subscription bought 17:37:47 lapsed at about 21:12 (logcat
  `updateSubscribingStatus: false` 21:12:12; the Launcher's last tab 「Mine」, Mine 「Free」 「Claim offer」 at 21:13):
  3 h 35 min. Google Play's 「Test: Your PowerDirector - Video Editor subscription has been canceled」 mail was from
  15:42 (the earlier sub). Balance 29652 at 21:13. R4-f's charged rows need Pro bought again first.
- **O-18 (clip name).** Add Media casebook-ve-real (sort Date / Descending) shows
  TC-VE2-153-local-04-3_2s-720p30.mp4 (synthetic 3.2 s 720p, 2.08 MB, 2026-11-18) as the first tile, before
  ve-0130 and ve-real-000320-720p30; R4-e's 3.2 s tasks used that first tile (results corrected).
- **O-19 (R4-f start, KP-068).** Pro test subscription bought again at 21:16:12 from Mine 「Claim offer」 › BLACK FRIDAY
  paywall (NT$1080/Year preselected) › Continue › Play test sheet (「Test card, always approves」, 「This is a test
  subscription… You will not be charged.」, 「NT$1,080.00/30 min」) › Subscribe by bounds; no password. SKU
  `annualsubscription_bf_2610`, order GPA.3392-3149-7284-21466, `updateSubscribingStatus: true`, +100 monthly bonus
  (29652 → 29752). Expect a lapse from about 00:45. Evidence: screenshots/R4f-iap.png, R4f-playsheet.png, R4f-afterbuy.png.
- **O-20 (TC-140 / TC-141 / TC-208 / TC-266; KF-004, KF-014).** On 2611251 Recent task opened from the panel's icon now
  has ‹ and ⌂, 「1 Year」 and 「Manage」 (P0081 / P0082 fixed there), and ‹ / system Back return to the panel. The
  Recent task that opens by itself after a panel Enhance still has only ‹ (no ⌂) plus 「Create another one」, and its ‹
  goes to the Launcher (21:22, 21:33:41, 21:40:32), not the panel. KF-014's layouts changed: update it. Evidence:
  screenshots/TC-140.png, TC-141-step1.png, TC-266-processing.png, after-back.png.
- **O-21 (TC-152; KF-006).** At 「Done」 no copy appeared in Movies/cyberlink/PowerDirector/Video Enhance/ for the
  21:49 task; only each 「Save Result」 tap wrote one (two taps, two identical files 4,539,692 B, both in MediaStore).
  The New Project picker and Add Media share one sort setting (a Duration sort set in Add Media showed in the project
  picker); restored to Date / Descending. Evidence: screenshots/TC-152-all.png, TC-152-all-date.png.
- **O-22 (TC-223 first attempt, recipe).** On 2611251 the 1 s minimum selection (P0087 fix) leaves the right handle at
  x ≈ 416 (not 186 as on 2611231), so combo-price.steps' drag back to the end missed and the first TC-223 attempt
  enhanced a 1 s selection: 「Enhance ◆ 1」 tapped 21:57:16, −1 (Credit Details 「Video Enhancer -1 … 2026/11/26 21:57」),
  done 21:58:44, saved 1280 × 720 30 fps 1.033 s (31 frames). Recipes recalibrated (x 416) and `row` now refuses to tap
  Enhance unless 「Selected Length」 reads 「00:04」; TC-223 run again. Evidence: screenshots/TC-223-try1-*.png,
  exports/TC-223-try1.mp4.
- **O-23 (TC-223 – TC-237; KF-013).** Every 3.2 s 720p upload (1.0 MB) took 64 – 65 s from 「Upload to S3: start」 to its
  finish on 17F_QA_Wifi_5G (19 uploads, none failed), as R2 / R3: over KF-013's 1-minute limit. Recent task opened
  62 – 72 s after the Enhance tap; cards were Done 62 – 143 s later (R-204's 4.8 – 8 s, P0084). Late refund: TC-112's
  −180 (19:52) came back 「Generation failed, credits returned +180」 at 22:54 (3 h 2 min, KF-003); TC-113's −4 (20:56)
  not yet at 23:17.
- **O-24 (TC-229).** On the first View of the Standard / Natural / 120fps / 4K result (22:39) the Result page showed only a
  loading ring with no time for at least 9 s; Save Result tapped then saved nothing and showed no toast (no file, no
  「Saved to Gallery」). Reopened at 23:20 the same task loaded in 1 s, played and saved 3840 × 2160 120 fps. Other 4K
  results (TC-224, TC-227, TC-231, TC-234, TC-237) loaded within the driver's 4 s. Whether Save Result should be
  disabled or queue while the result loads is not stated. Evidence: screenshots/TC-229-res.png, TC-229-toast.png,
  TC-229-redo-*.png.
- **O-25 (R4-g2; KP-068, KP-070, KF-003).** The Pro test subscription bought 21:16:12 lapsed at 00:50:32
  (`updateSubscribingStatus: false`, 3 h 34 min) right after TC-247; the next launch opened the BLACK FRIDAY paywall
  and Pro was bought again on the Play test sheet (「Test card, always approves」, no password) at 00:51:35, order
  GPA.3339-9040-4617-92729, +100 monthly bonus (29154 → 29254); no clawback row seen for this lapse. The chain now stops
  before a row once logcat logs the lapse. TC-113's −4 came back 「Generation failed, credits returned +4」 at 00:00
  (3 h 4 min, KF-003). After local midnight Credit Details opened on 2026-10 with no 2026-11 group (KP-070), so
  TC-240 – TC-254's charges were read from logcat getCreditHistory. Every Professional upload 64 – 66 s (O-23);
  cards Done 201 – 568 s after Recent task opened (4K the longest). Every Result loaded at first View (the O-24
  reopen guard in `row` never fired). Evidence: screenshots/R4-g2-lapse-paywall.png, R4-g2-playsheet.png,
  R4-g2-bought.png; logs/R4-g2-row-out/.
- **O-26 (TC-160, TC-276, TC-161, TC-162; contradicts KF-008).** Opened from the Timeline clip toolbar the panel's badge
  now reads the clip's fps: 「30fps · 1080p」 for ve-0500 / ve-0600 / ve-1000-1080p30 and 「30fps · 720p」 for ve-0030-720p30
  (R3 on 2611231: 「0fps · 1080p」, KF-008). Also on 2611251 the ve-0030-720p30 Timeline clip shows 「Selected Length」
  「00:31」 and bills 31 (P0076 padding, rounded up, O-4), and its 4.4 MB upload took 9 min 51 s each of four times
  (KF-013). Evidence: screenshots/TC-160-panel.png, TC-162-panel.png.
- **O-27 (TC-352; see O-14, O-5).** After another `pm clear` at 04:14:12 (testserver.config kept; Get Started, notifications,
  Pro read from Play with the 100-credit dialog, Google-button sign-in through Chrome without a password, 「Got it」,
  bindMemberSuccess: 0, +30 → 28656), the AI Magic tab's 「Video Enhance」 card went to 「File access permission is required」
  and Add Media with no Demo page, as after the 19:36 / 19:46 resets: TC-013's 「Don't show again」 survives app-data
  clears on this phone/account, so Demo-page rows need another way to reset it. Evidence: screenshots/TC-352-s2.png.
- **O-28 (TC-352 – TC-370; REQ-046 / REQ-047, Q-29, Q-34, R-214).** On 2611251 every other entry reads the clip's own fps,
  resolution and length (24 / 30 / 60 / 120 fps, 720p / 1080p) from AI Magic, the main-track and the PIP Video toolbar
  (the user's timeline-fps problem is not seen), the PIP Video toolbar has 「Enhance」 › 「AI Video Enhance」, and a trimmed
  timeline clip opens with its own in / out points. Opening a long video took the same time from Add Media as from the
  timeline (frame ~0.25–0.5 s, strip ~0.5–1.0 s after the panel), so Q-34 was not reproduced. Overlays added where an
  08:00 overlay already sits go onto a second overlay track. Fixture copies were in a temporary album
  Movies/casebook-ve-entry (removed and rescanned at the segment end). Evidence: recordings/TC-372.mp4, TC-373.mp4,
  TC-374.mp4.
- **O-29 (TC-356, TC-362, TC-369; O-16, KF-010).** In each Leave-then-Keep-Uploading pair the left upload went on in the
  background and the second task's create session waited until it ended (03:18:26, 03:43:22, 03:54:31; ring at 「0%」 for
  ~40–60 s), so each pair charged 2 × 4 and left a 「Retry」 card with no length for the left task. The auto-opened Recent
  task's ‹ went straight to the editor (no panel) from the clip toolbars (O-20: to the Launcher from the Launcher entry).
