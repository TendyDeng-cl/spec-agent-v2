# AIGC Watermark Android — R4 report (table v5, rows for Q-13 and Q-19, REQ-014 / REQ-017)
- Build 16.9.0 (2611201), Stage (yellow bar). Phone Sony XQ-BT52 / Android 12 (HQ61563393). Account acda.test7@gmail.com
  (Google button), Free. Table v5 (`cases.csv`, 156 rows), draft 20261125-190000, phase R4, one segment R4-a.
  2026-11-26 02:00–02:49Z (10:00–10:49 local), wall and test time 0 h 48 min, no idle gap. Nothing filed or committed.

## Final tally
**5 Pass, 1 Fail (TC-157, question), 1 Blocked (TC-128, defect upstream), 0 Not run.**

| Row | Result | Why |
|---|---|---|
| TC-065 | Pass | TTS project, switch Off: export dialog at 「Export」 → Produce sheet; file labelled at 0.0 / 1.9 s, none at 2.1 s |
| TC-066 | Pass | Same project, switch On: no label in the preview, no dialog, no label in the file |
| TC-071 | Pass | AI Anime project (non-AI 0–5 s, anime 5–10 s), Off: dialog, label 0.0 / 1.9 s, none at 2.1 s or over the anime clip |
| TC-157 | Fail (question) | All three editor exports (TTS Off, AI Anime Off, TTS On) carry one CyberLink C2PA manifest (c2pa.created, compositeWithTrainedAlgorithmicMedia, no ingredient, Valid); On and Off identical |
| TC-083 | Pass | New Image to Video result (Vidu Q2, never saved) › Full Editor, Off: dialog, one label 0.0 / 1.9 s, none at 2.1 s |
| TC-158 | Pass | Same result › Full Editor, On: no label in preview or file at 0.0 / 1.9 / 2.1 s, no dialog → the clip itself is unlabelled, TC-083's label is the export's |
| TC-128 | Blocked (defect) | Music 「Generate」 with the switch Off still opens no AIGC dialog (DRA262611P0229), so there is nothing to tick |

Exports (full resolution, local only) in `files/`: TC-065-tts-off.mp4, TC-066-tts-on.mp4, TC-071-anime-off.mp4,
TC-083-i2v-fulleditor-off.mp4, TC-158-i2v-fulleditor-on.mp4, their frames in `files/frames/`, c2patool JSON for TC-157.

## Credits (Free, logcat totalRemain)
2424 → 2362 (−62): AI Anime Video from the editor, Vivid 10 s, 40 (10:06, done in 634 s); Text to Speech 2 (10:19);
Image to Video Vidu Q2 5 s Standard 15 (10:40, done in about 1.5 min); AI Music Generator one song 5 (10:48, the TC-128
check: Generate starts at once). No failures, no refunds needed. No purchase.

## Open questions
| Q | Outcome | Basis |
|---|---|---|
| Q-13 | **Determined** (first half); second half stays not testable | An editor export holding signed AI content is signed: TTS (Off and On) and AI Anime (Off) exports each carry exactly one CyberLink manifest, c2pa.created with compositeWithTrainedAlgorithmicMedia, no ingredient, Valid — the same as a saved result (R-050 / R-056); the switch changes only the burned-in label. TC-157's expectation changes at the next draft to expect this manifest. A timeline tool's own asset still cannot be read as a file (TC-123 – TC-127, R-053 parked). Nothing to file. |
| Q-19 | **Determined** | A My Artwork Image to Video result opened with 「Full Editor」 and exported follows the switch: Off = AIGC dialog and the export's own label at 0.0 / 1.9 s (TC-083), On = no dialog, no label (TC-158); the clip itself is unlabelled and 「Full Editor」 writes no gallery copy (O-5). The assumption holds; no row changes. |
| Q-8 | **Not reached** | TC-128 Blocked: the music dialog still never opens on 2611201 (DRA262611P0229, which already carries Q-6 / Q-20). The export dialog's own 「Don't show again」 was left unticked throughout. Rerun TC-128 when the music dialog exists. |

## eBugs
No drafts: TC-128's cause is DRA262611P0229 (same OS, cited, not drafted); Q-13 and Q-19 were determined on the device,
so nothing goes to PM; the observations are not defects. No review page (no entry).

## Observations (`observations.md`)
O-1 Launcher CMS content stayed Ukrainian after the MUI run's locale reset until a relaunch; O-2 the editor-started AI
Anime Video's automatic gallery copy (switch Off) carries the label, the timeline clip does not (KF-006); O-3 Add Media's
newest items include earlier labelled exports — pick a known fixture; O-4 Free paywall / rating dialog after
「Produce」 (KP-074); O-5 「Full Editor」 from an unsaved Image to Video result writes no gallery file.

## Device and logs
Restart, build 16.9.0 (2611201) confirmed, Stage yellow bar, signed in, Free, 2424 credits, switch Off at start (read back
10:01) and Off at the end (read back 10:49:07). Logs: `logs/R4-a-20261126-104919/` (sliced, no failure or toast lines in
any row's window). Two Appium servers (4724, 4725) listed and left alone.
