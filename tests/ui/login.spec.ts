import { test, expect } from '../../fixtures';

test.describe('signed in', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
        test('TC-01 customer can sign in', { tag: '@smoke' }, async ({ newUser, loginPage, page }) => {
            await loginPage.goto();
            await loginPage.login(newUser.email, newUser.password);
            await expect(page).toHaveURL(/account/);
    })
})

test('TC02 wrong password shows an error', { tag: '@smoke' }, async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('fake39845tuewfiorjsdv@notarealwebsitestcaseakaitdoesntactuallyexist.com', 'password');
    await expect(loginPage.loginError).toContainText('Invalid email or password');
})