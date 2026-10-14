import { test, type Locator, type Page } from '@playwright/test';

export class ForgotPasswordPage {
    readonly page: Page;
    readonly email: Locator;
    readonly setPasswordButton: Locator;
    readonly emailError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByTestId('email');
        this.setPasswordButton = page.getByTestId('forgot-password-submit');
        this.emailError = page.getByTestId('email-error');
    }

    async goto() {
        await this.page.goto('auth/forgot-password');
    }
}