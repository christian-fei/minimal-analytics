const { URL } = require('url')

module.exports = function normalizeUrl (r) {
  if (!r) return ''
  if (r.startsWith('/')) return r
  try {
    const url = new URL(r)
    return url.href
  } catch (err) {
    console.log(err.message, r)
    return r
  }
}
