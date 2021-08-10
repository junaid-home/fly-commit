const git = require('../../src/commands/git')
const exec = require('execa')

jest.mock('execa')

beforeEach(() => exec.mockClear())

test('returns true if git is installed globally in the OS', async () => {
  exec.mockResolvedValueOnce([null, true])
  const result = await git.check()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['--version'])
  expect(result).toBe(true)
})

test('returns false if git is not installed globally in the OS', async () => {
  exec.mockRejectedValueOnce([true, null])
  const result = await git.check()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['--version'])
  expect(result).toBe(false)
})

test('returns false if git is not initialized in the current directory', async () => {
  exec.mockRejectedValueOnce([true, null])
  const result = await git.isInitialized()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['status'])
  expect(result).toBe(false)
})

test('returns true if git is initialized in the current directory', async () => {
  exec.mockResolvedValueOnce([null, true])
  const result = await git.isInitialized()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['status'])
  expect(result).toBe(true)
})
