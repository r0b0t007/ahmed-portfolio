/**
 * The French homepage (src/pages/HomeFr.jsx): its head, hero and section copy. Shorter than the
 * English homepage: no Experience, About or hand-off sections.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, SAAS_WEEKS, SITE_WEEKS, weeksTextFr,
} from '../site.js'
import { productsPhrase } from './products.js'
import { typo } from './typo.js'

export const home = typo({
  meta: {
    // How the page is listed on the (English) 404 page.
    name: 'Version française',
    title: 'Développeur web et SaaS au Maroc, prix fixe | Ahmed Chioua',
    // The link-preview image (og-image.png) is shared with the English pages, and its headline is
    // in English, so the French description says so.
    imageAlt: 'Ahmed Chioua à côté du titre, en anglais : « Your site or SaaS, live in weeks. Fixed price. Date in writing. »',
    description: `Sites web et SaaS en quelques semaines, à prix fixe : un premier lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix et une date de lancement par écrit. Basé à Tétouan.`,
  },
  hero: {
    h1: ['Votre site ou SaaS,', 'en ligne en quelques semaines.', 'Prix fixe.'],
    em: 'Date par écrit.',
    lead: `Un lien fonctionnel en ${FIRST_LINK_DAYS} jours. Une date de lancement sur laquelle vous pouvez compter. Un prix qui ne bouge pas. Développé par un ingénieur qui a passé neuf ans à livrer des logiciels en production pour Bell, BMW et Bayer.`,
    whatsapp: 'Écrivez-moi sur WhatsApp',
    // Beside the portrait below 900px (HeroPortrait), as on the English homepage.
    byline: 'Développeur web et SaaS. Vous travaillez directement avec moi, du début à la fin.',
    // The schedule drawn under the hero (src/components/Schedule.jsx), as the English one.
    schedule: {
      caption: 'Calendrier habituel. Vos propres dates figurent dans le cadrage écrit.',
      stops: [
        { at: 'Jour 0', what: 'Lancement, après un appel de cadrage gratuit' },
        { at: `Jour ${FIRST_LINK_DAYS}`, what: 'Votre premier lien fonctionnel', key: true },
        { at: `Semaines ${weeksTextFr(SITE_WEEKS)}`, what: 'Mise en ligne, pour un site vitrine' },
        { at: `Semaines ${weeksTextFr(SAAS_WEEKS)}`, what: 'Ou mise en ligne, pour un MVP' },
        { at: `+${LAUNCH_COVER_DAYS} jours`, what: 'Après le lancement : corrections incluses' },
      ],
    },
  },
  services: {
    title: 'Ce que je',
    em: 'construis',
    lead: 'Deux choses, faites de bout en bout. Cadrées dès le départ, livrées à une date convenue, et remises de façon à ce que vous puissiez les maintenir sans moi.',
    more: 'Tous les détails',
  },
  process: {
    title: `Un lien fonctionnel en ${FIRST_LINK_DAYS} jours.`,
    em: 'Puis chaque semaine.',
    lead: 'Les agences disparaissent six semaines et reviennent avec une surprise. Vous ne pouvez pas dire « ce n’est pas ce que je voulais » avant que ce soit coûteux à corriger. Ici, chaque projet suit les mêmes quatre étapes, et vous le voyez avancer dès la première.',
  },
  proof: {
    title: 'Ne me croyez pas sur parole.',
    em: 'Prenez deux minutes.',
    lead: `Je ne vous montrerai pas de logos clients que je n’ai pas mérités. Je vous montre ce que vous pouvez vérifier : ${productsPhrase}, ce site, son code source, et le parcours derrière.`,
  },
  pricing: {
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
    title: 'Des réponses',
    em: 'directes',
    ids: ['what', 'speed', 'cost', 'ownership', 'slip', 'location'],
  },
})
