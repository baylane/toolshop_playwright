import { test, expect } from '../../fixtures';

test('home page matches its baseline', async ({ page, productPage }) => {
    test.skip(process.platform !== 'win32', 'remove when linux baselines set up');
    await productPage.goto();
    await expect(page).toHaveScreenshot('home.png', {
        mask: [page.getByTestId('product-name')],
    });
})