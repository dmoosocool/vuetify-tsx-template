// 本地开发环境
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ErudaWebpackPlugin = require('eruda-webpack-plugin')

const devConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    open: 'Google Chrome',
  },

  plugins: [
    new FriendlyErrorsPlugin(),
    new ErudaWebpackPlugin({
      entry: [/main\.js$/]
    })
  ]
})

module.exports = devConfig
