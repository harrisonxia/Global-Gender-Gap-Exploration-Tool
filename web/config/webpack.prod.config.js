const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./webpack.common.config.js')
const path = require('path')
const context = path.resolve(__dirname, '..')
const ASSET_PATH = process.env.ASSET_PATH || '/CMPT767/'
console.log(ASSET_PATH)
module.exports = merge(webpackBaseConfig, {
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
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