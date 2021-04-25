const fs = require('fs')
const normalizeUrl = require('./normalize-url')

module.exports = { start }

async function start ({ DATA_PATH } = {}) {
  console.log('migrate:', DATA_PATH)
  let memory = fs.readFileSync(DATA_PATH).toString('utf-8').split('\n').filter(Boolean).map((l, i) => {
    try {
      return JSON.parse(l)
    } catch (err) {
      console.error('migrate error:', i, err.message)
    }
  }).filter(Boolean)
  const allowedKeys = ['d', 'p', 'r', 'w', 'v']
  memory = memory.map(m =>
    Object.keys(m)
      .filter(k => allowedKeys.includes(k))
      .reduce((acc, curr) => {
        if (curr === 'r') {
          return { ...acc, [curr]: normalizeUrl(m[curr]) }
        }
        return { ...acc, [curr]: m[curr] }
      }, {})
  )
  console.log('migrate updating:', DATA_PATH)
  fs.writeFileSync(DATA_PATH, memory.map(d => JSON.stringify(d)).join('\n'), { encoding: 'utf8' })
  return memory
}
