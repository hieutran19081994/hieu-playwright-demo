import { Page } from '@playwright/test';
import { PlaywrightPage } from './PlaywrightPage';
import { GooglePage } from './GooglePage';

export enum PageType {
    PLAYWRIGHT = 'playwright',
    GOOGLE = 'google'
}

export class PageFactory {
    static createPage(pageType: PageType.PLAYWRIGHT, page: Page): PlaywrightPage;
    static createPage(pageType: PageType.GOOGLE, page: Page): GooglePage;

    static createPage(pageType: PageType, page: Page) {
        switch (pageType) {
            case PageType.PLAYWRIGHT:
                return new PlaywrightPage(page);
            case PageType.GOOGLE:
                return new GooglePage(page);
            default:
                throw new Error(`Page type ${pageType} is not supported`);
        }
    }
} 