const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin/dist/clean-webpack-plugin')
var PACKAGE = require('./package.json')

development = {
  entry: './src/dev.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'comrade-forms.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src') + '/template.html',
      filename: path.resolve(__dirname, 'dist') + '/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'comrade-forms.css'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      APP_MODE: 'development',
      APP_VERSION: JSON.stringify(PACKAGE.version)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    inline: true,
    writeToDisk: false,
    overlay: true,
    clientLogLevel: 'warning',
    host: '0.0.0.0',
    port: 7000,
    open: true,
    hot: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
              publicPath: 'dist/'
            }
          },
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
const production = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'comrade-forms.js',
    library: 'ComradeForms',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'comrade-forms.css'
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      APP_MODE: 'production',
      APP_VERSION: JSON.stringify(PACKAGE.version)
    }),
    new webpack.BannerPlugin(
      `Comrade Forms ${PACKAGE.version}\nAuthor: ${PACKAGE.author}\nSource: ${PACKAGE.repository}`
    )
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
              publicPath: 'dist/'
            }
          },
          {
            loader: 'css-loader',
            options: {}
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    console.info('development')
    return development
  }
  if (argv.mode === 'production') {
    console.info('production')
    return production
  }
}
