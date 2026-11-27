# Deduping and calibrating

Part of the `ebug-tr-filer` skill (read `SKILL.md` and `references/casebook-overlay.md` first). Run before any review page (hard precondition 5).

### Dedupe by API — do this first

`TSR.EbugSearch` returns `ShortDescription` for **every** eBug in scope, new IF3 and old ASP alike
(common fields are the one thing the API covers for old tickets). That is ~242,000 bugs, versus
whatever a hand-exported CSV happens to hold. Search per product, and match on feature name and
symptom words rather than on the whole string — the same defect is rarely worded the same twice:

```json
{ "queryModel": "TSR.EbugSearch", "pageIndex": 1, "pageSize": 200, "sortBy": "CreateTime",
  "conditions": [ { "field": "ProductName", "term": { "query": "PowerDirector" } },
                  { "field": "ShortDescription", "match": { "query": "Auto Captions" } } ] }
```

Record what you searched for and what you found **on the review page**, per finding. "No duplicate"
is a claim the reviewer should be able to check.

If you cannot search — no token, API down, user declines — say so explicitly on the review page and
in `filed_bugcodes.md`. Filing undeduped is the user's call to make knowingly, not a silent default.

### Reading the eBug export (fallback, and the only way to calibrate)

The `.xls` is an **HTML table**, not a spreadsheet. Rows are `<tr style=...>`, so a naive
`<tr>` split finds nothing:

```python
parts = re.split(r'<tr[^>]*>', raw, flags=re.I)[1:]
cells = re.findall(r'<td[^>]*>(.*?)</td>', row, re.S|re.I)
```

Use it to calibrate, not just to dedupe. Real distributions beat guesses — in the September 2026
export of 175 bugs: **Severity was 2 (103) / 3 (71) / 4 (1)**, so proposing sev 4 is nearly always
wrong; **BugBelong** was PM / RD / PC-Doc / PC-Art (never a bare "Doc"); **Priority** was almost
always N/A. Re-derive these from the current export rather than trusting these numbers.


### Searching without burning context

The eCL MCP answers the same questions, but every row travels through the model
and costs tokens. `ecl_query.py` calls the same IF3 query endpoints directly, so a
search costs one HTTP round trip and nothing else. **Prefer it to the MCP for dedupe,
calibration and batch look-ups**; keep the MCP for one-off questions mid-conversation.

```bash
./ecl_query.py bugs --text "AI Music Generator" --product "PowerDirector Mobile for iOS" --open-only
./ecl_query.py bug  DRI261883-0063 --log      # body, RD root cause, changeset, attachments, comments
./ecl_query.py comments DRA262611P0337        # why it was cancelled (IF3 bugs only)
./ecl_query.py tr   TR260915-0007             # the TR, its own bugs, and what is attached for verify
./ecl_query.py dedupe upload/bodies.json --product "PowerDirector Mobile for iOS"
./ecl_query.py calibrate --product "PowerDirector Mobile for iOS" --since 2026-08-01
```

`calibrate` **replaces the `EbugDownloadCSV.xls` export** for the Severity distribution —
it is live, so it cannot go stale. Run it before proposing severities and put the result
on the review page.

`dedupe` takes the same `bodies.json` as the format check and ranks candidates by word
overlap. It does not decide — the same defect is rarely worded the same way twice — but
on the September batch it found all 10 already-filed bugs at 100%.

Word overlap alone misses rewordings. On 2026-10-19, DRI261896P0059 ("More ideas + chip is
missing above the input…") was filed although DRI261893-0057 ("Does not display "More ideas +"
button…") was in the candidate pool: overlap was 2/9 = 22%, under the 34% cut. So `dedupe`
also **always flags (`!`)** a candidate that shares a quoted UI label with the new entry,
in either direction (only one writer may have quoted it), and one that shares a rare
adjacent word pair such as "more ideas" (carried by ≤ 2% of candidates, `--phrase-share`).
Quoted labels are searched on their own as well, so a label filed under another feature
name is still found. Read every `!` candidate.

**Whole pool, and every open ticket read (2026-11-19).** The Video Enhance Android R2 batch was deduped
against 90 candidates while the Android pool held 182: the feature term was the Short Description's
feature name 「AI Video Enhance」, and `match` is a substring match, so every ticket titled 「Video Enhance: …」
or 「Video Enhancer: …」 was never fetched. Two open tickets that *were* fetched still ranked under the cut
(「1 fps video opens with no fps chip selected」 vs DRA262611P0115 「A 1fps source has no selectable output
frame rate」: 0 %; the trim-lag draft vs DRA262611P0113 「Clarification: allowed Preview delay while
trimming」), so both were drafted again. `dedupe` now (1) also searches the feature name without a leading
「AI」 (`terms=[…]` on each entry's line), (2) reads up to 2000 candidates per term and warns when a term hits
`--limit`, and (3) ends with 「Open in the pool on <version>」: every open candidate on the batch's own
version. Read that list against every entry; the ranking only orders it.

Candidates RD/PM already declined — NAB, ProposeNAB, Won't Fix and its Propose variants,
Not Reproducible — print as **REJECTED** with a warning. Filing the same thing again
re-raises that decision. Read its status log; refile only with new grounds (a newer spec
board, a different repro) and cite the rejected bug in the Note. Otherwise drop the entry.

### Ended tickets: read why (user, 2026-11-27)

A candidate that is **cancelled, declined (NAB, Won't Fix, Not Reproducible, their Propose steps) or closed** is
judged by *why* it ended, not by its status word. `dedupe` reads the comments of every ended IF3 candidate it shows
in one batched `TSR.EbugComments` call and prints, under the candidate, a reason hint, what that reason means for
the finding (▸), the last three comments, and every bug code a comment names (→, with its status). `--no-comments`
skips it; `ecl_query.py comments <codes…>` reads them on their own, and `bug` shows them too. Old ASP tickets have
no comment API: read `bug <code> --log`.

The hint is a regex on the comments; read the comments and decide:

| Why it ended (from the comments) | The finding |
|---|---|
| Filed wrongly (wrong pool / template / TR / OS), refiled | No ruling. Judge against the refiled ticket (→); none → as if no match |
| Duplicate of another ticket | Judge against that ticket (→) |
| A ruling: by design, spec, PM decision | Dropped (`dedupe.txt` with the reason), unless today's spec or a newer PM / Design item contradicts it: then a card citing the ticket and the newer source |
| Fixed (app, server, CMS data), or Not reproducible | A card only if it reproduces on this build, naming the ticket as related ("closed and back", overlay rule 7) |
| No comment, or a bare 「Cancel」 / 「NAB」 | Read the status log (`bug <code> --log`); still unclear → a card naming the ticket, 「reason not recorded」, for the reviewer to decide |

Put the reason on the card's related line (`review.json` › `related`) or on the finding's `dedupe.txt` line, with
the comment's author and date, so the reviewer can check it. Example: DRA262611P0337 「wrong pool」 (cancelled, refiled
as P0340) is a match through P0340, not a ruling; VDE261031P0006 was cancelled because the server refunds the credits
after 2–3 hours, so the same symptom is a card only if credits stay charged past that.

**Two things about the query DSL, both verified live on 2026-09-16:**

- **`match` is a substring/phrase match, not bag-of-words.** `"Video Enhance toast"` matches;
  `"grammatically inspiration"` matches nothing, because those words are not adjacent. To
  search on loose keywords, issue **one query per word and union the results** — which is
  what `dedupe` does when a Short Description has no feature name.
- **REST queries reach every model MCP exposes, and more.** `TSR.SP.GetOldEbugData`,
  `TSR.eBugByTR`, `TSR.AttachedEBug` and `TSR.EbugTags` all work over REST even though the
  guide's chapter 3 does not list them, *plus* the REST-only `TSR.ProjectTemplate` and
  `TSR.EbugLogAndData`. There is nothing the MCP can read that a script cannot.

⚠ **REST query tokens have no permission filtering** (guide 3-5) — unlike the MCP, which
filters by your ECL account. A script sees every ticket in scope, including ones you could
not open in the web UI. Treat its output as confidential and do not bulk-export it.
| `references/if3_api.md` | full IF3 API field tables, error shapes, query DSL, credential handling |
