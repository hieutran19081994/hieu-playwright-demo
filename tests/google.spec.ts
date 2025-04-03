import { test, expect } from '@playwright/test';
import { GooglePage } from './pages/GooglePage';

test.describe('Google Search Tests', () => {
    let googlePage: GooglePage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000); // Set timeout to 2 minutes
        googlePage = new GooglePage(page);
        await googlePage.goto();
    });

    test('should perform a basic search and verify results', async () => {
        const searchQuery = 'Playwright testing framework';
        await googlePage.search(searchQuery);
        
        // Verify navigation completed successfully
        await expect(googlePage.page).toHaveURL(/search/);
    });

    test('should show search suggestions while typing', async () => {
        await googlePage.page.fill('textarea[name="q"]', 'Playwright');
        await googlePage.page.waitForTimeout(1000); // Wait for suggestions to appear
        
        const suggestions = await googlePage.getSearchSuggestions();
        expect(suggestions.length).toBeGreaterThan(0);
        expect(suggestions[0]).toContain('Playwright');
    });

    test('should handle empty search query', async () => {
        await googlePage.search('');
        await expect(googlePage.page).toHaveURL(/search/);
    });

    test('should handle special characters in search', async () => {
        const searchQuery = 'Playwright @#$%^&*()';
        await googlePage.search(searchQuery);
        await expect(googlePage.page).toHaveURL(/search/);
    });

    test('should handle long search query', async () => {
        const searchQuery = 'What is Playwright and how does it compare to other testing frameworks like Selenium and Cypress?';
        await googlePage.search(searchQuery);
        await expect(googlePage.page).toHaveURL(/search/);
    });

    test('should show search suggestions for partial queries', async () => {
        const partialQueries = ['Play', 'Playw', 'Playwr'];
        
        for (const query of partialQueries) {
            await googlePage.page.fill('textarea[name="q"]', query);
            await googlePage.page.waitForTimeout(1000); // Wait for suggestions to appear
            const suggestions = await googlePage.getSearchSuggestions();
            expect(suggestions.length).toBeGreaterThan(0);
            expect(suggestions[0]).toContain(query);
        }
    });

    test('should handle multiple searches in sequence', async () => {
        const searchQueries = [
            'Playwright',
            'Selenium',
            'Cypress'
        ];
        
        for (const query of searchQueries) {
            await googlePage.search(query);
            await expect(googlePage.page).toHaveURL(/search/);
            await googlePage.page.waitForTimeout(2000); // Add delay between searches
        }
    });
}); 