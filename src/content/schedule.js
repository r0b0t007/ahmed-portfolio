/**
 * The schedule drawn under the English hero (src/components/Schedule.jsx). The French one is
 * home.hero.schedule in src/content/fr/home.js; scripts/lib/i18n.test.js holds the two to the same
 * stations and the same key station.
 *
 * The usual timeline, as the FAQ states it ("a marketing site is usually 2 to 3 weeks, an MVP 4 to
 * 6, a working link within the first 10 days"). The dates themselves go in each written scope.
 * The two launch stations are alternatives (one or the other, by project), and the cover counts
 * from launch, so each says which it is rather than reading as one sequence.
 */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, SAAS_WEEKS, SITE_WEEKS, weeksRange } from './site.js'

export const schedule = {
  caption: 'Usual schedule. Your own dates go in the written scope.',
  stops: [
    { at: 'Day 0', what: 'Kickoff, after a free scope call' },
    { at: `Day ${FIRST_LINK_DAYS}`, what: 'Your first working link', key: true },
    { at: `Weeks ${weeksRange(SITE_WEEKS)}`, what: 'Launch, for a marketing site' },
    { at: `Weeks ${weeksRange(SAAS_WEEKS)}`, what: 'Or launch, for an MVP' },
    { at: `+${LAUNCH_COVER_DAYS} days`, what: 'After launch: fixes included' },
  ],
}
