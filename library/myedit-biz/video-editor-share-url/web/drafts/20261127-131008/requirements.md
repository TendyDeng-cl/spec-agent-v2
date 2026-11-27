# Video Editor: Share Project URL — requirements (web)
Spec: Video Editor Share Project URL - KC spec 2026-11-11.md (the MyEdit Biz Knowledge Center PM spec
`myedit-biz/features/video-editor-share-project-url.md`, PM Christine Lin, ready_for_rd, updated 2026-11-11, Jira MB-387,
moved from the MyEdit spec; read 2026-11-27 with get_document on cl-knowledge-center-myedit-biz) and Video Editor Share
Project URL - PM Figma 6531-156549.md (text of the PM Figma section 「26’ 11/E Share Project URL」 and its five boards, file
3GnLdOiX9G5NH27l1ltqVr page 6002:7, read 2026-11-27 through figma-pm / qa1). Figma-only spec set `specs/2026-11-27`, no PDF.

Tags: [KC] the KC spec (board `kc-spec`, one line per table row); [PMF:<board>] a PM Figma board in `extracted/boards/`;
[KC:rule <doc>] a product rule the spec cites (standing input 7, `knowledge-center.md`); [Req: REQ-…] the request ledger;
[Rule n: …] the coverage rules.
Source order: there is no MyEdit Biz Design yet (UJ, due 2026-11-27), so every row is PM-only (Notes 「PM-only: no Design
frame yet」, coverage pass 7); the MyEdit Design (ZB9BpGIGsjikfB5p7sc8ma 5782:31535) is MyEdit-only and not a source.
Between the two PM sources the KC spec (2026-11-11) is newer than the Figma notes (dated 20261019 at the latest) and was
rewritten for Biz (plans Free / Pro, small-screen mask, `/share/{token}` URL, Biz storage messages): it wins where they
differ, and each difference is an Open question or a Note. The Figma labels MyEdit plans; the KC spec maps them: User B
(Free & Audio Pro) = Biz **Free**, User C (Creator Pro & Studio Pro) = Biz **Pro**.
Platform: web, desktop Chrome at 1440 × 900 on MyEdit Biz demo (https://business-demo.myedit.online) unless a row says
otherwise. Roles and accounts: `web/fixtures.md` (A = sharer, B = Free receiver, C = Pro receiver with room).
MUI: deferred (REQ-002): RD has not finished the strings; the two zh_TW strings the spec gives are listed under Not added.

## Share link from the editor (Export & Share)
- R-001 [KC; PMF:pm-add-share-option] In the Video Editor, the top-right button that used to read 「Export」 reads 「Export & Share」.
- R-002 [KC; PMF:pm-add-share-option; PMF:pm-user-a-copy-link] Clicking 「Export & Share」 opens a dialog whose upper part is 「Share」 (the project link with a copy icon) and whose lower part downloads the video: 「Export Format: mp4」 and buttons 「Cancel」 / 「Download」.
- R-003 [KC; PMF:pm-add-share-option] The Share part reads exactly 「Share access to this project. Anyone with the link can sign in to view it. Premium users can copy and edit the project.」 (Q-1).
- R-004 [KC; PMF:pm-add-share-option] Hovering the link shows the full URL in a tooltip.
- R-005 [KC; PMF:pm-user-a-copy-link] Clicking the copy icon copies the link to the clipboard and shows the tooltip 「Copied」.
- R-006 [KC] The link has the MyEdit Biz share format `{site}/{tool path}/share/{token}` (the same pattern as Biz Photo Editor design-project links); on demo it starts with https://business-demo.myedit.online (Q-2: the Figma 20261019 note gives an older MyEdit format).
- R-007 [KC] 「Download」 in the dialog, with 「Export Format: mp4」, downloads the project as an .mp4 video.
- R-008 [KC; PMF:pm-add-share-option] 「Cancel」 closes the dialog without downloading.
- R-009 [PMF:pm-add-share-option] The dialog has an X (drawn at its top right) that closes it (PM-only).
- R-010 [KC] Every signed-in user can share their own project, whatever the plan (Free and Pro): the plan gate applies only when a receiver creates a copy.
- R-011 [KC] There is no way to stop sharing: neither the Export & Share dialog nor the My Projects card menu offers to stop sharing or disable the link, and the link keeps opening the project.

## Share link from My Projects
- R-012 [KC; PMF:pm-my-projects-share] The 「more」 menu of a card in My Projects › Video lists 「Duplicate」, 「Share」, 「Rename」, 「Delete」 in that order, with no 「Download」.
- R-013 [KC; PMF:pm-my-projects-share] Clicking 「Share」 closes the more menu and shows the toast 「Share link copied. You can now share the link.」
- R-014 [KC] The link 「Share」 copies is that project's share link: opened by another signed-in user it shows that project.

## Owner opens their own link
- R-015 [KC] The sharer who opens their own link gets the editable editor of the project, not the read-only view.

## Receiver opens the link (B and C)
- R-016 [KC; PMF:pm-user-b-receive; PMF:pm-user-c-receive] A signed-out receiver who opens the link first gets the 「Sign In」 dialog.
- R-017 [PMF:pm-user-b-receive; PMF:pm-user-c-receive] After signing in, the receiver goes on to the shared project's view, as a signed-in receiver does (Q-6).
- R-018 [KC; PMF:pm-user-b-receive] A signed-in receiver who opens the link goes straight to the view of the shared project; opening it does not create a copy (the receiver's My Projects › Video gains no project).
- R-019 [KC; PMF:pm-user-b-receive] In the view, Play, Pause and Stop work.
- R-020 [KC; PMF:pm-user-b-receive] In the view, dragging the playhead seeks.
- R-021 [KC; PMF:pm-user-b-receive] In the view, full screen plays the video enlarged.
- R-022 [KC; PMF:pm-user-b-receive] In the view, the top menu and the user profile menu can be used.
- R-023 [KC; PMF:pm-user-b-receive] In the view, the left side panel is collapsed by default and disabled.
- R-024 [KC; PMF:pm-user-b-receive] In the view, the Layer panel is collapsed by default and disabled.
- R-025 [KC; PMF:pm-user-b-receive] In the view, objects on the timeline cannot be selected (disabled).
- R-026 [KC; PMF:pm-user-b-receive] In the view, zoom in / zoom out are disabled.
- R-027 [KC; PMF:pm-user-b-receive] In the view, undo / redo are disabled.
- R-028 [KC; PMF:pm-user-b-receive] In the view, 「Export & Share」 is disabled.
- R-029 [KC; PMF:pm-user-b-receive] In the view, the project name keeps its usual colour but cannot be clicked to rename, and no Cloud icon is shown.
- R-030 [KC; PMF:pm-user-b-receive; PMF:pm-user-c-receive] The view shows a 「Create Copy of Project」 button at the bottom.
- R-031 [KC] The receiver always sees the latest version: after the sharer edits the project, opening the link again shows the edits.
- R-032 [KC] When the shared project has no clips, the 「Create Copy of Project」 button is not shown.

## Create Copy of Project — Free receiver
- R-033 [KC; PMF:pm-user-b-receive] A Free receiver who clicks 「Create Copy of Project」 gets the Limitation popup 「Your account has limited access to copying projects.」 / 「Upgrade to unlock this feature for seamless project management.」 with the Video Editor cover image and an 「Upgrade now」 button; no copy is made.
- R-034 [KC; PMF:pm-user-b-receive] 「Upgrade now」 in the Limitation popup opens the sales popup.
- R-035 [KC] Closing the Limitation popup or the sales popup without buying makes no copy and leaves the receiver on the view (Free cannot copy; Q-12 for what the close buttons do).
- R-036 [KC] After a Free receiver completes the subscription in the sales popup, the receiver is back on the same share view with no page reload and the state kept; the copy does not start by itself: a new click on 「Create Copy of Project」 runs the cloud storage check, then 「Copy Project to Start Editing」, and only 「Copy」 copies.

## Create Copy of Project — Pro receiver
- R-037 [KC; PMF:pm-user-c-receive] A Pro receiver who clicks 「Create Copy of Project」 gets the dialog 「Copy Project to Start Editing」 / 「You’re about to copy this project as a template for your own use. The original project will remain unchanged. Once copied, you can edit it freely.」 with 「Cancel」 / 「Copy」.
- R-038 [KC; PMF:pm-user-c-receive] 「Cancel」 closes the dialog without copying.
- R-039 [KC; PMF:pm-user-c-receive] 「Copy」 copies the project in the same tab and shows a loading dialog while the copy is made (PMF draws 「Loading Project...」 with a percentage); the loading time includes copying the project's media (20261019 Update).
- R-040 [Rule 2: wait thresholds] The copy's loading dialog keeps showing progress: no stretch longer than 10 s with nothing moving.
- R-041 [KC; PMF:pm-user-c-receive] When the copy is made, the editable editor opens on it and its name is the original name followed by 「_copy」.
- R-042 [PMF:pm-user-c-receive] The copy is the receiver's own project: the editor shows 「Export & Share」 enabled, the Cloud icon beside the name and the same clips as the original, and it is listed in the receiver's My Projects › Video (PM-only).
- R-043 [PMF:pm-user-c-receive] The original project remains unchanged when the receiver edits the copy (the dialog's own words).
- R-044 [KC] The media the sharer uploaded into the project appear in the receiver's Uploads after the copy, and they count toward the receiver's cloud storage (PM confirmed).
- R-045 [KC] When the sharer later deletes those uploaded media, the receiver's copy is not affected (PM confirmed).

## Create Copy of Project — cloud storage
- R-046 [KC; KC:rule derived-cloud-storage] When the receiver's cloud storage cannot hold the project, the copy is blocked before it starts and no copy is made; a Pro receiver gets 「Your Cloud Storage is Full.」 / 「You cannot use this tool because your storage is full. Please manage your storage space to continue.」
- R-047 [KC] 「Manage」 in that message takes the Pro receiver to My Projects (Q-7).
- R-048 [KC] A non-Pro receiver whose storage cannot hold the project gets 「You’ve reached your cloud storage limit.」 / 「Upgrade now to increase your Cloud storage.」 with an upgrade option (Q-3: the Limitation popup comes first for that plan).

## Shared project deleted or unavailable
- R-049 [KC; KC:rule derived-my-projects-page] A signed-in receiver who opens the link of a deleted project lands on My Projects › Video with the message 「The shared project has been deleted and is no longer available.」
- R-050 [KC] That message shows once: it does not come back when My Projects is reloaded.
- R-051 [KC] A signed-out receiver who opens the link of a deleted project lands on the Video Editor entry page with no message.
- R-052 [KC] When the project is deleted while a receiver has its view open, within about 5 s a banner with the same message appears at the top; it cannot be closed, and 「Create Copy of Project」 is hidden.
- R-053 [KC] A link whose project cannot be fetched because the link is invalid is handled as a deleted project (R-049).
- R-054 [KC] A link whose project cannot be fetched because of a network failure or a server error is handled as a deleted project, with no message telling the causes apart.
- R-055 [KC; KC:rule derived-my-projects-page] When the project fails to load for another reason (not deleted), the receiver gets 「The project may have been updated. Try copying the link again.」 and lands on My Projects (Q-4).

## Small screens
- R-056 [KC; KC:rule derived-small-screen-mask] On a desktop with the window 1200 px wide or less, the share link opens under the full-screen small-screen mask 「Your screen size is too small for this feature. Please adjust your browser window to a larger size for the best experience.」 and nothing under it can be used.
- R-057 [KC; KC:rule derived-small-screen-mask] With the window wider than 1200 px (1201 px), the view opens with no mask.
- R-058 [KC; KC:rule derived-small-screen-mask] On a phone or tablet, the share link opens under the mask 「This service is only available on larger screens. Please switch to a desktop for full access.」

## Plans
- R-059 [KC] Free and Pro receivers can both view a shared project once signed in.
- R-060 [KC] Only Pro can create a copy: Free gets the Limitation popup and then the sales popup, Pro copies.

## Open questions
- Q-1 [Req: REQ-004] The Share text says 「Premium users can copy and edit the project.」 while MyEdit Biz plans are Free / Pro (the pricing page calls the subscribed state 「Premium Access」). Assumption: the string is shown exactly as the spec words it, and "Premium users" means Biz Pro. R-003; TC-003.
- Q-2 The URL format: the PM Figma note 「20261019 Update」 defines https://myedit.online.en/video-editor/online-video-editor/{project token} (MyEdit, no `/share/`), the KC spec (2026-11-11, newer, written for Biz) says `{site}/{tool path}/share/{token}` like the Biz Photo Editor links, but names no tool path for the Video Editor. Assumption: KC wins: the link is under https://business-demo.myedit.online and contains `/share/` followed by a token; the tool path is recorded, not judged. R-006; TC-005.
- Q-3 The spec gives a non-Pro storage-full message for Create Copy, but a non-Pro (Free) receiver is stopped by the Limitation popup before any copy; only the R-036 order (subscribe, then storage check) ever checks storage, and by then the receiver is Pro. Assumption: a Free receiver with full storage gets the Limitation popup, not the storage message; the non-Pro storage message is not expected anywhere in this flow. R-048; TC-039.
- Q-4 What makes a shared project 「fail to load」 without being deleted (R-055), and how a tester can cause it, is not stated. Assumption: the row is parked until RD names a trigger. R-055; TC-055.
- Q-5 The Biz small-screen rule (product rule, from code) also masks the Video Editor edit screen when the window is 550 px high or less; the spec does not say whether the share view counts. Assumption: not checked until PM says so (no row). R-056.
- Q-6 The spec says a signed-out receiver gets the Sign In dialog, and a signed-in one goes straight on, but not where the receiver lands after signing in through that dialog, nor what closing the dialog does. Assumption: after sign-in the shared view opens (R-017); closing the dialog is recorded, not judged. R-016, R-017; TC-017, TC-018.
- Q-7 「Manage」 in the Pro storage-full message 「takes the user to My Projects」: the spec does not say which tab or whether it opens a new tab (the general rule opens 「the category's My Projects」). Assumption: My Projects opens on the Video tab; the tab used is recorded. R-047; TC-049.
- Q-8 There is no MyEdit Biz Design yet (UJ, due 2026-11-27): every string and layout comes from the PM spec and the PM Figma (which draws MyEdit screens and plans). Assumption: rows quote the KC spec; they are checked again when the Biz Design arrives, and the Design wins where newer (coverage pass 7). All rows.
- Q-9 The spec does not say what happens when the copy fails part-way, nor how a second copy of the same project is named (the code-derived cloud-storage rule says `_copy`, then `(1)`, `(2)`). Assumption: neither is checked (no rows) until PM states it. R-041.
- Q-10 States of the link the spec does not state: whether the link shows a loading state (the code-derived rule says 「Processing...」 with the copy icon disabled) and what 「Export & Share」 does for a signed-out user in the Video Editor. Assumption: not checked (no rows); TC-002 records what the dialog shows while it opens. R-002.
- Q-11 [Req: REQ-005] The Biz 1.12 board's MB-451 「What's New: Product Fixer / AI Shot List / Video Share URL / Batch Text」 is in the December release, but no source states the Video Share URL card (title, text, image, link). Assumption: no row until its content is written (update-plan › Not added).
- Q-12 The spec does not say what the Limitation popup's close button and the sales popup's X do (the shared upgrade-dialog frame always has a close button). Assumption: each closes its popup and the view stays as it was with no copy (R-035 states only the no-copy part). R-035; TC-037, TC-038.

## Knowledge Center rules (standing input 7, checkpoint 2026-11-27)
See `knowledge-center.md` for each source and its authority. The rules below are cited where they set an expected result;
code-derived documents (「未經人確認」) only point at what the spec leaves unsaid (Q-5, Q-7, Q-9, Q-10, Q-12).

### Domain rules
Every applicable spec or team rule of knowledge.md (standing input 6).

| Entry | Requirements |
|---|---|
| (none) | n/a (knowledge.md: no CyberLink, myedit-biz or feature entries exist; the MyEdit KP entries are product myedit) |

## Added 2026-11-27 — coverage passes and standing inputs

### Request ledger coverage
Every open table entry of requests.md for web.

| Ledger entry | Requirements |
|---|---|
| REQ-001 | own table for Share URL: this draft (all requirements); PiP tools are another feature |
| REQ-002 | MUI deferred: no MUI section, no mui.json (update-plan › Not added) |
| REQ-003 | demo environment and account roles: web/fixtures.md; R-010, R-046, R-047, R-059, R-060 |
| REQ-004 | Q-1 (R-003) |
| REQ-005 | scope MB-387 and TR261124-0031; What's New card not added (Q-11) |

### Job states
Coverage pass 2: rows = jobs the feature runs, cells = rows or n/a with the reason.

| Job | Start / loading | Success | Failure | Retry | Leave and return | Longest wait | Done notice |
|---|---|---|---|---|---|---|---|
| Copy link (Export & Share) | n/a (spec silent: Q-10) | TC-005 | n/a (spec silent) | n/a (spec silent) | n/a (instant, nothing runs on) | n/a (instant) | TC-005 |
| Copy link (My Projects) | n/a (instant) | TC-013, TC-014 | n/a (spec silent) | n/a (spec silent) | n/a (instant) | n/a (instant) | TC-013 |
| Download mp4 | n/a (spec silent) | TC-006 | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) | TC-006 | n/a (spec silent) |
| Open shared link | TC-019 | TC-019, TC-032 | TC-050, TC-054, TC-055 | n/a (spec silent) | TC-033 | n/a (spec silent) | n/a (no notice) |
| Create Copy of Project | TC-043 | TC-044, TC-045 | n/a (spec silent: Q-9) | n/a (spec silent) | n/a (spec silent) | TC-043 | TC-044 |
| Deletion detection on an open view | n/a (runs in the background) | TC-051 | n/a (spec silent) | n/a (spec silent) | TC-052 | TC-051 | TC-051 |

### Error classes
Coverage pass 2: the spec names no error codes; columns are the failure causes it lists.

| Job | Deleted | Invalid link | Network failure | Server error | Load failure (not deleted) |
|---|---|---|---|---|---|
| Open shared link, signed in | TC-052 | TC-050 | TC-054 | TC-054 | TC-055 |
| Open shared link, signed out | TC-053 | n/a (spec states only the deleted case for signed-out receivers) | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) |
| Shared view already open | TC-051 | n/a (the link was valid when opened) | n/a (spec silent) | n/a (spec silent) | n/a (spec silent) |

### Exit × stage
Coverage pass 8: every dialog the feature opens × every way out the spec draws.

| Stage | X | Cancel | Esc or click outside |
|---|---|---|---|
| Export & Share dialog | TC-008 | TC-007 | n/a (spec silent) |
| Limitation popup | TC-038 | n/a (not drawn) | n/a (spec silent) |
| Sales popup | TC-037 | n/a (not drawn) | n/a (spec silent) |
| Copy Project to Start Editing | n/a (not drawn) | TC-042 | n/a (spec silent) |
| Sign In dialog | TC-017 | n/a (not drawn) | n/a (spec silent, Q-6) |
| Loading dialog (copy) | n/a (not drawn) | n/a (not drawn) | n/a (spec silent) |

### Hidden clauses
Coverage pass 9.

| Requirement | Hidden clause | Observed through | Rows |
|---|---|---|---|
| R-018 | opening the link does not create a copy | the receiver's My Projects › Video list before and after | TC-019 |
| R-036 | no page reload and no automatic copy after the purchase | the page's scroll/play state kept, My Projects unchanged until the second click | TC-040 |
| R-043 | the original stays unchanged | the sharer reopens the original after the receiver edited the copy | TC-045 |
| R-044 | the sharer's uploaded media are copied into the receiver's Uploads and counted | the receiver's My Uploads and the cloud storage meter before and after | TC-046 |
| R-045 | deleting the sharer's uploaded media does not reach the copy | the copy still plays those clips after the sharer deleted them | TC-047 |
| R-052 | the open view checks about every 5 s | time from the deletion to the banner (screen recording) | TC-051 |
| R-054 | a network failure or server error is handled as a deletion | the request blocked in Chrome DevTools, then the landing page and message | TC-054 |

### Variants
Coverage pass 10: one line per plan the rule names (one setting, Plan, so no Combinations grid).

| Requirement | Variant | Rows |
|---|---|---|
| R-010 | Plan=Free | TC-009 |
| R-010 | Plan=Pro | TC-010 |
| R-059 | Plan=Free | TC-019 |
| R-059 | Plan=Pro | TC-032 |
| R-060 | Plan=Free | TC-035 |
| R-060 | Plan=Pro | TC-043 |
