import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { AuthFacade } from '@auth-module/services/auth.facade';
import { TokenService } from '@auth-module/services/token.service';
import { UserStorage } from '@auth-module/services/user.storage';
import { MessagesService } from '@core/services/messages.service';
import { firstValueFrom, of, ReplaySubject, throwError } from 'rxjs';
import { AuthEffects } from './auth.effect';
import * as AuthActions from './auth.actions';

describe('AuthEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: AuthEffects;
  let authFacade: jest.Mocked<Pick<AuthFacade, 'registerUser' | 'loginUser'>>;
  let router: jest.Mocked<Pick<Router, 'navigate' | 'navigateByUrl'>>;
  let tokenService: jest.Mocked<Pick<TokenService, 'saveToken' | 'getToken' | 'clear'>>;
  let userStorage: jest.Mocked<Pick<UserStorage, 'saveUser' | 'getUser' | 'clear'>>;

  beforeEach(() => {
    actions$ = new ReplaySubject<Action>(1);
    authFacade = {
      registerUser: jest.fn(),
      loginUser: jest.fn(),
    };
    router = { navigate: jest.fn(), navigateByUrl: jest.fn() };
    tokenService = { saveToken: jest.fn(), getToken: jest.fn(), clear: jest.fn() };
    userStorage = { saveUser: jest.fn(), getUser: jest.fn(), clear: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$.asObservable()),
        { provide: AuthFacade, useValue: authFacade },
        { provide: MessagesService, useValue: { showMessage: jest.fn() } },
        { provide: Router, useValue: router },
        { provide: TokenService, useValue: tokenService },
        { provide: UserStorage, useValue: userStorage },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('registerUser$', () => {
    it('dispatches registerUserSuccess when facade succeeds', async () => {
      const payload = { emailId: 'a@b.com', fullName: 'A', password: 'p' };
      const response = {
        message: 'OK',
        result: true,
        data: { userId: 1, emailId: 'a@b.com', fullName: 'A' },
      };

      (authFacade.registerUser as jest.Mock).mockReturnValue(of(response));

      const resultPromise = firstValueFrom(effects.registerUser$);
      actions$.next(AuthActions.registerUser({ payload }));

      const result = await resultPromise;
      expect(result).toEqual(AuthActions.registerUserSuccess({ data: response }));
      expect(userStorage.saveUser).toHaveBeenCalledWith({
        userId: 1,
        emailId: 'a@b.com',
        fullName: 'A',
      });
    });

    it('dispatches registerUserFailure when facade errors', async () => {
      const payload = { emailId: 'a@b.com', fullName: 'A', password: 'p' };
      (authFacade.registerUser as jest.Mock).mockReturnValue(
        throwError(() => new Error('Server error')),
      );

      const resultPromise = firstValueFrom(effects.registerUser$);
      actions$.next(AuthActions.registerUser({ payload }));

      const result = await resultPromise;
      expect(result).toEqual(
        AuthActions.registerUserFailure({ error: 'Server error' }),
      );
    });
  });

  describe('redirectAfterRegister$', () => {
    it('navigates to /login when result is true', async () => {
      const action = AuthActions.registerUserSuccess({
        data: {
          message: 'OK',
          result: true,
          data: { userId: 1, emailId: 'a@b.com', fullName: 'A' },
        },
      });

      const resultPromise = firstValueFrom(effects.redirectAfterRegister$);
      actions$.next(action);
      await resultPromise;

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('loginUser$', () => {
    it('dispatches loginUserSuccess and saves token when facade succeeds', async () => {
      const payload = { emailId: 'u@mail.com', password: 'p' };
      const response = {
        message: 'OK',
        result: true,
        data: { userId: 2, emailId: 'u@mail.com', token: 'jwt123' },
      };

      (authFacade.loginUser as jest.Mock).mockReturnValue(of(response));
      (userStorage.getUser as jest.Mock).mockReturnValue(null);

      const resultPromise = firstValueFrom(effects.loginUser$);
      actions$.next(AuthActions.loginUser({ payload }));

      const result = await resultPromise;
      expect(result).toEqual(
        AuthActions.loginUserSuccess({
          data: {
            message: 'OK',
            result: true,
            data: { userId: 2, emailId: 'u@mail.com' },
          },
        }),
      );
      expect(tokenService.saveToken).toHaveBeenCalledWith('jwt123');
      expect(userStorage.saveUser).toHaveBeenCalledWith({
        userId: 2,
        emailId: 'u@mail.com',
        fullName: null,
      });
    });

    it('dispatches loginUserFailure when facade errors', async () => {
      const payload = { emailId: 'u@mail.com', password: 'p' };
      (authFacade.loginUser as jest.Mock).mockReturnValue(
        throwError(() => new Error('Invalid')),
      );

      const resultPromise = firstValueFrom(effects.loginUser$);
      actions$.next(AuthActions.loginUser({ payload }));

      const result = await resultPromise;
      expect(result).toEqual(
        AuthActions.loginUserFailure({ error: 'Invalid' }),
      );
    });
  });

  describe('redirectAfterLogin$', () => {
    it('navigates to product/list when result is true', async () => {
      const action = AuthActions.loginUserSuccess({
        data: {
          message: 'OK',
          result: true,
          data: { userId: 1, emailId: 'u@mail.com' },
        },
      });

      const resultPromise = firstValueFrom(effects.redirectAfterLogin$);
      actions$.next(action);
      await resultPromise;

      expect(router.navigate).toHaveBeenCalledWith(['product/list']);
    });
  });

  describe('logoutUser$', () => {
    it('clears token, storage and navigates to /login', async () => {
      const resultPromise = firstValueFrom(effects.logoutUser$);
      actions$.next(AuthActions.logoutUser());
      await resultPromise;

      expect(tokenService.clear).toHaveBeenCalled();
      expect(userStorage.clear).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

  describe('checkAuth$', () => {
    it('dispatches checkAuthSuccess when token exists', async () => {
      (tokenService.getToken as jest.Mock).mockReturnValue('token');

      const resultPromise = firstValueFrom(effects.checkAuth$);
      actions$.next(AuthActions.checkAuth());

      const result = await resultPromise;
      expect(result).toEqual(AuthActions.checkAuthSuccess());
    });

    it('dispatches checkAuthFailure when no token', async () => {
      (tokenService.getToken as jest.Mock).mockReturnValue(null);

      const resultPromise = firstValueFrom(effects.checkAuth$);
      actions$.next(AuthActions.checkAuth());

      const result = await resultPromise;
      expect(result).toEqual(AuthActions.checkAuthFailure());
    });
  });
});
