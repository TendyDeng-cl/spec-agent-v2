# Run state — R4 Round 4: v5 rows for Q-13 and Q-19 (REQ-014), with the exports TC-157 reads

Table: library/pdr/aigc-watermark/android/cases.csv
Started: 2026-11-26T01:59:56.978Z

## Environment
(build, server, device, tier, credit balance, Pink toggles, Log stage timings, Write Log)

## Checkpoints

### 2026-11-26T02:49:49.574Z · all recorded
{"Pass":5,"Fail":1,"Blocked":1}

R4-a done on the Sony XQ-BT52 (16.9.0 2611201, Stage yellow bar). acda.test7 (Google, signed in), Free, credits 2424 → 2362 (logcat totalRemain 10:49): AI Anime Video Vivid 10 s 40 (10:06), Text to Speech 2 (10:19), Image to Video Vidu Q2 5 s 15 (10:40), AI Music Generator 1 song 5 (10:48, TC-128 check). Projects: 「Project 11-26(1)」 AI Anime (non-AI 0–5 s + anime 5–10 s), 「Project 11-26(2)」 TTS (90 s), 「Project 11-26」 I2V Full Editor (Custom 2, never saved). Exports in files/ (TC-065/066/071/083/158 + c2patool JSON). 「Remove AIGC Watermark」 Off at the end (read back 10:49:07); export 「Don't show again」 never ticked. Logs pulled: logs/R4-a-20261126-104919 (sliced). Two Appium servers (4724, 4725) left alone. Next: phase wrap-up.
