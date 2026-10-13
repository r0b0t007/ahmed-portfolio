"""Logo kit for ahmedchioua.com: the Key mark (round 2, direction A).

The mark is the site's booking key: a signal face, a graphite edge, a hard offset, and a flat-apex
A on the face. Every drawing is built here from numbers, so the kit can be regenerated.

    python build_kit.py <out-dir>
"""
import math, os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

HERE = os.path.dirname(os.path.abspath(__file__))
K15 = math.tan(math.radians(15))

# The site's tokens (DESIGN.md, Industrial).
INK = '#1d1b17'        # graphite
SIGNAL = '#ee6a1b'     # safety orange
ON_INK = '#e7e6e0'     # text on graphite
ON_INK_MUTED = '#b0afa8'
WHITE = '#ffffff'


def f(v):
    return ('%.2f' % v).rstrip('0').rstrip('.')


def poly(pts):
    return 'M' + ' L'.join(f'{f(x)} {f(y)}' for x, y in pts) + ' Z'


def rect(x0, y0, x1, y1):
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


# ── geometry ──────────────────────────────────────────────────────────────────────────────────

class Key:
    """One drawing of the mark. `edge` is the graphite border, `off` the hard offset."""

    def __init__(self, x0, x1, off, edge, a_top, a_base, a_half, a_w, bar):
        self.x0, self.x1, self.off, self.edge = x0, x1, off, edge
        self.a = (a_top, a_base, a_half, a_w, bar)

    def body(self):
        """Union of the key and its offset, one clockwise outline."""
        x0, x1, o = self.x0, self.x1, self.off
        return [(x0, x0), (x1, x0), (x1, x0 + o), (x1 + o, x0 + o), (x1 + o, x1 + o),
                (x0 + o, x1 + o), (x0 + o, x1), (x0, x1)]

    def face(self):
        e = self.edge
        return rect(self.x0 + e, self.x0 + e, self.x1 - e, self.x1 - e)

    def letter(self):
        """The A as one outline plus its counter (use with fill-rule evenodd)."""
        top, base, a, w, (bt, bb) = self.a
        cx = (self.x0 + self.x1) / 2
        xo_t = cx - a
        xo_b = xo_t - K15 * (base - top)
        def il(y): return xo_b + w + K15 * (base - y)      # left leg, inner edge
        def ir(y): return 2 * cx - il(y)
        outline = [(xo_t, top), (2 * cx - xo_t, top), (2 * cx - xo_b, base), (ir(base), base),
                   (ir(bb), bb), (il(bb), bb), (il(base), base), (xo_b, base)]
        y_meet = top + (w - a) / K15
        counter = [(cx, y_meet), (ir(bt), bt), (il(bt), bt)]
        return poly(outline) + ' ' + poly(counter)

    # paint schemes ---------------------------------------------------------------------------
    def colour(self, edge=INK, shadow=None, face=SIGNAL, letter=INK):
        """Full colour. On graphite the edge and offset go light, as the site's keys do there."""
        out = ''
        if shadow and shadow != edge:
            x0, x1, o = self.x0, self.x1, self.off
            out += f'<path fill="{shadow}" d="{poly(rect(x0 + o, x0 + o, x1 + o, x1 + o))}"/>'
            out += f'<path fill="{edge}" d="{poly(rect(x0, x0, x1, x1))}"/>'
        else:
            out += f'<path fill="{edge}" d="{poly(self.body())}"/>'
        out += f'<path fill="{face}" d="{poly(self.face())}"/>'
        out += f'<path fill="{letter}" fill-rule="evenodd" d="{self.letter()}"/>'
        return out

    def one(self, colour):
        """One colour: the face becomes a real hole, so the A stands in it."""
        d = poly(self.body()) + ' ' + poly(self.face()) + ' ' + self.letter()
        return f'<path fill="{colour}" fill-rule="evenodd" d="{d}"/>'

    def bbox(self):
        return self.x0, self.x0, self.x1 + self.off, self.x1 + self.off


# Master: 32 px and up. Small: below 32 px (thicker edge, bigger offset, bigger counter).
MASTER = Key(20, 212, 24, 14, 56, 176, 24, 34, (128, 148))
SMALL = Key(16, 200, 40, 24, 58, 162, 32, 36, (118, 138))


# ── wordmark: the site's display face, outlined ───────────────────────────────────────────────

def wordmark(text, cap, tracking_em=0.04):
    font = TTFont(os.path.join(HERE, '..', '..', '..', 'src', 'fonts', 'big-shoulders-800.woff2'))
    gs, cmap, hm = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
    upm = font['head'].unitsPerEm
    scale = cap / font['OS/2'].sCapHeight
    pen = SVGPathPen(gs)
    x = 0
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (scale, 0, 0, -scale, x, cap)))
        x += hm[g][0] * scale + (tracking_em * upm * scale if i < len(text) - 1 else 0)
    return pen.getCommands(), x


def svg(w, h, body, title, vb_x=0, vb_y=0):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{f(vb_x)} {f(vb_y)} {f(w)} {f(h)}" '
            f'width="{f(w)}" height="{f(h)}" role="img" aria-labelledby="t"><title id="t">{title}</title>{body}</svg>\n')


# ── build ─────────────────────────────────────────────────────────────────────────────────────

SCHEMES = {
    # name: (symbol body fn, wordmark colour, preview ground or None)
    'colour': (lambda k: k.colour(), INK),
    'on-dark': (lambda k: k.colour(edge=ON_INK, shadow=ON_INK_MUTED), ON_INK),
    'graphite': (lambda k: k.one(INK), INK),
    'white': (lambda k: k.one(WHITE), WHITE),
}


def build(out):
    master_dir = os.path.join(out, 'master')
    os.makedirs(master_dir, exist_ok=True)
    def save(name, content):
        with open(os.path.join(master_dir, name), 'w', encoding='utf-8') as fh:
            fh.write(content)

    name = 'ahmed-chioua'
    title = 'Ahmed Chioua'
    # The name is set at the A's cap height, on the A's baseline.
    a_top, a_base = MASTER.a[0], MASTER.a[1]
    cap_h = a_base - a_top
    d_name, w_name = wordmark('AHMED CHIOUA', cap_h)

    for scheme, (paint, word_col) in SCHEMES.items():
        # symbols, tight to the drawing (clear space is a rule, not padding)
        for label, k in (('symbol', MASTER), ('symbol-small', SMALL)):
            x0, y0, x1, y1 = k.bbox()
            save(f'{name}-{label}-{scheme}.svg', svg(x1 - x0, y1 - y0, paint(k), title, x0, y0))

        # horizontal: the name shares the A's cap height and baseline
        k = MASTER
        x0, y0, x1, y1 = k.bbox()
        gap = 48
        tx, ty = x1 + gap, a_top
        body = paint(k) + f'<path fill="{word_col}" transform="translate({f(tx)} {f(ty)})" d="{d_name}"/>'
        save(f'{name}-horizontal-{scheme}.svg', svg(tx + w_name - x0, y1 - y0, body, title, x0, y0))

        # stacked: the key centred over the name
        cap_s = 72
        d_s, w_s = wordmark('AHMED CHIOUA', cap_s)
        sym_w = x1 - x0
        width = max(w_s, sym_w)
        sx = (width - sym_w) / 2 - x0
        ny = (y1 - y0) + 48
        body = (f'<g transform="translate({f(sx)} {f(-y0)})">{paint(k)}</g>'
                f'<path fill="{word_col}" transform="translate({f((width - w_s) / 2)} {f(ny)})" d="{d_s}"/>')
        save(f'{name}-stacked-{scheme}.svg', svg(width, ny + cap_s, body, title))

    # wordmark alone
    for scheme, col in (('graphite', INK), ('on-dark', ON_INK), ('white', WHITE)):
        save(f'{name}-wordmark-{scheme}.svg', svg(w_name, cap_h, f'<path fill="{col}" d="{d_name}"/>', title))

    # favicon + app icon masters (squared, small drawing)
    k = SMALL
    x0, y0, x1, y1 = k.bbox()
    s = x1 - x0
    save(f'{name}-favicon.svg', svg(s, s, k.colour(), title, x0, y0))
    # app icon: the small key on a graphite tile, light edge as on the site's dark band
    pad = 0.2 * 256
    sc = (256 - 2 * pad) / s
    tile = (f'<rect width="256" height="256" fill="{INK}"/>'
            f'<g transform="translate({f(pad - x0 * sc)} {f(pad - y0 * sc)}) scale({f(sc)})">'
            f'{k.colour(edge=ON_INK, shadow=ON_INK_MUTED)}</g>')
    save(f'{name}-app-icon.svg', svg(256, 256, tile, title))


if __name__ == '__main__':
    build(sys.argv[1])
