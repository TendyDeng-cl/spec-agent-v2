#!/usr/bin/env python3
"""Evidence for ISS-VEA-57 (Q-21, playhead range and play start): copies the two R3 screenshots of TC-215
(runs/2026-11-24-r3-full/screenshots/TC-215-step1.png, TC-215-end.png; 16.9.0 build 2611231) as red-boxed JPEGs into
the batch's images folder, as the R3 batch's generators/held.py does. Nothing is drawn but the red boxes.
Run from the repo root: python3 library/pdr/video-enhance/android/ebugs/2026-11-25-questions/generators/images.py
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
RUN = f"{ROOT}/runs/2026-11-24-r3-full"
OUT = f"{ROOT}/ebugs/2026-11-25-questions/20261125_eBug_drafts_Video-Enhance-Questions_16.9.0_images/01_ISS-VEA-57"


def boxed(src, dst, boxes):
    im = Image.open(f"{RUN}/screenshots/{src}.png").convert("RGB")
    d = ImageDraw.Draw(im)
    for b in boxes:
        d.rectangle(b, outline=(255, 0, 0), width=8)
    im.save(f"{OUT}/{dst}", "JPEG", quality=82)
    print(dst, im.size)


# playhead bubble + line + knob at the selection start
boxed("TC-215-step1", "16.9.0_vea57_playhead_at_start.jpg", [(60, 1020, 205, 1315)])
# after the drag: Preview time, playhead at 02:00, Selected Length and the price unchanged
boxed("TC-215-end", "16.9.0_vea57_playhead_at_0200.jpg",
      [(30, 822, 262, 888), (262, 1020, 408, 1315), (895, 978, 1030, 1036), (120, 1975, 960, 2105)])
