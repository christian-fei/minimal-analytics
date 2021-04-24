const test = require('ava')
const normalizeUrl = require('./normalize-url')

test('normalizes "https://google.com"', t => {
  t.is(normalizeUrl('https://google.com'), 'https://google.com/')
})

test('normalizes "https://google.com/"', t => {
  t.is(normalizeUrl('https://google.com/'), 'https://google.com/')
})
