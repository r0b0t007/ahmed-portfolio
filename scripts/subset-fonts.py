"""
Rebuilds src/fonts/*.woff2 — static, subset instances of the three families the site uses.

    python scripts/subset-fonts.py        (needs: pip install fonttools brotli)

Why not Google Fonts: even when you ask for `wght@400`, Google serves the full variable file
(Archivo 400/500/600 were three downloads of the same 34 KiB font) and the request costs two
cross-origin connections plus a render-blocking stylesheet. Instantiating each weight and
subsetting to the page's glyphs gets the whole set under 80 KiB. Vite hashes the files into
/assets/ (immutable cache, busted on every regeneration) and vite.config.js injects the preloads.

Glyph coverage:
  - Archivo (used in form inputs)      -> printable ASCII + Latin-1 + everything on the page
  - Newsreader, IBM Plex Mono          -> only the characters that appear in the rendered page
                                          or anywhere in src/ (JSX strings, placeholders, runtime
                                          status text); they never render user input
Re-run after copy changes that introduce a new character; the build does not do this for you.
"""
import html, os, re, sys, urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'fonts'
CSS_URL = ('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;1,400'
           '&family=Archivo:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap')
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
SLUG = {'Newsreader': 'newsreader', 'Archivo': 'archivo', 'IBM Plex Mono': 'plexmono'}


def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA})).read()


def latin_faces():
    css = fetch(CSS_URL).decode()
    for blk in re.findall(r'@font-face \{(.*?)\}', css, re.S):
        if 'unicode-range: U+0000-00FF' not in blk:
            continue
        fam = re.search(r"font-family: '([^']+)'", blk)[1]
        sty = re.search(r'font-style: (\w+)', blk)[1]
        w = int(re.search(r'font-weight: (\d+)', blk)[1])
        url = re.search(r'url\((\S+?)\)', blk)[1]
        yield fam, sty, w, url


def site_glyphs():
    dist = ROOT / 'dist' / 'index.html'
    if not dist.exists():
        sys.exit('run `npm run build` first — glyphs are read from dist/index.html')
    doc = re.sub(r'<script.*?</script>|<style.*?</style>', '', dist.read_text('utf-8'), flags=re.S)
    text = html.unescape(re.sub(r'<[^>]+>', ' ', doc))
    for f in (ROOT / 'src').rglob('*.js*'):
        text += f.read_text('utf-8')
    return {ord(c) for c in text if not c.isspace()} | {0x20}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    site = site_glyphs()
    full = site | set(range(0x20, 0x7F)) | set(range(0xA0, 0x100))
    total = 0
    for fam, sty, w, url in latin_faces():
        name = f"{SLUG[fam]}-{w}{'-italic' if sty == 'italic' else ''}"
        font = TTFont(__import__('io').BytesIO(fetch(url)))
        if 'fvar' in font:
            font = instancer.instantiateVariableFont(font, {'wght': w}, inplace=False, updateFontNames=True)
        cps = full if fam == 'Archivo' else site
        opts = Options()
        opts.flavor, opts.hinting, opts.desubroutinize, opts.notdef_outline = 'woff2', False, True, True
        sub = Subsetter(opts)
        sub.populate(unicodes=cps & set(font.getBestCmap()))
        sub.subset(font)
        path = OUT / f'{name}.woff2'
        font.flavor = 'woff2'
        font.save(path)
        size = path.stat().st_size
        total += size
        print(f'{name:24} {size / 1024:5.1f} KiB  {len(font.getBestCmap())} glyphs')
    print(f'total {total / 1024:.1f} KiB')


if __name__ == '__main__':
    main()
