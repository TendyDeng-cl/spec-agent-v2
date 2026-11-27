# Cinematic Reel Recommendation — photo tips (Android) — eBug drafts, open questions flagged `to-file` (Q-4), PDR-A 16.9.0 build 2611201

**Source:** the recorded run of this table only, no phone used: `library/pdr/cinematic-reel-recommendation/android/runs/2026-11-24-r1-full/` (round R1, table v1, 2026-11-24 11:03 → 11:50 (UTC+8), Sony XQ-BT52 (Xperia 10 III) / Android 12, build 16.9.0 (2611201), TR261123-0015, Stage, acda.test7 (Free)). Question list: `requirements.md` › Open questions; state: `question-status.json` (Q-4 `to-file`).

**Status:** nothing drafted, filed, uploaded or commented. **This batch is not closed: Q-4 stays `to-file` until the check below is recorded.** Dedupe: Android pool only (per OS, user 2026-10-28), no same-OS ticket covers Q-4 (`dedupe.txt`).

Rules: spec-casebook `ebugs.md` step 1 (「Open questions are filed to PM」, 「No question is left open by a completed run」) and the casebook overlay. Evidence rule for this batch: an entry states only what the run records show (results.csv, screenshots, logs) on the build the run names, with a real image from a run folder.

**What is drafted:** 0 entries. Q-4 is listed under *Not drafted*: the missing-data state was never opened in a run, and R1's screenshots are not on this computer (the run folder holds text only), so no real image exists either. No review page is built for a batch with no entry.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate, S4 minor · Owner: RD or PM.

---

## Not drafted: needs a device check

### Q-4 — Missing data: what shows when a template has no recommend_samples in the CMS, or the CMS cannot be reached (offline)?

**What the run records show (2611201):**

- TC-001 – TC-006 Pass: each of the six templates shows the 「View photo tips」 chip and its CMS items on the sheet. Every recorded state is the one with data.
- TC-019 Blocked `observability`: the app logs no CMS `recommend_samples` / template data and its files are not readable over adb.
- No row, observation or log line covers the template page or the sheet with the phone offline, and no template without `recommend_samples` exists on Stage for QA to open. The table has no row for missing data (「no row until PM answers」).

**Why no entry:** the Result of a Q-4 entry must say what the app shows when the data is missing. Nothing recorded shows it, and there is no screenshot of any state of this run on this computer to attach.

**The check to run (Sony XQ-BT52, build under test, Stage, acda.test7; Wi-Fi may be toggled once the phone is on USB):**

1. Offline, cold: force-stop PowerDirector; turn Wi-Fi and mobile data off; launch the app; tap 「Cinematic Reel Creator」 on the Launcher. Capture screenshot + page source of what opens (template page, empty state, error dialog or toast) and whether each card shows the 「View photo tips」 chip.
2. If a card with the chip shows: tap 「View photo tips」. Capture the sheet (items, placeholders, empty rows, spinner or error) with its page source; tap 「Got it」.
3. Offline, warm (cached data): turn the network on; open 「Cinematic Reel Creator」; open one sheet (Micro Cinema) so the data is loaded; press Home; turn the network off; reopen the app; tap 「View photo tips」 on the same card and on a card not opened before. Capture both sheets.
4. Restore Wi-Fi; pull the log and slice the window of steps 1–3 (any CMS / template request failure line).
5. The no-`recommend_samples` half cannot be set up by QA (server data): it goes into the PM entry as a question with no Result of its own, or needs a Stage template with the field emptied by whoever owns the CMS.

**Then one of two outcomes (ebugs.md step 1):** if the offline behaviour is plainly reasonable and the spec's silence does not matter, Q-4's offline half is `determined` in `question-status.json`; else, and for the no-data half, the PM entry is drafted: `PDR-A 16.9.0 - [AIAgent][UX] Cinematic Reel Creator: …` (a user-experience decision on what to show with no data; BugBelong PM), Result = what steps 1–3 showed, Expect = PM to decide what the chip and the sheet show when a template has no `recommend_samples` or the CMS cannot be reached, Note naming `Q-4`, Spec Links: Jira PDRA-661 (https://cyberlinkcorp.atlassian.net/browse/PDRA-661, 「from CMS」) and the Design's 0820 add photo tips board (https://www.figma.com/design/w2cTi3WTU9vGDE3laY1H1t/Cinematic-Reel-Creator--CineStory-?node-id=1106-5162).

## Not raised (for the record)

| Item | What | Why |
|---|---|---|
| ⏳ Q-4 | Missing data: no recommend_samples, or the CMS unreachable (offline) | Held, not excluded: the state was never opened and no image exists. Needs the check above, then determined or filed. |

## Reconciliation against the question list

Questions flagged `to-file` in `question-status.json`: 1 (Q-4).

| Step | Count | Running total |
|---|---|---|
| Questions flagged `to-file` | 1 | 1 |
| → held: observation never recorded, no image (Q-4) | −1 | **0 entries** |

| Item | State | Became |
|---|---|---|
| Q-4 | to-file | not drafted: needs a device check (above); stays `to-file` |
| TC-001 – TC-006 | Pass | not raised (the state with data) |
| TC-019 | Blocked, observability | not raised (no verdict; needs cms-log) |
