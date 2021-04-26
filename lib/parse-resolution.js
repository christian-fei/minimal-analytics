const querystring = require('querystring')
const allowedFilters = ['resolution']
const allowedValues = ['minutes', 'hourly', 'daily', 'monthly']

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

  const resolution = allowedValues.find(v => v === query.resolution) || 'hourly'
  if (['minutes', 'hourly'].includes(resolution) && /past-year/.test(url)) return 'monthly'
  if (['minutes', 'hourly', 'monthly'].includes(resolution) && /(past-week|past-month)/.test(url)) return 'daily'
  if (['daily', 'monthly'].includes(resolution) && /(past-day|today)/.test(url)) return 'hourly'
  if (!['minutes', 'hourly', 'daily', 'monthly'].includes(resolution)) return 'hourly'
  console.log('-- parsed resolution', resolution, url)

  return resolution
}
