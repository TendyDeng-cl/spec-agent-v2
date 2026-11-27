# Session state and unsaved changes

## KP-024 Going back keeps imports and settings
- kind: rule · platform: web · tags: navigation, state, back · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-1

In a multi-step flow, returning to an earlier step keeps the imported media and settings unless the user confirms
discarding them.

## KP-025 Leaving with unsaved changes asks first
- kind: rule · platform: web · tags: unsaved, leave, reload · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-2

With unsaved changes, leaving, reloading, closing the page or signing out first shows a confirm or save flow before
anything is discarded.

## KP-026 Leave dialog does what was chosen
- kind: rule · platform: web · tags: unsaved, leave, dialog · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-3

In a leave-confirmation dialog, confirming performs the requested navigation; choosing to stay keeps the current
page and its state.

## KP-027 No unsaved warning without changes
- kind: rule · platform: web · tags: unsaved, leave · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-4

A flow with no user input or result yet leaves without an unsaved-changes warning.

## KP-028 Layout changes keep settings
- kind: rule · platform: web · tags: state, layout, resize · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-5

Resizing the window, expanding a panel or switching view keeps chosen settings and entered data, unless the spec
defines a reset.

## KP-029 Playback stops when the user moves on
- kind: rule · platform: web · tags: playback, audio, video · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-6

Audio or video playing in a preview pauses or stops when the user switches tab, presses Generate or replaces the
playing media; it never keeps playing in the background.

## KP-030 Template replaces only after confirming edits
- kind: rule · platform: web · tags: template, inspiration, prompt · authority: team
- source: contract-runner domain myedit/categories/05_工作階段狀態與未儲存變更.yaml rule 7 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-05-7

Picking a template, Inspiration or example that overwrites the prompt or imported media asks to confirm only when
the user has changed something; no confirmation when nothing changed or the already-applied template is picked again.
