# Design — ahmedchioua.com (Option B: Grid)

A locked design system for this site. Every page reads this file before it changes; do not
regenerate it per page. Extend or amend it when the system needs to grow. Implemented in
`src/index.css` (tokens in its `:root`, stamped at the top).

The offer is a contract: a working link in 10 days, a fixed price, a date in writing. This
system sets it like a Swiss systems manual: a visible column grid, one grotesk, one signal ink,
geometry doing the talking, and every number on the page a real one.

## Genre
editorial (its Swiss neo-grotesque slot: Hallmark catalog theme **Grid**)

## Macrostructure family
One family for the whole site, because every page sells the same sequence.

- Marketing pages (`/`, `/fr`): **Narrative Workflow**. The page walks the offer in order
  (claim, standards, services, the numbered stages 1.0 to 4.0, hand-off, proof, price, background,
  questions, contact). Hero archetype H2 Split Diptych (7/5, photo right, vertical ink rule).
- Service pages (`/services/*`, `/fr/services/*`): Narrative Workflow, short form. Hero is the
  display head plus an F3 spec sheet of the service's four figures.
- Content pages (`/work/*`): the same bands, entries as index rows (what and when on the left,
  the account on the right).

## Theme
- `--color-paper`   oklch(99% 0.003 255)   cool near-white sheet, never #fff
- `--color-paper-2` oklch(97.2% 0.004 255) row hover
- `--color-paper-3` oklch(94.5% 0.005 255) bar tracks, inline code
- `--color-rail`    oklch(93% 0.006 255)   the exposed 12-column grid
- `--color-rule`    oklch(88% 0.008 255)   hairlines between cells and rows
- `--color-ink`     oklch(16% 0.010 255)   text, ink rules, primary buttons
- `--color-ink-2`   oklch(33% 0.012 255)   body copy (11:1 on paper)
- `--color-muted`   oklch(47% 0.012 255)   label voice (6.4:1 on paper)
- `--color-signal`  oklch(45% 0.19 264)    ultramarine, the one signal ink (7.6:1 on paper)
- `--color-signal-deep` oklch(37% 0.17 264) pressed links
- `--color-on-signal` = paper              text on the plate
- `--color-error`   oklch(47% 0.17 28)     the form's failed state only
- `--color-focus`   = signal

The signal ink is spent on geometry: the period square, bar fills, stage numbers, link underlines,
focus, selection, and the one plate. Never a second chromatic ink.

## Typography
- **Archivo only**, one variable file (400–800), self-hosted and subset by
  `scripts/subset-fonts.py` (24 KiB; the editorial system shipped four files, 55 KiB).
- Display: Archivo 800, **lowercase** (`text-transform`; the source text keeps its case),
  tracking −0.045em, line-height 0.96. `--text-display: clamp(2.5rem, 1rem + min(5.2vw, 7.2vh), 5.5rem)`
  (the hero heads run 62–76 characters, so the `-s` rung, and height-aware so the French CTA stays
  on a 1280×800 first screen).
- Section heads: Archivo 800 lowercase, `--text-2xl` = clamp(2.25rem, 1.4rem + 3.6vw, 4.25rem).
- Row and cell titles: Archivo 700, `--text-lg`.
- Body: Archivo 400, 16px, line-height 1.5–1.6, measure 46–68ch.
- Label voice: Archivo 600, 12px, uppercase, +0.09em, `--color-muted`. Captions, table heads,
  meta, dates. Never a kicker above a heading.
- Numbers: `font-variant-numeric: tabular-nums` on every figure.
- **No italics anywhere.** `em` inside a heading is roman; emphasis is weight or the period square.

## Spacing
4-point named scale (`--space-3xs` … `--space-4xl`, 2px to 144px) in `src/index.css`. Bands breathe
at `--space-3xl` (phone) / `--space-4xl` (desktop) vertical padding; the trust strip and footer are
deliberately tighter. Text never touches a rail: shell children carry `--inset`.

## Grid and material
- `.band` (full bleed) > `.shell` (max 90rem, 4 columns below 60rem, 12 above). The shell paints
  the column rails, so the grid lines up across every band. An ink rule tops each section.
- Zero cards, zero radius, zero shadow. Repeated units are equal **cells** divided by hairlines.
- Every band carries an object, built from the kit:
  - the **plate** (one per page: the homepage's "pay twice" claim, flooded in ultramarine, rails continuing at 16% paper);
  - **stepped bars** against real figures only (price floors €3,000 / €12,000; weeks 2–3 / 4–6);
  - the **cropped numeral** (10 = days to a working link; 9 = years), 10% signal, decorative;
  - the **quarter-disc** in a cell corner;
  - the **period square** in place of a hero's full stop;
  - the **border arrow** on internal links.

## Motion
- Easings `--ease-out` cubic-bezier(0.16, 1, 0.3, 1), `--ease-in`, `--ease-in-out`; `--dur-short` 200ms.
- No scroll reveals, no parallax, no entrance choreography. The page is just there.
- Hover only: row background to paper-2 + title slides 8px; quarter-disc rotates 90°; button
  fill to signal; link to signal. `prefers-reduced-motion` zeroes every transition.

## Microinteractions stance
- Silent success; the submit button carries the state, a `role="status"` line announces it.
- Focus is a 2px signal outline, instant, never animated. Inputs reserve a transparent outline at rest.
- Inputs and buttons share a 48px height.

## CTA voice
- Primary: `.btn`, ink fill, paper text, square, 48px, single line, fill turns signal on hover.
  One booking label everywhere: `ui.cta.short` ("Claim a 10-Day Slot" / "Réserver un créneau de 10 jours").
- Secondary: `.btn--ghost` (WhatsApp) ink outline, fills ink on hover.
- Text: `.link`, ink with a 2px signal underline.

## Chrome
- Nav: **N6 masthead** on the grid. Row one: lowercase wordmark, language switch, booking button
  (steps out below 30rem, where the hero CTA sits right under it). Row two (60rem+): the section
  index in label voice. Below 60rem the index collapses into the menu.
- Footer: **Ft4 colophon**. Wordmark, the offer in one line, contact links as words, the source link.

## Per-page allowances
- Marketing pages carry the plate (homepage only) and cropped numerals.
- Service pages and build logs: no plate, no numeral. The spec sheet and index rows are their objects.
- 404 (`src/404.html`) is standalone (no web font, no bundle); it copies the colour tokens above
  and paints the rails itself. The build fails if its tokens drift (`vite.config.js`).

## What pages MUST share
- The wordmark, the masthead, the colophon.
- The single signal ink and where it is spent.
- Archivo, the five-size scale, lowercase heads, the label voice.
- The CTA voice and the 48px control height.
- The band/shell grid and the ink rule over each section.

## What pages MAY differ on
- Which kit object a band carries (never two plates on a page).
- Hero archetype within Narrative Workflow (split diptych on homepages, spec-sheet hero on service pages).

## Exports

### tokens.css
```css
:root {
  --color-paper: oklch(99% 0.003 255);
  --color-paper-2: oklch(97.2% 0.004 255);
  --color-paper-3: oklch(94.5% 0.005 255);
  --color-rail: oklch(93% 0.006 255);
  --color-rule: oklch(88% 0.008 255);
  --color-ink: oklch(16% 0.010 255);
  --color-ink-2: oklch(33% 0.012 255);
  --color-muted: oklch(47% 0.012 255);
  --color-signal: oklch(45% 0.19 264);
  --color-signal-deep: oklch(37% 0.17 264);
  --color-on-signal: oklch(99% 0.003 255);
  --color-error: oklch(47% 0.17 28);
  --color-focus: var(--color-signal);

  --font-sans: 'Archivo', 'Archivo fallback', system-ui, sans-serif;
  --display-weight: 800;
  --tracking-display: -0.045em;

  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-md: 1rem;
  --text-lg: clamp(1.25rem, 1.05rem + 0.6vw, 1.5rem);
  --text-2xl: clamp(2.25rem, 1.4rem + 3.6vw, 4.25rem);
  --text-display: clamp(2.5rem, 1rem + min(5.2vw, 7.2vh), 5.5rem);

  --space-3xs: 0.125rem; --space-2xs: 0.25rem; --space-xs: 0.5rem; --space-sm: 0.75rem;
  --space-md: 1rem; --space-lg: 1.5rem; --space-xl: 2.5rem; --space-2xl: 4rem;
  --space-3xl: 6rem; --space-4xl: 9rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms; --dur-short: 200ms;
  --radius-card: 0;
}
```

### Tailwind v4 `@theme`
```css
@theme {
  --color-paper: oklch(99% 0.003 255);
  --color-ink: oklch(16% 0.010 255);
  --color-muted: oklch(47% 0.012 255);
  --color-rule: oklch(88% 0.008 255);
  --color-signal: oklch(45% 0.19 264);
  --font-sans: 'Archivo', system-ui, sans-serif;
  --spacing-md: 1rem;
  --text-md: 1rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper": { "$value": "oklch(99% 0.003 255)", "$type": "color" },
    "ink": { "$value": "oklch(16% 0.010 255)", "$type": "color" },
    "muted": { "$value": "oklch(47% 0.012 255)", "$type": "color" },
    "rule": { "$value": "oklch(88% 0.008 255)", "$type": "color" },
    "signal": { "$value": "oklch(45% 0.19 264)", "$type": "color" }
  },
  "font": { "sans": { "$value": "Archivo", "$type": "fontFamily" } },
  "space": { "md": { "$value": "1rem", "$type": "dimension" } }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background: 99% 0.003 255;
  --foreground: 16% 0.010 255;
  --primary: 45% 0.19 264;
  --primary-foreground: 99% 0.003 255;
  --muted: 94.5% 0.005 255;
  --muted-foreground: 47% 0.012 255;
  --border: 88% 0.008 255;
  --input: 47% 0.012 255;
  --ring: 45% 0.19 264;
  --radius: 0px;
}
```
