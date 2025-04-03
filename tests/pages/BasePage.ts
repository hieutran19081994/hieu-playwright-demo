import { Page } from '@playwright/test';

export class BasePage {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url The URL to navigate to
     */
    async goto(url: string): Promise<void> {
        try {
            await this.page.goto(url, { 
                waitUntil: 'networkidle',
                timeout: 60000 
            });
        } catch (error) {
            console.error(`Failed to navigate to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Wait for an element to be visible
     * @param selector The element selector
     * @param timeout Timeout in milliseconds
     */
    protected async waitForElement(selector: string, timeout = 30000): Promise<void> {
        try {
            await this.page.waitForSelector(selector, { 
                timeout,
                state: 'visible',
                strict: false
            });
        } catch (error) {
            console.error(`Element ${selector} not visible after ${timeout}ms:`, error);
            throw error;
        }
    }

    /**
     * Click on an element
     * @param selector The element selector
     */
    protected async click(selector: string): Promise<void> {
        try {
            await this.waitForElement(selector);
            await this.page.click(selector, { timeout: 30000 });
        } catch (error) {
            console.error(`Failed to click element ${selector}:`, error);
            throw error;
        }
    }

    /**
     * Fill text into an input field
     * @param selector The input field selector
     * @param text The text to fill
     */
    public async fill(selector: string, text: string): Promise<void> {
        try {
            await this.waitForElement(selector);
            await this.page.fill(selector, text, { timeout: 30000 });
        } catch (error) {
            console.error(`Failed to fill text into ${selector}:`, error);
            throw error;
        }
    }

    /**
     * Wait for page to be fully loaded
     */
    protected async waitForPageLoad(): Promise<void> {
        try {
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            console.error('Failed to wait for page load:', error);
            throw error;
        }
    }
} 