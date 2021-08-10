const git = require('../../src/commands/git')
const exec = require('execa')

jest.mock('execa')

beforeEach(() => exec.mockClear())

test('returns true if changes are successfully staged', async () => {
  exec.mockResolvedValueOnce([null, true])
  const result = await git.addToStage()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['add', '--all'])
  expect(result).toBe(true)
})

test('returns false if changes are not successfully staged', async () => {
  exec.mockRejectedValueOnce([true, null])
  const result = await git.addToStage()

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', ['add', '--all'])
  expect(result).toBe(false)
})
