import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlaywrightPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto('https://playwright.dev/');
    }

    async getTitle() {
        return this.page.title();
    }

    async clickGetStarted() {
        await this.page.getByRole('link', { name: 'Get started' }).click();
    }

    async getInstallationHeading() {
        return this.page.getByRole('heading', { name: 'Installation' });
    }
} 