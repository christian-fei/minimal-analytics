import test from 'ava'
import parseOptions from './parse-options.js'

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
