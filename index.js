const fs = require('fs')

const validateArgument = (key, val) => {
  switch (key) {
    case 'path':
      if (typeof val === 'string') return val
      throw new TypeError('`path` must be a string')
    case 'stream':
      if (typeof val === 'string') return val
      throw new TypeError('`stream` must be a string')
    case 'value':
      if (typeof val === 'string') return Buffer.from(val)
      if (Buffer.isBuffer(val)) return val
      throw new TypeError('`value` must be a string or buffer')
    case 'cb':
      if (typeof val === 'function') return val
      if (val == null) return ((err) => { if (err) throw err })
      throw new TypeError('`cb` must be a function')
    case 'ops':
      if (typeof val === 'object') return val
      throw new TypeError('`options` must be a object')
    default:
      throw new Error(`Unknown argument: ${key}`)
  }
}

exports.get = (path, stream, ops, cb) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  const options = typeof ops === 'function' ? { encoding: 'utf-8' } : validateArgument('ops', ops)
  const callback = typeof ops === 'function' ? ops : validateArgument('cb', cb)

  fs.readFile(`${path}:${stream}`, options, callback)
}

exports.getSync = (path, stream, ops) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  const options = ops ? validateArgument('ops', ops) : { encoding: 'utf-8' }

  return fs.readFileSync(`${path}:${stream}`, options)
}

exports.set = (path, stream, value, ops, cb) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  value = validateArgument('value', value)
  const options = typeof ops === 'function' ? { encoding: 'utf-8' } : validateArgument('ops', ops)
  const callback = typeof ops === 'function' ? ops : validateArgument('cb', cb)

  fs.writeFile(`${path}:${stream}`, value, options, callback)
}

exports.setSync = (path, stream, value, ops) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  value = validateArgument('value', value)
  const options = ops ? validateArgument('ops', ops) : { encoding: 'utf-8' }

  return fs.writeFileSync(`${path}:${stream}`, value, options)
}

exports.remove = (path, stream, cb) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  cb = validateArgument('cb', cb)
  fs.unlink(`${path}:${stream}`, cb)
}

exports.removeSync = (path, stream) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  return fs.unlinkSync(`${path}:${stream}`)
}
