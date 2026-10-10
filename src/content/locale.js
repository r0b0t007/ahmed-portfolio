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
import { services as frServices } from './fr/services.js'
import { faqs as frFaqs } from './fr/faqs.js'
import { steps as frSteps } from './fr/process.js'
import { productProof as frProductProof, proofItems as frProofItems, siteProof as frSiteProof } from './fr/proof.js'

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
  fr: build('fr', {
    services: frServices, faqs: frFaqs, steps: frSteps,
    productProof: frProductProof, siteProof: frSiteProof, proofItems: frProofItems,
  }),
}

export function contentFor(locale) {
  const c = CONTENT[locale]
  if (!c) throw new Error(`locale: no content for "${locale}"`)
  return c
}
