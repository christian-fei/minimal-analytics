const fs = require('fs')

module.exports = function readMemory (options = {}, memory) {
  if (Array.isArray(memory)) return memory

  return fs.readFileSync(options.DATA_PATH)
    .toString('utf-8')
    .split('\n')
    .reduce((acc, curr) => {
      if (!curr) return acc
      try {
        const l = JSON.parse(curr)
        if (+new Date(l.d) > (+new Date() - 1000 * 60 * 60 * 24 * 180)) {
          return acc.concat([l])
        }
        return acc
      } catch (err) {
        return acc
      }
    }, [])
}
