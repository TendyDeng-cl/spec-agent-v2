# Orchestrator notes, TR261123-0041 verify

- 2026-11-23: P0118 — read the PM comment RD cites (AI-Hair vhIp15PMJcwOcWJ6E9Q4JE, thread 2001586155, Meg Chen 11/10,
  via figma-pm as qa1). It is about the Custom button staying 「Retry」 and the Intensity bar staying; it says nothing
  about replacing the one-time 100% dialog with the Artwork bubble. No other root comment on page 3287:89 does. The
  repo spec (26 10E) still has intensity_notice_dialog → P0118 stays NOT_FIXED (bubble only, no dialog).
- P0086 — RD removed the credit button; the newest Design in the repo (Enhance_2 111:9730) and R-211 still draw it.
  No newer spec in the repo removes it → kept off the QR as Hold (spec question), user to decide.
- 2026-11-23: user ruled P0081 OK (current labels accepted).
- 2026-11-23: user ruled P0090 OK (store, AI Sticker, More were removed from the panel on purpose).
- 2026-11-23: user ruled P0091 OK (no 「∅」 item needed).
- 2026-11-23: user ruled P0093 OK (frames not squashed is enough).
- 2026-11-23: user ruled P0118 OK (the one-time tip bubble is enough; no dialog needed).
- 2026-11-23: user: keep P0147 unverified (Hold) and file a new crash bug.
- 2026-11-23 16:45: filed PHA262026P0159 (Swipe Collage crash after force stop, still on this build), Sev 1 RD, 3 files.
- 2026-11-23: P0159 is a duplicate of P0147; user cancels P0159 by hand (API has no cancel).
- 2026-11-23: user: P0147 on the QR as Fail (instead of Hold).
- 2026-11-23: QR261123-0070 filed (OK=18, Fail=3; P0086 held), read back OK.
- 2026-11-23: user: P0086 counts as OK (UI changed); QR261123-0070 already saved, so a second QR with only P0086 is drafted (qr2-draft.json).
- 2026-11-23: QR261123-0073 filed (P0086 OK only), read back OK.
