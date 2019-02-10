const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, '..')

module.exports = {
  entry: path.resolve(ROOT, 'src', 'client', 'client.tsx'),
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(ROOT, 'dist'),
    publicPath: '/',
    filename: 'xafe-app.js',
  },
  resolve: {
    modules: ['node_modules', path.resolve(ROOT, 'src', 'client')],
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        }
      }]},
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: path.resolve(ROOT, 'src', 'client', 'client.html'),
    }),
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: path.resolve(ROOT, 'dist'),
  }
}