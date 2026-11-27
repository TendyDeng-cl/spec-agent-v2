# 更新計畫 — myedit/video-enhancer（web），草稿 20261125-105747

新表格（還沒有核准過的版本）。共 142 列（另有 8 列暫緩），來源是 PM Figma 頁面 10:2（2026-11-25 以 figma-pm／qa1 讀取），以及知識庫的 PM Spec
`myedit/features/video-enhancer-v2.md`（RD 可開工，2026-11-24 版），加上 stage 環境的計價表。

## 知識庫規則（2026-11-25 新增，REQ-003）
TC-119～TC-127：RD 對扣點時機與上傳中取消退點的答覆（TC-119、TC-120），以及 7 條從程式碼整理、PM 尚未確認的規則
（TC-121～TC-127，Q-9）：這些測試列只記錄網站的實際行為。出處與查詢紀錄：knowledge-center.md、mcp-checkpoints.md。

## 已套用的回答（2026-11-25，REQ-004）
Q-1：8 列上傳錯誤的預期結果改成上傳完成後才跳出彈窗（R-078）。Q-2：Open in Editor 暫緩（TC-098、TC-123、TC-124 不放進表格）。
Q-9：程式碼整理的規則暫緩（TC-121、TC-122、TC-125～TC-127 不放進表格）。Q-3、Q-4、Q-6、Q-7 確認原本的假設；Q-5 只看 demo；
Q-10 先跳過。暫緩的列保留原編號（held.txt），其他列的編號都不變。

## 產品規則（2026-11-25，REQ-005）
TC-128～TC-150 在規格沒寫的地方套用匯入的 MyEdit 領域知識（library/myedit/knowledge，KP-001～KP-075）：進度與結束狀態、生成中
保護輸入、下載與預覽一致、影片旋轉、檔名、Trimmer 跳轉、離開警告、跨 1201 px 版面切換時設定保留、播放停止、重新整理後的
My Library、Get Credits 與餘額、未登入按 Enhance、各選單名稱一致、控制項狀態、選單、窄視窗與縮放、Light Mode、時間碼、/tw/
文案、容量已滿（Generate Anyway／Manage）、分頁標題與卡片縮圖。沒用到的規則，在 requirements.md 的 *Domain rules* 逐條寫明原因。

## 沒有加進表格的項目
- R-035（查不到單價時不顯示價格、Enhance 不能按）：設定面板提供的每個選項在 stage 計價表裡都有單價，所以從畫面上無法進入
  這個狀態；這是給 RD 的防呆規則。
- 40 種價格組合不逐一實際生成：每種組合都核對 Enhance 按鈕上顯示的點數（TC-042 – TC-081，不花點數）；另外用 4 次實際
  生成（TC-089 – TC-092）核對扣點金額和成品規格，涵蓋每一級解析度和每一級幀率。40 種全部生成約要 1,200 點，能檢查到的
  東西，價格列和這 4 次生成已經涵蓋。
- Enhance Style 不和 Output Resolution／Frame Rate 交叉組合：它不影響價格（R-029；stage 計價表中 HD 與 Natural 單價相同）。
  TC-038 檢查切換風格價格不變，TC-090 用 Natural 實際生成一次。
- Design 稿（vVDdw55BCWr94ZF7MJRVgx，頁面 1045:10519）還沒盤點，所以目前沒有控制項追蹤表和流程箭頭清單；控制項與文案都取自
  PM Figma（Q-8）。下一份草稿會讀 Design 稿（第 10 步），凡是 Design 畫了但沒有測試列按到的控制項或畫面，都會補上測試列。
- PM 在 Figma 上標了「agent-ignore」的區塊（PDRPC Design、Old 4 - Mobile UI Spec、PM's Note、Handover）不屬於規格。

## 審閱時要確認的問題
Q-8（Design 稿還沒讀）。Q-11（確認是 Light Mode）、Q-12（介面語言先不測，R-103 暫緩）已回答（REQ-006）。
