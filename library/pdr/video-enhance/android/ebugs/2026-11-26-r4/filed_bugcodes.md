# AI Video Enhance Android — R4 eBugs filed 2026-11-27

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261125-0064](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261125-0064) · 16.9.0 build 2611251 (TR header 「16.9.0.2611251 (Deluxe)」, re-read before filing) · Stage server · template Generic v16.9 (23176), the TR's own · due 2026-12-02 · decisions: `decisions.md` (user, 2026-11-27)

Round R4 (full run, table v16).

**Read back:** Creator, severity, belong, TR, version 16.9.0, build 2611251 match what was sent (`create.log`); every attachment is on its page (`files.log`). Status 「BugNeedReview」. Format check before filing: 0 errors, 1 warning (F-1 Short Description 128 chars, under the 140 limit) (`check-prefile.txt`). Dedupe: `dedupe.txt` (218 Android tickets, no same-OS match). No existing ticket was commented on.

**Refiled 2026-11-27:** first filed the same day into 「AIFound eBugs pool」 (23321) by mistake as DRA262611P0335 / P0336 / P0337; the user cancelled those and these three replace them (records of the first filing kept as `*.cancelled-aifound-pool.*`). `ecl_if3.py create` now refuses a template other than the TR's.

**Still to do on the web form:** OS Language (the API cannot set it).

| BugCode | ISS | Sev | Belong | Files | Short Description |
|---|---|---|---|---|---|
| [DRA262611P0338](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0338) | ISS-VEA-60 | 2 | RD | 2 | PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: Mode bubble reads 「up to 8 min」 / 「up to 2:30」, not 「up to 08:00」 / 「up to 02:30」 |
| [DRA262611P0339](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0339) | ISS-VEA-61 (Q-20) | 3 | PM | 3 | PDR-A 16.9.0 - [AIAgent][UX] AI Video Enhance: System Back does nothing on the 「Turn on notifications」 dialog |
| [DRA262611P0340](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0340) | ISS-VEA-62 | 3 | RD | 2 | PDR-A 16.9.0 - [AIAgent][UI] AI Video Enhance: 「Selected Length」 has no ⓘ on a video within the Mode limit |

| Feature | Platform | AI Found # | Created # | Known # |
|---|---|---|---|---|
| AI Video Enhance | Android | 3 | 3 | 0 |
