import fs from 'fs'

const append = process.env.APPEND_SYNC ? fs.appendFileSync : fs.appendFile

export default function trackEvent (event, options, memory, live) {
  live[event.v] = {
    heartbeat: +new Date(event.d || Date.now()),
    event
  }

  if (event.t === 'event') {
    memory.push(event)
    if (options.DATA_PATH) {
      append(options.DATA_PATH, JSON.stringify(event) + '\n', (err) => {
        if (err) console.error('failed to persist event', err)
      })
    }
  }
}
