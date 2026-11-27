# Shared MyEdit and MyEdit Biz checks

## KP-065 Storage full: Generate Anyway or Manage
- kind: rule · platform: web · use: analysis, run, ebug · tags: storage, generation, prompt · authority: team
- source: contract-runner domain shared/storage-full-and-import-orientation.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-storage-full
- verified: MyEdit-5.11.0-11242029 demo (2026-11-25), the 「Generate Anyway」 half only (Video Enhancer web run 2026-11-25-r1-full TC-148) · status: disputed: on a storage-full Free account Video Enhancer offers 「Generate Anyway」 and 「Upgrade」 with no 「Manage」 (Video Enhancer web run 2026-11-25-r1-full TC-147, O-22); the run report suggests Manage may only appear for a full Studio Pro account; to PM (TC-147 question)

With cloud storage full, a tool that does not produce a Project first shows a storage-full prompt with 「Generate
Anyway」 and 「Manage」: generation continues only after 「Generate Anyway」, and 「Manage」 opens that tool's Album.
User confirmed for MyEdit and MyEdit Biz (2026-11-04).

## KP-066 Storage full: Project tools stop at send
- kind: rule · platform: web · use: analysis, run, ebug · tags: storage, project · authority: team
- source: contract-runner domain shared/storage-full-and-import-orientation.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-storage-full-project

A tool that produces a Project is stopped at its Send / Generate entry when storage is full; the prompt, buttons and
destination come from that tool's spec (example: Biz Showcase shows 「Your Cloud Storage Is Full」 with only
「Manage」, to My Projects › Marketing Video). User confirmed (2026-11-04).

## KP-067 Storage-full preconditions
- kind: rule · platform: web · use: analysis, run, ebug · tags: storage, fixture · authority: team
- source: contract-runner domain shared/storage-full-and-import-orientation.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-storage-full-setup

Record product, environment, plan and used / total storage. Nearly full, low credits or a file over its size limit
do not stand in for full storage. Without the precondition the case is Blocked: never fill the account, delete data
or change the plan to create it.

## KP-068 Persistence is checked after a reload
- kind: rule · platform: web · use: analysis, run, ebug · tags: storage, persistence, save · authority: team
- source: contract-runner domain shared/storage-full-and-import-orientation.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-persistence

Whether a result or change was really saved (or, when full, really not saved) is checked by reloading the cloud list
or reopening the project and comparing with the state before; the page's 「Saved」 text or preview is no proof.

## KP-069 Import orientation: EXIF and video rotation
- kind: rule · platform: web · use: analysis, run, ebug · tags: orientation, exif, import · authority: team
- source: contract-runner domain shared/storage-full-and-import-orientation.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-import-orientation

Test images (EXIF Orientation) and videos (container rotation) separately with recognisable originals: make an
upright reference first, upload the untouched original through the normal flow and compare the imported content's
orientation. Upload success or aspect ratio alone is no pass; crops or load failures are inconclusive.

## KP-070 Download file name and extension
- kind: rule · platform: web · use: analysis, run, ebug · tags: download, filename, export · authority: team
- source: contract-runner domain shared/storage-full-and-import-orientation.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-download-filename

Check the finished file's original name for every download or export (result download and editor export
separately): prefix, parts, separators, date-time and extension as the tool's spec defines them. Undefined parts are
an Open question; a browser's duplicate suffix is noted apart. Naming formats are per tool.

## KP-071 New tool: three entry places with NEW
- kind: rule · platform: web · use: analysis, run, ebug · tags: new-tool, entry, new-badge · authority: team
- source: contract-runner domain shared/new-tool-entry-coverage.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-new-tool-entries

Every new tool is reachable, with its correct name and its own 「NEW」 tag, from: the tool editing room's top category
menu; the signed-in Launcher (tool card and top menu); the public Home page (tool card and top menu). Use the tool's
real category; MyEdit's Launcher and Home routes are its own, not Biz hosts. User 2026-11-02.

## KP-072 New tool entries are judged one by one
- kind: rule · platform: web · use: analysis, run, ebug · tags: new-tool, entry, evidence · authority: team
- source: contract-runner domain shared/new-tool-entry-coverage.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-new-tool-checkpoints

Each place and each card or menu is its own checkpoint; entry present, 「NEW」 shown and click destination are
separate verdicts, and editing-room evidence never stands in for Launcher or Home. 「NEW」 colour, expiry and
dismissal are not assumed: they come from the spec. A missing place in the spec is a question, not a skip.

## KP-073 New tool listed on Pricing
- kind: rule · platform: web · use: analysis, run, ebug · tags: new-tool, pricing · authority: team
- source: contract-runner domain shared/new-tool-entry-coverage.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-new-tool-pricing

The Pricing compare table (Compare All Plans) lists every new tool with its correct name, category and per-plan
availability, limits and credits from the tool's confirmed spec (undefined values are a PM question); a tool-name
link, when drawn, opens the right tool. No 「NEW」 needed there. User 2026-11-02.

## KP-074 Tool browser tab title
- kind: rule · platform: web · use: analysis, run, ebug · tags: new-tool, title, seo · authority: team
- source: contract-runner domain shared/new-tool-entry-coverage.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-tab-title

Each new tool page with its own route (mode picker, editing room) has a readable browser tab title for that tool and
language: never an unresolved key (vol.seo.meta.title.…), 「undefined」 or another tool's title. Exact SEO text only
from the spec; evidence shows the tab itself. User 2026-11-02.

## KP-075 Tool card thumbnail is unique
- kind: rule · platform: web · use: analysis, run, ebug · tags: thumbnail, launcher, home · authority: team
- source: contract-runner domain shared/new-tool-entry-coverage.md (sources/2026-11-25-contract-runner-domain; user 2026-11-25) · aka: shared-tool-thumbnail

A tool card thumbnail identical to another tool's on the same page (Launcher and Home separately, across categories)
is a FAIL, whatever the name, 「NEW」 or frame. All tools, not only new ones; similar colours alone are not identical.
No-duplicate needs every card loaded and checked. User 2026-11-03.
