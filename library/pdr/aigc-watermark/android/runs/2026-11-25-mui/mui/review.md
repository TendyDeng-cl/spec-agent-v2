# MUI translation review: all 26 languages (AIGC Watermark, Android)

Build 16.9.0.2611201 (`PowerDirector Mobile for Android-DRA261109-01-16.9.0.2611201.apk`). Source: `mui-strings.json`
(5 strings × 26 languages) and `mui-strings.md`, plus the shared strings the feature's screens show, read from the same
APK with `aapt2 dump resources` (keys below). No translation sheet: judged per `mui.md` §3; doubts in `../mui-doubts.md`.

**Script fix (this segment).** The first `mui-strings.ts` pass found only 4 strings: aapt2 prints a value that holds a
real line break over several lines, and the parser dropped it, so `aigc_watermark_export_reminder_message` (the export
dialog body) was missing. `scripts/mui-strings.ts` now joins such values; the second pass has 5 strings. (The same bug
dropped 3 multi-line Video Enhance strings from that run's read: `video_enhance`, `video_enhance_v2_refunded_content`,
`video_enhancer_original_source_hint_dialog_content`.)

## Strings checked

| Screen | Key | English |
|---|---|---|
| Settings row | `setting_page_remove_aigc_watermark` | Remove AIGC Watermark |
| Info sheet title | `aigc_watermark_title` | AIGC Watermark |
| Info sheet body | `aigc_watermark_info_description` | Depending on applicable laws and regulations, … meet those requirements. |
| Info sheet button | `tooltips_dialog_btn_got_it` (layout `sheet_aigc_watermark_info`) | Got it |
| Export dialog title | `aigc_watermark_title` | AIGC Watermark |
| Export dialog body | `aigc_watermark_export_reminder_message` | Your exported file will include an AIGC watermark.⏎To remove the watermark, go to Menu > Settings. |
| Export dialog checkbox | `dont_show_message_again` or `ai_video_anime_checkbox` (the only two 「Don't show again」 keys; which one the dialog uses is for the phone walk) | Don't show again |
| Export dialog buttons | `btn_cancel`, `btn_export` | Cancel, Export |
| Music dialog body | none: no string in the APK holds 「Your generated music will include an AIGC watermark…」 in any language | — |
| Menu > Settings (for the body's path) | `setting_page_title`, `setting_page_sub_title_setting` / `settings` / `setting` (all four Settings keys read the same in every language) | Menu, Settings |
| (context, not this feature) | `ai_music_go_to_my_ai_music` (AI Music generating popup, quoted by TC-057) | Go to My AI Music |

Every language has its own resource for every string (no English default, no parent-locale fallback); CHT reads
zh-rTW (Traditional, Taiwan), CHS zh-rCN, PTB pt-rBR, ESM es-rMX. Placeholders: none in English, none added. The
export body keeps its line break in all 26 languages. 「AIGC」 stays Latin everywhere but ITA (TD-1).
「Menu > Settings」 in the export body uses the Menu and Settings words of that language in all 26 (CHT/CHS/JPN in
[ ] brackets, VIT in sentence case against the screens' title case, TD-4).

| Language | Strings checked | Fails | Doubts |
|---|---|---|---|
| CHT, CHS, JPN, ESP, DEU, FRA, RUS, PTB, THA, MAY, HIN, ESM, FAR, SVE, DAN, NOR, UKR | 10 each | 0 | 0 |
| KOR | 10 | 0 | 1 (TD-5) |
| ITA | 10 | 0 | 2 (TD-1, TD-8) |
| NLD | 10 | 1 | 1 (TD-2) |
| IND | 10 | 0 | 1 (TD-3) |
| ARA | 10 | 1 | 0 |
| VIT | 10 | 0 | 1 (TD-4) |
| PLK | 10 | 0 | 1 (TD-7) |
| TRK | 10 | 0 (1 if the dialog uses `ai_video_anime_checkbox`) | 0 |
| HEB | 10 | 0 | 1 (TD-6) |
| All 26 | music dialog body | 1 (absent from the APK) | — |

## Fails

| Language | Key | English | App shows | What is wrong |
|---|---|---|---|---|
| All 26 (and English) | — (music dialog body) | Your generated music will include an AIGC watermark. To remove the watermark, go to Menu > Settings. | (no string) | The music dialog's body is not in the APK at all, so it cannot show in any language. Same as on 2611231: DRA262611P0229, cited, not refiled. |
| NLD | `dont_show_message_again` / `ai_video_anime_checkbox` | Don't show again | Niet' meer weergeven / Niet' meer tonen | Stray apostrophe copied from 「Don't」; both keys have it, so the export dialog checkbox shows it whichever key it uses. Same strings as DRA262611P0286 (Video Enhance Demo page): cite, do not refile. |
| ARA | `dont_show_message_again` / `ai_video_anime_checkbox` | Don't show again | لا' تظهر مرة أخرى / لا تظهر مرة أخرى' | Stray apostrophe in both keys. Same strings as DRA262611P0286: cite. |
| TRK (conditional) | `ai_video_anime_checkbox` | Don't show again | Bir daha gösterme' | Trailing apostrophe in this key only (`dont_show_message_again` 「Bir daha gösterme」 is correct). A fail only if the export dialog uses this key; DRA262611P0286 covers it. |

## Outside this feature (noted, not counted)

- NLD `ai_music_go_to_my_ai_music` 「Ga naar My AI Music」 leaves the screen name in English; the My AI Music tab reads
  「Mijn AI-muziek」 (`my_ai_music`). AI Music Generator string, not AIGC Watermark's.
