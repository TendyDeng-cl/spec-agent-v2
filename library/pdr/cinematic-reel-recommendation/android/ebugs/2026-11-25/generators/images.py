#!/usr/bin/env python3
"""Red-boxed JPG attachments for the Cinematic Reel Recommendation Android R2 batch (16.9.0, 2611201).
Boxes are in screenshot pixels (1080x2520). Run from the repo root with .venv/bin/python."""
import os
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "20261125_eBug_drafts_Cinematic-Reel-Recommendation-R2_16.9.0_images")
RUN = os.path.join(HERE, *[".."] * 3, "runs", "2026-11-25-r2-full", "screenshots")
DESC = (175, 1425, 905, 1585)                       # tv_description of the centred card
H1, H2 = (45, 990, 1035, 1075), (45, 1583, 1035, 1668)   # heading rows, sheet top at 1001 (ar, fa, he)
G1, G2, BTN = (45, 949, 1035, 1034), (45, 1542, 1035, 1627), (60, 2190, 1020, 2333)  # sheet top at 960 (fil, tr)
IMGS = {
 "01_ISS-CRA-03": [("TC-030-card2.png", "cra03_ko_card2", [DESC]), ("TC-032-card6.png", "cra03_de_card6", [DESC]),
                   ("TC-074-card2.png", "cra03_uk_card2", [DESC]), ("TC-025-card4.png", "cra03_chs_card4", [DESC])],
 "02_ISS-CRA-04": [("TC-055-open1.png", "cra04_ar_sheet", [H1, H2]), ("TC-065-open1.png", "cra04_fa_sheet", [H1, H2]),
                   ("TC-067-open1.png", "cra04_he_sheet", [H1, H2]), ("TC-054-card1.png", "cra04_ar_card", [(175, 1345, 905, 1585)])],
 "03_ISS-CRA-05": [("TC-071-open3.png", "cra05_da_caption", [(60, 1440, 475, 1545)])],
 "04_ISS-CRA-06": [("TC-063-open1.png", "cra06_fil_sheet", [G1, G2, BTN])],
 "05_ISS-CRA-07": [("TC-061-open1.png", "cra07_tr_heading", [(60, 949, 420, 1034)])],
}
for folder, items in IMGS.items():
    os.makedirs(os.path.join(OUT, folder), exist_ok=True)
    for src, slug, boxes in items:
        im = Image.open(os.path.join(RUN, src)).convert("RGB")
        d = ImageDraw.Draw(im)
        for b in boxes:
            d.rectangle(list(b), outline=(255, 0, 0), width=8)
        im.thumbnail((1400, 1400))
        im.save(os.path.join(OUT, folder, f"16.9.0_{slug}.jpg"), quality=80)
        print(folder, slug)
