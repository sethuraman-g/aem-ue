module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
  ],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'no-param-reassign': [2, { props: false }], // allow modifying properties of
    'comment-empty-line-before': ['off', {
      ignore: ['stylelint-commands', 'after-comment'],
    }],
  },
};
