# Shared DTOs

Single source of truth for API request and response types. All consumers should import these types from `@app-types/dto` (or `@app-types/dto/<domain>.dto`).

## Barrel import

```ts
import type { Product, CartProduct, LoginResponse, CheckoutResponseDto } from '@app-types/dto';
```

## Per-domain files

| File | Types |
|------|--------|
| **auth.dto.ts** | CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, ResetPasswordRequest, AuthTokens, AuthUser |
| **product.dto.ts** | Product, ProductApiShape, ProductsApiResponse, AddProductModel, ResponseProductDelete, Category, Dimensions, Review, Meta |
| **user.dto.ts** | IUser, IUsers |
| **cart.dto.ts** | Cart, CartProduct, Cartable, CartsByUserId, AddToCartRequest, CartResponse |
| **checkout.dto.ts** | Order, OrderList, BillingDetails, CheckoutRequestDto, CheckoutResponseDto |

Definitions are re-exported from the feature modules (e.g. `@auth-module/types/...`, `@product-module/types/product`). Only **CheckoutRequestDto** and **CheckoutResponseDto** are defined directly here for the checkout API contract.

## Usage

- **API services** — Use these types for method parameters and return types (e.g. `Observable<LoginResponse>`).
- **Components and facades** — Use them for payloads, API responses, and any data that crosses the API boundary.
- **Tests** — Use the same types so mocks and fake data match the real contract. See `@test-utils/fake-data` for factories that return these shapes.

## Changing or adding DTOs

- **Existing backend contract:** Prefer updating the type in the owning module (e.g. `auth-module/types/login/login.response.ts`) and keep the re-export in the corresponding `*.dto.ts`. Then all consumers via `@app-types/dto` get the update.
- **New endpoint or field:** Add the type in the right module (or in `checkout.dto.ts` for checkout-specific DTOs), then export it from the right `*.dto.ts` and from `index.ts`.

If you later generate types from OpenAPI/Swagger, you can replace or supplement these files with generated types and keep importing from `@app-types/dto` so the rest of the app stays unchanged.
