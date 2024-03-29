import querystring from 'querystring'

const allowedFilters = ['resolution']
const allowedValues = ['minutes', 'hourly', 'daily', 'monthly']

export default function parseResolution (url = '') {
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
  if (['minutes', 'hourly'].includes(resolution) && /past-year/.test(url)) return 'daily'
  if (['minutes'].includes(resolution) && /(past-6-months)/.test(url)) return 'daily'
  if (['minutes', 'monthly'].includes(resolution) && /(past-month)/.test(url)) return 'daily'
  if (['monthly'].includes(resolution) && /(past-week)/.test(url)) return 'daily'
  if (['daily', 'monthly'].includes(resolution) && /(past-day|today)/.test(url)) return 'hourly'
  if (!['minutes', 'hourly', 'daily', 'monthly'].includes(resolution)) return 'hourly'

  return resolution
}
