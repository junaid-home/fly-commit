const node = require('../commands/node')
const chalk = require('chalk')

const welcome = options => {
  const defaultOpts = {
    clear: true,
    title: 'title',
    version: '1.0.0',
    desc: 'description',
    ...options
  }

  defaultOpts.clear && node.clearScreen()

  console.log(
    `${chalk.green.bold.inverse(` ${defaultOpts.title} `)} v${
      defaultOpts.version
    } ${chalk.dim(defaultOpts.desc)}
    `
  )
}

module.exports = {
  welcome
}
