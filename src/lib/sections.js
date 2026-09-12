import { ordinal } from './ordinal'

/**
 * The order the sections mount in App.jsx, stated once. Each section's "( 0N )" eyebrow index is
 * derived from it, so adding or removing a section is one edit here rather than a renumbering
 * across ten files, which this repo has now done three times.
 */
export const SECTION_ORDER = [
  'benefits', 'services', 'process', 'handoff', 'proof', 'pricing', 'experience', 'about', 'faq', 'contact',
]

export const sectionIndex = id => {
  const i = SECTION_ORDER.indexOf(id)
  if (i < 0) throw new Error(`sectionIndex: "${id}" is not in SECTION_ORDER`)
  return ordinal(i, 2)
}
