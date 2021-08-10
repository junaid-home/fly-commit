const { watch } = require('../src/lib')

const testFunction = jest.fn()

beforeEach(() => testFunction.mockReset())

test('returns an error if the promise gets rejected', async () => {
  const message = `ERROR_MESSAGE`

  testFunction.mockRejectedValueOnce(message)

  const [error, res] = await watch(testFunction)

  expect(testFunction).toBeCalledTimes(1)
  expect(testFunction).toBeCalledWith(/* nothing */)
  expect(error).toBe(message)
  expect(res).toBe(null)
})

test('returns the value if the promise gets resolved', async () => {
  const message = `SUCCESS_MESSAGE`

  testFunction.mockResolvedValueOnce(message)

  const [error, res] = await watch(testFunction)

  expect(testFunction).toBeCalledTimes(1)
  expect(testFunction).toBeCalledWith(/* nothing */)
  expect(res).toBe(message)
  expect(error).toBe(null)
})

test('check whether the right arguments are passed to the handler function', async () => {
  const message = `SUCCESS_MESSAGE`
  testFunction.mockResolvedValueOnce(message)

  const [error, res] = await watch(testFunction, 'abc', 123)

  expect(testFunction).toHaveBeenCalledTimes(1)
  expect(testFunction).toHaveBeenCalledWith('abc', 123)
  expect(res).toBe(message)
  expect(error).toBe(null)
})
