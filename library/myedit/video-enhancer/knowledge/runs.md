# Driving Video Enhancer runs

## KF-009 The SEO page's 「Processing...」 lasts 1 – 3 seconds
- kind: howto · platform: web · use: run · tags: upload, progress, screenshot · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-13 · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

The upload 「Processing...」 state on the SEO page is gone within 1 – 3 s; catch it with a 50 ms screenshot or DOM
watcher loop started before choosing the file, not with single screenshots.

## KF-010 The Mode ⓘ tooltip covers the Enhance Style ⓘ
- kind: quirk · platform: web · use: run · tags: tooltip, hover, settings · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-5 (TC-036) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

The Mode tooltip is interactive and stays open while the pointer is on it, covering the Enhance Style ⓘ just below.
Move the pointer away sideways (or press Escape) before hovering the Enhance Style ⓘ.

## KF-011 Result-ready mails come about a minute after the job
- kind: fact · platform: web · use: run · tags: email, notification, generation
- authority: observed · source: Video Enhancer web run 2026-11-25-r1-full O-12 (TC-113, TC-115) · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

One 「result is ready」 mail per job arrives about 1 min after the job ends; wait at least that long before judging a
mail row.
