import { expect, test } from '@playwright/test';
import { expectLoginPage } from './helpers';

test.describe('404 Not Found', () => {
  test('unknown route shows 404 page', async ({ page }) => {
    await page.goto('/unknown-page', { waitUntil: 'load' });
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Products Page' })).toBeVisible();
  });

  test('from 404 "Go Products Page" redirects to login when not authenticated', async ({
    page,
  }) => {
    await page.goto('/no-such-route', { waitUntil: 'load' });
    await expect(page.getByText('404')).toBeVisible();
    await page.getByRole('button', { name: 'Go Products Page' }).click();
    await expectLoginPage(page);
  });
});
