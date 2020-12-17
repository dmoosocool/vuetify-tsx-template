const { merge } = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const WebpackBaseConfig = require('./webpack.base.config')
// const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ESBuildPlugin = require('esbuild-webpack-plugin').default

module.exports = merge(WebpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',

  plugins: [
    // 开启gzip压缩
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(tsx|js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildPlugin({
        minify: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
