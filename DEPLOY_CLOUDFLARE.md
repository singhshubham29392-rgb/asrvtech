# Deploy to Cloudflare (fix "Hello world")

If `https://asrvtech.in` shows `Hello world`, the domain is currently routed to a placeholder Worker, not this website build.

This repo now includes:

- `worker.js` to serve static assets
- `wrangler.toml` with `dist/public` asset directory
- scripts:
  - `pnpm cf:deploy`
  - `pnpm cf:dev`

## Deploy

1. Login: `npx wrangler login`
2. Build and deploy: `pnpm cf:deploy`
3. In Cloudflare dashboard, ensure route `asrvtech.in/*` points to Worker `asrvtech`
4. Remove any old Worker route returning plain `Hello world`
