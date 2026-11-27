# Segment C — Swipe Collage RD change log (TR261123-0071, PHD-A 20.19.0.v202611232103 R8)

- Device: Google Pixel 8a (42201JEKB02229), Android 16; versionName 20.19.0, versionCode 90201902 (installed 2026-11-24 11:05, the TR build).
- Account: not signed in, Free throughout (Mine 「Upgrade to Premium!」 at the end, c_end_mine.png). The debug tier switch was not used.
- Time: 14:37 start, 15:08 logs pulled. Logs: `logs/C-20261124-150840/` — no FATAL EXCEPTION; `logcat -b crash` empty before and after.
- Template used for 1–5: Year-end Recap 「4 photos · 3 pages」 (4 frames, 3 pages).
- End state: the Launcher in English (app locale reset to `[]` = system en-US), Free, canvas left with ✕ › Discard (no draft).

| # | Item | Verdict |
| --- | --- | --- |
| 1 | Page count controls, long-press reorder, discard confirmation | Works |
| 2 | Viewport ~1.2 pages; rotation and position snapping | Works |
| 3 | Shadow for stickers and frames | Works |
| 4 | Element selection, placement, multi-page photo selection | Works |
| 5 | Adjust + Filter kept in Removal, not applied twice | Works (Free path; applying a Removal result needs Premium, not checked) |
| 6 | Template page in the TR languages | Works (10 languages, no crash) |

## 1. Page count, reorder, discard — Works
Steps: Canvas › Pages (c1_pages). Stepper + (c1_pages_add: 「Page 4 / 4」, new blank page selected), − (c1_pages_minus: 「Page 3 / 3」).
Hold the first page's move button (↔) 1.2 s and drag right (adb motionevent; recording `recordings/c1-reorder.mp4`):
the page lifts, tilts and goes translucent, the move button turns orange, the other pages make room (c1_reorder_mid);
on release page 1 is last (c1_reorder_after).
✕ after the reorder → 「Discard changes?」 / 「All your existing changes will be lost.」 / Keep / Discard (c1_pages_x).
Keep stays in Pages with the change (c1_keep); ✕ › Discard returns to the Canvas in the original order, undo greyed (c1_discarded3).
System Back after + → the same dialog (c1_back_after_add). ✕ with no change → straight back, no dialog (c1_x_nochange).
+ then ✓ → Canvas with 4 pages, undo enabled (c1_apply_4pages, c1_pages_after_apply).
Limits: at 10 pages the stepper + is disabled and the strip 「+」 is gone (c1_pages_10); at 1 page the stepper − is disabled (c1_pages_1).
Spec: matches R-106, R-110 – R-113, R-115, R-116, R-134 (P0095's missing dialog is now there).
Differences: on opening Pages no 「Page n / N」 line is shown above the stepper; it appears only after a stepper tap (R-104; c1_pages, c4_pages_overview).

## 2. Viewport and snapping — Works
- Viewport: one page is 828 px wide on a 1080 px screen, so the view holds 1.30 page widths: the current page with a
  ~42 px margin and about a quarter of the next page peeking in at the right (c_canvas0: page 1 + page 2's edge; c2_canvas: page 3 between pages 2 and 4).
- Position snapping (sticker dragged by its ✥ handle, `recordings/c2-move.mp4`, sheet `recordings/f/c2-move-sheet.png`):
  pink guide lines appear at the current page's vertical centre and horizontal centre (lines span that page only) and the
  sticker's centre locks onto them (c2_move_c2_mid1: both lines; c2_move_c2_mid2: only the horizontal one after moving right).
  No guides were seen for page edges or other elements.
- Rotation snapping (rotate handle moved in 1° steps around the sticker, captures in `screenshots/rot/`, sheet `recordings/f/c2-rot-sheet.png`;
  angle measured from the orange selection box): the box angle followed the finger 1:1 (10°, 30°, 40°, 42°, 44°, 45°, 46°, 48°…)
  and held exactly at 90° while the finger went from +87° to +93° (identical frames), then followed again (95°, 100°).
  So it snaps to right angles (0°/90°…) within about ±3°; no snap at 45°; no guide or angle readout is shown while snapped (rot/c2_rot_090).
  The spec states neither (PM evaluation item).

## 3. Shadow for stickers and frames — Works
- Sticker (cup) focus: tool bar Duplicate, Opacity, Shadow, Horizontal Flip, Vertical Flip, Forward, Backward (c2_sticker_sel).
  Shadow opens one slider 0–100 % (resource id `opacity_seekbar`, label 「0%」) above the tool bar (c3_sticker_shadow);
  at 99 % a soft dark drop shadow to the lower right (c3_sticker_shadow_compare). No direction, blur or colour controls.
- Frame focus: tool bar Replace, Duplicate, Opacity, Shadow, Horizontal Flip, Vertical Flip, Forward… (c3_frame_sel);
  same single slider; at 100 % a soft drop shadow to the lower right of the player frame (c3_frame_shadow_compare).
  The shadow stayed after the frame was filled (c4_filled).
- Spec: R-043 / R-047 (frame Shadow, sliders TBD-1 / Q-2) — now present (P0079 lacked it on TR261123-0041). Stickers' Shadow is not in the spec.

## 4. Selection, placement, multi-page photo selection — Works
- Selection: first tap on a frame = 「Frame Selected」 (frame bar), second tap = 「Image Selected」 / picker (c4_tap_plus1, c5_img_focus);
  tapping empty canvas deselects.
- Multi-page selection: tapping the 「+」 of the frame on page 3 opened the picker with 「Select 1 to 4 photos to continue. (0/4)」
  (4 empty frames on 3 pages, c4_picker); 4 picked (c4_picker_4) › Next: the tapped frame got the 1st photo, the other three
  frames got photos 2–4 left to right across pages 1–3 (c4_filled, c4_pages_overview).
- Placement: Add Layer › Sticker › a free star › ✓ placed it selected in the visible part of the current page, horizontally
  at the screen centre (c4_sticker_panel, c4_sticker_placed); Forward is greyed (already on top).

## 5. Adjust and Filter kept in Removal, not doubled — Works (Free path)
- Image focus › Adjustments › Color › Saturation −100 › ✓ (grey photo, c5_adjust_sat); Filter › HDR 05 (strength 70) › ✓ (c5_filter_hdr05, c5_canvas_adj_filter).
- Removal › 「Remove with faster selection tool」 Continue › 「Smart Wire Removal」 Try First: the Object Removal room shows
  the photo grey with HDR 05 once — same look as the Filter preview, not stronger (c5_removal_room).
- Manual brush stroke › Remove (free try, 「UNLOCK TO VIP」, c5_removal_removed) › ✕ › Discard: the Canvas photo is pixel-identical to before Removal (mean difference 0.0, c5_compare_before_after_removal.png).
- Removal again: room image identical to the first visit (mean difference 0.003), Remove › ✓ → IAP 「PhotoDirector Premium」 (c5_removal2_check), ✕ back to the room, ✕ › Discard: Canvas again pixel-identical (c5_canvas_after_removal2).
- Adjustments reopened: Saturation still −100, not −200 or reset (c5_adjust_reopen).
- No credits used (no consume lines in logcat). Not checked: a Premium user applying the Removal result (✓) and whether the result then gets Adjust/Filter a second time.

## 6. Template page in the TR languages — Works
For each of zh-TW, zh-CN, ja-JP, ko-KR, de-DE, es-ES, fr-FR, it-IT, ru-RU, pt-BR: `cmd locale set-app-locales … --locales <tag>`,
force-stop, launch, closed the 「New Content」 popup when shown, Launcher tool grid page 2 › Collage › Swipe Collage banner
› Template Page, six scrolls to the end of 「Year-end Recap」, tapped the 「8 … · 1 …」 card → localized Template preview.
No crash, the app process stayed alive in every language, crash buffer 0 lines (screenshots `c6_<lang>_template_page / _scrolled / _preview`,
sheets c6_zh_TW_sheet, c6_sheet_1, c6_sheet_2). East thumbnails in zh/ja/ko, West in de/es/fr/it/ru/pt.
Restored with `--locales ''` (back to `[]`, system en-US): English Launcher (c_end_launcher2).

| Lang | Banner | Template Page title | Card | Preview button |
| --- | --- | --- | --- | --- |
| zh-TW | 試試跨頁拼貼模板！ | 跨頁拼貼模板 | 8 張相片 · 1 頁 | 使用範本 |
| zh-CN | 试试跨页拼贴模板！ | 跨页拼贴模板 | 8 张照片 · 1 页 | 使用模板 |
| ja-JP | スワイプコラージュを試そう! | スワイプコラージュ | 画像 8 枚 · 1ページ | テンプレートを使用 |
| ko-KR | 스와이프 콜라주를 사용해 보세요! | 스와이프 콜라주 | 8개의 사진 · 1페이지 | 템플릿 사용 |
| de-DE | Wisch-Collage ausprobieren! | Wisch-Collage | 8 Fotos · 1 Seite | Vorlage verwenden |
| es-ES | ¡Prueba el Collage deslizable! | Collage deslizable | 8 fotos · 1 página | Usar plantilla |
| fr-FR | Essayez le collage défilant ! | Collage défilant | 8 photos · 1 page | Utiliser le modèle |
| it-IT | Prova il Collage Swipe! | Collage Multipli | 8 foto · 1 pagina | Usa Modello |
| ru-RU | Попробуйте свайп-коллаж! | Свайп-коллаж | 8 фото · 1 страница | Использовать шаблон |
| pt-BR | Experimente a Colagem Deslizante! | Colagem Deslizante | 8 fotos · 1 página | Usar modelo |

## Other observations (not filed)
1. Pages opens without the 「Page n / N」 line; it shows only after + / − (R-104 says it shows the selected page on opening).
2. After a page reorder, the cross-page player frame whose centre was on page 1 moved with it to the end and hangs past the
   strip's right edge (c1_reorder_after); at 1 page it is drawn translucent outside the page over the strip 「+」 (c1_pages_1). R-064 / Q-7.
3. After ✓ in Pages with a page added (new page 4 selected) the Canvas shows page 3, not the selected page 4 (c1_apply_4pages; R-115).
4. At 10 pages the strip's move / ••• buttons shrink to about 30 px, too small to tap reliably (c1_pages_10).
5. The canvas draws thin white lines at page boundaries over elements (e.g. through the player frame, c3_frame_shadow_compare).
6. Sticker focus: the 「Shadow」 item is shown in orange before it is tapped on the template cup sticker (c2_sticker_sel); on frames and the added star it is white.
7. A frame's selection box is much larger than the drawn frame (transparent margin of the asset, c3_frame_sel, c5_img_focus), and its floating menu covers the 「Goodbye 2026」 text.
8. Italian: banner 「Prova il Collage Swipe!」 but the Template Page is titled 「Collage Multipli」 (two names). Russian card text mixes forms: 「8 фото · 1 страница」 vs 「20 фото · Страниц: 6」.
9. Template Page category tabs stay English in every language (「Year-end Recap」, 「Minimalist Aesthetic」, 「Travel Memories」; CMS names).
10. The first launch after switching back to English showed the Launcher banner headline in Portuguese (「Divirta-se com o GPT Image 2.6」, c_end_launcher); the next launch was English.
11. Test tooling: the 「Discard」 button of 「Discard changes?」 ignores an accessibility click (lbl) and needs a real tap; not a user issue.
