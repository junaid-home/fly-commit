const exec = require('execa')
const { watch } = require('../../lib')
const ora = require('ora')

const loading = ora()

const initialize = async () => {
  loading.start('initializing git...')
  const [error] = await watch(exec, 'git', ['init'])
  loading.stop()

  if (error) return false

  return true
}

module.exports = {
  initialize
}
