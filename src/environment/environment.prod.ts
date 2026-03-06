import { Environment } from './environment.model';

export const environment = {
  production: true,
  userApp: 'https://api.freeprojectapi.com/api/UserApp',
  product: 'https://dummyjson.com/products',
  cart: 'https://dummyjson.com/carts',
  stripe: {
    publicKey:
      'pk_test_51LAqxvIkjbUYZrPqgjebGNlXN5002Zbv5ndAwODB2g22C3IIHm39IhanjV81vnvXuKBOxznLLroQNwUJmWz9sICH00hjanaBYT',
  },
  api: 'https://stripe-backend-wheat.vercel.app/api',
} satisfies Environment;
