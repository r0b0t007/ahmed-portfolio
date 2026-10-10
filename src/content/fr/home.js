/**
 * The French homepage (src/pages/HomeFr.jsx): its head, hero and section copy. Shorter than the
 * English homepage: no Experience, About or hand-off sections. The section order is declared in
 * src/lib/sections.js (HOME_FR_SECTION_ORDER).
 */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR } from '../site.js'
import { productsPhrase } from './products.js'
import { typo } from './typo.js'

export const home = typo({
  meta: {
    // How the page is listed on the (English) 404 page.
    name: 'Version française',
    title: 'Développeur web et SaaS au Maroc, prix fixe | Ahmed Chioua',
    description: `Sites web et SaaS en quelques semaines, à prix fixe : un premier lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix et une date de lancement par écrit. Basé à Tétouan.`,
  },
  hero: {
    kicker: 'Pour les fondateurs qui veulent un produit lancé, pas « en cours »',
    h1: ['Votre site ou SaaS,', 'en ligne en quelques semaines.', 'Prix fixe.'],
    em: 'Date par écrit.',
    lead: `Un lien fonctionnel en ${FIRST_LINK_DAYS} jours. Une date de lancement sur laquelle vous pouvez compter. Un prix qui ne bouge pas. Développé par un ingénieur qui a passé neuf ans à livrer des logiciels en production pour Bell, BMW et Bayer.`,
    whatsapp: 'Écrivez-moi sur WhatsApp',
    facts: [
      { n: PRICE_SITE_LABEL_FR, l: 'Prix de départ d’un site vitrine, fixé par écrit' },
      { n: String(FIRST_LINK_DAYS), l: 'Jours jusqu’à votre premier lien fonctionnel' },
      { n: String(LAUNCH_COVER_DAYS), l: 'Jours de corrections après le lancement, inclus' },
      { n: '9+', l: 'Années de logiciels en production pour Bell, BMW et Bayer' },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Ce que je',
    em: 'construis',
    lead: 'Deux choses, faites de bout en bout. Cadrées dès le départ, livrées à une date convenue, et remises de façon à ce que vous puissiez les maintenir sans moi.',
    more: name => `${name} en détail`,
  },
  process: {
    eyebrow: 'Méthode',
    title: `Un lien fonctionnel en ${FIRST_LINK_DAYS} jours.`,
    em: 'Puis chaque semaine.',
    lead: 'Les agences disparaissent six semaines et reviennent avec une surprise. Vous ne pouvez pas dire « ce n’est pas ce que je voulais » avant que ce soit coûteux à corriger. Ici, chaque projet suit les mêmes quatre étapes, et vous le voyez avancer dès la première.',
  },
  proof: {
    eyebrow: 'Preuves',
    title: 'Ne me croyez pas sur parole.',
    em: 'Prenez deux minutes.',
    lead: `Je ne vous montrerai pas de logos clients que je n’ai pas mérités. Je vous montre ce que vous pouvez vérifier : ${productsPhrase}, ce site, son code source, et le parcours derrière.`,
  },
  pricing: {
    eyebrow: 'Tarifs',
    title: 'Fixe. Haut de gamme.',
    em: 'Chiffré une fois.',
    lead: 'Les montants ci-dessous sont des points de départ.',
    // No-break spaces: the column is narrow on phones, and the header must not wrap.
    head: { scope: 'Prestation', from: 'À\u00a0partir\u00a0de' },
    rows: [
      { scope: 'Site vitrine ou landing page', from: PRICE_SITE_LABEL_FR },
      { scope: 'Produit SaaS ou MVP', from: PRICE_SAAS_LABEL_FR },
    ],
    cta: 'Fixer un prix et une date',
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Des réponses',
    em: 'directes',
    ids: ['what', 'speed', 'cost', 'ownership', 'slip', 'location'],
  },
})
