import { sectionIndex } from '../lib/sections'
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
    lines: [
      'Not “cleaned up later”.',
      'Speed that turns into debt you inherit isn’t speed. The review is how it stays yours.',
    ],
  },
  {
    title: 'Performance, accessibility and SEO verified before launch',
    lines: [
      'Not promised for after.',
      'You see the numbers before it goes live, the same way you can see this page’s.',
    ],
  },
  {
    title: 'Tests, docs and a deploy pipeline',
    lines: [
      'The boring parts that decide whether it survives month three.',
      'They ship with the build, not as an add-on.',
    ],
  },
]

const Benefits = () => (
  <section id="benefits" className="section">
    <div className="eyebrow-block">
      <div className="eyebrow-row">
        <span className="eyebrow">Why it won&rsquo;t break on launch day</span>
        <span className="eyebrow-index">( {sectionIndex('benefits')} )</span>
      </div>
      <h2 className="sec-title">The cheapest developer is the one you <em>pay twice</em></h2>
      <p className="sec-lead">
        Here&rsquo;s how most founder builds go. You hire fast and cheap. The demo looks fine. Then
        users arrive, something breaks, and nobody can find why. The fix is a rebuild, at full
        price, plus the months you lost. That isn&rsquo;t a developer problem. It&rsquo;s a
        standards problem.
      </p>
      <p className="sec-lead">
        I spent nine years building and running delivery on platforms for Bell, BMW and Bayer,
        through NTT DATA and a consulting engagement. Programmes where every vendor gets audited
        and &ldquo;we&rsquo;ll fix it after launch&rdquo; isn&rsquo;t allowed. Those standards
        ship with your build. They&rsquo;re the insurance policy on your capital.
      </p>
    </div>

    <div className="hair-grid ed-ben-grid">
      {standards.map((b, i) => <BenefitCard key={b.title} b={b} i={i} />)}
    </div>

  </section>
)

export default Benefits
