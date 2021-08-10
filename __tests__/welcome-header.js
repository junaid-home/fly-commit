const { welcome } = require('../src/lib')
const node = require('../src/commands/node')

jest.spyOn(node, 'clearScreen').mockImplementationOnce(jest.fn())
jest.spyOn(console, 'log').mockImplementation('')

beforeEach(() => {
  node.clearScreen.mockClear()
  console.log.mockClear()
})

test('clear the screen if the clear option set to true', () => {
  welcome()
  expect(node.clearScreen).toHaveBeenCalledTimes(1)
  expect(node.clearScreen).toHaveBeenCalledWith(/* nothing */)
})

test('not clear the screen if the clear option set to false', () => {
  welcome({ clear: false })
  expect(node.clearScreen).toHaveBeenCalledTimes(0)
})

test('logs title description and version to the console', () => {
  console.log = jest.fn()

  welcome({ clear: false, version: '1.0.0', title: 'SOME_TITLE', desc: 'SOME_DESC' })

  expect(console.log.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      "[32m[1m[7m SOME_TITLE [27m[22m[39m v1.0.0 [2mSOME_DESC[22m
        ",
    ]
  `)
})
