# Xmas & NY Sale — Android fixtures

Phone for R1: Samsung Galaxy A55 (SM-A5560), adb serial **R5CX30YHZHV**, Android 15, 1080 × 2340; PhotoDirector 20.19.0 (installed 2026-11-19), Launcher 「Test Server」.

What a run needs on the phone and accounts. Rows name these in their Precondition.

- **Phone clock (Q-1; REQ-003).** `adb -s R5CX30YHZHV shell settings put global auto_time 0`, then
  `adb shell cmd alarm set-time <epoch ms>` (e.g. `node -e "console.log(Date.parse('2026-12-15T10:00:00+08:00'))"`); time zone
  Asia/Taipei. The 2026-11-20 probe on 20.19.0 showed the sale after setting the date (Santa-hat splash and Launcher icon).
  Restore with `settings put global auto_time 1` at the end of the run.
- **Test server** on in the debug dialog (KP-131, KP-137).
- **Free / paid user.** 「Set to subscriber」 off (free) or on (paid) in Launcher gear › About › debug dialog (KP-131);
  relaunch after each change.
- **Trial user / non-trial user (REQ-003).** Google's **Play Billing Lab** app › Configuration settings › Add › Taiwan,
  tick **Free trial** (trial user) or untick it (non-trial user), Apply, then force-stop and relaunch PhotoDirector.
  Allowed without asking.
- **Paid-user credit offers (Q-8; not supplied for R1, TC-062 / TC-064 Blocked).** Accounts for: eligible for Credit Auto Pass; able to make the first credit
  purchase (not Auto Pass eligible); eligible for neither. Ask RD how to set each state on Test server.
- **App language.** English, and Japanese for TC-049 / TC-050 (Android Settings › System › Languages, or the app's
  language setting).
- **Purchases (REQ-004).** The SM-A5560's Google Play account is a license tester (R1, O-2): checkout shows 「Test card,
  always approves」 and 「You will not be charged」. TC-023, TC-066, TC-067 buy with it; cancel the test subscription
  afterwards (it keeps the app paid until it lapses, KP-146).
- **Account state found in R1.** The SM-A5560's account is eligible for Credit Auto Pass as a paid user (TC-062), so it
  cannot stand for 「eligible for neither」 (TC-063, TC-067) or the first-purchase offer (TC-064). Credit balance 800
  after R1 (not 0).
- **Log.** `adb logcat` running for the rows that read the SKU id (TC-018, TC-060, TC-063).
- **Screen recording** for TC-032 (icon animation) and the splash rows TC-070 / TC-071.
