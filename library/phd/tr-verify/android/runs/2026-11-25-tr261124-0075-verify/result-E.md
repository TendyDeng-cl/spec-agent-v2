# TR261124-0075 verify — segment E (P0029 on a cleared install; 0243 addendum) — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. Every command targeted
  RFCW2198L7B (`.serial` + `CASEBOOK_SERIAL`, `adb -s`); the other phone on USB was not touched.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31 (`build`).
- User approval (2026-11-25): 「P0029可以清APP資料 只要記得開test server跟fake uuid就好」; later 「沒關係 那就放大來測吧」
  (P0029 may be tested with the display enlarged).
- Time span: 11:20–11:51. Logs: `logs/segE-preclear-20261125-112256/` (before the first clear), `logs/segE-20261125-115038/`.
  Recordings: `recordings/p0029-*.mp4`.
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing bought, no sign-in, no password typed, nothing sent to ECL.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0029 | HOLD | On 4 freshly cleared installs (display size as found and enlarged to 560 / 680 dpi) the Portrait tab never auto-scrolls and no AI Hair Color hint bubble ever appears, so the fix cannot be seen. |
| PHA262026-0243 (addendum) | FIXED (confirmed) | On a cleared install the I2V template list was downloaded fresh, and after the system language change it was **downloaded again** this time (372 template rows re-inserted, Template ETag re-saved); 10 styles tapped quickly before and after each showed its own sample at once. |

## State before / after

| | Before (11:20, before any clear) | After (11:51) |
| --- | --- | --- |
| Server | Test Server (`e_00_launcher_before.png`) | Test Server (`e_95_launcher_end.png`, `e_99_launcher_end.png`) |
| Tier | Free, Mine 「Upgrade to Premium!」 (`e_01_mine_before.png`) | Free, 「Upgrade to Premium!」 (`e_98_mine_end.png`) |
| Credits | **1602** | **0** (see *Credits after pm clear*) |
| Debug dialog | Test server On, Set to subscriber Off, Support ScreenShot for free user **On**, Show landmark / Force fetch / Force show UGC / Show debug info Off, Get Fake Credit UUID **On** (`e_02_debug_before_clear_top.png`, `e_03_debug_before_clear_scrolled.png`) | the same: Test server On, subscriber Off, Support ScreenShot On, Get Fake Credit UUID On, others Off (`e_96_debug_end_top.png`, `e_97_debug_end_fakeuuid.png`) |
| Display size | `wm density`: physical 480, **override 450**; font_scale 1.08 | override 450 (restored 11:49:51), font_scale 1.08 untouched |
| System language | en-US, list `en-US,zh-Hant-TW,ja-JP,ko-KR,pt-BR,vi-VN,id-ID,fa-IR,it-IT,de-DE,ru-RU,fr-FR,zh-Hans-CN,es-ES,th-TH,es-MX,hi-IN,nl-NL` (`e_locales_before.txt`) | en-US, list identical (`diff` = same, `e_locales_after.txt`); app UI English |
| Theme | Night mode yes | Night mode yes |

### pm clear (4 times, all approved for P0029)

| # | Time | Why |
| --- | --- | --- |
| 1 | 11:23:00 | approved P0029 fresh hint state (display 450) |
| 2 | 11:34:51 | the first fresh room entry after clear 1 was taken with the screen blocked (see *Screenshot switch*), so a clean first entry with recording was needed; done at 680 dpi |
| 3 | ~11:38:25 | to try the other entry that might show the hint (New Content 「Try Now」) and then the bug's steps once more at the original 450 |
| 4 | 11:47:15 | user's decision to test enlarged: fresh state at 560 dpi (680 had already been done fresh in clear 2) |

After each clear: consent 「Get Started」, 「Notify me」 › notifications Allow, What's-new × , Premium ×, then Launcher gear ›
About › backdoor ×10 › 「Debug settings」: **Test server On**, **Get Fake Credit UUID On**, **Support ScreenShot for free user
On** (see below), Set to subscriber left Off › OK › relaunch; Launcher showed 「NetworkManager Test Server」; 「New Content ✨」
popup closed with ×; photo access 「Allow all」. Dialog screenshots with both switches on: `e_10_debug_fakeuuid_on.png`,
`e_11_debug_testserver_on.png` (clear 1), `e_43_clear2_debug_fakeuuid_on.png`, `e_44_clear2_debug_top_on.png` (clear 2),
`e_51_clear3_debug_fakeuuid_on.png` (clear 3), `e_90_clear4_debug_fakeuuid_on.png`, `e_91_clear4_debug_top_on.png` (clear 4).
`phone-settings.ts permissions … grant-all` failed on Windows with a false 「not an authorized device」 BLOCKER (its adb
`devices` parsing), so every permission was allowed in the app's own prompts instead.

### Screenshot switch (one setting beyond the brief)
After clear 1 the Edit room came out **all black** in screenshots (`e_18_edit_room.png`, `e_21_edit_room.png`): the room
window carried FLAG_SECURE (`dumpsys window` fl=1812500) because 「Support ScreenShot for free user」 is reset by pm clear.
It was **On before the segment**, so I turned it On again (restoring the found state; otherwise no capture of the bubble
was possible). The first attempt did not stick after a relaunch; set again and confirmed (fl=1810500, no SECURE). Note:
the two black room entries after clear 1 (11:27:46 and 11:28:53) did not tap Portrait (log: only `Photo_Tab_Appear` for
all five tabs, no `Photo_Tab_Click`), but because the hint could in theory show on room entry they were not counted as a
clean first entry; clear 2 redid it with recording.

### Display size changes (P0029)
Original: physical 480, override **450**. Values set:

| Time | `wm density` | Why |
| --- | --- | --- |
| ~11:31:40 | 560 | at 450 all six Portrait items fit, so nothing could scroll; enlarged so the list overflows (Hair partly near the edge) — on the clear-1 install |
| ~11:33:37 | 680 | 560 still showed Hair fully; 680 puts Hair at the right edge (972–1080 px visible), AI Headshot off screen |
| 11:34:51–11:38 | 680 | clear 2 run at 680 |
| 11:40:58 | **450** (restored) | coordinator asked to restore; confirmed `Override density: 450`, Launcher screenshot `e_57_launcher_density_restored.png` |
| 11:47:14 | 560 | user's decision 「那就放大來測吧」: clear 4 run at 560 |
| 11:49:51 | **450** (restored) | confirmed `Override density: 450`; Launcher `e_95_launcher_end.png`, `e_99_launcher_end.png` |

No other display setting (font size, theme, resolution) was changed.

### Credits after pm clear
With 「Get Fake Credit UUID」 on, each clear made a **new** fake credit UUID (log `method=DEBUG_NEW_CREATE`, prefixes
ecc85800… after clear 1, 1f64b904… at the end), each with **0** credits. The 1602-credit balance belonged to the fake UUID
in use before the clear (4b77fa60…), which the app no longer uses. The device's own Test Server UUID (`method=ANDROID_ID`,
be0565d8…) also reads 0. So the S23 now shows **0 credits** on Test Server; KP-136 (「pm clear does not reset the
balance」) holds only with Fake UUID off. Nothing in this segment needed credits.

## PHA262026P0029 — AI Hair Color hint bubble truncated after auto-scroll to Hair — HOLD

Bug steps: install and launch, open a photo, switch to Portrait tab, the list auto-scrolls to Hair, check the hint bubble.
RD: root cause 「it only sctoll to item visible」 → Solution 「scroll item in the middle」; Function 「can not verify it in
this app version」.

Every try: Launcher › Edit › photo › (room opens on the Edit tab) › tap 「Portrait」 with a screen recording running and 4–6
`screencap` frames taken right after the tap, then a settled screenshot and the page source.

| Try | Install / display | Photo | Recording | Result |
| --- | --- | --- | --- | --- |
| 1 | clear 1, 450 | group photo (4 faces) | `p0029-hint-1.mp4` | list AI Edit Agent, Beautify, Body Reshape, Makeup, Hair, AI Headshot (all fit, 180 px each), no scroll, **no bubble** (`e_24_p0029_burst_1…6`, `e_25_p0029_settled.png`); Hair › AI Hairstyle / AI Hair Color / Hair Volume, no bubble (`e_26_p0029_hair.png`) |
| 2 | clear 1, 450 | single portrait (woman, red top) | `p0029-hint-2.mp4`, `-3.mp4` (Edit → Portrait) | no scroll, no bubble (`e_30_p0029_photo2_burst_*`, `e_31_p0029_photo2_portrait.png`) |
| 3 | clear 1, 450 | Launcher 「Dye Your Style」 banner | — | opens the AI Hair Color intro sheet (「AI Hair Color」 / 「Go beyond traditional hair colors! …」 / Try now / Don't show again), not Edit › Portrait (`e_32_p0029_dye_banner.png`); closed with Back |
| 4 | clear 1, 560 | red-haired woman | `p0029-hint-d560.mp4` | items 200 px, Hair 804–996 px, AI Headshot cut; no scroll, no bubble (`e_36_*`, `e_37_p0029_d560_portrait.png`) |
| 5 | clear 1, 680 | woman, red top | `p0029-hint-d680.mp4` | Hair 972–1080 px (cut at the edge); no scroll, no bubble (`e_39_*`, `e_40_p0029_d680_portrait.png`) |
| 6 | **clear 2, 680**, first room entry | group photo | `p0029-fresh2-entry-portrait.mp4` (from photo tap through room entry and Portrait) | room opens on Edit; Portrait: Hair cut at the right edge, **no auto-scroll, no bubble** (`e_47_clear2_room_entry_*`, `e_48_clear2_portrait_burst_1…6`, `e_49_clear2_portrait_settled.png`) |
| 7 | clear 3, 680 | New Content 「Try Now」 | `p0029-clear3-newcontent-trynow.mp4` | opens AI Background (recommendation sheet → picker → Outdoor / Indoor / Solid / Custom), not Hair (`e_53`…`e_56`) |
| 8 | clear 3, **450** (restored), first Edit room entry | group photo | `p0029-clear3-portrait-d450.mp4` | no scroll, no bubble (`e_58_clear3_portrait_burst_*`, `e_59_clear3_portrait_settled.png`) |
| 9 | **clear 4, 560**, first room entry | group photo | `p0029-clear4-d560-entry-portrait.mp4` | no scroll, no bubble (`e_93_clear4_d560_burst_1…6`, `e_94_clear4_d560_portrait.png`) |

- Burst frames vs the settled screenshot differ only in the tab underline moving (pixel bbox 6 px high at y≈2113–2194);
  nothing else ever appears.
- The page source never holds a tooltip / bubble view after the tap (only the `hintEnableEffectIcon` dots of each tool).
- Log: `Photo_Tab_Click:{"tab":"Portrait"}`, `BottomToolBarSmall: currentTabType = Portrait`; no hint/tooltip line.
- Whether Hair now scrolls to the middle cannot be seen either: the list only scrolls together with the hint, and the
  hint never fires on this build/phone, whatever the display size, photo or entry. That matches RD's own 「can not verify
  it in this app version」.
- RD note: it only scrolled the item to visible → scroll the item to the middle.
- Side effects: other first-time hints seen on the way, all complete and legible: picker 「Tap to expand albums」 bubble
  (`e_17_gallery.png`), AI Edit Agent 「Add photos and start editing」 bubble and 「Your Free Trial is Ready!」 sheet at 560
  dpi (`e_33_density_picker.png`), Edit room tab bar and tool labels at 560 / 680 (labels wrap, nothing clipped except the
  intended edge fade).
- What would be needed: the condition that arms the hint (remote config / campaign, or a build where it is enabled) from
  RD, or the original reporter's device. User decision.
- Decisive: `e_48_clear2_portrait_burst_2.png`, `e_49_clear2_portrait_settled.png`, `e_94_clear4_d560_portrait.png`,
  `e_59_clear3_portrait_settled.png`, recording `p0029-fresh2-entry-portrait.mp4`.

## PHA262026-0243 addendum — I2V samples on a fresh download and after a system language change

1. Clear-3 install, display 450, English. AI Videos › Image to Video (11:42:32) → intro sheet 「Image To Video」 /
   「Make Your Photos Come Alive! …」 / Try now / Don't show again (`e_63_i2v_sheet.png`). System Back on the sheet closes the
   entry (back on AI Videos), so the room was entered with **Try now** › Steps › **Continue** (「Don't show again」 not
   ticked). Log 11:42:32: I2V CMS ETags saved fresh and **372 rows inserted into ImageToVideoTemplateContract** (fresh
   download on the cleared install).
2. Templates, 10 styles tapped one after another (right-hand card each time, ~1.4 s apart), `screencap` at once and 1.2 s
   later (`e_70_i2v_fresh_NN_imm/_s.png`, sheet `e_70_i2v_fresh_sheet.png`): Snowball Toss (dark-haired woman), Cloud Surfer
   (man walking), Elegance (Asian woman in cream blouse), Snow Angel (woman by the sea), Machine Power (border collie),
   Duck Crossing (rabbit), Concert, Pet Editorial (golden retriever), Big Swagger, Streetbeat — each its own sample, the
   immediate and settled frames identical, the samples the same as segment D's English baseline for the shared styles.
3. System language → 繁體中文（台灣） in Samsung Settings › Language › Edit, dragged to the top, Back (11:45:06,
   `persist.sys.locale` zh-Hant-TW; `e_81_lang_zh_dragged.png`, `e_82_lang_zh_applied.png`). Log 11:45:12–13: I2V ETags
   re-saved and **372 template rows inserted again**, `[saveETag] … ImageToVideoTemplate` (this time the template list
   *was* re-downloaded, unlike segment D's 「Template Content is not modified」); later reads say not modified.
4. App back (I2V room recreated in Chinese, `e_83_zh_app.png`); left the room, 「全新內容 ✨」 popup closed, AI 影片 ›
   圖片生成影片 › 立即試用 › 繼續 › 範本 (11:45:38). 10 styles tapped quickly (11:46:01–11:46:29, `e_85_i2v_zh_NN_imm/_s.png`,
   sheet `e_85_i2v_zh_sheet.png`): 鬼步舞 (woman in green top), 小鴨過馬路 (rabbit), 雪地天使 (woman by the sea), 丟雪球 …
   each showed its own sample at once; immediate = settled; no default image left, no other style's photo.
5. Language restored: Settings › 編輯 › English dragged back to the top › Back (11:47:07): `persist.sys.locale` en-US,
   `system_locales` identical to the start (`e_86_lang_en_restored.png`); app Launcher English at the end.
- RD note: language change → I2V style folder re-downloaded; sample now default image first then sourceImageURL via Glide;
  downloads to .tmp and renamed after MD5.
- Side effects: none seen in the room (UI fully localized, carousel and selection border follow taps, price 20 shown).
- Decisive: `e_70_i2v_fresh_sheet.png`, `e_85_i2v_zh_sheet.png`.

## Other observations (not filed)
- Log 11:41:11: `MD5 checksum failed for file: …/files/SeasonalBanner/Seasonal_Banner_9_character_motion_swap_sample_video_91.webp`
  (one seasonal banner asset on a fresh install). Banner not checked on screen; noted only.
- After each pm clear with Fake UUID on, the balance is 0 (new fake UUID). Worth adding to KP-136 (Fake UUID on → each clear
  is a new, empty UUID).
- 「Support ScreenShot for free user」 is reset by pm clear like 「Test server」 (KP-137 names only Test server); without it every
  Edit room capture of a Free user is black.
- On a cleared install the Edit room opens on the Edit tab; afterwards it reopens on the last tab used (Portrait), so a
  repeat of the bug's step 3 needs Edit → Portrait.

## Needs the user's decision
- P0029 HOLD: the hint never shows on this build on the S23 (4 clean installs, 450 / 560 / 680 dpi, 3 photos, 3 entries).
  Ask RD what arms the hint (or accept it as unverifiable per RD's own note).
- Credits: the S23 Test Server balance is now 0 (fake UUID renewed by the clears); the old 1602 belongs to a UUID the app
  no longer uses. Top up only if a later run needs credits.

## End state
- PhotoDirector on the Launcher (Home), English, Test Server, Free, 0 credits; debug dialog: Test server On, Get Fake Credit
  UUID On, Set to subscriber Off, Support ScreenShot for free user On (as found), others Off.
- Phone: display override 450 (as found), font scale 1.08, Night mode yes, system language en-US with the original list.
- Logs pulled: `logs/segE-20261125-115038/`.
