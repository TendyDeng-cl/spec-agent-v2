=== PHA262026P0025  PHD-A 20.18.0 - [UX]AI_Background: There is no [Artwork] button in AI Background
Repro Steps:
1. Install and Launch APP
2. Open a photo
3. Enter AI Background
4. Check the [Artwork] button

Result:
There is no [Artwork] button in AI Background

Expect Result:
Should add the button

Note:
Device = Samsung S23 (16.0)
Files: ai background no artwork.jpg

=== PHA262026P0029  PHD-A 20.18.0 - [UX]Edit: AI haircolor hint bubble is truncated after auto-scrolling to Hair category
Repro Steps:
1. Install and Launch APP
2. Open photo
3. Switch to Portrait tab
4. Feature list is auot-scrolled to Hair
5. Check hint bubble 

Result:
AI haircolor hint bubble is truncated after auto-scrolling to Hair category
 
Expect Result:
Hint bubble should not truncate

Note:
Device = 16 (18
Files: U-2026-10-27.jpg

=== PHA262026P0045  PHD-A 20.18.0 - [UX]AI_edit_agent: UI always focus on photo tab of AI edit agent category even the latest generated result is video after tapping [artwork] button of AI edit agent
Repro Steps:
1. Install and Launch APP
2. Enter AI edit agent
3. Import photo
4. Generate video
5. After generation finished, tap [artwork]
6. Check highlighted tab of AI edit agent category

Result:
UI always focus on photo tab of AI edit agent category even the latest generated result is video after tapping [artwork] button of AI edit agent
 
Expect Result:
Focus on video if the latest generated result is video

Note:
Device = Samsung s23 (16
Files: U-2026-10-29.mp4

=== PHA262026P0056  PHD-A 20.18.0 - [CS003208922]AI_Edit_Agent: The cost credits are not the same in rules page and the pop-up dialog
Repro Steps:
1. Install and Launch APP
2. Enter AI Edit Agent
3. Tap the [i] button
4. Check the text of video generation
5. Try to generate a video
6. Check the pop-up dialog

Result:
The cost credits are not the same in rules page and the pop-up dialog

Expect Result:
Should sync the cost credits

Note:
Device = Samsung S23 (16.0)
Files: U-2026-11-10(1).png, U-2026-11-10.png

=== PHA262026P0142  PHD-A 20.19.0 - [AIAgent] Image_to_Video: Reuse opens Custom without the Image to Video explanation sheet shown elsewhere
Repro Steps:
1. Launch the APP
2. Tap AI Videos
3. Tap Image to Video
4. Check the explanation sheet shows
5. Tap the device Back button
6. Tap AI Photos
7. Tap My Artwork
8. Tap the All categories button
9. Tap Image to Video
10. Tap a finished Custom video made with Kling 2.6
11. Tap Reuse
12. Check the result

Result:
From AI Videos the 「Image To Video」 explanation sheet shows; from 「Reuse」 the Custom page opens directly with no sheet.
摘要：從 AI Videos 進入會出現說明頁，但從 Reuse 進入直接到 Custom 頁，沒有說明頁。
{20.19.0_ir02_ai_videos_entry_sheet.jpg} {20.19.0_ir02_reuse_no_sheet.jpg}

Expect Result:
When Image to Video would show its explanation sheet, Reuse shows it first as today, then the Custom page (PM D1-04b).
摘要：說明頁應照常先出現，關閉後才進入 Custom 頁。

Note:
Device: Google Pixel 8a / Android 16, Test Server, Free account (build 20.19.0.v202611181947)
Spec Link: Image to Video Reuse PM Figma (page 26'11/E support to reuse model settings in My artwork), Spec - UI board (From Save & Share Reuse, D1-04b explanation sheet first) -
https://www.figma.com/design/lSk4JUgbXG3DjauMLS9Et7/Image-to-Video?node-id=6366-5664
Files: 20.19.0_ir02_ai_videos_entry_sheet.jpg, 20.19.0_ir02_reuse_no_sheet.jpg

=== PHA262026P0145  PHD-A 20.19.0 - [AIAgent][UI] Image_to_Video: Reuse: Custom room flashes rotated (landscape) before settling portrait
Repro Steps:
1. Launch the APP
2. Tap AI Photos
3. Tap My Artwork
4. Tap the All categories button
5. Tap Image to Video
6. Tap a finished Custom video made with Kling 2.6 (10s, Pro, Sound on)
7. Tap Reuse
8. Watch the transition into the Custom page
9. Check the result

Result:
For one or two frames the Custom room is drawn rotated (landscape) before it shows portrait.
摘要：Reuse 轉場時房間短暫以橫向（旋轉）畫面出現。
{20.19.0_ir09_rotated_frames.jpg} {20.19.0_ir09_rotated_frames_again.jpg}

Expect Result:
The Custom room opens in portrait without a rotated frame.
摘要：應直接以直向開啟，不閃現旋轉畫面。

Note:
Device: Google Pixel 8a / Android 16, Test Server, Free account (build 20.19.0.v202611181947)
Spec Link: Image to Video Reuse PM Figma (page 26'11/E support to reuse model settings in My artwork), Spec - UI board (From Save & Share Reuse, D1-04 / D1-04b toast 「Settings applied」) -
https://www.figma.com/design/lSk4JUgbXG3DjauMLS9Et7/Image-to-Video?node-id=6366-5664
Files: 20.19.0_ir09_rotated_frames.jpg, 20.19.0_ir09_rotated_frames_again.jpg

