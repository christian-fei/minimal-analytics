const test = require('ava')
const parseOptions = require('./parse-options')

test('throws if missing SITE_BASE_URL or STATS_BASE_URL', t => {
  t.throws(() => parseOptions({}))
  t.throws(() => parseOptions({ STATS_BASE_URL: 'https://stats.example.com' }))
  t.throws(() => parseOptions({ SITE_BASE_URL: 'https://example.com' }))
})

test('parses default options', t => {
  const options = parseOptions({
    STATS_BASE_URL: 'https://stats.example.com',
    SITE_BASE_URL: 'https://example.com'
  })

  t.truthy(typeof options.DATA_PATH === 'string')
  t.is(options.HTTP_PORT, 8080)
  t.is(options.SITE_BASE_URL, 'https://example.com')
  t.is(options.STATS_BASE_URL, 'https://stats.example.com')
})
