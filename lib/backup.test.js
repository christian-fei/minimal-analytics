const fs = require('fs')
const path = require('path')
const test = require('ava')
const { msUntilMidnight, backup } = require('./backup')

const HOURS = 60 * 60 * 1000
const DATA_PATH = path.resolve(__dirname, '..', 'data', 'test.ljson')

test('returns ms until midnight', t => {
  const relativeNow = +new Date(new Date().toISOString().substring(0, 11) + '22:00:00.000Z')

  t.is(msUntilMidnight(relativeNow), 2 * HOURS)
})

test('backs up file', t => {
  fs.writeFileSync(DATA_PATH, '', { encoding: 'utf8' })
  backup({ DATA_PATH }, false)

  t.true(fs.existsSync(DATA_PATH + '.bkp'))
  fs.unlinkSync(DATA_PATH)
})
