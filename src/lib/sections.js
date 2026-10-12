/**
 * The order each page type's sections render in, stated once. Every page is set as a scope
 * document: its numbered clauses ("§ 1") and lettered annexes ("Annex A") are derived from these
 * lists, so adding, removing or reordering a section is one edit here rather than a renumbering
 * across components. Sections not listed (the document header, the preamble, the signature block)
 * are unnumbered on purpose: a contract numbers its terms, not its cover page.
 *
 * Each order is { clauses, annexes }. The ids are the sections' DOM ids, which the navigation,
 * llms.txt and the 404 page link to, so they never change when the numbering does.
 */
const ORDERS = {
  home: { clauses: ['services', 'process', 'pricing', 'handoff', 'date', 'faq'], annexes: ['proof', 'experience', 'about'] },
  'home:fr': { clauses: ['services', 'process', 'pricing', 'faq'], annexes: ['proof'] },
  service: { clauses: ['included', 'weeks', 'price', 'faq'], annexes: ['proof'] },
  work: { clauses: ['decisions', 'failures', 'method', 'check'], annexes: [] },
}

const LETTERS = 'ABCDEFGHIJ'

/**
 * The number a section carries in its page type: "1" for the first clause, "A" for the first
 * annex. Throws for an id the order doesn't list, so a renamed section fails the build instead of
 * rendering "§ 0".
 */
export function numberOf(type, id) {
  const order = ORDERS[type]
  if (!order) throw new Error(`sections: no order for page type "${type}"`)
  const c = order.clauses.indexOf(id)
  if (c >= 0) return String(c + 1)
  const a = order.annexes.indexOf(id)
  if (a >= 0) return LETTERS[a]
  throw new Error(`sections: "${id}" is not in the ${type} order`)
}

/** Whether a section is an annex (lettered) rather than a clause (numbered). */
export const isAnnex = (type, id) => ORDERS[type]?.annexes.includes(id) ?? false
