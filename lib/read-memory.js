import fs from 'fs'
import validatePageview from './validate-pageview.js'

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
      return parse(curr, startDate)
    })
    .filter(Boolean)
}

export function parse(line, startDate) {
  try {
    const l = JSON.parse(line)
    if (validatePageview(l, startDate)) return l
  } catch (err) {}
}