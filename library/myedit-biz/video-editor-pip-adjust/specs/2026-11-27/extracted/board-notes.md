# Board notes — myedit-biz/video-editor-pip-adjust, spec set 2026-11-27

Figma-only set, read 2026-11-27 (PM through figma-pm / qa1, Biz Design through figma-design / qa-dm). Board text in
`boards/<id>.md`, images in `figma/`. The KC spec text (the four `KC …md` spec files) is newer than these boards and
wins where they differ.

## pm-adjust-main-video (PM 7270:16640, 「26' 12/E Adjust - Main Video」, confirmed 2026-11-06)
- Two frames: default panel (0 / 100 / 50 / 50 / 0 / 0, Reset disabled) and adjusted (40 / 130 / 30 / 62 / 20 / -15, Reset enabled).
- Toolbar Split, Trim, Corner, BG Blur, Adjust, Fade In, Fade Out, Audio, Delete. Panel: Adjust + ✕, Color, Light, label + slider + box, Reset.
- Spec table: ranges, defaults, track styles (grey + blue fill from 0; rainbow; orange → white → blue; green → magenta).
- Rules 1–10: selected clip only, Split keeps; Reset 6 at once, one undo, disabled at defaults; number box applies on Enter / leaving, clamps, restores, ±1, disabled at limits; undo on release or confirm; pause on adjust; no badge, main track and Layer thumbnails; BG Blur background adjusted; panel stays on switching; Project thumbnail and export, saved in project; no Highlights / Shadows.
- KC newer: number box keeps live preview until the UX item ships; thumbnail table (Project / Layer / Timeline); missing file; Cutout on main photo; panel closes on non-adjustable items.
- Controls (Figma-read): toolbar Adjust; ✕; six sliders and boxes; Reset (enabled / disabled).

## pm-adjust-photo-pip (PM 7273:35737, 「26' 12/E Adjust - Photo PiP」, confirmed 2026-11-06)
- Toolbar Split, Corner, Cutout, Crop/Rotate, Mask, Adjust, Fade In, Fade Out, Order, Delete. Same panel as main video.
- Rules 1–8: PiP only, Split keeps, Copy/Paste copies; Reset / input / undo as main; pause; whole image under Cutout / Mask; no badge, PiP lane and Layer thumbnails; panel stays on switching; Project thumbnail and export; Photo PiP only (Video PiP later; Text, Sticker not supported).

## pm-photo-mask (PM 6556:11894, 「26' 11/E Photo Mask」)
- Six editor frames (Mask mode: left panel 「Mask」, 「Done」 / 「Discard」 top, Export & Share disabled, zoom bar). Notes: toolbar with Mask (Split, Corner, Cutout, Crop/Rotate, Mask, …); mode zooms main-video frame and PiP, hides timeline, toolbar, layer, Full screen; default None; Export & Share disabled; CMS or not open (KC: fixed list).
- 20261019 Update: playhead moves to the PiP start when outside (superseded by KC 2026-11-25: does not move); stays when inside; a PiP Fade In / Out is removed in the mode, main-video fades and transitions unchanged.
- Choose / apply as Photo Editor; Rotate as Photo Editor with 「Rotate」 tooltip; live angle; zoom in / out; Done applies; thumbnails on Layer and timeline after apply.
- Controls (Figma-read): Mask (toolbar); shape list; Rotate icon / handle; zoom in / out; Done; Discard.

## pm-photo-crop-rotate (PM 6564:25919, 「26' 11/E Photo Crop & Rotate(P2)」)
- Five editor frames: panel 「Crop & Rotate」, 「Aspect Ratio」 Original, Custom, 1:1 / 4:5, 5:4, 16:9 / 9:16, 21:9, 9:21, 「Rotate」 slider at 0, Done / Discard, zoom bar.
- Notes: toolbar Split, Corner, Cutout, Crop/Rotate, Mask, …; mode zooms, hides, Export disabled; default Custom (KC: the Original mark is a typo); 20261019: playhead to the PiP start when outside, stays when inside, PiP fade removed in the mode; ratio and apply sync Photo Editor; Rotate tooltip and live angle (sync Mask); zoom; Done confirms; thumbnails after apply.
- Controls (Figma-read): Crop/Rotate (toolbar); nine ratio chips; Rotate slider; Rotate icon / handle; zoom in / out; Done; Discard.

## ds-adjust-main-video (Biz Design 667:47666, page 「✅ Main Video Track: Adjust」)
- Editor 1920 × 912: toolbar Split, Trim, Corner, BG Blur, Adjust (selected), Fade In, Fade Out, Audio, Delete; left nav Videos highlighted; Adjust panel 0 / 100 / 50 / 50 / 0 / 0 with Reset at the bottom; top bar 「Export」.
- Track drawing: Saturation, Brightness, Contrast dark fill from the left end to the knob; Hue rainbow; Temperature yellow → blue; Tint magenta → green (Q-3).

## ds-adjust-photo-pip (Biz Design 671:28111, page 「✅ Photo as PiP (Adjust)」; title frame 671:28750)
- Toolbar Corner, Cutout, Split, Adjust (selected), Fade In, Fade Out, Order, Delete: no Crop/Rotate or Mask, Split third (Biz's current order plus Adjust; Q-1). Left nav Photos highlighted; same panel; Layer panel with two thumbnails; rotate handle on the PiP.
