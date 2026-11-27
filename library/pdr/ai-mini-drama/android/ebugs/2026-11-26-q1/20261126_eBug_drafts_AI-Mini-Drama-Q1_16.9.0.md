# AI Mini Drama (Android) — eBug drafts, question round Q1, PDR-A 16.9.0 build 2611231

**Source:** pdr-spec-casebook run `library/pdr/ai-mini-drama/android/runs/2026-11-26-q1-questions/` — question round Q1 (TC-580 for Q-18, TC-581 and TC-582 for Q-5), 2026-11-26 11:10 → 12:03 (UTC+8) on Samsung SM-A5360 (Galaxy A53 5G) / adb R5CTB22S05Y, build 16.9.0 (2611231), Stage server (yellow Launcher bar), Free account (cltqauiap2@gmail.com; Mine shows 「Free」), 29731 credits before, 29242 after (489: storyboard 39, preview video 150, rest of the video 300). Tally: 3 Fail (`question`).

**Status:** filed 2026-11-26 on TR261123-0070 over the API: ISS-AMDA-71 → DRA262611P0323, ISS-AMDA-72 → DRA262611P0324. See `filed_bugcodes.md`. No existing ticket commented on.

Filed by: ETHAN_HSU on 2026-11-26

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line, an image on every entry, the log excerpt where something failed, no video). Q-18 asks PM for an availability decision (a user-experience question: `[AIAgent][UX]`, BugBelong PM); Q-5 asks PM about chat text (`[AIAgent][UI]`, BugBelong PM).

**What is drafted:** 2 entries: ISS-AMDA-71 (Q-18), ISS-AMDA-72 (Q-5). O-1 (storyboard announced before it is requested) and O-4 (ready banner while the video still generates) repeat open same-OS tickets DRA262610P0174 and DRA262610P0379: left off, `dedupe.txt` only.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-AMDA-71 — Templates show on a non-US/JP Play account; PM's 「day 1 只有 US & JP」 limit is undefined  ·  Class: UX  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-580  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-18). The PM main flow board has the note 「day 1 只有 US & JP」 beside the template grid, and no source says what it limits (templates, preset characters, the whole feature) or how a store outside US and JP is treated. On the device (Stage): Google Play › Settings › Account and device preferences names no current country and offers only 「Switch to the Taiwan Play Store」; every price is NT$ (packs NT$330 – NT$6990; logcat Play prices NT$); the landing shows 6 templates and More shows all 20 in 5 categories (Workplace Romance 5, Fantasy & Destiny 5, Urban Romance 4, Family & Life 4, Animated Stories 2; logcat 「MiniDramaTemplate pagination finished with count: accumulated=20」). So on Stage this build applies no US / JP limit for an account billed in NT$. Production and a confirmed US or JP store were not checked (the run does not change the Play account). No log of a failure: nothing failed.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UX] AI Mini Drama: Templates show on a non-US/JP store; PM's US & JP day 1 limit is undefined
```

**Description:**

```
Repro Steps:
1. Open Google Play
2. Tap the profile icon
3. Tap 「Settings」
4. Tap 「General」
5. Tap 「Account and device preferences」
6. Read 「Country and profiles」
7. Launch the APP
8. Tap 「AI Mini Drama」 on the Launcher
9. Tap 「Try It Now」
10. Tap the credit pill
11. Tap 「Buy More」
12. Read the price currency
13. Tap Back twice
14. Count the templates under 「Start from a template」
15. Tap 「More」
16. Count the categories and the templates in each

Result:
On a Play account billed in NT$ (not US or JP), More shows all 20 templates in 5 categories.
摘要：Play 帳號以新台幣計價（非美、日），「More」仍顯示 5 類共 20 個範本。
{16.9.0_amda71_play_country.jpg} {16.9.0_amda71_prices_ntd.jpg} {16.9.0_amda71_landing_templates.jpg} {16.9.0_amda71_more_top.jpg} {16.9.0_amda71_more_bottom.jpg}

Expect Result:
PM to decide what 「day 1 只有 US & JP」 limits and what a store outside US and JP should see.
摘要：請 PM 決定「day 1 只有 US & JP」限制什麼，以及美、日以外商店應看到什麼。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android
Basis: In-product — the PM main flow note 「day 1 只有 US & JP」 stands beside the template grid; no board or note says what it limits (templates, preset characters or the whole feature) or how it is applied. Seen on the Stage server (yellow Launcher bar); Production not checked.
Related: Play 「Country and profiles」 names no current country and offers 「Switch to the Taiwan Play Store」; credit packs priced NT$330 – NT$6990. Categories: Workplace Romance 5, Fantasy & Destiny 5, Urban Romance 4, Family & Life 4, Animated Stories 2.
Related: open question Q-18.
Spec Link: AI Mini Drama PM spec, Main flow board (「day 1 只有 US & JP」 beside the template grid) -
https://www.figma.com/design/44RyrcOcWi2MvhGci9bO5F/AI-Mini-Drama?node-id=2016-2
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AI-Mini-Drama-Q1_16.9.0_images/01_ISS-AMDA-71/`

---

## 2. ISS-AMDA-72 — 「Every frame is done. Ready to create your video?」 never shows; its two string keys have no place in the chat  ·  Class: UI  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-581, TC-582  ·  **Reproduce:** 1/1  ·  **Verified on:** 16.9.0.2611231

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-5). The PM string list gives 「Every frame is done. Ready to create your video?」 for two keys, `storyboard.all_videos.q` and `ladder.beat_video.q` (pm-top-mockups board of the 10/16 – 10/21 sets). On 2611231 neither place shows it: after a new storyboard nothing stands between the Storyboard Result card and 「Choose your video settings」, before or after the Storyboard Preview is played (TC-581); after the Preview video the chat reads 「Here's your drama.」 then 「Looking good! Ready for the full video?」 above 「Create the rest of the video (60 sec)」 (TC-582, R-075's question). The APK holds only the key `beat.all_videos_done.text` in libAMD.so, no English text (chat text comes from the server). After the row, the full video was generated too (run step 9; 「Create the rest of the video (60 sec)」 ◆300, 11:48:39 → 12:00:40, 「Generating the rest of the video.」, then 「Here's your drama.」 and 「Ready for the next episode?」 with 「Create Next Episode」): the string did not show there either. The exported session (debug info, `runs/…/exports/`) has no 「Every frame is done」 anywhere; its full-video offer is the question `QuestionCreateRestVideo` with route intent `beat_video`. The card's 60 s length is DRA262610P0159 (PM, Close); its new wording 「Create the rest of the video」 is in no spec read and is quoted only as what the app shows. No log of a failure: nothing failed.

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent][UI] AI Mini Drama: 「Every frame is done. Ready to create your video?」 never shows in the chat
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap 「AI Mini Drama」 on the Launcher
3. Tap the 「After Closing」 template
4. Tap 「Make my version」
5. Tap 「Generate」 on the format card
6. Tap 「Generate」 on the 「Create storyboard」 card
7. Wait until the storyboard is done
8. Read the messages between the Storyboard Result card and 「Choose your video settings」
9. Play the Storyboard Preview to the end
10. Close the player
11. Tap 「Generate video」 with Standard and 「Preview - 30 sec」
12. Wait until the video is done
13. Read the messages from the Storyboard Preview to the end of the chat

Result:
「Every frame is done. Ready to create your video?」 shows nowhere after the storyboard or the preview video.
摘要：分鏡與預覽影片完成後都沒出現「Every frame is done…」。
{16.9.0_amda72_storyboard_to_settings.jpg} {16.9.0_amda72_preview_to_full_card.jpg}

Expect Result:
PM to decide whether storyboard.all_videos.q and ladder.beat_video.q are still used, and where each shows.
摘要：請 PM 決定這兩個字串鍵是否仍使用，以及各自顯示的位置。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android
Basis: In-product — the PM string list gives the same English 「Every frame is done. Ready to create your video?」 to two keys, and no board places either in the current chat flow; if both stay, PM to say whether one text for both is intended. Seen on the Stage server.
Related: between the Storyboard Result and 「Choose your video settings」 no message shows; after the preview video the chat asks 「Looking good! Ready for the full video?」; after the rest of the video it asks 「Ready for the next episode?」.
Related: the full-episode card reads 「Create the rest of the video (60 sec)」; its 60 s length is DRA262610P0159.
Related: open question Q-5.
Spec Link: AI Mini Drama PM spec, Chat result states (top mockup group) board -
https://www.figma.com/design/44RyrcOcWi2MvhGci9bO5F/AI-Mini-Drama?node-id=2016-2
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AI-Mini-Drama-Q1_16.9.0_images/02_ISS-AMDA-72/`

---

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| O-2 (TC-080) | Video settings card quotes 7 / 5 / 3 credits a second, no reference-audio part (Standard Preview ◆150, Full ◆450); the Stage feature list itself returns credit=7 / 5 / 3 for the AIMiniDramaVideo 720p ids | Prices are server-set and TC-080 was not in this phase: held for TC-080 in the next full run, with the Credit System forms read again. |
| O-1 | 「Created the 6-scene storyboard for After Closing.」 above the 「Create storyboard」 card before anything was requested (chat_history: the template turn t1's own reply text) | Same-OS DRA262610P0174 (Assigned): 「Assistant says the storyboard is created before Create storyboard is tapped」: `dedupe.txt` only. |
| O-4 | In-app 「Good news! Your "After Closing" is ready. Tap here to view your results.」 banner over the same drama's chat at 11:44:44 while its video card still shimmered | Same-OS DRA262610P0379 (NeedCodeReview): 「"is ready" banner appears while that drama's video is still generating」: `dedupe.txt` only. |
| TC-582 card title | 「Create the rest of the video (60 sec)」 instead of R-075's 「Create the full episode (90 sec)」 | The 60 s length is DRA262610P0159 (PM, Close, same OS): left in `dedupe.txt`; quoted in ISS-AMDA-72 only. |

## Reconciliation

| Item | Result | Became |
|---|---|---|
| TC-580 | Fail (question), Q-18 | ISS-AMDA-71 |
| TC-581 | Fail (question), Q-5 | ISS-AMDA-72 |
| TC-582 | Fail (question), Q-5 | ISS-AMDA-72 |
| O-1, O-4 | observations | not raised: same-OS DRA262610P0174, DRA262610P0379 |
| O-2 | observation | not raised (held for TC-080) |
| O-3 | timing only | not raised |

3 failed rows → 2 entries.
