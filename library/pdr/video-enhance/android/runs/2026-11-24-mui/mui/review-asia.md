# MUI translation review: Asia, Middle East (AI Video Enhance, Android)

Build 16.9.0.2611231. Source: `mui-strings.json` (65 strings) and `mui-strings.md`. Reviewed languages: CHT, CHS, JPN, KOR, THA, HIN, VIT, IND, MAY, ARA, FAR, HEB.

Accepted as identical to English (not counted as fails): `video_enhance_v2_fps` "fps", `video_enhance_v2_fps_value` "%dfps", `video_enhance_v2_source_info` "%1$dfps · %2$dp", the resolution names 1080p / 720p / 4K, `video_enhance_v2_preview_time` "%1$s/%2$s", IND `video_enhance_v2_mode` "Mode" (a normal Indonesian word) and MAY `video_enhance_v2_mode_standard` "Standard" (a normal Malay word). "Pro" and "AI" kept in Latin script are accepted. Every placeholder (`%s`, `%d`, `%d%%`, `%1$s`/`%2$s`) is present in every reviewed language. Every number (8 min, 2.5 min, 2:30, 2m 30s, 5 minutes, 1 year) agrees with the English in all 12 languages. No string falls back to English through a missing resource.

Source text note (not a translation problem, not counted): `demo_shortcut_sub_title_video_enhancer` is "AI reframe your video for any aspect ratio, then fine-tune the crop in real time." in English, which describes AI Reframe, not Video Enhance. Every language translates it faithfully, so the Demo page subtitle is wrong in all languages, English included.

| Language | Strings checked | Fails | Doubts | Accepted English-identical |
|---|---|---|---|---|
| CHT | 65 | 1 | 2 | 3 |
| CHS | 65 | 1 | 1 | 3 |
| JPN | 65 | 0 | 3 | 3 |
| KOR | 65 | 1 | 3 | 3 |
| THA | 65 | 1 | 3 | 1 |
| HIN | 65 | 1 | 4 | 2 |
| VIT | 65 | 3 | 1 | 3 |
| IND | 65 | 1 | 2 | 4 |
| MAY | 65 | 1 | 2 | 4 |
| ARA | 65 | 4 | 1 | 3 |
| FAR | 65 | 1 | 2 | 3 |
| HEB | 65 | 1 | 2 | 3 |
| **Total** | 780 | 16 | 26 | 35 |

The "Accepted English-identical" column counts the strings the script flagged as identical to English that are acceptable as they are. The resolution and preview-time strings are not flagged by the script and are not counted.

## Fails

| Language | Key | English | App shows | What is wrong |
|---|---|---|---|---|
| CHT | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English. The other two Terms keys show 服務條款. It is a fail only if this key appears on the Video Enhance purchase screen. |
| CHS | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other Terms keys: 服务条款). Same condition as CHT. |
| KOR | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other Terms keys: 서비스 약관). Same condition as CHT. |
| THA | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other Terms keys translated). Same condition as CHT. |
| HIN | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other Terms keys: सेवा की शर्तें). Same condition as CHT. |
| IND | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other Terms keys: Syarat Layanan). Same condition as CHT. |
| MAY | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other Terms keys: Terma Perkhidmatan). Same condition as CHT. |
| VIT | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Xem trước video not yet using Nâng Cao Video. Tap Cải thiện button to continue. | Only partly translated. Most of the sentence is still English ("not yet using", "Tap … button to continue"). |
| VIT | video_enhance_generating_subtitle | While your AI Enhanced Video is being processed, … | Trong khi AI Cải thiệnd Videocủa bạn đang được xử lý, … | Garbled: "Cải thiệnd" is a Vietnamese word with an English "-d" suffix, "Videocủa" is missing a space, and the English word order "AI Enhanced Video" is kept. |
| VIT | video_enhance_uploading_video | Uploading Video | Đang Tải VideoLên | Missing space: "VideoLên" should be "Video Lên". The phrase is also split wrongly ("Đang Tải Video Lên"). |
| ARA | ai_video_anime_checkbox | Don't show again | لا تظهر مرة أخرى' | A stray apostrophe (left over from the English "Don't") is shown after the text. |
| ARA | dont_show_message_again | Don't show again | لا' تظهر مرة أخرى | A stray apostrophe is shown inside the text, after لا. |
| ARA | video_enhance_generating_subtitle | While your AI Enhanced Video is being processed, … | بينما يتم معالجة AI Enhanced Video الخاص بك، … | "AI Enhanced Video" is left in English inside the Arabic sentence. Elsewhere the feature is translated (الفيديو المحسّن بالذكاء الاصطناعي). |
| ARA | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | لم يتم استخدام Video Enhance في معاينة الفيديو بعد. اضغط على زر Enhance للمتابعة. | "Video Enhance" and "Enhance" are left in English. The button the hint points to is labelled حسّن in Arabic, so the user is told to tap a button name that is not on screen. |
| FAR | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | پیش‌نمایش ویدیو هنوز از Video Enhance استفاده نمی‌کند. … | "Video Enhance" is left in English. Elsewhere the feature name is translated (بهبود ویدیو با AI). |
| HEB | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | הסרטון בתצוגה המקדימה עדיין לא משתמש ב-Video Enhance. הקש על שפר כדי להמשיך. | "Video Enhance" is left in English. Elsewhere the feature name is translated (שיפור וידאו ב-AI). |

## Translation doubts

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

## Top-up 2026-11-26: 3 strings the first read missed

The first read dropped every string holding a line break (fixed in `scripts/mui-strings.ts` on 2026-11-25). Re-read from the 2611201 APK into `mui-topup/` (68 strings, 65 + these 3): `video_enhance` (two-line label), `video_enhance_v2_refunded_content` (refund message), `video_enhancer_original_source_hint_dialog_content` (dialog when the clip has effects). None of the three was seen on the phone walks, so the fails are APK-only (held like `video_enhance_hint`).

### Fails

| Language | Key | English | App shows | What is wrong |
|---|---|---|---|---|
| JPN | video_enhance_v2_refunded_content | Credits have been refunded.⏎The server may be busy. … | クレジットを返却しました。サーバーが混み合っている…（no line break） | The line break after the first sentence is missing (every other language keeps it), so the refund message runs as one block. |
| ARA | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … سيطبق Video Enhance على الفيديو المصدر الأصلي فقط … | 「Video Enhance」 left in English. Elsewhere the feature is translated (تحسين الفيديو بالذكاء الاصطناعي). |
| HEB | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … Video Enhance יחול רק על סרטון המקור … | 「Video Enhance」 left in English. Elsewhere the feature is translated (שיפור וידאו ב-AI). |

### Translation doubts

| ID | Language | Screen | English | App shows | Why it seems off | Better wording |
|---|---|---|---|---|---|---|
| TD-A27 | ARA | Two-line label (video_enhance) | Video⏎Enhance | فيديو⏎تحسين | Keeps the English word order, so it reads "video / enhancement" backwards; Arabic puts the noun first. | تحسين⏎الفيديو |
| TD-A28 | VIT | Two-line label (video_enhance) | Video⏎Enhance | Video⏎Cải thiện | English word order ("Video Improve"); Vietnamese puts the verb first. Also a third word for Enhance (TD-A17). | Nâng cao⏎video |
| TD-A29 | VIT | Effects hint dialog | … Video Enhance will only apply … | … Nâng Cao Video chỉ áp dụng … | Title case in the middle of a sentence, and 「Nâng cao」 here vs 「Cải thiện」 on the label. | … Tính năng nâng cao video chỉ áp dụng … |
| TD-A30 | KOR | Effects hint dialog | … Video Enhance will only apply … | … 비디오 향상기는 … | 「비디오 향상기」 (video enhancer) where the label and feature say 동영상 향상 (same split as TD-A9). | … 동영상 향상은 … |
| TD-A31 | THA | Effects hint dialog | … Video Enhance will only apply … | … ตัวปรับคุณภาพวิดีโอจะถูกนำไปใช้ … | A different name from the label 「เครื่องมือปรับปรุงวิดีโอ」. | Use the label's name in both places |
