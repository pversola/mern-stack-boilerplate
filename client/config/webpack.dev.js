const webpack = require('webpack')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.common')

const dev = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    config: JSON.stringify({
      apiUrl: 'http://localhost:8000',
      apiTrueUrl: 'https://monitor.true-etax.echanwanich.com/Core',
      facebookAppID: '382176933019545',
      googleClientID:
        '742074347686-4vtsvq9lvtnhgc64nfmoll12e0ila5gp.apps.googleusercontent.com'
    })
  }
})

module.exports = dev
