import test from 'ava'
import parseFilters from './parse-filters.js'

test('parses empty filters', t => {
  t.deepEqual(parseFilters(''), {})
})

test('parses page filter', t => {
  t.deepEqual(parseFilters('?p=%2Fsome%2Furl%2F'), {
    p: '/some/url/'
  })
})

test('parses referrer filter', t => {
  t.deepEqual(parseFilters('?r=https%3A%2F%2Fwww.google.com%2F'), {
    r: 'https://www.google.com/'
  })
})

test('ignores invalid filters', t => {
  t.deepEqual(parseFilters('?invalid=true'), {})
})
