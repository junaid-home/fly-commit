const git = require('../src/commands/git')
const initGit = require('../src/helpers/init-git')

beforeEach(() => jest.restoreAllMocks())

test('initialize git if clinet select YES', async () => {
  jest.spyOn(git, 'initialize').mockResolvedValueOnce(true)
  jest.spyOn(console, 'log').mockImplementation(jest.fn())

  const fakePrompts = jest.fn(() => ({ granted: true }))
  const opts = 'FAKE_PROMPT_OPTIONS'

  await initGit(fakePrompts, opts)

  expect(git.initialize).toHaveBeenCalledTimes(1)
  expect(git.initialize).toHaveBeenCalledWith(/* nothing */)
  expect(console.log.mock.calls[1][0]).toMatchInlineSnapshot(`
    "
    [32m[32m✔[39m[32m SUCCESS[39m git successfully initialized!
    "
  `)
})

test('exit with code 1 if the client select NO', async () => {
  jest.spyOn(git, 'initialize').mockResolvedValueOnce(false)
  jest.spyOn(process, 'exit').mockImplementation(jest.fn())
  jest.spyOn(console, 'log').mockImplementation(jest.fn())

  const fakePrompts = jest.fn(() => ({ granted: false }))
  const opts = 'FAKE_PROMPT_OPTIONS'

  await initGit(fakePrompts, opts)

  expect(git.initialize).not.toHaveBeenCalled()
  expect(process.exit).toHaveBeenCalledWith(1)
  expect(process.exit).toHaveBeenCalledTimes(1)
})
