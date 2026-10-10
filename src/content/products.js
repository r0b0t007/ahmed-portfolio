/**
 * Single source of truth for Ahmed's own products: what each one is and its current status, as
 * the product's repo and live site show it (launched, preview or sold on a call). State the status
 * that is true today; don't write "live" or "real users" without evidence for it.
 *
 * Consumed by:
 *   - src/components/Proof.jsx  — renders the product cards in the Proof section, and the
 *                                 "two products I built and run" phrase (productsPhrase)
 *   - src/content/faqs.js       — composes the "Can I see client work?" answer
 *   - vite.config.js            — emits one JSON-LD node per product into index.html and fills
 *                                 the product placeholders in the generated llms.txt
 *
 * Every product fact (name, URL, what it is, what Ahmed did, its status) lives here so the
 * page, the structured data and the AI-crawler summary cannot drift. Edit here and nowhere else.
 */
import { PERSON_ID } from './site.js'

const PERSON = { '@id': PERSON_ID }

const entries = [
  {
    name: 'PawPawCare',
    url: 'https://pawpawcare.app/',
    card: 'A pet health tracker I founded and built end to end: vaccine and medication reminders, weight trends, vet records, and AI that reads photos of vaccination cards. In early-access preview, onboarding waitlist members ahead of the app-store launch. It is the closest thing I have to a case study.',
    summary: 'pet health tracker app founded and built by Ahmed',
    faq: 'PawPawCare, a pet health tracker for iOS and Android that I founded and built, now in early-access preview',
    proof: 'a pet health tracker (iOS and Android) that Ahmed founded and built end to end: vaccine and medication reminders, weight trends, vet record storage, AI extraction from uploaded photos of vaccination cards and prescriptions, shareable vet and caretaker links. In early-access preview, onboarding waitlist members ahead of the app-store launch, and the closest thing to a case study for this offer.',
    schema: {
      '@type': 'MobileApplication',
      '@id': 'https://pawpawcare.app/#app',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'iOS, Android',
      description: 'Pet health tracker: vaccine and medication reminders, weight trends, vet record storage and AI extraction from uploaded vaccination cards. Founded and built by Ahmed Chioua.',
      author: PERSON,
      creator: PERSON,
      publisher: { '@type': 'Organization', '@id': 'https://pawpawcare.app/#org', name: 'PawPawCare', url: 'https://pawpawcare.app/', founder: PERSON },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  },
  {
    name: 'FitPal Coach',
    url: 'https://fitpal.ma/',
    card: 'Software for independent personal trainers coaching 5 to 40 clients. The coach gets a dashboard that shows adherence against the plan; each client gets a training app under the coach’s name that installs from the browser, works offline and signs in with a passkey. I built and run it on an open-source core (openGym). Sold through a call at fitpal.ma.',
    summary: 'coaching software for independent personal trainers, built and run by Ahmed on an open-source core',
    faq: 'FitPal Coach, coaching software for independent personal trainers, built on an open-source core',
    proof: 'coaching software for independent personal trainers in Morocco with 5 to 40 clients: a coach dashboard showing adherence against the plan, and a training app for each client under the coach’s name (installs from the browser, works offline, passkey sign-in, 1,324 illustrated exercises). Built and run by Ahmed on the open-source openGym core (AGPL). Sold through a call at fitpal.ma, with no public price.',
    schema: {
      // Same @id, type and operatingSystem as fitpal.ma's own JSON-LD, so crawlers merging the
      // entity across both sites don't get two conflicting descriptions of one app.
      '@type': 'SoftwareApplication',
      '@id': 'https://fitpal.ma/#app',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Android, iOS',
      description: 'Coaching software for independent personal trainers: a coach dashboard for adherence against the plan, and an installable, offline-capable training app for each client with passkey sign-in. Built and run by Ahmed Chioua on the open-source openGym core.',
      author: PERSON,
      creator: PERSON,
      // No `offers`: Google requires a numeric price on an Offer, and FitPal Coach's is set per coach on a call.
      isBasedOn: 'https://gitea.com/DuarteSantos/openGym',
      // fitpal.ma names the Person as publisher and declares no organisation; match it.
      publisher: PERSON,
    },
  },
]

export const products = entries.map(p => ({
  ...p,
  label: new URL(p.url).host,
  schema: { name: p.name, url: p.url, ...p.schema },
}))

const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

/**
 * "two products I built and run", from the list above. The Proof section and the SaaS page say it;
 * deriving it means adding or retiring a product can't leave either one counting wrong.
 */
export const productsPhrase =
  `${NUMBER_WORDS[products.length] ?? products.length} product${products.length === 1 ? '' : 's'} I built and run`
