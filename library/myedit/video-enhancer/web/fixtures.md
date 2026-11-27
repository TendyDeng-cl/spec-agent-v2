# Fixtures — myedit/video-enhancer (web)

What a run needs on this computer and the accounts (run-web.md › `web/fixtures.md`).

## Environment
- MyEdit demo, https://demo.myedit.online (product.json › web.base_urls.demo); build from `device-web.ts … build`
  (version.json). Chrome profile `default` on port 9333, viewport 1440 × 900. Mobile-web rows (TC-101 – TC-105, TC-109) hold the page at 375 × 812
  with a CDP `Emulation.setDeviceMetricsOverride` (mobile:false: a narrow desktop window, no phone user agent), since Chrome on
  Windows will not size a window under 500 px (R1 O-13; `device-web window 375 812` gives 500 × 812).
- Credit ledger: stage2.cyberlink.com/account/credits (signed in once in the same profile).

## Accounts
- Default test account (Studio Pro, credits ≥ 500 before a run): every row unless it says otherwise.
- Free / empty-state account (web-account `free`, port 9341): TC-039 (no free trial, too few credits) and
  TC-096 (empty Recent Gen: upload fx-480p30 first, Recent Gen exists only after an upload). The user signs it in once.
- An account holding results from the original Video Enhancer: TC-111 (the default account if it has some).
- Free storage-full account (web-account `storage-full`, port 9343): TC-147, TC-148; never fill or empty it.
- Storage-full Studio Pro account (web-account `studio-pro-full`, port 9344; filled to 100 GB by the user's request, 2026-11-26): TC-153 (Manage). Never fill or empty it; check the plan is still Studio Pro before the row.
- A signed-out fresh Chrome profile on its own port: TC-139.

## Test videos (made with ffmpeg, kept in `~/.casebook/web/fixtures/video-enhancer/`, not in git)
| Name | What | Rows |
|---|---|---|
| fx-480p30 | 854×480, 30 fps, 7.3 s, H.264 MP4 with AAC audio | most rows, every price combination |
| fx-720p30 | 1280×720, 30 fps, 5 s | TC-028 |
| fx-1080p24 / 2997 / 50 / 60 / 100 / 120 | 1920×1080 at that fps, 5 s | TC-030 – TC-035, TC-017, TC-040 |
| fx-1440p | 2560×1440, 30 fps, 5 s | TC-013, TC-041 |
| fx-2160p | 3840×2160, 30 fps, 3 s | TC-012 |
| fx-128short | 256×128, 30 fps, 3 s | TC-015 |
| fx-192x96 | 192×96, 30 fps, 3 s | TC-014 |
| fx-240fps | 1280×720, 240 fps, 2 s | TC-016 |
| (none) unreadable frame rate | TC-018 removed: not tested (user, 2026-11-26); fx-nofps reads as 1 fps, fx-1frame imports, fx-mkv-vfr is ignored (O-28) | — |
| fx-av1 | AV1 MP4, 3 s | TC-019 |
| fx-ac3 | H.264 + AC-3 audio: 「Audio Codec Not Supported」 on the SEO page and in the room (replaces fx-badaudio, whose Opus audio is accepted) | TC-020 |
| fx-flac24 | H.264 + FLAC audio decoding to s32: rejected in the room only, no dialog on the SEO page (MYE261124P0025) | TC-020 note, recheck of the SEO-page gap |
| fx-10s | 480p 30 fps, 10 s | TC-088 recheck (Video Trimmer source) |
| fx-avi | AVI, 3 s | TC-010 |
| fx-hevc-mov | HEVC (H.265) MOV, 3 s | TC-023 |
| fx-10gb | MP4 just over 10 GB | TC-011 |
| fx-rotated | portrait phone video stored 1920×1080 with rotate 90 (shows 1080×1920), 5 s, with audio | TC-131 |
| fx-1m00 | 480p 30 fps, exactly 1:00 | TC-145 |
| fx-2m00 / 2m30 / 3m00 / 5m12 / 8m00 / 8m20 | 480p 30 fps at those lengths | Professional limit and Trimmer rows |

## Continue Editing source (TC-154; TC-088 needs another tool, found 2026-11-25 R1-b)
Video Trimmer (free, /en/video-editor/video-trimmer): upload fx-8m20, then the left sidebar › AI Generate › 「Video Enhancer」 card. No credits. This is TC-154 (「Video Too Long」, PM ruling #1c76d4b60c73); TC-088 starts from Video Merger (/en/video-editor/video-merger) with fx-8m20 (user, 2026-11-26).

## Credits (per run, approximate)
Four generations TC-089 – TC-092: 8 + 64 + 64 + 8 = 144; TC-117 one 60 fps 720P job made in the same visit (8), since a result reaches Video Editor only from its own room; mobile TC-104 and old-room rows ≈ 30; Agent TC-116 varies.
The 40 price rows spend nothing.

## Mailbox
TC-113 – TC-115 read the default account's notification mails through the Outlook connector (user, 2026-11-25): read only.
