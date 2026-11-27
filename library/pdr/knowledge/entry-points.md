# Entry points

## KP-107 The toolbar sheet places every editor tool
- kind: fact · platform: both · use: analysis, run · tags: entry-point, toolbar, editor
- source: user 2026-11-26 (chat): the product team's 「PDRM Toolbar re-org」 sheet (`product.json` › `entry_points`; sources/2026-11-26-toolbar-sheet)

The sheet lists the editor's toolbars: Global (nothing selected), Video, PIP Video, Photo, PIP Photo, Audio and Text.
Each column is a first-layer button and the items under it are what that button opens. Many tools sit in several
places: Video Enhance is under Video and PIP Video › Enhance, Cinematic Reel Creator under Global › AI Magic and
Photo / PIP Photo › Effects. The newest dated tab is the reference. `node scripts/entry-points.ts pdr fetch` saves it
and `node scripts/entry-points.ts pdr "<tool>"` lists one tool's places. The primary place gets the full table and every
other place a UI pass (spec-casebook `analysis.md` pass 12). Launcher, AI Magic tab, Mine and banner entries are not in the sheet.

The sheet marks platform-specific places and behaviours (user, 2026-11-27): 「(4/E IOS)」 and 「(iOS)」 are iOS only,
「Android沒有」 / 「Andorid 沒有」 are not on Android, 「only Android」 / 「android only」 are Android only, and
「(iOS 11/M; And 12/E)」 ships on both at different releases. A note 「(iOS) … (Android) …」 describes each platform
separately. An Android table never checks an iOS-only place (AI Remove, Quick Actions, Magnifier, Opacity on Video,
Face Smoother / Body Reshape / Face Reshape on Video, Mask on Text), and an iOS table never checks an Android-only one
(HSL, Skin Smoother). `node scripts/entry-points.ts pdr "<tool>" --platform ios|android` applies it.

## KP-110 The 2611251 editor toolbars differ from the toolbar sheet
- kind: fact · platform: android · use: analysis, run, ebug · tags: entry-point, toolbar, editor, cinematic-reel, video-edit-by-chat
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-007, I-011, O-10); Cinematic Reel Recommendation Android run 2026-11-26-e1-entries TC-092 / TC-096 (inbox I-005); Recent Task Model Info Android run 2026-11-26-r1-full O-14 · verified: 16.9.0 build 2611251 (2026-11-26)
- status: disputed: the sheet (KP-107) puts these tools under Effects / names 「AI Text to Image」; AIGC Watermark Q-22, drafted to PM as ISS-AWA-20

Cinematic Reel Creator is a first-layer button on the Photo and PIP Photo toolbars (after Split, before Duration);
their Effects menu is Auto Mosaic, Filter, Effects, Effect Overlay, Body Effects. Video Edit by Chat is a first-layer
button on the Video and PIP Video toolbars (between Split and Volume). Video Object Removal (「AI Remove」) is on no
toolbar, as the sheet says: its 「AI Remove (4/E IOS)」 is iOS only (user, 2026-11-27), so this is no difference. Photo / PIP Photo › Tools reads 「Text to Image」. Global › AI Magic lists Cinematic Reel Creator 8th.

## KP-111 Reaching the editor's second-level tools on Android
- kind: howto · platform: android · use: run · tags: entry-point, toolbar, editor, audio, style-transfer
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-011, I-018, I-020); Recent Task Model Info Android run 2026-11-26-r1-full O-14 (inbox I-029) · verified: 16.9.0 build 2611251 (2026-11-26)

Photo and PIP Photo reach 「Tools」 only after swiping the toolbar left past Enhance: Photo Tools = Replace, Cutout
(Pro), Text to Image; PIP adds Motion Tracking. Video Tools = Replace, Reverse, Freeze Frame, Auto Captions, Cutout
(PIP: + Motion Tracking). Photo › Portrait holds AI Style Transfer; PIP Photo › Portrait = Skin Smoother, Body
Effects, AI Style Transfer. Audio clip › Audio Tools opens a bar: Denoise, HQ Denoise, Speech Enhancer, AI Voice
Changer, Voice-Over.
