// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = {
  overrides: [
    {
      files: ['jest.setup.js', '**/__tests__/**/*.ts', '**/__tests__/**/*.tsx'],
      env: {
        jest: true,
      },
    },
  ],
};
