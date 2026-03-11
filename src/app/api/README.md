# API layer

Central place for all HTTP communication: endpoint paths and a single HTTP client.

## Public API

- **Endpoints** — path constants (no base URL). Import: `import { Endpoints } from '@api';`
- **ApiClient** — `get`, `post`, `put`, `patch`, `delete`. Import: `import { ApiClient, ApiRequestOptions } from '@api';`

Path alias: `@api` resolves to `src/app/api/index.ts`.

## Endpoints

Defined in `endpoints.ts`. Base URLs come from `environment` (or from `ApiClient.baseUrls` in tests).

- **Endpoints.auth** — `createUser`, `login`, `sendResetOtp`, `verifyOtpResetPassword`
- **Endpoints.user** — `searchUsers`
- **Endpoints.product** — `root`, `search`, `categories`, `category(slug)`, `byId(id)`, `add`
- **Endpoints.checkout** — `create`

Example:

```ts
import { ApiClient, Endpoints } from '@api';

const api = inject(ApiClient);
const baseUrl = api.baseUrls.product;

api.get<Product>(baseUrl, Endpoints.product.byId(1));
api.post(baseUrl, Endpoints.product.add, body);
```

## ApiClient

- **baseUrls** — read-only getter returning `{ userApp, product, cart, api }` from the current environment. Use in tests to override or assert base URLs.
- **get/post/put/patch/delete** — each takes `baseUrl`, `path`, and optional `body` (for post/put/patch) and `ApiRequestOptions` (`params`, `headers`, `context`, `responseType`).
- All requests use `observe: 'body'` and return `Observable<T>`.

Domain API services (`ProductApi`, `AuthApiService`, `UserApiService`, `CheckoutApi`) inject `ApiClient`, use `baseUrls` and `Endpoints`, and do not construct URLs manually. Add new endpoints in `endpoints.ts` and new methods on the appropriate service (or a new service) that call `ApiClient` with the right base URL and path.

## Adding a new backend or endpoint

1. Add path(s) to `endpoints.ts` (e.g. under an existing group or a new one).
2. If the base URL is new, add it to `environment.model.ts` and to both `environment.ts` and `environment.prod.ts`, then expose it on `ApiClient.baseUrls`.
3. Create or extend an API service that injects `ApiClient`, uses `baseUrls.<yourBase>` and `Endpoints.<yourGroup>.<path>`, and returns typed Observables. Use types from `@app-types/dto` for request/response.
