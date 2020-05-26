module.exports = {
    collectCoverageFrom: [
        'src/**/*.js',
        'src/**/*.ts',
        '!src/environments/*.ts',
        '!src/tests/**/*.ts'
    ],
    coverageDirectory: '../coverage/client',
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    coverageReporters: [
        'lcov'
    ],
    preset: 'jest-preset-angular',
    roots: [
        'src'
    ],
    setupFilesAfterEnv: [
        './jest-setup.ts'
    ]
}
