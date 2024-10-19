
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'prettier', // Use Prettier to ensure code style consistency
    
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports', // Helps remove unused imports automatically
    'simple-import-sort', // Helps keep imports sorted
  ],
  rules: {
    'max-params': ['error', 3], // Limit the number of parameters in a function
    'max-lines-per-function': ['error', 70], // Ensure functions are small and readable
    'import/prefer-default-export': 'off', // Allow named exports for better code organization
    'import/no-cycle': ['error', { maxDepth: '∞' }], // Prevent circular imports
    '@typescript-eslint/no-unused-vars': 'off', // Handle unused vars with 'unused-imports' plugin
    'unused-imports/no-unused-imports': 'error', // Automatically remove unused imports
    'unused-imports/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // Ignore unused variables prefixed with '_'
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/imports': 'error', // Sort imports for readability
    'simple-import-sort/exports': 'error', // Sort exports for consistency
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow omitting return types for cleaner code
    'require-jsdoc': 'off', // Disable JSDoc requirement for simplicity in Cloud Functions
    'no-console': 'off', // Allow console logs for debugging in Cloud Functions
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^firebase-functions/.+'],
      },
    ],
  },
  overrides: [
    // Configuration for testing files (if any)
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
