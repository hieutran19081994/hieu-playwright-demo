import { BasePage } from './BasePage';

export class GooglePage extends BasePage {
   
    private readonly searchInput = 'textarea[name="q"]';
    private readonly searchSuggestions = 'ul[role="listbox"] li';
    private readonly captchaPage = 'form[action*="sorry"]';
    private readonly acceptCookies = 'button:has-text("Accept all")';

    
    async goto(): Promise<void> {
        await super.goto('https://www.google.com');
        await this.handleCookies();
        await this.waitForElement(this.searchInput, 30000);
    }

    private async handleCookies(): Promise<void> {
        try {
            const acceptButton = await this.page.$(this.acceptCookies);
            if (acceptButton) {
                await acceptButton.click();
                await this.page.waitForTimeout(1000);
            }
        } catch (error) {
            console.log('No cookie banner found or error handling cookies:', error);
        }
    }

    /**
     * @param query 
     */
    async search(query: string): Promise<void> {
        try {
            await this.page.fill(this.searchInput, '');
            await this.page.type(this.searchInput, query, { delay: 100 });
            
            const navigationPromise = this.page.waitForNavigation({ 
                waitUntil: 'networkidle',
                timeout: 60000 
            });
            await this.page.keyboard.press('Enter');
            await navigationPromise;
            
            const isCaptcha = await this.page.$(this.captchaPage);
            if (isCaptcha) {
                throw new Error('Google has detected automated traffic. Please solve the CAPTCHA manually.');
            }
            
            await this.waitForPageLoad();
        } catch (error) {
            console.error('Failed to perform search:', error);
            throw error;
        }
    }

    /**
     * @returns
     */
    async getSearchSuggestions(): Promise<string[]> {
        try {
            await this.waitForElement(this.searchSuggestions, 30000);
            const suggestions = await this.page.$$eval(
                this.searchSuggestions,
                elements => elements.map(el => el.textContent || '')
            );
            return suggestions;
        } catch (error) {
            console.error('Failed to get search suggestions:', error);
            throw error;
        }
    }
} 