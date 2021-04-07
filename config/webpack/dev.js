const paths = require('../paths')

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const base = require('./base')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    contentBase: paths.build,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3001,
    clientLogLevel: 'silent'
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
