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
  },
  resolve: {
    fallback: {
      // assert: 'assert',
      buffer: 'buffer',
      // console: 'console-browserify',
      // constants: 'constants-browserify',
      crypto: 'crypto-browserify',
      // domain: 'domain-browser',
      // events: 'events',
      // http: 'stream-http',
      // https: 'https-browserify',
      // os: 'os-browserify/browser',
      // path: 'path-browserify',
      // punycode: 'punycode',
      process: 'process/browser',
      // querystring: 'querystring-es3',
      stream: 'stream-browserify',
      // _stream_duplex: 'readable-stream/duplex',
      // _stream_passthrough: 'readable-stream/passthrough',
      // _stream_readable: 'readable-stream/readable',
      // _stream_transform: 'readable-stream/transform',
      // _stream_writable: 'readable-stream/writable',
      // string_decoder: 'string_decoder',
      // sys: 'util',
      // timers: 'timers-browserify',
      // tty: 'tty-browserify',
      // url: 'url',
      util: 'util'
      // vm: 'vm-browserify',
      // zlib: 'browserify-zlib'
    }
  }
}

module.exports = config
