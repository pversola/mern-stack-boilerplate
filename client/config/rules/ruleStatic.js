const image = {
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: 'asset/resource'
}

const font = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: 'asset/inline'
}

module.exports = {
  image,
  font
}
