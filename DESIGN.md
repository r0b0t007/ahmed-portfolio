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
  - **Grid:** full-bleed bands on a `--pad` gutter; the hero is offer | portrait (a third, capped at 28rem) over a
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
| `--ink` | `#1d1b17` | Graphite, warmed slightly (OKLCH chroma 0.008): text, rules, the pricing band, the footer |
| `--ink-2` | `#3b3d39` | Secondary text |
| `--ink-muted` | `#595b56` | Labels (5.1:1 on `--plate`, 5.9:1 on `--paper`) |
| `--on-ink` / `--on-ink-muted` | `#e7e6e0` / `#b0afa8` | Text on graphite (13.5:1 / 7.7:1) |
| `--rule` / `--rule-on-ink` | `#c6c4bc` / `#4a4c48` | Hairlines |
| `--signal` | `#ee6a1b` | Safety orange: keys, the key station, markers. Ink on it is 5.5:1. Never a focus ring on a light panel (2.3:1 on `--plate`) |
| `--signal-hi` | `#f58a44` | The signal, hovered |
| `--signal-deep` | `#a8420c` | Orange as text on paper (5.2:1) |
| `--danger` | `#9a3535` | Form error state |
| `--wa` / `--white` | `#0f7a6b` / `#ffffff` | WhatsApp key on hover; white on it is 5.2:1 |

Rules for the signal: it fills, it never sets body text on paper. On graphite it may set the
price figures (5.4:1). Heading emphasis (`<em>`) is an orange underscore, never italic.

## Typography

| Role | Face | Setting |
|---|---|---|
| Display | Big Shoulders Display 800 | Uppercase, condensed signage. `h1` `clamp(2.5rem, 5.2vw, 4.5rem)` / 1.0; `h2` `clamp(2.25rem, 4.6vw, 3.5rem)` / 1.02; −0.01em |
| Body, UI | Public Sans 400–700 | 16px body / 1.6; lead 18px; `h3` 20px 700 / 1.3 |
| Labels | Public Sans 700 | 12px uppercase, 0.06–0.08em |
| Figures | Big Shoulders Display 800 | `tabular-nums` (prices, schedule, step numbers) |

Two self-hosted files, 27.6 KiB total (was four, 55.5 KiB), both preloaded. `scripts/subset-fonts.py`
cuts them; the display subset includes the uppercase form of every character in the copy, since
headings are set with `text-transform: uppercase`. Metric-matched local fallbacks (measured in
Chrome) keep the font swap from reflowing; the condensed face falls back to Arial Bold squeezed to
68.2%, because Arial Narrow only ships with Office on Windows.

No italic anywhere. No eyebrow labels or kickers, no `( 0N )` section numbers: the heading names the
section. Only a real sequence is numbered (the four Process steps, number above the title); the
checklists, nameplates, evidence log and parts list are not.

Every display-face line carries `overflow-wrap: anywhere; min-width: 0`. Text links and keys never
wrap (`white-space: nowrap`); a label too long for a 320px phone gets a shorter wording, not a
second line.

## Layout and components

- **Section head:** a 6px graphite bar the heading sits on, then the lead (max 62ch).
- **Header:** an edge-aligned nameplate. The mark (the Key, see Logo below) on the left; on the right three 44px keys:
  the section index ("Menu"), the other language and the booking key (hidden below 480px, where
  the hero's key is on the first screen). The section links live in the index panel at every
  width, as a row of display-face plates; the panel is always in the markup (`hidden` while
  closed) so crawlers and agents see the links. Escape closes it.
- **Hero:** offer | portrait (a third of the width, capped at 28rem), schedule below at full width;
  padding 44 top / 60 bottom. The hero row has a floor of min(34rem, 100svh − 300px), so the photo
  box stays portrait-shaped and the crop shows the head down to the crossed arms on every desktop
  size (object-position 50% 33%).
  At 1280×800 the whole schedule is on the first screen. Below 900px: offer, then the schedule as
  a vertical rule, then the portrait as a 76px signature row. The offer and the primary key sit
  inside the first 390×844 screen on every page.
- **Schedule** (`Schedule.jsx`): an ordered list on a graphite rule, a tick per station; the first
  working link carries the signal (tick and filled value; its edge stays 2px, no stripe). Five
  stations hold on one rule down to 900px, then the line turns vertical. The two launch stations
  are labelled as alternatives (site or MVP) and the cover as "after launch". Values come from
  `site.js`.
- **Keys:** `.btn-ink` is signal fill, 2px graphite edge, a 4px hard offset the press removes.
  Keys never wrap; long labels have a short twin shown below 480px (`CtaLabel.jsx`).
- **Checklist rows** (Benefits, Handoff, service "included"): standard | what it means.
- **Nameplates** (Services): bordered plates with a 6px graphite top edge.
- **Evidence log** (Proof), **service record** (Experience), **parts list** (About), **Q | A rows** (FAQ).
- **Price readout:** the one dark band; figures in the signal at readout size.
- **Rating plate:** a service page's four facts in one bordered plate.
- **Control panel:** the form on `--plate`, 2px inputs at 16px, labels tied to fields, a
  `role="status"` line that announces the outcome. Contact details stack label over value below
  480px.
- **Footer:** the graphite base.

Spacing: a 4px scale, `--space-N` = N × 4px (`--space-1` to `--space-28`); every padding, margin
and gap uses it. Section rhythm varies: 88px for modules, 112px around the price band, 64px for
the FAQ (64 / 80 / 48 on phones).

Breakpoints: 900, 860, 820, 760, 720, 640, 480, 360. Root `overflow-x: clip`, on the 404 too.

## Logo

**The Key:** the booking key drawn as a mark. A flat-apex A in graphite on a signal face, a
graphite edge and a hard offset, the same three parts as every key on the site. Orange keeps its
one job: the mark is the action.

- The header shows the mark alone, at 44px, the height of the three keys beside it. Its link is
  named "Ahmed Chioua". Hover shifts the face to `--signal-hi`; the press moves the key onto its
  offset (as a key's press removes its shadow).
- On graphite, the edge goes `--on-ink` and the offset `--on-ink-muted`, as the keys do in the
  price band.
- Below 32px use the small drawing (heavier edge, longer offset, bigger counter): it is the
  favicon.
- The name, when it appears with the mark, is Big Shoulders 800 at the A's cap height, on the A's
  baseline.

Files, rules and the source that regenerates them: `brand/logo-kit/` (GUIDELINES.md).

## Motion

Hover and press only, 0.18s `cubic-bezier(0.2, 0.7, 0.2, 1)`: key fill shifts, the key's press
offset, underline colour. Every key and link has a press state: keys translate, text links
thicken their underline to graphite. No scroll reveals. `prefers-reduced-motion` removes transitions and the
press translate.

## Accessibility

Lighthouse (mobile) accessibility, best practices and SEO at 100 on `/`, `/fr`, a service page and
the build log, re-measured 2026-10-13 after the Hallmark audit fixes. Focus ring: 2px graphite
(on graphite: `--on-ink`); inputs: 3px graphite, 2px offset, so the ring clears the 2px border.

## Audit

A `hallmark audit` on 2026-10-13 found 1 critical, 7 major and 16 minor issues; all are fixed on
this branch. The critical one was the inherited nav (wordmark plus a row of six links and a
filled key), replaced by the nameplate header above. `src/index.css` opens with a Hallmark stamp
that names this file as the system.
