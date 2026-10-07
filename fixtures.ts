import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';

type Pages = {
    loginPage: LoginPage;
    productPage: ProductPage;
    productDetailPage: ProductDetailPage;
    registerPage: RegisterPage;
    checkoutPage: CheckoutPage;
}

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
})

export { expect } from '@playwright/test';