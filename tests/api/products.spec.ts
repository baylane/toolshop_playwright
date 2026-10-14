import { test, expect } from '@playwright/test';

test('GET /products return products', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
})