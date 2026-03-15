import { expect, test } from '@playwright/test';

test('app loads at base URL', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/localhost:4200/);
});
