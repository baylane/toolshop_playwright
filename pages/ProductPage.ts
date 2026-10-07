import { test, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly searchQuery: Locator;
    readonly searchButton: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchQuery = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit')
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('product-price')
    }

    async goto() {
        await this.page.goto('/')
    }

    async filterByCategory(category: string) {
        await this.page.getByLabel(category).check()
    }

    async searchproduct(search: string) {
        await test.step(`Search for ${search}`, async () => {
            await this.searchQuery.fill(search);
            await this.searchButton.click();
        })
    }
}