const { serial: test } = require('ava')
const got = require('got')
const app = require('.')

const HTTP_PORT = 8081
const STATS_BASE_URL = `http://localhost:${HTTP_PORT}`
const SITE_BASE_URL = `http://localhost:${HTTP_PORT}`

let server, memory
test.beforeEach(() => {
  const result = app.start({ HTTP_PORT, STATS_BASE_URL, SITE_BASE_URL, DATA_PATH: 'test.ljson' }, [])
  server = result.server
  memory = result.memory
})
test.afterEach(() => server.close())

test('starts server (port 8081)', async t => {
  t.is(server.address().port, HTTP_PORT)
  const response = await got(`http://localhost:${HTTP_PORT}`)
  t.is(response.statusCode, 200)
  t.is(response.headers['content-type'], 'text/html')
})

test('tracks pageview', async t => {
  const response = await got.post(`http://localhost:${HTTP_PORT}/p`, {
    headers: {
      'User-Agent': 'foo-user-agent'
    },
    body: JSON.stringify({
      r: undefined,
      p: 'http://foo.bar/baz',
      w: 1280
    })
  })
  t.is(response.statusCode, 200)
  t.is(memory.length, 1)
  t.is(memory[0].type, 'pageview')
  t.is(memory[0].w, 1280)
  t.is(memory[0].u, 'foo-user-agent')
  t.is(memory[0].p, 'http://foo.bar/baz')
  t.truthy(memory[0].d)
})

test('tracks heartbeat', async t => {
  const response = await got.post(`http://localhost:${HTTP_PORT}/p`, {
    headers: {
      'User-Agent': 'foo-user-agent'
    },
    body: JSON.stringify({
      t: 'heartbeat',
      r: undefined,
      p: 'http://foo.bar/baz',
      w: 1280
    })
  })
  t.is(response.statusCode, 200)
})

test('returns pageviews last h', async t => {
  await got.post(`http://localhost:${HTTP_PORT}/p`, {
    headers: {
      'User-Agent': 'foo-user-agent'
    },
    body: JSON.stringify({
      r: undefined,
      p: 'http://foo.bar/baz',
      w: 1280
    })
  })

  const response = await got(`http://localhost:${HTTP_PORT}/api/today`)
  t.is(response.statusCode, 200)
  const body = JSON.parse(response.body)
  t.is(body.data.length, 1)
  t.is(body.pages.length, 1)
  t.is(body.referrers.length, 0)
  t.is(body.chartData.length, 0)
  t.is(body.live, 1)
})

test('returns live visitors', async t => {
  await got.post(`http://localhost:${HTTP_PORT}/p`, {
    headers: {
      'User-Agent': 'foo-user-agent'
    },
    body: JSON.stringify({
      r: undefined,
      p: 'http://foo.bar/baz',
      w: 1280
    })
  })

  const response = await got(`http://localhost:${HTTP_PORT}/live`)
  t.is(response.statusCode, 200)
  t.is(response.body, '1')
})

test('returns tracker script', async t => {
  const response = await got(`http://localhost:${HTTP_PORT}/client.js`)
  t.is(response.statusCode, 200)
  t.is(response.headers['content-type'], 'text/javascript')
  t.true(response.body.includes(STATS_BASE_URL))
})
