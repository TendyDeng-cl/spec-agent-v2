# Audio tools

## KP-086 AI Music Generator on Android
- kind: fact · platform: android · use: analysis, run · tags: ai-music, credits, price
- source: AIGC Watermark Android run 2026-11-17-r1-full O-19; AIGC Watermark Android run 2026-11-23-r2-changed TC-063, TC-014 · verified: 16.9.0 build 2611193 (2026-11-23)

Android has AIMusicGeneratorV2 (log: Google Lyria 3 Pro): Genre / Mood / Theme chips, song length and number of songs
(default 2, 「Generate for ◆ 10」, 5 credits a song); no description box and no lyrics path, unlike the PM board
(「Generate for ◆ 6」). Opening it from AI Magic creates an editor project 「AI Music Generator <MM-DD>」 behind it.

## KP-087 Generated songs are written to Music by themselves
- kind: fact · platform: android · use: run · tags: ai-music, files, save
- source: AIGC Watermark Android run 2026-11-17-r1-full O-19; AIGC Watermark Android run 2026-11-23-r2-changed TC-059, TC-119 · verified: 16.9.0 build 2611193 (2026-11-23)

My AI Music rows offer play, favourite and + (add to timeline), no Download: every finished song is written to
/sdcard/Music/cyberlink/PowerDirector/AI Music Generator/ (same bytes as the app's copy). Older songs from other runs
share the folder; match by time.

## KP-088 AI Voice Changer on a Free account
- kind: fact · platform: android · use: analysis, run · tags: voice-changer, tier, credits
- source: AIGC Watermark Android run 2026-11-17-r1-full O-24 · verified: 16.9.0 build 2611161 (2026-11-17)

On Free only the 「Effect」 tab applies: Radio 1 / Radio 2 free, Telephone / Chipmunk Pro. Every Professional /
Mellow / Bright AI voice is Pro (a tap plays a 10 s preview with 「Unlock the 10-second limit now」). An Effect voice
charges nothing.

## KP-096 Generated songs are 96 kHz AAC that some players reject
- kind: quirk · platform: android · use: run, ebug · tags: ai-music, files, player
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-15, TC-119 · verified: 16.9.0 build 2611193 (2026-11-23)

AI Music Generator songs are AAC at 96 kHz (`.m4a`, encoder Lavf). Samsung's sound player plays them; the phone's
third-party 「File Manager」 (com.alphainventor.filemanager) fails with 「Codec not supported : audio/mp4a-latm」. Play
them in Samsung's player; whether other common players fail is unchecked.

## KP-097 Adding a song from My AI Music opens 「Select Range」
- kind: fact · platform: android · use: run · tags: ai-music, editor, audio
- source: AIGC Watermark Android run 2026-11-23-r2-changed O-19, TC-060 · verified: 16.9.0 build 2611193 (2026-11-23)

Add Music › AI Music Generator › My AI Music › + opens 「Select Range」 (default 00:00–00:10, 「Import Full Song」
unticked); ✓ puts that range on the audio track. Tick 「Import Full Song」 for the whole song.

## KP-104 A Pro AI Voice Changer voice makes the project fail to produce
- kind: quirk · platform: android · use: run, ebug · tags: voice-changer, produce, export
- source: AIGC Watermark Android run 2026-11-23-r3-full O-9 (drafted ISS-AWA-18) · verified: 16.9.0 build 2611193 (2026-11-23)
- status: superseded by KP-106

Any Professional AI voice (Jill, Kathleen, Lila, Margaret…) applied from a clip's 「Audio Tools」 shows 「Applied」, but
「Produce」 fails: 「PowerDirector Mobile cannot produce the video. …/VoiceChanger/Cache/<clip>_<n>.m4a is missing.」 The
cache m4a exists after Apply and is gone after the panel's ✓. Effect voices (「Radio 1」) produce normally.

## KP-106 Pro AI Voice Changer voices produce on a stable network
- kind: quirk · platform: android · use: run, ebug · tags: voice-changer, produce, export, network
- source: AIGC Watermark Android recheck 2026-11-24-recheck-awa18 notes.md (inbox I-002, ISS-AWA-18 withdrawn); AIGC Watermark Android run 2026-11-23-r3-full O-9, O-10 · verified: 16.9.0 build 2611193 (2026-11-24)

On a stable Wi-Fi (0% loss) Jill, Kathleen and Margaret applied from a clip's 「Audio Tools」 produced normally, the AI
voice in the output. Apply writes VoiceChanger/Cache/2_<n>.m4a and 3_<n>.m4a; the panel's ✓ removes 2_ and keeps 3_.
The earlier 「…m4a is missing」 Produce failure (KP-104) happened during a Wi-Fi loss (KP-105), with the voice's S3
upload timing out while the UI said 「Applied」: recheck such a failure on a stable network before filing.

## KP-130 Text to Speech entries add a title first
- kind: fact · platform: android · use: analysis, run · tags: text-to-speech, entry-point, editor, credits
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-016, I-019) · verified: 16.9.0 build 2611251 (2026-11-26)

Global › Audio › Text to Speech, Global › Text › Text to Speech and Editor › AI Magic › Text to Speech first add a
「Tap to Edit」 title at the playhead and open its text editor; ✓ opens 「Select Voice」 (Preset ◆2 per 1,000
characters; Casual Voice is Pro, 「Generate Voice」 with no price). Leaving Select Voice keeps the title. With a title
selected, Text toolbar › Text to Speech opens Select Voice at once with its text. The label reads 「Text to  Speech」.

## KP-131 A second voice on the same title
- kind: fact · platform: android · use: analysis, run · tags: text-to-speech, dialog, audio
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-019) · verified: 16.9.0 build 2611251 (2026-11-26)

When the title already has a voice, Generate asks 「Generate Another Voice? / 2 credits will be used for this
generation.」 with a 「Replace the current voice instead of adding a new one」 tick (button Generate, or Replace when
ticked). Replace moved the voice from audio track 1 to track 2.

## KP-132 AI Voice Changer on a Pro account
- kind: fact · platform: android · use: analysis, run · tags: voice-changer, tier, credits, entry-point
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-018) · verified: 16.9.0 build 2611251 (2026-11-26)

One panel from Global › Audio, Video / PIP Video › Audio Tools and Audio clip › Audio Tools: tabs Effect / Professional
/ Mellow / Bright / Deep / Other, a Filter sheet (Type, Gender, Age, Reset, Save filter) and trash. No price shown;
Professional voices applied with no charge. The voice replaces the clip's own audio (no new track). From Global › Audio
with nothing selected it takes the main clip under the playhead and leaves it selected. Free: KP-088.

## KP-133 AI Music Generator's 「Generating...」 popup is invisible to UiAutomator
- kind: quirk · platform: android · use: run · tags: ai-music, tools, page-source
- source: AIGC Watermark Android run 2026-11-26-e1-entries (inbox I-023) · verified: 16.9.0 build 2611251 (2026-11-26)

The popup is not in the page source (`waitfor` cannot see it; tap 「Go to My AI Music」 by position, about 540,1524 on
the Sony) and can take ~10 s to appear after 「Generate for ◆ N」: never tap Generate twice. The page's credit pill
updates only at the next open.
