/**
 * A section's label. The Colour system (DESIGN.md) dropped the "( 0N )" number beside it: the
 * band's colour already tells the reader where they are, and the same counter on all ten sections
 * was the single most repeated pattern on the page. Callers still pass `index`; it is ignored.
 */
export const Eyebrow = ({ label }) => (
  <div className="eyebrow-row">
    <span className="eyebrow">{label}</span>
  </div>
)
