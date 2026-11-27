# Recent task pages

## KF-001 Recent task card size on the Sony
- kind: fact · platform: android · use: run · tags: recent, card, model-tag, layout, font-scale
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-6 (inbox I-025); Q-4 not reached · verified: 16.9.0 build 2611251 (2026-11-26)

At 460 dpi a Recent task card is 345 px (120 dp) high and the model tag `tv_model` 58 px (20 dp), min width 173 px. At
font scale 1.3 and display size 540 dpi the cards grow only to 361 px, and the longest tag 「Gemini Omni Flash 1.1」
still fits: the 「…」 cut cannot be reached on this phone.

## KF-002 The whole Recent card opens the result
- kind: fact · platform: android · use: analysis, run, ebug · tags: recent, card, model-tag, tap-target
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-11 (inbox I-026) · verified: 16.9.0 build 2611251 (2026-11-27)

On the Image / Text to Video Recent pages (My Artwork rows and each tool's history icon) each card is one tap target:
the title, the empty area and the model tag all open the result like 「View」. R1 recorded the rows expecting an inert
tag as Fail --as question.

## KF-003 Tasks made before the server stored the model have no tag
- kind: fact · platform: android · use: analysis, run · tags: recent, model-tag, server, fixtures
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-2, TC-041 (Q-2 determined) · verified: 16.9.0 build 2611251 (2026-11-27)

Tasks of 2026-11-24 (I2V Custom 1–2, T2V Custom 1) show no tag line, no empty line and the same 120 dp card; tasks
made on 2026-11-26 (on 2611201) show theirs, so the server stores the model per task since then. Use those old tasks
for the no-model rows. Image to Video template tasks (Ghost Step, Breakthrough) carry no tag either (Q-3).

## KF-004 Edit mode on the video Recent pages
- kind: fact · platform: android · use: analysis, run, ebug · tags: recent, edit-mode, navigation
- source: Recent Task Model Info Android run 2026-11-26-r1-full O-7, O-22, TC-035, TC-045 (inbox I-026; Q-5) · verified: 16.9.0 build 2611251 (2026-11-27)

The Image / Text to Video Recent pages enter edit mode with 「Select」 (not 「Manage」) and offer no 「Select All」 /
「Deselect All」: same-OS ticket DRA262609-0033 (16.6.1, QA Propose Won't Fix) covers it, so it is not drafted again.
System Back in edit mode leaves the whole page instead of closing edit mode (Q-5, drafted to PM as ISS-RTM-04). Text
to Image's own history page does have Select All (KP-124).
