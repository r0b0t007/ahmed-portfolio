/**
 * The signature at the foot of the pitch card: a 48px portrait, the name and one line. The photo
 * is a small avatar, not the hero, so the LCP is the <h1> text and index.html preloads no image.
 * Only the 320w files are offered: at 48px even a 3x screen needs 144 pixels.
 *
 * alt is empty because the name sits right beside the image; a descriptive alt made a screen
 * reader say it twice.
 */
const Byline = ({ text }) => (
  <div className="byline">
    <picture>
      <source type="image/avif" srcSet="/headshot-320.avif 320w" sizes="48px" />
      <img src="/headshot-320.webp" srcSet="/headshot-320.webp 320w" sizes="48px" width="48" height="48" alt="" decoding="async" />
    </picture>
    {/* The space keeps name and line apart in extracted text; on screen <b> is a block. */}
    <p><b>Ahmed Chioua</b>{' '}{text}</p>
  </div>
)

export default Byline
