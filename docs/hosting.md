# Hosting

ahmedchioua.com is deployed twice from every push to `main`, both on Cloudflare:

| | Primary: Worker | Standby: Pages |
|---|---|---|
| Cloudflare project | Workers & Pages → `ahmed-portfolio` (Worker) | Workers & Pages → `ahmed-portfolio` (Pages) |
| Config | `wrangler.jsonc`, code in `worker/index.js` | dashboard build settings, `functions/` |
| Build | `npm run build`, then `npx wrangler deploy` | `npm run build`, output `dist` |
| Address | `ahmedchioua.com` (custom domain) | `ahmed-portfolio-a76.pages.dev` |
| Contact form | `worker/index.js` → `functions/api/contact.js` | `functions/api/contact.js` |
| Secret | `RESEND_API_KEY` on the Worker | `RESEND_API_KEY` on the Pages project |

Both serve the same `dist/`, including `_headers`, the generated `_redirects` and `404.html`, so
either one can carry the domain. Only one does at a time.

## If the Worker breaks: move the domain to Pages

A failed Worker build does not take the site down: the last good version stays live. Switch only
when the live Worker itself misbehaves.

1. Check that the standby is healthy: `https://ahmed-portfolio-a76.pages.dev/` and `/fr` answer 200.
2. Worker → **Settings → Domains & Routes**: remove `ahmedchioua.com`.
3. Pages project → **Custom domains**: add `ahmedchioua.com` (Cloudflare creates the DNS record).
4. Wait for the domain to show **Active**, then check `https://ahmedchioua.com/`, `/fr` and a
   form submission.

To move back, run the same steps the other way round: remove the domain from Pages, then add it
on the Worker (**Settings → Domains & Routes → Add → Custom domain**).

## Why not automatic failover

Both deploys run on Cloudflare's edge, so an outage of the platform takes both down and failover
between them would not help. Automatic failover between two hostnames needs Cloudflare Load
Balancing (a paid add-on), which isn't set up.
