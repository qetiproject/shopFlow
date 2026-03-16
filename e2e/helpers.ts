import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/** Asserts current page is login and LoginTitle is visible. */
export async function expectLoginPage(page: Page, timeout = 10_000): Promise<void> {
  await expect(page).toHaveURL(/\/login/, { timeout });
  await expect(page.getByTestId('LoginTitle')).toBeVisible({ timeout });
}
