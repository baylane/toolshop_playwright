import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC-01 customer can sign in', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.CUSTOMER_EMAIL!, process.env.CUSTOMER_PASSWORD!);
    await expect(page).toHaveURL(/account/);
})

test('TC02 wrong password shows an error', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('fake39845tuewfiorjsdv@notarealwebsitestcaseakaitdoesntactuallyexist.com', 'password');
    await expect(loginPage.loginError).toContainText('Invalid email or password');
})