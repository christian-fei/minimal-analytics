import visitorFromRequest from './visitor-from-request.js'
import normalizeUrl from './normalize-url.js'
import validatePageview from './validate-pageview.js'

export default function parsePageview (req, callback) {
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
        const pageview = { ...body, r: normalizeUrl(body.r), v: visitor, d: new Date().toISOString() }
        if(validatePageview(pageview)) callback(null, pageview)
        else callback(new Error('invalid pageview'), pageview)
      } catch (err) {
        callback(err)
      }
    })
}
