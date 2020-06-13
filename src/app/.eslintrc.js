module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'plugin:@angular-eslint/recommended',
        '../../.eslintrc'
    ],
    overrides: [
        {
            env: {
                'jest/globals': true,
            },
            extends: [
                'plugin:jest/recommended',
                'plugin:jest/style',
            ],
            files: ['./**/*.spec.ts'],
            parserOptions: {
                project: 'src/app/tests/tsconfig.spec.json',
            },
            plugins: ['jest'],
        },
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: 'src/app/tsconfig.app.json',
            },
            plugins: [
                '@angular-eslint/eslint-plugin',
                '@angular-eslint/eslint-plugin-template',
            ],
            rules: {
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        prefix: 'app',
                        style: 'camelCase'
                    },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: 'app',
                        style: 'kebab-case'
                    },
                ],
            }
        }
    ],
};
