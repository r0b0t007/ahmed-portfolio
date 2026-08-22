import { useFadeIn } from '../hooks/useFadeIn'

const steps = [
  {
    n: '01',
    title: 'Scope',
    meta: 'Free · 1 week',
    desc: 'A call, then a written scope: what gets built, what doesn’t, what it costs, and the date it lands. If I don’t think I’m the right person for it, I’ll tell you here — that’s the whole point of this step being free.',
  },
  {
    n: '02',
    title: 'Build',
    meta: '2 to 6 weeks, typical',
    desc: 'You see it running from week one. Weekly demo, a link you can click, and a channel where you can reach me. AI in the loop is why the timeline looks short; the architecture review at the end of each week is why it holds.',
  },
  {
    n: '03',
    title: 'Ship',
    meta: 'Days',
    desc: 'Live on your infrastructure, your domain, your accounts. Performance, accessibility and SEO verified before launch, not promised for later.',
  },
  {
    n: '04',
    title: 'Hand over',
    meta: 'Included',
    desc: 'The repo, the pipeline, the documentation, and a walkthrough. You can take it to any developer afterwards. If you’d rather I kept building, that’s a new scope — not an assumption.',
  },
]

const Step = ({ s }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-step">
      <div className="ed-step-side">
        <div className="ed-step-n">( {s.n} )</div>
        <div className="ed-step-meta">{s.meta}</div>
      </div>
      <div>
        <h3 className="ed-step-t">{s.title}</h3>
        <p className="ed-step-desc">{s.desc}</p>
      </div>
    </div>
  )
}

const Process = () => (
  <section id="process" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Process</span>
        <span className="eyebrow-index">( 02 )</span>
      </div>
      <h2 className="sec-title">How I <em>build</em></h2>
      <p className="sec-lead">
        No open-ended retainers, no surprise invoices. Every project runs the same four
        steps, and you know the shape before you commit.
      </p>
    </div>

    <div className="ed-steps">
      {steps.map(s => <Step key={s.n} s={s} />)}
    </div>

    <div className="ed-promise">Fixed scope. Fixed price. A date, in writing.</div>

    <style>{`
      .ed-steps { max-width: 820px; }
      .ed-step {
        display: grid; grid-template-columns: 170px 1fr; gap: 32px;
        padding: 30px 0; border-bottom: 1px solid var(--hair);
      }
      .ed-step-side { padding-top: 4px; }
      .ed-step-n {
        font-family: var(--mono); font-size: 0.7rem; font-weight: 500;
        letter-spacing: 0.14em; color: var(--teal);
      }
      .ed-step-meta {
        font-family: var(--mono); font-size: 0.72rem; color: var(--ink-muted); margin-top: 8px;
      }
      .ed-step-t {
        font-family: var(--serif); font-size: 1.5rem; font-weight: 400; margin-bottom: 10px;
      }
      .ed-step-desc { font-size: 0.95rem; color: var(--ink-2); line-height: 1.8; max-width: 58ch; }
      .ed-promise {
        margin-top: 40px; max-width: 820px;
        font-family: var(--serif); font-style: italic; font-size: 1.35rem;
        color: var(--teal); border-left: 2px solid var(--teal); padding-left: 22px;
      }
      @media (max-width: 720px) {
        .ed-step { grid-template-columns: 1fr; gap: 12px; }
        .ed-step-side { display: flex; align-items: baseline; gap: 16px; }
        .ed-step-meta { margin-top: 0; }
      }
    `}</style>
  </section>
)

export default Process
