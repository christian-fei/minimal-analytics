import test from 'ava'
import validatePageview from './validate-pageview.js'

test.serial('valid pageview', t => {
  const pageview = {
    p: '/',
    r: '',
    d: new Date().toISOString(),
    v: 'vis-1',
    w: 1280
  }
  t.true(validatePageview(pageview))
})

test.serial('invalid pageview referrer', t => {
  const pageview = {
    p: '/',
    r: 'github.dev',
    d: new Date().toISOString(),
    v: 'vis-1',
    w: 1280
  }
  t.false(validatePageview(pageview))
  
  pageview.r = 'abc.pages.dev'
  t.false(validatePageview(pageview))
})
