const clients = ['Bell', 'BMW', 'Bayer', 'NTT DATA', 'Harman']

// A ruled matrix of five equal cells: the names set as type, not as borrowed logos.
const TrustStrip = () => (
  <section className="band trust" aria-label="Companies delivered for">
    <div className="shell">
      <p className="label">Nine years delivering for</p>
      <ul className="trust-cells">
        {clients.map(c => <li key={c}>{c}</li>)}
      </ul>
      <p className="trust-note">
        Telecom, automotive, life sciences and retail. First as an engineer, later as a delivery lead.
      </p>
    </div>
  </section>
)

export default TrustStrip
