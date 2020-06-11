module.exports = {
    clearMocks: true,
    displayName: 'e2e',
    globals: {
        appUrl: 'http://localhost:8080',
        'ts-jest': {
            tsConfig: 'src/e2e/tsconfig.e2e.json'
        }
    },
    preset: 'jest-puppeteer',
    resetMocks: true,
    restoreMocks: true,
    setupFilesAfterEnv: ['./jest-setup.ts'],
    transform: {
        "^.+\\.ts?$": 'ts-jest'
    }
}
