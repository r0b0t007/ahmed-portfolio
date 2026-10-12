/**
 * Content turned into SpecList rows (src/components/Doc.jsx). Several pages set the same content
 * (the homepage, the French homepage, every service page), so the mapping lives here once rather
 * than in each page.
 */

/** Terms whose body is a few short lines: the standards, the hand-off stack, a service's inclusions. */
export const linesRows = items => items.map(b => ({
  key: b.title,
  term: b.title,
  body: b.lines.map(l => <p key={l}>{l}</p>),
}))

/**
 * One row per service, from its `card` copy in src/content/services.js. The link target and label
 * are passed in, because the French homepage renders the same rows to its own pages.
 */
export const serviceRows = (list, href, more) => list.map(s => ({
  key: s.slug,
  term: s.card.title,
  sub: s.card.tagline,
  body: <>
    <p>{s.card.desc}</p>
    <p className="spec-tags">{s.card.tags.join(' · ')}</p>
    <a href={href(s)} className="link-teal">{more(s)} →</a>
  </>,
}))

/**
 * The checkable things, one row each: what it is, and the link to check it. Other sites open in a
 * new tab (↗); a page on this site opens in place (→).
 */
export const proofRows = list => list.map(it => ({
  key: it.title,
  term: it.title,
  body: <>
    <p>{it.body}</p>
    {it.link && (it.link.href.startsWith('/')
      ? <a className="link-teal" href={it.link.href}>{it.link.label} →</a>
      : <a className="link-teal" href={it.link.href} target="_blank" rel="noopener noreferrer">{it.link.label} ↗</a>)}
  </>,
}))
