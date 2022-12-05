import visitorFromRequest from './visitor-from-request.js'
import normalizeUrl from './normalize-url.js'

export default function parseEvent (req, callback) {
  const requestData = []
  req
    .on('error', callback)
    .on('data', (chunk) => {
      requestData.push(chunk)
    })
    .on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(requestData).toString())
        if (Object.keys(body).find(k => !['r', 'w', 'p', 't', 'e'].includes(k))) { return callback(new Error('INVALID_EVENT')) }
        if (body.t !== 'event') return callback(new Error('INVALID_EVENT'))

        const visitor = visitorFromRequest(req)
        const event = { ...body, r: normalizeUrl(body.r), v: visitor, d: new Date().toISOString() }
        callback(null, event)
      } catch (err) {
        callback(err)
      }
    })
}
