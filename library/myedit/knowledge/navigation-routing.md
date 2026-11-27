# Navigation, routing and access control

## KP-044 Entries lead to the right flow and server
- kind: rule · platform: web · tags: navigation, entry, environment · authority: team
- source: contract-runner domain myedit/categories/08_導覽路由與存取控制.yaml rule 1 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-08-1

Entering a flow from the launcher, a menu, a result page or another product entry lands in the intended flow and
environment, never an unrelated page or the wrong server.

## KP-045 Same feature, same name in every menu
- kind: rule · platform: web · tags: navigation, naming, menu · authority: team
- source: contract-runner domain myedit/categories/08_導覽路由與存取控制.yaml rule 2 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-08-2

A feature shown in the launcher, top menu and side menu is labelled consistently and points to the same feature;
no menu uses another feature's name.

## KP-046 Routes enforce access limits
- kind: rule · platform: web · tags: routing, access · authority: team
- source: contract-runner domain myedit/categories/08_導覽路由與存取控制.yaml rule 3 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-08-3

A feature limited by device, platform, browser or account policy is also blocked at the route: a direct URL or link
does not reach an unsupported flow.

## KP-047 Open submenus do not block other items
- kind: rule · platform: web · tags: menu, submenu · authority: team
- source: contract-runner domain myedit/categories/08_導覽路由與存取控制.yaml rule 4 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-08-4

An open nested submenu does not make other menu items unclickable.

## KP-048 Open in Editor shows progress in both tabs
- kind: rule · platform: web · tags: editor, open-in-editor, progress · authority: team
- source: contract-runner domain myedit/categories/08_導覽路由與存取控制.yaml rule 5 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-08-5

Open in Editor opens a new tab that shows the MyEdit editor with its top menu and the hand-over progress at once
(never about:blank); the original page shows a processing state with matching progress. When done the new tab loads
the project. User confirmed product-wide (2026-11-17).

## KP-049 MyEdit Agent opens the tool asked for
- kind: rule · platform: web · tags: agent, navigation · authority: team
- source: contract-runner domain myedit/categories/08_導覽路由與存取控制.yaml rule 6 (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: MyEdit-08-6

A tool that is a MyEdit Agent skill (every tool newly added to the Agent): a text request naming the tool or its
purpose makes the Agent open or offer that tool's entry, never a similar tool or a reply without the entry. User
confirmed product-wide (2026-11-17).
