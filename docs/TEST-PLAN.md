# Test plan: Practice Software Testing (Toolshop)

## Scope
In scope: sign-in, search, filters, product details, cart, checkout, account.
Out of scope: real payments, email delivery, performance.

## Flows by risk
| ID    | Flow                        | Risk   | Why it matters            | Automate? |
|-------|-----------------------------|--------|---------------------------|-----------|
| TC-01 | Sign in with valid account                | High   | User journey              | Yes, UI   |
| TC-02 | Sign in with wrong password               | High   | Security                  | Yes, UI   |
| TC-03 | Search for product                        | High   | User journey              | Yes, UI   |
| TC-04 | Filter only shows intended products       | Medium | User journey              | Yes, UI   |
| TC-05 | Product page matches product clicked      | High   | Revenue path              | Yes, UI   |
| TC-06 | Product can be added and removed from cart| High   | Revenue path              | Yes, UI   |
| TC-07 | Quantity can change in checkout           | High   | Revenue path              | Yes, UI   |
| TC-08 | User can register                         | High   | User journey              | Yes, UI   |
| TC-09 | User can checkout with login              | High   | Revenue path              | Yes, UI   |


## Not automated, and why
- Layout on unusual screen sizes: checked by eye in exploratory sessions.

## Environments and data
- Base URL: https://practicesoftwaretesting.com
- Seeded accounts for read-only tests; tests that change data create their own users.