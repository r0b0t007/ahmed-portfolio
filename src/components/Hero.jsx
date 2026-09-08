import { BOOKING_URL } from '../content/site'

const stats = [
  { n: '9', sup: '+', label: 'Years shipping production software' },
  { n: '100', sup: '', label: 'Lighthouse: a11y, SEO, best practices' },
  { n: '3', sup: '',  label: 'Enterprise clients: Bell, BMW, Bayer' },
]

const Hero = () => (
  <section id="hero" className="ed-hero">
    <div className="ed-hero-text">
      <p className="ed-kicker">Web &amp; SaaS Builder · Tétouan, Morocco · Remote</p>
      <h1 className="ed-h1">Built in weeks.<br />Still working in <em>a year</em>.</h1>
      <p className="ed-lead">
        I build websites and SaaS products for founders. You get a working link in{' '}
        <strong>week one</strong>, a fixed price, and a date in writing.
      </p>
      <div className="ed-cta-row">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">Start a project</a>
        <a href="#process" className="link-teal">See how I build →</a>
      </div>
      <div className="ed-stats">
        {stats.map(s => (
          <div key={s.label} className="ed-stat">
            <div className="ed-stat-n">{s.n}{s.sup && <sup>{s.sup}</sup>}</div>
            <div className="ed-stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="ed-hero-portrait">
      {/* AVIF first, WebP fallback. Candidates, `sizes` and the AVIF set must stay in sync with the
          <link rel="preload"> in index.html; files come from scripts/build-images.py. Never add a
          candidate above 700w — a DPR-2 phone would fetch it. */}
      <picture>
        <source
          type="image/avif"
          srcSet="/headshot-320.avif 320w, /headshot-412.avif 412w, /headshot-440.avif 440w, /headshot-700.avif 700w"
          sizes="(max-width: 900px) 100vw, 42vw"
        />
        <img
          src="/headshot-700.webp"
          srcSet="/headshot-320.webp 320w, /headshot-412.webp 412w, /headshot-440.webp 440w, /headshot-700.webp 700w"
          sizes="(max-width: 900px) 100vw, 42vw"
          width="440" height="677"
          alt="Ahmed Chioua, web and SaaS developer"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>

  </section>
)

export default Hero
