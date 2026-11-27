# 9 - Error Handling – Upload Limitation — every dialog's button is 「Got it」

Source: PM Figma https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=235-1137 · board `pm-9-errors` · section 235:1137
Figma text layer (read 2026-11-25, figma-pm / qa1); no PDF export exists, so no OCR. Columns: y, x (line order, not canvas points), text.

```
    40      0  Case 1 — 檔案格式不支援: 上傳的檔案不是 MP4 / MOV（例如 AVI、MKV、WebM）→ 「Unsupported File Format」 / 「Only MP4 and MOV formats are supported. Please choose another video.」
    80      0  Case 2 — 檔案大小超過 10 GB: 單一檔案 > 10 GB → 「File Size Too Large」 / 「This video exceeds the 10 GB file size limit. Please choose a smaller video.」
   120      0  Case 3 — 解析度超過上限: 影片解析度超過 1440p → 「Video Resolution Not Supported」 / 「This video exceeds the supported resolution limit (1440p). Please choose another video.」
   160      0  (10/28更新) Case 4 — 影片長度超過 8 分鐘: 影片長度 > 8:00（剛好 8:00 可以上傳）→ 「Video Too Long」 / 「This video exceeds the 8-minute length limit. Please choose a shorter video.」
   200      0  (10/29更新) Case 5 — 短邊小於 128 px: 影片短邊 < 128 px（例如 192×96）→ 「Video Resolution Not Supported」 / 「This video is below the minimum supported resolution (shorter side of 128 px). Please choose another video.」
   240      0  (10/29更新) Case 6 — 影片幀率超過 120 fps: 影片幀率 > 120 fps（直接比實際值，不四捨五入）→ 「Video Frame Rate Not Supported」 / 「This video exceeds the supported frame rate limit (120 fps). Please choose another video.」
   280      0  (10/30更新) Case 7 — 讀不到影片幀率: 讀不到影片幀率（無法判斷可選幀率與應收點數，不接受匯入）→ 「Unable to Use This Video」 / 「This video cannot be enhanced because it is missing required information, such as the frame rate. Try uploading a different video.」
```
