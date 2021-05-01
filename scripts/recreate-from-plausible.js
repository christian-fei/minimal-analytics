#!/usr/bin/env node

const got = require('got')
const queue = require('fastq').promise(getStats, 50)
const { createHash } = require('crypto')
const fs = require('fs')
const path = require('path')

main(process.argv)
  .catch(console.error)

/*
./recreate-from-plausible.js scrape --domain cri.dev --start 2021-01-01 --end 2021-04-12
*/
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
      if (!argv.domain) throw new Error('MISSING_DOMAIN')

      const domain = argv.domain
      const simulatedStats = []
      let pages = [argv.page]
      if (!argv.page) {
        const sitemapXml = await got(`https://${domain}/sitemap.xml`)
        pages = sitemapXml.body.split('\n').filter(Boolean).filter(line => line.trim().startsWith('<loc>')).map(line => line.trim().replace('<loc>', '').replace('</loc>', '').replace(`https://${domain}`, ''))
      }
      for (let date = new Date(argv.start); date < new Date(argv.end); date = new Date(1000 * 60 * 60 * 24 + +new Date(date))) {
        console.log('aggregating', date)
        for (const page of pages) {
          queue.push({ page, date, domain })
            .catch(err => {
              console.error(err.message, 'retrying')
              queue.push({ page, date, domain })
            })
            .then(stats => {
              if (Array.isArray(stats)) {
                simulatedStats.push(...stats)
                console.log('finished', date.toISOString().substring(0, 10), page, '+' + stats.length)
              }
            })
        }
      }

      queue.drain = function () {
        console.log('done')
        simulatedStats.sort((a, b) => +new Date(a.d) - +new Date(b.d))
        fs.writeFileSync(path.resolve(__dirname, '..', `plausible-${argv.start}-${argv.end}.ljson`), simulatedStats.map(l => JSON.stringify(l)).join('\n') + '\n', { encoding: 'utf-8' })
      }

      console.log(JSON.stringify(simulatedStats.slice(0, 3), null, 2))
      console.log('\n...\n')
      console.log(JSON.stringify(simulatedStats.slice(-3), null, 2))
      console.log('\ntotal data points', simulatedStats.length)
    })
    .help()
    .argv
}

async function getStats ({ page, domain, date }) {
  const url = `https://plausible.io/api/stats/${domain}/main-graph?period=day&date=${new Date(date).toISOString().substring(0, 10)}&filters=${encodeURIComponent(JSON.stringify({ page }))}`
  // console.log(url)
  const result = await got(url)
  const dailyStats = JSON.parse(result.body)
  return dailyStats.plot.reduce((acc, views, index) => {
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
  }, [])
}
