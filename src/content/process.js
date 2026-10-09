/**
 * The four steps every project runs. Rendered by the homepage Process section and by each
 * service page, so the description of how the work goes can't drift between them.
 */
import { FIRST_LINK_DAYS, LAUNCH_COVER_DAYS } from './site.js'

export const steps = [
  {
    title: 'Scope',
    meta: 'Free · 1 week',
    desc: 'A 30-minute call, then a written scope: what gets built, what doesn’t, what it costs, and the date it goes live. If I’m not the right person for it, I’ll say so here. That’s why it’s free.',
  },
  {
    title: 'Build',
    meta: `Day ${FIRST_LINK_DAYS}: a link · then weekly`,
    desc: `Day ${FIRST_LINK_DAYS}, you get a URL. It’s rough. It’s real. You click through the core flow, react, and we adjust while changes are still cheap. Every week after: a demo, an updated link, a direct line to me. AI in the loop is why the timeline is weeks, not months. The weekly architecture review is why it holds.`,
  },
  {
    title: 'Ship',
    meta: 'On the date in your scope',
    desc: 'Live on your infrastructure, your domain, your accounts. Performance, accessibility and SEO verified before it goes out, and you see the numbers. If I miss the date in your scope, I keep building until it ships, and the overrun is on me.',
  },
  {
    title: 'Hand over',
    meta: `Included · ${LAUNCH_COVER_DAYS} days of cover`,
    desc: `The repo, the pipeline, the documentation, a walkthrough, and ${LAUNCH_COVER_DAYS} days of post-launch fixes. Any developer can pick it up after me. If you’d rather I kept going, we scope that separately.`,
  },
]
