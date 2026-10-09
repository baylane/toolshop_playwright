import { test, expect } from '@playwright/test';

test('Products failing to load', async ({ page }) => {
    await page.route('**/products*', (route) =>
        route.fulfill({ status: 500, body: 'Server error' }),
    );
    await page.goto('/');
})