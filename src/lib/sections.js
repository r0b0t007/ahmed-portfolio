import { ordinal } from './ordinal'

/**
 * The order the sections mount in App.jsx, stated once. Each section's "( 0N )" eyebrow index is
 * derived from it, so adding or removing a section is one edit here rather than a renumbering
 * across ten files, which this repo has now done three times.
 */
export const SECTION_ORDER = [
  'benefits', 'services', 'process', 'handoff', 'proof', 'pricing', 'experience', 'about', 'faq', 'contact',
]

const indexIn = (order, name) => id => {
  const i = order.indexOf(id)
  if (i < 0) throw new Error(`${name}: "${id}" is not in the section order`)
  return ordinal(i, 2)
}

export const sectionIndex = indexIn(SECTION_ORDER, 'sectionIndex')

/** The numbered sections of a service page (src/pages/ServicePage.jsx), in render order. */
export const SERVICE_SECTION_ORDER = ['included', 'weeks', 'price', 'proof', 'faq', 'contact']

export const serviceSectionIndex = indexIn(SERVICE_SECTION_ORDER, 'serviceSectionIndex')

/** The numbered sections of a build log (src/pages/work/), in render order. */
export const WORK_SECTION_ORDER = ['decisions', 'failures', 'method', 'check', 'contact']

export const workSectionIndex = indexIn(WORK_SECTION_ORDER, 'workSectionIndex')

/** The numbered sections of the French homepage (src/pages/HomeFr.jsx), in render order. */
export const HOME_FR_SECTION_ORDER = ['services', 'process', 'proof', 'pricing', 'faq', 'contact']

export const homeFrSectionIndex = indexIn(HOME_FR_SECTION_ORDER, 'homeFrSectionIndex')
