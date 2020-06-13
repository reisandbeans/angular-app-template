module.exports = {
    clearMocks: true,
    displayName: 'e2e',
    globals: {
        'ts-jest': {
            tsConfig: 'src/e2e/tsconfig.e2e.json',
        },
    },
    globalSetup: './lib/global-setup.js',
    globalTeardown: './lib/global-teardown.js',
    preset: 'jest-puppeteer',
    resetMocks: true,
    restoreMocks: true,
    setupFilesAfterEnv: ['expect-puppeteer', './lib/test-setup.ts'],
    testEnvironment: 'jest-environment-puppeteer',
    transform: {
        "^.+\\.ts?$": 'ts-jest',
    },
};
