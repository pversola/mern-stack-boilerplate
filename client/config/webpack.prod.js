const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimixeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const path = require('./paths')
const common = require('./webpack.common')

const ruleCSS = require('./rules/ruleCSS')
const paths = require('./paths')

const prod = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [ruleCSS.prod]
  },
  optimization: {
    minimize: true,
    minimizer: [new OptimixeCssAssetsPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})

module.exports = prod
