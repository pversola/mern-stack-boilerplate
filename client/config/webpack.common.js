const paths = require('./paths')

/* Plugins */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* Rules */
const ruleJS = require('./rules/ruleJS')
const ruleCSS = require('./rules/ruleCSS')
const ruleStatic = require('./rules/ruleStatic')

const config = {
  entry: [`${paths.src}/index.js`],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.asset,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store']
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Title',
      favicon: `${paths.asset}/images/favicon.ico`,
      template: `${paths.src}/template.html`,
      filename: 'index.html'
    })
  ],
  module: {
    rules: [ruleJS.common, ruleCSS.dev, ruleStatic.image, ruleStatic.font]
  }
}

module.exports = config
