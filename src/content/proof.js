/**
 * The verifiable things the site points to instead of client logos. The homepage Proof section
 * shows all of them; each service page shows the group that fits it (products for SaaS, this
 * site and its source for websites).
 */
import { products } from './products.js'
import { REPO_URL } from './site.js'
import { workPath } from './routes.js'
const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

export const productProof = products.map(p => ({ title: p.name, body: p.card, link: { label: p.label, href: p.url } }))

export const siteProof = [
  {
    title: 'This site',
    body: 'Designed, built and deployed by me, in React with hand-written CSS. No template, no page builder. It scores 100 / 100 / 100 on Lighthouse for accessibility, best practices and SEO. Run it yourself if you want to check.',
    link: { label: 'Read the build log', href: workPath('this-site') },
  },
  {
    title: 'The source',
    body: 'The whole repository is public: the code, the structured data, the build config and every commit since the first one. It answers the question of how I work better than anything I could write here.',
    link: { label: 'github.com/r0b0t007', href: REPO_URL },
  },
]

const trackRecord = {
  title: 'The track record',
  body: 'Nine years of production software for Bell, BMW and Bayer, delivered through NTT DATA and a consulting engagement. It’s all on LinkedIn, with the certifications alongside it.',
  link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
}

export const proofItems = [...productProof, ...siteProof, trackRecord]
