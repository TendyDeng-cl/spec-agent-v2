# Requests — myedit-biz/video-editor-share-url

Every request about this feature's tables or runs, from anyone (AGENTS.md › Request ledger).

| ID | Date | From | Request | Kind | Platform | Status |
|---|---|---|---|---|---|---|
| REQ-001 | 2026-11-27 | JackCY_Lee | Share URL is its own table, apart from the Video Editor PiP tools (myedit-biz/video-editor-pip-adjust). | table | web | done (draft 20261127-131008) |
| REQ-002 | 2026-11-27 | JackCY_Lee | MUI: not now. RD has not finished the strings; do not write mui.json as English only; note MUI as deferred. | table | web | done (draft 20261127-131008: no MUI section, update-plan › Not added) |
| REQ-003 | 2026-11-27 | JackCY_Lee | Environment demo (https://business-demo.myedit.online). Test accounts are shared between MyEdit and MyEdit Biz (web-account.ts list): jackcy (default, cloud with room; plan to verify), free, storage-full, premium (Pro storage-full case), studio-pro-full. Map the roles in web/fixtures.md; purchases only through the repo's test-purchase rules, else the Free→Pro row is Blocked / needs the user. | run | web | done (web/fixtures.md; TC-040 parked) |
| REQ-004 | 2026-11-27 | JackCY_Lee | Put in Open questions, with an assumption: the Share text says 「Premium users can copy and edit the project」 while Biz plans are Free / Pro. | table | web | done (Q-1) |
| REQ-005 | 2026-11-27 | JackCY_Lee | Scope: Biz Kanban 「Video Editor: Share URL」 (MB-387, RD Kevin, clone from MyEdit) for the December release, TR261124-0031 (build not known yet). From MB-451 What's New, only a row for the Video Share URL card if a source states its content, else list it under Not added. | table | web | done (Q-11; What's New not added: no content stated) |
| REQ-006 | 2026-11-27 | JackCY_Lee | The Biz Pro test account with cloud space is `jackcy` (JackCY_Lee@cyberlink.com, port 9345): it is Pro receiver C (copies P2, owned by `free`) as well as sharer A. Checked on business-demo 2026-11-27 (Launcher account menu): Pro Plan, Active, 3440 credits, Biz cloud 31.7 / 50 GB. | run | web | done (web/fixtures.md, phases.json: TC-041 – TC-047 no longer unavailable) |
| REQ-007 | 2026-11-27 | JackCY_Lee | MyEdit Biz demo has no test purchase: TC-040 (Free subscribes in the sales popup, then copies again) cannot be run and is recorded Blocked `--as test-data` ("No test purchase on MyEdit Biz demo"). | run | web | done (phases.json unavailable › purchase, web/fixtures.md) |
| REQ-008 | 2026-11-27 | JackCY_Lee | TC-040 (Free subscribes in the sales popup, then copies) is tested by hand by the user; the agent leaves it out of runs and records the user's result. | run | web | done (TC-040 Precondition and Notes, phases.json needs › manual-user, web/fixtures.md) |
