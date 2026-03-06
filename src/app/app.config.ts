import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthEffects } from '@auth-module/store/auth.effect';
import { AuthReducer } from '@auth-module/store/auth.reducer';
import { environment } from '@env';
import { AuthInterceptor, GlobalHttpErrorInterceptor, LoadingInterceptor } from '@core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
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
