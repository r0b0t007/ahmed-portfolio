/**
 * The French Proof items: the same things to check as src/content/proof.js. The build log stays in
 * English, and its link says so.
 */
import { products } from './products.js'
import { REPO_URL } from '../site.js'
import { workPath } from '../routes.js'
import { typo } from './typo.js'

const LINKEDIN = 'https://linkedin.com/in/ahmedchioua'

export const productProof = products.map(p => ({ title: p.name, body: p.card, link: { label: p.label, href: p.url } }))

export const siteProof = typo([
  {
    title: 'Ce site',
    body: 'Conçu, développé et déployé par moi, en React avec du CSS écrit à la main. Pas de template, pas de constructeur de pages. Il obtient 100 / 100 / 100 sur Lighthouse en accessibilité, bonnes pratiques et SEO. Lancez-le vous-même pour vérifier.',
    link: { label: 'Lire le journal de construction (en anglais)', href: workPath('this-site') },
  },
  {
    title: 'Le code source',
    body: 'Tout le dépôt est public : le code, les données structurées, la configuration de build et chaque commit depuis le premier. Il montre ma façon de travailler mieux que tout ce que je pourrais écrire ici.',
    link: { label: 'github.com/r0b0t007', href: REPO_URL },
  },
])

const trackRecord = typo({
  title: 'Le parcours',
  body: 'Neuf ans de logiciels en production pour Bell, BMW et Bayer, livrés via NTT DATA et une mission de conseil. Tout est sur LinkedIn, avec les certifications.',
  link: { label: 'linkedin.com/in/ahmedchioua', href: LINKEDIN },
})

export const proofItems = [...productProof, ...siteProof, trackRecord]
