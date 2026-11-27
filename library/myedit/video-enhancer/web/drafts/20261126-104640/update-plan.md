# Update plan — myedit/video-enhancer / web: approved v1 → draft 20261126-104640

Request REQ-008 (user, 2026-11-26, 「改下一版表格」): apply the table fixes the R1 run found
(`runs/2026-11-25-r1-full/report.md` › Table fixes, Blocked rows, observations O-1, O-8, O-13, O-18, O-19, O-27, O-28;
eBug batch `ebugs/2026-11-25-r1/` › Not raised). 145 rows: unchanged 115, modified 26, new 4, removed 0. Also REQ-009 (user, 2026-11-26): no Enhanced tag on the Launcher card; REQ-010 (PM Erin Chiu via KC #1c76d4b60c73, 2026-11-26): Continue Editing from Video Trimmer over 8:00.

## Spec files
- Unchanged: Video Enhancer V2 - PM Figma 10-2.md (specs/2026-11-25, same spec set) · New or changed: none · No longer supplied: none.
- Standing inputs read again: request ledger (REQ-008 added), knowledge (`knowledge.md` regenerated: KP-038 and KP-065 now
  disputed, KF-001 – KF-007 added from the run), Knowledge Center (4 searches, `mcp-checkpoints.md`), the R1 run's
  findings and eBugs (MYE261124P0025 – P0035).

## Requirement changes
| Requirement | Change | Before | After |
|---|---|---|---|
| R-022 | entry pages do not block length (REQ-012) | an over-8:00 upload opens the Trimmer | the SEO / import page uploads it, the room opens, then the Trimmer (PM 2026-11-26) |
| R-037 / R-111 | Replace over 2:30 (REQ-012) | red text and Enhance disabled after Replace | Replace over 2:30 opens the Trimmer (max 2:30), Cancel keeps the old video; red text only when Professional is chosen with a video already over 2:30 (PM 2026-11-26) |
| R-062 | mail body (REQ-012) | 「Your enhanced video is ready! …」 | 「Your Video Enhancer has been generated successfully. …」 (Figma 2026-11-26) |
| R-008 | reversed for the Launcher (REQ-009) | 「Enhanced」 on the Launcher and in the top menu (#b29e724be991) | top menu only; the Launcher card has no Enhanced tag (#ec5715b6ac73, latest MX spec) |
| R-040 | narrowed (REQ-010) | every Continue Editing clip over 8:00 opens the Trimmer | tools other than Video Trimmer only |
| R-110 | new (REQ-010) | — | from Video Trimmer: 「Video Too Long」 in Video Trimmer, Start New opens a new Video Enhancer project, Cancel stays (#1c76d4b60c73) |
| R-030 | reworded | 「({rate} credits/sec)」 for every rate | singular 「(1 credit/sec)」 at a rate of 1 (O-8, Q-14) |
| R-042 | corrected | the text shows before any upload | the text shows with a video uploaded and no job yet; no Recent Gen before an upload (spec board 3 draws it on Default Settings) |
| R-049 | reworded | phone-width window | 375 × 812 held by a CDP override, a narrow desktop window, not a phone UA (O-13); header Platform line too |
| R-073 (held) | reworded | code-derived only | the result preview's 「Open in Editor」, seen on build 11242029 (O-18); still held |
| R-094 | changed | Get Credits on the SEO page and the room (KP-038) | Get Credits in the room; the import (SEO) page shows none (KC code-derived header page; Q-15) |
| R-104 | changed | storage-full prompt with Generate Anyway and Manage | below Studio Pro: Generate Anyway and Upgrade, no Manage (KC code-derived storage page; Q-16) |
| R-107 | new | — | HD Video Converter SEO upload box lists the V2 limits (O-1, Q-13) |
| R-108 | new | — | AI Frame Interpolation SEO upload box lists the V2 limits (O-1, Q-13) |
| R-109 | new | — | full Studio Pro account: Generate Anyway and Manage, Manage opens My Library (split from R-104) |

## Case changes
- Modified for REQ-012 (KC 2026-11-26): TC-021 (SEO page uploads 8:20, room then Trimmer), TC-085 (Replace 3:00 in Professional → Trimmer, Cancel, Trim to 2:30, no red text), TC-113 (new mail body). TC-153 fixture now available (studio-pro-full, filled 2026-11-26).
- New (4):
  - TC-154 (R-110) after TC-088: Video Trimmer › Continue Editing with 8:20 → 「Video Too Long」 in Video Trimmer, no Trimmer; Cancel stays, Start New opens a new Video Enhancer project.
  - TC-151 (R-107) after TC-003: HD Video Converter SEO upload box reads 8 min / 10 GB, no resolution line.
  - TC-152 (R-108) after TC-004: AI Frame Interpolation SEO upload box, same.
  - TC-153 (R-109) after TC-147: Manage on a storage-full Studio Pro account; parked, fixture missing.
- Modified (26):
  - TC-088: source is a video tool other than Video Trimmer (R-040 narrowed; Blocked as test-data if none is found).
  - TC-002: the Launcher card shows no 「Enhanced」 (and no 「New」) tag (REQ-009, #ec5715b6ac73); TC-001 keeps the top-menu Enhanced check. Searched every row for 「Enhanced」: only TC-001 and TC-002; TC-140 checks names only.
  - TC-042 – TC-051: second line 「Enhance 7.30 seconds (1 credit/sec)」 (was 「1 credits/sec」).
  - TC-083: adds 720P / Same as source to the precondition and checks 「Enhance 180.00 seconds (1 credit/sec)」.
  - TC-096: Free account, video uploaded first, then Recent Gen read.
  - TC-018: fixture is a file from RD with no readable frame rate (fx-nofps does not work); parked.
  - TC-020: fixture fx-ac3 (fx-badaudio's Opus is accepted); fx-flac24's SEO-page gap noted (MYE261124P0025).
  - TC-138: Get Credits checked in the room only; Notes name the KP-038 conflict.
  - TC-147: expects Generate Anyway and Upgrade, no Manage; no Manage step.
  - TC-117: route is the finished Recent Gen card's preview › 「Open in Editor」, the result made in the same visit; steps 3–5 add a second clip before switching (cites MYE261124P0028).
  - TC-101 – TC-105, TC-109: precondition says the narrow window is a CDP override, not a phone; TC-101 cites MYE261124P0030.
  - TC-085: Notes only: MYE261124P0033 to RD (corrected from PM, 2026-11-26); the row stays as it is.
- Removed (0).
- Unchanged: 115.

## Found by the analysis
- Run findings (standing input 5): O-1 → TC-151, TC-152; O-8 → TC-042 – TC-051, TC-083; O-13 → narrow-window preconditions;
  O-18 / TC-117 recheck → TC-117; O-19 / TC-096 → R-042; O-27 / O-28 → TC-020, TC-018 fixtures; TC-138 / TC-147 not-raised
  items → R-094, R-104, R-109.
- Pass 10 variants: R-104 now states two account tiers → `### Variants` grid (Free TC-147 / TC-148, Studio Pro TC-153).
- REQ-013 (user, 2026-11-26): TC-018 removed; TC-088 from Video Merger.
- REQ-015 (user, 2026-11-26): TC-024, TC-026, TC-099, TC-114 removed (R1 Blocked rows, not tested); R-023, R-063, R-081 not testable.
- REQ-014 (user, 2026-11-26): R-078 relaxed, the upload-error rows check the dialog and no import, not the moment.
- `phases.json`: round R2 holds the 27 new and modified rows (R2-a, R2-b); `unavailable` parks TC-018 (unreadable-fps-file)
  and TC-153 (storage-full-studio-pro-account).
- `fixtures.md`: CDP override for the narrow rows, TC-096 uploads first, fx-ac3 / fx-flac24, the missing TC-018 file and
  the missing storage-full Studio Pro account, TC-117's credits.

## Not added (value check)
- A row checking that the SEO page has no Get Credits: rests only on the code-derived header page (Q-15); TC-138 records
  the room only, and the SEO page is left to PM.
- O-2 / KF-002 (upload errors shown on choosing the file, SEO page and room take different paths): kept as R-078 (user's
  Q-1 answer) until you decide; see Questions for you.
- O-10 (720P from 854×480 comes out 1278×720), O-14 (100 % with the bar at 80 %), O-16 (hover shade), O-24 (signed-out
  Enhance shows no price): run observations with no spec rule; not table errors. O-10 / O-14 can go to PM if you want.
- TC-024, TC-026, TC-099, TC-114 (Blocked in R1): unchanged; their blockers are run limits (OS file drop, no fault switch),
  not table errors.
- TC-021 (SEO page over 8:00): the PM spec stands; MYE261118P0008 covers the site's behaviour. ISS-VEW-05 (Continue
  Editing from Video Trimmer shows 「Video Too Long」) is now the ruled behaviour (#1c76d4b60c73): no longer a bug.

## PM-only rows
- Unchanged: every row still comes from the PM Figma and the Knowledge Center spec; the Design file is not read (Q-8).

## Questions for PM
- Q-13 Should the HD Video Converter and AI Frame Interpolation SEO upload boxes show the V2 limits (8 min, 10 GB)?
- Q-14 Is 「(1 credit/sec)」 the intended singular? The spec template is plural.
- Q-15 Should a credit tool's SEO page show Get Credits (team rule) or not (code)?
- Q-16 Storage-full prompt: Upgrade below Studio Pro, Manage only on Studio Pro: confirm, and where Manage leads.
- Q-17 Knowledge Center question #ae8127264e43 (whole seconds under Enhance) is waiting for PM; the price rows follow it.

## Questions for you
- Un-hold TC-098, TC-123, TC-124 (R-048, R-073, R-074; Q-2)? R1 found the result preview's 「Open in Editor」 on build
  11242029, so R-073 is no longer only code-derived. This draft leaves all three held; TC-117 already uses the route.
  **Answered (user, 2026-11-26): keep all three held.**
- R-078 (upload errors after the upload, your Q-1 answer) vs R1: both the SEO page and the room show the error at once on
  choosing the file, and the spec still lists the timing as an open RD question. Keep R-078, or let the rows accept
  either moment?
  **Answered (user, 2026-11-26, REQ-014): only that the dialog shows and the video is not imported; the moment is not checked (R-078 relaxed; TC-010, 011, 012, 014, 016, 019, 020 modified).**
- TC-018 and TC-153 are parked: can RD give the no-frame-rate file, and is there a Studio Pro account we may fill to the
  cloud limit?
  **Answered (user, 2026-11-26): TC-018 is not tested (removed, R-019 not testable); TC-153 uses studio-pro-full, filled to 100 GB. TC-088 source: Video Merger.**
