import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../pages/ProductDetailPage';

test('GET /products return products', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
})

test('GET /products?sort=name,asc and returns products A to Z', async ({ request }) => {
    const response = await request.get('/products', { params: { sort: 'name,asc'} });
    await expect(response).toBeOK();

    const body = await response.json();
    const names = body.data.map((product: { name: string }) => product.name);
    expect(names).toEqual([...names].sort());
})