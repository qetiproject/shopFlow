import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse } from "@auth-module";
import { createAction, props } from "@ngrx/store";

export const registerUser = createAction(
    '[Auth] Register User',
    props<{payload: CreateUserRequest}>()
);

export const registerUserSuccess = createAction(
    '[Auth] Register User Success',
    props<{ data: CreateUserResponse}>()
);

export const registerUserFailure = createAction(
    '[Auth] Register User Failure',
    props<{error: string}>()
);

export const loginUser = createAction(
    '[Auth] login User',
    props<{ payload: LoginRequest}>()
);

export const loginUserSuccess = createAction(
    '[Auth] Login User Success',
    props<{ data: LoginResponse}>()
);

export const loginUserFailure = createAction(
    '[Auth] Login User Failure',
    props<{ error: string}>()
);

export const logoutUser = createAction('[Auth] Logout User');

export const checkAuth = createAction('[Auth] Check Auth');
export const checkAuthSuccess = createAction('[Auth] Check Auth Success');
export const checkAuthFailure = createAction('[Auth] Check Auth Failure');