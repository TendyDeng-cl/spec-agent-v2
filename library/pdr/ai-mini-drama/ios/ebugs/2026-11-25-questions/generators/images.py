#!/usr/bin/env python3
"""Copy the run screenshots this batch cites into the drafts' images folder (644 px wide JPEG, red box on the
area the entry is about). Sources are the unchanged files of runs/2026-10-22-p9-full/screenshots/; nothing is drawn
except the red frame. Usage: python3 generators/images.py   (from the batch folder)"""
from pathlib import Path
from PIL import Image, ImageDraw

BATCH = Path(__file__).resolve().parent.parent
SHOTS = BATCH.parent.parent / 'runs' / '2026-10-22-p9-full' / 'screenshots'
IMAGES = BATCH / '20261125_eBug_drafts_AI-Mini-Drama-Questions_16.9.0_images'
# folder, output name, source screenshot, boxes (x0, y0, x1, y1 as fractions)
ITEMS = [
    ('01_ISS-AMD-74', '16.9.0_amd74_before_regenerate.jpg', 'TC-141-result.png', [(0.05, 0.42, 0.95, 0.53)]),
    ('01_ISS-AMD-74', '16.9.0_amd74_regenerated_no_menu.jpg', 'TC-141-result2.png', [(0.50, 0.143, 0.84, 0.415)]),
    ('02_ISS-AMD-75', '16.9.0_amd75_composer.jpg', 'TC-011-empty-chat.png', [(0.03, 0.535, 0.97, 0.665)]),
    ('02_ISS-AMD-75', '16.9.0_amd75_template_format_card.jpg', 'tc235-chat-open.png', [(0.03, 0.37, 0.97, 0.74)]),
    ('02_ISS-AMD-75', '16.9.0_amd75_cast_card.jpg', 'TC-193-chars.png', [(0.03, 0.60, 0.97, 0.82)]),
    ('02_ISS-AMD-75', '16.9.0_amd75_characters_result.jpg', 'SB2-offer.png', [(0.03, 0.27, 0.97, 0.47)]),
    ('02_ISS-AMD-75', '16.9.0_amd75_scene_editor.jpg', 'TC-070-editor.png', [(0.03, 0.08, 0.97, 0.66)]),
]
for folder, name, src, boxes in ITEMS:
    im = Image.open(SHOTS / src).convert('RGB')
    w = 644
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    for x0, y0, x1, y1 in boxes:
        d.rectangle([x0 * im.width, y0 * im.height, x1 * im.width, y1 * im.height], outline=(255, 0, 0), width=4)
    out = IMAGES / folder
    out.mkdir(parents=True, exist_ok=True)
    im.save(out / name, 'JPEG', quality=88)
    print(out / name)
