/**
 * The companies behind the nine years, as the cover's "Track record" line. A line of the parties
 * block, not a logo strip: there are no client logos to show for this offer, only employers and
 * the clients they placed the work with.
 */
const clients = ['Bell', 'BMW', 'Bayer', 'NTT DATA', 'Harman']

export const TrackRecord = () => (
  <>
    <span className="track-names">{clients.join(' · ')}</span>{' '}
    Telecom, automotive, life sciences and retail. First as an engineer, later as a delivery lead.
  </>
)
