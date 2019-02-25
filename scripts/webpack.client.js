const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: path.resolve(ROOT, 'src', 'client', 'client.html'),
    }),
    new MonacoWebpackPlugin({
      languages: ['json'],
    }),
  ],
  devServer: {
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    contentBase: path.resolve(ROOT, 'dist'),
  }
}