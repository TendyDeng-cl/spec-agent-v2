#!/usr/bin/env python3
"""Red-boxed JPG attachments and the log excerpt for the Cinematic Reel Recommendation Android Q1 batch
(16.9.0, 2611231). Boxes are in screenshot pixels (1080x2400, SM-A5360). Run from the repo root."""
import os, re
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "20261126_eBug_drafts_Cinematic-Reel-Recommendation-Q1_16.9.0_images")
RUN = os.path.join(HERE, *[".."] * 3, "runs", "2026-11-26-q1-questions")
SHOTS = os.path.join(RUN, "screenshots")
REC, AVOID = (60, 980, 885, 1362), (60, 1560, 885, 1942)
IMGS = {
 "01_ISS-CRA-03": [("tc077-02-sheet.png", "cra03_sheet_dim_area", [(0, 225, 1080, 695), (68, 2073, 1012, 2197)]),
                   ("tc077-03-after-dimtap.png", "cra03_closed_after_dim_tap", [(150, 1420, 930, 1680)]),
                   ("tc077-swipe-tiles.png", "cra03_swipe_down_frames", [])],
 "02_ISS-CRA-04": [("tc079-05-tl-offline.png", "cra04_time_lapse_offline", [REC, AVOID]),
                   ("tc078-04-hm-sheet-offline.png", "cra04_horror_movie_cold_offline", [REC]),
                   ("tc079-07-tl-online.png", "cra04_time_lapse_back_online", [REC, AVOID])],
}
for folder, items in IMGS.items():
    os.makedirs(os.path.join(OUT, folder), exist_ok=True)
    for src, slug, boxes in items:
        im = Image.open(os.path.join(SHOTS, src)).convert("RGB")
        d = ImageDraw.Draw(im)
        for b in boxes:
            d.rectangle(b, outline=(255, 0, 0), width=8)
        if not boxes:
            d.rectangle([0, 0, im.width - 1, im.height - 1], outline=(255, 0, 0), width=4)
        im.thumbnail((1400, 1400))
        im.save(os.path.join(OUT, folder, f"16.9.0_{slug}.jpg"), quality=80)
        print(folder, slug)
# Log excerpt for ISS-CRA-04: the offline windows of TC-079 and TC-078 (network errors only; no image-load line exists).
log = os.path.join(RUN, "logs", "Q1-a-20261126-104943", "logcat-live.txt")
pat = re.compile(r"ExoPlayerImplInternal: (Playback error|  h17: Source error|  Caused by: java\.io\.IOException)|CreditSystemManager: (getFeatureList|checkFeatureCredit), Exception")
keep = []
for line in open(log, encoding="utf-8", errors="replace"):
    t = line[11:19]
    if ("10:44:40" <= t <= "10:45:30" or "10:46:05" <= t <= "10:47:40") and pat.search(line):
        keep.append(line.rstrip()[:240])
assert not any(re.search(r"Bearer|authorization|key=|token", l, re.I) for l in keep)
hdr = ["# PDR-A 16.9.0 (2611231), SM-A5360, logcat of PowerDirector, Wi-Fi off windows of TC-079 (10:44:40-10:45:30) and TC-078 (10:46:05-10:47:40)",
       "# Every network call fails; no line is logged for the photo tips pictures that stay blank (no load error, no retry)."]
with open(os.path.join(OUT, "02_ISS-CRA-04", "16.9.0_cra04_offline_log.txt"), "w") as f:
    f.write("\n".join(hdr + keep[:14]) + "\n")
print("log lines", len(keep[:14]))
