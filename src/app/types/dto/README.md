# Shared DTOs

Single source of truth for API request and response types. All consumers should import these types from `@app-types/dto` (or `@app-types/dto/<domain>.dto`).

## Naming convention

- **Request types** (payload sent to the API): suffix `Request` — e.g. `CreateUserRequest`, `LoginRequest`, `AddProductRequest`, `CheckoutRequest`.
- **Response types** (payload returned from the API): suffix `Response` or wrapper name — e.g. `LoginResponse`, `CreateUserResponse`, `UsersResponse`, `UserResponse`, `ProductDeleteResponse`, `CartResponse`, `CheckoutResponse`. List wrappers: `ProductsApiResponse<T>`, `UsersResponse` (with `data: UserResponse[]`).
- **Entity shapes** used in both list and detail: no suffix (e.g. `Product`, `Cart`, `Order`) or `*ApiShape` when it’s a subset (e.g. `ProductApiShape`).
- **View models** (UI-only, derived from API): stay in feature modules with suffix `ViewModel` (e.g. `UserViewModel`, `ProductViewModel`). API → View mapping is done in facades with a single method name: `toViewModel(api): ViewModel`.

## Mapping (API → View)

Mapping from API DTOs to view models is done **only in facades**, using a single method name:

- **ProductFacade:** `toViewModel(product: ProductApiShape): ProductViewModel`
- **UserFacade:** `toViewModel(user: UserResponse): UserViewModel`

Components and resolvers consume view models or observables that already return view models from the facade. Do not map from API types to view types in components or in API services.

## Barrel import

```ts
import type { Product, CartProduct, LoginResponse, CheckoutResponse } from '@app-types/dto';
```

## Per-domain files

| File | Types |
|------|--------|
| **auth.dto.ts** | CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, ResetPasswordRequest, AuthTokens, AuthUser |
| **product.dto.ts** | Product, ProductApiShape, ProductsApiResponse, AddProductRequest, ProductDeleteResponse, Category, Dimensions, Review, Meta |
| **user.dto.ts** | UserResponse, UsersResponse |
| **cart.dto.ts** | Cart, CartProduct, Cartable, CartsByUserId, AddToCartRequest, CartResponse |
| **checkout.dto.ts** | Order, OrderList, BillingDetails, CheckoutRequest, CheckoutResponse |

Definitions are re-exported from the feature modules (e.g. `@auth-module/types/...`, `@product-module/types/product`). Only **CheckoutRequest** and **CheckoutResponse** are defined directly here for the checkout API contract.

## Usage

- **API services** — Use these types for method parameters and return types (e.g. `Observable<LoginResponse>`).
- **Components and facades** — Use them for payloads, API responses, and any data that crosses the API boundary.
- **Tests** — Use the same types so mocks and fake data match the real contract. See `@test-utils/fake-data` for factories that return these shapes.

## Changing or adding DTOs

- **Existing backend contract:** Prefer updating the type in the owning module (e.g. `auth-module/types/login/login.response.ts`) and keep the re-export in the corresponding `*.dto.ts`. Then all consumers via `@app-types/dto` get the update.
- **New endpoint or field:** Add the type in the right module (or in `checkout.dto.ts` for checkout-specific DTOs), then export it from the right `*.dto.ts` and from `index.ts`.

If you later generate types from OpenAPI/Swagger, you can replace or supplement these files with generated types and keep importing from `@app-types/dto` so the rest of the app stays unchanged.
