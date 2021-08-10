const node = require('../../src/commands/node')
const { watch } = require('../../src/lib')

test('returns false if the current node version is less than expected', () => {
  const currentMajorVersion = Number(process.version.substr(1, 2))
  expect(node.check(currentMajorVersion + 1)).toBe(false)
})

test('returns true if the current node version is greater than input', () => {
  const currentMajorVersion = Number(process.version.substr(1, 2))
  expect(node.check(currentMajorVersion - 1)).toBe(true)
})

test('throws an exception if the argument is not a number', async () => {
  const [error] = await watch(node.check, '')

  expect(error.message).toMatchInlineSnapshot(`"version must be of type number"`)
})
