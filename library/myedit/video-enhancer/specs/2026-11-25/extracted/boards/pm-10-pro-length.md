# 10 - Professional Mode 長度限制（2:30）（10/28更新）

Source: PM Figma https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=358-1608 · board `pm-10-pro-length` · section 358:1608
Figma text layer (read 2026-11-25, figma-pm / qa1); no PDF export exists, so no OCR. Columns: y, x (line order, not canvas points), text.

```
    40      0  (10/28更新) 影片長度規則
    80      0  • Standard：影片長度上限 8:00。上傳超過 8 分鐘的影片會跳錯誤，見 9 - Case 4。
   120      0  • Professional：只支援 ≤ 2:30。影片超過 2:30 時，Professional 仍可點選，但 Enhance disabled，Mode 下方顯示紅字。
   160      0  • 重新檢查 2:30 的時機：切換 Mode、Replace Video、Trim 完成時。
   200      0  • (10/28更新) 在 Professional 下按 Trim Video：Trimmer 最多只能選 2:30。原片超過上限（Professional 2:30、Standard 8:00）時，左下角才顯示提示。
   240      0  • 切回 Standard：紅字消失，Enhance 恢復。
   280      0  • (10/28更新) 從 Continue Editing 帶過來超過 8 分鐘的片段：進房間後先開 Trimmer（最多可選 8:00），Trim 完才能 Enhance。
   320      0  ① 影片 05:12、Mode = Standard — 影片在 8:00 以內，Standard 可正常 Enhance。（點數數字為示意）「Enhance 312.00 seconds (3 credits/sec)」
   360      0  ② 切到 Professional（影片 > 2:30）— Professional 可點選，但 Enhance disabled，Mode 下方出現紅字「Professional mode supports videos up to 2:30.」。Replace Video 換成超過 2:30 的影片時，也是這個狀態。
   400      0  ③ Professional 下開 Trimmer（最多 2:30）— Trimmer 沿用現有 Trim Video，新增兩點：• Professional 下選取範圍最多 2:30：拖把手到上限就拉不動；End Time 輸入超過也會被限制在 Start Time + 2:30。• 左下角提示「Professional mode supports videos up to 2:30 long. Please trim your video to continue.」：只在原片超過上限時才顯示；原片在上限內不顯示。Standard 下開 Trimmer：上限 8:00，提示改成「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」按 Trim 後回到 ④。(Trimmer: Start Time 00:15.0, End Time 02:45.0, Cancel, Trim)
   440      0  ④ Trim 到 2:30 以內 — Trim 完成後重新檢查：影片 ≤ 2:30，紅字消失、Enhance 亮起。「Enhance 150.00 seconds (3 credits/sec)」
```
