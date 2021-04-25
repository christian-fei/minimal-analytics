const fs = require('fs')

module.exports = {
  start,
  msUntilMidnight
}

function start (options = {}) {
  setTimeout(backup, msUntilMidnight())

  function backup () {
    console.log(new Date().toISOString(), 'backing up', options.DATA_PATH)
    const backupPath = options.DATA_PATH + '.bkp'
    fs.copyFileSync(options.DATA_PATH, backupPath)
    setTimeout(backup, msUntilMidnight())
  }
}

function msUntilMidnight (now = Date.now()) {
  const midnight = new Date()
  midnight.setDate(midnight.getDate() + 1)
  midnight.setUTCHours(0)
  midnight.setUTCMinutes(0)
  midnight.setUTCSeconds(0)
  midnight.setUTCMilliseconds(0)
  return +midnight - now
}
