# AI Removal (Android) — eBug drafts, TR261124-0075, PhotoDirector 20.19.0 build 90201902

**Source:** ad-hoc check `library/phd/tr-verify/android/runs/2026-11-25-ai-removal-reset/` (user request 2026-11-25 with their own screenshot), Samsung Galaxy S23 (SM-S9110) / Android 16 through Appium / UiAutomator2, Test Server, Premium (「Hello VIP!」 on Mine, 「Set to subscriber」 on). Build 20.19.0.v202611241937 (R11, versionCode 90201902; the build string read from the installed APK), the TR's own build. Not a casebook table run: no cases.csv rows.

**Status:** nothing filed, uploaded or commented. Target TR261124-0075 (named by the user). Creator WILLY_WU, API, as the newest PHD-A batch (2026-11-24 swipe-collage-changelog). **No `[AIAgent]` tag** (user, 2026-11-25: 「請幫我發一支bug但不要掛[AIAgent]」).

Rules: one action per Repro step, at least one image, no video. No log excerpt: a layout finding with no failure. No Spec Link: no AI Removal spec is in the repo — needs your OK to file without one (as the 2026-11-23 free-trial bug).

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD / PM.

---

## 1. ISS-RMV-01 — Reset squeezes the [Smart Select] tab into two lines for paid users  ·  Class: UX  ·  Severity: S3  ·  Owner: RD

**Report step:** user report 2026-11-25  ·  **Reproduce:** 1/1 (S23) + the user's own screenshot  ·  **Verified on:** 20.19.0.90201902

> **QA note — not pasted into eBug.** Page source on the S23 (density 450): `resetButton` (content-desc 「Clear」) at x 0–135, y 1605–1740, disabled until a change is made; the 「Smart Select」 text box is 186 × 94 px (two lines) while 「Manual」 (129 × 53) and 「One-Tap」 (145 × 53) are one line; `proSwitch` (PRO) at x 897–1080. The bottom bar already holds ✕, Undo, Redo and ✓ with room between them. The fix direction (move Reset next to Undo / Redo) is the user's. Owner RD (layout change in an existing room); switch to PM if the button's place needs a Design decision. Not checked: the Free tier layout (the user reports the squeeze only for paid users) and other languages. Dedupe: no same-OS match (`dedupe.txt`).

**Short Description:**

```
PHD-A 20.19.0 - [UX] AI_Removal: The [Smart Select] tab is squeezed into two lines by the [Reset] button for paid users
```

**Description:**

```
Repro Steps:
1. Launch the APP as a paid user
2. Tap AI Removal on the Launcher
3. Select a sample photo
4. Tap [X] on the 「Edit As a Pro with Generative AI!」 dialog
5. Check the [Smart Select] tab

Result:
The [Reset] button squeezes the [Smart Select] tab, so its label wraps into two lines.
摘要：付費用戶的 [Reset] 按鈕擠壓 [Smart Select] 分頁，文字變成兩行。
{20.19.0_rmv01_smart_select_two_lines.jpg}

Expect Result:
[Smart Select] stays on one line; move the [Reset] button down next to [Undo] and [Redo].
摘要：[Smart Select] 應單行顯示；建議將 [Reset] 移到下方與 [Undo]、[Redo] 一起。

Note:
Device: Samsung Galaxy S23 (SM-S9110) / Android 16
<Claude Reviewed>
```

**Images:** `20261125_eBug_drafts_AI-Removal-Reset_20.19.0_images/01_ISS-RMV-01/`

---

Filing order: **1**. Nothing is filed until the review page's decisions come back.
