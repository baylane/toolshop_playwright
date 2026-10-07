import { type Locator, type Page } from '@playwright/test';

export class ProductDetailPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.getByTestId('product-name');
        this.productPrice = page.getByTestId('unit-price')
        this.addToCartButton = page.getByTestId('add-to-cart')
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}