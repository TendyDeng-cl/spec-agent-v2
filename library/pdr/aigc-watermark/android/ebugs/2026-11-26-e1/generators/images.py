"""Images for the E1 batch (AIGC Watermark Android, entry round): each entry's run screenshots side by side, captioned.
Run with python3 -I from anywhere."""
import os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
BATCH = os.path.dirname(HERE)
RUN = os.path.normpath(os.path.join(BATCH, '../../runs/2026-11-26-e1-entries/screenshots'))
OUTROOT = os.path.join(BATCH, '20261126_eBug_drafts_AIGC-Watermark-E1_16.9.0_images')
font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Unicode.ttf', 30)

SETS = {
    '01_ISS-AWA-20': [('16.9.0_awa20_toolbar_places.jpg', [
        ('TC-172-selected.png', 'Video toolbar: Video Edit by Chat on the first layer'),
        ('TC-202-selected.png', 'Photo toolbar: Cinematic Reel Creator on the first layer'),
        ('TC-214-tools.png', 'Video toolbar: no AI Remove')])],
    '02_ISS-AWA-21': [('16.9.0_awa21_selected_not_taken.jpg', [
        ('TC-172-selected.png', 'Clip selected on the main track'),
        ('TC-172-page.png', 'Video Edit by Chat: 「Import a Video」, clip not taken'),
        ('TC-202-crc.png', 'Cinematic Reel Creator from a selected photo: 「Import a photo」')])],
    '03_ISS-AWA-22': [('16.9.0_awa22_length_rounded.jpg', [
        ('TC-161-after-pick.png', 'Trim page: Selected Length 8.3 seconds'),
        ('TC-161-page-src.png', 'Source tile 00:09, Generate Video 126 (14 x 9 s)')])],
    '04_ISS-AWA-23': [('16.9.0_awa23_no_text_voice_switch.jpg', [
        ('TC-252-voiceitem.png', 'Audio clip toolbar entry: Edit the Voice and Format, no By Text / By Voice'),
        ('e1c-ta-primary-voice.png', 'AI Magic entry: Edit the Script with By Text / By Voice')])],
    '05_ISS-AWA-24': [('16.9.0_awa24_selection_dropped.jpg', [
        ('TC-273-tools.png', 'Photo selected, Tools > Text to Image'),
        ('TC-273-editor.png', 'After Back: nothing selected (Global toolbar)')])],
    '06_ISS-AWA-25': [('16.9.0_awa25_not_in_my_artwork.jpg', [
        ('TC-283-applied.png', 'AI Cartoon result applied to the photo'),
        ('TC-283-myartwork.png', 'My Artwork: no AI Cartoon / AI Sketch block')])],
    '07_ISS-AWA-26': [('16.9.0_awa26_back_empty_editor.jpg', [
        ('TC-284-intro.png', 'AI Magic > AI Cartoon intro'),
        ('TC-284-picker-back.png', 'Back at the photo step: an empty editor')])],
    '08_ISS-AWA-27': [('16.9.0_awa27_title_left.jpg', [
        ('TC-296-panel.png', 'Text to Speech: Select Voice, title added'),
        ('TC-296-editor.png', 'After Back: the title stays on the timeline')])],
    '09_ISS-AWA-28': [('16.9.0_awa28_clip_left_selected.jpg', [
        ('TC-315-before.png', 'Nothing selected'),
        ('TC-315-panel.png', 'Audio > AI Voice Changer'),
        ('TC-315-editor.png', 'After Back: the main clip is selected')])],
    '10_ISS-AWA-29': [('16.9.0_awa29_menu_back.jpg', [
        ('TC-367-menu.png', 'Menu > My Artwork'),
        ('TC-367-myartwork.png', 'My Artwork'),
        ('TC-367-back.png', 'System Back: Home tab, Menu closed')])],
    '11_ISS-AWA-30': [('16.9.0_awa30_no_side_margin.jpg', [
        ('TC-364-myartwork.png', 'AI Magic > My Artwork: side margin'),
        ('TC-368-myartwork.png', 'Pro (Mine) > My Artwork: content at the screen edge')])],
}

for folder, outs in SETS.items():
    od = os.path.join(OUTROOT, folder); os.makedirs(od, exist_ok=True)
    for name, shots in outs:
        tiles = []
        for f, cap in shots:
            im = Image.open(os.path.join(RUN, f)).convert('RGB')
            im = im.resize((540, int(im.height * 540 / im.width)))
            tiles.append((im, cap))
        h = max(t.height for t, _ in tiles) + 90
        canvas = Image.new('RGB', (len(tiles) * 560 + 20, h), 'white')
        dr = ImageDraw.Draw(canvas)
        for i, (t, cap) in enumerate(tiles):
            x = 20 + i * 560
            canvas.paste(t, (x, 80))
            words, line, lines = cap.split(), '', []
            for w in words:
                if dr.textlength(line + ' ' + w, font=font) > 530: lines.append(line); line = w
                else: line = (line + ' ' + w).strip()
            lines.append(line)
            for j, l in enumerate(lines[:2]): dr.text((x, 8 + j * 34), l, fill='black', font=font)
        canvas.save(os.path.join(od, name), quality=85)
print(OUTROOT)
