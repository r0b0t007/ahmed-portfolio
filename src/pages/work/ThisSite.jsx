import { Breadcrumb } from '../../components/Breadcrumb'
import { Eyebrow as SharedEyebrow } from '../../components/Eyebrow'
import { BOOKING_URL, REPO_URL } from '../../content/site'
import { servicePath } from '../../content/routes'
import { workSectionIndex as idx } from '../../lib/sections'

/**
 * Build log for this site. Every figure links to the commit or pull request it came from, so a
 * reader can check it. The history counts are pinned to one commit rather than a date or the
 * build: a date goes stale the moment this page's own PR merges, and Cloudflare's build may clone
 * shallowly. `git rev-list --count 016a0fa` reproduces them exactly.
 */
const AS_OF = '016a0fa'
const AsOf = () => <a href={`${REPO_URL}/commit/${AS_OF}`} target="_blank" rel="noopener noreferrer"><code>{AS_OF}</code></a>

const PR = ({ n }) => <a href={`${REPO_URL}/pull/${n}`} target="_blank" rel="noopener noreferrer">PR #{n}</a>

const Eyebrow = ({ label, id }) => <SharedEyebrow label={label} index={idx(id)} />

const Entry = ({ title, meta, children }) => (
  <article className="fade-in log-entry">
    <h3 className="log-entry-t">{title}</h3>
    <p className="log-meta">{meta}</p>
    {children}
  </article>
)

const facts = [
  ['Live', 'ahmedchioua.com'],
  ['Source', <a key="src" href={REPO_URL} target="_blank" rel="noopener noreferrer">github.com/r0b0t007/ahmed-portfolio ↗</a>],
  ['Started', '5 May 2026'],
  ['History', <span key="hist">109 commits · pull requests #1 to #32 (31 merged, 1 closed after measurement), as of commit <AsOf /></span>],
  ['Stack', 'React 19 and Vite 7, hand-written CSS, two runtime dependencies (react, react-dom)'],
  ['Hosting', 'Cloudflare Pages, plus one Pages Function for the contact form'],
  ['Lighthouse (mobile)', 'Accessibility 100 · Best practices 100 · SEO 100. Run it yourself'],
]

const ThisSite = ({ name }) => (
  <div className="log">
    <section id="hero" className="section svc-hero">
      <Breadcrumb name={name} />
      <h1 className="ed-h1">How this site <em>was built.</em></h1>
      <p className="ed-lead">
        The page you are reading is the sample. It sells a build with a fixed price and a date in
        writing, so it has to be fast, accessible and easy to check, and the code behind it is
        public. This is the log: what was built, what was measured, and what didn’t work.
      </p>
      <dl className="log-facts">
        {facts.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section id="decisions" className="section">
      <div className="eyebrow-block">
        <Eyebrow label="The decisions" id="decisions" />
        <h2 className="sec-title">In order, <em>with the numbers.</em></h2>
        <p className="sec-lead">
          The brief: one page whose job is to turn a stranger into a booked scope call. It is also
          the portfolio, so a slow or inaccessible page would contradict the offer it makes. Two
          rules followed from that: every claim has to be checkable in a few minutes, and every
          change has to be measured, not assumed.
        </p>
      </div>

      <Entry title="Ship HTML, not an empty <div>" meta={<><PR n={4} /> · 23 Aug 2026</>}>
        <p>
          <b>Problem.</b> The build shipped <code>{'<div id="root"></div>'}</code> and nothing
          else. Nothing painted until the JavaScript had downloaded, parsed and run. First
          Contentful Paint was the weakest production metric at 1.8 s, and no amount of asset
          tuning could fix a page with no markup in it.
        </p>
        <p>
          <b>Change.</b> Each page is rendered to static HTML at build time and React hydrates over
          it. That is the output a framework like Next.js would produce for a page like this, from a
          short build script instead of a framework.
        </p>
      </Entry>

      <Entry title="Hydrate two components, not twenty" meta={<><PR n={9} /> · 29 Aug 2026</>}>
        <p>
          Only two parts of the page need JavaScript: the header (menu, scroll state) and the
          contact form. Those two hydrate as “islands”; the rest stays as HTML. Seven static
          sections left the client bundle, which dropped from 66.8 to 59.6 KiB gzipped.
        </p>
      </Entry>

      <Entry title="Fonts: self-hosted, subset, preloaded" meta={<><PR n={9} /> · 29 Aug 2026</>}>
        <p>
          Fonts are subset to the characters the page uses and served from the site itself. Each
          one has a fallback whose metrics match it, so text doesn’t shift when the real font
          arrives.
        </p>
      </Entry>

      <Entry title="Leave Netlify" meta={<><PR n={10} /> and <PR n={11} /> · 31 Aug 2026</>}>
        <p>
          Netlify’s credit-based free tier stopped production deploys, so the site moved to
          Cloudflare Pages. The contact form became a Pages Function that sends mail through
          Resend.
        </p>
      </Entry>

      <Entry title="Cut what loads before first paint" meta={<><PR n={12} /> · 6 Sep 2026</>}>
        <p>
          Lighthouse simulates a slow mobile connection, where everything requested before the
          first paint competes for the same bandwidth. About 214 KB was in that first wave: fonts,
          the hero photo and the React runtime.
        </p>
        <ul>
          <li>Fonts: 8 files (82 KB) down to 4 (53 KB)</li>
          <li>Hero photo: AVIF with a WebP fallback, 53 KB down to 33 KB at the size phones fetch</li>
          <li>JavaScript: a 1.4 KB entry script. React loads after the page has painted, on the first interaction or when the browser goes idle</li>
        </ul>
        <p><b>Result:</b> 214 KB down to 104 KB before first paint, with the first screen pixel-identical.</p>
      </Entry>

      <Entry title="From one page to several" meta={<><PR n={28} /> to <PR n={32} /> · 9 Oct 2026</>}>
        <p>
          A technical SEO audit found that every unknown URL returned the homepage with a 200
          status, and that a line Cloudflare added to <code>robots.txt</code> cost the site its
          Lighthouse SEO 100 (it scored 92). Both are fixed. Then the site gained service pages:
        </p>
        <ul>
          <li>One route table drives every page’s title, canonical URL and structured data, plus the sitemap, the redirects and the links on the 404 page. A page can’t be added to one and forgotten in another.</li>
          <li>The build fails if a page has more or fewer than one <code>{'<h1>'}</code>, or a canonical URL that isn’t its own.</li>
        </ul>
      </Entry>
    </section>

    <section id="failures" className="section">
      <div className="eyebrow-block">
        <Eyebrow label="What didn’t work" id="failures" />
        <h2 className="sec-title">Four things that <em>didn’t go to plan.</em></h2>
      </div>

      <Entry title="A performance theory that measurement disproved" meta={<><PR n={5} /> · closed, not merged</>}>
        <p>
          Total Blocking Time looked like React hydrating the whole page on a slow phone. Hydrating
          about 80% less of it moved the metric by roughly nothing: script evaluation turned out to
          be about 0.4 s of a 4.4 to 5.5 s main thread. The PR was closed unmerged, with the
          measurements left in it.
        </p>
      </Entry>

      <Entry title="A second theory, same outcome" meta={<PR n={6} />}>
        <p>
          Moving eleven inline <code>{'<style>'}</code> blocks into one stylesheet left the
          browser’s style and layout time unchanged. The change stayed, because one stylesheet is
          easier to maintain, but it wasn’t a speed fix.
        </p>
      </Entry>

      <Entry title="The measuring tool was noisier than the effects" meta={<><PR n={5} /> · the same investigation</>}>
        <p>
          Three Lighthouse runs on one identical build gave Total Blocking Time of 1,064, 2,095 and
          2,532 ms. That spread was larger than any difference being tested, so single scores
          stopped counting as evidence. Changes since then are judged on structural facts, such as
          bytes shipped and requests made before paint.
        </p>
      </Entry>

      <Entry title="Local testing isn’t production" meta={<PR n={30} />}>
        <p>
          The local Cloudflare runtime redirected <code>/services/x/</code> to{' '}
          <code>/services/x</code>; production answered with a 404. It was caught the same day by
          checking the live site, and the build now writes those redirects itself.
        </p>
      </Entry>
    </section>

    <section id="method" className="section">
      <div className="eyebrow-block">
        <Eyebrow label="How it’s built" id="method" />
        <h2 className="sec-title">AI in the loop. <em>Decisions mine.</em></h2>
        <p className="sec-lead">
          Up to commit <AsOf />, 73 of the 109 commits carry a <code>Co-Authored-By: Claude</code>{' '}
          line, visible in the history. The AI writes a lot of the code. The decisions about what to build, what to
          measure and what to throw away are mine, and most changes go through a review pass before
          merging. Fifteen commits exist only to apply review findings.
        </p>
      </div>
    </section>

    <section id="check" className="section">
      <div className="eyebrow-block">
        <Eyebrow label="Check it yourself" id="check" />
        <h2 className="sec-title">Don’t take the log’s word <em>for it either.</em></h2>
      </div>
      <ul className="log-checks">
        <li>Run Lighthouse on any page.</li>
        <li>View the page source: the full text is in the HTML, before any JavaScript runs.</li>
        <li><code>curl -I https://ahmedchioua.com/services/website-development/</code> returns a 308 to the clean URL.</li>
        <li>Read the history: every PR above is in the repo, including the one that was closed.</li>
      </ul>
      <div className="ed-cta-row log-cta">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">Book a scope call</a>
        <a href={servicePath('website-development')} className="link-teal">Website development →</a>
        <a href={servicePath('saas-mvp-development')} className="link-teal">SaaS &amp; MVP development →</a>
      </div>
    </section>
  </div>
)

export default ThisSite
