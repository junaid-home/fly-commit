const git = require('../../src/commands/git')
const exec = require('execa')

jest.mock('execa')

beforeEach(() => exec.mockClear())

test('returns true if git successfully initialized', async () => {
  exec.mockResolvedValueOnce([null, true])
  const result = await git.initialize()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['init'])
  expect(result).toBe(true)
})

test('returns false if git is not successfully initialized', async () => {
  exec.mockRejectedValueOnce([true, null])
  const result = await git.initialize()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['init'])
  expect(result).toBe(false)
})
