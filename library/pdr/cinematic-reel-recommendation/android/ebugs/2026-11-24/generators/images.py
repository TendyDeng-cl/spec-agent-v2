#!/usr/bin/env python3
"""Red-boxed JPG attachments for the Cinematic Reel Recommendation Android R1 batch (16.9.0, 2611201).
Boxes are in screenshot pixels (1080x2520). Run from the repo root with .venv/bin/python."""
import os
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "20261124_eBug_drafts_Cinematic-Reel-Recommendation-R1_16.9.0_images")
RUN = os.path.join(HERE, *[".."] * 3, "runs", "2026-11-24-r1-full", "screenshots")
S = 1.26  # boxes measured on the 857x2000 preview
CHIP_SHEET, SENT = (120, 262, 384, 326), (40, 670, 815, 765)
IMGS = {
 "01_ISS-CRA-01": [("TC-011-addmedia.png", "cra01_add_media_header", [(25, 12, 835, 118)]),
                   ("TC-011-addmedia-scrolled.png", "cra01_add_media_scrolled", [(25, 12, 835, 118)])],
 "02_ISS-CRA-02": [("tc017-card.png", "cra02_zh_card_chip", [(120, 212, 384, 276)]),
                   ("tc017-sheet.png", "cra02_zh_sheet", [CHIP_SHEET, SENT]),
                   ("tc018-card.png", "cra02_ja_card_chip", [(120, 212, 384, 276)]),
                   ("tc018-sheet.png", "cra02_ja_sheet", [CHIP_SHEET, SENT])],
}
for folder, items in IMGS.items():
    os.makedirs(os.path.join(OUT, folder), exist_ok=True)
    for src, slug, boxes in items:
        im = Image.open(os.path.join(RUN, src)).convert("RGB")
        d = ImageDraw.Draw(im)
        for b in boxes:
            d.rectangle([round(v * S) for v in b], outline=(255, 0, 0), width=8)
        im.thumbnail((1400, 1400))
        im.save(os.path.join(OUT, folder, f"16.9.0_{slug}.jpg"), quality=80)
        print(folder, slug)
