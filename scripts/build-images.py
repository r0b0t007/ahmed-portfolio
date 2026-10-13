"""
Rebuilds the responsive hero portrait set in public/ from the master photo.

    python scripts/build-images.py <master.png>      (needs: pip install pillow>=11 numpy)

Emits headshot-{320,412,440,700} in both .avif and .webp. Every width is rewritten on every run:
skipping files that already exist would let a new master photo reach AVIF-capable browsers while
everyone else kept the old one, with nothing to warn you. headshot-700.webp is the <img> fallback
for browsers without AVIF and the image the JSON-LD Person node points at, so it has to stay in
step with the AVIF set. (Open Graph uses og-image.png, which this script does not touch.)

Widths: the portrait box is a 76px square on phones and min(40vw, 640px) on desktop (see the
`sizes` attribute in src/components/HeroPortrait.jsx). 320 serves every phone (76px at up to
DPR 4); 412/440 serve DPR-1 desktops between 900 and ~1100px; 700 serves wider DPR-1 desktops
and every DPR-2 one. Do not add a larger candidate: a DPR-2 desktop wants up to 1280px and
would pick it.

AVIF quality 55 at the slowest encoder speed lands within 1 dB PSNR of the existing q80 WebP
files at ~60% of their size; the page then applies its own grayscale/contrast/sepia filter.
"""
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public'
WIDTHS = (320, 412, 440, 700)


def main(master):
    src = Image.open(master).convert('RGB')
    for w in WIDTHS:
        h = round(w * src.height / src.width)
        im = src.resize((w, h), Image.LANCZOS)
        avif = OUT / f'headshot-{w}.avif'
        im.save(avif, 'AVIF', quality=55, speed=0)
        print(f'{avif.name:20} {w}x{h}  {avif.stat().st_size / 1024:5.1f} KiB')
        webp = OUT / f'headshot-{w}.webp'
        im.save(webp, 'WEBP', quality=80, method=6)
        print(f'{webp.name:20} {w}x{h}  {webp.stat().st_size / 1024:5.1f} KiB')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('usage: python scripts/build-images.py <master.png>')
    main(sys.argv[1])
