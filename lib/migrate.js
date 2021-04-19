const fs = require('fs')
module.exports = async function migrate ({ DATA_PATH } = {}) {
  console.log('migrate:', DATA_PATH)
  let memory = fs.readFileSync(DATA_PATH).toString('utf-8').split('\n').filter(Boolean).map(l => JSON.parse(l))
  const allowedKeys = ['d', 'p', 'r', 'w', 'v']
  memory = memory.map(m => Object.keys(m).filter(k => allowedKeys.includes(k)).reduce((acc, curr) => ({ ...acc, [curr]: m[curr] }), {}))
  console.log('migrate updating:', DATA_PATH)
  fs.writeFileSync(DATA_PATH, memory.map(d => JSON.stringify(d)).join('\n'), { encoding: 'utf8' })
  return memory
}
