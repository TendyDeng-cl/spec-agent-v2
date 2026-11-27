# Free trial (new one-time trial mechanism), AI Video Try-On (Android) — eBug drafts, PhotoDirector 20.19.0 build 90201902

**Source:** ad-hoc check `library/phd/tr-verify/android/runs/2026-11-23-free-trial-credit/` (Kanban item 「New mechanism for one-time free trial」, user request 2026-11-23), Samsung Galaxy S23 (SM-S9110) / Android 16 through Appium / UiAutomator2, Test Server, Free, 0 credits. Not a casebook table run: no cases.csv rows; the run's `notes.md` holds the per-feature results (11 Pass, 3 with no free trial shown, 1 blocked = this entry).

**Filed by:** WILLY_WU on 2026-11-23 (IF3 API, TR261123-0041, Build 202611231214): entry 1 ISS-FT-01 = [PHA262026P0158](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/PHA262026P0158). Nothing commented.

**Status (at drafting):** nothing filed, uploaded or commented. Build 20.19.0 / versionCode 90201902, installed 2026-11-23 14:05; same APK (MD5 626c34fa…aa30) as the Pixel 8a used for the TR261123-0041 verify the same day, so TR261123-0041 (20.19.0.v202611231214). ECL product 「PhotoDirector Mobile for Android」. Creator WILLY_WU, [AIAgent], API, as the newest PHD-A batches (ai-hair-color-custom 2026-11-20-r3) — confirm.

Rules: reviewer rules 2026-10-21 — one action per Repro step, a Spec Link on every entry (URL on its own line), at least one image per entry, no video. No log excerpt: the finding is a trimmer limit, no failure line (no generation was started).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD / PM.

---

## 1. ISS-FT-01 — Free video needs a clip of 2 s or less, but the trimmer stops at 3 s  ·  Class: Functional  ·  Severity: S2  ·  Owner: PM

**Report step:** notes.md (AI Video Try-On row)  ·  **Reproduce:** 2/2  ·  **Verified on:** 20.19.0.90201902

> **QA note — not pasted into eBug.** No spec link: no PM or Design spec for AI Video Try-On's free video is in the repo and the Kanban item gives no URL; the user approved filing without one (2026-11-23, `--no-link-ok`, decisions.md). Reproduced twice on the S23 (15:56 and 16:11), same video (00:08 clip) and same build. The dialog appears after the video import and again from the trimmer's ⓘ; the screen title reads 「Import a Source Video (3s-10s)」. Dragging the right handle all the way left, and the left handle all the way right, both stop at 「Selected Length: 0:3」, 「This clip will use 54」 (5 s = 90). With 0 credits no free path exists, so the offer the dialog promises cannot be used. Owner PM because either the free length (2 s) or the 3 s minimum has to change and the app cannot tell which; flip to RD if the 2 s rule is settled. Not checked: a source video shorter than 3 s (the import says 3 s – 10 s). Dedupe: no same-OS match (`dedupe.txt`).

**Short Description:**

```
PHD-A 20.19.0 - [AIAgent] AI_Video_Try_On: Free video needs a clip of 2 s or less, but the trimmer stops at 3 s
```

**Description:**

```
Repro Steps:
1. Launch the APP with a Free account
2. Tap AI Videos on the Launcher
3. Tap AI Video Try-On
4. Tap Import under 「Import a Source Video (3s-10s)」
5. Select a video of 4 s or longer
6. Tap Done
7. Tap OK on 「Enjoy a Free Video on Us」
8. Drag the trimmer's right handle all the way left
9. Check the result

Result:
The trimmer stops at 0:3 (54 credits), so the 2-second free video the dialog offers cannot be selected.
摘要：裁切最短只能到 3 秒（54 點），無法剪到對話框說的 2 秒免費長度。
{20.19.0_ft01_free_video_dialog.jpg} {20.19.0_ft01_trimmer_min_3s.jpg}

Expect Result:
The trim length and the free-video rule agree, so a free generation can be made as the dialog says.
摘要：可裁切長度與免費條件應一致，使用者能照對話框說明免費生成。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
<Claude Reviewed>
```

**Images:** `20261123_eBug_drafts_Free-Trial-Video-Try-On_20.19.0_images/01_ISS-FT-01/`

---

# Not raised (for the record)

| Item | Finding | Why not raised |
|---|---|---|
| AI Art | No 「1 Free Trial」 on any style (Generate 2) | User said 「先不用」; trial may be off on Test Server or used on this device — question for RD |
| Image to Video | No free trial on Templates (20) or Custom Kling 3.0 (30) | Same |
| Cinematic Reel Creator | No free trial (Horror Movie 70, Selfie Shake 48) | Same |
| 11 other features | Free trial generated at 0 credits, Credit Detail empty | Pass |

# Reconciliation against the run

| Item | Result | Became |
|---|---|---|
| AI Video Try-On | Blocked (free length unreachable) | 1. ISS-FT-01 |
| AI Art | No trial shown | not raised |
| Image to Video | No trial shown | not raised |
| Cinematic Reel Creator | No trial shown | not raised |
| AI Hairstyle, AI Hair Color, AI Background, AI Expand, AI Glow Up, AI Hair Volume, Style Transfer, AI Replace, AI Headshot, AI Try-On, AI Creative Studio | Pass | not raised |

Filing order: **1**. Nothing is filed until the review page's decisions come back.
