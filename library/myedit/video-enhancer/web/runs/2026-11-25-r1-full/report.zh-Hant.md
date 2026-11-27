# Video Enhancer V2（網頁版）— R1 完整測試報告

測試資料夾 `library/myedit/video-enhancer/web/runs/2026-11-25-r1-full/`，計畫 `runs/RUN-PLAN-20261125-R1.md`，
使用已核可的 v1 表格（141 列，草稿 20261125-105747）。環境是 MyEdit demo 站（https://demo.myedit.online），
版本 **MyEdit-5.11.0-11242029**（取自 version.json，存於 `build-info.json`；測試期間沒有換版）。
Windows 11 上的 Chrome，視窗 1440 × 900（手機列用視窗模擬成 375 × 812）。
帳號：預設帳號（Studio Pro，port 9333）、免費帳號（port 9341）、雲端已滿帳號（Free，5 GB / 5 GB，port 9343），
以及一個用完即丟的未登入設定檔（port 9350）。時間 2026-11-25 14:22 – 17:38（台北時間）。（跑完時尚未開 bug；之後開單結果見「失敗項目與 eBug 草稿」。）

## 結果統計

| 結果 | 列數 |
|---|---|
| Pass | 114（含 TC-020 重測） |
| Fail | 22（缺陷 19、待決問題 3） |
| Blocked | 5（TC-018、024、026、099、114 都是使用者決定這輪不測） |
| 合計 | 141 |

**待決問題 3 列的後續（2026-11-26）：** 跑完時還無法判斷是網站錯還是表格錯，後來都有結果，已不再待決。

| 列 | 跑出來的狀況 | 後續 |
|---|---|---|
| TC-085 | Professional 模式 Replace 換成 3:00 影片，直接跳 Trim Video，沒有紅字和鎖住的 Enhance | 不符合 PM 規格與 Figma（應顯示紅字、鎖住 Enhance），發給 RD：MYE261124P0033（ISS-VEW-14；原本發給 PM，2026-11-26 更正） |
| TC-101 | 手機寬度上傳時整頁只有「Processing...」，設定摘要和 Enhance 不在畫面上，不是淡化 | 知識庫確認規格要淡化，發給 RD：MYE261124P0030（ISS-VEW-09） |
| TC-147 | 空間已滿的 Free 帳號只有 Generate Anyway 和 Upgrade，沒有 Manage | 知識庫說還有更高方案時顯示 Upgrade，網站是對的，不發；下一版表格改這列的預期 |

## 各段落

| 段落 | 列數 | Pass / Fail / Blocked | 測試時間 | 點數 |
|---|---|---|---|---|
| R1-a 入口、SEO 頁與上傳、輸入限制 | 26 | 13 / 9 / 4 | 26 分 | 0 |
| R1-b 設定面板、價格、Professional 長度限制 | 21 | 19 / 2 / 0 | 27 分 | 0 |
| R1-c 價格（所有組合） | 40 | 40 / 0 / 0 | 15 分 | 0 |
| R1-d 生成與結果、My Library、通知信、其他工具、知識庫規則 | 21 | 15 / 4 / 2 | 1 時 05 分 | 399 |
| R1-e 手機版網頁與 Video Restoration | 9 | 7 / 2 / 0 | 18 分 | 32 |
| R1-f 產品規則（預設帳號） | 19 | 15 / 4 / 0 | 33 分 | 78 |
| R1-g 其他帳號 | 5（另加 TC-117 重測） | 4 / 1 / 0 | 10 分 | 16 |
| **合計** | **141** | **114 / 22 / 5**（含 TC-020 重測） | **3 時 15 分**（全程 3 時 15 分，沒有超過 15 分鐘的空檔） | **525** |

點數明細（stage2 點數紀錄，產品 MyEdit；紀錄頁沒登入的帳號改看帳號選單）：R1-d Video Enhancer
8 + 64 + 64 + 8 + 180 + 8 + 48（Agent）、Video Restoration 16、AI Agent 請求 3；R1-e Video Enhancer 8、
Video Restoration 16 + 8；R1-f Video Enhancer 8 + 10 + 60；R1-g 雲端已滿帳號 8（4810 → 4802），TC-117 重測 8。
計畫預估約 200 點，超出的主要原因是 TC-120 那支 3 分鐘影片的 180 點無法取消（上傳視窗沒有取消鈕，見 ISS-VEW-08），
另外 TC-117 重測多跑了一次生成。

## Claude 用量

- Token（`token-usage.ts --since 2026-11-25T06:20Z`，本專案 9 份對話紀錄，含各段子代理與這次收尾到寫報告為止）：
  813 則訊息；輸入 1,688、快取寫入 1,739,193、快取讀取 145,592,681、輸出 334,862（共處理 1.477 億）。
- 用量卡（`runs/usage.jsonl`，座位 1× Pro；帳號共用，數字偏高）：從 R1 開始（14:20）到收尾開始（17:38），
  5 小時視窗 0 % → 43 %，每週 57 % → 64 %。各段 5 小時視窗增加：R1-a +7、R1-b +2、R1-c +3、R1-d +12、R1-e +5、
  R1-f +8、R1-g +6。

## Coverage 頁

沒有產生：`coverage-page.ts` 需要 `specs/2026-11-25/extracted/inventory.json`，而這組只有 Figma 的規格還沒做控制項盤點
（reading-the-spec 第 10 步），Design 檔也還沒讀（Q-8），所以沒有控制項與箭頭的統計。

## 失敗項目與 eBug 草稿

批次資料夾 `library/myedit/video-enhancer/web/ebugs/2026-11-25-r1/`：草稿
`20261125_eBug_drafts_Video-Enhancer-R1_5.11.0.md`，審查頁 `20261125_eBug_review_Video-Enhancer-R1_5.11.0.html`，
逐筆開單資料 `prepared-filing.json`。2026-11-25 19:30 再依使用者的 `ebug-writing` 與 `create-ebug` 兩個 skill
（Contract Runner 版本，全文讀過）重寫；舊版留在 `….md.before-skills` 與 `….md.old-rules`。**共 14 筆：已發的單修正 3 筆、
不需修改 2 筆，新開 6 筆，因新發現的矛盾暫緩 1 筆，使用者決定不發 2 筆**；這輪之前 TR 上已有單 3 筆、不開 2 筆。
2026-11-25 19:31–19:38 已在 IF3 送出與修正（單號見 `filed_bugcodes.json`，每張的把關紀錄在 `filing-validation/`）。

- 欄位：Parent TR 為 TR261022-0018（IF3），Version 5.11.0，Build No 11242029（19:22 重讀 demo `version.json`，沒有變動），
  Bug Source QA，重現機率預設 3/3（ISS-VEW-04 試了四次，填實際的 4/4），Priority (RD) N/A，previous build Unknown。
  RD 為 Must Fix；`[UX]` 給 PM 為 Better Fix。文字和規格不同歸 RD，不加 `[UI]`。團隊標籤讀 MyEdit Web 看板 E 欄（FCS）：
  V2 各列是 Jenny（`[JT]`，MyEdit 不寫），Video Editor 提示那筆是 Carrey `[CT]`。
- Figma 證據：預期結果有 Figma 節點的，都改引用精確節點並附該節點的圖（經 figma-pm、qa1 抓取，裁切後用綠框標出預期元素，
  `figma-src/`）。UI 類的 ISS-VEW-09 附左右比對圖。ISS-VEW-07、08、15 只有規格文字，ISS-VEW-16 沒有來源，所以不附規格圖。
- 附件（只限規定的幾類，依序）：標好紅框的實際截圖 → Figma 圖 → 比對圖（ISS-VEW-09）或操作錄影（ISS-VEW-16）。
- 知識庫把關：19:20–19:24 逐筆重新搜尋（`mcp-checkpoints.md`）。新的矛盾：**ISS-VEW-10 不發**（使用者 2026-11-26：不是 bug），PM Figma 第 9 版把上傳錯誤
  視窗畫成深色，和 App 一樣。ISS-VEW-16 仍沒有規則，使用者的同意仍有效。
- 檢查：`check_ebug_format.py --product MyEdit --version 5.11.0` 14 筆，0 錯誤、0 警告（額外預檢）；
  `validate-ebug-form-contract.ts` 在每張送出或存檔前的 IF3 實際表單、以及存檔後重讀的詳細頁（`validationStage: persisted`
  加單號）都跑過，9 張全數通過。新附件都從單上下載回來，和審過的檔案比對 SHA-256 一致。
- 修正的三張（MYE261124P0025、P0026、P0027）：只改標題、描述，並依計畫順序在原有紅框截圖後補上 Figma 圖；狀態
  （BugNeedReview）、負責單位、Severity、Priority、重現次數都沒動，沒有留言，原有附件保留。

| 列 | 問題 | eBug | 狀態 |
|---|---|---|---|
| TC-002 | 首頁 Popular Tools 的 Video Enhancer 卡片沒有「Enhanced」標籤 | ISS-VEW-01 | **不是 bug**（使用者 2026-11-26；知識庫 video-enhancer-v2.md › 工具標籤，#ec5715b6ac73：Launcher 不顯示 Enhanced，只有頂端選單顯示）；表格 v2 已改這列 |
| TC-010、TC-014、TC-016、TC-020 | 從 SEO 頁上傳不支援的影片（AVI、短邊不到 128 px、超過 120 fps、音訊不支援）都沒有錯誤視窗 | ISS-VEW-03 = MYE261124P0025（RD，Must Fix，3/3） | 已修正：改用使用者的標題、精確 Figma 節點、補 3 張 Figma 圖（共 7 個附件） |
| TC-011、TC-012、TC-019、TC-021 | SEO 頁的上傳錯誤視窗按鈕寫「Got It」，規格是「Got it」 | ISS-VEW-04 = MYE261124P0026（RD，Must Fix，4/4） | 已修正：補 Figma 節點與圖、預期結果精簡（共 4 個附件） |
| TC-088 | 從 Continue Editing 帶進 8:20 的片段，跳出「Video Too Long」而不是先開 Trimmer | ISS-VEW-05 | **不是 bug**：PM 2026-11-26 裁定（知識庫 #1c76d4b60c73）從 Video Trimmer 帶超過 8 分鐘的影片要跳 Video Too Long，這是例外；表格 v2 改 TC-088、新增 TC-154 |
| TC-113 | 完成通知信內文和 PM Figma「6 - EDM」不同 | ISS-VEW-06 = MYE261124P0027（RD，Must Fix） | 已修正：拿掉 `[UI]`（文字問題）、拆開重現步驟、補 Figma 節點與圖（共 2 個附件） |
| TC-117 | 60 fps 成品進 Video Editor 沒有「This 60 fps video will export at 30 fps…」提示 | ISS-VEW-07 = MYE261124P0028（RD，`[CT]`，Must Fix） | 已發；內容已符合 skill，不需修改 |
| TC-120 | 「Creating Your Video」上傳視窗沒有取消鈕，但點數在上傳前就扣了 | ISS-VEW-08 = MYE261124P0029（PM，`[UX]`，Better Fix） | 已發；內容已符合 skill，不需修改 |
| TC-101 | 手機寬度上傳時「Processing...」蓋滿整個頁面 | ISS-VEW-09 = MYE261124P0030（RD，`[UI][Mobile]`，Must Fix） | 已新開；紅框截圖、Figma 457:3443、左右比對圖 |
| TC-144 | 「Creating Your Video」與「Unsupported File Format」在淺色工具頁上是深色 | ISS-VEW-10（RD，`[UI]`，Must Fix） | **不發**：使用者 2026-11-26 判定不是 bug（PM Figma 第 9 版把錯誤視窗畫成深色） |
| TC-012 | 超過 1440p 的錯誤內文寫「(2560x1440)」，規格是「(1440p)」 | ISS-VEW-12 = MYE261124P0031（RD，Must Fix） | 已新開；紅框截圖、Figma 237:1273 圖 |
| TC-021 | Standard 的 Trimmer 提示文字和規格不同 | ISS-VEW-13 = MYE261124P0032（RD，Must Fix） | 已新開；紅框截圖、Figma 359:1999 圖 |
| TC-085 | Professional 模式下 Replace 超過 2:30 的影片直接開 Trimmer（規格與 Figma 都要求顯示紅字） | ISS-VEW-14 = MYE261124P0033（RD，Must Fix；原為 PM `[UX]`，2026-11-26 更正） | 已新開；紅框截圖、Figma 360:1789 圖 |
| TC-118 | Pricing › Compare All Plans › Video Tools 沒有 Video Enhancer | ISS-VEW-15 = MYE261124P0034（RD，Must Fix） | 已新開；只附紅框截圖（規格只有文字） |
| TC-136 | 按 Enhance 後預覽影片在「Creating Your Video」底下繼續播放 | ISS-VEW-16 = MYE261124P0035（RD，Must Fix） | 已新開（使用者已同意）；紅框截圖 + 錄影 |
| TC-007、TC-107 | 左側工具選單沒有 Video Restoration | TR 上已有：MYE261106P0045（NeedCodeReview） | 不另開 |
| TC-150 | Video Enhancer 與 Video Restoration 的 Launcher 卡片用同一張縮圖 | TR 上已有：MYE261110P0023（RDResolved，11242029 仍可重現） | 不另開 |
| TC-021 | 從 SEO 頁上傳 8:20 影片，跳「Video Duration Limit Exceeded」而不是開 Trimmer | TR 上已有：MYE261118P0008（BuildResolved，11242029 仍可重現） | 不另開 |
| TC-138 | SEO 頁沒有「Get Credits」 | 不開：知識庫寫明點數工具的匯入頁不顯示 Get Credits | — |
| TC-147 | 雲端已滿的免費帳號看到 Upgrade，沒有 Manage | 不開：知識庫寫明只有 Studio Pro 才顯示 Manage | — |

## Blocked 的列

| 列 | 原因 |
|---|---|
| TC-018 | 使用者決定這輪不測（做不出網站讀不到幀率的測試檔：fx-nofps 讀成 1 fps、單一畫格照常匯入、改名的 MKV 沒反應，O-28；RD 只用手做的 MKV 重現過） |
| TC-024 | 使用者決定這輪不測（拖放要手動測） |
| TC-026 | 使用者決定這輪不測（要 RD 提供讓 Trimmer 無法使用的開關） |
| TC-099 | 使用者決定這輪不測（要 RD 提供讓生成失敗的方法） |
| TC-114 | 使用者決定這輪不測（同 TC-099） |

## 值得處理的觀察

- **O-1** HD Video Converter 的 SEO 上傳框寫「Maximum file duration: 30 min」/「Maximum file size: 1.8 GB」，
  AI Frame Interpolation 寫「3 min」/「1.8 GB」，但兩者都進新房間（8 分鐘 / 10 GB）。表格沒有列涵蓋這兩個上傳框，
  建議補列（R-010 三個入口都適用），重測後再開 bug。
- **O-2 / Q-1** 上傳錯誤在選檔當下就跳出（SEO 頁與房間都是），但 R-078（使用者對 Q-1 的回答）說是上傳完才提示，
  規格也還把時機列為 RD 未決問題，需要決定以哪個為準。
- **O-4** 房間的超過上限處理照知識庫從程式碼整理的文件走，跟 PM 規格不同（ISS-VEW-05、H-4）。
- **O-10** 854×480 的來源輸出 720P 是 1278×720，不是 1280×720。
- **O-14** 手機版「Processing...」曾顯示 100 %，進度條卻只到約 80 %。
- **O-16** 滑鼠移到未選取的選項時，顏色只比選取中的深一點，看起來兩個都像被選取；等讀 Design 檔再確認（Q-8）。
- **O-18 / O-23** 按 Replace Video 會先跳「Allow Data Processing」授權視窗（測試沒有同意）。之前做好的成品只能從生成它的
  房間進 Video Editor（My Library 的預覽沒有 Open in Editor）；Video Editor 存專案時遇到兩次 HTTP 429。
- **O-19** 已上傳影片但還沒生成時，Recent Gen 仍顯示「Start by uploading a video…」（R-042 說這句是上傳前才顯示）。判 Pass。
- **O-24** 未登入時 Enhance 按鈕不顯示點數，但按鈕下方那行仍有計價。
- **測試工具**（O-7、O-11、O-13、O-17、O-21）：上傳 5:12 影片時 Chrome 的 DevTools 連線斷過兩次；若 `device-web` 加上
  `viewport`（窄視窗模擬）、`download`、`throttle`、`reload --dialog` 指令，就不必再用暫存的臨時小程式。
  O-9 / O-23：另一個工作階段也在用 port 9333 的 Chrome（多出 business-demo 分頁、視窗被改大小），之後的測試請用沒有其他人操作的 Chrome。

## 這次發現要改的表格（下次存檔時）

- TC-042 – TC-051（以及 TC-083）：每秒 1 點時畫面寫「(1 credit/sec)」，列裡寫的是「1 credits/sec」（O-8）。
- TC-096：Recent Gen 要上傳後才會出現，免費帳號的前置條件要先上傳一支影片。
- TC-018、TC-020：換掉測試檔（見上表），一併更新 fixtures.md。
- TC-138：Get Credits 只在房間內（依知識庫），或請 PM 決定 SEO 頁要不要有。
- TC-147 / R-104：免費（或非 Studio Pro）帳號雲端已滿時是 Upgrade；要測 Manage 需要雲端已滿的 Studio Pro 帳號。
- TC-117：入口是成品預覽視窗的「Open in Editor」（R-073 已不只是程式碼推導）；使用者同意的話，把 R-048 / R-073 的列（TC-098、TC-123、TC-124）放回表格。
- TC-101 / R-049：這幾列是在窄的桌機視窗測的，不是真手機，前置條件要寫清楚。
- 為 O-1 補列（HD Video Converter 與 AI Frame Interpolation 的上傳框）。

## 收尾後還要做的事

- 這個階段的知識整理（run.md）：另開一個子代理，依 domain-knowledge skill 處理這次的觀察（收件匣是空的，但 O-4、O-22，
  以及不開的 TC-138 / TC-147 都牽涉 KP-038、KP-065 與知識庫的程式碼推導文件）。
- ISS-VEW-10 使用者判定不是 bug（2026-11-26），不發。`prepared-filing.json` 其餘各筆已於
  2026-11-25 送出或修正（見「失敗項目與 eBug 草稿」）。

## 2026-11-25 收尾後的補測

- **TC-020 改判 Pass：** 新測試檔 fx-ac3（AC-3 音訊）在 SEO 頁就跳「Audio Codec Not Supported」，影片沒有匯入；按鈕是「Got It」（同 ISS-VEW-04）。另一支 fx-flac24（FLAC 解成 s32）在房間的上傳框會被擋，但從 SEO 頁上傳不會跳任何提示、直接進空房間，已併入 ISS-VEW-03（O-27）。
- **TC-018 使用者決定不測：** 見上表；改名成 .mp4 的 MKV 在 SEO 頁與房間都沒有任何反應（O-28），只記錄、沒有開單。
- **TC-088 重測（O-25、O-26）：** 10 秒影片從 Video Trimmer 進 Video Enhancer 正常；只有超過 8 分鐘才跳 Video Too Long（彈窗出現時還在 Video Trimmer，按 Cancel 可以直接剪）。使用者決定 ISS-VEW-05 照樣給 RD。
- **eBug：** 14 筆，全部掛 TR261022-0018；整個 MyEdit bug 庫（2026 全年、所有狀態）查過，沒有重複。之後已發出 5 張（MYE261124P0025–0029），2026-11-25 19:30 依 ebug-writing／create-ebug 重寫後：P0025、P0026、P0027 待修正，P0028、P0029 不需修改；待新開 6 張（ISS-VEW-09、12、13、14、15、16）；ISS-VEW-10 因 PM Figma 矛盾暫緩；ISS-VEW-01、05 使用者決定不發。詳見上方「失敗項目與 eBug 草稿」。
