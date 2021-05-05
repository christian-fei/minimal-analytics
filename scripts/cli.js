#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const parseTimeframe = require('../lib/parse-timeframe')
const parseResolution = require('../lib/parse-resolution')
const readMemory = require('../lib/read-memory')
const analytics = require('../lib/analytics')

main(process.argv)
  .catch(console.error)

async function main () {
  return require('yargs')
    .scriptName('cli')
    .usage('$0 <cmd> [args]')
    .command('stats [timeframe] [resolution]', '', (yargs) => {
      yargs.positional('timeframe', {
        type: 'string',
        default: 'today',
        describe: 'timeframe'
      })
      yargs.positional('resolution', {
        type: 'string',
        default: 'hourly',
        describe: 'resolution'
      })
    }, async function (argv) {
      const url = `?timeframe=${encodeURIComponent(argv.timeframe)}&resolution=${encodeURIComponent(argv.resolution)}`
      const memory = readMemory({ DATA_PATH: path.resolve(__dirname, '..', 'data', 'data.ljson') })
      const result = analytics.getAll(url, memory, {})

      // console.log(result)
      console.log('\nTop pages')
      for (const page of result.pages) {
        console.log(`${page.views} ${page.p}`)
      }
      console.log('\nTop referrers')
      for (const page of result.referrers) {
        console.log(`${page.views} ${page.r || 'none'}`)
      }

      console.log(`\nPageviews ${result.pageviewsCount}`)
      console.log(`\nVisitors ${result.visitorsCount}`)
    })
    .help()
    .argv
}
