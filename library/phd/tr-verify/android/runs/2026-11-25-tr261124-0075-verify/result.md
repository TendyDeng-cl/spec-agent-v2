# TR261124-0075 verify — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110) / Android 16; Test Server; Not signed in (Free; 「Set to subscriber」 on 10:39–10:44 for AI Edit Agent).
- Tested by: AI agent (Claude Opus 5.5) over Appium + adb; segments A, B, C+D, E (`result-A.md`, `result-B.md`, `result-CD.md`, `result-E.md`).
- Result: OK 12, Fail 0, Hold 1 (PHA262026P0029: the AI Hair Color hint never showed on four cleared installs at 450 / 560 / 680 dpi; RD's note says it cannot be verified in this app version).
- QR: [QR261125-0017](https://ecl.cyberlink.com/IF3/qr/BPM/FormView/QR261125-0017) (`qr-receipt.json`).
- End state: S23 Test Server credits 0 (new Fake UUID after pm clear), display override 450, dark theme, en-US.

## Follow-up: PHA262026P0029 (2026-11-25, segment F)
Verified through the Effects tab hint bubble as the tester directed (bubble whole at 450 and 680 dpi; the "scroll to the middle" part cannot show because the hinted item is second in the list). Filed as QR261125-0040 (OK=1, Fail=0): https://ecl.cyberlink.com/IF3/qr/BPM/FormView/QR261125-0040 . TR261124-0075 now has all 13 bugs verified (Close).
