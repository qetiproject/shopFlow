import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { GlobalHttpErrorInterceptor, LoadingInterceptor } from '@core';
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    // provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        // AuthInterceptor,
        LoadingInterceptor,
        GlobalHttpErrorInterceptor,
      ])
    ),
    provideStore(),
    provideEffects(),
    // provideStore({
    //   auth: AuthReducer,
    // }),
    // provideEffects([AuthEffects]),
    // provideStoreDevtools({
    //   maxAge: 25,
    //   logOnly: false
    // }),
  ]
};
