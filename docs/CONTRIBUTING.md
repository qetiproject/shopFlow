# Contributing to shopFlow

## Branch naming

- `feature/<short-description>` — new features
- `fix/<short-description>` — bug fixes
- `refactor/<short-description>` — refactors (no behavior change)
- `docs/<short-description>` — documentation only

Examples: `feature/checkout-retry`, `fix/cart-total`, `docs/api-readme`.

## Commits

- Prefer clear, present-tense messages: "Add checkout retry" rather than "Added checkout retry".
- Reference issue/ticket when relevant: "Fix cart total (PROJ-123)".

Conventional commits (`feat:`, `fix:`, etc.) are optional but welcome.

## Before submitting a PR

1. **Lint**
   ```bash
   npm run lint
   ```
   Fix any reported issues.

2. **Build**
   ```bash
   npm run build
   ```
   Ensure the production build succeeds.

3. **Format**
   The project uses Prettier (see `package.json` → `prettier`). Keep formatting consistent; if you have format-on-save or a Prettier script, run it before pushing.

## Code style

- Use path aliases: `@api`, `@app-types/dto`, `@core/*`, `@auth-module/*`, etc. (see `tsconfig.json` → `paths`).
- API calls go through `ApiClient` and `Endpoints`; types for requests/responses from `@app-types/dto`.
- New shared types that represent API contracts belong in `src/app/types/dto/` and should be re-exported from the appropriate `*.dto.ts` and `index.ts`.

## Pull request process

1. Create a branch from the default branch (e.g. `main`).
2. Make changes and ensure lint + build pass.
3. Open a PR with a short description of what changed and why.
4. Address review comments; once approved, the PR can be merged.
