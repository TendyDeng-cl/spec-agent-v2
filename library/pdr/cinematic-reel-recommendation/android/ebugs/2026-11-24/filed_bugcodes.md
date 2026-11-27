# Cinematic Reel Recommendation Android — R1 eBugs filed 2026-11-24

Creator ETHAN_HSU (read back) · method API (create + attachment upload) · source tag [AIAgent] · TR [TR261123-0015](https://ecl.cyberlink.com/IF3/tr/BPM/FormView/TR261123-0015) · 16.9.0 build 2611201 (TR header 「16.9.0.2611201 (Deluxe)」, the build the run tested) · Stage server · template Generic v16.9 (23176) · due 2026-12-02 · decisions: `decisions.md` (user, 2026-11-24; Creator ETHAN_HSU and "the TR that has the same build number" given in chat)

| ISS | BugCode | Sev | Belong | Short Description |
|---|---|---|---|---|
| ISS-CRA-01 | DRA262611P0289 | 2 | PM | PDR-A 16.9.0 - [AIAgent][UX] Cinematic Reel Creator: Add Media opened from a template has no 「?」 for the photo tips |
| ISS-CRA-02 | DRA262611P0290 | 2 | PM | PDR-A 16.9.0 - [AIAgent][UI] Cinematic Reel Creator: Photo tips chip and sheet sentence stay English in 繁中 and 日本語 |

**Read back:** Creator, severity, belong, TR, build, version and Short Description match what was sent (`readback.log`, `filed_bugcodes.json`); all 6 attachments are on the pages (`files.log`). Status 「BugNeedReview」. Dedupe re-run right before filing: no duplicate on the Android pool (73 searched). No existing ticket was commented on.

**Still to set by hand:** OS Language on each ticket's web edit form (the API cannot set it).
