/**
 * Single source of truth for the FAQ.
 *
 * Consumed by:
 *   - src/components/Faq.jsx   — renders the visible section
 *   - src/pages/ServicePage.jsx — renders a per-service subset, picked by id
 *   - vite.config.js           — generates the FAQPage JSON-LD injected into index.html and the
 *                                FAQ section of llms.txt
 *
 * Google requires FAQPage answer text to match the answer visible on the page. Both consumers
 * read these exact strings, so they cannot drift. Edit the copy here and nowhere else.
 */
import { products } from './products.js'
import {
  FIRST_LINK_DAYS, FOUNDING_OFFER, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL, PRICE_SITE_LABEL,
  SAAS_WEEKS, SITE_WEEKS, weeksText,
} from './site.js'

const productClause = products.map(p => p.faq).join('; ')

export const faqs = [
  {
    id: 'what',
    q: 'What exactly do you build?',
    a: 'Marketing websites, SaaS products and MVPs, internal tools, and the AI automation behind them. Full-stack, from design through to deployment. If it runs in a browser and has to hold up under real use, it’s in scope.',
  },
  {
    id: 'speed',
    q: 'How fast is "fast"?',
    a: `A marketing site is usually ${weeksText(SITE_WEEKS)} weeks. An MVP is usually ${weeksText(SAAS_WEEKS)}, depending on what goes in it. You get a date in the written scope before you commit, and a working link within the first ${FIRST_LINK_DAYS} days. Building with AI is what makes those numbers realistic.`,
  },
  {
    id: 'ai-quality',
    q: 'Does building with AI mean lower quality?',
    a: 'AI speeds up the typing: scaffolding, boilerplate, tests, first drafts. It doesn’t make the architectural decisions and it doesn’t review its own output. That part is my job, and it’s what nine years of enterprise delivery trained me for. This site was built that way, so run Lighthouse on it.',
  },
  {
    id: 'client-work',
    q: 'Can I see client work?',
    a: `Not for this offer yet. Nine years of my work sits inside enterprise programmes under NDA, and the independent client side is new. What you can look at instead is the products I build and run myself: ${productClause}; plus this site, with its source published.`,
  },
  {
    id: 'cost',
    q: 'What does it cost?',
    a: `Marketing sites start at ${PRICE_SITE_LABEL}, SaaS and MVP builds at ${PRICE_SAAS_LABEL}. The exact figure is fixed per project in the free scope call, based on what the project needs rather than hours logged, and it covers the build, the infrastructure setup, the hand-off and ${LAUNCH_COVER_DAYS} days of post-launch fixes. No hourly meter, no retainers you can’t exit, and no invoices you didn’t see coming.`,
  },
  {
    id: 'founding',
    q: 'Is there a founding-client rate?',
    a: `Yes, ${FOUNDING_OFFER}`,
  },
  {
    id: 'slip',
    q: 'What happens if the launch date slips?',
    a: 'It doesn’t come out of your side. The date is in your written scope. If I miss it, I keep building until it ships, and the overrun is on me. Scope changes you ask for mid-build move the date and the price, and we agree both in writing before I continue.',
  },
  {
    id: 'after',
    q: `What happens after the ${LAUNCH_COVER_DAYS} days?`,
    a: 'Three options, none assumed. Take it to any developer, which is what the documentation and walkthrough are for. Book me for a scoped follow-on at a fixed price. Or a monthly care plan for hosting, updates and small changes, quoted separately. Nothing renews on its own.',
  },
  {
    id: 'ownership',
    q: 'Who owns the code?',
    a: `You do, outright and from day one. Your repo, your infrastructure, your accounts, with hosting, domain, database, auth and payments configured on accounts you control. The hand-off includes documentation and a recorded walkthrough so you can take the project to another developer whenever you want, and ${LAUNCH_COVER_DAYS} days of post-launch fixes so the first month isn’t yours to debug.`,
  },
  {
    id: 'existing-code',
    q: 'Do you work with existing codebases and teams?',
    a: 'Yes. Audits, refactors and rescues are a service on their own. Five years as a Scrum Master across distributed enterprise teams means joining someone else’s process and tooling is familiar ground.',
  },
  {
    id: 'location',
    q: 'Where are you based, and does it matter?',
    a: 'Tétouan, Morocco, on GMT+1. I’ve worked remotely with Canadian and German teams for the last five years. The overlap with European hours is full, and with US Eastern it covers most of the working day.',
  },
]

/** One entry by id. The service pages pick their FAQ subset this way; an unknown id fails the build. */
export function faqById(id) {
  const f = faqs.find(f => f.id === id)
  if (!f) throw new Error(`faqs: no entry with id "${id}"`)
  return f
}
