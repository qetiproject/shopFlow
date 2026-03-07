import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthEffects } from '@auth-module/store/auth.effect';
import { AuthReducer } from '@auth-module/store/auth.reducer';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { GlobalHttpErrorInterceptor } from '@core/interceptors/global-http-error-interceptor';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { environment } from '@env';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor, LoadingInterceptor, GlobalHttpErrorInterceptor]),
    ),
    provideStore({
      auth: AuthReducer,
    }),
    provideEffects([AuthEffects]),
    ...(!environment.production
      ? [
          provideStoreDevtools({
            maxAge: 25,
            logOnly: environment.production,
          }),
        ]
      : []),
  ],
};
