import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as AuthActions from '@auth-module';
import { AuthFacade, LoginStoreResponse, TokenService, UserStorage } from "@auth-module";
import { MessagesService } from "@core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessageSeverity } from "@types";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class AuthEffects {
    actions$ = inject(Actions);
    authFacade = inject(AuthFacade);
    #messages = inject(MessagesService);
    #router = inject(Router);
    #tokenService = inject(TokenService);
    #userStorage = inject(UserStorage);

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.registerUser),
            switchMap(({payload}) =>
                this.authFacade.registerUser({
                    ...payload,
                    userId: Math.floor(Math.random() * 100000)
                }).pipe(
                    map((response) => {
                        this.#userStorage.saveUser({
                            userId: response.data.userId,
                            emailId: response.data.emailId, 
                            fullName: response.data.fullName
                        });
                        return AuthActions.registerUserSuccess({ data: response })
                    }),
                    catchError(error => of(AuthActions.registerUserFailure({ error })))
                )
            )
        )
    );

    redirectAfterRegister$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(AuthActions.registerUserSuccess),
            tap((action) => {
                if (action.data.result) {
                    this.#router.navigate(['/login']);
            }
            })
        ),
        { dispatch: false }
    );

    toastAfterAuth$ = createEffect(
    () =>
        this.actions$.pipe(
            ofType(
                AuthActions.registerUserSuccess, 
                AuthActions.registerUserFailure,
                AuthActions.loginUserSuccess, 
                AuthActions.loginUserFailure
            ),
            tap((action) => {
                if ('data' in action) {
                    this.#messages.showMessage({
                        text: action.data.message,
                        severity: action.data.result
                            ? MessageSeverity.Success
                            : MessageSeverity.Error,
                    });
                }

                if ('error' in action) {
                    this.#messages.showMessage({
                        text: action.error,
                        severity: MessageSeverity.Error,
                    });
                }
            })
        ),
        { dispatch: false }
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginUser),
            switchMap(({payload}) => 
                this.authFacade.loginUser(payload).pipe(
                    map(response => {
                        this.#tokenService.saveToken(response.data.token);
                        const user = this.#userStorage.getUser();
                        if(!user) {
                            this.#userStorage.saveUser({
                                userId: response.data.userId,   
                                emailId: response.data.emailId,
                                fullName: null
                            })
                        }
                        const data: LoginStoreResponse = {
                            message: response.message,
                            result: response.result,
                            data: {
                                userId: response.data.userId,
                                emailId: response.data.emailId,
                            }
                        }
                        return AuthActions.loginUserSuccess({data})
                    }),
                    catchError(error => of(AuthActions.loginUserFailure({ error})))
                )
            )
        )
    );

    redirectAfterLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginUserSuccess),
            tap((action) => {
                if(action.data.result) {
                    this.#router.navigate(['/dashboard'])
                }
            })
        ),
        { dispatch: false }
    );

    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logoutUser),
            tap(() => {
                this.#tokenService.clear();
                this.#userStorage.clear();
                this.#router.navigateByUrl('/login');
            })
        ),
        { dispatch: false }
    );

    checkAuth$ = createEffect(() =>     
        this.actions$.pipe(     
            ofType(AuthActions.checkAuth),
            map(() => {     
                const token = this.#tokenService.getToken();  
                if (token) {
                    return AuthActions.checkAuthSuccess();
                } else {
                    return AuthActions.checkAuthFailure();
                }       
            })     
        )     
    );
}