import { BenefitCard } from './BenefitCard'

/**
 * The "why it won't break" section. Founders can't judge code quality, so the argument is made
 * in money: cheap builds get paid for twice. The three cards are the standards that ship with
 * every build, and the Proof section further down is where the visitor checks them.
 *
 * Lines are deliberately short. This section is read on a phone more often than not.
 */
const standards = [
  {
    title: 'Architecture reviewed every week',
    lines: ['Speed that turns into debt you inherit isn’t speed.'],
  },
  {
    title: 'Performance, accessibility and SEO verified before launch',
    lines: ['You see the numbers before it goes live, the same way you can see this page’s.'],
  },
  {
    title: 'Tests, docs and a deploy pipeline',
    lines: ['The boring parts that decide whether it survives month three. They ship with the build.'],
  },
]

const Benefits = () => (
  <section id="benefits" className="section">
    <div className="sec-head">
      <h2 className="sec-title">The cheapest developer is the one you <em>pay twice</em></h2>
      <p className="sec-lead">
        You hire fast and cheap. The demo looks fine. Then users arrive, something breaks, and
        the fix is a rebuild at full price. That isn&rsquo;t a developer problem. It&rsquo;s a
        standards problem. These three ship with your build.
      </p>
    </div>

    <div className="ed-ben-grid">
      {standards.map(b => <BenefitCard key={b.title} b={b} />)}
    </div>

  </section>
)

export default Benefits
