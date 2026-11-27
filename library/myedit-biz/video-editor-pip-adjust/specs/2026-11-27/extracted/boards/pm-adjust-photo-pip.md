# pm-adjust-photo-pip

Source: PM Figma https://www.figma.com/design/3GnLdOiX9G5NH27l1ltqVr/?node-id=7273-35737 · board `pm-adjust-photo-pip` · node 7273:35737 · page 6001:246887
Figma text layer (read 2026-11-27, figma-pm / qa1); no PDF export exists, so no OCR. Columns: y, x (canvas points from the board's top-left), text.

```
    60    100  PiP (Photo): Adjust
    60    605  Ref: Main Video (Adjust)
   229   2179  Adjust Spec — Photo PiP
   243    593  ✕
   245    203  Adjust
   266    930  Split
   266    981  Corner
   266   1037  Cutout
   266   1081  Crop/Rotate
   266   1152  Mask
   266   1205  Adjust
   266   1376  Order
   266   1416  Delete
   267   1260  Fade In
   267   1312  Fade Out
   297    203  Color
   313   2179  分組
   313   2359  滑桿
   313   2679  範圍
   313   2919  初始值
   313   3099  滑桿樣式
   335    203  Saturation
   367   2179  Color
   367   2359  Saturation
   367   2679  -100 ~ 100
   367   2919  0
   367   3099  一般：灰色底條，藍色從中間（0）往目前數值填滿
   371    546  0
   421   2179  Color
   421   2359  Hue
   421   2679  0 ~ 200
   421   2919  100
   421   3099  彩虹色條（無填色）
   429    203  Hue
   465    546  100
   475   2179  Color
   475   2359  Temperature
   475   2679  0 ~ 100
   475   2919  50
   475   3099  橘 → 白 → 藍 漸層條（無填色）
   523    203  Temperature
   529   2179  Color
   529   2359  Tint
   529   2679  0 ~ 100
   529   2919  50
   529   3099  綠 → 洋紅 漸層條（無填色）
   559    546  50
   583   2179  Light
   583   2359  Brightness
   583   2679  -100 ~ 100
   583   2919  0
   583   3099  一般：灰色底條，藍色從中間（0）往目前數值填滿
   617    203  Tint
   637   2179  Light
   637   2359  Contrast
   637   2679  -100 ~ 100
   637   2919  0
   637   3099  一般：灰色底條，藍色從中間（0）往目前數值填滿
   653    546  50
   703   2179  UI
   711    203  Light
   749    203  Brightness
   766   2179  • 選取 Photo PiP → tool bar 於 Mask 右側新增 Adjust：Split, Corner, Cutout, Crop/Rotate, Mask, Adjust, Fade In, Fade Out, Order, Delete。
   785    546  0
   795   2179  • Panel 與 Main video 相同（沿用 Photo Editor Adjust panel，6 個滑桿 + Reset），開在 left panel。
   843    203  Contrast
   848   2179  行為規則（已確認 2026/11/06）
   879    546  0
   911   2179  1. 只套用到目前選取的 Photo PiP。Split 後兩段沿用相同設定；Copy/Paste 會複製設定。
   940   2179  2. Reset、數值輸入、Undo / Redo：同 Photo Editor（規則同 Main Video spec）。
   969   2179  3. 播放中：開始調整時暫停播放，停在目前 playhead 預覽。
   998   2179  4. Cutout / Mask：技術上整張圖都會調整，使用者只看得到 cutout / mask 後可見的部分。
  1027   2179  5. 不顯示 timeline badge；PiP lane clip 縮圖與 Layer panel 縮圖要反映調色。
  1056   2179  6. 切換選取：panel 開著時點另一個 PiP / clip，panel 不關，改讀該物件的值（同 Photo Editor）。
  1085   2179  7. Project 縮圖、Export 結果都套用；設定存在 project 中。
  1114   2179  8. 本版只支援 Photo PiP；Video PiP 之後支援時沿用同一 panel（不在本版）；Text、Sticker 不支援。
  1116    203  Reset
  1210    100  2-1. 選取 Photo PiP → Tool bar 於 Mask 右側新增「Adjust」→ 點擊後 left panel 切換為 Adjust panel（與 Main video 相同的 6 個滑桿 + Reset），只套用在選取的 PiP。
```
