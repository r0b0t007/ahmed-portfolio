/**
 * Single source of truth for shipped products.
 *
 * Consumed by:
 *   - src/components/Proof.jsx  — renders the product cards in the Proof section
 *   - src/content/faqs.js       — composes the "Can I see client work?" answer
 *   - vite.config.js            — emits one JSON-LD node per product into index.html and fills
 *                                 the product placeholders in the generated llms.txt
 *
 * Every product fact (name, URL, what it is, what Ahmed did, where it's live) lives here so the
 * page, the structured data and the AI-crawler summary cannot drift. Edit here and nowhere else.
 */
import { PERSON_ID } from './site.js'

const PERSON = { '@id': PERSON_ID }

const entries = [
  {
    name: 'PawPawCare',
    url: 'https://pawpawcare.app/',
    card: 'A pet health tracker I founded and built end to end — vaccine and medication reminders, weight trends, vet records, AI scanning of vaccination cards. Live on iOS and Android, with real users. The closest thing I have to a case study: a product, not a mock-up.',
    summary: 'pet health tracker app founded and built by Ahmed',
    faq: 'PawPawCare, a pet health tracker on iOS and Android that I founded and built',
    proof: 'a pet health tracker (iOS and Android) that Ahmed founded and built end to end: vaccine and medication reminders, weight trends, vet record storage, AI-powered scanning of vaccination cards and prescriptions, shareable vet and caretaker links. Live with real users; the closest thing to a case study for this offer.',
    schema: {
      '@type': 'MobileApplication',
      '@id': 'https://pawpawcare.app/#app',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      description: 'Pet health tracker: vaccine and medication reminders, weight trends, vet record storage and AI-powered scanning of vaccination cards. Founded and built by Ahmed Chioua.',
      author: PERSON,
      creator: PERSON,
      publisher: { '@type': 'Organization', '@id': 'https://pawpawcare.app/#org', name: 'PawPawCare', url: 'https://pawpawcare.app/', founder: PERSON },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  {
    name: 'FitPal',
    url: 'https://fitpal.ma/',
    card: 'A gym’s own member app, under its own brand — passkey sign-in, sign-ups the owner approves, class timetable, workout tracking. Installs from the browser, no app store. Built and run by me on an open-source core (openGym): brand, access flow, sessions, deploy pipeline and bilingual site, delivered in days. Live at its first club, FIT’ONE.',
    summary: 'white-label gym member app, built and run by Ahmed on an open-source core',
    faq: 'FitPal, a white-label gym member app on an open-source core, live at its first club, FIT’ONE',
    proof: 'a white-label member app for gyms (installable PWA on iOS, Android and desktop): passkey sign-in, owner-approved access requests, group class timetable, workout and body-weight tracking, owner dashboard. Built and run by Ahmed on the open-source openGym core (AGPL) — he added access requests, group sessions, a test-gated CI/CD pipeline and a bilingual FR/EN marketing site. Live at its first club, FIT’ONE.',
    schema: {
      '@type': 'WebApplication',
      '@id': 'https://fitpal.ma/#app',
      applicationCategory: 'HealthApplication',
      browserRequirements: 'Requires a modern browser; installable as a PWA on iOS, Android and desktop.',
      description: 'White-label member app for gyms: passkey sign-in, owner-approved access requests, group class timetable, workout and body-weight tracking. Built and run by Ahmed Chioua on the open-source openGym core.',
      author: PERSON,
      creator: PERSON,
      // No `offers`: Google requires a numeric price on an Offer, and FitPal's is quoted per club.
      isBasedOn: 'https://gitea.com/DuarteSantos/openGym',
      publisher: { '@type': 'Organization', '@id': 'https://fitpal.ma/#org', name: 'FitPal', url: 'https://fitpal.ma/', founder: PERSON },
    },
  },
]

export const products = entries.map(p => ({
  ...p,
  label: new URL(p.url).host,
  schema: { name: p.name, url: p.url, ...p.schema },
}))
