const migrate = require('./migrate')
const fs = require('fs')
const path = require('path')
const { serial: test } = require('ava')

const DATA_PATH = path.resolve(__dirname, '..', 'migrate.ljson')

test.afterEach(() => {
  fs.unlinkSync(DATA_PATH)
})

test('remove type and userAgent', async t => {
  addTestData([
    {
      r: 'https://www.google.com/',
      p: '/posts/2020-03-02-First-steps-with-Darklang/',
      w: 1799,
      type: 'pageview',
      v: '337747a42a',
      u: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
      d: '2021-04-11T16:27:35.627Z'
    }
  ])

  const result = await migrate.start({
    DATA_PATH
  })
  t.deepEqual(result, [
    {
      d: '2021-04-11T16:27:35.627Z',
      p: '/posts/2020-03-02-First-steps-with-Darklang/',
      r: 'https://www.google.com/',
      v: '337747a42a',
      w: 1799
    }
  ])
})

test('unify referrer domain', async t => {
  addTestData([
    {
      r: 'https://www.google.com/',
      p: '/posts/2020-03-02-First-steps-with-Darklang/',
      w: 1799,
      v: '337747a42a',
      d: '2021-04-11T16:27:35.627Z'
    }
  ])

  const result = await migrate.start({
    DATA_PATH
  })
  t.deepEqual(result, [
    {
      d: '2021-04-11T16:27:35.627Z',
      p: '/posts/2020-03-02-First-steps-with-Darklang/',
      r: 'https://www.google.com/',
      v: '337747a42a',
      w: 1799
    }
  ])
})

function addTestData (data) {
  fs.writeFileSync(DATA_PATH, data.map(d => JSON.stringify(d)).join('\n'), { encoding: 'utf8' })
}
