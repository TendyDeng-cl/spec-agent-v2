# AIGC Watermark (Android) — eBug drafts, open questions flagged `to-file` (Q-13), PDR-A 16.9.0 build 2611193

**Source:** the recorded runs of this table only, no phone used: `library/pdr/aigc-watermark/android/runs/2026-11-23-r3-full/` (round R3, table v3, 2026-11-23 15:44 → 20:14, Samsung SM-A5360 (Galaxy A53 5G) / Android 15, PowerDirector 16.9.0 build 2611193, Stage, cltqauiap2@gmail.com) and `runs/2026-11-23-r2-changed/` (O-19, same phone and build). Question list: `requirements.md` › Open questions; state: `question-status.json` (Q-13 `to-file`).

**Status:** nothing drafted, filed, uploaded or commented. **This batch is not closed: Q-13 stays `to-file` until the check below is recorded.** Dedupe: Android pool only (per OS, user 2026-10-28), no same-OS ticket covers Q-13 (`dedupe.txt`).

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay. Evidence rule for this batch: an entry states only what the run records show (results.csv, screenshots, logs) on the build the run names, with a real image from a run folder.

**What is drafted:** 0 entries. Q-13 is listed under *Not drafted* because the observation its Result needs was never recorded: no run read the Content Credentials of an editor export that holds signed AI content. No review page is built for a batch with no entry.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## Not drafted: needs a device check

### Q-13 — Should an editor export that holds signed AI content carry C2PA metadata, and can a timeline tool's generated asset be read as a file?

**What the run records show (2611193):**

- TC-123 – TC-127 are Blocked `observability` (not run by policy): a timeline tool's generated asset stays inside the project, so there is no file to read a manifest from.
- TC-065 (Text to Speech project, switch Off) and TC-071 (AI Anime project, switch Off) Pass: the 「AIGC Watermark」 dialog shows at 「Export」 and the produced file has the AI label at 0.0 s and 1.9 s, none at 2.1 s. Their Actual says nothing about the files' Content Credentials: the exports were not read with c2patool.
- The only editor exports whose Content Credentials were read hold no signed AI content: the photo + AI Music song project with the switch Off (R3 TC-061, R2 O-19): c2patool 「No claim found」, while libclc2pa.so was loaded at that export. A song is not treated as AI content on export (KF-005, DRA262611P0223), so this does not answer Q-13.

**Why no entry:** the Result of a Q-13 entry must say whether an editor export holding signed AI content (Text to Speech, AI Anime, Voice Changer, AI Cartoon, AI Sketch) carries a manifest on 2611193. No results row, observation, screenshot or log records that. Stating it from TC-061 would stretch the evidence to another kind of project.

**The check to run (no phone needed for the first part):**

1. Computer only, on the files R3 already saved in `runs/2026-11-23-r3-full/files/`: run `c2patool <file>` on `TC-065-tts-off.mp4` (Text to Speech, Off), `TC-071-anime-off.mp4` (AI Anime, Off) and `TC-081-anime-at5.mp4` (AI Anime from 0:05, Off); keep each output beside the file as `<name>.c2patool.json` / `.err`, as the saved-result rows do (e.g. `TC-021-itv-veo-off.c2patool.json`). Record for each: manifest or 「No claim found」, the signer, the `digitalSourceType`, ingredients, validation state. Record it as a recheck run (a new `runs/<date>-recheck-q13/` with results for TC-065 / TC-071 and a note), so the reading is a run record.
2. Phone, SM-A5360 on the build under test, only if the switch On side is wanted too: 「Menu」 › 「Settings」 › 「Remove AIGC Watermark」 On; open the Text to Speech project (「Project 11-23(5)」) and the AI Anime project (「Project 11-23(8)」); 「Export」 › 「Produce」; copy each file to the computer; `c2patool` on each. Capture: the editor timeline showing the AI clip, the Produce 「Saved to Gallery」 screen, and the c2patool output.
3. The image for the entry: a red-boxed screenshot of the project that was exported (e.g. `screenshots/TC-071-dialog.png` or `TC-081-project.png` from R3, which exist on this computer) plus the c2patool output as the text attachment.

**Then one of two outcomes (ebugs.md step 1):** if the reading shows what the app does and that settles the first half, Q-13 is `determined` in `question-status.json` (the device answers for its own app), and only what stays undecided goes to PM; else the PM entry is drafted: `PDR-A 16.9.0 - [AIAgent] Export: …`, Class Functional (metadata behaviour, not text or a user-experience problem), BugBelong PM, Result = the reading, Expect = PM to decide whether an editor export holding signed AI content carries a CyberLink manifest and how timeline-tool assets (R-053) are to be verified, Note naming `Q-13`, Spec Link the PM spec's pm-rules board (https://www.figma.com/design/IgV9rMxI8bmutyVmQX1kUm/Remove-AIGC-Watermark?node-id=0-1) and Jira PDRA-649.

> **Not a run record — for whoever runs the check.** While preparing this batch (2026-11-25) the saved files were read once on this computer with `c2patool` to see whether step 1 is possible; nothing was written to the run folder. All three carry one manifest: claim generator 「PowerDirector Mobile for Android」 16.9.0 (com.cyberlink.clc2pa 1.0), issuer CyberLink, one `c2pa.created` action with `digitalSourceType` compositeWithTrainedAlgorithmicMedia, no ingredient, validation Valid (signingCredential.untrusted only). `TC-083-i2v-fulleditor-off.mp4` reads the same; `TC-069-vc-on.mp4` (Effect voice 「Radio 1」, switch On) and `TC-061-music-project-off.mp4` give 「No claim found」. If the recorded recheck confirms it, the first half of Q-13 looks determined by the device (the export is signed like a saved result, R-050 / R-056) rather than a question for PM; the second half (reading a timeline tool's own asset, TC-123 – TC-127) stays not testable.

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| ⏳ Q-13 | Editor export with signed AI content: C2PA metadata; timeline-tool asset as a file | Held, not excluded: no recorded Content Credentials read of such an export. Needs the check above, then determined or filed. |

## Reconciliation against the question list

Questions flagged `to-file` in `question-status.json`: 1 (Q-13).

| Step | Count | Running total |
|---|---|---|
| Questions flagged `to-file` | 1 | 1 |
| → held: observation never recorded (Q-13) | −1 | **0 entries** |

| Item | State | Became |
|---|---|---|
| Q-13 | to-file | not drafted: needs a device check (above); stays `to-file` |
| TC-123, TC-124, TC-125, TC-126, TC-127 | Blocked, observability | not raised (no verdict; parked behind Q-13) |
| TC-065, TC-071 | Pass | not raised (label and dialog rows; their exports are the files to read) |
| TC-061, R2 O-19 | Fail defect (DRA262611P0223) / observation | not raised here: another finding, already filed; not evidence for Q-13 |
