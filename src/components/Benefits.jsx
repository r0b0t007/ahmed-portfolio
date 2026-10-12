import { BenefitCard } from './BenefitCard'
import { Block, Fold } from './Split'

/**
 * The "why it won't break" section. Founders can't judge code quality, so the argument is made
 * in money: cheap builds get paid for twice. The three rows are the standards that ship with
 * every build; the two paragraphs that tell the story behind them wait behind "The longer
 * version", so the section reads in one screen on a phone.
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
  <Block id="benefits" title="The cheapest developer is the one you" em="pay twice">
    <ul className="rows">
      {standards.map(b => <BenefitCard key={b.title} b={b} />)}
    </ul>
    <Fold summary="The longer version">
      <p>
        Here&rsquo;s how most founder builds go. You hire fast and cheap. The demo looks fine. Then
        users arrive, something breaks, and nobody can find why. The fix is a rebuild, at full
        price, plus the months you lost. That isn&rsquo;t a developer problem. It&rsquo;s a
        standards problem.
      </p>
      <p>
        I spent nine years building and running delivery on platforms for Bell, BMW and Bayer,
        through NTT DATA and a consulting engagement. Programmes where every vendor gets audited
        and &ldquo;we&rsquo;ll fix it after launch&rdquo; isn&rsquo;t allowed. Those standards
        ship with your build. They&rsquo;re the insurance policy on your capital.
      </p>
    </Fold>
  </Block>
)

export default Benefits
