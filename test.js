const fs = require('fs')
const ads = require('./index')
const expect = require('chai').expect

const path = fs.mkdtempSync('/tmp')

const stream = 'user.fs-ads.test'
const streamCyrillic = 'user.fs-ads.test-cyrillic'
const data = 'just a test string'
const dataCyrillic = 'тестовая строка'
const isCyrillic = true;

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

describe('fs-ads cyrillic #sync', () => {
  it('should throw ENOENT Error', done => {
    try {
      ads.getSync(path, streamCyrillic, isCyrillic)
    } catch (e) {
      if (e && e.code === 'ENOENT') done()
      throw new Error(e)        
    }
    throw new Error('remove ads failed !')        
  })

  it('should set an ads', () => {
    ads.setSync(path, streamCyrillic, dataCyrillic)
  })

  it('should get an ads', () => {
    expect(ads.getSync(path, streamCyrillic, isCyrillic).toString()).to.be.equal(dataCyrillic)
  })

  it('should remove an ads', () => {
    ads.removeSync(path, streamCyrillic)
  })

  it('should throw ENOENT Error', done => {
    try {
      ads.getSync(path, streamCyrillic, isCyrillic)
    } catch (e) {
      if (e && e.code === 'ENOENT') done()
      throw new Error(e)        
    }
    throw new Error('remove ads failed !')        
  })
})

describe('fs-ads cyrillic #async', () => {
  it('should throw ENOENT Error', done => {
      ads.get(path, streamCyrillic, (error) => {
        if (error && error.code === 'ENOENT') done()
        throw new Error(error)        
      }, isCyrillic)
  })

  it('should set an ads', () => {
    ads.set(path, streamCyrillic, dataCyrillic, (error) => {
      if (error) throw done(error)
    })
  })

  it('should get an ads', () => {
    ads.get(path, streamCyrillic, (error, result) => {
      if (error) throw done(error)
      expect(result).to.be.equal(dataCyrillic)
    }, isCyrillic)
  })

  it('should remove an ads', () => {
    ads.remove(path, streamCyrillic, (error, result) => {
      if (error) throw done(error)
    })
  })
})