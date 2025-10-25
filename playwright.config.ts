import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test/playwright',
  reporter: [
    ['list'], // shows output in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // generates report
  ],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
});
