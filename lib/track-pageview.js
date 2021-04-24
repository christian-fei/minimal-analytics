const fs = require('fs')
const visitorFromRequest = require('./visitor-from-request')

module.exports = function trackPageview (req, res, options, memory, live) {
  const requestData = []
  return req
    .on('error', (err) => {
      console.error(err)
      res.statusCode = 500
      res.end()
    })
    .on('data', (chunk) => {
      requestData.push(chunk)
    })
    .on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(requestData).toString())
        if (Object.keys(body).length > 4 || Object.keys(body).find(k => !['r', 'w', 'p', 't'].includes(k))) {
          res.statusCode = 422
          return res.end()
        }
        const visitor = visitorFromRequest(req)
        const data = { ...body, v: visitor, d: new Date().toISOString() }

        live[visitor] = Date.now()

        if (body.t === 'pageview' || !body.t) {
          memory.push(data)
          fs.appendFile(options.DATA_PATH, JSON.stringify(data) + '\n', (err) => {
            if (err) console.error('failed to write data', err)
          })
          console.log(data.d, data.p, visitor)
        }

        res.statusCode = 200
        res.end()
      } catch (err) {
        console.error(err)
        res.statusCode = 422
        res.end()
      }
    })
}
