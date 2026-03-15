import { expect, test } from '@playwright/test';
import { expectLoginPage } from './helpers';

test.describe('Auth module', () => {
  test('login page loads with title and form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
    await expect(page.getByTestId('LoginTitle')).toHaveText('Login');
    await expect(page.getByTestId('LoginSubmit')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
  });

  test('register page loads with title and form', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'domcontentloaded' });
    await page.waitForURL(/\/register/);
    await expect(page.getByTestId('RegisterTitle')).toBeVisible();
    await expect(page.getByTestId('RegisterTitle')).toContainText('Register');
    await expect(page.getByTestId('RegisterSubmit')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  });

  test('forgot password (send-reset-otp) page loads', async ({ page }) => {
    await page.goto('/send-reset-otp');
    await expect(page.getByTestId('ForgetPassTitle')).toBeVisible();
    await expect(page.getByTestId('ForgetPassTitle')).toHaveText('Forgot Password');
    await expect(page.getByRole('button', { name: 'Send Reset OTP' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Login' })).toBeVisible();
  });

  test('reset-password page loads with form', async ({ page }) => {
    await page.goto('/reset-password');
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByTestId('submit')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Send Reset OTP Again' })).toBeVisible();
  });

  test('navigation: Login -> Register -> Login', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByTestId('RegisterTitle')).toBeVisible();

    await page.getByRole('link', { name: 'Login' }).click();
    await expectLoginPage(page);
  });

  test('navigation: Login -> Forgot password -> Back to Login', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await expect(page).toHaveURL(/\/send-reset-otp/);
    await expect(page.getByTestId('ForgetPassTitle')).toBeVisible();

    await page.getByRole('link', { name: 'Back to Login' }).click();
    await expectLoginPage(page);
  });

  test('root path shows login when guest', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('LoginTitle')).toBeVisible();
  });
});
