# MUI test (multi-language UI)

Part of the spec-casebook skill (user, 2026-11-24). Every table can carry an **MUI** section that checks the feature
in each language the app implements for it. It tests at least:

1. **Translation**: every string the feature shows reads as the translation sheet gives it in that language (not
   left in English, not another language's text, not a key name or placeholder such as `%@` / `{0}` / `IDS_…`).
2. **Text truncation**: no string is cut off (`…`, clipped glyphs, a second line hidden), overlaps another element
   or pushes a control out of its box in that language.

More checks may be added per feature (date and number formats, right-to-left layout); each gets its own row.

## 1. Setup: languages, sheet and tags (asked, never guessed)

The answers live in `library/<product>/<feature>/mui.json`, one file for both platforms.

**Product list first (user, 2026-11-24).** `library/<product>/product.json` › `mui` can hold the languages every
feature of that product is tested in, with their eBug tags and launch codes (PowerDirector: 27 languages, ENU the
base, 26 tested). A feature then gets `mui.json` with `"languages": "product"` without asking; ask only whether this
feature differs (a language not implemented yet) and record that in its own list.

With no product list, ask the user once at step 0, together with the other step 0 questions:

1. **Which languages are implemented for this feature?** The user defines the list (offer the columns of the sheet,
   when there is one, as the starting choice). "English only" or "no MUI test" writes `"languages": []` and the table
   gets no MUI section; it is not asked again.
2. **Is there a translation sheet?** Ask for it when a new spec set arrives without one, unless `mui.json` or the
   product list records that there is none. A sheet is a spec file: copy it in with the spec set (`add-spec.ts` /
   `new-draft.ts`, never anywhere else) and extract it to `specs/<date>/extracted/mui-strings.json` (below). A sheet
   URL (SharePoint, Google Sheets) goes in `sheet_url`. **No sheet** (PowerDirector, user 2026-11-24): the run judges
   each translation itself (§3, *Judging without a sheet*).
3. **Language tags for eBugs.** Each language's short tag (e.g. `JPN`, `CHT`, `DEU`) is read from the product list
   or the sheet (its column header or legend). When neither has one, **ask the user before the run** for the tag of
   every language; a run with MUI rows does not start while a tag is missing. Never invent one.

```json
{
  "base": "en-US",
  "languages": [
    { "tag": "JPN", "name": "Japanese", "code": "ja-JP" },
    { "tag": "DEU", "name": "German",   "code": "de-DE" }
  ],
  "rtl": [],
  "sheet": "specs/2026-11-24/PDR_Video_Enhance_MUI.xlsx",
  "sheet_url": null,
  "asked": "2026-11-24"
}
```

`code` is what `device.ts` / `device-android.ts launch --lang <code>` takes (language plus region, `zh-Hant-TW`,
`pt-BR`, `es-MX`). `base` is the language the rest of the table runs in; it is not an MUI language. `"languages":
"product"` takes the product list (`check_ebug_format.py` resolves it too). Record the answers, and later changes, in
`requests.md` with the next REQ ID. `rtl` names the right-to-left languages (ARA, FAR, HEB).

**`mui-strings.json`** (from a sheet, kept with the spec set): one entry per string the feature uses, the sheet's
key and its text per language code, with the sheet tab and row so an eBug can cite it:

```json
[{ "key": "IDS_VE_ENHANCE", "tab": "Video Enhance", "row": 12,
   "text": { "en-US": "Enhance", "ja-JP": "補正", "de-DE": "Verbessern" } }]
```

A cell the sheet leaves empty is kept as `null`: that string has no translation in the sheet yet (an owner question,
§4). Re-extract when a new sheet version arrives, and treat changed strings as a changed spec (update plan, step 3).

## 2. Rows

Write the MUI section last in the table (Section `MUI`), after every other section. Requirements first, in
`requirements.md`:

- `R-n` Every user-facing string of the feature shows the sheet's text in each implemented language (sheet tab).
- `R-n+1` No string of the feature is truncated, clipped or overlapping in any implemented language.

Then the rows (user, 2026-11-24: keep the MUI cost off the full run; Variants pass 10 lists each language):

| Platform | Rows | What they do |
|---|---|---|
| **Android** | 1 translation row for every language | `node scripts/mui-strings.ts <feature> --apk <build dir> --out <run dir>/mui` reads every string of the feature in every language from the build's APK (resource prefixes from `mui.json` `android_prefixes`, plus the table's quoted strings of 3+ words); no phone, no credits. Expected: no missing translation (English or a parent locale shown), nothing left identical to English but names and units, placeholders as in English, natural wording |
| **Android** | 1 truncation walk per language | The app in that language (`launch --lang <code>`) walks every screen by the rows that already reach them, one `texts` read and screenshot per screen; only truncation is judged |
| **iOS** | 1 walk per language | The app bundle cannot be read on the QA iPhone (TestFlight builds), so the same walk judges translation and truncation together. With an `.ipa` (a TR folder that has one) iOS can read its `.lproj` strings the same way |

A walk starts no generation: it reuses tasks already in Recent task (completed, failed) and leaves a short task at
the leave dialog when that dialog is on the walk. Screens only a new task shows (completion banner, system
notification) are left to the APK read, or listed under "Not added" on iOS.

**Its own phase (user, 2026-11-24).** The MUI rows are a phase of their own in `phases.json` (`MUI`, one segment per
language, plus `MUI-apk` on Android), run on request (string freeze, new languages, before release). A full run never
includes them, and *complete full run* in the run-media rule means every non-MUI row.

**Numbered lines (user, 2026-11-25).** An MUI row's cells are long lists, so every cell of it with two or more lines
is numbered, the Expected Result too (`1. Every string … shows in full` newline `2. No string overlaps …` newline
`3. Launcher shortcut: 「AI Video Enhance」`), never plain line breaks: a result or an eBug can then name the line it
failed (`Expected 14`). `check.ts` warns on an MUI row whose Expected Result has unnumbered lines.

The screens are every one the feature's rows reach, its dialogs, toasts, tooltips, empty and error states included
(reuse the Design screen list or `inventory.json` when the spec set has one); list them in the Action. Long strings
worth stressing (the longest translation of a button, a toast with a number in it) are named in the Truncation row's
Expected Result. Each row's Spec Ref is its requirement (and the sheet tab when there is a sheet).

## 3. Running the MUI rows

- MUI rows run as their own phase (`run-log.ts <run dir> init <table> --phase <phases.json> MUI`, run folder
  `runs/<date>-mui/`), one language per segment, never inside a full run (a language switch is a phone setting the
  run makes itself and undoes, AGENTS.md *Phone settings for fixtures*).
- Preflight: `mui.json` has a tag for every language; otherwise stop and ask the user (§1.3).
- **Android translations first, from the APK** (`MUI-apk`): run `mui-strings.ts` on the build under test and read
  `mui-strings.json` one language at a time against the English (the judging rules below); `mui-strings.md` lists
  what the script flags (missing, from a parent locale, identical to English, placeholders). A missing translation
  or a placeholder difference is a fail; an English-identical string is a fail unless it is a name or unit.
- Per language on the phone: `launch --lang <code>` (Android: `locale status` to confirm), walk the screens by the
  cited rows' paths, and on each screen take one `texts <NAME>` read (screenshot and visible strings together). With a
  sheet, compare each string with the sheet exactly (the full words, not a prefix; trim only spaces).
- Truncation is judged from the page source first: a label ending in `…` / `...`, text bounds wider than their
  container or past the screen edge, Android `ellipsize` or a line count over the view's max lines (view data from
  the re-signed debuggable build, `android-viewdump.ts`, when it is installed); then the screenshot for clipped
  glyphs and overlaps. Name each truncated string with its screen.
- End every language with a plain `launch` (Android `locale reset`) so the next segment runs in the base language.
- **Judging without a sheet (user, 2026-11-24).** Read each string as a native reader would, against the English on
  the base-language capture of the same screen: is it in the right language and script (CHT traditional, CHS
  simplified, PTB Brazilian, ESM Mexican Spanish), does it say what the English says, does it fit the control (a
  verb on a button, a noun on a title), is the feature's own name and every term the same on every screen, are
  numbers, units and placeholders filled in. A string plainly left in English (or a key, a placeholder, another
  language) is a Translation fail. A translation that only seems wrong (an odd meaning, a literal word-for-word
  rendering, an unnatural or inconsistent term) is not a fail on its own: list it as a **translation doubt** in the
  run's `mui-doubts.md` (language, screen, English, what the app shows, why it seems off, a better wording), and the
  row records Pass with the doubt IDs in its Notes. Doubts go to the user at the eBug review (§4).
- A string the app shows in English while the sheet has a translation is a Translation fail; a string the sheet has
  no translation for (`null`) is a Fail (question) for the owner rule below, never a pass.

## 4. MUI eBugs

MUI findings follow the eBug rules of `ebugs.md` and the casebook overlay (rule 8), with these differences:

- **Short Description tags.** The source tag stays `[AIAgent]`; the type tag is `[MUI]` or the language tags, and
  no `[UI]`:
  - **Translation missing in every implemented language** (every language of `mui.json` but the base):
    `PDR-A 16.9.0 - [AIAgent][MUI] Video Enhance: Enhance panel strings are not translated`
  - **Translation missing in some languages only**: one tag per language, in `mui.json` order, **one bug for all of
    them**: `PDR-A 16.9.0 - [AIAgent][JPN][DEU] Video Enhance: quality tooltip is not translated`
  - **Truncation**: **one bug per language**, even when several languages truncate the same string:
    `PDR-A 16.9.0 - [AIAgent][DEU] Video Enhance: 「Verbessern」 button label is truncated`
  - A wrong translation (differs from the sheet) is grouped like a missing one.
- **Grouping.** Translation strings that miss the same set of languages go in one bug (every screen named, a
  screenshot of each); a different set of languages is a different bug. A truncation bug lists every truncated
  string of its language.
- **Note.** Every MUI entry carries one `MUI:` line after `Device:`, naming the kind and the language tags exactly
  as in the Short Description: `MUI: translation — JPN, DEU`, `MUI: translation — all`, `MUI: truncation — DEU`.
  The Spec Link is the translation sheet (file name or URL, tab and row or key); with no sheet, the Design or PM board
  that draws the English string.
- **Owner** (AGENTS.md *Translation problems go to PC-Doc*; user, 2026-11-26, replaces PM here): the app truncates
  or breaks a translation, or does not show one the build has → RD; anything whose fix is the translation's own
  wording → **PC-Doc** (BugBelong `PC-Doc`), never PM: no text for that language (`null`), a string left in English,
  a wrong, unnatural or inconsistent translation, its capitalisation or punctuation, a text that cannot fit and must
  be reworded, and every filed translation doubt.
- **Dedupe** per OS and per language: an existing same-OS ticket on the same strings and language makes the finding
  a duplicate (`dedupe.txt`); one on other languages does not.
- **Translation doubts (no sheet, user 2026-11-24).** The run's doubts go in the drafts as a `## Translation doubts`
  table, `| ID | Language | Screen | English | App shows | Why it seems off | Better wording |` (IDs `TD-1`…), not as
  entries. `ebug-review.ts` shows them in a **Translation doubts: your call** panel where the user picks File or
  Fine as is for each, and Copy decisions carries the choices. Filed doubts become translation entries grouped as
  above (the same languages in one bug, `[MUI]` when every language has it); Fine as is goes in the feature's
  knowledge as a `decision` entry so the next run does not raise it again.
- **Checks.** `check_ebug_format.py --mui library/<product>/<feature>/mui.json` (`ebug-review.ts` passes it when the
  file exists) holds every MUI entry to these rules: tags from `mui.json` only, `[MUI]` only when the `MUI:` line
  says `all`, a list that covers every language written as `[MUI]` instead, one language per truncation bug, and
  tags matching the `MUI:` line. A language tag not in `mui.json` is an error: ask the user, add it, and check again.
