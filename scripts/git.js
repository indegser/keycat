const { spawn } = require('child_process')

const git = async (...args) => (
  new Promise((res, rej) => {
    const git = spawn('git', args)
    git.stdout.on('data', (data) => {
      const result = data.toString().trim()
      res(result)
    })
  })
)

module.exports = git