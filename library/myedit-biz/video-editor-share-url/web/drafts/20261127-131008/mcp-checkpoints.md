# MCP checkpoints — myedit-biz/video-editor-share-url (web)

Append-only audit (Contract Runner myedit-qa-knowledge format). Records only calls actually made.

## 2026-11-27 (Asia/Taipei) · Test Case creation · draft 20261127-131008
- Agent: Claude Code subagent (spec-casebook). Product: MyEdit Biz. Connection: cl-knowledge-center-myedit-biz. Env: demo (https://business-demo.myedit.online); build not known yet (TR261124-0031); no site run.
- Calls: get_document myedit-biz/features/video-editor-share-project-url.md (ok, ready_for_rd 2026-11-11, Design pending); get_document product-rules/derived-my-projects-page.md, derived-small-screen-mask.md, derived-cloud-storage.md, derived-subscription-plans.md, derived-photo-editor-project-and-export.md (ok); get_spec_change_log (ok, 2 entries, 2026-11-11); list_questions specPath (ok, 0); list_ebugs scope all open (ok, 0); search_knowledge ×4: share URL / read-only view / Create Copy (ok, 8); Limitation popup / sales popup (ok, 8); What's New Video Share URL (ok, 8: MB-451 listed, no card content); Video Editor project open / Export / mp4 (ok, 8).
- Returned project: MyEdit Biz on every reply.
- Result: R-001 – R-060 from the spec; code-derived rules used only as context (Q-5, Q-7, Q-9, Q-10, Q-12); Q-11 (What's New content).
- Status: resolved for authoring. Unresolved: Q-1 – Q-12. Not checked: production; ECL tickets outside the agent registry; the Biz Design (not drawn yet).
- Figma (not KC): figma-pm (qa1, whoami ok): 1 use_figma describe call, 1 use_figma text dump, 5 get_screenshot = 7 file calls + whoami. figma-design: none (no Biz Design; MyEdit Design not a source).

## Next checkpoints (to record when they happen)
- Test Case review, before and after the run, before each eBug: fresh stage-specific searches (analysis.md standing input 7).
