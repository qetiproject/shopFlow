/**
 * Auth API request/response DTOs (shared contract with backend).
 * Re-exported from auth module for single import source.
 */
export type { CreateUserRequest } from '@auth-module/types/create/create-user.request';
export type { CreateUserResponse } from '@auth-module/types/create/create-user.response';
export type { LoginRequest } from '@auth-module/types/login/login.request';
export type {
  LoginResponse,
  AuthTokens,
  AuthUser,
} from '@auth-module/types/login/login.response';
export type { ResetPasswordRequest } from '@auth-module/types/reset-password.request';
