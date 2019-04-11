const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const childProcess = require('child_process');

const { ROOT_DIR } = require('./config');

const GIT_HASH = childProcess
  .execSync('git rev-parse HEAD')
  .slice(0, 7)
  .toString();

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'devel';
const app = express();

if (env === 'devel') {
  app.use(proxy('http://localhost:3002'));
}

const staticMid = express.static(
  path.resolve(
    ROOT_DIR,
    'dist',
    GIT_HASH,
  ),
);

app.use('/js', staticMid);
app.use('*', staticMid);

app.listen(3001, (err) => {
  err && console.error(err);
  !err && console.log('Running');
});
