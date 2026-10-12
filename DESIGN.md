# Design — ahmedchioua.com

A locked design system for the site. Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to grow.

Produced by a Hallmark multi-page redesign (Option A, "The Scope Sheet"), 2026-10-12. It replaces
the earlier editorial warm-paper system (Newsreader serif, `( 0N )` eyebrows, card grids), which
the 2026-09-17 critique diagnosed as the predictable answer for this brief.

## The idea

The offer is a contract: a working link in 10 days, a fixed price, a date in writing. So every
page is set as **the scope document the buyer receives** — headed, numbered, dated, signed. The
page's authority comes from precision (ruled rows, stated units, a revision line that is the
build's own commit), not from a borrowed editorial register.

## Genre

Bespoke (Hallmark custom route, bespoke depth). Closest catalog genre: editorial, technical tone.
Tone: **utilitarian / technical**, voice "exacting, plain-spoken, accountable" (PRODUCT.md).

## Macrostructure family

One family for every page: **Scope Document (bespoke)**.

- **Cover** — a meta line (document label, revision date, commit), the title, a one-paragraph
  offer, the primary action; on the homepages the parties (prepared by / for / track record) and
  a key-terms table; on inner pages a breadcrumb and the page's own key terms.
- **Preamble** (homepage only) — unnumbered argument before the terms.
- **Clauses** — numbered `§ 1…`, the number part of the heading text. Bodies are ruled spec
  lists (sub-clauses `1.1…`), real `<table>`s (schedule, price band) or collapsible terms.
- **Annexes** — lettered `Annex A…`: proof, background, skills. Tighter spacing than clauses.
- **Signature block** — the two parties; signing is booking the free scope call. Then direct
  routes and the form.
- **Colophon** — where the page came from: revision, source, Lighthouse, contact routes.

Pages vary only in which clauses and annexes they carry (src/lib/sections.js):

- Homepage (EN): preamble, § 1 services, § 2 schedule, § 3 price, § 4 hand-off, § 5 date, § 6
  terms, Annex A proof, B background, C skills.
- Homepage (FR): § 1–§ 4 (services, schedule, price, terms), Annex A proof.
- Service pages: § 1 included, § 2 schedule, § 3 price, § 4 terms, Annex A proof.
- Build log: § 1–§ 4 (decisions, failures, method, check).

## Theme

- `--color-desk`      oklch(94.6% 0.008 190) — the ground around the sheet
- `--color-paper`     oklch(98.8% 0.004 190) — the sheet
- `--color-paper-2`   oklch(96.2% 0.006 190) — the form panel, inline code
- `--color-ink`       oklch(19% 0.012 190)
- `--color-ink-2`     oklch(35% 0.012 190) — secondary text, the soft half of headings
- `--color-muted`     oklch(47% 0.012 190) — mono labels (6.6:1 on paper, 5.8:1 on desk)
- `--color-field`     oklch(58% 0.010 190) — form field borders (4.2:1)
- `--color-rule`      oklch(86% 0.008 190) — hairlines between rows
- `--color-accent`    oklch(43.8% 0.074 182) — the brand teal, #0e5f55, kept exactly (7.3:1)
- `--color-accent-ink` oklch(98.8% 0.004 190) — text on accent fills
- `--color-focus`     oklch(48% 0.08 182) — focus ring (6.1:1)
- `--color-whatsapp`  oklch(52.1% 0.091 179.9) — WhatsApp hover (#0F7A6B, 5.1:1 under white)
- `--color-error`     oklch(47.5% 0.135 23.8) — form error (#9a3535)

Axes: **light / display-heavy / chromatic-other (teal ~182°)**.

The accent's chroma (0.074) is below Hallmark's usual 0.12 floor on purpose: it is Ahmed's brand
colour, unchanged, and it holds AA+ contrast on the paper. It appears only as clause and
sub-clause numbers, links, hover and active fills, the focus ring and text selection — never as a
heading or a surface (accent footprint under 5 % of any viewport).

## Typography

- Display: **Archivo 800** (document title), **700** (clause and spec headings), normal style.
  The second half of a two-part heading is Archivo **400** in `--color-ink-2`: weight, not italic,
  carries the emphasis. No italic anywhere in a heading.
- Body: **Archivo 400**, 1.0625rem, line-height 1.6, measure 65ch.
- Secondary (the reference voice): **JetBrains Mono 500** — clause and sub-clause numbers, the
  meta line, column heads, labels, units, the colophon terms. Never prose, never figures in the
  price band (a mono gives the thousands separator a full cell).
- Display tracking: −0.03em (title), −0.015em (clause titles).
- Scale (five sizes): `--text-sm` 0.8125rem · `--text-base` 1.0625rem · `--text-md` 1.25rem ·
  `--text-xl` clamp(1.625rem, 1.2vw + 1.2rem, 2.125rem) · `--text-display`
  clamp(2.25rem, 2.6vw + 1.4rem, 3.75rem).
- Files: one Archivo variable file (wght 400–800, 24 KB) and one JetBrains Mono static 500 file
  (6.4 KB), subset by scripts/subset-fonts.py, both preloaded, metric-matched local fallbacks.

## Spacing

4-point named scale (`--space-3xs` 0.25rem … `--space-3xl` 7rem) and `--gutter`
clamp(1rem, 4vw, 4rem) for the sheet's side margin. Values are in `src/index.css`. Components use
named tokens, never raw values. Section padding varies by role: preamble 7rem top, clauses 4.5rem,
annexes 3rem.

## Structure tokens

- `--rule-hair` 1px `--color-rule` — between rows.
- `--rule-ink` 1px `--color-ink` — opens every clause, spec list and table.
- `--rule-heavy` 2px `--color-ink` — the cover's meta line, the signature block, the colophon.
- `--radius-card` 0, `--radius-input` 0. No shadows anywhere.

## Motion

- Easing: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1); duration `--dur-short` 160ms.
- Reveal pattern: **none**. The page is simply there (no scroll reveals, no stagger).
- What moves: colour on hover, a 1px press on `:active`, the contents chevron and the terms `+`
  turning on open.
- Reduced motion: transitions collapse to 0.01ms; press transforms off; smooth scroll off.

## Microinteractions stance

- Focus is instant: a 2px `--color-focus` outline, never animated in.
- The contact form succeeds silently in its own button label, announced through a
  `role="status"` region; no toasts.
- The header's Contents toggle replaces a nav row: one control at every width, closes on Escape,
  `aria-expanded` + `aria-controls` on an always-present panel.
- Clickable labels never wrap: the booking button switches to its short label below 30rem;
  buttons step down a size below 22.5rem. In-body "read more" links may wrap like their sentence.

## CTA voice

- Primary: `.btn-ink` — ink fill, paper text, square, Archivo 700, `nowrap`; teal on hover. Labels
  are the three spellings in site.js (`CTA_LABEL_LONG`, `CTA_LABEL`, `CTA_LABEL_NAV`).
- Secondary: `.link-teal` — teal text, 1px underline, arrow (→ in place, ↗ new tab).
- WhatsApp: `.btn-wa` — the primary's ghost, resolving to WhatsApp green on hover and focus.

## Per-page allowances

- No enrichment on any page: typography and ruled structure carry it. The only image is the
  72px ID photo beside "Prepared by" on the homepage covers.
- The French pages use the same system with French labels (`ui.doc` in src/content/fr/ui.js).

## What pages MUST share

- The running head (name, Contents, language switch, one action) and the colophon.
- The cover's meta line with the build's revision.
- Clause / annex numbering from src/lib/sections.js, numbers inside the heading text.
- The palette, the two faces, the CTA voice, the rule vocabulary.

## What pages MAY differ on

- Which clauses and annexes they carry, and their order.
- Whether the cover has parties (homepages) or a breadcrumb (inner pages).

## Known exceptions (deliberate)

- Accent chroma below the usual floor (brand colour, see Theme).
- Two families, where the display and body are one (Archivo) and the mono is the second face:
  the mono is a full secondary voice for reference text, not a two-slot outlier.
- The booking button carries both its labels in the DOM (one `display: none`), so the Markdown
  twin lists both.

## Exports

Drop-in formats for re-using this design system in other projects.

### tokens.css
```css
:root {
  --color-desk:       oklch(94.6% 0.008 190);
  --color-paper:      oklch(98.8% 0.004 190);
  --color-paper-2:    oklch(96.2% 0.006 190);
  --color-ink:        oklch(19% 0.012 190);
  --color-ink-2:      oklch(35% 0.012 190);
  --color-muted:      oklch(47% 0.012 190);
  --color-field:      oklch(58% 0.010 190);
  --color-rule:       oklch(86% 0.008 190);
  --color-accent:     oklch(43.8% 0.074 182);
  --color-accent-ink: oklch(98.8% 0.004 190);
  --color-focus:      oklch(48% 0.08 182);

  --font-display: "Archivo", system-ui, sans-serif;
  --font-body:    "Archivo", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  --space-3xs: 0.25rem;  --space-2xs: 0.5rem;  --space-xs: 0.75rem;
  --space-sm:  1rem;     --space-md:  1.5rem;  --space-lg: 2rem;
  --space-xl:  3rem;     --space-2xl: 4.5rem;  --space-3xl: 7rem;

  --text-sm: 0.8125rem; --text-base: 1.0625rem; --text-md: 1.25rem;
  --text-xl: clamp(1.625rem, 1.2vw + 1.2rem, 2.125rem);
  --text-display: clamp(2.25rem, 2.6vw + 1.4rem, 3.75rem);

  --rule-hair: 1px solid var(--color-rule);
  --rule-ink: 1px solid var(--color-ink);
  --rule-heavy: 2px solid var(--color-ink);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 160ms;
  --radius-card: 0; --radius-input: 0;
}
```

### Tailwind v4 `@theme`
```css
@theme {
  --color-desk:   oklch(94.6% 0.008 190);
  --color-paper:  oklch(98.8% 0.004 190);
  --color-ink:    oklch(19% 0.012 190);
  --color-ink-2:  oklch(35% 0.012 190);
  --color-muted:  oklch(47% 0.012 190);
  --color-rule:   oklch(86% 0.008 190);
  --color-accent: oklch(43.8% 0.074 182);
  --font-display: "Archivo", sans-serif;
  --font-body:    "Archivo", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --spacing-sm:   1rem;
  --spacing-md:   1.5rem;
  --spacing-xl:   3rem;
  --text-base:    1.0625rem;
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper":  { "$value": "oklch(98.8% 0.004 190)", "$type": "color" },
    "ink":    { "$value": "oklch(19% 0.012 190)", "$type": "color" },
    "muted":  { "$value": "oklch(47% 0.012 190)", "$type": "color" },
    "rule":   { "$value": "oklch(86% 0.008 190)", "$type": "color" },
    "accent": { "$value": "oklch(43.8% 0.074 182)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Archivo", "$type": "fontFamily" },
    "body":    { "$value": "Archivo", "$type": "fontFamily" },
    "mono":    { "$value": "JetBrains Mono", "$type": "fontFamily" }
  },
  "space": {
    "sm": { "$value": "1rem", "$type": "dimension" },
    "md": { "$value": "1.5rem", "$type": "dimension" },
    "xl": { "$value": "3rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables
```css
:root {
  --background:         98.8% 0.004 190;   /* paper */
  --foreground:         19% 0.012 190;     /* ink */
  --primary:            43.8% 0.074 182;   /* accent */
  --primary-foreground: 98.8% 0.004 190;   /* accent-ink */
  --muted:              96.2% 0.006 190;   /* paper-2 */
  --muted-foreground:   47% 0.012 190;     /* muted */
  --border:             86% 0.008 190;     /* rule */
  --input:              58% 0.010 190;     /* field */
  --ring:               48% 0.08 182;      /* focus */
  --radius:             0px;
}
```
