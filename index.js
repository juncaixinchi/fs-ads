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
    default:
      throw new Error(`Unknown argument: ${key}`)
  }
}

exports.get = (path, stream, cb) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  cb = validateArgument('cb', cb)

  fs.readFile(`${path}:${stream}`, { encoding: 'utf-8' }, cb)
}

exports.getSync = (path, stream) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)

  return fs.readFileSync(`${path}:${stream}`, { encoding: 'utf-8' })
}

exports.set = (path, stream, value, cb) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  value = validateArgument('value', value)
  cb = validateArgument('cb', cb)

  fs.writeFile(`${path}:${stream}`, value, cb)
}

exports.setSync = (path, stream, value) => {
  path = validateArgument('path', path)
  stream = validateArgument('stream', stream)
  value = validateArgument('value', value)

  return fs.writeFileSync(`${path}:${stream}`, value)
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
