const fs = require('fs')

module.exports = {
  start,
  backup,
  msUntilMidnight
}

function start (options = {}) {
  setTimeout(backup, msUntilMidnight(), options)
}

function backup (options = {}, scheduleNext = true) {
  console.log(new Date().toISOString(), 'backing up', options.DATA_PATH)
  const backupPath = options.DATA_PATH + '.bkp'
  fs.copyFileSync(options.DATA_PATH, backupPath)
  scheduleNext && setTimeout(backup, msUntilMidnight(), options)
}

function msUntilMidnight (now = Date.now()) {
  let midnight = new Date()
  midnight.setDate(midnight.getDate() + 1)
  midnight = new Date(midnight.toISOString().substring(0, 11) + '00:00:00.000Z')
  return +midnight - now
}
