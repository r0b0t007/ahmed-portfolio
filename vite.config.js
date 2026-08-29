import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { faqs } from './src/content/faqs.js'
import { products } from './src/content/products.js'

/**
 * Derives the content that must stay in sync with the visible page from the same modules the
 * page renders from — src/content/faqs.js and src/content/products.js — and:
 *
 *   - injects a JSON-LD graph (FAQPage + one node per product) into index.html
 *   - generates llms.txt from src/content/llms.txt, filling {{FAQ}} and the product placeholders
 *
 * Google requires FAQPage answer text to match what's visible on the page, and hand-maintained
 * copies of product facts drifted across four files. Deriving them removes the second copy.
 */
function contentSchema() {
  const llmsTemplate = new URL('./src/content/llms.txt', import.meta.url)

  const renderLlms = () => readFileSync(llmsTemplate, 'utf8')
    .replace('{{PRODUCT_LINKS}}', products.map(p => `- [${p.name}](${p.url}) — ${p.summary}`).join('\n'))
    .replace('{{PRODUCT_PROOF}}', products.map(p => `- **${p.name}** — ${p.url} — ${p.proof}`).join('\n'))
    .replace('{{FAQ}}', faqs.map(({ q, a }) => `### ${q}\n${a}`).join('\n\n'))

  return {
    name: 'inject-content-schema',
    transformIndexHtml(html) {
      const json = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'FAQPage',
            '@id': 'https://ahmedchioua.com/#faq',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
          ...products.map(p => p.schema),
        ],
      }, null, 2)

      return {
        html,
        tags: [{
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: json,
          injectTo: 'head',
        }],
      }
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: renderLlms() })
    },
    configureServer(server) {
      server.middlewares.use('/llms.txt', (_req, res) => {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end(renderLlms())
      })
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), contentSchema()],
  build: {
    rollupOptions: {
      // React is external in the SSR build, so it can't be chunked there — manualChunks is
      // client-only. Without this guard `vite build --ssr` fails on the vendor entry.
      output: isSsrBuild ? {} : {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        },
      },
    },
  },
}))
