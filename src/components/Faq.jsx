import { useFadeIn } from '../hooks/useFadeIn'

const faqs = [
  {
    q: 'What exactly do you build?',
    a: 'Marketing websites, SaaS products and MVPs, internal tools, and the AI automation that sits behind them. Full-stack — design through deployment. If it runs in a browser and needs to work properly, it’s in scope.',
  },
  {
    q: 'How fast is "fast"?',
    a: 'A marketing site is typically 2 to 3 weeks. An MVP is typically 4 to 6, depending on scope. You get a date in the written scope before you commit, and a working link from week one. Building with AI in the loop is what makes those numbers real rather than optimistic.',
  },
  {
    q: 'Does building with AI mean lower quality?',
    a: 'It’s the opposite of how most people assume it works. AI accelerates the typing — scaffolding, boilerplate, tests, first drafts. It doesn’t make the architectural decisions, and neither does it review the result. That’s what nine years of enterprise delivery is for. This site is built that way; run Lighthouse on it.',
  },
  {
    q: 'Can I see client work?',
    a: 'Not yet, honestly. I’ve spent nine years building inside enterprise programmes under NDA, and I’m building the independent client side of this deliberately. So instead of showing you someone else’s logo, I’ve made this site the sample and published its source. That’s also why the first few projects go out at founding rates — I’m trading price for proof.',
  },
  {
    q: 'What does it cost?',
    a: 'Fixed price per project, quoted in the free scope call, based on what you actually need rather than hours logged. No retainers you can’t exit, no invoices you didn’t see coming. Founding-client rates apply to the next few projects.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do — outright, from day one. Your repo, your infrastructure, your accounts. The handover includes documentation and a walkthrough specifically so you can take it to any other developer without needing me.',
  },
  {
    q: 'Do you work with existing codebases and teams?',
    a: 'Yes. Audits, refactors and rescues are a service in their own right, and five years as a Scrum Master across distributed enterprise teams means dropping into someone else’s process is familiar territory rather than friction.',
  },
  {
    q: 'Where are you based, and does it matter?',
    a: 'Tétouan, Morocco (GMT+1) — remote-first, which is how I’ve worked with Canadian and German teams for the last five years. Overlap with Europe is complete and with US Eastern is most of the working day.',
  },
]

const Row = ({ f }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-faq-item">
      <h3 className="ed-faq-q">{f.q}</h3>
      <p className="ed-faq-a">{f.a}</p>
    </div>
  )
}

const Faq = () => (
  <section id="faq" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Questions</span>
        <span className="eyebrow-index">( 06 )</span>
      </div>
      <h2 className="sec-title">Straight <em>answers</em></h2>
    </div>

    <div className="ed-faq-grid">
      {faqs.map(f => <Row key={f.q} f={f} />)}
    </div>

    <style>{`
      .ed-faq-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 0 56px; max-width: 1040px;
      }
      .ed-faq-item { padding: 26px 0; border-bottom: 1px solid var(--hair); }
      .ed-faq-q {
        font-family: var(--serif); font-size: 1.2rem; font-weight: 400;
        line-height: 1.35; margin-bottom: 10px;
      }
      .ed-faq-a { font-size: 0.92rem; color: var(--ink-2); line-height: 1.8; }
      @media (max-width: 820px) { .ed-faq-grid { grid-template-columns: 1fr; } }
    `}</style>
  </section>
)

export default Faq
