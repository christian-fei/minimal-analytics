const visitorFromRequest = require('./visitor-from-request')

module.exports = function parsePageview (req, callback) {
  const requestData = []
  req
    .on('error', callback)
    .on('data', (chunk) => {
      requestData.push(chunk)
    })
    .on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(requestData).toString())
        if (Object.keys(body).find(k => !['r', 'w', 'p', 't'].includes(k))) { return callback(new Error('INVALID_PAGEVIEW')) }

        const visitor = visitorFromRequest(req)
        const pageview = { ...body, v: visitor, d: new Date().toISOString() }
        callback(null, pageview)
      } catch (err) {
        callback(err)
      }
    })
}
