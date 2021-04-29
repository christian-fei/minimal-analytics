const { serial: test } = require('ava')
const readMemory = require('./read-memory')
const fs = require('fs')
const path = require('path')

test('reads passed in memory', t => {
  t.deepEqual(readMemory({}, []), [])
})

test('reads memory from file', t => {
  const options = {
    DATA_PATH: path.resolve(__dirname, '..', 'data', 'test.ljson')
  }
  const data = [{
    p: '/',
    r: '',
    d: new Date().toISOString(),
    w: 1280
  }]
  fs.writeFileSync(options.DATA_PATH, data.map(l => JSON.stringify(l)).join('\n') + '\n')

  t.deepEqual(readMemory(options), data)
})
