import { devices } from '@playwright/test'
import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8811/',
    colorScheme: 'dark',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ],
  webServer: {
    command: process.env.CI
      ? 'cross-env PORT=8811 RUNNING_E2E=true yarn start:mocks'
      : 'cross-env PORT=8811 RUNNING_E2E=true yarn dev',
    port: 8811
  }
}

export default config
