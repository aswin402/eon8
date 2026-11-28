"""Builds the EON8 favicon set from the logo (run once; the output files are committed).

The live WordPress favicon (public/wp-content/uploads/2019/07/favicon.png, 36x36) is the orange
"8" from the logo on a dark navy rounded square. This rebuilds the same icon at every size from
the 8 in the full logo, so large icons (phone home screen, 512px) stay sharp:

    python scripts/build-favicons.py

Writes to public/: favicon.ico (16/32/48), favicon-32x32.png, apple-touch-icon.png (180),
icon-192.png, icon-512.png, icon-maskable-512.png.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
LOGO = PUBLIC / 'wp-content/uploads/2026/03/Logo-White-BG-removebg-preview.png'
NAVY = (0, 0, 30, 255)        # measured on the live favicon
ORANGE = (245, 130, 32, 255)  # measured on the live favicon
GLYPH_BOX = (385, 50, 452, 160)  # the "8" in the logo, with a margin


def glyph_mask(scale: int = 8) -> Image.Image:
    """The 8 as a clean alpha mask: the logo's orange pixels, enlarged, smoothed and re-thresholded."""
    logo = Image.open(LOGO).convert('RGBA').crop(GLYPH_BOX)
    w, h = logo.size
    mask = Image.new('L', (w, h), 0)
    src = logo.load()
    dst = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = src[x, y]
            is_orange = r > 150 and 60 < g < 200 and b < 120
            dst[x, y] = a if is_orange else 0
    big = mask.resize((w * scale, h * scale), Image.BICUBIC).filter(ImageFilter.GaussianBlur(scale * 0.6))
    big = big.point(lambda v: 255 if v >= 128 else 0)
    return big.crop(big.getbbox())


def icon(size: int, glyph: Image.Image, *, rounded: bool, glyph_height: float, supersample: int = 4) -> Image.Image:
    s = size * supersample
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    if rounded:
        pad = round(s / 36)  # the live icon leaves about 1px of 36 around the square
        draw.rounded_rectangle([pad, pad, s - 1 - pad, s - 1 - pad], radius=round(s * 0.2), fill=NAVY)
    else:
        draw.rectangle([0, 0, s - 1, s - 1], fill=NAVY)
    gh = round(s * glyph_height)
    gw = round(glyph.width * gh / glyph.height)
    g = glyph.resize((gw, gh), Image.LANCZOS)
    color = Image.new('RGBA', (gw, gh), ORANGE)
    x = (s - gw) // 2
    y = (s - gh) // 2 - round(s * 0.01)
    img.paste(color, (x, y), g)
    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    glyph = glyph_mask()
    # Browser tab sizes: 16 and 32px straight from the live 36px favicon (identical look);
    # 48px rebuilt with the same proportions (8 = 83% of the height).
    live = Image.open(PUBLIC / 'wp-content/uploads/2019/07/favicon.png').convert('RGBA')
    small = {n: live.resize((n, n), Image.LANCZOS) for n in (16, 32)}
    small[48] = icon(48, glyph, rounded=True, glyph_height=0.83)
    small[48].save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[small[16], small[32]])
    small[32].save(PUBLIC / 'favicon-32x32.png')
    # Android / PWA icons with the same rounded square.
    icon(192, glyph, rounded=True, glyph_height=0.8).save(PUBLIC / 'icon-192.png')
    icon(512, glyph, rounded=True, glyph_height=0.8).save(PUBLIC / 'icon-512.png')
    # Full-bleed versions: iOS and Android "maskable" icons cut their own shape, so keep the 8
    # inside the safe zone.
    icon(180, glyph, rounded=False, glyph_height=0.66).convert('RGB').save(PUBLIC / 'apple-touch-icon.png')
    icon(512, glyph, rounded=False, glyph_height=0.6).save(PUBLIC / 'icon-maskable-512.png')
    print('Favicons written to', PUBLIC)


if __name__ == '__main__':
    main()
