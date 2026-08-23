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

    <style>{`
      .ed-trust {
        padding: 32px var(--pad);
        border-top: 1px solid var(--hair);
        border-bottom: 1px solid var(--hair);
        background: var(--paper-raised);
        display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center;
      }
      .ed-trust-label {
        font-family: var(--mono); font-size: 0.66rem; font-weight: 500;
        letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal);
      }
      .ed-trust-row {
        display: flex; flex-wrap: wrap; justify-content: center;
        align-items: baseline; gap: 14px 40px;
      }
      .ed-trust-name {
        font-family: var(--serif); font-size: 1.4rem; font-weight: 400;
        letter-spacing: 0.02em; color: var(--ink);
      }
      .ed-trust-note { font-size: 0.78rem; color: var(--ink-muted); }
      @media (max-width: 620px) {
        .ed-trust-row { gap: 10px 24px; }
        .ed-trust-name { font-size: 1.1rem; }
      }
    `}</style>
  </section>
)

export default TrustStrip
