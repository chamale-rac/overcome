module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'airbnb/rules/react',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'react/function-component-definition': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    semi: ['error', 'never'],
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
        bundledDependencies: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  // TODO remove this temporal fix for import/no-extraneous-dependencies error on main.jsx
  settings: {
    'import/core-modules': ['react-router-dom'],
  },
}
