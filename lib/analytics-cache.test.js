const test = require('ava')
const analyticsCache = require('./analytics-cache')

test('caches result', t => {
  analyticsCache.getAll('/', [], {})

  t.is(Object.keys(analyticsCache.cache).length, 1)
  t.truthy(analyticsCache.cache['/'])
  t.truthy(analyticsCache.cache['/'].result)
  t.truthy(analyticsCache.cache['/'].timestamp)
})
