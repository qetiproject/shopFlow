import { inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { checkAuth } from '@auth-module';
import { Store } from '@ngrx/store';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideAppInitializer(() => {
      const store = inject(Store);
      store.dispatch(checkAuth());
    })
  ]
}).catch(err => console.error(err));
