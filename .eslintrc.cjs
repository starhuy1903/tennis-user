module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', 'react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-shadow': [2],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
