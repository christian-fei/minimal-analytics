const test = require('ava')
const parseOptions = require('./parse-options')

test('parses default options', t => {
  const options = parseOptions({})
  t.truthy(typeof options.DATA_PATH === 'string')
  t.is(options.HTTP_PORT, 8080)
  t.is(options.SITE_BASE_URL, undefined)
  t.is(options.STATS_BASE_URL, undefined)
})
