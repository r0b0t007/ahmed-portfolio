import { BOOKING_URL } from '../content/site'

const stats = [
  { n: '10', sup: '', label: 'Days from kickoff to your first working link' },
  { n: '1', sup: '', label: 'Price. Fixed before we start, never revised mid-build' },
  { n: '9', sup: '+', label: 'Years of production software for Bell, BMW, Bayer' },
  { n: '100', sup: '', label: 'Lighthouse score of this page. Run it yourself' },
]

const Hero = () => (
  <section id="hero" className="ed-hero">
    <div className="ed-hero-text">
      <p className="ed-kicker">For founders who need it launched, not &ldquo;in progress&rdquo;</p>
      <h1 className="ed-h1">Your site or SaaS,<br />live in weeks.<br />Fixed price.<br /><em>Date in writing.</em></h1>
      <p className="ed-lead">
        A working link in <strong>10 days</strong>. A launch date you can plan around. A price
        that doesn&rsquo;t move. Built by an engineer with nine years shipping production software
        for Bell, BMW and Bayer.
      </p>
      <div className="ed-cta-row">
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink">Claim a 10-Day Prototype Slot</a>
        <a href="#handoff" className="link-teal">See exactly what you get →</a>
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
