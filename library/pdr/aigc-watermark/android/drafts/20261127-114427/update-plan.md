# Update plan — AIGC Watermark Android, draft 20261127-114427 (v6 → v7)

REQ-020 (user, 2026-11-27): the toolbar sheet is read for the table's own platform. 「AI Remove (4/E IOS)」 is iOS only.

- Removed: TC-214 – TC-219 (Entry › Editor › Video toolbar › AI Remove) and TC-220 – TC-225 (Entry › Editor › PIP Video toolbar › AI Remove), 12 rows.
- Requirements: Q-22 no longer lists AI Remove; ### Entry points marks both places iOS only; the exit grid drops TC-218/219/224/225; KP-082 → KP-117 and KP-090 → KP-122 (superseded).
- No row added or modified. No other place in the table is iOS only (checked with entry-points.ts --platform android).
