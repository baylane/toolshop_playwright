import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productQuantity: Locator;
    readonly productPrice: Locator;
    readonly lineTotal: Locator;
    readonly cartTotal: Locator;
    readonly rows: Locator;
    readonly emailAddress: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly country: Locator;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly paymentMethod: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.getByTestId('product-title');
        this.productQuantity = page.getByTestId('product-quantity');
        this.productPrice = page.getByTestId('product-price');
        this.cartTotal = page.getByTestId('cart-total');
        this.rows = page.locator('tbody tr');
        this.lineTotal = page.getByTestId('line-price');
        this.emailAddress = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.country = page.getByTestId('country');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.street = page.getByTestId('street');
        this.city = page.getByTestId('city');
        this.state = page.getByTestId('state');
        this.paymentMethod = page.getByTestId('payment-method');
    }

    async goto() {
        await this.page.goto('/checkout/')
    }

    async removeItem(productName: string) {
        const row = this.rows.filter({ hasText: productName});
        await row.locator('.btn-danger').click();
    }

    async changeQuantity(productName: string, quantity: string) {
        const row = this.rows.filter({ hasText: productName });
        await row.getByTestId('product-quantity').fill(quantity);
    }

    async login() {
        await this.emailAddress.fill('testing+1791317024953@fakenotrealbutsomewhatuniquewebsiteamirighttest.com');
        await this.password.fill('Fake.Password1');
        await this.loginButton.click();
    }

    async billing() {
        await this.country.selectOption('Albania');
        await this.postalCode.fill('1111');
        await this.houseNumber.fill('1');
        await this.street.fill('a');
        await this.city.fill('a');
        await this.state.fill('a');
    }

    async pay() {
        await this.paymentMethod.selectOption('Cash on Delivery');
        await this.page.getByTestId('finish').click();
    }
}