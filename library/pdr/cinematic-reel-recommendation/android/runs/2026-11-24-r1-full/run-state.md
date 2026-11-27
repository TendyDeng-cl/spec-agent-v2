# Run state — R1 Full run of approved v1 (android)

Table: library/pdr/cinematic-reel-recommendation/android/cases.csv
Started: 2026-11-24T03:03:42.648Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-24T03:29:06.108Z · next TC-010 (R1-b)
{"Pass":10,"Blocked":1,"Not run":10}

R1-a done (11 rows: 10 Pass, 1 Blocked observability TC-019). Build 16.9.0 (2611201) checked at start; Stage ([AID]Stage_Server); signed in acda.test7 (Mine shows Acda Test7, Free tier), credits 2424 at start and end (no charge; logcat totalRemain=2424 at 11:27). The 「What is Cinematic Reel Creator?」 tutorial showed on the first entry at 11:05 (fixture said dismissed); closed with X, it did not show again after the 11:27 relaunch. Carousel order on this account: Horror Movie, Micro Cinema, Fast Cut, One-Take Shot, Time Lapse, Handheld Camera (6 dots); chip at (315,306) px on the centred card; Avoid row swipe y=1870. App left on the Cinematic Reel Creator template page (Time Lapse card), no sheet open, English. Logs pulled to logs/R1-a-20261124-112848 and sliced; logcat capture still running. Next: R1-b TC-010 (Add Media 「?」); never pick a photo.

### 2026-11-24T03:40:49.194Z · next TC-017 (R1-c)
{"Pass":10,"Blocked":3,"Fail":6,"Not run":2}

R1-b done (8 rows): 6 Fail (question, Q-1) TC-010 – TC-015, 2 Blocked (question, upstream Q-1) TC-016, TC-021. Add Media (from 「Import a photo」 on each of the 6 cards) header holds only ‹, 「Add Media」 and a camera button; no 「?」/ⓘ/tips entry in header or room (els, page source, grid scrolled). System Back from Add Media returns to the template page on the same card (O-1). Add Media opens on 「All」 (no Recents tab, O-2). No photo picked, nothing generated; credits 2424 unchanged (logcat totalRemain=2424 through 11:40). Logs logs/R1-b-20261124-114030 sliced: no failure, toast or charge. App left on the template page, Horror Movie card, English. Logcat capture still running. Next: R1-c TC-017 (zh-Hant).

### 2026-11-24T03:50:58.020Z · all recorded
{"Pass":12,"Blocked":3,"Fail":6}

R1-c done (2 rows): 2 Pass. TC-017 (zh-Hant): Micro Cinema sheet names 「微電影畫境」; headings 「建議」/「避免使用」, captions Chinese, button 「瞭解」; sentence frame and chip stay English (Q-2, O-3). TC-018 (ja): names 「マイクロシネマ」; headings 「推奨」/「NG」, captions Japanese, button 「OK」; sentence and chip English (O-3). Google Play's restart dialog appeared at the ja switch (O-4, tool). locale reset → en-US, Launcher English read back. No photo picked, nothing generated; credits 2424 unchanged (logcat totalRemain=2424 through 11:50). Logs logs/R1-c-20261124-115041 sliced: no failure, toast or charge. App on the Launcher, English. Run complete: phase wrap-up next.
