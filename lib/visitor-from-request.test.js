import test from 'ava'
import visitorFromRequest from './visitor-from-request.js'

test('visitor based on userAgent and ip', t => {
  const req = {
    headers: { 'user-agent': 'some-ua', 'x-forwarded-for': '127.0.0.1' },
    connection: {},
    socket: {}
  }
  t.deepEqual(visitorFromRequest(req, 0), '4962513bd5')
})
