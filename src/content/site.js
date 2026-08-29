/**
 * Site-wide identifiers shared by index.html (hand-written JSON-LD), src/content/products.js and
 * vite.config.js. The build asserts index.html still declares PERSON_ID, so a rename here cannot
 * leave generated nodes pointing at a dangling @id.
 */
export const SITE_URL = 'https://ahmedchioua.com/'
export const PERSON_ID = `${SITE_URL}#person`
export const FAQ_ID = `${SITE_URL}#faq`
