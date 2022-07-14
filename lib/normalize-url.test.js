import test from 'ava'
import normalizeUrl from './normalize-url.js'

test('normalizes "https://google.com"', t => {
  t.is(normalizeUrl('https://google.com'), 'https://google.com/')
})

test('normalizes "https://google.com/"', t => {
  t.is(normalizeUrl('https://google.com/'), 'https://google.com/')
})
