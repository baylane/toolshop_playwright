import { test, expect } from '../../fixtures';

test('new user can read their own profile', async ({ request, newUser }) => {
    const login = await request.post('/users/login', {
        data: { email: newUser.email, password: newUser.password },
    });
    expect(login.status()).toBe(200);
    const { access_token } = await login.json();

    const me = await request.get('/users/me', {
        headers: { Authorization: `Bearer ${access_token}`},
    });

    expect(me.status()).toBe(200);
    expect((await me.json()).email).toBe(newUser.email);
})


test('signing in with an unknown email is rejected', async ({ request }) => {
    const response = await request.post('/users/login', {
        data: { email: 'q9aowtrga09utwogjraTWUGJOE@awtogrhaWUT0OJAWT490U8.com', password: 'Fake.Password1' },
    });
    expect(response.status()).toBe(401);
})

test('retrieving the user profile without a token is rejected', async ({ request }) => {
    const response = await request.get('/users/me');
    expect(response.status()).toBe(400);
})