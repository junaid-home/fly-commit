const exec = require('execa')
const { watch } = require('../../lib')
const ora = require('ora')

const loading = ora()

const check = async () => {
  loading.start(`checking git...`)
  const [error] = await watch(exec, 'git', ['--version'])
  loading.stop()

  if (error) return false

  return true
}

const isInitialized = async () => {
  const [error] = await watch(exec, 'git', ['status'])

  if (error) return false

  return true
}

module.exports = {
  check,
  isInitialized
}
