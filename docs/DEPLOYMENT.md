# Deployment

How to build and run shopFlow for production and common hosting setups.

## Build

Production build (with SSR and environment swap):

```bash
npm run build
```

Output:

- **Browser:** `dist/shopFlow/browser/`
- **Server:** `dist/shopFlow/server/` (e.g. `server.mjs`)

Development build (no SSR, no env swap, with source maps):

```bash
ng build --configuration=development
```

Bundle analysis (production build + source-map-explorer):

```bash
npm run analyze
```

Opens or generates `dist/shopFlow/bundle-stats.html`.

## Running the built app (SSR)

After `npm run build`:

```bash
node dist/shopFlow/server/server.mjs
```

The server serves the app and listens on the port configured in the server entry (e.g. from env or default). Use a process manager (e.g. PM2) or your host’s start command in production.

## Environment

Production build uses `src/environment/environment.prod.ts` (see `angular.json` → `fileReplacements`). Ensure that file has the correct API base URLs and Stripe key for the target environment. For multiple environments (staging, prod), duplicate the production config or use build-time env vars and generate the env file in CI.

## Hosting

- **Static only (no SSR):** Serve the contents of `dist/shopFlow/browser/` with any static host. Configure fallback to `index.html` for client-side routing. API and Stripe keys are fixed at build time.
- **SSR:** Run the Node server (`dist/shopFlow/server/server.mjs`) on a Node-capable host (e.g. Vercel Node server, Railway, Fly.io). Set the port and any server-side env vars (e.g. for logging) as required by the host.
- **Vercel / Netlify:** Use the Angular/Node adapter or the host’s Angular guide so that the server build is used for SSR routes and the browser build for static assets.

## Security

- Do not commit production Stripe keys or secrets. Use the host’s environment variables and inject them at build or runtime as appropriate.
- Production API URLs should use HTTPS. If the app is behind a reverse proxy, configure headers (e.g. CSP, HSTS) at the proxy or host level.

## Bundle budgets

Production build enforces size limits (see `angular.json` → `configurations.production.budgets`). If the build fails due to budget violations, reduce bundle size (lazy loading, tree-shaking, replacing heavy deps) or adjust the limits after review.
