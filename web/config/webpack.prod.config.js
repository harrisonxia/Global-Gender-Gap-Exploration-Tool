const webpack = require('webpack')
const merge = require('webpack-merge')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./webpack.common.config.js')
const path = require('path')
const context = path.resolve(__dirname, '..')
const ASSET_PATH = process.env.ASSET_PATH || '/Global-Gender-Gap-Exploration-Tool/'

module.exports = merge(webpackBaseConfig, {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
    minimize: true,
    minimizer: [
      // TODO: uglify was causing prod build issue
      //   new UglifyJsPlugin(),
      //   new UglifyJsPlugin({
      //     cache: true,
      //     parallel: true,
      //     sourceMap: true,
      //     uglifyOptions: {
      //       compress: {
      //         drop_console: true,
      //       },
      //     },
      //   }),
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  output: {
    path: path.resolve(context, 'docs'),
    filename: '[name].[hash].js',
    publicPath: ASSET_PATH,
  },
  plugins: [
    // This makes it possible for us to safely use env vars on our code
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
})
