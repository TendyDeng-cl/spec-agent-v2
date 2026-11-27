# Localization and browser compatibility

## KP-061 Whole UI in the chosen language
- kind: rule · platform: web · tags: mui, language · authority: team
- source: contract-runner domain myedit/categories/10_本地化與瀏覽器相容性.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-10-1

With a supported UI language chosen, buttons, labels, model descriptions, tooltips, tutorials, empty and processing
states, dialogs and errors all show in that language.

## KP-062 No raw keys or untranslated defaults
- kind: rule · platform: web · tags: mui, strings · authority: team
- source: contract-runner domain myedit/categories/10_本地化與瀏覽器相容性.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-10-2

Localized and server-provided text never shows an untranslated English default, a raw code or a resource key.

## KP-063 Longer translations stay readable
- kind: rule · platform: web · tags: mui, truncation · authority: team
- source: contract-runner domain myedit/categories/10_本地化與瀏覽器相容性.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-10-3

Translations longer than the source stay readable in buttons, menus, dialogs and model descriptions and do not
cover needed controls or information.

## KP-064 Same behaviour in every supported browser
- kind: rule · platform: web · tags: browser, routing · authority: team
- source: contract-runner domain myedit/categories/10_本地化與瀏覽器相容性.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-10-4

Each supported browser, entered the same way with the same actions, gets the same routing and core result; any
browser difference is shown plainly and never leads to an unrelated page.
