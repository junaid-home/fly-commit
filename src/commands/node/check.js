const ora = require('ora')

const loading = ora()

const check = version => {
  loading.start(`checking node...`)
  if (typeof version !== 'number') throw new Error(`version must be of type number`)

  const start = 1
  const length = 2

  const nodeVersion = process.version
  const major = Number(nodeVersion.substr(start, length))
  loading.stop()

  return major > version
}

module.exports = {
  check
}
