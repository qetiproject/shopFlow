# E2E tests (Playwright)

## Configuration

All settings are in the project root: `playwright.config.ts`.

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `testDir` | `e2e` | Test files live in this folder |
| `testMatch` | `*.e2e.ts` | Only `.e2e.ts` files are treated as tests |
| `baseURL` | `BASE_URL` / `E2E_BASE_URL` env or `http://localhost:4200` | Local: localhost. Server/CI: set env to deployed URL so e2e runs against it. |
| `webServer` | `npm run start` | Starts `ng serve` automatically before tests |
| `workers` | `1` | One test at a time (increase for parallel runs) |
| `timeout` | 25000 ms | Max time per test |
| `expect.timeout` | 10000 ms | Assertion wait timeout |
| `use.screenshot` | `only-on-failure` | Save screenshot on failure |
| `use.video` | `on-first-retry` | Record video on retry |
| `projects` | chromium (optionally firefox, webkit) | Browsers to run tests in |

## Scripts (package.json)

- **`npm run e2e`** — Run tests (headless).
- **`npm run e2e:ui`** — Playwright UI (interactive, pick tests, see steps).
- **`npm run e2e:headed`** — Run tests in a visible browser (for debugging).

## Server / CI

Locally, `npm run e2e` uses `http://localhost:4200`. To run tests against a deployed app in CI or on a server, set the env var to the deployed app URL:

- **BASE_URL** or **E2E_BASE_URL** — e.g. `BASE_URL=https://myapp.vercel.app` or `E2E_BASE_URL=https://staging.example.com`

Example (CI):

```bash
export E2E_BASE_URL=https://shopflow-staging.vercel.app
npm run e2e
```

The app must already be running on that server (or disable webServer and run tests against BASE_URL only).

## First-time setup

1. Install deps: `npm install`
2. Install browsers (once): `npx playwright install chromium`
3. Run tests: `npm run e2e`

Add test files under `e2e/` with extension `*.e2e.ts`.

## Conventions

- **e2e/env.ts** — `BASE_URL` from process.env; use in smoke or wherever the URL must be dynamic.
- **e2e/helpers.ts** — Reusable helpers (e.g. `expectLoginPage(page)`) to avoid repeating the same assertions.
- Protected routes — One `describe` and a loop over a URL array so the same logic lives in one place.
