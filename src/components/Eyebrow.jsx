/**
 * A section's mono label and its "( 0N )" number. The number is passed in already formatted,
 * because each page type numbers its sections from its own order in src/lib/sections.js.
 */
export const Eyebrow = ({ label, index }) => (
  <div className="eyebrow-row">
    <span className="eyebrow">{label}</span>
    <span className="eyebrow-index">( {index} )</span>
  </div>
)
