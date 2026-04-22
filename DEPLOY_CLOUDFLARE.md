# Deploy to Cloudflare (fix "Hello world")

If `https://asrvtech.in` shows `Hello world`, the domain is currently routed to a placeholder Worker, not this website build.

This repo now includes:

- `worker.js` to serve static assets
- `worker.js` contact API (`/api/contact`) that sends email via Cloudflare Worker transport (MailChannels)
- `wrangler.toml` with `dist/public` asset directory
- scripts:
  - `pnpm cf:deploy`
  - `pnpm cf:dev`

## Deploy

1. Login: `npx wrangler login`
2. Set email variables in `wrangler.toml` (`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `CONTACT_FROM_NAME`) or via dashboard env vars
3. Build and deploy: `pnpm cf:deploy`
4. In Cloudflare dashboard, ensure route `asrvtech.in/*` points to Worker `asrvtech`
5. Remove any old Worker route returning plain `Hello world`
