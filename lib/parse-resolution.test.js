const test = require('ava')
const parseResolution = require('./parse-resolution')

test('parses empty resolution', t => {
  t.is(parseResolution(''), undefined)
})

test('parses hourly resolution', t => {
  t.is(parseResolution('?resolution=hourly'), 'hourly')
})
test('parses minutes resolution', t => {
  t.is(parseResolution('?resolution=minutes'), 'minutes')
})
test('parses invalid resolution', t => {
  t.is(parseResolution('?resolution=invalid'), undefined)
})
