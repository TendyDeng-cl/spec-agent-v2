# Knowledge Center — myedit-biz/video-editor-pip-adjust (web), draft 20261127-131702

Standing input 7 (analysis.md), done the Contract Runner way (myedit-qa-knowledge): each source is marked by its
authority. Only an approved spec or a person's decision sets an expected result; code-derived documents and search
summaries are context. Connection: cl-knowledge-center-myedit-biz (📌 MyEdit Biz), every reply checked; the MyEdit
connection was not used.

| Source | Authority | Used for |
|---|---|---|
| [features/video-editor-main-video-adjust.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/features/video-editor-main-video-adjust.md) | PM spec, ready_for_rd, 2026-11-25 (Christine Lin), MB-426; Design ready (UJ) | R-001, R-002, R-006, R-008 – R-042 |
| [features/video-editor-photo-pip-adjust.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/features/video-editor-photo-pip-adjust.md) | PM spec, ready_for_rd, 2026-11-25, MB-427; Design ready (UJ) | R-003, R-005, R-007, R-021 – R-042 |
| [features/video-editor-photo-pip-mask.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/features/video-editor-photo-pip-mask.md) | PM spec, ready_for_rd, 2026-11-25, MB-428; Design pending | R-004, R-043 – R-063, R-087, R-090 – R-094 |
| [features/video-editor-photo-pip-crop-rotate.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/features/video-editor-photo-pip-crop-rotate.md) | PM spec, ready_for_rd, 2026-11-11, MB-394; Design pending (due 2026-11-27) | R-004, R-064 – R-086, R-087, R-091 – R-093 |
| [meetings/2026-03-04.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/meetings/2026-03-04.md) | weekly meeting decision (Corner + Mask together) | R-056 |
| Spec change logs (get_spec_change_log, all four) | record of PM edits | no change after the read dates; Crop & Rotate default Custom confirmed 2026-11-11 |
| [product-rules/derived-photo-editor-mask.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-photo-editor-mask.md) | code-derived by schedule, 「未經人確認」 | context: Photo Editor Mask list (None + 52, two columns), 「Apply」, Mask/Crop replace each other (Q-8) |
| [product-rules/derived-photo-editor-crop-rotate.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-photo-editor-crop-rotate.md) | code-derived, 「未經人確認」 | context: Rotate -180 – 180 (TC-084 records), ratio order in Photo Editor code (5:4 before 4:5; the spec order wins), Video Editor has no Crop/Rotate yet |
| [product-rules/derived-photo-editor-element-toolbar.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-photo-editor-element-toolbar.md) › Adjust Panel, Stated Limits | code-derived, 「未經人確認」 | context: Photo Editor 8 sliders, Biz's current PiP toolbar (Corner, Cutout, Split, Fade In, Fade Out, Order, Delete; matches the Biz Design, Q-1), Cutout Biz Pro only (fixtures, TC-116) |
| [product-rules/derived-video-editor-workspace.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/product-rules/derived-video-editor-workspace.md) › Save And Export (search result) | code-derived | context: auto cloud save, export MP4 file name (fixtures) |
| [tech-guides/derived-video-editor-workspace.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit-biz/tech-guides/derived-video-editor-workspace.md) (search result) | code-derived | context: missing-file clips drawn grey (TC-048 fixture) |
| list_questions (specPath crop-rotate, mask) | question queue | 0 questions linked to either spec |
| list_ebugs (scope all, open) | agent-registered eBugs only | 0 open (not proof of no ECL tickets) |

Not settled by the Knowledge Center: Q-1 – Q-13 (requirements.md). No question was sent to PM (ask_question only when the user asks).
