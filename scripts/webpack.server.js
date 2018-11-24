const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ROOT = path.resolve(__dirname, '..');
module.exports = {
  entry: path.resolve(ROOT, 'src', 'server', 'server.js'),
  mode: 'development',
  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: 'xafe.js',
  },
  resolve: {
    modules: ['node_modules', path.resolve(ROOT, 'src', 'server')],
    extensions: ['.js'],
  },
  // target: 'node',
  externals: [nodeExternals()],
};