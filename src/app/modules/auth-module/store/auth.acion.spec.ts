import * as AuthActions from '@auth-module';
import { LoginRequest, LoginResponse } from '@auth-module';

describe('Auth Actions', () => {
  it('should create loginUser action', () => {
    const payload: LoginRequest = { emailId: 'keti@gmail.com', password: '12345678' };

    const action = AuthActions.loginUser({ payload });

    expect(action.type).toBe('[Auth] login User');
    expect(action.payload).toEqual(payload);
  });

  it('should create loginUserSuccess action', () => {
    const data: LoginResponse = {
        message: 'success',
        result: true,
        data: {
            userId: 1,
            emailId: 'keti@gmail.com',
            token: 'token',
            refreshToken: 'refreshToken'
        }
    }

    const action = AuthActions.loginUserSuccess({ data });

    expect(action.type).toBe('[Auth] Login User Success');
    expect(action.data).toEqual(data);
  });

  it('should create loginUserFailure action', () => {
    const error = 'Invalid credentials';

    const action = AuthActions.loginUserFailure({ error });

    expect(action.type).toBe('[Auth] Login User Failure');
    expect(action.error).toBe(error);
  });
});
