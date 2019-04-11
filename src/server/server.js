const express = require('express');
const path = require('path');
const proxy = require('express-http-proxy');

const { env, ROOT_DIR } = require('./config');

const { COMMIT_HASH = '' } = process.env;

const app = express();

if (env === 'devel') {
  app.use(proxy('http://localhost:3002'));
}

const staticMid = express.static(
  path.resolve(
    ROOT_DIR,
    'dist',
    COMMIT_HASH,
  ),
);

app.use('/js', staticMid);
app.use('*', staticMid);

app.listen(3000, (err) => {
  err && console.error(err);
  !err && console.log(`[Peekaboo]:3001 ${env}@${COMMIT_HASH}`);
});
