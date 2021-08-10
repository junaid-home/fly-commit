const chalk = require('chalk')

const chainOpts = [
  {
    type: 'text',
    name: 'title',
    message: `commit title?`,
    validate: val => {
      if (typeof val !== 'string' || val.length < 3)
        return 'Title must be at least 3 characters long!'

      return true
    }
  },
  {
    type: 'text',
    name: 'desc',
    message: `commit description? ${chalk.dim(`(optional)`)}`
  },
  {
    type: 'select',
    name: 'label',
    message: 'select type of change you are commiting?',
    choices: [
      {
        title: 'fix: A bug fix',
        value: 'fix'
      },
      { title: 'feat: A new feature', value: 'feat' },
      { title: 'docs: Documentation changes', value: 'docs' },
      { title: 'test: Adding or correcting existing tests', value: 'test' },
      {
        title: 'refactor: A code change that neither fixes a bug nor adds a feature',
        value: 'refactor'
      },
      { title: 'perf: A code change that improves performance', value: 'perf' },
      { title: 'build: Changes that affect the build system', value: 'build' },
      {
        title: 'style: Changes that do not affect the meaning of the code',
        value: 'style'
      },
      { title: 'ci: Changes to CI configurations', value: 'ci' },
      { title: 'vendor: Bumping a dependency like jest or node', value: 'vendor' },
      {
        title: 'chore: Changes configurations like glup or jest configs',
        value: 'chore'
      }
    ],
    initial: 0
  },
  {
    type: 'toggle',
    name: 'emoji',
    message: 'include suitable emoji?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  }
]

const singleOpt = {
  type: 'toggle',
  name: 'granted',
  message: 'do you want to initialize?',
  initial: true,
  active: 'yes',
  inactive: 'no'
}

module.exports = {
  chainOpts,
  singleOpt
}
