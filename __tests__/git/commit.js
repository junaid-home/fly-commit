const git = require('../../src/commands/git')
const exec = require('execa')
const { watch } = require('../../src/lib')

jest.mock('execa')

beforeEach(() => exec.mockClear())

test('returns true if changes are successfully commited', async () => {
  exec.mockResolvedValueOnce([null, true])
  const message = { title: 'FAKE_TITLE', desc: 'FAKE_DESCRIPTION' }

  const result = await git.commitChanges(message)

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', [
    'commit',
    '-m',
    message.title,
    '-m',
    message.desc
  ])
  expect(result).toBe(true)
})

test('returns false if changes are not successfully commited', async () => {
  exec.mockRejectedValueOnce([true, null])
  const message = { title: 'FAKE_TITLE', desc: 'FAKE_DESCRIPTION' }

  const result = await git.commitChanges(message)

  expect(exec).toHaveBeenCalledTimes(1)
  expect(exec).toHaveBeenCalledWith('git', [
    'commit',
    '-m',
    message.title,
    '-m',
    message.desc
  ])
  expect(result).toBe(false)
})

test('throws an exception is the argument is not an object', async () => {
  exec.mockRejectedValueOnce([true, null])
  const message = 'FAKE_MESSAGE'

  const [error] = await watch(git.commitChanges, message)

  expect(error.message).toMatchInlineSnapshot(`"message must of type Object."`)
})

test('throws an exception is the argument object do not contain title key', async () => {
  exec.mockRejectedValueOnce([true, null])
  const message = { desc: 'FAKE_MESSAGE' }

  const [error] = await watch(git.commitChanges, message)

  expect(error.message).toMatchInlineSnapshot(`"message must have a title key."`)
})
