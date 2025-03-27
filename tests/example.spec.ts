import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('google search', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com');

  // Verify the page title
  await expect(page).toHaveTitle(/Google/);

  // Accept cookies if the dialog appears (common in some regions)
  try {
    await page.getByRole('button', { name: 'Accept all' }).click();
  } catch (e) {
    // Cookie dialog might not appear, continue with the test
  }

  // Type into the search box
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright testing');

  // Press Enter to search
  await page.keyboard.press('Enter');

  // Wait for search results to load
  await page.waitForLoadState('networkidle');

  // Verify that search results are visible
  await expect(page.getByRole('main')).toBeVisible();
});
