const node = require('../commands/node')
const git = require('../commands/git')
const symbols = require('log-symbols')

const { welcome } = require('../lib')

const pkg = require('../../package.json')
const chalk = require('chalk')

const init = async () => {
  const isNode = node.check(10)
  const isGit = await git.check()

  if (!isNode) {
    console.log(
      chalk.red(
        `${symbols.error} ERROR: you have outdated node version installed in your Operating system, Please update it to the latest version inorder to run this cli.`
      )
    )
    process.exit(1)
  }

  if (!isGit) {
    console.log(
      chalk.red(
        `${symbols.error} ERROR: git is not installed in your Operating system, make sure you have git installed inorder to run this cli.`
      )
    )
    process.exit(1)
  }

  welcome({
    clear: true,
    title: 'FLY COMMIT',
    desc: pkg.description,
    version: pkg.version
  })
}

module.exports = init
