module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:@angular-eslint/recommended",
        "../../.eslintrc"
    ],
    "overrides": [
        {
            "files": ["./**/*.ts"],
            "parserOptions": {
                "project": 'src/app/tests/tsconfig.spec.json',
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
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "src/app/tsconfig.app.json",
        "sourceType": "module"
    },
    "plugins": [
        "@angular-eslint/eslint-plugin",
        "@angular-eslint/eslint-plugin-template",
        "@typescript-eslint",
        "@typescript-eslint/tslint"
    ],
    "rules": {
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
};
