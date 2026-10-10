/**
 * Everything a page renders, in one language. App.jsx provides contentFor(route.locale) through
 * src/lib/content-context.js. The French modules under src/content/fr/ mirror the English ones
 * by id, so a component never branches on the language. Keep it JSX-free.
 */
import { byId } from './byId.js'
import { uiFor } from './i18n.js'
import { services } from './services.js'
import { faqs } from './faqs.js'
import { steps } from './process.js'
import { productProof, proofItems, siteProof } from './proof.js'

const build = (locale, m) => ({
  locale,
  ui: uiFor(locale),
  services: m.services,
  findService: byId(m.services, `services (${locale})`),
  faqs: m.faqs,
  faqById: byId(m.faqs, `faqs (${locale})`),
  steps: m.steps,
  proof: { products: m.productProof, site: m.siteProof, all: m.proofItems },
})

const CONTENT = {
  en: build('en', { services, faqs, steps, productProof, siteProof, proofItems }),
}

export function contentFor(locale) {
  const c = CONTENT[locale]
  if (!c) throw new Error(`locale: no content for "${locale}"`)
  return c
}
