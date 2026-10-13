import { test } from 'node:test'
import assert from 'node:assert/strict'
import { decodeEntities, pageToMarkdown, notFoundMarkdown } from './markdown.js'

const URL_ = 'https://ahmedchioua.com/services/x'
const LLMS = 'https://ahmedchioua.com/llms.txt'
const md = main => pageToMarkdown(`<body><header><a href="/">Logo</a></header><main>${main}</main><footer>Footer</footer></body>`, { url: URL_, llmsUrl: LLMS })
// The converted body, without the closing line that points back at the page.
const body = main => md(main).split('\n\n---\n\n')[0]

test('only <main> is converted, and the page ends by pointing at its HTML and at llms.txt', () => {
  const out = md('<h1>Title</h1><p>Text.</p>')
  assert.ok(out.startsWith('# Title\n\nText.'))
  assert.ok(!out.includes('Logo') && !out.includes('Footer'))
  assert.ok(out.endsWith(`This is the Markdown version of ${URL_}. A summary of the whole site, and when to use it, is at ${LLMS}.\n`))
})

test('headings, emphasis and line breaks', () => {
  assert.equal(body('<h1>Live in weeks.<br/><em>Date in writing.</em></h1><h3>Sub <strong>bold</strong></h3>'),
    '# Live in weeks. *Date in writing.*\n\n### Sub **bold**')
})

test('emphasis keeps its edge spaces outside the markers', () => {
  assert.equal(body('<h1>T</h1><p>a<em> b </em>c</p>'), '# T\n\na *b* c')
})

test('links become absolute; fragments resolve against the page; mailto stays as is', () => {
  assert.equal(body('<h1>T</h1><p><a href="/fr">FR</a> <a href="#price">Price</a> <a href="mailto:a@b.co">a@b.co</a></p>'),
    `# T\n\n[FR](https://ahmedchioua.com/fr) [Price](${URL_}#price) [a@b.co](mailto:a@b.co)`)
})

test('an icon-only link uses its aria-label; an empty one is dropped', () => {
  assert.equal(body('<h1>T</h1><p><a href="/x" aria-label="GitHub"><svg><path d="M0"/></svg></a><a href="/y"></a></p>'),
    '# T\n\n[GitHub](https://ahmedchioua.com/x)')
})

test('forms, buttons, SVG, hidden and aria-hidden content are left out', () => {
  const out = body('<h1>T</h1><form><label>Name</label><input name="n"/><button>Send</button></form>' +
    '<svg><title>icon</title></svg><div style="display:none">bot</div><p hidden>h</p><span aria-hidden="true">deco</span><p>kept</p>')
  assert.equal(out, '# T\n\nkept')
})

test('an alternate rendering (data-alt) is left out, so a two-length label appears once', () => {
  assert.equal(body('<h1>T</h1><p><a href="/b"><span class="cta-long">Claim a slot now</span><span class="cta-short" data-alt="">Claim</span></a></p>'),
    '# T\n\n[Claim a slot now](https://ahmedchioua.com/b)')
})

test('sibling spans are separated, and elements do not run into each other or into words', () => {
  assert.equal(body('<h1>T</h1><div><span>Design &amp; build</span><span>SEO</span></div>'), '# T\n\nDesign & build · SEO')
  assert.equal(body('<h1>T</h1><div><a href="/a">A</a><a href="/b">B</a></div>'), '# T\n\n[A](https://ahmedchioua.com/a) [B](https://ahmedchioua.com/b)')
  assert.equal(body('<h1>T</h1><p><b>Ahmed</b>Developer</p>'), '# T\n\n**Ahmed** Developer')
  // React splits {a}{b} with a comment: two text nodes, one word.
  assert.equal(body('<h1>T</h1><p>9<!-- -->0 days, <strong>10</strong>.</p>'), '# T\n\n90 days, **10**.')
})

test('a bracketed number is content, kept as a block and inside a run', () => {
  assert.equal(body('<h1>T</h1><div>(12)</div><p>Clients <span>(3)</span></p>'), '# T\n\n(12)\n\nClients (3)')
})

test('block-level divs each become a paragraph', () => {
  assert.equal(body('<h1>T</h1><div><div>10</div><div>Days to a link</div></div>'), '# T\n\n10\n\nDays to a link')
})

test('lists, ordered lists and definition lists', () => {
  assert.equal(body('<h1>T</h1><ol><li><a href="/">Home</a></li><li>Here</li></ol><ul><li>a</li><li>b</li></ul>'),
    '# T\n\n1. [Home](https://ahmedchioua.com/)\n2. Here\n\n- a\n- b')
  assert.equal(body('<h1>T</h1><dl><div><dt>Price</dt><dd>€3,000</dd></div><div><dt>Weeks</dt><dd>2–3</dd></div></dl>'),
    '# T\n\n- **Price**: €3,000\n- **Weeks**: 2–3')
})

test('tables become GFM tables, with pipes escaped', () => {
  assert.equal(body('<h1>T</h1><table><thead><tr><th>Scope</th><th>From</th></tr></thead><tbody><tr><th scope="row">A | B</th><td>€1</td></tr></tbody></table>'),
    '# T\n\n| Scope | From |\n| --- | --- |\n| A \\| B | €1 |')
})

test('prose that looks like Markdown syntax is escaped', () => {
  assert.equal(body('<h1>T</h1><p>an *asterisk* and [brackets] and &lt;div&gt;</p><p>- not a list</p><p>1. not a list</p>'),
    '# T\n\nan \\*asterisk\\* and \\[brackets\\] and \\<div>\n\n\\- not a list\n\n1\\. not a list')
})

test('inline code keeps its text verbatim', () => {
  assert.equal(body('<h1>T</h1><p>The build shipped <code>&lt;div id=&quot;root&quot;&gt;</code>.</p>'), '# T\n\nThe build shipped `<div id="root">`.')
})

test('entities decode, and a no-break space survives whitespace collapsing', () => {
  const nbsp = String.fromCharCode(160)
  assert.equal(decodeEntities('a&amp;b &#x27;c&#39; &quot;d&quot; &nbsp; &unknown;'), `a&b 'c' "d" ${nbsp} &unknown;`)
  assert.equal(body(`<h1>T</h1><p>Prix${nbsp}:  3${nbsp}000 €\n   ok</p>`), `# T\n\nPrix${nbsp}: 3${nbsp}000 € ok`)
})

test('a page without <main> or without an h1 fails the build', () => {
  assert.throws(() => pageToMarkdown('<body><p>x</p></body>', { url: URL_, llmsUrl: LLMS }), /no <main>/)
  assert.throws(() => md('<h2>Only a subheading</h2>'), /top-level heading/)
})

test('notFoundMarkdown points at llms.txt, the sitemap and every page, named as on the HTML 404', () => {
  const routes = [{ path: '/' }, { path: '/services/x', name: 'Service X' }, { path: '/fr', name: 'Accueil' }]
  const out = notFoundMarkdown(routes, {
    absoluteUrl: p => new URL(p, 'https://ahmedchioua.com/').href,
    llmsUrl: LLMS,
    sitemapUrl: 'https://ahmedchioua.com/sitemap.xml',
  })
  assert.ok(out.startsWith('# Page not found\n\n'))
  assert.ok(out.includes(`- [llms.txt](${LLMS}): a Markdown summary of the site, and when to use it\n- [Sitemap](https://ahmedchioua.com/sitemap.xml)`))
  assert.ok(out.includes('- [Homepage](https://ahmedchioua.com/)\n- [Service X](https://ahmedchioua.com/services/x)\n- [Accueil](https://ahmedchioua.com/fr)'))
})
