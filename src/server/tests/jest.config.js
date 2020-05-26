module.exports = {
    collectCoverageFrom: [
        'src/**/*.js',
        'src/**/*.ts'
    ],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    coverageReporters: [
        'lcov'
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'test/tsconfig.test.json'
        }
    },
    roots: [
        'test'
    ],
    setupFilesAfterEnv: [
        './test/jest-setup.ts'
    ],
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
}
