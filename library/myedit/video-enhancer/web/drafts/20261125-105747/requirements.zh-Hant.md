# Video Enhancer V2 — 需求（web）
規格來源：Video Enhancer V2 - PM Figma 10-2.md（PM Figma 頁面
https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id=10-2 的文字，2026-11-25 透過
figma-pm / qa1 讀取；只有 Figma，沒有 PDF），並對照 Knowledge Center 的 PM 規格 `myedit/features/video-enhancer-v2.md`
（PM Erin Chiu，ready_for_rd，2026-11-24 更新，23 題已回答；analysis.md 常駐輸入第 7 項）與stage 環境的計價表
`myedit/credit-actions/videoenhancev2.md`（2026-11-10）。

標籤：[PMF:<board>] 為 `extracted/boards/` 內的 PM Figma 畫板；[KC] 為 Knowledge Center 規格，[KC#<id>] 為其中一題已回答的問題；[KC:credits] 為stage 環境的計價表；[KC:settings] 為 `product-rules/derived-video-enhancer-v2-settings.md`。
PM Figma 與 Knowledge Center 規格不一致時，以較新的項目為準（KC 規格更新到 2026-11-24，並引用了更動 Figma 註記的問題）；每項差異都列在「待確認問題」。
Design：Design Figma（vVDdw55BCWr94ZF7MJRVgx，頁面 1045:10519，UI 負責人 Mini）尚未盤點（第 10 步待補）；各列先引用 PM Figma 的字串，待讀完 Design 後再檢查一次。
平台：web，桌面 Chrome 1440 × 900，除非該列另有說明；手機版網頁的列使用 375 × 812 視窗
（`device-web.ts window 375 812`）。

## 入口與房間
- R-001 [PMF:pm-1-info; PMF:pm-8-old-room; KC] 點 Video Enhancer 入口，會開啟位於 /video-editor/video-enhancer/edit 的新房間。
- R-002 [KC#2f23bec67749; KC] 上方選單與 More Tools 的 HD Video Converter 入口，仍保留其 SEO 頁 /video-editor/hd-video-converter，且該頁會導向新的 Video Enhancer 房間。
- R-003 [KC#2f23bec67749; KC] AI Frame Interpolation 入口仍保留其 SEO 頁 /video-editor/ai-frame-interpolation，且該頁會導向新的 Video Enhancer 房間。
- R-004 [PMF:pm-1-info; PMF:pm-8-old-room] 點 Video Denoiser 入口，會開啟位於 /video-editor/video-denoiser/edit 的舊房間。
- R-005 [PMF:pm-1-info; PMF:pm-8-old-room] 點 Video Brightener 入口，會開啟位於 /video-editor/video-brightener/edit 的舊房間。
- R-006 [PMF:pm-8-old-room; KC] /video-editor/video-restoration/edit 會開啟舊房間（Video Restoration）。
- R-007 [KC#646ef76308aa, #d9497315c276] Video Restoration 不放在上方選單（桌面版與手機版都不放），只能從 Launcher 與左側工具選單進入。
- R-008 [KC#b29e724be991] Video Enhancer 在 Launcher（Home › Popular Tools）與上方選單（桌面版與手機版）都都標示 「Enhanced」 標籤，不標 「New」。
- R-009 [KC#ce875ff0bfd2] 三個新房間入口（Video Enhancer、HD Video Converter、AI Frame Interpolation）開啟房間後，預設設定都相同（R-025）。

## SEO 頁與上傳
- R-010 [KC#842d15e20293; PMF:pm-2-seo] 上傳框依序列出 「Supported file formats: MP4, MOV」、「Maximum file duration: 8 min」 與 「Maximum file size: 10 GB」，且不顯示解析度上限（Q-6）。
- R-011 [PMF:pm-3-pc-flow] 選擇檔案、拖放檔案、使用範例影片，都會帶著該影片開啟工具房間。
- R-012 [PMF:pm-3-pc-flow] 影片上傳時，房間會顯示 「Processing...」 與百分比，以及 「It may take a few seconds. Please don't leave this page.」；上傳完成前，所有設定與 Enhance 都不能按。

## 輸入限制
- R-013 [KC; PMF:pm-2-seo] 接受 MP4 與 MOV 影片。
- R-014 [PMF:pm-9-errors; KC] 不是 MP4 或 MOV 的檔案，會跳出 「Unsupported File Format」 / 「Only MP4 and MOV formats are supported. Please choose another video.」 與 「Got it」，且不會匯入。
- R-015 [PMF:pm-9-errors; KC] 超過 10 GB 的檔案，會跳出 「File Size Too Large」 / 「This video exceeds the 10 GB file size limit. Please choose a smaller video.」 與 「Got it」。
- R-016 [PMF:pm-9-errors; KC] 解析度超過 1440p 的影片，會跳出 「Video Resolution Not Supported」 / 「This video exceeds the supported resolution limit (1440p). Please choose another video.」 與 「Got it」；1440p 的影片可以匯入。
- R-017 [PMF:pm-9-errors; KC#b396530f653b] 短邊小於 128 px 的影片，會跳出 「Video Resolution Not Supported」 / 「This video is below the minimum supported resolution (shorter side of 128 px). Please choose another video.」 與 「Got it」；短邊剛好 128 px 的影片可以匯入。
- R-018 [PMF:pm-9-errors; KC#548d568d4290] 實際影格率（不四捨五入）超過 120 fps 的影片，會跳出 「Video Frame Rate Not Supported」 / 「This video exceeds the supported frame rate limit (120 fps). Please choose another video.」 與 「Got it」；剛好 120 fps 可以匯入。
- R-019 [PMF:pm-9-errors; KC#253838ae2393, #2b46acf4dae8] 讀不到影格率的影片，會跳出 「Unable to Use This Video」 / 「This video cannot be enhanced because it is missing required information, such as the frame rate. Try uploading a different video.」 與 「Got it」，且無法進行 Enhance。
- R-020 [KC#2a3d4654a75e] 接受 H.264 與 HEVC（H.265）影片；AV1 影片會跳出 「Unsupported Format」 / 「This video contains an unsupported video codec. Please choose another video.」 與 「Got it」。
- R-021 [KC#2a3d4654a75e] 音訊編碼或音訊格式不支援的影片，會跳出舊房間的 「Audio Codec Not Supported」 或 「Audio Format Not Supported」 對話框。
- R-022 [KC#4c092911b0fb; PMF:pm-10-pro-length] 上傳超過 8:00 的影片會開啟 Trimmer（最多只能選 8:00），左下角顯示 「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」；按 Trim 後只匯入裁切的部分。剛好 8:00 的影片不經 Trimmer 直接匯入。
- R-023 [KC#4c092911b0fb; PMF:pm-9-errors] 只有在 Trimmer 無法使用時，上傳超過 8:00 的影片才會跳出 「Video Too Long」 / 「This video exceeds the 8-minute length limit. Please choose a shorter video.」 與 「Got it」。

## 設定面板
- R-024 [PMF:pm-3-pc-flow; KC] 面板標題為 「Video Enhancer Settings」，共有四項設定：Mode（Standard、Professional）、Enhance Style（HD、Natural）、Output Resolution（Original、720P、1080P、4K）、Frame Rate（Same as source、50、60、100、120 fps）；Replace Video 與 Trim Video 位於預覽畫面上方。
- R-025 [PMF:pm-3-pc-flow; KC] 預設為 Standard、HD、1080P 與 Same as source；來源是 1080p 或 1440p 時，Output Resolution 的預設為 4K。
- R-026 [PMF:pm-5-disabled-options; KC] Output Resolution 中等於或低於來源解析度的選項為灰色不能按：480p 來源時全部可選；720p 時 720P 不能選；1080p 與 1440p 時 720P 與 1080P 都不能選。Original 一律可選。
- R-027 [PMF:pm-5-disabled-options; KC#78c100376ddb] Frame Rate 中等於或低於來源 fps（四捨五入後）的選項不顯示，超過來源 fps 四倍的選項也不顯示；120 fps 的來源只會顯示 Same as source。
- R-028 [PMF:pm-3-pc-flow; KC#548d568d4290] ⓘ 提示文字如下：Mode 「Standard: Balanced enhancement. Works well for most videos. Professional: Stronger restoration for older or badly compressed footage. Takes much longer to process. Supports videos up to 2:30.」；Enhance Style 「HD: A crisper, more detailed picture. Best when footage looks soft or blurry. Natural: A gentler result that stays true to the original. Best when footage already looks good.」；Output Resolution 「Resolution adjustment is supported up to 4K. Options lower than or equal to the original resolution are unavailable.」；Frame Rate 「Frame rate adjustment is supported up to 120 fps.」

## 價格
- R-029 [PMF:pm-3-pc-flow; KC; KC:credits] 只有 Mode、Output Resolution 與 Frame Rate 會影響價格；Enhance Style 不影響。
- R-030 [PMF:pm-3-pc-flow; KC:settings] Enhance 按鈕顯示總點數 ＝ 影片秒數無條件進位 × 每秒費率，下方顯示 「Enhance {seconds to 2 decimals} seconds ({rate} credits/sec)」（Q-4）。
- R-031 [PMF:pm-3-pc-flow; KC] 游標移到價格旁的 ⓘ，會顯示 「Total credits depend on video duration and selected mode, resolution, and frame rate.」
- R-032 [KC:credits; KC:settings] 每秒費率（stage 環境）：Standard 720p 為 1/1/1、1080p 為 2/2/2、4K 為 3/6/8；Professional 720p 為 2/4/8、1080p 為 4/8/16、4K 為 12/24/48 點，依序對應輸出 ≤30 / ≤60 / ≤120 fps（Q-5）。
- R-033 [KC:settings] Original 依來源短邊計價（≤720 → 720p，≤1080 → 1080p，其餘 → 4K）；Same as source 依來源 fps 級距計價（≤30、≤60、≤120）；50 / 60 fps 屬於 ≤60 級距，100 / 120 fps 屬於 ≤120 級距。
- R-034 [KC#37c46c3048be, #7938786ae16d] 沒有免費試用：每個帳號（包含點數不足的 Free 帳號）都看到正常的點數價格，絕不顯示 「1 Free Trial」。
- R-035 [KC:settings] 找不到某組設定的費率時，不顯示價格，Enhance 也不能按（絕不顯示 0 點）。無法從 UI 測到：面板提供的每個選項都有費率（R-032）；列在此處只是為了放進「Not added」清單。

## Professional 長度限制
- R-036 [PMF:pm-10-pro-length; KC] 影片長度超過 2:30 時，仍可選 Professional，但 Enhance 不能按，且 Mode 下方以紅字顯示 「Professional mode supports videos up to 2:30.」
- R-037 [PMF:pm-10-pro-length; KC] 切換 Mode、Replace Video、完成 Trim 時，都會重新檢查 2:30 限制：切回 Standard，或影片在 2:30 以內，紅字就消失，Enhance 也恢復可按。
- R-038 [PMF:pm-10-pro-length; KC] Professional 模式下 Trimmer 最多只能選 2:30：拖曳把手到上限就停住，End Time 超過時會被設為 Start Time + 2:30；Standard 模式的上限為 8:00。
- R-039 [PMF:pm-10-pro-length; KC] Trimmer 左下角的提示只在來源超過該模式的上限時才顯示：Professional 顯示 「Professional mode supports videos up to 2:30 long. Please trim your video to continue.」，Standard 顯示 「Standard mode supports videos up to 8 minutes long. Please trim your video to continue.」
- R-040 [PMF:pm-10-pro-length; KC] 透過 Continue Editing 帶入超過 8:00 的片段時，會先開啟 Trimmer（最多 8:00），Trim 之後才能 Enhance。

## 產生與結果
- R-041 [PMF:pm-3-pc-flow; KC] 按 Enhance 後，工作會像舊房間一樣出現在 Recent Gen，且 Recent Gen 顯示 「The generated videos can be found in My Library」，其中 「My Library」 是連結。
- R-042 [PMF:pm-3-pc-flow] 還沒上傳任何影片時，Recent Gen 顯示 「Start by uploading a video to generate your video」。
- R-043 [PMF:pm-3-pc-flow; KC] 結果也會儲存在 My Library › Video Enhancer。
- R-044 [PMF:pm-3-pc-flow; KC] 同一支影片的工作完成後，Enhance 維持不能按，直到更改設定、用 Replace Video 載入另一支影片，或 Trim 改變了裁切的片段。
- R-045 [PMF:pm-3-pc-flow] 預覽、Replace Video 與 Trim Video 的行為與原本的 Video Enhancer 相同。
- R-046 [KC:credits; run-web.md] 按 Enhance 只會扣一次報價的點數，且點數明細會在 MyEdit 底下以工具名稱列出該工作。
- R-078 [user 2026-11-25, Q-1] 上傳錯誤（格式、大小、解析度、幀率、編碼、音訊）在上傳完成後才提示，不是選好檔案時。
- R-047 [PMF:pm-3-pc-flow; KC] 結果符合所選的輸出：解析度依 Output Resolution（Original ＝ 來源解析度），影格率依 Frame Rate（Same as source ＝ 來源影格率）。
- 暫緩 R-048 [KC] 結果支援 Open in Editor，和其他影片生成工具一樣；它在桌面版的位置尚未決定（Q-2）。

## 手機版網頁
- R-049 [PMF:pm-4-mobile; KC] 手機寬度的視窗在上傳時，房間顯示 「Processing...」 與百分比，以及 「It may take a few seconds. Please don’t leave this page.」，摘要與 Enhance 呈灰色。
- R-050 [PMF:pm-4-mobile; KC] 手機寬度的視窗中，房間顯示摘要 「Video Enhancer Settings」，每項設定一行（Mode | Standard、Enhance Style | HD、Output Resolution | 1080P、Frame Rate | Same as source），以及帶有點數的 Enhance 與 「Enhance {seconds} seconds ({rate} credits/sec)」。
- R-051 [PMF:pm-4-mobile; KC] 點編輯會開啟面板，列出四項設定的所有選項，上方有 Replace Video / Trim Video；Frame Rate 會開啟底部面板，列出 R-027 允許的選項。
- R-052 [PMF:pm-4-mobile; KC] 產生時顯示 「Creating Your Video」 與百分比，以及 「Please do not close this window or click the Back button on your browser.」；送出後，頁面會前往 My Library › Video Enhancer。
- R-053 [PMF:pm-4-mobile; KC#a392c8ab593e] 手機寬度的視窗中，Professional 搭配超過 2:30 的影片時，摘要裡 「Mode | Professional」 下方以紅字顯示 「Video longer than 2:30」，編輯面板則顯示 「Professional mode supports videos up to 2:30.」；改選 Standard 或影片在 2:30 以內之前，Enhance 都不能按。

## Video Restoration（舊房間）
- R-054 [PMF:pm-8-old-room; KC#ef6131aa247d] 舊房間名稱為 Video Restoration，面板標題為 「Video Restoration Settings」。
- R-055 [PMF:pm-8-old-room; KC] 選項依序為 Lighting Adjustment、Video Denoise、Video Upscaler、Frame Interpolation。
- R-056 [PMF:pm-8-old-room; KC] 進入時，所用入口對應的選項會預設勾選（Denoiser → Video Denoise，Brightener → Lighting Adjustment）；/video-restoration/edit 會勾選 Lighting Adjustment 與 Video Denoise。
- R-057 [KC#d9497315c276] 面板保留 Back 按鈕；按 Back 後，點左側選單的 Video Restoration 會重新開啟四個選項的面板。
- R-058 [PMF:pm-8-old-room; KC] 舊房間的結果會儲存到 My Library › Video Restoration；在手機寬度的視窗，舊房間也直接前往 My Library › Video Restoration。

## My Library
- R-059 [PMF:pm-7-library; KC] My Library 新增 Video Enhancer 資料夾，存放新房間的結果，並附說明 「Results from the new Video Enhancer are saved here. For results from the original Video Enhancer, go to Video Restoration.」
- R-060 [PMF:pm-7-library; KC] 原本的 Video Enhancer 資料夾改名為 Video Restoration，顯示 「(Formerly Video Enhancer)」，保留先前的結果，並附說明 「The original Video Enhancer has been renamed to Video Restoration. Your previous results are still here. Results from the new Video Enhancer are saved in the Video Enhancer folder.」
- R-061 [KC#68c4aafc0467] /{lang}/cloud/library/video/video-enhancer 會開啟新的 Video Enhancer 資料夾，/video-restoration 則開啟 Video Restoration 資料夾。

## 電子郵件
- R-062 [PMF:pm-6-edm; KC] 新房間的工作完成後會寄出 「Your Video Enhancer result is ready!」，內含連到 My Library › Video Enhancer 的 「Access Your Video Enhancer」。
- R-063 [PMF:pm-6-edm; KC] 新房間的工作失敗時會寄出 「Your Video Enhancer result failed to generate.」，原因寫的是 「…content that violates our policy, or temporary server issues…」，並指向 My Library › Video Enhancer。
- R-064 [PMF:pm-6-edm; KC] Video Restoration 寄出自己的完成與失敗信（「Your Video Restoration result is ready!」 / 「…failed to generate.」），連結指向 Video Restoration。

## 其他工具
- R-065 [PMF:pm-5-agent; KC] Agent 會在 Video Enhancer 中完成 Video Enhance V2 的使用情境，一律使用 Standard 模式，遇到超過 8 分鐘的影片會請使用者先裁切；修復類的使用情境則用 Video Edit by Chat 完成。
- R-066 [KC#b903e329a3e7] 超過 30 fps 的影片進入 Video Editor 時，會顯示 3 秒的提示 「This {fps} fps video will export at 30 fps. Your original is unchanged.」（兩支以上時：「Videos above 30 fps will export at 30 fps. Your originals are unchanged.」），每支影片每個工作階段只顯示一次。
- R-067 [KC#89dc53e3a2b3] Pricing 頁面將新工具命名為 Video Enhancer，舊工具命名為 Video Restoration。

## 待確認問題
- Q-8 [Design not read] Design 稿（頁面 1045:10519）還沒盤點，所以控制項與文案都取自 PM Figma（第 10 步待補）。

## 已回答的問題（使用者，2026-11-25，REQ-004）
- Q-1 上傳錯誤在上傳完成後才提示，不是選檔當下 → 新增 R-078；8 列上傳錯誤的預期結果改成上傳完成後才跳出彈窗。
- Q-2 Open in Editor 先略過 → R-048、R-073、R-074 暫緩；對應的測試列（TC-098、TC-123、TC-124）這次不放進表格。
- Q-3 HD Video Converter／AI Frame Interpolation 維持 SEO 頁原網址 → R-002、R-003 不變。
- Q-4 總點數依秒數無條件進位（7.3 秒為 8 × 3 = 24）；Figma 的 21 點只是示意 → R-030 不變。
- Q-5 只看 demo：核對 stage 價格；正式站價格不在這份表格範圍 → R-032。
- Q-6 SEO 上傳區以較新的知識庫決定為準 → R-010 不變。
- Q-7 生成完成後 Trim 會讓 Enhance 重新亮起 → R-044 不變。
- Q-9 從程式碼整理、未經確認的規則這次不測 → R-070～R-077 暫緩；對應的測試列（TC-121、TC-122、TC-125～TC-127）不放進表格。
- Q-10 處理中取消先跳過 → 沒有測試列（與先前相同）。
- Q-11 房間是 Light Mode 頁面，照假設（使用者，2026-11-25，REQ-006）→ R-101 與 TC-144 保留；精確色值等讀完 Design 稿再核對（Q-8）。
- Q-12 介面語言這次先不測（使用者，2026-11-25，REQ-006）→ R-103 暫緩，測試列 TC-146 不列入；不加 MUI 區段。

## 知識庫規則（常駐輸入第 7 項，2026-11-25 檢查點）
出處紀錄：本草稿的 `knowledge-center.md` 與 `mcp-checkpoints.md`。R-068、R-069 是 RD 的答覆（#dfed049fda18，已統整進知識庫規則）；
R-070～R-077 從程式碼整理而來，尚未經人確認（Q-9）。
- R-068 [KC#dfed049fda18] Enhance 建立工作階段時就扣點，在影片上傳開始之前：上傳視窗還在跑時，點數明細就已經出現這筆扣點。
- R-069 [KC#dfed049fda18] 上傳中取消會在送出工作前停止上傳，已扣的點數在 3～6 小時內自動退回。
- 暫緩 R-070 [KC:settings] 雲端空間不足時，按 Enhance 會先跳雲端空間提示，不會送出任何東西。
- 暫緩 R-071 [KC:settings] 點數核對或送出失敗時，上傳視窗會關閉，Enhance 可以再按。
- 暫緩 R-072 [KC:settings] 點 Recent Gen 裡已完成的結果卡，會開啟原片與成品的並排預覽。
- 暫緩 R-073 [KC:settings] 結果預覽中有「Open in Editor」，開啟 Video Editor 時帶入的是成品，不是原片。
- 暫緩 R-074 [KC:settings] 頂端列的 Open in Editor（在 Replace Video、Trim Video 旁邊）開啟 Video Editor 時帶入目前上傳的影片（含 Replace 或 Trim 之後的版本），不是生成結果。
- 暫緩 R-075 [KC:settings] 視窗寬度 1200 px 以下時不顯示 Recent Gen，結果卡也不會開並排預覽。
- 暫緩 R-076 [KC:settings] 影片資訊讀完之前，Trim Video 不能按。
- 暫緩 R-077 [KC:settings] 用 Continue Editing 帶進來的影片也會跑一樣的上傳檢查；不符合的影片會跳錯誤視窗，不會進入房間。

## 產品規則（領域知識，常駐輸入第 6 項，2026-11-25）
來自 `library/myedit/knowledge/`（KP-001～KP-075，2026-11-25 經使用者同意從 Contract Runner 領域知識匯入）。
只在規格沒寫時套用；工具的數值一律以規格為準。每條規則適不適用，見下方 *Domain rules*。
- R-079 [KB: KP-007, KP-008] 上傳百分比與工作進度都從 0 開始、不會倒退，最後一定停在結束狀態（完成或失敗），不會永遠停在處理中。
- R-080 [KB: KP-009] 使用者取消的上傳顯示為已取消，不會顯示成生成失敗。
- R-081 [KB: KP-010] 工作失敗時顯示看得懂的訊息、頁面不重新載入，上傳的影片和設定都保留，方便重試。
- R-082 [KB: KP-011] 工作生成中，Replace Video 和 Trim Video 要嘛停用，要嘛不影響進行中的工作。
- R-083 [KB: KP-012] 下載的成品和預覽一致：內容、方向、長寬比、長度都和原片相同；原片有聲音時成品也有。
- R-084 [KB: KP-013, KP-069] 帶旋轉資訊的影片（手機直拍）在預覽、Trimmer、成品和下載檔裡都是正的。
- R-085 [KB: KP-014, KP-070] 下載檔的副檔名和實際格式一致（.mp4 就是 MP4），檔名不是空的；確切命名規則規格沒寫。
- R-086 [KB: KP-017] 同一個成品再預覽或再下載一次仍可播放，不會變空白或損壞。
- R-087 [KB: KP-023] Trimmer 中點時間軸，播放頭會跳到那裡並從那裡繼續播；播放剪輯範圍時會停在終點。
- R-088 [KB: KP-025, KP-026] 房間有已上傳但還沒 Enhance 的影片時，離開或重新整理前要先確認：選留下就維持原狀，選離開就照使用者要去的地方走。
- R-089 [KB: KP-027] 還沒上傳任何影片就離開房間，不會跳未儲存變更的警告。
- R-090 [KB: KP-028] 視窗寬度跨過 1201 px（桌機面板 ↔ 手機版摘要）時，設定維持原本的選擇。
- R-091 [KB: KP-029] 預覽播放中按 Enhance 或 Replace Video，預覽會暫停或停止。
- R-092 [KB: KP-031, KP-032, KP-068] 重新整理後，成品仍在 My Library › Video Enhancer，狀態是最新的（處理中 → 完成）。
- R-093 [KB: KP-034] My Library 項目的縮圖和長度屬於那個成品。
- R-094 [KB: KP-038] SEO 頁和房間的右上角一直有 Get Credits 入口。
- R-095 [KB: KP-039, KP-040, KP-043] 點數足夠時不會跳點數不足的彈窗，實際扣點等於顯示的價格，帳號選單的餘額不用重新整理就會更新。
- R-096 [KB: KP-041] 未登入時按 Enhance 會被要求登入，不會送出也不會扣點。
- R-097 [KB: KP-045] Video Enhancer 和 Video Restoration 在 Launcher、頂端選單、左側工具選單和 Pricing 的名稱都一致。
- R-098 [KB: KP-050, KP-056] 停用的 Enhance 看起來就是停用、點了沒反應；設定選項的懸停、焦點、選取、停用狀態都看得出來。
- R-099 [KB: KP-051, KP-058] 打開一個設定選單會關掉另一個；選單緊貼選擇器展開、不蓋住它，所有選項都看得到或可捲動到。
- R-100 [KB: KP-052, KP-053] 視窗 1280 × 720、縮放 150 % 時，設定、Enhance 和 Recent Gen 都碰得到（必要時可捲動），tooltip 不會擋住 Enhance。
- R-101 [KB: KP-054, KP-055, KP-057] 房間是 Light Mode 頁面：選單、底部抽屜、Trimmer、彈窗、toast、生成進度和 Recent Gen 卡片都是淺色，文字和圖示清楚，沒有深色閃現，設計稿上的外框與分隔線都還在（Q-11）。
- R-102 [KB: KP-060] 時間碼（播放器、Trimmer、Recent Gen、My Library）不會出現 xx:60，滿 60 秒要進位到分鐘。
- 暫緩 R-103 [KB: KP-061, KP-062, KP-063] 切到其他網站語言（/tw/）時，房間的文字、tooltip、彈窗和錯誤訊息都是該語言，沒有字串 key 或英文預設字，較長的文字也看得清楚（Q-12）。
- R-104 [KB: KP-065, KP-067] 雲端空間已滿時，Enhance 先跳容量已滿提示，有「Generate Anyway」和「Manage」：Generate Anyway 會繼續生成，Manage 開啟這個工具的相簿（My Library › Video Enhancer）。
- R-105 [KB: KP-074] /video-enhancer、/video-enhancer/edit、/hd-video-converter、/ai-frame-interpolation、/video-restoration/edit 的瀏覽器分頁標題都可讀且是該工具的名稱，不會是字串 key、undefined 或別的工具。
- R-106 [KB: KP-075] Launcher 和 Home 上的 Video Enhancer、Video Restoration 卡片不會用到別的工具的縮圖。

### Domain rules
- 上方已引用：KP-007、KP-008（R-079）；KP-009（R-080，及 R-069）；KP-010（R-081）；KP-011（R-082）；KP-012（R-083）；KP-013、KP-069（R-084）；KP-014、KP-070（R-085）；KP-017（R-086）；KP-023（R-087）；KP-025、KP-026（R-088）；KP-027（R-089）；KP-028（R-090）；KP-029（R-091）；KP-031、KP-032、KP-068（R-092）；KP-034（R-093）；KP-038（R-094）；KP-039、KP-040、KP-043（R-095）；KP-041（R-096）；KP-045（R-097）；KP-050、KP-056（R-098）；KP-051、KP-058（R-099）；KP-052、KP-053（R-100）；KP-054、KP-055、KP-057（R-101）；KP-060（R-102）；KP-061、KP-062、KP-063（R-103）；KP-065、KP-067（R-104）；KP-074（R-105）；KP-075（R-106）。
- 規格需求已涵蓋：KP-002、KP-006（R-014～R-019：每個上限都用彈窗擋下，不會卡在處理中）；KP-004（R-038：End Time 超過上限時設到邊界）；KP-044（R-001～R-006）；KP-049（R-065）；KP-073（R-067）。
- 不適用：KP-001（沒有模型可選，只有 BytePlus）；KP-003（沒有提示詞）；KP-005（沒有加減按鈕）；KP-015（沒有聲音開關）；KP-016（沒有長度選項，成品長度見 R-083）；KP-018、KP-019、KP-020、KP-021（房間內沒有可選取的物件或可編輯文字）；KP-022、KP-035、KP-066（這個工具不產生專案）；KP-024（單頁房間；舊房間的 Back 會重開面板，R-057）；KP-030（沒有範本或 Inspiration）；KP-033（成品自動存，沒有手動儲存）；KP-036（只管圖片；影片工具的容量已滿見 KP-065、R-104）；KP-037（沒有模型名稱可顯示）；KP-042（沒有免費試用，R-034）；KP-046（除了登入沒有受限網址，R-096）；KP-047（頂端選單沒有巢狀子選單）；KP-048（Open in Editor 暫緩，Q-2）；KP-059（沒有分類標籤）；KP-064（這份表格只在 Chrome 跑，run-web.md）；KP-071、KP-072（不是新工具，標的是「Enhanced」，R-008）。

## 2026-11-25 新增：涵蓋檢查與常駐輸入

### 需求紀錄涵蓋
- REQ-001：本草稿。REQ-002：Figma 帳號（沒有對應的列）。 REQ-003：補上知識庫規則（R-068～R-077）。 REQ-004：Q-1～Q-10 的回答（新增 R-078；R-048、R-070～R-077 暫緩）。 REQ-005：套用匯入的產品規則（R-079～R-106）。

### 工作狀態

| Job | Uploading | Ready | Generating | Done | Failed |
|---|---|---|---|---|---|
| Upload | TC-008 | TC-009 | n/a：上傳期間不會產生 | n/a：上傳結束後即為 Ready（TC-009） | TC-010 |
| Enhance job | n/a：Enhance 在上傳完成後才開始 | TC-089 | TC-089 | TC-089 | TC-099 |

### 錯誤類別

| Class | Row |
|---|---|
| Format | TC-010 |
| Size | TC-011 |
| Resolution high | TC-012 |
| Resolution low | TC-014 |
| Frame rate | TC-016 |
| Unreadable frame rate | TC-018 |
| Codec | TC-019 |
| Audio | TC-020 |
| Length | TC-021 |

### 離開方式 × 階段

| Exit | Settings | Generating | Done |
|---|---|---|---|
| Replace Video | TC-084 | n/a：產生中按 Replace 不會中斷工作（舊房間行為，R-045） | TC-094 |
| Leave the room | TC-100 | TC-097 | TC-093 |

### 隱藏條款

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-010 | 上傳框內沒有解析度上限那一行 | 完整讀取上傳框文字（texts），檢查是否含 「resolution」 | TC-008 |
| R-012 | 上傳結束前，設定與 Enhance 都維持不能按 | 上傳期間讀取面板的 disabled 旗標（els） | TC-008 |
| R-023 | 只有在 Trimmer 無法使用時，才會跳出 「Video Too Long」 對話框 | 上傳超過 8:00 的影片時，只要 Trimmer 可用，就會開啟 Trimmer 而不是對話框；要看到對話框，必須先讓 Trimmer 無法使用 | TC-021, TC-026 |
| R-037 | 切換 Mode、Replace Video、Trim 都會重新檢查 2:30 | 三種事件發生後，各讀一次紅字與 Enhance 狀態 | TC-083, TC-084, TC-085, TC-086 |
| R-042 | Recent Gen 的空白提示文字只在還沒有任何工作時才出現 | 在沒有 Video Enhancer 結果的帳號上讀取 Recent Gen | TC-096 |
| R-068 | 上傳完成前就已扣點 | 上傳視窗還在跑時查看點數明細 | TC-119 |
| R-069 | 上傳中取消後的退點較晚才到（3～6 小時） | 取消 6 小時後再查看點數明細 | TC-120 |
| R-078 | 上傳錯誤的彈窗要等上傳完成才出現 | 先看到上傳進度，再看到彈窗（記錄先後；太快時用 device-web record 錄下來） | TC-010, TC-011, TC-012, TC-014, TC-016, TC-018, TC-019, TC-020 |
| R-079 | 進度不會倒退，工作不會永遠停在處理中 | 錄下上傳百分比和工作卡片，直到結束 | TC-128 |
| R-080 | 取消的上傳不會被當成生成失敗 | 取消後的 Recent Gen 與提示訊息 | TC-120 |
| R-081 | 失敗後頁面不重新載入、輸入都保留 | 失敗後的網址、上傳的影片和設定 | TC-099 |
| R-088 | 有未送出的上傳時，離開前要先確認 | 用選單離開和重新整理時的確認視窗 | TC-133 |
| R-089 | 沒上傳任何東西時不跳警告 | 離開空房間時沒有彈窗 | TC-134 |
| R-096 | 未登入按 Enhance 不會送出也不會扣點 | 登入後 Recent Gen 沒有工作、點數明細沒有紀錄 | TC-139 |
