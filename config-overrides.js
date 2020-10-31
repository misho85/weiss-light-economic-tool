const { override, addWebpackAlias, addBabelPlugin } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '~src': path.resolve(__dirname, './src'),
    '~components': path.resolve(__dirname, './src/components'),
    '~context': path.resolve(__dirname, './src/context'),
    '~styles': path.resolve(__dirname, './src/styles'),
    '~utils': path.resolve(__dirname, './src/utils'),
  }),
  addBabelPlugin([
    'babel-plugin-styled-components',
    {
      displayName: process.env.NODE_ENV !== 'production',
    },
  ])
);
