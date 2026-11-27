# Knowledge Center — myedit-biz/video-editor-share-url (web), draft 20261127-131008

Standing input 7 (analysis.md), done the Contract Runner way: each source is marked by its authority. Only an approved
spec or a person's decision sets an expected result; code-derived documents (「未經人確認」) and search summaries are
context: they point at what the spec leaves unsaid (Open questions), never a row's only basis.
Connection: cl-knowledge-center-myedit-biz only; every reply said 「📌 專案：MyEdit Biz（myedit-biz）」.

| Source | Authority | Used for |
|---|---|---|
| [features/video-editor-share-project-url.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/features/video-editor-share-project-url.md) | PM spec, ready_for_rd, 2026-11-11 (Christine Lin), Jira MB-387; Design pending (UJ, due 2026-11-27); 0 linked questions | the spec file; R-001 – R-060 |
| Spec change log (get_spec_change_log) | record of PM edits | 2026-11-11: moved from MyEdit, plans → Free / Pro, mask → Biz small-screen rule, URL → `/share/{token}`, storage messages → Biz Pro / non-Pro, Podcast references written out; status → ready_for_rd |
| [product-rules/derived-my-projects-page.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-my-projects-page.md) | code-derived (Kevin Yang, 2026-11-18, unconfirmed) | confirms the four My Projects messages exist (R-013, R-049, R-055); messages auto-hide after about 3 s (not used: spec silent) |
| [product-rules/derived-small-screen-mask.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-small-screen-mask.md) | code-derived (2026-10-23), cited by the spec | 1200 px inclusive (R-056, R-057), mask texts (same as spec); Video Editor height ≤ 550 px (Q-5, no row) |
| [product-rules/derived-cloud-storage.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-cloud-storage.md) | code-derived (2026-11-26, written for MB-387, unconfirmed), cited by the spec | storage-full messages (same as spec, R-046 – R-048); Manage → 「the category's My Projects」 (Q-7); share panel 「Processing...」 state (Q-10); copy naming `(1)`, `(2)` (Q-9) |
| [product-rules/derived-subscription-plans.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-subscription-plans.md) | code-derived (2026-11-18), cited by the spec | Biz plans are Free and Pro only; subscribed button 「Premium Access」 (Q-1); purchase opens in a new tab with a waiting dialog (context for TC-040) |
| [product-rules/derived-photo-editor-project-and-export.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-photo-editor-project-and-export.md) › Shared Project Page | code-derived (2026-11-26, for MB-387, unconfirmed) | the Biz Photo Editor share page (owner goes to own project; non-Pro gets 「Unlock Premium」): the pattern the spec says the URL follows (R-006); its copy-failure behaviour is for Photo Editor only (Q-9) |
| [product-rules/derived-my-uploads-and-project-preview.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-my-uploads-and-project-preview.md) (search) | code-derived | card menu order Duplicate, Share, Rename, Delete (same as spec, R-012) |
| [product-rules/derived-global-popup-dialogs.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-global-popup-dialogs.md) (search) | code-derived | the upgrade limitation dialog always has a close button (Q-12); What's New cards today: AI Marketing Video, Product Beautifier, Business Agent, Batch Editor — no Video Share URL card (Q-11) |
| [product-rules/dashboard/v1-12.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/dashboard/v1-12.md) (search) | product board | MB-451 What's New (Christine / Rock) lists 「Video Share URL」, no content (Q-11) |
| [tech-guides/derived-video-export-output.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/tech-guides/derived-video-export-output.md) (search) | code-derived | Video Editor download file `myedit_business_<name>.mp4`, 30 fps (context for TC-006: recorded, not judged) |
| list_questions (specPath) | question inbox | 0 questions linked to the spec |
| list_ebugs (all, open) | agent-registered tickets only | 0 (not proof of none) |
