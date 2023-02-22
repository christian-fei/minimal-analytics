import fs from 'fs'

export default function readMemory (options = {}, memory) {
  if (Array.isArray(memory)) return memory
  const startDate = (+new Date() - 1000 * 60 * 60 * 24 * 400)

  if (!fs.existsSync(options.DATA_PATH)) return []

  process.stdout.write(`reading ${options.DATA_PATH}\n`)

  return fs.readFileSync(options.DATA_PATH)
    .toString('utf-8')
    .split('\n')
    .map((curr, index, array) => {
      if (index % 10000 === 0) {
        process.stdout.write(`progress ${index} / ${array.length}\n`)
      }
      if (!curr) return
      try {
        const l = JSON.parse(curr)
        if (l.r && l.r.includes && l.r.includes('github.dev')) return
        if (+new Date(l.d) > startDate) {
          return l
        }
      } catch (err) {}
    })
    .filter(Boolean)
}
