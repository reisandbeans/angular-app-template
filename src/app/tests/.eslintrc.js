module.exports = {
    extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        '../.eslintrc',
    ],
    env: {
        'jest/globals': true,
    },
    parserOptions: {
        project: 'src/app/tests/tsconfig.spec.json',
    },
    plugins: ['jest'],
}
