# TR261124-0032 verify — segment B (Swipe Collage Pages, Free) — PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. The Pixel 8a was not used.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-24 17:11:57 (checked with `build`).
- Server: Test Server. Tier at start (17:53) and end (17:58): Mine 「Upgrade to Premium!」 = Free, My Credits 0
  (`b_01_mine_start.png`, `b_90_mine_end.png`). Nothing bought, no sign-in, no tier change.
- Time: 17:52–17:59 (about 7 min on the phone).
- Path: Launcher → Collage → 「Try Swipe Collage!」 → Minimalist Aesthetic tab → 「7 photos · 3 pages」 (scrolled down,
  right column; `b_02_tab.png`) → Template Preview (`b_03_preview.png`) → Use Template → Canvas (`b_04_canvas.png`) → Pages.
- The move button under each page draws ←|→ (not ≡) on this build; it is the button tested for P0097.
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing filed, no eBug or ECL touched.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0094 | NOT_FIXED | The − \| + stepper is there (fixed), but Pages opened from page 2 (and from page 1) selects no page and shows no 「Page n / 3」 text; the label appears only after a stepper or move-button tap. |
| PHA262026P0095 | FIXED | ✕ and ✓ exist; ✕ with a change asks 「Discard changes?」 (Keep stays in Pages, Discard drops the page); ✓ applies (4 pages); ✕ with no change closes silently; system Back = ✕. |
| PHA262026P0097 | NOT_FIXED | Dragged, the page is enlarged, tilted and translucent (fixed); but a plain tap on the move button selects page 1 (orange outline, 「Page 1 / 3」), and no 「Hold ≡ & drag to reorder」 hint shows in any frame of the drag. |

## Per bug

### P0094 (Pages opens on the current page)
1. Fresh from page 1 (Canvas just opened, nothing tapped): Pages → strip of 3 pages, move / ••• buttons, − | + stepper,
   ✕ / ✓; no page outlined, no 「Page 1 / 3」 (`b_10_p0094_pages_from_p1.png`; `els`: only `pages_stepper_remove_btn`
   「Delete page」 and `pages_stepper_add_btn` 「Add」, no text element). ✕ (no change) → Canvas, no dialog.
2. Tapped the lower split cell on page 2: the canvas scrolled to page 2, the cell selected with the frame bar
   (`b_12_p0094_tap_page2_frame.png`). (A first tap near the page 2/3 edge had selected a page-3 element,
   `b_11_p0094_tap_page2.png`, so it was redone on a cell plainly inside page 2.)
3. Tap on the empty area to clear the selection (Canvas still on page 2, `b_13_p0094_canvas_on_page2.png`) → Pages:
   no page selected, no 「Page 2 / 3」; the stepper shows (`b_14_p0094_pages_from_p2.png`; `texts`: 「Delete page」, 「Add」 only).
- Per part: selected page ✗, page text ✗, stepper ✓ → NOT_FIXED. Same as the recheck an hour earlier.

### P0095 (✓ / ✕ in Pages)
1. Pages → + : 「Page 4 / 4」, page 4 added (`b_20_p0095_added.png`).
2. ✕ → 「Discard changes?」 / 「All your existing changes will be lost.」 / Keep / Discard (`b_21_p0095_x_dialog.png`).
3. Keep → dialog closes, still in Pages with 4 pages (`b_22_p0095_after_keep.png`).
4. ✕ → Discard: the first Discard tap (sent as an element click) left the dialog on screen (`b_23_p0095_after_discard.png`,
   and `b_25_p0095_after_discard2.png` after a second element click); a tap by coordinates on Discard closed it and
   returned to the Canvas with Undo greyed (`b_26_p0095_discard_tap_coord.png`); Pages reopened shows 3 pages
   (`b_27_p0095_pages_after_discard.png`). Repeated: + → ✕ → one Discard tap → Canvas (`b_28_p0095_discard_retest.png`);
   the stuck dialog did not come back (see Other observations).
5. ✓: + → ✓ → Canvas; Pages reopened shows 4 pages (`b_29_p0095_after_apply.png`, `b_30_p0095_pages_after_apply.png`).
6. ‹ (top left) in Pages with a change: 「Discard changes?」 (`b_31_p0095_chevron_with_change.png`); Discard leaves the
   whole editor to the Template Preview 「7 photos · 3 pages」, dropping the 4th page applied in step 5 too
   (`b_32_p0095_chevron_discard.png`).
7. System Back in Pages: no change → Canvas, no dialog (`b_33_p0095_back_nochange.png`); with a change → 「Discard
   changes?」 (`b_34_p0095_back_with_change.png`) → Discard → Canvas (`b_35_p0095_back_discard.png`), i.e. as ✕.
- Expect (✓ applies; ✕ drops, asking 「Discard changes?」 first when there are changes) met → FIXED.

### P0097 (move button: tap and drag)
1. Pages, nothing selected (`b_40_p0097_pages_before.png`); plain tap on the ←|→ button under page 1 → page 1 gets an
   orange outline and 「Page 1 / 3」 appears (`b_41_p0097_after_plain_tap.png`). Expect: nothing happens.
2. `record start`; long-press the same button 1.5 s, drag in 20 steps (≈ 2.5 s) to x 960 (past page 3), hold 0.8 s,
   release (adb `input motionevent`); `record stop p0097-drag` (`recordings/p0097-drag.mp4`, 6.6 s). Frames at 4 fps,
   all looked at: `recordings/p0097-sheet.png` (strip area), `recordings/p0097-sheet-full.png` (whole screen, 26 frames),
   `recordings/p0097-pair.png` (before / held), `recordings/p0097-mid-full.png` (mid-drag, 3.2 s).
   - From the long-press on, the page is drawn larger than its slot, tilted a few degrees and translucent (the pages
     behind show through), and follows the finger; the move button turns orange. ✓
   - No 「Hold ≡ & drag to reorder」 (or any hint) in any frame; the only text is 「Page 1 / 3」 under the strip. ✗
3. After the drop the page sits at the end and the label reads 「Page 3 / 3」 (`b_42_p0097_after_drop.png`).
- Per part: tap does nothing ✗, enlarged + translucent ✓, hint ✗ → NOT_FIXED.

## Other observations

- ‹ in Pages leaves the whole editor (Template Preview) after 「Discard changes?」 → Discard, throwing away every Canvas
  change, including pages already applied with ✓ (`b_31…`, `b_32…`); ✕ and system Back only close Pages. Two different
  outcomes behind the same dialog wording.
- Once, 「Discard changes?」 stayed on screen after two Discard taps sent as element clicks, and closed on a coordinate
  tap; not seen on the retest (one Discard tap worked). Possibly a second dialog stacked on the first; not reproduced,
  not judged.
- While dragged near the end of the strip, the lifted page covers the round 「+」 (add page) button
  (`recordings/p0097-sheet.png`, bottom row).
- 「Page 1 / 3」 stays under the strip for the whole drag even when the page is over page 3's slot; it changes to
  「Page 3 / 3」 only after the drop.
- With 4 pages the strip's move / ••• circles shrink (about 100 px → about 75 px) to fit (`b_30_p0095_pages_after_apply.png`),
  in line with P0166 (rechecked separately).
- On the Canvas, a tap near the page 2/3 boundary selected an element of page 3 whose selection box ran below the page
  (`b_11_p0094_tap_page2.png`).

## Logs

`logs/segB-20261124-175839/` (git-ignored): live capture 1894 lines, 0 failure, 0 toast, no FATAL / AndroidRuntime,
no reorder / hint lines. At 17:58:29, on opening Mine, the app re-verified an old purchase token by itself
(`[doVerifyPurchase]: phd_200_credit_freeuser_sale … status:OK`); nothing was bought in this segment and the balance
stayed 0 (`getMemberCreditRemain totalRemain=0`).

## End state

App on the Launcher (Home), Free (「Upgrade to Premium!」), 0 credits, Test Server (`b_91_end_launcher.png`). Every
Pages / Canvas edit left with ✕ → Discard and ‹ → Discard; no draft saved, nothing bought. Logcat capture stopped.

**Ruling 2026-11-25 (user):** P0094 and P0097 are OK per RD's resolve notes (rd-resolve.json); the observations above stay as recorded.
