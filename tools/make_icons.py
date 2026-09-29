"""Draw the app icons (white 7, dashed 5 m line, yellow card on jersey black).

Needs Pillow and a TTF of Barlow Condensed ExtraBold.
Make the TTF from the bundled woff2 with fontTools and brotli:
    pip install pillow fonttools brotli
    python -c "from fontTools.ttLib import TTFont; f=TTFont('fonts/barlow-condensed-latin-800.woff2'); f.flavor=None; f.save('BarlowCondensed-800.ttf')"
Run from the repo root:  python tools/make_icons.py BarlowCondensed-800.ttf
"""
import sys
from PIL import Image, ImageDraw, ImageFont

FONT = sys.argv[1] if len(sys.argv) > 1 else 'BarlowCondensed-800.ttf'

def make(size, path):
    S = size * 4
    img = Image.new('RGB', (S, S), '#0E234B')
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(FONT, int(S * 0.62))
    d.text((S * 0.47, S * 0.46), '7', font=f, fill='#FFFFFF', anchor='mm')
    y, dash, gap, x = S * 0.735, S * 0.06, S * 0.04, S * 0.27
    while x + dash < S * 0.74:
        d.rectangle([x, y, x + dash, y + S * 0.011], fill='#9EA7AF')
        x += dash + gap
    card = Image.new('RGBA', (int(S * 0.10), int(S * 0.15)), (0, 0, 0, 0))
    ImageDraw.Draw(card).rounded_rectangle([0, 0, card.width - 1, card.height - 1], radius=int(S * 0.012), fill='#F5C400')
    card = card.rotate(12, expand=True, resample=Image.BICUBIC)
    img.paste(card, (int(S * 0.60), int(S * 0.20)), card)
    img.resize((size, size), Image.LANCZOS).save(path)

make(192, 'icons/icon-192.png')
make(512, 'icons/icon-512.png')
make(512, 'icons/icon-maskable-512.png')
make(180, 'icons/apple-touch-icon.png')
print('icons written')
