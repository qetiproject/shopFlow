import { test } from '@playwright/test';
import { expectLoginPage } from './helpers';

test.describe('Protected routes redirect to login when not authenticated', () => {
  const protectedUrls = [
    { path: '/product/list', name: 'product list' },
    { path: '/product/details/1', name: 'product detail' },
    { path: '/cart', name: 'cart' },
    { path: '/checkout/shipping-info', name: 'checkout shipping-info' },
    { path: '/checkout/orders', name: 'checkout orders' },
    { path: '/users', name: 'users list' },
    { path: '/users/profile/test%40example.com', name: 'user profile' },
  ] as const;

  for (const { path, name } of protectedUrls) {
    test(`${name} redirects to login`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await expectLoginPage(page);
    });
  }
});
