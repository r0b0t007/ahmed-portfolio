/**
 * Build logs, served at /work/<slug>. Metadata only: title, description and dates feed
 * src/content/routes.js (head, structured data, sitemap, llms.txt, the 404 page's list). The
 * long-form body is a page component in src/pages/work/, because it is prose with inline links
 * and code that doesn't fit plain data. Keep this file JSX-free; Node imports it directly.
 */
export const workLogs = [
  {
    slug: 'this-site',
    name: 'How this site was built',
    summary: 'build log for ahmedchioua.com: prerendering, two hydrated islands, 104 KB before first paint, and the experiments that failed',
    title: 'How This Site Was Built: Build Log | Ahmed Chioua',
    description: 'The build log for ahmedchioua.com: prerendered React, two hydrated islands, 104 KB before first paint, and the experiments that failed. Source is public.',
    datePublished: '2026-10-09',
  },
]
