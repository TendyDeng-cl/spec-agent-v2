# TR261124-0075 verify — segment B (generations) — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. Every command targeted
  RFCW2198L7B (`.serial` + `CASEBOOK_SERIAL`); the Pixel 8a was not touched.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31 (`build`).
- Server: Test Server (debug overlay 「NetworkManager Test Server」, `b_00_launcher.png`; debug dialog 「Test server」 on,
  `b_61_debug_dialog_before.png`).
- Tier: Free at start (Mine 「Upgrade to Premium!」, `b_01_mine_start.png`). **Subscriber** from 10:39 to 10:44 (see
  *Tier switch*), Free again at the end (`b_90_mine_end.png`).
- Credits: **1692 at start** (10:21) → **1602 at end** (10:45). Nothing bought, no sign-in, no password typed.
- Phone theme dark (`cmd uimode night` → 「Night mode: yes」 at the end, as found).
- Time span: 10:20–10:45. Logs: `logs/segB-20261125-104500/` (logcat-live.txt, logcat-buffer.txt).
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, nothing sent to ECL.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026-0031 | FIXED | After a Custom generate the button is lit again (label 「Retry」, enabled, same colour as before); a changed prompt shows 「Generate」 lit and a second generate works. |
| PHA262026P0045 | FIXED | After a video result [Artwork] opens My AI Artwork › AI Edit Agent on **Video**; after an image result on **Photo**; empty room on **Photo**. Same on Free and on subscriber. |
| PHA262026-0360 | FIXED | Feeling Good with 「Generate Background Sound」 On: saved mp4 has an AAC 48 kHz stereo track, mean volume −14.9 dB, max 0.0 dB, every second −12 to −24 dB. |
| PHA262026P0056 (addendum) | FIXED | Image check from segment B: [i] 「Each image generation costs 6 credits.」 = 6 charged per image (UI 1654→1648 Free, 1608→1602 subscriber; server log `creditUsage=-6, featureId=PhotoAgent, actionId=genimage_1_img_google_gemini3pro`). Image generation shows no cost dialog. |

## Credits per step

| Step | Before → after | Evidence |
| --- | --- | --- |
| 0031 Custom generate #1 (prompt 「a snowy mountain village at dusk」, button showed 9) | 1692 → 1683 | top bar `txtCreditRemain` (`b_05`, `b_06`); history `createTime 02:21:01` |
| 0031 Custom generate #2 (prompt 「a modern glass office lobby with plants」) | 1683 → 1674 | `b_09`, `b_11`; history `02:22:28` |
| P0045 video (Free), dialog 「4 credits per second」, 5 s | 1674 → 1654 | `b_26`, `b_28`; log `creditUsage=-20, featureId=PhotoAgent, unit=5, actionId=genvideo_1_sec_motivai_custom_pixverse6_enable_single_720p` (02:26:16) |
| P0045 image (Free), no dialog | 1654 → 1648 | `b_32`, `b_33`; log `creditUsage=-6 … genimage_1_img_google_gemini3pro` (02:29:07) |
| 0360 Feeling Good, 5 s Standard, Sound On, button showed 20 | 1648 → 1628 | `b_50`, `b_52`; log `creditUsage=-20, featureId=ImageToVideo, actionId=gen-pixverseeffect-std_5_sec_tmpl` (02:35:52) |
| P0045 video (subscriber), dialog 「4 credits per second」 | 1628 → 1608 | `b_73`, `b_74`; log `creditUsage=-20 … genvideo_1_sec_…pixverse6…` (02:41:10) |
| P0045 image (subscriber), no dialog | 1608 → 1602 | `b_77`; log `creditUsage=-6 … genimage_1_img_google_gemini3pro` (02:42:51); `getMemberCreditRemain totalRemain=1602` |

Every charge matches the price shown before it (button, dialog or [i]).

## Tier switch (coordinator instruction, 2026-11-25)

The coordinator lifted the Free 3-chat AI Edit Agent limit mid-segment and asked for AI Edit Agent testing as a
subscriber. By then P0045 and the P0056 image check had already been done on **Free** with the account's last two
free chats (segment A used 1, segment B used 2: none left on Free). So the AI Edit Agent part was then **repeated as
subscriber**:
- 10:39 Launcher gear › About › tapped the backdoor below ‹ ten times › 「Debug settings」: Test server On, Set to
  subscriber **Off**, Support ScreenShot for free user On, others Off (`b_61_debug_dialog_before.png`) → turned
  「Set to subscriber」 **On** (`b_62_debug_subscriber_on.png`) › OK › relaunch. Mine: 「Hello VIP!」 / 「Enjoy 1000+ VIP
  templates & full access to over 50 AI tools」, 1628 credits (`b_63_mine_premium.png`). Nothing else changed.
- As subscriber: [i] reads exactly as on Free (「Each image generation costs 6 credits.」, 「Each second of video
  generation costs 4 credits.」, `b_71_sub_p0056_info.png`); the video dialog said 「This generation will use 4 credits per
  second. Continue?」 (`b_73_sub_p0045_video_dialog.png`), 20 charged for 5 s; the image charged 6. So the subscriber
  costs equal [i] too; no second [i] read was needed beyond `b_71`.
- 10:44 same dialog, 「Set to subscriber」 turned **Off** (switch pixels identical to the start, `b_81_debug_subscriber_off.png`)
  › OK › relaunch. Mine: 「Upgrade to Premium!」, 1602 (`b_90_mine_end.png`) = Free, as found.

## Per bug

### PHA262026-0031 — AI Background [Custom]: [Generate] not lit after generating
1. Edit › first 1_Fashion photo (man in suit) › Background › AI Background (`b_03_0031_ai_bg_room.png`): Generate
   disabled, cost 「--」 until a style is chosen.
2. Custom › Prompts 「a snowy mountain village at dusk」 › ✓: 「Generate」 enabled, 「9」 (`b_05_0031_before_generate.png`).
3. Generate: during generation the button is dimmed (button colour RGB 77,57,46) with a scan bar over the photo
   (`b_06_0031_during.png`), 1683 credits.
4. After: snowy village background applied; the button reads **「Retry」**, enabled, lit (RGB 255,190,152 = the same
   colour as before generating), 「9」 (`b_07_0031_after.png`).
5. Side checks: Custom again → prompt kept (32/100, `b_08`); cleared and typed 「a modern glass office lobby with plants」
   → button back to **「Generate」**, lit (`b_09_0031_prompt_changed.png`); tapped it → second image generated (glass lobby),
   button 「Retry」 lit again (`b_10` during dimmed, `b_11_0031_second_after.png`). Option change: Courtyard selected →
   「Generate」 lit (`b_12_0031_courtyard_selected.png`); back to Custom (prompt kept) → 「Retry」 lit
   (`b_13_0031_custom_reselected.png`). Colour of the button in all after-states: 255,190,152.
- RD note: lost to update it → update it.
- Side effects: none seen (places checked: button label and colour before / during / after for two generates, after a
  prompt change and a style change; prompt kept in the Custom sheet; credit pill updated each time; result image
  applied, ✓ enabled). 「Retry」 as the post-generate label with the same prompt is how the button reads now; it is lit.
- Decisive: `b_05_0031_before_generate.png`, `b_06_0031_during.png`, `b_07_0031_after.png`, `b_09_0031_prompt_changed.png`.

### PHA262026P0045 — AI Edit Agent [Artwork] always on the Photo tab
Free (chats 2 and 3 of 3):
1. Launcher › AI Edit Agent, new room, no message: [Artwork] (`go_artwork_btn`) → My AI Artwork, category 「AI Edit Agent」,
   **Photo** selected, 「Nothing yet.」 (`b_21_p0045_artwork_noresult.png`).
2. Back, import the suit photo › Next, sent 「Make this photo into a short 5-second video of him smiling」 → 「Ready to
   Create Your Video?」 / 「This generation will use 4 credits per second. Continue?」 / Generate / Cancel / Don't show again
   (unticked) (`b_26_p0045_cost_dialog.png`) → Generate. 「Processing…」 then 「The five-second video is ready, with his
   expression warming into a natural smile. …」 (`b_28_p0045_video_done.png`).
3. [Artwork] → AI Edit Agent › **Video** selected, card 00:05 「Pixverse V6」 「Animate the man in a natural, subtle way…」,
   Expires on 2027/11/25 (`b_29_p0045_artwork_video.png`).
4. Back, sent 「Change the background to a sunny beach」 → no dialog, Processing → 「The background is now a sunny beach,
   with the man and his suit preserved.」 (`b_33_p0045_image_done.png`) → [Artwork] → **Photo** selected with the beach
   image (`b_34_p0045_artwork_photo.png`). Tapping Video by hand switches to the video list (`b_35`).

Subscriber (after the tier switch): new room [Artwork] → Photo (`b_72`); video (same prompt) → [Artwork] → **Video**
(two 00:05 cards, `b_75_sub_p0045_artwork_video.png`); image 「Change the background to a sunny beach」 → Result 2 shown
with its buttons, agent still 「Thinking...」 on the reply text (`b_77_sub_p0045_image_done.png`) → [Artwork] → **Photo**
(`b_78_sub_p0045_artwork_photo.png`). The image result itself was finished (shown, 6 charged), so Photo is what RD's rule
gives.
- Not checked: [Artwork] while a result is still Processing (RD: running results are skipped). Not tried, to avoid
  leaving the room mid-task on the last free chat.
- RD note: (tab followed nothing) → the tab follows the newest finished result of the room on screen: video → Video,
  image or none → Photo, running results skipped.
- Side effects: none seen (places checked: Photo / Video pill highlight legible (orange pill, dark text) in dark theme,
  category tab 「AI Edit Agent」 selected and underlined, list content matches the tab, manual switching works, ‹ returns
  to the room with the chat intact).
- Decisive: `b_29_p0045_artwork_video.png`, `b_34_p0045_artwork_photo.png`, `b_21_p0045_artwork_noresult.png`, `b_75_sub_p0045_artwork_video.png`.

### PHA262026-0360 — Image to Video 「Feeling Good」: no sound with Sound ON
1. Launcher › Image to Video › Try now › Continue › Templates › See all › category 「Birthday」 › 「Feeling Good」
   (`b_44_0360_feeling_good.png`). Recommendation sheet › Continue › picked a front-facing woman (`b_47`).
2. Template ⚙ (`adjust_btn_image_view`): Duration (Seconds) 5, Video Quality Standard, 「Generate Background Sound」
   **Off** by default (`b_48_0360_settings.png`) → On (`b_49`), ✓; reopened: On kept (`b_51_0360_sound_on_saved.png`).
3. Generate (20) → My AI Artwork › Image to Video 「Processing…」 「2 minutes remaining…」 → done ~2.5 min (`b_54`).
4. Opened the card → Save & Share (`b_55_0360_result.png`: woman with a crown and a birthday cake) › Save → file
   `/sdcard/DCIM/PhotoDirector/Video/2026-11-25-10-38-17-301.mp4` (2,237,979 bytes), pulled to
   `recordings/b_0360_feeling_good_sound_on.mp4` (git-ignored).
5. `ffprobe`: stream 0 h264 4.96 s; **stream 1 aac, 48000 Hz, 2 channels, 4.99 s, 210 kb/s**. `ffmpeg volumedetect`:
   n_samples 479232, **mean_volume −14.9 dB, max_volume −0.0 dB**; per second −15.0 / −12.4 / −13.2 / −16.5 / −23.7 dB
   (a fade at the end). Clearly audible, not silence.
- RD note: Old issue → Sound is normal now.
- Side effects: none seen (places checked: settings sheet layout and On/Off pill legible, setting kept after ✓, cost
  stays 20 with Sound On, Save & Share page layout, the saved file plays length 5 s with audio). Note: Sound defaults
  to Off for this template; the bug's step sets it On.
- Decisive: `b_51_0360_sound_on_saved.png`, `b_55_0360_result.png`, ffprobe/volumedetect numbers above.

### PHA262026P0056 — addendum (image check from segment B)
Segment A compared the video cost (4 = 4). Image: [i] 「Image Generation • Each image generation costs 6 credits.」
(`b_30_p0056_info.png` Free, `b_71_sub_p0056_info.png` subscriber). An image request shows **no** cost dialog; it charges
at once: 6 on Free (1654 → 1648), 6 on subscriber (1608 → 1602), server history `creditUsage=-6, featureId=PhotoAgent,
unit=1, actionId=genimage_1_img_google_gemini3pro` both times. Video as subscriber: dialog 4/s, charged 20 for 5 s. So
[i] matches what is charged for image and video, on both tiers.
- Decisive: `b_30_p0056_info.png`, `b_33_p0045_image_done.png`, `b_71_sub_p0056_info.png`, `b_73_sub_p0045_video_dialog.png`.

## Other observations (not filed)
- AI Background: after generating, the button label changes 「Generate」 → 「Retry」 while the prompt is unchanged; with a
  new prompt or another style it reads 「Generate」 again. Lit in both cases; noted only.
- AI Edit Agent image requests charge without any confirm dialog, while video requests ask first (「Ready to Create Your
  Video?」). Probably by design; noted only.
- The Discard dialog in the Edit room did not close on the first 「Discard」 tap by label (Appium matched the title text
  「Discard changes?」); `right_button` worked. Automation detail, not an app issue.

## Needs the user's decision
- None for segment B. (P0029 HOLD from segment A still waits for the pm clear decision.)
- The Free account now has **0** of its 3 lifetime AI Edit Agent chats left; further Free AI Edit Agent tests need the
  subscriber switch or a fresh credit ID.

## End state
- PhotoDirector on the Launcher (Home tab), **Free** (「Set to subscriber」 Off, Mine 「Upgrade to Premium!」), **1602
  credits**, Test Server, phone theme dark (Night mode yes).
