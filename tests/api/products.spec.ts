import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../pages/ProductDetailPage';

test('GET /products return products', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
})

test('GET /products?sort=name,asc returns products A to Z', async ({ request }) => {
    const response = await request.get('/products', { params: { sort: 'name,asc'} });
    await expect(response).toBeOK();

    const body = await response.json();
    const names = body.data.map((product: { name: string }) => product.name);
    expect(names).toEqual([...names].sort());
})

test('GET /products?sort=name,desc returns products Z to A', async ({ request }) => {
    const response = await request.get('/products?sort=name,desc');
    await expect(response).toBeOK();

    const body = await response.json();
    const names = body.data.map((product: { name: string }) => product.name);
    expect(names).toEqual([...names].sort().reverse());
})

test('GET /products?sort=price,desc returns products from most to least expensive', async ({ request }) => {
    const response = await request.get('/products?sort=price,desc');
    await expect(response).toBeOK();

    const body = await response.json();
    const prices = body.data.map((product: { price: number }) => product.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
})

test('GET /products?sort=price,asc returns products from least to most expensive', async ({ request }) => {
    const response = await request.get('products?sort=price,asc');
    await expect(response).toBeOK();

    const body = await response.json();
    const prices = body.data.map((product: { price: number }) => product.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
})