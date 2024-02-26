module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/typescript'
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    "react-hooks",
    "react-refresh",
    "@typescript-eslint"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      }
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "react/jsx-props-no-spreading": 0,
    "react/no-unused-state": 1,
    "react/jsx-uses-react": 0,
    "react/react-in-jsx-scope": 0,
    "react/require-default-props": 0,
    "no-shadow": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-shadow": [
      2
    ]
  },
};
