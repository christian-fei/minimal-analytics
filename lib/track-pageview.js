const fs = require('fs')
const append = process.env.APPEND_SYNC ? fs.appendFileSync : fs.appendFile

module.exports = function trackPageview (pageview, options, memory, live) {
  live[pageview.v] = +new Date(pageview.d || Date.now())

  if (pageview.t === 'pageview' || !pageview.t) {
    memory.push(pageview)
    if (options.DATA_PATH) {
      append(options.DATA_PATH, JSON.stringify(pageview) + '\n', (err) => {
        if (err) console.error('failed to persist pageview', err)
      })
    }
  }
}
