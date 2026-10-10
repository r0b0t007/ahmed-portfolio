/**
 * Interface strings: the words around the content (navigation, breadcrumb, CTAs, the service
 * page's section titles, the contact form, the footer). src/content/fr/ui.js has the same shape
 * in French, so one set of components renders both languages. Offer facts stay in site.js; this
 * file only words them.
 *
 * Keep it light: the two hydrated islands import it (through i18n.js), so everything it imports
 * ships in the client bundle.
 */
import {
  CTA_LABEL, CTA_LABEL_LONG, CTA_LABEL_NAV, FIRST_LINK_DAYS, FOUNDING_OFFER, PRICE_MOVERS,
  PRICE_PROMISE, WHATSAPP_URL,
} from './site.js'

export const ui = {
  lang: 'en',
  home: '/',
  // Section links are root-relative: on the homepage they scroll in place, and from any other page
  // they lead back to that section. The CTA is the exception: every page renders the contact form,
  // so "#contact" keeps the visitor on the page they were reading.
  nav: [
    { name: 'Services', href: '/#services' },
    { name: 'Process', href: '/#process' },
    { name: 'Proof', href: '/#proof' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/#about' },
    { name: 'FAQ', href: '/#faq' },
    { name: CTA_LABEL_NAV, href: '#contact', accent: true },
  ],
  menu: 'Menu',
  // The header's link to the other language. Its accessible name contains the visible label.
  switchTo: { label: 'FR', name: 'FR, version française', lang: 'fr' },
  crumbHome: 'Home',
  crumbLabel: 'Breadcrumb',
  cta: { long: CTA_LABEL_LONG, short: CTA_LABEL },
  whatsappUrl: WHATSAPP_URL,
  offer: { promise: PRICE_PROMISE, movers: PRICE_MOVERS, founding: FOUNDING_OFFER },
  service: {
    facts: {
      price: 'Starting price, fixed per project in writing',
      weeks: 'Weeks, usually, from kickoff to launch',
      firstLink: 'Days to your first working link',
      cover: 'Days of post-launch fixes, included',
    },
    seePrice: 'See the price →',
    included: { eyebrow: 'What you get', title: 'Everything it takes', em: 'to go live.' },
    weeks: {
      eyebrow: 'How the weeks run',
      title: weeks => `Usually live in ${weeks} weeks.`,
      em: `A link on day ${FIRST_LINK_DAYS}.`,
      lead: 'The same four steps as every project, and you can see it running from the first one.',
    },
    price: {
      eyebrow: 'Price',
      title: price => `From ${price}.`,
      em: 'Quoted once.',
      lead: price => `${price} is the starting point. ${PRICE_PROMISE}`,
      founding: 'Founding-client rate:',
      cta: 'Lock in a price and a date',
    },
    proof: { eyebrow: 'Proof' },
    faq: { eyebrow: 'Questions', title: 'Straight', em: 'answers' },
  },
  contact: {
    eyebrow: 'Next step',
    title: 'Claim your',
    em: `${FIRST_LINK_DAYS}-Day Prototype Slot`,
    lead: "I run a few builds at a time; weekly demos are why. The scope call is free, 30 minutes, and ends with a written answer: what gets built, what it costs, and the date it goes live. If I'm not the right person for it, I'll tell you on the call.",
    whatsapp: 'Message me on WhatsApp',
    details: { email: 'Email', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', location: 'Location', place: 'Tétouan, Morocco · Remote' },
    terms: 'No retainer. No deposit to talk. A written scope within a week, or a straight “not me”.',
    notReady: 'Not ready to talk?',
    readCode: 'Read the code first →',
    fields: {
      name: { label: 'Name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'your@email.com' },
      subject: { label: 'Subject', placeholder: "What's this about?" },
      message: { label: 'Message', placeholder: 'Tell me more…' },
    },
    submit: { idle: 'Send message', sending: 'Sending…', success: '✓ Message sent', error: '✗ Failed — retry' },
    // Validation messages for the browser's bubble. null keeps the browser's own, which is in the
    // browser's language; the French pages set theirs.
    invalid: null,
  },
  footer: {
    tag: `Fixed price. Date in writing. A working link in ${FIRST_LINK_DAYS} days.`,
    rights: '© 2026 Ahmed Chioua. All rights reserved.',
  },
}
