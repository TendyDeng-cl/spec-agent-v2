# AIGC Watermark (Android) — what the phone and the computer need before a run

What a run needs on the phone, the account and the computer, because none of it can be committed. Check it before the
first segment; a new row that needs something new adds it here in the same draft.

## Phone, app and account
- Phone: the Sony XQ-BT52 on adb (serial HQ61563393, Android 12) is the one connected on 2026-11-17. It cannot play
  4K 60fps (KP-069): choose 1080p in the Produce sheet.
- Build: round 1 is 16.9.0 (2611161), TR261116-0056; its zip is in `~/.casebook/android/apks/2611161/` (outside the
  repo). 16.9.0 (2611091) and older predate the feature.
- Accounts: a Free test account and a Pro test account (Android sells Pro, no Pro+; KP-006). The tier comes from the
  signed-in account, so the Pro rows need the Pro account. Never buy, never type a password.
- Credits: about 40 AI generations across the scope features (one per feature and per model the C2PA rows name, plus
  three songs per language row). Read the balance at each segment start.

## Media
| Media | Used by | Notes |
| --- | --- | --- |
| A portrait photo (a person, 1080 × 1920 or larger) | Image to Video, Character Motion Swap, Talking Avatar, AI Anime | the phone's gallery |
| A 5–10 s non-AI video clip | timeline rows, the 「非 AI 素材 first」 row | the phone's gallery |
| A short video with an object to remove | Video Object Removal | the phone's gallery |

## Apps on the phone
- Instagram installed and signed in (share rows). **Never post**: stop in the composer.

## Computer
- ffmpeg / ffprobe (installed: /opt/homebrew/bin) to grab frames at 0.0 / 1.9 / 2.1 s and read resolutions.
- c2patool 0.29.0 (installed 2026-11-17, /opt/homebrew/bin) reads the C2PA metadata (Content Credentials) of each
  saved file: `c2patool <file>` prints the manifest and its signer, or says none is found.
- Saved files come off the phone with `adb -s HQ61563393 pull /sdcard/DCIM/…` (or the app's output folder); keep them
  in the run folder's `files/` (local only, never committed).
- Draft 20261125-190000: keep the files TC-065, TC-066 and TC-071 exported in `files/`: TC-157 reads their Content
  Credentials. TC-083 and TC-158 need an Image to Video result that was never saved with the switch Off (a new
  generation, or a result saved only with the switch On).

## Reset
- The default-value row (TC-008) and the 「Don’t show again」 rows are one-way: they run last (segment R1-h). The
  default row clears the app (`adb shell pm clear com.cyberlink.powerdirector.DRA140225_01`, logs pulled first) and
  signs in again with the phone's account button: the Google account on the phone (acda.test7 on the Sony) is tried
  first (user, 2026-11-18). The app's Google button opens Chrome: tap 「Continue as Acda」 (signs Chrome into
  acda.test7 too, allowed by the user 2026-11-18), then pick the account; the user is asked only if that fails.
