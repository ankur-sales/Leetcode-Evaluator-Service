module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        // Remove 'prettier/@typescript-eslint'
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    env: {
        node: true,
        es6: true,
    },
    rules: {
        // Add custom rules or override default rules here 
        'no-var': 'error',
        semi: ['error', 'always'],
        indent: ['error', 2, { SwitchCase: 1 }],
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
    },
};

