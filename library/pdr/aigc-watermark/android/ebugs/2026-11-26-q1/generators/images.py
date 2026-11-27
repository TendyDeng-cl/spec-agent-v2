"""Images for the Q1 batch (AIGC Watermark Android): the c2patool readings of the editor exports as one picture,
and the switch On export's screens with a red box. Run with python3 -I from anywhere."""
import json, os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.dirname(HERE)
RUN = os.path.normpath(os.path.join(BATCH, '../../runs/2026-11-26-q1-questions'))
R3 = os.path.normpath(os.path.join(BATCH, '../../runs/2026-11-23-r3-full'))
OUT = os.path.join(BATCH, '20261126_eBug_drafts_AIGC-Watermark-Q1_16.9.0_images', '01_ISS-AWA-19')
os.makedirs(OUT, exist_ok=True)
font = lambda s: ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', s)
rows = [('TC-065-tts-off', 'AI Text to Speech project, switch Off'), ('TC-071-anime-off', 'AI Anime project, switch Off'),
        ('TC-066-tts-on', 'AI Text to Speech project, switch ON'), ('TC-158-i2v-fulleditor-on', 'Image to Video result in Full Editor, switch ON')]
lines = []
for name, what in rows:
    d = json.load(open(os.path.join(RUN, 'files', name + '.c2patool.json')))
    m = d['manifests'][d['active_manifest']]
    acts = [a for x in m['assertions'] if x['label'].startswith('c2pa.actions') for a in x['data']['actions']]
    lines.append((name + '.mp4  (' + what + ')', [
        'title: ' + m.get('title', ''),
        'signer: ' + m['signature_info']['common_name'] + ' (issuer ' + m['signature_info']['issuer'] + ')',
        'generator: ' + m['claim_generator_info'][0]['name'] + ' ' + m['claim_generator_info'][0]['version'],
        'actions: ' + '; '.join(a['action'] + ' / ' + a.get('digitalSourceType', '').rsplit('/', 1)[-1] for a in acts),
        'ingredients: ' + str(len(m.get('ingredients', []))) + '   validation_state: ' + d['validation_state']], 'ON' in what))
W, lh = 1500, 30
H = 70 + len(lines) * (lh * 6 + 30)
img = Image.new('RGB', (W, H), 'white'); dr = ImageDraw.Draw(img)
dr.text((20, 20), 'c2patool 0.29.0 on the editor exports (PowerDirector Android 16.9.0)', fill='black', font=font(26))
y = 70
for head, body, on in lines:
    top = y
    dr.text((30, y), head, fill='black', font=font(22)); y += lh + 4
    for b in body: dr.text((50, y), b, fill=(40, 40, 40), font=font(20)); y += lh
    if on: dr.rectangle((15, top - 8, W - 15, y + 4), outline='red', width=5)
    y += 30
img.save(os.path.join(OUT, '16.9.0_awa19_c2patool_readings.jpg'), quality=90)
# The switch On export of the TTS project (R3 TC-066): Produce sheet straight after Export, then saved
for src, dst, box in [(os.path.join(R3, 'screenshots', 'TC-066-saved.png'), '16.9.0_awa19_tts_on_saved.jpg', (350, 1250, 730, 1335))]:
    im = Image.open(src).convert('RGB'); ImageDraw.Draw(im).rectangle(box, outline='red', width=6); im.save(os.path.join(OUT, dst), quality=88)
print(OUT)
