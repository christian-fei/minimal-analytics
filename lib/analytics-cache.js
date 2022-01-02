const analytics = require('./analytics')

const cache = {}

module.exports = {
  getAll,
  cache
}

function getAll (url, memory, live) {
  if (cache[url]) {
    if (cache[url].timestamp > Date.now() - 1000 * 15) {
      return { ...cache[url].result, live }
    } else {
      delete cache[url]
    }
  }

  Object.keys(cache).forEach(key => {
    if (cache[key].timestamp < Date.now() - 1000 * 15) delete cache[key]
  })

  cache[url] = {
    timestamp: Date.now(),
    result: analytics.getAll(url, memory, live)
  }

  return { ...cache[url].result, live }
}
