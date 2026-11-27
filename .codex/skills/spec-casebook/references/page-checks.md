# Formatting and design check for every HTML page (user, 2026-11-19 / 11-25)

Every HTML page or artifact the agent makes or changes (comparisons, reports, review pages, eBug review pages, the
pages server's templates) gets this check before it is handed over. Look at it rendered, not only at the source.
Shown by the 2026-11-19 Casebook vs Spec Agent report: a ✓ sat alone on its own line above its value, the columns
had uneven widths, and the better-side key sat next to one side's name so it read as that side's label.

## How to look
- Open the page in the browser pane (a page served by `scripts/pages.ts` there; a one-off file with `navigate`
  to its `file://` path) and take screenshots at about 1100 px wide and at 375 px (`resize_window`), then reset the
  size with `preset: "desktop"`.
- Both languages when the page has the 中文 / English switch, and both themes (a local file renders light in the
  pane: set `document.documentElement.dataset.theme = "dark"` with `javascript_tool` to see dark).
- Check by script too: no horizontal page scroll (`document.documentElement.scrollWidth > innerWidth` is false) and
  no element that scrolls sideways unexpectedly.

## What must hold
- **Nothing orphaned:** a mark (✓, ✕, a badge, a unit) never wraps onto its own line apart from its value. Draw
  marks with CSS (`::before` with a no-break space) or keep them inside the same no-wrap span.
- **Even, purposeful columns:** comparison tables use `table-layout: fixed` with set widths (label column narrower,
  the compared columns equal); text wraps inside its cell, never past it.
- **Aligned and consistent:** the same kind of value looks the same everywhere (same units, decimals, order of
  sides); paired items line up; spacing between sections is even.
- **Keys and legends read unambiguously:** a legend for a marking stands on its own line, never next to one side's
  name, and says what it marks.
- **Every comparison is complete:** when a page compares sides, each row marks its better side (a row with no
  possible winner moves to a note), and the order of sides is the same everywhere.
- **Readable at both widths and themes:** no clipped or overlapping text, contrast holds in dark and light, tables
  scroll inside their box on a phone rather than squeezing to one word per line.

## UI design rules (user, 2026-11-25)

A page that passes the formatting check can still be badly designed. The first Dashboard toolbar did: underline tabs,
a boxed switch, two rows of pill chips with small-caps labels, then a menu and a search box pushed to the right of a
line of their own, and versions of two products mixed in one row of chips. Anything with controls (the pages
server's templates, review pages, any page with tabs, filters or buttons) is held to these general rules when it is
made or changed, and judged from the screenshot as a designer would, not only as "nothing overlaps":

- **One control style per kind of choice.** Choosing one of a few views is tabs; a secondary either/or beside them is
  one small switch; filters and sort are all the same control (menus, or all chips, never a mix) at the same height,
  radius and font. No more than two navigation styles on a page.
- **A toolbar is one line that reads left to right** in the order people decide (what, which, how sorted, search).
  No control is stranded alone on a line or pushed to the far edge away from the ones it belongs with; when the line
  must wrap (a phone), the controls stack at full width with their labels in one column.
- **Hierarchy is visible.** Primary navigation is the strongest, secondary quieter, filters quieter still; one accent
  for what is selected. Labels are sentence case next to their control; small caps only for table headers.
- **Options belong to their parent.** A filter never mixes values of different parents in one flat list (versions of
  two products): scope the list to the parent chosen, or group it under each parent's name.
- **Every number says what it is** from its column header or label, one meaning per column; a count beside an option
  is written as a count (`16.9.0 (3)`), not left as a bare number.
- **Quiet by default.** Repeated actions and badges that say the same on every row are shown once (a header, a tab) or
  on hover; an empty value is a dash, not a sentence.
- **Consistent spacing and alignment.** Controls and blocks sit on one left edge with even gaps (multiples of 4 px),
  numbers right-aligned or tabular, the same radius and border everywhere.
- **Clickable looks clickable, and only that.** Links and buttons in the accent colour with a visible focus ring and
  a target at least 32 px high; plain facts never in the accent colour.
- **States are designed too:** empty (says why and what to do), nothing matches a filter, loading, and the narrow
  layout.

Fix what fails and look again; mention in the hand-over which widths, languages and themes were checked.
