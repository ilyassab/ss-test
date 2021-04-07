const paths = require('../paths')

const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const Dotenv = require('dotenv-webpack')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
    ]
  }
}

module.exports = {
  entry: `${paths.src}/index.tsx`,
  devtool: 'eval-source-map',
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
    crossOriginLoading: 'anonymous',
    module: true,
    environment: {
      arrowFunction: true,
      bigIntLiteral: false,
      const: true,
      destructuring: true,
      dynamicImport: false,
      forOf: true
    }
  },
  resolve: {
    alias: {
      '@components': `${paths.src}/components`
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: babelLoader
      },
      {
        test: /.tsx?$/i,
        exclude: /node_modules/,
        use: [babelLoader, 'ts-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2?)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}/assets`
        }
      ]
    }),

    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      filename: 'index.html',
      templateParameters: {
        title: 'Test'
      }
    }),

    new Dotenv({
      path: './config/.env'
    })
  ]
}
