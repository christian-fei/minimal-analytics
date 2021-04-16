module.exports = {
  calculatePagesBreakdown,
  calculateReferrersBreakdown,
  calculateChartData
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
    if (!curr.r || curr.r.startsWith('/')) return acc
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
  const analytics = []
  const step = resolution === 'minutes' ? 60 * 60 * 10 : 60 * 60
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

  function normalizeDate (d, resolution) {
    let normalizedDate = new Date(d).toISOString().substring(0, 15) + '0:00.000Z'
    if (resolution === 'hourly') {
      normalizedDate = new Date(d).toISOString().substring(0, 13) + ':00:00.000Z'
    }
    if (resolution === 'daily') {
      normalizedDate = new Date(d).toISOString().substring(0, 10) + 'T00:00:00.000Z'
    }
    return normalizedDate
  }
}
