import { test as setup, expect } from '../fixtures'

const authFile = 'playwright/.auth/user.json';

setup('register and sign in as a fresh user', async ({ page, newUser, loginPage }) => {
    await loginPage.goto()
    await loginPage.login(newUser.email, newUser.password);
    await expect(page).toHaveURL(/account/);

    await page.context().storageState({ path: authFile });
})