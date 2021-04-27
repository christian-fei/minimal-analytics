const parseFilters = require('./parse-filters')
const parseResolution = require('./parse-resolution')
const parseTimeframe = require('./parse-timeframe')

const { performance, PerformanceObserver } = require('perf_hooks')

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry)
  })
})
perfObserver.observe({ entryTypes: ['measure'], buffer: true })

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
  console.log('calculate chart data', data.length, resolution)
  // performance.mark('mapping-start')
  const mapped = data.reduce((acc, curr) => {
    const normalizedDate = normalizeDate(curr.d, resolution)
    const existing = acc.get(normalizedDate)

    if (existing) {
      acc.set(normalizedDate, existing + 1)
      return acc
    }

    acc.set(normalizedDate, 1)
    return acc
  }, new Map())

  // performance.mark('mapping-end')
  // performance.measure('mapping', 'mapping-start', 'mapping-end')

  if (mapped.size < 2) return []

  // performance.mark('stepping-start')
  const step = determineStep(resolution)
  const last = [...mapped.keys()][mapped.size - 1]

  let s = normalizeDate(Date.now(), resolution)
  do {
    if (!mapped.has(s)) mapped.set(s, 0)
    s = normalizeDate(+new Date(s) - step, resolution)
  } while (new Date(s) > new Date(last))
  // performance.mark('stepping-end')
  // performance.measure('stepping', 'stepping-start', 'stepping-end')

  // performance.mark('sorting-start')
  const result = [...mapped.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  // performance.mark('sorting-end')
  // performance.measure('sorting', 'sorting-start', 'sorting-end')

  return result

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
