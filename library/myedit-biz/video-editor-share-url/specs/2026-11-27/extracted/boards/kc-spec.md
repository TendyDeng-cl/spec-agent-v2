# KC spec — Video Editor Share Project URL (MyEdit Biz Knowledge Center)

Source: myedit-biz/features/video-editor-share-project-url.md (Christine Lin, ready_for_rd, updated 2026-11-11), read
2026-11-27 with get_document on cl-knowledge-center-myedit-biz. board `kc-spec`. Not a Figma board: each table row or
bullet of the spec's User Flow and Pricing sections is one line (y = line order, 200 apart so each row is its own
annotation block; § = a heading). Columns: y, x, text.

```
   400      0  § User Flow
   800      0  § 分享者（User A）取得連結
  1000      0  • Video Editor 右上角 — 原本的 Export 按鈕改成 Export & Share
  1200      0  • 點 Export & Share — 跳出視窗，上半部是 Share（複製連結），下半部是下載影片（Export Format: mp4，按鈕 Cancel／Download）
  1400      0  • Share 區說明文字 — 「Share access to this project. Anyone with the link can sign in to view it. Premium users can copy and edit the project.」
  1600      0  • 滑鼠移到網址上 — 用 tooltip 顯示完整網址
  1800      0  • 點複製 icon — 複製連結，顯示 tooltip「Copied」；之後 A 自行把連結分享給別人
  2000      0  • My Projects › Video 卡片「更多」選單 — 顯示 Share 選項；選單為 Duplicate／Share／Rename／Delete（不含 Download，要下載需開啟專案用 Export & Share）
  2200      0  • 在 My Projects 點 Share — 收起「更多」選單，顯示 toast「Share link copied. You can now share the link.」
  2400      0  • 網址格式：沿用 MyEdit Biz 現有的分享網址格式 `{網站}/{工具路徑}/share/{token}`，跟 Biz 的 Photo Editor（設計專案）分享連結一致。
  2800      0  § 分享規則
  3000      0  • 誰能分享 — 所有登入的使用者都能分享自己的專案，不分方案；方案門檻只在接收者建立副本時
  3200      0  • 分享者開自己的連結 — 直接進入可編輯的編輯器，不是唯讀畫面
  3400      0  • 接收者看到的版本 — 永遠是專案最新版；A 分享後繼續修改，B 再開連結看到修改後的內容
  3600      0  • 停止分享 — 目前沒有讓連結失效的方法（沒有「停止分享」入口）
  3800      0  • 分享者刪除專案後 B 開連結 — 見下方「分享者刪除專案後」
  4200      0  § 分享者刪除專案後
  4400      0  • 已登入的接收者開連結 — 導到 My Projects 的 Video 分類，並跳一次性提示「The shared project has been deleted and is no longer available.」（zh_TW：分享的專案已被刪除，無法再使用。）
  4600      0  • 未登入的接收者開連結 — 導回 Video Editor 入口頁，沒有提示
  4800      0  • 接收者已在分享頁時專案被刪除 — 約每 5 秒偵測一次；頂部出現不能關閉的同一則提示，並隱藏 Create Copy of Project
  5000      0  • 取不到專案（連結無效、網路失敗、伺服器錯誤） — 一律當成「已刪除」，不區分原因
  5200      0  • 專案載入失敗（非刪除） — 提示「The project may have been updated. Try copying the link again.」（zh_TW：專案可能已更新。請嘗試重新複製連結。），同樣導回 My Projects
  5400      0  • My Projects 頁已有上面兩則提示文字，見 `myedit-biz/product-rules/derived-my-projects-page.md`。
  5800      0  § 手機與小螢幕開啟分享連結
  6000      0  • 在手機、平板，或視窗寬度 1200 px 以下開分享連結 — 照 MyEdit Biz 全站規則，整個畫面被小螢幕遮罩蓋住，不能操作
  6200      0  • 遮罩文字（手機／平板） — 「This service is only available on larger screens. Please switch to a desktop for full access.」
  6400      0  • 遮罩文字（電腦上把視窗縮小） — 「Your screen size is too small for this feature. Please adjust your browser window to a larger size for the best experience.」
  6600      0  • 全站規則見 `myedit-biz/product-rules/derived-small-screen-mask.md`。
  7000      0  § 接收者開啟連結（User B、User C 共通）
  7200      0  • 未登入開啟連結 — 先跳 Sign in 對話框要求登入
  7400      0  • 已登入開啟連結 — 直接進入被分享專案的檢視畫面（不是一打開就自動建立副本）
  7600      0  • 檢視畫面可做的事 — Play／Pause／Stop、拖曳播放頭跳轉、全螢幕播放、點 top menu 與 user profile
  7800      0  • 左側面板、Layer 面板 — 預設收合且 disabled
  8000      0  • 時間軸上的物件、zoom in／out、undo／redo、Export & Share — disabled
  8200      0  • 專案名稱 — 維持原本顏色，但不能點名稱改名，不顯示 Cloud 圖示
  8400      0  • 畫面下方 — 顯示「Create Copy of Project」按鈕
  8800      0  § 點 Create Copy of Project
  9000      0  • Free — 跳 Limitation popup「Your account has limited access to copying projects. Upgrade to unlock this feature for seamless project management.」（圖片用 Video Editor 的 cover image）；按 Upgrade now 跳 sales popup
  9200      0  • Pro — 跳確認框「Copy Project to Start Editing」：「You’re about to copy this project as a template for your own use. The original project will remain unchanged. Once copied, you can edit it freely.」，按鈕 Cancel／Copy
  9400      0  • Pro 按 Copy — 在同一個分頁複製專案，建立期間顯示 loading 對話框；建立完成後進入可編輯的編輯器，專案名稱後面加上「_copy」
  9600      0  • 專案沒有任何片段 — 不顯示 Create Copy of Project 按鈕
  9800      0  • B 的雲端空間放不下這份專案 — 先擋下、不複製，跳 Biz 現行的雲端空間已滿提示：非 Pro 是「You’ve reached your cloud storage limit.／Upgrade now to increase your Cloud storage.」可升級；Pro（Biz Pro）是「Your Cloud Storage is Full.／You cannot use this tool because your storage is full. Please manage your storage space to continue.」，按 Manage 帶到 My Projects（見 `myedit-biz/product-rules/derived-cloud-storage.md`）
 10000      0  • Free 在 sales popup 完成訂閱後 — 購買完成後回到原本的分享畫面，頁面不 reload、狀態保留；不會自動繼續複製，使用者要自己再按一次 Create Copy of Project，之後依序經過雲端空間檢查 → 「Copy Project to Start Editing」確認框 → 按 Copy 才複製
 10200      0  • 副本裡原作者上傳的素材 — 會出現在 B 的 Uploads，並算進 B 的雲端空間；之後 A 刪素材不影響 B 的副本（PM 確認）
 10600      0  § Pricing Plan Differences
 10800      0  • Free — 可以（需登入） — 不行，跳 Limitation popup → sales popup
 11000      0  • Pro — 可以（需登入） — 可以
 11200      0  • 分享（產生、複製連結）不分方案，所有登入使用者都能用。
 11400      0  • 方案內容見 `myedit-biz/product-rules/derived-subscription-plans.md`。
```
