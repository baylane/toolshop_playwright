import { test, expect } from '../../fixtures';
import { query } from '../../utils/db';

test.skip(() => !process.env.DB_HOST, 'Needs the toolshop database: run it with npm run test:local');

test('registering creates exactly one user row', async ({ newUser }) => {
    const rows = await query('SELECT COUNT(*) AS count FROM users WHERE email = ?', [newUser.email]);
    expect(Number(rows[0].count)).toBe(1);
})