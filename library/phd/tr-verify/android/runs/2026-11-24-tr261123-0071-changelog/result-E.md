# Segment E — Image to Video Reuse, RD change log items 7–10 (TR261123-0071, PHD-A 20.19.0.v202611232103 R8)

- Device: Google Pixel 8a (42201JEKB02229), Android 16; versionName 20.19.0, versionCode 90201902 (the TR build).
- Account: not signed in, Free (Mine 「Upgrade to Premium!」). **Credits 68 before, 38 after**: one Kling 3.0 generation,
  30 credits, approved by the user (credit history: `creditUsage=-30, featureId=ImageToVideo, actionId=genvideo_1_sec_kling_custom_3.0std_none_single_720p`).
- Time: 16:19 `restart` + `logcat start`; generation 16:20:17 – ~16:30 (app estimate 「10 minutes remaining」); Reuse checks
  16:30–16:33; logs pulled 16:33 → `logs/E-20261124-163354/` (no FATAL EXCEPTION, no crash).
- Fixture: Home › Image to Video › Custom, Kling 3.0, 5 s, Standard, Generate Background Sound Off, Start/End Off, the app's own
  sample photo (Sample Photos, woman on yellow), prompt 「A person smiles and waves」; cost shown 「Generate 30」 before the tap
  (e1_settings). Nothing was pushed to the phone (the sample photo is built in), so nothing to remove.
- End state: the Launcher (Home), Free, 38 credits, locale en-US untouched (no `--lang` used).

| # | Item | Verdict |
| --- | --- | --- |
| 7 | 「Settings applied」 toast after Reuse | Works (both entries) |
| 8 | Reuse shows the standard intro; leaving returns to Save & Share | Works (both entries; ‹ and system Back) |
| 9 | No landscape flash on entering via Reuse | Works (no landscape/rotated frame in 919 recorded frames) |
| 10 | ImageToVideo_Reuse_Click with model | Works (5 taps → 5 events with `model`) |

Entries: My AI Artwork › **Image to Video** category tile → Save & Share › Prompts & Settings › 「Reuse」, and My AI Artwork ›
**Recent › Video** tile → Save & Share › 「Reuse」. Both open the same Save & Share page (Save, Prompts & Settings card:
Kling 3.0 · 5s · std · Sound off · 「A person smiles and waves」 · Reuse; e2_saveshare, e2_recent_saveshare). There is no
other Reuse button (the result page right after generation goes to My AI Artwork, not to Save & Share).

## 7. 「Settings applied」 toast — Works
Reuse → intro sheet → 「Try now」 → Steps → 「Continue」 → the Custom page, and the toast 「Settings applied」 shows over the
lower part of the page as soon as the Custom page is drawn, fading out within about 1.5 s (R-025, R-026: after the intro).
Seen on both entries: `e7_toast_category.png`, `e7_toast_recent.png`; sequences `recordings/f/e7-cont-shots.png`,
`recordings/f/e7-recent-shots.png` (shots 2–3 show the toast, 4 fading, 5 gone).
Restored on the Custom page (e7_cat_room, e7_recent_room, e7_cat_room_settings): model Kling 3.0; Duration 5 selected;
Video Quality Standard selected; Generate Background Sound Off selected; Start/End Off; prompt 「A person smiles and waves」
25/2500 (R-022). Photo **not** restored: 「Add your image」 empty (R-023); no inspiration selected (R-024).
Limit: every setting of this video equals the room's default (Kling 3.0, 5, Standard, Off), so only the prompt proves that
settings were actually restored; restoring a non-default model/duration/quality/sound (R1 video A/B) was not covered by this
one generation.

## 8. Standard intro on Reuse; leaving returns to Save & Share — Works
- Reuse shows the same 「Image To Video」 intro sheet as the normal entries (dimmed demo frame + spinner ~1 s, then the demo
  plays; 「Try now」 / 「Don’t show again」) (`e7_cat_after`, `recordings/f/e7-cat-shots.png`, `e8_cat_reuse2_intro`,
  `e8_recent_intro`), then 「Steps」 with 「Continue」 (`e8_cat_steps`, `e8_recent_steps`), then the Custom page. R1 ISS-IR-02
  (intro skipped) is fixed.
- Leaving the reused room (R-033, R-058; R1 ISS-IR-03 went to My AI Artwork):
  - Image to Video category entry: ‹ → Save & Share (`e8_cat_back`); system Back → Save & Share (`e8_cat_sysback`).
  - Recent › Video entry: ‹ → Save & Share (`e8_recent_back`); system Back → Save & Share (`e8_recent_sysback`).
  - System Back on the intro sheet itself (before 「Try now」) also returns to Save & Share (`e8_cat_intro_back`).
  - The room has no ✕; only ‹ and system Back were available.

## 9. No brief landscape flash on the Reuse entry — Works
Screen recordings of the Reuse tap: `recordings/e9-reuse-category.mp4` (373 frames, 14.7 s), `recordings/e9-reuse-recent.mp4`
(286 frames, 11.4 s), and of 「Continue」 into the Custom page `recordings/e7-reuse-category-continue.mp4` (260 frames, 4.8 s),
all 1080 × 2400. Every frame stepped through on contact sheets: `recordings/f/e9-category-sheet.png`,
`recordings/f/e9-recent-sheet.png`, `recordings/f/e7-continue-sheet.png`, close-up of the transition frames 5–34 in
`recordings/f/e9-category-zoom-5-34.png`. Save & Share cross-fades into the dimmed intro with a spinner, then the intro
demo, all portrait; the Steps → Custom change is a direct portrait cut. **No landscape or rotated frame on either Reuse entry**
(R1 O-2 / ISS-IR-09 saw 1–2 rotated frames).

## 10. ImageToVideo_Reuse_Click analytics — Works
Five Reuse taps (16:30:45, 16:31:49, 16:32:08, 16:32:59, 16:33:37), five events, each logged to Analytics, Mixpanel and UMA, e.g.:

```
2026-11-24 16:30:45.463 20902 20902 I [PHD-A][Mixpanel]: ImageToVideo_Reuse_Click:{"subscription_plan":"free","model":"Model_Kling-3.0"}
2026-11-24 16:30:45.463 20902 20902 I [PHD-A][Analytics]: ImageToVideo_Reuse_Click:{"model":"Model_Kling-3.0"}
```

No `Artwork_Reuse_Click` line any more (R1 TC-037 saw only that, without parameters). R-051 met. The value format is
`Model_Kling-3.0` (same naming as `ImageToVideo_Result_Generate`'s `model`), the spec gives no value format.

## Other observations
- Generation event for the fixture: `ImageToVideo_Result_Generate:{"subscription_plan":"free","duration":"5s","mode":"1_solo_photo","used_style":"custom","bgm":"off","model":"Model_Kling-3.0","from":"Launcher_Shortcut","input_mode":"single","prompt":"A person smiles and waves","quality":"std","free_quantity":"false"}`.
- Generation took ~10 min; after 「Generate」 the app opened My AI Artwork › Image to Video with the 「Processing…」 tile
  (「⁦10⁩ minutes remaining…」, then 「Almost Done」 99.0) (e1_after_generate, e1_wait2, e1_done). Tile: Kling 3.0, the
  prompt, 「Expires on 2027/11/24」.
- The reused intro still waits on a dimmed frame with a spinner before the demo plays (as in segment D, ~1 s here).
- The Custom room's prompt placeholder is still 「Describe the subject and how they move in the scene, e.g. …」 / 「0/2500」 (known, R-041).
- Credit pill in the room updated to 38 right after the generation.
