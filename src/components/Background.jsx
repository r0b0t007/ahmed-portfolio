import { Roles } from './Experience'
import { Toolkit } from './Summary'

/**
 * The record behind the offer, after the pitch and folded. It used to be three sections in the
 * middle of the sales path (the trust strip, Background, About), which a founder deciding on a
 * build scrolled past and a recruiter came looking for. The heading and the employers stay visible;
 * the full record opens in place. #experience and #about still land here.
 */
const Background = () => (
  <section id="experience" className="block block-end">
    <details className="fold fold-section">
      <summary>
        <h2 className="block-title">Where the standards <em>come from</em></h2>
        <span className="fold-hint">Nine years delivering for Bell, BMW, Bayer, NTT DATA and Harman</span>
      </summary>
      <div className="fold-body">
        <p>
          Nine years inside enterprise software: about four building it, and five leading the
          teams that shipped it. Both halves show up in how I work now.
        </p>
        <p>Telecom, automotive, life sciences and retail. First as an engineer, later as a delivery lead.</p>
        <Roles />
        <div id="about" className="kit-wrap">
          <h3 className="kit-title">What I work <em>with</em></h3>
          <p>
            I use AI every day in the build, and it’s the difference between quoting six weeks and
            quoting six months. What it hasn’t changed is the part that decides whether software
            survives real users: the data model, the architecture, the tests, and knowing what to
            leave out. That half came from nine years of enterprise delivery.
          </p>
          <Toolkit />
        </div>
      </div>
    </details>
  </section>
)

export default Background
