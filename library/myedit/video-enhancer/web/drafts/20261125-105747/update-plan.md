# Update plan — myedit/video-enhancer (web), draft 20261125-105747

New table (no approved version). 142 rows (8 held) from the PM Figma page 10:2 (read 2026-11-25, figma-pm / qa1) and the
Knowledge Center PM spec `myedit/features/video-enhancer-v2.md` (ready_for_rd, 2026-11-24) with the stage credit table.

## Knowledge Center rules (added 2026-11-25, REQ-003)
TC-119 – TC-127: an RD answer on when credits are charged and refunded on an upload cancel (TC-119, TC-120) and seven
code-derived rules not yet confirmed by PM (TC-121 – TC-127, Q-9): their rows record what the site does. Sources and
calls: knowledge-center.md, mcp-checkpoints.md.

## Answers applied (2026-11-25, REQ-004)
Q-1: the 8 upload-error rows expect the dialog after the upload (R-078). Q-2: Open in Editor held (TC-098, TC-123,
TC-124 left out). Q-9: code-derived rules held (TC-121, TC-122, TC-125 – TC-127 left out). Q-3, Q-4, Q-6, Q-7 confirmed
the assumptions; Q-5 demo only; Q-10 skipped. Held rows keep their IDs (held.txt) so no other row is renumbered.

## Product rules (2026-11-25, REQ-005)
TC-128 – TC-150 apply the imported MyEdit domain knowledge (library/myedit/knowledge, KP-001 – KP-075) where the spec is
silent: progress and final states, inputs protected while a job runs, download vs preview, rotation, file name, Trimmer
seeking, leave warnings, settings across the 1201 px layout switch, playback stopping, My Library after reload, Get
Credits and balance, signed-out Enhance, names across menus, control states, menus, narrow windows and zoom, Light Mode,
time codes, /tw/ texts, storage full (Generate Anyway / Manage), tab titles and card thumbnails. Every rule not used is
listed n/a with its reason under *Domain rules* in requirements.md.

## Not added
- R-035 (no rate → no price, Enhance disabled): every option the panel offers has a rate in the stage table, so the
  state cannot be reached from the UI; it is a guard for RD.
- Generation of every one of the 40 price combinations: each combination is priced on the Enhance button (TC-042 –
  TC-081, no credits spent); four generations (TC-089 – TC-092) check the charged amount and the output for one
  combination of each resolution tier and each frame-rate tier. Generating all 40 would cost about 1,200 credits for
  checks the price rows and the four runs already make.
- Enhance Style is not combined with Output Resolution / Frame Rate: it does not change the price (R-029, stage
  table: HD and Natural rates are equal); TC-038 checks that, and TC-090 generates once with Natural.
- Design Figma (vVDdw55BCWr94ZF7MJRVgx, page 1045:10519): not inventoried yet, so there is no control trace or
  arrows.json; controls and strings come from the PM Figma (Q-8). The next draft reads it (step 10) and adds rows for
  any control or screen it draws that no row presses.
- PM Figma sections marked 「agent-ignore」 by the PM (PDRPC Design, Old 4 - Mobile UI Spec, PM's Note, Handover) are
  not spec.

## Open questions for the review
Q-8 (Design not read yet). Q-11 (Light Mode confirmed) and Q-12 (UI languages not checked now, R-103 held) are answered (REQ-006).
