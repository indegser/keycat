const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const childProcess = require('child_process');

const GIT_HASH = childProcess
  .execSync('git rev-parse HEAD')
  .slice(0, 7)
  .toString();

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'devel';
const app = express();

if (env === 'devel') {
  app.use(proxy('http://localhost:3002'));
}

app.use(express.static(
  path.resolve(
    __dirname,
    '..',
    'dist',
    GIT_HASH,
  ),
));

app.listen(3001, (err) => {
  err && console.error(err);
  !err && console.log('Running');
});
