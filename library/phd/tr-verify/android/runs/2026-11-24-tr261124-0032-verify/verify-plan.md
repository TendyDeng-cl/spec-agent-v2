# TR261124-0032 verify plan — PHD-A 20.19.0.v202611241407 (R9), 2026-11-24

Scope: all 21 bugs on the TR's verify list (PHD-A rule: every bug, whoever created it; all 21 WILLY_WU).
TR state: Pass 0 / Fail 0 / Not yet verified 21; testers WILLY_WU, BIAGGI_LI; no QR yet. Bugs attached by JANE_LAI
2026-11-24 14:45, no RD resolve notes. The three bugs *filed on* this TR (P0164–P0166) are not on its verify list
(rechecked separately in `../2026-11-24-tr261124-0032-recheck/`).

Device: Samsung Galaxy S23 (SM-S9110, adb RFCW2198L7B), Android 16 (user, 2026-11-24: 「用 S23」). Build installed
2026-11-24 17:11:57, versionCode 90201902; MD5 already matched the build NAS in the recheck run.
State found in the recheck: Test Server, Free, 0 credits, not changed.

Bug bodies: `bugs-bodies.md` (from `TSR.EbugLogAndData`), raw `bugs-logdata.json`.

## What each bug needs

| Bug | Area | Check | Cost |
| --- | --- | --- | --- |
| P0103 | SC Template Page | Free taps crowned PRO card → preview opens (PRO icon), Use Template → Canvas; IAP only at export | none |
| P0072 | SC Canvas | 「2 photos」 card opens with 2 empty frames (also a 4-photo card) | none |
| P0160 | SC Canvas | one tap on a frame 「+」 opens the picker (3-photo and 10-photo templates) | none |
| P0073 | SC picker | picked photos marked (numbered) in the grid | none |
| P0074 | SC picker | limit = empty frames on all pages, cap 20 (7-photo template: 7 at once) | none |
| P0079 | SC frame focus | bar has Opacity, Shadow, Flip H, Flip V, Duplicate, Lock, Delete; floating Lock | none |
| P0080 | SC image focus | a tap in image focus returns to frame focus | none |
| P0082 | SC swap | 「Long press & drag to swap」 shows while dragging | recording |
| P0083 | SC Frame panel | each Frame thumbnail states its photo count (Add Layer › Frame and Replace frame) | none |
| P0162 | SC Removal | Exposure 4.0 then Removal: room shows the adjusted photo | Removal free try |
| P0076 | SC exit | ‹ → Discard returns to the Template Preview | none |
| P0077 | SC exit | system Back closes 「Discard changes?」 like Keep | none |
| P0094 | SC Pages | Pages opens on the current page, 「Page 2 / 3」 and − \| + stepper | none |
| P0095 | SC Pages | ✓ / ✕ exist; ✕ with changes asks 「Discard changes?」 | none |
| P0097 | SC Pages | tap on ≡ does nothing; drag enlarges, translucent, 「Hold ≡ & drag to reorder」 | recording |
| P0070 | My AI Artwork | saving a photo and a video in Recent logs a Mixpanel event | needs one photo + one video in Recent |
| P0141 / P0143 / P0144 | I2V Reuse | toast 「Settings applied」; ‹ / Back → Save & Share; `ImageToVideo_Reuse_Click` with model | needs a finished Kling 2.6 Custom video in My Artwork |
| P0152 | Xmas/NY Sale | phone clock 2026/12/30 10:00: Launcher IAP icon is the animated champagne glasses | clock change, restored after |
| P0138 | Reel Creator | Wi-Fi off during upload: resume or real refund of 70 credits | **70 credits; S23 has 0 → user decides** |

## Order (one phone, one segment per subagent)

- A. Swipe Collage canvas on Free: P0103 → P0072 → P0160 → P0073 → P0074 → P0079 → P0080 → P0082 → P0083 → P0162 →
  P0076 → P0077.
- B. Swipe Collage Pages: P0094 → P0095 → P0097.
- C. My AI Artwork: P0070, then I2V Reuse P0141 / P0143 / P0144 if a Kling 2.6 video exists (else Hold).
- C0 (user, 2026-11-24). Buy credits in the app (Google Play sheet must show the test card; 100 for P0138, more if the
  I2V video needs them), then generate one Kling 2.6 Custom I2V video if none is finished in My Artwork.
- C. My AI Artwork: P0070, then I2V Reuse P0141 / P0143 / P0144 on that video.
- D. Reel Creator P0138 (Wi-Fi off during upload; restore Wi-Fi).
- E. P0152 (clock change last; automatic date and time restored).

End state to restore: Free tier as found, automatic date and time on, Wi-Fi on, no draft saved.
