import { expect, test } from '@playwright/test';

test.describe('404 Not Found', () => {
  test('unknown route shows 404 page', async ({ page }) => {
    test.setTimeout(25_000);
    await page.goto('/unknown-page', { waitUntil: 'load' });
    await expect(page.getByText('404')).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Products Page' })).toBeVisible();
  });

  test('from 404 "Go Products Page" redirects to login when not authenticated', async ({
    page,
  }) => {
    test.setTimeout(25_000);
    await page.goto('/no-such-route', { waitUntil: 'load' });
    await expect(page.getByText('404')).toBeVisible({ timeout: 20_000 });
    await page.getByRole('button', { name: 'Go Products Page' }).click();
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
    await expect(page.getByTestId('LoginTitle')).toBeVisible({ timeout: 10_000 });
  });
});
