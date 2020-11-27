const path = require('path')

const root = path.resolve(__dirname, '..')

const src = path.resolve(root, 'src')
const asset = path.resolve(src, 'assets')
const build = path.resolve(root, 'dist')

module.exports = {
  src,
  asset,
  build
}
