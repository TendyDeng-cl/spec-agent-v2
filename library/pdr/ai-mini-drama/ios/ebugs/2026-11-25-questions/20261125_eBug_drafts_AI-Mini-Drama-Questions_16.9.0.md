# AI Mini Drama (iOS) — eBug drafts, Open questions to PM, PDR-I 16.9.0 build 189872

**Source:** pdr-spec-casebook run `library/pdr/ai-mini-drama/ios/runs/2026-10-22-p9-full/` (P9, the newest iOS run: 2026-10-22 15:33 → 2026-10-23 10:00 on iPhone 17 Air / iOS 26.2.1, TestFlight build 16.9.0 (189872), TR261022-0031, Developer Server, Pro+). No device was used for this batch: every statement is from that run's `results.csv` and `screenshots/`. Spec set `specs/2026-10-21-2`. Questions: `requirements.md` › Open questions; their state: `question-status.json` (the four flagged `to-file`: Q-5, Q-18, Q-28, Q-31).

**Status:** DRAFT, 2026-11-25. Nothing filed, nothing uploaded, no existing ticket touched.

Rules: an Open question the run cannot settle is filed to PM for a decision (`ebugs.md` step 1, user 2026-11-11 and 2026-11-25): BugBelong PM, the Result says what the app does on the recorded build, the Expect states the decision with the sources quoted, the Note names the Q-id. One action per Repro step, a Spec Link on every entry (URL alone on the next line), an image on every entry, no video. A PM decision on a user-experience point is `[AIAgent][UX]` (AGENTS.md 2026-11-11). No log: nothing here is a failure.

**What is drafted:** 2 entries (Q-28, Q-31), both from screenshots the P9 run already holds. **Not drafted:** Q-5 and Q-18, whose needed observation was never recorded; each is listed under *Not drafted: needs a device check* with the check to run.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: PM (a decision on the spec).

---

## 1. ISS-AMD-74 — Regenerated scene image has no ⋯ menu; PM frame draws one, Design does not (Q-28)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** Q-28, TC-141  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.189872

> **QA note — not pasted into eBug.** **Open question Q-28 filed to PM for a decision** (no Fail row: the filing rule follows the question list, `ebugs.md` step 1). **Type UX** (a PM decision on whether a control exists and what it offers; AGENTS.md 2026-11-11). Evidence is TC-141 (Pass) of P9: Shared Corner, Scene 1, scene image failed and Location fine; 「Regenerate Image」 01:44:45, first try failed on the server 01:48:21 (`TC-141-result.png`), second try with a shorter description gave the new image at 01:52:11 (`TC-141-result2.png`). That screenshot shows the regenerated scene detail: X, 「Scene 1」, ‹ ›, Location and scene image side by side, title and script; no ⋯ on either image and no other control. The run did not long-press the image, so a hidden menu is not ruled out; the entry says only that no ⋯ is drawn. Spec: PM Error Handling frame 2621:30383 draws a ⋯ on the regenerated image and its board note reads 「After success the scene shows the new image (… menu on the image).」; no PM frame draws the menu's contents. Design flow arrow 4299-168964 (R-306) draws the regenerated scene detail with no ⋯. Design first (AGENTS.md 2026-11-13) would make the app right, but the PM note is explicit and nothing says which is newer for this control, so it stays PM's call. TC-397 (the row that walks R-366) was never run. All Pink fault switches Off.

**Short Description:**

```
PDR-I 16.9.0 - [AIAgent][UX] AI Mini Drama: Regenerated scene image has no ⋯ menu that the PM Error Handling frame draws
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap AI Mini Drama on the Launcher
3. Tap History
4. Tap a drama whose storyboard has a scene with no scene image
5. Tap that scene in the Storyboard Result
6. Tap Edit on the card under the images
7. Shorten the description
8. Tap Done
9. Tap Regenerate Image
10. Wait until the new scene image shows
11. Check the scene image for a ⋯ button

Result:
The regenerated scene detail shows the Location image and the new scene image with no ⋯ button on either.
摘要：重新生成後的場景詳情頁，場景圖上沒有「⋯」按鈕。
{16.9.0_amd74_before_regenerate.jpg} {16.9.0_amd74_regenerated_no_menu.jpg}

Expect Result:
PM to decide if the regenerated scene image has a ⋯ menu and what it offers (Q-28); PM draws ⋯, Design none.
摘要：請 PM 決定重新生成後的場景圖是否有「⋯」選單及其內容（Q-28）。
Spec string: 「After success the scene shows the new image (… menu on the image).」

Note:
Device: iPhone 17 Air / iOS 26.2.1
Spec Link: AI Mini Drama PM spec (AI Mini Drama - PM Spec 20261021.pdf), Error Handling board (Q-28: regenerated scene detail with ⋯) -
https://www.figma.com/design/44RyrcOcWi2MvhGci9bO5F/AI-Mini-Drama?node-id=2621-30383
Spec Link: AI Mini Drama Design spec, flow arrow scene image regenerating to regenerated scene detail (no ⋯) -
https://www.figma.com/design/dZk5HLzZTdcZwWwvN9aZfZ/AI-Mini-Drama?node-id=4299-168964
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_AI-Mini-Drama-Questions_16.9.0_images/01_ISS-AMD-74/`

---

## 2. ISS-AMD-75 — MX mockups draw an older chat (add-image button, edit icon, 「Customize my characters (optional)」…) that the app does not have (Q-31)  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** Q-31, TC-011, TC-020, TC-070, TC-193, TC-235  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.189872

> **QA note — not pasted into eBug.** **Open question Q-31 filed to PM for a decision** (not a failure of any row: TC-011, TC-020, TC-070, TC-140 and TC-235 passed against the Design / PM, and TC-193 failed on something else, its screenshot is used only for the cast card; the question is whether the MX mockups still describe anything that ships). **Type UX** (a PM / MX decision on which chat is current; AGENTS.md 2026-11-11). What P9 recorded, item by item of Q-31: (1) composer: 「Enter your idea to create drama」 with a Record voice (mic) button and Send, no add-image button (TC-011 Pass, `TC-011-empty-chat.png`); (2) no aspect-ratio question on the format card (TC-020 Pass; the earlier ticket DRI261893-0118 asking for one was ruled NAB); (3) a template chat opens on 「What format would you like for your video?」, not 「Continue to create the script?」 / 「Ready to create」 (TC-235 Pass, `tc235-chat-open.png`); (4) the cast card is 「Ready to create your characters?」 with the character slots and 「Add New」, no 「Create characters」 card and no 「Customize my characters (optional)」 line (`TC-193-chars.png`); (5) Characters Result cards carry a Regenerate (↻) icon each and no edit icon (`SB2-offer.png`, page source `SB2-offer.txt`: 「Characters Result」, [Button] Regenerate; the 「Something went wrong on my end」 card under it is the server failure of that turn, not part of this entry); Also not in the app: 「Continue to create the script?」 / 「Ready to create」 (item 3) and 「Tell AI what to change…」 (item 6), and 「Customize my characters (optional)」 (item 4), left out of the one-line Result for length (the format check caps it). (6) the scene editor is a plain text editor with the script, an x/1000 counter, Clear, Done and the collapse icon, no 「Tell AI what to change…」 (TC-070, TC-140 Pass, `TC-070-editor.png`). The seventh item, the 「Consume credits?」 card with 「Don't ask again」 / 「Confirm」, is Q-3 and is left out here. Sources: MX boards mx-a-left 「v1 ① Free Chat Times ② Charging Flow & First-time Credit Discount」 and mx-a-mid 「v1 Paid/Free user charging flows」 (the mockups around the chat-count and charging rules; OCR `boards/mx-a-mid.md` reads 「Customize my characters （optional）」). The control trace marks these mockup controls n/a (Q-31) until MX / PM confirms. All Pink fault switches Off.

**Short Description:**

```
PDR-I 16.9.0 - [AIAgent][UX] AI Mini Drama: MX mockups draw an older chat UI (add-image button, edit icon) the app lacks
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap AI Mini Drama on the Launcher
3. Tap Create Your Drama
4. Check the composer
5. Type an idea
6. Tap Send
7. Check the format card
8. Tap Generate
9. Wait for the outline
10. Check the 「Ready to create your characters?」 card
11. Tap a character slot
12. Tap a library character for each slot
13. Tap ✓
14. Check the Characters Result cards
15. Tap Generate on the Create storyboard card
16. Tap a scene with no scene image in the Storyboard Result
17. Tap Edit
18. Check the scene editor
19. Tap Back until the AI Mini Drama landing page shows
20. Tap the 「Merger Season」 template
21. Tap Make my version
22. Check the first message of the template chat

Result:
The chat has no add-image button, no aspect-ratio chips and no edit icon on Characters Result.
摘要：聊天中沒有 MX mockup 所畫的加入圖片按鈕、長寬比選項與角色結果編輯圖示。
{16.9.0_amd75_composer.jpg} {16.9.0_amd75_template_format_card.jpg} {16.9.0_amd75_cast_card.jpg} {16.9.0_amd75_characters_result.jpg} {16.9.0_amd75_scene_editor.jpg}

Expect Result:
PM to decide if the MX mockups' older chat elements are illustrations only or still ship (Q-31).
摘要：請 PM 決定 MX mockup 的舊版聊天元素僅為示意，或仍會上線（Q-31）。

Note:
Device: iPhone 17 Air / iOS 26.2.1
Spec Link: PDRM MX spec (PDRM MX.pdf), v1 ① Free Chat Times ② Charging Flow & First-time Credit Discount board and v1 Paid/Free user charging flows board (Q-31: the older chat mockups) -
https://www.figma.com/design/3urWYejMUP2uaglb4s73M5/PDRM-MX?node-id=989-8
Spec Link: AI Mini Drama Design spec, AI Mini Drama home page / Custom detail / Chat room detail board (the chat the app follows) -
https://www.figma.com/design/dZk5HLzZTdcZwWwvN9aZfZ/AI-Mini-Drama?node-id=116-7873
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_AI-Mini-Drama-Questions_16.9.0_images/02_ISS-AMD-75/`

---

## Not drafted: needs a device check

These two questions are `to-file` but no run recorded the observation their eBug must state, so no entry is drafted. Each becomes an entry once the check below is done on the build under test (record the build and server with it).

| Q-id | Why not drafted | Device check to run (screen, steps, what to capture) |
|---|---|---|
| Q-5 | The string 「Every frame is done. Ready to create your video?」 was never seen: no result, observation or screenshot of any iOS run quotes it, and no row reads it. P9 never finished a video (video gate failed three times), so the second place it should show (`ladder.beat_video.q`) was not reached. Without the string on screen there is no Result and no image. | In a chat with a finished storyboard, read the message Iris posts when every scene image is done, before 「Choose your video settings」 (`storyboard.all_videos.q`); then generate a preview video and read the message at the point where each beat's frames are done and the video is offered (`ladder.beat_video.q`). Capture a screenshot and the page source at both places, with the full message text, and note whether the string shows at all (the text is only on the pm-top-mockups board of the 10/16–10/21 sets; the current flow may no longer use the keys). If neither shows, record that: the question then goes to PM as 「are these two keys still used?」 with a screenshot of what shows instead. |
| Q-18 | The runs show the template grid and all 20 templates on the Developer Server (TC-003, TC-010 Pass, `TC-001-landing.png`), but no record names the phone's App Store region, and no run opened the landing from a store other than US or JP. The Result would have to say in which store region the templates show; that was never recorded. | On the QA iPhone read the App Store region (Settings, Apple Account, Media & Purchases, View Account, Country/Region; or the currency on the in-app subscription page) and capture it. Then open AI Mini Drama: capture the landing template grid and the More page (count the templates and categories). If the region is not US or JP this already shows whether templates are limited; if it is US or JP, repeat with an Apple Account of another store region (e.g. Taiwan). Note the server (Developer / Production): PM's note 「day 1 只有 US & JP」 is about Production. |

## Dedupe

`dedupe.txt`: PowerDirector Mobile for iOS only, whole AI Mini Drama pool (229 tickets), 2026-11-25. No existing iOS ticket covers Q-5, Q-18, Q-28 or Q-31. Related, not a duplicate: DRI261893-0118 (NAB, 「Format setup has no aspect-ratio selection」) already settled the aspect-ratio item of Q-31 against the Design; it is cited in ISS-AMD-75's QA note. DRI261893-0163 (QANeedRework, 「Successful storyboard image routes expose no version editor」) asks for the withdrawn image-version editor on a successful scene, not the ⋯ of Q-28: read in full and judged a different question. The pool listing is `dedupe-query.txt`.

## Reconciliation against the question list

| Q-id | State before (`question-status.json`) | Outcome in this batch |
|---|---|---|
| Q-5 | to-file | Not drafted: needs the device check above (string never seen) |
| Q-18 | to-file | Not drafted: needs the device check above (store region never recorded) |
| Q-28 | to-file | Drafted: ISS-AMD-74, from `TC-141-result2.png` (the look the status note said was missing is on the run's screenshot) |
| Q-31 | to-file | Drafted: ISS-AMD-75, from `TC-011-empty-chat.png`, `tc235-chat-open.png`, `TC-193-chars.png`, `SB2-offer.png`, `TC-070-editor.png` |

`question-status.json` is not changed by this batch (drafts only); Q-28 and Q-31 become `filed` once the reviewer files them.
