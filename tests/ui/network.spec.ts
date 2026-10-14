import { test, expect } from '@playwright/test';

test('Products failing to load', async ({ page }) => {
    test.fail(); // known bug: no error message is displayed when products fail to load
    await page.route('**/products*', (route) =>
        route.fulfill({ status: 500, body: 'Server error' }),
    );
    await page.goto('/');
    await expect(page.locator('text=Products failed to load')).toBeVisible();
});