/**
 * Pages Functions middleware: runs before every request public/_routes.json sends to Functions
 * (everything but the hashed /assets/ files, which never need negotiating; JSON has no comments,
 * so the reason lives here). Without that file Pages would run it for every request.
 *
 * The form API goes on to its own Function (functions/api/contact.js). Everything else, pages,
 * files and unknown paths, is answered by edge/negotiate.js: the page as HTML or Markdown
 * depending on the Accept header, from the static assets.
 */
import { negotiate } from '../edge/negotiate.js'

export async function onRequest({ request, env, next }) {
  if (new URL(request.url).pathname.startsWith('/api/')) return next()
  return negotiate(request, env)
}
