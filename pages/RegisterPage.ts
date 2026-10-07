import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly dateOfBirth: Locator;
    readonly country: Locator;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly phoneNumber: Locator;
    readonly emailAddress: Locator;
    readonly password: Locator;
    readonly registerSubmit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByTestId('first-name');
        this.lastName = page.getByTestId('last-name');
        this.dateOfBirth = page.getByTestId('dob');
        this.country = page.getByTestId('country');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.street = page.getByTestId('street');
        this.city = page.getByTestId('city');
        this.state = page.getByTestId('state');
        this.phoneNumber = page.getByTestId('phone');
        this.emailAddress = page.getByTestId('email');
        this.password = page.getByTestId('password');
        this.registerSubmit = page.getByTestId('register-submit');
    }

    async goto() {
        await this.page.goto('/auth/register/');
    }

    async newEmail() {
        const email = `testing+${Date.now()}@fakenotrealbutsomewhatuniquewebsiteamirighttest.com`;
        await this.emailAddress.fill(email);
        return email;
    }

    async registerAccount() {
        await this.firstName.fill('a');
        await this.lastName.fill('a');
        await this.dateOfBirth.fill('1960-01-01');
        await this.country.selectOption('Albania')
        await this.postalCode.fill('1111');
        await this.houseNumber.fill('1');
        await this.street.fill('a');
        await this.city.fill('a');
        await this.state.fill('a');
        await this.phoneNumber.fill('1');
        await this.newEmail();
        await this.password.fill('Fake.Password1');
        await this.registerSubmit.click();
    }
}