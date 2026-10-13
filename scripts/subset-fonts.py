"""
Rebuilds src/fonts/*.woff2 and src/fonts/fonts.css — the two font files the site ships.

    python scripts/subset-fonts.py        (needs: pip install fonttools brotli; run `npm run build` first)

Why not Google Fonts: even when you ask for `wght@400`, Google serves the full variable file
(Archivo 400/500/600 were three downloads of the same 34 KiB font) and the request costs two
cross-origin connections plus a render-blocking stylesheet.

Why two files: every @font-face the page uses is requested at first layout, before first paint,
so under Lighthouse's simulated 1.5 Mbps link all font bytes delay FCP. The industrial system
(DESIGN.md) needs only two faces:
  - Big Shoulders Display, pinned to weight 800: the condensed signage face for headings, set in
    uppercase. One static instance; nothing else uses it.
  - Public Sans 400-700: body, labels, numbers and form inputs, cut as ONE variable file
    restricted to that weight range, which is smaller than three static instances.

Glyph coverage:
  - Public Sans (used in form inputs)  -> printable ASCII + Latin-1 + everything on the page
  - Big Shoulders Display              -> the characters in the rendered page or anywhere in src/,
                                          plus their uppercase forms: headings are set with
                                          text-transform: uppercase, so an "é" in the copy renders "É"
Layout features are trimmed to `kern` and `tnum` (tnum is what makes tabular-nums on the price
table and the schedule do anything).

fonts.css is generated so each @font-face carries the exact unicode-range its file covers;
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
    dict(file='big-shoulders-800', family='Big Shoulders Display', css_family='Big Shoulders Display', style='normal',
         query='wght@800', axes={}, css='800'),  # Google serves a single weight as a static file
    dict(file='public-sans', family='Public Sans', css_family='Public Sans', style='normal',
         query='wght@400..700', axes={'wght': (400, 700)}, css='400 700'),
]
# The face that renders user input (the form fields), so it gets full Latin-1.
BODY_FAMILY = 'Public Sans'


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
    chars = {c for c in text if not c.isspace()}
    # Their uppercase forms too: headings are set with text-transform: uppercase.
    chars |= {c.upper() for c in chars if len(c.upper()) == 1}
    # Spaces are dropped above, so the ones the copy uses are added back: the no-break and narrow
    # no-break spaces sit inside French figures (3 000 €, +30 jours) set in the display face.
    return {ord(c) for c in chars} | {0x20, 0xA0, 0x202F}


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
    # kern and tnum on both faces: the price table and the schedule set
    # font-variant-numeric: tabular-nums, and trimming the feature out makes that CSS inert.
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
            size, cmap = build(face, full if face['family'] == BODY_FAMILY else site, staged)
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
