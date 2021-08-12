const chalk = require('chalk')
const symbols = require('log-symbols')

const emoji = require('./emoji')

const git = require('../commands/git')

const commitChanges = async details => {
  const label = details.label
  let title = details.title
  let desc = details.desc

  if (!desc.length) desc = null

  if (!details.emoji) title = `${label}: ${title}`
  else title = `${label}: ${emoji[label]} ${title}`

  const message = { title, desc }

  const isStaged = await git.addToStage()
  if (!isStaged) {
    console.log(chalk.red(`\n${symbols.error} failed to staged changes!\n`))
    process.exit(1)
  }

  const error = await git.commitChanges(message)
  if (error.stdout) {
    console.log(chalk.red(`\n${symbols.error} Error: \n\n ${error.stdout}\n`))
    process.exit(1)
  }
  if (error.stderr) {
    console.log(chalk.red(`\n${symbols.error} Error: \n\n ${error.stderr}\n`))
    process.exit(1)
  }

  console.log(
    `\n${chalk.green(
      `${symbols.success} SUCCESS`
    )} changes successfully committed!\n`
  )

  process.exit(0)
}

module.exports = commitChanges
