/**
 * Site-wide identifiers shared by index.html (hand-written JSON-LD), src/content/products.js and
 * vite.config.js. The build asserts index.html still declares PERSON_ID, so a rename here cannot
 * leave generated nodes pointing at a dangling @id.
 */
export const SITE_URL = 'https://ahmedchioua.com/'

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
const PRICE_SITE_FROM = 3000
const PRICE_SAAS_FROM = 12000

const money = n => `${CURRENCY}${n.toLocaleString('en-US')}`
export const PRICE_SITE_LABEL = money(PRICE_SITE_FROM)
export const PRICE_SAAS_LABEL = money(PRICE_SAAS_FROM)

/**
 * The booking CTA in its three lengths. Every control that opens BOOKING_URL uses one of these,
 * so the label cannot drift into a fourth spelling.
 */
export const CTA_LABEL_LONG = `Claim a ${FIRST_LINK_DAYS}-Day Prototype Slot`
export const CTA_LABEL = `Claim a ${FIRST_LINK_DAYS}-Day Slot`
export const CTA_LABEL_NAV = 'Claim a slot'
export const PERSON_ID = `${SITE_URL}#person`
export const FAQ_ID = `${SITE_URL}#faq`
