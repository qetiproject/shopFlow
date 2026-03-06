export interface Environment {
  production: boolean;
  userApp: string;
  product: string;
  cart: string;
  stripe: {
    publicKey: string;
  };
  api: string;
}
