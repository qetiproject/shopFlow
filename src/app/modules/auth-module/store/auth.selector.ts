import { AuthState } from "@auth-module";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthResponse = createSelector(
    selectAuthState,
    (state: AuthState) => state
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);

export const selectAuthMessage = createSelector(
    selectAuthState,
    (state: AuthState) => state.message
);
export const selectCheckAuth = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoggedIn
);