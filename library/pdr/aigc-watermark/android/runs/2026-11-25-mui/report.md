# AIGC Watermark Android — MUI phase report (table v4, TC-130 – TC-156)
- Build 16.9.0 (2611201), Stage (yellow bar). Phone Sony XQ-BT52 / Android 12 (HQ61563393). Account acda.test7@gmail.com
  (Google button), Free, 2424 credits from start to end (nothing charged). Table v4, draft 20261125-160000, phase MUI
  (REQ-011 / REQ-012; run asked as REQ-016). 2026-11-25 11:46–12:31Z (19:46–20:31 local). Nothing filed or committed.

## Final tally
**26 Pass, 1 Fail (TC-130, defect, both findings on existing Android tickets), 0 Blocked, 0 Not run.**

| Segment | Rows | Pass | Fail | Notes |
|---|---|---|---|---|
| MUI-apk (APK strings, no phone) | TC-130 | 0 | 1 | music body absent (P0229); NLD/ARA apostrophe (P0286); TD-1 – TD-8 |
| MUI-CHT … MUI-KOR | TC-131 – TC-135 | 5 | 0 | TD-9; O-1 – O-3 |
| MUI-DEU … MUI-PTB | TC-136 – TC-140 | 5 | 0 | O-4 |
| MUI-NLD … MUI-ESM | TC-141 – TC-146 | 6 | 0 | TD-10, TD-11; O-5 – O-7 |
| MUI-ARA … MUI-HEB | TC-147 – TC-152 | 6 | 0 | TD-12, TD-13; O-8 – O-11 |
| MUI-SVE … MUI-UKR | TC-153 – TC-156 | 4 | 0 | O-12 – O-14 |

Each walk: Menu › Settings row 「Remove AIGC Watermark」 with ⓘ and switch, the ⓘ info sheet and 「Got it」, the editor's
export dialog on 「Project 11-25」 (an Image to Video result opened in Full Editor, 0 credits) ended with 「Cancel」.
Nothing generated or exported. Steps 5–8 (AI Music Generator dialog) were not walked in any language: Android shows no
music dialog (DRA262611P0229) and 「Generate」 would charge.

**Last segment (SVE, DAN, NOR, UKR):** every string whole, nothing clipped or overlapping. UKR has the longest Settings
row of the run (118–822 px, ⓘ about 25 px from the switch, O-12) and the longest checkbox (「Не показувати знову」
97–609 px); SVE, DAN, NOR fit easily. No new translation doubts.

## Fail details (cited, not drafted)
| Row | Finding | eBug |
|---|---|---|
| TC-130 | The music dialog body 「Your generated music will include an AIGC watermark…」 is in no language of the 2611201 APK | DRA262611P0229 (NewCreated, PM) |
| TC-130 | Export dialog 「Don't show again」 shows a stray apostrophe in NLD 「Niet' meer weergeven」 and ARA 「لا' تظهر مرة أخرى」 (key dont_show_message_again, on screen TC-141 / TC-147); TRK correct here (TC-150) | DRA262611P0286 (NewCreated, PC-Doc) |

## Translation doubts (`mui-doubts.md`, your call on the review page)
14: TD-1 ITA 「Filigrana AI」 drops AIGC; TD-2 NLD u/je; TD-3 IND 「watermark」 in English; TD-4 VIT 「dấu chìm」 and
case; TD-5 KOR 「알았음」; TD-6 HEB 「אל להציג שוב」; TD-7 PLK 「Eksport」 noun button; TD-8 ITA 「Fatto」; TD-9 ESP
Quitar/Eliminar; TD-10 MAY Alih keluar/Keluarkan; TD-11 HIN एक्सपोर्ट/निर्यात; TD-12 FAR خروجی noun button; TD-13 HEB
הסר/הסרת; TD-14 ARA/FAR/HEB layout not mirrored (from O-8, app-wide; same question as Video Enhance TD-W9).

## Observations (`observations.md`, O-1 … O-14)
Line-break nits (O-1 JPN, O-2 KOR, O-4/O-5/O-9 menu path split, O-6 THA), RTL layout (O-8, now TD-14), other features'
Menu strings (O-11 VIT, O-14 SVE/DAN/UKR), UKR's tight ⓘ (O-12), run mechanics (O-3, O-7, O-13 lost taps; O-10
Android's Internet panel). None drafted (drafts › Not raised).

## Open questions
The MUI rows assert only R-057 / R-058 (no Q-id). Questions their steps touch:
- **Q-20 / Q-6** (music dialog): filed, DRA262611P0229; still no dialog body on 2611201 (TC-130). Unchanged.
- **Q-8** (shared 「Don't show again」): not reached; the music dialog does not exist, so the MUI walks could not touch it.
Every other question (Q-1 – Q-4, Q-7, Q-9 – Q-14, Q-16, Q-17, Q-19) is outside this phase and keeps its R3 status in
`question-status.json`; nothing new to settle. No question was opened by this run.

## Coverage
No coverage page built: the MUI rows press only controls the R3 rows already cover (ⓘ, 「Got it」, 「Export」,
「Cancel」), so a MUI coverage page would add nothing.

## Credits
2424 at every segment (logcat totalRemain 19:56, 20:03, 20:11, 20:20, 20:30). Nothing charged.

## Time and tokens
- `run-log.ts time`: wall 44 m (11:46:49–12:31:02Z), test 44 m, idle 0.
- Tokens (`token-usage.ts --since 11:42Z`, the 7 transcripts naming the run, through the last walk and part of this
  wrap-up): 264 messages, input 586, cache write 827 k, cache read 32.6 M, output 139 k. Usage-card percentages:
  Progress page and `runs/usage.jsonl` (read by the orchestrator).

## eBug drafts: 0 entries (`ebugs/2026-11-25-mui/`)
- Drafts `20261125_eBug_drafts_AIGC-Watermark-MUI_16.9.0.md`: Already filed (2), Not raised (5), Translation doubts
  (14), full row map. Format check 0 errors (`check.txt`). Review page
  `20261125_eBug_review_AIGC-Watermark-MUI_16.9.0.html` (TR261123-0015 prefilled, confirm).
- Dedupe (Android pool by hand: 「AIGC」, 「AIGC Watermark」, 「Watermark」, 「Don't show again」, 「MUI」): P0229 and P0286
  cover TC-130; no ticket covers any doubt (`dedupe.txt`).

## Media
Not trimmed: an MUI run is not a full run, so the R3 full run keeps its media (AGENTS.md *Local run media*).

## Phone left
PowerDirector on the Launcher in English (system locale en-US, `locale status` read back), Stage, acda.test7 signed in,
「Remove AIGC Watermark」 Off, export 「Don't show again」 unticked, 「Project 11-25」 kept. logcat capture running; two
Appium servers (4724, 4725) left alone.
