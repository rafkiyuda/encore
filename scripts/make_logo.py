"""Buat varian logo transparan dari logo sumber (latar putih).
Pemakaian: python3 scripts/make_logo.py scripts/logo-source.webp"""
import sys, os
import numpy as np
from PIL import Image

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'brand')
a = np.array(Image.open(sys.argv[1]).convert('RGB')).astype(float)

def bands(fg):
    rows = fg.any(axis=1); out = []; s = None
    for i, v in enumerate(rows):
        if v and s is None: s = i
        if not v and s is not None: out.append((s, i)); s = None
    return out

fg = a.min(axis=2) < 200
icon_b, word_b, tag_b = bands(fg)[:3]

def solid(region, channel_fn, color):
    """Warna solid + alpha dari kedalaman tinta (anti-alias tetap halus)."""
    ink = channel_fn(region)
    lo = np.percentile(ink[ink < 200], 5)
    alpha = np.clip((250 - ink) / (250 - lo), 0, 1)  # 250: abaikan noise latar (254)
    rgba = np.zeros(region.shape[:2] + (4,), np.uint8)
    rgba[..., :3] = color; rgba[..., 3] = (alpha * 255).round()
    return Image.fromarray(rgba, 'RGBA')

orange_px = a[(a[..., 2] < 90) & (a[..., 0] > 200)]
ORANGE = tuple(int(x) for x in np.median(orange_px, axis=0))
gray_px = a[tag_b[0]:tag_b[1]].reshape(-1, 3); gray_px = gray_px[gray_px.min(axis=1) < 120]
GRAY = tuple(int(x) for x in np.median(gray_px, axis=0))
print('orange', ORANGE, 'gray', GRAY)

blue = lambda r: r[..., 2]
lum = lambda r: r.min(axis=2)

def band_img(b, fn, color):
    im = solid(a[b[0]:b[1]], fn, color)
    return im.crop(im.getbbox())

icon = band_img(icon_b, blue, ORANGE)
word = band_img(word_b, blue, ORANGE)
tag = band_img(tag_b, lum, GRAY)

def fit_w(im, w):
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if im.width > w else im

# 1) Logo lengkap (bertumpuk)
W = 1254; full = Image.new('RGBA', (W, 1254), (0, 0, 0, 0))
src = solid(a, lambda r: np.where(np.arange(r.shape[0])[:, None] >= tag_b[0], 255, r[..., 2]), ORANGE)
full_tag = solid(a, lum, GRAY)
full.alpha_composite(src)
tagpart = Image.new('RGBA', full.size, (0, 0, 0, 0)); tagpart.paste(full_tag.crop((0, tag_b[0], W, tag_b[1])), (0, tag_b[0]))
full.alpha_composite(tagpart)
full = full.crop(full.getbbox())
fit_w(full, 800).save(f'{OUT}/logo.png', optimize=True)

# 2) Mark (ikon saja) + favicon
fit_w(icon, 512).save(f'{OUT}/logo-mark.png', optimize=True)
def square(im, size, pad=0.08, bg=(0, 0, 0, 0)):
    c = Image.new('RGBA', (size, size), bg); inner = int(size * (1 - 2 * pad))
    s = im.copy(); s.thumbnail((inner, inner), Image.LANCZOS)
    c.alpha_composite(s, ((size - s.width) // 2, (size - s.height) // 2)); return c
square(icon, 64, 0.02).save(os.path.join(OUT, '..', 'favicon.png'), optimize=True)
square(icon, 180, 0.12, (255, 255, 255, 255)).convert('RGB').save(os.path.join(OUT, '..', 'apple-touch-icon.png'), optimize=True)

# 3) Lockup horizontal (ikon + wordmark) untuk navbar/footer
H = 160
ic = icon.resize((round(icon.width * H / icon.height), H), Image.LANCZOS)
wh = round(H * 0.42)
wd = word.resize((round(word.width * wh / word.height), wh), Image.LANCZOS)
gap = round(H * 0.18)
hz = Image.new('RGBA', (ic.width + gap + wd.width, H), (0, 0, 0, 0))
hz.alpha_composite(ic, (0, 0)); hz.alpha_composite(wd, (ic.width + gap, (H - wh) // 2 + round(H * 0.04)))
hz.save(f'{OUT}/logo-horizontal.png', optimize=True)
white = hz.copy(); px = np.array(white); px[..., :3] = 255
Image.fromarray(px, 'RGBA').save(f'{OUT}/logo-horizontal-white.png', optimize=True)
print('ok', full.size, icon.size, hz.size)
