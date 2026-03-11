/**
 * API endpoint path constants (path segments only, no base URL).
 * Base URLs come from environment (userApp, product, cart, api).
 */
export const Endpoints = {
  auth: {
    createUser: '/CreateNewUser',
    login: '/login',
    sendResetOtp: '/send-reset-otp',
    verifyOtpResetPassword: '/verify-otp-reset-password',
  },
  user: {
    searchUsers: '/searchUsers',
  },
  product: {
    root: '',
    search: '/search',
    categories: '/categories',
    category: (slug: string) => `/category/${slug}`,
    byId: (id: number) => `/${id}`,
    add: '/add',
  },
  checkout: {
    create: '/checkout',
  },
} as const;
