# Run state — E1 Entry round: the UI pass of every non-primary entry (REQ-015), build 2611251

Table: library/pdr/aigc-watermark/android/cases.csv
Started: 2026-11-26T08:14:53.442Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-26T10:48:31.208Z · next TC-196 (E1-b)
{"Fail":6,"Pass":31,"Not run":179}

E1-a done (37/37: 31 Pass, 6 Fail). Build 16.9.0 (2611251), Stage (yellow bar), Sony HQ61563393. Tier: FREE on this launch — the Play test Pro subscription has lapsed (Menu shows 「PowerDirector Pro / Upgrade」, last tab 「Mine」, My Credits 「Subscribe Now」, Seedance 2.x in I2V 「Subscribe Pro to Unlock」); not re-bought (no E1-a row needed Pro). Menu › Settings › 「Remove AIGC Watermark」 Off (never changed). Credits 1895 at 18:47 (start 2074; spent 179: T2I 3, VEbC 4×30, I2V 2×25, AI Art 6; two VEbC failures charged nothing, O-1). Project 「Project 11-26(4)」 (MOV_0046 main + a 100ANDRO overlay clip) made for the editor rows; AI Art 「Baby Face」 and I2V Custom 3/4 results in My Artwork. Saved files in files/ (TC-163/169/175/181/187/193). Logs pulled to logs/E1-a-20261126-184816 and sliced; logcat capture still running.

### 2026-11-26T11:34:29.672Z · next TC-232 (E1-c)
{"Fail":12,"Pass":51,"Blocked":10,"Not run":143}

E1-b done (36/36: 20 Pass, 6 Fail, 10 Blocked). Build 16.9.0 (2611251), Stage, Sony HQ61563393. Tier FREE (Pro test subscription still lapsed; not re-bought, no E1-b row needed Pro). Menu › Settings › 「Remove AIGC Watermark」 Off (never changed). Credits 1721 at 19:33 (start 1895; spent 174: Cinematic Reel Micro Cinema 3×48, Text to Video Kling O3 30; one T2V task failed at once, no charge, O-5). Projects: 「Project 11-26(4)」 (MOV_0046 main + 100ANDRO overlay clip) unchanged and still the editor fixture for E1-c; new 「Project 11-26(5)」 (one 00PDRa photo, woman in hoodie) and 「Project 11-26(6)」 (00PDRa 「AAC 6ch 44.1 KHz.mp4」 main + 00PDRa train photo overlay) made for the photo / PIP photo rows. Results in My Artwork: Cinematic Reel Micro Cinema 07/08/09, Text to Video Custom 3 (Custom 2 failed). Saved files in files/ (TC-199/205/211 crc, TC-229 t2v, frames, c2pa json). Logs pulled to logs/E1-b-20261126-193408 and sliced; logcat capture still running. App left on the Text to Video result page.

### 2026-11-26T12:35:04.667Z · next TC-268 (E1-d)
{"Fail":13,"Pass":86,"Blocked":10,"Not run":107}

E1-c done (36/36: 35 Pass, 1 Fail). Build 16.9.0 (2611251), Stage, Sony HQ61563393. Tier FREE (Pro test subscription still lapsed; not re-bought, no E1-c row needed Pro). Menu › Settings › 「Remove AIGC Watermark」 Off (never changed). Credits 1612 at 20:33 (start 1721; spent 109: AI Anime Video 2×40, Talking Avatar 2×10, AI Art 6, Text to Image 3). Projects: 「Project 11-26(4)」 (MOV_0046 main + 100ANDRO overlay clip) unchanged (a voice clip added for the audio-toolbar rows was removed again); 11-26(5) and 11-26(6) untouched. AI Anime Video's 「Recommendation」 sheet 「Don't show again」 left unticked. Results in My Artwork: AI Anime Video ×2, Talking Avatar 1/2, AI Art Baby Face, Text to Image lighthouse. Saved files in files/ (TC-235/241/247/253 save+auto mp4, TC-259 jpg, TC-265 jpg, c2patool json, frames/e1c-*.png). Logs pulled to logs/E1-c-20261126-203447 and sliced; logcat capture still running. App left on My Artwork › Text to Image result page.

### 2026-11-26T13:27:09.635Z · next TC-304 (E1-e)
{"Fail":29,"Pass":106,"Blocked":10,"Not run":71}

E1-d done (36/36: 20 Pass, 16 Fail, all question). Build 16.9.0 (2611251), Stage, Sony HQ61563393. Tier PRO: the Play test Pro subscription was re-bought at 21:01 for TC-283 (Free blocked AI Cartoon styles; sheet 「3-minute free trial」, 「Test card, always approves」; +35 trial credits) — expect it to lapse within hours (KP-068). Menu › Settings › 「Remove AIGC Watermark」 Off (never changed). Credits 1637 at 21:25 (start 1612; +35 trial giveaway; spent 10: T2I 2×3, TTS 2×2; AI Cartoon / AI Sketch charged nothing). Projects: 11-26(4) unchanged; 11-26(5) and 11-26(6) unchanged (T2I added nothing); new 「AI Cartoon 11-26」 (Princess preview), 「AI Cartoon 11-26(1)」 (Elf applied, exported), 「AI Sketch 11-26」 (Oil Painting, exported), 「AI Sketch 11-26(1)」 (AAC 6ch clip + TTS voice + title, exported), 「Project 11-26(7)」 (16:9, AAC 6ch clip + TTS voice + title from AI Magic, exported). AIGC export dialog 「Don't show again」 never ticked. Results: My Artwork › Text to Image bicycle and tea cup. Saved files in files/ (TC-271/277 jpg, TC-283/289/295/301 mp4 + c2patool json, frames/e1d-*). Logs pulled to logs/E1-d-* and sliced; logcat capture still running. App left in Project 11-26(7) editor (nothing selected).

### 2026-11-26T14:22:11.173Z · next TC-340 (E1-f)
{"Fail":37,"Pass":134,"Blocked":10,"Not run":35}

E1-e done (36/36: 28 Pass, 8 Fail, all question). Build 16.9.0 (2611251), Stage, Sony HQ61563393. Tier PRO (Play test subscription bought 21:01 still active: updateSubscribingStatus true at 22:20; KP-068 says it may lapse any time). Menu › Settings › 「Remove AIGC Watermark」 Off (never changed). Credits 1635 (pill at 21:40; start 1637; spent 2: one TTS ◆2; AI Voice Changer Pro voices and AI Cartoon / AI Sketch charged nothing). AIGC export dialog 「Don't show again」 never ticked. Projects: 「Project 11-26(7)」 now has the TC-307 replacement voice on audio track 2 (title on overlay 1); 「Project 11-26(4)」 (MOV_0046 + MOV_0051 overlay) back to no voice change, the speech clip removed again; 「Project 11-26(6)」 (AAC 6ch main + train photo overlay) styles undone, photo original. Exports in files/ (TC-307/313/319/325/331/337 mp4 + c2pa json, frames/e1e-*). O-15: one Produce of 11-26(4) (two 4K clips) failed with a decoding error, the retry worked. Logs pulled to logs/E1-e-20261126-222138 and sliced; logcat capture still running. App left in Project 11-26(6) editor, overlay photo selected.

### 2026-11-26T15:05:44.442Z · all recorded
{"Fail":41,"Pass":159,"Blocked":16}

E1-f done (35/35: 25 Pass, 4 Fail, 6 Blocked); phase E1 complete (216/216). Build 16.9.0 (2611251), Stage, Sony HQ61563393. Tier PRO at 23:05 (Pro tab 「You're on the highest plan」; Play test subscription bought 21:01 still active). Menu › Settings › 「Remove AIGC Watermark」 Off (never changed). Credits 1505 at 23:05 (start 1635; spent 130: Image to Video Kling O3 4×25, AI Music Generator 3×10). AIGC export dialog 「Don't show again」 never ticked; music dialog never shown (DRA262611P0229). Projects: 「Project 11-26(6)」 unchanged (AAC 6ch main + train photo overlay, no music added); two new projects from 「Full Editor」 (Custom 8, Custom 7 results). Image to Video Custom 5/6/7 saved (TC-373/366/370), Custom 8 saved by its share taps; songs 「Cinematic, Dreamy, Acoustic (2)」, 「Comedy, Epic, Ambient (1)」, 「Cooking, Elegant, Christmas」 in Music. O-16 (Internet panel popped once; banner Back path), O-17 (Mine › My Artwork no side margin), O-18 (share re-saves). Logs pulled to logs/E1-f-20261126-230528 and sliced; logcat capture still running. App left on the Pro tab.
