module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['flowtype', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': false,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        parser: 'flow'
      }
    ]
  }
};
