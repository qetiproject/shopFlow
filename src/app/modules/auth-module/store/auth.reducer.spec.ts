import * as AuthActions from '@auth-module/store/auth.actions';
import {
  AuthReducer,
  initialAuthState,
} from '@auth-module/store/auth.reducer';
import type { AuthState } from '@auth-module/store/auth.store';

describe('AuthReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = AuthReducer(undefined, { type: 'UNKNOWN' });

    expect(state).toEqual(initialAuthState);
  });

  it('sets loading true on registerUser', () => {
    const action = AuthActions.registerUser({
      payload: { emailId: 'a@b.com', fullName: 'A', password: 'p' },
    });
    const state = AuthReducer(initialAuthState, action);

    expect(state.loading).toBe(true);
  });

  it('updates state on registerUserSuccess', () => {
    const action = AuthActions.registerUserSuccess({
      data: {
        message: 'Created',
        result: true,
        data: { userId: 1, emailId: 'a@b.com', fullName: 'A' },
      },
    });
    const state = AuthReducer(
      { ...initialAuthState, loading: true },
      action,
    );

    expect(state.loading).toBe(false);
    expect(state.message).toBe('Created');
    expect(state.isSuccess).toBe(true);
    expect(state.user).toEqual({
      userId: 1,
      emailId: 'a@b.com',
      fullName: 'A',
    });
  });

  it('updates state on registerUserFailure', () => {
    const action = AuthActions.registerUserFailure({ error: 'Error' });
    const state = AuthReducer(
      { ...initialAuthState, loading: true, user: {} as AuthState['user'] },
      action,
    );

    expect(state.loading).toBe(false);
    expect(state.message).toBe('Error');
    expect(state.isSuccess).toBe(false);
    expect(state.user).toBeNull();
  });

  it('sets loading true on loginUser', () => {
    const action = AuthActions.loginUser({
      payload: { emailId: 'u@mail.com', password: 'p' },
    });
    const state = AuthReducer(initialAuthState, action);

    expect(state.loading).toBe(true);
  });

  it('updates state on loginUserSuccess', () => {
    const action = AuthActions.loginUserSuccess({
      data: {
        message: 'OK',
        result: true,
        data: { userId: 2, emailId: 'u@mail.com' },
      },
    });
    const state = AuthReducer(
      { ...initialAuthState, loading: true },
      action,
    );

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.message).toBe('OK');
    expect(state.isSuccess).toBe(true);
    expect(state.user).toEqual({ userId: 2, emailId: 'u@mail.com' });
  });

  it('updates state on loginUserFailure', () => {
    const action = AuthActions.loginUserFailure({ error: 'Invalid' });
    const state = AuthReducer(
      { ...initialAuthState, loading: true, isLoggedIn: true },
      action,
    );

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(false);
    expect(state.message).toBe('Invalid');
    expect(state.isSuccess).toBe(false);
  });

  it('resets auth state on logoutUser', () => {
    const prevState: AuthState = {
      ...initialAuthState,
      isLoggedIn: true,
      user: { userId: 1, emailId: 'u@mail.com' },
    };
    const state = AuthReducer(prevState, AuthActions.logoutUser());

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(false);
    expect(state.isSuccess).toBe(true);
    expect(state.user).toBeNull();
  });

  it('sets loading true on checkAuth', () => {
    const state = AuthReducer(initialAuthState, AuthActions.checkAuth());

    expect(state.loading).toBe(true);
  });

  it('sets isLoggedIn and loading on checkAuthSuccess', () => {
    const state = AuthReducer(
      { ...initialAuthState, loading: true },
      AuthActions.checkAuthSuccess(),
    );

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.isSuccess).toBe(true);
  });

  it('sets isLoggedIn false on checkAuthFailure', () => {
    const state = AuthReducer(
      { ...initialAuthState, loading: true, isLoggedIn: true },
      AuthActions.checkAuthFailure(),
    );

    expect(state.loading).toBe(false);
    expect(state.isLoggedIn).toBe(false);
    expect(state.isSuccess).toBe(false);
  });
});
