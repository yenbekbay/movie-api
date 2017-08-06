module.exports = {
  extends: ['anvilabs', 'anvilabs/babel', 'anvilabs/flowtype'],
  rules: {
    'no-process-env': 'error',
    'no-underscore-dangle': 'off',
    'no-magic-numbers': 'off',
    // https://github.com/gajus/eslint-plugin-flowtype
    'flowtype/type-id-match': 'off',
    'flowtype/no-weak-types': 'off',
  },
  overrides: [
    Object.assign(
      {
        files: ['**/__tests__/*-test.js', '**/__mocks__/*.js'],
      },
      require('eslint-config-anvilabs/jest') // eslint-disable-line global-require, import/no-extraneous-dependencies, prettier/prettier
    ),
  ],
};
