# Hosting

ahmedchioua.com is deployed twice from every push to `main`, both on Cloudflare:

| | Primary: Worker | Standby: Pages |
|---|---|---|
| Cloudflare project | Workers & Pages → `ahmed-portfolio` (Worker) | Workers & Pages → `ahmed-portfolio` (Pages) |
| Config | `wrangler.jsonc`, code in `worker/index.js` | dashboard build settings, `functions/` |
| Build | `npm run build`, then `npx wrangler deploy` | `npm run build`, output `dist` |
| Address | `ahmedchioua.com` (custom domain, set in `wrangler.jsonc`) | `ahmed-portfolio-a76.pages.dev` |
| Contact form | `worker/index.js` → `functions/api/contact.js` | `functions/api/contact.js` |
| Secret | `RESEND_API_KEY` on the Worker | `RESEND_API_KEY` on the Pages project |

Both serve the same `dist/`, including `_headers`, the generated `_redirects` and `404.html`, so
either one can carry the domain. Only one does at a time.

## If the Worker breaks: move the domain to Pages

A failed Worker build does not take the site down: the last good version stays live. Switch only
when the live Worker itself misbehaves.

1. Check that the standby is healthy: `https://ahmed-portfolio-a76.pages.dev/` and `/fr` answer 200.
2. Worker → **Settings → Domains & Routes**: remove `ahmedchioua.com`. Also remove the `routes`
   entry from `wrangler.jsonc` on `main`, or the next Worker deploy takes the domain back.
3. Give the apex back to Pages, with the `cf` CLI:

   ```sh
   cf dns records create -z ahmedchioua.com --body '{"type":"CNAME","name":"ahmedchioua.com","content":"ahmed-portfolio-a76.pages.dev","proxied":true}'
   cf pages domains create ahmed-portfolio --name ahmedchioua.com
   ```

4. Wait for `cf pages domains list --project-name ahmed-portfolio` to show the domain **active**,
   then check `https://ahmedchioua.com/`, `/fr` and a form submission.

To move back to the Worker: `cf pages domains delete ahmedchioua.com --project-name ahmed-portfolio`,
delete the apex CNAME (`cf dns records list -z ahmedchioua.com` shows its id, then
`cf dns records delete <id> -z ahmedchioua.com`), restore the `routes` entry and deploy. A Worker
custom domain can't be attached while another DNS record holds the name.

`www.ahmedchioua.com` stays on the Pages project either way. A zone redirect rule answers it with a
301 to the apex before it reaches either deploy.

## Why not automatic failover

Both deploys run on Cloudflare's edge, so an outage of the platform takes both down and failover
between them would not help. Automatic failover between two hostnames needs Cloudflare Load
Balancing (a paid add-on), which isn't set up.
