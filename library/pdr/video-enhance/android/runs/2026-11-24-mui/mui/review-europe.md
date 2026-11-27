# MUI translation review: Europe and Americas (pdr/video-enhance, Android)

Build 16.9.0.2611231. Source: `mui-strings.json` (65 strings), read against the English as a native reader would.
Languages: ESP, ESM, PTB, DEU, FRA, ITA, RUS, UKR, NLD, PLK, TRK, SVE, DAN, NOR.

| Language | Strings checked | Fails | Doubts | Accepted English-identical |
|---|---|---|---|---|
| ESP | 65 | 1 | 5 | 8: fps, %dfps, %1$dfps · %2$dp, Natural (same word in Spanish), 720p, 1080p, 4K, %1$s/%2$s |
| ESM | 65 | 1 | 3 | 7: fps, %1$dfps · %2$dp, Natural, 720p, 1080p, 4K, %1$s/%2$s |
| PTB | 65 | 1 | 3 | 7: %dfps, %1$dfps · %2$dp, Natural (same word in Portuguese), 720p, 1080p, 4K, %1$s/%2$s |
| DEU | 65 | 1 | 7 | 8: fps, %dfps, %1$dfps · %2$dp, Standard (same word in German), 720p, 1080p, 4K, %1$s/%2$s |
| FRA | 65 | 1 | 1 | 9: fps, %dfps, %1$dfps · %2$dp, Mode, Standard (both same words in French), 720p, 1080p, 4K, %1$s/%2$s |
| ITA | 65 | 2 | 1 | 8: fps, %dfps, %1$dfps · %2$dp, Standard (used as-is in Italian), 720p, 1080p, 4K, %1$s/%2$s |
| RUS | 65 | 1 | 4 | 5: %1$dfps · %2$dp, 720p, 1080p, 4K, %1$s/%2$s |
| UKR | 65 | 0 | 3 | 7: fps, %dfps, %1$dfps · %2$dp, 720p, 1080p, 4K, %1$s/%2$s |
| NLD | 65 | 5 | 1 | 7: fps, %dfps, %1$dfps · %2$dp, 720p, 1080p, 4K, %1$s/%2$s |
| PLK | 65 | 1 | 4 | 7: fps, %dfps, %1$dfps · %2$dp, 720p, 1080p, 4K, %1$s/%2$s |
| TRK | 65 | 2 | 2 | 7: fps, %dfps, %1$dfps · %2$dp, 720p, 1080p, 4K, %1$s/%2$s |
| SVE | 65 | 1 | 2 | 8: fps, %dfps, %1$dfps · %2$dp, Standard (same word in Swedish), 720p, 1080p, 4K, %1$s/%2$s |
| DAN | 65 | 1 | 2 | 8: fps, %dfps, %1$dfps · %2$dp, Standard (same word in Danish), 720p, 1080p, 4K, %1$s/%2$s |
| NOR | 65 | 1 | 3 | 8: fps, %dfps, %1$dfps · %2$dp, Standard (same word in Norwegian), 720p, 1080p, 4K, %1$s/%2$s |
| **Total** | 910 | **19** | **41** | |

All placeholders (`%s`, `%d`, `%d%%`, `%1$d`/`%2$d`, `%1$s`/`%2$s`) are present in every language; no line breaks are used. Every number (1 year, 5 minutes, 2.5 minutes, 8 minutes, 2:30 / 2 min 30 s) matches the English in all 14 languages.

## Fails

| Language | Key | English | App shows | What is wrong |
|---|---|---|---|---|
| ESP | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (the other two Terms keys say 「Términos del servicio」) |
| PTB | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other keys: 「Termos de Serviço」) |
| DEU | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other keys: 「Nutzungsbedingungen」) |
| FRA | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other keys: 「Conditions de service」) |
| ITA | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other keys: 「Termini di servizio」) |
| RUS | iap_golden_week_terms_of_service | Terms of Service | Terms of Service | Left in English (other keys: 「Условия обслуживания」) |
| ESM | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | La vista previa aún no usa Video Enhance. Toca el botón Mejorar para continuar. | Feature name left in English; ESM calls it 「Mejora de video con IA」 everywhere else |
| NLD | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Voorbeeldvideo maakt nog geen gebruik van Video Enhance. Tik op de knop Enhance om door te gaan. | Feature name and button left in English; the button itself reads 「Verbeteren」 |
| PLK | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Podgląd wideo nie korzysta jeszcze z Video Enhance. Stuknij przycisk Enhance, aby kontynuować. | Feature name and button left in English; the button reads 「Ulepsz」 |
| SVE | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Förhandsgranskningsvideon använder ännu inte Video Enhance. Tryck på Enhance-knappen för att fortsätta. | Feature name and button left in English; the button reads 「Förbättra」 |
| DAN | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Forhåndsvisningsvideoen bruger endnu ikke Video Enhance. Tryk på Forbedr knappen for at fortsætte. | Feature name left in English; button named 「Forbedr」 but it reads 「Forbedre」, and the compound lacks its hyphen (「Forbedre-knappen」) |
| NOR | video_enhance_hint | Preview video not yet using Video Enhance. Tap Enhance button to continue. | Forhåndsvisningsvideoen bruker ennå ikke Video Enhance. Trykk på Forbedre-knappen for å fortsette. | Feature name left in English; NOR calls it 「Forbedre video med AI」 elsewhere |
| NLD | ai_video_anime_checkbox | Don't show again | Niet' meer tonen | Garbled: stray apostrophe copied from 「Don't」 |
| NLD | dont_show_message_again | Don't show again | Niet' meer weergeven | Garbled: stray apostrophe copied from 「Don't」 |
| TRK | ai_video_anime_checkbox | Don't show again | Bir daha gösterme' | Garbled: stray trailing apostrophe (dont_show_message_again is correct) |
| TRK | video_enhance_generate_button | Try & Enhance | & Enhance'i deneyin | 「Enhance」 left in English and the phrase is garbled (「try the & Enhance」) |
| NLD | video_enhance_generate_button | Try & Enhance | Probeer & Enhance | 「Enhance」 left in English |
| NLD | video_enhance_v2_leave_title | Sure You Want to Leave? | Weet Je Zeker Dat Je Wilt Stoppen Met Bewerken? | Means 「stop editing?」, not leaving the upload page (also un-Dutch title case) |
| ITA | video_enhance_credits_deduction_duration_confirm_message | %s credits will be used for this generation, and will take over 5 minutes of processing time to ensure quality throughout. | Per la generazione sono necessari %s crediti, per garantire la qualità della trasmissione saranno necessari oltre 5 minuti. | 「throughout」 rendered as 「della trasmissione」 (of the broadcast): says something the English does not |

## Translation doubts

| ID | Language | Screen | English | App shows | Why it seems off | Better wording |
|---|---|---|---|---|---|---|
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

## ESM falling back to ESP

None. All 65 ESM strings come from the app's own `es-rMX` resources (`"from": "es-rMX"`); no ESM string falls back to `es`.

Two ESM strings are word-for-word copies of the Spain text inside `es-rMX` (`image_to_video_recent_cloud_notice`, `tti_history_cloud_notice`): their wording is fine for Mexico, but the formal 「Descargue … desee」 clashes with ESM's tú elsewhere (TD-E6).

## Note outside the translations

`demo_shortcut_sub_title_video_enhancer` is about AI reframing (「AI reframe your video for any aspect ratio, then fine-tune the crop in real time」) in the English itself, and every language translates it faithfully. If it shows on the Video Enhance demo page it is a source-text problem for RD/PM, not a translation fail.

## Top-up 2026-11-26: 3 strings the first read missed

The first read dropped every string holding a line break (fixed in `scripts/mui-strings.ts` on 2026-11-25). Re-read from the 2611201 APK into `mui-topup/` (68 strings, 65 + these 3): `video_enhance` (two-line label), `video_enhance_v2_refunded_content` (refund message), `video_enhancer_original_source_hint_dialog_content` (dialog when the clip has effects). None of the three was seen on the phone walks, so the fails are APK-only (held like `video_enhance_hint`).

### Fails

| Language | Key | English | App shows | What is wrong |
|---|---|---|---|---|
| ESM | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … Video Enhance solo se aplicará al video fuente original … | 「Video Enhance」 left in English (Launcher: 「Mejora de video con IA」). |
| PLK | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … Video Enhance zostanie zastosowane tylko do oryginalnego pliku wideo … | 「Video Enhance」 left in English (Launcher: 「Ulepszanie Wideo AI」). |
| SVE | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … Video Enhance kommer endast att tillämpas på ursprungsvideon … | 「Video Enhance」 left in English (Launcher: 「Videoförbättring」). |
| NOR | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … Video Enhance vil bare gjelde for den opprinnelige videokilden … | 「Video Enhance」 left in English (Launcher: 「Forbedre video med AI」). |
| UKR | video_enhancer_original_source_hint_dialog_content | The selected video has other effects. Video Enhance will only apply to the original source video, without any applied effects. / Do you want to continue? | … Video Enhance буде застосовано лише до вихідного відео … | 「Video Enhance」 left in English (Launcher: 「AI-покращення відео」). |

### Translation doubts

| ID | Language | Screen | English | App shows | Why it seems off | Better wording |
|---|---|---|---|---|---|---|
| TD-E42 | PLK | Two-line label (video_enhance) | Video⏎Enhance | Wideo⏎Ulepszenie | English word order; Polish says 「Ulepszanie wideo」 (as the Launcher does). | Ulepszanie⏎wideo |
| TD-E43 | SVE | Two-line label (video_enhance) | Video⏎Enhance | Video⏎förbättra | A bare infinitive ("to improve") and two words; the Launcher says 「Videoförbättring」. | Video-⏎förbättring |
| TD-E44 | NOR | Two-line label (video_enhance) | Video⏎Enhance | Video⏎forbedre | A bare infinitive; a noun fits a label. | Video-⏎forbedring |
| TD-E45 | TRK | Two-line label (video_enhance) | Video⏎Enhance | Video⏎İyileştir | Imperative verb; the hint dialog says 「Video İyileştirme」. | Video⏎İyileştirme |
| TD-E46 | DAN | Two-line label and effects hint dialog | Video⏎Enhance; … Video Enhance will only apply … | Video⏎forbedring; … effekter. videoforbedring vil … | The label splits a Danish compound (Launcher: 「Videoforbedring」); in the hint the sentence starts with a lower-case 「videoforbedring」. | Video-⏎forbedring; … Videoforbedring vil … |
| TD-E47 | UKR | Two-line label (video_enhance) | Video⏎Enhance | Покращення⏎Відео | 「Відео」 capitalised mid-phrase (English title case copied). | Покращення⏎відео |
| TD-E48 | FRA | Effects hint dialog | The selected video has other effects. Video Enhance will only apply … | La vidéo sélectionnée a d'autres effets appliqués. Améliorateur vidéo sera appliqué … | 「Améliorateur vidéo」 (no article) where the label says 「Amélioration vidéo」; 「a d'autres effets appliqués」 is a calque. | La vidéo sélectionnée contient d'autres effets. L'amélioration vidéo s'appliquera uniquement à la vidéo source d'origine, sans ces effets. |
| TD-E49 | ESP, ESM | Effects hint dialog vs refund message | Do you want to continue? / Please try again later | ¿Desea continuar? / Inténtalo (ESP), Vuelve a intentarlo (ESM) | Formal 「usted」 in the hint, informal 「tú」 in the refund message of the same feature. | ¿Quieres continuar? |
| TD-E50 | ITA | Refund message | … or use a different video. | … o usa un video diverso, grazie. | Adds 「grazie」, which the English does not have and Italian UI text does not use. | … Riprova più tardi o usa un altro video. |
