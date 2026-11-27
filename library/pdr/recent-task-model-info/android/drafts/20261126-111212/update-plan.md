# Update plan — Recent Task Model Info (android): approved v2 → draft 20261126-111212

Same spec set (2026-11-23). The change comes from the request ledger: REQ-004 (user, 2026-11-26) and pass 12 in
spec-casebook `analysis.md`, as changed the same day: 「for each entry, it should only check the UI, so click everything
once and make sure there's no errors for each button and options」. The primary entry keeps the full table; every other
entry gets a UI pass: the landing and what it lists, the tags against each task's own model, every control once, one generation where the entry starts one, every exit and system Back once. (The first build of this draft copied the whole flow per entry, 313 / 334 rows; it is replaced.)

## Spec files
- Unchanged: Design Figma 1794-3210, Design Guideline Cards, PDRA Jira. New input: the toolbar sheet (KP-107, entry-points.ts).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-090 – R-099 | new | — | one requirement per non-primary entry (`## Entry points`) |
| Open questions | new | Q-1 – Q-5 | Q-9 (editor entries: task list per tool or project, where the result lands, the exits) and Q-10 (Photo / PIP Photo Text to Image: presence, the selected photo); the other entries assert the primary behaviour with no question (pass 12) |

## Case changes
- New (82), one Section per entry:
- Entry › Mine › My Artwork: TC-074 – TC-077 (4)
- Entry › Home › ☰ › My Artwork: TC-078 – TC-081 (4)
- Entry › AI Magic › Image to Video › Recent tasks: TC-082 – TC-085 (4)
- Entry › AI Magic › Text to Video › Recent tasks: TC-086 – TC-089 (4)
- Entry › AI Magic › Text to Image › Recent tasks: TC-090 – TC-092 (3)
- Entry › Editor › Global › AI Magic › Image to Video: TC-093 – TC-097 (5)
- Entry › Editor › Global › AI Magic › Text to Video: TC-098 – TC-102 (5)
- Entry › Editor › Global › AI Magic › Text to Image: TC-103 – TC-106 (4)
- Entry › Editor › Photo › Tools › Text to Image: TC-107 – TC-110 (4)
- Entry › Editor › PIP Photo › Tools › AI Text to Image: TC-111 – TC-114 (4)
- Entry › Home › shortcut › Image to Video: TC-115 – TC-119 (5)
- Entry › Home › shortcut › Text to Video: TC-120 – TC-124 (5)
- Entry › Home › shortcut › Text to Image: TC-125 – TC-128 (4)
- Entry › Home › AI-Powered Creation › Image to Video: TC-129 – TC-133 (5)
- Entry › Home › AI-Powered Creation › Text to Video: TC-134 – TC-138 (5)
- Entry › Home › AI-Powered Creation › Text to Image: TC-139 – TC-142 (4)
- Entry › Home › What's Trending › template: TC-143 – TC-144 (2)
- Entry › Completion banner › Image to Video: TC-145 – TC-148 (4)
- Entry › Completion banner › Text to Video: TC-149 – TC-152 (4)
- Entry › Completion banner › Text to Image: TC-153 – TC-155 (3)
- Modified (3): TC-029, TC-030, TC-034 start from the Template tab only (TC-029 / TC-030 named 「What's Trending」 or the Template tab); the 「What's Trending」 start is its own Section.
- Removed: none. Unchanged: 70 (MUI included).

## Found by the analysis
- Entry points (pass 12): see `### Entry points` in requirements.md. Rows per Section: a landing row (presence; for the
  banner it generates once), a tag row (Image to Video and Text to Video: every card's tag against its own task's model,
  the tasks of TC-003 / TC-006 – TC-014 and TC-016 / TC-019 – TC-026, no model re-run), a control row (every control of the
  primary rows once: tag, 「View」, ‹, 「Manage」, checkbox, 「Select All」, 「Deselect All」, 「Cancel」; Text to Image: an item and
  its preview), a generation row where the entry opens the tool (editor, Photo / PIP Photo, Home tile, AI-Powered
  Creation: one task with 「Vidu Q2」 / 「Wan 2.7」, then where the result lands), and an exit row (every ‹ and system Back once).
- Pass 9 (one-way state): none. The entries share the task list (cloud, R-040).

## How the rows run
- Each entry Section is a short segment after the primary rows (they make the tasks the tag rows read). Generations: one per
  tool for the editor, Home tile and AI-Powered Creation Sections, one each for Photo and PIP Photo, one per tool for the banner,
  two templates.
- A missing entry (landing row) is recorded and raised as a PM question at the phase wrap-up; that Section's other rows are Blocked.

## Not added (value check)
- Model variants, long names, text size, card states (error, NSFW, processing), persistence, appearance, templates and MUI per
  entry: they stay with the primary entry (pass 12: combinations, limits, failures, tiers, MUI and one-way states).
- TC-031 / TC-032 in tool entries: other features' Recent pages are reached only through My Artwork (the Mine and ☰ landing rows open Cinematic Reel Creator).
- Notifications, push and deep links to these tools: no spec, sheet or knowledge entry places them.

## PM-only rows
- None (no PM spec for this ticket).

## Questions for PM
- Q-9 Editor › Global toolbar › 「AI Magic」 › Image to Video / Text to Video / Text to Image (the product team's toolbar sheet, KP-107): do the tools opened there show the same Recent tasks (every task of the tool, not only this project's) and tags, does a task generated there get its tag, and where do the result page and each ‹ lead (does the result go into the project)? Assumption: the same list and tags, the tag of the chosen model; each ‹ goes back one step to the editor, project unchanged. R-093, TC-093, TC-094, TC-095, TC-096, TC-097, TC-098, TC-099, TC-100, TC-101, TC-102, TC-103, TC-104, TC-105, TC-106.
- Q-10 The toolbar sheet also places Text to Image under Photo toolbar › 「Tools」 and, named 「AI Text to Image」, under PIP Photo toolbar › 「Tools」 (KP-107). Are they in the build, are they the same tool with the same Recent tasks, and what happens to the selected photo when a result is made (unchanged, replaced, a new clip)? Assumption: present, the same tool and Recent tasks, no model tag (Q-1); the result's effect on the photo is recorded for PM. R-094, R-095, TC-107, TC-108, TC-109, TC-110, TC-111, TC-112, TC-113, TC-114.

## Questions for you
- None.
