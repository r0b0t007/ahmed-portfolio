import { useFadeIn } from '../hooks/useFadeIn'

const REPO = 'https://github.com/r0b0t007/ahmed-portfolio'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

const PAWPAW = 'https://pawpawcare.app/'
const FITPAL = 'https://fitpal.ma/'

const items = [
  {
    i: '001',
    title: 'PawPawCare',
    body: 'A pet health tracker I founded and built end to end — vaccine and medication reminders, weight trends, vet records, AI scanning of vaccination cards. Live on iOS and Android, with real users. The closest thing I have to a case study: a product, not a mock-up.',
    link: { label: 'pawpawcare.app', href: PAWPAW },
  },
  {
    i: '002',
    title: 'FitPal',
    body: 'A gym’s own member app, under its own brand — passkey sign-in, sign-ups the owner approves, class timetable, workout tracking. Installs from the browser, no app store. Brand, access flow, sessions, deploy pipeline and bilingual site delivered by me in days on an open-source core; already running at its first club, FIT’ONE.',
    link: { label: 'fitpal.ma', href: FITPAL },
  },
  {
    i: '003',
    title: 'This site',
    body: 'Designed, built and deployed by me. React, hand-written CSS, no template, no page builder. Scores 100 / 100 / 100 on Lighthouse for accessibility, best practices and SEO — run it yourself.',
    link: null,
  },
  {
    i: '004',
    title: 'The source',
    body: 'The whole thing is public. Read the code, the structured data, the build config, the commit history. If you want to know how I work, that’s the most honest answer I can give you.',
    link: { label: 'github.com/r0b0t007', href: REPO },
  },
  {
    i: '005',
    title: 'The track record',
    body: 'Nine years of production software for companies that audit their vendors — Bell, BMW, Bayer. Verifiable, with certifications to match.',
    link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
  },
]

const Item = ({ it }) => {
  const ref = useFadeIn(0.1)
  return (
    <div ref={ref} className="fade-in ed-proof-item">
      <div className="ed-proof-head">
        <h3>{it.title}</h3>
        <span className="ed-proof-i">{it.i}</span>
      </div>
      <p className="ed-proof-body">{it.body}</p>
      {it.link && (
        <a className="ed-proof-link" href={it.link.href} target="_blank" rel="noopener noreferrer">
          {it.link.label} ↗
        </a>
      )}
    </div>
  )
}

const Proof = () => {
  const leadRef = useFadeIn(0.1)
  const foundingRef = useFadeIn(0.1)
  return (
    <section id="proof" className="section">
      <div className="eyebrow-block">
        <div className="eyebrow-row">
          <span className="eyebrow">Proof</span>
          <span className="eyebrow-index">( 03 )</span>
        </div>
        <h2 className="sec-title">Two shipped products, and <em>this page</em></h2>
        <p ref={leadRef} className="fade-in sec-lead">
          I’m not going to show you a wall of client logos for this kind of work, because I’d be
          borrowing credit I haven’t earned yet. Here’s what I can show you instead — two products
          I built and run myself, plus this site — all of it checkable in about two minutes.
        </p>
      </div>

      <div className="hair-grid ed-proof-grid">
        {items.map(it => <Item key={it.i} it={it} />)}
      </div>

      <div ref={foundingRef} className="fade-in ed-founding">
        <span className="ed-founding-label">Founding clients</span>
        <p>
          I’m building the client side of this portfolio deliberately, which means the first few
          projects go out at founding rates in exchange for a case study and a reference. You get
          senior work below market; I get proof. Say so when you get in touch.
        </p>
      </div>

    </section>
  )
}

export default Proof
