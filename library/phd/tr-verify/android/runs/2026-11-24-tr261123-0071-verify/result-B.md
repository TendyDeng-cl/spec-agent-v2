# Segment B — AI Hair Color Custom panel on Free (TR261123-0071, PHD-A 20.19.0.v202611232103 R8)

- Device: Google Pixel 8a (42201JEKB02229), Android 16, 420 dpi; versionName 20.19.0, versionCode 90201902.
- Account: Not signed in (Free) — Mine 「Upgrade to Premium!」, 68 credits at the end (b_end_mine); no generation.
- Time: 11:45 start, 11:48 logs pulled. Logs: `logs/B-20261124-114849/` (no FATAL EXCEPTION).
- Spec: Q-17 / R-019 — the Design (894:1474, `ds-hair-a`) draws only a grab handle and no title; Design first, so ⌄ is
  not required. R-020 no ✕ / ✓ / undo / redo in the panel; R-021 top corners rounded 20 pt (PM).

| Bug | Verdict | Key observation |
| --- | --- | --- |
| P0111 | FIXED | Grab handle (no ︽), rounded top corners, no ✕ ↩ ↪ ✓ row under the panel; drag down collapses and applies |

## Steps and evidence
1. Launcher › AI Photos › AI Hair Color › Try now › Continue (photo tips) › Sample Photos, 3rd (front-facing curly-haired
   woman) › room (b_room) › Custom: panel (b_p0111_panel). Page source: `custom_panel_header` (handle only), Style,
   Base Color, Highlight Color, Generate; no close / undo / redo / apply element.
2. Corners zoomed (b_p0111_corners_zoom): both top corners rounded, about 35–40 px (≈13–15 dp).
3. Handle dragged down (fingerdrag): panel collapsed to the template row with the room's ✕ ↩ ↪ ✓ row
   (b_p0111_after_drag; no settings, Soft Black stays selected).
4. Custom again › Solid › 2nd Base Color (b_p0111_panel_set: Generate enabled) › drag down: Custom cell selected,
   Generate enabled (b_p0111_collapsed_set).
5. ✕ → Edit Room with the photo (b_after_x) › Home › Mine (Free, 68) › Home (b_end_launcher).

## Other observations
- Radius ≈13–15 dp vs the PM's 20 pt (Design frame shows no clear rounding); not held against the fix.
- With Solid, 「Highlight Color」 stays shown greyed instead of hidden (R-027, REQ-009).
- Collapsed Custom cell keeps the wand icon, does not show the chosen colour (R-044, Q-2).
- ✕ from the room went straight to the Edit Room with no 「Discard changes?」 (no result had been generated).
