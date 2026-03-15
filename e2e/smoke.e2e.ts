import { expect, test } from '@playwright/test';
import { BASE_URL } from './env';

test('app loads at base URL', async ({ page }) => {
  await page.goto('/');
  expect(page.url()).toMatch(new RegExp(`^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
});
