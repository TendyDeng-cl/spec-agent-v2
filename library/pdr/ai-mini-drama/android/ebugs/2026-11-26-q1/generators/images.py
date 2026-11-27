#!/usr/bin/env python3
"""Red-boxed JPG attachments for the AI Mini Drama Android Q1 batch (16.9.0, 2611231). Boxes are in screenshot
pixels (1080x2400, SM-A5360). An empty box list draws a thin frame round the whole picture. Run from the repo root."""
import os
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "20261126_eBug_drafts_AI-Mini-Drama-Q1_16.9.0_images")
SHOTS = os.path.join(HERE, *[".."] * 3, "runs", "2026-11-26-q1-questions", "screenshots")
IMGS = {
 "01_ISS-AMDA-71": [("TC-580-1-play-country.png", "amda71_play_country", [(50, 1320, 1030, 1570)]),
                    ("TC-580-2-packs.png", "amda71_prices_ntd", [(60, 620, 1015, 1430)]),
                    ("TC-580-3-landing.png", "amda71_landing_templates", [(40, 1040, 1040, 2075)]),
                    ("TC-580-4-more.png", "amda71_more_top", []),
                    ("TC-580-4-more-end.png", "amda71_more_bottom", [])],
 "02_ISS-AMDA-72": [("TC-581-2-a-bottom.png", "amda72_storyboard_to_settings", [(40, 1100, 1040, 1290)]),
                    ("TC-582-2-bottom.png", "amda72_preview_to_full_card", [(60, 1620, 1020, 1990)])],
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
