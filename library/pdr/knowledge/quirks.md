# Quirks

## KP-065 The microphone over iPhone Mirroring
- kind: quirk · platform: ios · use: run · tags: voice, mirroring
- source: exploration KB ai-mini-drama.md

Never tap a mic button while the phone is shown through iPhone Mirroring: the macOS dialog it raises cannot be
dismissed from the session.

## KP-069 The Sony XQ-BT52 cannot play 4K 60fps
- kind: quirk · platform: android · use: analysis, run, ebug · tags: device, decoder, 4k, playback, video-enhance
- source: Video Enhance Android run (Codex, 2026-11-12, `NO_EXCEEDS_CAPABILITIES`); rechecked on the phone, user 2026-11-17 (chat); AIGC Watermark Android run 2026-11-26-e1-entries O-15 (inbox I-022) · verified: Android 12, outside PowerDirector (2026-11-17)

The Sony XQ-BT52 (Xperia 10 III, Snapdragon 690) hardware decoders stop at 3840×2160 30 fps (4096×2160 24, 1080p
120); a 4K 60 H.264 clip fails at decoder setup (`InsufficientResources`, 「Failed to initialize decoder」) in any
player, while 4K 30 plays. A 4K 60/120 result that will not play on it is a phone limit, not an app bug; check
4K 60 playback on the Samsung SM-A5360. Whether the app should offer 4K 60 on such phones is a PM question.
On 2611251 one Produce of two 4K clips (HEVC main + 4K overlay) failed once with 「…error while decoding the video」
(`OMX.qcom.video.decoder.avc ERROR(0x80001000)`) and worked twice after: use 1080p fixtures for export rows on the Sony.

## KP-089 Appium screen recording stops early on the full-screen player
- kind: quirk · platform: android · use: run · tags: recording, player, tools
- source: AIGC Watermark Android run 2026-11-17-r1-full O-11 · verified: 16.9.0 build 2611193 (2026-11-23)

An Appium screen recording of the in-app full-screen result player stops after about 1.5 s with few frames. To judge
what the player draws in its first seconds, take rapid `adb exec-out screencap` captures instead.

## KP-101 A hung Appium `hold` leaves taps dead until restart
- kind: quirk · platform: android · use: run · tags: appium, tools, gestures
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-18 · verified: 16.9.0 build 2611231 (2026-11-24)

A `device-android.ts hold` that never returns (seen on a My AI Music row) leaves later Appium taps dropped or partly
taken and the page blank with Back doing nothing, until `device-android.ts restart`; after it the same controls work.
After any hung command, restart (or use `adb shell input`) before judging the app.

## KP-105 17F_QA_Wifi_5G drops packets and breaks uploads
- kind: quirk · platform: android · use: run, ebug · tags: network, wifi, upload
- source: AIGC Watermark Android run 2026-11-23-r3-full O-10; Video Enhance Android run 2026-11-24-r3-full O-6, O-13 (also the MUI phase, 2026-11-24 15:16–15:36) · verified: 16.9.0 build 2611231 (2026-11-24)

On the SM-A5360, 「17F_QA_Wifi_5G」 at times loses 50–80% of pings and breaks S3 uploads (`unexpected end of stream`,
`Broken pipe`, `SocketTimeoutException`, CONNECT 502): 4 of 18 Video Enhance uploads in one evening, while later
segments on it had none. 「17F-QAAPP-2.4G」 was stable (0% loss). Before filing an upload, produce or network failure,
ping (`adb shell ping -c 10 8.8.8.8`) and recheck on 17F-QAAPP-2.4G (`device-android.ts wifi off` / `on` rejoined it).
iOS My Cloud on the same network: KP-034.

## KP-109 Launcher CMS texts stay in the last walked language after a locale reset
- kind: quirk · platform: android · use: run · tags: mui, locale, launcher, cms
- source: AIGC Watermark Android run 2026-11-26-r4-changed O-1 (after the 2026-11-25 MUI run's `locale reset`) · verified: 16.9.0 build 2611201 (2026-11-26)

After an MUI walk and `locale reset` to en-US, the restarted app can show the Launcher's CMS content (banner, shortcut
tiles, Trending titles) still in the last walked language while the tabs read English. A plain `launch` brings it back;
relaunch before judging Launcher texts after an MUI walk.

## KP-108 Add Media lists the app's own earlier exports first
- kind: quirk · platform: android · use: run · tags: add-media, fixtures, export
- source: AIGC Watermark Android run 2026-11-26-r4-changed O-3 · verified: 16.9.0 build 2611201 (2026-11-26)

Add Media sorted by Date (newest first) shows earlier PowerDirector exports among the newest videos, some with the AI
label burned in. When a row needs a non-AI clip, pick a named fixture (`fixtures.md`), not the newest video.

## KP-134 device-android label matches that hit the wrong control
- kind: quirk · platform: android · use: run · tags: tools, appium, editor, labels
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-021); Recent Task Model Info Android run 2026-11-26-r1-full (inbox I-029) · verified: 16.9.0 build 2611251 (2026-11-26)

In the editor `lbl Audio` can hit `[AID]TimeLine_Audio` instead of the Global toolbar's Audio (tap by bounds, ~310,2400
on the Sony); `lbl Male` matches Female; `lbl Replace` on 「Generate Another Voice?」 hits the tick label (tap
action1Button); wrapped toolbar labels (「Text to Image」) do not match: tap by position. A preview Play with a clip
selected plays only to that clip's end.

## KP-136 Add Media and the New Project picker share one sort setting
- kind: quirk · platform: android · use: run · tags: add-media, sort, fixtures
- source: Video Enhance Android run 2026-11-26-r4-full O-18, O-21 · verified: 16.9.0 build 2611251 (2026-11-26)

A sort set in Add Media (Duration) also showed in the New Project picker, so one change moves the first tile in both;
a recent synthetic file (TC-VE2-153-local-04-3_2s-720p30.mp4) can sit first under Date / Descending. Pick fixtures by
name, not by tile position, and set the sort back to Date / Descending (KP-073).
