# DESIGN.md — Industrial (Option E)

The visual system for ahmedchioua.com on the `redesign/option-e-industrial` branch. It is one of
several redesign proposals; nothing here is live until Ahmed picks it.

## Where it came from

Built with two skills fetched through the `ui-skills` CLI (`npx ui-skills@0.2.4 get <slug>`):

- **elithrar/neo-industrial-design** — the visual thesis: an engineered, physically composed page
  where typography carries the hierarchy, a disciplined grid controls tension, and technical
  graphics clarify structure. Its four decisions, as taken here:
  - **Mode:** hybrid. A type-led hero, then instrumental modules.
  - **Dominant gesture:** the schedule drawn as a dimension line across the hero.
  - **Grid:** full-bleed bands on a `--pad` gutter; the hero is 7 : 5 (offer : portrait) over a
    full-width band; modules are rows on a heavy top rule.
  - **Signal:** one accent, safety orange, with one job: action and position.
- **jakubkrehel/better-typography** — the type rules: a small semantic scale, unitless
  line-heights, `em` tracking, a 60–75ch measure, `balance` on headings and `pretty` on
  paragraphs, `tabular-nums` on prices and the schedule, 16px inputs, 16px body floor.

The CLI serves each skill's SKILL.md only; neo-industrial-design's `references/` files were not
available through it and were not used.

Brief (from PRODUCT.md): a non-technical founder skimming on a phone, a technical reviewer who opens
the repo; one action, book the scope call; brand words exacting, plain-spoken, accountable.

## Thesis

The site as a well-built instrument. The offer is a set of specifications (a working link in 10
days, a fixed price, a date in writing), so the page is set like equipment: a nameplate per
service, an inspection checklist of standards, an evidence log, a price readout, a control panel
for the form.

## Colour

Light concrete and graphite, one signal. Hex (the errorPage plugin in vite.config.js compares
`src/404.html`'s tokens against `src/index.css` as hex).

| Token | Value | Role |
|---|---|---|
| `--paper` | `#edece7` | Page: light concrete |
| `--plate` | `#e0dfd8` | Raised steel panel (trust strip, form, notices) |
| `--plate-light` | `#f7f6f2` | Panel face, nameplates, inputs, the schedule band |
| `--ink` | `#1c1d1b` | Graphite: text, rules, the pricing band, the footer |
| `--ink-2` | `#3b3d39` | Secondary text |
| `--ink-muted` | `#595b56` | Labels (5.1:1 on `--plate`, 5.9:1 on `--paper`) |
| `--on-ink` / `--on-ink-muted` | `#e7e6e0` / `#b0afa8` | Text on graphite |
| `--rule` / `--rule-on-ink` | `#c6c4bc` / `#4a4c48` | Hairlines |
| `--signal` | `#ee6a1b` | Safety orange: keys, the key station, markers. Ink on it is 5.5:1 |
| `--signal-hi` | `#f58a44` | The signal, hovered |
| `--signal-deep` | `#a8420c` | Orange as text on paper (5.3:1) |
| `--danger` | `#9a3535` | Form error state |

Rules for the signal: it fills, it never sets body text on paper. On graphite it may set the
price figures (5.6:1). Heading emphasis (`<em>`) is an orange underscore, never italic.

## Typography

| Role | Face | Setting |
|---|---|---|
| Display | Big Shoulders Display 800 | Uppercase, condensed signage. `h1` `clamp(2.6rem, 6.2vw, 5.25rem)` / 1.0; `h2` `clamp(2.25rem, 4.6vw, 3.5rem)` / 1.02; −0.01em |
| Body, UI | Public Sans 400–700 | 16px body / 1.6; lead 18px; `h3` 20px 700 / 1.3 |
| Labels | Public Sans 700 | 12px uppercase, 0.06–0.08em |
| Figures | Big Shoulders Display 800 | `tabular-nums` (prices, schedule, step numbers) |

Two self-hosted files, 27.6 KiB total (was four, 55.5 KiB), both preloaded. `scripts/subset-fonts.py`
cuts them; the display subset includes the uppercase form of every character in the copy, since
headings are set with `text-transform: uppercase`. Metric-matched local fallbacks (measured in
Chrome) keep the font swap from reflowing; the condensed face falls back to Arial Bold squeezed to
68.2%, because Arial Narrow only ships with Office on Windows.

No italic anywhere. No eyebrow labels, no `( 0N )` section numbers: the heading names the section.

## Layout and components

- **Section head:** a 6px graphite bar the heading sits on, then the lead (max 62ch).
- **Hero:** offer (7) | portrait (5), schedule below at full width. Below 900px: offer, then the
  schedule as a vertical rule, then the portrait as a 76px signature row. The offer and the
  primary key sit inside the first 390×844 screen on every page.
- **Schedule** (`Schedule.jsx`): an ordered list on a graphite rule, a tick per station; the first
  working link carries the signal. Values come from `site.js`.
- **Keys:** `.btn-ink` is signal fill, 2px graphite edge, a 4px hard offset the press removes.
  Keys never wrap; long labels have a short twin shown below 480px (`CtaLabel.jsx`).
- **Checklist rows** (Benefits, Handoff, service "included"): number | standard | what it means.
- **Nameplates** (Services): bordered plates with a graphite part-number tab.
- **Evidence log** (Proof), **service record** (Experience), **parts list** (About), **Q | A rows** (FAQ).
- **Price readout:** the one dark band; figures in the signal at readout size.
- **Rating plate:** a service page's four facts in one bordered plate.
- **Control panel:** the form on `--plate`, 2px inputs at 16px, labels tied to fields, a
  `role="status"` line that announces the outcome.
- **Footer:** the graphite base.

Breakpoints: 1100, 960, 900, 860, 820, 760, 720, 640, 480, 360. Root `overflow-x: clip`.

## Motion

Hover and press only, 0.18s `cubic-bezier(0.2, 0.7, 0.2, 1)`: key fill shifts, the key's press
offset, underline colour. No scroll reveals. `prefers-reduced-motion` removes transitions and the
press translate.

## Accessibility

Lighthouse accessibility, best practices and SEO at 100 on `/`, `/fr`, a service page and the
build log. Focus ring: 2px graphite (on graphite: `--on-ink`); inputs: 3px signal outline.
