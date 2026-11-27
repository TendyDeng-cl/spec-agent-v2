# Free-trial credit check (new one-time trial mechanism) — S23 (RFCW2198L7B)
Build 20.19.0 (90201902), Test Server, Free user, creditSystemUUID d08e6712-…, balance 0, Credit Detail empty before start.
Check per feature: CTA shows 「1 Free Trial」; Generate with the trial succeeds at 0 credits; afterwards Buy Credit › Detail
has no new entry (old mechanism: +N grant then −N use), log `getCreditHistory … totalRecord=0`; CTA then shows paid price.

| Feature | Trial CTA | Generated | Balance after | Detail after | Result |
| --- | --- | --- | --- | --- | --- |
| AI Hairstyle | 1 Free Trial (3) | yes, saved to My AI Artwork 15:18 | 0 | empty (totalRecord=0) | Pass |
| AI Hair Color | 1 Free Trial (6) | yes (Solid, intensity slider shown) 15:22 | 0 | empty (totalRecord=0); CTA → Retry 6 | Pass |
| AI Background | 1 Free Trial (6→0), template Courtyard | yes 15:25 | 0 | empty (totalRecord=0); CTA → Retry 6 | Pass |
| AI Expand | 1 Free Trial (2), 3:2 | yes (~3 min) 15:29 | 0 | empty (totalRecord=0); CTA → Generate 2 | Pass |
| AI Glow Up | 1 Free Trial (2) | yes 15:33 | 0 | empty (totalRecord=0); CTA → Generate 2 | Pass |
| AI Hair Volume | 1 Free Trial (2), Natural | yes 15:37 | 0 | empty (totalRecord=0); CTA → Retry 2 | Pass |
| Style Transfer | 1 Free Trial (2), first preset style | yes 15:38 | 0 | empty (totalRecord=0); CTA → Generate More 2 | Pass |
| AI Replace | 1 Free Trial (6→0), Describe with text "blue denim jacket" | yes 15:42 (denim jacket) | 0 | empty (totalRecord=0); CTA → Replace (paid) | Pass |
| AI Art | none: Cine Anime / Clean / Vivid Anime / Polaroid all show Generate 2 | not generated (0 credits, no trial) | 0 | unchanged | Not testable: no free trial offered |
| AI Headshot | 1 Free Trial (8), default style | yes 15:46 (business headshot) | 0 | empty (totalRecord=0); CTA → Generate 8 | Pass |
| AI Try-On | 1 Free Trial (6), Studded Onyx | yes 15:48 | 0 | empty (totalRecord=0); CTA → Generate 6 | Pass |
| AI Creative Studio | 1 Free Trial (6), Template › Portrait (red scarf) | yes 15:51 | 0 | empty (totalRecord=0); CTA → Generate 6 | Pass |
| Image to Video | none: Templates (Ghost Step / Muse Wave / Shrug Dance) Generate 20; Custom (Kling 3.0) Generate 30 | not generated (0 credits, no trial) | 0 | unchanged | Not testable: no free trial offered |
| AI Video Try-On | no "1 Free Trial" CTA (Generate --). On import a dialog 「Enjoy a Free Video on Us — Trim your video to 2 seconds or less to generate your result for free!」, but the trimmer stops at 0:3 (~54 credits) from either handle | not generated (free length unreachable) | 0 | unchanged | Blocked: free 2 s clip cannot be trimmed (min 3 s) — follow-up |
| Cinematic Reel Creator | none: Horror Movie Generate 70; Selfie Shake (4 photos) Generate 48 | not generated (0 credits, no trial) | 0 | unchanged | Not testable: no free trial offered |

## Summary
- 10 features with a 「1 Free Trial」 CTA generated at 0 credits; after each, Buy Credit › Detail stayed empty and the
  server's credit history read `totalRecord=0` — no grant (+N) / use (−N) pair as in the old mechanism. Balance stayed
  0 throughout; each CTA turned to the paid price afterwards (trial used once).
- AI Art, Image to Video, Cinematic Reel Creator: no free trial shown on this device/UUID (all paid prices) — cannot
  tell from the app whether the trial is not configured on Test Server or this device's .com quota is already used.
- AI Video Try-On: no 「1 Free Trial」 CTA; its own 「Enjoy a Free Video on Us」 offer needs a clip ≤ 2 s but the
  trimmer's minimum is 3 s (54 credits), so a free generation could not be started.
- Release build logs no apply request parameters (no trial flag visible); evidence is Detail + getCreditHistory.
- 2026-11-23 16:22: AI Video Try-On filed as PHA262026P0158 (TR261123-0041, Sev 2, PM).
