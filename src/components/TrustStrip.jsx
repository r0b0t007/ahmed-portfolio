const clients = ['Bell', 'BMW', 'Bayer', 'NTT DATA', 'Harman']

const TrustStrip = () => (
  <section className="ed-trust" aria-label="Companies delivered for">
    <span className="ed-trust-label">Nine years delivering for</span>
    <div className="ed-trust-row">
      {clients.map(c => <span key={c} className="ed-trust-name">{c}</span>)}
    </div>
    <p className="ed-trust-note">
      Telecom · automotive · life sciences · retail — as engineer, then as delivery lead.
    </p>

  </section>
)

export default TrustStrip
