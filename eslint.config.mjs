import expo from 'eslint-config-expo';

export default [
  ...expo,
  {
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-duplicate-imports': 'error',
      
      // React/React Native rules
      'react/prop-types': 'off', // Using TypeScript for props
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    ignores: [
      'node_modules/',
      '.expo/',
      'dist/',
      'build/',
      '*.config.js',
      '*.config.mjs'
    ]
  },
];