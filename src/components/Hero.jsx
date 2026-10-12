import { FIRST_LINK_DAYS } from '../content/site'
import ScopePicker from './ScopePicker'
import Byline from './Byline'

/**
 * The English homepage's pitch card: who it's for, the offer, the scope picker (price, weeks,
 * booking) and the signature. It is the whole first screen on a phone and stays in view on wide
 * screens (Split.jsx), so the four-number stat row it replaced is gone: each of those figures now
 * sits in the picker or in the section that proves it.
 */
const Hero = () => {
  return (
    <section id="hero" className="pitch">
      <p className="pitch-for">For founders who need it launched, not &ldquo;in progress&rdquo;</p>
      <h1 className="pitch-h1">Your site or SaaS,<br />live in weeks.<br />Fixed price.<br /><em>Date in writing.</em></h1>
      <p className="pitch-lead">
        A working link in <strong>{FIRST_LINK_DAYS} days</strong>. A launch date you can plan around. A price
        that doesn&rsquo;t move. Built by an engineer with nine years shipping production software
        for Bell, BMW and Bayer.
      </p>
      <ScopePicker />
      <p className="pitch-alt">
        <a href="#handoff" className="link-quiet">See exactly what you get →</a>
      </p>
      <Byline text="Web and SaaS developer. You work with me directly, start to finish." />
    </section>
  )
}

export default Hero
