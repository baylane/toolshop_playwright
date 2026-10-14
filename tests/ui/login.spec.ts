import { test, expect } from '../../fixtures';

test.describe('signed in', () => {
        test('TC-01 customer can sign in', { tag: '@smoke' }, async ({ newUser, loginPage, page }) => {
            await loginPage.goto();
            await loginPage.login(newUser.email, newUser.password);

            await expect(page).toHaveURL(/account/);
    });
});

test('TC-02 wrong password shows an error', { tag: '@smoke' }, async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('fake39845tuewfiorjsdv@notarealwebsitestcaseakaitdoesntactuallyexist.com', 'password');

    await expect(loginPage.loginError).toContainText('Invalid email or password');
});

test('TC-10 empty email and password section show an error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginButton.click()

    await expect(loginPage.passwordError).toContainText('Password is required');
    await expect(loginPage.emailError).toContainText('Email is required');
});

test('TC-11 view password button converts password to text', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.passwordInput.fill('a')
    await page.locator('[data-icon=eye]').click();

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
});

test('TC-12 forgot yourpassword link is functional', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.forgotPassword.click();

    await expect(page).toHaveURL(/forgot-password/)
})

test('TC-13 empty email shows an error in forgot password', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
    await forgotPasswordPage.setPasswordButton.click();

    await expect(forgotPasswordPage.emailError).toHaveText('Email is required');
})