# Video Enhancer V2 (web) — R1 full run report

Run `library/myedit/video-enhancer/web/runs/2026-11-25-r1-full/`, plan `runs/RUN-PLAN-20261125-R1.md`, approved table v1
(141 rows, draft 20261125-105747). MyEdit demo (https://demo.myedit.online), build **MyEdit-5.11.0-11242029** (version.json,
`build-info.json`; no redeploy seen). Chrome on Windows 11, 1440 × 900 (mobile rows 375 × 812 by a viewport override).
Accounts: default (Studio Pro, port 9333), free (port 9341), storage-full (Free, 5 GB / 5 GB, port 9343), a throw-away
signed-out profile (port 9350). 2026-11-25 14:22 – 17:38 (+08). Nothing filed.

## Tally

| Result | Rows |
|---|---|
| Pass | 114 (TC-020 retest included) |
| Fail | 22 (19 defect, 3 question) |
| Blocked | 5 (TC-018, 024, 026, 099, 114: the user chose not to test them this round) |
| Total | 141 |

**The 3 question rows, follow-up (2026-11-26):** all three are settled, none is open any more.

| Row | What the run saw | Outcome |
|---|---|---|
| TC-085 | Replace with a 3:00 clip in Professional opens Trim Video at once; no red text, Enhance not disabled | Against the PM spec and Figma (red text, Enhance disabled); filed to RD: MYE261124P0033 (ISS-VEW-14; first filed to PM, corrected 2026-11-26) |
| TC-101 | At phone width the upload shows a full-page 「Processing...」; the settings summary and Enhance are not on screen, not dimmed | The Knowledge Center confirms the spec wants them dimmed; filed to RD: MYE261124P0030 (ISS-VEW-09) |
| TC-147 | Storage-full Free account shows Generate Anyway and Upgrade, no Manage | The Knowledge Center says Upgrade shows while a higher plan exists, so the site is right; not filed; the row's Expect is fixed in the next table version |

## Segments

| Segment | Rows | Pass / Fail / Blocked | Test time | Credits |
|---|---|---|---|---|
| R1-a Entries, SEO page and upload, input limits | 26 | 13 / 9 / 4 | 0h 26m | 0 |
| R1-b Settings panel, price, Professional length | 21 | 19 / 2 / 0 | 0h 27m | 0 |
| R1-c Price, every combination | 40 | 40 / 0 / 0 | 0h 15m | 0 |
| R1-d Generate, My Library, emails, other tools, KC rules | 21 | 15 / 4 / 2 | 1h 05m | 399 |
| R1-e Mobile web and Video Restoration | 9 | 7 / 2 / 0 | 0h 18m | 32 |
| R1-f Product rules, default account | 19 | 15 / 4 / 0 | 0h 33m | 78 |
| R1-g Other accounts | 5 (+ TC-117 recheck) | 4 / 1 / 0 | 0h 10m | 16 |
| **Total** | **141** | **114 / 22 / 5** (after the TC-020 retest) | **3h 15m** (wall 3h 15m, no idle gap over 15 min) | **525** |

Credits (stage2 ledger, Product MyEdit; the account menu where the ledger was not signed in): R1-d Video Enhancer
8 + 64 + 64 + 8 + 180 + 8 + 48 (Agent), Video Restoration 16, AI Agent requests 3; R1-e Video Enhancer 8, Video
Restoration 16 + 8; R1-f Video Enhancer 8 + 10 + 60; R1-g 8 on the storage-full account (4810 → 4802) and 8 for the
TC-117 recheck. The plan expected about 200: TC-120's 3:00 job (180) could not be cancelled (no Cancel, ISS-VEW-08),
and the TC-117 recheck needed one new job.

## Claude usage

- Tokens (`token-usage.ts --since 2026-11-25T06:20Z`, 9 transcripts of this project incl. segment subagents and this
  wrap-up up to the report): 813 messages; input 1,688, cache write 1,739,193, cache read 145,592,681, output 334,862
  (147.7 M processed).
- Usage card (`runs/usage.jsonl`, seat 1× Pro, shared account so an upper bound): 5-hour window 0 % → 43 %,
  weekly 57 % → 64 % from R1 start (14:20) to wrap-up start (17:38). Per segment (5-hour %): R1-a +7, R1-b +2, R1-c +3,
  R1-d +12, R1-e +5, R1-f +8, R1-g +6.

## Coverage page

Not built: `coverage-page.ts` needs `specs/2026-11-25/extracted/inventory.json`, and the inventory step (reading-the-spec
step 10) has not run for this Figma-only spec set (the Design file is not read either, Q-8). No control / arrow counts.

## Fails and eBug drafts

Batch `library/myedit/video-enhancer/web/ebugs/2026-11-25-r1/`: drafts
`20261125_eBug_drafts_Video-Enhancer-R1_5.11.0.md`, review page `20261125_eBug_review_Video-Enhancer-R1_5.11.0.html`,
per-ISS filing data `prepared-filing.json`. Redrafted again on 2026-11-25 19:30 by the user's `ebug-writing` and
`create-ebug` skills (Contract Runner copies, read in full); earlier versions are `….md.before-skills` and
`….md.old-rules`. **14 drafts: 3 filed tickets corrected and 2 left unchanged, 6 created, 1 held for a new conflict, 2 held by the
user**; 3 already filed on the TR before this run, 2 not raised. Filed and corrected in IF3 on 2026-11-25 19:31–19:38
(`filed_bugcodes.json`; per-ticket gate records in `filing-validation/`).

- Fields: Parent TR TR261022-0018 (IF3), Version 5.11.0, Build No 11242029 (demo `version.json` re-read 19:22, no
  drift), Bug Source QA, Reproduce Probability 3/3 by default (ISS-VEW-04 4/4, four attempts), Priority (RD) N/A,
  previous build Unknown. RD Must Fix; `[UX]` PM Better Fix. Text that differs from the spec is RD with no `[UI]`.
  Team tag from the MyEdit Web Kanban column E (FCS): Jenny for the V2 rows (`[JT]`, which MyEdit omits), Carrey
  `[CT]` for the Video Editor toast.
- Figma evidence: every Expect Result with a Figma node cites the exact node and carries that node's image, fetched
  through figma-pm (qa1) and cropped with a green box on the expected element (`figma-src/`). The UI entry ISS-VEW-09
  carries the combined actual/Figma comparison image. ISS-VEW-07, 08 and 15 rest on spec text only and ISS-VEW-16 on
  no source, so they carry no spec image.
- Attachments (closed list, in order): highlighted actual screenshots, then Figma images, then the comparison image
  (ISS-VEW-09) or the action recording (ISS-VEW-16).
- Knowledge Center gate: fresh issue-specific searches 19:20–19:24 (`mcp-checkpoints.md`). New conflict:
  **ISS-VEW-10 dropped** (user, 2026-11-26: not a bug), PM Figma board 9 draws the upload error dialog dark, as the app does. ISS-VEW-16 still has
  no rule; the user's go-ahead stands.
- Checks: `check_ebug_format.py --product MyEdit --version 5.11.0` 14 checked, 0 errors, 0 warnings (extra pre-check);
  `validate-ebug-form-contract.ts` passed on the live IF3 form before every Create or Save and on every saved detail
  after (`validationStage: persisted` with the BugCode), 9 of 9. Every new attachment was downloaded back from the
  ticket and matched the reviewed file by SHA-256.
- Corrections (MYE261124P0025, P0026, P0027): only the title, description and the added Figma images, in the planned
  order after the existing highlights; status (BugNeedReview), owner, severity, priority and counts untouched; no
  comments; existing attachments kept.

| Rows | Finding | eBug | Status |
|---|---|---|---|
| TC-002 | Home › Popular Tools: the Video Enhancer card has no 「Enhanced」 tag | ISS-VEW-01 | **not a bug** (user 2026-11-26; Knowledge Center features/video-enhancer-v2.md › 工具標籤, #ec5715b6ac73: the Launcher shows no Enhanced, only the top menu does); the table row is fixed in v2 |
| TC-010, TC-014, TC-016, TC-020 | From the SEO page, unsupported media (AVI, under 128 px, over 120 fps, unsupported audio) gets no error dialog | ISS-VEW-03 = MYE261124P0025 (RD, Must Fix, 3/3) | corrected: the user's title, exact Figma nodes, 3 Figma images added (7 files) |
| TC-011, TC-012, TC-019, TC-021 | SEO-page upload dialogs read 「Got It」, spec 「Got it」 | ISS-VEW-04 = MYE261124P0026 (RD, Must Fix, 4/4) | corrected: Figma node and image added, Expect shortened (4 files) |
| TC-088 | Continue Editing an 8:20 clip shows 「Video Too Long」 instead of the Trimmer | ISS-VEW-05 | **not a bug**: PM ruling 2026-11-26 (KC #1c76d4b60c73): from Video Trimmer, a clip over 8 min shows Video Too Long by design; table v2 changes TC-088 and adds TC-154 |
| TC-113 | Result-ready mail body differs from PM Figma 6 - EDM | ISS-VEW-06 = MYE261124P0027 (RD, Must Fix) | corrected: `[UI]` removed (wording bug), Repro split, Figma node and image added (2 files) |
| TC-117 | No 「This 60 fps video will export at 30 fps…」 toast in Video Editor | ISS-VEW-07 = MYE261124P0028 (RD, `[CT]`, Must Fix) | filed; already matches the skills, no edit |
| TC-120 | 「Creating Your Video」 has no Cancel although credits are taken before the upload | ISS-VEW-08 = MYE261124P0029 (PM, `[UX]`, Better Fix) | filed; already matches the skills, no edit |
| TC-101 | Phone width: 「Processing...」 covers the whole page | ISS-VEW-09 = MYE261124P0030 (RD, `[UI][Mobile]`, Must Fix) | created; highlight, Figma 457:3443, comparison image |
| TC-144 | 「Creating Your Video」 and 「Unsupported File Format」 are dark on the light tool page | ISS-VEW-10 (RD, `[UI]`, Must Fix) | **not filed**: user 2026-11-26 「這不是bug」 (PM Figma 9 draws the error dialog dark) |
| TC-012 | Over-1440p dialog body names 「(2560x1440)」, spec 「(1440p)」 | ISS-VEW-12 = MYE261124P0031 (RD, Must Fix) | created; highlight, Figma 237:1273 image |
| TC-021 | Standard Trimmer hint text differs from the spec | ISS-VEW-13 = MYE261124P0032 (RD, Must Fix) | created; highlight, Figma 359:1999 image |
| TC-085 | Replace over 2:30 in Professional opens the Trimmer (spec and Figma want the red text) | ISS-VEW-14 = MYE261124P0033 (RD, Must Fix; was PM `[UX]`, corrected 2026-11-26) | created; highlight, Figma 360:1789 image |
| TC-118 | Pricing › Compare All Plans › Video Tools lacks Video Enhancer | ISS-VEW-15 = MYE261124P0034 (RD, Must Fix) | created; highlight only (spec text, no spec image) |
| TC-136 | The preview keeps playing under 「Creating Your Video」 after Enhance | ISS-VEW-16 = MYE261124P0035 (RD, Must Fix) | created (user go-ahead); highlight + recording |
| TC-007, TC-107 | No Video Restoration in the left tool menu | already filed: MYE261106P0045 (NeedCodeReview) | not drafted |
| TC-150 | Video Enhancer and Video Restoration share one Launcher thumbnail | already filed: MYE261110P0023 (RDResolved, still seen on 11242029) | not drafted |
| TC-021 | SEO page: an 8:20 video gets 「Video Duration Limit Exceeded」 instead of the Trimmer | already filed: MYE261118P0008 (BuildResolved, still seen on 11242029) | not drafted |
| TC-138 | The SEO page has no 「Get Credits」 | not raised: KC says a credit tool's import page shows none | — |
| TC-147 | Storage-full prompt on a Free account offers Upgrade, not Manage | not raised: KC says Upgrade unless the account is Studio Pro | — |

## Blocked rows

| Row | Why |
|---|---|
| TC-018 | Fixture fx-nofps still reads as 1 fps (ffprobe 1/1), so 「Unable to Use This Video」 cannot be brought about; needs a file with no readable frame rate |
| TC-020 | Fixture fx-badaudio is Opus, which Chrome decodes; needs an audio codec the room rejects (ask RD: AC-3 or PCM in MP4?) |
| TC-024 | Drag and drop needs a real OS file drop; device-web sets the file input. Parked for a hand run |
| TC-026 | Needs the Trimmer to be unavailable; no switch on demo |
| TC-099 | No way to make a job fail on demo (no RD fault input, no policy-violating fixture) |
| TC-114 | Needs a failed job (TC-099) |

## Observations worth action

- **O-1** The HD Video Converter SEO upload box reads 「Maximum file duration: 30 min」 / 「Maximum file size: 1.8 GB」 and
  AI Frame Interpolation 「3 min」 / 「1.8 GB」, though both open the new room (8 min / 10 GB). No row covers these two
  boxes: add rows (R-010 applies to all three entries) and file after a recheck.
- **O-2 / Q-1** Upload errors show at once on choosing the file (SEO page and room), while R-078 (the user's Q-1 answer)
  says after the upload and the spec still lists the timing as an open RD question. Decide which holds.
- **O-4** The room's over-limit paths follow the Knowledge Center's code-derived page, not the PM spec (ISS-VEW-05, H-4).
- **O-10** 720P from an 854×480 source comes out 1278×720, not 1280×720.
- **O-14** Mobile 「Processing...」 once read 100 % with the bar about 80 % full.
- **O-16** A hovered unselected option is barely darker than the selected one (both look selected); for the Design read (Q-8).
- **O-18 / O-23** Replace Video first opens the 「Allow Data Processing」 consent dialog (not accepted by the run). A
  result made earlier reaches Video Editor only from the room it was made in (My Library's preview has no Open in
  Editor); Video Editor's project save got HTTP 429 twice.
- **O-19** With a video uploaded but no job yet, Recent Gen still reads 「Start by uploading a video…」 (R-042 says that
  text is for before any upload). Judged Pass.
- **O-24** Signed out, Enhance shows no price while the line under it still prices the job.
- **Run tooling** (O-7, O-11, O-13, O-17, O-21): Chrome's DevTools port dropped twice during 5:12 uploads; `device-web`
  `viewport` (narrow emulation), `download`, `throttle` and `reload --dialog` commands would replace the throw-away
  scratchpad helpers. O-9 / O-23: another session used the port-9333 Chrome (a business-demo tab, a window resize) —
  keep runs on a Chrome no one else drives.

## Table fixes the run found (next Save)

- TC-042 – TC-051 (and TC-083): at 1 credit/sec the app says 「(1 credit/sec)」; the rows expect 「1 credits/sec」 (O-8).
- TC-096: Recent Gen exists only after an upload; the Free-account precondition needs an uploaded video first.
- TC-018, TC-020: replace the fixtures (above); fixtures.md.
- TC-138: Get Credits only in the room (KC), or ask PM whether the SEO page should have it.
- TC-147 / R-104: Upgrade on a Free (or non-Studio-Pro) storage-full account; Manage needs a full Studio Pro account.
- TC-117: the route is the result preview's 「Open in Editor」 (R-073 is no longer only code-derived); un-hold the R-048 /
  R-073 rows (TC-098, TC-123, TC-124) if the user agrees.
- TC-101 / R-049: rows run in a narrow desktop window, not a phone; say so in the precondition.
- Add rows for O-1 (HD Video Converter and AI Frame Interpolation upload boxes).

## Still owed after this wrap-up

- The phase's knowledge pass (run.md): a fresh subagent to process this run's observations per the domain-knowledge
  skill (the inbox is empty, but O-4, O-22 and the not-raised TC-138 / TC-147 name KP-038, KP-065 and the Knowledge
  Center's code-derived pages).
- ISS-VEW-10 is not a bug (user, 2026-11-26); not filed. Everything
  else in `prepared-filing.json` was filed or corrected on 2026-11-25 (see *Fails and eBug drafts*).
