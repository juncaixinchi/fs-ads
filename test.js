const fs =require('fs')
const ads = require('./index')
const expect = require('chai').expect

const path = fs.mkdtempSync('/tmp')

const stream = 'user.fs-ads.test'
const data = 'just a test string'

describe('fs-ads #sync', () => {
  it('should throw ENOENT Error', done => {
    try {
      ads.getSync(path, stream)
    } catch (e) {
      if (e && e.code === 'ENOENT') done()
      throw new Error(e)        
    }
    throw new Error('remove ads failed !')        
  })

  it('should set an ads', () => {
    ads.setSync(path, stream, data)
  })

  it('should get an ads', () => {
    expect(ads.getSync(path, stream)).to.be.equal(data)
  })

  it('should remove an ads', () => {
    ads.removeSync(path, stream)
  })

  it('should throw ENOENT Error', done => {
    try {
      ads.getSync(path, stream)
    } catch (e) {
      if (e && e.code === 'ENOENT') done()
      throw new Error(e)        
    }
    throw new Error('remove ads failed !')        
  })
})

describe('fs-ads #async', () => {
  it('should throw ENOENT Error', done => {
      ads.get(path, stream, (error) => {
        if (error && error.code === 'ENOENT') done()
        throw new Error(error)        
      })
  })

  it('should set an ads', () => {
    ads.set(path, stream, data, (error) => {
      if (error) throw done(error)
    })
  })

  it('should get an ads', () => {
    ads.get(path, stream, (error, result) => {
      if (error) throw done(error)
      expect(result).to.be.equal(data)
    })
  })

  it('should remove an ads', () => {
    ads.remove(path, stream, (error, result) => {
      if (error) throw done(error)
    })
  })
})
