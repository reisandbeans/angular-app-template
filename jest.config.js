module.exports = {
    clearMocks: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 95,
            lines: 95,
            statements: 95
        }
    },
    coverageReporters: [
        'lcov',
    ],
    projects: [
        {
            collectCoverageFrom: [
                'src/app/**/*.js',
                'src/app/**/*.ts',
            ],
            coverageDirectory: 'coverage/app',
            displayName: 'app',
            globals: {
                'ts-jest': {
                    tsConfig: 'src/app/tests/tsconfig.spec.json',
                    stringifyContentPathRegex: '\\.html$',
                    astTransformers: [
                        'jest-preset-angular/build/InlineFilesTransformer',
                        'jest-preset-angular/build/StripStylesTransformer'
                    ],
                }
            },
            preset: 'jest-preset-angular',
            roots: ['./src/app'],
            setupFilesAfterEnv: [
                './src/app/tests/jest-setup.ts',
            ],
        },
        {
            collectCoverageFrom: [
                'src/server/**/*.js',
                'src/server/**/*.ts',
            ],
            coverageDirectory: 'coverage/server',
            displayName: 'server',
            globals: {
                'ts-jest': {
                    tsConfig: 'src/server/tests/tsconfig.spec.json',
                }
            },
            moduleNameMapper: {
                "^@client/(.*)$": '<rootDir>/src/app/$1',
                "^@environments/(.*)$": '<rootDir>/src/environments/$1',
                "^@init$": '<rootDir>/src/server/config/init.ts',
                "^@logger$": '<rootDir>/src/server/lib/logger.ts',
                '^@server/(.*)$': '<rootDir>/src/server/$1',
                '^@tests/(.*)$': '<rootDir>/src/server/tests/$1',
            },
            roots: ['./src/server'],
            setupFilesAfterEnv: [
                './src/server/tests/jest-setup.ts',
            ],
            testEnvironment: 'node',
            transform: {
                '^.+\\.(ts|tsx)$': 'ts-jest',
            }
        }
    ],
    restoreMocks: true,
}
