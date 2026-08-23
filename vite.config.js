import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { faqs } from './src/content/faqs.js'

/**
 * Generates the FAQPage JSON-LD from src/content/faqs.js — the same module the visible FAQ
 * section renders from — and injects it into index.html.
 *
 * Google requires FAQPage answer text to match what's visible on the page. Hand-maintaining a
 * second copy in index.html drifts (it already did once), so the markup is derived instead.
 */
function faqSchema() {
  return {
    name: 'inject-faq-schema',
    transformIndexHtml(html) {
      const json = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://ahmedchioua.com/#faq',
        mainEntity: faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
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
  }
}

export default defineConfig({
  plugins: [react(), faqSchema()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        }
      }
    }
  }
})
