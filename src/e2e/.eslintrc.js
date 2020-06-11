module.exports = {
    extends: [
        '../../.eslintrc',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
    env: {
        'jest/globals': true
    },
    globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true,
    },
    parserOptions: {
        project: 'src/e2e/tsconfig.e2e.json',
        sourceType: 'module'
    },
    plugins: ['jest'],
}
