/**
 * A build-log section's short label, above its heading. Plain sentence case and no "( 0N )"
 * number: the log is the one long read on the site, and the label is a signpost, not decoration.
 * `index` is still passed by the log (its section order lives in src/lib/sections.js) but is not
 * shown.
 */
export const Eyebrow = ({ label }) => <p className="kicker">{label}</p>
