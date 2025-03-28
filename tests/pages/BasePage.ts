import { Page } from '@playwright/test';

export abstract class BasePage {
    constructor(protected page: Page) {}

    abstract goto(): Promise<void>;
    
    async getTitle(): Promise<string> {
        return this.page.title();
    }
} 