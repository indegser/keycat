const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const ROOT = path.resolve(__dirname, '..')
const { COMMIT_REF } = process.env

module.exports = (_, { mode = 'development' }) => {
  const PRODUCTION = mode !== 'development'
  const config = {
    entry: path.resolve(ROOT, 'src', 'client', 'client.tsx'),
    mode,
    devtool: PRODUCTION ? 'source-map' : 'cheap-source-map',
    output: {
      path: path.resolve('public'),
      publicPath: `/`,
      filename: `[hash].js`,
    }, 
    resolve: {
      modules: ['node_modules', path.resolve(ROOT, 'src', 'client')],
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      !PRODUCTION && new webpack.HotModuleReplacementPlugin(),
      new HtmlPlugin({
        template: path.resolve(ROOT, 'src', 'client', 'client.html'),
        PRODUCTION,
        COMMIT_REF,
        ORIGIN: PRODUCTION ? 'http://localhost:3000' : 'https://eos-peekaboo.netlify.com',
      }),
      new CopyPlugin([
        { from: path.resolve(ROOT, 'static'), to: path.resolve(ROOT, 'public')}
      ])
    ].filter(Boolean),
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
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
        },
      ],
    },
    externals: PRODUCTION ? {} : {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  }
  
  if (!PRODUCTION) {
    config.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      contentBase: path.resolve(ROOT, 'public'),
    }
  }

  return config
}
