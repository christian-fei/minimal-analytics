const parseFilters = require('./parse-filters')
const parseResolution = require('./parse-resolution')
const parseTimeframe = require('./parse-timeframe')

module.exports = {
  getAll,
  calculatePagesBreakdown,
  calculateReferrersBreakdown,
  calculateChartData
}

function getAll (url, memory, live) {
  const filters = parseFilters(url)
  const { startDate } = parseTimeframe(url)
  const resolution = parseResolution(url)

  let data = memory.filter(m => +new Date(m.d) > startDate).reverse()
  const keys = Object.keys(filters)
  if (keys.length > 0) {
    data = data.filter(d => keys.every(k => d[k] === filters[k]))
  }
  const pages = calculatePagesBreakdown(data, 25)
  const referrers = calculateReferrersBreakdown(data, 25)
  const chartData = calculateChartData(data, resolution)

  const pageviewsCount = data.length
  const visitorsCount = [...new Set(data.map(d => d.v))].length

  return {
    data: data.slice(0, 25),
    pages,
    referrers,
    chartData,
    pageviewsCount,
    visitorsCount,
    live: Object.keys(live).length
  }
}

function calculatePagesBreakdown (data, max) {
  return data.reduce((acc, curr) => {
    if (acc.find(a => a.p === curr.p)) {
      return acc.map((a) => {
        if (a.p === curr.p) {
          a.views++
          return a
        }
        return a
      })
    }
    return acc.concat({ p: curr.p, views: 1 })
  }, [])
    .sort((a, b) => b.views - a.views)
    .filter((d, i) => !max || i < max)
}

function calculateReferrersBreakdown (data, max) {
  return data.reduce((acc, curr) => {
    if (curr.r.startsWith('/')) return acc
    const existing = acc.find(a => a.r === curr.r)

    if (existing) {
      existing.views++
      return acc
    }

    return acc.concat([{ views: 1, r: curr.r }])
  }, [])
    .sort((a, b) => b.views - a.views)
    .filter((d, i) => !max || i < max)
}

function calculateChartData (data, resolution) {
  const mapped = data.reduce((acc, curr) => {
    const normalizedDate = normalizeDate(curr.d, resolution)
    const existing = acc.find(a => a.date === normalizedDate)

    if (existing) {
      existing.views++
      return acc
    }

    return acc.concat([{ views: 1, date: normalizedDate }])
  }, [])
  if (mapped.length < 2) return []
  const analytics = []
  const step = determineStep(resolution)
  for (let s = normalizeDate(Date.now(), resolution); new Date(s) > new Date(mapped[mapped.length - 1].date); s = normalizeDate(+new Date(s) - step, resolution)) {
    const existing = mapped.find(a => a.date === s)
    if (existing) {
      analytics.push(existing)
    } else {
      analytics.push({ date: s, views: 0 })
    }
  }

  return analytics
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(d => [d.date, d.views])

  function normalizeDate (d, resolution) {
    let normalizedDate = new Date(d).toISOString().substring(0, 15) + '0:00.000Z'
    if (resolution === 'hourly') {
      normalizedDate = new Date(d).toISOString().substring(0, 13) + ':00:00.000Z'
    }
    if (resolution === 'daily') {
      normalizedDate = new Date(d).toISOString().substring(0, 10) + 'T00:00:00.000Z'
    }
    if (resolution === 'monthly') {
      normalizedDate = new Date(d).toISOString().substring(0, 8) + '01T00:00:00.000Z'
    }
    return normalizedDate
  }

  function determineStep (resolution) {
    if (resolution === 'hourly') return 1000 * 60 * 60
    if (resolution === 'daily') return 1000 * 60 * 60 * 24
    if (resolution === 'monthly') return 1000 * 60 * 60 * 24 * 28
    return 1000 * 60 * 10
  }
}
