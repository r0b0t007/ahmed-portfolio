/**
 * Interface strings in French: the same shape as src/content/ui.js (a test compares them).
 * Copy is Claude's translation of the English, awaiting Ahmed's approval.
 */
import { FIRST_LINK_DAYS, FOUNDING_SLOTS, LAUNCH_COVER_DAYS, WHATSAPP_URL_FR } from '../site.js'
import { typo } from './typo.js'

const CTA_LONG = `Réserver un créneau prototype de ${FIRST_LINK_DAYS} jours`
const PROMISE = `Votre montant est fixé une seule fois, pendant l’appel de cadrage gratuit, par écrit, avec une date, et il ne bouge plus ensuite. Il couvre le développement, l’infrastructure, la passation et ${LAUNCH_COVER_DAYS} jours de garantie après le lancement. Pas de compteur horaire.`

export const ui = typo({
  lang: 'fr',
  home: '/fr',
  // The French homepage's sections. About is English-only, so it isn't here.
  nav: [
    { name: 'Services', href: '/fr#services' },
    { name: 'Méthode', href: '/fr#process' },
    { name: 'Preuves', href: '/fr#proof' },
    { name: 'Tarifs', href: '/fr#pricing' },
    { name: 'FAQ', href: '/fr#faq' },
    { name: 'Réserver un créneau', href: '#contact', accent: true },
  ],
  menu: 'Menu',
  switchTo: { label: 'EN', name: 'EN, English version', lang: 'en' },
  crumbHome: 'Accueil',
  crumbLabel: 'Fil d’Ariane',
  cta: { long: CTA_LONG, short: `Réserver un créneau de ${FIRST_LINK_DAYS} jours` },
  whatsappUrl: WHATSAPP_URL_FR,
  offer: {
    promise: PROMISE,
    movers: 'Ce qui fait varier le montant : la part de neuf par rapport à l’existant adapté, et la présence ou non d’authentification, de paiements ou d’intégrations tierces.',
    founding: `pour les ${FOUNDING_SLOTS} prochains projets, et ce n’est pas une remise. Vous échangez une étude de cas écrite et une recommandation contre le tarif fondateur. Même périmètre, même date, même passation. Dites « fondateur » pendant l’appel de cadrage.`,
  },
  service: {
    facts: {
      price: 'Prix de départ, fixé par écrit pour chaque projet',
      weeks: 'Semaines en général, du lancement du projet à la mise en ligne',
      firstLink: 'Jours jusqu’à votre premier lien fonctionnel',
      cover: 'Jours de corrections après le lancement, inclus',
    },
    seePrice: 'Voir le prix →',
    included: { eyebrow: 'Ce que vous obtenez', title: 'Tout ce qu’il faut', em: 'pour être en ligne.' },
    weeks: {
      eyebrow: 'Déroulé des semaines',
      title: weeks => `En ligne en ${weeks} semaines en général.`,
      em: `Un lien au jour ${FIRST_LINK_DAYS}.`,
      lead: 'Les mêmes quatre étapes que pour chaque projet, et vous le voyez avancer dès la première.',
    },
    price: {
      eyebrow: 'Prix',
      title: price => `À partir de ${price}.`,
      em: 'Chiffré une fois.',
      lead: price => `${price} est le point de départ. ${PROMISE}`,
      founding: 'Tarif client fondateur :',
      cta: 'Fixer un prix et une date',
    },
    proof: { eyebrow: 'Preuves' },
    faq: { eyebrow: 'Questions', title: 'Des réponses', em: 'directes' },
  },
  contact: {
    eyebrow: 'Prochaine étape',
    title: 'Réservez votre',
    em: `créneau prototype de ${FIRST_LINK_DAYS} jours`,
    lead: 'Je mène peu de projets à la fois ; c’est ce qui rend les démos hebdomadaires possibles. L’appel de cadrage est gratuit, dure 30 minutes et se termine par une réponse écrite : ce qui sera construit, ce que ça coûte et la date de mise en ligne. Si je ne suis pas la bonne personne, je vous le dirai pendant l’appel.',
    whatsapp: 'Écrivez-moi sur WhatsApp',
    details: { email: 'E-mail', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', location: 'Localisation', place: 'Tétouan, Maroc · À distance' },
    terms: 'Pas d’abonnement. Pas d’acompte pour discuter. Un cadrage écrit sous une semaine, ou un « ce n’est pas pour moi » franc.',
    notReady: 'Pas encore prêt à en parler ?',
    readCode: 'Lisez d’abord le code →',
    fields: {
      name: { label: 'Nom', placeholder: 'Votre nom' },
      email: { label: 'E-mail', placeholder: 'vous@exemple.com' },
      subject: { label: 'Objet', placeholder: 'De quoi s’agit-il ?' },
      message: { label: 'Message', placeholder: 'Dites-m’en plus…' },
    },
    submit: { idle: 'Envoyer le message', sending: 'Envoi…', success: '✓ Message envoyé', error: '✗ Échec, réessayer' },
    // Tells Ahmed's inbox which page the message came from.
    subjectPrefix: 'Portfolio contact (FR): ',
    invalid: { required: 'Veuillez remplir ce champ.', email: 'Veuillez saisir une adresse e-mail valide.' },
  },
  footer: {
    tag: `Prix fixe. Date par écrit. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours.`,
    rights: '© 2026 Ahmed Chioua. Tous droits réservés.',
  },
})
