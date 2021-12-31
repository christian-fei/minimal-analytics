const fs = require('fs')

module.exports = function readMemory (options = {}, memory) {
  if (Array.isArray(memory)) return memory
  const startDate = (+new Date() - 1000 * 60 * 60 * 24 * 400)

  return fs.readFileSync(options.DATA_PATH)
    .toString('utf-8')
    .split('\n')
    .reduce((acc, curr) => {
      if (!curr) return acc
      try {
        const l = JSON.parse(curr)
        if (+new Date(l.d) > startDate) {
          return acc.concat([l])
        }
        return acc
      } catch (err) {
        return acc
      }
    }, [])
}
