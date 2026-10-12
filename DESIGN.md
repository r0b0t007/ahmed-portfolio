# DESIGN.md — Compact

The visual system for ahmedchioua.com on the `redesign/option-c-compact` branch. It describes the
shipping code (`src/index.css`, `src/components/*`, `src/pages/*`).

**Produced with the `ui-skills` CLI** (`npx ui-skills@0.2.4`, by ibelick), routed by its
`ui-skills-root` rule to two skills:

- **danilaa1/compact-landing** — set the fingerprint (composition, palette, type, geometry,
  surface grammar, motif, motion), the button scale, the zero-shift motion rules, and the demand
  for one product-native "signature artifact" with the primary action in the first viewport.
- **pbakaus/distill** — set the cuts: one primary action per view, progressive disclosure for
  everything that isn't needed to decide, one font family, at most four sizes and three weights,
  no decoration that doesn't serve hierarchy, remove redundancy.

Both skills ask intake questions; they were answered from PRODUCT.md instead of asking:
button size **large** (the reader is on a phone), mood **plain-spoken and exact**, content depth
**compact**, corners **soft**, motion **minimal**.

## The problem it answers

The September critique measured the mobile homepage at ~21,000px (about 25 phone screens), with
four screens of recruiter content in the conversion path, ten sections opening with the same
eyebrow grammar, and the booking action visible only at the top and the bottom. The founder this
page sells to reads on a phone and compares two or three people.

Compact keeps every word that was on the site but changes what is visible at once: the mobile
homepage is now ~8,500px, the offer + price + booking sit in the first 390×844 screen, and on wide
screens the pitch card never leaves the viewport.

## Fingerprint (compact-landing)

| Axis | Choice |
|---|---|
| Composition | **Split pamphlet.** A sticky pitch card (left, 28.5rem) beside a reading column (right, 40rem max). One column below 960px, pitch first. |
| Measure | 40rem reading column; 28.5rem card. |
| Palette | **Putty paper** with one **oxblood** accent. |
| Typography | **One family**: Schibsted Grotesk 400 / 600 / 700. No mono, no serif, no italic. |
| Geometry | **Soft**: 10px controls, 12px buttons and tabs, 22px card. |
| Surface grammar | **Tinted panel** for the one card; flat hairline dividers inside the reading column. No shadows except the selected picker tab's 1px lift. |
| Motif | A small **oxblood dot** as the list bullet, nowhere else. |
| Motion | Button press `scale(0.96)`, fold chevron rotation, picker panel crossfade. Nothing on scroll. |

Differs from the canonical recipe on composition, palette, type, radii, surface and motion.

## Signature artifact: the scope picker

`src/components/ScopePicker.jsx`. Two tabs (Website / SaaS or MVP; FR: Site web / SaaS ou MVP),
each showing the published terms: price floor, weeks to launch, day of the first working link,
days of post-launch fixes; then the booking button and WhatsApp. Every figure comes from
`src/content/site.js` through the services, so it is the price band and the schedule in one glance,
not new information.

Pure CSS: a native radio group (arrow keys, announced state) and `.picker:has(#pick-saas:checked)`
swaps the panel. Without `:has` the first panel stays visible. Both panels share one grid cell, so
switching never moves the page; the hidden panel is `visibility: hidden`, so assistive tech reads
only the visible one.

It replaced the hero's four-number stat row (a named anti-pattern; the units didn't compare) and
the French hero's facts row.

## Tokens (`src/index.css`)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f5f2ed` | page |
| `--surface` | `#fcfbf8` | pitch card, inputs, selected tab, contact band |
| `--sunk` | `#ebe5dc` | picker track, code, hover wash (ink-muted on it: 4.8:1) |
| `--ink` | `#211c19` | text |
| `--ink-2` | `#4c4540` | body copy |
| `--ink-muted` | `#6b625c` | labels, meta, a heading's second tone (5.3:1 on paper) |
| `--accent` | `#8f2f25` | actions only: buttons, links, focus ring, dots (7.2:1 on paper) |
| `--accent-hover` | `#74251d` | button hover |
| `--accent-ink` | `#fdf8f4` | text on accent (7.7:1) |
| `--hair` | `#e2dad0` | dividers |
| `--field` | `#9b8f84` | input borders |

Hex, not OKLCH: `vite.config.js`'s errorPage plugin compares `src/404.html`'s hex tokens against
these.

The accent has one job. Headline emphasis (`<em>` inside a heading) is a second tone in
`--ink-muted` at the same weight, never italic and never accent, so oxblood always means "you can
act on this".

## Type

- One self-hosted variable file, `src/fonts/schibsted.woff2` (Schibsted Grotesk 400–700, ~33 KiB,
  from `scripts/subset-fonts.py`), preloaded. It replaced four files (~55 KiB).
- Metric-matched Arial fallbacks per weight (`size-adjust` measured on the homepage's own text).
- Sizes: `--fs-s` 0.875rem (labels, meta, buttons), `--fs-m` 1.0625rem (body, row titles),
  `--fs-l` clamp(1.35–1.65rem) (section headings, the price), `--fs-xl` clamp(2.05–2.5rem) (h1).
- Prices use proportional figures: Schibsted's tabular set gives the thousands comma a full figure
  width ("€3 , 000"). `tnum` stays in the file for step numbers and role dates.

## Page shapes

- **Homepages (EN, FR) and service pages**: `Split` = pitch card + reading column. From 960px
  wide and 700px tall the card is sticky; where the window is shorter than the card (most laptop
  windows are ~800px tall against an ~810px English card), the card scrolls inside itself, so the
  offer and the booking button never leave the screen. The French headline is a step smaller
  because its lines run longer.
  - EN body: why it won't break → proof → what I build → process → hand-off → price → FAQ → the
    record (folded).
  - FR body: proof → services → process → price → FAQ.
  - Service pages: the card holds the breadcrumb, h1, lead, the four facts and the booking
    button; the body holds what you get, the weeks, the price, proof, FAQ.
- **Build log**: one reading column (44rem), a short label above each section heading.
- **Contact** closes every page as a full-width surface band: book, WhatsApp, the details list,
  and the form behind "Prefer to write? Send a message".

## Progressive disclosure (distill)

Folded with `<details>` (keyboard and screen-reader native, opens on fragment links in current
browsers): the long version of "why it won't break", each process step's paragraph, the AI price
objection, every FAQ answer, the contact form, and the whole career record (roles, tools,
certifications, languages: formerly three sections in the middle of the sales path; `#experience`
and `#about` still land there).

Kept visible because a buyer decides on them: the offer, the price band, the proof items, the
hand-off rows.

Removed as redundant: the service cards' tag chips (they restated the description), the
`( 0N )` section indices, the trust strip as its own section (its names are the record fold's
visible summary), the hero portrait as a 42vw column (now a 48px avatar in the signature; no image
preload, the h1 is the LCP).

## Controls

- `.btn`: 44px, 12px radius, oxblood fill, 14px/600 label, press `scale(0.96)`. One filled button
  per view; the header's booking link is outlined so it never competes with the card's.
- `.link`: oxblood, underlined. `.link-quiet`: ink-2 with a 40px hit area.
- Focus: 2px oxblood outline, 3px offset, everywhere, including inputs.
- Form: every input has a `<label for>`; results are announced through `role="status"`.

## Accessibility and performance

- Lighthouse accessibility / best practices / SEO: 100 on `/`, `/fr`, a service page and the
  build log.
- `prefers-reduced-motion`: all transitions off, no smooth scroll.
- No horizontal scroll and no wrapped control at 320, 375, 414, 768 or 1440px on any route.
- First wave: one font file instead of four, no image preload.
