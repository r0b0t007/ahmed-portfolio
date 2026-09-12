/**
 * Single source of truth for the FAQ.
 *
 * Consumed by:
 *   - src/components/Faq.jsx   — renders the visible section
 *   - vite.config.js           — generates the FAQPage JSON-LD injected into index.html and the
 *                                FAQ section of llms.txt
 *
 * Google requires FAQPage answer text to match the answer visible on the page. Both consumers
 * read these exact strings, so they cannot drift. Edit the copy here and nowhere else.
 */
import { products } from './products.js'

const productClause = products.map(p => p.faq).join('; ')

export const faqs = [
  {
    q: 'What exactly do you build?',
    a: 'Marketing websites, SaaS products and MVPs, internal tools, and the AI automation behind them. Full-stack, from design through to deployment. If it runs in a browser and has to hold up under real use, it’s in scope.',
  },
  {
    q: 'How fast is "fast"?',
    a: 'A marketing site is usually 2 to 3 weeks. An MVP is usually 4 to 6, depending on what goes in it. You get a date in the written scope before you commit, and a working link within the first 10 days. Building with AI is what makes those numbers realistic.',
  },
  {
    q: 'Does building with AI mean lower quality?',
    a: 'AI speeds up the typing: scaffolding, boilerplate, tests, first drafts. It doesn’t make the architectural decisions and it doesn’t review its own output. That part is my job, and it’s what nine years of enterprise delivery trained me for. This site was built that way, so run Lighthouse on it.',
  },
  {
    q: 'Can I see client work?',
    a: `Not for this offer yet. Nine years of my work sits inside enterprise programmes under NDA, and the independent client side is new. What you can look at instead is the products I build and run myself: ${productClause}; plus this site, with its source published.`,
  },
  {
    q: 'What does it cost?',
    a: 'Fixed price per project, quoted in the free scope call and based on what the project needs rather than hours logged. The price covers the build, the infrastructure setup, the hand-off and 30 days of post-launch fixes. No hourly meter, no retainers you can’t exit, and no invoices you didn’t see coming.',
  },
  {
    q: 'Is there a founding-client rate?',
    a: 'Yes, for the next three projects, and it isn’t a discount. You trade a written case study and a reference for the founding price. Same scope, same date, same hand-off. Say “founding” in the scope call.',
  },
  {
    q: 'What happens if the launch date slips?',
    a: 'It doesn’t come out of your side. The date is in your written scope. If I miss it, I keep building until it ships, and the overrun is on me. Scope changes you ask for mid-build move the date, and we agree the new one in writing before I continue.',
  },
  {
    q: 'What happens after the 30 days?',
    a: 'Three options, none assumed. Take it to any developer, which is what the documentation and walkthrough are for. Book me for a scoped follow-on at a fixed price. Or a monthly care plan for hosting, updates and small changes, quoted separately. Nothing renews on its own.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do, outright and from day one. Your repo, your infrastructure, your accounts, with hosting, domain, database, auth and payments configured on accounts you control. The hand-off includes documentation and a recorded walkthrough so you can take the project to another developer whenever you want, and 30 days of post-launch fixes so the first month isn’t yours to debug.',
  },
  {
    q: 'Do you work with existing codebases and teams?',
    a: 'Yes. Audits, refactors and rescues are a service on their own. Five years as a Scrum Master across distributed enterprise teams means joining someone else’s process and tooling is familiar ground.',
  },
  {
    q: 'Where are you based, and does it matter?',
    a: 'Tétouan, Morocco, on GMT+1. I’ve worked remotely with Canadian and German teams for the last five years. The overlap with European hours is full, and with US Eastern it covers most of the working day.',
  },
]
