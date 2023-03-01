import fs from 'fs'

const excludedDomains = [
  'github.dev',
  'devtunnels.ms',
  'vscode.dev',
  'visualstudio.com'
]

export default function readMemory (options = {}, memory) {
  if (Array.isArray(memory)) return memory
  const startDate = (+new Date() - 1000 * 60 * 60 * 24 * 400)

  if (!fs.existsSync(options.DATA_PATH)) return []

  process.stdout.write(`reading ${options.DATA_PATH}\n`)

  return fs.readFileSync(options.DATA_PATH)
    .toString('utf-8')
    .split('\n')
    .map((curr, index, array) => {
      if (index % 10000 === 0) process.stdout.write(`progress ${index} / ${array.length}\n`)
      return parse(curr)
    })
    .filter(Boolean)
}

export function parse(line) {
  try {
    const l = JSON.parse(line)
    if (l.r && l.r.includes && excludedDomains.findIndex((d => l.r.includes(d))) >= 0) return
    if (+new Date(l.d) > startDate) {
      return l
    }
  } catch (err) {}
}