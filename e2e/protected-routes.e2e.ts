import { expect, test } from '@playwright/test';

/**
 * All routes under AuthGuard must redirect to login when user is not authenticated.
 */
test.describe('Protected routes redirect to login when not authenticated', () => {
  test('product list redirects to login', async ({ page }) => {
    await page.goto('/product/list');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });

  test('product detail redirects to login', async ({ page }) => {
    await page.goto('/product/details/1');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });

  test('cart redirects to login', async ({ page }) => {
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
    await expect(page.getByTestId('LoginTitle')).toBeVisible({ timeout: 10_000 });
  });

  test('checkout shipping-info redirects to login', async ({ page }) => {
    await page.goto('/checkout/shipping-info');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });

  test('checkout orders redirects to login', async ({ page }) => {
    await page.goto('/checkout/orders');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });

  test('users list redirects to login', async ({ page }) => {
    await page.goto('/users');
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });

  test('user profile redirects to login', async ({ page }) => {
    await page.goto('/users/profile/test%40example.com');
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    await expect(page.getByTestId('LoginTitle')).toBeVisible({ timeout: 10_000 });
  });
});
