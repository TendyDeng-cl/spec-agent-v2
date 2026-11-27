# AIGC Watermark Android — E1 eBugs filed 2026-11-27

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261125-0064](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261125-0064) · 16.9.0 build 2611251 (TR header 「16.9.0.2611251 (Deluxe)」, re-read before filing) · Stage server · template Generic v16.9 (23176) · due 2026-12-02 · decisions: `decisions.md` (user, 2026-11-27: 「file all as Ethan_Hsu and use the build's TR as the target」)

Entry round E1 (Q-22 and the new questions from the entry pass, O-17). Filed first: ISS-AWA-20, ISS-AWA-24 and ISS-AWA-29 also stand for the same-OS duplicates ISS-CRA-05 (Cinematic Reel E1) and ISS-RTM-06 / ISS-RTM-09 (Recent Task Model Info R1). The Q-10 / Q-13 / Q-20 rows repeat filed Android tickets (`dedupe.txt`).

**Read back:** Creator, severity, belong, TR, version 16.9.0, build 2611251 and Short Description match what was sent (`readback.log`); every attachment is on its page and every inline {file} resolves (`files.log`). Status 「BugNeedReview」. Format check re-run before filing: 0 errors (`check-prefile.txt`). Dedupe re-run right before filing (`dedupe-prefile.txt`; 「Editor toolbar」, 「Video Edit by Chat」, 「Talking Avatar」, 「Text to Speech」, 「Menu (My Artwork)」 (404 Android candidates, 1 open on 16.9.0) plus open-ticket text searches 「Text to Image」, 「AI Cartoon」, 「AI Sketch」, 「Voice Changer」, 「My Artwork」, 「Cinematic Reel」, 「AI Remove」, 「toolbar」, 「Effects」 and the tickets created since 2026-11-26): no same-OS duplicate. No existing ticket was commented on.

**Still to do on the web form:** OS Language on every ticket below (the API cannot set it).

| BugCode | ISS | Question | Sev | Belong | Files | Short Description |
|---|---|---|---|---|---|---|
| [DRA262611P0341](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0341) | ISS-AWA-20 | Q-22 | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Editor toolbar: Video Edit by Chat, Cinematic Reel Creator not under Effects; no AI Remove |
| [DRA262611P0342](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0342) | ISS-AWA-21 |  | 2 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Editor toolbar: Video Edit by Chat, Cinematic Reel Creator ignore the selected clip |
| [DRA262611P0343](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0343) | ISS-AWA-22 |  | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent] Video Edit by Chat: Source of 8.3 s shown as 00:09 and priced as 9 seconds |
| [DRA262611P0344](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0344) | ISS-AWA-23 |  | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Talking Avatar: Audio toolbar entry lacks the By Text / By Voice switch |
| [DRA262611P0345](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0345) | ISS-AWA-24 |  | 2 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Editor (Text to Image): Leaving it clears the photo selection it was opened from |
| [DRA262611P0346](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0346) | ISS-AWA-25 |  | 4 | PM | 1 | PDR-A 16.9.0 - [AIAgent] AI Cartoon / AI Sketch: Results are applied in a new project and never listed in My Artwork |
| [DRA262611P0347](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0347) | ISS-AWA-26 |  | 2 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] AI Cartoon / AI Sketch: Back at the photo step lands in an empty editor, not AI Magic |
| [DRA262611P0348](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0348) | ISS-AWA-27 |  | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Text to Speech: Leaving without a voice keeps the new title on the timeline |
| [DRA262611P0349](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0349) | ISS-AWA-28 |  | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Editor (AI Voice Changer): Closing it from the Audio menu leaves the main clip selected |
| [DRA262611P0350](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0350) | ISS-AWA-29 |  | 3 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UX] Menu (My Artwork): Back returns to Home with the Menu closed, not to the Menu |
| [DRA262611P0351](https://ecl.cyberlink.com/IF3/ebug/BPM/FormView/DRA262611P0351) | ISS-AWA-30 |  | 2 | PM | 1 | PDR-A 16.9.0 - [AIAgent][UI] My Artwork (Pro tab): Headings and tiles touch the screen edges with no side margin |

| Feature | Platform | AI Found # | Created # | Known # |
|---|---|---|---|---|
| AIGC Watermark | Android | 11 | 11 | 0 |
- DRA262611P0341 (ISS-AWA-20) cancelled on eCL by the user 2026-11-27: 「AI Remove (4/E IOS)」 is iOS only (REQ-020).
