const { serial: test, beforeEach } = require('ava')
const path = require('path')
const fs = require('fs')

const trackPageview = require('./track-pageview')

let memory
let live
const pageview = { v: 'visitor1', d: '2021-04-24T09:29:03.807Z', p: '/about', r: '' }
const DATA_PATH = path.resolve(__dirname, '..', 'test.ljson')

beforeEach(() => {
  memory = []
  live = {}
})

test('tracks pageview in memory', t => {
  const options = {}

  trackPageview(pageview, options, memory, live)

  t.deepEqual(memory, [
    {
      d: '2021-04-24T09:29:03.807Z',
      p: '/about',
      r: '',
      v: 'visitor1'
    }
  ])
  t.deepEqual(live, {
    visitor1: 1619256543807
  })
})

test('tracks pageview on file', t => {
  const options = { DATA_PATH }

  trackPageview(pageview, options, memory, live)
  const data = fs.readFileSync(DATA_PATH, { encoding: 'utf8' }).toString().split('\n').filter(Boolean)

  t.deepEqual(data, [
    '{"v":"visitor1","d":"2021-04-24T09:29:03.807Z","p":"/about","r":""}'
  ])
  fs.unlinkSync(DATA_PATH)
})
