import test from 'ava'
import readMemory from './read-memory.js'

import fs from 'fs'

const DATA_PATH = new URL(['..', 'data', 'test.ljson'].join('/'), import.meta.url).pathname

test.serial('reads passed in memory', t => {
  t.deepEqual(readMemory({}, []), [])
})

test.serial('reads memory from file', t => {
  const options = {
    DATA_PATH
  }
  const data = [{
    p: '/',
    r: '',
    d: new Date().toISOString(),
    w: 1280
  }, {
    p: '/',
    r: '',
    d: '2020-05-23T12:23:54.342Z',
    w: 1280
  }]
  fs.writeFileSync(options.DATA_PATH, data.map(l => JSON.stringify(l)).join('\n') + '\n')

  t.deepEqual(readMemory(options).length, 2)
  fs.unlinkSync(DATA_PATH)
})
