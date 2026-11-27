#!/usr/bin/env python3
"""Red-boxed JPG attachments and the log excerpt for the Cinematic Reel Recommendation Android E1 batch
(16.9.0, 2611251). Boxes are in screenshot pixels (1080x2520, Sony XQ-BT52). Run from anywhere."""
import glob, os, re
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "20261126_eBug_drafts_Cinematic-Reel-Recommendation-E1_16.9.0_images")
RUN = os.path.join(HERE, *[".."] * 3, "runs", "2026-11-26-e1-entries")
SHOTS = os.path.join(RUN, "screenshots")
IMGS = {
 "01_ISS-CRA-05": [("TC-092-1-effects.png", "cra05_photo_effects_menu", [(30, 2050, 1050, 2290)]),
                   ("TC-092-1b-toolbar.png", "cra05_photo_toolbar_first_layer", [(330, 2300, 545, 2510)]),
                   ("TC-096-1-effects.png", "cra05_pip_photo_effects_menu", [(30, 2050, 1050, 2290)])],
 "02_ISS-CRA-06": [("TC-087-06a-analyzing.png", "cra06_analyzing_before_back", []),
                   ("TC-087-06b-after-back.png", "cra06_preview_after_back", [(68, 1985, 1012, 2135)]),
                   ("TC-087-08-tasks.png", "cra06_task_still_processing", [(46, 387, 1034, 732)]),
                   ("TC-087-13-back.png", "cra06_result_back_to_task_list", [])],
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
# Log excerpt for ISS-CRA-06: TC-087, Generate at 16:33:46, system Back at 16:33:50; the task goes on to 「Done」.
log = sorted(glob.glob(os.path.join(RUN, "logs", "E1-a-*", "logcat-live.txt")))[-1]
pat = re.compile(r"ImageToVideo:  (create session|apply effect)|ImageToVideoRepository: applyEffect status: (Applying 0|Done)|Upload to S3: (start|finish)|totalRemain=")
keep, seen = [], set()
for line in open(log, encoding="utf-8", errors="replace"):
    t = line[11:19]
    if "16:33:45" <= t <= "16:40:30" and pat.search(line):
        m = re.search(r"totalRemain=\d+|applyEffect status: \w+( \d+)?", line)
        key = m.group(0) if m else None
        if key and key in seen and "Upload" not in line:
            continue
        if key:
            seen.add(key)
        keep.append(re.sub(r"(totalRemain=\d+).*", r"\1 …", line.rstrip())[:200])
assert not any(re.search(r"Bearer|authorization|X-Amz|token|key=", l, re.I) for l in keep)
hdr = ["# PDR-A 16.9.0 (2611251), Sony XQ-BT52, logcat of PowerDirector, TC-087: Generate 16:33:46, system Back on",
       "# Analyzing & Generating at 16:33:50; the task keeps running (the task list shows 「View」 by 16:40); balance lines cut after the number"]
with open(os.path.join(OUT, "02_ISS-CRA-06", "16.9.0_cra06_back_task_continues_log.txt"), "w") as f:
    f.write("\n".join(hdr + keep) + "\n")
print(len(keep), "log lines")
