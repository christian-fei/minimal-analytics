const test = require('ava')
const parseResolution = require('./parse-resolution')

test('parses empty resolution', t => {
  t.is(parseResolution(''), 'hourly')
})

test('parses hourly resolution', t => {
  t.is(parseResolution('?resolution=hourly'), 'hourly')
})
test('parses minutes resolution', t => {
  t.is(parseResolution('?resolution=minutes'), 'minutes')
})
test('parses daily resolution', t => {
  t.is(parseResolution('?resolution=daily'), 'daily')
})
test('parses monthly resolution', t => {
  t.is(parseResolution('?resolution=monthly'), 'monthly')
})
test('parses invalid resolution', t => {
  t.is(parseResolution('?resolution=invalid'), 'hourly')
})

test('defaults to monthly for yearly timeframe', t => {
  t.is(parseResolution('?resolution=invalid&timeframe=past-year'), 'monthly')
})
