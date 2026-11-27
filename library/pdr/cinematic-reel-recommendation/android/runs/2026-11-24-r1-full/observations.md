# Observations — R1 (android)

- O-1 (TC-010 – TC-015, R1-b): system Back from Add Media (opened with 「Import a photo」) returns to the Cinematic Reel
  Creator template page on the same card, every time (6 cards). Evidence: screenshots/TC-01x-after-back.png.
- O-2 (TC-016): Add Media opens on the 「All」 album tab; Android has no 「Recents」 tab, so TC-016's 「keeps its tab
  (Recents)」 should read 「All」 on Android when the row can run (table wording, after Q-1 is decided).
- O-3 (TC-017, TC-018, R1-c): in 繁體中文 and 日本語 the chip still reads 「View photo tips」 and the sheet sentence stays
  English around the localized name (「For best results with the 微電影畫境 template, follow this advice:」 /
  「… the マイクロシネマ template, …」), while the headings (「建議」/「避免使用」, 「推奨」/「NG」), captions and the button
  (「瞭解」/「OK」) are localized, so each sheet mixes two languages. The spec gives no translation for the chip or the
  sentence (Q-2); the Japanese captions show although the CMS JP column is empty. For PM with Q-2. Evidence:
  screenshots/tc017-sheet.png, tc018-sheet.png, tc017-card.png, tc018-card.png.
- O-4 (TC-018, tool): on this Android 12 phone `launch --lang ja` (system locale switch) made Google Play show 「更新を
  完了するには、アプリを再起動してください」 over PowerDirector; 「再起動」 then `activate` got past it. Not an app issue.
