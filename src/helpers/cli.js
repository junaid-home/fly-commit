const meow = require('meow')

const cli = meow(
  `
commit <COMMANDS> [OPTIONS]

OPTIONS
-h, --help      Show usage guide
-v, --version   Print current version of fly-commit
-t, --title     Title of commit message
-d, --desc      Description of commit message (Optional)
--no-emoji      Don't include emoji in final output

COMMANDS
fix             A bug fix
feat            A new feature
docs            Documentation changes
test            Adding missing tests or correcting existing tests
build           Changes that affect the build system
ci              Changes to our CI configuration files and scripts
perf            A code change that improves performance
refactor        A code change that neither fixes a bug nor adds a feature
style           Changes that do not affect the meaning of the code (linting)
vendor          Bumping a dependency like jest or node
chore           Changes configurations like glup or jest configs

EXAMPLES
commit feat -t "initial commit" -d "setup the boilerplate"
commit fix --no-emoji -t "typo in pkg.json"

`,
  {
    allowUnknownFlags: false,
    hardRejection: false,
    flags: {
      help: {
        alias: 'h',
        isMultiple: false,
        type: 'boolean'
      },
      title: {
        alias: 't',
        type: 'string',
        default: '',
        isMultiple: false
      },
      desc: {
        alias: 'd',
        type: 'string',
        default: '',
        isMultiple: false
      },
      emoji: {
        type: 'boolean',
        default: true,
        isMultiple: false
      },
      debug: {
        type: 'boolean',
        default: false,
        isMultiple: false
      },
      version: {
        alias: 'v',
        type: 'boolean',
        default: false,
        isMultiple: false
      }
    }
  }
)

module.exports = cli
