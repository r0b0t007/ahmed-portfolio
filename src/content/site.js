/**
 * Site-wide identifiers shared by index.html (hand-written JSON-LD), src/content/products.js and
 * vite.config.js. The build asserts index.html still declares PERSON_ID, so a rename here cannot
 * leave generated nodes pointing at a dangling @id.
 */
export const SITE_URL = 'https://ahmedchioua.com/'

/** The public source of this site. The Proof section and the build log both link into it. */
export const REPO_URL = 'https://github.com/r0b0t007/ahmed-portfolio'

/**
 * Where every "book a call" control points. Swapping booking provider is a one-line change here,
 * not a hunt through the components.
 */
export const BOOKING_URL = 'https://cal.com/ahmedchioua/scope-call'

/**
 * Direct contact for people who would rather message than book. wa.me wants the number in full
 * international form with no '+', spaces or dashes. The prefilled text is a starting point the
 * sender can edit before it goes anywhere.
 */
export const WHATSAPP_NUMBER = '212626410690'
export const WHATSAPP_DISPLAY = '+212 626-410-690'
export const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Hi Ahmed, I found your site and I'd like to talk about a project.")
/** The same invitation in French, for the French pages (src/content/fr/). */
export const WHATSAPP_URL_FR =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent('Bonjour Ahmed, j’ai trouvé votre site et j’aimerais parler d’un projet.')
/**
 * The offer's numbers. They appear in the hero, Process, Handoff, Pricing, the FAQ, llms.txt and
 * the meta descriptions; a change here is one line, not a hunt. index.html cannot import, so the
 * build asserts its hand-written copies still match (vite.config.js).
 */
export const FIRST_LINK_DAYS = 10
export const LAUNCH_COVER_DAYS = 30
export const FOUNDING_SLOTS = 3

/**
 * The published price floors. A band, not a quote: the exact figure is still fixed in the scope
 * call, but the buyer can qualify themselves before booking one. Two of the three offer pillars
 * (days, cover) were already published as numbers; this is the third.
 *
 * Read by the Pricing section, the "What does it cost?" FAQ answer (and therefore the FAQPage
 * JSON-LD derived from it) and llms.txt, so the three cannot drift.
 */
const CURRENCY = '€'
// ISO 4217 code for the same currency, for structured data (Offer.priceCurrency).
export const CURRENCY_CODE = 'EUR'
export const PRICE_SITE_FROM = 3000
export const PRICE_SAAS_FROM = 12000

const money = n => `${CURRENCY}${n.toLocaleString('en-US')}`
export const PRICE_SITE_LABEL = money(PRICE_SITE_FROM)
export const PRICE_SAAS_LABEL = money(PRICE_SAAS_FROM)

// The same floors written the French way ("3 000 €"). fr-FR groups with a narrow no-break space,
// and the space before the currency is a no-break one, so a figure never wraps away from it.
const moneyFr = n => `${n.toLocaleString('fr-FR')} ${CURRENCY}`
export const PRICE_SITE_LABEL_FR = moneyFr(PRICE_SITE_FROM)
export const PRICE_SAAS_LABEL_FR = moneyFr(PRICE_SAAS_FROM)

/**
 * What makes a quote land above the floor. Shown under the price band on the homepage and on
 * each service page, so the two can't drift into different answers.
 */
export const PRICE_MOVERS =
  'What moves the number: how much of it is new rather than adapted, and whether auth, payments or third-party integrations are in scope.'

/**
 * The booking CTA in its three lengths. Every control that opens BOOKING_URL uses one of these,
 * so the label cannot drift into a fourth spelling.
 */
export const CTA_LABEL_LONG = `Claim a ${FIRST_LINK_DAYS}-Day Prototype Slot`
export const CTA_LABEL = `Claim a ${FIRST_LINK_DAYS}-Day Slot`
export const CTA_LABEL_NAV = 'Claim a slot'
export const PERSON_ID = `${SITE_URL}#person`
export const FAQ_ID = `${SITE_URL}#faq`

/**
 * The price promise, stated once. The homepage Pricing section and each service page both
 * render it, so the commitment can't exist in two versions.
 */
export const PRICE_PROMISE = `Your number is fixed once, in the free scope call, in writing, with a date attached, and it doesn’t move after that. It covers the build, the infrastructure, the hand-off and ${LAUNCH_COVER_DAYS} days of launch insurance. No hourly meter.`

/** The founding-client trade. The FAQ answers with it and the service pages' price sections restate it. */
export const FOUNDING_OFFER = `for the next ${FOUNDING_SLOTS} projects, and it isn’t a discount. You trade a written case study and a reference for the founding price. Same scope, same date, same hand-off. Say “founding” in the scope call.`

/**
 * Typical build lengths in weeks. The FAQ, the service pages (facts strip, meta description,
 * lead) and llms.txt all state them; changing a range is one edit here.
 */
export const SITE_WEEKS = { from: 2, to: 3 }
export const SAAS_WEEKS = { from: 4, to: 6 }
export const weeksRange = w => `${w.from}–${w.to}`
export const weeksText = w => `${w.from} to ${w.to}`
export const weeksTextFr = w => `${w.from} à ${w.to}`
