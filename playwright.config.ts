import { defineConfig, devices } from '@playwright/test';

/** Local: default localhost. Server/CI: set BASE_URL or E2E_BASE_URL to deployed app URL. */
const BASE_URL =
  process.env.BASE_URL ?? process.env.E2E_BASE_URL ?? 'http://localhost:4200';

export default defineConfig({
  testDir: 'e2e',

  testMatch: /.*\.e2e\.ts/,

  workers: 1,

  retries: 0,

  timeout: 25_000,
  expect: { timeout: 10_000 },

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
