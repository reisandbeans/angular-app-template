module.exports = {
    "extends": "../../.eslintrc",
    "overrides": [
        {
            "files": ["tests/**/*.ts"],
            "parserOptions": {
                "project": 'src/server/tests/tsconfig.spec.json',
            },
            "extends": [
                "plugin:jest/recommended",
                "plugin:jest/style",
            ],
            plugins: ['jest'],
            env: {
                "jest/globals": true,
            },
        }
    ],
    "plugins": [
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "parserOptions": {
        "project": "src/server/tsconfig.server.json",
        "sourceType": "module"
    },
    "rules": {
        "@typescript-eslint/dot-notation": "error"
    }
};
