# Run plan — AIGC Watermark Android, MUI phase (2026-11-25)

Table: approved v4 (`library/pdr/aigc-watermark/android/cases.csv`, 154 rows), phase `MUI` of
`drafts/20261125-160000/phases.json` (REQ-011 / REQ-012; run asked by the user 2026-11-25: "run the MUI cases on AIGC
cases", REQ-016). Run folder: `runs/2026-11-25-mui/`. MUI is its own phase, never part of a full run
(`.claude/skills/spec-casebook/references/mui.md`). Nothing is filed: filing waits for the user.

Rules: `.claude/skills/spec-casebook/SKILL.md`, `references/run.md`, `references/run-android.md`, `references/mui.md`;
AGENTS.md team preferences; `../fixtures.md`. Orchestrator: the chat the user started the run in; every segment is a
subagent; no questions between segments.

## Setup
- Phone: Sony XQ-BT52, adb serial HQ61563393 (pinned in the run folder's `.serial`), Android 12. Stage server expected
  (yellow bar); check at the first phone segment.
- Build: installed 16.9.0 (2611201). APK for TC-130: `~/.casebook/android/apks/2611201/` (zip
  `CL_Deluxe.16.9.0.2611201_DRA261109-01_R6.zip`; unpack into that folder if no `.apk` is there yet).
- Account: the phone's Google account by its button (acda.test7 on the Sony, fixtures.md); Free or Pro both fine;
  at least 6 credits. Never type a password; Play test subscription only on a test-card sheet.
- Languages: `library/pdr/product.json` › `mui` (26 tags, ENU base). No translation sheet: translations judged by the
  run, doubts in `mui-doubts.md` (TD-n), not fails.
- Walk needs: 「Remove AIGC Watermark」 Off; neither 「Don’t show again」 ticked (export dialog / music dialog); a project
  with AI Anime content (TC-084). If none exists on this phone, the first phone segment makes one AI Anime image
  (cheapest path) and records its credits. Nothing else generated or exported: dialogs end in 「Cancel」. Music dialog
  is known absent on Android (DRA262611P0229): record and go on.
- Each language ends with a plain `launch` / `locale reset`.

## Segments
| Segment | Cases | Status |
|---|---|---|
| MUI-apk | TC-130 | done 2026-11-25: Fail (music body absent, P0229; NLD/ARA apostrophe, P0286), 8 doubts |
| MUI-CHT … MUI-KOR | TC-131 – TC-135 | done 2026-11-25: 5 Pass; TD-9; O-1…O-3 (line-break nits JPN/KOR) |
| MUI-DEU … MUI-PTB | TC-136 – TC-140 | done 2026-11-25: 5 Pass; no new doubts; O-4 (ITA path line break) |
| MUI-NLD … MUI-ESM | TC-141 – TC-146 | done 2026-11-25: 6 Pass; TD-10, TD-11; O-5…O-7; NLD checkbox = dont_show_message_again |
| MUI-ARA … MUI-HEB | TC-147 – TC-152 | done 2026-11-25: 6 Pass; TD-12, TD-13; O-8…O-11 (RTL layout not mirrored); ARA apostrophe on screen, TRK none |
| MUI-SVE … MUI-UKR | TC-153 – TC-156 | done 2026-11-25: 4 Pass; no new doubts (TD-14 RTL added at wrap-up from O-8); O-12…O-14; phase wrap-up done |

## Log
- 2026-11-25 MUI-apk (TC-130, no phone): Fail. 5 AIGC strings + shared dialog strings × 26 from the 2611201 APK; music dialog body not in the APK (DRA262611P0229 cited); NLD/ARA 「Don't show again」 stray apostrophe (DRA262611P0286 cited; TRK if the dialog uses ai_video_anime_checkbox); doubts TD-1…TD-8 (mui-doubts.md). Fixed scripts/mui-strings.ts dropping multi-line strings (export body was missed; VE's read missed 3). Walks: record which Don't-show-again key the export dialog uses.
- 2026-11-25 MUI-CHT…MUI-KOR (TC-131–135, Sony, 2611201 Stage, acda.test7 Free, 2424 credits unchanged): 5 Pass, nothing truncated or overlapping. Switch was On, set Off. Export dialog reached on 「Project 11-25」, made at 0 credits from the existing Image to Video result (Full Editor); no AI Anime item generated. Music steps not walked (P0229; Generate charges). Don't show again: values identical in both keys for these five; NLD/TRK walks settle the key. New doubt TD-9 (ESP Quitar/Eliminar); O-1 JPN 「ー」 at line start, O-2 KOR mid-word wrapping (layout nits); O-3 lost Export tap while the editor loaded (recipe waits now). Recipe `recipes/mui-walk.steps <ID> <code> "<localized Remove AIGC Watermark>"`, then `locale reset`.
- 2026-11-25 MUI-DEU…MUI-PTB (TC-136–140, Sony, 2611201 Stage, acda.test7 Free, 2424 credits unchanged): 5 Pass, nothing truncated or overlapping. Export dialog on 「Project 11-25」, Cancel each time; music steps not walked (P0229). Longest: DEU Settings row (118–819 px, one line with ⓘ and switch), DEU info body (six lines), ITA checkbox 「Non mostrare più il messaggio」. No new doubts (ITA TD-1/TD-8 confirmed on screen); O-4 ITA export body breaks after 「Menu >」 (layout nit). Logs: logs/MUI-DEU-PTB-20261125-200359.
- 2026-11-25 MUI-NLD…MUI-ESM (TC-141–146, Sony, 2611201 Stage, acda.test7 Free, 2424 credits unchanged): 6 Pass, nothing truncated, clipped or overlapping (THA/HIN glyphs checked on screenshots). Export dialog on 「Project 11-25」, Cancel each time; music steps not walked (P0229). New doubts TD-10 (MAY 「Alih keluar」 vs 「Keluarkan」 for Remove), TD-11 (HIN body एक्सपोर्ट vs button निर्यात करें); O-5 IND/ESM path breaks at 「>」, O-6 THA mid-word line breaks, O-7 HIN lost Export tap once (re-walked). Logs: logs/MUI-NLD-ESM-20261125-201248.
- 2026-11-25 TC-130 evidence (from the NLD walk TC-141, verdict unchanged): the export dialog's checkbox reads 「Niet' meer weergeven」, so it uses key `dont_show_message_again` (not `ai_video_anime_checkbox` 「…tonen」), and the stray apostrophe is on screen (help_disable_tip 97–599 px; screenshots/TC-141-export.png). By the same key TRK should show 「Bir daha gösterme」 without the apostrophe; the TRK walk confirms.
- 2026-11-25 MUI-ARA…MUI-HEB (TC-147–152, Sony, 2611201 Stage, acda.test7 Free, 2424 credits unchanged): 6 Pass, nothing truncated, clipped or overlapping (Arabic, Persian, Hebrew, Vietnamese, Polish and Turkish glyphs checked on screenshots). Export dialog on 「Project 11-25」, Cancel each time; music steps not walked (P0229). RTL (ARA/FAR/HEB): text right-to-left inside labels but the app layout is not mirrored (row order, chevrons, checkbox side, Cancel left / Export right as in English; only system bars mirror), O-8, an observation for PM, not a fail. New doubts TD-12 (FAR خروجی noun on the Export button), TD-13 (HEB הסר vs הסרת in neighbouring rows); O-9 VIT/PLK path line break, O-10 SystemUI opened the Internet panel during the HEB walk (phone, not the app; Export tapped again), O-11 VIT Menu rows 「VideoĐã Xuất」 / 「VideoMẫu」 missing a space (other feature). Logs: logs/MUI-ARA-HEB-20261125-202127.
- 2026-11-25 TC-130 evidence (from the ARA and TRK walks, verdict unchanged): ARA's export dialog shows 「لا' تظهر مرة أخرى」 with the stray apostrophe on screen (key dont_show_message_again, help_disable_tip 97–455 px; screenshots/TC-147-export.png, P0286 cited); TRK's shows 「Bir daha gösterme」 with no apostrophe (same key; screenshots/TC-150-export.png), so TC-130's TRK condition does not apply: the TRK apostrophe sits only in ai_video_anime_checkbox, which this dialog does not use.
- 2026-11-25 MUI-SVE…MUI-UKR (TC-153–156, Sony, 2611201 Stage, acda.test7 Free, 2424 credits unchanged): 4 Pass, nothing truncated, clipped or overlapping. Export dialog on 「Project 11-25」, Cancel each time; music steps not walked (P0229). Longest: UKR Settings row 118–822 px (ⓘ ~25 px from the switch, O-12), UKR checkbox 97–609 px. No new doubts; O-13 DAN lost ☰ tap (re-walked), O-14 SVE/DAN/UKR Menu strings (other feature). Logs: logs/MUI-SVE-UKR-20261125-203055 (sliced).
- 2026-11-25 MUI phase wrap-up: **26 Pass, 1 Fail (TC-130), 0 Blocked of 27**; wall 44 min (11:46–12:31Z), tokens 264 msgs / cache-read 32.6 M / out 139 k (7 transcripts). report.md in the run folder. eBug batch `ebugs/2026-11-25-mui/`: 0 entries (TC-130 cited: DRA262611P0229, DRA262611P0286, dedupe.txt), 14 translation doubts (TD-14 = RTL layout from O-8), format check 0 errors, review page `20261125_eBug_review_AIGC-Watermark-MUI_16.9.0.html`. Questions: Q-6/Q-20 filed (P0229), Q-8 not reached (no music dialog); none other touched. No coverage page (MUI rows add no control or arrow). No media trim (MUI is not a full run). Nothing filed, nothing committed. REQ-016 done.
