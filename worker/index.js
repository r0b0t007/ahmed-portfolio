/**
 * The Worker's code (wrangler.jsonc). Static files never reach it: run_worker_first sends only
 * /api/* here. The contact handler is the same module the Pages project runs as a Pages Function
 * (functions/api/contact.js), so the two deploys answer the form identically.
 */
import { onRequestPost } from '../functions/api/contact.js'

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/api/contact') {
      if (request.method === 'POST') return onRequestPost({ request, env })
      return new Response(null, { status: 405, headers: { Allow: 'POST' } })
    }
    // Any other /api/ path is not a route: the assets layer answers with the 404 page.
    return env.ASSETS.fetch(request)
  },
}
