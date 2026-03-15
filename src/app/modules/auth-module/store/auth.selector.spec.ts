import {
  selectAuthState,
  selectAuthResponse,
  selectAuthLoading,
  selectAuthMessage,
  selectCheckAuth,
} from '@auth-module/store/auth.selector';
import type { AuthState } from '@auth-module/store/auth.store';

describe('Auth Selectors', () => {
  const state = {
    auth: {
      loading: true,
      isLoggedIn: true,
      message: 'Hello',
      isSuccess: true,
      user: { userId: 1, emailId: 'u@mail.com', fullName: 'User' },
    } as AuthState,
  };

  it('selectAuthState returns auth slice', () => {
    expect(selectAuthState.projector(state.auth)).toBe(state.auth);
  });

  it('selectAuthResponse returns full auth state', () => {
    const result = selectAuthResponse.projector(state.auth);

    expect(result).toEqual(state.auth);
  });

  it('selectAuthLoading returns loading', () => {
    const result = selectAuthLoading.projector(state.auth);

    expect(result).toBe(true);
  });

  it('selectAuthMessage returns message', () => {
    const result = selectAuthMessage.projector(state.auth);

    expect(result).toBe('Hello');
  });

  it('selectCheckAuth returns isLoggedIn', () => {
    const result = selectCheckAuth.projector(state.auth);

    expect(result).toBe(true);
  });

  it('selectCheckAuth returns false when not logged in', () => {
    const loggedOutState = { ...state.auth, isLoggedIn: false };

    expect(selectCheckAuth.projector(loggedOutState)).toBe(false);
  });
});
