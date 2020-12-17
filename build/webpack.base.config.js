// 公共配置.
const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { ESBuildPlugin } = require('esbuild-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const glob = require('glob-all')
const PATHS = {
  src: path.join(process.cwd(), 'src')
}

const ANALYZER = process.env.ANALYZER
const isDev = process.env.NODE_ENV !== 'production'
const baseConfig = {
  entry: {
    main: './src/main.ts',
    vendors: ['vue']
  },
  output: {
    publicPath: '/',
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '..', 'src'),
      '@ASSETS': path.join(__dirname, '..', 'public', 'assets'),
      '@APP': path.resolve(__dirname, '..')
    }
  },
  // 加载器
  module: {
    rules: [
      /** vue loader */
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },

      /** images loader */
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },

      /** font loader */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },

      /** tsx loader */
      {
        test: /\.tsx?$/,
        exclude: /node_modules|\.d\.ts$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.d\.ts$/,
        loader: 'ignore-loader'
      },

      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true // optional
            },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },

      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader', 'postcss-loader']
      },
    ]
  },

  plugins: [
    // 执行webpack命令时 显示进度条.
    new ProgressBarPlugin(),
    // Scope Hoisting, 测试为啥不支持Scope Hoisting. npx webpack --config your-config.webpack.js --display-optimization-bailout
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 使用html-webpack-plugin, 设置title, 并指定模板为: 'public/index.html'
    new HtmlWebpackPlugin({
      title: '',
      template: 'public/index.html'
    }),
    // 使用clean-webpack-plugin 自动删除dist文件夹
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync([path.resolve(path.resolve(), `src/**/*.tsx`)]),
      whitelist: ['html', 'body', 'data-content-max']
    }),
    new ESBuildPlugin()
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildPlugin({
        minify: true
      }),
    ],
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 20000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   automaticNameDelimiter: '~',
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     vendors: {
    //       name: `chunk-vendors`,
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: `chunk-common`,
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   }
      // chunks: 'async',
      // minSize: 30000,
      // maxSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 6,
      // maxInitialRequests: 4,
      // automaticNameDelimiter: '~',
      // cacheGroups: {
      //   vendors: {
      //     name: `chunk-vendors`,
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //     chunks: 'initial'
      //   },
      //   common: {
      //     name: `chunk-common`,
      //     minChunks: 2,
      //     priority: -20,
      //     chunks: 'initial',
      //     reuseExistingChunk: true
      //   }
      // }
    // }
  }
}

// 如果设置环境变量ANALYZER为'analyzer'时 启动分析
if (ANALYZER === 'analyzer') {
  baseConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = baseConfig
