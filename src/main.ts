import { inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { checkAuth } from '@auth-module';
import { environment } from '@env';
import { Store } from '@ngrx/store';
import { provideNgxStripe } from 'ngx-stripe';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideZoneChangeDetection(),
    ...(appConfig.providers ?? []),
    provideAppInitializer(() => {
      const store = inject(Store);
      store.dispatch(checkAuth());
    }),
    provideNgxStripe(environment.stripe.publicKey),
  ],
}).catch((err) => console.error(err));
