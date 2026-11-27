# Observations — E1 entry round (2026-11-26, build 16.9.0 2611251, Sony XQ-BT52)

- **O-1 (table wording, TC-081).** The task list names a reel by template and a counter (「Micro Cinema 01」, 「02」, 「03」 …),
  not 「Micro Cinema <MMDD>」 as TC-081's Expected Result words it. That name came from exploration notes, not the
  spec, so it is not a defect: the row's wording is to be corrected at the next draft. Evidence
  `screenshots/TC-081-7-tasklist.png`.
- **O-2 (closest TC-085; not in the spec).** At 16:26:21, while TC-085 swiped the template cards (page opened from the
  AI Magic tab, no sheet open), the app left the template page by itself and opened the result page of the reel
  TC-081 had started (finished ~5 min after Generate). Logcat: `SplashActivity` with `NotificationCheck:
  needNavigateToTargetPageWhenAppAlive() = true`, `mNavigateTargetNotificationDeepLink =
  pdr://click_cinematic_reel_creator?oid=credit_create_cinestory_1795681268409` (that oid is the 16:21:08 task), then
  `Project2Activity` → `CineStoryProduceActivity`. The run's commands at that moment were a card drag at y=1000 and
  the chip tap (315,306); no notification was tapped on purpose, so whether a heads-up "ready" notification sat under
  one of them, or the app navigated on its own, is not settled. Afterwards ‹ on the result page led to the task list
  and ‹ there to the Launcher Home tab: the AI Magic tab and the template page the user was on were gone. Recheck (16:34–16:44): idling on the template page with no input while 「Micro Cinema 03」 finished, the app
  posted its notification 「Good news! Your Cinematic Reel Creator task has been completed. Tap here to view your
  results.」 at 16:40:08 and stayed on the template page (`screenshots/O-2-recheck-idle.png`). So the 16:26 jump most
  likely came from a run gesture landing on that notification's heads-up banner; not an app defect unless seen again.
  Evidence
  `screenshots/O-2-result-page-opened.png`, `O-2-after-back.png`, `O-2-after-back2.png`.
