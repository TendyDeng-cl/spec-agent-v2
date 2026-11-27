# Shared controls and responsive layout

## KP-050 Control state matches its value
- kind: rule · platform: web · tags: controls, state, disabled · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-1

A control's look (enabled, disabled, selected, pressed, on/off) matches its real value; a disabled control does not
perform its action.

## KP-051 One menu of a group open at a time
- kind: rule · platform: web · tags: menu, popover · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-2

Opening another mutually exclusive menu or popover in the same group leaves no duplicate or conflicting menus open.

## KP-052 Narrow windows and high scaling stay usable
- kind: rule · platform: web · tags: responsive, scaling, layout · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-3

In narrow windows, mobile layout or raised display scaling, the main actions and needed content stay visible and
usable; when they do not fit, the layout scrolls.

## KP-053 Overlays do not hide needed controls
- kind: rule · platform: web · tags: overlay, tooltip, layout · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-4

An overlay, tooltip or floating control near the work area does not cover needed inputs or actions; if it does,
it can be closed or moved.

## KP-054 Light Mode everywhere on a Light Mode page
- kind: rule · platform: web · tags: light-mode, theme · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-5

On a tool page designed in Light Mode, every element (popups, dropdowns, crop window, scrollbars, toasts, generating
animation, buttons, thumbnail areas) is light, with no dark leftovers or dark flash on state changes. Light Mode is
the tool's design, not a user setting; colours come from its Light Mode design. Added 2026-11-17 (user approved).

## KP-055 Light Mode text stays legible
- kind: rule · platform: web · tags: light-mode, contrast · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-6

On a Light Mode tool page, text and icons contrast with their background in every state (processing, disabled,
hover, result); no white on light or dark on a dark mask. Added 2026-11-17 (user approved).

## KP-056 Every control state has visible feedback
- kind: rule · platform: web · tags: controls, states, hover · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 7 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-7

Hover, focus, pressed, selected, disabled and error states each look clearly different from normal; a disabled
control still reads as disabled rather than vanishing. Exact styles from the design. Applies to every theme.

## KP-057 Light Mode keeps structural elements
- kind: rule · platform: web · tags: light-mode, structure · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 8 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-8

Light Mode changes colours only: required marks (*), imported-media frames, dividers and clear buttons that the
component has in earlier versions or the design stay. Added 2026-11-17 (user approved).

## KP-058 Dropdowns open beside their selector
- kind: rule · platform: web · tags: dropdown, menu, layout · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 9 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-9

A dropdown opens against its selector in a direction where it fits, never covering the selector; every option is
visible or scrollable inside the menu. A direction set by the design wins.

## KP-059 Category chips scroll to their items
- kind: rule · platform: web · tags: chips, list, scroll · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 10 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-10

In a list grouped by category tags or chips, tapping a chip whose items are out of view scrolls the list to them.

## KP-060 Timecodes carry at 60 seconds
- kind: rule · platform: web · tags: timecode, player · authority: team
- source: contract-runner domain myedit/categories/09_共用控制項與響應式版面.yaml rule 11 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-09-11

A media time, duration or timecode keeps seconds at 00–59 and carries 60 s to the minute (01:00), never xx:60.
The format comes from the spec. User confirmed product-wide (2026-11-17).
