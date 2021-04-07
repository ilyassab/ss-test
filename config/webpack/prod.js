const paths = require('../paths')
const { merge } = require('webpack-merge')
const base = require('./base')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = merge(base, {
  mode: 'production',
  entry: {
    index: {
      import: `${paths.src}/index.tsx`,
      dependOn: ['react', 'helpers']
    },
    react: ['react', 'react-dom'],
    helpers: ['immer', 'nanoid']
  },
  devtool: false,
  output: {
    filename: '[name].[contenthash].bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[hash:base64]',
              },
            },
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),

    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i
    })
  ],
  optimization: {
    runtimeChunk: 'single'
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})
