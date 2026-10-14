import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
    { ignores: ['playwright-report/**', 'test-results/**', 'results/**', 'toolshop-app/**']
},
    {
        files: ['**/*.ts'],
        extends: [tseslint.configs.base],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-floating-promises': 'error',
        },
    },
    {
        files: ['tests/**/*ts'],
        extends: [playwright.configs['flat/recommended']],
        rules: {
            'playwright/no-skipped-test': ['warn', { allowConditional: true }],
        },
    },
]);