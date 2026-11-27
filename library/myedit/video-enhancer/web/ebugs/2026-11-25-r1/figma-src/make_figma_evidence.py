# Builds the Figma spec images and the UI comparison image for the R1 batch from the
# PM Figma screenshots in this folder (figma-pm / qa1, file 3u8Oau1mvpNc8qKqBNFGlf, 2026-11-25).
# Deterministic: crops of the fetched node images plus green (#00A651) boxes; no redrawing.
import hashlib, json, os, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.dirname(HERE)
IMG = os.path.join(BATCH, '20261125_eBug_drafts_Video-Enhancer-R1_5.11.0_images')
GREEN = (0x00, 0xA6, 0x51)
FONT = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 16)
FILE = 'https://www.figma.com/design/3u8Oau1mvpNc8qKqBNFGlf/-MyEdit--Video-Enhancer?node-id='


def sha(p):
    return hashlib.sha256(open(p, 'rb').read()).hexdigest()


def spec(src, crop, boxes, out, node, what):
    im = Image.open(os.path.join(HERE, src)).convert('RGB')
    x0, y0, x1, y1 = crop
    im = im.crop(crop)
    d = ImageDraw.Draw(im)
    for (x, y, w, h) in boxes:
        d.rectangle([x - x0, y - y0, x - x0 + w, y - y0 + h], outline=GREEN, width=3)
    p = os.path.join(IMG, out)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    im.save(p)
    return {'out': p, 'outSha256': sha(p), 'src': os.path.join(HERE, src), 'srcSha256': sha(os.path.join(HERE, src)),
            'crop_px': list(crop), 'green_boxes_src_px': [list(b) for b in boxes], 'node': FILE + node, 'shows': what}


# board 9 screenshot: 4820x579 for the 4740x499 section, 1:1 with a 40 px margin
def card(cx):  # card crop and element boxes for a card at section x = cx
    X = cx + 40
    return {'crop': (X - 20, 142, X + 620, 472), 'dialog': (X, 245, 440, 187),
            'body': (X + 32, 245 + 66, 376, 40), 'gotit': (X + 331, 245 + 130, 77, 33)}

C1, C2, C3, C5, C6 = card(120), card(780), card(1440), card(2760), card(3420)
B9 = 'board9_235-1137.png'
rec = []
rec.append(spec(B9, C1['crop'], [C1['dialog']], '02/Figma_Unsupported_File_Format_dialog.png', '237-1251',
                'Case 1 dialog Unsupported File Format (AVI)'))
rec.append(spec(B9, C5['crop'], [C5['dialog']], '02/Figma_Below_128px_resolution_dialog.png', '382-1791',
                'Case 5 dialog Video Resolution Not Supported (shorter side below 128 px)'))
rec.append(spec(B9, C6['crop'], [C6['dialog']], '02/Figma_Over_120fps_frame_rate_dialog.png', '383-1791',
                'Case 6 dialog Video Frame Rate Not Supported (over 120 fps)'))
rec.append(spec(B9, (C1['crop'][0], 142, C3['crop'][2], 472), [C1['gotit'], C2['gotit'], C3['gotit']],
                '03/Figma_Got_it_button_cases_1-3.png', '237-1269',
                'Cases 1-3 dialogs, button Got it (lower-case i) on each'))
rec.append(spec(B9, C3['crop'], [C3['body']], '09/Figma_Resolution_dialog_1440p.png', '237-1273',
                'Case 3 dialog body: ... resolution limit (1440p) ...'))
# board 10 frame 3 (362:1882) at 1680x1130 (0.988 of 1700x1143)
rec.append(spec('board10_step3_362-1882.png', (0, 640, 1680, 1130), [(4, 1066, 1290, 32)],
                '10/Figma_Trimmer_Standard_hint.png', '359-1999',
                'Trimmer step 3 note: Standard hint text Standard mode supports videos up to 8 minutes long...'))
# board 10 frame 2 (360:1789) at 1680x1003
rec.append(spec('board10_step2_360-1789.png', (0, 0, 1240, 1003), [(90, 254, 272, 24), (92, 866, 350, 44), (4, 970, 1232, 32)],
                '11/Figma_Professional_over_2-30_red_text.png', '360-1789',
                'Step 2: Professional over 2:30 shows the red 2:30 text, Enhance disabled; note says Replace Video over 2:30 gives this state'))
# EDM success mail frame (207:1216) at 1264x938
rec.append(spec('edm_207-1216.png', (0, 0, 1264, 938), [(402, 374, 420, 54)],
                '14/Figma_EDM_result_ready_body_text.png', '207-1229',
                'Result-ready mail body: Your enhanced video is ready! Click the button below...'))
# mobile uploading frame (457:3443) at 375x640
fig09 = spec('mobile_uploading_457-3443.png', (0, 0, 375, 640), [(10, 402, 355, 236)],
             '07/Figma_Mobile_uploading_state.png', '457-3443',
             'Mobile uploading: Processing above, settings summary and Enhance dimmed below')
rec.append(fig09)

# UI comparison image for ISS-VEW-09: highlighted actual left, Figma with green right
act = Image.open(os.path.join(BATCH, 'upload', 'Highlight_Mobile_Processing_covers_room.png')).convert('RGB')
fig = Image.open(fig09['out']).convert('RGB')
pad, top, gap = 24, 44, 48
W = pad + act.width + gap + fig.width + pad
H = top + max(act.height, fig.height) + pad
cmp_ = Image.new('RGB', (W, H), (245, 245, 245))
cmp_.paste(act, (pad, top))
cmp_.paste(fig, (pad + act.width + gap, top))
d = ImageDraw.Draw(cmp_)
d.text((pad, 14), 'Actual - highlighted UI', fill=(0xC6, 0x28, 0x28), font=FONT)
d.text((pad + act.width + gap, 14), 'Figma / Spec - expected', fill=GREEN, font=FONT)
cp = os.path.join(IMG, '07', 'Comparison_Mobile_uploading_state.png')
cmp_.save(cp)
rec.append({'out': cp, 'outSha256': sha(cp), 'left': os.path.join(BATCH, 'upload', 'Highlight_Mobile_Processing_covers_room.png'),
            'leftSha256': sha(os.path.join(BATCH, 'upload', 'Highlight_Mobile_Processing_covers_room.png')),
            'right': fig09['out'], 'rightSha256': fig09['outSha256'], 'node': FILE + '457-3443',
            'transform': 'no scaling; left at (24,44), right at (%d,44); neutral padding' % (pad + act.width + gap),
            'shows': 'red: Processing covers the whole screen (actual); green: summary and Enhance dimmed below Processing (Figma)'})
json.dump(rec, open(os.path.join(HERE, 'figma-evidence-record.json'), 'w', encoding='utf-8'), indent=1, ensure_ascii=False)
print(len(rec), 'images')
