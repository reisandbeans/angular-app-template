module.exports = {
    extends: '../../.eslintrc',
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: 'src/server/tsconfig.server.json',
            },
            rules: {
                '@typescript-eslint/dot-notation': 'error'
            }
        }
    ],
};
