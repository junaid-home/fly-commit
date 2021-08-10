const watch = async (handler, ...args) => {
  try {
    const result = await handler(...args)
    return [null, result]
  } catch (err) {
    return [err, null]
  }
}

module.exports = {
  watch
}
