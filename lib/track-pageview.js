import fs from 'fs'
import validatePageview from './validate-pageview.js'

const append = process.env.APPEND_SYNC ? fs.appendFileSync : fs.appendFile

export default function trackPageview (pageview, options, memory, live) {
  live[pageview.v] = {
    heartbeat: +new Date(pageview.d || Date.now()),
    pageview
  }

  if (pageview.t === 'pageview' || !pageview.t) {
    if (!validatePageview(pageview)) return
    memory.push(pageview)
    if (options.DATA_PATH) {
      append(options.DATA_PATH, JSON.stringify(pageview) + '\n', (err) => {
        if (err) console.error('failed to persist pageview', err)
      })
    }
  }
}
