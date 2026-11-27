# Knowledge Center gate — R1 eBug drafts, redrafted (cl-knowledge-center-myedit, 2026-11-25)

Gate: Contract Runner `create-ebug/SKILL.md` › Knowledge Center expectation gate, via `myedit-qa-knowledge`. Connection
cl-knowledge-center-myedit; every reply's project line read 「MyEdit（myedit）」. Data checked to 2026-11-25 (code,
website, conflict checks). A fresh search was made for every Expect Result; the earlier log is
`mcp-checkpoints.old-rules.md`.

| Entry | Query | Source found (revision as served 2026-11-25) | Comparison | Gate |
|---|---|---|---|---|
| VEW-01 | Launcher Popular Tools Enhanced 標籤 | features/video-enhancer-v2.md › 跨工具串接 › 工具標籤 (#b29e724be991) | agrees | pass |
| VEW-02 | Video Restoration 左側選單 Back | spec › 入口分流 / 舊房間 (#d9497315c276) | agrees | duplicate of MYE261106P0045 (not drafted) |
| VEW-03, VEW-04, VEW-12 | SEO 頁 AVI / <128 px / >120 fps / Got it | spec › Input Format, Error Handle (buttons Got it; 1440p wording); derived-video-enhancer-v2-settings › Upload Limits | agrees | pass |
| VEW-05 | Continue Editing 超過 8 分鐘 Trimmer | spec › 影片長度限制 (#28588743ed80); derived-video-continue-editing-checks (code-derived: from Video Trimmer the shared rule shows Video Too Long) | PM spec agrees with the Expect; code-derived page describes the app | pass (rests on the PM spec and Figma 10) |
| VEW-06 | 完成通知信 EDM 內文 | no KC text; PM Figma 6 - EDM (95-7417) | Figma agrees | pass — held for a mail screenshot |
| VEW-07 | Video Editor 高幀率 toast | spec › Video Editor 高幀率提示 (#b903e329a3e7) | agrees | pass |
| VEW-08 | 上傳中取消 Cancel 扣點 | derived-video-enhancer-v2-settings › Credit Deduction and Cancel (RD answer, #dfed049fda18) | no PM rule for Cancel | PM decision ([UX]) |
| VEW-09 | (from the VEW-08 search) spec › 新房間（手機） | 上傳中 summary and Enhance dimmed | agrees | pass |
| VEW-10 | Light mode 工具頁 dialog 深色 | derived-mui-theme-system (code-derived: V2 is a light-mode tool); no rule for these dialogs | unresolved (rests on KP-054 + user Q-11) | needs the user's go-ahead before filing |
| VEW-11 | Launcher 工具卡縮圖 | derived-launcher-navigation: Restoration card added without preview video; no thumbnail rule | — | duplicate of MYE261110P0023 (not drafted) |
| VEW-13 | (VEW-05 search) spec › Trimmer hints | Standard hint text stated | agrees | pass |
| VEW-14 | (VEW-05 search) spec table: Professional > 2:30 red text; #4c092911b0fb: Replace over limit → Trimmer; Figma 10 ② | spec disagrees with itself | PM decision ([UX]) |
| VEW-15 | (VEW-01 search) spec › 跨工具串接 › Pricing page (#89dc53e3a2b3) | agrees | pass |
| VEW-16 | 按下 Enhance 後預覽暫停 | no Video Enhancer rule; derived-ai-photo-slideshow-limits: that tool pauses on Generate | unresolved (rests on KP-029) | needs the user's go-ahead before filing |
| H-2 | (VEW-05 search) spec: upload over 8 min opens the Trimmer (#4c092911b0fb) | agrees | duplicate of MYE261118P0008 (not drafted) |
| TC-138 | SEO 落地頁 header Get Credits | derived-tool-header-credit-and-upgrade-buttons: a credit tool's import page shows no Get Credits | **contradicts the row** | not raised |
| TC-147 | 雲端空間已滿 Upgrade / Manage | derived-cloud-storage-warnings-and-video-download-limit: Upgrade while a higher tier exists, Manage only on Studio Pro | **contradicts the row** | not raised |

No user override recorded. Before filing ISS-VEW-10 or ISS-VEW-16 the user must say to file them despite the missing
Knowledge Center rule; recheck every Expect Result again immediately before submission (gate rule).

## User go-ahead (2026-11-25)
- ISS-VEW-10 and ISS-VEW-16: no Knowledge Center or spec rule; the user was told and said to file both (「兩隻都開」).

## User filing decision (2026-11-25)
- Hold, do not file now: ISS-VEW-01 (Popular Tools Enhanced tag) and ISS-VEW-05 (Continue Editing over 8 min). User: 「ISS-VEW-05 ISS-VEW-01 這兩個先不發，其他發」.
- File the other 12 on TR261022-0018: ISS-VEW-03, 04, 06, 07, 08, 09, 10, 12, 13, 14, 15, 16.

## Fresh gate for the skill redraft (2026-11-25 19:20–19:24 +08, cl-knowledge-center-myedit)

Stage: eBug creation / existing-ticket correction (create-ebug › Knowledge Center expectation gate), orchestrator subagent,
product MyEdit, connection cl-knowledge-center-myedit; demo build MyEdit-5.11.0-11242029 (version.json 19:22); account not
relevant to the lookups. Every reply's project line read 「📌 專案：MyEdit（myedit）」. Data checked to 2026-11-25.

| Query (abridged) | Entries | Source (as served) | Comparison | Gate |
|---|---|---|---|---|
| SEO 頁上傳 AVI／<128 px／>120 fps／音訊不支援要跳錯誤、按鈕 Got it、1440p 文案 | VEW-03, 04, 12 | features/video-enhancer-v2.md › Input Format, Error Handle (buttons Got it; audio keeps Audio Codec Not Supported; 1440p public text); derived-video-enhancer-v2-settings › Upload Limits | agrees | pass |
| 影片長度限制、Trimmer 左下提示、Professional Replace 超過 2:30 | VEW-13, 14 | spec › 影片長度限制 (Trimmer hints; Professional row: red text + Enhance disabled, recheck on Replace; #4c092911b0fb: Replace over limit → Trimmer); derived settings › Replace and Trim (Replace over the mode limit → trim) | VEW-13 agrees; VEW-14 sources disagree | VEW-13 pass; VEW-14 PM decision ([UX]) |
| EDM 內文、Video Editor 60 fps toast、Pricing Compare All Plans | VEW-06, 07, 15 | spec › Video Editor 高幀率提示 (#b903e329a3e7), 跨工具串接 › Pricing page (#89dc53e3a2b3); no EDM text in KC (Figma 6 - EDM 207:1229 only) | agrees | pass |
| 上傳中取消退點、手機上傳中摘要淡化、彈窗深淺色、Enhance 後預覽暫停 | VEW-08, 09, 10, 16 | derived settings › Credit Deduction and Cancel (RD #dfed049fda18, document read in full 19:24); spec › 新房間（手機） › 上傳中 (summary and Enhance dimmed); no theme rule for dialogs; no preview-pause rule | VEW-08 no PM rule; VEW-09 agrees; VEW-10, 16 unresolved | VEW-08 PM decision ([UX]); VEW-09 pass; VEW-16 user override stands (scope unchanged); VEW-10 see below |

**New conflict, ISS-VEW-10 (not filed):** PM Figma 3u8Oau1mvpNc8qKqBNFGlf board 「9 - Error Handling – Upload Limitation」
(fetched through figma-pm, qa1, 2026-11-25 19:19; `figma-src/board9_235-1137.png`) draws every upload error dialog,
Unsupported File Format (237:1251) included, dark grey with white text — what the app shows. The user's 2026-11-25
go-ahead covered a missing source, not this contradiction, so per the gate the entry stays local until the user decides
(drop / file only the Creating Your Video part / file as drafted despite the Figma).

Final-scope recheck before any ECL action: the Expect Results in `prepared-filing.json` are the ones compared above.

## User decision, ISS-VEW-10 (2026-11-26)
- After seeing both screenshots and PM Figma board 9, the user said 「這不是bug」. ISS-VEW-10 is dropped and not filed.

## User decision, ISS-VEW-01 (2026-11-26)
- Not a bug: the Launcher needs no Enhanced tag (user; Knowledge Center features/video-enhancer-v2.md › 跨工具串接 › 工具標籤, #ec5715b6ac73, read 2026-11-26). Dropped, never filed; TC-002 fixed in table v2 (TC-140 checks tool names only, unchanged).

## PM ruling, ISS-VEW-05 (2026-11-26)
- KC #1c76d4b60c73 (PM Erin Chiu): Continue Editing from Video Trimmer with a clip over 8 min shows Video Too Long in Video Trimmer, no Trimmer (exception). ISS-VEW-05 came from Video Trimmer, so it is the intended behaviour: dropped, never filed. Table v2: TC-088 modified, TC-154 added.

## Correction, ISS-VEW-14 = MYE261124P0033 (2026-11-26, user request 「幫我改這支bug」)
- Fresh gate 2026-11-26 15:05 (cl-knowledge-center-myedit, project line 「MyEdit（myedit）」, data checked to 2026-11-26): `myedit/features/video-enhancer-v2.md` read in full (spec_status ready_for_rd). 影片長度限制: Professional over 2:30 → red text 「Professional mode supports videos up to 2:30.」 under Mode, Enhance disabled; the 2:30 check runs again on Replace Video (also the mobile section, #a392c8ab593e). PM Figma 10 step ② (360:1789) says the same for Replace.
- The Trimmer route is only in `myedit/product-rules/derived-video-enhancer-v2-settings.md` › Replace and Trim (code-derived: what the app does) and in a side remark of #4c092911b0fb's reasons (a ruling on 8-minute uploads). Not a spec conflict: the Expect now states the specified behaviour; owner RD, Must Fix, `[UX]` removed.
- Edited on IF3 (title, description, Severity); Bug Belong RD saved by JACKCY_LEE via Edit BugBelong 15:15. Persisted validator pass 07:17:25Z (filing-validation/p3_ISS-VEW-14). No comment posted.