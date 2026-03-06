# Bundle & perf profiling

## Path aliases და bundle size

იმისთვის, რომ ფაილები იტვირთებოდეს მხოლოდ საჭიროების მიხედვით (როგორც URL-ით), და ზედმეტი კოდი არ მოხვდეს initial bundle-ში:

1. **მხოლოდ ღრმა იმპორტი (deep imports)**  
   არ იყენებოთ barrel: `from '@auth-module'`, `from '@product-module'` და ა.შ.  
   ყოველთვის: `from '@auth-module/store/auth.actions'`, `from '@product-module/types/product'` — რომ bundler-მა მხოლოდ იმ ფაილის კოდი ჩაიყვანოს.

2. **Lazy routes — ერთი ჩანკი ერთ route-ზე**  
   `loadComponent` / `loadChildren` მხოლოდ dynamic `import()`-ით და ერთი entry path-ით:
   - `import('@auth-module/pages/login/login')` → login-ის chunk
   - `import('@product-module/pages/product-detail/product-detail')` → product-detail-ის chunk  
   ასე ყოველი route იტვირთება მხოლოდ მაშინ, როცა მომხმარებელი იმ URL-ზე მიდის.

3. **Route config-ის სტატიკური იმპორტი**  
   `app.routes.ts` იმპორტებს `authRoutes`, `productRoutes` და ა.შ. — მხოლოდ route ობიექტებს, კომპონენტების კოდს არა. კომპონენტები იტვირთება მხოლოდ `loadComponent: () => import('...')`-ის მეშვეობით.

ამ წესების დაცვა ნორმალურია პროექტში: barrel იმპორტები მოხსნილია, lazy routes ყველგან dynamic import + alias-ით არის.

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

**როგორ იპოვო სად არის საჭირო შემცირება (initial bundle):**
1. `npm install` (რომ იყოს source-map-explorer).
2. `npm run analyze` — ააგებს production-like build-ს source map-ებით და ქმნის ანალიზის HTML-ს.
3. გახსენი ბრაუზერში: `dist/shopFlow/bundle-stats.html` (ან იგივე ფოლდერიდან `index.html` თუ რამე სხვა სახელით იქმნება).
4. ანალიზში დააკვირდი **უდიდეს ბლოკებს** initial (main) chunk-ში — ხშირად: `node_modules` (rxjs, @angular/core, @ngrx, zone.js, tailwind), ან твой კოდი. რაც უფრო დიდია, იქიდან დაიწყე: lazy load, lighter lib, ან ზედმეტი import-ის მოშორება.

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
