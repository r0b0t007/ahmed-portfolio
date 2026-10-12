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

// The page's one plate: the claim the whole offer rests on, flooded in the signal ink. The grid's
// rails continue across it at low opacity, so it reads as a poster inside the same sheet.
const Benefits = () => (
  <section id="benefits" className="band plate">
    <div className="shell">
      <div className="sec-head">
        <h2 className="head">The cheapest developer is the one you <em className="sq">pay twice</em></h2>
        <div>
          <p className="lead">
            Here&rsquo;s how most founder builds go. You hire fast and cheap. The demo looks fine. Then
            users arrive, something breaks, and nobody can find why. The fix is a rebuild, at full
            price, plus the months you lost. That isn&rsquo;t a developer problem. It&rsquo;s a
            standards problem.
          </p>
          <p className="lead">
            I spent nine years building and running delivery on platforms for Bell, BMW and Bayer,
            through NTT DATA and a consulting engagement. Programmes where every vendor gets audited
            and &ldquo;we&rsquo;ll fix it after launch&rdquo; isn&rsquo;t allowed. Those standards
            ship with your build. They&rsquo;re the insurance policy on your capital.
          </p>
        </div>
      </div>

      <ul className="plate-cells">
        {standards.map(b => <BenefitCard key={b.title} b={b} mark={false} />)}
      </ul>
    </div>
  </section>
)

export default Benefits
