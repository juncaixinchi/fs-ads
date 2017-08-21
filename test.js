const ads = require('./index')

const path = './tmp/a.txt'
const stream = 'user.fs-ads.test'

const ss = ads.setSync(path, stream, 'just a test string')
const gs = ads.getSync(path, stream)
const rs = ads.removeSync(path, stream)
console.log('ss gs rs', ss, gs, rs)

ads.set(path, stream, 'just a test string', (error) => {
  console.log('ads.set, error:', error)
  ads.get(path, stream, (error, value) => {
    console.log('ads.get, error:', error, ', value:', value)
    ads.remove(path, stream, (error) => {
      console.log('ads.remove, error:', error)
    })
  })
})

