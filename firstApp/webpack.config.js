var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, '/src/index.js')
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.join(__dirname, '/public/'),
    devtoolLineToLine: true,
    pathinfo: true,
    sourceMapFilename: '[name].js.map',
    publicPath: path.join(__dirname, '/src/main/webapp/')
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/,
        options: {
          error: false,
          snazzy: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /\.html$/,
        loader: 'raw-loader' },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
          [{ loader: 'css-loader',
            options: {
              minimize: true, sourceMap: true}
          },
          {
            loader: 'sass-loader', options: {sourceMap: true} }]
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main']
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/',
        to: 'assets/'
      }
    ])
  ],
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, '/public'),
    compress: true
  },
  devtool: 'eval'
}
