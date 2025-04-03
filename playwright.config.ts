import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  
  fullyParallel: false,
  
  forbidOnly: !!process.env.CI,
  
  retries: process.env.CI ? 2 : 0,
  
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['list']
  ],
  
  use: {

    baseURL: 'https://www.google.com',
    
    trace: 'on-first-retry',
   
    screenshot: 'only-on-failure',
    
    video: 'retain-on-failure',
    
    viewport: { width: 1280, height: 720 },
    
    navigationTimeout: 30000,
    
    actionTimeout: 15000
  },
  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
          ]
        }
      },
    },

    
  ],

  webServer: undefined,
});
