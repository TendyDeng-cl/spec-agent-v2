# AI Video Enhance (Android) — eBug drafts, MUI run (table v11), PDR-A 16.9.0 build 2611201

**Source:** pdr-spec-casebook run `library/pdr/video-enhance/android/runs/2026-11-24-mui/` — MUI phase of draft `drafts/20261124-150000` (table v11, TC-321 – TC-347), 2026-11-24 12:03 → 15:37 on Samsung SM-A5360 (Galaxy A53 5G) / Android 15, PowerDirector 16.9.0 build 2611201 (Google Play internal test, not a TR folder), Stage server, account cltqauiap2@gmail.com (Pro). TC-321 read the 65 Video Enhance strings × 26 languages from the APK (build 2611231's APK; 2611201's has the same strings, RUN-PLAN-20261124-MUI.md); TC-322 – TC-347 walked every Video Enhance screen in one language each with the app's per-app language. Tally: 7 Fail (TC-321, TC-327 DEU, TC-330 RUS, TC-331 PTB, TC-332 NLD, TC-334 THA, TC-338 ARA), 20 Pass.

**Status:** nothing filed, uploaded or commented. Build 2611201 came from the Google Play internal test, so the TR to file on is the reviewer's call (the prefilled TR is from an earlier batch on another build).

Rules: spec-casebook `ebugs.md` step 1, `references/mui.md` §4 and the casebook overlay (rules 1–8): one action per Repro step, a Spec Link on its own line and a red-boxed image on every entry, no log (layout and text findings), no video. MUI entries carry `[AIAgent]` plus their language tags in `product.json › mui` order, Class UI, a `MUI:` Note line; truncation is one bug per language, a wrong translation one bug per language set. There is no translation sheet (`mui.json` sheet null), so every expectation rests on the Design (Video Enhance file, section AI Video Enhance_26.09_v2) and, for a translation, on the meaning of the English string. Owner RD for all: the app's text or layout is wrong; nothing asks the spec to change. Severity is proposed as 3 (text and layout, nothing blocked); the reviewer sets it.

**What is drafted:** 9 entries: 6 truncation bugs (one per language: DEU, RUS, PTB, NLD, THA, ARA), 2 translation bugs confirmed on screen (Demo checkbox in NLD / ARA / TRK; NLD leave-dialog title) and 1 layout bug (the Selected Length time bubble over the label, 12 languages). 31 APK-only translation fails are held (never seen on a Video Enhance screen); 79 translation doubts wait for your call in the Translation doubts table.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-VEA-47 — DEU: the panel title 「Video optimieren mit KI」 is cut to 「Video optimieren mit…」 beside the credit pill  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-327  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** de-DE as the per-app language (system en-US). The page source holds the whole title 「Video optimieren mit KI」; the view ellipsizes it to 「Video optimieren mit…」 on every panel visit (DEU-04-panel with the credit pill still empty, DEU-08-toast-pro and DEU-11-panel-trimmed with 30550; the image is DEU-11, after trimming to 00:09). Design VE · 02 draws the title 「AI Video Enhance」 between ‹ and the credit pill. The same title fits in 20 other languages (CHT … UKR); PTB, NLD, THA and ARA truncate it too, each its own bug (mui.md §4: one truncation bug per language). The Selected Length time bubble over the 「g」 of 「Ausgewählte」 is entry 9 (one layout bug).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][DEU] AI Video Enhance: Panel title 「Video optimieren mit KI」 is truncated
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to German (de-DE) in Android's per-app language settings
3. Tap 「Videooptimierung」 on the Launcher
4. Tap 「Jetzt testen」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the panel title

Result:
The panel title reads 「Video optimieren mit…」: the end of 「Video optimieren mit KI」 is cut off beside the credit pill.
摘要：德文介面中，面板標題被截斷成「Video optimieren mit…」。
{16.9.0_vea47_deu_panel_title_ellipsized.jpg}

Expect Result:
The whole title 「Video optimieren mit KI」 shows beside the credit pill, as the Design's title 「AI Video Enhance」 does.
摘要：面板標題應完整顯示「Video optimieren mit KI」，不被截斷。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: truncation — DEU
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: panel title 「AI Video Enhance」 beside the credit pill) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/01_ISS-VEA-47/`

---

## 2. ISS-VEA-48 — RUS: the fps chips 「N кадров/сек」 wrap to two lines, grow taller than the Resolution chips and hide under 「Улучшить」  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-330  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** ru-RU as the per-app language. RUS is the only language besides THA that localizes the fps value (「30 кадров/сек」; UKR keeps 「30fps」). The three fps chips wrap to two lines and grow to 145 px high against 96 px for the Resolution chips; on the panel as it opens their second line 「сек」 sits under the 「Улучшить ◆ 960」 button, so they read 「30 кадров/」, 「60 кадров/」, 「120 кадров/」 (RUS-04-panel); scrolled up, the whole text shows on two lines in taller chips (RUS-04c-panel-scrolled). Design VE · 02 draws one-line chips 「30fps」 「60fps」 「120fps」 the same height as the Resolution chips. The test's expectation (TC-330): the chips keep their size and place. Whether RUS should localize 「fps」 at all is TD-A12's question for THA (doubts table); the fix may be either a shorter value or a chip that fits it.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][RUS] AI Video Enhance: fps chips 「30 кадров/сек」 wrap, grow and hide under 「Улучшить」
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Russian (ru-RU) in Android's per-app language settings
3. Tap 「Улучшение видео」 on the Launcher
4. Tap 「Попробовать」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the fps chips
7. Swipe the settings up
8. Check the fps chips

Result:
The fps chips wrap to two lines, taller than the Resolution chips; on opening, 「сек」 is hidden under 「Улучшить」.
摘要：俄文介面中，fps 選項換成兩行、比解析度選項高，剛開啟時第二行「сек」被「Улучшить」按鈕擋住。
{16.9.0_vea48_rus_fps_chips_under_enhance.jpg} {16.9.0_vea48_rus_fps_chips_two_lines.jpg}

Expect Result:
Each fps chip shows its whole label on one line, the Resolution chips' size (Design 「30fps」 「60fps」 「120fps」).
摘要：fps 選項應單行完整顯示，大小與解析度選項一致。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: truncation — RUS
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: fps chips 30fps / 60fps / 120fps beside Resolution) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/02_ISS-VEA-48/`

---

## 3. ISS-VEA-49 — PTB: the panel title 「Otimizador de vídeo por IA」 is cut to 「Otimizador de vídeo …」 beside the credit pill  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-331  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** pt-BR as the per-app language. Page source 「Otimizador de vídeo por IA」, shown 「Otimizador de vídeo …」 beside the pill (30464) on every panel visit (PTB-04-panel, PTB-08-toast-pro, dimmed behind PTB-12 / PTB-13). Same defect as DEU, NLD, THA and ARA, filed per language (mui.md §4). The time bubble over the 「p」 of 「Comprimento」 is entry 9.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][PTB] AI Video Enhance: Panel title 「Otimizador de vídeo por IA」 is truncated
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Portuguese (Brazil) (pt-BR) in Android's per-app language settings
3. Tap 「Otimização de vídeo」 on the Launcher
4. Tap 「Experimentar」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the panel title

Result:
The panel title reads 「Otimizador de vídeo …」: 「por IA」 is cut off beside the credit pill.
摘要：巴西葡萄牙文介面中，面板標題被截斷成「Otimizador de vídeo …」，看不到「por IA」。
{16.9.0_vea49_ptb_panel_title_ellipsized.jpg}

Expect Result:
The whole title 「Otimizador de vídeo por IA」 shows beside the credit pill, as Design's 「AI Video Enhance」 does.
摘要：面板標題應完整顯示「Otimizador de vídeo por IA」，不被截斷。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: truncation — PTB
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: panel title 「AI Video Enhance」 beside the credit pill) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/03_ISS-VEA-49/`

---

## 4. ISS-VEA-50 — NLD: the panel title 「Video verbeteren met AI」 is cut to 「Video verbeteren me…」 beside the credit pill  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-332  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** nl-NL as the per-app language. Page source 「Video verbeteren met AI」, shown 「Video verbeteren me…」 beside the pill (30444) on every panel visit (NLD-04-panel, NLD-05 … NLD-08, NLD-11, dimmed behind NLD-13). Same defect as DEU, PTB, THA and ARA, filed per language (mui.md §4). NLD's translation bugs are entries 7 and 8.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][NLD] AI Video Enhance: Panel title 「Video verbeteren met AI」 is truncated
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Dutch (nl-NL) in Android's per-app language settings
3. Tap 「Video verbeteren」 on the Launcher
4. Tap 「Probeer nu」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the panel title

Result:
The panel title reads 「Video verbeteren me…」: the end of 「Video verbeteren met AI」 is cut off beside the credit pill.
摘要：荷蘭文介面中，面板標題被截斷成「Video verbeteren me…」。
{16.9.0_vea50_nld_panel_title_ellipsized.jpg}

Expect Result:
The whole title 「Video verbeteren met AI」 shows beside the credit pill, as the Design's title 「AI Video Enhance」 does.
摘要：面板標題應完整顯示「Video verbeteren met AI」，不被截斷。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: truncation — NLD
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: panel title 「AI Video Enhance」 beside the credit pill) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/04_ISS-VEA-50/`

---

## 5. ISS-VEA-51 — THA: the panel title is cut, the fps chips wrap and hide under the Enhance button, and the clip toolbar label loses 「AI」  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-334  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** th-TH as the per-app language; one bug for all three Thai truncations (mui.md §4: a truncation bug lists every truncated string of its language). (1) Panel title: page source 「เครื่องมือปรับปรุงวิดีโอ AI」, shown 「เครื่องมือปรับปรุงวิดี…」 beside the pill (THA-04-panel … THA-08). (2) fps chips 「30 / 60 / 120 เฟรมต่อวินาที」 wrap to two lines and grow to 155 px against 100 px for the Resolution chips; on the opening view their second line 「วินาที」 is under 「ปรับปรุงประสิทธิภาพ ◆ 960」 (THA-04-panel; scrolled, THA-04b-panel-scrolled), as in RUS (entry 2). (3) Clip toolbar › 「ปรับปรุงประสิทธิภาพ」 group: the AI Video Enhance tool's label shows 「เครื่องมือ / ปรับปรุงวิดีโอ」 and loses its third line 「AI」 (THA-19b-enhance-group; page source 「เครื่องมือปรับปรุงวิดีโอ AI」). Design: VE · 02 for the title and chips, Entry Points › Timeline_default for the clip toolbar item 「AI Video Enhance」. The project was made in English with ve-0130-1080p60.mp4 (run-state.md setup). Whether Thai should localize 「fps」 is doubt TD-A12.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][THA] AI Video Enhance: Panel title, fps chips and clip toolbar label are truncated
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Thai (th-TH) in Android's per-app language settings
3. Tap 「เครื่องมือปรับปรุงวิดีโอ AI」 on the Launcher
4. Tap 「ลองใช้เลย」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the panel title and the fps chips
7. Swipe the settings up
8. Check the fps chips
9. Tap ‹ on the panel
10. Tap ‹ on Add Media
11. Open a project with a video clip
12. Tap the clip on the timeline
13. Tap 「ปรับปรุงประสิทธิภาพ」 in the clip toolbar
14. Check the AI Video Enhance label

Result:
Title cut to 「…วิดี…」; fps chips wrap, grow and hide under the CTA; toolbar label loses its last line 「AI」.
摘要：泰文介面中，面板標題被截斷、fps 選項換兩行變高且被按鈕擋住、剪輯工具列標籤少了最後一行「AI」。
{16.9.0_vea51_tha_title_and_fps_chips.jpg} {16.9.0_vea51_tha_fps_chips_two_lines.jpg} {16.9.0_vea51_tha_toolbar_label_loses_ai.jpg}

Expect Result:
Title, fps chips and toolbar label show in full; the chips keep the Resolution chips' size (Design VE · 02).
摘要：標題、fps 選項與工具列標籤都應完整顯示，fps 選項大小與解析度選項一致。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: truncation — THA
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: panel title and fps chips) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Entry Points board (Timeline_default: clip toolbar 「AI Video Enhance」) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3293-14941
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/05_ISS-VEA-51/`

---

## 6. ISS-VEA-52 — ARA: the panel title 「تحسين الفيديو بالذكاء الاصطناعي」 is cut to 「تحسين الفيديو بالذكاء الا…」 beside the credit pill  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-338  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** ar-SA as the per-app language. The panel title is cut mid-word, 「تحسين الفيديو بالذكاء الا…」, beside the pill (30312) (ARA-04-panel); the Demo page shows the whole title on one line. The panel is not mirrored for RTL (‹ left, labels left-aligned) — that is doubt TD-W9 (Launcher, Demo and panel not mirrored while Recent task, Result and the bubbles are), not part of this bug. ARA's checkbox apostrophe is entry 7. Same truncation as DEU, PTB, NLD and THA, filed per language.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][ARA] AI Video Enhance: Panel title 「تحسين الفيديو بالذكاء الاصطناعي」 is truncated
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Arabic (ar-SA) in Android's per-app language settings
3. Tap 「محسّن فيديو AI」 on the Launcher
4. Tap 「جرّبه الآن」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the panel title

Result:
The panel title reads 「تحسين الفيديو بالذكاء الا…」: the last word is cut off beside the credit pill.
摘要：阿拉伯文介面中，面板標題最後一個字被截斷。
{16.9.0_vea52_ara_panel_title_ellipsized.jpg}

Expect Result:
The whole title 「تحسين الفيديو بالذكاء الاصطناعي」 shows beside the credit pill, as Design's 「AI Video Enhance」 does.
摘要：面板標題應完整顯示，不被截斷。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: truncation — ARA
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: panel title 「AI Video Enhance」 beside the credit pill) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/06_ISS-VEA-52/`

---

## 7. ISS-VEA-53 — NLD, ARA, TRK: the Demo page checkbox 「Don't show again」 shows a stray apostrophe  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-321, TC-332, TC-338, TC-341  ·  **Reproduce:** 3/3  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** TC-321 (APK strings) flagged key `ai_video_anime_checkbox` in three languages; the walks saw each exactly as in the APK on the Video Enhance Demo page: NLD 「Niet' meer tonen」 (NLD-02-demo), ARA 「لا تظهر مرة أخرى'」 (ARA-02-demo), TRK 「Bir daha gösterme'」 (TRK-02-demo). The apostrophe is left over from the English 「Don't」. Tags in product.json order (NLD, ARA, TRK), one bug for the set (mui.md §4). TC-341 (TRK) was recorded Pass because the walk judged truncation; the string itself is TC-321's fail. No translation sheet: the expectation is the English string's meaning (Design 「Don’t show again」) without the stray mark. The same apostrophe is in `dont_show_message_again` for NLD 「Niet' meer weergeven」 and ARA 「لا' تظهر مرة أخرى」, but that key is not on any Video Enhance screen (held, below); RD may want to fix both keys together.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][NLD][ARA][TRK] AI Video Enhance: Demo page 「Don't show again」 checkbox shows a stray apostrophe
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Dutch (nl-NL) in Android's per-app language settings
3. Tap 「Video verbeteren」 on the Launcher
4. Check the checkbox label on the Demo page
5. Repeat steps 2–4 in Arabic (ar-SA) and Turkish (tr-TR)

Result:
The label has a stray apostrophe: NLD 「Niet' meer tonen」, ARA 「لا تظهر مرة أخرى'」, TRK 「Bir daha gösterme'」.
摘要：荷蘭文、阿拉伯文、土耳其文的 Demo 頁「Don't show again」勾選框文字多了一個撇號。
{16.9.0_vea53_nld_checkbox_apostrophe.jpg} {16.9.0_vea53_ara_checkbox_apostrophe.jpg} {16.9.0_vea53_trk_checkbox_apostrophe.jpg}

Expect Result:
The label means 「Don't show again」 with no stray mark (e.g. 「Niet meer tonen」, 「لا تظهر مرة أخرى」, 「Bir daha gösterme」).
摘要：勾選框文字應為正確翻譯，不應有多餘的撇號。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: translation — NLD, ARA, TRK
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (Demo page_Straight video: 「Don’t show again」 checkbox) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-23969
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/07_ISS-VEA-53/`

---

## 8. ISS-VEA-54 — NLD: the leave dialog asks 「…Stoppen Met Bewerken?」 (stop editing?) instead of whether to leave  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-321, TC-332  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Key `video_enhance_v2_leave_title`. English 「Sure You Want to Leave?」 (Design, Cancel board: 「Cancel」 on VE · 03 Generating opens it, with 「Leave」 / 「Keep Uploading」); NLD shows 「Weet Je Zeker Dat Je Wilt Stoppen Met Bewerken?」 — 「Are you sure you want to stop editing?」 — over a body about leaving the page while the video uploads and buttons 「Verlaten」 / 「Doorgaan met uploaden」 (NLD-13-leave). It also keeps English title case (Dutch capitalises only the first word; doubt TD-E28 lists the same habit elsewhere). Seen exactly as in the APK. The run trimmed to a 10 s selection so a cancelled upload costs little; the dialog is the same at any length. Board: the user named node 3393-18282 「VE · 03 Generating」 on the Cancel board, from which the dialog opens.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][NLD] AI Video Enhance: Leave dialog title means 「stop editing?」, not 「leave?」
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to Dutch (nl-NL) in Android's per-app language settings
3. Tap 「Video verbeteren」 on the Launcher
4. Tap 「Probeer nu」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Drag the right trim handle left to a 10 s selection
7. Tap 「Verbeteren」
8. Tap 「Annuleren」 on the upload dialog
9. Check the dialog title

Result:
The title reads 「Weet Je Zeker Dat Je Wilt Stoppen Met Bewerken?」 (stop editing?), not a question about leaving.
摘要：荷蘭文的離開對話框標題意思是「確定要停止編輯嗎？」，而不是「確定要離開嗎？」。
{16.9.0_vea54_nld_leave_title.jpg}

Expect Result:
The title asks whether to leave, as 「Sure You Want to Leave?」 (e.g. 「Weet je zeker dat je deze pagina wilt verlaten?」).
摘要：標題應譯為「確定要離開嗎？」的意思，與「Verlaten」按鈕一致。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
MUI: translation — NLD
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Cancel board (VE · 03 Generating: 「Cancel」 opens 「Sure You Want to Leave?」) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3393-18282
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/08_ISS-VEA-54/`

---

## 9. ISS-VEA-55 — The Selected Length time bubble covers the lower part of the label's first letters (12 languages)  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-327, TC-328, TC-330, TC-331, TC-333, TC-335, TC-339, TC-340, TC-341, TC-345, TC-346, TC-347, OBS-MUI-1  ·  **Reproduce:** 12/12  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** OBS-MUI-1. Proposed as **one layout bug** (`[AIAgent][UI]`, no `MUI:` line) rather than per-language MUI bugs: the 「00:00」 time bubble at the left handle sits on the 「Selected Length」 label's baseline, so any letter with a descender or a mark below it at the start of the label is cut, whatever the language; one fix (move the bubble or the label) clears all of them. The reviewer may split it into per-language truncation bugs instead. Languages, read on each `<TAG>-04-panel`: DEU 「Ausgewählte」 g, FRA 「Longueur」 g, RUS 「Выбранная」 р, PTB 「Comprimento」 p, IND 「Panjang」 j/g, MAY 「Panjang」 j/g, VIT 「Độ」 dot below (reads 「Đô」), PLK 「Wybrana」 y, TRK 「Seçili」 cedilla (reads 「Secili」), DAN 「Valgt」 g, NOR 「Valgt」 g, UKR 「Вибрана」 р. The run's walks noted nine of them (DEU, FRA, PTB, IND, MAY, PLK, DAN, NOR, UKR); RUS, TRK and VIT were found while checking every language's panel screenshot for this draft. English, CJK, ESP, ESM, ITA, NLD, THA, HIN, SVE, ARA, FAR and HEB have no such letter under the bubble. Design VE · 02 draws the 「00:00」 marker below 「Selected Length ⓘ」, clear of it. The image is DEU-04-panel plus one crop per language from the same panels.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Selected Length time bubble covers the lower part of the label's letters
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Set PowerDirector's app language to German (de-DE) in Android's per-app language settings
3. Tap 「Videooptimierung」 on the Launcher
4. Tap 「Jetzt testen」 on the Demo page
5. Tap a 12:30 1080p 60 fps video in Add Media
6. Check the 「Ausgewählte Länge」 label

Result:
The 「00:00」 bubble cuts the label's lower letters in DEU, FRA, RUS, PTB, IND, MAY, VIT, PLK, TRK, DAN, NOR, UKR.
摘要：「Selected Length」標籤的時間氣泡蓋住標籤文字下緣（如德文 g 的下半部），共 12 種語言。
{16.9.0_vea55_deu_time_bubble_over_label.jpg} {16.9.0_vea55_time_bubble_12_languages.jpg}

Expect Result:
The 「00:00」 bubble sits clear of the 「Selected Length」 label, every letter whole, as Design VE · 02 draws it.
摘要：時間氣泡不應蓋住標籤文字，每個字母都應完整顯示。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android 15
Spec Link: AI Video Enhance Design spec (Video Enhance, section AI Video Enhance_26.09_v2), Main Flow (Free user → IAP) board (VE · 02 預設（已訂閱）: 「00:00」 marker below 「Selected Length」) -
https://www.figma.com/design/HceGLJVaxnKsv7gXSXzKWh/Video-Enhance?node-id=3294-31104
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Video-Enhance-MUI_16.9.0_images/09_ISS-VEA-55/`

## Held — APK-only translation fails never seen on a Video Enhance screen (not drafted)

TC-321 found 35 fails in the APK strings; the walks saw 4 of them on screen (entries 7 and 8). The other 31 are held: a translation bug needs a screenshot of the wrong text on the feature's screen (an image on every entry, overlay rule 3), and these never showed (`mui/onscreen.md`). Build 2611201's APK has the same strings as 2611231's, so they are still in the app; they become entries when a run reaches their screen.

| Key | Languages | APK text | Why held |
|---|---|---|---|
| `iap_golden_week_terms_of_service` | CHT, CHS, ESP, KOR, DEU, FRA, ITA, RUS, PTB, IND, THA, MAY, HIN (13) | 「Terms of Service」 left in English | Shown on no walked screen: the account is Pro, so no purchase screen is on the walk, and the key is a shared IAP key; whether a Video Enhance purchase screen uses it is unchecked. |
| `video_enhance_hint` | NLD, ESM, ARA, VIT, PLK, FAR, HEB, SVE, DAN, NOR (10) | 「Video Enhance」 / 「Enhance」 left in English (VIT: most of the sentence) | The preview hint never showed in any language: not on the panel, while the preview plays, in the full-screen preview or on the Result (NLD probe, onscreen.md). |
| `video_enhance_generating_subtitle` | ARA, VIT (2) | ARA 「AI Enhanced Video」 left in English; VIT garbled 「AI Cải thiệnd Videocủa」 | The generating screen follows a finished upload (~13 min); the walks cancel at the upload, and Part 3's three VIT uploads failed at S3 (Broken pipe / Connection reset, logs/VIT-upload-fail-20261124-153639); ARA was not attempted. |
| `video_enhance_uploading_video` | VIT (1) | 「Đang Tải VideoLên」 | Not shown: the upload dialog uses video_enhance_v2_uploading 「Đang tải video lên…」 (correct) (VIT-12, VIT-30, VIT-34). |
| `dont_show_message_again` | NLD, ARA (2) | stray apostrophe 「Niet' meer weergeven」, 「لا' تظهر مرة أخرى」 | Not shown: the Video Enhance Demo page uses ai_video_anime_checkbox (entry 7). RD may fix both keys together. |
| `video_enhance_generate_button` | NLD, TRK (2) | 「Probeer & Enhance」, 「& Enhance'i deneyin」 (the `&amp;` strings) | Not shown: the Demo button reads 「Probeer nu」 / 「Şimdi deneyin」 and the panel CTA 「Verbeteren」 / 「Geliştir」. |
| `video_enhance_credits_deduction_duration_confirm_message` | ITA (1) | 「della trasmissione」 (of the broadcast) for 「throughout」 | Not shown: the walk has no credit confirm dialog (Pro account, short tasks). |

### Held, added 2026-11-26 (strings the first APK read missed)

| Key | Languages | Problem | Why held |
|---|---|---|---|
| `video_enhancer_original_source_hint_dialog_content` | ESM, ARA, PLK, HEB, SVE, NOR, UKR (7) | 「Video Enhance」 left in English | The dialog shows only when the chosen clip has effects; no walk did that, so it was never seen on a screen |
| `video_enhance_v2_refunded_content` | JPN (1) | Line break after 「クレジットを返却しました。」 missing | The refund message follows a failed task; none failed on the walks |

## Already filed on Android (dedupe.txt only, not drafted)

None. `ecl_query.py dedupe` searched 198 Android tickets (「AI Video Enhance」 and 「Video Enhance」) and every one of the 49 open on 16.9.0 was read against the 9 entries: no ticket covers a language's translation or truncation. Candidates read and set aside (`dedupe.txt`): DRA262611P0073 (「0fps」 badge, disabled fps chips: not localized chips), DRA262611P0241 (panel title Bold, not Medium: a weight, not the translated title's length; related to entries 1, 3, 4, 5, 6), DRA262611P0093 (limit bubble over the Preview time: another bubble), DRA262611P0088 (closed: tick saved on ‹, not the label's text) and DRA252503-0298 (closed 15.1.0: back from Recent task to the Demo page).

## Not raised (for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| Line wraps shown in full | JPN processing title (中… on line 2) and 「タイムラインに追加」; IND clip toolbar group 「Sempurnaka / n」 (also doubt TD-W8); SVE Launcher 「Videoförbättri / ng」 and toolbar 「AI-videoförbättrin / g」; DAN toolbar 「AI-videoforbedrin / g」; multi-line bubbles, toasts and dialog bodies in most languages | Every string is whole (TC-322 – TC-347 expect no ellipsis, cut or lost line); mid-word breaks are wording / hyphenation doubts, not truncation. |
| Other features' strings on the Launcher and in the editor | ESP 「Tools de audio」 (TD-W2), DEU 「Fix Bewegung」 (TD-W3), ITA Cinematic Reel label cut (TD-W4), RUS Upscaler label and 「Инстру менты」 (TD-W7), VIT 「Dụngcụ」 / 「Mặtnạ」 / Upscaler label (TD-W11), NOR 「Bytte av karakte / rbevegelse」, UKR 「Чат-редагуван / ня」, 「Кінематог / рафічні」 | Not Video Enhance strings; listed as doubts for the user's call (other features' owners), not drafted here. |
| ESM upload dialog subtitle | 「Mantén la aplicación abierta」 line without side padding (TC-337 note) | Whole and inside the dialog; a spacing point for the design check, not MUI. |
| Offline toast | Not shown in any language (Wi-Fi off, Enhance does nothing) | DRA262611P0077 (open, Android): the string could not be seen, so it is not judged. |
| Demo description | AI Reframe's text in every language, English included | DRA262611P0086 (open, Android). |
| Empty credit pill on the first panel visit after a language launch | Pill empty and CTA dead until the panel is reopened (CHT, DEU, DAN) | KP-067 (known quirk), not language-related. |
| Upload failures in the capture attempt (Part 3, VIT) | Three uploads in a row failed at S3 (Broken pipe after 91 s; Retry: Connection reset; new 9 s task: Broken pipe at 94 %), each ending on Recent task with a Retry card and 「Cần Trợ Giúp?」; 22 + 20 credits charged and not refunded by 15:37 | An observation of the network / upload path during the capture, not MUI (run-state.md, logs/VIT-upload-fail-20261124-153639). Refunds come about 3 h later (KF-003); check the balance before raising anything (KP-007). Failed-task cards with a nonsense length are DRA262611P0083. |
| RTL layout and digits | Launcher, Demo and panel not mirrored in ARA / FAR / HEB while Recent task, Result and bubbles are; mixed Arabic-Indic and Latin digits on the ARA panel | Doubts TD-W9 and TD-W10 (your call): no spec says which layout is intended. |
| Test subscription lapsed during Part 3 | 「Cải thiện」 opened the Pro purchase page; re-bought with the user's go-ahead (test card) | Fixture, not a finding. |

## Translation doubts

79 doubts from the run (`mui-doubts.md`): TD-A from the Asia / Middle East APK review, TD-E from the Europe / Americas review, TD-W seen on the phone during the walks (some are other features' strings or layout questions, marked in the row). None is drafted: pick File or Fine as is for each on the review page. Filed ones become translation entries grouped by language set (`[MUI]` only when every language has it); Fine as is goes into the feature's knowledge as a `decision` entry.

| ID | Language | Screen | English | App shows | Why it seems off | Better wording |
|---|---|---|---|---|---|---|
| TD-A1 | CHT | Style info (panel) | Sharp: Moderate enhancement for a sharp, clear image | 銳利：中度強化，呈現銳利、清晰的影像 | "Enhance" is 強化 here but 增強 in every other string, including the Natural line next to it (微幅增強). | 銳利：中度增強，呈現銳利、清晰的影像 |
| TD-A2 | CHT | Generating page | … You may also close the app and return later to check on the progress. | …你也可以關閉此應用程式，但請記得稍後回來。 | Uses 你 while the rest of the feature uses 您. It also drops "to check on the progress" and adds "but remember to come back". | 當 AI 畫質增強影片處理期間，您可以離開此頁面並探索其他功能，也可以關閉應用程式，稍後再回來查看進度。 |
| TD-A3 | CHS | Leave dialog | Sure You Want to Leave? | 是否确定要离开? | Uses a half-width "?" where the other CHS strings use full-width punctuation. | 确定要离开吗？ |
| TD-A4 | JPN | Panel (Enhance button) | Enhance Video %s / Enhance Video ~%s | 動画の補正 %s / 動画の補正 ~%s | "Enhance" is 補正 (correction) here but 高画質化 everywhere else. | 動画を高画質化 %s / 動画を高画質化 ~%s |
| TD-A5 | JPN | Uploading page | Uploading Video | 動画をアップロードする | The plain dictionary form reads like a command ("upload the video"), not a status. The related string uses アップロード中. | 動画をアップロード中 |
| TD-A6 | JPN | Panel (Pro button) | Unlock Pro to Enhance | Pro で高画質化 | Drops "Unlock", so it reads "Enhance with Pro" and does not say that Pro must be bought first. | Pro にアップグレードして高画質化 |
| TD-A7 | KOR | Dialog (original source) | Video Enhance for Original Video Only | 비디오 향상기를 원본 비디오만 적용 | Ungrammatical, roughly "apply the video enhancer only original video". | 동영상 향상은 원본 동영상에만 적용됩니다 |
| TD-A8 | KOR | Generating page | …explore other features. You may also close the app… | …탐색할 수 있습니다.앱을 닫고… | Missing space after the period, so the two sentences run together. | …탐색할 수 있습니다. 앱을 닫고… |
| TD-A9 | KOR | Panel, generating, hint, uploading | Enhance Video %s / Preparing AI Enhanced Video… / Uploading Video | 비디오 향상 %s / AI 향상된 비디오 준비 중… / 비디오 업로드 | "Video" is 비디오 in these strings but 동영상 in the feature name (AI 동영상 향상) and in the upload strings (동영상 업로드 중…). | 동영상 향상 %s / AI 향상 동영상 준비 중… / 동영상 업로드 중 |
| TD-A10 | THA | Panel (Enhance button) | Enhance | ปรับปรุงประสิทธิภาพ | Means "improve performance/efficiency", not image quality. The hint (video_enhance_hint) tells the user to tap a "ปรับคุณภาพ" button, which does not match this label. | ปรับคุณภาพ |
| TD-A11 | THA | Error dialog | An Error Has Occurred | เกิดข้อผิดพลาดหนึ่งขึ้น | Literal rendering of "an" (หนึ่ง, "one"), which sounds unnatural in Thai. | เกิดข้อผิดพลาด |
| TD-A12 | THA | Panel (fps option) | %dfps | %d เฟรมต่อวินาที | The fps options are written out in full, while the source-info line on the same panel keeps "fps" (%1$dfps · %2$dp). | %d fps (or translate both alike) |
| TD-A13 | HIN | Preview hint | Preview video not yet using Video Enhance… | प्रिव्यू वीडियो अभा तक … | Typo: अभा should be अभी. | प्रिव्यू वीडियो अभी तक AI वीडियो एन्हान्स का उपयोग नहीं कर रहा है। |
| TD-A14 | HIN | Panel, hint, feature name | Enhance / AI Video Enhance / Tap Enhance button | एन्हान्स / AI वीडियो एनहैन्सर / एन्हैन्स करें बटन | "Enhance" is spelled three ways (एन्हान्स, एनहैन्सर, एन्हैन्स) and also rendered as सुधारें, संवर्धन and बेहतर बनाने. The hint names a button spelling that differs from the button. | Use one form, e.g. एन्हान्स; hint: जारी रखने के लिए एन्हान्स बटन पर टैप करें। |
| TD-A15 | HIN | Recent task (cloud notice) | Please download any you want to keep in local storage. | जो भी आप स्थानीय स्टोरेज में रखना चाहता हैं, … | Grammar: चाहता does not agree with आप … हैं. | जो भी आप स्थानीय स्टोरेज में रखना चाहते हैं, उन्हें डाउनलोड करें। |
| TD-A16 | HIN | Leave dialog | Sure You Want to Leave? | क्या आप वाकई छोडना चाहते हैं? | छोडना is missing the nukta (छोड़ना). | क्या आप वाकई छोड़ना चाहते हैं? |
| TD-A17 | VIT | Panel, feature name, style | Enhance / AI Video Enhance / Enhancement style | Cải thiện / Nâng cao video AI / Kiểu tăng cường | "Enhance" is rendered three ways (Cải thiện, Nâng cao, Tăng cường) across the panel and the feature name. | Use one term, e.g. Nâng cao: "Nâng cao", "Nâng cao video %s", "Kiểu nâng cao" |
| TD-A18 | IND | Preview hint, panel | Tap Enhance button to continue. / Enhance | Ketuk tombol Percantik untuk melanjutkan. / Sempurnakan | The hint names a "Percantik" button, but the button reads "Sempurnakan". "Enhance" is also Pemercantik, Peningkatan and Meningkatkan elsewhere. | Ketuk tombol Sempurnakan untuk melanjutkan. |
| TD-A19 | IND | Leave dialog | Sure You Want to Leave? | Yakin ingin meninggalkan? | The verb meninggalkan has no object, so the sentence feels cut off. | Yakin ingin keluar? |
| TD-A20 | MAY | Preview hint, panel | Tap Enhance button to continue. / Enhance | Ketik butang Pertingkat untuk teruskan. / Tingkatkan | The hint names a "Pertingkat" button, but the button reads "Tingkatkan". | Ketik butang Tingkatkan untuk teruskan. |
| TD-A21 | MAY | Generating page | …explore other features. You may also close the app… | …cuba gunakan ciri-ciri lain, Anda juga boleh… | A comma joins two sentences, and "Anda" is capitalised after it. | …cuba gunakan ciri-ciri lain. Anda juga boleh… |
| TD-A22 | ARA | Credit confirm, panel | %s credits will be used… / Charge %d credits per second | سيتم استخدام %s من الاعتمادات… / يُخصم %d رصيدًا في الثانية | "Credits" is rendered two ways (اعتمادات and رصيد). | سيتم استخدام %s من الرصيد لهذا التوليد. |
| TD-A23 | FAR | Generating page, panel, dialog | Preparing AI Enhanced Video… / Enhance Video %s / Video Enhance for Original Video Only | در حال آماده‌سازی ویدئوی تقویت‌شده با AI… / بهبود ویدئو %s / افزایش کیفیت ویدیو — … | "Video" is spelled both ویدیو and ویدئو. "Enhance" is rendered three ways (بهبود, تقویت‌شده, افزایش کیفیت). Digits are mixed too (۵ in one string, Latin digits elsewhere). | در حال آماده‌سازی ویدیوی بهبودیافته با AI… / بهبود ویدیو %s / بهبود ویدیو فقط برای ویدیوی اصلی |
| TD-A24 | FAR | Panel (generate button) | Try & Enhance | امتحان کنید & بهبود | Mixes an imperative verb with a bare noun around "&". | امتحان و بهبود |
| TD-A25 | HEB | Don't show again checkbox | Don't show again | אל להציג שוב | Ungrammatical: אל needs a future-tense verb, and an infinitive takes לא. | לא להציג שוב |
| TD-A26 | HEB | Across the feature | Try It Now / Tap … / Drag to choose… / Shorten your selection… | נסה עכשיו / הקש… / גררו… / קצרו… | The way the user is addressed switches between masculine singular (נסה, הקש, בחר, שפר) and plural/neutral (גררו, קצרו, הקישו, התאימו), even within one feature. "Try & Enhance" also mixes forms (נסה & לשפר). | Use the plural/neutral form throughout: נסו עכשיו, הקישו על שפרו, נסו ושפרו |
| TD-E1 | ESP | Upload progress | Please keep the app open | Por favor, mantenga la aplicación abierta. | Formal usted here (also cloud notice, hint, purchase text, generating subtitle) while most strings use tú (Pulsa, Arrastra, Acorta, quieres) | Mantén la aplicación abierta. |
| TD-E2 | ESP | Upload progress / leave dialog | Uploading Video / Keep Uploading | Cargando video / Seguir cargando | 「Cargar」 reads as loading; the same flow says 「Subiendo video…」 and 「se está subiendo」 | Subiendo video / Seguir subiendo |
| TD-E3 | ESP | Original-source dialog | Video Enhance for Original Video Only | Potenciador de video solo para video original | Feature called 「Potenciador」 only here; everywhere else 「Mejora de video」 | Mejora de video solo para el vídeo original |
| TD-E4 | ESP | Panel (preview hint) | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Previsualice el video sin usar aún la Mejora de video con IA. Pulse en el botón Mejorar para continuar. | Reads as an instruction (「preview the video without using…」) instead of a status; usted | La vista previa aún no usa la Mejora de vídeo IA. Pulsa el botón Mejorar para continuar. |
| TD-E5 | ESP | All screens | AI Video Enhance (and every 「video」) | Mejora de video IA | Spain normally writes 「vídeo」 (accented); 「video」 is the Latin American form | Mejora de vídeo IA |
| TD-E6 | ESM | Recent task (cloud notice) | Tasks are stored on the cloud for 1 Year. Please download any you want to keep in local storage. | Las tareas se almacenan en la nube durante un año. Descargue aquellas que desee guardar en el almacenamiento local. | Formal usted, copied from ESP; every other ESM string uses tú (Toca, Arrastra, quieres) | Las tareas se guardan en la nube durante un año. Descarga las que quieras conservar en tu almacenamiento local. |
| TD-E7 | ESM | Generating progress | Creating AI Enhanced Video… %d%% | Creando video mejorado por AI… %d%% | English abbreviation 「AI」; ESM uses 「IA」 everywhere else (Preparing string: 「con IA」) | Creando video mejorado con IA… %d%% |
| TD-E8 | ESM | Panel (style label) | Enhancement style | Estilo de realce | 「Realce」 used only here; the feature and buttons say 「Mejora / Mejorar」 | Estilo de mejora |
| TD-E9 | PTB | Result | Enhance More | Aprimorar Mais | 「Enhance」 rendered four ways: Otimizador (name), Melhorar (buttons), Aprimorar (here, hint, sharp info), Realce (style) | Melhorar mais |
| TD-E10 | PTB | Panel (preview hint) | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Visualize vídeos que ainda não usam o Otimizador de vídeo por IA. Toque no botão Aprimorar para continuar. | Reads as 「view videos that don't use…」; names a button 「Aprimorar」 but the button says 「Melhorar」 | A prévia ainda não usa o Otimizador de vídeo por IA. Toque no botão Melhorar para continuar. |
| TD-E11 | PTB | Panel (price line) | Charge %d credits per second | Cobra %d crédito por segundo | Singular 「crédito」 with a count above 1 | Custa %d créditos por segundo |
| TD-E12 | DEU | Generating screen | Preparing AI Enhanced Video… | KI-Erweitert-Video wird vorbereitet… | Broken compound; the next string says 「Mit KI verbessertes Video」 | Mit KI verbessertes Video wird vorbereitet… |
| TD-E13 | DEU | Panel (preview hint) | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Vorschau von Video anzeigen, das KI-Videoerweiterung noch nicht verwendet. Tippen Sie auf die Schaltfläche Verbessern, um fortzufahren. | Awkward, instruction-like; feature called 「KI-Videoerweiterung」 only here (elsewhere 「Video optimieren mit KI」) | Die Vorschau verwendet „Video optimieren mit KI“ noch nicht. Tippen Sie auf „Verbessern“, um fortzufahren. |
| TD-E14 | DEU | Recent task (cloud notice) | Tasks are stored on the cloud for 1 Year. Please download any you want to keep in local storage. | Aufgaben werden für die Dauer 1 Jahres in der Cloud gespeichert. Laden Sie die herunter, die im lokalen Speicher gespeichert werden sollen. | 「für die Dauer 1 Jahres」 is ungrammatical; second sentence clumsy | Aufgaben werden 1 Jahr lang in der Cloud gespeichert. Laden Sie alle, die Sie behalten möchten, in den lokalen Speicher herunter. |
| TD-E15 | DEU | Result | Add to Timeline | Hinzufügen zur Zeitachse | Unnatural word order for a button | Zur Zeitachse hinzufügen |
| TD-E16 | DEU | Upload progress | Uploading Video | Video hochladen | Reads as a command (「upload video」), not a status | Video wird hochgeladen |
| TD-E17 | DEU | Leave dialog | Sure You Want to Leave? | Möchten Sie wirklich beenden? | 「beenden」 = quit/end, no object; the dialog is about leaving the page | Möchten Sie die Seite wirklich verlassen? |
| TD-E18 | DEU | Panel (price line) | Charge %d credits per second | Kosten %d Credit pro Sekunde | Singular 「Credit」 with a count; 「Kosten」 as a noun reads oddly | Kostet %d Credits pro Sekunde |
| TD-E19 | FRA | Original-source dialog | Video Enhance for Original Video Only | Améliorateur vidéo pour vidéo originale uniquement | 「Améliorateur」 used only here; the feature is 「Amélioration vidéo IA」 elsewhere | Amélioration vidéo réservée aux vidéos originales |
| TD-E20 | ITA | Upload progress | Please keep the app open | Tenere l'applicazione aperta. | Impersonal infinitive here (also 「Scaricare…」, 「Toccare il pulsante」) while other strings use tu (Tocca, Trascina, Vuoi, esci, Accorcia) | Tieni l'app aperta. |
| TD-E21 | RUS | Panel (preview hint) | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Просмотреть видео без использования функции ИИ-Улучшение видео. Для продолжения нажмите кнопку Улучшить. | Reads as an instruction (「view the video without using…」), not a status; stray capital in 「ИИ-Улучшение」 | Предпросмотр пока без ИИ-улучшения видео. Нажмите «Улучшить», чтобы продолжить. |
| TD-E22 | RUS | Leave dialog | Your video is still uploading. Leaving this page will cancel the process, and the credits will not be restored. | Загрузка вашего видео еще продолжается. Покидая эту страницу, процесс будет отменен, и кредиты не будут восстановлены. | Dangling participle (「Покидая…, процесс будет отменен」) is a grammar error | Видео ещё загружается. Если вы покинете эту страницу, процесс будет отменён, а кредиты не будут восстановлены. |
| TD-E23 | RUS | Upload progress / leave dialog | Uploading Video / Keep Uploading | Выгрузка видео / Продолжить загрузку | Upload called 「выгрузка」 and 「загрузка」 in the same flow | Загрузка видео / Продолжить загрузку |
| TD-E24 | RUS | Panel (style chip) | Sharp | Резкость | Noun 「sharpness」 beside adjective 「Естественный」 for the other style | Резкий |
| TD-E25 | UKR | Panel (generate button) | Try & Enhance | Спробуйте & Покращення | Verb + noun (「Try & Enhancement」); 「&」 unusual in Ukrainian | Спробувати й покращити |
| TD-E26 | UKR | Credit confirm dialog | %s credits will be used for this generation. | для цієї генерації буде використано %s кредитів. | Sentence starts in lowercase | Для цієї генерації буде використано %s кредитів. |
| TD-E27 | UKR | Result | Add to Timeline | Додати до хронології | 「Хронологія」 means chronology; editors call the timeline 「часова шкала」 | Додати на часову шкалу |
| TD-E28 | NLD | Result / upload / panel | Save Result (also Uploading Video, Enhance Video %s) | Resultaat Opslaan (also Video Uploaden, Verbeter Video %s) | English title case; Dutch capitalises only the first word | Resultaat opslaan / Video uploaden / Video verbeteren %s |
| TD-E29 | PLK | Upload progress | Please keep the app open | Proszę pozostaw aplikację otwartą | 「Proszę」 needs the infinitive; ungrammatical as written | Nie zamykaj aplikacji. |
| TD-E30 | PLK | Panel (generate button) | Try & Enhance | Wypróbuj & Ulepszenie | Verb + noun (「Try & Enhancement」) | Wypróbuj i ulepsz |
| TD-E31 | PLK | Leave dialog | Sure You Want to Leave? | Czy na pewno chcesz opuścić? | 「opuścić」 needs an object | Czy na pewno chcesz opuścić tę stronę? |
| TD-E32 | PLK | Feature name / result / upload | AI Video Enhance, Add to Timeline, Uploading Video, Enhance Video %s | Ulepszanie Wideo AI, Dodaj do Osi Czasu, Przesyłanie Wideo, Ulepsz Wideo %s | English title case; Polish capitalises only the first word | Ulepszanie wideo AI / Dodaj do osi czasu / Przesyłanie wideo / Ulepsz wideo %s |
| TD-E33 | TRK | Panel (style label) | Enhancement style | Düzeltme stili | 「Düzeltme」 = correction; the feature uses 「iyileştirme」 | İyileştirme stili |
| TD-E34 | TRK | Panel (Enhance button) | Enhance | Geliştir | Enhance rendered both 「Geliştir」 (button, hint, original-source dialog) and 「iyileştir」 (feature name, Enhance Video, bubbles) | İyileştir |
| TD-E35 | SVE | Generating screen | …You may also close the app and return later to check on the progress. | … du kan också stänga appen och återvända senare för att kontrollera framstegen. | Sentence starts in lowercase | Du kan också stänga appen och komma tillbaka senare för att se förloppet. |
| TD-E36 | SVE | Panel (price line) | Charge %d credits per second | Ta ut %d krediter per sekund | Literal imperative, reads as an order to the user | Kostar %d krediter per sekund |
| TD-E37 | DAN | Panel (price line) | Charge %d credits per second | Opkræv %d kreditter pr. sekund | Literal imperative, reads as an order to the user | Koster %d kreditter pr. sekund |
| TD-E38 | DAN | Upload progress | Uploading Video | Uploader Video | English title case | Uploader video |
| TD-E39 | NOR | Panel (price line) | Charge %d credits per second | Belast %d kreditter per sekund | Literal imperative, reads as an order to the user | Koster %d kreditter per sekund |
| TD-E40 | NOR | Generating screen | While your AI Enhanced Video is being processed, … | Mens din AI-forbedret video behandles, … | Adjective not inflected after 「din」 | Mens den AI-forbedrede videoen din behandles, … |
| TD-E41 | NOR | Leave dialog | Sure You Want to Leave? | Er du sikker på at du vil forlate? | 「forlate」 needs an object | Er du sikker på at du vil forlate siden? |
| TD-W1 | CHS | Launcher (big shortcut), phone walk | Video Enhance | 視頻画质增强 | First character is the Traditional 視 (CHS uses 视); the rest of the feature writes 视频 (AI 视频画质增强, 视频无损放大). Screenshot screenshots/CHS-01-launcher.png. Not among the 65 Video Enhance strings TC-321 read (Launcher key). | 视频画质增强 |
| TD-W2 | ESP | Clip toolbar (editor, phone walk) | Audio Tools | Tools de audio | Half left in English (「Tools」); the toolbar next to it says 「Herramientas」. Editor string, not one of the 65 Video Enhance strings. Screenshot screenshots/ESP-19-toolbar-1.png. | Herramientas de audio |
| TD-W3 | DEU | Clip toolbar › Verbessern group (editor, phone walk) | Fix Motion (stabilizer) | Fix Bewegung | Half left in English (「Fix」) beside 「Video optimieren mit KI」, 「KI Farbe」. Editor string, not one of the 65 Video Enhance strings. Screenshot screenshots/DEU-19b-enhance-group.png. | Bewegung stabilisieren |
| TD-W4 | ITA | Launcher (Cinematic Reel shortcut, other feature, phone walk) | Cinematic Reel Creator | Creatore di Reel Cinematografic(he) | Not a wording doubt but a truncation outside Video Enhance: the label wraps to two lines and the second is cut at the right edge, 「Cinematografic」 (page source: 「Creatore di Reel Cinematografiche」). Also 「Reel」 is masculine in Italian, so 「Cinematografici」. Screenshot screenshots/ITA-01-launcher.png. | Creatore di Reel cinematografici (or a shorter 「Reel cinematografici」) |
| TD-W5 | RUS | Panel (price line), phone walk | Charge 2 credits per second | Стоит 2 кредитов за одну секунду | After 2 Russian needs the genitive singular (2 кредита); the string uses one plural form for every count, and 「за одну секунду」 is wordy. Screenshot screenshots/RUS-04-panel.png. | Стоит 2 кредита в секунду (with plural forms for 1 / 2–4 / 5+) |
| TD-W6 | RUS | Result (third button), phone walk | Enhance More Videos | Улучшить Ещё | Capital 「Ещё」 mid-phrase (English title case) and 「Videos」 dropped. Screenshot screenshots/RUS-16-result.png. | Улучшить ещё видео |
| TD-W7 | RUS | Clip toolbar › Enhance group and toolbar (editor, other features, phone walk) | AI Video Upscaler; Tools | ИИ-повышение разрешения видео; Инстру менты | Not wording doubts but layout: the Upscaler label has room for two lines, so 「видео」 (third line) is lost (page source has it); the toolbar's 「Инструменты」 is split by a stray space, 「Инстру менты」. Outside Video Enhance. Screenshot screenshots/RUS-19b-enhance-group.png. | ИИ-апскейл видео (shorter) / Инструменты |
| TD-W8 | IND | Clip toolbar (Enhance group label, editor, phone walk) | Enhance | Sempurnaka / n | Not a wording doubt but layout: the toolbar label breaks the word mid-letter, 「Sempurnaka」 on line 1 and 「n」 on line 2 (whole string shown; page source 「Sempurnakan」). The group is the way into AI Video Enhance from the clip. Screenshot screenshots/IND-19-toolbar-3.png. | Wrap at word boundaries only, or a shorter label (「Tingkatkan」) |
| TD-W9 | ARA, FAR, HEB | Launcher, Demo page, Enhance panel (phone walk) | — (RTL layout) | Launcher toolbar and tab bar, Demo page (‹ back left, checkbox left of its label) and the panel (section labels left-aligned, ‹ back left, Recent-task icon right) keep the left-to-right layout, while Recent task, the Result tabs and the bubbles (bullets on the right) mirror. Arabic glyphs run right-to-left inside each label, nothing is cut. Not a translation doubt; a layout question for RD/PM. Screenshots screenshots/ARA-02-demo.png, ARA-04-panel.png, ARA-15b-recent.png. | Mirror the Demo page and panel like Recent task (or decide LTR is intended) |
| TD-W10 | ARA | Panel (badge, price line) vs times and credits (phone walk) | 60fps · 1080p; Charge 2 credits per second | ٦٠fps · ١٠٨٠p; يُخصم ٢ رصيدًا في الثانية | Arabic-Indic digits in the source badge, fps chips and price line, but Latin digits in 08:00, 00:09, 960, the resolution chips (720p, 1080p), the bubbles (8, 2:30) and the toast. Mixed digit systems on one panel. Screenshot screenshots/ARA-04-panel.png. | One digit system on the panel (Latin, as the times and credits) |
| TD-W11 | VIT | Clip toolbar and its Enhance group (editor, other features, phone walk) | Tools; Mask; AI Video Upscaler | Dụngcụ; Mặtnạ; Trình Nâng Cấp Video Bằng AI | 「Dụng cụ」 and 「Mặt nạ」 shown without their space; the Upscaler label has room for two lines, so 「Bằng AI」 (third line) is lost (page source has it). Outside Video Enhance. Screenshot screenshots/VIT-19b-enhance-group.png. | Dụng cụ / Mặt nạ / Nâng cấp video AI (shorter) |
| TD-W12 | PLK | Panel (price line), phone walk | Charge 2 credits per second | Pobiera 2 kredytów na sekundę | After 2 Polish needs 「kredyty」 (2–4), 「kredytów」 only from 5; the string uses one plural form for every count (as RUS TD-W5). Screenshot screenshots/PLK-04-panel.png. | Pobiera 2 kredyty na sekundę (with plural forms for 1 / 2–4 / 5+) |

### Translation doubts added 2026-11-26 (top-up)

| ID | Language | Screen | English | App shows | Why it seems off | Better wording |
|---|---|---|---|---|---|---|
| TD-A27 | ARA | Two-line label (video_enhance) | Video⏎Enhance | فيديو⏎تحسين | Keeps the English word order, so it reads "video / enhancement" backwards; Arabic puts the noun first. | تحسين⏎الفيديو |
| TD-A28 | VIT | Two-line label (video_enhance) | Video⏎Enhance | Video⏎Cải thiện | English word order ("Video Improve"); Vietnamese puts the verb first. Also a third word for Enhance (TD-A17). | Nâng cao⏎video |
| TD-A29 | VIT | Effects hint dialog | … Video Enhance will only apply … | … Nâng Cao Video chỉ áp dụng … | Title case in the middle of a sentence, and 「Nâng cao」 here vs 「Cải thiện」 on the label. | … Tính năng nâng cao video chỉ áp dụng … |
| TD-A30 | KOR | Effects hint dialog | … Video Enhance will only apply … | … 비디오 향상기는 … | 「비디오 향상기」 (video enhancer) where the label and feature say 동영상 향상 (same split as TD-A9). | … 동영상 향상은 … |
| TD-A31 | THA | Effects hint dialog | … Video Enhance will only apply … | … ตัวปรับคุณภาพวิดีโอจะถูกนำไปใช้ … | A different name from the label 「เครื่องมือปรับปรุงวิดีโอ」. | Use the label's name in both places |
| TD-E42 | PLK | Two-line label (video_enhance) | Video⏎Enhance | Wideo⏎Ulepszenie | English word order; Polish says 「Ulepszanie wideo」 (as the Launcher does). | Ulepszanie⏎wideo |
| TD-E43 | SVE | Two-line label (video_enhance) | Video⏎Enhance | Video⏎förbättra | A bare infinitive ("to improve") and two words; the Launcher says 「Videoförbättring」. | Video-⏎förbättring |
| TD-E44 | NOR | Two-line label (video_enhance) | Video⏎Enhance | Video⏎forbedre | A bare infinitive; a noun fits a label. | Video-⏎forbedring |
| TD-E45 | TRK | Two-line label (video_enhance) | Video⏎Enhance | Video⏎İyileştir | Imperative verb; the hint dialog says 「Video İyileştirme」. | Video⏎İyileştirme |
| TD-E46 | DAN | Two-line label and effects hint dialog | Video⏎Enhance; … Video Enhance will only apply … | Video⏎forbedring; … effekter. videoforbedring vil … | The label splits a Danish compound (Launcher: 「Videoforbedring」); in the hint the sentence starts with a lower-case 「videoforbedring」. | Video-⏎forbedring; … Videoforbedring vil … |
| TD-E47 | UKR | Two-line label (video_enhance) | Video⏎Enhance | Покращення⏎Відео | 「Відео」 capitalised mid-phrase (English title case copied). | Покращення⏎відео |
| TD-E48 | FRA | Effects hint dialog | The selected video has other effects. Video Enhance will only apply … | La vidéo sélectionnée a d'autres effets appliqués. Améliorateur vidéo sera appliqué … | 「Améliorateur vidéo」 (no article) where the label says 「Amélioration vidéo」; 「a d'autres effets appliqués」 is a calque. | La vidéo sélectionnée contient d'autres effets. L'amélioration vidéo s'appliquera uniquement à la vidéo source d'origine, sans ces effets. |
| TD-E49 | ESP, ESM | Effects hint dialog vs refund message | Do you want to continue? / Please try again later | ¿Desea continuar? / Inténtalo (ESP), Vuelve a intentarlo (ESM) | Formal 「usted」 in the hint, informal 「tú」 in the refund message of the same feature. | ¿Quieres continuar? |
| TD-E50 | ITA | Refund message | … or use a different video. | … o usa un video diverso, grazie. | Adds 「grazie」, which the English does not have and Italian UI text does not use. | … Riprova più tardi o usa un altro video. |

## Reconciliation against the run

Every row of the MUI phase, the run's observation and every translation doubt.

### Row-by-row map

| Row | Result | Where it went |
|---|---|---|
| TC-321 | Fail | 7. ISS-VEA-53; 8. ISS-VEA-54; held (31 APK-only fails); doubts TD-A1 – TD-A26, TD-E1 – TD-E41 |
| TC-322 | Pass | not raised (offline toast: DRA262611P0077) |
| TC-323 | Pass | doubt TD-W1 |
| TC-324 | Pass | not raised (JPN wraps shown in full) |
| TC-325 | Pass | doubt TD-W2 |
| TC-326 | Pass | — |
| TC-327 | Fail | 1. ISS-VEA-47; 9. ISS-VEA-55; doubt TD-W3 |
| TC-328 | Pass | 9. ISS-VEA-55 |
| TC-329 | Pass | doubt TD-W4 |
| TC-330 | Fail | 2. ISS-VEA-48; 9. ISS-VEA-55 (found while drafting); doubts TD-W5 – TD-W7 |
| TC-331 | Fail | 3. ISS-VEA-49; 9. ISS-VEA-55 |
| TC-332 | Fail | 4. ISS-VEA-50; 7. ISS-VEA-53; 8. ISS-VEA-54 |
| TC-333 | Pass | 9. ISS-VEA-55; doubt TD-W8 |
| TC-334 | Fail | 5. ISS-VEA-51 |
| TC-335 | Pass | 9. ISS-VEA-55 |
| TC-336 | Pass | — |
| TC-337 | Pass | not raised (upload subtitle padding) |
| TC-338 | Fail | 6. ISS-VEA-52; 7. ISS-VEA-53; doubts TD-W9, TD-W10 |
| TC-339 | Pass | 9. ISS-VEA-55 (found while drafting); doubt TD-W11; not raised (Part 3 upload failures) |
| TC-340 | Pass | 9. ISS-VEA-55; doubt TD-W12 |
| TC-341 | Pass | 7. ISS-VEA-53; 9. ISS-VEA-55 (found while drafting) |
| TC-342 | Pass | doubt TD-W9 |
| TC-343 | Pass | doubt TD-W9 |
| TC-344 | Pass | not raised (mid-word wraps shown in full) |
| TC-345 | Pass | 9. ISS-VEA-55 |
| TC-346 | Pass | 9. ISS-VEA-55 |
| TC-347 | Pass | 9. ISS-VEA-55 |
| OBS-MUI-1 | observation | 9. ISS-VEA-55 |
| TD-A1 | doubt | Translation doubts (your call) |
| TD-A2 | doubt | Translation doubts (your call) |
| TD-A3 | doubt | Translation doubts (your call) |
| TD-A4 | doubt | Translation doubts (your call) |
| TD-A5 | doubt | Translation doubts (your call) |
| TD-A6 | doubt | Translation doubts (your call) |
| TD-A7 | doubt | Translation doubts (your call) |
| TD-A8 | doubt | Translation doubts (your call) |
| TD-A9 | doubt | Translation doubts (your call) |
| TD-A10 | doubt | Translation doubts (your call) |
| TD-A11 | doubt | Translation doubts (your call) |
| TD-A12 | doubt | Translation doubts (your call) |
| TD-A13 | doubt | Translation doubts (your call) |
| TD-A14 | doubt | Translation doubts (your call) |
| TD-A15 | doubt | Translation doubts (your call) |
| TD-A16 | doubt | Translation doubts (your call) |
| TD-A17 | doubt | Translation doubts (your call) |
| TD-A18 | doubt | Translation doubts (your call) |
| TD-A19 | doubt | Translation doubts (your call) |
| TD-A20 | doubt | Translation doubts (your call) |
| TD-A21 | doubt | Translation doubts (your call) |
| TD-A22 | doubt | Translation doubts (your call) |
| TD-A23 | doubt | Translation doubts (your call) |
| TD-A24 | doubt | Translation doubts (your call) |
| TD-A25 | doubt | Translation doubts (your call) |
| TD-A26 | doubt | Translation doubts (your call) |
| TD-E1 | doubt | Translation doubts (your call) |
| TD-E2 | doubt | Translation doubts (your call) |
| TD-E3 | doubt | Translation doubts (your call) |
| TD-E4 | doubt | Translation doubts (your call) |
| TD-E5 | doubt | Translation doubts (your call) |
| TD-E6 | doubt | Translation doubts (your call) |
| TD-E7 | doubt | Translation doubts (your call) |
| TD-E8 | doubt | Translation doubts (your call) |
| TD-E9 | doubt | Translation doubts (your call) |
| TD-E10 | doubt | Translation doubts (your call) |
| TD-E11 | doubt | Translation doubts (your call) |
| TD-E12 | doubt | Translation doubts (your call) |
| TD-E13 | doubt | Translation doubts (your call) |
| TD-E14 | doubt | Translation doubts (your call) |
| TD-E15 | doubt | Translation doubts (your call) |
| TD-E16 | doubt | Translation doubts (your call) |
| TD-E17 | doubt | Translation doubts (your call) |
| TD-E18 | doubt | Translation doubts (your call) |
| TD-E19 | doubt | Translation doubts (your call) |
| TD-E20 | doubt | Translation doubts (your call) |
| TD-E21 | doubt | Translation doubts (your call) |
| TD-E22 | doubt | Translation doubts (your call) |
| TD-E23 | doubt | Translation doubts (your call) |
| TD-E24 | doubt | Translation doubts (your call) |
| TD-E25 | doubt | Translation doubts (your call) |
| TD-E26 | doubt | Translation doubts (your call) |
| TD-E27 | doubt | Translation doubts (your call) |
| TD-E28 | doubt | Translation doubts (your call) |
| TD-E29 | doubt | Translation doubts (your call) |
| TD-E30 | doubt | Translation doubts (your call) |
| TD-E31 | doubt | Translation doubts (your call) |
| TD-E32 | doubt | Translation doubts (your call) |
| TD-E33 | doubt | Translation doubts (your call) |
| TD-E34 | doubt | Translation doubts (your call) |
| TD-E35 | doubt | Translation doubts (your call) |
| TD-E36 | doubt | Translation doubts (your call) |
| TD-E37 | doubt | Translation doubts (your call) |
| TD-E38 | doubt | Translation doubts (your call) |
| TD-E39 | doubt | Translation doubts (your call) |
| TD-E40 | doubt | Translation doubts (your call) |
| TD-E41 | doubt | Translation doubts (your call) |
| TD-W1 | doubt | Translation doubts (your call) |
| TD-W2 | doubt | Translation doubts (your call) |
| TD-W3 | doubt | Translation doubts (your call) |
| TD-W4 | doubt | Translation doubts (your call) |
| TD-W5 | doubt | Translation doubts (your call) |
| TD-W6 | doubt | Translation doubts (your call) |
| TD-W7 | doubt | Translation doubts (your call) |
| TD-W8 | doubt | Translation doubts (your call) |
| TD-W9 | doubt | Translation doubts (your call) |
| TD-W10 | doubt | Translation doubts (your call) |
| TD-W11 | doubt | Translation doubts (your call) |
| TD-W12 | doubt | Translation doubts (your call) |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| PM | — |

### Filing order

Truncation (**1**, **2**, **3**, **4**, **5**, **6**), then translation (**7**, **8**), then the layout bug (**9**). Nothing is filed until the review page's decisions come back, with the TR named (build 2611201 is not a TR build).
