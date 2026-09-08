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
export const BOOKING_URL = 'https://calendly.com/ahmedchioua/30min'

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
export const PERSON_ID = `${SITE_URL}#person`
export const FAQ_ID = `${SITE_URL}#faq`
