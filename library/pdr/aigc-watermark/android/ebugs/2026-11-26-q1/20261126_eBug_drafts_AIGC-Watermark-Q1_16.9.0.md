# AIGC Watermark (Android) — eBug drafts, question round Q1, PDR-A 16.9.0 build 2611231

**Source:** pdr-spec-casebook run `library/pdr/aigc-watermark/android/runs/2026-11-26-q1-questions/` — question round Q1 (TC-157 for Q-13, TC-158 for Q-19), 2026-11-26 10:54 → 11:06 (UTC+8) on Samsung SM-A5360 (Galaxy A53 5G) / adb R5CTB22S05Y, build 16.9.0 (2611231), Stage server, Free account (cltqauiap2@gmail.com; Mine shows 「Free」), 29801 credits before, 29731 after (70 on one Image to Video). Tally: 1 Pass, 1 Fail (`question`).

**Status:** filed 2026-11-26 on TR261123-0070 over the API: ISS-AWA-19 → DRA262611P0322. See `filed_bugcodes.md`. No existing ticket commented on.

Filed by: ETHAN_HSU on 2026-11-26

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay (one action per Repro step, a Spec Link with its URL on its own line, an image on every entry, no video). The entry is an open question filed to PM for a decision on metadata behaviour (not text, not a user-experience problem), so it is `[AIAgent]` Functional, BugBelong PM. Nothing failed, so no log is attached; the c2patool readings are the evidence (picture and JSON in the run folder's `files/`).

**What is drafted:** 1 entry (Q-13: TC-157, with the switch On export of TC-158 as a second reading). Q-19 is determined by the device (TC-083 + TC-158) and is not filed.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## 1. ISS-AWA-19 — Editor exports with AI content carry a CyberLink C2PA manifest marking the whole video as AI, also with the switch On  ·  Class: Functional  ·  Severity: S3  ·  Owner: PM

**Report step:** TC-157  ·  **Reproduce:** 4/4  ·  **Verified on:** 16.9.0.2611193 (TC-065, TC-066, TC-071 exports), 16.9.0.2611231 (TC-158 export)

> **QA note — not pasted into eBug.** Open question filed to PM for a decision (Q-13). The PM spec (pm-rules, 「Timeline with Text-2-Speech, Voice Changer, AI Anime, AI Cartoon, AI Sketch AI content」) speaks only of the visible icon watermark on Export / Share; Jira PDRIOS-722 says the switch controls only the visible watermark and metadata is not affected by it, and R-050 / R-056 (REQ-007 / REQ-008, RD rulings on DRA262611P0220 / P0221) cover saved AI results, not editor exports. Nothing says whether an editor export that holds AI content carries a manifest, or what it should say. On the device every such export read so far carries one CyberLink manifest: one `c2pa.created` action with digitalSourceType compositeWithTrainedAlgorithmicMedia, no ingredient, validation Valid (signingCredential.untrusted only: the CyberLink certificate is not on c2patool's trust list). Files: TC-065 (AI Text to Speech project, switch Off), TC-071 (AI Anime project, switch Off), TC-066 (the TC-065 project exported with the switch On; same manifest, only IDs and hash differ), TC-158 (an Image to Video result opened with Full Editor, switch On). For contrast, KF-008: a photo + AI Music song project exported Off has no claim (a song is not treated as AI content, DRA262611P0223), so the manifest follows the AI content on the timeline. The switch On keeping the manifest agrees with the Jira line, so it is a point to confirm, not a defect. The timeline tool's own asset still cannot be read as a file (TC-123 – TC-127, R-053), asked in the Expect. No log: nothing failed (libclc2pa.so loads at the export, 11:01:19).

**Short Description:**

```
PDR-A 16.9.0 - [AIAgent] Export: Projects with AI content export with a C2PA manifest marking the whole video as AI
```

**Description:**

```
Repro Steps:
1. Launch the APP
2. Tap the Menu icon on the Launcher
3. Tap 「Settings」
4. Turn 「Remove AIGC Watermark」 Off
5. Tap Back
6. Tap 「New Project」
7. Add a non-AI video clip
8. Add AI Text to Speech content to the project
9. Tap 「Export」
10. Tap 「Export」 in the 「AIGC Watermark」 dialog
11. Tap 「Produce」
12. Copy the produced file to a computer
13. Read the file with c2patool
14. Tap the Menu icon on the Launcher
15. Tap 「Settings」
16. Turn 「Remove AIGC Watermark」 On
17. Tap Back
18. Open the same project from 「Project」
19. Tap 「Export」
20. Tap 「Produce」
21. Copy the second file to the computer
22. Read the second file with c2patool

Result:
Both files carry a CyberLink C2PA manifest marking the whole video as AI (no ingredient), also with the switch On.
摘要：兩個輸出檔都帶 CyberLink C2PA 資訊，整支標為 AI 合成；開關開啟也一樣。
{16.9.0_awa19_c2patool_readings.jpg} {16.9.0_awa19_tts_on_saved.jpg}

Expect Result:
PM to decide whether an editor export with AI content carries a C2PA manifest, and what it states.
摘要：請 PM 決定含 AI 內容的專案輸出是否帶 C2PA 資訊及其內容。

Note:
Device: Samsung SM-A5360 (Galaxy A53 5G) / Android
Basis: In-product — the PM pm-rules board and Jira PDRIOS-722 set the visible watermark of an export but not its C2PA metadata. To decide: manifest or none; the whole video as compositeWithTrainedAlgorithmicMedia or the AI assets as ingredients; that it stays with the switch On (Jira: the switch controls only the visible watermark); how the timeline tools' own assets are checked as 「signed」 when they are never saved as files.
Related: manifest read: one c2pa.created action, digitalSourceType compositeWithTrainedAlgorithmicMedia, no ingredient, signer CyberLink; the switch On export differs only in its IDs and hash. An AI Anime project and an Image to Video result opened with 「Full Editor」 (switch On) export the same way.
Related: open question Q-13; saved AI results carry the same CyberLink manifest by ruling (DRA262611P0220, DRA262611P0221); a photo + AI Music song project exports with no manifest (DRA262611P0223).
Spec Link: Remove AIGC Watermark PM spec, pm-rules board (Timeline with Text-2-Speech, Voice Changer, AI Anime, AI Cartoon, AI Sketch AI content) -
https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1
Spec Link: Jira PDRIOS-722 (the switch controls only the visible watermark; meta data) -
https://cyberlinkcorp.atlassian.net/browse/PDRIOS-722
<Claude Reviewed>
```

**Images:** `20261126_eBug_drafts_AIGC-Watermark-Q1_16.9.0_images/01_ISS-AWA-19/`

---

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| TC-158 / Q-19 | Image to Video result (never saved) opened with 「Full Editor」, switch On: no AI label in the preview or in the export at 0.0 / 1.9 / 2.1 s, no AIGC dialog | Pass. With TC-083 (R3, switch Off: one label at 0.0 / 1.9 s, none at 2.1 s) the export follows the switch, as assumed: Q-19 determined, nothing to file. |

## Reconciliation

| Item | Result | Became |
|---|---|---|
| TC-157 | Fail (question), Q-13 | ISS-AWA-19 |
| TC-158 | Pass, Q-19 | not raised (Q-19 determined); its c2patool reading is a second file in ISS-AWA-19 |

1 failed row + 1 passed row → 1 entry.
