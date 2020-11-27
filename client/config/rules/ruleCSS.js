const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dev = {
  test: /\.(scss|css)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1
      }
    },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'sass-loader', options: { sourceMap: true } }
  ]
}

const prod = {
  test: /\.(scss|css)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: false
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
}

module.exports = {
  dev,
  prod
}
