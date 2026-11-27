# TR261124-0032 verify — segment C (My AI Artwork, I2V Reuse) — PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-24 17:11:57 (`build`).
- Server: Test Server. Tier Free throughout (Mine 「Upgrade to Premium!」, `c_02_mine_start.png`, `c_90_mine_end.png`);
  「Set to subscriber」 not touched, no sign-in.
- Time: 18:01–18:30 (about 29 min on the phone, ~17 min of it waiting for the generation).
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, no eBug or ECL touched.

## Credits and purchases

| When | Balance | Evidence |
| --- | --- | --- |
| Start (18:02) | 0 | `c_02_mine_start.png` |
| Try 1: LIMITED OFFER 「100 +100」 NT$600 (`phd_200_credit_freeuser_sale`) | 0 — not bought | Google Play: 「Error / You already own this item.」 (`c_25_play_sheet.png`); app re-verified the old token, `totalRemain=0` |
| Purchase 1 (18:06): 100 Credits, NT$600.00 (`phd_100_credit_freeuser`) | 100 | sheet `c_28_play_sheet_100.png`; log `[purchase] success credits: phd_100_credit_freeuser`, `totalRemain=100` |
| Purchase 2 (18:06): 50 Credits, NT$340.00 (`phd_50_credit_freeuser`) | 150 | sheet `c_32_play_sheet_50.png`; log `success credits: phd_50_credit_freeuser`, `totalRemain=150` |
| After Generate (18:07, Kling 2.6 10s Pro, price 50) | 100 | room pill 100 (`c_55_custom_after_reuse.png`) |
| End (18:29) | 100 | `c_90_mine_end.png` |

- Both sheets were screenshotted before 1-tap buy and read: payment method 「Test card, always approves」 and 「This is a test
  order, you will not be charged.」 No password, no real card. After each buy Google Play offered 「Want to get 1000
  credits, too?」 (NT$2,010.00) → 「Not now」 tapped (`c_29_after_buy100.png`).
- Why 150: the video costs 50 and the later Reel Creator test 70 (= 120); the 100 pack alone did not cover it and the
  100+100 offer could not be bought, so 100 + 50 (smallest packs that cover). 100 credits are left for P0138.

## Fixture video made

Image to Video › Custom, Kling 2.6, Specify Video Start / End Off, 10 s, Pro, Generate Background Sound **Off**, photo:
smiling woman in a red top (gallery), prompt 「The person smiles and waves slowly at the camera」, price 50. Generate at
18:07:19 (`c_34_before_generate.png`; log `ImageToVideo_Result_Generate:{…"bgm":"off","model":"Model_Kling-2.6",…,"quality":"pro"}`),
「17 minutes remaining…」, finished by 18:25. Sound On could not be chosen: the On chip is greyed and its ⓘ says
「AI-generated sound isn't available for this model.」 (`c_20_sound_tap.png`, `c_22_bgm_info.png`, `c_34_before_generate.png`).
The bugs' repro names 「Sound on」 only to describe the video used; Reuse, the toast, the back path and the event do not
depend on it.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0070 | FIXED | Saving a photo (AI Hairstyle) and a video (Kling 2.6 I2V) in Recent each logs `Artwork_Result_Save {"tab":"Recent"}` plus the feature's save event. |
| PHA262026P0141 | FIXED | Reuse → Custom page shows the toast 「Settings applied」 for about 2 s; Kling 2.6, 10, Pro, Sound Off and the prompt came across. |
| PHA262026P0143 | FIXED | ‹ and system Back in the reused room both return to the video's Save & Share page. |
| PHA262026P0144 | FIXED | Reuse logs `ImageToVideo_Reuse_Click {"model":"Model_Kling-2.6"}`; `Artwork_Reuse_Click` no longer appears. |

## Per bug

### P0070 (Mixpanel event when saving in Recent)
1. Mine › My Artwork › Recent › Photo: AI Hairstyle (2026/11/24) and two Hair Volume packs (`c_03_artwork.png`). Opened
   AI Hairstyle (`c_43_photo_pack.png`) → download button (18:08:24): toast 「Saved to your photo gallery」
   (`c_44_photo_saved.png`). Logcat:
   - `18:08:24.709 [PHD-A][Mixpanel]: Artwork_Result_Save:{"subscription_plan":"free","tab":"Recent"}`
   - `18:08:24.711 [PHD-A][Mixpanel]: GenAI_Result_Save:{"subscription_plan":"free","style":"Style_30297_Female-Glam-Side-Wave_ChatGPT","feature":"ai_hairstyle","is_customize":"FALSE"}`
2. Recent › Video: empty at the start (`c_04_recent_video.png`) and while the job was processing (`c_45_…`); after it
   finished it lists the Kling 2.6 video (`c_63_recent_video_done.png`). Opened it (Save & Share, `c_64_…`) → Save
   (18:29:03): toast 「Video Saved」 (`c_65_video_saving.png`). Logcat:
   - `18:29:03.957 [PHD-A][Mixpanel]: Artwork_Result_Save:{"subscription_plan":"free","tab":"Recent"}`
   - `18:29:03.959 [PHD-A][Mixpanel]: ImageToVideo_Result_Save:{"subscription_plan":"free","duration":"10s","mode":"1_solo_photo","used_style":"custom","bgm":"off","model":"Model_Kling-2.6","input_mode":"single","prompt":"The person smiles and waves slowly at the camera","quality":"pro"}`
- Both saves log an event → FIXED.

### P0141 (toast 「Settings applied」 after Reuse)
1. My AI Artwork › Image to Video › the Kling 2.6 video → Save & Share: Kling 2.6, chips 10s / pro / Sound off, prompt
   (`c_52_saveshare.png`).
2. `record start`, Reuse (18:26:04), `texts` at once: the Image To Video intro page (「Try now」, 「Don't show again」)
   opens first (`c_53_reuse_room.png`, `recordings/p0141-reuse.mp4`). Try now → Steps page → Continue (each recorded,
   `p0141-trynow.mp4`, `p0141-continue.mp4`).
3. On reaching the Custom page `texts` lists 「Settings applied」 (`c_55_custom_after_reuse.png`: black toast above
   Generate). Frames at 2 fps (`recordings/p0141-continue-sheet.png`): the toast is in the first 4 Custom frames and
   fading in the 5th, about 2 s.
4. Settings: Model Kling 2.6, prompt 「The person smiles and waves slowly at the camera」 (48/2500), Duration 10, Quality
   Pro, Sound Off selected, price 50 (`c_56_reuse_settings.png`). The photo slot is empty (the image is not reused, as on
   the Pixel run).
- Toast shown on entering Custom and settings applied → FIXED.

### P0143 (‹ / Back from the reused room)
1. In the reused room (after step 3 above) tap ‹ top left → Save & Share of the same video (`c_57_p0143_chevron.png`).
2. Reuse → Try now → Continue → room (`c_58…`, `c_59_p0143_room2.png`) → system Back → Save & Share
   (`c_60_p0143_sysback.png`).
- Both return to Save & Share → FIXED.

### P0144 (Reuse event)
Logcat at the Reuse tap (18:26:04):
- `18:26:04.101 [PHD-A][Analytics]: ImageToVideo_Reuse_Click:{"model":"Model_Kling-2.6"}`
- `18:26:04.101 [PHD-A][Mixpanel]: ImageToVideo_Reuse_Click:{"subscription_plan":"free","model":"Model_Kling-2.6"}`
- `18:26:04.102 [PHD-A][UMA]: ImageToVideo_Reuse_Click:{"subscription_plan":"free","model":"Model_Kling-2.6"}`
- `18:26:04.102 [PHD-A][Analytics]: [setCurFrom] from = artwork_reuse`
- `Artwork_Reuse_Click`: 0 lines in the whole segment capture (3 Reuse taps). model matches the generation's
  `Model_Kling-2.6` → FIXED.

## Other observations

- Reuse now passes through the Image To Video intro page and the Steps page before the Custom room on this phone,
  because those intros were never dismissed with 「Don't show again」 (the first entry from AI Videos showed them too).
  On the Pixel run (R1, TC-015) the intro never showed on Reuse. System Back on that intro returns to Save & Share
  (`c_61_intro_back.png`). The toast shows on reaching Custom, after the intros.
- Kling 2.6 offers no AI sound on this build / Test Server: 「On」 greyed, ⓘ 「AI-generated sound isn't available for this
  model.」 A first tap on 「On」 showed a black banner 「To achieve the best results, this template's settings are limited.」
  (「template」 wording on a Custom page, `c_20_sound_tap.png`). The I2V Reuse fixtures (video A) assume Sound On.
- The S23's Google account still owns `phd_200_credit_freeuser_sale` (the 100 +100 LIMITED OFFER) unconsumed: Play says
  「You already own this item.」, the app re-verifies the token with `status:OK` but grants no credits (`totalRemain=0`).
  The offer card is still shown and selectable. Seen in segment B too.
- The settings chip still reads lower-case 「pro」 (TC-006 on the Pixel run).
- No FATAL / AndroidRuntime line in the capture.

## Logs

`logs/segC-20261124-182933/` (git-ignored): `logcat-live.txt` 4690 lines and the ring-buffer dump; 0 FATAL. Capture
stopped at the end. Recordings: `recordings/p0141-reuse.mp4`, `p0141-trynow.mp4`, `p0141-continue.mp4`,
`p0141-continue-sheet.png`, `p0141-reuse-sheet.png`.

## End state

App on the Launcher (Home), Free (「Upgrade to Premium!」), **100 credits**, Test Server (`c_91_end_launcher.png`). One
Kling 2.6 Custom I2V video now in My AI Artwork (10s, Pro, Sound off); one AI Hairstyle photo and that video saved to
the phone's gallery. No draft, no tier change; the Custom room left without Generate (no further credits used).
