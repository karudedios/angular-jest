const { resolve } = require('path');
const webpack     = require('webpack');
const HappyPack   = require('happypack');
const HtmlWebpack = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'app': './src/main.js',
    'vendor': './src/vendor.js'
  },

  resolve: {
    unsafeCache: /node_modules/,
    extensions: ['.js', '/index.js'],
    modules: [resolve('src'), 'node_modules'],

    alias: {
      'styl': resolve('src', 'app', 'styl'),
      'assets': resolve('src', 'app', 'assets'),
      'models': resolve('src', 'app', 'models'),
      'services': resolve('src', 'app', 'services'),

      'jquery': require.resolve('jquery'),
      'angular': require.resolve('angular'),
    }
  },

  output: {
    filename: 'js/[name]-[chunkhash].js',
    path: resolve('client')
  },

  module: {
    rules: [{
      test: /\.js$/,

      include: /src/,
      exclude: /node_modules/,

      use: ['happypack/loader?id=js']
    }, {
      test: /\.styl$|\.css$/,

      include: /src/,
      exclude: /node_modules/,

      use: ExtractText.extract({
        use: ['happypack/loader?id=stylus']
      }),
    }, {
      test: /\.html$/,

      include: /src/,
      exclude: /node_modules/,

      use: {
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: true,
          collapseWhitespace: true
        }
      }
    }, {
      test: /\.svg$/,

      include: /src/,
      exclude: /node_modules/,

      use: {
        loader: 'svg-inline-loader',
        options: {
          classPrefix: true
        }
      }
    }]
  },

  plugins: [
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: [
        'ng-annotate-loader?es6',
        'babel-loader?retainLines&cacheDirectory',
        'eslint-loader?cache&emitError&emitWarning'
      ]
    }),

    new HappyPack({
      id: 'stylus',
      threads: 2,
      loaders: [
        'css-loader',
        'stylus-loader'
      ]
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChuncks(module, count) {
        return count < 2;
      }
    }),

    new ExtractText('./css/app.css'),

    new HtmlWebpack({
      path: resolve('client'),
      template: resolve('src/index.html')
    })
  ]
};
