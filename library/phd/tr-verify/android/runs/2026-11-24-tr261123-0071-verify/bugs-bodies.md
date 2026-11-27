=== PHA262026P0071 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Template card thumbnails and the Template Preview stay blank, with no page dots
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Wait 10 seconds
5. Check the template cards
6. Swipe a card left
7. Tap the Year End 「7 photos · 3 pages」 card
8. Swipe the preview left
9. Check the preview

Result:
Every template card is an empty box and the Template Preview is blank, with no page dots.
摘要：所有範本卡片都是空白方塊，預覽也是空白、沒有頁點。
{20.19.0_swc02_template_cards_blank.jpg} {20.19.0_swc02_preview_blank_no_dots.jpg} {20.19.0_swc02_log.txt}

Expect Result:
Each card shows the template's first page with page dots, and the preview shows its pages.
摘要：卡片顯示範本第一頁與頁點，預覽顯示各頁內容。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: the East / West thumbnail check (TC-018) is blocked by this
Spec Link: Swipe Collage Design Figma, Template Page · default (NEW) board (card thumbnail with page dots) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=3-336
Spec Link: Swipe Collage Design Figma, entry_launcher2 board (Template Preview with page dots) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=18-386
<Claude Reviewed>

=== PHA262026P0104 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Background textures and Add Layer frames carry no PRO crown or NEW tag
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the first Year End 「2 photos · 1 pages」 card
5. Tap Use Template
6. Tap Background
7. Tap Texture
8. Swipe the textures to the end
9. Check the texture tiles

Result:
On Free (and Premium) no texture or frame shows a PRO crown or a 「NEW」 tag.
摘要：材質與框都沒有 PRO 或 NEW 標記。
{20.19.0_swc43_textures_no_pro_new.jpg} {20.19.0_swc43_frames_no_pro_new.jpg}

Expect Result:
PRO textures and frames carry a crown and new ones a 「NEW」 tag (CMS).
摘要：付費內容要有皇冠、新內容有 NEW。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: TC-150 and TC-151 (export IAP for a PRO frame or texture) are blocked by this
Spec Link: Swipe Collage Design Figma, background_panel_texture board (crown and NEW on texture tiles) -
https://www.figma.com/design/iUy5kOrVNG7IjcyxGGnp9t/Swipe_collage?node-id=72-1505
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-layers / states-background board (D2-07 / D3-02 / F17: CMS NEW / PRO tags)
<Claude Reviewed>

=== PHA262026P0105 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: Free user gets no IAP page at the 3rd export or any later one
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the first Year End 「2 photos · 1 pages」 card
5. Tap Use Template
6. Tap the download icon at the top right
7. Tap 「‹」
8. Tap the download icon at the top right
9. Tap 「‹」
10. Tap the download icon at the top right
11. Check the screen

Result:
On Free, 7 exports in a row never show the IAP page, at the 3rd or later.
摘要：Free 連續匯出 7 次都沒跳 IAP。
{20.19.0_swc44_third_export_no_iap.jpg} {20.19.0_swc44_back_on_canvas_no_iap.jpg} {20.19.0_swc44_log.txt}

Expect Result:
A Free user gets the 「PhotoDirector Premium」 IAP page every 3 saves.
摘要：Free 每存 3 次應跳一次 IAP。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), states-save-page / monetization-notes board (D3-03 / D3-05: IAP every 3 saves for Free)
<Claude Reviewed>

=== PHA262026P0106 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: No 「Continue editing?」 after the app is killed during editing; edits are lost
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Scrollable Collage!」 banner
4. Tap the first Year End 「2 photos · 1 pages」 card
5. Tap Use Template
6. Tap Background
7. Tap a blue swatch
8. Tap the round ✕
9. Run 「adb shell am force-stop com.cyberlink.photodirector」
10. Launch the APP
11. Check for a dialog
12. Tap Collage on the Launcher
13. Check for a dialog
14. Tap the 「Try Scrollable Collage!」 banner
15. Check for a dialog

Result:
On Free, no 「Continue editing?」 appears at launch, in Collage or on the Template Page; edits are lost.
摘要：強制停止後沒有 Continue editing?，編輯遺失。
{20.19.0_swc45_edited_canvas_before_kill.jpg} {20.19.0_swc45_collage_room_no_dialog.jpg} {20.19.0_swc45_log.txt}

Expect Result:
A 「Continue editing?」 dialog appears next time, and continuing restores the project.
摘要：下次開啟應詢問並可還原專案。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Related: TC-037 / TC-038 (continue and dismiss) are blocked by this
Spec Link: Swipe Collage PhDM Spec.pdf (PM), leave-notes board (D1-10: 「Continue editing?」 after a kill restores the project)
<Claude Reviewed>

=== PHA262026P0111 — PHD-A 20.19.0 - [AIAgent][UI] AI_Hair_Color: Custom panel shows ︽ not ⌄, keeps the ✕ ↩ ↪ ✓ row, square corners
Repro Steps:
1. Launch the APP
2. Tap AI Photos on the Launcher
3. Tap AI Hair Color
4. Tap Continue on the photo tips sheet
5. Tap a portrait photo with one clear, front-facing face
6. Tap Custom in the swatch row
7. Check the panel's top-right key, its corners and the bottom row
8. Check the result

Result:
The key is ︽, the ✕ ↩ ↪ ✓ row stays under the panel, and the top corners are square.
摘要：收合鍵為︽、面板下方仍有 ✕ ↩ ↪ ✓ 列、上緣為直角。
{20.19.0_hcc03_panel_chevron_row_corners.jpg}

Expect Result:
A ⌄ key at the top right, no ✕ / ✓ or undo / redo row, top corners rounded 20 pt.
摘要：右上應為 ⌄、無 ✕ ✓ ↩ ↪ 列、上緣圓角 20pt。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: AI Hair Color Custom PM Figma (26 11E AI Hair Color Custom), panel_open_no_style (NEW) frame, Spec - UI - https://www.figma.com/design/vhIp15PMJcwOcWJ6E9Q4JE/AI-Hair?node-id=3327-824
Spec Link: AI Hair Color Custom PM Figma (26 11E AI Hair Color Custom), Spec - UI board (UI source note) - https://www.figma.com/design/vhIp15PMJcwOcWJ6E9Q4JE/AI-Hair?node-id=3287-94
<Claude Reviewed>

=== PHA262026P0147 — PHD-A 20.19.0 - [AIAgent] Swipe_Collage: App crashes on every open after it was closed with a canvas being edited
Repro Steps:
1. Launch the APP
2. Tap Collage on the Launcher
3. Tap the 「Try Swipe Collage!」 banner
4. Tap the Year-end Recap 「4 photos · 3 pages」 card
5. Tap Use Template
6. Tap the 「+」 of a page-1 frame
7. Select 1 photo
8. Tap Next
9. Tap the filled frame
10. Tap the same frame again
11. Tap Removal on the tool bar
12. Tap Try First
13. Tap ✕ in the Object Removal room
14. Force stop PhotoDirector
15. Launch the APP
16. Tap Collage on the Launcher
17. Tap the 「Try Swipe Collage!」 banner
18. Check the result

Result:
The app crashes at once (ClassCastException in SwipeCollageDraftUseCase), on every later try.
摘要：重開 App 後每次進入 Swipe Collage 都會閃退。
{20.19.0_swc49_crash_on_open.jpg} {20.19.0_swc49_crash_dialog.jpg} {20.19.0_swc49_crash_log.txt}

Expect Result:
No crash: 「Continue editing?」 appears and restores the project, or Swipe Collage opens normally.
摘要：不應閃退，應出現「Continue editing?」還原專案或正常進入。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
Spec Link: Swipe Collage PhDM Spec.pdf (PM), leave-notes board (D1-10: 「Continue editing?」 after a kill restores the project)
Related: PHA262026P0106
<Claude Reviewed>

