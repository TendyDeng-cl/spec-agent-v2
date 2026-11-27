# Swipe Collage (Android) — eBug drafts, TR261123-0071 change-log check, PhotoDirector 20.19.0 build 90201902

**Source:** ad-hoc check `library/phd/tr-verify/android/runs/2026-11-24-tr261123-0071-changelog/` (segment C, `result-C.md` › *Other observations*, `checks-C.json`), RD's TR261123-0071 change log for Swipe Collage, 2026-11-24 on Google Pixel 8a (42201JEKB02229) / Android 16 through Appium / UiAutomator2, not signed in, Free. Build 20.19.0.v202611232103 (R8, versionCode 90201902), the TR's own build. Not a casebook table run: no cases.csv rows; the spec is `library/phd/swipe-collage/android/requirements.md`.

**Status:** nothing filed, uploaded or commented. Target TR261123-0071 (the TR of the tested build; `ebug-defaults.ts` names TR261123-0041 from the last batch, which is an older build). Creator WILLY_WU, [AIAgent], API — confirm.

Rules: reviewer rules — one action per Repro step, a Spec Link on every entry (URL on its own line; the PM spec is a PDF with no Figma link, cited by board and spec ID), at least one image per entry, no video. No log excerpt: none of the four is a failure with a log cause (no error, generation or empty step; logcat for the segment has no FATAL and an empty crash buffer). RD findings are `[AIAgent]`; UX problems for a PM decision are `[AIAgent][UX]`, BugBelong PM (user, 2026-11-13). Feature name `Swipe_Collage:`. ISS numbers continue the Swipe Collage sequence (ISS-SWC-51 was the TR261123-0041 crash).

**What is drafted:** 4 entries (ISS-SWC-52…55) from 5 findings: 1 to RD (Functional), 3 to PM (`[AIAgent][UX]`). Finding 2 (no 「Page n / N」 on opening Pages) is the open same-OS ticket PHA262026P0094 and is left off (`dedupe.txt`).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD / PM.

---

## 1. ISS-SWC-52 — Pages ✓ returns to page 3, not the selected new page 4  ·  Class: Functional  ·  Severity: S3  ·  Owner: RD

**Report step:** result-C Other observations 3 (C1)  ·  **Reproduce:** 1/1  ·  **Verified on:** 20.19.0.90201902

> **QA note — not pasted into eBug.** Full observation: the Canvas was on page 2 (c1_x_nochange); Pages › stepper 「+」 added page 4 and selected it (「Page 4 / 4」, orange outline on page 4, c1_pages_add); ✓ returned to the Canvas showing page 3 (「Goodbye 2026」 page with only a sliver of the blank page 4 at the right edge, c1_apply_4pages), so neither the selected page nor the page the user came from. R-115 (PM flow-table D1-24 / D1-26: 「✓ 套用回 Canvas，定位到選取頁」); R-110 also says adding a page scrolls there. Seen once (one ✓ with a page added in the run); the page change itself was applied correctly (4 pages, undo enabled, c1_pages_after_apply). Related: PHA262026P0095 (Pages had no ✓ / ✕, TRCreated, fixed in v202611241407) — different defect, the ✓ now exists. Not a log finding.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Pages ✓ returns the Canvas to page 3, not the selected new page 4
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Swipe the Launcher tool grid left
3. Tap Collage
4. Tap the Swipe Collage banner
5. Scroll to the 「4 photos · 3 pages」 card in Year-end Recap
6. Tap the card
7. Tap Use Template
8. Tap Pages
9. Tap the stepper 「+」
10. Tap ✓
11. Check the result

Result:
After ✓ the Canvas shows page 3, not the new page 4 that was selected in Pages (「Page 4 / 4」).
摘要：按 ✓ 後畫布停在第 3 頁，而不是 Pages 中選取的新第 4 頁。
{20.19.0_scc52_pages_page4_selected.jpg} {20.19.0_scc52_canvas_shows_page3.jpg}

Expect Result:
✓ applies the change and returns to the Canvas on the selected page (page 4).
摘要：✓ 套用後應回到畫布並停在選取的頁面（第 4 頁）。
Spec string: 「✓ 套用回 Canvas，定位到選取頁」

Note:
Device: Google Pixel 8a / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), flow-table board (Pages ✓, D1-24 / D1-26: apply and return to the Canvas on the selected page)
Spec Link: Swipe Collage Design Figma, page board (Pages with the selected page and ✓) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=74-3076
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Swipe-Collage-Changelog_20.19.0_images/01_ISS-SWC-52/`

---

## 2. ISS-SWC-53 — Cross-page frame hangs past the last page after a page move or page removal  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** result-C Other observations 2 (C1)  ·  **Reproduce:** 1/1 (move), 1/1 (1 page)  ·  **Verified on:** 20.19.0.90201902

> **QA note — not pasted into eBug.** Full observation: the Year-end Recap template has a player frame spanning pages 1 and 2 with its centre on page 1. Holding page 1's move button and dragging it to the end (recording `recordings/c1-reorder.mp4`) moves the frame with page 1 (R-064: elements follow the page holding their centre), but at the end of the strip the frame's right part hangs past the last page, drawn translucent outside the strip next to the 「+」 (c1_reorder_after). Removing pages with the stepper 「−」 down to 1 page gives the same: the frame's right half is drawn translucent outside the page, over the strip's 「+」 (c1_pages_1; reached from 10 pages with nine 「−」 taps in the run, the Repro uses the reorder path). Spec: R-064 (PM states-canvas F13: 「元件依中心點所在頁決定跟誰走；跨頁元件拖曳後仍跨頁」) does not say what happens when the page holding the centre ends up last; deleting a page under a cross-page element is open (R-117, Q-7: TBD-6 proposes deleting the whole element). Filed as a visible defect (user, 2026-11-11): whatever Q-7 decides, an element must not be drawn outside the canvas over the strip's controls. Not checked: what the Canvas and the saved images show after ✓ in this state (the run discarded these changes). Reviewer (user, 2026-11-24): filed to PM as [AIAgent][UX] for a decision on the end-of-strip case. Not a log finding.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Swipe_Collage: Cross-page frame hangs past the last page after a page move or page removal
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Swipe the Launcher tool grid left
3. Tap Collage
4. Tap the Swipe Collage banner
5. Scroll to the 「4 photos · 3 pages」 card in Year-end Recap
6. Tap the card
7. Tap Use Template
8. Tap Pages
9. Hold page 1's move button
10. Drag it to the right end of the strip
11. Release
12. Check the result

Result:
The player frame moved with page 1 hangs past the strip's right edge, drawn translucent outside the pages.
摘要：跨頁的播放器框隨第 1 頁移到最後，超出頁面右緣並以半透明畫在頁面外。
{20.19.0_scc53_reorder_frame_past_strip.jpg} {20.19.0_scc53_one_page_frame_over_plus.jpg}

Expect Result:
After pages move or are removed, a cross-page element stays within the pages and is not drawn over the strip's 「+」.
摘要：移動或刪除頁面後，跨頁元素應留在頁面內，不應畫到頁面外或蓋住「+」。
Spec string: 「元件依中心點所在頁決定跟誰走；跨頁元件拖曳後仍跨頁」

Note:
Device: Google Pixel 8a / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-canvas board (F13: elements move with the page holding their centre; a cross-page element stays cross-page)
Spec Link: Swipe Collage Design Figma, page board (page strip and 「+」) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=74-3076
Basis: None — PM decision requested (no spec says where a cross-page element goes when its page ends up last; Q-7 open)
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Swipe-Collage-Changelog_20.19.0_images/02_ISS-SWC-53/`

---

## 3. ISS-SWC-54 — At 10 pages the move and ••• buttons shrink to about 12 dp  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** result-C Other observations 4 (C1)  ·  **Reproduce:** 1/1  ·  **Verified on:** 20.19.0.90201902

> **QA note — not pasted into eBug.** Full observation: Pages fits all pages into one strip of fixed width; with 4 pages each move (↔) and ••• button is about 77 px wide (≈ 29 dp at 420 dpi, c1_pages_add), with 10 pages about 30 px (≈ 12 dp, c1_pages_10), well under the usual 48 dp touch target; the page thumbnails shrink the same way. The spec does not size these controls: the Design's page board draws a 5-page strip with full-size buttons, the PM states-pages board only sets 1–10 pages (D1-12) and one ••• per page (D1-27). Related closed same-OS ticket: PHA262026P0098 (Close, fixed in v202611181947: 「Pages controls overlap from 5 pages; at 10 only the last ••• can be reached」) — the overlap is fixed by shrinking the buttons; this is the next problem, not that bug back, so a new card naming it. UX for a PM decision (orchestrator, rule 5): how the strip stays tappable at 10 pages (scrolling strip, minimum button size). Taps on the small buttons were not tried in the run (the stepper was used).

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Swipe_Collage: At 10 pages the strip's move and ••• buttons shrink to about 12 dp
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Swipe the Launcher tool grid left
3. Tap Collage
4. Tap the Swipe Collage banner
5. Scroll to the 「4 photos · 3 pages」 card in Year-end Recap
6. Tap the card
7. Tap Use Template
8. Tap Pages
9. Tap the stepper 「+」 7 times
10. Check the move and ••• buttons under the strip

Result:
At 10 pages each move and ••• button is about 30 px (12 dp) wide, too small to tap reliably.
摘要：10 頁時每個移動與 ••• 按鈕只剩約 30 px（12 dp），難以準確點選。
{20.19.0_scc54_ten_pages_small_buttons.jpg} {20.19.0_scc54_four_pages_buttons.jpg}

Expect Result:
PM to decide how the page strip's controls stay a tappable size at 10 pages (e.g. a scrolling strip).
摘要：請 PM 決定 10 頁時頁面列按鈕如何維持可點選的大小（例如可捲動）。

Note:
Device: Google Pixel 8a / Android 16
Spec Link: Swipe Collage Design Figma, page board (page strip with move and ••• buttons) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=74-3076
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-pages board (D1-12 / D1-27: 1 to 10 pages, ••• under each page)
Basis: None — PM decision requested (neither spec sizes the strip controls at 10 pages)
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Swipe-Collage-Changelog_20.19.0_images/03_ISS-SWC-54/`

---

## 4. ISS-SWC-55 — Frame selection box is far larger than the frame and its menu covers nearby text  ·  Class: UX  ·  Severity: S4  ·  Owner: PM

**Report step:** result-C Other observations 7 (C3, C4)  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.90201902

> **QA note — not pasted into eBug.** Full observation: tapping the player frame next to 「Goodbye 2026」 (page 3) draws the orange frame-focus box about 125 px to the right of the drawn frame and about 25 px above and below it (the asset's transparent margin, c3_frame_sel); the floating Delete / Duplicate / Lock pill sits at the box's right edge on top of 「Goodbye 2026」. In image focus the box is tighter but the floating pill still covers the text (c5_img_focus). Design canvas_frame_focus (R-042) draws the orange outline with corner handles around the frame and the floating icons above it, not over other elements. Related same-OS tickets, not duplicates: PHA262026P0160 (TRCreated, fixed in v202611241407: frame 「+」 needs two taps, the first selects the layer over it) and PHA262026P0163 (Assigned: a tap outside the page selects a template sticker) — both about tap areas, neither about the frame's box size or the menu covering text. UX for a PM decision (orchestrator, rule 5); flip to RD [UI] if the reviewer holds it to the Design. Severity S4 like P0163.

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent][UX] Swipe_Collage: Frame selection box far exceeds the frame; its menu covers nearby text
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Swipe the Launcher tool grid left
3. Tap Collage
4. Tap the Swipe Collage banner
5. Scroll to the 「4 photos · 3 pages」 card in Year-end Recap
6. Tap the card
7. Tap Use Template
8. Swipe the canvas left until 「Goodbye 2026」 shows
9. Tap the player frame next to 「Goodbye 2026」
10. Check the result

Result:
The frame's selection box extends far past the drawn frame, and its floating menu covers the 「Goodbye 2026」 text.
摘要：框的選取框遠大於實際畫出的框，浮動選單蓋住「Goodbye 2026」文字。
{20.19.0_scc55_frame_box_menu_over_text.jpg} {20.19.0_scc55_image_focus_menu_over_text.jpg}

Expect Result:
PM to decide: the selection box fits the drawn frame and its floating menu does not cover other elements.
摘要：請 PM 決定：選取框貼合實際框線，浮動選單不遮住其他元素。

Note:
Device: Google Pixel 8a / Android 16
Spec Link: Swipe Collage Design Figma, canvas_frame_focus board (orange outline with handles, floating icons above the frame) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=33-2230
Basis: None — PM decision requested (no spec covers a frame asset with a transparent margin)
<Claude Reviewed>
```

**Images:** `20261124_eBug_drafts_Swipe-Collage-Changelog_20.19.0_images/04_ISS-SWC-55/`

---

# Not raised (for the record)

| Item | Finding | Why not raised |
|---|---|---|
| Finding 2 (result-C Other observations 1) | Pages opens without 「Page n / N」 above the − \| + stepper; it appears only after + or − (R-104) | Same-OS open ticket PHA262026P0094 (TRCreated, fixed in v202611241407, a build after R8): left off, `dedupe.txt` |
| result-C Other observations 5, 6, 8–11 | Page-boundary lines, orange 「Shadow」 on the cup sticker, Italian / Russian strings, English category tabs, Portuguese banner once, tooling | Not in this batch's scope (orchestrator chose items 3, 1, 2, 4, 7) |

# Reconciliation against the report

| Step | Count |
|---|---|
| Findings handed over (result-C Other observations 3, 1, 2, 4, 7) | 5 |
| − Finding 2: same-OS open duplicate PHA262026P0094 | 4 |
| = Entries drafted | 4 |

### Row-by-row map

| Finding | result-C item | Became |
|---|---|---|
| 1. ✓ lands on page 3, not page 4 | 3 | 1. ISS-SWC-52 |
| 2. No 「Page n / N」 on opening | 1 | not raised (PHA262026P0094) |
| 3. Cross-page frame after reorder / at 1 page | 2 | 2. ISS-SWC-53 |
| 4. Move / ••• buttons tiny at 10 pages | 4 | 3. ISS-SWC-54 |
| 5. Frame selection box and menu over text | 7 | 4. ISS-SWC-55 |

### Owner split

| Owner | Entries |
|---|---|
| RD | 1 |
| PM | 2, 3, 4 |

### Filing order

**1**, **2**, **3**, **4**. Nothing is filed until the review page's decisions come back.
