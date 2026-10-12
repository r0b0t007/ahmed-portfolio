/**
 * The hero's portrait column, shared by the English (Hero.jsx) and French (src/pages/HomeFr.jsx)
 * homepages. Both pages keep its <link rel="preload"> in their head (heroImage in
 * scripts/prerender.js). `byline` is the caption shown beside the photo below 900px.
 */
const HeroPortrait = ({ byline }) => (
  <div className="ed-hero-portrait">
    {/* AVIF first, WebP fallback. Candidates, `sizes` and the AVIF set must stay in sync with the
        <link rel="preload"> in index.html; files come from scripts/build-images.py. Never add a
        candidate above 700w — a DPR-2 phone would fetch it.

        `sizes` says 76px below 900px because that is the byline square, not a full-bleed cover:
        a DPR-3 phone now resolves to the 320w candidate instead of the 700w one.

        fetchPriority stays here even though the desktop preload in index.html also carries it:
        that tag is typed image/avif, so desktop Safari 16.0-16.3 drops it, falls through to the
        WebP below and would fetch the LCP at default priority without this. It cannot be made
        conditional, so below 900px it also raises the 76px byline square ahead of the fonts;
        at the 320w candidate that is 9 KB, the cheaper side of the trade.

        alt is empty because the image is decorative in both layouts: below 900px the byline
        beside it is its caption and names the person, and above 900px the header logo and the
        <h1> already do. A descriptive alt here made a screen reader say the name twice. */}
    <picture>
      <source
        type="image/avif"
        srcSet="/headshot-320.avif 320w, /headshot-412.avif 412w, /headshot-440.avif 440w, /headshot-700.avif 700w"
        sizes="(max-width: 900px) 76px, 42vw"
      />
      <img
        src="/headshot-700.webp"
        srcSet="/headshot-320.webp 320w, /headshot-412.webp 412w, /headshot-440.webp 440w, /headshot-700.webp 700w"
        sizes="(max-width: 900px) 76px, 42vw"
        width="440" height="677"
        alt=""
        fetchPriority="high"
        decoding="async"
      />
    </picture>
    {/* Hidden on desktop, where the portrait is the right-hand column and needs no caption. Below
        900px the column collapses to a 76px square under the offer, and this byline is what gives
        that square a reason to be there. */}
    <p className="ed-hero-byline">
      <b>Ahmed Chioua</b>
      {byline}
    </p>
  </div>
)

export default HeroPortrait
