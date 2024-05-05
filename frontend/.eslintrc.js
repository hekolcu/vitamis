const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'import/newline-after-import': 'off',
    'camelcase': 'off',
    'no-return-assign': 'off',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'react/jsx-key': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument' : 'off',
    'import/no-duplicates': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/default': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'react/no-array-index-key': 'off',
    'no-console': 'off',
    'react/self-closing-comp': 'off',
    'no-else-return': 'off',
    '@typescript-eslint/array-type': 'off',
    'prefer-template': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'jsx-a11y/no-autofocus': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     ignoreRestSiblings: true,
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //     caughtErrorsIgnorePattern: '^_',
    //   },
    // ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-shadow': 'off',
    // 'import/newline-after-import': 'error',
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true, // personal style
          pascalCase: true,
        },
      },
    ],

    // Deactivated
    '@typescript-eslint/dot-notation': 'off', // paths are used with a dot notation
    '@typescript-eslint/no-misused-promises': 'off', // onClick with async fails
    '@typescript-eslint/no-non-null-assertion': 'off', // sometimes compiler is unable to detect
    '@typescript-eslint/no-unnecessary-condition': 'off', // remove when no static data is used
    '@typescript-eslint/require-await': 'off', // Server Actions require async flag always
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // personal style
    'import/no-default-export': 'off', // Next.js components must be exported as default
    'import/no-extraneous-dependencies': 'off', // conflict with sort-imports plugin
    'import/order': 'off', // using custom sort plugin
    'no-nested-ternary': 'off', // personal style
    'no-redeclare': 'off', // conflict with TypeScript function overloads
    'react/jsx-fragments': 'off', // personal style
    'react/prop-types': 'off', // TypeScript is used for type checking

    '@next/next/no-img-element': 'off', // Temporary disabled
  },
};
