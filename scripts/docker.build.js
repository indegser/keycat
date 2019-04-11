const cp = require('child_process');

const COMMIT_HASH = cp.execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

const docker = cp.exec(`docker build --build-arg COMMIT_HASH=${COMMIT_HASH.toString().trim()} -t peekaboo:latest .`);

docker.stdout.on('data', data => console.log(data.toString()));
