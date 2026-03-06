# Naming & structure

So contributors can predict file locations and names.

---

## Top-level folders

| Folder        | Purpose |
|---------------|--------|
| **core/**     | App-wide singletons: guards, interceptors, HTTP helpers, global services. No feature logic. |
| **features/** | Reusable UI building blocks (forms, loading, upload, directives, validators) used across modules. |
| **components/** | Shared presentational components (header, paging, messages). |
| **modules/**  | Feature modules (auth, product, cart, checkout, user). Each is self-contained (pages, components, services, store, types). |
| **pages/**    | App-level pages (e.g. not-found). Route-level pages live under `modules/<name>/pages/`. |
| **types/**    | Shared TypeScript types/enums. |
| **utils/**    | Shared pure helpers. |

---

## File naming

### Routes
- **One routes file per module:** `<module>.routes.ts` (e.g. `auth.routes.ts`, `cart.routes.ts`, `checkout.routes.ts`, `product.routes.ts`, `user.routes.ts`).
- Export: `authRoutes`, `cartRoutes`, etc.

### Resolvers
- **Suffix:** `.resolver.ts` (e.g. `user-profile.resolver.ts`, `product-detail.resolver.ts`).
- Export: `UserProfileResolve`, `ProductDetailResolve`, etc.

### Guards / Interceptors
- **Suffix:** `.guard.ts`, `.interceptor.ts` (e.g. `auth.guard.ts`, `loading.interceptor.ts`).

### Store / API / Facade
- **Suffix:** `.store.ts`, `.api.ts`, `.facade.ts` (e.g. `auth.store.ts`, `auth.api.ts`, `user.facade.ts`).  
- Optional: `*.actions.ts`, `*.effect.ts`, `*.reducer.ts` for NgRx.

### Components
- **Shared / reusable (components/, features/):** `<name>.component.ts` (e.g. `loading.component.ts`, `back-button.component.ts`).
- **Module pages:** `<name>.ts` in `modules/<module>/pages/<page>/` (e.g. `login.ts`, `users.ts`, `checkout-canceled.ts`). Folder name = page name; template is `<name>.html`.

### Directives / Pipes / Services
- **Suffix:** `.directive.ts`, `.pipe.ts`, `.service.ts` when the file exposes a single directive, pipe, or injectable service.

### Forms / types
- **Forms:** `<name>.form.ts` or `<name>-form.ts` (e.g. `login.form.ts`, `add-product-form.ts`).
- **Types:** `<name>.ts` under `types/` or `modules/<module>/types/`.

---

## Module layout (under `modules/<name>/`)

- **pages/** — route components; one folder per page (`<page>/<page>.ts` + `<page>.html`).
- **components/** — module-specific UI (optional).
- **services/** — API, facades, storage (optional subfolders like `facades/`).
- **store/** — NgRx or signal store (optional).
- **types/** — module-specific types.
- **utils/** — module-specific helpers.
- **<module>.routes.ts** — at module root.

---

## Barrels

- Use **index.ts** per folder to re-export public API.
- **Routing:** Prefer direct file imports in `loadComponent` (e.g. `./pages/login/login`) instead of barrel paths, to keep lazy chunks small.

---

## Summary

- Routes: `<module>.routes.ts`.
- Resolvers: `*.resolver.ts`.
- Guards/Interceptors: `*.guard.ts`, `*.interceptor.ts`.
- Store/API/Facade: `*.store.ts`, `*.api.ts`, `*.facade.ts`.
- Shared components: `*.component.ts`; module pages: `<page>.ts` in `pages/<page>/`.
- Core = global; features = reusable UI; components = shared components; modules = feature areas.
