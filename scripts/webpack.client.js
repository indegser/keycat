const path = require('path')
const childProcess = require('child_process');

const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');
const PROD = process.env.NODE_ENV == 'production';

const GIT_HASH = childProcess.execSync('git rev-parse HEAD').slice(0, 7).toString();

module.exports = {
  entry: path.resolve(ROOT, 'src', 'client', 'client.tsx'),
  mode: PROD ? 'production' : 'development',
  devtool: PROD ? 'source-map' : 'cheap-source-map',
  output: {
    path: path.resolve('dist', GIT_HASH),
    publicPath: `/js/`,
    filename: '[hash].js',
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
      }
    ],
  },
  plugins: [
    !PROD && new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: path.resolve(ROOT, 'src', 'client', 'client.html'),
      production: PROD,
      gitHash: GIT_HASH,
    }),
  ].filter(Boolean),
  externals: PROD ? {} : {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 3002,
    historyApiFallback: true,
    contentBase: path.resolve(ROOT, 'dist'),
  }
}