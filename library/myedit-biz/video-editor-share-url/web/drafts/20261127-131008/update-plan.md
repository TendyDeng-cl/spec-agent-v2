# Update plan — myedit-biz/video-editor-share-url / web: new table → draft 20261127-131008

## Spec files
- New: Video Editor Share Project URL - KC spec 2026-11-11.md (KC PM spec, ready_for_rd), Video Editor Share Project URL - PM Figma 6531-156549.md (PM Figma text snapshot). Figma-only + Knowledge Center set, no PDF.
- Spec status: `ready_for_rd` (no warning needed). Design: pending (UJ, due 2026-11-27): every row is PM-only.

## Case changes
- New (58): TC-001 – TC-058, all `new`. Sections: Share link from the editor 11, Share link from My Projects 3, Owner opens own link 2, Receiver: sign-in and view 18, Create Copy: Free receiver 6, Create Copy: Pro receiver 9, Small screens 3, Deleted or unavailable project 6.

## Found by the analysis
- Annotation trace: 68 blocks traced (47 KC spec rows, 21 PM Figma notes); every block names its requirements, headings as labels.
- Pass 7 (PM-only): all rows, Notes 「PM-only: no Design frame yet」.
- Pass 9 hidden clauses: no copy on opening (R-018 → TC-019), no reload / no auto copy after purchase (R-036 → TC-040), original unchanged (R-043 → TC-045), uploads copied and counted (R-044 → TC-046), deleted uploads do not reach the copy (R-045 → TC-047), ~5 s detection (R-052 → TC-051), network / server failure handled as deleted (R-054 → TC-054).
- Pass 10 variants: sharing Free / Pro (TC-009, TC-010), viewing Free / Pro (TC-019, TC-032), copying Free / Pro (TC-035, TC-043).
- Pass 4 numbers: 1200 px both sides (TC-056, TC-057), ~5 s detection (TC-051), `_copy` suffix (TC-044).
- Rule 2 wait thresholds: copy loading (R-040 → TC-043).
- Pass 8 exits: every dialog's X / Cancel the spec draws (Exit × stage grid).
- Ordering: the deletion rows (TC-050 – TC-055) run last on a throwaway project P3; TC-047 deletes the owner's upload, after TC-041 – TC-046.

## Not added (value check)
- What's New card 「Video Share URL」 (MB-451): no source states its title, text, image or link (KC dashboard lists the item only; the current What's New has no such card) — Q-11, REQ-005.
- MUI (translation, truncation) and the two zh_TW strings of the spec (分享的專案已被刪除，無法再使用。 / 專案可能已更新。請嘗試重新複製連結。): deferred, RD strings not finished — REQ-002; no mui.json written.
- Height ≤ 550 px mask on the share view: code-derived rule only (derived-small-screen-mask) — Q-5.
- Copy failure part-way, second copy named `_copy (1)`: spec silent, code-derived only — Q-9.
- Link 「Processing...」 state, Export & Share for a signed-out editor user: spec silent, code-derived only — Q-10.
- My Projects messages auto-hide after about 3 s, toast duration: code-derived only — drop (characterization).
- Download file name `myedit_business_<name>.mp4`, 30 fps: code-derived tech guide — recorded in TC-006 Notes, not judged.
- Hot keys (Ctrl+Z etc.) in the read-only view: spec silent — drop.
- MyEdit Design (ZB9BpGIGsjikfB5p7sc8ma 5782:31535): MyEdit-only, not a Biz source — not read.

## Parked (kept, Blocked until the fixture exists; phases.json › needs)
- TC-040 purchase: no Biz test purchase route known on demo (needs the user).
- TC-041 – TC-047 a Biz Pro receiver with cloud room: jackcy showed no active plan (web-account check 2026-11-27); premium and studio-pro-full are full. Needs the user to name or upgrade an account.
- TC-054 network / server fault: by hand with DevTools request blocking only.
- TC-055 load failure without deletion: no trigger known (Q-4).
- TC-018 sign-in through the dialog: the user signs in (the agent never types a password).

## PM-only rows
- TC-001 – TC-058 (PM KC spec and PM Figma): no Biz Design frame yet (UJ, due 2026-11-27). Re-check every row when the Design arrives (pass 7).

## Questions for PM
- Q-1 「Premium users」 in the Share text vs Biz Free / Pro (REQ-004).
- Q-2 URL tool path; Figma 20261019 format vs KC `/share/{token}`.
- Q-3 Non-Pro storage-full message unreachable behind the Limitation popup.
- Q-4 How a non-deletion load failure happens.
- Q-5 Height ≤ 550 px mask on the share view.
- Q-6 Landing after signing in through the Sign In dialog; closing it.
- Q-7 Manage → which My Projects tab.
- Q-9 Copy failure; second copy name.
- Q-10 Link loading state; signed-out Export & Share.
- Q-11 What's New card content.
- Q-12 Limitation popup / sales popup close.

## Questions for you
- Q-8 Biz Design pending: re-draft when UJ's Design arrives?
- Which account is the Pro receiver with cloud room (TC-041 – TC-047), and is there a Biz test purchase route on demo (TC-040)?
