# Observations — Q1 question round (AI Mini Drama Android, 16.9.0 build 2611231, SM-A5360, Stage, Free)

- **O-1 (closest case TC-581).** On the template drama 「After Closing」, the assistant message 「Created the 6-scene
  storyboard for After Closing.」 shows right after the Characters Result card, above 「The characters look great! Ready
  to create the storyboard?」 and the 「Create storyboard」 ◆39 card, before any storyboard was requested or charged
  (11:15, screenshot `TC-581-chat2.png`). It stays in the chat above the 「Create storyboard」 user bubble after the
  storyboard is made (`TC-581-2-up3.png`). Logcat: the format turn's `ai-mini-drama-final` step ended 11:16:20; the
  storyboard turn ran 11:16:30 → 11:31:10. The same text is in the 2026-11-06 verify runs' page sources
  (`2026-11-06-tr261105-0062-verify-2/screenshots/s3_10_bottom.txt`), so it is not new on this build.
- **O-2 (closest case TC-080, not in this phase).** The video settings card quotes 7 / 5 / 3 credits per second with
  no reference-audio part: Best (Seedance 2.5) Preview - 30 sec ◆210, Full Video - 90 sec ◆630; Standard (Seedance
  2.0) ◆150 / ◆450; Fast (Seedance 2.0 Mini) ◆90 / ◆270 (`O-2-standard-preview.png`, 11:33). TC-080 / R-069 expect
  ◆180 / ◆120 / ◆60 for the preview and ◆544 / ◆364 / ◆184 for the full video (Credit System forms, REQ-103). The
  Standard preview charged ◆150 (TC-582). Prices are server-set: held for TC-080 in the next full run, with the
  Credit System forms read again, before anything is filed.
- **O-3 (closest case TC-581).** The template storyboard took 880 s (11:16:30 → 11:31:10, 「Creating your scene…」 the
  whole time): 5 environment images one after another 11:16:47 → 11:23:00 (about 2 min each from the second), then 6
  scene images 11:23:00 → 11:31. No spec wait limit applies to the storyboard; recorded for timing only.
- **O-4 (closest case TC-582).** At 11:44:44, while the preview video card in the open 「After Closing」 chat was still a
  grey shimmer, the in-app banner 「Good news! Your "After Closing" is ready. Tap here to view your results.」 (Close /
  View) showed over the same chat (`TC-582-gen-04.png`). Same-OS DRA262610P0379 (NeedCodeReview) covers it: not
  drafted (`ebugs/2026-11-26-q1/dedupe.txt`). O-1 repeats same-OS DRA262610P0174 (Assigned) the same way; the exported
  session shows the line is the template turn t1's own reply text (`chat_history.json`).
- **O-5 (after TC-582, run step 9).** 「Create the rest of the video (60 sec)」 ◆300 generated 11:48:39 → 12:00:40 (721 s):
  user bubble 「Create the rest of the video (60 sec)」, 「I'll create a video — give me a moment...」 with 「Generating the
  rest of the video.」, then 「Here's your drama.」 over the video card and 「Ready for the next episode?」 with 「Create
  Next Episode」 (`FULL-end.png`). Logcat: four RefToVideo halves of ◆75 (perSecond=5 unit=15), turn_end complete
  stage=beat→beat; pill 29542 → 29242. No failed clip, no refund due.
