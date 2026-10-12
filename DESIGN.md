# DESIGN.md — Option D · "Signal"

The visual system for ahmedchioua.com on branch `redesign/option-d-colour`. A design proposal,
not yet adopted: Options A (scope document) and B (Swiss grid) live on their own branches.

## Provenance

Built with the [`ui-skills`](https://ui-skills.com) CLI (`npx ui-skills@0.2.4`, by ibelick),
following its root router (`npx ui-skills start`: at most three skills, smallest useful set).
Two skills were loaded with `npx ui-skills get`:

- **`pbakaus/colorize`** — colour as hierarchy and role, not decoration. Shaped: the role table
  below (one job per hue), the strongest colour owning whole regions instead of scattered accents,
  secondary text derived from each surface's own hue, and measured contrast for every pair.
- **`pbakaus/bolder`** — commit to one decisive move, then quiet everything around it, so the page
  reads in peaks. Shaped: the four loud bands (two signal, one oxblood, one ink) separated by calm
  cream bands, the price figures as the loudest type in the price band, and the rule that the
  emphasis inside a heading is colour, never a new effect.

Intake the skills asked for, derived from PRODUCT.md: existing brand colour = deep teal, but this
proposal was asked to anchor elsewhere (A keeps the teal, B uses ultramarine); visitor mode =
Persuade (colour may carry the voice and own large regions); what must stay = every claim, the
offer copy, routes, structured data and the two hydrated islands.

## The idea

Colour carries structure. Every hue has one job, so a band's colour tells the reader what kind of
section they are in before they read a word:

| Hue | Job | Where |
|---|---|---|
| **Signal orange** | the offer | every page's hero band; the price band (`#pricing`, `#price`) |
| **Oxblood** | the commitment | the process band (`#process`) and a service page's weeks (`#weeks`) |
| **Ink** | act | the trust strip, the contact band, the footer |
| **Cream** | read | everything else, alternating paper / paper-2 |

The rhythm on the homepage: **signal** (hero) → ink strip → cream → cream-2 → **oxblood** (process)
→ cream-2 → cream → **signal** (pricing) → cream → cream-2 → cream → **ink** (contact + footer).

## Colour

OKLCH tokens in `src/index.css` `:root`. Measured WCAG 2 contrast (sRGB, relative luminance):

| Token | Value | Pair | Ratio |
|---|---|---|---|
| `--paper` | `oklch(97.2% 0.016 82)` | ink on paper | 16.6:1 |
| `--paper-2` | `oklch(93.4% 0.026 76)` | ink-2 on paper-2 | 8.7:1 |
| `--ink` | `oklch(20.5% 0.022 40)` | paper on ink | 16.6:1 |
| `--ink-2` | `oklch(37% 0.03 42)` | ink-2 on paper | 9.7:1 |
| `--rust` | `oklch(49% 0.14 38)` | rust on paper / paper-2 | 6.2:1 / 5.5:1 |
| `--signal` | `oklch(72% 0.165 52)` | ink on signal | 6.9:1 |
| `--on-signal-2` | `oklch(27% 0.06 45)` | on-signal-2 on signal | 5.9:1 |
| `--oxblood` | `oklch(30% 0.085 24)` | oxblood on signal (heading emphasis) | 5.4:1 |
| `--on-ox` | `oklch(95.5% 0.02 72)` | on-ox on oxblood | 12.4:1 |
| `--on-ox-2` | `oklch(84% 0.045 55)` | on-ox-2 on oxblood / on ink | 8.6:1 / 10.9:1 |
| `--signal-light` | `oklch(80% 0.13 60)` | signal-light on oxblood / on ink | 7.3:1 / 9.4:1 |
| `--wa-green` | `oklch(52% 0.1 172)` | paper on wa-green (WhatsApp hover) | 4.8:1 |
| `--error` | `oklch(47% 0.16 27)` | paper on error (form error) | 6.8:1 |
| `--hair`, `--rule-dark` | rules only, never text | — | — |

Lowest text pair: 4.8:1. All values are inside sRGB. `theme-color` is the paper (`#fbf5ea`); the
404 page uses the signal (`#f38230`).

**Emphasis inside headings is colour, never italic:** rust on cream, oxblood on signal,
signal-light on oxblood and ink.

## Type

One family, two files (`scripts/subset-fonts.py`, 30.7 KiB total, down from 55.5 KiB):

- **Archivo Expanded 800** (`--display`) — every heading, the logo, the price figures, the facts.
  Static, cut to the site's own glyphs (7.4 KiB).
- **Archivo 400–700** (`--sans`) — body, lead, labels, buttons. One variable file at normal width
  (23.4 KiB), full Latin-1 because form inputs render user text.

Both are preloaded. Labels are Archivo 700 uppercase at 0.12em; there is no monospace face and no
serif. Hero headline size follows copy length (`.ed-h1--long` on the French hero).

## Layout and components

- Full-bleed bands, 112px vertical / 64px side padding (72 / 22 below 820px). No hairline between
  bands; colour does the separating.
- **Section label:** a 28×4px bar in the band's accent, then the uppercase label. No `( 0N )`
  counter: the band colour already says where you are.
- **Hero:** signal band, text column + portrait column. The portrait is the existing grayscale
  photo set `mix-blend-mode: multiply` on the signal: whites take the orange, blacks stay black — a
  duotone from one real image. Below 900px it becomes the 76px signature row, as before.
- **Facts list** (both homepages, every service page): a ruled 2×2 (4-up on service pages) `<dl>`,
  value in the display face above its label, every value with its unit. Replaces the English
  hero's "10 / 1 / 9+ / 100" metric row.
- **Three-column bands** (benefits, hand-off, included): columns under a 4px rust bar, no cards.
- **Process / weeks:** ruled rows on oxblood, meta in signal-light.
- **Price band:** the real `<table>`, figures in Archivo Expanded 800 at up to 3rem, the objection
  answered on a cream panel so the figures stay the loudest thing in the band.
- **Contact:** ink band, primary button turns signal, the form is a cream sheet.
- **Buttons:** 52px tall, square, never wrap. Primary = ink (signal on dark bands); secondary =
  2px outline; WhatsApp resolves to WhatsApp green on hover/focus.

## Motion

None beyond hover and focus colour changes (200ms ease-out). No scroll reveal; `prefers-reduced-motion`
removes transitions entirely.

## Accessibility

`:focus-visible` is a 3px ink ring (signal-light on dark bands); form fields keep both a border
change and the ring. Form labels are tied to their inputs (`for`/`id`). Lighthouse accessibility,
best practices and SEO: 100 on `/`, `/fr`, `/services/website-development` and
`/work/this-site`.

## Removed, and why

- The `( 0N )` section counters and the card counters: the most repeated pattern on the page.
- The hero metric row: incommensurable units, a PRODUCT.md anti-reference.
- Newsreader, its italic, IBM Plex Mono and every italic heading: replaced by one family.
- Side-stripe borders (`.ed-promise`, `.ed-svc-also`).
- The scroll fade-in (CSS no longer hides anything; `main.jsx` still runs it harmlessly).

## Exports

```css
:root {
  --paper: oklch(97.2% 0.016 82);   --paper-2: oklch(93.4% 0.026 76);  --hair: oklch(86% 0.03 72);
  --ink: oklch(20.5% 0.022 40);     --ink-2: oklch(37% 0.03 42);       --rust: oklch(49% 0.14 38);
  --signal: oklch(72% 0.165 52);    --on-signal-2: oklch(27% 0.06 45); --signal-light: oklch(80% 0.13 60);
  --oxblood: oklch(30% 0.085 24);   --on-ox: oklch(95.5% 0.02 72);     --on-ox-2: oklch(84% 0.045 55);
  --rule-dark: oklch(42% 0.06 30);  --wa-green: oklch(52% 0.1 172);    --error: oklch(47% 0.16 27);
  --sans: 'Archivo', system-ui, sans-serif;
  --display: 'Archivo Expanded', 'Archivo', system-ui, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```
