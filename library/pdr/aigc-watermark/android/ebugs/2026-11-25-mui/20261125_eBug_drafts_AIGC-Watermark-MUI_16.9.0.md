# AIGC Watermark (Android) — eBug drafts, MUI run (table v4), PDR-A 16.9.0 build 2611201

**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-25-mui/` — MUI phase of draft `drafts/20261125-160000` (table v4, TC-130 – TC-156), 2026-11-25 19:46 → 20:31 on Sony XQ-BT52 (Xperia 10 III) / Android 12, PowerDirector 16.9.0 build 2611201, Stage server, account acda.test7@gmail.com (Free). TC-130 read the 5 AIGC Watermark strings and the dialogs' shared strings × 26 languages from the 2611201 APK; TC-131 – TC-156 walked the Settings row, the ⓘ info sheet and the export dialog (「Project 11-25」, Cancel, nothing exported) in one language each. Tally: 1 Fail (TC-130), 26 Pass.

**Status:** nothing filed, uploaded or commented. No entry is drafted: both findings of TC-130 are already on Android tickets, and every truncation walk passed.

Rules: spec-casebook `ebugs.md` step 1, `references/mui.md` §4 and the casebook overlay. There is no translation sheet (`mui.json` sheet null), so translations were judged by the run; doubtful ones are listed below for your call (File or Fine as is), not drafted.

**What is drafted:** 0 entries. 2 findings cited (dedupe.txt), 14 translation doubts wait for your call.

---

## Already filed on Android (dedupe.txt only, not drafted)

| Finding | Rows | Ticket | Why it covers it |
|---|---|---|---|
| AI Music Generator's 「AIGC Watermark」 dialog body 「Your generated music will include an AIGC watermark…」 is not in the 2611201 APK in any language, so the music dialog cannot show in any language (steps 5–8 of TC-131 – TC-156 not walked) | TC-130 | DRA262611P0229 (NewCreated, PM, Android 2611171) | The ticket reports that 「Generate」 shows no 「AIGC Watermark」 dialog at all; the missing strings are the same defect. |
| Export dialog checkbox 「Don't show again」 shows a stray apostrophe: NLD 「Niet' meer weergeven」, ARA 「لا' تظهر مرة أخرى」 (key `dont_show_message_again`, seen on screen in TC-141 and TC-147); TRK shows 「Bir daha gösterme」 correctly (TC-150) | TC-130 | DRA262611P0286 (NewCreated, PC-Doc, Android 2611201) | Same strings in the same languages (filed from the Video Enhance Demo page, tags NLD ARA TRK); one string fix covers both screens. Per OS: same OS, so not refiled. |

## Not raised (for the record)

| Item | What was seen | Why not raised |
|---|---|---|
| Line breaks inside words or the menu path | JPN 「ウォータ / ーマーク」 (O-1), KOR mid-word wraps (O-2), THA mid-word wraps (O-6), 「Menu >」 / 「Settings」 split in ITA, IND, ESM, VIT, PLK (O-4, O-5, O-9) | Every string is whole (TC-131 – TC-156 expect no ellipsis, cut or lost line); line-breaking style, not truncation. |
| UKR Settings row | 「Видалити водяний знак AIGC」 the longest row (118–822 px); ⓘ about 25 px from the switch (O-12) | Not touching, one line; nothing cut. |
| Other features' Menu strings | VIT 「VideoĐã Xuất」 / 「VideoMẫu」 (O-11); SVE 「Video förbättra」, DAN 「Video forbedring」, 「Avanceret Udskæring」, UKR 「Оновити」 on Upgrade (O-14) | Not AIGC Watermark strings; noted in observations.md for those features' owners. |
| Lost taps and a SystemUI panel during walks | O-3, O-7, O-13 (recipe), O-10 (Android Internet panel) | Run mechanics and phone, not the app. |
| RTL layout not mirrored (ARA, FAR, HEB) | O-8 | Listed as doubt TD-14 (your call): no spec says which layout is intended; app-wide. |

## Translation doubts

14 doubts from the run (`mui-doubts.md`): TD-1 – TD-8 from the APK review (TC-130), TD-9 – TD-14 seen on the phone. None is drafted: pick File or Fine as is for each on the review page. Filed ones become translation entries grouped by language set (`[MUI]` only when every language has it); Fine as is goes into the feature's knowledge as a `decision` entry.

| ID | Language | Screen | English | App shows | Why it seems off | Better wording |
|---|---|---|---|---|---|---|
| TD-1 | ITA | Settings row, info sheet title, export dialog (title and body) | AIGC Watermark / Remove AIGC Watermark / …will include an AIGC watermark. | Filigrana AI / Rimuovi Filigrana AI / …includerà una filigrana AI. | 「AIGC」 (AI-generated content) becomes 「AI」, so the feature is an "AI watermark" only in Italian; all 25 other languages keep AIGC. The switch is also in title case (「Filigrana」 capitalised mid-phrase). | Filigrana AIGC / Rimuovi filigrana AIGC / …includerà una filigrana AIGC. |
| TD-2 | NLD | Info sheet vs export dialog | Depending on applicable laws… you may need to… / Your exported file… | …moet u mogelijk… voordat u deze openbaar deelt… om u te helpen… / Je geëxporteerde bestand… | The info sheet addresses the user formally (u), the export dialog informally (je), within one feature. | …moet je mogelijk… voordat je deze openbaar deelt. Deze functie is bedoeld om je te helpen… |
| TD-3 | IND | Info sheet body | …label or watermark AI-generated content… | …memberi label atau watermark pada konten buatan AI… | Uses the English word 「watermark」, while the title, switch and export dialog say 「Tanda Air」. | …memberi label atau tanda air pada konten buatan AI… |
| TD-4 | VIT | All AIGC strings; export body | AIGC Watermark / go to Menu > Settings | Dấu chìm AIGC / hãy vào Trình đơn > Cài đặt | 「Dấu chìm」 reads as a hidden, embedded mark; Vietnamese apps usually call a watermark 「hình mờ」. The body writes 「Trình đơn > Cài đặt」 while the Menu and Settings screens show 「Trình Đơn」 and 「Cài Đặt」. | Hình mờ AIGC / Xóa hình mờ AIGC; …hãy vào Trình Đơn > Cài Đặt. |
| TD-5 | KOR | Info sheet button | Got it | 알았음 | Clipped, note-style form ("got it.") that sounds blunt on a button. | 확인 (or 알겠습니다) |
| TD-6 | HEB | Export dialog checkbox | Don't show again | אל להציג שוב | Ungrammatical: אל needs a future-tense verb; an infinitive takes לא. Same string as Video Enhance TD-A25 (2026-11-24, no decision recorded yet). | לא להציג שוב |
| TD-7 | PLK | Export dialog button | Export | Eksport | A noun ("export") on an action button; Polish buttons use the verb. | Eksportuj |
| TD-8 | ITA | Info sheet button | Got it | Fatto | Means "Done", not an acknowledgement of the information just read. | Ho capito (or OK) |
| TD-9 | ESP | Menu › Settings (phone walk TC-134) | Remove watermark / Remove AIGC Watermark | Eliminar marca de agua / Quitar marca de agua AIGC | The two neighbouring switches render the same English verb 「Remove」 differently (Eliminar, then Quitar), so the AIGC row reads like a different action; the export body says 「Para quitarla」. CHS keeps 删除 for both, CHT 移除 for both. | Eliminar marca de agua AIGC (and 「Para eliminarla」 in the export body), or Quitar in both rows |
| TD-10 | MAY | Menu › Settings (phone walk TC-144) | Remove watermark / Remove AIGC Watermark | Alih keluar tera air / Keluarkan tera air AIGC | The two neighbouring switches render the same English verb 「Remove」 differently (「Alih keluar」, then 「Keluarkan」), so the AIGC row reads like a different action; the export body says 「mengeluarkan」. Same kind as TD-9 (ESP). | Alih keluar tera air AIGC, or Keluarkan in both rows |
| TD-11 | HIN | Export dialog (phone walk TC-145) | Your exported file… / Export | आपकी एक्सपोर्ट की गई फ़ाइल… / निर्यात करें | The body uses the English loanword एक्सपोर्ट, the button right below it the Hindi word निर्यात करें, so the dialog names the action two ways. | One term in both: एक्सपोर्ट करें on the button (common in Hindi apps), or निर्यात की गई फ़ाइल in the body |
| TD-12 | FAR | Export dialog button (phone walk TC-151) | Export | خروجی | A noun ("output") on the action button, as TD-7 (PLK); the editor's top Export button shows the same word, so it is the app's shared term. | خروجی گرفتن |
| TD-13 | HEB | Menu › Settings (phone walk TC-152) | Remove watermark / Remove AIGC Watermark | הסר סימן מים / הסרת סימן המים של AIGC | The two neighbouring switches render 「Remove」 differently (imperative 「הסר」, then the noun 「הסרת」), so the AIGC row reads as a different kind of label; same kind as TD-9 (ESP) and TD-10 (MAY). | הסרת סימן מים in the row above, or הסר סימן מים של AIGC |
| TD-14 | ARA, FAR, HEB | Menu › Settings row, info sheet, export dialog (phone walks TC-147, TC-151, TC-152; O-8) | (layout) | Text runs right-to-left inside each label, but the layout keeps the English order: switch at the right edge, chevrons pointing right, checkbox box left of its label, 「Cancel」 left of 「Export」; only the system bars mirror | No spec says whether the app mirrors its layout for right-to-left languages; R-058 asks only that they run from the right. App-wide, not this feature's choice (same question as Video Enhance TD-W9, 2026-11-24, no decision recorded). | Fine as is (the app does not mirror), or mirror the layout app-wide for ARA, FAR, HEB |

## Reconciliation against the run

Every row of the MUI phase, the run's observations and every translation doubt.

### Row-by-row map

| Row | Result | Where it went |
|---|---|---|
| TC-130 | Fail | cited DRA262611P0229 (music body absent), DRA262611P0286 (NLD/ARA apostrophe); doubts TD-1 – TD-8 |
| TC-131 (CHT) | Pass | — |
| TC-132 (CHS) | Pass | — |
| TC-133 (JPN) | Pass | not raised (O-1 line break) |
| TC-134 (ESP) | Pass | doubt TD-9 |
| TC-135 (KOR) | Pass | doubt TD-5 (seen on screen); not raised (O-2 line break; O-3 recipe) |
| TC-136 (DEU) | Pass | — |
| TC-137 (FRA) | Pass | — |
| TC-138 (ITA) | Pass | doubts TD-1, TD-8 (seen on screen); not raised (O-4 path break) |
| TC-139 (RUS) | Pass | — |
| TC-140 (PTB) | Pass | — |
| TC-141 (NLD) | Pass | cited DRA262611P0286 (apostrophe on screen); doubt TD-2 |
| TC-142 (IND) | Pass | doubt TD-3; not raised (O-5 path break) |
| TC-143 (THA) | Pass | not raised (O-6 line breaks) |
| TC-144 (MAY) | Pass | doubt TD-10 |
| TC-145 (HIN) | Pass | doubt TD-11; not raised (O-7 recipe) |
| TC-146 (ESM) | Pass | not raised (O-5 path break) |
| TC-147 (ARA) | Pass | cited DRA262611P0286 (apostrophe on screen); doubt TD-14 (O-8 RTL) |
| TC-148 (VIT) | Pass | doubt TD-4; not raised (O-9 path break, O-11 other feature) |
| TC-149 (PLK) | Pass | doubt TD-7; not raised (O-9 path break) |
| TC-150 (TRK) | Pass | — (no apostrophe: key dont_show_message_again) |
| TC-151 (FAR) | Pass | doubts TD-12, TD-14 (O-8 RTL) |
| TC-152 (HEB) | Pass | doubts TD-6, TD-13, TD-14 (O-8 RTL); not raised (O-10 phone) |
| TC-153 (SVE) | Pass | not raised (O-14 other feature) |
| TC-154 (DAN) | Pass | not raised (O-13 recipe, O-14 other feature) |
| TC-155 (NOR) | Pass | — |
| TC-156 (UKR) | Pass | not raised (O-12 tight ⓘ, O-14 other feature) |
| TD-1 | doubt | Translation doubts (your call) |
| TD-2 | doubt | Translation doubts (your call) |
| TD-3 | doubt | Translation doubts (your call) |
| TD-4 | doubt | Translation doubts (your call) |
| TD-5 | doubt | Translation doubts (your call) |
| TD-6 | doubt | Translation doubts (your call) |
| TD-7 | doubt | Translation doubts (your call) |
| TD-8 | doubt | Translation doubts (your call) |
| TD-9 | doubt | Translation doubts (your call) |
| TD-10 | doubt | Translation doubts (your call) |
| TD-11 | doubt | Translation doubts (your call) |
| TD-12 | doubt | Translation doubts (your call) |
| TD-13 | doubt | Translation doubts (your call) |
| TD-14 | doubt | Translation doubts (your call) |

### Owner split

| Owner | Entries |
|---|---|
| RD | — |
| PM | — |

### Filing order

Nothing to file unless doubts are marked File on the review page; those become translation entries (Class UI, owner RD) on the TR you name.
