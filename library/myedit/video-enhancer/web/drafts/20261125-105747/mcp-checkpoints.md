# MCP checkpoints — myedit/video-enhancer (web)

Append-only audit (Contract Runner myedit-qa-knowledge format). Records only calls actually made.

## 2026-11-25 (Asia/Taipei) · Test Case creation · draft 20261125-105747
- Agent: Claude Code session (spec-casebook). Product: MyEdit. Connection: cl-knowledge-center-myedit. Env: demo (build MyEdit-5.11.0-11242029 read from version.json the same day); account: default test account (Studio Pro).
- Calls: get_document myedit/features/video-enhancer-v2.md (ok, ready_for_rd 2026-11-24); get_spec_change_log (ok, 10 entries); get_document myedit/credit-actions/videoenhancev2.md (ok, stage 2026-11-10); search_knowledge 「Image Enhancer credits cost and output resolution」 (ok, context only); search_knowledge 「Video Enhancer V2 測試案例：上傳流程、Trimmer、Recent Gen、生成完成後行為、失敗退點」 (ok, 8 results); search_knowledge 「影片工具共用規則：Trim Video、Replace Video、Recent Gen 卡片、生成失敗退還點數、My Library 影片資料夾」 (ok, 8 results, mostly other tools); list_ebugs scope all open (ok, 0).
- Returned project: MyEdit on every reply.
- Result: R-068, R-069 (RD answer) and R-070 – R-077 (code-derived) added; Q-2 narrowed, Q-9 and Q-10 added.
- Status: resolved for authoring. Unresolved: Q-1, Q-2, Q-10; code-derived rules unconfirmed (Q-9). Not checked: production rates; ECL tickets outside the agent registry.

## Next checkpoints (to record when they happen)
- Test Case review (after the review page is saved), before the first run, after the run, before each eBug (expectation gate, overlay › MyEdit).
