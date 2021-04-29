const fs = require('fs')

module.exports = function readMemory (options = {}, memory) {
  if (Array.isArray(memory)) return memory
  console.log('reading memory from', options.DATA_PATH)
  return fs.readFileSync(options.DATA_PATH)
    .toString('utf-8')
    .split('\n')
    .filter(Boolean)
    .map(l => JSON.parse(l))
    .filter(({ d }) => +new Date(d) > (+new Date() - 1000 * 60 * 60 * 24 * 180))
}
