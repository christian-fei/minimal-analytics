import test from 'ava'

import fs from 'fs'
import { URL } from 'url'

import { msUntilMidnight, backup } from './backup.js'

const HOURS = 60 * 60 * 1000
const DATA_PATH = new URL(['..', 'data', 'test.ljson'].join('/'), import.meta.url).pathname

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
