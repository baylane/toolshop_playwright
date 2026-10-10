import { test, expect } from '@playwright/test';

test('Products failing to load', {
    annotation: { type: 'issue', description: 'https://github.com/baylane/toolshop_playwright/issues/1' },
}, async ({ page }) => {
    test.fail(); // known bug - no message given to the user when products fail to load.
    await page.route('**/products*', (route) =>
        route.fulfill({ status: 500, body: 'Server error' }),
    );
    await page.goto('/');
    await expect(page.getByText(/went wrong/i)).toBeVisible();
})