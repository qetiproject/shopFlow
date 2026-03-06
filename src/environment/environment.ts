import { Environment } from './environment.model';

export const environment = {
  production: false,
  userApp: '/UserApp',
  product: '/products',
  cart: '/carts',
  stripe: {
    publicKey:
      'pk_test_51LAqxvIkjbUYZrPqgjebGNlXN5002Zbv5ndAwODB2g22C3IIHm39IhanjV81vnvXuKBOxznLLroQNwUJmWz9sICH00hjanaBYT',
  },
  api: '/api',
} satisfies Environment;
