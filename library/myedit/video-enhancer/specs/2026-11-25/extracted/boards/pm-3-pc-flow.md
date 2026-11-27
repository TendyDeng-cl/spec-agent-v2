# 3 - PC User flow

Source: PM Figma https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=19-482 · board `pm-3-pc-flow` · section 19:482
Figma text layer (read 2026-11-25, figma-pm / qa1); no PDF export exists, so no OCR. Columns: y, x (line order, not canvas points), text.

```
    40      0  ① Entrance – SEO Page — • 點 Choose a file / 拖放 / 點範例 → 進入 Tool Room。
    80      0  ② Tool Room – Uploading — Processing... / It may take a few seconds. Please don't leave this page. / 30%
   120      0  上傳完成前，左側設定全部 disabled 不可操作，Enhance 按鈕也 disabled。
   160      0  ③ Tool Room – Default Settings — panel 「Video Enhancer Settings」: Mode (Standard | Professional), Enhance Style (HD |
   200      0  Natural), Output Resolution (Original | 720P | 1080P | 4K), Frame Rate (Same as source); Enhance (21);
   240      0  「Enhance 7.3 seconds (3 credits/sec)」; Replace Video, Trim Video above the preview; Recent Gen 「Start by uploading
   280      0  a video to generate your video」
   320      0  有四個項目(Mode/Enhance Style/Output Resolution/Frame Rate)可供user設定，各個項目提供的 option 直接參照此畫面。
   360      0  預設值：Standard + HD + 1080p + Same as source。
   400      0  原片為 1080p 或 1440p 時，1080P 會被 disable，預設值改為 4K。
   440      0  Copy for Mode Tooltip, Enhance Style tooltip (link)
   480      0  只有 Mode / Output Resolution / Frame Rate 會影響 Enhance 按鈕顯示的價格。
   520      0  Enhance 按鈕下方顯示 ”Enhance {duration:.2f} seconds ({credits} credits/sec)”
   560      0  Hover ⓘ 顯示計價說明: ”Total credits depend on video duration and selected mode, resolution, and frame rate.”
   600      0  ④ Tool Room – Output Resolution Dropdown — Output Resolution選項：Original (call API時，需要偵測 uploaded video 的
   640      0  resolution，並作為參數送出) / 720P / 1080P / 4K；低於原始解析度的選項需要 disable。詳見: 5 - Disabled options ↗
   680      0  ⑤ Tool Room – Frame Rate Dropdown — Frame Rate 選項：Same as source（Default）/ 50 / 60 / 100 / 120 fps。
   720      0  (dropdown: Same as source ✓, 50 fps, 60 fps, 100 fps, 120 fps)
   760      0  ⑥ Tool Room – Generating — User 按下 Enhance 後就可會開始生成（沿用既有的 Recent Gen 的 flow)
   800      0  Recent Gen 下方顯示「The generated videos can be found in My Library」 (My Library is a link)
   840      0  ⑦ Tool Room – Result Ready — 同一支影片完成後 Enhance 維持 disabled（沿用舊房間行為）；改 Video Enhancer Settings 或
   880      0  Replace Video 後，Enhance 按紐才會亮起。成品同步存到 My Library。Preview, Replace, Trim 行為都 sync 原本 Video Enhancer 的行為。
   920      0  Tool Tip Value (34:5422):
   960      0  Mode — Standard: Balanced enhancement. Works well for most videos.
  1000      0  Professional: Stronger restoration for older or badly compressed footage. Takes much longer to process. Supports videos up to 2:30. (10/28更新)
  1040      0  Enhance Style — HD: A crisper, more detailed picture. Best when footage looks soft or blurry.
  1080      0  Natural: A gentler result that stays true to the original. Best when footage already looks good.
  1120      0  Output Resolution — Resolution adjustment is supported up to 4K. Options lower than or equal to the original resolution are unavailable.
  1160      0  Frame Rate — Frame rate adjustment is supported up to 120 fps.
```
