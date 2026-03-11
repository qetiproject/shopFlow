# API

This document describes the backend APIs used by shopFlow and how the frontend calls them.

## Base URLs (environment)

| Key       | Development (proxy) | Production (example) |
|----------|----------------------|----------------------|
| `userApp`| `/UserApp`           | `https://api.freeprojectapi.com/api/UserApp` |
| `product`| `/products`         | `https://dummyjson.com/products` |
| `cart`   | `/carts`             | `https://dummyjson.com/carts` |
| `api`    | `/api`               | `https://stripe-backend-wheat.vercel.app/api` |

Development requests are proxied according to `src/proxy.conf.json` (e.g. `/UserApp` → freeprojectapi, `/products` and `/carts` → dummyjson, `/api` → localhost:4242 or your Stripe backend).

## Auth (userApp)

Base URL: `environment.userApp`.

| Method | Path | Description |
|--------|------|-------------|
| POST   | `/CreateNewUser` | Register; body: `CreateUserRequest`. Response: `CreateUserResponse`. |
| POST   | `/login` | Login; body: `LoginRequest`. Response: `LoginResponse` (includes `data.token`, `data.refreshToken`, `data.userId`, `data.emailId`). |
| POST   | `/send-reset-otp?emailId={email}` | Send OTP for password reset. |
| POST   | `/verify-otp-reset-password` | Verify OTP and set new password; body: `ResetPasswordRequest`. Response: plain text. |

**Auth flow:** Login/register return tokens; the app stores them (e.g. via `TokenService`) and sends `Authorization: Bearer <token>` on protected requests (see `AuthInterceptor` and protected endpoint list in `core`).

## User (userApp)

Base URL: `environment.userApp`.

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/searchUsers` | Query params: `searchText`, `pageNumber`, `pageSize`. Response: `UsersResponse` (paginated list of `UserResponse`). |

## Product (product)

Base URL: `environment.product` (e.g. DummyJSON `/products`).

| Method | Path | Description |
|--------|------|-------------|
| GET    | `/search` | Params: `q`, `limit`, `skip`. Response: `ProductsApiResponse<ProductApiShape>`. |
| GET    | `/{id}` | Single product. Response: `Product`. |
| GET    | `/categories` | Response: `Category[]`. |
| GET    | `/category/{slug}` | Params: `limit`, `skip`. Response: `ProductsApiResponse<ProductApiShape>`. |
| GET    | `` (root) | Params: `sortBy`, `order`, `limit`, `skip`. Response: `ProductsApiResponse<Product>`. |
| POST   | `/add` | Body: `AddProductRequest`. Response: same shape. |
| DELETE | `/{id}` | Response: `ProductDeleteResponse`. |

## Cart (cart)

Base URL: `environment.cart`. The app currently uses cart state in NgRx Signals and persistence via `CartStorage`; backend cart API (if used) would be called from services using the same base URL and `Endpoints` pattern.

## Checkout (api)

Base URL: `environment.api` (Stripe backend).

| Method | Path | Description |
|--------|------|-------------|
| POST   | `/checkout` | Body: `CheckoutRequest` (`items`: array of cart line items). Response: `CheckoutResponse` (`url`: Stripe Checkout session URL). Frontend redirects user to `url`. |

## Shared types (DTOs)

All request/response shapes used by the app are in `src/app/types/dto/` and re-exported from `@app-types/dto`. See `src/app/types/dto/README.md` for the list and import examples.

## Error handling

- **HTTP errors:** Caught by `GlobalHttpErrorInterceptor`. Status 0 or ≥400 are mapped to a user message via `toErrorMessage()` (see `core/http/http-utils.ts`) and shown in a toast. Standard messages for 401, 403, 404, 500 are in `ErrorMessages` enum.
- **Auth errors:** 401 can be used to clear token and redirect to login; the exact behavior is in the auth effect and guards.

## Adding or changing endpoints

1. Add or update path constants in `src/app/api/endpoints.ts`.
2. Use them in the appropriate API service (`ProductApi`, `AuthApiService`, etc.) with `ApiClient.get/post/...` and the correct base URL from `api.baseUrls`.
3. If the contract changes, update or add types in `src/app/types/dto/` and use them in the API service and consumers.
