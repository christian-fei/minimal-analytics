const test = require('ava')
const { msUntilMidnight } = require('./backup')
const HOURS = 60 * 60 * 1000

test('returns ms until midnight', t => {
  const relativeNow = +new Date(new Date().toISOString().substring(0, 11) + '22:00:00.000Z')

  t.is(msUntilMidnight(relativeNow), 2 * HOURS)
})
