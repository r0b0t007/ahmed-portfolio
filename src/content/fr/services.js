/**
 * The service pages in French: the same services as src/content/services.js, paired by `id`, with
 * French slugs. Every number comes from site.js. Also read by src/content/routes.js (titles,
 * descriptions, structured data). Keep it JSX-free.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_FROM, PRICE_SAAS_LABEL_FR, PRICE_SITE_FROM,
  PRICE_SITE_LABEL_FR, SAAS_WEEKS, SITE_WEEKS, weeksRange, weeksTextFr,
} from '../site.js'
import { productsPhrase } from './products.js'
import { typo } from './typo.js'

const handOff = {
  title: 'Passation',
  lines: [`Le dépôt à votre nom, la documentation, une présentation vidéo et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement.`],
}

export const services = typo([
  {
    id: 'website',
    slug: 'creation-site-web',
    name: 'Création de site web',
    card: {
      title: 'Des sites qui se positionnent et qui convertissent',
      tagline: 'Conçus pour charger vite et être trouvés.',
      desc: 'Sites vitrines, landing pages et portfolios, conçus et développés sur mesure. Données structurées, sémantique propre, balises meta soignées et sitemap sont intégrés pendant le développement, et je mesure les Core Web Vitals avant le lancement au lieu de les laisser pour plus tard.',
      tags: ['Conception et développement', 'Bases SEO', 'Core Web Vitals', 'Analytics'],
    },
    summary: `sites vitrines et landing pages à partir de ${PRICE_SITE_LABEL_FR}, en ligne en ${weeksTextFr(SITE_WEEKS)} semaines en général`,
    title: 'Création de site web à prix fixe | Ahmed Chioua',
    description: `Sites vitrines et landing pages à partir de ${PRICE_SITE_LABEL_FR}, en ligne en ${weeksTextFr(SITE_WEEKS)} semaines en général. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix fixe et une date par écrit.`,
    serviceType: 'Conception et développement de sites web',
    priceFrom: PRICE_SITE_FROM,
    priceLabel: PRICE_SITE_LABEL_FR,
    weeks: weeksRange(SITE_WEEKS),
    h1: 'Création de site web,',
    h1Em: 'prix fixe, date par écrit.',
    lead: `Sites vitrines, landing pages et portfolios, conçus et développés sur mesure. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, le site en ligne sur votre propre domaine ${weeksTextFr(SITE_WEEKS)} semaines après le lancement du projet en général, et un prix fixé par écrit avant que quoi que ce soit ne commence.`,
    framing: 'Un site web se justifie de deux façons : les moteurs de recherche le trouvent, et les visiteurs qui y arrivent peuvent faire ce pour quoi il a été conçu. Les deux se règlent pendant le développement : données structurées, sémantique propre et Core Web Vitals font partie du projet, pas d’un nettoyage après le lancement.',
    included: [
      { title: 'Conçu et développé sur mesure', lines: ['Un site vitrine, une landing page ou un portfolio, conçu autour de votre offre. Pas de template, pas de constructeur de pages.'] },
      { title: 'Des bases SEO solides', lines: ['Données structurées, sémantique propre, balises meta soignées et sitemap, intégrés pendant le développement.'] },
      { title: 'Core Web Vitals, mesurés', lines: ['Performance, accessibilité et SEO vérifiés avant le lancement, et vous voyez les chiffres.'] },
      { title: 'Analytics avant le lancement', lines: ['Installés avant la mise en ligne, pas après, pour que les premiers visiteurs soient comptés.'] },
      { title: 'Votre domaine, vos comptes', lines: ['Hébergement, domaine et pipeline de déploiement configurés sur des comptes que vous contrôlez. Vous poussez le code, il est en ligne.'] },
      handOff,
    ],
    proof: 'site',
    proofTitle: 'Ne me croyez pas sur parole.',
    proofTitleEm: 'Vérifiez cette page.',
    proofLead: 'La page que vous lisez a été construite comme le serait votre site. Lancez Lighthouse dessus, ou lisez le code source.',
    faqIds: ['speed', 'cost', 'ai-quality', 'ownership', 'after'],
  },
  {
    id: 'saas',
    slug: 'developpement-saas',
    name: 'Développement SaaS et MVP',
    card: {
      title: 'SaaS et MVP',
      tagline: 'D’une idée à un produit auquel on peut se connecter.',
      desc: 'On s’accorde sur la plus petite version qui prouve l’idée, puis je la construis : authentification, modèle de données, parcours principaux, paiements si vous en avez besoin. Elle est déployée sur une infrastructure capable d’encaisser la croissance, pour que vous n’ayez pas à refaire les fondations le mois où ça commence à marcher.',
      tags: ['Cadrage du MVP', 'Développement full-stack', 'Authentification et paiements', 'Pipeline de déploiement'],
    },
    summary: `produits SaaS et MVP à partir de ${PRICE_SAAS_LABEL_FR}, en ligne en ${weeksTextFr(SAAS_WEEKS)} semaines en général`,
    title: 'Développement SaaS et MVP à prix fixe | Ahmed Chioua',
    description: `Produits SaaS et MVP à partir de ${PRICE_SAAS_LABEL_FR}, en ligne en ${weeksTextFr(SAAS_WEEKS)} semaines en général. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, un prix fixe et une date par écrit.`,
    serviceType: 'Développement SaaS et MVP',
    priceFrom: PRICE_SAAS_FROM,
    priceLabel: PRICE_SAAS_LABEL_FR,
    weeks: weeksRange(SAAS_WEEKS),
    h1: 'Développement SaaS et MVP,',
    h1Em: 'prix fixe, date par écrit.',
    lead: `D’une idée à un produit auquel on peut se connecter. Un lien fonctionnel en ${FIRST_LINK_DAYS} jours, une démo chaque semaine ensuite, et le produit en ligne sur votre propre infrastructure ${weeksTextFr(SAAS_WEEKS)} semaines après le lancement du projet en général, à un prix fixé par écrit avant que quoi que ce soit ne commence.`,
    framing: 'Une première version n’a qu’un objectif : prouver que des gens en veulent. Le périmètre part donc de la plus petite version capable de le prouver, et tout le reste attend. Les fondations, elles, n’attendent pas. L’authentification, le modèle de données et le pipeline de déploiement sont conçus pour encaisser la croissance, pour que le mois où ça marche ne soit pas celui où vous les reconstruisez.',
    included: [
      { title: 'Un périmètre qui tient sur une page', lines: ['La plus petite version qui prouve l’idée : ce qui est inclus, ce qui ne l’est pas, le prix et la date de lancement, par écrit.'] },
      { title: 'Authentification et modèle de données', lines: ['Connexion, comptes et un modèle de données conçu pour tenir quand les vrais utilisateurs arrivent.'] },
      { title: 'Les parcours principaux', lines: ['Les écrans et les actions pour lesquels le produit existe, développés de bout en bout et présentés en démo chaque semaine.'] },
      { title: 'Les paiements, si besoin', lines: ['Configurés sur votre propre compte de paiement, pour que les revenus soient à vous dès le premier encaissement.'] },
      { title: 'Une infrastructure sur vos comptes', lines: ['Hébergement, base de données et authentification sur des comptes que vous contrôlez (Vercel, AWS, Supabase, Cloudflare), avec un pipeline de déploiement : vous poussez le code, il est en ligne.'] },
      handOff,
    ],
    proof: 'products',
    proofTitle: 'Les produits que je construis',
    proofTitleEm: 'et que j’exploite.',
    proofLead: `Je ne vous montrerai pas de logos clients que je n’ai pas mérités. Voici ${productsPhrase}.`,
    faqIds: ['speed', 'cost', 'slip', 'ownership', 'after'],
  },
])
