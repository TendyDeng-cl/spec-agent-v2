# Recent Task Model Info Android — R1 eBugs filed 2026-11-27

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261125-0064](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261125-0064) · 16.9.0 build 2611251 (TR header 「16.9.0.2611251 (Deluxe)」, re-read before filing) · Stage server · template Generic v16.9 (23176) · due 2026-12-02 · decisions: `decisions.md` (user, 2026-11-27: 「file all as Ethan_Hsu and use the build's TR as the target」)

Round R1 of the v3 table. ISS-RTM-06 and ISS-RTM-09 are same-OS duplicates of ISS-AWA-24 (DRA262611P0345) and ISS-AWA-29 (DRA262611P0350), filed in the AIGC Watermark E1 batch, and were not filed again. The missing 「Select All」 in edit mode repeats DRA262609-0033 (`dedupe.txt`).

**Read back:** Creator, severity, belong, TR, version 16.9.0, build 2611251 and Short Description match what was sent (`readback.log`); every attachment is on its page and every inline {file} resolves (`files.log`). Status 「BugNeedReview」. Format check re-run before filing: 0 errors (`check-prefile.txt`). Dedupe re-run right before filing (`dedupe-prefile.txt`; 「Recent task」 (158 Android candidates), 「Text to Video」 (113), 「PIP Photo Tools」; 4 open on 16.9.0, all AI Video Enhance): no same-OS duplicate. No existing ticket was commented on.

**Still to do on the web form:** OS Language on every ticket below (the API cannot set it).

| BugCode | ISS | Question | Sev | Belong | Files | Short Description |
|---|---|---|---|---|---|---|
| [DRA262611P0352](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0352) | ISS-RTM-01 |  | 2 | RD | 2 | PDR-A 16.9.0 - [AIAgent][UI] Recent task: Image to Video Recent page and model tag stay dark in light mode |
| [DRA262611P0353](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0353) | ISS-RTM-02 |  | 3 | RD | 2 | PDR-A 16.9.0 - [AIAgent] Recent task: Closing a Text to Image item from My Artwork skips the Text to Image list |
| [DRA262611P0354](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0354) | ISS-RTM-03 |  | 3 | RD | 2 | PDR-A 16.9.0 - [AIAgent] Text to Video: ‹ on Recent tasks after Generate skips the Text to Video page |
| [DRA262611P0355](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0355) | ISS-RTM-04 | Q-5 | 2 | PM | 2 | PDR-A 16.9.0 - [AIAgent][UX] Recent task: System Back in edit mode leaves the page, not just edit mode — PM to decide |
| [DRA262611P0356](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0356) | ISS-RTM-05 |  | 3 | PM | 2 | PDR-A 16.9.0 - [AIAgent][UX] Recent task: Tapping the model tag opens the result page — PM to decide |
| [DRA262611P0357](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0357) | ISS-RTM-07 | Q-10 | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UI] PIP Photo Tools: Entry reads 「Text to Image」, sheet says 「AI Text to Image」 — PM to decide |
| [DRA262611P0358](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0358) | ISS-RTM-08 |  | 3 | PM | 2 | PDR-A 16.9.0 - [AIAgent][UX] Recent task: From a completion banner it has no ‹ and leaves to the Launcher — PM to decide |

**Not filed:**

- ISS-RTM-06: 已知單，不重複開：DRA262611P0345 (ISS-AWA-24, AIGC Watermark E1, same OS)
- ISS-RTM-09: 已知單，不重複開：DRA262611P0350 (ISS-AWA-29, AIGC Watermark E1, same OS)

| Feature | Platform | AI Found # | Created # | Known # |
|---|---|---|---|---|
| Recent Task Model Info | Android | 9 | 7 | 2 |
