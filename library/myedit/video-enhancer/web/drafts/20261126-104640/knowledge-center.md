# Knowledge Center — myedit/video-enhancer (web), draft 20261125-105747

Standing input 7 (analysis.md), done the Contract Runner way (myedit-qa-knowledge): each source is marked by its
authority. Only an approved spec or a person's decision sets an expected result; code-derived documents and search
summaries are context (their rows record behaviour, Q-9). Connection: cl-knowledge-center-myedit (📌 MyEdit), every reply checked.

| Source | Authority | Used for |
|---|---|---|
| [features/video-enhancer-v2.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/features/video-enhancer-v2.md) | PM spec, ready_for_rd, 2026-11-24 (Erin Chiu) with 23 answered questions | most requirements (R-001 – R-067) |
| Spec change log (get_spec_change_log, 10 newest) | record of PM edits to 2026-11-24 | newest rules (Trimmer on over-8:00 upload, no free trial, Back button) |
| [credit-actions/videoenhancev2.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/credit-actions/videoenhancev2.md) | stage Action ID API, synced daily (2026-11-10) | per-second rates R-032 (stage only: not production, Q-5) |
| [product-rules/derived-video-enhancer-v2-settings.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-video-enhancer-v2-settings.md) › Credit Deduction and Cancel | RD answer #dfed049fda18 (merged) | R-068, R-069, Q-10 |
| same document, other sections | code-derived by schedule, 「未經人確認」 | R-033 (price tiers), R-035, R-070 – R-077 (Q-9) |
| [tech-guides/derived-video-enhancer-v2-tool.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/tech-guides/derived-video-enhancer-v2-tool.md) | code-derived | context only (mobile layout below 1201 px, GA, purchase params) |
| list_ebugs (scope all, open) | registry of eBugs handed to agents | 0 open: covers only agent-registered tickets, not every ECL bug |

Not settled by the Knowledge Center: upload error timing (Q-1), Open in Editor place (Q-2), processing cancel (Q-10).

## Added 2026-11-26 (draft 20261126-104640, REQ-008)
| Source | Authority | Says | Used for |
|---|---|---|---|
| [myedit/product-rules/derived-hd-video-converter-landing-page.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-hd-video-converter-landing-page.md) | website-derived, not confirmed | The HD Video Converter landing page claims MP4/MOV, 30 min, 1.8 GB | Q-13 (TC-151 expects the PM spec's 8 min / 10 GB) |
| [myedit/product-rules/derived-ai-frame-interpolation-landing-page.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-ai-frame-interpolation-landing-page.md) | website-derived, not confirmed | The AI Frame Interpolation landing page claims MP4/MOV, 3 min, 1.8 GB | Q-13 (TC-152) |
| [myedit/product-rules/derived-tool-header-credit-and-upgrade-buttons.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-tool-header-credit-and-upgrade-buttons.md) | code-derived, 未經人確認 | A credit tool shows Get Credits on its edit screen, not on its import page | R-094, TC-138, Q-15 |
| [myedit/product-rules/derived-cloud-storage-warnings-and-video-download-limit.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-cloud-storage-warnings-and-video-download-limit.md) | code-derived, 未經人確認 | Storage-full prompt 「You’ve reached your cloud storage limit.」: Upgrade while a higher cloud plan exists, Manage (opens My Library) on Studio Pro; long tasks such as Video Enhancer keep a Generate Anyway result 24 hours | R-104, R-109, TC-147, TC-153, Q-16 |
| [myedit/product-rules/derived-video-enhancer-v2-settings.md](https://rdccwebengine.clt.gocyberlink.com/doc/myedit/product-rules/derived-video-enhancer-v2-settings.md) › Credits | code-derived | Line under Enhance 「Enhance {seconds, 2 decimals} seconds ({rate} credits/sec)」; no singular form stated | Q-14 |
| Question #ae8127264e43 (2026-11-26, waiting) | open question | Seconds under Enhance may become whole seconds | Q-17 |
