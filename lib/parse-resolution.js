const querystring = require('querystring')
const allowedFilters = ['resolution']
const allowedValues = ['minutes', 'hourly', 'daily']

module.exports = function parseResolution (url = '') {
  let query = {}
  if (url.indexOf('?') >= 0) {
    const qs = url.substring(url.indexOf('?') + 1)
    query = querystring.parse(qs)
  }
  query = Object.keys(query)
    .filter(k => allowedFilters.includes(k))
    .reduce((acc, curr) =>
      Object.assign(acc, { [curr]: query[curr] })
    , {})
  return allowedValues.find(v => v === query.resolution)
}
