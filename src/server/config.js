const env = process.env.NODE_ENV === 'production' ? 'prod' : 'devel';
const ROOT_DIR = env === 'devel' ? '../../' : '.';

module.exports = {
  env,
  ROOT_DIR,
};
