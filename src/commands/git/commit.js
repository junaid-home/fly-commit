const exec = require('execa')
const { watch } = require('../../lib')
const ora = require('ora')

const loading = ora()

const commitChanges = async message => {
  if (typeof message !== 'object') throw new Error('message must of type Object.')
  if (!message.title) throw new Error('message must have a title key.')

  const description = message.desc ? ['-m', message.desc] : ''
  const title = message.title ? ['-m', message.title] : ''

  loading.start(`commiting changes...`)
  const [error] = await watch(exec, 'git', ['commit', ...title, ...description])
  loading.stop()

  if (error) return error

  return false
}

module.exports = {
  commitChanges
}
