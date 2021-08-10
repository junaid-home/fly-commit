const { check, isInitialized } = require('./check')
const { commitChanges } = require('./commit')
const { initialize } = require('./initialize')
const { addToStage } = require('./stage')

module.exports = {
  check,
  isInitialized,
  initialize,
  addToStage,
  commitChanges
}
