# Cinematic Reel Recommendation (Android) — R2 full run of approved v2 — report

Run folder `runs/2026-11-25-r2-full/` · plan `runs/RUN-PLAN-20261125-R2.md` · 2026-11-25 (REQ-007).
Build 16.9.0 (2611201), TR261123-0015 (Play internal test track) · Stage · Sony XQ-BT52 (HQ61563393, Android 12) ·
acda.test7 (Free) · credits 2424 at start and end (no photo picked, nothing generated).

## Tally (75 rows)
| Result | Count | Cases |
|---|---|---|
| Pass | 56 | every row not listed below |
| Fail | 16 | `defect` 7: TC-010 – TC-015 (DRA262611P0289), TC-071 · `question` 9: TC-025, TC-028, TC-030, TC-032, TC-040, TC-052, TC-062, TC-063, TC-074 |
| Blocked | 3 | TC-016, TC-021 (`defect`, behind DRA262611P0289), TC-019 (`observability`) |

0 Not run, 0 Inconclusive.

| Segment | Rows | Pass / Fail / Blocked | Test time |
|---|---|---|---|
| R2-a Template page | 12 | 11 / 0 / 1 | 8 m |
| R2-b Add Media 「?」 | 8 | 0 / 6 / 2 | 3 m |
| R2-c Language 1 (en, zh-Hant, zh-Hans, ja, es-ES, ko, de) | 13 | 9 / 4 / 0 | 20 m |
| R2-d Language 2 (fr, it, ru, pt-BR, nl, id, th, ms) | 16 | 15 / 1 / 0 | 25 m |
| R2-e Language 3 (hi, es-MX, ar-EG, vi, pl, tr) | 12 | 11 / 1 / 0 | 22 m |
| R2-f Language 4 (fil, fa, he, sv, da, nb, uk) | 14 | 10 / 4 / 0 | 22 m |

Total test time 1 h 41 m, no idle gap.

## R2 against R1 (v1, 21 rows, 12 / 6 / 3, same build)
- The 21 v1 rows end the same way. TC-010 – TC-015 (Fail) and TC-016 / TC-021 (Blocked) now carry the filed ticket
  DRA262611P0289 and the disposition `defect` (R1: `question`). TC-019 stays `observability` (the app logs no CMS data).
- The 54 rows new in v2: 44 Pass, 10 Fail, all in the Language section. TC-022 (pictures against the sheet's Pic Link
  pictures) passed: all 30 match.

## Findings
1. **Closing full stop (TC-025, TC-028, TC-030, TC-032, TC-040, TC-052, TC-062, TC-074; `question`).** The app ends
   every card description with a full stop; the Cinestory CMS sheet lacks it on 14 strings: zh-Hans card 4, es-ES
   card 6, ko cards 2–4, de cards 2 and 6, pt-BR card 3, es-MX card 2, fil card 3, uk cards 2 and 4. Nothing else
   differs. Filed DRA262611P0316 (ISS-CRA-03, PC-Doc, S3).
2. **Arabic, Persian, Hebrew layout (observation; rows passed on text).** On the sheet each heading word sits at the
   right edge while its coloured bar stays at the left; card text is left-aligned. Filed DRA262611P0317 (ISS-CRA-04, RD, S3).
3. **Danish caption broken inside a word (TC-071, `defect`).** Fast Cut's 「Bevægelsesfornemmelse」 is drawn
   「Bevægelsesfornemmels」 with a lone 「e」 on the next line. Filed DRA262611P0318 (ISS-CRA-05, RD, S3).
4. **Filipino sheet half translated (TC-063, `question`).** The CMS serves Filipino names and captions, but the
   headings 「Recommendation」 / 「Avoid」, 「Got it」 and 「Import a photo」 are English: the APK has no Filipino app
   strings (its 「tl」 set is 240 library strings). Filed DRA262611P0319 (ISS-CRA-06, PC-Doc, S3).
5. **Turkish heading 「öneri」 in lower case (observation, TC-061 passed).** 「Kaçının」 and every other language's
   heading are capitalised. Filed DRA262611P0320 (ISS-CRA-07, PC-Doc, S3).

Already filed on Android and left off the drafts (`dedupe.txt`): DRA262611P0289 (no 「?」 in Add Media), DRA262611P0290
(chip and sentence stay English; seen in every language of this run, recorded only).

## Language tags used
The phone is Android 12, so the app language is the system locale. es-419 ran as es-MX (the APK carries es-r419 /
es-rMX / es-rUS; the Latin American strings showed), Arabic as ar-EG, Filipino as fil-PH (APK 「tl」), Hebrew as he-IL
(APK 「iw」), Norwegian as nb-NO. No language fell back to English except Filipino's app strings.

## eBugs
`android/ebugs/2026-11-25/`: drafts `20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0.md`, review page
`20261125_eBug_review_Cinematic-Reel-Recommendation-R2_16.9.0.html` (5 cards; format check 0 errors, 10 warnings;
dedupe over 75 Android tickets, no same-OS match). Filed 2026-11-26 on TR261123-0015 by the user's decisions (`decisions.md`, `filed_bugcodes.json`):
DRA262611P0316 – DRA262611P0320, screenshots uploaded and read back. The three translation entries went to PC-Doc
(user, 2026-11-26), not PM. OS Language is still to be set on each ticket's web form.

## Not done
- Coverage page: `coverage-page.ts` stops because `specs/2026-11-25/extracted/inventory.json` is missing (the
  sheets-only spec set has no Figma inventory).
- Knowledge step skipped: inbox empty, no observation names an entry.

## Time, tokens, usage
- Test time 1 h 41 m (14:42 – 16:28 local, six segments).
- Tokens (`tokens.jsonl` at wrap-up): 219 messages, output 147,830, cache read 29.95 M, cache write 0.94 M.
- Account usage card (shared Team seat, 6.25× Pro): 5-hour 2 % → 50 %, weekly 30 % → 38 % over the run.

## Housekeeping
Older run media moved to the Trash (`~/.Trash/run-media-prune-20261125/pdr-spec-casebook/`): 76 files, 445 MiB, from
`runs/2026-11-24-r1-full` (74 screenshots, 2 logcat files over 1 MiB).
