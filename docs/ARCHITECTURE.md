# Architecture

This document describes the main architectural choices and structure of the shopFlow Angular application.

## High-level structure

- **Core** — singleton services, guards, HTTP interceptors, and shared utilities used across the app.
- **Modules** — feature areas (auth, product, cart, user, checkout), each with its own routes, components, services, and state where applicable.
- **Features** — reusable UI/UX building blocks (table, modal, search, custom form, etc.) that are not tied to a single business module.
- **API layer** — single place for HTTP: `ApiClient`, `Endpoints`, and domain API services (e.g. `ProductApi`, `AuthApiService`) that use them.
- **Shared types** — `app/types` for app-wide types; `app/types/dto` for API request/response contracts (shared DTOs).

## Routing and lazy loading

- **Root routes** (`app.routes.ts`): initial route is guarded by `InitialRedirectGuard` and loads the login page; then `users`, `product`, `cart`, `checkout` (all protected by `AuthGuard`), and guest-only auth routes under `GuestGuard`. Catch-all `**` goes to not-found.
- **Lazy loading:** Auth, product, cart, user, and checkout are loaded via `loadChildren` / `loadComponent`. Checkout also provides `provideNgxStripe` in its route config.
- **Guards:** `AuthGuard` (requires authenticated user), `GuestGuard` (redirects authenticated users), `InitialRedirectGuard` (handles first load and redirects to login or elsewhere as needed).

## State management

- **Auth:** NgRx Store with a single `auth` slice, plus Effects for login/register/checkAuth. Actions and selectors live in the auth module. Token and user are persisted (e.g. via `TokenService` / `UserStorage`).
- **Cart:** NgRx Signals (`signalStore`) in `CartStore`: in-memory cart with computed (products, total, totalItems) and methods (add, remove, change quantity, clear). Cart is persisted via `CartStorage` (e.g. localStorage keyed by user).
- **No global store** for product list or user list — those are handled by facades that call APIs and expose Observables/signals as needed.

## HTTP layer

- **ApiClient** (`src/app/api/api-client.service.ts`): central HTTP client. All requests go through `get`, `post`, `put`, `patch`, `delete` with `baseUrl` + path. Options: `params`, `headers`, `context`, `responseType`. Base URLs come from `environment` (exposed as `baseUrls` for tests).
- **Endpoints** (`src/app/api/endpoints.ts`): path constants only (no base URL). Grouped by domain: auth, user, product, checkout. Used by API services to avoid hardcoded paths.
- **Domain API services:** `AuthApiService`, `ProductApi`, `UserApiService`, `CheckoutApi` inject `ApiClient`, use `baseUrls` and `Endpoints`, and return typed Observables. They do not construct URLs manually.
- **Interceptors (order matters):**
  1. **AuthInterceptor** — adds `Authorization: Bearer <token>` for protected endpoints (e.g. `/auth/me`).
  2. **LoadingInterceptor** — shows/hides a global loading indicator; can be skipped via `SkipLoading` context token.
  3. **GlobalHttpErrorInterceptor** — catches HTTP errors (status 0 or ≥400), maps them to a user message via `toErrorMessage()`, shows a toast (e.g. 5s), then rethrows.

Error message mapping is in `core/http/http-utils.ts`; user-facing strings are derived from `HttpErrorResponse` and the `ErrorMessages` enum where applicable.

## Environment and configuration

- **Environment interface** (`environment.model.ts`): `production`, `userApp`, `product`, `cart`, `stripe.publicKey`, `api`.
- **Development:** `environment.ts` uses relative paths; the dev server uses `proxy.conf.json` to forward `/UserApp`, `/products`, `/carts`, `/api` to the real backends.
- **Production:** `environment.prod.ts` is swapped in via `fileReplacements`; it contains full URLs for user API, products, carts, and checkout API. Stripe key is set at build time (consider moving to env vars in production).

## SSR and build

- **SSR:** Entry is `src/server.ts`; production build outputs both browser and server bundles. Per-route SSR/prerender behavior can be configured in `app.routes.server.ts` if present.
- **Development build:** `optimization: false`, `ssr: false`, source maps on; proxy is used when running `ng serve`.
- **Production build:** File replacement for env, bundle budgets (initial, styles, scripts), output hashing. Bundle analysis is available via `npm run analyze` (source-map-explorer).

## Accessibility and performance

- **Accessibility:** Angular CDK (e.g. FocusTrap in modals), `aria-*` and `role` used in components (header, cart, modals, tables, paging).
- **Performance:** `ChangeDetectionStrategy.OnPush` where appropriate, `trackBy` / `@for` with `track` for lists, lazy-loaded routes, and bundle budgets to cap size.

## Path aliases

Defined in `tsconfig.json` under `paths` (baseUrl: `src`):

- `@api`, `@api/*` — API layer.
- `@app-types/*` — shared types (including `@app-types/dto`).
- `@core/*`, `@components/*`, `@features/*`, `@pages/*`, `@utils/*`.
- `@auth-module/*`, `@user-module/*`, `@product-module/*`, `@cart-module/*`, `@checkout-module/*`.
- `@env` — environment.

Use these instead of long relative paths for consistency and refactoring safety.
