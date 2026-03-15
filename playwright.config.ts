import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:4200';

export default defineConfig({
  testDir: 'e2e',

  testMatch: /.*\.e2e\.ts/,

  workers: 1,

  retries: 0,

  timeout: 15_000,
  expect: { timeout: 5_000 },

  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    baseURL: BASE_URL,

    screenshot: 'only-on-failure',

    video: 'on-first-retry',
  },

  webServer: {
    command: 'npm run start',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
