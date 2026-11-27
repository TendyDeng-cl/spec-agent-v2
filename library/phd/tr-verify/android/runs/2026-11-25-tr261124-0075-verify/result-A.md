# TR261124-0075 verify — segment A (no-cost UI) — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. Every command targeted
  RFCW2198L7B (`.serial` in the run dir + `CASEBOOK_SERIAL`); the Pixel 8a was not touched.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31 (`build`).
- Server: Test Server (debug overlay 「NetworkManager Test Server」, `a_00_launcher.png`).
- Tier / credits: Mine 「Upgrade to Premium!」 = Free, My Credits 1692 at start (09:56, `a_01_mine_start.png`) and at end
  (10:17, `a_90_mine_end.png`). Nothing bought, no sign-in, no password typed, no credit charge confirmed.
- Phone theme: found Night mode **yes** (dark); switched to light for PHA262026-0407 only, restored to **yes** and
  confirmed (`cmd uimode night` → 「Night mode: yes」, `a_91_launcher_end_dark.png`).
- Time span: 09:55–10:17. Logs: `logs/segA-20261125-101731/`.
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, nothing sent to ECL.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026-0051 | FIXED | Settings › User Sign in › 「Yes」 opens a full Sign In page (Email, Password, Sign In, Sign Up, Forgot Password?, Continue with Google / Facebook). |
| PHA262026P0025 | FIXED | AI Background room has the My AI Artwork button (top right); it opens My AI Artwork on the 「AI Background」 tab; ‹ and system Back return to the room. |
| PHA262026P0029 | HOLD | No AI Hair Color hint bubble shows any more (one-time hint already consumed on this phone); Portrait tab does not auto-scroll (all 6 items fit). Needs a fresh hint state (pm clear / reinstall) — user decision. |
| PHA262026-0289 | FIXED | ID Photo › Beautify › Makeup › [X] 8 times (3 without change, 5 after picking a lipstick, 2 sampled at 0 s and 0.5 s): preview never black; Smooth / Teeth Whiten / Eye [X] fine; [V] applies the lipstick. |
| PHA242024-1271 | FIXED | No AI Sketch entry exists; its Female/Male style lists are in AI Art. Female 「Clean」 selected → Male 「Cine Anime」 selected → back on Female nothing is selected. |
| PHA262026P0056 | FIXED | [i] 「Each second of video generation costs 4 credits.」 = dialog 「This generation will use 4 credits per second.」 (cancelled). Image generation not run (see note). |
| PHA262026-0407 | FIXED | Light mode: Happy Horse 1.1 icon is a black horse on the light-grey card (contrast 15.4:1); dark mode: white horse (11.2:1). |

## Per bug

### PHA262026-0051 — Sign in page empty
1. Launcher gear › Settings (`a_02_0051_settings.png`): Personal › 「User Sign in」.
2. Dialog 「Do you want to sign in?」 / 「The credits on this device will merge with the credits in your CyberLink account.」 /
   No / Yes (`a_03_0051_signin_page.png`) → Yes.
3. Page shows ‹, title 「Sign In」, Email, Password, 「Sign In」 button, 「Don't have an account? Sign Up」,
   「Forgot Password?」, 「or」, 「Continue with Google」, 「Continue with Facebook」 (`a_04_0051_signin_page.png`). Nothing typed;
   Back returned to Settings.
4. IAP page (Mine › Upgrade Now) has no sign-in entry, only 「Restore Purchase」 (`a_05_0051_iap.png`).
- RD note: Old issue → Issue is gone in current build.
- Side effects: none seen (places checked: Sign In page layout and legibility in dark theme, the confirm dialog, Back to
  Settings).
- Decisive: `a_03_0051_signin_page.png`, `a_04_0051_signin_page.png`.

### PHA262026P0025 — no [Artwork] button in AI Background
1. Edit › photo › Background › AI Background (`a_09_p0025_ai_background_room.png`): top bar shows credit pill 「1692 ⊕」
   and `goArtworkBtn` (content-desc 「My AI Artwork」) at the right.
2. Tap it → 「My AI Artwork」, tabs …AI Anime Video, AI Art, **AI Background** (selected), AI Creative Studio, 「Nothing yet.」,
   「Start to Create」 (`a_10_p0025_artwork.png`).
3. ‹ → back in the AI Background room with categories Outdoor / Indoor / Solid (`a_11_p0025_back_room.png`); again with
   system Back (`a_12_p0025_sysback_room.png`).
- RD note: old issue → Confirmed by PM: add artwork button to AI Background.
- Side effects: none seen (places checked: icon aligned with the credit pill, not clipped; room state kept after
  return; Generate area unchanged). The app's debug overlay covers the top-left info/report icons on this debug build
  only.
- Decisive: `a_09_p0025_ai_background_room.png`, `a_10_p0025_artwork.png`, `a_11_p0025_back_room.png`.

### PHA262026P0029 — AI Hair Color hint bubble truncated after auto-scroll — HOLD
1. Edit › photo › Portrait tab (twice, `a_13_p0029_portrait_tab.png`, `a_14_p0029_portrait_again.png`): list AI Edit Agent,
   Beautify, Body Reshape, Makeup, Hair, AI Headshot — all six fit on the 1080 px screen, no auto-scroll, **no hint
   bubble** anywhere.
2. Hair opens AI Hairstyle / AI Hair Color / Hair Volume (`a_15_p0029_hair.png`), still no bubble.
3. Launcher 「Dye Your Style」 banner goes straight to the AI Hair Color intro sheet (`a_16_p0029_dye_banner.png`), not the
   Edit Portrait path.
4. No way to re-arm the hint without clearing data: Settings › About debug dialog only has switches (Test server, Set to
   subscriber, …, KP-105), no hint reset.
- Whether Hair now scrolls to the middle cannot be seen: with the hint consumed the list is not auto-scrolled, and all
  items fit on this screen width.
- What is needed: a fresh hint state (`pm clear` or reinstall of PhotoDirector on the S23, which wipes local state and
  the Test Server credit ID setup), or a narrower / larger-font phone if the auto-scroll happens without the hint. RD's
  own impact field: 「can not verify it in this app version」.
- RD note: it only scrolls the item to visible → scroll item in the middle.
- Decisive: `a_13_p0029_portrait_tab.png`, `a_15_p0029_hair.png`.

### PHA262026-0289 — ID Photo preview black after Makeup [X]
1. Launcher › ID Photo (camera and location permissions allowed) › gallery: the first photo (faces pixelated) gave
   「Please choose another photo. We cannot locate any faces…」 (`a_24_0289_after_next.png`); used 1_Fashion album portrait
   instead → Next → cutout [V] → 「ID Photo (35x45mm)」 (`a_28_0289_after_v.png`).
2. Beautify › Makeup (Lipstick / Eyebrows / Eyeshadow / Eyeliner) › [X], repeated:
   - cycles 1–3 without change (`a_31…a_33`), cycles 4–6 after picking 「Classic Red 04」 (`a_34a_0289_lipstick_applied.png`,
     `a_34…a_36`), cycles 7–8 with lipstick, screenshot taken at once and 0.5 s after [X] (`a_37*`, `a_38*`).
   - Every preview after [X] is the normal unmade photo (mean brightness 98.7 in all 12 shots; lipstick discarded).
3. Other Beautify tools' [X]: Smooth, Teeth Whiten (`a_40_0289_x_Smooth.png`, `a_40_0289_x_TeethWhiten.png`), Eye › [X]
   back to the ID Photo main page (`a_40_0289_x_Eye.png`) — no black preview.
4. [V]: Makeup Classic Red 04 [V] then Beautify [V] → ID photo shows the red lips (`a_42_0289_v_beautify_applied.png`);
   re-entering Makeup and [X] keeps the applied lipstick (`a_43_0289_x_after_applied.png`).
- RD note: ViewEngine reset after [X] races with the viewer redraw, nothing redraws after it → redraw the viewer in the
  resetViewEngine callback (Makeup).
- Side effects: none seen (places checked: preview after [X] with and without changes, at 0 s / 0.5 s / 2 s; Smooth,
  Teeth Whiten, Eye exits; [V] applies; applied makeup kept after a later [X]).
- Decisive: `a_34a_0289_lipstick_applied.png`, `a_37_0289_x_cycle7_immediate.png`, `a_36_0289_x_cycle6.png`,
  `a_42_0289_v_beautify_applied.png`.

### PHA242024-1271 — AI Sketch (Realistic): female style stays selected after picking a male style
1. AI Photos page lists AI Portrait Styles, AI Creative Studio, AI Group Shot, AI Try-On, AI Hair Color, AI Headshot,
   AI Hairstyle, AI Art, AI Glow Up, AI Background, Hair Volume, Style Transfer, AI Edits, AI Replace, AI Expand, AI Scene —
   no AI Sketch (`a_50_1271_ai_photos.png`, `a_51_1271_ai_photos_bottom.png`); the Launcher tool grid has none either.
2. AI Art (RD: 「this feature is in ai art」) › Try now: gender tabs **Female / Male / My Style**, categories All, Portrait,
   Valentine, Cartoon, Figurine, New Year, …, Artistic Art, Character, Fantasy 3D, Halloween, Christmas (no Sketch /
   Realistic category) (`a_53_1271_ai_art_room.png`).
3. Female › 「Clean」 selected (orange border, Generate shows 2) (`a_54_1271_tap_clean_nophoto.png`) → Male: nothing
   selected (`a_55_1271_male_tab.png`) → Male 「Cine Anime」 selected (`a_56_1271_male_cine_selected.png`) → Female: no style
   selected (`a_57_1271_back_to_female.png`) → Male again: Cine Anime still the one selected (`a_58_1271_male_again.png`).
   Border pixels confirm one selection at a time.
- RD note: not handle it → this feature is in AI Art.
- Side effects: none seen (places checked: same-name style 「Clean」 in Male not selected by the female pick; selection
  survives tab switches; Generate cost stays 2).
- Note: AI Sketch itself no longer exists; the gender-split style list it had is AI Art's, where the filed symptom is gone.
- Decisive: `a_54_1271_tap_clean_nophoto.png`, `a_56_1271_male_cine_selected.png`, `a_57_1271_back_to_female.png`.

### PHA262026P0056 — AI Edit Agent credit text vs dialog
1. AI Edit Agent › [i] → 「Credit usage rules」: 「Free Users: Get 3 lifetime free chats.」, 「Image Generation • Each image
   generation costs 6 credits.」, 「Video Generation • Each second of video generation costs 4 credits.」 (`a_61_p0056_info.png`).
2. Imported a portrait, sent 「Turn this photo into a 5-second video of her smiling and turning her head」 → dialog 「Ready
   to Create Your Video?」 / 「This generation will use 4 credits per second. Continue?」 / Generate / Cancel / Don't show again
   (`a_67_p0056_after_send.png`) → **Cancel**. Credits stayed 1692 (`a_68_p0056_after_cancel.png`).
3. Video: 4 = 4. Image generation was not started: it is not known whether it shows a confirm dialog or charges at once,
   and this segment may not spend credits. The 6-credit image figure could not be matched with the server list either
   (the logcat `creditSystemFeatureList` line is cut before the AIEditChat entries).
- RD note: info panel showed a hardcoded value → reads the image-gen credit from the server CreditInfo (AIEditChat
  featureID/actionID).
- Side effects: none seen (places checked: info sheet text legible, not clipped; dialog layout; Cancel leaves credits
  unchanged). The send used one of the Free account's chat turns.
- Decisive: `a_61_p0056_info.png`, `a_67_p0056_after_send.png`, `a_68_p0056_after_cancel.png`.

### PHA262026-0407 — Happy Horse icon not obvious in light mode
1. Dark (phone as found): Image to Video › Try now › Continue › Custom › Model 「Kling 3.0」 › list: Happy Horse 1.1 white
   horse on dark card (`a_74_0407_happyhorse_dark.png`, zoom `a_74_0407_happyhorse_dark_icon_zoom.png`, 11.2:1).
2. `cmd uimode night no`, relaunch (Launcher light, `a_75_0407_launcher_light.png`), same path: Happy Horse 1.1 **black**
   horse on light-grey card (`a_76_0407_happyhorse_light.png`, zoom `a_76_0407_happyhorse_light_icon_zoom.png`, 15.4:1).
3. Other icons in light mode all visible (Pixverse V6, Kling 4.0, Kling O3, Seedance 2.5 / 2.0, Gemini Omni Flash 1.2,
   Vidu Q4, Wan 3.0, Veo 3.1, Kling 3.0 / 2.6 / 2.5 Turbo / O1) (`a_77_0407_models_top_light.png`).
4. Theme restored: `cmd uimode night yes` → 「Night mode: yes」, app relaunched dark. Nothing generated.
- RD note: Missing handling → add 「thumbnail_for_light_modeUrl」 to show the light icon in light mode.
- Side effects: none seen (places checked: Happy Horse icon both themes, other model icons in light mode, selected
  Kling 3.0 row in light mode).
- Decisive: `a_76_0407_happyhorse_light.png`, `a_76_0407_happyhorse_light_icon_zoom.png`, `a_74_0407_happyhorse_dark.png`.

## Other observations (not filed)
- After discarding the ID Photo edit and returning Home, a dialog 「Do you want to continue editing? You have an unsaved
  image from a previous edit.」 Cancel / Continue appeared (`a_44_continue_editing_dialog.png`), left over from the Edit
  room session opened for P0025/P0029 and exited with Home; Cancel dismissed it. Probably by design (draft recovery);
  noted only.
- The Quick Actions tab in the Edit room shows its intro sheet 「Edit photos smartly with Quick Actions」 each time it is
  tapped here (seen once; Back closed it). Not investigated.

## Needs the user's decision
- PHA262026P0029: HOLD. To verify, the AI Hair Color hint must show again; on this phone that needs `pm clear` (or a
  reinstall) of PhotoDirector on the S23. Allowed?
- PHA262026P0056: only the video path was compared (4 = 4). If the image path must be checked too, one image generation
  in AI Edit Agent (6 credits, maybe without a confirm dialog) is needed — allowed in segment B?

## End state
- Phone theme dark (Night mode yes, as found); PhotoDirector on the Launcher (Home tab), Free, 1692 credits, Test Server.
