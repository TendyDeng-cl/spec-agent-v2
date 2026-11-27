# TR261124-0075 verify — segment F (P0029 via the Effects hint bubble) — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

- Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16, 1080 × 2340. Every command targeted
  RFCW2198L7B (`.serial` + `CASEBOOK_SERIAL`, `adb -s`); the Pixel 8a (42201JEKB02229) was not touched.
- Build: versionName 20.19.0, versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31 (`build`).
- User input (2026-11-25): 「這支現在可以用Effect裡面的hint bubble來驗證」 (verify P0029 with the Effects tab's hint bubble).
  Earlier approvals still in use: pm clear for P0029 (Test server + Fake UUID back on), enlarged display for P0029.
- Time span: 15:29–15:37. Logs: `logs/segF-20261125-153723/`. Recordings: `recordings/p0029-f-*.mp4`.
- Tested by: AI agent (Claude Opus 5.5) over Appium. Nothing generated, bought or signed in; no password; nothing sent to ECL.

| Bug | Verdict | Key observation |
| --- | --- | --- |
| PHA262026P0029 | FIXED (with caveat) | Effects tab, first visit: the hint 「Now turn photos into reels with Transitions!」 shows whole with its arrow on Reel Creator, at display 450 and 680; the bubble is laid out from the item (log `itemWidth … hintItemIndex=1 bubbleWidth …`) and capped at the screen width. Caveat: the hinted item is index 1, so the list stays at its start (offset 0) and cannot move further toward the middle; an auto-scroll back to a scrolled-away item could not be produced. |

## State before / after

| | Before (15:29) | After (15:37) |
| --- | --- | --- |
| Server | Test Server (`f_00_launcher_before.png`) | Test Server (`f_98_launcher_end.png`, `f_99_launcher_end.png`) |
| Tier / credits | Free, 0 credits (as left by E) | Free, 0 credits (new fake UUID 9b0ce7b0…, log `totalRemain=0`) |
| Debug dialog | as left by E (Test server On, Fake UUID On, Support ScreenShot On, subscriber Off) | Test server On, Set to subscriber Off, Support ScreenShot for free user On, Show landmark / Force fetch / Force show UGC / Show debug info Off, Get Fake Credit UUID On (`f_96_debug_end_top.png`, `f_97_debug_end_fakeuuid.png`) |
| Display size | physical 480, **override 450** | override 450 (restored 15:36:22, confirmed `Override density: 450`) |
| Theme / language | Night mode yes, en-US | Night mode yes, en-US (not touched) |

### pm clear (1 time, approved for P0029)

| # | Time | Why |
| --- | --- | --- |
| 1 | 15:32:01 | the Effects hint is one-time and try 1 used it up (it did not show again on return, try 2); cleared to see it fresh at an enlarged display (680), where an uncapped bubble would be wider than the screen |

After the clear: 「Get Started」, 「Notify me」 › Allow, What's-new ×, Premium ×; Launcher gear › About › backdoor ×10 ›
Debug settings: **Test server On**, **Support ScreenShot for free user On**, **Get Fake Credit UUID On**, Set to subscriber
Off (`f_10_clear1_debug_top_on.png`, `f_11_clear1_debug_fakeuuid_on.png`, `f_12_clear1_debug_top_check.png`) › OK › relaunch;
Launcher 「NetworkManager Test Server」 (`f_13_clear1_launcher.png`); photo access 「Allow all」; the 「Your Free Trial is
Ready!」 sheet and the 「Now supports Photo to Video!」 popup closed with ×.

### Display size changes (P0029)

| Time | `wm density` | Why |
| --- | --- | --- |
| 15:32:01 | 680 | set just before pm clear 1, so the fresh Effects hint is seen with 242 px items and a bubble that would be wider than the screen if not capped |
| 15:36:22 | **450** (restored) | confirmed `Physical density: 480 / Override density: 450` |

No other phone setting was changed.

## PHA262026P0029 — hint bubble truncated after auto-scroll — FIXED (with caveat)

RD: RootCause 「it only scroll to item visible」 → Solution 「scroll item in the middle」; Function 「can not verify it in this
app version」.

Each try: Edit room (group photo) › tap 「Effects」 with a screen recording running and 5–6 `screencap` frames taken right
after the tap, then a settled screenshot + page source.

| Try | Install / display | Recording | Result |
| --- | --- | --- | --- |
| 1 | E's clear-4 install, first Effects visit, 450 | `p0029-f-effects-1.mp4` | bubble 「Now turn photos into reels with Transitions!」 shown at once (all 6 burst frames). `edit_room_hint_bubble` [0,1657]–[900,1828] (900 px wide, text 16–884), arrow at x≈270 = centre of **Reel Creator** [180–360]; list `effect_tool_bar_recycleView` 0–1080, 180 px items, AI Edit Agent 0–180 first → offset 0 (no scroll; the item cannot move further right). Bubble whole, both rounded ends on screen. Log `rtl=false itemWidth=180 hintItemIndex=1 bubbleWidth=900` (`f_02_effects_burst_1…6`, `f_03_effects_settled.png/.xml`) |
| 2 | same install: list scrolled to its end (Light Hits … Glitch), Edit tab, back to Effects | `p0029-f-effects-2-scroll-return.mp4` | touching the list dismissed the bubble; on return the log computes `hintItemIndex=1 bubbleWidth=900` again, but **no bubble** shows and the list stays at its end (the one-time hint is used up) (`f_04_effects_scrolled_end.png`, `f_05_effects_return_burst_*`, `f_06_effects_return_settled.png`) |
| 3 | **clear 1, 680**, first room entry, first Effects visit (tab bar swiped to show Effects, no other tab tapped) | `p0029-f-clear1-d680-effects.mp4` | bubble shown at once; `edit_room_hint_bubble` [0,1400]–[1080,1626], **capped at the screen width** (5 × 242 = 1210 would overflow), text [21–1059] on two lines, both rounded ends visible flush with the edges (edge pixels checked), arrow at x≈365 = centre of Reel Creator [246–480]; list at offset 0. Log `itemWidth=242 hintItemIndex=1 bubbleWidth=1080` (`f_18_clear1_d680_effects_burst_1…6`, `f_19_clear1_d680_effects_settled.png/.xml`) |

- Middle check: the list centre is 540; Reel Creator's centre is 270 (450) / 363 (680). Centring it would need a negative
  offset, so the list stays at offset 0, the closest it can get. 「Scroll to visible」 and 「scroll to middle」 give the same
  result for this item, so this hint proves the bubble is whole but cannot prove the middle-scroll itself. A case where
  the hinted item starts scrolled away (like the original Hair report) could not be produced: the hint fires once, on the
  first tap of the tab, before the list can be scrolled.
- RD note: it only scrolled the item to visible → scroll the item to the middle.
- Side effects: Portrait tab looked at on 450 (try-1 install, `f_07_portrait_450.png`) and on 680 after clear 1
  (`f_20_clear1_d680_portrait.png`): no hint (as in E), labels whole. Other hints seen on the way were complete: picker
  「Tap to expand albums」 bubble (`f_16_clear1_picker.png`), AI Edit Agent 「Add photos and start editing」 bubble behind
  the 「Now supports Photo to Video!」 popup (`f_15_clear1_picker.png`; AI Edit Agent was opened by mistake from the
  Launcher, closed with × and Back, nothing sent).
- Decisive: `f_03_effects_settled.png` (+ `.xml`), `f_19_clear1_d680_effects_settled.png` (+ `.xml`), burst
  `f_02_effects_burst_1.png`, recording `p0029-f-clear1-d680-effects.mp4`.

## Other observations (not filed)
- At 680 dpi the tab bar starts with Effects off screen; it scrolls by swipe. Normal.
- The Effects hint is one-time: once dismissed, the bubble geometry is still computed on every Effects tap (log) but nothing
  is shown.

## End state
- PhotoDirector on the Launcher (Home), English, Test Server, Free, 0 credits; debug: Test server On, Get Fake Credit UUID On,
  Set to subscriber Off, Support ScreenShot for free user On, others Off.
- Phone: display override 450, Night mode yes, system language en-US.
- Logs pulled: `logs/segF-20261125-153723/`.
