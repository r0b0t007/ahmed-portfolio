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
      <img src="/headshot.webp" width="440" height="550" alt="Ahmed Chioua, web and SaaS developer" fetchPriority="high" />
      <div className="ed-avail"><span className="ed-dot" />Available for engagements</div>
    </div>

    <style>{`
      .ed-hero {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        min-height: calc(100vh - 73px);
      }
      .ed-hero-text { padding: 84px 48px 72px var(--pad); align-self: center; }
      .ed-kicker {
        font-family: var(--mono);
        font-size: 0.72rem; font-weight: 500; letter-spacing: 0.16em;
        text-transform: uppercase; color: var(--teal); margin-bottom: 28px;
      }
      .ed-h1 {
        font-family: var(--serif);
        font-size: clamp(2.8rem, 6vw, 4.5rem);
        font-weight: 300; line-height: 1.05; letter-spacing: -1.5px;
        margin-bottom: 26px; text-wrap: balance;
      }
      .ed-h1 em { color: var(--teal); font-style: italic; }
      .ed-lead {
        font-size: 1.05rem; line-height: 1.75; color: var(--ink-2);
        max-width: 440px; margin-bottom: 40px;
      }
      .ed-lead strong { font-weight: 600; color: var(--ink); }
      .ed-cta-row { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
      .ed-stats {
        display: flex; gap: 32px; margin-top: 64px;
        border-top: 1px solid var(--hair); padding-top: 26px; max-width: 620px; flex-wrap: wrap;
      }
      .ed-stat { flex: 1 1 0; min-width: 130px; max-width: 180px; }
      .ed-stat-n { font-family: var(--serif); font-size: 1.9rem; font-weight: 300; line-height: 1; }
      .ed-stat-n sup { color: var(--teal); font-size: 1rem; }
      .ed-stat-l { font-size: 0.75rem; color: var(--ink-muted); margin-top: 6px; line-height: 1.5; }

      .ed-hero-portrait {
        position: relative;
        border-left: 1px solid var(--hair);
        background: var(--paper-raised);
        overflow: hidden;
      }
      .ed-hero-portrait img {
        position: absolute; inset: 0;
        width: 100%; height: 100%; object-fit: cover; object-position: 50% 15%;
        filter: grayscale(100%) contrast(1.04) sepia(0.08);
      }
      .ed-avail {
        position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
        display: inline-flex; align-items: center; gap: 10px;
        padding: 12px 20px; background: var(--paper); border: 1px solid var(--hair);
        font-size: 0.72rem; font-weight: 600; white-space: nowrap; color: var(--ink);
      }
      .ed-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); animation: dcpulse 2s infinite; }

      @media (max-width: 900px) {
        .ed-hero { grid-template-columns: 1fr; min-height: 0; }
        .ed-hero-portrait { order: -1; height: 340px; border-left: none; border-bottom: 1px solid var(--hair); }
        .ed-hero-text { padding: 52px var(--pad); }
      }
    `}</style>
  </section>
)

export default Hero
