const fs = require('fs')

module.exports = function readMemory (options = {}, memory) {
  if (Array.isArray(memory)) return memory
  const startDate = (+new Date() - 1000 * 60 * 60 * 24 * 400)

  if (!fs.existsSync(options.DATA_PATH)) return []
  
  return fs.readFileSync(options.DATA_PATH)
    .toString('utf-8')
    .split('\n')
    .map((curr, index, array) => {
      if (index % 10000 === 0) {
        console.log('progress', index, '/', array.length)
      }
      if (!curr) return
      try {
        const l = JSON.parse(curr)
        if (+new Date(l.d) > startDate) {
          return l
        }
        return 
      } catch (err) {
        return 
      }
    })
    .filter(Boolean)
}
