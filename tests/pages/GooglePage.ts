import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GooglePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto('https://www.google.com');
    }

    async getTitle() {
        return this.page.title();
    }

    async acceptCookies() {
        try {
            await this.page.getByRole('button', { name: 'Accept all' }).click();
        } catch (e) {
            // Cookie dialog might not appear, continue
        }
    }

    async search(query: string) {
        await this.page.getByRole('combobox', { name: 'Search' }).fill(query);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }

    async getSearchResults() {
        return this.page.getByRole('main');
    }
} 