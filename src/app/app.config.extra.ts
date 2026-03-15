import { provideStoreDevtools } from '@ngrx/store-devtools';

/** Dev-only providers (Store Devtools). Replaced by app.config.extra.prod.ts in production build. */
export const extraProviders = [
  provideStoreDevtools({
    maxAge: 25,
    logOnly: false,
  }),
];
