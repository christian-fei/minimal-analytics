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
  let midnight = new Date()
  midnight.setDate(midnight.getDate() + 1)
  midnight = new Date(midnight.toISOString().substring(0, 11) + '00:00:00.000Z')
  return +midnight - now
}
