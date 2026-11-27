# Observations — AIGC Watermark Android, MUI run 2026-11-25

- **O-1 (TC-133, JPN export dialog).** The body wraps to four lines and breaks 「ウォーターマーク」 as 「ウォータ」 / 「ーマーク」,
  so a line starts with the long-vowel mark 「ー」 (Japanese line-breaking rules avoid that); the text is complete, nothing
  is cut. Layout nit, not truncation; the user may judge it at review. Evidence: screenshots/TC-133-export.png.
- **O-2 (TC-135, KOR info sheet and export dialog).** Korean text wraps in the middle of words, not between them: the
  info body breaks 「공 / 유하기」, 「있습니 / 다」, 「됩 / 니다」 (its last line is the lone 「니다.」), the export body 「이동 /
  하세요」. Nothing is cut; Korean normally wraps at spaces (Android `lineBreakWordStyle` phrase / word break). Layout nit
  for the user at review, same kind as O-1. Evidence: screenshots/TC-135-info.png, TC-135-export.png.
- **O-3 (TC-135, recipe).** The first 「Export」 tap 7 s after opening the project was lost (editor still loading; no
  dialog, the recipe stopped at Cancel); a second tap showed the dialog. mui-walk.steps now waits 10 s and then
  `waitfor`s the dialog's Cancel.
- **O-4 (TC-138, ITA export dialog).** The body's second sentence breaks the menu path: 「Per rimuoverla, vai su Menu >」 /
  「Impostazioni.」, so the 「>」 ends a line and the path reads across two lines; nothing is cut. Layout nit (a
  non-breaking space around 「>」 would keep the path together), same kind as O-1/O-2. DEU, FRA, RUS and PTB keep
  「Menü > Einstellungen」 / 「Menu > Paramètres」 / 「Меню > Настройки」 / 「Menu > Configurações」 on one line.
  Evidence: screenshots/TC-138-export.png.
- **O-5 (TC-142 IND, TC-146 ESM, export dialog).** The menu path breaks across lines like O-4: IND 「…buka Menu >」 /
  「Pengaturan.」, ESM 「…ve a Menú」 / 「> Configuración.」 (a line starts with 「>」); nothing is cut. Layout nit (a
  non-breaking space around 「>」). MAY and HIN keep the path on one line. Evidence: screenshots/TC-142-export.png,
  TC-146-export.png.
- **O-6 (TC-143, THA info sheet and export dialog).** Thai lines break inside words: the export body ends 「…เมนู >
  การตั้ง」 / 「ค่า」 (the last word split, its tail alone on the last line), the info body 「ติดป้าย / กำกับ」 and 「ข้อ /
  กำหนด」. Nothing is cut, glyphs whole. Layout nit for the user at review, same kind as O-2 (KOR). Evidence:
  screenshots/TC-143-info.png, TC-143-export.png.
- **O-7 (TC-145, recipe).** The lost 「Export」 tap of O-3 came back once on HIN despite the 10 s wait: the editor showed
  no dialog and the recipe stopped at `waitfor` Cancel (screenshots/do-fail-20261125-200955.png). A second full walk
  showed the dialog. The recipe's comment already says to tap Export again by hand; a retry inside the recipe would
  save the re-walk.
- **O-8 (TC-147 ARA, TC-151 FAR, TC-152 HEB, RTL layout; doubt TD-14 at wrap-up).** Text runs right-to-left inside each label and nothing is
  clipped at either edge, but the app's layout is not mirrored: the Settings row keeps icon, text, ⓘ and switch in the
  English order (switch at the right edge), list chevrons point right, the export dialog's checkbox box sits left of
  its label and 「Cancel」 stays left of 「Export」; only the system status and navigation bars mirror. Same in all three
  languages, so it looks like the app does not support RTL layouts at all (not specific to this feature). Not a
  truncation fail; for the user at review (a PM question whether RTL mirroring is expected). Evidence:
  screenshots/TC-147-settings.png, TC-147-export.png, TC-151-export.png, TC-152-settings.png.
- **O-9 (TC-148 VIT, TC-149 PLK, export dialog).** The menu path breaks across lines like O-4/O-5: VIT
  「…hãy vào Trình đơn > Cài」 / 「đặt.」 (the two-syllable word 「Cài đặt」 split, 「đặt.」 alone on the last line), PLK
  「…przejdź do Menu」 / 「> Ustawienia.」 (a line starts with 「>」); nothing is cut. Layout nit (non-breaking spaces in
  the path). ARA, TRK, FAR and HEB keep the path on one line. Evidence: screenshots/TC-148-export.png, TC-149-export.png.
- **O-10 (TC-152, phone).** During the HEB walk's 10 s editor wait, Android SystemUI (uid 10287, not PowerDirector)
  opened the Internet connectivity panel (`START … android.settings.panel.action.INTERNET_CONNECTIVITY … from uid
  10287`, 20:20:03), so the recipe's Export tap landed on the panel and `waitfor` Cancel timed out. Wi-Fi was connected
  and validated throughout; Back closed the panel and the next Export tap showed the dialog. Phone-side, not an app
  issue. Evidence: screenshots/waitfor-timeout-20261125-202014.png.
- **O-11 (TC-148 VIT, Menu, other feature).** Two Menu rows outside this feature lack a space: 「VideoĐã Xuất」 (Produced
  Videos) and 「VideoMẫu」 (Demo Videos). Not part of AIGC Watermark's strings; noted for the user, not judged here.
  Evidence: screenshots/TC-148-settings.png.
- **O-12 (TC-156, UKR Settings row).** 「Видалити водяний знак AIGC」 is the longest Settings row of the run (118–822 px):
  the ⓘ still follows the text and the switch keeps the right edge on one line, but ⓘ and switch are only about 25 px
  apart. Not truncation; a longer string would push the ⓘ into the switch (no wrap seen in any language). Evidence:
  screenshots/TC-156-settings.png.
- **O-13 (TC-154, recipe).** The ☰ tap right after relaunching in Danish was lost while Home loaded, so `scrollto` found
  no Settings row (screenshots/do-fail-20261125-202718.png); the second walk was clean. Same kind as O-3/O-7: a
  `waitfor` on the ☰ button before tapping it would make the recipe steadier.
- **O-14 (TC-153 SVE, TC-154 DAN, TC-156 UKR, Menu, other feature).** Menu strings outside this feature: SVE
  「Video förbättra」 and DAN 「Video forbedring」 split a compound that both languages write as one word
  (Videoförbättring / Videoforbedring; SVE also uses the verb form), DAN 「Avanceret Udskæring」 has a capital mid-phrase,
  UKR 「Оновити」 ("Update") on the Pro card's Upgrade button. Not AIGC Watermark's strings; noted for the user, not
  judged here. Evidence: screenshots/TC-153-settings.png, TC-154-settings.png, TC-156-settings.txt.
