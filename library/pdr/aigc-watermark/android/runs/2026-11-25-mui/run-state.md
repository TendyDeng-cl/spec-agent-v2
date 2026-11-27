# Run state — MUI MUI: 26 languages (translations from the APK, truncation on the phone)

Table: library/pdr/aigc-watermark/android/cases.csv
Started: 2026-11-25T11:42:50.811Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-25T11:46:57.653Z · next TC-131 (MUI-CHT)
{"Fail":1,"Not run":26}

MUI-apk done: TC-130 Fail (music dialog body absent from APK, P0229 cited; NLD/ARA stray apostrophe in Don't show again, P0286 cited; TRK conditional on key), 8 doubts TD-1…TD-8 in mui-doubts.md, review in mui/review.md. mui-strings.ts fixed for multi-line strings (not committed). Next: MUI-CHT…MUI-KOR on the Sony; walks note which Don't-show-again key the export dialog uses (NLD weergeven/tonen, TRK apostrophe) and that the music dialog is absent (P0229).

### 2026-11-25T11:57:34.508Z · next TC-136 (MUI-DEU)
{"Fail":1,"Pass":5,"Not run":21}

MUI-CHT…MUI-KOR done on the Sony (16.9.0 2611201, Stage yellow bar): TC-131–TC-135 Pass. Account acda.test7 (Google, signed in), Free, 2424 credits (logcat totalRemain 19:56, unchanged; nothing charged). 「Remove AIGC Watermark」 was On at start, set Off and left Off; export 「Don't show again」 unticked. Project used: 「Project 11-25」 (top of the Project tab), made from the existing Image to Video result (My Artwork › Image to Video › View › Full Editor, 0 credits): it shows the export dialog, so no AI Anime item was generated. Music steps 5–8 not walked (P0229, Generate would charge). Don't-show-again key: CHT/CHS/JPN/ESP/KOR values identical in both keys, view help_disable_tip; NLD/TRK walks settle it (weergeven = dont_show_message_again, tonen = ai_video_anime_checkbox; TRK trailing apostrophe = ai_video_anime_checkbox). Doubt TD-9 (ESP Quitar vs Eliminar); observations O-1 (JPN ー line start), O-2 (KOR mid-word wrap), O-3 (lost Export tap; recipe fixed). Recipe for next segments: recipes/mui-walk.steps <ID> <code> <localized Remove AIGC Watermark>. Locale reset to en-US, app on the Launcher. Logs pulled: logs/MUI-CHT-KOR-20261125-195717.

### 2026-11-25T12:04:11.523Z · next TC-141 (MUI-NLD)
{"Fail":1,"Pass":10,"Not run":16}

MUI-DEU…MUI-PTB done on the Sony (16.9.0 2611201, Stage yellow bar): TC-136–TC-140 Pass, nothing truncated or overlapping. Account acda.test7 (Google, signed in), Free, 2424 credits (logcat totalRemain 20:03, unchanged; nothing charged). 「Remove AIGC Watermark」 Off and left Off; export 「Don't show again」 unticked. Export dialog on 「Project 11-25」 every time (Cancel, nothing exported). Music steps 5–8 not walked (P0229, Generate would charge). Longest strings: DEU Settings row 118–819 px (still one line with ⓘ and switch), DEU info body six lines, ITA checkbox 97–771 px; all inside their containers. No new translation doubts (ITA TD-1/TD-8 seen on the phone as raised). Observation O-4 (ITA export body breaks after 「Menu >」, layout nit). Recipe ran clean for all five (no lost Export tap). Locale reset to en-US, app on the Launcher. Logs pulled: logs/MUI-DEU-PTB-20261125-200359 (sliced).

### 2026-11-25T12:13:12.669Z · next TC-147 (MUI-ARA)
{"Fail":1,"Pass":16,"Not run":10}

MUI-NLD…MUI-ESM done on the Sony (16.9.0 2611201, Stage yellow bar): TC-141–TC-146 Pass, nothing truncated, clipped or overlapping (Thai and Devanagari glyphs checked on screenshots). Account acda.test7 (Google, signed in), Free, 2424 credits (logcat totalRemain 20:11, unchanged; nothing charged). 「Remove AIGC Watermark」 Off and left Off; export 「Don't show again」 unticked. Export dialog on 「Project 11-25」 every time (Cancel, nothing exported). Music steps 5–8 not walked (P0229). NLD key settled: the export dialog shows 「Niet' meer weergeven」 = key dont_show_message_again, stray apostrophe on screen (P0286, added to TC-130 evidence in the plan Log). New doubts TD-10 (MAY Alih keluar vs Keluarkan), TD-11 (HIN एक्सपोर्ट vs निर्यात); observations O-5 (IND/ESM path line break), O-6 (THA mid-word breaks), O-7 (HIN lost Export tap once, re-walked). Two Appium servers listed (4724 and 4725), left alone. Locale reset to en-US, app on the Launcher. Logs pulled: logs/MUI-NLD-ESM-20261125-201248 (sliced). Next: MUI-ARA…MUI-HEB (TC-147–152); TRK walk settles whether the dialog's key is dont_show_message_again there too (expected, so no TRK apostrophe).

### 2026-11-25T12:22:34.453Z · next TC-153 (MUI-SVE)
{"Fail":1,"Pass":22,"Not run":4}

MUI-ARA…MUI-HEB done on the Sony (16.9.0 2611201, Stage yellow bar): TC-147–TC-152 Pass, nothing truncated, clipped or overlapping. Account acda.test7 (Google, signed in), Free, 2424 credits (logcat totalRemain 20:20, unchanged; nothing charged). 「Remove AIGC Watermark」 Off and left Off; export 「Don't show again」 unticked. Export dialog on 「Project 11-25」 every time (Cancel, nothing exported). Music steps 5–8 not walked (P0229). RTL (ARA/FAR/HEB): app layout not mirrored, O-8 (observation, not fail). Key check: ARA shows the stray apostrophe on screen (P0286), TRK shows none (dont_show_message_again); both added to TC-130 evidence in the plan Log. New doubts TD-12 (FAR خروجی), TD-13 (HEB הסר/הסרת); observations O-9 (VIT/PLK path break), O-10 (SystemUI opened the Internet panel during the HEB walk; Back, Export again), O-11 (VIT Menu missing spaces, other feature). Two Appium servers (4724, 4725) left alone. Locale reset to en-US, app on the Launcher. Logs pulled: logs/MUI-ARA-HEB-20261125-202127 (sliced). Next: MUI-SVE…MUI-UKR (TC-153–156), then phase wrap-up.

### 2026-11-25T12:31:08.272Z · all recorded
{"Fail":1,"Pass":26}

MUI-SVE…MUI-UKR done on the Sony (16.9.0 2611201, Stage): TC-153–TC-156 Pass, nothing truncated, clipped or overlapping. acda.test7, 2424 credits (logcat totalRemain 20:30, unchanged; nothing charged). 「Remove AIGC Watermark」 Off, export 「Don't show again」 unticked, left so. Export dialog on 「Project 11-25」, Cancel each time; music steps not walked (P0229). No new doubts; O-12 (UKR ⓘ close to switch), O-13 (DAN lost ☰ tap, re-walked), O-14 (SVE/DAN/UKR Menu strings, other feature). Two Appium servers (4724, 4725) left alone. Locale reset to en-US. Logs: logs/MUI-SVE-UKR-20261125-203055 (sliced). Next: MUI phase wrap-up.
