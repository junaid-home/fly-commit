const chalk = require('chalk')
const git = require('../commands/git')

const symbols = require('log-symbols')

const initGit = async (prompts, opts) => {
  console.log(
    chalk.yellow(`${symbols.warning} git is not initialized in this directory.`)
  )
  const { granted } = await prompts(opts, { onCancel: () => process.exit(1) })

  if (!granted) return process.exit(1)

  const status = await git.initialize()
  if (!status) {
    console.log(
      chalk.red(`\n${symbols.error} failed to initialize git in this directory!\n`)
    )
    process.exit(1)
  }

  console.log(
    `\n${chalk.green(`${symbols.success} SUCCESS`)} git successfully initialized!\n`
  )
}

module.exports = initGit
