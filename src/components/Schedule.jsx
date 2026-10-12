/**
 * The offer's schedule drawn as a dimension line: kickoff, the first working link, the usual
 * launch windows and the cover period, as stations on one rule. It replaces the hero's old row of
 * four unrelated numbers (days, a count of one, years, a Lighthouse score): every station here is
 * a point on the same timeline, in the unit it is measured in, so the figures can be read against
 * each other.
 *
 * The values come from src/content/site.js (FIRST_LINK_DAYS, SITE_WEEKS, SAAS_WEEKS,
 * LAUNCH_COVER_DAYS) through each hero's own copy, so nothing here is a second copy of a number.
 * `key` marks the station the offer is built around (the first working link); the line draws
 * it in the signal colour.
 */
export const Schedule = ({ caption, stops }) => (
  <figure className="ind-sched">
    <figcaption className="ind-sched-cap">{caption}</figcaption>
    <ol className="ind-sched-line">
      {stops.map(s => (
        <li key={s.at} className={`ind-stop${s.key ? ' is-key' : ''}`}>
          <span className="ind-stop-at">{s.at}</span>
          <span className="ind-stop-what">{s.what}</span>
        </li>
      ))}
    </ol>
  </figure>
)
