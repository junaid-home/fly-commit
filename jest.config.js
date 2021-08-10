const path = require('path')

module.exports = {
  rootDir: path.resolve('./'),
  coverageDirectory: 'coverage',
  displayName: 'FLY COMMIT',
  testMatch: ['**/__tests__/**/*.js', '**/**/*.spec.js', '**/**/*.test.js'],
  testEnvironment: 'jest-environment-node',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
}
