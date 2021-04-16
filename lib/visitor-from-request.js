const { createHash } = require('crypto')

module.exports = function visitorFromRequest (req, seed = new Date().getUTCDate()) {
  const userAgent = req.headers['user-agent']
  const remoteIp = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  return createHash('sha256').update(remoteIp + userAgent + seed).copy().digest('hex').substring(0, 10)
}
