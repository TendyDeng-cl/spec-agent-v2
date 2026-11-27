# TR261124-0075 verify plan — PHD-A 20.19.0.v202611241937 (R11), 2026-11-25

Scope: all 13 bugs on the TR's verify list (PHD-A rule: every bug, whoever created it; WILLY_WU 9, ALBERT_CHANG 4).
TR state at start: Pass 0 / Fail 0 / Not yet verified 13; testers WILLY_WU, BIAGGI_LI; no QR yet.

Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16 (user, 2026-11-25: 「在S23上驗證」, build installed
by the user). Installed APK: versionCode 90201902, lastUpdateTime 2026-11-25 08:56:31, MD5
4f2ad716f99b1127222e6f97aa062650; `assets/data/APREG.url` inside it reads `v202611241937` = the TR's build.
State left by the previous run (TR261124-0032 seg F): Test Server, Free, 1692 credits.

Bug bodies: `bugs-raw.txt` (old-ASP bugs, `ecl_query.py bug`), `bugs-bodies.md` (IF3 bugs, `TSR.EbugLogAndData`).
RD notes: `rd-resolve.json`.

## What each bug needs (with RD's newest note)

| Bug | Area | Check (Expect + RD Solution) | Side effects to look at | Cost |
| --- | --- | --- | --- | --- |
| PHA262026-0051 | Sign in | Sign-in page shows its content (RD: old issue, gone) | page from Mine and from an IAP sign-in entry | none |
| PHA262026P0025 | AI Background | an [Artwork] button exists in AI Background (RD: PM confirmed, button added) and opens My AI Artwork | it opens the AI Background category; back returns to the room | none |
| PHA262026P0029 | Edit › Portrait | Portrait tab auto-scrolls to Hair; the AI Hair Color hint bubble is not cut (RD: scroll item to the middle) | other tabs' bubbles/scroll; impact says 「can not verify it in this app version」 — if no bubble shows, try a cleared hint state, else Hold and ask | none |
| PHA262026-0289 | ID Photo | Beautify › Makeup › [X]: preview not black (RD: redraw after reset) — repeat ≥5 times | other Beautify tools' [X]; [V] still applies | none |
| PHA242024-1271 | AI Sketch → AI Art | RD: 「this feature is in ai art」. Find AI Sketch (Realistic) or its successor in AI Art; pick a female style then a male style: only one selected | if AI Sketch no longer exists anywhere → scenario unreachable → OK with Note (try every entry first) | none |
| PHA262026P0056 | AI Edit Agent | [i] rules page video credit = the cost the generate dialog shows (RD: info panel reads server credit per feature/action) | image credit on [i] vs image dialog too | none (stop before confirming) |
| PHA262026-0407 | I2V Custom, light mode | Happy Horse model icon clearly visible in light mode (RD: light-mode thumbnail) | other model icons in light and dark | theme switch (restore) |
| PHA262026-0031 | AI Background Custom | after one Custom Generate, [Generate] is lit again (RD: update state) | change prompt/style and Generate again | 1 Custom generate |
| PHA262026P0045 | AI Edit Agent | generate a video, tap [Artwork] → video tab focused; photo result → photo tab (RD Solution) | room with no result → photo tab | 1 video + 1 image generate |
| PHA262026-0360 | I2V Feeling Good | template with Sound ON → output has an audible track (RD: sound normal now) | ffprobe audio stream + volumedetect | 1 I2V generate |
| PHA262026P0142 | I2V Reuse | Custom Reuse shows the explanation sheet first when it would show elsewhere; Try now → Custom with reused model/prompt (RD) | 「Don't show again」 respected; prompt-only reuse goes straight to main page | needs a finished Kling 2.6 Custom video |
| PHA262026P0145 | I2V Reuse | Custom room opens portrait, no rotated frame (screen recording, frames sampled) | other entries to I2V | same video |
| PHA262026-0243 | I2V, system language | after a system language change, each style's sample image is right (RD: default first then Glide; tmp+MD5) | several styles, switch quickly | language change (restore) |

## Order (one phone, one segment per subagent)

- A. No-cost UI: 0051 → P0025 → P0029 → 0289 → 1271 → P0056 → 0407 (theme switch last; restore).
- B. Generations: 0031 → P0045 → 0360.
- C. I2V Reuse: P0142 → P0145.
- D. System language last: 0243 (locale restored).

End state to restore: Free tier, phone theme as found, system language as found, Wi-Fi on.
