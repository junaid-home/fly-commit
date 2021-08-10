const git = require('../src/commands/git')
const commitChanges = require('../src/helpers/commit-changes')

jest.mock('../src/commands/git', () => {
  return {
    addToStage: jest.fn(() => true),
    commitChanges: jest.fn(() => true)
  }
})

test('stage and commit changes', async () => {
  jest.spyOn(process, 'exit').mockImplementation(jest.fn())
  jest.spyOn(console, 'log').mockImplementation(jest.fn())

  const details = {
    title: 'FAKE_TITLE',
    desc: 'FAKE_DESCRIPTION',
    label: 'feat',
    emoji: true
  }

  await commitChanges(details)

  expect(git.addToStage).toHaveBeenCalledTimes(1)
  expect(git.commitChanges).toHaveBeenCalledTimes(1)
  expect(process.exit).toHaveBeenCalledTimes(1)
  expect(process.exit).toHaveBeenCalledWith(0)
  expect(git.commitChanges.mock.calls[0][0]).toMatchInlineSnapshot(`
    Object {
      "desc": "FAKE_DESCRIPTION",
      "title": "feat: 💥 FAKE_TITLE",
    }
  `)
  expect(console.log.mock.calls[0][0]).toMatchInlineSnapshot(`
    "
    [32m[32m✔[39m[32m SUCCESS[39m changes successfully committed!
    "
  `)
})
