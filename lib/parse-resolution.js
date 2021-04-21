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

  const resolution = allowedValues.find(v => v === query.resolution) || 'minutes'
  if (resolution === 'minutes' && /(\/past-week|\/past-month)/.test(url)) return 'daily'
  if (resolution === 'daily' && /(\/past-day|\/today)/.test(url)) return 'hourly'
  if (!['minutes', 'hourly', 'daily'].includes(resolution)) return 'hourly'
  return resolution
}
