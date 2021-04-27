const querystring = require('querystring')

module.exports = function parseTimeframe (url = '', now = Date.now()) {
  let filters = {}
  if (url.indexOf('?') >= 0) {
    const qs = url.substring(url.indexOf('?') + 1)
    filters = querystring.parse(qs)
  }
  let startDate = now - 1000 * 60 * 60 * 24
  if (filters.timeframe) {
    if (filters.timeframe === 'today') {
      const todayMidnight = new Date(now)
      todayMidnight.setHours(0)
      todayMidnight.setMinutes(0)
      todayMidnight.setSeconds(0)
      todayMidnight.setMilliseconds(0)
      startDate = +new Date(todayMidnight.toUTCString())
    }
    if (filters.timeframe === 'past-day') startDate = now - 1000 * 60 * 60 * 24
    if (filters.timeframe === 'past-week') startDate = now - 1000 * 60 * 60 * 24 * 7
    if (filters.timeframe === 'past-month') startDate = now - 1000 * 60 * 60 * 24 * 31
    if (filters.timeframe === 'past-6-months') startDate = now - 1000 * 60 * 60 * 24 * 31 * 6
    if (filters.timeframe === 'past-year') startDate = now - 1000 * 60 * 60 * 24 * 365
  }
  return { startDate }
}
