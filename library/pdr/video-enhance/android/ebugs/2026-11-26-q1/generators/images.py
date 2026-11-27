#!/usr/bin/env python3
"""Evidence for the Q1 batch (Video Enhance Android, 16.9.0 build 2611231): red-boxed JPEGs from the Q1 run
(runs/2026-11-26-q1-questions/) into the batch's images folder. Nothing is drawn but red boxes.
Run from the repo root: python3 library/pdr/video-enhance/android/ebugs/2026-11-26-q1/generators/images.py
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
RUN = f"{ROOT}/runs/2026-11-26-q1-questions"
IMG = f"{ROOT}/ebugs/2026-11-26-q1/20261126_eBug_drafts_Video-Enhance-Q1_16.9.0_images"


def boxed(src, sub, dst, boxes):
    os.makedirs(f"{IMG}/{sub}", exist_ok=True)
    im = Image.open(f"{RUN}/{src}").convert("RGB")
    d = ImageDraw.Draw(im)
    for b in boxes:
        d.rectangle(b, outline=(255, 0, 0), width=8)
    im.save(f"{IMG}/{sub}/{dst}", "JPEG", quality=82)
    print(sub, dst, im.size)


# ISS-VEA-58 (Q-28): playhead at 01:50 before play; stopped at the right handle 20 s later; next play from 00:30
PT, BUB, SEL = (30, 822, 262, 888), (240, 1020, 420, 1240), (895, 978, 1030, 1036)
PLAY = (490, 805, 590, 905)
boxed("screenshots/tc350-s2-knob.png", "01_ISS-VEA-58", "16.9.0_vea58_playhead_0150_before_play.jpg",
      [PT, PLAY, (240, 1020, 400, 1240), SEL])
boxed("screenshots/tc350-s5-20s-after.png", "01_ISS-VEA-58", "16.9.0_vea58_stopped_at_right_handle.jpg",
      [PT, PLAY, BUB, SEL])
boxed("recordings/tc350r/full-1.6.png", "01_ISS-VEA-58", "16.9.0_vea58_next_play_from_0030.jpg",
      [PT, PLAY, (110, 1020, 260, 1240), SEL])
# ISS-VEA-59 (Q-14): the panel right before the tap, the processing dialog right after it, the first-launch consent
boxed("screenshots/tc351-burst/b03.png", "02_ISS-VEA-59", "16.9.0_vea59_panel_before_enhance.jpg",
      [(125, 1978, 955, 2102)])
boxed("screenshots/tc351-burst/b04.png", "02_ISS-VEA-59", "16.9.0_vea59_upload_dialog_no_consent.jpg",
      [(200, 836, 880, 1564)])
boxed("screenshots/tc351-reset-01.png", "02_ISS-VEA-59", "16.9.0_vea59_first_launch_terms_only.jpg",
      [(60, 1930, 1030, 2020)])
