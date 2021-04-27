const test = require('ava')
const parseTimeframe = require('./parse-timeframe')

const now = +new Date(new Date().toUTCString())

test('defaults to past day', t => {
  t.is(parseTimeframe('', now).startDate, now - 1000 * 60 * 60 * 24)
})

test('parses today', t => {
  const todayMidnight = new Date(now)
  todayMidnight.setHours(0)
  todayMidnight.setMinutes(0)
  todayMidnight.setSeconds(0)
  todayMidnight.setMilliseconds(0)

  t.is(parseTimeframe('?timeframe=today', now).startDate, +todayMidnight)
})

test('parses past-week', t => {
  t.is(parseTimeframe('?timeframe=past-week', now).startDate, now - 1000 * 60 * 60 * 24 * 7)
})

test('parses past-month', t => {
  t.is(parseTimeframe('?timeframe=past-month', now).startDate, now - 1000 * 60 * 60 * 24 * 31)
})

test('parses past-6-months', t => {
  t.is(parseTimeframe('?timeframe=past-6-months', now).startDate, now - 1000 * 60 * 60 * 24 * 31 * 6)
})

test('parses past-year', t => {
  t.is(parseTimeframe('?timeframe=past-year', now).startDate, now - 1000 * 60 * 60 * 24 * 365)
})

test('parses invalid, default to past day', t => {
  t.is(parseTimeframe('?timeframe=invalid', now).startDate, now - 1000 * 60 * 60 * 24)
})
