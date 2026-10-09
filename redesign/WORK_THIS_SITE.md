# Build log: this site (draft)

> Draft for `/work/this-site`, 2026-10-09. Every number below comes from a commit or PR in the
> public repo and is linked so a reader can check it. Facts are as of 9 Oct 2026; re-run the
> counts before publishing. Nothing here claims a client result.
>
> Suggested `<title>`: **How This Site Was Built: Build Log | Ahmed Chioua** (53 chars)
> Suggested description: **The build log for ahmedchioua.com: prerendered React, two hydrated islands, 104 KB before first paint, and the experiments that failed. Source is public.** (156 chars)

---

## How this site was built

The page you are reading is the sample. It sells a build with a fixed price and a date in
writing, so it has to be fast, accessible and easy to check, and the code behind it is public.
This is the log: what was built, what was measured, and what didn't work.

| | |
|---|---|
| **Live** | ahmedchioua.com |
| **Source** | github.com/r0b0t007/ahmed-portfolio |
| **Started** | 5 May 2026 |
| **History** | 109 commits · pull requests #1 to #32 (31 merged, 1 closed after measurement), as of commit `016a0fa` |
| **Stack** | React 19 and Vite 7, hand-written CSS, two runtime dependencies (`react`, `react-dom`) |
| **Hosting** | Cloudflare Pages, plus one Pages Function for the contact form |
| **Lighthouse (mobile)** | Accessibility 100 · Best practices 100 · SEO 100. Run it yourself |

---

## The brief

One page whose job is to turn a stranger into a booked scope call. It is also the portfolio, so
a slow or inaccessible page would contradict the offer it makes. Two rules followed from that:
every claim has to be checkable in a few minutes, and every change has to be measured, not assumed.

---

## The decisions, in order

### Ship HTML, not an empty `<div>` (PR #4, 23 Aug)

**Problem.** The build shipped `<div id="root"></div>` and nothing else. Nothing painted until the
JavaScript had downloaded, parsed and run. First Contentful Paint was the weakest production
metric at 1.8 s, and no amount of asset tuning could fix a page with no markup in it.

**Change.** Each page is rendered to static HTML at build time and React hydrates over it. That
is the output a framework like Next.js would produce for a page like this, from a short build
script instead of a framework.

### Hydrate two components, not twenty (PR #9, 29 Aug)

Only two parts of the page need JavaScript: the header (menu, scroll state) and the contact form.
Those two hydrate as "islands"; the rest stays as HTML. Seven static sections left the client
bundle, which dropped from 66.8 to 59.6 KiB gzipped.

### Fonts: self-hosted, subset, preloaded (PR #9, 29 Aug)

Fonts are subset to the characters the page uses and served from the site itself. Each one has a
fallback whose metrics match it, so text doesn't shift when the real font arrives.

### Leave Netlify (PRs #10 and #11, 31 Aug)

Netlify's credit-based free tier stopped production deploys, so the site moved to Cloudflare
Pages. The contact form became a Pages Function that sends mail through Resend.

### Cut what loads before first paint (PR #12, 6 Sep)

Lighthouse simulates a slow mobile connection, where everything requested before the first
paint competes for the same bandwidth. About 214 KB was in that first wave: fonts, the hero
photo and the React runtime.

- Fonts: 8 files (82 KB) down to 4 (53 KB)
- Hero photo: AVIF with a WebP fallback, 53 KB down to 33 KB at the size phones fetch
- JavaScript: a 1.4 KB entry script. React loads after the page has painted, on the first
  interaction or when the browser goes idle

**Result:** 214 KB down to 104 KB before first paint, with the first screen pixel-identical.

### From one page to several (PRs #28 to #32, 9 Oct)

A technical SEO audit found that every unknown URL returned the homepage with a 200 status, and
that a line Cloudflare added to `robots.txt` cost the site its Lighthouse SEO 100 (it scored 92).
Both are fixed. Then the site gained service pages:

- One route table drives every page's title, canonical URL and structured data, plus the sitemap,
  the redirects and the links on the 404 page. A page can't be added to one and forgotten in another.
- The build fails if a page has more or fewer than one `<h1>`, or a canonical URL that isn't its own.

---

## What didn't work

**A performance theory that measurement disproved (PR #5, closed).** Total Blocking Time looked
like React hydrating the whole page on a slow phone. Hydrating about 80% less of it moved the
metric by roughly nothing: script evaluation turned out to be about 0.4 s of a 4.4 to 5.5 s main
thread. The PR was closed unmerged, with the measurements left in it.

**A second theory, same outcome (PR #6).** Moving eleven inline `<style>` blocks into one
stylesheet left the browser's style and layout time unchanged. The change stayed, because one
stylesheet is easier to maintain, but it wasn't a speed fix.

**The measuring tool was noisier than the effects.** Three Lighthouse runs on one identical build
gave Total Blocking Time of 1,064, 2,095 and 2,532 ms. That spread was larger than any
difference being tested, so single scores stopped counting as evidence. Changes since then are
judged on structural facts, such as bytes shipped and requests made before paint.

**Local testing isn't production (PR #30).** The local Cloudflare runtime redirected
`/services/x/` to `/services/x`; production answered with a 404. It was caught the same day by
checking the live site, and the build now writes those redirects itself.

---

## How it's built

With AI in the loop: up to commit `016a0fa`, 73 of the 109 commits carry a `Co-Authored-By: Claude` line, visible in the
history. The AI writes a lot of the code. The decisions about what to build, what to measure and
what to throw away are mine, and most changes go through a review pass before merging. Fifteen
commits exist only to apply review findings.

---

## Check it yourself

- Run Lighthouse on any page.
- View the page source: the full text is in the HTML, before any JavaScript runs.
- `curl -I https://ahmedchioua.com/services/website-development/` returns a 308 to the clean URL.
- Read the history: every PR above is in the repo, including the one that was closed.

[Book a scope call] · [Website development] · [SaaS & MVP development]

---

## Notes for review (not page copy)

- **Tone check:** "The page you are reading is the sample" restates the homepage Proof framing.
  Everything else is new and needs your approval.
- **Numbers deliberately not used:** Lighthouse *performance* scores. Local runs varied too much
  to quote honestly (see "What didn't work"); the build log quotes bytes and structure instead.
- **Dates:** the Netlify move has no duration claim; its PRs (#10, #11) both merged on 31 Aug.
- **Counts to refresh at publish time:** commits (109), PRs (32/31/1), co-authored commits (73),
  review commits (15).
