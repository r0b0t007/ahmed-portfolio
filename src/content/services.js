/**
 * Copy and facts for the service pages (src/pages/ServicePage.jsx). Every number comes from
 * site.js. The prose marked NEW below was drafted for these pages and is awaiting Ahmed's review;
 * everything else restates copy already published on the homepage.
 *
 * Also read by src/content/routes.js (titles, descriptions, structured data) and, through it,
 * by vite.config.js (llms.txt) and scripts/prerender.js. Keep it JSX-free.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_FROM, PRICE_SAAS_LABEL, PRICE_SITE_FROM,
  PRICE_SITE_LABEL,
} from './site.js'

const handOff = {
  title: 'Hand-off',
  lines: [`The repo in your name, documentation, a recorded walkthrough, and ${LAUNCH_COVER_DAYS} days of post-launch fixes.`],
}

export const services = [
  {
    slug: 'website-development',
    name: 'Website development',
    summary: `marketing sites and landing pages from ${PRICE_SITE_LABEL}, usually live in 2 to 3 weeks`,
    title: 'Website Development, Fixed Price | Ahmed Chioua',
    description: `Marketing sites and landing pages from ${PRICE_SITE_LABEL}, usually live in 2 to 3 weeks. A working link in ${FIRST_LINK_DAYS} days, a fixed price and a date in writing.`,
    serviceType: 'Website Design & Development',
    priceFrom: PRICE_SITE_FROM,
    priceLabel: PRICE_SITE_LABEL,
    weeks: '2–3',
    // NEW
    h1: 'Website development,',
    h1Em: 'fixed price, date in writing.',
    // NEW
    lead: `Marketing sites, landing pages and portfolios, designed and built from scratch. A working link in ${FIRST_LINK_DAYS} days, the site live on your own domain usually 2 to 3 weeks after kickoff, and a price fixed in writing before any of it starts.`,
    // NEW
    framing: 'A website earns its place two ways: search engines can find it, and the people who land on it can do what it was built for. Both are settled while it’s being built, so structured data, clean semantics and Core Web Vitals are part of the build, not a cleanup pass after launch.',
    included: [
      { title: 'Designed and built from scratch', lines: ['A marketing site, landing page or portfolio, designed around your offer. No template, no page builder.'] },
      { title: 'An SEO foundation', lines: ['Structured data, clean semantics, proper meta tags and a sitemap, all in during the build.'] },
      { title: 'Core Web Vitals, measured', lines: ['Performance, accessibility and SEO verified before launch, and you see the numbers.'] },
      { title: 'Analytics before launch', lines: ['Wired in before the site goes live, not after, so the first visitors are counted.'] },
      { title: 'Your domain, your accounts', lines: ['Hosting, domain and deploy pipeline set up on accounts you control. Push code, it ships.'] },
      handOff,
    ],
    proof: 'site',
    proofTitle: 'Don’t take my word for it.',
    proofTitleEm: 'Check this page.',
    // NEW
    proofLead: 'The page you’re reading was built the way your site would be. Run Lighthouse on it, or read the source.',
    faqIds: ['speed', 'cost', 'ai-quality', 'ownership', 'after'],
  },
  {
    slug: 'saas-mvp-development',
    name: 'SaaS & MVP development',
    summary: `SaaS products and MVPs from ${PRICE_SAAS_LABEL}, usually live in 4 to 6 weeks`,
    title: 'SaaS & MVP Development, Fixed Price | Ahmed Chioua',
    description: `SaaS products and MVPs from ${PRICE_SAAS_LABEL}, usually live in 4 to 6 weeks. A working link in ${FIRST_LINK_DAYS} days, a fixed price and a date in writing.`,
    serviceType: 'SaaS & MVP Development',
    priceFrom: PRICE_SAAS_FROM,
    priceLabel: PRICE_SAAS_LABEL,
    weeks: '4–6',
    // NEW
    h1: 'SaaS and MVP development,',
    h1Em: 'fixed price, date in writing.',
    // NEW
    lead: `From an idea to a product people can sign into. A working link in ${FIRST_LINK_DAYS} days, a demo every week after, and the product live on your own infrastructure usually 4 to 6 weeks after kickoff, at a price fixed in writing before any of it starts.`,
    // NEW
    framing: 'A first version has one job: prove that people want it. So the scope starts from the smallest version that can prove it, and everything else waits. The foundations don’t wait. Auth, the data model and the deploy pipeline are built to take growth, so the month it starts working isn’t the month you rebuild them.',
    included: [
      { title: 'A scope that fits on a page', lines: ['The smallest version that proves the idea: what’s in, what’s out, the price and the launch date, in writing.'] },
      { title: 'Auth and a data model', lines: ['Sign-in, accounts and a data model designed to hold up once real users arrive.'] },
      { title: 'The core flows', lines: ['The screens and actions the product exists for, built end to end and demoed every week.'] },
      { title: 'Payments, if you need them', lines: ['Set up on your own payment account, so the revenue is yours from the first charge.'] },
      { title: 'Infrastructure on your accounts', lines: ['Hosting, database and auth on accounts you control (Vercel, AWS, Supabase, Cloudflare), with a deploy pipeline: push code, it ships.'] },
      handOff,
    ],
    proof: 'products',
    proofTitle: 'Products I build',
    proofTitleEm: 'and run.',
    proofLead: 'I won’t show you client logos I haven’t earned. These are two products of mine that real people use right now.',
    faqIds: ['speed', 'cost', 'slip', 'ownership', 'founding'],
  },
]

export function findService(slug) {
  const s = services.find(s => s.slug === slug)
  if (!s) throw new Error(`services: no service with slug "${slug}"`)
  return s
}
