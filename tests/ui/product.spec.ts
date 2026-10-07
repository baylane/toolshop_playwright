import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CheckoutPage } from '../../pages/CheckoutPage'
import { RegisterPage } from '../../pages/RegisterPage';

const searchTerms = ['Pliers', 'Hammer'];

for (const term of searchTerms) {
    test(`TC-03 search returns ${term}`, { tag: '@smoke' }, async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.goto();
        await productPage.searchproduct(term);
        await expect(productPage.productName.first()).toContainText(term);
    })
}

test('TC-04 hammer filter only shows hammers', { tag: '@smoke' }, async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.filterByCategory('Hammer');

    await expect(productPage.productName.first()).toContainText(/hammer/i);
    await expect(productPage.productName.filter({ hasNotText: /hammer/i })).toHaveCount(0);
})

test('TC-05 product page matches the card you clicked', { tag: '@smoke' }, async ({ page }) => {
    const productPage = new ProductPage(page);
    const detailPage = new ProductDetailPage(page);
    await productPage.goto();
    const name = await productPage.productName.first().innerText();
    const price = await productPage.productPrice.first().innerText();
    await productPage.productName.first().click();

    await expect(detailPage.productName).toHaveText(name);
    await expect(detailPage.productPrice).toHaveText(price.replace('$', ''));
})

test('TC-06 product can be added and removed from cart', { tag: '@smoke' }, async ({ page }) => {
    const productPage = new ProductPage(page);
    const detailPage = new ProductDetailPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productPage.goto();
    const name = await productPage.productName.first().innerText();
    await productPage.productName.first().click();
    await detailPage.addToCart();
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');

    await checkoutPage.goto();
    await checkoutPage.removeItem(name);
    await expect(page.getByTestId('cart-quantity')).toBeHidden();
    await expect(page.getByText('The cart is empty')).toBeVisible();
})

test('TC-07 quantity can change in checkout', { tag: '@smoke' }, async ({ page }) => {
    const productPage = new ProductPage(page);
    const detailPage = new ProductDetailPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productPage.goto();
    const name = await productPage.productName.first().innerText();
    const price = await productPage.productPrice.first().innerText();
    await productPage.productName.first().click();
    await detailPage.addToCart();
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');

    await checkoutPage.goto();
    await checkoutPage.changeQuantity(name, '2');
    await expect(checkoutPage.lineTotal).toHaveText(`$${(Number(price.replace('$', '')) * 2).toFixed(2)}`);
})

test('TC-08 user can register', { tag: '@smoke' }, async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.registerAccount();
    await expect(page).toHaveURL('/auth/login');
})

test('TC-09 user can checkout with login', { tag: '@smoke' }, async ({ page }) => {
    const productPage = new ProductPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Add product to cart', async () => {
        await productPage.goto();
        await productPage.productName.first().click();
        await productDetailPage.addToCart();
        await expect(page.getByTestId('cart-quantity')).toHaveText('1');
    })
    // could also use await checkoutPage.goto() but 99% of users click the cart button instead of amending the url
    await test.step('Navigate past inital checkout screen', async () => {
        await page.getByTestId('nav-cart').click();
        await expect(page).toHaveURL('/checkout');
        await page.getByTestId('proceed-1').click();
    })
    
    await test.step('Login at checkout', async () => {
        await checkoutPage.login();
        await page.getByTestId('proceed-2').click();
    })

    await test.step('Enter billing information', async () => {
        await checkoutPage.billing();
        await page.getByTestId('proceed-3').click();
    })

    await test.step('Pay', async () => {
        await checkoutPage.pay();
        await expect(page.getByTestId('payment-success-message')).toHaveText('Payment was successful');
    })
})