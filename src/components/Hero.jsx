const CALENDLY = 'https://calendly.com/ahmedchioua/30min'

const stats = [
  { n: '9', sup: '+', label: 'Years shipping production software' },
  { n: '100', sup: '', label: 'Lighthouse: a11y, SEO, best practices' },
  { n: '3', sup: '',  label: 'Enterprise clients — Bell, BMW, Bayer' },
]

const Hero = () => (
  <section id="hero" className="ed-hero">
    <div className="ed-hero-text">
      <p className="ed-kicker">Web &amp; SaaS Builder — Tétouan, Morocco · Remote</p>
      <h1 className="ed-h1">Shipped in weeks,<br />built to <em>last</em>.</h1>
      <p className="ed-lead">
        I build websites and SaaS products with AI in the loop — which is why they ship in weeks.
        Nine years delivering software for <strong>Bell</strong>, <strong>BMW</strong> and{' '}
        <strong>Bayer</strong> is why they don't fall over afterwards.
      </p>
      <div className="ed-cta-row">
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-ink">Start a project</a>
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
      <img
        src="/headshot-700.webp"
        srcSet="/headshot-440.webp 440w, /headshot-700.webp 700w"
        sizes="(max-width: 900px) 100vw, 42vw"
        width="440" height="677"
        alt="Ahmed Chioua, web and SaaS developer"
        fetchPriority="high"
        decoding="async"
      />
      <div className="ed-avail"><span className="ed-dot" />Available for engagements</div>
    </div>

  </section>
)

export default Hero
