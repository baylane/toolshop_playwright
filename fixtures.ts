import { test as base } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductPage } from './pages/ProductPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { registerUser } from './datafactory/registerUser';

type Fixtures = {
    loginPage: LoginPage;
    productPage: ProductPage;
    productDetailPage: ProductDetailPage;
    registerPage: RegisterPage;
    checkoutPage: CheckoutPage;
    newUser: { email: string; password: string };
}

export const test = base.extend<Fixtures>({
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
    },
    newUser: async ({ request }, use) => {
        await use(await registerUser(request));
    },
})

export { expect } from '@playwright/test';