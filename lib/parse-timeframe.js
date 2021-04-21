const querystring = require('querystring')

module.exports = function parseTimeframe (url = '', now = Date.now()) {
  let filters = {}
  if (url.indexOf('?') >= 0) {
    const qs = url.substring(url.indexOf('?') + 1)
    filters = querystring.parse(qs)
  }
  let startDate = now - 1000 * 60 * 60 * 24
  if (filters.timeframe) {
    if (filters.timeframe === 'today') startDate = +new Date(new Date(now).toISOString().substring(0, 10) + 'T00:00:00.000Z')
    if (filters.timeframe === 'past-day') startDate = now - 1000 * 60 * 60 * 24
    if (filters.timeframe === 'past-week') startDate = now - 1000 * 60 * 60 * 24 * 7
    if (filters.timeframe === 'past-month') startDate = now - 1000 * 60 * 60 * 24 * 31
  }
  return { startDate }
}
