import { test, expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly searchQuery: Locator;
    readonly searchButton: Locator;
    readonly productPrice: Locator;
    readonly sortProducts: Locator;
    readonly sortingComplete: Locator;
    readonly co2RatingBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchQuery = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit')
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('product-price');
        this.sortProducts = page.getByTestId('sort');
        this.sortingComplete = page.getByTestId('sorting_completed');
        this.co2RatingBadge = page.getByTestId('co2-rating-badge');
    }

    async goto() {
        await this.page.goto('/')
            await expect(this.productName.first()).toBeVisible();       // wait for product list to load
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