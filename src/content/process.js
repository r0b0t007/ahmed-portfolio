/**
 * The four steps every project runs. Rendered by the homepage Process section and by each
 * service page, so the description of how the work goes can't drift between them. Each step is
 * written once, as sentences: service pages show all of them (`steps`), the homepage shows the
 * selected ones (`homeSteps`).
 */
import { cut } from './cut.js'
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from './site.js'

const step = (title, meta, sentences, keep) => {
  const { full, short } = cut(sentences, keep)
  return { title, meta, desc: full, short }
}

export const steps = [
  step('Scope', 'Free · 1 week', [
    'A 30-minute call, then a written scope: what gets built, what doesn’t, what it costs, and the date it goes live.',
    'If I’m not the right person for it, I’ll say so here.',
    'That’s why it’s free.',
  ], [0]),
  step('Build', `Day ${FIRST_LINK_DAYS}: a link · then weekly`, [
    `Day ${FIRST_LINK_DAYS}, you get a URL.`,
    'It’s rough.',
    'It’s real.',
    'You click through the core flow, react, and we adjust while changes are still cheap.',
    'Every week after: a demo, an updated link, a direct line to me.',
    'AI in the loop is why the timeline is weeks, not months.',
    'The weekly architecture review is why it holds.',
  ], [0, 1, 2, 4]),
  step('Ship', 'On the date in your scope', [
    'Live on your infrastructure, your domain, your accounts.',
    'Performance, accessibility and SEO verified before it goes out, and you see the numbers.',
    'If I miss the date in your scope, I keep building until it ships, and the overrun is on me.',
  ], [0, 2]),
  step('Hand over', `Included · ${LAUNCH_COVER_DAYS} days of cover`, [
    `The repo, the pipeline, the documentation, a walkthrough, and ${LAUNCH_COVER_DAYS} days of post-launch fixes.`,
    'Any developer can pick it up after me.',
    'If you’d rather I kept going, we scope that separately.',
  ], [0]),
]

/** The homepage's steps: the same four, each with its selected sentences as the description. */
export const homeSteps = steps.map(s => ({ ...s, desc: s.short }))
