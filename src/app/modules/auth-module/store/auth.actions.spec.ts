import type { CreateUserRequest, LoginRequest } from '@app-types/dto';
import type { LoginStoreResponse } from '@auth-module/store/auth.store';
import * as AuthActions from './auth.actions';

describe('Auth Actions', () => {
  describe('registerUser', () => {
    it('creates action with payload', () => {
      const payload = {
        emailId: 'test@mail.com',
        fullName: 'Test User',
        password: 'secret',
      } as Omit<CreateUserRequest, 'userId'>;

      const action = AuthActions.registerUser({ payload });

      expect(action.type).toBe('[Auth] Register User');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('registerUserSuccess', () => {
    it('creates action with data', () => {
      const data = {
        message: 'OK',
        result: true,
        data: { userId: 1, emailId: 'a@b.com', fullName: 'A', password: 'x' },
      };

      const action = AuthActions.registerUserSuccess({ data });

      expect(action.type).toBe('[Auth] Register User Success');
      expect(action.data).toEqual(data);
    });
  });

  describe('registerUserFailure', () => {
    it('creates action with error', () => {
      const action = AuthActions.registerUserFailure({ error: 'Failed' });

      expect(action.type).toBe('[Auth] Register User Failure');
      expect(action.error).toBe('Failed');
    });
  });

  describe('loginUser', () => {
    it('creates action with payload', () => {
      const payload: LoginRequest = { emailId: 'u@mail.com', password: 'pass' };

      const action = AuthActions.loginUser({ payload });

      expect(action.type).toBe('[Auth] login User');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('loginUserSuccess', () => {
    it('creates action with data', () => {
      const data: LoginStoreResponse = {
        message: 'OK',
        result: true,
        data: { userId: 2, emailId: 'u@mail.com' },
      };

      const action = AuthActions.loginUserSuccess({ data });

      expect(action.type).toBe('[Auth] Login User Success');
      expect(action.data).toEqual(data);
    });
  });

  describe('loginUserFailure', () => {
    it('creates action with error', () => {
      const action = AuthActions.loginUserFailure({ error: 'Invalid credentials' });

      expect(action.type).toBe('[Auth] Login User Failure');
      expect(action.error).toBe('Invalid credentials');
    });
  });

  describe('logoutUser', () => {
    it('creates action without payload', () => {
      const action = AuthActions.logoutUser();

      expect(action.type).toBe('[Auth] Logout User');
    });
  });

  describe('checkAuth', () => {
    it('creates action', () => {
      const action = AuthActions.checkAuth();

      expect(action.type).toBe('[Auth] Check Auth');
    });
  });

  describe('checkAuthSuccess', () => {
    it('creates action', () => {
      const action = AuthActions.checkAuthSuccess();

      expect(action.type).toBe('[Auth] Check Auth Success');
    });
  });

  describe('checkAuthFailure', () => {
    it('creates action', () => {
      const action = AuthActions.checkAuthFailure();

      expect(action.type).toBe('[Auth] Check Auth Failure');
    });
  });
});
