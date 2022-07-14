import test from 'ava'

import * as analyticsCache from './analytics-cache.js'

test('caches result', t => {
  analyticsCache.getAll('/', [], {})

  t.is(Object.keys(analyticsCache.cache).length, 1)
  t.truthy(analyticsCache.cache['/'])
  t.truthy(analyticsCache.cache['/'].result)
  t.truthy(analyticsCache.cache['/'].timestamp)
})
