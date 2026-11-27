# Driving MyEdit web runs

## KP-076 device-web has no download, throttle or reload-with-dialog command
- kind: howto · platform: web · use: run · tags: device-web, download, throttle, reload, tooling · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-11, O-21 · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

`device-web.ts` (2026-11-25) cannot save a result file, throttle the network or reload past a 「Leave site?」 prompt.
The run downloaded from My Library › <tool folder> › ⋯ › Download (file 「MyEdit_<yymmdd_hhmm>.mp4」) with a throw-away
playwright helper, throttled with CDP `Network.emulateNetworkConditions` and reloaded with a beforeunload handler,
all from the scratchpad; plan for that until `download`, `throttle` and `reload --dialog` exist.

## KP-077 Chrome on Windows stops at 500 px wide: emulate narrow widths
- kind: quirk · platform: web · use: run · tags: device-web, viewport, mobile, windows, tooling · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-13 · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

On Windows `device-web window 375 812` gives a 500 × 812 window. Hold 375 × 812 with CDP
`Emulation.setDeviceMetricsOverride` (mobile: false, so no phone user agent) from a helper kept running beside the
segment; MyEdit then switches to its phone layout (bottom sheets, tab bar). Restore 1440 × 900 afterwards and say in
the row that it ran in a narrow desktop window, not on a phone.

## KP-078 Large uploads can drop the DevTools port
- kind: quirk · platform: web · use: run · tags: device-web, upload, chrome, logs, tooling · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-7, O-17, O-23 · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

`upload selectFile` of a 5-minute clip timed out twice and Chrome's DevTools port stopped answering: once Chrome was
gone (`restart` brought it back with the clip loaded), once it recovered by itself but the browser log capture had
stopped, so run `logs start` again. DevTools connects also time out (15 s) while a video plays; a retry works.

## KP-079 The run's Chrome may be driven by another session
- kind: quirk · platform: web · use: run · tags: device-web, chrome, tabs, window, tooling · authority: observed
- source: Video Enhancer web run 2026-11-25-r1-full O-9, O-23 · verified: MyEdit-5.11.0-11242029 demo (2026-11-25)

On the shared port-9333 Chrome a foreign tab (business-demo.myedit.online/jp) appeared in front and the window
changed to 1442 × 786 at 1.25 pixel ratio mid-row. Check `tabs` and the window size before a row's evidence, switch
with `tab N`, leave the other tab alone and restore the size; better, run on a Chrome no one else drives.
