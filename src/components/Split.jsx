/**
 * The Compact page shape (DESIGN.md): on wide screens the pitch card stays in view on the left
 * while the reasons scroll on the right, so the offer and the booking action are never more than
 * a glance away. Below 960px it is one column, pitch first.
 */
export const Split = ({ pitch, children }) => (
  <div className="split">
    <div className="split-pitch">{pitch}</div>
    <div className="split-body">{children}</div>
  </div>
)

/** One body section: a heading, an optional lead, and whatever the section holds. */
export const Block = ({ id, title, em, lead, children }) => (
  <section id={id} className="block">
    <h2 className="block-title">{title}{em && <> <em>{em}</em></>}</h2>
    {lead && <p className="block-lead">{lead}</p>}
    {children}
  </section>
)

/**
 * A collapsed detail: the label is always visible, the rest waits to be asked for. Used for the
 * FAQ, the process steps and the long versions, which is what keeps the page short.
 */
export const Fold = ({ summary, children, id, className = '' }) => (
  <details id={id} className={`fold ${className}`.trim()}>
    <summary>{summary}</summary>
    <div className="fold-body">{children}</div>
  </details>
)
