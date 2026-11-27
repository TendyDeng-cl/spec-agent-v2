# AIGC Watermark (iOS) — what the phone and the computer need before a run

What a run needs on the phone, the account and the computer, because none of it can be committed. Check it before the
first segment; a new row that needs something new adds it here in the same draft.

## Phone, app and account
- Phone: the QA iPhone (QADM_DST2411010, iPhone 16 Plus); it showed as unavailable on 2026-11-17: connect it on USB
  before the run. Auto-Lock Never. **Never uninstall PowerDirector** (AGENTS.md): the fresh-install default row
  (TC-008) is Blocked as test-data.
- Build: a PowerDirector for iOS build with PDRIOS-722 (none named yet). Name the TR before the run.
- Tier: Launcher › Pink › ☰ › [0] IAP › status (Free / Pro / Pro+, KP-004); restore it after the tier rows. Never buy,
  never type a password.
- Credits: about 40 AI generations across the scope features (one per feature and per model the C2PA rows name, plus
  three songs per language row). Read the balance at each segment start.

## Media
| Media | Used by | Notes |
| --- | --- | --- |
| A portrait photo (a person, 1080 × 1920 or larger) | Image to Video, Character Motion Swap, Talking Avatar, AI Anime | Photos |
| A 5–10 s non-AI video clip | timeline rows, the 「非 AI 素材 first」 row | Photos |
| A short video with an object to remove | Video Object Removal | Photos |

## Apps on the phone
- Instagram installed and signed in (share rows). **Never post**: stop in the composer.

## Computer
- ffmpeg / ffprobe (installed: /opt/homebrew/bin) to grab frames at 0.0 / 1.9 / 2.1 s and read resolutions.
- c2patool 0.29.0 (installed 2026-11-17, /opt/homebrew/bin) reads the C2PA metadata (Content Credentials) of each
  saved file: `c2patool <file>` prints the manifest and its signer, or says none is found.
- Saved files come off the phone through Image Capture (or Photos import) at full resolution, never a screenshot;
  keep them in the run folder's `files/` (local only, never committed).
- Draft 20261125-190000: keep the files TC-064, TC-065 and TC-070 exported in `files/`: TC-154 reads their Content
  Credentials. TC-082 and TC-155 need an Image to Video result that was never saved with the switch Off (a new
  generation, or a result saved only with the switch On).
