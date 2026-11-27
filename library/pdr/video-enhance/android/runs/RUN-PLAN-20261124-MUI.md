# Run plan — Video Enhance Android, MUI phase (2026-11-24)

Table: approved v11 (`library/pdr/video-enhance/android/cases.csv`), phase `MUI` of
`drafts/20261124-150000/phases.json` (REQ-041). Run folder: `runs/2026-11-24-mui/`. MUI is its own phase, never part
of a full run (references/mui.md).

## Setup
- Phone: Samsung SM-A5360 (R5CTB22S05Y). PowerDirector 16.9.0 **2611201** from the Google Play internal test
  (user, 2026-11-24: the TR build 2611231 could not sign in, Google 403 APP_UNRECOGNIZED). Play first gave 16.8.2
  (2611192); uninstalled and installed again as the user said → 2611201. Stage server (yellow bar).
- Account: cltqauiap2@gmail.com, signed in with the Google icon; Pro by a Google Play test subscription (yearly, 「Test
  card, always approves」); 30,742 credits.
- Strings: build 2611201's APK (`~/.casebook/android/apks/2611201-play/base.apk`) has the same 65 Video Enhance strings in
  all 26 languages as 2611231's (compared 2026-11-24), so TC-321's APK result stands for both.

## Segments
| Segment | Cases | Status |
|---|---|---|
| MUI-apk | TC-321 | done: Fail (43 fails, 81 doubts; 8 fails and 14 doubts from the 2026-11-26 top-up) |
| MUI-CHT … MUI-UKR | TC-322 – TC-347, one language each | in batches of five languages per segment agent |

## Log
- 2026-11-24 MUI-apk: TC-321 Fail (mui/review-asia.md, mui/review-europe.md, mui-doubts.md).
- 2026-11-24 MUI-CHT: TC-322 Pass (no truncation; offline toast not shown, TC-100; Result/Save/error dialog skipped, no tasks; 34 credits).
- 2026-11-24 MUI-CHS: TC-323 Pass (no truncation; TD-W1 Launcher shortcut 視 in CHS; 34 credits).
- 2026-11-24 MUI-JPN: TC-324 Pass (no truncation; 34 credits).
- 2026-11-24 MUI-ESP: TC-325 Pass (no truncation; TD-W2 editor 「Tools de audio」; 34 credits).
- 2026-11-24 MUI-KOR: TC-326 Pass (no truncation; 34 credits). Batch CHT–KOR used 170 credits.
- 2026-11-24 Fixture: one completed task (AI Video Enhance 1124, 0:11, 22 credits; upload ~13 min, done ~17 min after the tap).
- 2026-11-24 MUI-DEU: TC-327 Fail (panel title 「Video optimieren mit…」 truncated; time bubble over 「Ausgewählte」 descender; TD-W3; 20 credits).
- 2026-11-24 MUI-FRA: TC-328 Fail (time bubble over 「Longueur」 descender only; 22 credits).
- 2026-11-24 MUI-ITA: TC-329 Pass (no VE truncation; TD-W4 Launcher Cinematic Reel label cut, other feature; 22 credits).
- 2026-11-24 MUI-RUS: TC-330 Fail (fps chips 「кадров/сек」 wrap to 2 lines and grow, 「сек」 hidden under Enhance; TD-W5–W7; 22 credits).
- 2026-11-24 MUI-PTB: TC-331 Fail (panel title 「Otimizador de vídeo …」 truncated; time bubble over 「Comprimento」 descender; 20 credits). Batch DEU–PTB used 106 credits plus 22 for the fixture.
- 2026-11-24 MUI-NLD: TC-332 Fail (panel title 「Video verbeteren me…」 truncated; 「Niet' meer tonen」 on the Demo page; hint and 「Probeer & Enhance」 not shown; 22 credits).
- 2026-11-24 MUI-IND: TC-333 Pass (no truncation; time bubble over 「Panjang」 descenders, note; toolbar 「Sempurnaka / n」 mid-word wrap, TD-W8; hint not shown; 22 credits).
- 2026-11-24 MUI-THA: TC-334 Fail (panel title truncated; fps chips wrap and grow; clip toolbar label loses 「AI」; hint not shown; 22 credits).
- 2026-11-24 MUI-MAY: TC-335 Pass (no truncation; time bubble over 「Panjang」 descenders, note; hint not shown; 22 credits).
- 2026-11-24 MUI-HIN: TC-336 Pass (no truncation; hint not shown; 22 credits).
- 2026-11-24 MUI-ESM: TC-337 Pass (no truncation; upload dialog subtitle without side padding, note; hint not shown; 22 credits). Batch NLD–ESM used 132 credits.
- 2026-11-24 MUI-ARA: TC-338 Fail (panel title 「تحسين الفيديو بالذكاء الا…」 truncated; Demo 「لا تظهر مرة أخرى'」 apostrophe on screen; Demo/panel not mirrored, TD-W9; mixed digits, TD-W10; 20 credits).
- 2026-11-24 MUI-VIT: TC-339 Pass (no truncation; garbled 「Đang Tải VideoLên」 / generating subtitle not shown on the walk; TD-W11 editor toolbar; 22 credits).
- 2026-11-24 MUI-PLK: TC-340 Pass (no truncation; time bubble over 「Wybrana」 y, note; hint not shown; TD-W12; 20 credits).
- 2026-11-24 MUI-TRK: TC-341 Pass (no truncation; Demo 「Bir daha gösterme'」 apostrophe on screen; 「& Enhance」 not shown; 48 credits, trim stopped at 00:23).
- 2026-11-24 MUI-FAR: TC-342 Pass (no truncation; Demo/panel not mirrored as ARA, TD-W9; hint not shown; 22 credits).
- 2026-11-24 MUI-HEB: TC-343 Pass (no truncation; he-IL took directly; Demo/panel not mirrored, TD-W9; hint not shown; 22 credits). Batch ARA–HEB used 154 credits.
- 2026-11-24 MUI-SVE: TC-344 Pass (no truncation; Launcher and clip toolbar labels break mid-word, shown in full, note; hint not shown; 22 credits).
- 2026-11-24 MUI-DAN: TC-345 Pass (no truncation; time bubble on 「Valgt」 g, note; hint not shown; 48 credits, trim stopped at 00:23).
- 2026-11-24 MUI-NOR: TC-346 Pass (no truncation; time bubble on 「Valgt」 g, note; hint not shown; 48 credits, trim stopped at 00:23).
- 2026-11-24 MUI-UKR: TC-347 Pass (no truncation; time bubble on 「Вибрана」 р, note; 22 credits). Batch SVE–UKR used 140 credits.
- 2026-11-24 Result screens for CHT–KOR (Recent task was empty on their walks): no truncation; TC-322–326 stay Pass (re-recorded with -16-result / -17-save-toast).
- 2026-11-24 Part 3 (VIT/ARA generating subtitle) blocked: the Pro test subscription lapsed (Enhance opens the Pro purchase page); not re-bought per the brief. Balance 30018.
- 2026-11-24 eBugs filed on TR261123-0015 (16.9.0.2611201): DRA262611P0280–0288, 9 bugs, all sev 3 RD, attachments on every page (ebugs/2026-11-24-mui/filed_bugcodes.md). 79 translation doubts undecided, not filed. OS Language still to set on the web form.
- 2026-11-26 MUI-apk top-up: the first read dropped strings with a line break (mui-strings.ts fixed 2026-11-25). Re-read 2611201 into mui/../mui-topup (68 strings): 3 new keys. 8 fails, APK-only, held in the drafts (effects hint dialog 「Video Enhance」 in English: ESM, ARA, PLK, HEB, SVE, NOR, UKR; JPN refund message line break) and 14 doubts TD-A27…A31, TD-E42…E50. TC-321 stays Fail. Nothing filed.
