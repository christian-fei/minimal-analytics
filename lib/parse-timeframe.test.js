const test = require('ava')
const parseTimeframe = require('./parse-timeframe')

const now = Date.now()

test('defaults to past day', t => {
  t.is(parseTimeframe('', now).startDate, now - 1000 * 60 * 60 * 24)
})

test('parses today', t => {
  t.is(parseTimeframe('?timeframe=today', now).startDate, +new Date(new Date(now).toISOString().substring(0, 10) + 'T00:00:00.000Z'))
})

test('parses past-week', t => {
  t.is(parseTimeframe('?timeframe=past-week', now).startDate, now - 1000 * 60 * 60 * 24 * 7)
})

test('parses past-month', t => {
  t.is(parseTimeframe('?timeframe=past-month', now).startDate, now - 1000 * 60 * 60 * 24 * 31)
})

test('parses past-year', t => {
  t.is(parseTimeframe('?timeframe=past-year', now).startDate, now - 1000 * 60 * 60 * 24 * 365)
})

test('parses invalid, default to past day', t => {
  t.is(parseTimeframe('?timeframe=invalid', now).startDate, now - 1000 * 60 * 60 * 24)
})
