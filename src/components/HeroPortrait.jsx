/**
 * The hero's figure cell, shared by the English (Hero.jsx) and French (src/pages/HomeFr.jsx)
 * homepages. Both pages keep its <link rel="preload"> in their head (heroImage in
 * scripts/prerender.js). Above 60rem it is the right-hand column of the grid, ruled off in ink,
 * with a caps caption under it; below, it collapses to a 76px square with `byline` beside it.
 */
const HeroPortrait = ({ byline, place }) => (
  <figure className="portrait">
    {/* AVIF first, WebP fallback. Candidates, `sizes` and the AVIF set must stay in sync with the
        <link rel="preload"> in index.html; files come from scripts/build-images.py. Never add a
        candidate above 700w — a DPR-2 phone would fetch it.

        `sizes` says 76px below 60rem because that is the byline square, not a full-bleed cover:
        a DPR-3 phone resolves to the 320w candidate instead of the 700w one. Above, the cell is
        four of the twelve columns.

        fetchPriority stays here even though the desktop preload in index.html also carries it:
        that tag is typed image/avif, so desktop Safari 16.0-16.3 drops it, falls through to the
        WebP below and would fetch the LCP at default priority without this.

        alt is empty because the image is decorative in both layouts: below 60rem the byline
        beside it names the person, and above it the caption, the masthead and the <h1> do. A
        descriptive alt here made a screen reader say the name twice. */}
    <picture>
      <source
        type="image/avif"
        srcSet="/headshot-320.avif 320w, /headshot-412.avif 412w, /headshot-440.avif 440w, /headshot-700.avif 700w"
        sizes="(max-width: 59.99rem) 76px, 30vw"
      />
      <img
        src="/headshot-700.webp"
        srcSet="/headshot-320.webp 320w, /headshot-412.webp 412w, /headshot-440.webp 440w, /headshot-700.webp 700w"
        sizes="(max-width: 59.99rem) 76px, 30vw"
        width="440" height="677"
        alt=""
        fetchPriority="high"
        decoding="async"
      />
    </picture>
    <p className="portrait-byline">
      {/* The space keeps name and byline apart in extracted text; on screen <b> is a block. */}
      <b>Ahmed Chioua</b>{' '}
      {byline}
    </p>
    {/* Each layout shows one of byline and caption (src/index.css), so a screen reader hears one. */}
    <figcaption className="portrait-cap">
      <span className="label">Ahmed Chioua</span>
      <span className="label">{place}</span>
    </figcaption>
  </figure>
)

export default HeroPortrait
