import { test, expect } from '@playwright/test';
import { PageFactory, PageType } from './pages/PageFactory';

test('has title', async ({ page }) => {
  const playwrightPage = PageFactory.createPage(PageType.PLAYWRIGHT, page);
  await playwrightPage.goto();
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  const playwrightPage = PageFactory.createPage(PageType.PLAYWRIGHT, page);
  await playwrightPage.goto();
  await playwrightPage.clickGetStarted();
  const heading = await playwrightPage.getInstallationHeading();
  await expect(heading).toBeVisible();
});

test('google search', async ({ page }) => {
  const googlePage = PageFactory.createPage(PageType.GOOGLE, page);
  await googlePage.goto();
  await expect(page).toHaveTitle(/Google/);
  await googlePage.acceptCookies();
  await googlePage.search('Playwright testing');
  const searchResults = await googlePage.getSearchResults();
  await expect(searchResults).toBeVisible();
});
