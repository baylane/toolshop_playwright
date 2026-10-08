import { expect, type APIRequestContext } from '@playwright/test';

export async function registerUser(request: APIRequestContext) {
    const email = `testing${crypto.randomUUID()}@example.com`;
    const password = 'Fake.Password1';

    const response = await request.post('https://api.practicesoftwaretesting.com/users/register', {
        data: {
            first_name: 'a',
            last_name: 'a',
            dob: '1960-01-01',
            phone: '1',
            email,
            password,
            address: {
                street: 'a',
                city: 'a',
                state: 'a',
                country: 'Albania',
                postal_code: '1111',
            }
        }
    })
    expect(response.status()).toBe(201);

    return { email, password };
}