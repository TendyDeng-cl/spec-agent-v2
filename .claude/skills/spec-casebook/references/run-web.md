# Run on the web (MyEdit and other websites)

Part of the spec-casebook skill. Web runs follow every rule of `run.md`; only the device commands change, as on
Android. The client is `node scripts/device-web.ts <run dir> <command>` (playwright-core attached to a real Google
Chrome over the DevTools port; added 2026-11-24). The full command list is the header of `scripts/device-web.ts`.

- **Platform `web`.** A website's table is `library/<product>/<feature>/web/` (cases.csv, drafts, runs, recipes in
  `web/recipes/`). MyEdit is the product `myedit`, MyEdit Biz `myedit-biz` (`library/<product>/product.json` › `web`:
  base URL per environment, default environment, viewport, optional `build_js` and `ecl_product`). A website feature
  gets only the `web` table unless the user also names a phone app; a web table has no iOS/Android twin, so *One
  source for both* does not apply to it.
- **Environments.** `start --env demo|preview|production` (default `web.default_env`, demo for MyEdit) or `env <name>`
  later; `open <path> [--lang en|tw|jp|…]` then builds the address from that base URL (`open en/photo-enhance`, or
  `open photo-enhance --lang tw`). A full URL is opened as it is. Name the environment in every run plan, results
  header and eBug (Build / environment line).
- **One shared Chrome, one profile.** `start` attaches to the Chrome already on `CASEBOOK_WEB_PORT` (default 9333) or
  starts one with the profile `~/.casebook/web/profiles/<name>` (`--profile`, default `default`), so later segments
  keep the same signed-in tab. Sign-in is the user's: the agent never types a password; the first time, ask the user
  to sign in to the test account in that Chrome window, then carry on. Use a separate `--profile` (and port) for an
  account state the run must not disturb (Free, zero credits, full storage). `restart` at every segment start;
  `quit` closes only a Chrome the run started.
- **Switching test accounts (user, 2026-11-25).** Each test account (free, premium…) is a Chrome profile on its own
  port, registered with `node scripts/web-account.ts add NAME [--product myedit-biz]`; the user signs in once in the
  window it opens. A row that needs another account switches with `device-web.ts <run> account NAME` then `restart`
  (never sign out and in); `web-account.ts check NAME` confirms the sign-in (e-mail and plan) before the row, and an
  expired one stops for the user (`web-account.ts open NAME`). Nothing in the registry is a password, and a credentials
  file the user points to is never read: the sign-in stays the user's.
- **Same commands, same files.** `case`, `shot`, `els`, `texts`, `source`, `tap`, `hold`, `drag`, `id`, `lbl`,
  `tapif`, `scrollto`, `type`, `clear`, `setval`, `waitfor`, `expect`, `expect-not`, `do <recipe.steps>` work as on
  the phones and write the same `.session`, `activity.log` and `taps.jsonl` (with a pre-click screenshot), so the
  coverage page and run-log work unchanged. Coordinates are **CSS pixels** of the viewport (the screenshot frame).
  `els` prints `tag[role] | id | text | label | x,y,w,h | flags`; `id` matches id, data-testid, data-test-id or name.
  Elements under a dialog or overlay are left out (`els --all` shows them flagged `covered`).
- **Web-only commands.** `open`, `reload`, `back`, `forward`, `url`; `tabs`, `tab N`, `newtab`, `closetab` (a click
  that opens a new tab moves the run into it by itself; switch back with `tab 0`); `hover` (menus and tooltips that
  open on hover), `dbl`, `rclick`, `click <css>`, `scroll DY`, `key <Enter|Escape|Control+A…>`; `window W H` sets the
  exact viewport (run every segment at the table's viewport, 1440 × 900 for MyEdit unless a row names another; a
  narrow-window row sets its own and restores it); `upload <id>|- <files…>` sets the files of a file input directly,
  which is how upload rows pick photos and videos (fixtures listed in `web/fixtures.md`). A row that tests the
  drag-and-drop or the system file dialog itself is run by hand or parked, since `upload` skips both.
- **Waiting for a result (MyEdit trial, 2026-11-24).** `waitfor` matches any visible text, so wait for a text that
  appears only when the result is in (Image Enhancer: 「New Resolution」, not 「Download」, which the header shows from
  the start), and list the failure texts too. Endless CSS animations are frozen for screenshots, so `shot` works on
  pages that never settle.
- **Logs (run step 7 on the web).** `logs start` at every segment start (background capture of console messages,
  page errors, failed requests and HTTP ≥ 400 responses from every tab into `logs/.live/browser.jsonl`) and
  `pull-logs <segment>` at the segment end and before a hand-off. eBugs cite excerpts; full logs stay in the run's
  git-ignored `logs/`. A request URL can carry tokens: never paste one whole into an eBug.
- **Build check.** `build` prints `web.build_js` evaluated on the page, the URL, title and Chrome version, and saves
  the site's public `version.json` as `<run dir>/build-info.json` (raw response, version, build number): the build
  of record for results and eBugs. Read it at every segment start: MyEdit's demo site is redeployed often.
- **Credits and accounts (run step 8 on the web).** `credits <ID>` reads the balance, account and active plan from the
  account menu into `ledger/<ID>-<time>.json`; `credits ledger <ID>` saves the environment's credit ledger page (text
  and screenshot; demo: stage2.cyberlink.com, production: membership.cyberlink.com, `web.credits.ledger_urls`). Read
  both before and after every charged action and compare amount, time and tool name; a refund counts only when the
  ledger shows it (the ledger read saves the balance and one object per transaction: Time, Credits, Category,
  Product, Details). One account's credits are shared by MyEdit and MyEdit Biz, so match each new transaction by
  Product and Details (the tool), not by the balance alone. The ledger site needs its own sign-in once per Chrome profile (the user's); until then the
  ledger read is Blocked, and the balance alone does not prove a charge. Use the default account unless a row
  needs Free, zero credits or a storage state (the account roster lives with the user, not in the repo).
- **`web/fixtures.md` (one per web table).** Before the first segment: environment and base URL; the account and plan
  each case group needs (default unless a row says otherwise) and its Chrome profile / port; the starting credit
  balance; storage state (MyEdit Cloud n GB / m GB); the test media (images, videos, audio files by name, size,
  resolution, what each row uses them for); the viewport; which rows spend credits and the go-ahead for them.
- **Recordings (user, 2026-11-24, after the Contract Runner's approved style).** A dynamic bug (motion, timing, a
  sequence) gets a recording; a static one screenshots only. `record start [max s]` before the first repro step,
  the steps, then `record stop <bug or case ID>` → `recordings/<name>.mp4`: Chrome's own frames of the run's tab
  (following a new tab), with the labelled **ACTION CURSOR OVERLAY** (white arrow, cyan ring at each click) drawn at
  the clicks the script delivered; hovers are not drawn. Raw frames and `clicks.jsonl` stay in `recordings/<name>/`
  (local only). Before attaching, look at frames at each click (`ffmpeg -i … -vf fps=4 …`) and check the steps and the
  failure are visible; a clip with a missing or misplaced cursor is not attached. Needs `ffmpeg` (`CASEBOOK_FFMPEG`).
- **Hover menus and new tabs (MyEdit, 2026-11-24).** The pointer glides from its last place to each target, so menus
  that open on hover stay open on the way. Signed in, MyEdit's header tool menu opens the tool in a **new tab**; the
  run follows it, so close it (`closetab`) or go back (`tab 0`) before the next case that starts from Home.
- **Not on the web yet.** `design` captures for the figma conformance branch, and the phones'
  language-by-launch-argument (the site's language is the URL prefix instead). The phone-only commands (`launch`, `appstate`, `wifi`, `pink`, `ledger`, `logcat`) have no web version.
