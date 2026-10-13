# Ahmed Chioua: logo guidelines

## 1. The logo

**Idea.** The booking key, drawn as a mark. Every key on ahmedchioua.com has a signal face, a
2px graphite edge and a hard offset that the press removes. The logo is that key with an A on its
face, so the mark and the site's one call to action are the same object.

**Versions** (all in `master/`):

| Version | File | Use it for |
|---|---|---|
| Symbol (primary) | `ahmed-chioua-symbol-*.svg` | Site header, avatars, anywhere the name is already nearby |
| Horizontal | `ahmed-chioua-horizontal-*.svg` | Documents, invoices, email signatures, the OG image |
| Stacked | `ahmed-chioua-stacked-*.svg` | Square spaces: social posts, slides, stickers |
| Wordmark | `ahmed-chioua-wordmark-*.svg` | Rare: only where the symbol already appears close by |
| Small symbol | `ahmed-chioua-symbol-small-*.svg` | Anything below 32 px |
| Favicon | `ahmed-chioua-favicon.svg` | Browser tabs (the small drawing) |
| App icon | `ahmed-chioua-app-icon.svg` | Home-screen tile (graphite tile, light edge) |

Each comes in four paints: `colour` (on light grounds), `on-dark` (on graphite), `graphite`
(one colour, on light) and `white` (one colour, on dark or on a photo).

**Two drawings of the symbol.** These are deliberate differences, not mistakes:

- **Master**: 32 px and above.
- **Small** (`-small-`): a thicker edge, a longer offset and a bigger counter in the A, so the
  key still reads as a key at 16 px. Use it below 32 px.

## 2. Clear space

Keep **one offset** clear on every side, measured from the outer edge of the key and its
offset. The offset is 24 units on the 256 grid, about 11 % of the symbol's width. In the
horizontal lockup the gap between the symbol and the name is two offsets; never tighten it.

## 3. Minimum size

| Version | Screen | Print |
|---|---|---|
| Symbol | 32 px (master) · 16 px (small drawing) | 6 mm |
| Horizontal | 140 px wide | 35 mm wide |
| Stacked | 72 px wide | 20 mm wide |

## 4. Colour

The site's own tokens (`DESIGN.md`).

| Name | Token | HEX | RGB | Role in the logo |
|---|---|---|---|---|
| Safety orange | `--signal` | `#EE6A1B` | 238 106 27 | The key's face |
| Graphite | `--ink` | `#1D1B17` | 29 27 23 | The A, the edge, the offset, the name |
| On graphite | `--on-ink` | `#E7E6E0` | 231 230 224 | Edge and name on dark grounds |
| On graphite, muted | `--on-ink-muted` | `#B0AFA8` | 176 175 168 | Offset on dark grounds |
| Concrete | `--paper` | `#EDECE7` | 237 236 231 | The usual ground; icon tiles |

CMYK and Pantone are not specified yet. For print, proof safety orange against a physical guide
(an orange in the Pantone 1585 C to 165 C range is the place to start) before ordering anything.

**Contrast** (measured):

- Graphite A on the orange face: **5.50 : 1**.
- Graphite edge on concrete: 14.54 : 1. The orange face alone on concrete is only 2.64 : 1,
  which is below the 3 : 1 minimum for graphics. The edge is what carries the mark on light
  grounds, so **never remove the edge**.
- On graphite: light edge 13.75 : 1, muted offset 7.81 : 1, orange face 5.50 : 1.

## 5. Typography

- The name is **Big Shoulders Display 800**, the site's display face: uppercase, tracked
  +0.04 em. In the lockups it sits at the A's cap height, on the A's baseline.
- It is outlined in every file. Never retype it.
- Big Shoulders is licensed under the SIL Open Font License, which allows use in a logo.

## 6. On the site

- The header shows the symbol alone at 44 px, the height of the keys beside it. The link's
  accessible name is "Ahmed Chioua".
- Hover moves the face to `--signal-hi`. The press moves the key onto its offset, as a key's press
  removes its shadow. Under `prefers-reduced-motion` the key stays put.
- `public/favicon.svg`, `favicon-32.png` and `apple-touch-icon.png` come from `web/`.

## 7. Don'ts

- Don't remove the edge or the offset; a bare orange square with an A is not the logo.
- Don't put the offset anywhere but the bottom right, and don't soften it into a blurred shadow.
- Don't round the corners. The site has no radius anywhere.
- Don't recolour the face. Orange means action on this site; the face is always the signal.
- Don't use the master drawing below 32 px, or the colour version on graphite (use `on-dark`).
- Don't stretch, rotate, outline or add gradients and glows.
- Don't retype the name in another face next to the symbol.

## 8. Files and source

```
master/        SVG masters (symbol, small symbol, horizontal, stacked, wordmark, favicon, app icon)
web/           favicon.ico, favicon-16/32/48.png, favicon.svg, apple-touch-icon.png,
               icon-192/512.png, maskable-512.png, site.webmanifest, head-snippet.html
presentation/  board.html and slides/*.png: the mark in context
source/        build_kit.py: regenerates master/ from numbers (fonttools + brotli)
```

To regenerate: `python brand/logo-kit/source/build_kit.py brand/logo-kit`. The web icon set is
exported from `master/` with the logo-design skill's `export_variants.py --web-icons`.

Trademark clearance has not been checked. Run a search before registering the mark.
