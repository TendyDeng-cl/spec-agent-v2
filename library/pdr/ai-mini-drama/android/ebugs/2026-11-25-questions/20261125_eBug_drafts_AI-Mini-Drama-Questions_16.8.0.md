# AI Mini Drama (Android) — eBug drafts, open questions flagged `to-file` (Q-5, Q-18), PDR-A 16.8.0 build 2610212

**Source:** the recorded runs of this table only, no phone used: `library/pdr/ai-mini-drama/android/runs/2026-10-29-a7-full/` (phase A7, table v6, 501 cases, 2026-10-29 16:05 → 10-30 11:01 on Sony Xperia 10 III (XQ-BT52) / Android 12, build 16.8.0 (2610212), TR261021-0082, Stage server, account 「ethan.hsu.cl」 (Free)). Question list: `requirements.md` › Open questions; state: `question-status.json` (Q-5 and Q-18 `to-file`).

**Status:** nothing drafted, filed, uploaded or commented. **This batch is not closed: Q-5 and Q-18 stay `to-file` until the checks below are recorded.** Dedupe: Android pool only (per OS, user 2026-10-28), no same-OS ticket covers either question (`dedupe.txt`).

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay. Evidence rule for this batch: an entry states only what the run records show (results.csv, screenshots, logs) on the build the run names, with a real image from a run folder.

**What is drafted:** 0 entries. Both questions are listed under *Not drafted*: the A7 run folder holds text only (its screenshots are no longer on this computer, like every Android full run's), so no real image of what A7 saw exists; and for Q-5 the string was never seen at all. No review page is built for a batch with no entry.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## Not drafted: needs a device check

### Q-5 — `storyboard.all_videos.q` and `ladder.beat_video.q` share the same English (「Every frame is done. Ready to create your video?」): intended?

**What the run records show (2610212):**

- No row reads either string, and no result, observation, log note or draft of any Android run quotes 「Every frame is done. Ready to create your video?」.
- After a storyboard the chat goes to 「Here's your storyboard」, the Storyboard Result / Preview and the 「Choose your video settings」 card (TC-494 Pass, TC-501 Pass); after the preview video it reads 「Looking good! Ready for the full video?」 (TC-501). The cited screenshots (`d2-jp-sb.png`, `e-tc501-storyboard.png`, `e-tc501-video.png`) are not on this computer.
- The text is only on the PM pm-top-mockups board of the 10/16–10/21 sets.

**Why no entry:** the Result must say where the app shows the string (or that it shows another message there). The run never recorded the string, and no image of the two places exists to attach.

**The check to run (build under test, Stage, a signed-in account with credits for one storyboard and one preview video):**

1. Open a drama with a confirmed cast; tap 「Generate」 on the 「Create storyboard」 card; wait until every scene image is done.
2. Tap ↓ to the newest message. Capture screenshot + page source of every assistant message between the Storyboard Result and 「Choose your video settings」 (the place of `storyboard.all_videos.q`), with the full text.
3. Tap 「Generate video」 (Preview 30 sec). While it runs and when it ends, capture every assistant message and status card up to the video card (the place of `ladder.beat_video.q`), with the full text.
4. Note for each place: the string shows / another message shows (quote it) / nothing shows. If the APK is at hand, `scripts/mui-strings.ts` can also say whether the two keys exist and what English each holds (no phone needed).

**Then one of two outcomes (ebugs.md step 1):** if neither key is shown or present any more, Q-5 is `determined` (the keys are not used in the current flow); else the PM entry is drafted: `PDR-A <version> - [AIAgent][UI] AI Mini Drama: …` (text; BugBelong PM), Result = the two places with the same English, Expect = PM to decide whether one text for both is intended, Note naming `Q-5`, Spec Link: PM spec, Chat result states (top mockup group) board
(https://www.figma.com/design/44RyrcOcWi2MvhGci9bO5F/AI-Mini-Drama?node-id=2016-2).

### Q-18 — PM main flow note 「day 1 只有 US & JP」 beside the template grid: are templates limited to the US and JP stores on day 1?

**What the run records show (2610212, Stage):**

- The Sony test phone's Play store is Taiwan: the subscription page and the Google Play sheet price in NT$ (TC-542 Pass: 「NT$1080/Year」, 「NT$240/Month」, Play sheet 「NT$1,080.00」).
- On that phone the landing shows 「Start from a template」 with a 3×2 grid (TC-003 Pass) and the More page shows all 20 templates in 5 categories (TC-006, TC-010 Pass; A7-i1: 5/5/4/4/2).
- So on Stage this build does not limit templates to US and JP stores. Nothing was run on Production or with a US / JP store.

**Why no entry:** the observation exists in text, but every image of it (`a1-landing.png`, `i1-tc006-more.png`, `i1-tc234-bottom.png`, `f-542b.png`, `f-542-play.png`) was in the A7 run folder and is no longer on this computer. The later runs that still hold images are on other builds (2611021 – 2611061), mostly on the Galaxy A53, and none of them records the store region or the template count, so their landing screenshots cannot stand in for A7's. An entry needs a real image of the templates and of the store region from one run on one build.

**The check to run (Sony XQ-BT52 or the SM-A5360, build under test; note the server):**

1. Open the in-app subscription page (Mine, My Credits, 「Subscribe Now」) and capture it: the currency shows the Play store region (NT$ = Taiwan). Close it with system back; buy nothing.
2. Tap 「AI Mini Drama」 on the Launcher. Capture the landing with the 「Start from a template」 grid (screenshot + page source).
3. Tap 「More」. Capture the page top and bottom; count the categories and templates from the page source.
4. If a Production build and account are available, repeat 1–3 there: PM's note is about day 1 on Production, and Stage may not apply the limit.

**Then the PM entry is drafted (ebugs.md step 1):** `PDR-A <version> - [AIAgent][UX] AI Mini Drama: …` (a PM decision on availability, not text; BugBelong PM), Result = templates shown with a Taiwan Play store on the named server, Expect = PM to decide what 「day 1 只有 US & JP」 limits (templates, preset characters or the whole feature) and whether other stores should see templates, Note naming `Q-18`, Spec Link: PM spec, Main flow board
(https://www.figma.com/design/44RyrcOcWi2MvhGci9bO5F/AI-Mini-Drama?node-id=2016-2).

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| ⏳ Q-5 | Two string keys with the same English | Held, not excluded: the string was never seen and no image exists. Needs the check above, then determined or filed. |
| ⏳ Q-18 | Templates limited to US and JP stores on day 1? | Held, not excluded: the A7 observation has no image left on this computer. Needs the check above, then filed. |

## Reconciliation against the question list

Questions flagged `to-file` in `question-status.json`: 2 (Q-5, Q-18).

| Step | Count | Running total |
|---|---|---|
| Questions flagged `to-file` | 2 | 2 |
| → held: string never recorded, no image (Q-5) | −1 | 1 |
| → held: observation recorded in text only, no image on this computer (Q-18) | −1 | **0 entries** |

| Item | State | Became |
|---|---|---|
| Q-5 | to-file | not drafted: needs a device check (above); stays `to-file` |
| Q-18 | to-file | not drafted: needs a device check (above); stays `to-file` |
| TC-003, TC-006, TC-010, TC-542 | Pass | not raised (what they recorded is quoted under Q-18) |
| TC-494, TC-501 | Pass | not raised (quoted under Q-5) |
