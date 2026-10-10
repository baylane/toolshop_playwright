#  Toolshop E2E Tests with Playwright

![Playwright Tests](https://github.com/baylane/toolshop_playwright/actions/workflows/playwright.yml/badge.svg)

## [Latest test report](https://baylane.github.io/toolshop_playwright/)


UI, API, and database tests for Practice Software Testing's Toolshop, a demo e-commerce app, written in Playwright and typescript. Every CI starts a fresh, seeded copy of the app in Docker.

## In this project:
- 14 UI tests, 5 API tests.
- Page objects and test users delivered as fixtures - new user accounts are registered via API.
- A mocked server error (/tests/ui/network.spec.ts), a hybrid API plus UI checkout (/tests/ui/product.spec.ts), and an SQL query confirming each new used is saved exactly once to the app's DB (/tests/api/users-db-spec.ts).
- A Postman collection run.
- Chromium, Firefox, and WebKit, with lint, type checks, and JUnit output in CI.
- Latest reports publish to GitHub Pages on every push to main.
- A Dockerfile for Microsoft's Playwright image, and a dev container for GitHub Codespaces.

## Run it
Against the public site (without CI - blocked from the public site):
```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

Against your own copy of the app, in Github Codespace. Open the repo in a codespace. Its dev container installs Node, Docker, and the packages. Then:
```bash
cd /workspaces
git clone --depth 1 https://github.com/testsmith.io/practice-software-testing.git toolshop-app
cd toolshop-app
docker build -t testsmith/practice-software-testing-web -f _docker/web.docker _docker
docker compose -f docker-compose.prod.yml up -d --scale cron=0
npx --yes wait-on --timeout 300000 http-get://localhost:8091/status http-get://localhost:4200
docker compose -f docker-compose.prod.yml exec laravel-api php artisan migrate:fresh --seed
cd /workspaces/toolshop_playwright
docker build -t toolshop-tests .
docker run --rm --init --ipc=host --network host toolshop-tests npm run test:local
```

In Docker, with nothing else installed:
```bash
docker build -t toolshop-tests .
docker run --rm --init --ipc=host toolshop-tests