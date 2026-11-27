#!/usr/bin/env python3
"""Evidence for the R4 batch (Video Enhance Android, 16.9.0 build 2611251): red-boxed JPEGs and log excerpts from the R4
run (runs/2026-11-26-r4-full/) into the batch's images folder. Nothing is drawn but red boxes.
Run from the repo root: python3 library/pdr/video-enhance/android/ebugs/2026-11-26-r4/generators/images.py
"""
import os, re
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
RUN = f"{ROOT}/runs/2026-11-26-r4-full"
IMG = f"{ROOT}/ebugs/2026-11-26-r4/20261127_eBug_drafts_Video-Enhance-R4_16.9.0_images"


def boxed(src, sub, dst, boxes):
    os.makedirs(f"{IMG}/{sub}", exist_ok=True)
    im = Image.open(f"{RUN}/{src}").convert("RGB")
    d = ImageDraw.Draw(im)
    for b in boxes:
        d.rectangle(b, outline=(255, 0, 0), width=8)
    im.save(f"{IMG}/{sub}/{dst}", "JPEG", quality=82)
    print(sub, dst, im.size)


SECRET = re.compile(r"bearer|authorization|token|x-amz|signature|password", re.I)


def excerpt(src, sub, dst, start, end, pattern, header):
    os.makedirs(f"{IMG}/{sub}", exist_ok=True)
    keep = [header]
    for line in open(f"{RUN}/{src}", encoding="utf-8", errors="replace"):
        parts = line.split(" ", 2)
        if len(parts) < 2 or not (start <= parts[1] < end):
            continue
        if re.search(pattern, line) and not SECRET.search(line):
            keep.append(line.rstrip()[:240])
    open(f"{IMG}/{sub}/{dst}", "w").write("\n".join(keep) + "\n")
    print(sub, dst, len(keep) - 1, "lines")


BUBBLE = (40, 1175, 770, 1332)
# ISS-VEA-60: Mode bubble words, from the Launcher (TC-035) and from the AI Magic tab (TC-354)
boxed("screenshots/TC-035-bubble.png", "01_ISS-VEA-60", "16.9.0_vea60_mode_bubble_launcher.jpg", [BUBBLE])
boxed("screenshots/TC-354-mode.png", "01_ISS-VEA-60", "16.9.0_vea60_mode_bubble_ai_magic.jpg", [BUBBLE])
# ISS-VEA-61 (Q-20): the 「Turn on notifications」 dialog still open after system Back
boxed("screenshots/TC-211-dialog.png", "02_ISS-VEA-61", "16.9.0_vea61_dialog_before_back.jpg", [(160, 896, 920, 1456)])
boxed("screenshots/TC-211-adbback.png", "02_ISS-VEA-61", "16.9.0_vea61_dialog_after_back.jpg", [(160, 896, 920, 1456)])
excerpt("logs/R4-e-upload-hang-20261126-204453/logcat-live.txt", "02_ISS-VEA-61", "16.9.0_vea61_back_log.txt",
        "19:49:08", "19:49:36", r"WindowManagerGlobal#(add|remove)View|onKeyDown|KEYCODE_BACK|onBackInvoked|VideoEnhanceRecentTasksActivity: GDPR",
        "# PowerDirector 16.9.0.2611251, SM-A5360. 「Turn on notifications」 window added 19:49:08.261; system Back at "
        "19:49:1x (Appium) and 19:49:2x (adb KEYCODE_BACK): the dialog window (1cea508) stays until 19:49:35.658, when the run closed it and Recent task opened.")
# ISS-VEA-62: no ⓘ beside 「Selected Length」 on a 00:30 video; the 12:30 video has one
boxed("screenshots/TC-354-mode.png", "03_ISS-VEA-62", "16.9.0_vea62_no_info_0030.jpg", [(60, 972, 470, 1040)])
boxed("screenshots/TC-031-bubble.png", "03_ISS-VEA-62", "16.9.0_vea62_info_on_1230.jpg", [(55, 1005, 445, 1085)])
