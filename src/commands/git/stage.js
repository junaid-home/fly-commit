const exec = require('execa')
const { watch } = require('../../lib')
const ora = require('ora')

const loading = ora()

const addToStage = async () => {
  loading.start('staging...')
  const [error] = await watch(exec, 'git', ['add', '--all'])
  loading.stop()

  if (error) return false

  return true
}

module.exports = {
  addToStage
}
