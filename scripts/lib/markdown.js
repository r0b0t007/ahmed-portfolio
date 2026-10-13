/**
 * The Markdown twin of every prerendered page, for agents that ask for it with
 * `Accept: text/markdown` (edge/negotiate.js serves it; acceptmarkdown.com is the convention).
 *
 * Converted from the page's own prerendered HTML rather than written from the content modules, so
 * the Markdown says exactly what the page says and has no second copy to drift. Only <main> is
 * kept: the header, nav and footer are chrome, and the contact form is something to fill in, not
 * something to read. The input is React's server output, which is well-formed (quoted attributes,
 * self-closed void elements, escaped text), so a small tokenizer is enough; this is not a general
 * HTML parser and is not meant to be.
 *
 * Pure functions over strings, unit-tested in scripts/lib/markdown.test.js.
 */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
const RAW_TEXT = new Set(['script', 'style'])
// Interactive or decorative: nothing an agent reads.
const SKIP = new Set(['script', 'style', 'template', 'noscript', 'svg', 'form', 'button', 'input', 'textarea', 'select', 'label', 'iframe', 'video', 'audio', 'canvas', 'source'])
const INLINE = new Set(['a', 'abbr', 'b', 'bdi', 'br', 'cite', 'code', 'data', 'del', 'dfn', 'em', 'i', 'img', 'ins', 'kbd', 'mark', 'picture', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'wbr'])
// Spaces, tabs and line breaks only: a no-break space (the French pages set one before ; : ? !)
// is content, not layout, and must survive.
const LAYOUT_SPACE = /[ \t\n\r\f]+/g
const NBSP = String.fromCharCode(160)
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: NBSP }

const TOKEN = /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/g
const ATTR = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

export const decodeEntities = text => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, ref) => {
  if (ref[0] === '#') {
    const code = ref[1] === 'x' || ref[1] === 'X' ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10)
    return Number.isFinite(code) ? String.fromCodePoint(code) : whole
  }
  return NAMED[ref.toLowerCase()] ?? whole
})

/** A tree of { tag, attrs, children } and { text } nodes. Comments are dropped. */
export function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [] }
  const stack = [root]
  const top = () => stack[stack.length - 1]
  const text = t => { if (t) top().children.push({ text: decodeEntities(t) }) }
  let last = 0
  TOKEN.lastIndex = 0
  for (let m; (m = TOKEN.exec(html));) {
    text(html.slice(last, m.index))
    last = TOKEN.lastIndex
    const [whole, closing, opening, rawAttrs, selfClosing] = m
    if (whole.startsWith('<!--')) continue
    if (closing) {
      const name = closing.toLowerCase()
      const at = stack.findLastIndex(n => n.tag === name)
      if (at > 0) stack.length = at
      continue
    }
    const tag = opening.toLowerCase()
    const attrs = {}
    for (const [, name, dq, sq, bare] of rawAttrs.matchAll(ATTR)) attrs[name.toLowerCase()] = decodeEntities(dq ?? sq ?? bare ?? '')
    const node = { tag, attrs, children: [] }
    top().children.push(node)
    if (RAW_TEXT.has(tag)) {
      // Script and style bodies are not markup; skip to the matching close tag.
      const end = html.toLowerCase().indexOf(`</${tag}`, last)
      const stop = end < 0 ? html.length : end
      node.children.push({ text: html.slice(last, stop) })
      TOKEN.lastIndex = last = stop
      continue
    }
    if (!selfClosing && !VOID.has(tag)) stack.push(node)
  }
  text(html.slice(last))
  return root
}

const isElement = (node, tag) => node?.tag !== undefined && (tag === undefined || node.tag === tag)

// data-alt marks an alternate rendering of text that is already there (a short label shown on
// phones in place of the long one, src/components/CtaLabel.jsx): one copy is enough.
const hidden = ({ attrs }) =>
  'hidden' in attrs || 'data-alt' in attrs || attrs['aria-hidden'] === 'true' || /display\s*:\s*none/i.test(attrs.style ?? '')

const skipped = node => isElement(node) && (SKIP.has(node.tag) || hidden(node))

// Characters that would otherwise turn prose into Markdown syntax.
const escapeText = s => s.replace(/[\\`*_[\]<]/g, '\\$&')
// ...and at the start of a block, the markers that open a heading, list or quote.
// (A digit can't be backslash-escaped, so an ordered-list marker is broken at its dot instead.)
const escapeLineStart = s => s.replace(/^(#{1,6}(?=\s)|[-+*](?=\s)|>)/, '\\$1').replace(/^(\d+)([.)])(?=\s)/, '$1\\$2')

function absolute(href, base) {
  if (!href || /^(mailto|tel):/i.test(href)) return href
  try { return new URL(href, base).href } catch { return href }
}

// Moves edge spaces outside an emphasis marker: "*word *" is not emphasis in Markdown.
function wrap(inner, marker) {
  const [, lead, core, trail] = inner.match(/^([ \t\n]*)([\s\S]*?)([ \t\n]*)$/)
  return core ? `${lead}${marker}${core}${marker}${trail}` : inner
}

function inline(node, ctx) {
  if (!isElement(node)) return escapeText(node.text)
  if (skipped(node)) return ''
  const inner = () => inlineRun(node.children, ctx)
  switch (node.tag) {
    case 'br': return ' '
    case 'em': case 'i': return wrap(inner(), '*')
    case 'strong': case 'b': return wrap(inner(), '**')
    case 'code': return `\`${textOf(node)}\``
    case 'img': return node.attrs.alt ? `![${escapeText(node.attrs.alt)}](${absolute(node.attrs.src, ctx.url)})` : ''
    case 'a': {
      const label = inner().replace(LAYOUT_SPACE, ' ').trim() || escapeText(node.attrs['aria-label'] ?? '')
      if (!label) return ''
      const href = absolute(node.attrs.href, ctx.url)
      return href ? `[${label}](${href})` : label
    }
    default: return inner()
  }
}

/**
 * Joins inline siblings. React puts no whitespace between adjacent elements that CSS lays out
 * apart, so they would run together: tags rendered as sibling <span>s ("Design & build",
 * "SEO foundation"), two buttons side by side, a bold name and the line under it. A middle dot
 * separates two spans; a space separates any other two elements, or an element from a word.
 */
function inlineRun(nodes, ctx) {
  let out = ''
  let prev = null
  for (const node of nodes) {
    const piece = inline(node, ctx)
    if (!piece) continue
    if (prev && out && !/[ \t\n]$/.test(out) && !/^[ \t\n]/.test(piece)) {
      if (isElement(prev, 'span') && isElement(node, 'span')) out += ' · '
      else if (isElement(node) ? isElement(prev) || isElement(node, 'span') : isElement(prev) && /^[\p{L}\p{N}]/u.test(piece)) out += ' '
    }
    out += piece
    prev = node
  }
  return out
}

// One line of inline text: headings, table cells and list terms, where a line-start marker can't
// be misread.
const flat = (nodes, ctx) => inlineRun(nodes, ctx).replace(LAYOUT_SPACE, ' ').trim()
const paragraph = (nodes, ctx) => escapeLineStart(flat(nodes, ctx))

const textOf = node => isElement(node) ? node.children.map(textOf).join('') : node.text

// A run of inline siblings becomes one paragraph; every block child renders on its own.
function blocks(nodes, ctx) {
  const out = []
  let run = []
  const flush = () => {
    const p = paragraph(run, ctx)
    if (p) out.push(p)
    run = []
  }
  for (const node of nodes) {
    if (skipped(node)) continue
    if (!isElement(node) || INLINE.has(node.tag)) run.push(node)
    else { flush(); out.push(...block(node, ctx)) }
  }
  flush()
  return out
}

function list(node, ctx) {
  const ordered = node.tag === 'ol'
  const items = node.children.filter(c => isElement(c, 'li') && !skipped(c))
  const lines = items.map((li, i) => {
    const marker = ordered ? `${i + 1}. ` : '- '
    const body = blocks(li.children, ctx).join('\n\n')
    return marker + body.replace(/\n/g, `\n${' '.repeat(marker.length)}`)
  })
  return lines.length ? [lines.join('\n')] : []
}

// dt/dd pairs, wherever they sit inside the <dl> (React wraps each pair in a <div>).
function definitions(node, ctx) {
  const terms = []
  const walk = n => {
    for (const c of n.children) {
      if (!isElement(c) || skipped(c)) continue
      if (c.tag === 'dt') terms.push({ term: flat(c.children, ctx), defs: [] })
      else if (c.tag === 'dd' && terms.length) terms.at(-1).defs.push(flat(c.children, ctx))
      else walk(c)
    }
  }
  walk(node)
  return terms.length ? [terms.map(({ term, defs }) => `- **${term}**: ${defs.join('; ')}`).join('\n')] : []
}

function table(node, ctx) {
  const rows = []
  const walk = n => {
    for (const c of n.children) {
      if (!isElement(c) || skipped(c)) continue
      if (c.tag === 'tr') rows.push(c.children.filter(cell => isElement(cell, 'th') || isElement(cell, 'td')))
      else walk(c)
    }
  }
  walk(node)
  if (!rows.length) return []
  const cell = c => flat(c.children, ctx).replace(/\|/g, '\\|')
  const width = Math.max(...rows.map(r => r.length))
  const line = cells => `| ${Array.from({ length: width }, (_, i) => cells[i] ?? '').join(' | ')} |`
  const [head, ...body] = rows.map(r => r.map(cell))
  return [[line(head), line(Array(width).fill('---')), ...body.map(line)].join('\n')]
}

function block(node, ctx) {
  const heading = node.tag.match(/^h([1-6])$/)
  if (heading) {
    const text = flat(node.children, ctx)
    return text ? [`${'#'.repeat(Number(heading[1]))} ${text}`] : []
  }
  switch (node.tag) {
    case 'p': { const p = paragraph(node.children, ctx); return p ? [p] : [] }
    case 'ul': case 'ol': return list(node, ctx)
    case 'dl': return definitions(node, ctx)
    case 'table': return table(node, ctx)
    case 'hr': return ['---']
    case 'pre': return [`\`\`\`\n${textOf(node).replace(/\n$/, '')}\n\`\`\``]
    case 'blockquote': return [blocks(node.children, ctx).join('\n\n').replace(/^/gm, '> ')]
    default: return blocks(node.children, ctx)
  }
}

const findFirst = (node, tag) => {
  if (isElement(node, tag)) return node
  for (const c of node.children ?? []) {
    const found = findFirst(c, tag)
    if (found) return found
  }
  return null
}

/**
 * The page's <main> as Markdown, followed by a line pointing back at the HTML page and at
 * llms.txt. Links become absolute against `url`, so the text still works copied out of context.
 */
export function pageToMarkdown(html, { url, llmsUrl }) {
  const main = findFirst(parseHtml(html), 'main')
  if (!main) throw new Error(`[markdown] ${url} has no <main>`)
  const body = blocks(main.children, { url }).join('\n\n')
  if (!/^# /m.test(body)) throw new Error(`[markdown] ${url} rendered without a top-level heading`)
  return `${body}\n\n---\n\nThis is the Markdown version of ${url}. A summary of the whole site, and when to use it, is at ${llmsUrl}.\n`
}

/**
 * The Markdown body of a 404, for agents. The status code says what happened; this says where to
 * go instead: the agent summary, the sitemap, and every page that exists.
 */
export function notFoundMarkdown(routes, { absoluteUrl, llmsUrl, sitemapUrl }) {
  // Named as on the HTML 404 page (fillErrorPage in scripts/lib/pages.js).
  const pages = routes.map(r => `- [${escapeText(r.path === '/' ? 'Homepage' : r.name)}](${absoluteUrl(r.path)})`).join('\n')
  return [
    '# Page not found',
    'There is no page at this address. The link may be out of date, or the address mistyped.',
    `- [llms.txt](${llmsUrl}): a Markdown summary of the site, and when to use it\n- [Sitemap](${sitemapUrl}): every page, as XML`,
    `Every page that exists:\n\n${pages}`,
  ].join('\n\n') + '\n'
}
