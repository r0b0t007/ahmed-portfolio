/**
 * The product cards in French. Every fact is the English card's (src/content/products.js, which
 * records what each product is and its status today); only the language differs. Keyed by product
 * name, and a product without a French card fails the build.
 */
import { products as en } from '../products.js'
import { typo } from './typo.js'

const CARDS = typo({
  PawPawCare: 'Une application de suivi de santé pour animaux que j’ai fondée et développée de bout en bout : rappels de vaccins et de traitements, courbes de poids, dossiers vétérinaires, et une IA qui lit les photos de carnets de vaccination. En accès anticipé : les inscrits de la liste d’attente sont intégrés avant le lancement sur les stores. C’est ce qui se rapproche le plus d’une étude de cas.',
  'FitPal Coach': 'Un logiciel pour les coachs sportifs indépendants qui suivent de 5 à 40 clients. Le coach dispose d’un tableau de bord qui montre l’assiduité par rapport au programme ; chaque client reçoit une application d’entraînement au nom du coach, qui s’installe depuis le navigateur, fonctionne hors ligne et se connecte avec une clé d’accès. Je l’ai construit et je l’exploite sur un socle open source (openGym). Vendu à la suite d’un appel sur fitpal.ma.',
})

export const products = en.map(p => {
  const card = CARDS[p.name]
  if (!card) throw new Error(`fr/products: no French card for "${p.name}"`)
  return { ...p, card }
})

const NUMBER_WORDS = ['aucun', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf']
const plural = products.length === 1 ? '' : 's'

/** "deux produits que j’ai construits et que j’exploite": the French productsPhrase. */
export const productsPhrase =
  `${NUMBER_WORDS[products.length] ?? products.length} produit${plural} que j’ai construit${plural} et que j’exploite`
