# shopFlow

Angular e-commerce application: product catalog, cart, checkout with Stripe, and user authentication.

## Prerequisites

- **Node.js** 20+ (see [.nvmrc](.nvmrc) if present)
- **npm** 9+

## Getting started

```bash
npm install
npm start
```

App runs at [http://localhost:4200](http://localhost:4200). The dev server uses `src/proxy.conf.json` to proxy API requests to backend services.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run dev server (proxy enabled) |
| `npm run build` | Production build |
| `npm run build:ssr` | Production build with SSR |
| `npm run serve:ssr:ssr` | Run built SSR app: `node dist/shopFlow/server/server.mjs` |
| `npm run watch` | Development build in watch mode |
| `npm run lint` | Run ESLint on `src/**/*.ts` and `src/**/*.html` |
| `npm run analyze` | Production build + bundle analysis (source-map-explorer) |

## Environment

- **Development:** `src/environment/environment.ts` — uses relative paths (`/UserApp`, `/products`, `/carts`, `/api`) and proxy.
- **Production:** `src/environment/environment.prod.ts` (swapped via `fileReplacements` in `angular.json`) — full API URLs and Stripe key.

See [.env.example](.env.example) for expected variables when using build-time env injection. For local dev, editing the environment files is enough; proxy targets are in `src/proxy.conf.json`.

## Project structure (overview)

```
src/
├── app/
│   ├── api/              # Unified API layer (ApiClient, Endpoints)
│   ├── core/             # Guards, interceptors, HTTP utils, services
│   ├── components/       # Shared UI (header, paging, messages, etc.)
│   ├── features/        # Reusable features (table, modal, search, forms)
│   ├── modules/         # Feature modules (auth, product, cart, user, checkout)
│   ├── pages/           # Not-found and similar
│   ├── types/           # Shared types; types/dto = API DTOs
│   └── test-utils/      # Test helpers (HTTP mock, fake data, providers)
├── assets/
├── environment/         # environment.ts, environment.prod.ts
├── proxy.conf.json      # Dev proxy for /UserApp, /products, /carts, /api
└── styles.css
```

- **Routing:** Lazy-loaded modules for auth, product, cart, user, checkout; guards for auth and guest-only routes.
- **State:** NgRx Store (auth) + NgRx Signals (cart). See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- **API:** Centralized in `src/app/api/`. Types from `@app-types/dto`. See [docs/API.md](docs/API.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — structure, state, HTTP layer, SSR
- [API](docs/API.md) — backend endpoints and auth flow
- [Contributing](CONTRIBUTING.md) — branch naming, commits, lint, format
- [Deployment](docs/DEPLOYMENT.md) — build, SSR, hosting
- [Testing](docs/TESTING.md) — test strategy and test-utils usage

## Tech stack

- Angular 21, standalone components, SSR
- NgRx Store + Effects (auth), NgRx Signals (cart)
- Tailwind CSS 4, Angular CDK
- ngx-stripe for checkout
- RxJS 7
