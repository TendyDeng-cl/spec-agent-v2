# Cinematic Reel Recommendation — photo tips (Android) — eBug drafts, round R2 (table v2), PDR-A 16.9.0 build 2611201

**Source:** pdr-spec-casebook run `library/pdr/cinematic-reel-recommendation/android/runs/2026-11-25-r2-full/` — round R2 of the approved v2 table (75 cases), 2026-11-25 14:42 → 16:23 (UTC+8) on Sony XQ-BT52 (Xperia 10 III) / Android 12, build 16.9.0 (2611201) from the Google Play internal test track, TR261123-0015, Stage server, account acda.test7 (Free). Tally: 56 Pass, 16 Fail (9 `question`, 7 `defect`), 3 Blocked. No credits used (2424 at start and end).

**Status:** drafts only, nothing filed, no existing ticket commented on. Dedupe per OS: the missing Add Media 「?」 (TC-010 – TC-015, Blocked TC-016 / TC-021) is DRA262611P0289 and the English chip and sentence (every Language row) is DRA262611P0290, both filed on this OS from R1 and left off (dedupe.txt). The pool search for the five new entries is in dedupe.txt.

Rules: spec-casebook `ebugs.md` step 1 and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line and an image on every entry, no video). None is failure-related (no failed generation, error, charge or refund; the sliced logs hold no failure line), so no log excerpt is attached. Text follows the text rule (AGENTS.md 2026-11-11): RD when the spec states the text and the app differs, PM when the spec's own text must change or no spec states it.

**What is drafted:** 5 entries (9 Fail rows of the full stop merged into one; 3 right-to-left languages into one).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD, PM or PC-Doc.

---

## 1. ISS-CRA-03 — Template descriptions end with a full stop that the CMS sheet's strings lack (9 languages, 14 cards)  ·  Class: UI  ·  Severity: S3  ·  Owner: PC-Doc

**Report step:** TC-025, TC-028, TC-030, TC-032, TC-040, TC-052, TC-062, TC-074  ·  **Reproduce:** 8/8  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Translation text for the Doc team (user, 2026-11-26: translation problems go to PC-Doc, not PM): `[AIAgent][UI]`, BugBelong PC-Doc. On the template page every description the app shows ends with a full stop (。 in 简体中文), in every language that uses one; the Cinestory CMS sheet, tab Template Description Localization (rows 2–7), has 14 strings in 8 columns with no closing stop while the other strings of the same column have one, so the sheet is inconsistent inside a language and the app (live CMS data) is consistent. Which is right is PM's call: either the sheet is out of date against the CMS, or the CMS was edited without the sheet. Cards by language (card number in that language's order, sheet column): 简体中文 chs card 4 「一镜到底」; Español (España) es card 6 「Cámara en mano」; 한국어 ko cards 2 「마이크로 시네마」, 3 「빠름 컷」, 4 「원테이크 촬영」; Deutsch de cards 2 「Mikro-Kino」 and 6 「Handheld-Kamera」; Português (Brasil) pt card 3 「Recorte Rápido」; Español (Latinoamérica) esm card 2 「Micro Cine」; Filipino fil card 3 「Mabilisang Pagputol」; Українська uk cards 2 「Мікро-кінотеатр」 and 4 「Зйомка одним дублем」. Every other card of these languages has the stop in both the sheet and the app. Not part of this: ไทย (no stops in the sheet or the app, all six, Pass) and हिन्दी card 1 (no closing mark in the sheet or the app, Pass). All names and all other descriptions matched word for word in all 28 languages. Severity S4: punctuation only. No log: text.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Template descriptions end with a full stop the CMS sheet lacks (9 languages)
```

**Description:**

```
Repro Steps:
1. Set the phone's system language to 한국어
2. Launch the APP
3. Tap 「시네마 릴 크리에이터」 on the Launcher
4. Swipe the template cards to the 「마이크로 시네마」 card
5. Check the description under the template name

Result:
14 descriptions in 9 languages end with a full stop in the app; the CMS sheet's strings for them have none.
摘要：9 個語系共 14 張範本卡的說明在 App 以句點結尾，CMS 表上的字串沒有句點。
{16.9.0_cra03_ko_card2.jpg} {16.9.0_cra03_de_card6.jpg} {16.9.0_cra03_uk_card2.jpg} {16.9.0_cra03_chs_card4.jpg}

Expect Result:
Doc team to decide whether these descriptions end with a full stop, and make the sheet and the CMS agree.
摘要：請 Doc team 決定這些說明是否以句點結尾，並讓表與 CMS 一致。
Spec string (chs, card 4): 「流畅的慢速镜头推进，让照片化为电影感运镜画面」
Spec string (es, card 6): 「Cámara en mano con cambios de foco; una foto se vuelve cine emotivo」
Spec string (ko, card 2): 「몽환적 클로즈업으로 이미지를 시적인 영화로」
Spec string (ko, card 3): 「대담한 컷, 세련된 템포—사진을 강렬한 시네마틱 쇼츠로」
Spec string (ko, card 4): 「사진이 부드럽게 펼쳐지는 느린 시네마틱 카메라 연출」
Spec string (de, card 2): 「Träumerische Nahaufnahmen verwandeln ein Bild in ein poetisches Filmvideo」
Spec string (de, card 6): 「Handkamera mit Fokuswechseln verwandelt ein Foto in einen filmischen Moment」
Spec string (pt, card 3): 「Cortes rápidos e ousados. Ritmo elegante. Transforme uma foto em um curta cinematográfico impactante」
Spec string (esm, card 2): 「Primeros planos oníricos que crean una historia visual cinematográfica desde una sola imagen」
Spec string (fil, card 3): 「Matapang mabilis na putol at estilong ritmo. Gawing isang larawan na moderno matinding maikling sine」
Spec string (uk, card 2): 「Мрійливі крупні плани творять кінематографічну історію. Поетичне відео народжується з одного кадру」
Spec string (uk, card 4): 「Плавне повільне відкриття камери. Одне фото перетворюється на кінематографічний рух камери」

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Cinestory CMS, Template Description Localization tab (rows 2 to 7, columns chs, es, ko, de, pt, esm, fil, uk) -
https://docs.google.com/spreadsheets/d/1XoLgFmZ4YGRPIcfG6xRTtx_3HJ63-Xo5O3uKFWJaRGI/edit
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0_images/01_ISS-CRA-03/`

---

## 2. ISS-CRA-04 — In Arabic, Persian and Hebrew the photo tips headings sit at the right while their bars stay at the left  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-054, TC-055, TC-064, TC-065, TC-066, TC-067 (observations; the rows passed as written)  ·  **Reproduce:** 18/18 sheets  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Visible layout defect, RD. In the three right-to-left languages the app carries (APK sets ar, fa, iw; run with ar-EG, fa-IR, he-IL) the sheet is drawn half mirrored: the heading text view spans the sheet's width (page source: tv_cine_story_photo_tips_recommendation / …_avoid at x 75, width 936) and its word is aligned to the right edge (「توصية」 / 「تجنّب」, 「پیشنهاد」 / 「اجتناب کنید」, 「המלצה」 / 「הימנע」), while the coloured bar that marks the heading stays at the left edge, about 900 px away from its word; the picture rows still start from the left and the Avoid row still scrolls from the left. The Design draws each heading as a bar with its word directly beside it. Either mirror the whole sheet (bar beside the word at the right, rows from the right) or keep the heading beside its bar; the half state is wrong either way, so it is filed although the Design draws no right-to-left frame. Same family on the template page: the card's name and description are left-aligned (attached as context, cra04_ar_card). The rows passed because they quote no alignment. All six sheets in each language (18/18). No log: layout.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Photo tips headings are split from their bars in Arabic, Persian and Hebrew
```

**Description:**

```
Repro Steps:
1. Set the phone's system language to العربية
2. Launch the APP
3. Tap 「منشئ الريلز」 on the Launcher
4. Tap 「View photo tips」 on the first template card
5. Check the two headings on the sheet

Result:
Each heading word is at the sheet's right edge while its coloured bar stays at the left edge (ar, fa, he).
摘要：阿拉伯文、波斯文、希伯來文下，兩個標題文字靠右，標題色條卻留在最左邊。
{16.9.0_cra04_ar_sheet.jpg} {16.9.0_cra04_fa_sheet.jpg} {16.9.0_cra04_he_sheet.jpg} {16.9.0_cra04_ar_card.jpg}

Expect Result:
Each heading word sits directly beside its coloured bar, as the Design draws, in right-to-left languages too.
摘要：由右至左的語系下，標題文字也應如 Design 緊鄰其色條。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Cinematic Reel Creator Design spec (CineStory, frame 26.07_v2), 0820 add photo tips board (each heading drawn as a bar with its word beside it) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0_images/02_ISS-CRA-04/`

---

## 3. ISS-CRA-05 — In Dansk the photo tips caption 「Bevægelsesfornemmelse」 is broken inside the word, leaving a lone 「e」  ·  Class: UI  ·  Severity: S3  ·  Owner: RD

**Report step:** TC-071  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Visible layout defect, RD (the caption's words are the sheet's and correct: I2V Recommendation › Localization, column DAN, 「Bevægelsesfornemmelse」; what is wrong is how it is drawn). On the 「Hurtigt Klip」 (Fast Cut) sheet the first Anbefaling caption is one word wider than its 397 px caption box (page source: tv_photo_tip_name 69,1448,397,88) and wraps inside the word with no hyphen: 「Bevægelsesfornemmels」 on line 1 and 「e」 alone on line 2. Every other caption in Danish and in the other 27 languages wraps between words or fits (Norsk 「Bevegelsesfølelse」 fits on one line). A smaller text size for a single long word, hyphenation, or a wider caption box would fix it; RD's choice. No log: layout.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Danish photo tips caption 「Bevægelsesfornemmelse」 breaks mid-word
```

**Description:**

```
Repro Steps:
1. Set the phone's system language to Dansk
2. Launch the APP
3. Tap 「Filmiske reels」 on the Launcher
4. Swipe the template cards to the 「Hurtigt Klip」 card
5. Tap 「View photo tips」 on that card
6. Check the caption under the first picture

Result:
The caption is drawn 「Bevægelsesfornemmels」 with a lone 「e」 on a second line, broken inside the word.
摘要：丹麥文第一張圖的說明在單字中間斷行，第二行只剩一個「e」。
{16.9.0_cra05_da_caption.jpg}

Expect Result:
The caption 「Bevægelsesfornemmelse」 is drawn whole, not broken inside the word.
摘要：說明文字「Bevægelsesfornemmelse」應完整顯示，不在單字中間斷行。
Spec string: 「Bevægelsesfornemmelse」

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: I2V Recommendation, Localization tab (column DAN, Sense of Motion) -
https://docs.google.com/spreadsheets/d/1YyFe5x8zboz3YefOwZDGz05z1Az1a1W-R4bzkUaM1YE/edit?gid=1314494718#gid=1314494718
Spec Link: Cinematic Reel Creator Design spec (CineStory, frame 26.07_v2), 0820 add photo tips board (caption under each picture) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0_images/03_ISS-CRA-05/`

---

## 4. ISS-CRA-06 — In Filipino the photo tips sheet is half translated: captions Filipino, headings and button English  ·  Class: UI  ·  Severity: S3  ·  Owner: PC-Doc

**Report step:** TC-063, TC-062  ·  **Reproduce:** 6/6 sheets  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Translation problem for the Doc team (user, 2026-11-26): `[AIAgent][UI]`, BugBelong PC-Doc. With the phone in Filipino (fil-PH) the CMS serves the Filipino template names, descriptions and captions (all word for word with Cinestory CMS column fil and I2V Recommendation › Localization column FPO), but the app has no Filipino strings of its own: the installed APK's only Filipino set is 「tl」 with 240 library strings (aapt2 dump of base.apk; Svenska has 5620) and Filipino is not one of PowerDirector's 26 languages (`library/pdr/product.json`). So the sheet shows 「Recommendation」, 「Avoid」 and 「Got it」 in English around Filipino captions, the card button reads 「Import a photo」 and the Launcher is English. Doc team to decide: add Filipino app strings, or do not serve Filipino CMS content to an app without Filipino. This is wider than DRA262611P0290 (chip and sentence English in every language): there the headings and the button are translated, here nothing of the app is. TC-062's own failure (card 3 full stop) is in ISS-CRA-03. No log: text.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Filipino photo tips sheet mixes Filipino captions with English headings and button
```

**Description:**

```
Repro Steps:
1. Set the phone's system language to Filipino
2. Launch the APP
3. Tap 「Cinematic Reel Creator(Android)」 on the Launcher
4. Tap 「View photo tips」 on the first template card
5. Check the headings, the captions and the button

Result:
Template name and captions are Filipino; the headings 「Recommendation」 / 「Avoid」 and 「Got it」 are English.
摘要：菲律賓文下，範本名稱與圖片說明是菲律賓文，兩個標題與按鈕卻是英文。
{16.9.0_cra06_fil_sheet.jpg}

Expect Result:
Doc team to decide: add Filipino app strings, or do not serve Filipino CMS content to an app with no Filipino.
摘要：請 Doc team 決定：補上 App 的菲律賓文字串，或不對沒有菲律賓文的 App 提供菲律賓文 CMS 內容。

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: I2V Recommendation, Localization tab (column FPO gives the Filipino captions) -
https://docs.google.com/spreadsheets/d/1YyFe5x8zboz3YefOwZDGz05z1Az1a1W-R4bzkUaM1YE/edit?gid=1314494718#gid=1314494718
Spec Link: Cinestory CMS, Template Name Localization tab (column fil gives the Filipino template names) -
https://docs.google.com/spreadsheets/d/1XoLgFmZ4YGRPIcfG6xRTtx_3HJ63-Xo5O3uKFWJaRGI/edit
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0_images/04_ISS-CRA-06/`

---

## 5. ISS-CRA-07 — In Türkçe the first photo tips heading reads 「öneri」 with a small first letter  ·  Class: UI  ·  Severity: S3  ·  Owner: PC-Doc

**Report step:** TC-061 (observation; the row passed as written)  ·  **Reproduce:** 6/6 sheets  ·  **Verified on:** 16.9.0.2611201

> **QA note — not pasted into eBug.** Text, no spec states it (no sheet gives the headings' translations), so `[AIAgent][UI]`, BugBelong PC-Doc as a translation problem (user, 2026-11-26); the Doc team may hand it to RD, the string is the app's own (APK resource, tr: 「öneri」; the same resource is 「Rekommendation」, 「Recomendación」, 「Рекомендація」, 「Aanbeveling」 … with a capital in the other languages that have capitals). On all six Turkish sheets the first heading is 「öneri」 while the second is 「Kaçının」 and the button 「Anladım」. The row passed because it quotes no heading text. Severity S4. No log: text.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Turkish photo tips heading reads 「öneri」 with a small first letter
```

**Description:**

```
Repro Steps:
1. Set the phone's system language to Türkçe
2. Launch the APP
3. Tap 「Sinematik Reel Oluşturucu」 on the Launcher
4. Tap 「View photo tips」 on the first template card
5. Check the first heading on the sheet

Result:
The first heading reads 「öneri」 with a small first letter; the second heading 「Kaçının」 is capitalised.
摘要：土耳其文第一個標題「öneri」首字母小寫，第二個標題「Kaçının」則為大寫。
{16.9.0_cra07_tr_heading.jpg}

Expect Result:
Doc team to confirm the Turkish heading; other languages and the second heading start with a capital.
摘要：請 Doc team 確認土耳其文標題；其他語系與第二個標題皆以大寫開頭。

[AI Recommendation]
Heading (tr): 「Öneri」

Note:
Device: Sony XQ-BT52 (Xperia 10 III) / Android 12
Spec Link: Cinematic Reel Creator Design spec (CineStory, frame 26.07_v2), 0820 add photo tips board (first heading drawn 「Recommendation」, capitalised) -
https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0_images/05_ISS-CRA-07/`

---

## Not raised (observations, for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| TC-010 – TC-015 | Fail `defect`: Add Media opened from each of the six cards has no 「?」 | Same OS, already filed: DRA262611P0289 (dedupe.txt). |
| TC-016, TC-021 | Blocked `defect`: no sheet can be opened from Add Media | Wait behind DRA262611P0289; rerun once PM decides. |
| TC-019 | Blocked `observability`: the app logs no CMS recommend_samples / template data | No verdict; parked (needs: cms-log), not a finding. |
| Every Language row | Chip 「View photo tips」 and the sentence frame stay English in all 27 other languages | Same OS, already filed: DRA262611P0290 (dedupe.txt). |
| ไทย, हिन्दी card 1 | No closing mark in the sheet and none in the app | Sheet and app agree; Pass. |
| Tool | Google Play's language screen and the 「Xperia System-Update」 heads-up after locale changes | Phone / environment, not PowerDirector; left with Back. |

## Reconciliation against the run

16 Fail (9 `question`, 7 `defect`), 3 Blocked, 3 observations raised from passing rows (right-to-left headings, Turkish heading; Filipino UI seen in TC-062 too). 8 full-stop Fail rows → 1 entry; TC-063 → 1 entry; TC-071 → 1 entry; observations → 2 entries; 6 Fail and 2 Blocked rows of DRA262611P0289 and TC-019 → not raised. Entries: 5.

### Delta

| Step | Count | Running total |
|---|---|---|
| Fail rows in the run | 16 | 16 |
| TC-010 – TC-015 already filed as DRA262611P0289 (same OS) | −6 | 10 |
| TC-025, TC-028, TC-030, TC-032, TC-040, TC-052, TC-062, TC-074 merged into ISS-CRA-03 | −7 | 3 |
| TC-063 → ISS-CRA-06, TC-071 → ISS-CRA-05 | 0 | 3 |
| Observations filed: right-to-left headings (ISS-CRA-04), Turkish heading (ISS-CRA-07) | +2 | 5 |
| Blocked TC-016, TC-019, TC-021 not raised | 0 | 5 |

### Row-by-row map

| Item | Result | Disposition | Became |
|---|---|---|---|
| TC-010 – TC-015 | Fail | defect | not raised (DRA262611P0289, same OS) |
| TC-016, TC-021 | Blocked | defect | not raised (behind DRA262611P0289) |
| TC-019 | Blocked | observability | not raised (no verdict; needs cms-log) |
| TC-025 | Fail | question | 1. ISS-CRA-03 |
| TC-028 | Fail | question | 1. ISS-CRA-03 |
| TC-030 | Fail | question | 1. ISS-CRA-03 |
| TC-032 | Fail | question | 1. ISS-CRA-03 |
| TC-040 | Fail | question | 1. ISS-CRA-03 |
| TC-052 | Fail | question | 1. ISS-CRA-03 |
| TC-062 | Fail | question | 1. ISS-CRA-03 (its English UI: 4. ISS-CRA-06) |
| TC-074 | Fail | question | 1. ISS-CRA-03 |
| TC-063 | Fail | question | 4. ISS-CRA-06 |
| TC-071 | Fail | defect | 3. ISS-CRA-05 |
| TC-054, TC-055, TC-064 – TC-067 | Pass | (observation) | 2. ISS-CRA-04 |
| TC-061 | Pass | (observation) | 5. ISS-CRA-07 |

### Owner split

| Owner | Entries |
|---|---|
| RD | 2, 3 |
| PC-Doc | 1, 4, 5 |

### Filing order

RD layout defects first (**2**, **3**), then the PC-Doc translation entries (**4**, **1**, **5**). Decisions of 2026-11-26: `decisions.md`.
