import test from 'ava'
import fs from 'fs'
import trackPageview from './track-pageview.js'

let memory
let live
const pageview = { v: 'visitor1', d: '2021-04-24T09:29:03.807Z', p: '/about', r: '' }
const DATA_PATH = new URL(['..', 'test.ljson'].join('/'), import.meta.url).pathname

test.beforeEach(() => {
  memory = []
  live = {}
})

test.serial('tracks pageview in memory', t => {
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
  t.truthy(live.visitor1.pageview)
  t.truthy(live.visitor1.heartbeat)
})

test.serial('tracks pageview on file', t => {
  const options = { DATA_PATH }

  trackPageview(pageview, options, memory, live)
  const data = fs.readFileSync(DATA_PATH, { encoding: 'utf8' }).toString().split('\n').filter(Boolean)

  t.deepEqual(data, [
    '{"v":"visitor1","d":"2021-04-24T09:29:03.807Z","p":"/about","r":""}'
  ])
  fs.unlinkSync(DATA_PATH)
})
