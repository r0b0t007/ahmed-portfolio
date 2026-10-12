"""
Rebuilds src/fonts/*.woff2 and src/fonts/fonts.css: the two font files the site ships.

    python scripts/subset-fonts.py        (needs: pip install fonttools brotli; run `npm run build` first)

Why not Google Fonts: even when you ask for one weight, Google serves the full variable file and
the request costs two cross-origin connections plus a render-blocking stylesheet.

Why two files, one family: the Colour system (DESIGN.md) sets everything in Archivo. Body 400,
labels and emphasis 600-700 at normal width; headings at 800 in Archivo's Expanded width (wdth 125).
Every @font-face the page uses is requested at first layout, before first paint, so under
Lighthouse's simulated 1.5 Mbps link all font bytes delay FCP. Keeping the width axis in one
variable file cost 45 KiB; a normal-width 400-700 variable file plus one static Expanded 800 is
33 KiB and renders the same.

Glyph coverage:
  - Archivo (body; also form inputs)  -> printable ASCII + Latin-1 + everything on the page
  - Archivo Expanded (headings only)  -> only the characters that appear in the rendered page or
                                         anywhere in src/; it never renders user input
Layout features are trimmed to `kern` and `tnum` (the site uses no ligatures, small caps or marks;
tnum is what makes the price and fact figures' tabular-nums do anything).

fonts.css is generated so the @font-face carries the exact unicode-range its file covers;
src/index.css imports it. Re-run after copy changes that introduce a new character; the build
does not do this for you.
"""
import html, io, re, shutil, sys, tempfile, urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'fonts'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

# One entry per emitted file. `family` is the Google Fonts family, `axes` the instancer spec:
# a (min, max) tuple keeps a variable axis restricted to that range, a number pins it. `css`
# is the font-weight the @font-face declares.
FACES = [
    dict(file='archivo', family='Archivo', css_family='Archivo', style='normal',
         query='wdth,wght@100,400..700', axes={'wght': (400, 700)}, css='400 700'),
    # Google pins a single-value axis itself, so this one arrives static: Expanded width, 800.
    dict(file='archivo-expanded', family='Archivo', css_family='Archivo Expanded', style='normal',
         query='wdth,wght@125,800', axes={}, css='800'),
]


def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA})).read()


def latin_source(face):
    """The font file Google serves for this family/instance (the latin unicode-range block)."""
    css = fetch(f"https://fonts.googleapis.com/css2?family={face['family'].replace(' ', '+')}:{face['query']}&display=swap").decode()
    for blk in re.findall(r'@font-face \{(.*?)\}', css, re.S):
        if 'unicode-range: U+0000-00FF' in blk:
            return fetch(re.search(r'url\((\S+?)\)', blk)[1])
    sys.exit(f"no latin block in Google CSS for {face['family']}")


def site_glyphs():
    dist = ROOT / 'dist' / 'index.html'
    if not dist.exists():
        sys.exit('run `npm run build` first — glyphs are read from dist/index.html')
    doc = re.sub(r'<script.*?</script>|<style.*?</style>', '', dist.read_text('utf-8'), flags=re.S)
    text = html.unescape(re.sub(r'<[^>]+>', ' ', doc))
    for f in (ROOT / 'src').rglob('*.js*'):
        text += f.read_text('utf-8')
    return {ord(c) for c in text if not c.isspace()} | {0x20}


def unicode_range(codepoints):
    cps = sorted(codepoints)
    ranges, start, prev = [], cps[0], cps[0]
    for cp in cps[1:] + [None]:
        if cp is not None and cp == prev + 1:
            prev = cp
            continue
        ranges.append(f'U+{start:04X}' if start == prev else f'U+{start:04X}-{prev:04X}')
        if cp is not None:
            start = prev = cp
    return ', '.join(ranges)


def build(face, cps, outdir):
    font = TTFont(io.BytesIO(latin_source(face)), lazy=False)
    if 'fvar' in font:
        font = instancer.instantiateVariableFont(font, face['axes'], inplace=False, updateFontNames=True)
        buf = io.BytesIO(); font.save(buf); buf.seek(0)
        font = TTFont(buf, lazy=False)  # reload: the subsetter needs fully-loaded variation tables
    elif face['axes']:
        sys.exit(f"{face['file']}: static source but axes requested")
    opts = Options()
    opts.flavor, opts.hinting, opts.desubroutinize, opts.notdef_outline = 'woff2', False, True, True
    # kern, plus tnum: the price table and the fact figures set font-variant-numeric, and trimming
    # the feature out of the emitted file makes that CSS inert.
    opts.layout_features = ['kern', 'tnum']
    sub = Subsetter(opts)
    sub.populate(unicodes=cps & set(font.getBestCmap()))
    sub.subset(font)
    font.flavor = 'woff2'
    path = outdir / f"{face['file']}.woff2"
    font.save(path)
    return path.stat().st_size, set(font.getBestCmap())


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    site = site_glyphs()
    full = site | set(range(0x20, 0x7F)) | set(range(0xA0, 0x100))
    css = ['/* Generated by scripts/subset-fonts.py — do not edit. Vite hashes the files into /assets/;',
           '   vite.config.js preloads the faces the hero paints with. */']
    total = 0
    # Build every face into a temp dir and only then replace src/fonts/. Deleting first would let
    # any mid-run failure (Google changed its CSS, the network dropped, fontTools raised) leave the
    # directory empty with a fonts.css still pointing at the files it deleted, which fails the next
    # `npm run build` at critical-head instead of failing here.
    with tempfile.TemporaryDirectory() as tmp:
        staged = Path(tmp)
        for face in FACES:
            size, cmap = build(face, full if face['css_family'] == 'Archivo' else site, staged)
            total += size
            print(f"{face['file']:24} {size / 1024:5.1f} KiB  {len(cmap)} glyphs")
            css.append(f"@font-face {{ font-family: '{face['css_family']}'; font-style: {face['style']}; font-weight: {face['css']}; "
                       f"font-display: swap; src: url('./{face['file']}.woff2') format('woff2'); unicode-range: {unicode_range(cmap)}; }}")
        for stale in OUT.glob('*.woff2'):
            stale.unlink()
        for built in staged.glob('*.woff2'):
            shutil.move(str(built), OUT / built.name)
    (OUT / 'fonts.css').write_text('\n'.join(css) + '\n', 'utf-8')
    print(f'total {total / 1024:.1f} KiB -> {OUT / "fonts.css"}')


if __name__ == '__main__':
    main()
