# Run state — R1 Full run of v1 on the SM-A5560 (first run of the table)

Table: library/phd/xmas-ny-sale/android/cases.csv
Started: 2026-11-20T07:56:25.812Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-20T08:18:48.261Z · next TC-040 (R1-b)
{"Pass":9,"Fail":8,"Blocked":10,"Not run":34}

R1-a done 2026-11-20 16:19 (host time). Phone SM-A5560 R5CX30YHZHV, PhotoDirector 20.19.0 versionCode 90201901, Test Server. Tier Free (Mine 「Upgrade to Premium!」), credits 0. Play Billing Lab: Taiwan, Free trial ticked (trial user), card reads 「Active until Nov 20」 (real date): re-check it at R1-b start, it may lapse. Clock 2026/12/15 ~10:08 (auto_time 0). App on Mine. Logs pulled to logs/R1-a-20261120-161821; log-slice found 0 lines per case because log timestamps follow the moved phone clock while case windows use host time: causes were quoted from the live log instead. Appium on this PC is installed under C:\Users\Willy_Wu (not on willy's PATH): segments must export PATH=/c/Users/Willy_Wu/AppData/Roaming/npm:$PATH and APPIUM_HOME=C:\Users\Willy_Wu\.appium before device-android.ts (Appium pid 8728 on 4724 now running with them). 「type」 fails (Appium UnicodeIME missing): use adb shell input text. Sale interstitial never appeared (TC-002); TLS errors from the moved clock (O-3); phone account is a Play license tester (O-2).

### 2026-11-20T08:32:47.000Z · next TC-033 (R1-c)
{"Pass":11,"Blocked":21,"Fail":4,"Not run":25}

R1-b done 2026-11-20 16:33 (host time): 9 rows, 2 Pass (TC-016, TC-018), 1 Fail (TC-015 defect: non-trial CTA 「Continue (NT$650/year)」 not 「Subscribe for …/year」), 6 Blocked (TC-040/041/042/043/047 observability O-3: no interstitial on 12/15–12/20; TC-049 test-data: no in-app language setting, phone language needs the user's go-ahead). Phone SM-A5560 R5CX30YHZHV, PhotoDirector 20.19.0, Test Server, Free (not changed), credits 0 (log totalRemain=0). Play Billing Lab: Taiwan, Introductory offer **No** (non-trial user) since 16:29; card still 「Active until Nov 20」 (real date) — set it back to Free trial ticked if R1-c needs a trial user. Clock 2026/12/15 ~10:03 (auto_time 0). App on the Launcher. Logs pulled to logs/R1-b-20261120-163228 (log-slice 0 lines again: phone clock moved; causes quoted from the live log). Appium pid 8728 on 4724 (Willy_Wu PATH/APPIUM_HOME); restart takes >2 min, run it in the background. Purchase rows TC-023/066/067 still recorded Blocked test-data from init although REQ-004 released them (orchestrator to re-open before R1-d).

### 2026-11-20T08:49:16.589Z · next TC-031 (R1-d)
{"Pass":15,"Blocked":20,"Fail":8,"Not run":18}

R1-c done 2026-11-20 16:49 (host time): 12 rows, 4 Pass (TC-034, TC-071, TC-062, TC-036), 4 Fail (TC-033, TC-038, TC-004 defect; TC-073 question Q-13), 4 Blocked (TC-003, TC-054 observability O-3; TC-063 test-data: account is Auto Pass eligible; TC-064 test-data from init). TC-062 re-opened from init Blocked and passed: the run account is Credit Auto Pass eligible (paid user sees 「AUTO PASS DISCOUNT」 500 +500 NT$1660). Phone SM-A5560 R5CX30YHZHV, PhotoDirector 20.19.0, Test Server. Tier back to Free (「Set to subscriber」 off, Mine 「Upgrade to Premium!」, R1-c-end-mine-free.png), credits 0. Play Billing Lab: Taiwan, Introductory offer **Yes** (trial user) since R1-c (phone 12/26 09:00). Clock 2026/12/26 ~09:01 (auto_time 0); app on the Launcher. Logs pulled to logs/R1-c-20261120-164859 (log-slice 0 lines: moved clock; causes quoted from the live log). Appium pid 8728 on 4724 (Willy_Wu PATH/APPIUM_HOME); restart took ~3 min. Gear id is btnSetting (not topToolBarSettingBtn); debug dialog: About, tap (58,267) ×10; Set to subscriber toggle (926,1009), OK (904,1567). Billing Lab Apply sits under the nav bar: tap (300,2200). Findings: countdown bubble appears only after a relaunch (not live at 72:00:00); at 12/28 00:00 the icon turns into the regular orange crown, not the NY champagne glasses, also after relaunch (log: LottieAnimationView AppCompat theme error).

### 2026-11-20T09:12:44.087Z · all recorded
{"Pass":21,"Blocked":30,"Fail":10}

R1-d done 2026-11-20 17:12 (host time): 18 rows, 6 Pass (TC-061, TC-074, TC-037, TC-005, TC-066, TC-023), 2 Fail defect (TC-031 regular orange crown not NY champagne glasses; TC-035 no live countdown bubble at 2027/01/03 00:00, only after relaunch), 10 Blocked (TC-044, TC-011, TC-021, TC-059, TC-069, TC-052, TC-006 observability O-3; TC-032 defect upstream TC-031; TC-050 test-data phone language; TC-067 test-data account Auto Pass eligible, no 1000 pack). Purchases (REQ-004, test card, not charged): TC-066 500-credit Santa pack bought (balance 500); TC-023 Monthly sale subscription bought then CANCELLED in Google Play (Canceled, ends Nov 20 5:15 PM GMT+8), O-4. Phone SM-A5560 R5CX30YHZHV, PhotoDirector 20.19.0, Test Server. 「Set to subscriber」 OFF (Free); app reads VIP until the cancelled test subscription lapses at 17:15. Credits 800. Play Billing Lab: Taiwan, Introductory offer No (non-trial) since TC-023. CLOCK RESTORED: settings global auto_time 1, adb shell date Fri Nov 20 17:12 CST 2026 (real date); PhotoDirector relaunched once, left on the Launcher (R1-d-end-launcher.png). Logs pulled to logs/R1-d-20261120-171225 (log-slice 0 lines: moved clock; causes quoted from the live log). Appium pid 8728 on 4724 (Willy_Wu PATH/APPIUM_HOME). Run complete: 0 Not run. Phase wrap-up not done (separate agent).
