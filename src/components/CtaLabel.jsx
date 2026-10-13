/**
 * A booking key's label in two lengths. The long one ("Réserver un créneau prototype de 10 jours")
 * runs past a phone's width on one line, and a key never wraps to two lines, so below 480px CSS
 * shows the short one instead (.cta-long / .cta-short in src/index.css). Exactly one is displayed
 * at any width, so a screen reader reads one label.
 *
 * `data-alt` marks the short one as an alternate rendering of the same text, so the Markdown twin
 * (scripts/lib/markdown.js) keeps only the long label. The space between the two keeps them apart
 * for anything that reads the HTML without CSS (reader modes, link unfurlers); inside the key's
 * flex box a whitespace-only text node renders nothing.
 */
export const CtaLabel = ({ long, short }) => (
  <>
    <span className="cta-long">{long}</span>{' '}
    <span className="cta-short" data-alt="">{short}</span>
  </>
)
