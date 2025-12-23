import { AuthState } from '@auth';
import { createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.actions';

export const initialAuthState: AuthState = {
    loading: false,
    isLoggedIn: false,
    message: null,
    isSuccess: false,
    user: null
};

export const AuthReducer = createReducer(
    initialAuthState,
    on(AuthActions.registerUser, (state) =>({
        ...state,
        loading: true,
    })),
    on(AuthActions.registerUserSuccess, (state, { data }) =>({
        ...state,
        loading: false,
        message: data.message,
        isSuccess: data.result,
        user: {
            userId: data.data?.userId,
            emailId: data.data?.emailId,
            fullName: data.data?.fullName
        }
    })),
    on(AuthActions.registerUserFailure, (state, { error }) =>({
        ...state,
        loading: false,
        message: error,
        isSuccess: false,
        user: null
    })),
    on(AuthActions.loginUser, (state) =>({
        ...state,
        loading: true,
    })),
    on(AuthActions.loginUserSuccess, (state, { data }) => ({
        ...state,
        isLoggedIn: true,
        loading: false,
        message: data.message,
        isSuccess: data.result,
        user: {
            emailId: data.data?.emailId,
            userId: data.data?.userId,
        }
    })),
    on(AuthActions.loginUserFailure, (state, {error}) => ({
        ...state,
        loading: false,
        isLoggedIn: false,
        message: error,
        isSuccess: false
    })),
    on(AuthActions.logoutUser, (state) => ({
        ...state,
        loading: false,
        isLoggedIn: false,
        isSuccess: true,
        user: null
    })),
    on(AuthActions.checkAuth, (state) => ({
        ...state,
        loading: true,     
    })),
    on(AuthActions.checkAuthSuccess, (state,) => ({
        ...state,   
        loading: false,
        isLoggedIn: true,
        isSuccess: true,
    })),        
    on(AuthActions.checkAuthFailure, (state) => ({
        ...state,   
        loading: false, 
        isLoggedIn: false,
        isSuccess: false,
    })),
)