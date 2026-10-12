import { Fragment } from 'react'
import { BOOKING_URL, FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../content/site'
import { useContent } from '../lib/content-context'
import { WhatsAppIcon } from './WhatsAppIcon'

/**
 * The pitch card's one working object: pick a build, read its terms, book. Every figure is a
 * published one (src/content/site.js through the services), so the picker is the price band and
 * the schedule in one glance, not new information.
 *
 * Pure CSS, no JavaScript: a native radio group (arrow keys move between tabs, the checked one is
 * announced), and `.picker:has(#pick-saas:checked)` swaps the panel. Without :has the first panel
 * stays visible, which is a complete answer on its own. Both panels share one grid cell, so the
 * swap never moves anything below it, and the hidden one is `visibility: hidden`, so assistive
 * tech only reads the panel that is showing.
 */
const ScopePicker = () => {
  const { ui, services } = useContent()
  const p = ui.picker
  return (
    <fieldset className="picker">
      <legend className="picker-legend">{p.legend}</legend>
      <div className="picker-tabs">
        {services.map((s, i) => (
          <Fragment key={s.id}>
            <input type="radio" name="picker" id={`pick-${s.id}`} className="picker-input" defaultChecked={i === 0} />
            <label htmlFor={`pick-${s.id}`} className="picker-tab">{p.tabs[s.id]}</label>
          </Fragment>
        ))}
      </div>
      <div className="picker-panels">
        {services.map(s => (
          <div key={s.id} className={`picker-panel picker-panel--${s.id}`}>
            <dl className="picker-facts">
              <div><dt>{p.rows.price}</dt><dd>{s.priceLabel}</dd></div>
              <div><dt>{p.rows.weeks}</dt><dd>{p.weeks(s.weeks)}</dd></div>
              <div><dt>{p.rows.link}</dt><dd>{p.day(FIRST_LINK_DAYS)}</dd></div>
              <div><dt>{p.rows.cover}</dt><dd>{p.cover(LAUNCH_COVER_DAYS)}</dd></div>
            </dl>
            <p className="picker-cta">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn">{ui.cta.short}</a>
              <a href={ui.whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-quiet">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </p>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default ScopePicker
