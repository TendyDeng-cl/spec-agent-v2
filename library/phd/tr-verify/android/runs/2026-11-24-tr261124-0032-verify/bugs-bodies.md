=== PHA262026P0070
Repro Steps:
1. Install and Launch APP
2. Enter My AI Artwork
3. Save a photo or video in Recent
4. Check the log

Result:
There is no mixpanel log when saving photo or video in Recent

Expect Result:
Should add a log

Note:
Device = Samsung S23 (16.0)


=== PHA262026P0072
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the first Year End 「2 photos · 1 pages」 card
5. Tap Use Template
6. Count the empty frames on the Canvas

Result:
The 「2 photos」 template opens with 3 empty frames (Daily 「4 photos」 opens with 5).
摘要：「2 photos」範本開出 3 個空框（Daily「4 photos」有 5 個）。
{20.19.0_swc03_two_photo_template_three_frames.jpg}

Expect Result:
The Canvas has as many empty 「+」 frames as the photo count on the card.
摘要：空的「+」框數應等於卡片標示的照片數。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: Year End 「7 photos · 3 pages」 opens with 7 frames (matches)
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-template-page board (D1-01: each card shows the template's default photo count)
Spec Link: Swipe Collage Design Figma, canvas_default board (empty frames with 「+」) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=69-6711
<Claude Reviewed>


=== PHA262026P0073
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the first Year End 「2 photos · 1 pages」 card
5. Tap Use Template
6. Tap the 「+」 of the stamp frame
7. Tap the 「+」 again
8. Tap 2 photos in the grid
9. Check the grid

Result:
The 2 photos show in the tray with 「(2/3)」, but the grid does not mark them.
摘要：托盤有 2 張且顯示 (2/3)，但格狀清單上沒有標記。
{20.19.0_swc06_grid_no_selection_marks.jpg}

Expect Result:
Selected photos are marked in the grid (the PM mock numbers them 1, 2).
摘要：已選照片在清單上要有標記（PM 草圖以 1、2 編號）。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-photo-picker board (F4 / D2-06: selection numbers 1, 2 in the grid)
Spec Link: Swipe Collage Design Figma, photo_picker board (selected photos) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=23-531
<Claude Reviewed>


=== PHA262026P0074
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Tap the 「+」 again
8. Tap 7 photos
9. Check the tray

Result:
Only 3 can be picked on a 7-frame canvas (page 1's frames), while a 23-frame page allows 23.
摘要：7 框範本只能選 3 張（只算本頁）；23 框的頁面可選 23 張。
{20.19.0_swc07_limit_three_on_seven_frame_canvas.jpg} {20.19.0_swc07_limit_23_no_cap.jpg}

Expect Result:
The limit is the number of empty frames, capped at 20: all 7 photos can be picked at once.
摘要：上限為空框數、最多 20 張：7 張可一次選完。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: Android's default limit of 6 is not applied (that part is right)
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-photo-picker board (D2-06: import limit capped at 20 on both platforms)
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas board (F4: the limit is the number of empty frames)
<Claude Reviewed>


=== PHA262026P0076
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap Background
7. Tap a colour swatch
8. Tap the round ✕ of the sheet
9. Tap 「‹」 at the top left
10. Tap Discard
11. Check the screen

Result:
Discard returns to the Template Page (Year End tab), not to the Template Preview.
摘要：按 Discard 回到範本頁，不是範本預覽。
{20.19.0_swc09_discard_lands_on_template_page.jpg}

Expect Result:
Discard returns to the Template Preview of that template.
摘要：Discard 應回到該範本的預覽頁。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), leave-notes board (D1-10: Discard returns to the Template Preview)
Spec Link: Swipe Collage Design Figma, canvas_default board (Canvas exit) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=69-6711
<Claude Reviewed>


=== PHA262026P0077
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap Background
7. Tap a colour swatch
8. Tap the round ✕ of the sheet
9. Tap 「‹」 at the top left
10. Press the system Back key
11. Check the dialog

Result:
The dialog stays open after Back (pressed twice); only Keep or Discard closes it.
摘要：按返回鍵對話框不關，只能按 Keep 或 Discard。
{20.19.0_swc11_dialog_stays_after_back.jpg}

Expect Result:
System Back closes the dialog as 「Keep」 does (team rule R-134; the spec draws no Back, Q-14).
摘要：返回鍵應等同 Keep 關閉對話框（團隊規則 R-134）。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), leave-notes board (D1-10: 「Discard changes?」 with Discard / Keep, as Edit Room)
<Claude Reviewed>


=== PHA262026P0079
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
<Claude Reviewed>


=== PHA262026P0080
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
12. Tap the same frame a third time
13. Check the selection

Result:
The 3rd tap clears the selection and the main tool bar returns.
摘要：第三次點會取消選取，回到主工具列。
{20.19.0_swc14_second_tap_image_focus.jpg} {20.19.0_swc14_third_tap_clears_selection.jpg}

Expect Result:
A tap in image focus returns to frame focus (「Frame selected」, frame tool bar).
摘要：圖片選取時再點應回到框選取。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas board (F6: a tap in image focus returns to frame focus)
Spec Link: Swipe Collage Design Figma, canvas_img_focus board (image focus) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=28-1621
<Claude Reviewed>


=== PHA262026P0082
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
10. Long-press a photo on page 1
11. Drag it onto another frame
12. Check the screen while dragging

Result:
Photos swap, but no 「Long press & drag to swap」 text appears while dragging.
摘要：可交換，但拖曳時沒有提示文字。
{20.19.0_swc16_drag_no_swap_hint.jpg}

Expect Result:
「Long press & drag to swap」 is shown while a photo is dragged.
摘要：拖曳時顯示「Long press & drag to swap」。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas board (F5: 「Long press & drag to swap」)
Spec Link: Swipe Collage Design Figma, canvas_default board (Canvas) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=69-6711
<Claude Reviewed>


=== PHA262026P0083
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap the round 「+」 in the tool bar
7. Tap Frame
8. Check the thumbnails

Result:
Frame sheet thumbnails show no photo count (no 「1 photo」 / 「3 photos」).
摘要：Frame 面板縮圖沒有標示照片數。
{20.19.0_swc17_add_layer_frame_no_counts.jpg} {20.19.0_swc17_replace_frame_sheet_no_counts.jpg}

Expect Result:
Each Frame panel thumbnail states its photo count (「1 photo」, 「3 photos」).
摘要：每個縮圖要標示照片數。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas / states-layers board (D1-19: each Frame thumbnail states its photo count)
<Claude Reviewed>


=== PHA262026P0094
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap an element on page 2
7. Tap Pages
8. Check the screen

Result:
No page is selected, and there is no 「Page 2 / 3」 text and no − | + stepper.
摘要：沒有選取目前頁，也沒有頁碼與 − | + 步進器。
{20.19.0_swc33_pages_no_counter_no_stepper.jpg}

Expect Result:
Pages opens on the current page with 「Page 2 / 3」 above a − | + stepper.
摘要：應停在目前頁並顯示「Page 2 / 3」與步進器。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage Design Figma, page board (「Page 5 / 5」 and the − | + stepper) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=74-3076
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-pages board (D1-41 / D1-28 / D1-29: selected page, page text, stepper)
<Claude Reviewed>


=== PHA262026P0095
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
<Claude Reviewed>


=== PHA262026P0097
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the Year End 「7 photos · 3 pages」 card
5. Tap Use Template
6. Tap Pages
7. Tap the ≡ pill under page 1
8. Check the pages
9. Long-press the ≡ pill under page 1
10. Drag it past page 3
11. Check the page while dragging

Result:
A plain tap on ≡ selects the page; dragged, the page keeps its size and opacity, with no hint.
摘要：單點 ≡ 會選頁；拖曳時不放大不透明，也無提示。
{20.19.0_swc36_tap_selects_page.jpg} {20.19.0_swc36_drag_not_enlarged_no_hint.jpg}

Expect Result:
A plain tap does nothing; dragged, the page is enlarged and translucent with 「Hold ≡ & drag to reorder」.
摘要：單點無反應；拖曳時放大半透明並顯示提示。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-pages board (D1-25: tap does nothing; drag enlarged and translucent, hint)
Spec Link: Swipe Collage Design Figma, page board (move button) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=74-3076
<Claude Reviewed>


=== PHA262026P0103
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the crowned Year End 「3 photos · 1 pages」 card
5. Check the screen

Result:
On Free, the crowned card opens the IAP page at once and the Template Preview never opens.
摘要：Free 點皇冠範本直接跳 IAP，進不了預覽。
{20.19.0_swc42_crowned_card.jpg} {20.19.0_swc42_iap_at_card_tap.jpg}

Expect Result:
The preview opens with a PRO icon and Use Template opens the Canvas; the IAP comes only at export.
摘要：應可預覽並進 Canvas，匯出時才跳 IAP。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: TC-149 and TC-152 (export IAP for PRO content) are blocked by this
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-template-preview board (D3-02 / D3-04: free user can use a PRO template; IAP at export)
Spec Link: Swipe Collage Design Figma, Template Page · default (NEW) board (PRO crown on the card) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=3-336
<Claude Reviewed>


=== PHA262026P0138
Repro Steps:
1. Launch the APP
2. Swipe the Launcher shortcut grid left to page 2
3. Tap Cinematic Reel Creator
4. Tap the single-color-fastcut card in the second section
5. Tap Use Template
6. Tap 6 photos in the grid, one after another
7. Tap Next
8. Tap Generate
9. Turn Wi-Fi off when the upload starts (about 2 s later)
10. Tap OK on the error dialog
11. Turn Wi-Fi on
12. Tap the room's history icon
13. Tap Retry on the ⚠ card
14. Wait 9 minutes
15. Tap Create More
16. Tap the credit pill in the room
17. Tap Detail
18. Check the result

Result:
The dialog says 「Credits refunded」 but 70 stays charged (315 → 245, no refund); after Retry the card stays Almost Done.
摘要：提示已退點但實際扣 70 點未退；Retry 後卡片一直停在 Almost Done。
{20.19.0_cr25_credits_refunded_dialog.jpg} {20.19.0_cr25_retry_card.jpg} {20.19.0_cr25_after_retry_9min.jpg} {20.19.0_cr25_detail_no_refund.jpg} {20.19.0_cr25_log.txt}

Expect Result:
「Resume to Upload」 finishes the job with one charge; a failed job refunds the 70 credits.
摘要：應可續傳完成且只扣一次；失敗時應確實退點。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16, Test Server
Spec Link: Reel Creator Design Figma (page 261109_AI_transition_feature, section Design), 05_Result_My_AI_Artwork frame -
https://www.figma.com/design/qdzVXIFZeYwcsa6fipmcLH/Cinematic-Reel-Creator--CineStory-?node-id=970-4457
<Claude Reviewed>


=== PHA262026P0141
Repro Steps:
1. Launch the APP
2. Tap AI Photos
3. Tap My Artwork
4. Tap the All categories button
5. Tap Image to Video
6. Tap a finished Custom video made with Kling 2.6 (10s, Pro, Sound on)
7. Tap Reuse
8. Watch the Custom page for 8 seconds
9. Check the result

Result:
The Custom page opens with the video's settings and prompt, but the toast 「Settings applied」 never shows.
摘要：Reuse 進入 Custom 頁設定已帶入，但沒有出現「Settings applied」toast。
{20.19.0_ir01_reuse_room_no_toast.jpg} {20.19.0_ir01_recording_frames_no_toast.jpg} {20.19.0_ir01_start_end_room_no_toast.jpg} {20.19.0_ir01_log.txt}

Expect Result:
On entering the Custom page the toast 「Settings applied」 shows (PM D1-04).
摘要：進入 Custom 頁時應顯示 toast「Settings applied」。

Note:
Device: Google Pixel 8a / Android 16, Test Server, Free account (build 20.19.0.v202611181947)
Spec Link: Image to Video Reuse PM Figma (page 26'11/E support to reuse model settings in My artwork), Spec - UI board (From Save & Share Reuse, D1-04 / D1-04b toast 「Settings applied」) -
https://www.figma.com/design/lSk4JUgbXG3DjauMLS9Et7/Image-to-Video?node-id=6366-5664
<Claude Reviewed>


=== PHA262026P0143
Repro Steps:
1. Launch the APP
2. Tap AI Photos
3. Tap My Artwork
4. Tap the All categories button
5. Tap Image to Video
6. Tap a finished Custom video made with Kling 2.6 (10s, Pro, Sound on)
7. Tap Reuse
8. Tap ‹ at the top left
9. Tap the same video
10. Tap Reuse
11. Tap the device Back button
12. Check the result

Result:
Both ‹ and system Back return to the My AI Artwork Image to Video list; the video's Save & Share page is skipped.
摘要：Reuse 房間按 ‹ 或返回鍵都回到 My AI Artwork 列表，未回到 Save & Share 頁。
{20.19.0_ir03_back_arrow_to_artwork.jpg} {20.19.0_ir03_system_back_to_artwork.jpg}

Expect Result:
‹ (and system Back) in the reused room return to the video's Save & Share page (PM D1-05).
摘要：應回到該影片的 Save & Share 頁。

Note:
Device: Google Pixel 8a / Android 16, Test Server, Free account (build 20.19.0.v202611181947)
Spec Link: Image to Video Reuse PM Figma (page 26'11/E support to reuse model settings in My artwork), Spec - UI board (From Save & Share Reuse, D1-05 ‹ Back returns to Save & Share) -
https://www.figma.com/design/lSk4JUgbXG3DjauMLS9Et7/Image-to-Video?node-id=6366-5664
<Claude Reviewed>


=== PHA262026P0144
Repro Steps:
1. Launch the APP
2. Tap AI Photos
3. Tap My Artwork
4. Tap the All categories button
5. Tap Image to Video
6. Tap a finished Custom video made with Kling 2.6 (10s, Pro, Sound on)
7. Tap Reuse
8. Pull the app's logcat
9. Find the Mixpanel event logged at the Reuse tap
10. Check the result

Result:
The Reuse tap logs 「logEvent name=Artwork_Reuse_Click」 with no parameters.
摘要：點 Reuse 送出的事件為 Artwork_Reuse_Click，且沒有 model 參數。
{20.19.0_ir07_reuse_room.jpg} {20.19.0_ir07_log.txt}

Expect Result:
ImageToVideo_Reuse_Click is sent with parameter model = the video's model value (PM D4-05).
摘要：應送出 ImageToVideo_Reuse_Click 並帶 model 參數。

Note:
Device: Google Pixel 8a / Android 16, Test Server, Free account (build 20.19.0.v202611181947)
Spec Link: Image to Video Reuse PM Figma (page 26'11/E support to reuse model settings in My artwork), 【Tracking Event】 board (D4-05 ImageToVideo_Reuse_Click, parameter model) -
https://www.figma.com/design/lSk4JUgbXG3DjauMLS9Et7/Image-to-Video?node-id=6394-586
<Claude Reviewed>


=== PHA262026P0152
Repro Steps:
1. Set the phone clock to 2026/12/30 10:00 local time (automatic date and time off)
2. Force-stop PhotoDirector
3. Launch the APP
4. Look at the IAP icon at the Launcher's top right
5. Check the result

Result:
During the NY Sale the Launcher IAP icon is the regular orange crown, not the champagne glasses.
摘要：新年特賣期間 Launcher IAP 圖示仍為一般橘色皇冠，不是香檳杯。
{20.19.0_xns05_ny_regular_crown.jpg} {20.19.0_xns05_ny_icon_crop.jpg} {20.19.0_xns05_xmas_icon_before.jpg} {20.19.0_xns05_after_midnight_crown.jpg} {20.19.0_xns05_design_ny_launcher.jpg} {20.19.0_xns05_log.txt}

Expect Result:
During the NY Sale a free user's IAP icon is the animated two champagne glasses (NY_ani).
摘要：新年特賣期間免費用戶的 IAP 圖示應為香檳杯動畫（NY_ani）。

Note:
Device: Samsung Galaxy A55 (SM-A5560) / Android 15, Test Server, Free account
Spec Link: Xmas & NY Sale Design Figma (IAP, page 261117_xmas_NY_sale), Launcher NY frame (NY_ani annotation) -
https://www.figma.com/design/2ogGJ14xElxFo4V8QjteOM/IAP?node-id=9740-344
Spec Link: Xmas & NY Sale PM Figma (PhD MX IAP Page, page 11E Christmas Sale, section spec), spec note board -
https://www.figma.com/design/taJPs6ntbB61LQG0wJ0PiZ/PhD-MX-IAP-Page?node-id=14724-43580
<Claude Reviewed>


=== PHA262026P0160
Repro Steps:
1. Launch the APP
2. Tap Swipe Collage on Home
3. Tap the Year-end Recap 「3 photos · 1 page」 card
4. Tap Use Template
5. Tap the 「+」 of any frame once
6. Check the result

Result:
The photo-strip sticker over the frames is selected and no photo picker opens; it opens only on a second tap.
摘要：點相框「+」第一下只會選到上層貼圖，要點第二下才開選圖器（10 張範本則選到整頁鎖定圖層）。
{20.19.0_swc01_canvas_frames.png}
{20.19.0_swc01_tap_plus_selects_sticker.png}
{20.19.0_swc01_second_tap_picker.png}
{20.19.0_swc01_10photo_tap_plus_selects_layer.png}

Expect Result:
One tap on a frame's 「+」 opens the photo picker.
摘要：點一下相框「+」即開啟選圖器。

Note:
Device: Google Pixel 8a / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), F4 / D2-06 (tapping a frame's 「+」 opens the photo picker)
<Claude Reviewed>


=== PHA262026P0162
Repro Steps:
1. Launch the APP
2. Tap Swipe Collage on Home
3. Tap any template and tap Use Template
4. Fill a frame with a photo
5. Tap the photo, tap Adjustments, drag Exposure to 4.0 and tap ✓
6. Tap Removal (tap Try First / Continue on the dialogs)
7. Check the result

Result:
The Object Removal room shows the original photo, not the brightened one on the Canvas.
摘要：Removal 房間顯示未套用曝光的原圖，與畫布上的照片不同。
{20.19.0_swc04_canvas_exposure4.png}
{20.19.0_swc04_removal_room_original.png}
{20.19.0_swc04_free_exposure4.png}
{20.19.0_swc04_free_removal_room_original.png}

Expect Result:
The Removal room shows the photo as it looks on the Canvas.
摘要：Removal 房間應顯示與畫布相同（已套用調整）的照片。

Note:
Device: Google Pixel 8a / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), removal-flow board (D1-43 / D1-11: Removal opens on the frame's photo; ✓ puts the result in place of that photo)
<Claude Reviewed>
