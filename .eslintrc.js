module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    root: true,
    extends: ['airbnb-base','prettier'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 11,
    },
    rules: {
        'linebreak-style': 0,
        'no-console': 0,
        'prefer-template': 0,
        'no-nested-ternary': 0,
        'indent': 0,
        'arrow-parens':["error", 'as-needed'],
        "quotes": [2, "single", {"allowTemplateLiterals": true}],
    },
};
