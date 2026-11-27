# pm-adjust-main-video

Source: PM Figma https://www.figma.com/design/3GnLdOiX9G5NH27l1ltqVr/?node-id=7270-16640 · board `pm-adjust-main-video` · node 7270:16640 · page 6001:246885
Figma text layer (read 2026-11-27, figma-pm / qa1); no PDF export exists, so no OCR. Columns: y, x (canvas points from the board's top-left), text.

```
    60    100  Main Video: Adjust
    60    625  Ref: Photo PiP (Adjust)
   229   4299  Adjust Spec — Main Video
   250    514  ✕
   250   2544  ✕
   252    186  Adjust
   252   2216  Adjust
   271   1028  Split
   271   1080  Trim
   271   1126  Corner
   271   1177  BG Blur
   271   1229  Adjust
   271   1281  Fade In
   271   1332  Fade Out
   271   1395  Audio
   271   1446  Delete
   271   3058  Split
   271   3110  Trim
   271   3156  Corner
   271   3207  BG Blur
   271   3259  Adjust
   271   3311  Fade In
   271   3362  Fade Out
   271   3425  Audio
   271   3476  Delete
   296    186  Color
   296   2216  Color
   313   4299  分組
   313   4479  滑桿
   313   4799  範圍
   313   5039  初始值
   313   5219  滑桿樣式
   328    186  Saturation
   328   2216  Saturation
   358    474  0
   358   2504  40
   367   4299  Color
   367   4479  Saturation
   367   4799  -100 ~ 100
   367   5039  0
   367   5219  一般：灰色底條，藍色從中間（0）往目前數值填滿
   407    186  Hue
   407   2216  Hue
   421   4299  Color
   421   4479  Hue
   421   4799  0 ~ 200
   421   5039  100
   421   5219  彩虹色條（無填色）
   437    474  100
   437   2504  130
   475   4299  Color
   475   4479  Temperature
   475   4799  0 ~ 100
   475   5039  50
   475   5219  橘 → 白 → 藍 漸層條（無填色）
   486    186  Temperature
   486   2216  Temperature
   516    474  50
   516   2504  30
   529   4299  Color
   529   4479  Tint
   529   4799  0 ~ 100
   529   5039  50
   529   5219  綠 → 洋紅 漸層條（無填色）
   565    186  Tint
   565   2216  Tint
   583   4299  Light
   583   4479  Brightness
   583   4799  -100 ~ 100
   583   5039  0
   583   5219  一般：灰色底條，藍色從中間（0）往目前數值填滿
   595    474  50
   595   2504  62
   637   4299  Light
   637   4479  Contrast
   637   4799  -100 ~ 100
   637   5039  0
   637   5219  一般：灰色底條，藍色從中間（0）往目前數值填滿
   644    186  Light
   644   2216  Light
   676    186  Brightness
   676   2216  Brightness
   703   4299  UI
   706    474  0
   706   2504  20
   755    186  Contrast
   755   2216  Contrast
   766   4299  • 選取 main video（video / photo 皆適用）→ tool bar 於 BG Blur 右側新增 Adjust：Split, Trim, Corner, BG Blur, Adjust, Fade In, Fade Out, Audio, Delete。
   785    474  0
   785   2504  -15
   795   4299  • Panel 沿用 Photo Editor Adjust panel：標題 Adjust + ✕、分組標題 Color / Light、每列 = label + slider + 數值框，最下方 Reset。
   824   4299  • 開在 left panel（取代目前 tab 內容）；Adjust tool 呈 selected。
   877   4299  行為規則
   940   4299  1. 只套用到目前選取的 main video clip。Split 後兩段沿用相同設定
   969   4299  2. Reset：同 Photo Editor，一次還原 6 個滑桿，算一步 undo；全部為初始值時 disabled。
   998   4299  3. 數值輸入：同 Photo Editor——Enter 或離開欄位時套用；超出範圍改成最接近的上下限；空值或非數字恢復原值；上下箭頭 ±1，到上下限時 disabled。
  1027   4299  4. Undo / Redo：同 Photo Editor。拖曳時即時預覽，放開滑桿（或數值框確認）記一步 undo。
  1056   4299  5. 播放中：開始調整（拖曳 / 輸入 / Reset）時暫停播放，停在目前 playhead 預覽。
  1065    186  Reset
  1065   2216  Reset
  1085   4299  6. 不顯示 timeline badge；main track clip 縮圖與 Layer panel 縮圖要反映調色。
  1114   4299  7. BG Blur：開啟時模糊背景也套用同樣的 Adjust。
  1143   4299  8. 切換選取：panel 開著時點另一個 clip，panel 不關，改讀該 clip 的值（同 Photo Editor）。
  1150    100  1-1. 選取 main video（video / photo 皆適用）→ Tool bar 於 BG Blur 右側新增「Adjust」→ 點擊後 left panel 切換為 Adjust panel，Adjust 按鈕呈 selected 狀態。
  1150   2130  1-2. 拖曳 slider 或於數值框輸入（可用上下鍵 ±1），viewer 即時預覽；設定只套用在目前選取的 clip。
  1172   4299  9. Project 縮圖、Export 結果都套用；設定存在 project 中，重新開啟時保留。
  1179    100  預設值：Saturation 0 / Hue 100 / Temperature 50 / Tint 50 / Brightness 0 / Contrast 0（不支援 Highlights、Shadows）
  1179   2130  點 ✕ 或切換到其他 left nav tab 關閉 panel，設定保留。
  1201   4299  10. 引擎不支援 Highlights / Shadows，所以只有 6 個滑桿。
```
