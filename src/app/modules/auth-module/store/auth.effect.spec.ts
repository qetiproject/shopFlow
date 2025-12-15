import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import * as AuthActions from '@auth-module';
import { AuthEffects, AuthFacade, TokenService, UserStorage } from '@auth-module';
import { MessagesService } from '@core';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authFacade: jasmine.SpyObj<AuthFacade>;
  let messages: jasmine.SpyObj<MessagesService>;
  let router: jasmine.SpyObj<Router>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let userStorage: jasmine.SpyObj<UserStorage>;

  beforeEach(() => {
    authFacade = jasmine.createSpyObj('AuthFacade', ['loginUser']);
    tokenService = jasmine.createSpyObj('TokenService', ['saveToken']);
    userStorage = jasmine.createSpyObj('UserStorage', ['getUser', 'saveUser']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    messages = jasmine.createSpyObj('MessagesService', ['showMessage']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthFacade, useValue: authFacade },
        { provide: MessagesService, useValue: messages },
        { provide: Router, useValue: router },
        { provide: TokenService, useValue: tokenService },
        { provide: UserStorage, useValue: userStorage },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('dispatches loginUserSuccess on success', (done) => {
    const response = {
        message: 'Success',
        result: true,
        data: { 
            token: 'token', 
            userId: 1, 
            emailId: 'keti@gmail.com',
            refreshToken: 'refreshToken'
        }
    };

    authFacade.loginUser.and.returnValue(of(response));
    userStorage.getUser.and.returnValue(null);

    actions$ = of(AuthActions.loginUser({ payload: {
        emailId: 'keti@gmail.com',
        password: '12345678', 
    } }));

    effects.loginUser$.subscribe(action => {
        expect(tokenService.saveToken).toHaveBeenCalledWith('token');
        expect(userStorage.saveUser).toHaveBeenCalled();
        expect(action).toEqual(
        AuthActions.loginUserSuccess({
            data: {
            message: 'Success',
            result: true,
            data: { userId: 1, emailId: 'keti@gmail.com' }
            }
        })
        );
        done();
    });
  });

  it('dispatches loginUserFailure on error', (done) => {
    authFacade.loginUser.and.returnValue(
        throwError(() => 'Invalid credentials')
    );

    actions$ = of(AuthActions.loginUser({ payload: {
        emailId: 'keti@gmail.com',
        password: '12345678', 
    } }));

    effects.loginUser$.subscribe(action => {
        expect(action).toEqual(
        AuthActions.loginUserFailure({ error: 'Invalid credentials' })
        );
        done();
    });
    });

});
