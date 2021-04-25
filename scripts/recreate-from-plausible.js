#!/usr/bin/env node

const got = require('got')
const { createHash } = require('crypto')

main(process.argv)
  .catch(console.error)

async function main () {
  return require('yargs')
    .scriptName('recreate-from-plausible')
    .usage('$0 <cmd> [args]')
    .command('scrape [start] [end] [page]', '', (yargs) => {
      yargs.positional('start', {
        type: 'string',
        // default: new Date().toISOString().substring(0, 10),
        describe: 'start date'
      })
      yargs.positional('end', {
        type: 'string',
        default: new Date().toISOString().substring(0, 10),
        describe: 'end date'
      })
      yargs.positional('page', {
        type: 'string',
        // default: new Date().toISOString().substring(0, 10),
        describe: 'page'
      })
    }, async function (argv) {
      console.log('starting from', argv.start, 'to', argv.end)
      if (!argv.start) throw new Error('MISSING_START_DATE')
      if (!argv.end) throw new Error('MISSING_END_DATE')
      if (!argv.page) throw new Error('MISSING_PAGE')

      const page = argv.page
      const simulatedStats = []

      for (let currentDate = new Date(argv.start); currentDate < new Date(argv.end); currentDate = new Date(1000 * 60 * 60 * 24 + +new Date(currentDate))) {
        const url = `https://plausible.io/api/stats/cri.dev/main-graph?period=day&date=${new Date(currentDate).toISOString().substring(0, 10)}&filters=${encodeURIComponent(JSON.stringify({ page: argv.page }))}`
        console.log(url)
        const result = await got(url)
        const dailyStats = JSON.parse(result.body)

        const initialLength = simulatedStats.length
        simulatedStats.push(...dailyStats.plot.reduce((acc, views, index) => {
          const result = []
          for (let i = 0; i < views; i++) {
            const offset = Math.random() * 60 * 60 * 1000
            const date = new Date(+new Date(dailyStats.labels[index]) + offset)
            const screenWidths = [1920, 1280, 1440, 414, 1366, 840]
            const screenWidth = screenWidths[parseInt(Math.random() * screenWidths.length)]
            const visitor = createHash('sha256').update('' + Math.random()).copy().digest('hex').substring(0, 10)
            result.push({ d: date.toISOString(), v: visitor, p: page, r: '', w: screenWidth })
          }
          result.sort((a, b) => +new Date(a.d) - +new Date(b.d))
          return acc.concat(result)
        }, []))

        console.log('finished', currentDate)
        console.log('data points', simulatedStats.length, `+${simulatedStats.length - initialLength}`)
        console.log('\n')
      }

      console.log(JSON.stringify(simulatedStats.slice(0, 3), null, 2))
      console.log('\n...\n')
      console.log(JSON.stringify(simulatedStats.slice(-3), null, 2))
      console.log('\ntotal data points', simulatedStats.length)
    })
    .help()
    .argv
}
