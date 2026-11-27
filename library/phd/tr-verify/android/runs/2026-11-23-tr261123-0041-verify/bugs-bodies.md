=== PHA262026P0078 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Text and text bubble content cannot be typed or edited
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the round 「+」 in the tool bar
7. Tap Text
8. Tap the 「Add text」 box
9. Tap the 「Add text」 box again
10. Check for a text field and keyboard

Result:
No text field or keyboard ever appears, so a text's or bubble's content cannot be changed.
摘要：始終沒有輸入欄與鍵盤，文字與泡泡內容無法修改。
{20.19.0_swc12_text_panel_no_field.jpg} {20.19.0_swc12_add_text_no_keyboard.jpg} {20.19.0_swc12_bubble_pill_no_edit_icon.jpg}

Expect Result:
Text opens an editor with a text field and the keyboard, and added text or bubbles can be edited.
摘要：Text 應開啟輸入欄與鍵盤，文字與泡泡內容可編輯。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: system Back on the panel removes the new 「Add text」 box (no keyboard to close first, TC-164)
Spec Link: Swipe Collage Design Figma, 2_add_text board (text editor with field, ⓧ and keyboard) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=54-1487
Spec Link: Swipe Collage Design Figma, 5_Text_bubble board (floating edit / duplicate / delete) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=54-2359

RD: 

=== PHA262026P0079 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Frame tool bar has no Flip H, Flip V or Shadow, and the floating icons no Lock
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Tap the 「+」 again
8. Select 3 photos
9. Tap Next
10. Tap a filled frame on page 1
11. Swipe the tool bar to its end
12. Check the tool bar and the floating icons

Result:
The frame tool bar has no Shadow, Flip H or Flip V, and the floating icons have no Lock.
摘要：框工具列沒有 Shadow、Flip H、Flip V，浮動鈕沒有鎖。
{20.19.0_swc13_frame_focus_pill_no_lock.jpg} {20.19.0_swc13_frame_bar_end_no_flip_shadow.jpg}

Expect Result:
Frame focus offers Opacity, Shadow, Flip H, Flip V, Duplicate, Lock, Delete and a floating Lock.
摘要：框工具列應有 Shadow 與 Flip H / V，浮動鈕含 Lock。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage Design Figma, canvas_frame_focus board (frame tool bar and floating icons) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=33-2230
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas board (F7 / F9: frame tool bar and floating Delete / Duplicate / Lock)

RD: 

=== PHA262026P0081 — PHD-A 20.19.0 - [AIAgent][UI] Swipe_Collage: Image tool bar labels are not the spec's Flip H / Flip V / Adjust / Enhance
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Tap the 「+」 again
8. Select 3 photos
9. Tap Next
10. Tap a filled frame on page 1
11. Tap the same frame again
12. Swipe the tool bar to its end
13. Check the labels

Result:
Labels read 「Horizontal Flip」 「Vertical Flip」 「Adjustments」 「AI Enhance」.
摘要：標籤與規格不同（如 Horizontal Flip、AI Enhance）。
{20.19.0_swc15_image_bar_labels.jpg}

Expect Result:
The bar reads 「Flip H」 「Flip V」 「Adjust」 「Enhance」 (with the other items).
摘要：應為 Flip H、Flip V、Adjust、Enhance。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage Design Figma, canvas_img_focus board (image tool bar labels) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=28-1621
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas board (F8: image tool bar items)

RD: 

=== PHA262026P0086 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Credit button reads 「--」 and opens nothing
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Tap the 「+」 again
8. Select 3 photos
9. Tap Next
10. Tap a filled frame on page 1
11. Tap the same frame again
12. Tap AI Enhance
13. Tap Advanced
14. Tap Enhance
15. Check the credit button at the top
16. Tap the credit button

Result:
The credit button reads 「--」 before and after a 6-credit Enhance, and tapping it opens nothing.
摘要：點數鈕一直是「--」，點了沒反應。
{20.19.0_swc21_credit_button_dashes.jpg} {20.19.0_swc21_log.txt}

Expect Result:
The credit button shows the balance with 「+」 and opens Buy Credit.
摘要：點數鈕顯示餘額，點了開購買點數頁。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage Design Figma, Enhance_2 board (credit balance button 「100」 with 「+」) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=67-6424

RD: 

=== PHA262026P0088 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Background eyedropper pin cannot be moved, so no photo colour can be picked
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Tap the 「+」 again
8. Select 3 photos
9. Tap Next
10. Tap Background
11. Tap 「Custom color +」
12. Tap the eyedropper
13. Drag the eyedropper pin onto a photo
14. Check the picked colour

Result:
The eyedropper pin cannot be moved, so the picker takes a near-black colour, not the photo's.
摘要：滴管定位針無法移動，取不到照片顏色。
{20.19.0_swc25_eyedropper_pin_fixed.jpg} {20.19.0_swc25_picked_near_black.jpg}

Expect Result:
The eyedropper picks a colour from the canvas.
摘要：滴管可從畫布取色。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-background board (D1-23: the eyedropper picks a colour from the canvas)
Spec Link: Swipe Collage Design Figma, background_panel_solid board (Custom color picker with eyedropper) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=72-1786

RD: 

=== PHA262026P0090 — PHD-A 20.19.0 - [AIAgent][UI] Swipe_Collage: Sticker panel lacks the store, Favorites, AI Sticker, More tile and ✕ / ✓
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the round 「+」 in the tool bar
7. Tap Sticker
8. Check the panel

Result:
The panel has no store button, 「Favorites」 / 「AI Sticker」 tabs, 「More」 tile or ✕ / ✓.
摘要：貼圖面板缺商店、Favorites、AI Sticker、More 與 ✕ / ✓。
{20.19.0_swc29_sticker_panel_missing_items.jpg}

Expect Result:
Sticker opens the Edit Room Sticker panel with its store, Favorites, AI Sticker, More and ✕ / ✓.
摘要：應開啟編輯室的貼圖面板。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage Design Figma, 3_Add_Sticker board (Edit Room Sticker panel) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=54-1835
Spec Link: Swipe Collage PhDM Spec.pdf (PM), add-layer-flow board (D1-14 / D1-42: Sticker opens the Edit Room panel)

RD: 

=== PHA262026P0091 — PHD-A 20.19.0 - [AIAgent][UI] Swipe_Collage: Text Bubble panel has no 「∅」 none item first and no ✕ / ✓ bar
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the round 「+」 in the tool bar
7. Tap Text Bubble
8. Check the first item

Result:
The panel has no 「∅」 (none) item first and no ✕ / ✓ bar.
摘要：沒有「∅」（無）選項與 ✕ / ✓。
{20.19.0_swc30_bubble_panel_no_none_item.jpg}

Expect Result:
The Edit Room Text Bubble panel opens: 「∅」 first, bubble styles, ✕ / ✓.
摘要：應有「∅」在第一格與 ✕ / ✓。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage Design Figma, 5_Text_bubble board (「∅」 first, ✕ / ✓) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=54-2359
Spec Link: Swipe Collage PhDM Spec.pdf (PM), add-layer-flow board (D1-14 / D1-42: Text Bubble opens the Edit Room panel)

RD: 

=== PHA262026P0093 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Ratio change resizes the canvas from its centre and squashes the frames
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Tap the 「+」 again
8. Select 3 photos
9. Tap Next
10. Tap Ratio
11. Tap 16:9
12. Check the canvas

Result:
The canvas resizes from its centre and the frames are squashed (page 1's frame becomes a strip).
摘要：畫布從中心縮放，框被壓扁。
{20.19.0_swc32_ratio_9x16_original.jpg} {20.19.0_swc32_ratio_16x9_squashed.jpg}

Expect Result:
Elements stay where they are; the canvas grows downward or shrinks upward.
摘要：元素位置不變，畫布向下延伸或向上縮短。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-ratio board (F12: elements stay put, canvas grows downward / shrinks upward)

RD: 

=== PHA262026P0095 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Pages has no ✓ or ✕; leaving keeps every page change without 「Discard changes?」
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap Pages
7. Tap Add
8. Tap 「‹」 at the bottom left
9. Check the pages on the Canvas

Result:
No ✓ or ✕: ‹ and Back keep every page change at once, with no 「Discard changes?」.
摘要：沒有 ✓ / ✕，離開即保留變更、不詢問。
{20.19.0_swc34_pages_page_added.jpg} {20.19.0_swc34_canvas_keeps_change_no_dialog.jpg}

Expect Result:
✓ applies the changes; ✕ drops them, asking 「Discard changes?」 first when there are changes.
摘要：✓ 套用；✕ 放棄並先問 Discard changes?。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: TC-132 / TC-133 (Keep / Discard in Pages) are blocked by this
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-pages board (D1-24 / D1-26: ✓ applies, ✕ discards with 「Discard changes?」)
Spec Link: Swipe Collage Design Figma, page board (✕ / ✓) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=74-3076

RD: 

=== PHA262026P0096 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Pages keeps ↶ and ↷ on screen and they undo page changes there
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap Pages
7. Tap page 3
8. Tap Delete
9. Tap ↶
10. Check the pages

Result:
↶ / ↷ stay on screen in Pages, and ↶ brings a deleted page back.
摘要：Pages 仍有 ↶ / ↷ 且可還原刪除的頁。
{20.19.0_swc35_pages_undo_redo_shown.jpg}

Expect Result:
Pages has no undo / redo.
摘要：Pages 不應有 undo / redo。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-pages board (D1-40: Pages has no undo / redo)

RD: 

=== PHA262026P0107 — PHD-A 20.19.0 - AI_Edit_Agent: The [Suggestion] button is still triggered after tapping the blank space to the right of the [Suggestion] button
Repro Steps:
1. Install and Launch APP
2. Enter AI Edit Agent
3. Tap the blank space to the right of the [Suggestion] button
4. Check the input area

Result:
The [Suggestion] button is still triggered after tapping the blank space to the right of the [Suggestion] button

Expect Result:
Should only trigger when tapping the button

Note:
Device = Samsung S23 (16.0)

RD: 

=== PHA262026P0118 — PHD-A 20.19.0 - [AIAgent] AI_Hair_Color: First Custom result shows no one-time My AI Artwork 100% dialog
Repro Steps:
1. Launch the APP
2. Tap AI Photos on the Launcher
3. Tap AI Hair Color
4. Tap Continue on the photo tips sheet
5. Tap Stock
6. Search 「woman portrait」 in Pexels
7. Tap the portrait of a woman in a knitted hat
8. Tap Custom in the swatch row
9. Tap Ombre in Style
10. Tap the dark brown swatch in Base Color
11. Tap the purple swatch in Highlight Color
12. Tap Generate in the panel
13. Wait for the first result
14. Check the result

Result:
The result shows with no one-time dialog.
摘要：第一次結果出現時沒有一次性說明對話框。
{20.19.0_hcc12_first_result_no_dialog.jpg}

Expect Result:
A one-time dialog says My AI Artwork keeps only the 100% version, with Don't show again.
摘要：應出現一次性對話框說明 My AI Artwork 只保存 100% 版本。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: AI Hair Color PM Figma (26 10E AI Hair Color v2, cited by the Custom page), Spec - UI rules D1-15 / D1-16 / D1-19 (Artwork save, Intensity) - https://www.figma.com/design/vhIp15PMJcwOcWJ6E9Q4JE/AI-Hair?node-id=3030-302
Spec Link: AI Hair Color Custom PM Figma (26 11E AI Hair Color Custom), result_custom (NEW) frame, Spec - UI - https://www.figma.com/design/vhIp15PMJcwOcWJ6E9Q4JE/AI-Hair?node-id=3330-718

RD: 

=== PHA262026P0120 — PHD-A 20.19.0 - [AIAgent] Batch_Editing: 「All」 stays enabled on a photo with no change of its own after switching photos
Repro Steps:
1. Launch the APP
2. Tap Edit on the Launcher
3. Tap Batch
4. Select 12 photos
5. Tap Next
6. Tap Adjustments
7. Drag the Exposure slider to 0.43
8. Tap photo 2's thumbnail
9. Check 「All」 at the top right

Result:
On photo 2 (Exposure 0, no change of its own) 「All」 stays enabled; it follows photo 1's unapplied change.
摘要：切到沒有任何修改的第 2 張時，All 仍為可按，跟著第 1 張未套用的修改走。
{20.19.0_bea12_adjust_photo2_no_change_all_enabled.jpg} {20.19.0_bea12_crop_photo2_no_change_all_enabled.jpg}

Expect Result:
On switching photos 「All」 is set by that photo's own unapplied changes: disabled on photo 2.
摘要：切換照片時 All 依該張自己的未套用修改決定：第 2 張沒有修改，All 應為停用。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: the same in the Crop & Rotate room (Square on photo 1, then photo 2)
Spec Link: Batch Editing PM Figma, pm-ui-3 board (Batch Edit Room · Crop & Rotate / Adjustment, 【NEW】 Apply to all normal / disabled states, DR-04: 切換照片依該張) -
https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id=16-13767

RD: 

=== PHA262026P0125 — PHD-A 20.19.0 - [AIAgent] Batch_Editing: App crashes when Crop & Rotate shows a 2730 x 1535 or 1706 x 2559 photo
Repro Steps:
1. Launch the APP
2. Tap Edit on the Launcher
3. Tap Batch
4. Select a 2730 x 1535 photo and an 800 x 800 photo (the 2730 x 1535 one first)
5. Tap Next
6. Tap Crop & Rotate

Result:
PhotoDirector closes at once and the system shows 「Clear cache for PhotoDirector?」.
摘要：點 Crop & Rotate 後 App 立即閃退（IllegalArgumentException）。
{20.19.0_bea20_crop_room_crash_clear_cache_dialog.jpg} {20.19.0_bea20_batch_room_before_crop_tap.jpg} {20.19.0_bea20_crop_room_crash_log.txt}

Expect Result:
The Crop & Rotate room opens on the photo and shows its size label; no crash.
摘要：Crop & Rotate 正常開啟並顯示照片與尺寸，不閃退。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: also when the room opens on a 1706 x 2559 photo, and when the room is open on the 800 x 800 photo and the 2730 x 1535 photo's thumbnail is tapped
Related: the same photos opened without a crash on the TR261111-0042 build (v202611111946)
Spec Link: Batch Editing PM Figma, pm-ui-3 board (Batch Edit Room · Crop & Rotate · default, size label and pencil) -
https://www.figma.com/design/iWlQTjlmfykHfmlNvg9J4p/Batch-Editing?node-id=16-14279

RD: 

=== PHA262026P0126 — PHD-A 20.19.0 - [AIAgent] image-to-video: Recent Custom result opens Save & Share without Prompts & Settings
Repro Steps:
1. Launch PhotoDirector from a cold start in the signed-in English session.
2. Open [Image to Video] from the launcher.
3. Tap [Try now] on the introduction.
4. Tap [Continue] on the next introduction.
5. Open [My AI Artwork].
6. Select [Image to Video] to view the existing videos.
7. Return to [Custom].
8. Tap the source-photo slot.
9. Select the [RDQE-TC-PHDA-I2V-ARTWORK-ENTRY-022] album.
10. Import the attached landscape photo labelled "VALID-LANDSCAPE 1600x1200 JPG".
11. Enter "A calm camera pan across a colorful geometric landscape." in the prompt field.
12. Dismiss the keyboard.
13. Confirm Kling 3.0, 5 seconds, Standard quality and background sound Off.
14. Tap [Generate] once at the displayed cost of 30 credits.
15. Wait for the newly completed five-second video in [My AI Artwork] > [Image to Video].
16. Open the artwork category selector.
17. Close the category selector.
18. Swipe the artwork tabs to reveal [Recent].
19. Select [Recent].
20. Select [Video].
21. Open the new five-second video matching the landscape preview and entered prompt.
22. Scroll down through the [Save & Share] details.

Result:
Save & Share shows "Prompts" with the entered prompt and Reuse. The "Prompts & Settings" heading and model, duration, quality and sound summary are missing. The lower view shows sharing choices, an ad and recommendations without a settings summary.

Expect Result:
Save & Share should show "Prompts & Settings" for this newly generated Custom result, including its model, duration, quality and sound summary alongside the prompt.

Note:
Device = SM-A576B / Android 17
Test build = 20.19.0.v202611132003 (same as source TR)
Language = English (en-US)
Observed scope = One newly generated Kling 3.0 Custom video opened once from Recent > Video.

RD: 

=== PHA262026P0127 — PHD-A 20.19.0 - [AIAgent] AI_Hair_Color: Custom palette: colour picked with Done is not added to the row as a new circle
Repro Steps:
1. Launch the APP
2. Tap AI Photos on the Launcher
3. Tap AI Hair Color
4. Tap Continue on the photo tips sheet
5. Tap a portrait photo with one clear, front-facing face
6. Tap Custom in the swatch row
7. Tap Ombre in Style
8. Tap the colour wheel in Base Color
9. Drag the hue slider to blue
10. Drag the cursor to the square's top right
11. Tap Done
12. Check the result

Result:
The colour wheel gets the selection ring; no new circle with the blue appears and the recommended colours do not move.
摘要：調色盤選色後沒有新增色圈，選中的是色輪本身，看不到所選顏色。
{20.19.0_hcc22_palette_blue.jpg} {20.19.0_hcc22_no_new_circle.jpg}

Expect Result:
The blue is added as a new ringed circle right after the colour wheel; the other colours move one place right.
摘要：所選顏色應新增為色輪右側的色圈並被選中。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16 / PhotoDirector 20.19.0 (versionCode 90201901)
Spec Link: AI Hair Color Design Figma (Hair, 261005_AI_hair_color page), 4-hair_color_case3 frame (palette colour added) -
https://www.figma.com/design/2VOqiPxBCISkob7wbM9hXD/Hair?node-id=894-2637

RD: 

=== PHA262026P0130 — PHD-A 20.19.0 - Reel_Creator: The APP crashes after tapping the [Import] button
Repro Steps:
1. Install and Launch APP
2. Enter Reel Creator
3. Generate a video
4. Go back to feature
5. Select a template
6. Select a photo
7. Tap the [Import] button
8. Check the APP

Result:
The APP crashes after tapping the [Import] button

Expect Result:
No crashes occur

Note:
Device = Samsung S23 (16.0)

RD: 

=== PHA262026P0132 — PHD-A 20.19.0 - [AIAgent] Reel_Creator: Photo picker: imported count out of range shows no red tray text
Repro Steps:
1. Launch the APP
2. Swipe the Launcher shortcut grid left to page 2
3. Tap Cinematic Reel Creator
4. Tap the Selfie Shake card in the third section
5. Tap Use Template
6. Tap 4 photos in the grid, one after another
7. Tap Next
8. Tap ‹ on the confirm page
9. Tap ‹ on the Preview
10. Tap the cinematic-grade card in the second section
11. Tap Use Template
12. Tap Import on the prompt
13. Check the result

Result:
4 photos are imported and Next is disabled, but the tray still reads 「Select 15 to 40 photos to continue.」 in white.
摘要：匯入張數低於下限時，tray 沒有紅字提示。
{20.19.0_cr11_import_below_min.jpg}

Expect Result:
The tray shows red 「Select at least 15 photos (11 more)」 (above max: red text), Next disabled until in range.
摘要：應顯示紅字「Select at least 15 photos (11 more)」。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16, Test Server
Spec Link: Reel Creator PM Figma (26 11E Reel Creator, section spec = Creative Reel.pdf), 5. Imported count out of range → red text frame -
https://www.figma.com/design/m0AHKf3UhHVYlf8kcXPoU0/CineStory?node-id=7336-859

RD: 

=== PHA262026P0133 — PHD-A 20.19.0 - [AIAgent] Reel_Creator: Photo picker Import: imported photos unticked; tapping one adds it twice
Repro Steps:
1. Launch the APP
2. Swipe the Launcher shortcut grid left to page 2
3. Tap Cinematic Reel Creator
4. Tap the single-color-fastcut card in the second section
5. Tap Use Template
6. Tap the album name at the top
7. Tap a test album
8. Tap 6 photos in the grid, one after another
9. Tap Next
10. Tap ‹ on the confirm page
11. Tap ‹ on the Preview
12. Press Home
13. Delete the first 2 picked photos in Gallery
14. Open PhotoDirector from Recents
15. Tap the single-color-fastcut card
16. Tap Use Template
17. Tap Import on the prompt
18. Tap the unticked imported photo in the grid
19. Check the result

Result:
4 photos are imported but only 3 are ticked in the grid; tapping the unticked one adds it again (5 in the tray).
摘要：匯入後有照片在格子上未勾選，點擊會重複加入同一張。
{20.19.0_cr12_import_unticked.jpg} {20.19.0_cr12_duplicate_added.jpg}

Expect Result:
Every imported photo is ticked in the grid with its number; tapping it unpicks it.
摘要：匯入的照片都應打勾編號，點擊應取消選取。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16, Test Server
Spec Link: Reel Creator PM Figma (26 11E Reel Creator, section spec = Creative Reel.pdf), 4. Photo picker – Import prompt frame (session memory) -
https://www.figma.com/design/m0AHKf3UhHVYlf8kcXPoU0/CineStory?node-id=7336-785
Spec Link: Reel Creator Design Figma (page 261109_AI_transition_feature, section Design), 03-1_Photo_Picker_Reuse_Last_Photos frame -
https://www.figma.com/design/qdzVXIFZeYwcsa6fipmcLH/Cinematic-Reel-Creator--CineStory-?node-id=957-5859

RD: 

=== PHA262026P0134 — PHD-A 20.19.0 - [AIAgent][UI] Reel_Creator: Confirm page: no 「9:16」 ratio and no reorder hint
Repro Steps:
1. Launch the APP
2. Swipe the Launcher shortcut grid left to page 2
3. Tap Cinematic Reel Creator
4. Tap the single-color-fastcut card in the second section
5. Tap Use Template
6. Tap 7 photos in the grid, one after another
7. Tap Next
8. Read the confirm page
9. Check the result

Result:
The confirm page shows no 「9:16」 ratio and no reorder hint.
摘要：確認頁沒有 9:16 比例，也沒有排序提示文字。
{20.19.0_cr15_creative_confirm.jpg}

Expect Result:
The header shows 「9:16」 and the reorder hint 「Long-press to reorder · tap × to remove」 is shown.
摘要：應顯示 9:16 與排序提示文字。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16, Test Server
Spec Link: Reel Creator Design Figma (page 261109_AI_transition_feature, section Design), 04_Generate_Settings frame -
https://www.figma.com/design/qdzVXIFZeYwcsa6fipmcLH/Cinematic-Reel-Creator--CineStory-?node-id=961-6760
Spec Link: Reel Creator PM Figma (26 11E Reel Creator, section spec = Creative Reel.pdf), 6. Confirm page frame (Generate | 60) -
https://www.figma.com/design/m0AHKf3UhHVYlf8kcXPoU0/CineStory?node-id=7336-931

RD: 

=== PHA262026P0135 — PHD-A 20.19.0 - [AIAgent][UI] Reel_Creator: Confirm page: count below min (14/40) is not red
Repro Steps:
1. Launch the APP
2. Swipe the Launcher shortcut grid left to page 2
3. Tap Cinematic Reel Creator
4. Tap the cinematic-grade card in the second section
5. Tap Use Template
6. Tap 15 photos in the grid, one after another
7. Tap Next
8. Tap × on photo 1
9. Check the result

Result:
「Your photos (14/40)」 stays white, not red; Generate is disabled.
摘要：低於下限時張數未變紅。
{20.19.0_cr17_count_not_red.jpg}

Expect Result:
「14/40」 turns red and Generate is disabled.
摘要：張數應顯示紅色。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16, Test Server
Spec Link: Reel Creator PM Figma (26 11E Reel Creator, section spec = Creative Reel.pdf), 7. Confirm page below min frame -
https://www.figma.com/design/m0AHKf3UhHVYlf8kcXPoU0/CineStory?node-id=7336-989

RD: 

=== PHA262026P0147 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: App crashes on every open after it was closed with a canvas being edited
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Swipe Collage!」 banner
4. Tap the Year-end Recap 「4 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Select 1 photo
8. Tap Next
9. Tap the filled frame
10. Tap the same frame again
11. Tap Removal on the tool bar
12. Tap Try First
13. Tap ✕ in the Object Removal room
14. Force stop PhotoDirector
15. Launch the APP
16. Tap Collage on the Launcher
17. Tap the 「Try Swipe Collage!」 banner
18. Check the result

Result:
The app crashes at once (ClassCastException in SwipeCollageDraftUseCase), on every later try.
摘要：重開 App 後每次進入 Swipe Collage 都會閃退。
{20.19.0_swc49_crash_on_open.jpg} {20.19.0_swc49_crash_dialog.jpg} {20.19.0_swc49_crash_log.txt}

Expect Result:
No crash: 「Continue editing?」 appears and restores the project, or Swipe Collage opens normally.
摘要：不應閃退，應出現「Continue editing?」還原專案或正常進入。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), leave-notes board (D1-10: 「Continue editing?」 after a kill restores the project)
Related: PHA262026P0106

RD: 
