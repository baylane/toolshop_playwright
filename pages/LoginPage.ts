import { test, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly passwordError: Locator;
    readonly emailError: Locator;
    readonly forgotPassword: Locator;
    readonly googleSignIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('email');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-submit');
        this.loginError = page.getByTestId('login-error');
        this.passwordError = page.getByTestId('password-error');
        this.emailError = page.getByTestId('email-error');
        this.forgotPassword = page.getByTestId('forgot-password-link')
        this.googleSignIn = page.getByRole('button', { name: 'Sign in with Google'})
    }

    async goto() {
        await this.page.goto('/auth/login');
    }

    async login(email: string, password: string) {
        await test.step(`Sign in as ${email}`, async () => {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        })
    }
}