# Casebook eBug rules — shared by ebug-draft-generator and ebug-tr-filer

Both eBug skills in this repo read this file before drafting or filing. These rules override anything in either
skill's body. Rule numbers are cited elsewhere (AGENTS.md: "rule 5 of the eBug overlays"); keep them stable.

## Reviewer rules (user, 2026-10-21, from the eBug reviewers) — every entry, every batch

1. **One action per Repro step.** Each numbered step is one tap, one typed entry, one swipe or one wait. No `>` /
   `›` chains: 「Mine > Credits > Details」 is three steps (Tap Mine · Tap Credits · Tap Details), and "Tap Filter,
   select Male and Indigenous, apply" is four. `check_ebug_format.py` fails a step that contains `>` or `›`.
2. **A Spec Link on every entry**, to the spec used as the reference: the Figma URL with `node-id` — the frame or
   flow-arrow node that `requirements.md` gives for the requirement when it has one, otherwise the file URL from
   `library/<product>/<feature>/specs/<date>/spec-set.json` (`figma`) with the board title from `extracted/boards.json` /
   `board-notes.md`. Only when no URL exists: the PDF name + board ID. Entries resting on a QA rule (rule 7 text,
   rule 8 checks) cite the board that shows the screen or string they are about. The format check fails an entry
   with no `Spec Link:` line, `Spec Link: none`, or a link with neither a URL nor a PDF name.
   The URL goes alone on the line under its label (`Spec Link: <source>, <board> board (<what>) -`, then the URL;
   user, 2026-11-11); the check fails a URL on the Spec Link line itself.
3. **Attachments on every entry:** at least one image (red-boxed frame) per bug, cited inline as `{<ver>_<slug>.jpg}`;
   plus the relevant log excerpt (`<ver>_<slug>_log.txt`) when the finding has a log cause. **Every failure-related
   entry carries its log (user, 2026-10-27):** a failed generation, turn, upload or retry, an error card or dialog,
   a charge or a missing refund, a step that ends with nothing — attach the excerpt of that failure's time window
   (the failing tool line, `status=…` / `error=…`, the `authorized, credit=N` and refund lines) even when the screen
   already shows the error, cite it inline under Result, and show it on the review page card (a 「Log」 section with
   the excerpt text) so the reviewer sees it before deciding (a 10/27 batch attached a log the page then hid). Scan
   each excerpt for tokens, `Bearer`/`authorization` lines and signed URL queries before staging it. Layout and
   content findings need no log. **No video unless the user explicitly asks for one** for that batch or entry (then
   pass `--videos-requested` to the format check); keep recordings in the run folder. The format check fails an
   entry with no image reference and any video attachment without that flag.
4. **Filing account memory.** Review pages prefill Creator, TRCode, source tag and method from the newest
   `filed_bugcodes.json` under the feature's `ebugs/` folders (`meta.creator`, `meta.tr`, the tag of the filed Short
   Descriptions, `meta.method`) — `node scripts/ebug-defaults.ts <feature> <platform>` prints them (`--json` for
   generators) — shown as 「from <batch> — confirm」, never blank. In a user's decisions, "Same build" / "Same TR"
   means that previous batch's TR when the build matches: read the TR header (`ecl_query.py tr <TR>`) and confirm it
   still names the build the findings were verified on before filing; if not, stop and ask.
5. **No `[UX]` on casebook findings (RD, 2026-10-21 — in force until the user reverts it).** The casebook tests
   against the spec, so every finding is `[AIAgent]` (Functional) or `[AIAgent][UI]`, owner RD (text: RD when the spec states it and the app differs, PM when the spec's own text must change; a translation problem, i.e. the wording of a translated string, is PC-Doc, never PM (user, 2026-11-26); user, 2026-11-11, `ebug-draft-generator` › Owner) —
   interaction and flow problems included; RD forwards one to PM when it wants a ruling. A plainly visible defect whose
   exact expected wording is only a proposal or open question is filed, not held, and an open question the run
   cannot settle (an undecided string, a proposal the app differs from) is filed to PM (BugBelong PM) for a
   decision rather than held (user, 2026-11-11, spec-casebook `ebugs.md` step 1). **A problem filed only to PM for a
   decision that is a user-experience problem (how a flow feels or behaves, not wrong text or a broken function) is
   `[AIAgent][UX]`, BugBelong PM (user, 2026-11-11)**: the drafts propose Type UX for it, and the reviewer's Type UX on
   the review page adds the tag. `check_ebug_format.py` fails `[AIAgent][UX]` owned by anyone but PM. This supersedes
   the 2026-10-20 rule "a UX problem goes to PM (BugBelong PM)" for RD-owned findings.
   **To revert** (back to `[AIAgent][UX]` with BugBelong PM): delete this rule 5 from this file (`.claude` and
   `.codex` copies), restore the 2026-10-20 wording of *eBug owner and type* in `AGENTS.md` (kept there under
   "Revert"), drop the UX line in the casebook skill's *eBug drafts and review page* step 1, and run
   `check_ebug_format.py --allow-agent-ux` and `ALLOW_AGENT_UX=1 verify_ebug_drafts.py`.
6. **No comments on existing tickets (user, 2026-10-21, until the user lifts it; a QR's own evidence files may be
   added to the bugs in that QR, `qa-report/SKILL.md` › *Evidence on each eBug*, REQ-099).** Never post a comment on, reopen
   or reject the fix of an existing eBug — not for rechecks, not for "still reproduces", not for fixed tickets. Only
   new tickets the user decided to file are created. Reading comments is fine; `ecl_if3.py comment` (the add-comment
   API) refuses unless `ALLOW_ECL_COMMENT=1`, which only the user lifting this rule allows.
7. **Dedupe per OS (user, 2026-10-28).** iOS and Android bugs are deduped separately: search only the tested OS's
   product (`PowerDirector Mobile for iOS` / `… for Android`). A ticket on the other OS never makes a finding a
   duplicate: the finding is a new entry for this OS (the other OS's BugCode may go in its Note). A finding that
   matches an existing ticket on the same OS's TRs is **not listed** — no card on the review page, no Rechecks
   section, no on-hold entry; it is kept only in the batch's `dedupe.txt` (finding, case IDs, matching BugCode) for
   traceability. Exception: a same-OS ticket that is **closed** while the bug is back does not hide the finding; it
   stays a new card that names the closed ticket as related. A cancelled, declined or closed match is judged by why
   it ended, from its comments, which `dedupe` prints (user, 2026-11-27; `references/dedupe.md` › *Ended tickets:
   read why*). The search covers the whole pool and every open
   ticket on the build's version is read against every entry (2026-11-19: Video Enhance Android R2 missed
   DRA262611P0113 / P0115 on a 90-of-182 search; `references/dedupe.md` › *Whole pool*).
8. **MUI bugs (user, 2026-11-24).** Findings of a table's MUI section (spec-casebook `references/mui.md` §4) carry
   `[AIAgent][MUI] <Feature>: …` when a translation is missing in every implemented language, else one tag per
   language, `[AIAgent][JPN][DEU] <Feature>: …`: missing translations of the same languages are one bug, truncation
   is one bug per language. No `[UI]` beside them; Class UI in the drafts. The language tags come from the
   translation sheet, else from the user, asked before the run, and live in `library/<product>/<feature>/mui.json`.
   Each entry has a `MUI: <translation|truncation> — <tags|all>` Note line and the sheet as Spec Link;
   `check_ebug_format.py --mui <mui.json>` enforces it. Owner: a missing, wrong or doubtful translation is BugBelong
   `PC-Doc`, never PM (user, 2026-11-26); truncation and layout stay RD.


## MyEdit and MyEdit Biz (user, 2026-11-25)

**Mandatory, every MyEdit / MyEdit Biz eBug (user, 2026-11-25: 「之後發 bug 前務必要套用 ebug-writing 跟 create-ebug 這兩個 skill」).**
These products' failures are drafted and filed **only** by the user's `ebug-writing` and `create-ebug` skills. They
replace this overlay's reviewer rules 1–3 and 5, AGENTS.md's PowerDirector eBug rules (text bugs `[UI]`, Spec Link
lines, owner/type rules) and any summary in this repo; where anything here differs, the skills win. No summary of
them is kept here on purpose: a summary drifted from the skills once (R1 Video Enhancer, 2026-11-25) and bugs were
filed with a wording bug tagged `[UI]` and Figma nodes without their images.

Before drafting, and again before filing, in every session and every subagent that writes or files a MyEdit bug:
1. Read in full, from disk: `ebug-writing/SKILL.md` and every file it names (`ebug-format-template.md`, the
   prompt snippet, lessons learned), and `create-ebug/SKILL.md` with `references/if3-tr-ebug.md`,
   `references/ebug-creation-sop.md`, `references/ui-comparison-image.md` and the scripts its final gate names. The
   installed copies in `~/.claude/skills/` are the same files (refreshed 2026-11-25); if they differ from the
   Contract Runner's `.codex/skills/`, the Contract Runner copy wins — say so and refresh the installed copy.
2. Follow their workflow, not the casebook's shortcut: Knowledge Center gate; Parent TR from the live IF3 TR query;
   build from `version.json`; Figma evidence **fetched** for every bug whose Expect Result has a Figma node (the PM
   board through `figma-pm`, the Design board through `figma-design`; "no saved image" is not "no design"), and the
   combined actual-left / spec-right comparison image for every UI bug; draft in the live form, one page at a time,
   and hand it to the user before Create unless the user asked in that turn to publish.
3. Run `create-ebug`'s `validate-ebug-form-contract.ts` on the live form before Create and on the saved detail after.
   `check_ebug_format.py --product MyEdit` is only an extra pre-check; its pass never stands in for the skills' gate.
4. The same applies to every place a draft is shown: the drafts file, the review page and the eBug section of run
   reports (`report.md`, `report.zh-Hant.md`, their HTML copy), user 2026-11-25. Brief every drafting, reporting or filing subagent with steps 1–3 word for word. Never edit an already-filed ticket without
   the user's explicit go-ahead for that ticket.

The casebook still dedupes (rule 7, per product: MyEdit and MyEdit Biz are separate pools), keeps no comments on
existing tickets (rule 6) and builds the review page.
