/**
 * The French FAQ: the entries the French pages show (the homepage's six, plus "ai-quality" and
 * "after" for the service pages), by the English ids (src/content/faqs.js). Visible text and the
 * French homepage's FAQPage JSON-LD (src/content/routes.js) both read these strings.
 */
import {
  FIRST_LINK_DAYS, LAUNCH_COVER_DAYS, PRICE_SAAS_LABEL_FR, PRICE_SITE_LABEL_FR, SAAS_WEEKS,
  SITE_WEEKS, weeksTextFr,
} from '../site.js'
import { typo } from './typo.js'

export const faqs = typo([
  {
    id: 'what',
    q: 'Que construisez-vous exactement ?',
    a: 'Des sites web vitrines, des produits SaaS et des MVP, des outils internes, et l’automatisation IA qui les accompagne. Du full-stack, de la conception au déploiement. Si ça tourne dans un navigateur et que ça doit tenir en conditions réelles, c’est dans mon périmètre.',
  },
  {
    id: 'speed',
    q: 'Rapide, c’est-à-dire ?',
    a: `Un site vitrine prend en général ${weeksTextFr(SITE_WEEKS)} semaines. Un MVP, en général ${weeksTextFr(SAAS_WEEKS)}, selon ce qu’il contient. Vous avez une date dans le cadrage écrit avant de vous engager, et un lien fonctionnel dans les ${FIRST_LINK_DAYS} premiers jours. C’est le développement assisté par IA qui rend ces délais réalistes.`,
  },
  {
    id: 'ai-quality',
    q: 'Développer avec l’IA, est-ce que ça veut dire moins de qualité ?',
    a: 'L’IA accélère l’écriture : la structure de départ, le code répétitif, les tests, les premiers jets. Elle ne prend pas les décisions d’architecture et ne relit pas son propre travail. Ça, c’est mon travail, et c’est ce à quoi neuf ans de projets en grande entreprise m’ont formé. Ce site a été construit ainsi : lancez Lighthouse dessus.',
  },
  {
    id: 'cost',
    q: 'Combien ça coûte ?',
    a: `Les sites vitrines démarrent à ${PRICE_SITE_LABEL_FR}, les SaaS et MVP à ${PRICE_SAAS_LABEL_FR}. Le montant exact est fixé pour chaque projet pendant l’appel de cadrage gratuit, selon ce dont le projet a besoin et non selon les heures passées. Il couvre le développement, la mise en place de l’infrastructure, la passation et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement. Pas de compteur horaire, pas d’abonnement dont on ne peut pas sortir, pas de facture surprise.`,
  },
  {
    id: 'slip',
    q: 'Et si la date de lancement glisse ?',
    a: 'Ce n’est pas à vous de le payer. La date figure dans votre cadrage écrit. Si je la manque, je continue jusqu’à la livraison, et le dépassement est à ma charge. Les changements de périmètre que vous demandez en cours de route déplacent la date et le prix, et on se met d’accord sur les deux par écrit avant que je continue.',
  },
  {
    id: 'after',
    q: `Que se passe-t-il après les ${LAUNCH_COVER_DAYS} jours ?`,
    a: 'Trois options, aucune imposée. Confier le projet à n’importe quel développeur : c’est à ça que servent la documentation et la présentation vidéo. Me confier une suite cadrée, à prix fixe. Ou un forfait mensuel de maintenance pour l’hébergement, les mises à jour et les petites modifications, chiffré à part. Rien ne se renouvelle tout seul.',
  },
  {
    id: 'ownership',
    q: 'À qui appartient le code ?',
    a: `À vous, entièrement et dès le premier jour. Votre dépôt, votre infrastructure, vos comptes : hébergement, domaine, base de données, authentification et paiements configurés sur des comptes que vous contrôlez. La passation comprend la documentation et une présentation vidéo, pour que vous puissiez confier le projet à un autre développeur quand vous le voulez, et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement, pour que le premier mois ne soit pas à vous de déboguer.`,
  },
  {
    id: 'location',
    q: 'Où êtes-vous basé, et est-ce important ?',
    a: 'À Tétouan, au Maroc, en GMT+1. Je travaille à distance avec des équipes canadiennes et allemandes depuis cinq ans. Le chevauchement avec les horaires européens est total, et avec la côte Est des États-Unis il couvre la majeure partie de la journée.',
  },
])
