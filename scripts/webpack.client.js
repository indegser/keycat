const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CspPlugin = require('csp-html-webpack-plugin')
const SriPlugin = require('webpack-subresource-integrity')
const git = require('./git')

const ROOT = path.resolve(__dirname, '..')

module.exports = async (_, { mode = 'development' }) => {
  const { ORIGIN = 'http://localhost:3030' } = process.env

  const COMMIT_REF = (process.env.COMMIT_REF || (await git('rev-parse', 'HEAD'))).slice(0, 7)

  const PRODUCTION = mode !== 'development'

  const config = {
    entry: path.resolve(ROOT, 'src', 'client.tsx'),
    mode,
    devtool: PRODUCTION ? 'source-map' : 'cheap-source-map',
    output: {
      path: path.resolve('public'),
      publicPath: '/',
      filename: `[hash].js`,
      crossOriginLoading: 'anonymous',
    },
    resolve: {
      modules: ['node_modules', path.resolve(ROOT, 'src')],
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      !PRODUCTION && new webpack.HotModuleReplacementPlugin(),
      new HtmlPlugin({
        template: path.resolve(ROOT, 'src', 'client.html'),
        PRODUCTION,
        COMMIT_REF: COMMIT_REF.slice(0, 7),
        ORIGIN,
      }),
      PRODUCTION &&
        new SriPlugin({
          hashFuncNames: ['sha256', 'sha384'],
          enabled: true,
        }),
      PRODUCTION && new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        COMMIT_REF: JSON.stringify(COMMIT_REF),
        MODE: JSON.stringify(mode),
        BRANCH: JSON.stringify(''),
        PUBLIC_PATH: JSON.stringify(''),
      }),
      new CspPlugin(
        {
          'base-uri': `'self'`,
          'object-src': `'none'`,
          'font-src': [`https://fonts.gstatic.com`, `https://rsms.me`],
          'script-src': [
            `'self'`,
            `'strict-dynamic'`,
            `https://rsms.me`,
            `https://fonts.googleapis.com`,
            `https://www.googletagmanager.com`,
          ],
          'style-src': [`'self'`, `https://rsms.me`, `https://fonts.googleapis.com`, `'unsafe-inline'`],
        },
        {
          nonceEnabled: {
            'style-src': false,
          },
        },
      ),
      new CopyPlugin([{ from: path.resolve(ROOT, 'static'), to: path.resolve(ROOT, 'public') }]),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: 'react-svg-loader',
        },
        {
          test: /\.(png|jpg|gif|md)$/,
          loader: 'file-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    externals: PRODUCTION
      ? {}
      : {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
  }

  if (!PRODUCTION) {
    config.devServer = {
      hot: true,
      host: '0.0.0.0',
      port: 3030,
      historyApiFallback: true,
      contentBase: path.resolve(ROOT, 'public'),
    }
  }

  // if (PRODUCTION) {
  //   config.optimization = {
  //     runtimeChunk: 'single',
  //     splitChunks: {
  //       // chunks: 'all',
  //       // maxInitialRequests: Infinity,
  //       // minSize: 0,
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           chunks: 'all',
  //           priority: 1,
  //           maxSize: 300 * 1024,
  //         },
  //       },
  //     },
  //   }
  // }

  return config
}
