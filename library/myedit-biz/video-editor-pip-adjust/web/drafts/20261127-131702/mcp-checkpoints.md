# MCP checkpoints — myedit-biz/video-editor-pip-adjust (web)

Append-only audit (Contract Runner myedit-qa-knowledge format). Records only calls actually made.

## 2026-11-27 (Asia/Taipei) · Test Case creation · draft 20261127-131702
- Agent: Claude Code subagent (spec-casebook). Product: MyEdit Biz. Connection: cl-knowledge-center-myedit-biz. Env: demo (business-demo.myedit.online); build not known yet (TR261124-0031).
- Calls: get_document ×4 features (video-editor-main-video-adjust, video-editor-photo-pip-adjust, video-editor-photo-pip-mask, video-editor-photo-pip-crop-rotate; all ready_for_rd); get_document product-rules/derived-photo-editor-mask.md, derived-photo-editor-crop-rotate.md, derived-photo-editor-element-toolbar.md, meetings/2026-03-04.md (ok); search_knowledge 「Video Editor Photo PiP 疊加照片 Crop Rotate Mask Adjust 工具列 縮圖 旋轉」 (8), 「Video Editor Undo Redo 規則 Copy Paste Split 素材檔遺失 missing file」 (8), 「Video Editor 疊加照片 Cutout 去背 Biz Pro 升級 點數 處理中」 (8), 「Video Editor 專案儲存 重新開啟 Export 匯出 Project 縮圖 My Projects」 (8); get_spec_change_log ×4 (ok); list_questions specPath crop-rotate, mask (0, 0); list_ebugs scope all open (0).
- Returned project: MyEdit Biz on every reply.
- Figma (same session): figma-pm whoami = qa1, figma-design whoami = qa-dm; see requirements.md header and the final report for the reads.
- Result: R-001 – R-094 written; Q-1 – Q-13 open.
- Status: resolved for authoring. Unresolved: Q-1 – Q-13. Not checked: ECL tickets outside the agent registry; the TR's RD Note (no build yet).

## Next checkpoints (to record when they happen)
- Test Case review (after the review page is saved), before the first run, after the run, before each eBug (expectation gate, overlay › MyEdit).
