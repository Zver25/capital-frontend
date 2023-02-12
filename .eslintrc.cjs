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
    plugins: ['@typescript-eslint'],
    root: true,
};
