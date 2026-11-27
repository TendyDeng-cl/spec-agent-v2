# Batch Editing (Android) — eBug drafts, open questions for PM (Q-6, Q-9), PhotoDirector 20.19.0 build 90201900

**Source:** spec-casebook runs `library/phd/batch-editing/android/runs/2026-11-09-r1/` (R1, 2026-11-09/10, Samsung Galaxy S23 SM-S9110, Android 16) and `library/phd/batch-editing/android/runs/2026-11-11-r2/` (R2, 2026-11-11, Samsung Galaxy A53 5G SM-A5360, Android 15), both on PhotoDirector for Android 20.19.0 (90201900), Test Server, Premium through the debug switch. No device work for this batch. The Open questions flagged `to-file` in `question-status.json` (Q-6, Q-9) are settled here as `ebugs.md` step 1 asks (「No question is left open by a completed run」, user, 2026-11-25).

**Status:** nothing filed, uploaded or commented. Dedupe is read-only, Android pool only (dedupe per OS): see `dedupe.txt`.

**What is drafted:** 0 entries. The dedupe (2026-11-25) found both questions already with PM on open same-OS tickets, filed 2026-11-17 on TR261113-0038 (20.19.0 build 202611132003) from a batch that is not in this repo. A same-OS match gets no entry and no card (dedupe per OS, user, 2026-10-28): each question and its ticket codes are on one line of `dedupe.txt`, which is how the pages link them. The existing tickets are not commented on or changed.

Legend — Class: Functional / UI / UX · Severity: S1 critical and blocking only, S2 important, S3 moderate · Owner: RD / PM.

---

## Not drafted: needs a device check

None. Both questions are covered by existing same-OS tickets, so no entry is needed and no check is asked for.

For the record, had Q-6 needed an entry it could not have been drafted from this computer: the R1 run folder holds no `screenshots/` (tc049-p4.png, tc057-input.png, tc057-typed.png, tc057-ok2.png, tc058-typed.png and tc058-ok.png are named in results.csv only) and the R1 batch's images folder holds two log excerpts and no image. R2's `tc163-1-pencil.png` shows the 「Custom resolution」 dialog but neither the toast nor a 237 px value.

## Not raised (for the record)

- The Undo question (TC-062, TC-076; ISS-BEA-14 of `ebugs/2026-11-11-r2/`): an open same-OS ticket with the same Short Description is with PM; see `dedupe.txt`.
- The resize-limits question (TC-049, TC-057, TC-058): two open same-OS tickets are with PM, one for 237 x 237 accepted below Section 3's 238 px minimum and one for the out-of-range toast naming only the width; see `dedupe.txt`. Their bodies could not be read through `ecl_query.py` (the API returns no description), so whether they also name the 2560 px maximum against Section 3's 2730 (R1 O-5, O-7; TC-049's 「1075 x 1435」 for 1151 × 1535) is not confirmed: for the reviewer to check on the tickets.
- R1 O-11 / R2 O-1 (a no-change 「All」 makes an empty Undo step): folded into ISS-BEA-12 of the R2 batch, not part of either question.

## Reconciliation against the runs

| Step | Count |
|---|---|
| Open questions flagged `to-file` | 2 |
| Covered by an open same-OS ticket (left off, `dedupe.txt`) | −2 |
| Entries | 0 |

| Case | Run · Result | Where |
|---|---|---|
| TC-062 | R1 Fail question · R2 Fail question | not raised: same-OS ticket (`dedupe.txt`) |
| TC-076 | R1 Fail question · R2 Fail question | not raised: same-OS ticket (`dedupe.txt`) |
| TC-049 | R1 Fail question (not in R2) | not raised: same-OS tickets (`dedupe.txt`) |
| TC-057 | R1 Fail question (not in R2) | not raised: same-OS tickets (`dedupe.txt`) |
| TC-058 | R1 Fail question (not in R2) | not raised: same-OS tickets (`dedupe.txt`) |
