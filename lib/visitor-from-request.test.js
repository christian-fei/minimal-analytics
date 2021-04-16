const test = require('ava')
const visitorFromRequest = require('./visitor-from-request')

test('visitor based on userAgent and ip', t => {
  const req = {
    headers: { 'user-agent': 'some-ua', 'x-forwarded-for': '127.0.0.1' },
    connection: {},
    socket: {}
  }
  t.deepEqual(visitorFromRequest(req, 0), '4962513bd5')
})
