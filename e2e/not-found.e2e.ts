import { expect, test } from '@playwright/test';

test.describe('404 Not Found', () => {
  test('unknown route shows 404 page', async ({ page }) => {
    await page.goto('/unknown-page', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Products Page' })).toBeVisible();
  });

  test('from 404 "Go Products Page" redirects to login when not authenticated', async ({
    page,
  }) => {
    await page.goto('/no-such-route');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await page.getByRole('button', { name: 'Go Products Page' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });
});
