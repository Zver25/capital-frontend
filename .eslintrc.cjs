module.exports = {
    extends: [
        'airbnb',
        "airbnb/hooks",
        'airbnb-typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        "@typescript-eslint/indent": "off",
        "react/function-component-definition": [
            "error",
            {
                "namedComponents": "arrow-function",
                "unnamedComponents": "arrow-function",
            },
        ],
    },
    plugins: ['@typescript-eslint'],
    root: true,
};
