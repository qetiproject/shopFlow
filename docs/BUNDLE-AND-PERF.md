# Bundle & perf profiling

## Budgets (angular.json)

- **initial**: main bundle — warning 620kb, error 1mb.
- **anyComponentStyle**: per-component CSS — warning 2kb, error 4kb.
- **anyScript**: each lazy route chunk — warning 250kb, error 400kb (catches unexpectedly large lazy chunks).

Build fails if any budget is exceeded.

## Bundle analysis

1. Install deps (includes `source-map-explorer`):
   ```bash
   npm install
   ```
2. Build with source maps and open report:
   ```bash
   npm run analyze
   ```
   Opens the default viewer; also writes `dist/shopFlow/bundle-stats.html` for a shareable report.

3. Manual steps:
   - `npm run build:analyze` — production-like build with source maps.
   - Then run `source-map-explorer dist/shopFlow/browser/*.js` (or open the generated HTML).

Use the report to find large dependencies and confirm chunking (lazy routes = separate chunks).

**How to find where to reduce size (initial bundle):**
1. `npm install` (so source-map-explorer is available).
2. `npm run analyze` — builds a production-like build with source maps and generates the analysis HTML.
3. Open in the browser: `dist/shopFlow/bundle-stats.html` (or `index.html` from that folder if the filename differs).
4. In the report, look at the **largest blocks** in the initial (main) chunk — often: `node_modules` (rxjs, @angular/core, @ngrx, zone.js, tailwind) or your app code. Start with the biggest: lazy load, lighter lib, or remove unnecessary imports.

## Duplicate deps

- Run `npm run deps:check` to list the dependency tree.
- Run `npm dedupe` to reduce duplicates when possible.
- If a lazy chunk is too big, check for accidental duplicate or heavy libs and prefer lazy loading or lighter alternatives.

## Assets / images

- **Icons**: under `src/assets/icons/` are TS/SVG components (in the JS bundle).
- **Images**: e.g. `src/assets/products/image.png` — keep optimized (e.g. compressed PNG/WebP, reasonable dimensions). Add more under `src/assets` as needed; they are copied as-is. Use responsive images and lazy loading in templates where it helps.

## CI

Run before merge / in CI:

- `npm run lint`
- `npm run build:prod` (fails if budgets are exceeded)

This keeps the initial bundle within budgets with headroom and avoids unexpectedly large lazy chunks.
