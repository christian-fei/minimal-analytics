import fs from 'fs'

export {
  start,
  backup,
  msUntilMidnight
}

function start (options = {}) {
  setTimeout(backup, msUntilMidnight(), options)
}

function backup (options = {}, scheduleNext = true) {
  process.stdout.write(`${new Date().toISOString()} backing up ${options.DATA_PATH}`)
  const backupPath = new URL(options.DATA_PATH + '.bkp', import.meta.url).pathname
  fs.copyFileSync(new URL(options.DATA_PATH, import.meta.url).pathname, backupPath)
  scheduleNext && setTimeout(backup, msUntilMidnight(), options)
}

function msUntilMidnight (now = Date.now()) {
  let midnight = new Date()
  midnight.setDate(midnight.getDate() + 1)
  midnight = new Date(midnight.toISOString().substring(0, 11) + '00:00:00.000Z')
  return +midnight - now
}
