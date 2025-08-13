import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for different environments */
  projects: [
    {
      name: 'localhost-dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      testMatch: /.*\.(dev|shared)\.spec\.ts/,
    },
    {
      name: 'static-build',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:8000',
      },
      testMatch: /.*\.(static|shared)\.spec\.ts/,
      dependencies: ['localhost-dev'], // Run after dev tests pass
    },
  ],

  /* Configure web servers for both environments */
  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000, // 2 minutes
    },
    {
      command: 'DEPLOY_TARGET=github-pages npm run build && npx serve out -p 8000 -s',
      url: 'http://localhost:8000',
      reuseExistingServer: !process.env.CI,
      timeout: 180 * 1000, // 3 minutes for build + serve
    },
  ],
});