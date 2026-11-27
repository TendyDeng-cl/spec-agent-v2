# TR261124-0075 verify — segments C (I2V Reuse) and D (system language) — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. Every command targeted
  RFCW2198L7B (`.serial` + `CASEBOOK_SERIAL`); the Pixel 8a was not touched.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31 (`build`).
- Server: Test Server (debug overlay 「NetworkManager Test Server」, `c_00_launcher.png`).
- Tier: Free (Mine 「Upgrade to Premium!」 at the end, `d_98_mine_end.png`). Tier switch not touched.
- Credits: **1602 at start → 1602 at end**. No generation, nothing bought, no sign-in, no password typed.
- Phone theme dark throughout (`cmd uimode night` → 「Night mode: yes」 at the end).
- System language: found en-US with list `en-US,zh-Hant-TW,ja-JP,…` (18 locales); changed twice to zh-Hant-TW and back;
  at the end `persist.sys.locale` = en-US and `system_locales` identical to the start; per-app locale empty
  (`cmd locale get-app-locales` → `[]`); app UI English (`d_99_launcher_end_en.png`).
- Time span: 10:46–11:19. Logs: `logs/segCD-20261125-111943/`. Recordings: `recordings/p0145-*.mp4`,
  frame contact sheets `recordings/frames-sheets/`.
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, nothing sent to ECL.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0142 | FIXED | From AI Videos the 「Image To Video」 sheet shows; Reuse of the finished Kling 2.6 Custom video now shows the same sheet first (3 of 3), Try now → Steps → Continue → Custom with Kling 2.6, the prompt, 10 s, Pro, Sound Off and the toast 「Settings applied」. After 「Don't show again」 Reuse opens Custom directly (with the reused settings) and AI Videos opens Custom directly too. |
| PHA262026P0145 | FIXED | 9 screen recordings of the transitions (5 Reuse taps, Try now, Continue, 2 AI Videos entries): 1,711 decoded frames (1,412 more at a resampled 30 fps) all portrait, no rotated or letterboxed frame; nav bar never moved; `dumpsys` shows ImageToVideoActivity `requestedOrientation=SCREEN_ORIENTATION_PORTRAIT`. |
| PHA262026-0243 | FIXED | System language changed to 繁體中文（台灣） in Samsung Settings (not only per-app): right after the change, 10 styles tapped in Image to Video › Templates each showed their own sample photo at once, identical (pixel diff 0.8–2.5 of 255 vs 39 for a different style) to the same style in English and unchanged 30 s later. Note: the log says 「No need to download: Template Content is not modified」 after each change, so the style folder was not re-downloaded on this phone (see bug section). |

## PHA262026P0142 — Reuse opens Custom without the explanation sheet

1. Launcher › AI Videos › Image to Video (`c_01_ai_videos.png`): the intro sheet 「Image To Video」 / 「Make Your Photos Come
   Alive! Transform your static images into captivating videos」 / 「Try now」 / 「Don’t show again」 (unticked) shows
   (`c_02_p0142_aivideos_entry.png`, recorded as `recordings/p0145-entry-aivideos.mp4`). Closed with system Back.
2. AI Photos › My Artwork › All categories › Image to Video (`c_03`, `c_04`, `c_05_i2v_category.png`): the Kling 2.6 video
   from 2026/11/24 (prompt 「The person smiles and waves slowly at the camera」, 00:10) → Save & Share with 「Prompts &
   Settings」, Kling 2.6, chips 10s / pro / Sound off, 「Reuse」 (`c_06_saveshare.png`).
3. Reuse → the same intro sheet shows first (`c_07_p0142_reuse_sheet.png`). Logcat:
   `ImageToVideo_Reuse_Click:{"model":"Model_Kling-2.6"}`, `[setCurFrom] from = artwork_reuse` (10:48:45).
4. Try now → 「Steps」 page (Upload Your Photo / Select a Template / Generate Result, 「Continue」, 「Don’t show again」,
   `c_08_p0142_after_trynow.png`) → Continue → Custom tab: Model 「Kling 2.6」, prompt 「The person smiles and waves slowly
   at the camera」 48/2500, toast **「Settings applied」** (`c_09_p0142_custom_toast.png`); scrolled: Duration **10**, Video
   Quality **Pro**, Generate Background Sound **Off**, Generate 50 (disabled, no photo) (`c_10_p0142_reuse_settings.png`).
5. Repeated Reuse twice more: sheet first both times (`c_12_p0145_reuse2.png`, `c_13_p0145_reuse3.png`); system Back on
   the sheet returns to Save & Share (`c_12b`, `c_13b`). A fourth full path Reuse → Try now → Continue reached the same
   Custom room (`c_14_p0145_fullpath_room.png`).
6. 「Don’t show again」 check (app data is cleared by the next segment, so the flag set here does not carry over): on
   the Reuse sheet ticked 「Don’t show again」 (`c_16_p0142_dontshow_after.png`) › Try now › Steps (`c_17`) › Continue →
   Custom with 「Settings applied」. Back, Reuse again → **no sheet, no Steps page**: Custom opens directly with Kling 2.6,
   the prompt and 「Settings applied」 (`c_18_p0142_reuse_after_dontshow.png`). Launcher › AI Videos › Image to Video now
   also opens Custom directly, with an empty prompt (0/2500) and the default model price 30 (`c_19_aivideos_entry_after_dontshow.png`).
- RD note: Custom Reuse no longer takes the non-empty-prompt shortcut; it goes through the normal intro check (respects
  「Don't show again」 and deep links); after 「Try now」 it opens Custom with the reused model and prompt; prompt-only
  reuse and restored state still open directly.
- Side effects: none seen. Places checked: sheet from AI Videos and from Reuse (same layout); Back on the sheet → Save &
  Share; Steps page after Try now; reused model/prompt/duration/quality/sound and the toast after the sheet path and
  after the no-sheet path; 「Don't show again」 respected on both Reuse and AI Videos entries; the AI Videos entry does not
  inherit the reused prompt. Prompt-only reuse: the only other I2V artwork, the 「Feeling Good」 template video, has no
  Reuse button on its Save & Share page (`c_15_feelinggood_saveshare.png`), so no prompt-only Reuse could be tried;
  deep links not tried.
- Decisive: `c_02_p0142_aivideos_entry.png`, `c_07_p0142_reuse_sheet.png`, `c_09_p0142_custom_toast.png`,
  `c_10_p0142_reuse_settings.png`, `c_18_p0142_reuse_after_dontshow.png`.

## PHA262026P0145 — Custom room flashes rotated (landscape) on Reuse

Recordings (`record start` / tap / ~3 s / `record stop`), all on the Kling 2.6 video:

| Recording | What it covers | Decoded frames | 30 fps frames |
| --- | --- | --- | --- |
| `p0145-reuse-1.mp4` | Save & Share → Reuse → intro sheet | 136 | 150 |
| `p0145-trynow-1.mp4` | sheet → Try now → Steps | 173 | 156 |
| `p0145-continue-1.mp4` | Steps → Continue → Custom room | 187 | 136 |
| `p0145-reuse-2.mp4`, `p0145-reuse-3.mp4` | Reuse → sheet (repeats) | 135, 133 | 148, 147 |
| `p0145-fullpath-4.mp4` | Reuse → sheet → Try now → Steps → Continue → Custom, one take | 326 | 288 |
| `p0145-reuse-5-nosheet.mp4` | Reuse straight into the Custom room (after 「Don't show again」) | 171 | 143 |
| `p0145-entry-aivideos.mp4` | side effect: AI Videos → Image to Video (sheet) | 265 | 175 |
| `p0145-entry-aivideos-2.mp4` | side effect: AI Videos → Image to Video (straight to Custom) | 185 | 69 |
| **Total** | | **1,711** | **1,412** |

- Method: every frame decoded twice (ffmpeg `-fps_mode passthrough`, i.e. every frame screenrecord wrote, and
  `fps=30`), scaled to 216 × 468. Per frame: difference of the bottom navigation-bar strip against the portrait nav bar
  (a rotated frame moves it) and the share of fully black rows (a landscape frame letterboxed into the portrait video
  leaves black bands). Nav-bar difference ≤ 0.1 in every Reuse/Try now/Continue frame (the only higher values are the
  Launcher's own tab bar in the AI Videos recordings); black rows ≤ 34 % (the dark sheet background), never a band
  pattern. Contact sheets of every changing frame (±1) were then looked at: all portrait, normal slide-in transitions,
  Custom room drawn upright from its first frame (`recordings/frames-sheets/p0145-reuse-5-nosheet_native.png`,
  `p0145-fullpath-4_native.png`).
- `dumpsys activity` while in the room: `ImageToVideoActivity … requestedOrientation=SCREEN_ORIENTATION_PORTRAIT`;
  display `mRotation=0`, auto-rotate free (`USER_ROTATION_FREE`), phone lying flat in portrait.
- RD note: the portrait lock in BaseActivity ran after a delayed post; ImageToVideoActivity now locks portrait right
  away in onCreate on small screens; tablets unchanged. RD's impact: 「only fix image to video, other activity also has
  same problem」.
- Side effects: none seen in Image to Video (entries from AI Videos with and without the sheet, from Reuse with and
  without the sheet). Other activities were not recorded (RD says they still have the delayed lock; out of this bug).
- Decisive: `recordings/frames-sheets/p0145-reuse-1_native.png`, `p0145-fullpath-4_native.png`,
  `p0145-reuse-5-nosheet_native.png`.

## PHA262026-0243 — wrong sample image after a system language change

How the language was changed: the device script's `launch --lang` sets only the **per-app** language on Android 13+, so
it was used once as a warm-up (ja), and the decisive checks changed the **system** language in Samsung Settings ›
Language (Edit, drag 繁體中文（台灣） above English, Back; `d_54`, `d_55`), which keeps the user's 18-language list; restored
the same way (`d_57_settings_en_drag.png`, `d_58_settings_en_applied.png`, `d_99_settings_en_final.txt`).

1. English baseline (11:13–11:15, after restoring en): Image to Video › Templates, 16 styles tapped one by one, each
   screenshot after the carousel settled and the selected name read back (`d_aen_01s` … `d_aen_16s`). The sample photo
   in the big preview (the example input, not the thumbnail) is per style, e.g. Ghost Step = woman in green top and
   cargo pants, Elegance = Asian woman in cream blouse, Duck Crossing = rabbit, Snow Angel = woman by the sea,
   Machine Power = border collie, Pet Editorial = golden retriever.
2. System → 繁體中文（台灣） at 11:16:14 (`persist.sys.locale` zh-Hant-TW), PowerDirector brought back at once (`activate`; it was
   in the I2V room, which recreated in Chinese, `d_b0_zh2_app`). Log: I2V CMS ETags re-saved 11:16:15
   (ImageToVideoUITranslation, Category, CustomModel, Inspiration, Bgm). From 11:16:26, 10 styles tapped quickly, a
   screenshot right after each tap and one after it settled (`d_bzh_01` … `d_bzh_10`, `…s`): 丟雪球, 沙灘日光浴, 甜心搖擺, 優雅,
   鬼步舞, 小鴨過馬路, 劈腿姿勢, 雪地天使, 順暢搖擺, 掌上寵物機 — the selected name read back matched the tapped one every time,
   and each preview showed that style's own sample at once (no default image, no previous style's photo, no partial
   image).
3. 30 s later (11:17:46): 8 of them again (`d_czh30_01s` … `08s`): same photos.
4. Numeric check (preview area, the localized label masked): each zh capture vs the same style in English (matched by
   guid in the log, e.g. `Example_236_Ghost-Step` = Ghost Step = 鬼步舞): mean pixel difference 0.83–2.48 of 255
   (Ghost Step 0.83, Muse Wave 0.83, Elegance 1.00, Snowball Toss 1.02, Snow Angel 1.79, Duck Crossing 2.48); styles not in
   the English walk vs their first zh capture: 0.00. A different style for scale: 39.0. Immediate and settled shots are
   the same.
5. First zh round (system zh at 11:03:04, cold `launch`; the first I2V entry re-saved the I2V ETags at 11:05:40): the
   clean pass at 11:10:48 (`d_9zhB_01s` … `10s`, after the stray loop below was killed) gave the same photos; the 11:05
   pass (`d_7zh_*`) was disturbed by that loop and is not used.
- Per-app warm-up (ja, 10:59–11:01, `d_3ja_*`, `d_4ja30_*`): samples were plausible for every style (pet styles a pet,
  child styles a child, e.g. マシンパワー = the same border collie), but a leftover background loop of mine was dragging the
  carousel during those passes, so the name ↔ shot pairing there is not reliable; not used for the verdict.
- Condition note: after every language change the log says `hl5: No need to download: Template Content is not modified`
  (10:59:38, 11:05:41, 11:16:19): only the CMS lists were refreshed; the style folder was not deleted and re-downloaded,
  which is the case RD's root cause describes (download to .tmp, rename after MD5; default image then Glide). The bug's
  steps as written (change system language → AI Videos → Image to Video → select styles) pass 10/10 and 30 s later; the
  re-download path itself was not forced on this phone. The next segment clears app data (pm clear), which makes the
  first I2V entry download every style; if wanted, one pass of step 2 right after that would cover it.
- RD note: language change changes the CMS ETag, the I2V style folder is deleted and re-downloaded; the sample was read
  only from the local file and never refreshed → now the default image first, then sourceImageURL via Glide (request
  cancelled on style switch / view destroy); downloads go to .tmp and are renamed after the MD5 check. Impact: only the
  Image to Video room.
- Side effects: none seen in the Image to Video room: style names and UI fully localized in zh and ja, thumbnails and
  sample photos load, selection border follows the tap, the carousel keeps position after the activity recreated,
  Generate price shown (20 / 30). After restoring English the room and Launcher are English again.
- Decisive: `d_bzh_01.png` … `d_bzh_10.png` (immediate), `d_czh30_01s.png` … (30 s), `d_aen_01s.png` / `d_aen_06s.png` /
  `d_aen_09s.png` (English baseline), `d_55_settings_zh_applied.png`, `d_58_settings_en_applied.png`.

## Other observations (not filed)

- After the language switches the Launcher's top banner showed a Japanese title 「髪色で私らしく」 while the app was in
  繁體中文 (`d_64_zh_aivideos.txt`, `d_65_zh_tab.png`), after a per-app ja pass earlier; after returning to English the banner
  read English (「Have fun with GPT Image 2.6」). Looks like a banner cached from the ja session; outside these bugs, not
  rechecked.
- My own tooling slip: a stopped background helper (`walk.sh`) kept running `fingerdrag` on the template carousel from
  10:55 to 11:10 (found and killed at 11:10). It touched only the I2V carousel, the Launcher and the Settings language
  list (no change there besides my own reorder; the final list equals the start). Segment C had finished before it
  started (last C step 10:52). All D evidence used for the verdict was taken after it was killed (11:10 onward).
- 「Don't show again」 is now set for the Image to Video intro on this install; the next segment's pm clear resets it.
