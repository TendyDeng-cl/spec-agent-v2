# Domain knowledge for myedit/video-enhancer (web), for analysis

## rule

### KF-001 Over-limit Replace in Professional opens the Trimmer (web, authority spec)
Replace Video with a clip over the current Mode's limit opens 「Trim Video」 at once (hint 「Professional mode supports
videos up to 2:30 long. Please trim your video to continue.」); after Trim the clip replaces the video with no red text,
Cancel keeps the old clip. The red 2:30 text applies only when Professional is chosen with a video already over 2:30.
Until 2026-11-26 the spec wanted the red text after Replace, so MYE261124P0033 asked for that; under today's spec it
is not a bug. The Continue Editing half (over 8:00 from Video Trimmer shows 「Video Too Long」) is PM ruling #1c76d4b60c73.

### KP-001 Model change updates its limits (web, authority team, unverified)
When a flow has model-dependent inputs (duration, media count, prompt length): after the user switches model and
before submitting, the model name, description, allowed values and input limits shown all match the new model.

### KP-002 Inputs over a limit are blocked and named (web, authority team, unverified)
When inputs have a count, file size, resolution, storage or reference-media limit: adding one more, or submitting
more than allowed, is blocked and the message names the limit that applies; never accepted silently.

### KP-003 Prompt length limit is visible and enforced (web, authority team, unverified)
When a prompt has a character or word limit: at or near it the limit state is clearly shown, text over the limit is
never sent silently, and the user can see how to fix the prompt.

### KP-004 Out-of-range numbers go to the nearest bound (web, authority team, unverified)
A numeric field with a minimum and maximum rejects a value outside them or clamps it to the nearest legal bound;
it never jumps to the opposite bound (e.g. a value under the minimum becoming the maximum).

### KP-005 Steppers disable at their bounds (web, authority team, unverified)
Increment and decrement controls of a bounded value are disabled at the minimum or maximum and no longer change the
value.

### KP-006 Rejected imports report and never hang (web, authority team, unverified)
An imported file of an unsupported type, or one that breaks a set limit, gets a clear validation message; it never
stays in a processing state indefinitely.

### KP-007 Progress starts at 0 and never goes back (web, authority team)
An async job (generate, enhance, transcribe, upload, export) shows progress from 0, and progress never moves back
once complete. Progress need not be linear unless the spec says it is proportional.

### KP-008 Jobs end in a terminal state (web, authority team, unverified)
A job shown as processing ends Completed, Failed or Cancelled once the server or client finishes or rejects it; it
never stays processing indefinitely.

### KP-009 A cancelled job is not reported as failed (web, authority team, unverified)
When the user cancels a running job it ends Cancelled, with no generation-failed message.

### KP-010 Failure keeps the page and the inputs (web, authority team, unverified)
When a job fails the user sees an understandable error message, the page does not reload, and valid inputs are
kept for fixing or retrying.

### KP-011 Inputs in use are protected while a job runs (web, authority team, unverified)
While a job runs, actions that would conflict with it (replacing or removing the input it uses) are disabled or the
running job is clearly protected from them.

### KP-012 Download matches the preview (web, authority team, unverified)
A previewed result, once downloaded, matches the preview in content, orientation, aspect ratio, duration and audio,
unless the spec states a difference.

### KP-013 Orientation metadata is followed throughout (web, authority team, unverified)
Media whose stored pixel orientation differs from its display orientation (EXIF) shows and generates in the
correct orientation everywhere: preview, processing, thumbnails and export.

### KP-014 File extension matches the encoding (web, authority team, unverified)
A downloaded result's file extension matches its actual encoding (no .jpg name on PNG data).

### KP-015 Audio off means no audio track (web, authority team, unverified)
When the user turns audio off before generating, the played or downloaded result has no audio track, unless the
spec defines otherwise.

### KP-016 Result duration matches the chosen one (web, authority team, unverified)
A result generated with a chosen allowed duration has that duration, within the tolerance the spec and model
define.

### KP-017 Repeated export keeps the result playable (web, authority team, unverified)
Previewing or exporting the same result again leaves it playable; it is never corrupted or replaced by a blank
result.

### KP-018 Click selects the object hit (web, authority team, unverified)
Where selectable objects (scenes, clips, layers, subtitles, timeline items) overlap, a click selects the object
under the click point; selection never jumps to another overlapping object.

### KP-019 Selecting moves the playhead to its start (web, authority team, unverified)
Where a selected scene or timeline object is linked to the preview playhead, changing the selection moves the
playhead and preview to that item's start.

### KP-020 Every view shows the latest value (web, authority team, unverified)
An object shown in several views (canvas, properties panel, list, timeline) shows the same latest position,
duration and content in all of them once an edit is applied.

### KP-021 Long text wraps in its box (web, authority team, unverified)
Long text or text with explicit line breaks, edited or previewed on a canvas or result, stays visible and wraps
inside its text area; unrelated text objects do not move.

### KP-022 Generated project stays editable in another editor (web, authority team, unverified)
A generated project opened in another editor loads with its media tracks still editable, keeping their identity,
names and relative order.

### KP-023 Timeline click jumps; trim range stops playback (web, authority team, unverified)
Clicking the timeline during playback jumps the playhead and preview there and plays on from that point; playback
started inside a trim range stops at the chosen end point. User confirmed product-wide (2026-11-17).

### KP-024 Going back keeps imports and settings (web, authority team, unverified)
In a multi-step flow, returning to an earlier step keeps the imported media and settings unless the user confirms
discarding them.

### KP-025 Leaving with unsaved changes asks first (web, authority team, unverified)
With unsaved changes, leaving, reloading, closing the page or signing out first shows a confirm or save flow before
anything is discarded.

### KP-026 Leave dialog does what was chosen (web, authority team, unverified)
In a leave-confirmation dialog, confirming performs the requested navigation; choosing to stay keeps the current
page and its state.

### KP-027 No unsaved warning without changes (web, authority team, unverified)
A flow with no user input or result yet leaves without an unsaved-changes warning.

### KP-028 Layout changes keep settings (web, authority team, unverified)
Resizing the window, expanding a panel or switching view keeps chosen settings and entered data, unless the spec
defines a reset.

### KP-029 Playback stops when the user moves on (web, authority team, unverified)
Audio or video playing in a preview pauses or stops when the user switches tab, presses Generate or replaces the
playing media; it never keeps playing in the background.

### KP-030 Template replaces only after confirming edits (web, authority team, unverified)
Picking a template, Inspiration or example that overwrites the prompt or imported media asks to confirm only when
the user has changed something; no confirmation when nothing changed or the already-applied template is picked again.

### KP-031 Saved items survive a reload (web, authority team, unverified)
A result or project saved to the library, history or cloud account is still found in that view after a page
reload or a later return with the same account.

### KP-032 Library status is current (web, authority team, unverified)
A library or history item shows its latest status (processing, completed, failed) and only the actions that fit
it; an unfinished item never shows as completed.

### KP-033 Saving the same result twice adds no duplicate (web, authority team, unverified)
Saving an already-saved result again, without generating a new one, does not create a second library item.

### KP-034 Thumbnail and metadata name the same result (web, authority team, unverified)
A library or history item's thumbnail, file name, duration and model name all identify the same saved result.

### KP-035 Reopened project loads its media (web, authority team, unverified)
Reopening a project saved with media loads the media and project state, with no blank preview or lost editable
content.

### KP-036 Full storage: new images are not saved (web, authority team, unverified)
With the account's cloud storage at or over its limit (MyEdit Agent included), a newly generated image is not added
to its My Library folder. Check the real folder by image content and time, not the Agent's 「saved」 text; generating
itself is not forbidden. Known to reproduce on production 2026-10-08 (MyEdit Agent).

### KP-037 Model name in both library popups (web, authority team, unverified)
A result with a model name (Photo Edit by Chat included) shows the same model name in its preview popup from
My Library › Recent Creations and from the tool's own folder; use the model actually chosen. Known to reproduce on
demo 2026-10-08 (missing in Recent Creations).

### KP-039 No shortage dialog with enough credits (web, authority team)
A signed-in account with enough credits for the chosen operation never sees the insufficient-credits or purchase
dialog when starting it.

### KP-040 Balance updates without reload (web, authority team)
After a credit charge or refund completes, the balance shown on the working page reflects it without a reload.

### KP-041 Restricted actions blocked by account state (web, authority team, unverified)
A feature limited by sign-in, subscription or trial eligibility blocks the action for an account that is signed
out, expired or ineligible, with a prompt that fits the account's state.

### KP-042 One-time trial per account (web, authority team, unverified)
A free trial or one-time benefit used by an account is not granted again in another browser, profile or private
window.

### KP-043 Shown credits equal the real charge (web, authority team)
Credits shown for an operation (Generate button, Pricing table) equal the current rule's charge for the chosen
option combination (model, voice, length…), never an old rule or a missing option. Values come from the tool's
confirmed spec; stage values are not production. Added 2026-11-17 (user approved).

### KP-044 Entries lead to the right flow and server (web, authority team, unverified)
Entering a flow from the launcher, a menu, a result page or another product entry lands in the intended flow and
environment, never an unrelated page or the wrong server.

### KP-045 Same feature, same name in every menu (web, authority team, unverified)
A feature shown in the launcher, top menu and side menu is labelled consistently and points to the same feature;
no menu uses another feature's name.

### KP-046 Routes enforce access limits (web, authority team, unverified)
A feature limited by device, platform, browser or account policy is also blocked at the route: a direct URL or link
does not reach an unsupported flow.

### KP-047 Open submenus do not block other items (web, authority team, unverified)
An open nested submenu does not make other menu items unclickable.

### KP-048 Open in Editor shows progress in both tabs (web, authority team, unverified)
Open in Editor opens a new tab that shows the MyEdit editor with its top menu and the hand-over progress at once
(never about:blank); the original page shows a processing state with matching progress. When done the new tab loads
the project. User confirmed product-wide (2026-11-17).

### KP-049 MyEdit Agent opens the tool asked for (web, authority team, unverified)
A tool that is a MyEdit Agent skill (every tool newly added to the Agent): a text request naming the tool or its
purpose makes the Agent open or offer that tool's entry, never a similar tool or a reply without the entry. User
confirmed product-wide (2026-11-17).

### KP-050 Control state matches its value (web, authority team, unverified)
A control's look (enabled, disabled, selected, pressed, on/off) matches its real value; a disabled control does not
perform its action.

### KP-051 One menu of a group open at a time (web, authority team, unverified)
Opening another mutually exclusive menu or popover in the same group leaves no duplicate or conflicting menus open.

### KP-052 Narrow windows and high scaling stay usable (web, authority team, unverified)
In narrow windows, mobile layout or raised display scaling, the main actions and needed content stay visible and
usable; when they do not fit, the layout scrolls.

### KP-053 Overlays do not hide needed controls (web, authority team, unverified)
An overlay, tooltip or floating control near the work area does not cover needed inputs or actions; if it does,
it can be closed or moved.

### KP-054 Light Mode everywhere on a Light Mode page (web, authority team, unverified)
On a tool page designed in Light Mode, every element (popups, dropdowns, crop window, scrollbars, toasts, generating
animation, buttons, thumbnail areas) is light, with no dark leftovers or dark flash on state changes. Light Mode is
the tool's design, not a user setting; colours come from its Light Mode design. Added 2026-11-17 (user approved).

### KP-055 Light Mode text stays legible (web, authority team, unverified)
On a Light Mode tool page, text and icons contrast with their background in every state (processing, disabled,
hover, result); no white on light or dark on a dark mask. Added 2026-11-17 (user approved).

### KP-056 Every control state has visible feedback (web, authority team, unverified)
Hover, focus, pressed, selected, disabled and error states each look clearly different from normal; a disabled
control still reads as disabled rather than vanishing. Exact styles from the design. Applies to every theme.

### KP-057 Light Mode keeps structural elements (web, authority team, unverified)
Light Mode changes colours only: required marks (*), imported-media frames, dividers and clear buttons that the
component has in earlier versions or the design stay. Added 2026-11-17 (user approved).

### KP-058 Dropdowns open beside their selector (web, authority team, unverified)
A dropdown opens against its selector in a direction where it fits, never covering the selector; every option is
visible or scrollable inside the menu. A direction set by the design wins.

### KP-059 Category chips scroll to their items (web, authority team, unverified)
In a list grouped by category tags or chips, tapping a chip whose items are out of view scrolls the list to them.

### KP-060 Timecodes carry at 60 seconds (web, authority team, unverified)
A media time, duration or timecode keeps seconds at 00–59 and carries 60 s to the minute (01:00), never xx:60.
The format comes from the spec. User confirmed product-wide (2026-11-17).

### KP-061 Whole UI in the chosen language (web, authority team, unverified)
With a supported UI language chosen, buttons, labels, model descriptions, tooltips, tutorials, empty and processing
states, dialogs and errors all show in that language.

### KP-062 No raw keys or untranslated defaults (web, authority team, unverified)
Localized and server-provided text never shows an untranslated English default, a raw code or a resource key.

### KP-063 Longer translations stay readable (web, authority team, unverified)
Translations longer than the source stay readable in buttons, menus, dialogs and model descriptions and do not
cover needed controls or information.

### KP-064 Same behaviour in every supported browser (web, authority team, unverified)
Each supported browser, entered the same way with the same actions, gets the same routing and core result; any
browser difference is shown plainly and never leads to an unrelated page.

### KP-066 Storage full: Project tools stop at send (web, authority team, unverified)
A tool that produces a Project is stopped at its Send / Generate entry when storage is full; the prompt, buttons and
destination come from that tool's spec (example: Biz Showcase shows 「Your Cloud Storage Is Full」 with only
「Manage」, to My Projects › Marketing Video). User confirmed (2026-11-04).

### KP-067 Storage-full preconditions (web, authority team, unverified)
Record product, environment, plan and used / total storage. Nearly full, low credits or a file over its size limit
do not stand in for full storage. Without the precondition the case is Blocked: never fill the account, delete data
or change the plan to create it.

### KP-068 Persistence is checked after a reload (web, authority team, unverified)
Whether a result or change was really saved (or, when full, really not saved) is checked by reloading the cloud list
or reopening the project and comparing with the state before; the page's 「Saved」 text or preview is no proof.

### KP-069 Import orientation: EXIF and video rotation (web, authority team, unverified)
Test images (EXIF Orientation) and videos (container rotation) separately with recognisable originals: make an
upright reference first, upload the untouched original through the normal flow and compare the imported content's
orientation. Upload success or aspect ratio alone is no pass; crops or load failures are inconclusive.

### KP-070 Download file name and extension (web, authority team, unverified)
Check the finished file's original name for every download or export (result download and editor export
separately): prefix, parts, separators, date-time and extension as the tool's spec defines them. Undefined parts are
an Open question; a browser's duplicate suffix is noted apart. Naming formats are per tool.

### KP-071 New tool: three entry places with NEW (web, authority team, unverified)
Every new tool is reachable, with its correct name and its own 「NEW」 tag, from: the tool editing room's top category
menu; the signed-in Launcher (tool card and top menu); the public Home page (tool card and top menu). Use the tool's
real category; MyEdit's Launcher and Home routes are its own, not Biz hosts. User 2026-11-02.

### KP-072 New tool entries are judged one by one (web, authority team, unverified)
Each place and each card or menu is its own checkpoint; entry present, 「NEW」 shown and click destination are
separate verdicts, and editing-room evidence never stands in for Launcher or Home. 「NEW」 colour, expiry and
dismissal are not assumed: they come from the spec. A missing place in the spec is a question, not a skip.

### KP-073 New tool listed on Pricing (web, authority team, unverified)
The Pricing compare table (Compare All Plans) lists every new tool with its correct name, category and per-plan
availability, limits and credits from the tool's confirmed spec (undefined values are a PM question); a tool-name
link, when drawn, opens the right tool. No 「NEW」 needed there. User 2026-11-02.

### KP-074 Tool browser tab title (web, authority team, unverified)
Each new tool page with its own route (mode picker, editing room) has a readable browser tab title for that tool and
language: never an unresolved key (vol.seo.meta.title.…), 「undefined」 or another tool's title. Exact SEO text only
from the spec; evidence shows the tab itself. User 2026-11-02.

### KP-075 Tool card thumbnail is unique (web, authority team, unverified)
A tool card thumbnail identical to another tool's on the same page (Launcher and Home separately, across categories)
is a FAIL, whatever the name, 「NEW」 or frame. All tools, not only new ones; similar colours alone are not identical.
No-duplicate needs every card loaded and checked. User 2026-11-03.

## fact

### KF-002 Two import-error paths: SEO page and room (web, authority observed)
The SEO page itself rejects over 10 GB, over 1440p, AV1 and over 8 min with a light dialog (「Got It」); AVI, under
128 px and over 120 fps it passes on, landing on the room's empty upload box with no message. The room's own upload
box rejects all of them with a dark dialog (「Got it」), at once on choosing the file, not after an upload.

### KF-004 Recent Gen exists only after an upload and only for this visit (web, authority observed)
The room shows Recent Gen only once a video is uploaded (with no job yet it reads 「Start by uploading a video to
generate your video」). It lists only this visit's jobs: after leaving and coming back it is empty and the results
are only in My Library › Video Enhancer. A row needing a Recent Gen card uploads first.

### KF-005 A result reaches Video Editor only from its own room (web, authority observed)
The route is the Original / Result preview of a finished Recent Gen card › 「Open in Editor」 (bottom right). The
room's toolbar 「Open in Video Editor」 sends the source clip, and My Library's preview has no Open in Editor, so an
older result needs a new job to reach Video Editor.

### KF-007 Storage full: Generate Anyway keeps the result 24 hours (web, authority observed)
After 「Generate Anyway」 the job is charged and runs; the result is in My Library › Video Enhancer with 「23 hours
left」 while storage stays full (5 GB / 5 GB), and its Recent Gen card has a red cloud mark. The prompt on a Free
account offers 「Upgrade」, not 「Manage」 (KP-065 disputed).

Not shown: KP-038 (disputed: the signed-in Video Enhancer SEO page /en/video-editor/video-enhancer has no 「Get Credits」 in its header while the room has it (Video Enhancer web run 2026-11-25-r1-full TC-138, O-20); whether an SEO tool page counts as a working screen, and whether SEO headers lack it site-wide, is for the user or PM to decide), KP-065 (disputed: on a storage-full Free account Video Enhancer offers 「Generate Anyway」 and 「Upgrade」 with no 「Manage」 (Video Enhancer web run 2026-11-25-r1-full TC-147, O-22); the run report suggests Manage may only appear for a full Studio Pro account; to PM (TC-147 question))

<!-- knowledge hash: ba9d89016f693bb5 -->
