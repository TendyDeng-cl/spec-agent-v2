# User C (Creator Pro & Studio Pro User) Receive Share Link Flow

Source: PM Figma https://www.figma.com/design/3GnLdOiX9G5NH27l1ltqVr/?node-id=6545-75010 · board `pm-user-c-receive` · section 6545:75010
Figma text layer (read 2026-11-27, figma-pm / qa1, one read-only use_figma text dump); Figma-only spec, no OCR.
Columns: y, x (section-relative canvas points), text. Dialog copy drawn inside images is listed in board-notes.md.

```
    95    105  以下 Flow 假設 User C 為有購買Video Tools Access 的 user，包含 Creator Pro user 或 Studio Pro user
   125    105  Note:
   155    105  MyEdit User 分成
   185    105  Free
   215    105  Audio Pro: Audio Tools full access
   245    105  Creator Pro: Image & Video Tools full access
   275    105  Studio Pro: Image, Video & Audio Tools full access
  1516    105  • 若 user C 在未登入狀態下開啟 Shared Link，會先跳 sign in dialogue 要求 user 登入
  1546    105  • 若 user C 在登入狀態開啟 Share Link，可直接跳至下一個步驟
   589   1944  Sign In
  1668   2273  • User C 登入後可以看到被分享的 Video Project 內容，可進行的操作為:
  1698   2273  Press Play, Pause, Stop Button
  1728   2273  Drag & Seek playhead position
  1758   2273  • 點選 full screen 放大播放影片
  1788   2273  • 點選 top menu & user profile
  1818   2273  • 此模式下無法進行的操作包含
  1848   2273  • 點選 left side panel >> default收合且呈現 disabled 狀態
  1878   2273  • 點選 Layer panel >>  default收合且呈現 disabled 狀態
  1908   2273  • 選取 timeline 上的物件 >> 呈現 disabled 狀態
  1938   2273  • 點選 zoom in & out scaler >> 呈現 disabled 狀態
  1968   2273  • 點選 undo & redo >> 呈現 disabled 狀態
  1998   2273  • 點選 Export & Share >> 呈現 disabled 狀態
  2028   2273  • Rename project >> 維持原來顏色，但不可點選名稱進行編輯，且不需要顯示Cloud
   567   2872  Project Name
  1582   3199  Create Copy of Project
  1673   4291  • 當 User C 點選 ”Create Copy of Project”
  1652   6292  • 顯示 dialogue 內容讓 user 知道會 create a copy of the video project
  1014   7012  Copy Project to Start Editing
  1056   7012  You’re about to copy this project as a template for your own use. The original project will remain unchanged. Once copied, you can edit it freely.
  1161   7298  Cancel
  1161   7405  Copy
  1667   8281  • 幫 user 在同一個分頁複製 video project
  1697   8281  • 在建立 project 期間顯示 loading dialogue，此 loading包含複製 user project 素材的時間  (20261019 Update)
  1679  10738  • Video project 建立後，project name 後方顯示 _copy
   566  11440  Project Name_copy
```
