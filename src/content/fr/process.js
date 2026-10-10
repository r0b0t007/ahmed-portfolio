/** The four steps in French (src/content/process.js). Same order, same facts. */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from '../site.js'
import { typo } from './typo.js'

export const steps = typo([
  {
    title: 'Cadrage',
    meta: 'Gratuit · 1 semaine',
    desc: 'Un appel de 30 minutes, puis un cadrage écrit : ce qui est construit, ce qui ne l’est pas, ce que ça coûte et la date de mise en ligne. Si je ne suis pas la bonne personne, je vous le dirai à ce moment-là. C’est pour ça que c’est gratuit.',
  },
  {
    title: 'Développement',
    meta: `Jour ${FIRST_LINK_DAYS} : un lien · puis chaque semaine`,
    desc: `Au jour ${FIRST_LINK_DAYS}, vous recevez une URL. C’est brut, mais c’est réel. Vous testez le parcours principal, vous réagissez, et on ajuste tant que les changements coûtent peu. Chaque semaine ensuite : une démo, un lien mis à jour, une ligne directe avec moi. L’IA dans la boucle explique pourquoi le délai se compte en semaines et non en mois. La revue d’architecture hebdomadaire explique pourquoi ça tient.`,
  },
  {
    title: 'Mise en ligne',
    meta: 'À la date de votre cadrage',
    desc: 'En ligne sur votre infrastructure, votre domaine, vos comptes. Performance, accessibilité et SEO vérifiés avant la mise en ligne, et vous voyez les chiffres. Si je manque la date de votre cadrage, je continue jusqu’à la livraison, et le dépassement est à ma charge.',
  },
  {
    title: 'Passation',
    meta: `Incluse · ${LAUNCH_COVER_DAYS} jours de couverture`,
    desc: `Le dépôt, le pipeline, la documentation, une présentation vidéo, et ${LAUNCH_COVER_DAYS} jours de corrections après le lancement. N’importe quel développeur peut reprendre après moi. Si vous préférez que je continue, on le cadre séparément.`,
  },
])
